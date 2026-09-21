# Contact Information
* **Name:** Vrishab Nair
* **Email:** vrishabnair44@gmail.com
* **Phone:** +91-9963894342
* **Links:** LinkedIn | GitHub | Portfolio

# Summary
I'm Vrishab Nair, a builder focused on AI tooling and automation. I was the **founding GTM engineer at SpeechifyAI** (Jun 2026 – Sep 2026), the B2B voice-AI platform, where I built the company's entire revenue system from zero: no CRM, no pipeline and no acquisition channel existed when I joined, and it ended up sourcing $40K in booked revenue and $105K in pipeline. Most of that work was code, not process: six production agents on Google Cloud Run, an approval-first inbound service, a funnel audit across PostHog and Attio, two open-source TTS integrations on npm and GitHub, and the speechify.ai marketing site. Before Speechify I did GTM engineering at Zenskar, a B2B billing-automation startup, where I grew AI-assistant referral traffic and won AI Overview citations for competitive billing queries. Outside of GTM work I won Track 1 of the VoiceMOS Challenge 2026, an international speech-quality benchmark, which is also my first research paper. I study a dual degree in Physics and Electrical Engineering at BITS Pilani, Hyderabad, and I lead 180 Degrees Consulting on campus.

# Education
## BITS Pilani, Hyderabad Campus
* **Degree:** Dual Degree in M.Sc. Physics and B.E. Electronics and Electrical Engineering
* **Timeline:** Aug 2023 – Present

# Professional Experience
## Founding GTM Engineer at SpeechifyAI
* **Timeline:** Jun 2026 – Sep 2026
* Built the first revenue system for the B2B voice-AI vertical (TTS API and Voice Agents) end to end, starting with no CRM, no pipeline and no acquisition channel. Stood up 8 channels solo (Attio CRM, inbound, outbound, lifecycle email, newsletters, Google Ads, LinkedIn Ads), which sourced $40K in booked revenue and $105K in pipeline.
* Built and deployed 6 production agents on Google Cloud Run that handle the research and CRM upkeep around every sales call: pre-call briefings, deal proposals from meetings, call-transcript intelligence written back to CRM fields, transcript-to-task handoffs, task digests, and tiered signup alerts. They run on schedulers daily for the whole SpeechifyAI team.
* Built speed-to-lead, an approval-first inbound service (FastAPI, Firestore, Slack, Gmail API) that screens each inbound form fill with an LLM, enriches the account with a free-first chain (Scrapling, Serper, Apify), drafts outreach, and posts a Slack approval card with live calendar slots before anything sends. First touch dropped from a business day to roughly 30 seconds.
* Ran a signup funnel audit (an audit of the self-serve funnel end to end) over 1,587 signups across PostHog and Attio, and found leaks at every stage: checkout completing at 14.5%, 12.6% of signups traced to a single fraud operation running on 18 mail-only domains, and 26 companies that reached checkout, never paid, and had never been contacted.
* Opened a developer acquisition channel by publishing **@speechify/vercel** to npm and **pipecat-speechify** to GitHub, making Speechify TTS a native provider inside the Vercel AI SDK and Pipecat voice-agent framework, then fixed the User-Agent bug that was hiding all AI-SDK traffic from the API's own attribution.
* Owned the speechify.ai marketing site after proving the company was absent from 4 of 4 buying-intent LLM answers despite ranking #1 on the Artificial Analysis TTS leaderboard. Rebuilt the comparison, alternatives, paid-landing and developer-hub clusters in Astro and Tailwind, wired to Google Search Console and GA4 funnels.
* Built the outbound signal layer: LinkedIn post-engager mining, job-posting buyer-intent tracking, and competitor-affiliate harvesting, each suppressed against Firestore contact history so no prospect is contacted twice.

## GTM Engineer Intern at Zenskar
* **Timeline:** Feb 2026 – June 2026
* Built marketing-as-engineering tooling for a B2B SaaS finance-automation company, automating weekly traffic and inbound-demo reporting end to end and saving the marketing team ~7 hours every week.
* Built a marketing-analytics MCP server exposing 80+ read-only tools across Google Search Console, GA4, Google Ads, HubSpot, and Bing (deployed on Google Cloud Run), so the team could query SEO, traffic, ads, and CRM data conversationally instead of pulling CSVs by hand.
* Optimized unbranded content for Answer Engine Optimization (AEO), winning Google AI Overview citations for high-intent queries like "Chargebee alternatives," "Zuora alternatives," and "best complex usage-based billing software" — work attributed to ~$50K in sourced pipeline.
* Grew LLM / AI-assistant referral traffic from 220 to 546 monthly visits, climbing ~34% week over week.

