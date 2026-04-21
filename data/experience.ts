export type ExperienceColor = 'emerald' | 'orange' | 'rose' | 'amber';

export interface ExperienceDetail {
    text: string;
    metric?: {
        value: number;
        suffix?: string;
        prefix?: string;
    };
}

export interface Experience {
    company: string;
    role: string;
    period: string;
    description: string;
    details: ExperienceDetail[];
    skills: string[];
    color: ExperienceColor;
    pullQuote?: string;
}

export const experiences: Experience[] = [
    {
        company: 'Zenskar',
        role: 'AI Engineer — Marketing Team',
        period: 'Sept 2025 — Present',
        description:
            'Building the marketing team\'s internal AI stack — MCP servers, RAG chatbots, and multi-agent pipelines. Work that used to need a team now runs on a prompt.',
        details: [
            {
                text: 'Shipped a 19-tool MCP server wired to Google Search Console, GA4, Google Ads, HubSpot CRM, and Bing — lets the team query marketing data from Claude Desktop instead of jumping between dashboards.',
                metric: { value: 19, prefix: '', suffix: '-tool' },
            },
            {
                text: 'Designed the public-facing support chatbot — hybrid BM25 + dense retrieval on Pinecone, Redis-cached, embeddable as a one-line script. Answers land in under 400ms on the hot path.',
                metric: { value: 400, suffix: 'ms' },
            },
            {
                text: 'Built an ICP classifier that enriches cold company lists with Apollo + LinkedIn data, scores them against Zenskar\'s $40K ACV B2B XaaS profile with a 120B Groq model, and pings sales on Telegram the moment a high-fit lead lands.',
            },
            {
                text: 'Prototyped a multi-agent competitor-events scraper (Playwright + Apify + Groq/Gemini) that monitors 8 competitor sites and surfaces industry events weekly — replaced ~4 hours of manual research.',
            },
            {
                text: 'Shipped the outreach tracker — a Streamlit-over-Supabase dashboard the SDR team now runs their entire weekly pipeline on.',
            },
        ],
        skills: ['Python', 'MCP', 'LangChain', 'Pinecone', 'RAG', 'Multi-agent LLM', 'Groq', 'Gemini'],
        color: 'emerald',
    },
    {
        company: 'Pinch',
        role: 'Founders Office Intern',
        period: 'May 2025 — August 2025',
        description:
            'Worked directly with the founders on product strategy, fundraising, and the boring ops work that actually moves things.',
        details: [
            {
                text: 'Identified product gaps through competitive analysis of 7 networking apps and designed 3 Figma prototypes, leading to the prioritization of 2 high-impact roadmap features.',
            },
            {
                text: 'Launched the "Streaks" gamification feature by coordinating with engineering and design, driving an 18% increase in 7-day user retention.',
                metric: { value: 18, suffix: '%' },
            },
            {
                text: 'Revamped the company website and implemented a new SEO strategy to improve organic search rankings.',
            },
            {
                text: 'Built the investor pitch deck and sourced 34+ VCs, successfully securing 2 strategic investor meetings.',
                metric: { value: 34, prefix: '', suffix: '+' },
            },
            {
                text: 'Ran end-to-end hiring for 2 Marketing Executives via LinkedIn and the Founder\'s Network.',
            },
        ],
        skills: ['Product Strategy', 'Figma', 'Growth', 'Fundraising', 'SEO'],
        color: 'orange',
    },
    {
        company: 'Stamp My Visa',
        role: 'Generalist Intern',
        period: 'May 2025 — July 2025',
        description:
            'Focused on UX optimization, process automation, and internal operations.',
        details: [
            {
                text: "Redesigned the 'Automaton' product user flow and created UI mockups, streamlining a complex 9-step process into 4 steps to reduce drop-off.",
            },
            {
                text: 'Produced 3 comprehensive training videos and onboarding decks, slashing new hire onboarding time from 2 weeks to just 5 days.',
            },
        ],
        skills: ['UX Design', 'Process Optimization', 'Operations', 'UI Mockups'],
        color: 'rose',
    },
    {
        company: 'Nam Nam Foods',
        role: 'Product Marketing Intern',
        period: 'Jan 2025 — March 2025',
        description:
            'Led digital growth strategies, packaging design, and content optimization.',
        details: [
            {
                text: "Designed and executed a multi-channel Valentine's Campaign (Instagram, WhatsApp, Email), driving a 47% sales increase over 2 months.",
                metric: { value: 47, suffix: '%' },
            },
            {
                text: 'Optimized Instagram content strategy using analytics, growing account reach by 83% and followers by 15%.',
                metric: { value: 83, suffix: '%' },
            },
            {
                text: 'Redesigned product packaging based on customer feedback analysis to improve brand perception.',
            },
        ],
        skills: ['Growth Marketing', 'Analytics', 'GTM Strategy', 'Content'],
        color: 'amber',
    },
];
