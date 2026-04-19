'use client';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { leadership } from '../data/leadership';

export default function Leadership() {
    return (
        <section id="leadership" className="py-24 relative">
            <div className="container mx-auto px-6 max-w-5xl">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold text-stone-900 mb-12 flex items-center gap-3"
                >
                    <span className="h-px w-8 bg-amber-500"></span> Leadership
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {leadership.map((role, index) => {
                        const Icon = role.icon;
                        return (
                            <motion.div
                                key={role.org}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`p-6 rounded-2xl bg-white border border-stone-200 hover:border-amber-300 transition-all group hover:shadow-lg shadow-sm ${role.featured ? 'md:col-span-2' : ''}`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg text-stone-900 group-hover:text-amber-600 transition-colors">
                                            {role.role}
                                        </h3>
                                        <div className="text-amber-600 text-sm font-medium">{role.org}</div>
                                    </div>
                                    <Icon size={20} className="text-stone-400 group-hover:text-amber-500 transition-colors" />
                                </div>

                                <div className="text-stone-600 text-sm space-y-4">
                                    <p>{role.summary}</p>

                                    {role.bullets.length > 0 && (
                                        <ul className="list-disc list-outside ml-4 space-y-2 marker:text-amber-500">
                                            {role.bullets.map((bullet, i) => (
                                                <li key={i}>{bullet.text}</li>
                                            ))}
                                        </ul>
                                    )}

                                    {role.callout && (
                                        <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl group-hover:bg-amber-100/50 transition-colors">
                                            <h4 className="text-amber-600 font-semibold mb-2 text-xs uppercase tracking-wide flex items-center gap-2">
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
                                                    className="px-2 py-1 rounded text-[10px] font-medium bg-amber-50 text-amber-600 border border-amber-100"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
