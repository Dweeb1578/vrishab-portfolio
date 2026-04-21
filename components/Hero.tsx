'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

export default function Hero() {
    return (
        <section id="about" className="min-h-screen flex flex-col justify-center pt-24 pb-12 relative overflow-hidden">

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-200/40 dark:bg-orange-500/10 blur-[120px] rounded-full -z-10 animate-pulse-slow"></div>

            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

                <div className="flex flex-col items-start z-10">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-mono mb-6"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                        Open to Product & Founder&apos;s Office Roles
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight text-stone-900 dark:text-stone-50 mb-6 leading-[1.1]"
                    >
                        Building <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 via-rose-500 to-amber-500 animate-gradient-x">Intelligent</span> <br />
                        Digital Products.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-lg text-stone-600 dark:text-stone-400 mb-8 max-w-xl leading-relaxed"
                    >
                        Hi, I&apos;m <strong className="text-stone-900 dark:text-stone-100">Vrishab Nair</strong>. I bridge the gap between engineering execution and user-centric product strategy. Currently building at the intersection of Hardware, AI, and Operations.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-wrap gap-4"
                    >
                        <a href="#contact" className="group px-7 py-3 bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 rounded-lg font-bold hover:bg-black dark:hover:bg-white transition-all flex items-center gap-2 shadow-lg shadow-stone-500/20 hover:shadow-xl">
                            Let&apos;s Talk <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href="https://drive.google.com/file/d/1th668sdyB2v7FSxbilI4CIue1TfVEVWJ/view?usp=sharing" target="_blank" className="px-7 py-3 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 rounded-lg font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-all flex items-center gap-2 shadow-sm">
                            <Download size={18} /> Resume
                        </a>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, type: 'spring', bounce: 0.4 }}
                    className="relative flex justify-center lg:justify-end"
                >
                    <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px]">
                        <div className="absolute inset-0 bg-linear-to-tr from-orange-500 to-rose-500 rounded-full blur-3xl opacity-20 dark:opacity-30 animate-spin-slow"></div>

                        <a
                            href="https://www.linkedin.com/in/vrishab-nair-212769290/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block relative rounded-full w-full h-full overflow-hidden border-[8px] border-white dark:border-stone-900 shadow-2xl z-10 hover:scale-[1.02] transition-transform duration-500 ring-1 ring-stone-900/5 dark:ring-white/10"
                        >
                            <img
                                src="/image_0.png"
                                alt="Vrishab Nair"
                                className="w-full h-full object-cover"
                            />
                        </a>
                    </div>
                </motion.div>

            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400 dark:text-stone-600"
            >
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-linear-to-b from-stone-400 dark:from-stone-600 to-transparent"></div>
            </motion.div>

        </section>
    );
}
