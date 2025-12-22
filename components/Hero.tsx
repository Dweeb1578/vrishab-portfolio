'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Sparkles } from 'lucide-react';

export default function Hero() {
    return (
        <section id="about" className="min-h-screen flex flex-col justify-center pt-24 pb-12 relative overflow-hidden">

            {/* Background Elements specific to Hero */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full -z-10 animate-pulse-slow"></div>

            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

                {/* Left Column: Text */}
                <div className="flex flex-col items-start z-10">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Open to Product & Founder's Office Roles
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
                    >
                        Building <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-emerald-400 animate-gradient-x">Intelligent</span> <br />
                        Digital Products.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed"
                    >
                        Hi, I'm <strong className="text-slate-200">Vrishab Nair</strong>. I bridge the gap between engineering execution and user-centric product strategy. Currently building at the intersection of Hardware, AI, and Operations.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-wrap gap-4"
                    >
                        <a href="#contact" className="group px-7 py-3 bg-white text-slate-950 rounded-lg font-bold hover:bg-slate-200 transition-all flex items-center gap-2 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.5)]">
                            Let's Talk <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href="https://drive.google.com/file/d/1Ga_cKxQoXSYBG85ZAYnXUPwcUu9YhDaE/view?usp=sharing" target="_blank" className="px-7 py-3 bg-slate-900 text-white border border-slate-700 rounded-lg font-medium hover:bg-slate-800 transition-all flex items-center gap-2">
                            <Download size={18} /> Resume
                        </a>
                    </motion.div>
                </div>

                {/* Right Column: Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.4 }}
                    className="relative flex justify-center lg:justify-end"
                >
                    <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px]">
                        {/* Spinning/Glow Effect behind image */}
                        <div className="absolute inset-0 bg-linear-to-tr from-blue-500 to-purple-500 rounded-full blur-2xl opacity-20 animate-spin-slow"></div>

                        <a
                            href="https://www.linkedin.com/in/vrishab-nair-212769290/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block relative rounded-full w-full h-full overflow-hidden border-[8px] border-slate-950 shadow-2xl z-10 hover:scale-[1.02] transition-transform duration-500"
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

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
            >
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-linear-to-b from-slate-500 to-transparent"></div>
            </motion.div>

        </section>
    );
}