# Projects Built at SpeechifyAI
Built during the SpeechifyAI role, alongside the work listed under Professional Experience.

**Speechify Signal Room** | *Python, Attio, Slack, Scrapling, Apify, Gemini*
* Built a human-reviewed buying-signal queue for the sales team: bounded watchers track target accounts for hiring, website and LinkedIn changes, and every signal lands in Slack for a person to accept or reject rather than firing outreach automatically.
* Designed it so watchers may only APPEND evidence and never overwrite ownership, routing or suppression fields, which keeps the CRM the single system of action and makes an agent mistake recoverable.
* The first collection for any watcher is stored as a baseline and deliberately produces no alert, so switching on a new account cannot flood the channel with its entire history.
* Free scraping paths were benchmarked against paid actors before spending anything: the free path returned correct company headcount, so paid enrichment was reserved for qualified finalists only.

**Plain Support Router** | *Python, GraphQL, Plain, Slack*
* Built the routing layer for Speechify's support inbox: classifies each incoming thread and routes it to the right owner, and re-triages when a follow-up message changes what the thread is actually about.
* Live in production and handling real customer threads.

**Outbound Metrics Dashboard** | *Next.js, Vercel, Attio, Google Ads, PostHog*
* Built and deployed the dashboard the revenue team uses to see pipeline by channel, joining CRM records against ad spend and product analytics in one view.
* Traced paid-search spend to real pipeline value through in-ad lead forms after proving the site's own forms captured nothing that could attribute a click to a dollar.

**speechify.ai Comparison & Alternatives Clusters** | *Astro, Tailwind, Google Search Console, GA4*
* Designed and shipped the public comparison, alternatives and partner pages on speechify.ai, including an interactive cost calculator that prices a real workload against competitor rates.
* Wrote them to be honest about where competitors are genuinely better, on the argument that a comparison page a buyer does not trust is worth nothing.

# Personal & Side Projects
Built independently, on my own time. These are not work for any employer.

**Portfolio RAG AI** | *Next.js 16, react-three-fiber, Pinecone, Cohere, Groq*
* Built the portfolio you are reading: a 3D spatial scene where every project is an orb you can drag, throw and open, with an assistant that answers recruiter questions in my own voice.
* Engineered hybrid retrieval: dense vectors in **Pinecone**, a client-side **BM25** pass for exact terms the embeddings miss, fused with Reciprocal Rank Fusion and reranked by **Cohere**.
* Streams answers from **Groq** with a sandwiched anti-fabrication prompt, so it refuses to invent a company, date or metric that is not in the indexed resume.
* One command regenerates the whole knowledge layer from a single markdown file: the vector index, the BM25 mirror, and the public llms.txt that AI crawlers read.

**Agent Continuity Broker** | *Python, SQLite, MCP*
* Built a shared local memory so Claude Code, Codex and Antigravity can resume each other's work: task prompts, conclusions, test results, errors and git state, keyed by git worktree and branch.
* Deliberately makes **zero model, embedding or network calls**. It is hooks and a SQLite file, so it costs nothing to run and cannot leak a repository to a third party.
* Redacts credentials, suppresses output from sensitive paths, stamps test evidence with the git state that produced it, and marks that evidence stale when the state moves.

**PM Coach AI** | *Llama 7B, Unsloth, ChromaDB, Python*
* Developed a specialized AI mentor for aspiring Product Managers, capable of conducting mock interviews.
* Fine-tuned **Llama 7B** using **Unsloth** on a dataset of 3,000+ FAANG product management interview questions.
* Built a RAG pipeline with **ChromaDB** to index curated product strategy literature, reducing hallucinations by 40%.
* Deployed the model to provide actionable feedback on user responses, mimicking a Senior PM's coaching style.

