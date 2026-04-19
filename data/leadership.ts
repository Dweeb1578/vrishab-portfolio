import type { LucideIcon } from 'lucide-react';
import { Users, Flag } from 'lucide-react';

export interface LeadershipBullet {
    text: string;
    highlight?: string;
}

export interface LeadershipMetric {
    value: number;
    prefix?: string;
    suffix?: string;
    label: string;
}

export interface Leadership {
    role: string;
    org: string;
    icon: LucideIcon;
    summary: string;
    bullets: LeadershipBullet[];
    tags?: string[];
    metrics?: LeadershipMetric[];
    callout?: {
        label: string;
        body: string;
        bullets: string[];
    };
    featured?: boolean;
}

export const leadership: Leadership[] = [
    {
        role: 'President',
        org: '180 Degrees Consulting, BITS Hyderabad',
        icon: Users,
        summary:
            'Leading a branch of 25+ consultants to solve strategic problems for social enterprises and startups. Responsible for client acquisition, project delivery, and branch strategy.',
        bullets: [],
        metrics: [
            { value: 25, suffix: '+', label: 'Consultants' },
        ],
        callout: {
            label: 'Current Strategic Engagement',
            body: 'Directing a high-impact project with an early-stage FinTech Startup to simplify personal finance & IT returns.',
            bullets: [
                'Spearheading User Research and interviews to identify pain points in the current tax-filing workflow.',
                'Leading the UI/UX Overhaul of the core money-tracking dashboard to improve usability and retention.',
                'Collaborating with founders on Feature Development prioritization for the Q3 product roadmap.',
            ],
        },
        featured: true,
    },
    {
        role: "Student's Anonymous Lead",
        org: 'National Service Scheme',
        icon: Users,
        summary:
            'Leading a 22-member peer support team providing confidential counseling for students.',
        bullets: [
            {
                text: 'Automated "The Appreciation Project": built an n8n workflow with Sentiment Analysis to filter and route messages from Google Forms to recipients.',
            },
            {
                text: 'Eliminated manual verification "grunt work," boosting operational efficiency by 200%.',
                highlight: '200%',
            },
            {
                text: 'Organized 6 mental health awareness events reaching 300+ students.',
            },
        ],
        tags: ['n8n Automation', 'Sentiment Analysis'],
        metrics: [
            { value: 22, label: 'Team members' },
            { value: 200, suffix: '%', label: 'Efficiency gain' },
        ],
    },
    {
        role: 'Social Media Lead',
        org: 'Dept. of Publicity and Public Relations',
        icon: Flag,
        summary:
            'Owned ATMOS 2024 social presence end-to-end — strategy, content, and paid growth.',
        bullets: [
            {
                text: 'Managed ATMOS 2024 Instagram (8k+ followers) and developed the content strategy.',
            },
            {
                text: 'Executed paid ads driving 3M+ reach and ₹19L in ticket sales (78% YoY increase).',
                highlight: '₹19L',
            },
        ],
        tags: ['Content Strategy', 'Performance Marketing'],
        metrics: [
            { value: 19, prefix: '₹', suffix: 'L', label: 'Ticket sales' },
            { value: 3, suffix: 'M+', label: 'Reach' },
            { value: 78, suffix: '%', label: 'YoY growth' },
        ],
    },
];
