// Search over the profile: validated answers (faq), profile sections, and the check that an AI answer only uses
// facts from the profile. Shared by index.html, tests.html and tests/run.mjs (plain script, no module, so it also
// works when index.html is opened straight from the disk).
(function (root) {
  const STOP_EN = "a an the and or of to in on for with at by from is are was were be been his he him her she it its this that what which who how do does did can could would should about tell me you your i my we our has have had as any some more than there their they them into also just";
  const STOP_FR = "le la les un une des du de d l et ou au aux en dans sur pour par avec est sont etait il elle lui son sa ses ce cet cette ces que qu qui quoi quel quelle quels quelles comment ne n pas vous votre vos je j me m mon ma mes nous notre se s on y fait faire peut peux pouvez parle parlez dire dites moi a-t-il est-ce t c avez ete";
  const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  // Scores used to accept a validated answer. Semantic scores are cosine similarities from the embedding model.
  const FAQ_SEM_MIN = 0.92, FAQ_SEM_MARGIN = 0.015, FAQ_WORDS_MIN = 0.7;

  function create(profile, lang) {
    const STOP = new Set((STOP_EN + (lang === "fr" ? " " + STOP_FR : "")).split(" "));
    const tokens = s => norm(s).split(/[^a-z0-9.+#-]+/).map(t => t.replace(/^[.-]+|[.-]+$/g, "")).filter(t => t && !STOP.has(t)).map(t => t.length > 4 && t.endsWith("s") ? t.slice(0, -1) : t);
    const plain = s => norm(s).replace(/[^a-z0-9]+/g, " ").trim();

    const docs = profile.sections.map(s => ({ ...s, kw: new Set(s.keywords.flatMap(tokens)), title_t: new Set(tokens(s.title)), body: new Set(tokens(s.text)) }));
    const byId = id => docs.find(d => d.id === id);
    const df = new Map();
    for (const d of docs) for (const t of d.body) df.set(t, (df.get(t) || 0) + 1);
    const idf = t => Math.log(1 + docs.length / (df.get(t) || docs.length));

    // A validated answer whose id is a section id also answers that section's suggestion button.
    const faq = (profile.faq || []).map(f => {
      const q = [...f.q];
      const sec = byId(f.id);
      if (sec && !q.includes(sec.ask)) q.unshift(sec.ask);
      return { ...f, section: f.section || f.id, q, q_plain: q.map(plain), q_tok: q.map(x => new Set(tokens(x))) };
    });

    let vec = null; // { sections: Map(id -> vector), faq: [{ i, vector }] } once the embedding model is ready
    const dot = (a, b) => { let s = 0; for (let i = 0; i < a.length; i++) s += a[i] * b[i]; return s; };

    function keywordScores(query) {
      const q = [...new Set(tokens(query))];
      return docs.map(d => {
        let s = 0;
        for (const t of q) {
          if (d.kw.has(t)) s += 3;
          if (d.title_t.has(t)) s += 2;
          if (d.body.has(t)) s += idf(t);
        }
        return { d, s };
      }).sort((a, b) => b.s - a.s);
    }

    // Top-k sections for a question. With an embedding of the question, the keyword ranking and the ranking by
    // meaning are merged (reciprocal rank fusion), so a strong keyword hit like "Fayat" or "Piano" still counts.
    function retrieve(query, k = 3, qVec = null) {
      const kw = keywordScores(query);
      const kwHits = kw.filter(x => x.s >= 2);
      if (qVec && vec) {
        const sem = docs.map(d => ({ d, s: dot(qVec, vec.sections.get(d.id)) })).sort((a, b) => b.s - a.s);
        const fused = new Map(docs.map(d => [d, 0]));
        kwHits.forEach((x, r) => fused.set(x.d, fused.get(x.d) + 1 / (5 + r)));
        sem.forEach((x, r) => fused.set(x.d, fused.get(x.d) + 1 / (5 + r)));
        return [...fused].sort((a, b) => b[1] - a[1]).slice(0, k).map(([d]) => d);
      }
      const hits = kwHits.slice(0, k).map(x => x.d);
      return hits.length ? hits : ["fayat", "strengths", "atinternet"].map(byId).filter(Boolean);
    }
    const topScore = query => keywordScores(query)[0];

    // The validated answer for a question, or null. Without embeddings only a near-identical wording matches
    // (same words, in any order); with embeddings, a clearly closer meaning than any other answer.
    function findFaq(query, qVec = null) {
      const p = plain(query), t = new Set(tokens(query));
      let best = null;
      faq.forEach((f, i) => {
        f.q_plain.forEach((qp, j) => {
          let score = 0;
          if (qp === p) score = 1;
          else {
            const other = f.q_tok[j];
            let inter = 0;
            for (const x of t) if (other.has(x)) inter++;
            const union = t.size + other.size - inter;
            score = union ? inter / union : 0;
          }
          if (!best || score > best.score) best = { f, score };
        });
      });
      if (best && best.score >= FAQ_WORDS_MIN) return { item: best.f, score: best.score, how: "words" };
      if (qVec && vec) {
        const [first, second] = faqByMeaning(qVec);
        if (first && first.score >= FAQ_SEM_MIN && (!second || first.score - second.score >= FAQ_SEM_MARGIN)) return { ...first, how: "meaning" };
      }
      return null;
    }

    // Validated answers ranked by closeness of meaning to the question (best wording of each).
    function faqByMeaning(qVec) {
      if (!vec) return [];
      const perFaq = new Map();
      for (const { i, vector } of vec.faq) {
        const s = dot(qVec, vector);
        if (!perFaq.has(i) || s > perFaq.get(i)) perFaq.set(i, s);
      }
      return [...perFaq].sort((a, b) => b[1] - a[1]).map(([i, score]) => ({ item: faq[i], score }));
    }

    // Texts to embed once the model is loaded, and where to store the vectors.
    function embeddingJobs() {
      return {
        sections: docs.map(d => ({ id: d.id, text: `${d.title}. ${d.ask}\n${d.text}` })),
        faq: faq.flatMap((f, i) => f.q.map(text => ({ i, text }))),
      };
    }
    function setVectors(sectionVectors, faqVectors) {
      const jobs = embeddingJobs();
      vec = {
        sections: new Map(jobs.sections.map((s, n) => [s.id, sectionVectors[n]])),
        faq: jobs.faq.map((f, n) => ({ i: f.i, vector: faqVectors[n] })),
      };
    }

    return { docs, faq, tokens, retrieve, topScore, findFaq, faqByMeaning, embeddingJobs, setVectors, hasVectors: () => !!vec };
  }

  // Checks that an AI answer does not bring facts from nowhere: every number (above 12), email, web address and
  // proper name in the answer must appear in what the model was given (instructions, profile extracts,
  // conversation). Returns the unknown items; the answer is rejected when `ok` is false.
  function groundCheck(answer, allowed) {
    const A = norm(allowed);
    const has = s => A.includes(norm(s));
    const unknown = [], names = [];
    const text = String(answer);
    for (const u of text.match(/https?:\/\/[^\s)]+/g) || []) { const c = u.replace(/[.,;:!?]+$/, ""); if (!has(c)) unknown.push(c); }
    for (const e of text.match(/[\w.+-]+@[\w-]+(\.[\w-]+)+/g) || []) if (!has(e)) unknown.push(e);
    const noLinks = text.replace(/https?:\/\/[^\s)]+/g, " ").replace(/[\w.+-]+@[\w-]+(\.[\w-]+)+/g, " ");
    for (const n of noLinks.match(/\d+(?:[.,]\d+)*/g) || []) if (parseFloat(n.replace(",", ".")) > 12 && !has(n)) unknown.push(n);
    // Capitalised words that do not start a sentence or a list item: probably names of companies, schools, tools…
    const re = /\p{Lu}[\p{L}\p{N}'’&-]{2,}/gu;
    let m;
    while ((m = re.exec(noLinks))) {
      const before = noLinks.slice(0, m.index).replace(/\s+$/, "");
      const prev = before.slice(-1);
      if (!prev || /[.!?:;\n*•«"“(-]/.test(prev)) continue;
      const w = m[0].replace(/['’]s$/, "");
      if (!has(w) && !has(w.replace(/s$/, ""))) names.push(w);
    }
    const uniqueNames = [...new Set(names)];
    return { ok: unknown.length === 0 && uniqueNames.length < 2, unknown, names: uniqueNames };
  }

  // Profile in the chosen language: French texts replace the English ones item by item (same ids); French keywords
  // and role patterns are added to the English ones.
  function localize(base, fr, lang) {
    if (lang !== "fr" || !fr) return base;
    const byId = (arr, id) => (arr || []).find(x => x.id === id) || {};
    return {
      ...base,
      headline: fr.headline || base.headline, location: fr.location || base.location, core: fr.core || base.core,
      sections: base.sections.map(s => { const f = byId(fr.sections, s.id); return { ...s, ...f, keywords: [...s.keywords, ...(f.keywords || [])] }; }),
      faq: (base.faq || []).map(q => ({ ...q, ...byId(fr.faq, q.id) })),
      roles: base.roles.map(r => {
        const f = byId(fr.roles, r.id);
        const match = r.match && f.match ? new RegExp(`${r.match.source}|${f.match.source}`, "i") : r.match || f.match || null;
        return { ...r, ...f, match, focus: r.focus };
      }),
      funnel: { ...base.funnel, ...fr.funnel },
    };
  }

  root.Retrieval = { create, localize, groundCheck, norm, FAQ_SEM_MIN, FAQ_SEM_MARGIN };
})(typeof window !== "undefined" ? window : globalThis);
