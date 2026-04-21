'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap } from 'lucide-react';
import { leadership, type Leadership, type LeadershipMetric } from '../data/leadership';
import MetricCounter from './MetricCounter';

function MetricsRow({ metrics }: { metrics: LeadershipMetric[] }) {
    return (
        <div className="flex flex-wrap gap-6 mt-4">
            {metrics.map((m) => (
                <div key={m.label} className="flex flex-col">
                    <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                        <MetricCounter value={m.value} prefix={m.prefix} suffix={m.suffix} />
                    </span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-wide mt-0.5">
                        {m.label}
                    </span>
                </div>
            ))}
        </div>
    );
}

function LeadershipCardBody({ role, hero = false }: { role: Leadership; hero?: boolean }) {
    const Icon = role.icon;
    return (
        <>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3
                        className={`font-bold text-stone-900 dark:text-stone-50 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors ${hero ? 'text-2xl' : 'text-lg'}`}
                    >
                        {role.role}
                    </h3>
                    <div className="text-amber-600 dark:text-amber-400 text-sm font-medium">
                        {role.org}
                    </div>
                </div>
                <Icon
                    size={hero ? 28 : 20}
                    className="text-stone-400 dark:text-stone-500 group-hover:text-amber-500 transition-colors shrink-0"
                />
            </div>

            <div className="text-stone-600 dark:text-stone-400 text-sm space-y-4">
                <p>{role.summary}</p>

                {role.metrics && role.metrics.length > 0 && (
                    <MetricsRow metrics={role.metrics} />
                )}

                {role.bullets && role.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-2 marker:text-amber-500">
                        {role.bullets.map((b, i) => (
                            <li key={i}>{b.text}</li>
                        ))}
                    </ul>
                )}

                {role.callout && (
                    <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/30 p-4 rounded-xl group-hover:bg-amber-100/50 dark:group-hover:bg-amber-500/20 transition-colors">
                        <h4 className="text-amber-600 dark:text-amber-400 font-semibold mb-2 text-xs uppercase tracking-wide flex items-center gap-2">
                            <Zap size={12} /> {role.callout.label}
                        </h4>
                        <p className="mb-2">{role.callout.body}</p>
                        <ul className="list-disc list-outside ml-4 space-y-1 marker:text-amber-500">
                            {role.callout.bullets.map((b, i) => (
                                <li key={i}>{b}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {role.tags && role.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {role.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 rounded text-[10px] font-medium bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-500/30"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

function ParallaxCard({ role, index }: { role: Leadership; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-300 dark:hover:border-amber-500/50 transition-all group hover:shadow-lg dark:shadow-black/20 shadow-sm"
        >
            <motion.div style={{ y }}>
                <LeadershipCardBody role={role} />
            </motion.div>
        </motion.div>
    );
}

export default function Leadership() {
    const featured = leadership.find((l) => l.featured);
    const others = leadership.filter((l) => !l.featured);

    return (
        <section id="leadership" className="py-24 relative">
            <div className="container mx-auto px-6 max-w-5xl">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold text-stone-900 dark:text-stone-50 mb-12 flex items-center gap-3"
                >
                    <span className="h-px w-8 bg-amber-500"></span> Leadership
                </motion.h2>

                {featured && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative overflow-hidden p-8 rounded-2xl bg-linear-to-br from-amber-50/80 to-white dark:from-amber-500/5 dark:to-stone-900 border border-amber-200/60 dark:border-amber-500/20 hover:border-amber-300 dark:hover:border-amber-500/40 transition-all group hover:shadow-xl dark:shadow-black/20 shadow-sm mb-6"
                    >
                        <div
                            aria-hidden
                            className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 dark:bg-amber-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"
                        ></div>
                        <div className="relative z-10">
                            <LeadershipCardBody role={featured} hero />
                        </div>
                    </motion.div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                    {others.map((role, i) => (
                        <ParallaxCard key={role.org} role={role} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
