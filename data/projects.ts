import type { LucideIcon } from 'lucide-react';
import {
    Mic,
    MessageCircle,
    Server,
    Radar,
    Target,
    Send,
    Download,
    Search,
    ScanSearch,
    Briefcase,
    Bot,
    Zap,
    Package,
    Activity,
    AudioLines,
    Radio,
    Inbox,
    LayoutDashboard,
    GitBranch,
    Globe,
} from 'lucide-react';

export type ProjectColor =
    | 'rose'
    | 'indigo'
    | 'purple'
    | 'amber'
    | 'blue'
    | 'emerald'
    | 'orange';

export interface Project {
    slug: string;
    title: string;
    hook: string;
    description: string;
    tags: string[];
    color: ProjectColor;
    icon: LucideIcon;
    coverImage?: string;
    liveUrl?: string;
    githubUrl?: string;
    featured?: boolean;
}

export const projects: Project[] = [
    {
        slug: 'gtm-agent-os',
        title: 'GTM Agent OS',
        hook: 'Six agents that absorb the research and CRM work around every sales call.',
        description:
            'Six scheduled agents on Google Cloud Run, sharing one Attio and Slack layer: pre-call briefings DMed to the deal owner, deal proposals raised from meetings that have no deal, call-transcript intelligence written back to CRM fields, transcript-to-task handoffs, a pre-standup task digest, and tiered signup alerts. Each one shipped to shadow mode first, DMing only me, before it was allowed to reach the team.',
        tags: ['Python', 'Cloud Run', 'Attio', 'Slack'],
        color: 'emerald',
        icon: Bot,
        featured: true,
    },
    {
        slug: 'speed-to-lead',
        title: 'Speed-to-Lead',
        hook: 'Inbound form fill to an approved, personalised reply in about 30 seconds.',
        description:
            'An approval-first inbound service: an LLM screens each form fill for a real buyer, a free-first chain (Scrapling, then Serper, then Apify) enriches the account, a tiered model chain drafts the reply, and a Slack card offers live calendar slots. Nothing sends until a human taps approve, and Firestore keeps the whole path idempotent so a retried webhook cannot mail anyone twice.',
        tags: ['FastAPI', 'Firestore', 'Slack', 'Gmail API'],
        color: 'blue',
        icon: Zap,
        featured: true,
    },
    {
        slug: 'speechify-tts-integrations',
        title: 'Speechify TTS Integrations',
        hook: 'Made Speechify a native voice provider in two open-source AI frameworks.',
        description:
            'A Vercel AI SDK speech provider published to npm as @speechify/vercel, built as a thin bridge over the official Fern SDK with automated releases and build provenance, plus a standalone Pipecat TTS service following that community\'s separate-repo convention. Also found and fixed the User-Agent bug that was making every AI-SDK request invisible to the API\'s own integration telemetry.',
        tags: ['TypeScript', 'Python', 'Vercel AI SDK', 'Pipecat'],
        color: 'indigo',
        icon: Package,
    },
    {
        slug: 'signup-funnel-autopsy',
        title: 'Signup Funnel Autopsy',
        hook: 'Audited 1,587 signups and found a fraud ring and 26 uncontacted buyers.',
        description:
            'A full reconciliation of PostHog product events against Attio CRM records to find where self-serve revenue was leaking. Three findings: checkout completed at 14.5%, 12.6% of all signups traced back to a single fraud operation running on 18 mail-only domains, and 26 companies had reached the checkout screen, never paid, and never been contacted by anyone.',
        tags: ['PostHog', 'HogQL', 'Attio', 'Python'],
        color: 'amber',
        icon: Activity,
    },
    {
        slug: 'voicemos-quality-predictor',
        title: 'VoiceMOS 2026 Winner',
        hook: 'Won Track 1 of the VoiceMOS Challenge 2026, with no in-domain human ratings.',
        description:
            'The winning entry for Track 1 of the VoiceMOS Challenge 2026, the international benchmark for predicting how good synthetic speech sounds to human listeners. It is zero-shot: it scores quality without ever seeing an in-domain human rating, combining a Whisper-based model with an ensemble of existing quality metrics, and reached 0.7434 ACR and 0.4960 CCR utterance-level correlation against human opinion scores. The side result is the interesting part: the same score predicts when speech recognition will fail on a clip, which turns a subjective quality metric into a reliability gate for an ASR pipeline. The system paper is my first research paper.',
        tags: ['PyTorch', 'Whisper', 'Speech quality', 'Research'],
        color: 'indigo',
        icon: AudioLines,
        featured: true,
    },
    {
        slug: 'signal-room',
        title: 'Signal Room',
        hook: 'A buying-signal queue a human accepts or rejects, never one that fires on its own.',
        description:
            'Bounded watchers track target accounts for hiring, website and LinkedIn changes, and every signal lands in Slack for review instead of triggering outreach automatically. Watchers may only append evidence, never overwrite ownership, routing or suppression, so the CRM stays the system of action and an agent mistake stays recoverable. A new watcher\'s first collection is stored as a silent baseline, so switching on an account cannot flood the channel with its whole history.',
        tags: ['Python', 'Attio', 'Slack', 'Apify'],
        color: 'emerald',
        icon: Radio,
    },
    {
        slug: 'plain-support-router',
        title: 'Plain Support Router',
        hook: 'Routes every support thread to the right owner, and re-routes when it changes.',
        description:
            'The triage layer on Speechify\'s support inbox: it classifies each incoming thread, routes it to the right owner, and re-triages when a follow-up message changes what the thread is actually about. Live in production on real customer conversations.',
        tags: ['Python', 'GraphQL', 'Plain', 'Slack'],
        color: 'blue',
        icon: Inbox,
    },
    {
        slug: 'outbound-metrics-dashboard',
        title: 'Outbound Metrics Dashboard',
        hook: 'Pipeline by channel, joining the CRM against ad spend and product analytics.',
        description:
            'The dashboard the revenue team opens to see what each channel actually produced, joining Attio records against Google Ads spend and PostHog behaviour in one view. Getting paid search to a real dollar value meant routing it through in-ad lead forms, after proving the site\'s own forms captured nothing that could tie a click to revenue.',
        tags: ['Next.js', 'Vercel', 'Attio', 'PostHog'],
        color: 'purple',
        icon: LayoutDashboard,
    },
    {
        slug: 'agent-continuity-broker',
        title: 'Agent Continuity Broker',
        hook: 'Lets Claude, Codex and Antigravity resume each other\'s work. Zero model calls.',
        description:
            'A shared local record of task prompts, conclusions, test results, errors and git state, keyed by git worktree and branch, so three different coding agents can pick up where another left off. It makes no model, embedding or network calls at all: it is hooks and a SQLite file, so it costs nothing to run and cannot ship a private repository to anyone. Credentials are redacted, sensitive paths suppressed, and test evidence is stamped with the git state that produced it so it can be marked stale when that state moves.',
        tags: ['Python', 'SQLite', 'MCP', 'Claude Code'],
        color: 'amber',
        icon: GitBranch,
    },
    {
        slug: 'speechify-site-clusters',
        title: 'speechify.ai Comparison Pages',
        hook: 'Comparison, alternatives and partner pages, plus a real cost calculator.',
        description:
            'Designed and shipped the public comparison and alternatives clusters on speechify.ai in Astro and Tailwind, including an interactive calculator that prices a real workload against competitor rates. Written to be honest about where a competitor is genuinely better, on the argument that a comparison page the buyer does not trust is worth nothing to either side.',
        tags: ['Astro', 'Tailwind', 'GSC', 'GA4'],
        color: 'rose',
        icon: Globe,
        liveUrl: 'https://speechify.ai/compare',
    },
    {
        slug: 'marketing-mcp-server',
        title: 'Marketing Analytics MCP Server',
        hook: '19-tool Marketing Analytics MCP server used in Claude-native workflows.',
        description:
            'A Model Context Protocol server exposing read-only tools across Google Search Console, GA4, Google Ads, HubSpot CRM, and Bing Webmaster. Deployed on Render, accessible from Claude Desktop, Claude Code, and claude.ai.',
        tags: ['Python', 'MCP', 'Google APIs', 'Render'],
        color: 'purple',
        icon: Server,
        githubUrl: 'https://github.com/Dweeb1578/marketing-analytics-mcp',
        featured: true,
    },
    {
        slug: 'canyoucrackthecase',
        title: 'CanYouCrackTheCase',
        hook: 'Voice-driven McKinsey-style case practice with AI judging and ELO ratings.',
        description:
            'Full-stack web app for practicing consulting case interviews. Prompts spoken via text-to-speech, answers captured via Web Speech API, a Groq-hosted LLM scores structure, filler words, and silence, and an ELO system tracks progress across sessions.',
        tags: ['Next.js 15', 'Supabase', 'Groq', 'Web Speech API'],
        color: 'rose',
        icon: Mic,
        githubUrl: 'https://github.com/Dweeb1578/CanYouCrackTheCase',
    },
    {
        slug: 'hybrid-rag-chatbot',
        title: 'Hybrid RAG Support Chatbot',
        hook: 'Hybrid RAG (BM25 + embeddings) with an embeddable widget for a SaaS help surface.',
        description:
            'FastAPI backend with LangChain orchestration, Pinecone for vector search, and BM25 sparse retrieval fused for hybrid ranking. Redis caches hot queries. Ships as a drop-in JavaScript widget.',
        tags: ['FastAPI', 'LangChain', 'Pinecone', 'Redis'],
        color: 'indigo',
        icon: MessageCircle,
        githubUrl: 'https://github.com/Dweeb1578/hybrid-rag-chatbot',
    },
    {
        slug: 'competitor-event-radar',
        title: 'Competitor Event Radar',
        hook: 'Multi-agent LLM pipeline monitoring competitors for industry events.',
        description:
            'Combines Playwright browsing, Apify LinkedIn scraping, and Groq + Gemini LLM agents to detect event announcements on competitor sites. Scores relevance, dedupes, and exports weekly intelligence to Excel.',
        tags: ['Python', 'Groq', 'Gemini', 'Playwright'],
        color: 'amber',
        icon: Radar,
        githubUrl: 'https://github.com/Dweeb1578/Events-Tracker',
    },
    {
        slug: 'icp-lead-classifier',
        title: 'ICP Lead Classifier',
        hook: 'LLM-based lead qualification with Apollo + LinkedIn enrichment and Slack alerts.',
        description:
            'Enriches raw company lists via Apollo.io and LinkedIn, then scores each prospect against an ICP (B2B SaaS, custom billing, >$40K ACV) using Groq\'s 120B model. A Slack bot pings the sales team when a high-fit lead lands.',
        tags: ['Python', 'Groq 120B', 'Apollo API'],
        color: 'blue',
        icon: Target,
        githubUrl: 'https://github.com/Dweeb1578/icp-lead-classifier',
    },
    {
        slug: 'b2b-outreach-dashboard',
        title: 'B2B Outreach Dashboard',
        hook: 'B2B outreach dashboard that tracks companies, contacts, and campaigns end-to-end.',
        description:
            'Streamlit app backed by Supabase and a local SQLite cache. Manages outreach lists, groups contacts, and visualises engagement in a clean dark-mode UI. Connects to LinkedIn sequences and email providers.',
        tags: ['Streamlit', 'Supabase', 'SQLite'],
        color: 'emerald',
        icon: Send,
        githubUrl: 'https://github.com/Dweeb1578/b2b-outreach-dashboard',
    },
    {
        slug: 'tldv-downloader',
        title: 'TLDV Downloader',
        hook: 'Reverse-engineered a Caesar-cipher CDN to extract meeting videos from tldv.io.',
        description:
            'CLI tool that parses the browser JWT, decodes tldv.io\'s ROT-N obfuscated segment URLs, stitches HLS chunks with ffmpeg, and formats transcripts with timestamps. Single-file elegance, no paid plan required.',
        tags: ['Python', 'ffmpeg', 'JWT'],
        color: 'orange',
        icon: Download,
        githubUrl: 'https://github.com/Dweeb1578/tldv-downloader',
    },
    {
        slug: 'reddit-intent-engine',
        title: 'Reddit Intent Engine',
        hook: 'Multi-stage pipeline that surfaces high-intent buying signals on Reddit.',
        description:
            'Watches Reddit, Hacker News, and Stack Overflow for posts discussing a target pain, then runs a two-stage Groq LLM classifier under strict rate-limit budgets to score relevance and bucket each hit by intent. Dedupes through Supabase and posts the high-signal ones to Slack with daily digests.',
        tags: ['Python', 'Groq', 'Supabase', 'Serper'],
        color: 'orange',
        icon: Search,
        githubUrl: 'https://github.com/Dweeb1578/reddit-intent-engine',
    },
    {
        slug: 'aeo-audit-engine',
        title: 'AEO Audit Engine',
        hook: 'Audits how AI answer engines perceive and cite a website.',
        description:
            'An Answer Engine Optimization framework that measures a site\'s "share of model" across ChatGPT, Perplexity, and Google AI Overviews, audits schema and extractability via browser and raw-HTML checks, and outputs a prioritised 30/60/90 plan to win AI citations.',
        tags: ['AEO', 'LLM analysis', 'Browser automation'],
        color: 'emerald',
        icon: ScanSearch,
    },
    {
        slug: 'hiring-signal-tracker',
        title: 'Hiring-Signal Tracker',
        hook: 'Finds enterprise accounts whose job posts reveal a product pain.',
        description:
            'Scrapes Indeed and LinkedIn for role signals, tracks 30-day hiring velocity per company, enriches each account with industry vertical and telephony stack detected from the listings, scores buyer-fit, and exports a ranked list to Google Sheets.',
        tags: ['Python', 'jobspy', 'Scrapling', 'Google Sheets'],
        color: 'amber',
        icon: Briefcase,
        githubUrl: 'https://github.com/Dweeb1578/hiring-signal-tracker',
    },
];