**Hotel Booking RAG Chatbot** | *Redis, TypeScript, Vercel, RAG*
* Engineered a custom multi-layer caching system using **Redis** to reduce repeat query response times by **90%** and significantly lower LLM token usage.
* Developed a high-context **RAG pipeline** that retrieves hotel data and dynamically applies business logic to reduce travel package prices by **30-40%**.
* Built robust rate-limiting middleware and a centralized content filtering system to prevent API abuse and ensure brand safety.
* Refactored frontend state management to enable a seamless "streaming-like" user experience for complex itinerary generation.

**Dynamic QR Code Generator** | *Python (Flask), Chart.js, Pillow, CSV/JSON*
* Developed a custom **Dynamic QR Code Generator** enabling real-time URL updates without changing the physical QR code.
* Engineered an interactive **analytics dashboard** with Chart.js to visualize traffic patterns and categorize scans by device type (iOS, Android, Desktop).
* Implemented a "Design Studio" feature using **qrcode** and **Pillow** libraries to generate custom-branded, hex-color customizable QR codes.
* Designed a lightweight, file-based persistence layer using JSON and CSV for relational mapping and high-throughput logging.

**Resume Optimization Engine** | *Python, LangChain, Pinecone, Gemini, Groq*
* Architected a **RAG-based resume optimization engine** reducing hallucination rates by providing LLMs with retrieved high-quality semantic examples.
* Implemented a **hybrid multi-LLM pipeline** leveraging Google Gemini for embeddings and Groq (Llama 3) for sub-second inference (<200ms).
* Developed a **semantic search system** with cosine similarity to match user experience against top-tier resume bullets, improving recommendation relevance.

**VC Outreach Automation** | *n8n, Serper.dev, Groq*
* Architected **n8n workflow** to automate lead research on VCs, reducing manual research time by **90%** via **Serper.dev**.
* Implemented personalized hook generation using **Groq LLMs** to draft context-rich outreach emails for Seed to Series A founders.
* Built a B2B Research & Personalization Engine capable of scalable, automated outreach with high relevance.

**Sentiment Auto-Router** | *n8n, NLP, Webhooks, Automation*
* Engineered an autonomous workflow to process anonymous student letters for a campus support group.
* Integrated **NLP sentiment analysis** to automatically filter toxic content and flag critical messages for human review.
* Routed positive messages to digital display boards via Webhooks, boosting operational efficiency by **200%** and eliminating manual moderation bottlenecks.

**AI DJ** | *Python, allin1 (neural structure analysis), ffmpeg, Spotify API*
* Built a CLI that turns a Spotify playlist or local audio folder into one continuous, structure-aware DJ mix.
* Analyzes each track's structure with a neural model to pick transition points, then applies varied transition styles (bass swaps, filter sweeps, echo-outs, slam cuts).
* Caches per-track analysis and exports a final MP3 plus a cue sheet; runs a lighter classical-analysis path on weak machines.

**Reddit Intent Engine** | *Python, Groq, Supabase, Serper*
* Built a multi-stage pipeline that watches Reddit, Hacker News, and Stack Overflow for posts discussing a target pain point.
* Runs a two-stage Groq LLM classifier under strict rate-limit budgets to score relevance and bucket each hit by intent, deduping through Supabase.
* Posts the highest-intent hits to Slack with daily digests.

# Research
## VoiceMOS Challenge 2026 winner (Track 1), and my first research paper
* **Stack:** PyTorch, Whisper, WhisperMOSNet, DNSMOS/NISQA/SQUIM
* **Won Track 1 of the VoiceMOS Challenge 2026**, the international benchmark for predicting how good synthetic speech sounds to human listeners. My system paper for it is my first research paper.
* Built the winning entry as a zero-shot predictor: it scores speech quality without ever seeing an in-domain human rating, combining a Whisper-based model with an ensemble of existing quality metrics.
* Reached **0.7434 ACR** and **0.4960 CCR** utterance-level Spearman correlation against human mean-opinion scores.
* Found a side result the challenge does not measure: the same quality score predicts when speech recognition will fail on a clip (correlation -0.51), which turns a subjective quality metric into a usable reliability gate for an ASR pipeline.
* Written with a collaborator, who contributed the clinical retrieval half of the paper.

