export interface HeroMetric {
    value: number;
    prefix?: string;
    suffix?: string;
    label: string;
    context: string;
}

export const heroMetrics: HeroMetric[] = [
    {
        value: 18,
        suffix: '%',
        label: 'retention',
        context: 'Pinch · Streaks feature',
    },
    {
        value: 19,
        prefix: '₹',
        suffix: 'L',
        label: 'ticket sales',
        context: 'ATMOS 2024',
    },
    {
        value: 47,
        suffix: '%',
        label: 'sales lift',
        context: "Nam Nam Foods · Valentine's",
    },
];
