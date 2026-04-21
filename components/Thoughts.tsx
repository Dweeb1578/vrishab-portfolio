'use client';
import { motion } from 'framer-motion';

type Thought = {
    lede: string;
    body: React.ReactNode;
};

const thoughts: Thought[] = [
    {
        lede: "I'm not bullish on AI because the models are smart. I'm bullish because most internal tools are stupid.",
        body: (
            <>
                A shared inbox, a Notion doc, a 12-step SOP &mdash; throw a model at any of them and they
                finally become usable. The MCP server I built at Zenskar isn&apos;t magic; it means our
                marketing analyst can ask <em>&ldquo;how did our pricing page do last week?&rdquo;</em> in
                English instead of juggling five tabs. Scale that kind of compression across a company
                and a 10-person team starts doing work that used to take 30.
            </>
        ),
    },
    {
        lede: 'Ship the version that is embarrassing. Then fix it.',
        body: (
            <>
                The Streaks feature I launched at Pinch had a hardcoded list of streak types for three
                weeks before we generalised it. The RAG chatbot at Zenskar went live with worse recall
                than I wanted &mdash; because putting it in front of real users surfaced failure modes no
                offline eval would have flagged. Every tool I&apos;ve built has been worse on day one
                than day thirty. That&apos;s not a bug; it&apos;s the only way I&apos;ve seen learning
                actually happen.
            </>
        ),
    },
    {
        lede: 'The interesting part of product work is the argument about what to cut.',
        body: (
            <>
                The interesting part of engineering is deciding which abstraction earns its keep. I
                like being in the seat where those two meet &mdash; someone who can argue a feature is
                worth shipping <em>and</em> write the code that ships it. Most of my best work has come
                from refusing to hand off between those two roles.
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
