export type ExperienceColor = 'orange' | 'rose' | 'amber';

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
        company: 'Pinch',
        role: 'Founders Office Intern',
        period: 'May 2025 — August 2025',
        description:
            'Working directly with founders on product strategy, fundraising, and operations.',
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
                text: "Executed end-to-end hiring for 2 Marketing Executives via LinkedIn and the Founder's Network.",
            },
        ],
        skills: ['Product Strategy', 'Figma', 'Growth', 'Fundraising', 'SEO'],
        color: 'orange',
        pullQuote:
            'Led the Streaks launch end-to-end — from gap analysis to shipped feature — and watched 7-day retention tick up 18% in three months.',
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
