'use client';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { Spotlight } from './ui/Spotlight';
import { projects, projectColorClasses } from '../data/projects';

export default function Projects() {
    return (
        <section id="work" className="py-24 relative">
            <div className="container mx-auto px-6 max-w-5xl">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold text-stone-900 mb-12 flex items-center gap-3"
                >
                    <span className="h-px w-8 bg-rose-500"></span> Selected Work
                </motion.h2>

                <div className="mb-16">
                    <h3 className="text-xl font-bold text-stone-800 mb-8 flex items-center gap-2">
                        <Code2 className="text-rose-500" size={20} /> Tech Projects
                    </h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => {
                            const Icon = project.icon;
                            const c = projectColorClasses[project.color];
                            return (
                                <motion.div
                                    key={project.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="h-full"
                                >
                                    <Spotlight
                                        className={`h-full p-8 rounded-2xl bg-white border border-stone-200 transition-all duration-300 flex flex-col group ${c.borderHover} ${c.shadowHover}`}
                                    >
                                        <div
                                            className={`absolute top-8 right-8 p-3 rounded-xl ${c.bgSoft} ${c.text} transition-transform group-hover:scale-110 duration-300`}
                                        >
                                            <Icon size={13} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-stone-900 mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-stone-600 mb-6 flex-1 relative z-10">
                                            {project.hook}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 bg-stone-100 rounded-full text-xs font-mono text-stone-600 border border-stone-200"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </Spotlight>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
