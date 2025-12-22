'use client';
import { motion } from 'framer-motion';
import { Users, Zap, Flag } from 'lucide-react';

export default function Leadership() {
    return (
        <section id="leadership" className="py-24 relative">
            <div className="container mx-auto px-6 max-w-5xl">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold text-white mb-12 flex items-center gap-3"
                >
                    <span className="h-px w-8 bg-emerald-500"></span> Leadership
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-6">

                    {/* PoR 1: 180DC */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/30 transition-all md:col-span-2 group hover:bg-slate-900/60"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg text-slate-100 group-hover:text-emerald-400 transition-colors">President</h3>
                                <div className="text-emerald-500 text-sm font-medium">180 Degrees Consulting, BITS Hyderabad</div>
                            </div>
                            <Users size={20} className="text-slate-600 group-hover:text-emerald-500 transition-colors" />
                        </div>
                        <div className="text-slate-400 text-sm space-y-4">
                            <p>
                                Leading a branch of 25+ consultants to solve strategic problems for social enterprises and startups.
                                Responsible for client acquisition, project delivery, and branch strategy.
                            </p>
                            <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl group-hover:bg-emerald-500/10 transition-colors">
                                <h4 className="text-emerald-300 font-semibold mb-2 text-xs uppercase tracking-wide flex items-center gap-2">
                                    <Zap size={12} /> Current Strategic Engagement
                                </h4>
                                <p className="mb-2">
                                    Directing a high-impact project with an early-stage <strong>FinTech Startup</strong> to simplify personal finance & IT returns.
                                </p>
                                <ul className="list-disc list-outside ml-4 space-y-1 marker:text-emerald-500">
                                    <li>Spearheading <strong>User Research</strong> and interviews to identify pain points in the current tax-filing workflow.</li>
                                    <li>Leading the <strong>UI/UX Overhaul</strong> of the core money-tracking dashboard to improve usability and retention.</li>
                                    <li>Collaborating with founders on <strong>Feature Development</strong> prioritization for the Q3 product roadmap.</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* PoR 2: NSS */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/30 transition-all group hover:bg-slate-900/60"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg text-slate-100 group-hover:text-emerald-400 transition-colors">Student's Anonymous Lead</h3>
                                <div className="text-emerald-500 text-sm font-medium">National Service Scheme</div>
                            </div>
                            <Users size={20} className="text-slate-600 group-hover:text-emerald-500 transition-colors" />
                        </div>
                        <div className="text-slate-400 text-sm space-y-3">
                            <p>Leading a 22-member peer support team providing confidential counseling for students.</p>
                            <ul className="list-disc list-outside ml-4 space-y-2 marker:text-emerald-500">
                                <li><strong>Automated "The Appreciation Project":</strong> Built an <strong>n8n workflow</strong> with <strong>Sentiment Analysis</strong> to filter and route messages from Google Forms to recipients.</li>
                                <li>Eliminated manual verification "grunt work," boosting operational efficiency by <strong>200%</strong>.</li>
                                <li>Organized 6 mental health awareness events reaching 300+ students.</li>
                            </ul>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <span className="px-2 py-1 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">n8n Automation</span>
                                <span className="px-2 py-1 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Sentiment Analysis</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* PoR 3: Dept of Publicity */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/30 transition-all group hover:bg-slate-900/60"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg text-slate-100 group-hover:text-emerald-400 transition-colors">Social Media Lead</h3>
                                <div className="text-emerald-500 text-sm font-medium">Dept. of Publicity and Public Relations</div>
                            </div>
                            <Flag size={20} className="text-slate-600 group-hover:text-emerald-500 transition-colors" />
                        </div>
                        <ul className="list-disc list-outside ml-4 text-sm text-slate-400 space-y-2 marker:text-emerald-500">
                            <li>Managed ATMOS 2024 Instagram (8k+ followers) and developed content strategy.</li>
                            <li>Executed paid ads driving 3M+ reach and ₹19L in ticket sales (78% YoY increase).</li>
                        </ul>
                        <div className="flex flex-wrap gap-2 mt-3">
                            <span className="px-2 py-1 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Content Strategy</span>
                            <span className="px-2 py-1 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Performance Marketing</span>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
