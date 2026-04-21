'use client';
import { motion } from 'framer-motion';
import { Briefcase, Quote } from 'lucide-react';
import { experiences, type ExperienceColor, type ExperienceDetail } from '../data/experience';
import MetricCounter from './MetricCounter';

type Accent = {
    dot: string;
    text: string;
    borderHover: string;
    marker: string;
    tag: string;
    quoteBg: string;
    quoteBorderL: string;
    quoteIcon: string;
};

const accent: Record<ExperienceColor, Accent> = {
    emerald: {
        dot: 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]',
        text: 'text-emerald-600 dark:text-emerald-400',
        borderHover: 'hover:border-emerald-300 dark:hover:border-emerald-500/50',
        marker: 'marker:text-emerald-500',
        tag: 'bg-emerald-50/80 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/30 hover:bg-emerald-100 dark:hover:bg-emerald-500/20',
        quoteBg: 'bg-emerald-50/60 dark:bg-emerald-500/5',
        quoteBorderL: 'border-l-emerald-400 dark:border-l-emerald-500/60',
        quoteIcon: 'text-emerald-500',
    },
    orange: {
        dot: 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]',
        text: 'text-orange-600 dark:text-orange-400',
        borderHover: 'hover:border-orange-300 dark:hover:border-orange-500/50',
        marker: 'marker:text-orange-500',
        tag: 'bg-orange-50/80 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-500/30 hover:bg-orange-100 dark:hover:bg-orange-500/20',
        quoteBg: 'bg-orange-50/60 dark:bg-orange-500/5',
        quoteBorderL: 'border-l-orange-400 dark:border-l-orange-500/60',
        quoteIcon: 'text-orange-500',
    },
    rose: {
        dot: 'bg-rose-500 shadow-[0_0_10px_rgba(251,113,133,0.5)]',
        text: 'text-rose-600 dark:text-rose-400',
        borderHover: 'hover:border-rose-300 dark:hover:border-rose-500/50',
        marker: 'marker:text-rose-500',
        tag: 'bg-rose-50/80 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-500/30 hover:bg-rose-100 dark:hover:bg-rose-500/20',
        quoteBg: 'bg-rose-50/60 dark:bg-rose-500/5',
        quoteBorderL: 'border-l-rose-400 dark:border-l-rose-500/60',
        quoteIcon: 'text-rose-500',
    },
    amber: {
        dot: 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]',
        text: 'text-amber-600 dark:text-amber-400',
        borderHover: 'hover:border-amber-300 dark:hover:border-amber-500/50',
        marker: 'marker:text-amber-500',
        tag: 'bg-amber-50/80 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/30 hover:bg-amber-100 dark:hover:bg-amber-500/20',
        quoteBg: 'bg-amber-50/60 dark:bg-amber-500/5',
        quoteBorderL: 'border-l-amber-400 dark:border-l-amber-500/60',
        quoteIcon: 'text-amber-500',
    },
};

function DetailContent({ detail, highlightClass }: { detail: ExperienceDetail; highlightClass: string }) {
    if (!detail.metric) return <>{detail.text}</>;
    const { value, prefix = '', suffix = '' } = detail.metric;
    const needle = `${prefix}${value}${suffix}`;
    const idx = detail.text.indexOf(needle);
    if (idx === -1) return <>{detail.text}</>;
    const before = detail.text.slice(0, idx);
    const after = detail.text.slice(idx + needle.length);
    return (
        <>
            {before}
            <strong className={`font-semibold ${highlightClass}`}>
                <MetricCounter value={value} prefix={prefix} suffix={suffix} />
            </strong>
            {after}
        </>
    );
}

export default function Experience() {
    return (
        <section id="experience" className="py-24 relative">
            <div className="container mx-auto px-6 max-w-5xl">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold text-stone-900 dark:text-stone-50 mb-16 flex items-center gap-3"
                >
                    <span className="h-px w-8 bg-orange-500"></span> Internships
                </motion.h2>

                <div className="relative border-l border-stone-200 dark:border-stone-800 ml-3 md:ml-6 space-y-12">
                    {experiences.map((exp, index) => {
                        const a = accent[exp.color];
                        return (
                            <motion.div
                                key={exp.company}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative pl-8 md:pl-12 group"
                            >
                                <div
                                    className={`absolute -left-[5px] top-6 h-2.5 w-2.5 rounded-full ring-4 ring-stone-100 dark:ring-stone-900 transition-all duration-300 ${a.dot}`}
                                ></div>

                                <div className={`p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 transition-all duration-300 shadow-sm hover:shadow-lg dark:shadow-black/20 hover:-translate-y-1 ${a.borderHover}`}>
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50">{exp.role}</h3>
                                            <div className={`font-medium flex items-center gap-2 mt-1 ${a.text}`}>
                                                <Briefcase size={16} /> {exp.company}
                                            </div>
                                        </div>
                                        <span className="text-xs font-mono text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded border border-stone-200 dark:border-stone-700">
                                            {exp.period}
                                        </span>
                                    </div>

                                    <div className="text-stone-600 dark:text-stone-400 leading-relaxed">
                                        <p className="mb-3 italic text-stone-500 dark:text-stone-500">{exp.description}</p>

                                        <ul className={`list-disc list-outside ml-4 space-y-2 mb-6 ${a.marker}`}>
                                            {exp.details.map((detail, i) => (
                                                <li key={i}>
                                                    <DetailContent detail={detail} highlightClass={a.text} />
                                                </li>
                                            ))}
                                        </ul>

                                        {exp.pullQuote && (
                                            <div className={`mt-6 mb-6 p-4 pl-5 rounded-r-xl border-l-4 ${a.quoteBg} ${a.quoteBorderL}`}>
                                                <Quote size={16} className={`mb-2 ${a.quoteIcon}`} />
                                                <p className="italic text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                                                    {exp.pullQuote}
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex flex-wrap gap-2">
                                            {exp.skills.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className={`px-2 py-1 rounded text-xs font-medium border transition-colors ${a.tag}`}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