# Leadership & Volunteering
## President at 180 Degrees Consulting (BITS Hyderabad)
* **Timeline:** Aug 2025 – Present
* Managing a team of 25+ consultants to deliver pro-bono consulting to 8+ non-profits, executing market research, GTM strategies, and pricing analysis projects.
* Launched 'Consulting 101' training program covering Automations, Design, Lead Generation, and Data Analytics, up-skilling 130+ students across campus.

## Lead at Student's Anonymous (NSS BITS Hyderabad)
* **Timeline:** Aug 2025 – Present
* Leading a 22-member peer support team providing confidential counseling for students facing loneliness, harassment, addiction, and depression.
* Organized 6 mental health awareness events including human libraries and workshops, reaching 300+ students and establishing a campus-wide support network.

## Social Media Lead at Dept. of Publicity and Public Relations
* **Timeline:** Sep 2023 – Feb 2025
* Managed ATMOS 2024 Instagram account (8,000+ followers) as sole content creator, developing social media strategy and content calendar.
* Executed influencer partnerships and paid ad campaigns that drove 3M+ reach and generated Rs. 19 Lakhs in ticket sales (78% increase YoY).

# Achievements & Certifications
* **3rd Place:** ReTHINK IDEATHON, IIIT Hyderabad [2025]
* **4th Place:** ProdX, IIT Hyderabad [2025]
* **Certification:** 30-Hour Product Management Course, Doremon Den [Feb 2025]
* **Certification:** Building Wireframes and Low-Fidelity Prototypes, Google [Jan 2025]

# Technical Skills
* **Languages & frameworks:** Python, TypeScript, FastAPI, Next.js, Astro, Tailwind.
* **Infrastructure:** Google Cloud Run, Cloud Scheduler, Firestore, Vercel, Supabase, Docker.
* **AI engineering:** RAG (Pinecone, hybrid BM25 + dense retrieval, Cohere rerank), MCP servers, multi-agent pipelines, Groq, Gemini, Whisper, LLM evals.
* **GTM systems:** Attio, HubSpot, PostHog, Slack apps, Gmail API, Resend, Plain, Apify, Scrapling, Serper.
* **Growth & analytics:** Google Search Console, GA4, Google Ads, LinkedIn Ads, schema markup, AEO/GEO.
* **Product & design:** Figma, wireframing, low-fi prototyping.

# Interests
* Outside work I read a lot, play piano, and listen to a lot of music.
* I like building things that make other people's work disappear: agents, automations, and internal tools that turn a three-hour task into a Slack message.
* Happy to chat product, tech, or anything adjacent.

# Featured Product Decks
## ECOX LABS (Agri-Waste Supply Chain)
* **Problem:** India faces a dual crisis: 1.6 million deaths annually from air pollution due to crop burning, and a lack of scalable supply chains for industries needing biomass. Startups fail because they cannot reliably source agri-waste.
* **Solution:** Built a tech-enabled, decentralized supply chain to aggregate, process, and deliver agri-waste to industries.
    * **KhetSe App:** Designed a mobile app for farmers to geo-tag locations and schedule waste pickups, digitizing the "first mile" of logistics.
    * **IoT Warehousing:** Implemented smart inventory systems to monitor moisture levels and stock in real-time, ensuring raw material quality.
    * **Blockchain Traceability:** Created an immutable ledger to track waste movement from farm to factory, ensuring transparency for ESG investors.
* **Commercial Viability:** Modeled positive unit economics with a processing cost of ₹1,800-3,000/ton vs. a market selling price of ₹5,000-7,000/ton for biomass briquettes.
* **Launch Strategy:** Focused initial rollout in Ludhiana due to high paddy generation and proximity to bioenergy plants.

## FinEase (Fintech for Gig Economy)
* **Problem:** India's 23.5M gig workers struggle with income variability, lack of financial literacy, and debt traps. Existing fintech apps are too complex, English-centric, and require manual data entry, making them unusable for this demographic.
* **Solution:** Designed a "Save-Track-Learn" ecosystem tailored specifically for gig workers.
    * **Automated Tracking:** Built logic to parse SMS/UPI alerts from gig platforms (Zomato/Swiggy) to auto-log income without manual input.
    * **Gamified Education:** Created a "TikTok for Finance" module delivering short, regional-language video lessons on taxes and savings, incentivized with in-app coins.
    * **Inclusive UX:** Designed an "Offline-First" architecture and voice-assisted interface to support users with low-end devices and limited literacy.
