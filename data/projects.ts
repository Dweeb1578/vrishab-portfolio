import type { LucideIcon } from 'lucide-react';
import {
    Mic,
    MessageCircle,
    Server,
    Radar,
    Target,
    Send,
    Download,
    FileText,
    Hotel,
    Disc3,
    Search,
    ScanSearch,
    Briefcase,
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
        slug: 'resume-optimizer',
        title: 'Resume Optimization Engine',
        hook: 'RAG-based resume rewriter with a hybrid multi-LLM pipeline (<200ms latency).',
        description:
            'Analyses resume structure, augments bullets against a curated library of strong examples, applies humanisation filters to evade AI detection, and rewrites in real time. Gemini handles structure, Llama 3 handles tone.',
        tags: ['Python', 'LangChain', 'Gemini', 'Llama 3'],
        color: 'blue',
        icon: FileText,
        githubUrl: 'https://github.com/Dweeb1578/Resume-PerfecterUPD',
        liveUrl: 'https://resume-perfecter-upd.vercel.app',
    },
    {
        slug: 'hotel-booking-chatbot',
        title: 'Hotel Booking RAG Chatbot',
        hook: 'Hotel-booking RAG chatbot with dynamic 30–40% price negotiation.',
        description:
            'Next.js full-stack travel chatbot. LangChain orchestrates Pinecone-backed RAG over hotel inventory, Vercel KV provides multi-layer Redis caching for a 90% latency cut, and a negotiation agent dynamically drops prices within constraints.',
        tags: ['Next.js 15', 'Pinecone', 'Vercel KV'],
        color: 'rose',
        icon: Hotel,
        githubUrl: 'https://github.com/Dweeb1578/Shywarma-Chain-of-Hotels',
        liveUrl: 'https://shywarma-chain-of-hotels.vercel.app',
    },
    {
        slug: 'ai-dj',
        title: 'AI DJ',
        hook: 'Turns any playlist into one continuous, structure-aware DJ mix.',
        description:
            'A CLI that pulls a Spotify playlist or local folder, analyses each track\'s structure with a neural model, and stitches them into a seamless set — choosing transition points and styles (bass swaps, filter sweeps, echo-outs, slam cuts) per song. Caches analysis and exports an MP3 plus a cue sheet.',
        tags: ['Python', 'allin1 ML', 'ffmpeg', 'Spotify API'],
        color: 'rose',
        icon: Disc3,
        githubUrl: 'https://github.com/Dweeb1578/ai-dj',
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
