// Knowledge base for Mattis Fernandez's recruiter assistant.
// Everything here comes from Mattis's CV, work-study thesis (2023-2025) and diploma thesis.
// Edit freely: each section is retrieved by keywords and passed to the model as context.
// Keep each section short (about 150-250 words) so it fits in the model's context window.

window.PROFILE = {
  name: "Mattis Fernandez",
  headline: "Junior IT Project Manager (business-side / AMOA) · Open to Business Analyst roles",
  location: "Toulouse, France · open to relocation anywhere in France and abroad",
  linkedin: "https://www.linkedin.com/in/mattis-fernandez/",

  // Always sent to the model.
  core: `Mattis Fernandez is a junior IT project manager specialised in AMOA (the French term for the business-side project role that sits between business stakeholders and technical teams: gathering needs, writing specifications, steering vendors, testing and validating deliveries, training users). He holds the French RNCP level 7 (master's-level) title "Expert in Information Systems Management" (Expert en management des systèmes d'information), Data & Fintech option, from Epitech Digital School, completed in 2025 through a 2-year work-study programme. Experience: Fayat IT (2024-2025, application maintenance and evolution of the Fayat group's corporate website platform, vendor steering, user training), AT Internet / Piano (2023-2024, digital analytics consultant in customer support and training), Laboratoires Pierre Fabre (2022 internship, digital project manager). From November 2025 to October 2026 he spent a year in Australia on a Working Holiday Visa, working in English every day in multicultural teams. He is looking for a permanent position as an IT project manager and is also open to adjacent roles such as business analyst, AMOA consultant, product/project owner or BI/data-oriented project roles. Available immediately, mobile across France and internationally (eligible for the French V.I.E. international programme). Languages: French (native), English (B2, daily immersion in Australia). LinkedIn: https://www.linkedin.com/in/mattis-fernandez/`,

  sections: [
    {
      id: "availability",
      ask: "When can he start, and where?",
      title: "Availability, location and contract",
      keywords: ["available", "availability", "start", "when", "notice", "location", "based", "relocate", "relocation", "move", "mobility", "remote", "abroad", "international", "vie", "v.i.e", "contract", "permanent", "cdi", "visa", "toulouse", "france", "driving", "licence", "license", "travel", "country", "countries", "city", "europe", "uk", "london", "paris", "usa", "canada", "switzerland", "belgium", "hybrid", "onsite", "office", "telework", "wfh", "remotely", "home", "sector", "industry", "industries", "banking", "salary", "pay"],
      text: `Availability: Mattis is available immediately. Contract: he is looking for a permanent position (CDI in France). Location: based in Toulouse, France. Mobility: open to any location in France and to international positions; he is eligible for the V.I.E. (French international volunteer programme for young graduates working abroad for French companies). He has just completed a year in Australia (mainly Broome, Western Australia), which shows he can relocate and adapt quickly. Work mode: he prefers working on site; a hybrid setup with one remote day mid-week also suits him well. Sector: no strict preference, open to any industry, with a particular interest in banking and finance (fintech). Salary: it depends on the location, and Mattis prefers to discuss it directly with the recruiter. He holds driving licences B (car) and A2 (motorcycle).`
    },
    {
      id: "fayat",
      ask: "What did he do at Fayat IT?",
      title: "Fayat IT – Web consultant / AMOA project manager (work-study, 2024-2025, Bordeaux)",
      keywords: ["fayat", "tma", "tme", "maintenance", "cms", "ibexa", "website", "usine", "site", "factory", "clever", "age", "agency", "vendor", "supplier", "subcontractor", "specification", "specifications", "requirements", "kanban", "testing", "validation", "acceptance", "uat", "stakeholder", "stakeholders", "subsidiaries", "construction", "project", "management", "coordination", "amoa"],
      text: `Fayat IT is the IT department of the Fayat Group, France's largest independent construction group (over 5 billion euros revenue, 22,000+ employees, 170 countries; Fayat IT supports 16,000+ users). Mattis worked in the team running the TMA/TME (third-party application maintenance and evolution) of the "Usine à Site", a centralised CMS (Ibexa) that lets the group's subsidiaries build and manage their own corporate websites (around 80 websites on the platform). His role: collect, analyse and categorise subsidiaries' requests (bug fixes, evolutions, user support); prioritise them; write functional and technical specifications for the external web agency Clever Age; plan and track the agency's work in Jira (Kanban); test and validate deliverables before production; communicate releases to subsidiaries. He ran a needs-gathering survey with subsidiaries to build the CMS roadmap, managed disagreements between stakeholders by finding compromises, and helped make the validation process more structured. His rigour in checking the vendor's work was regularly highlighted.`
    },
    {
      id: "fayat-training",
      ask: "Tell me about the training platform he launched.",
      title: "Fayat IT – Training platform (LCMS) project he initiated",
      keywords: ["training", "lms", "lcms", "e-learning", "elearning", "platform", "initiative", "benchmark", "business", "case", "budget", "funding", "launch", "initiated", "proposal", "change", "adoption", "users", "documentation", "tutorial"],
      text: `On his own initiative at Fayat IT, Mattis proposed a blended training approach for the CMS contributors of the group's subsidiaries: an e-learning platform (LMS/LCMS) to teach the basics, so that in-person training sessions could focus on more specific, advanced needs. He audited the existing knowledge-transfer channels (a support chat channel, an internal tips site, in-person sessions run by his tutor, which he attended and gave feedback on), gathered needs, benchmarked e-learning solutions on the market, defined the target content (video tutorials, written guides, exercises, quizzes, progressive learning path), studied how to fund the project and make it sustainable, and recommended a solution in a business-case document for management, designed to scale to the whole Fayat Group. His work-study contract ended before the decision, so he did not see the rollout, but he took the project from idea to a documented recommendation entirely on his own initiative. This shows project initiation, auditing, benchmarking, business-case writing and change-management skills.`
    },
    {
      id: "atinternet",
      ask: "What did he do at AT Internet / Piano?",
      title: "AT Internet / Piano – Digital analytics consultant, customer support (work-study, 2023-2024, Mérignac)",
      keywords: ["at", "internet", "piano", "analytics", "support", "ticket", "tickets", "zendesk", "customer", "client", "clients", "saas", "tracking", "tagging", "debug", "debugging", "bug", "incident", "incidents", "escalation", "data", "dashboard", "dashboards", "gdpr", "rgpd", "privacy", "consent", "cmp", "web", "product", "owner"],
      text: `AT Internet (acquired by Piano in 2021) is a French leader in web analytics; its Analytics Suite is used on about 20,000 sites and apps, for clients such as major media, e-commerce, banks and public institutions, with a strong GDPR/ePrivacy focus. Mattis worked in technical support for Piano Analytics: handling client tickets in Zendesk (tracking-code implementation issues depending on site technology, consent-management-platform conflicts, dashboard and metrics bugs, feature questions, best-practice advice); analysing logs and account configurations; reproducing bugs and escalating them clearly to developers and Product Owners with reproduction steps, impacted data and screenshots, tracked in Jira; then guiding clients through fixes, sometimes providing code. He prioritised many simultaneous tickets by urgency and resolution time, ran video calls (max 30 minutes) for complex cases, and promoted new features to clients. This built strong skills in problem analysis, technical communication and translating between clients and engineering teams.`
    },
    {
      id: "atinternet-training",
      ask: "Has he trained users or clients?",
      title: "AT Internet / Piano – Client training and continuous improvement",
      keywords: ["training", "demo", "welcome", "onboarding", "teach", "trainer", "presentation", "faq", "guide", "guides", "video", "tutorials", "documentation", "continuous", "improvement", "process", "ai", "complaint", "session", "sessions", "client", "clients"],
      text: `At AT Internet / Piano, Mattis delivered the "Welcome Demo" onboarding session for new clients: about 30-minute sessions presenting the essential features of Piano Analytics, a live demo of tools and customisation, and Q&A, adapting the content through active listening. He contributed to continuous improvement of support: identifying recurring requests to create user guides and FAQs, updating technical documentation, writing, filming and editing video tutorials for the public Piano Analytics documentation (analytics-docs.piano.io), suggesting product improvements based on client feedback, optimising internal processes to reduce ticket resolution time, and a procedure using AI-based complaint detection to route unhappy clients to senior consultants or managers. Client feedback on the clarity of his explanations and materials was positive.`
    },
    {
      id: "why-pm",
      ask: "Why project management?",
      title: "Motivation and why project management",
      keywords: ["why", "motivation", "motivated", "leave", "left", "change", "passion", "interest", "career", "choose", "chose", "project", "management", "goal", "build", "story"],
      text: `Why project management: at AT Internet, Mattis enjoyed solving problems but support work meant only briefly touching other people's projects; he felt he was not building anything himself. In his own words, he felt like "a boat repairer helping explorers fix their ships so they can set off again, while wanting nothing more than to follow them." That is why he moved to Fayat IT to run longer-term projects, and it confirmed that he wants to be the one structuring and steering IT evolutions end to end: understanding business needs, turning them into specifications, coordinating teams and vendors, and delivering. He enjoys being the bridge between business users and technical teams, and his support and training background means he always keeps the end user in mind.`
    },
    {
      id: "pierre-fabre",
      ask: "What did he do at Pierre Fabre?",
      title: "Laboratoires Pierre Fabre – Digital project manager (internship, Feb-Aug 2022, Castres/Toulouse)",
      keywords: ["pierre", "fabre", "pharma", "pharmaceutical", "internship", "intern", "drupal", "wordpress", "content", "communication", "internal", "external", "benchmark", "competitive", "competitor", "marketing", "digital"],
      text: `From February to August 2022, Mattis was a digital project manager intern at Laboratoires Pierre Fabre (a major French pharmaceutical and dermo-cosmetics group), in Castres and Toulouse. He managed content on CMS platforms (Drupal and WordPress), ran internal and external digital communication, and carried out benchmarks and competitive analyses.`
    },
    {
      id: "australia",
      ask: "What did he do in Australia?",
      title: "Working Holiday in Australia (Nov 2025 - Oct 2026)",
      keywords: ["australia", "broome", "working", "holiday", "jobs", "mine", "mining", "taxi", "construction", "hospitality", "whv", "pvt", "gap", "year", "abroad", "multicultural", "international", "adaptability", "resilience", "travel", "cv"],
      text: `After graduating, Mattis spent November 2025 to October 2026 in Australia on a Working Holiday Visa, mainly in Broome (Western Australia). The jobs were non-IT jobs taken to fund the experience: meal delivery, taxi driver, nightclub waiter, construction worker, order picker, and "utility" worker at a mine site, where he rotated between gardening, cleaning, bartending and kitchen hand duties. He got up to speed quickly in many roles that were new to him, in multicultural teams, proving autonomous, reliable and hard-working, including in demanding environments like construction and mining with strict safety rules. He used English every day at work and experienced different management and working styles. For project management this brings adaptability, resilience, a strong work ethic, ease with people from all backgrounds and decision-making in uncertain contexts. It also explains the gap after his studies: a deliberate international experience, not inactivity.`
    },
    {
      id: "languages",
      ask: "How good is his English?",
      title: "Languages",
      keywords: ["language", "languages", "english", "french", "speak", "speaks", "fluent", "fluency", "bilingual", "level", "b2", "native", "communication"],
      text: `French is Mattis's native language. His English is at B2 level and strongly practised: he spent November 2025 to October 2026 working in Australia in multicultural teams, using English every day at work and in daily life. At AT Internet / Piano he also worked on an international analytics product and wrote English-language documentation and tutorials for the public Piano Analytics docs.`
    },
    {
      id: "education",
      ask: "What is his degree?",
      title: "Education",
      keywords: ["education", "degree", "diploma", "master", "masters", "msc", "school", "university", "epitech", "digital", "campus", "bachelor", "rncp", "expert", "information", "system", "systems", "level", "fintech", "data", "studies", "study", "bootcamp", "baccalaureate", "qualification", "work-study", "apprenticeship", "alternance"],
      text: `Education: Epitech Digital School, RNCP level 7 title (French master's-level qualification) "Expert in Information Systems Management" (in French: Expert en management des systèmes d'information), Data & Fintech option (2020-2022 and 2023-2025, the last two years as a work-study programme alternating school and company). The title covers business-needs analysis, functional/technical design, IS project management, validation and deployment, promoting digital transformation solutions. Project-based learning; data analysis (clustering, linear regression, pivot tables) with Python and Excel; built a banking app concept helping users manage their personal finances. Digital Campus, Bachelor "Digital Project Manager", web-marketing specialisation (2022-2023): Agile/Scrum methodology and cross-functional projects. Epitech Technology technical bootcamp (2019-2020). French Baccalauréat STI2D, option computer & digital systems (2019).`
    },
    {
      id: "skills",
      ask: "What are his technical skills?",
      title: "Skills and tools",
      keywords: ["skill", "skills", "tool", "tools", "technical", "tech", "stack", "python", "sql", "c", "javascript", "html", "css", "docker", "git", "github", "linux", "power", "bi", "powerbi", "excel", "agile", "scrum", "jira", "confluence", "seo", "ui", "ux", "cms", "drupal", "wordpress", "code", "coding", "programming", "methodology", "certification", "certifications", "certified", "pmp", "psm", "prince2"],
      text: `Project management: AMOA, Agile and Scrum, Kanban, Jira and Confluence, TMA/TME (application maintenance and evolution), web project steering, requirements gathering and specifications, vendor management, testing and acceptance, user training design, benchmarking and competitive analysis, business cases. Technical: Python, SQL, C, JavaScript, HTML, CSS, Docker, Git/GitHub, Linux; enough technical depth to discuss with developers credibly, analyse logs and debug tracking implementations. Data and tools: Power BI, Piano Analytics, Excel (pivot tables), CMS (Ibexa, Drupal, WordPress), SEO, UI/UX. Awareness of GDPR/ePrivacy compliance and web security good practices. He does not hold a formal project-management certification (such as PSM, PMP or PRINCE2) at the moment; his methods come from his degree programmes and hands-on practice. He is open to taking certifications if the role requires it.`
    },
    {
      id: "business-analyst",
      ask: "Is he a good fit for a business analyst role?",
      title: "Fit for business analyst and adjacent roles",
      keywords: ["business", "analyst", "ba", "analysis", "product", "owner", "po", "consultant", "functional", "requirements", "bi", "intelligence", "data", "fit", "suitable", "role", "roles", "position", "adjacent", "pmo"],
      text: `Beyond IT project manager roles, Mattis is a strong fit for business analyst, AMOA/functional consultant, product owner or PMO-type roles, and data/BI-oriented projects. Evidence: at Fayat IT he gathered and formalised business needs from many subsidiaries (survey, meetings, shared channel), prioritised them, wrote specifications, and validated deliveries against requirements; at AT Internet he analysed client problems, logs and configurations, reproduced bugs and wrote precise escalations for developers and Product Owners; his degree is in Data & Fintech with hands-on data analysis (Python, Excel, Power BI, Piano Analytics). In his thesis he named three career directions that attract him: IT project management (MOA/AMOA, TMA, digital transformation), user-relationship / needs-gathering roles, and business intelligence and data management. Longer term he aims to grow toward managerial positions, and he would love to manage projects in fintech.`
    },
    {
      id: "strengths",
      ask: "Why should we hire him?",
      title: "Strengths and soft skills (with feedback received)",
      keywords: ["strength", "strengths", "quality", "qualities", "soft", "personality", "describe", "colleagues", "feedback", "team", "teamwork", "rigour", "rigorous", "learn", "learner", "fast", "pressure", "stress", "punctual", "reliable", "ethics", "hire", "should", "best", "value"],
      text: `Strengths confirmed by colleagues and managers during his work-study years: fast learner (quickly operational on Piano Analytics and on the Fayat CMS, never told he was slow to ramp up); analytical rigour and attention to detail (structured subsidiaries' requests for the agency, quickly spotted inconsistencies in deliverables, praised for checking the vendor's work); calm and methodical under pressure (critical client issues, peaks of requests, running the training project in parallel); punctual, reliable and professional; positive attitude (a colleague told him: "You're always smiling and in a good mood, it's great to have someone like you on the team"); learns from feedback and rarely repeats a mistake. CV qualities: rigour, collaborative spirit, resilience, ability to step back, ethics. Why hire him: he combines technical credibility (Python, SQL, Docker, debugging) with business-facing skills (needs analysis, specs, vendor steering, training), so he translates well between business and tech.`
    },
    {
      id: "growth",
      ask: "What is he working on improving?",
      title: "Areas he is actively improving",
      keywords: ["weakness", "weaknesses", "improve", "improvement", "development", "areas", "fail", "failure", "mistake", "difficult", "challenge", "challenges", "struggle"],
      text: `Areas Mattis identified himself and is actively working on: (1) prioritisation, since he sometimes wants to handle too many tasks at once; he is reading about and practising prioritisation and productivity methods. (2) Following dense meetings: when meetings increased at Fayat IT, he built a structured note-taking method, writes a summary of decisions and actions after each meeting, uses Jira and Confluence to track actions, and asks clarifying questions at the end of meetings. (3) Speaking up in large groups and integrating fast into a new team: he deliberately invests in informal moments and reaches out early; his year working in varied teams in Australia accelerated this. He shows self-awareness and concrete action plans rather than fixed weaknesses.`
    },
    {
      id: "thesis-fintech",
      ask: "What was his thesis about?",
      title: "Diploma thesis: fintech and doing without state financial institutions",
      keywords: ["thesis", "dissertation", "research", "fintech", "finance", "financial", "blockchain", "crypto", "cryptocurrency", "defi", "decentralized", "decentralised", "smart", "contract", "contracts", "neobank", "neobanks", "bank", "banking", "microcredit", "microfinance", "loan", "loans", "lending", "artisans", "shopkeepers", "ngo", "react"],
      text: `For his diploma, Mattis wrote an exploratory thesis: "How can fintech reduce our dependence on state financial institutions?" Using a mixed quantitative and qualitative methodology (public studies, expert and client testimonies, APA citations), he reviewed four areas: French artisans and shopkeepers and their relationship with banks (e.g. bakers hit by energy-price spikes), decentralised finance (DeFi) lending, neobanks/fintech business models, and NGO microcredit. He then specified a platform: a web and mobile app (React) offering collateral-backed loans, "solidarity loans" where customers fund a local artisan's liquidity pool at a rate set by the artisan, and microcredit pools for NGOs with rates computed from default rates, automated by smart contracts, with personal and business accounts, wallets and pool dashboards. He wrote full functional and technical specifications and reflected on limits (user risk, fraud and identity verification, need for intermediaries). It shows his ability to research a complex domain, structure a problem and turn it into product specifications.`
    },
    {
      id: "interests",
      ask: "What does he do outside work?",
      title: "Personal interests",
      keywords: ["hobby", "hobbies", "interests", "interest", "free", "time", "sport", "sports", "photography", "football", "rugby", "handball", "gym", "cars", "motorcycle", "personal", "outside", "fun"],
      text: `Outside work, Mattis enjoys photography, team sports (football, rugby, handball), weight training, cars and motorcycles, and keeping up with technology trends (tech watch). Team sports reflect his collaborative spirit; tech watch reflects his curiosity about new tools and innovation, including fintech.`
    },
    {
      id: "contact",
      ask: "How can I contact him?",
      title: "Contact and next steps",
      keywords: ["contact", "reach", "email", "phone", "call", "interview", "linkedin", "cv", "resume", "meet", "meeting", "compensation", "expectations", "references"],
      text: `The best way to contact Mattis is through LinkedIn: https://www.linkedin.com/in/mattis-fernandez/ . He can also be reached by email at mattis.fernandez31@gmail.com. He is available immediately for interviews. Topics such as salary expectations (which depend on the location), references or exact start date are best discussed with him directly.`
    }
  ],

  // Validated answers: shown word for word, without the AI, when a question matches one of `q`.
  // An entry whose id is a section id also answers that section's `ask` question (the suggestion buttons).
  // `section` says which part of the profile the answer comes from.
  faq: [
    {
      id: "pitch", section: "strengths",
      q: ["Give me a 30-second pitch of Mattis.", "Who is Mattis?", "Summarize his profile.", "Tell me about Mattis.", "Can you introduce him?", "What is his background?"],
      a: `Mattis is a junior **IT project manager** (business-side / AMOA) with a master's-level degree in Data & Fintech. During two years of work-study he steered the maintenance and evolution of the Fayat group's website platform (around 80 sites) with an external agency, and before that handled client support and training at AT Internet / Piano, a web analytics leader. He then spent a year working in English in Australia. He is **available immediately** and open to relocation.`
    },
    {
      id: "strengths", section: "strengths",
      q: ["Why should we hire him?", "What are his strengths?", "What makes him a good candidate?", "What are his main qualities?", "How would his colleagues describe him?"],
      a: `Three reasons:
- **He bridges business and tech**: he gathers needs and writes specifications, and he has enough technical depth (Python, SQL, Docker, debugging) to be credible with developers.
- **He is rigorous**: at Fayat IT he was regularly praised for checking the external agency's deliveries and spotting inconsistencies.
- **He learns fast and takes initiative**: quickly operational at Piano and Fayat, he launched an e-learning project on his own initiative.
Colleagues also mention his calm under pressure and his positive attitude.`
    },
    {
      id: "fayat", section: "fayat",
      q: ["What did he do at Fayat IT?", "Tell me about his experience at Fayat.", "What was his role at Fayat?", "Has he managed an IT project?", "Has he worked with vendors or external agencies?"],
      a: `At **Fayat IT** (IT department of France's largest independent construction group), Mattis worked on the maintenance and evolution of the "Usine à Site", a CMS hosting around **80 subsidiary websites**. He collected and prioritised the subsidiaries' requests, wrote functional and technical specifications for the external agency Clever Age, tracked its work in Jira (Kanban), tested and validated deliveries before production, and communicated releases. He also ran a needs survey to build the CMS roadmap.`
    },
    {
      id: "fayat-training", section: "fayat-training",
      q: ["Tell me about the training platform he launched.", "Has he launched a project on his own initiative?", "What was the e-learning project?", "Tell me about the LMS project."],
      a: `On his own initiative at Fayat IT, Mattis proposed an **e-learning platform** to teach CMS contributors the basics, so in-person sessions could focus on specific needs. He audited the existing knowledge-sharing channels, benchmarked e-learning solutions, defined the content and recommended a solution in a business case for management. His work-study contract ended before the decision, but he took the project from idea to a documented recommendation on his own.`
    },
    {
      id: "atinternet", section: "atinternet",
      q: ["What did he do at AT Internet / Piano?", "What did he do at Piano?", "Tell me about his support experience.", "What was his role at AT Internet?"],
      a: `At **AT Internet / Piano**, a French web analytics leader, Mattis was a digital analytics consultant in technical support. He handled client tickets in Zendesk (tracking implementation, consent management conflicts, dashboard bugs), analysed logs and configurations, reproduced bugs and escalated them clearly to developers and Product Owners in Jira, then guided clients through the fix. He learned to prioritise many tickets at once and to explain technical issues clearly.`
    },
    {
      id: "atinternet-training", section: "atinternet-training",
      q: ["Has he trained users or clients?", "Does he have training experience?", "Can he run presentations or demos?"],
      a: `Yes. At AT Internet / Piano, Mattis ran the **"Welcome Demo"** onboarding sessions for new clients (about 30 minutes: key features, live demo, Q&A). He also wrote user guides and FAQs, and wrote, filmed and edited video tutorials for the public Piano Analytics documentation. Clients gave positive feedback on how clear his explanations were. At Fayat IT he proposed an e-learning platform for the group's website contributors.`
    },
    {
      id: "why-pm", section: "why-pm",
      q: ["Why project management?", "Why does he want to be a project manager?", "What motivates him?", "Why did he leave support?"],
      a: `In support at AT Internet, Mattis enjoyed solving problems but only briefly touched other people's projects. In his words, he felt like "a boat repairer helping explorers fix their ships, while wanting nothing more than to follow them." He moved to Fayat IT to run longer-term projects, which confirmed that he wants to structure and steer IT evolutions end to end, as the bridge between business users and technical teams.`
    },
    {
      id: "pierre-fabre", section: "pierre-fabre",
      q: ["What did he do at Pierre Fabre?", "Tell me about his internship.", "What was his first experience?"],
      a: `From February to August 2022, Mattis was a **digital project manager intern** at Laboratoires Pierre Fabre, a major French pharmaceutical and dermo-cosmetics group. He managed content on Drupal and WordPress, ran internal and external digital communication, and carried out benchmarks and competitive analyses.`
    },
    {
      id: "australia", section: "australia",
      q: ["What did he do in Australia?", "Why is there a gap after his studies?", "What has he been doing since graduating?", "What did he do during his working holiday?"],
      a: `After graduating, Mattis spent November 2025 to October 2026 in **Australia** on a Working Holiday Visa, mainly in Broome. He took non-IT jobs to fund the experience (meal delivery, taxi driver, waiter, construction, order picking, utility worker at a mine site), working in English every day in multicultural teams. It was a deliberate international experience, and it built adaptability, resilience and a strong work ethic.`
    },
    {
      id: "languages", section: "languages",
      q: ["How good is his English?", "What languages does he speak?", "Does he speak English?", "Can he work in English?"],
      a: `French is his native language and his English is **B2**, strongly practised: he spent a year working in Australia in multicultural teams, using English every day. At AT Internet / Piano he also wrote English documentation and tutorials for the public Piano Analytics docs.`
    },
    {
      id: "education", section: "education",
      q: ["What is his degree?", "What did he study?", "Which school did he go to?", "What are his qualifications?"],
      a: `Mattis holds the **RNCP level 7 title "Expert in Information Systems Management"** (French master's level), **Data & Fintech** option, from Epitech Digital School (2025), the last two years as a work-study programme. Before that: a Bachelor "Digital Project Manager" at Digital Campus (Agile/Scrum, cross-functional projects), an Epitech Technology bootcamp, and a French Baccalauréat STI2D in computer and digital systems.`
    },
    {
      id: "skills", section: "skills",
      q: ["What are his technical skills?", "What tools does he use?", "Does he know Agile or Scrum?", "Can he code?", "What is his tech stack?"],
      a: `- **Project management**: AMOA, Agile/Scrum, Kanban, Jira, Confluence, specifications, vendor steering, testing and acceptance.
- **Technical**: Python, SQL, C, JavaScript, HTML, CSS, Docker, Git, Linux.
- **Data and tools**: Power BI, Piano Analytics, Excel (pivot tables), CMS (Ibexa, Drupal, WordPress), SEO, UI/UX.
He also knows GDPR/ePrivacy compliance basics.`
    },
    {
      id: "certifications", section: "skills",
      q: ["Does he have certifications?", "Is he PMP or PSM certified?", "Does he hold a Scrum certification?", "Is he certified?"],
      a: `Not at the moment: Mattis does not hold a formal project-management certification such as PSM, PMP or PRINCE2. His methods come from his degrees and hands-on practice (Agile/Scrum, Kanban, Jira). He is **open to taking certifications** if the role requires it.`
    },
    {
      id: "business-analyst", section: "business-analyst",
      q: ["Is he a good fit for a business analyst role?", "Could he work as a business analyst?", "Is he open to other roles?", "Would he consider a product owner role?"],
      a: `Yes. Beyond IT project manager roles, Mattis fits **business analyst**, AMOA/functional consultant, product owner and data/BI project roles. At Fayat IT he gathered and formalised business needs, wrote specifications and validated deliveries; at AT Internet he analysed client problems and wrote precise bug reports; and his degree is in Data & Fintech. Longer term he aims for managerial roles, ideally on fintech projects.`
    },
    {
      id: "availability", section: "availability",
      q: ["When can he start, and where?", "When is he available?", "Is he willing to relocate?", "Where is he based?", "What kind of contract is he looking for?"],
      a: `Mattis is **available immediately** and looking for a permanent position. He is based in Toulouse, open to any location in France and abroad, and eligible for the V.I.E. programme. He has just shown he can relocate quickly with a year in Australia.`
    },
    {
      id: "remote", section: "availability",
      q: ["Does he want to work remotely?", "Is he open to hybrid work?", "Does he prefer remote or on site?", "How many remote days does he want?"],
      a: `Mattis prefers working **on site**. A hybrid setup with **one remote day mid-week** also suits him well.`
    },
    {
      id: "sector", section: "availability",
      q: ["Which industry does he want to work in?", "Does he have a sector preference?", "Is he interested in banking?"],
      a: `He has no strict sector preference and is open to any industry, with a **particular interest in banking and finance (fintech)**, the field of his degree and his diploma thesis.`
    },
    {
      id: "salary", section: "availability",
      q: ["What are his salary expectations?", "How much does he want to earn?", "What salary is he looking for?"],
      a: `It depends on the location, and Mattis prefers to discuss salary **directly with you**. Click "Get his contact details" to reach him.`
    },
    {
      id: "growth", section: "growth",
      q: ["What is he working on improving?", "What are his weaknesses?", "What are his areas for improvement?"],
      a: `Mattis named three areas himself and works on each: **prioritisation** (he sometimes wants to handle too much at once, so he practises prioritisation methods), **following dense meetings** (structured notes, a summary of decisions and actions after each meeting, tracking in Jira and Confluence), and **speaking up in large groups** (he reaches out early; his year in varied teams in Australia helped a lot).`
    },
    {
      id: "thesis-fintech", section: "thesis-fintech",
      q: ["What was his thesis about?", "Tell me about his research.", "Does he know fintech?"],
      a: `His diploma thesis asked: "How can fintech reduce our dependence on state financial institutions?" He studied French artisans' relationship with banks, DeFi lending, neobanks and NGO microcredit, then specified a web and mobile platform (React) with collateral-backed loans, "solidarity loans" funding local artisans, and microcredit pools, automated by smart contracts. It shows he can research a complex domain and turn it into product specifications.`
    },
    {
      id: "interests", section: "interests",
      q: ["What does he do outside work?", "What are his hobbies?", "What are his interests?"],
      a: `Outside work, Mattis enjoys photography, team sports (football, rugby, handball), weight training, cars and motorcycles, and he follows technology trends closely, including fintech.`
    }
  ],

  // Contact details shown at the end of the funnel. Leave a field empty ("") to hide it.
  contact: {
    linkedin: "https://www.linkedin.com/in/mattis-fernandez/",
    email: "mattis.fernandez31@gmail.com",
    phone: "",
    cv: "" // e.g. "cv.pdf" placed next to index.html; "" hides the download button
  },

  // Conversion funnel: hook -> recruiter's need -> tailored pitch -> proof -> contact.
  roles: [
    {
      id: "pm", label: "IT Project Manager",
      match: /project manag|chef de projet|\bpm\b|delivery|it project|digital project|web project|tma/i,
      focus: ["fayat", "fayat-training", "strengths", "availability"],
      pitch: `Great, that's exactly the role Mattis is targeting. Three reasons he fits:
- **He has already run IT projects end to end**: at Fayat IT he managed the maintenance and evolution of the group's corporate-website platform (around 80 websites), from gathering subsidiaries' needs to writing specs, steering the external agency in Jira and validating releases.
- **He launches projects on his own initiative**: he proposed an e-learning platform for the group's website contributors, audited the existing setup, benchmarked solutions and recommended one in a business case for management.
- **He bridges business and tech**: a Data & Fintech master's-level degree plus hands-on Python, SQL and Docker, so developers and business users both take him seriously.
He is available immediately and open to relocation.`
    },
    {
      id: "ba", label: "Business Analyst",
      match: /business analys|\bba\b|analyst|functional|requirements|amoa|consultant/i,
      focus: ["business-analyst", "atinternet", "fayat", "skills"],
      pitch: `Good match: needs analysis is at the heart of what Mattis has done. Three reasons he fits:
- **He turns business needs into specifications**: at Fayat IT he collected, prioritised and formalised requests from the group's subsidiaries and wrote the specs the development agency built from.
- **He is analytical and precise**: at AT Internet / Piano he diagnosed client issues from logs and configurations and wrote clear bug reports for developers and Product Owners.
- **He is data-literate**: Data & Fintech degree, Python, SQL, Excel, Power BI and Piano Analytics.
He is available immediately and open to relocation.`
    },
    {
      id: "po", label: "Product Owner / AMOA",
      match: /product owner|\bpo\b|product manag|scrum|agile|amoa|moa/i,
      focus: ["fayat", "atinternet", "atinternet-training", "skills"],
      pitch: `Mattis has worked right where a Product Owner sits. Three reasons he fits:
- **Backlog and delivery**: at Fayat IT he prioritised evolution and bug requests, wrote specifications and tracked an external dev agency in Jira (Kanban) through to acceptance testing.
- **Close to users**: two years of support and training (Piano Analytics clients, Fayat subsidiaries) taught him what users actually need.
- **Agile training**: Agile/Scrum methodology in his Bachelor and Master's programmes, Jira and Confluence daily.
He is available immediately and open to relocation.`
    },
    {
      id: "data", label: "Data / BI project",
      match: /data|\bbi\b|business intelligence|analytics|power bi|reporting|fintech|finance|bank/i,
      focus: ["atinternet", "skills", "education", "thesis-fintech"],
      pitch: `Data and fintech are where Mattis's degree and interests lie. Three reasons he fits:
- **Analytics experience**: a year at AT Internet / Piano, a leader in web analytics, debugging tracking, dashboards and metrics for large clients.
- **Data skills**: Master's-level degree in Data & Fintech, Python, SQL, Excel pivot tables, Power BI, clustering and regression projects.
- **Fintech depth**: his diploma thesis specified a full solidarity-lending platform (DeFi, neobanks, microcredit).
He is available immediately and open to relocation.`
    },
    {
      id: "other", label: "Another role",
      match: null,
      focus: ["strengths", "skills", "fayat", "availability"],
      pitch: `Happy to help you see whether Mattis fits. In short: he is a junior IT project manager with two years of work-study in IT (Fayat IT, AT Internet / Piano), a master's-level degree in Data & Fintech, strong analytical rigour and a year of working in English in Australia. Tell me a bit about the role and I'll point you to the most relevant experience.`
    }
  ],

  funnel: {
    welcome: `Hi! I'm Mattis Fernandez's assistant. Mattis is a junior **IT project manager** with a master's-level degree in Data & Fintech, two years of work-study at **Fayat IT** and **AT Internet / Piano**, and a year working in English in Australia. He is **available immediately**.`,
    explore: `What would you like to know about him? Pick a topic below or type your question.`,
    customPitch: `Thanks! Here is, in short, what Mattis can bring to a **{role}** position: he is a junior IT project manager with two years of work-study in IT (Fayat IT, AT Internet / Piano), a master's-level degree in Data & Fintech, strong analytical rigour and a year of working in English in Australia. Ask me about any part of his experience, or pick a topic below.`,
    ctaAfterAnswers: 3,
    intent: /contact|reach|email|e-mail|phone|call|interview|meet|cv|resume|résumé|hire|interested|available|availability|start|salary|next step|linkedin/i,
    cta: `Sounds like Mattis could be a good match. He is available immediately and happy to talk.`,
    message: `Hello Mattis, I came across your profile through your recruiting assistant. I'm recruiting for {role} and would like to discuss it with you. Are you available for a call this week?`,
    messageGeneral: `Hello Mattis, I came across your profile through your recruiting assistant and would like to talk with you about possible opportunities. Are you available for a call this week?`
  }
};
