'use client';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectCarousel from './ProjectCarousel';

export default function Projects() {
    return (
        <section id="work" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold text-stone-900 dark:text-stone-50 mb-4 flex items-center gap-3"
                >
                    <span className="h-px w-8 bg-rose-500"></span> Selected Work
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-stone-500 dark:text-stone-400 mb-12 flex items-center gap-2 ml-11"
                >
                    <Code2 size={14} className="text-rose-500" />
                    <span className="text-sm font-mono">{projects.length} projects · scroll horizontally</span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                >
                    <ProjectCarousel projects={projects} />
                </motion.div>
            </div>
        </section>
    );
}
