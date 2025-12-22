'use client';
import { motion } from 'framer-motion';
import { Code2, Zap, Bot, Workflow } from 'lucide-react';
import { Spotlight } from './ui/Spotlight';

const projects = [
    {
        title: "Portfolio RAG AI",
        description: "An intelligent portfolio assistant powered by Llama 3 and Vector Embeddings. It reads my technical resume and answers recruiter questions in real-time.",
        tags: ["Next.js", "Pinecone", "AI SDK"],
        icon: <Zap size={24} />,
        color: "text-purple-400",
        bgHover: "hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)]",
        borderHover: "hover:border-purple-500/50",
        iconBg: "bg-purple-500/10",
    },
    {
        title: "PM Coach AI",
        description: "A Senior PM mentor bot. Fine-tuned Llama 7B on 3,000+ FAANG questions and built a RAG pipeline with ChromaDB to index curated product strategy literature.",
        tags: ["Llama 7B", "Unsloth", "ChromaDB"],
        icon: <Bot size={24} />,
        color: "text-blue-400",
        bgHover: "hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)]",
        borderHover: "hover:border-blue-500/50",
        iconBg: "bg-blue-500/10",
    },
    {
        title: "Sentiment Auto-Router",
        description: "Engineered an autonomous workflow to process anonymous letters. Integrated NLP sentiment analysis to filter toxicity and route positive messages, boosting efficiency by 200%.",
        tags: ["n8n", "NLP", "Webhooks"],
        icon: <Workflow size={24} />,
        color: "text-emerald-400",
        bgHover: "hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)]",
        borderHover: "hover:border-emerald-500/50",
        iconBg: "bg-emerald-500/10",
    },
];

export default function Projects() {
    return (
        <section id="work" className="py-24 relative">
            <div className="container mx-auto px-6 max-w-5xl">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold text-white mb-12 flex items-center gap-3"
                >
                    <span className="h-px w-8 bg-purple-500"></span> Selected Work
                </motion.h2>

                <div className="mb-16">
                    <h3 className="text-xl font-bold text-slate-200 mb-8 flex items-center gap-2">
                        <Code2 className="text-purple-400" size={20} /> Tech Projects
                    </h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="h-full"
                            >
                                <Spotlight className={`h-full p-8 rounded-2xl bg-slate-900/50 border border-slate-800 transition-all duration-300 flex flex-col group ${project.borderHover} ${project.bgHover}`}>
                                    <div className={`absolute top-8 right-8 p-3 rounded-xl ${project.iconBg} ${project.color} transition-transform group-hover:scale-110 duration-300`}>
                                        {project.icon}
                                    </div>
                                    <h3 className={`text-2xl font-bold text-white mb-2 transition-colors group-hover:${project.color.replace('text-', 'text-')}`}>{project.title}</h3>
                                    <p className="text-slate-400 mb-6 flex-1 relative z-10">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-slate-800 rounded-full text-xs font-mono text-slate-300 border border-slate-700/50">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </Spotlight>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
