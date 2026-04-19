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
        slug: 'canyoucrackthecase',
        title: 'CanYouCrackTheCase',
        hook: 'Voice-driven McKinsey-style case practice with AI judging and ELO ratings.',
        description:
            'Full-stack web app for practicing consulting case interviews. Prompts spoken via text-to-speech, answers captured via Web Speech API, a Groq-hosted LLM scores structure, filler words, and silence, and an ELO system tracks progress across sessions.',
        tags: ['Next.js 15', 'Supabase', 'Groq', 'Web Speech API'],
        color: 'rose',
        icon: Mic,
        featured: true,
    },
    {
        slug: 'zenskar-chatbot',
        title: 'Zenskar Chatbot',
        hook: 'Hybrid RAG (BM25 + embeddings) with an embeddable widget for Zenskar\'s help surface.',
        description:
            'FastAPI backend with LangChain orchestration, Pinecone for vector search, and BM25 sparse retrieval fused for hybrid ranking. Redis caches hot queries. Ships as a drop-in JavaScript widget.',
        tags: ['FastAPI', 'LangChain', 'Pinecone', 'Redis'],
        color: 'indigo',
        icon: MessageCircle,
    },
    {
        slug: 'zenskar-mcp-server',
        title: 'Zenskar MCP Server',
        hook: '19-tool Marketing Analytics MCP server used in Claude-native workflows.',
        description:
            'A Model Context Protocol server exposing read-only tools across Google Search Console, GA4, Google Ads, HubSpot CRM, and Bing Webmaster. Deployed on Render, accessible from Claude Desktop, Claude Code, and claude.ai.',
        tags: ['Python', 'MCP', 'Google APIs', 'Render'],
        color: 'purple',
        icon: Server,
    },
    {
        slug: 'zenskar-events',
        title: 'Zenskar Events',
        hook: 'Multi-agent LLM pipeline monitoring competitors for industry events.',
        description:
            'Combines Playwright browsing, Apify LinkedIn scraping, and Groq + Gemini LLM agents to detect event announcements on competitor sites. Scores relevance, dedupes, and exports weekly intelligence to Excel.',
        tags: ['Python', 'Groq', 'Gemini', 'Playwright'],
        color: 'amber',
        icon: Radar,
    },
    {
        slug: 'zenskar-icp-classification',
        title: 'Zenskar ICP Classifier',
        hook: 'LLM-based lead qualification with Apollo + LinkedIn enrichment and Telegram alerts.',
        description:
            'Enriches raw company lists via Apollo.io and LinkedIn, then scores each prospect against Zenskar\'s ICP (B2B SaaS, custom billing, >$40K ACV) using Groq\'s 120B model. A Telegram bot pings the sales team when a high-fit lead lands.',
        tags: ['Python', 'Groq 120B', 'Apollo API'],
        color: 'blue',
        icon: Target,
    },
    {
        slug: 'zenskar-outreach',
        title: 'Zenskar Outreach',
        hook: 'B2B outreach dashboard — tracks companies, contacts, and campaigns end-to-end.',
        description:
            'Streamlit app backed by Supabase and a local SQLite cache. Manages outreach lists, groups contacts, and visualises engagement in a clean dark-mode UI. Connects to LinkedIn sequences and email providers.',
        tags: ['Streamlit', 'Supabase', 'SQLite'],
        color: 'emerald',
        icon: Send,
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
    },
    {
        slug: 'shywarma-chatbot',
        title: 'Shywarma Chatbot',
        hook: 'Hotel-booking RAG chatbot with dynamic 30–40% price negotiation.',
        description:
            'Next.js full-stack travel chatbot. LangChain orchestrates Pinecone-backed RAG over hotel inventory, Vercel KV provides multi-layer Redis caching for a 90% latency cut, and a negotiation agent dynamically drops prices within constraints.',
        tags: ['Next.js 15', 'Pinecone', 'Vercel KV'],
        color: 'rose',
        icon: Hotel,
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
