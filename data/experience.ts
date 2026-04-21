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
        role: 'AI Engineer, Marketing Team',
        period: 'Sept 2025 - Present',
        description:
            "Building the internal AI stack for the marketing team: MCP servers, RAG chatbots, and a few multi-agent pipelines. Work that used to take an analyst two days now happens inside a prompt.",
        details: [
            {
                text: "Shipped a 19-tool MCP server wired to Google Search Console, GA4, Google Ads, HubSpot CRM, and Bing, so the team can pull marketing data from Claude Desktop without jumping between five dashboards.",
                metric: { value: 19, prefix: '', suffix: '-tool' },
            },
            {
                text: "Designed the public support chatbot using hybrid BM25 plus dense retrieval on Pinecone with a Redis cache, embeddable as a one-line script. Answers land in under 400ms on the hot path.",
                metric: { value: 400, suffix: 'ms' },
            },
            {
                text: "Built an ICP classifier that enriches cold company lists with Apollo and LinkedIn data, scores each prospect against Zenskar's $40K ACV B2B XaaS profile using a 120B Groq model, and pings sales on Telegram when a high-fit lead lands.",
            },
            {
                text: "Prototyped a multi-agent competitor events scraper (Playwright, Apify, Groq, Gemini) that monitors 8 competitor sites and surfaces industry events every week. Cut about 4 hours of manual research from the team's schedule.",
            },
            {
                text: "Shipped the outreach tracker, a Streamlit-over-Supabase dashboard the SDR team now runs their entire weekly pipeline on.",
            },
        ],
        skills: ['Python', 'MCP', 'LangChain', 'Pinecone', 'RAG', 'Multi-agent LLM', 'Groq', 'Gemini'],
        color: 'emerald',
    },
    {
        company: 'Pinch',
        role: 'Founders Office Intern',
        period: 'May 2025 - August 2025',
        description:
            'Worked directly with the founders on product strategy, fundraising, and the boring ops work that actually moves things.',
        details: [
            {
                text: "Identified product gaps through a competitive analysis of 7 networking apps and shipped 3 Figma prototypes. Got 2 high-impact features onto the roadmap.",
            },
            {
                text: "Launched the 'Streaks' gamification feature with engineering and design. 7-day user retention moved 18% over three months.",
                metric: { value: 18, suffix: '%' },
            },
            {
                text: "Revamped the company website and implemented a new SEO strategy to lift organic rankings.",
            },
            {
                text: "Built the investor pitch deck and sourced 34+ VCs. Landed 2 strategic investor meetings.",
                metric: { value: 34, prefix: '', suffix: '+' },
            },
            {
                text: "Ran end-to-end hiring for 2 Marketing Executives via LinkedIn and the Founder's Network.",
            },
        ],
        skills: ['Product Strategy', 'Figma', 'Growth', 'Fundraising', 'SEO'],
        color: 'orange',
    },
    {
        company: 'Stamp My Visa',
        role: 'Generalist Intern',
        period: 'May 2025 - July 2025',
        description:
            'Worked across UX, process automation, and internal operations.',
        details: [
            {
                text: "Redesigned the 'Automaton' product user flow and built UI mockups. Cut a 9-step process to 4 steps to reduce drop-off.",
            },
            {
                text: "Produced 3 training videos and onboarding decks. New-hire onboarding time dropped from 2 weeks to 5 days.",
            },
        ],
        skills: ['UX Design', 'Process Optimization', 'Operations', 'UI Mockups'],
        color: 'rose',
    },
    {
        company: 'Nam Nam Foods',
        role: 'Product Marketing Intern',
        period: 'Jan 2025 - March 2025',
        description:
            'Led digital growth, packaging design, and content strategy.',
        details: [
            {
                text: "Designed a multi-channel Valentine's campaign across Instagram, WhatsApp, and Email. Sales lifted 47% over two months.",
                metric: { value: 47, suffix: '%' },
            },
            {
                text: "Rebuilt the Instagram content strategy around an analytics feedback loop. Reach went up 83%, followers up 15%.",
                metric: { value: 83, suffix: '%' },
            },
            {
                text: "Redesigned product packaging based on customer feedback to improve brand perception.",
            },
        ],
        skills: ['Growth Marketing', 'Analytics', 'GTM Strategy', 'Content'],
        color: 'amber',
    },
];
