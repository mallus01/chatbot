// Search by meaning: a small multilingual embedding model (multilingual-e5-small, ~120 MB, cached by the browser
// after the first visit) turns texts into vectors so that "Is he PMP certified?" finds the certifications answer even
// without shared words. Runs on the processor (WebAssembly), separately from the AI model on the graphics card.
(function (root) {
  const LIB = "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1/dist/transformers.min.js";
  const MODEL = "Xenova/multilingual-e5-small";
  let extractor = null, loading = null;

  function load() {
    loading ??= (async () => {
      const tf = await import(LIB);
      tf.env.allowLocalModels = false;
      extractor = await tf.pipeline("feature-extraction", MODEL, { dtype: "q8", device: "wasm" });
    })();
    return loading;
  }

  // kind: "query" for questions, "passage" for profile sections (the prefixes this model was trained with).
  async function embed(texts, kind) {
    if (!extractor) await load();
    const out = [];
    for (let i = 0; i < texts.length; i += 8) {
      const batch = texts.slice(i, i + 8).map(t => `${kind}: ${t}`);
      const res = await extractor(batch, { pooling: "mean", normalize: true });
      out.push(...res.tolist());
    }
    return out;
  }

  root.Semantic = { load, embed, MODEL, ready: () => !!extractor };
})(typeof window !== "undefined" ? window : globalThis);
