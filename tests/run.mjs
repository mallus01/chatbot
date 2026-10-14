// Measures how well the keyword search answers the questions in tests/questions.js, and checks the guard against
// invented facts. Run from the repository folder: node tests/run.mjs
// The semantic search needs a browser: open tests.html for that.
import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const ctx = { window: {} };
ctx.window.window = ctx.window;
vm.createContext(ctx);
for (const f of ["knowledge.js", "knowledge-fr.js", "retrieval.js", "tests/questions.js"]) {
  vm.runInContext(fs.readFileSync(path.join(dir, f), "utf8"), ctx, { filename: f });
}
const { PROFILE, PROFILE_FR, Retrieval, TEST_QUESTIONS } = ctx.window;

// Minimum share of questions where the right answer is shown in quick-answer mode (validated answer or top section).
const MIN_ANSWER_RATE = 0.9;

let failures = 0;
const fail = msg => { failures++; console.log("  ✗ " + msg); };

// ---------- Search quality ----------
for (const lang of ["en", "fr"]) {
  const idx = Retrieval.create(Retrieval.localize(PROFILE, PROFILE_FR, lang), lang);
  const qs = TEST_QUESTIONS.filter(t => t.lang === lang);
  let top1 = 0, top3 = 0, faqRight = 0, faqExpected = 0, faqWrong = 0, answered = 0;
  console.log(`\n${lang.toUpperCase()} (${qs.length} questions)`);
  for (const t of qs) {
    const hits = idx.retrieve(t.q, 3).map(d => d.id);
    const f = idx.findFaq(t.q);
    if (hits[0] === t.section) top1++;
    if (hits.includes(t.section)) top3++;
    if (t.faq) faqExpected++;
    const faqOk = f && (f.item.id === t.faq || f.item.section === t.section);
    if (f && faqOk && f.item.id === t.faq) faqRight++;
    if (f && !faqOk) { faqWrong++; fail(`"${t.q}" got the validated answer "${f.item.id}" (expected ${t.faq || t.section})`); }
    const shown = f ? faqOk : hits[0] === t.section;
    if (shown) answered++;
    else if (!f) console.log(`  · "${t.q}" → ${hits.join(", ")} (expected ${t.section})`);
  }
  const pct = n => `${Math.round((100 * n) / qs.length)}%`;
  console.log(`  Right answer shown in quick-answer mode: ${answered}/${qs.length} (${pct(answered)})`);
  console.log(`  Right section first: ${pct(top1)} · in the top 3 given to the AI: ${pct(top3)}`);
  console.log(`  Validated answers: ${faqRight}/${faqExpected} found by wording, ${faqWrong} wrong`);
  if (answered / qs.length < MIN_ANSWER_RATE) fail(`${lang}: right answer shown for ${pct(answered)} of questions, below ${MIN_ANSWER_RATE * 100}%`);
}

// ---------- Guard against invented facts ----------
console.log("\nGuard");
const allowed = "Mattis worked at Fayat IT on around 80 websites with Clever Age. Jira, Kanban. LinkedIn https://www.linkedin.com/in/mattis-fernandez/";
const cases = [
  ["Mattis worked at Fayat IT on around 80 websites.", true],
  ["He steered Clever Age in Jira. Want an example?", true],
  ["He managed 120 websites at Fayat IT.", false],
  ["He is PMP certified by the Project Management Institute in Toronto.", false],
  ["Reach him at mattis@example.com.", false],
  ["He has 2 years of experience and one remote day.", true],
  ["See https://www.linkedin.com/in/mattis-fernandez/ for more.", true],
  ["See https://example.com/mattis for more.", false],
];
for (const [answer, expected] of cases) {
  const r = Retrieval.groundCheck(answer, allowed);
  if (r.ok !== expected) fail(`guard ${expected ? "rejected" : "accepted"}: "${answer}" ${JSON.stringify(r)}`);
}
console.log(`  ${cases.length} cases checked`);

console.log(failures ? `\n${failures} problem(s)` : "\nAll checks passed");
process.exit(failures ? 1 : 0);