export const projectColorClasses: Record<
    ProjectColor,
    {
        text: string;
        bgSoft: string;
        bgSoftDark: string;
        borderHover: string;
        borderHoverDark: string;
        shadowHover: string;
        gradientFrom: string;
        gradientVia: string;
        gradientTo: string;
        accentRing: string;
    }
> = {
    rose: {
        text: 'text-rose-600 dark:text-rose-400',
        bgSoft: 'bg-rose-50',
        bgSoftDark: 'dark:bg-rose-950/40',
        borderHover: 'hover:border-rose-300',
        borderHoverDark: 'dark:hover:border-rose-700',
        shadowHover: 'hover:shadow-[0_8px_30px_-8px_rgba(251,113,133,0.35)]',
        gradientFrom: 'from-rose-500',
        gradientVia: 'via-pink-500',
        gradientTo: 'to-orange-400',
        accentRing: 'ring-rose-500/40',
    },
    indigo: {
        text: 'text-indigo-600 dark:text-indigo-400',
        bgSoft: 'bg-indigo-50',
        bgSoftDark: 'dark:bg-indigo-950/40',
        borderHover: 'hover:border-indigo-300',
        borderHoverDark: 'dark:hover:border-indigo-700',
        shadowHover: 'hover:shadow-[0_8px_30px_-8px_rgba(99,102,241,0.35)]',
        gradientFrom: 'from-indigo-500',
        gradientVia: 'via-blue-500',
        gradientTo: 'to-cyan-400',
        accentRing: 'ring-indigo-500/40',
    },
    purple: {
        text: 'text-purple-600 dark:text-purple-400',
        bgSoft: 'bg-purple-50',
        bgSoftDark: 'dark:bg-purple-950/40',
        borderHover: 'hover:border-purple-300',
        borderHoverDark: 'dark:hover:border-purple-700',
        shadowHover: 'hover:shadow-[0_8px_30px_-8px_rgba(168,85,247,0.35)]',
        gradientFrom: 'from-purple-500',
        gradientVia: 'via-fuchsia-500',
        gradientTo: 'to-pink-400',
        accentRing: 'ring-purple-500/40',
    },
    amber: {
        text: 'text-amber-600 dark:text-amber-400',
        bgSoft: 'bg-amber-50',
        bgSoftDark: 'dark:bg-amber-950/40',
        borderHover: 'hover:border-amber-300',
        borderHoverDark: 'dark:hover:border-amber-700',
        shadowHover: 'hover:shadow-[0_8px_30px_-8px_rgba(245,158,11,0.35)]',
        gradientFrom: 'from-amber-500',
        gradientVia: 'via-orange-500',
        gradientTo: 'to-rose-400',
        accentRing: 'ring-amber-500/40',
    },
    blue: {
        text: 'text-blue-600 dark:text-blue-400',
        bgSoft: 'bg-blue-50',
        bgSoftDark: 'dark:bg-blue-950/40',
        borderHover: 'hover:border-blue-300',
        borderHoverDark: 'dark:hover:border-blue-700',
        shadowHover: 'hover:shadow-[0_8px_30px_-8px_rgba(59,130,246,0.35)]',
        gradientFrom: 'from-blue-500',
        gradientVia: 'via-sky-500',
        gradientTo: 'to-cyan-400',
        accentRing: 'ring-blue-500/40',
    },
    emerald: {
        text: 'text-emerald-600 dark:text-emerald-400',
        bgSoft: 'bg-emerald-50',
        bgSoftDark: 'dark:bg-emerald-950/40',
        borderHover: 'hover:border-emerald-300',
        borderHoverDark: 'dark:hover:border-emerald-700',
        shadowHover: 'hover:shadow-[0_8px_30px_-8px_rgba(16,185,129,0.35)]',
        gradientFrom: 'from-emerald-500',
        gradientVia: 'via-teal-500',
        gradientTo: 'to-cyan-400',
        accentRing: 'ring-emerald-500/40',
    },
    orange: {
        text: 'text-orange-600 dark:text-orange-400',
        bgSoft: 'bg-orange-50',
        bgSoftDark: 'dark:bg-orange-950/40',
        borderHover: 'hover:border-orange-300',
        borderHoverDark: 'dark:hover:border-orange-700',
        shadowHover: 'hover:shadow-[0_8px_30px_-8px_rgba(249,115,22,0.35)]',
        gradientFrom: 'from-orange-500',
        gradientVia: 'via-amber-500',
        gradientTo: 'to-yellow-400',
        accentRing: 'ring-orange-500/40',
    },
};
