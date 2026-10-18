# Mattis Fernandez's recruiter chatbot

**Try it: [chatbot.mattisfernandez.com]((https://chatbot.mattisfernandez.com/))**

A conversational assistant that answers recruiters' questions about the profile of Mattis Fernandez, junior IT project manager, in English or French. Recruiters ask their questions as they would to a person (experience, skills, degree, availability, salary…), get an answer right away, and can then contact Mattis in one click.

The AI runs **entirely in the visitor's browser**. There is no server of its own: questions and answers never leave the device, and the model is deleted when the tab is closed.

## The project

### Purpose
Replace reading a CV with a conversation. A recruiter discovering the profile gets the answers they care about in a few minutes, focused on the position they are hiring for, and is then guided towards getting in touch (LinkedIn first, or email).

### The visitor's journey
1. **Introduction**: the first screen explains what the assistant is for, how it works and how privacy is handled.
2. **Model choice**: the app detects the device and recommends a model. It warns that the large model is slower and the small one makes more mistakes. Visitors can also pick quick answers, with no AI and no download.
3. **Language choice** (English or French) while the model downloads.
4. **Position**: project manager, business analyst, product owner, data/BI, or a free-text title. Visitors can also just explore the profile.
5. **Chat**: a welcome message, a pitch tailored to the position, then the recruiter's questions. Suggested questions appear after each answer.
6. **Contact**: after a few answers, or as soon as the recruiter mentions an interview, salary or availability, a contact card appears with a ready-to-send message that names the position.

On later visits, only the position step is shown. The "Model & language" button changes these settings without reloading the page.

## Technologies

| Role | Technology |
|---|---|
| Interface | Plain HTML, CSS and JavaScript, no framework, in a single file (`index.html`) |
| Language model | [WebLLM](https://github.com/mlc-ai/web-llm) 0.2.84, which runs the model on the graphics card through **WebGPU** |
| Models offered | Qwen2.5 1.5B Instruct (~1 GB, default), Llama 3.2 3B Instruct (~2 GB), Llama 3.2 1B Instruct (~0.7 GB), 4-bit quantised |
| Search by meaning | [Transformers.js](https://github.com/huggingface/transformers.js) 3.8.1 with the multilingual `multilingual-e5-small` model (~120 MB) |
| Keyword search | Custom code (`retrieval.js`): keywords, titles and weighting by word rarity |
| Tests | Node.js (`tests/run.mjs`) and GitHub Actions, plus an in-browser test page (`tests.html`) |
| Visitor statistics | [GoatCounter](https://www.goatcounter.com) (open source, no cookies, hosted in the EU) |
| Hosting | GitHub Pages, custom domain registered with OVH |

Libraries are loaded from the jsDelivr CDN at pinned versions. Model files come from Hugging Face.

## Key features

### Everything local, nothing kept
- No backend and no database: the site is a set of static files. The only data sent anywhere is an anonymous visit count (see below).
- The model is downloaded into the browser and runs on the visitor's graphics card.
- Model files are deleted from browser storage as soon as the model is loaded, and leftovers from earlier visits are deleted on start-up. The search-by-meaning model stays in memory only. Nothing remains on the device once the tab is closed.

### Visitor statistics, GDPR-compliant
Visits are counted with [GoatCounter](https://www.goatcounter.com), an open-source analytics tool chosen for its respect of the GDPR:
- **No cookies and nothing stored on the device**, so no consent banner is needed under CNIL rules for this kind of audience measurement.
- **Anonymous**: only the visit itself is recorded (page, referring site, browser, screen size, country). GoatCounter does not store IP addresses, and its servers are in the EU.
- **Never the conversation**: the questions, the answers and the position picked are never sent. Click tracking is turned off.
- **Transparent**: when statistics are on, the privacy text in the footer and on the first screen says so, in English and French.

The GoatCounter code is set in `window.STATS_CODE` at the top of `index.html`. Leaving it empty turns statistics off and the GoatCounter script is not loaded at all.

### Reliable answers from a small model
A model with 1 to 3 billion parameters can make facts up. Several mechanisms prevent that:
- **Retrieval-augmented generation (RAG)**: for each question, the model only gets the profile summary and the most relevant sections, with instructions to invent nothing and to refer the recruiter to Mattis when information is missing.
- **Verified answers**: for frequent questions, an answer reviewed by Mattis is shown word for word, without the AI. It is matched on the question's wording or, on computers, on its meaning (similarity threshold calibrated at 0.92 on the test set).
- **Hybrid search**: keyword and meaning rankings are merged (reciprocal rank fusion), so a company name typed as is always counts.
- **Guard**: an AI answer citing a number, proper name, email or link that is not in the information it was given is rejected and replaced by the profile extract.

### Adapted to each device
- On phones or computers with little memory, only the smallest model is offered, with a shorter context and shorter answers. If the page crashes for lack of memory, the app detects it on reload and offers a lighter option.
- Without WebGPU, quick answers remain available: they show the profile passage that best matches the question.

### Bilingual
The whole interface, the profile content, the verified answers and the model's instructions exist in English and French. The chosen language applies to everything.

### A lively interface
Steps fade in. Saved answers are typed out word by word, like a generated answer. These animations are turned off when the visitor's system asks for reduced motion.

### A conversion funnel
The chatbot is designed to lead to contact: a pitch tailored to the position, suggested questions that highlight the strengths relevant to it, an always-visible contact button, a contact card at the right moment and a message ready to copy.

## Repository structure

| File | Content |
|---|---|
| `index.html` | Interface, onboarding steps, model loading, conversion funnel, visitor statistics setting (`STATS_CODE`) |
| `legal.html` | Legal notice and privacy policy (French and English), linked from the footer; keep it in line with what the site actually does (statistics, storage, third-party services) |
| `knowledge.js` | The profile in English: summary, sections, verified answers (`faq`), pitches per position (`roles`), funnel texts and contact details |
| `knowledge-fr.js` | The same in French, with the same `id`s |
| `retrieval.js` | Keyword and meaning search, verified answers, guard |
| `semantic.js` | Loading of the search-by-meaning model |
| `tests/` | Test questions and measurement script |
| `tests.html` | In-browser measurement of the search by meaning and threshold tuning |
| `CNAME` | GitHub Pages custom domain |

The content comes only from Mattis's CV and his two theses (a professional thesis on his two years of work-study, and a diploma thesis on finance without financial intermediaries).

## Editing the content
- Each section of `knowledge.js` has a `title`, `keywords` (words that trigger it) and a short `text` (150 to 250 words), because the model's context window is limited.
- Any change to `knowledge.js` must be mirrored in `knowledge-fr.js`.
- After adding verified answers, run `tests.html` again to check that no wrong answer appears.