* **Business Model:** B2B2C strategy partnering with platforms like Swiggy/Uber for distribution, monetized via ethical ad revenue, micro-course sales, and anonymized credit scoring data for lenders.
* **North Star Metric:** "Financial Confidence Score" — a composite metric tracking active budgeting, savings goal adherence, and educational module completion.

## Blinkit (Churn Prediction & Flexi-Delivery)
* **Problem:** Identified high customer churn rates driven by "Billing Delays" (44% weightage) and "Support Calls" (16% weightage). Root cause analysis revealed 65% of support calls stemmed from poor product quality (damaged/missing items).
* **Analysis:** Trained a Random Forest ML model on customer datasets to quantify churn factors, identifying that users valued quality reliability over speed in specific segments.
* **Solution:** Proposed "Flexi-Delivery," a dual-mode checkout interface:
    * **Lightning Lane:** Standard 10-minute delivery optimized for proximity.
    * **Careful Cart:** Quality-prioritized delivery sourced from the highest-rated vendors (ignoring distance), ensuring freshness for sensitive items.
* **Vendor Incentive:** Designed a dynamic commission model where vendors with high quality ratings pay lower commissions, gamifying inventory standards.
* **Projected Impact:** Targeted a 40% reduction in quality-related support tickets and refund-based billing delays.

## WinZO (Growth & Localization Case Study)
* **Problem:** WinZO, India's #1 casual gaming platform, faced a 70.32% bounce rate and an 18% drop in traffic because users from Tier 2-5 cities were forced to navigate an English-first interface.
* **User Insight:** The core persona, "Raj" (a junior clerk), felt alienated by the English onboarding and lack of accessible customer support, leading to trust issues and drop-offs before downloading the APK.
* **Solution:** Redesigned the onboarding flow to be "Vernacular First."
    * **Auto-Language Detection:** Proposed a feature to detect browser language settings and auto-switch the UI to one of 12 regional languages (Hindi, Gujarati, etc.).
    * **Trust Signals:** Added a visible "Customer Support" widget and a larger "20 Crore Active Users" banner to the home page to build credibility immediately.
* **Outcome:** Designed to increase the "Visit-to-Download" conversion rate by reducing linguistic friction for the target demographic.

## Style-Pronto (Fashion Q-Commerce Venture)
* **Market Opportunity:** Identified a $14 billion gap in the Indian fashion market for "Quick Commerce." While grocery Q-commerce (Blinkit/Zepto) is booming, fashion delivery still takes 24+ hours.
* **Strategy:** Proposed "Style-Pronto," a 60-minute fashion delivery service targeting the impulse-buy behavior of Gen Z and millennials.
* **Analysis:** Leveraged market data showing the Indian fashion e-commerce sector is growing at 24% CAGR, with a projected user base of 60.6 million for Q-commerce by 2029.
* **Competitive Landscape:** Positioned the product against incumbents like Myntra (slow delivery) and Blinkit (limited fashion SKU depth) by focusing purely on high-frequency fashion essentials.

## Purple Pandit (B2B Lead Generation Strategy)
* **Objective:** Developed a scalable lead generation framework for a Branding & Packaging Design Agency.
* **Methodology:** Built a targeted outreach strategy by identifying key "Buying Signals" such as recent funding rounds, new product launches, or hiring sprees, which indicate a need for rebranding services.
* **Execution:** Created a "Decision-Maker Matrix" to identify and contact the right stakeholders (CMOs, Brand Managers) rather than generic contacts.
* **Deliverable:** A comprehensive playbook covering market research, competitive analysis, and KPI definitions to streamline the agency's sales pipeline.

## Instagram (Onboarding UX Audit)
* **Research Focus:** Conducted a granular "User Journey Mapping" of the Instagram signup process to identify friction points causing drop-offs.
* **User Sentiment Analysis:** Mapped user emotions at every step (e.g., "Why do they need my date of birth?" -> *Anxiety/Hesitation*) versus the "Aha Moment" of finding friends.
* **Key Findings:** Identified that the request for personal information (DOB, Phone Number) early in the flow creates a "Privacy Barrier" before the user perceives any value from the app.
* **Recommendation:** Proposed deferring non-essential data collection until after the user has engaged with their first piece of content to improve activation rates.