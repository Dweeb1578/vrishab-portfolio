'use client';
import { motion } from 'framer-motion';

type Thought = {
    lede: string;
    body: React.ReactNode;
};

const thoughts: Thought[] = [
    {
        lede: "Most internal tools are stupid, and that is why I'm bullish on AI.",
        body: (
            <>
                A shared inbox, a 12-step SOP, a Notion doc nobody reads. These are
                the places where a language model quietly earns its keep. The MCP server I built at
                Zenskar solves a boring problem: our marketing analyst used to have five dashboards
                open to answer one question, and now she asks in English. If you can compress enough
                of that kind of work inside a company, a ten-person team starts getting through what
                used to need thirty.
            </>
        ),
    },
    {
        lede: 'Real users grade a tool better than any eval.',
        body: (
            <>
                The Streaks feature I shipped at Pinch had a hardcoded list of streak types for three
                weeks before we generalised it. Zenskar&apos;s support chatbot went live with worse recall
                than I wanted, because putting it in front of users surfaced failure modes we had not
                thought to write tests for. Every tool I have built got sharper between day one and
                day thirty, and that gap has become the signal I design around.
            </>
        ),
    },
    {
        lede: 'The interesting part of product work is the argument about what to cut.',
        body: (
            <>
                In engineering, it is the argument about which abstraction earns its keep. I like
                sitting where those two conversations meet, as the person who can argue a feature is
                worth shipping and then write the code that ships it. Most of my best work has come
                from refusing to hand off between the two roles.
            </>
        ),
    },
];

export default function Thoughts() {
    return (
        <section id="thoughts" className="py-24 relative">
            <div className="container mx-auto px-6 max-w-3xl">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold text-stone-900 dark:text-stone-50 mb-14 flex items-center gap-3"
                >
                    <span className="h-px w-8 bg-stone-400 dark:bg-stone-600"></span>
                    The stuff I think about
                </motion.h2>

                <div className="space-y-14">
                    {thoughts.map((t, i) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="relative pl-6 border-l border-stone-200 dark:border-stone-800"
                        >
                            <div className="font-mono text-[10px] tracking-[0.2em] text-stone-400 dark:text-stone-500 mb-3">
                                {String(i + 1).padStart(2, '0')}
                            </div>
                            <p className="text-xl md:text-2xl font-medium text-stone-900 dark:text-stone-100 leading-snug mb-4">
                                {t.lede}
                            </p>
                            <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-[15px]">
                                {t.body}
                            </p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
