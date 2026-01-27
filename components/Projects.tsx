'use client';
import { motion } from 'framer-motion';
import { Code2, Zap, Bot, Workflow, QrCode, FileText, Mail } from 'lucide-react';
import { Spotlight } from './ui/Spotlight';

const projects = [
    {
        title: "VC Outreach Automation",
        description: "B2B Research & Personalization Engine using n8n and Serper.dev. Automates lead research reducing manual time by 90% and drafts personalized hooks with Groq.",
        tags: ["n8n", "Serper.dev", "Groq"],
        icon: <Mail size={13} />,
        color: "text-purple-500",
        bgHover: "hover:shadow-[0_4px_20px_-5px_rgba(168,85,247,0.3)]",
        borderHover: "hover:border-purple-200",
        iconBg: "bg-purple-50",
    },
    {
        title: "Resume Optimization Engine",
        description: "A RAG-based resume improver enabling real-time rewriting. Features a hybrid multi-LLM pipeline (Gemini + Llama 3) for <200ms latency.",
        tags: ["Python", "LangChain", "Gemini"],
        icon: <FileText size={13} />,
        color: "text-blue-500",
        bgHover: "hover:shadow-[0_4px_20px_-5px_rgba(59,130,246,0.3)]",
        borderHover: "hover:border-blue-200",
        iconBg: "bg-blue-50",
    },
    {
        title: "Dynamic QR Code Generator",
        description: "A custom QR solution enabling real-time URL updates without re-printing. Features an interactive analytics dashboard and on-the-fly hex-color customization.",
        tags: ["Python (Flask)", "Chart.js", "Pillow"],
        icon: <QrCode size={13} />,
        color: "text-emerald-500",
        bgHover: "hover:shadow-[0_4px_20px_-5px_rgba(16,185,129,0.3)]",
        borderHover: "hover:border-emerald-200",
        iconBg: "bg-emerald-50",
    },
    {
        title: "AI Portfolio Interactive Chatbot",
        description: "An intelligent portfolio assistant powered by Llama 3 and Vector Embeddings. It reads my technical resume and answers recruiter questions in real-time.",
        tags: ["Next.js", "Pinecone", "AI SDK"],
        icon: <Zap size={13} />,
        color: "text-rose-500",
        bgHover: "hover:shadow-[0_4px_20px_-5px_rgba(251,113,133,0.3)]",
        borderHover: "hover:border-rose-200",
        iconBg: "bg-rose-50",
    },
    {
        title: "Fine-tuned PM Mentor/Interviewer",
        description: "A Senior PM mentor bot. Fine-tuned Llama 7B on 3,000+ FAANG questions and built a RAG pipeline with ChromaDB to index curated product strategy literature.",
        tags: ["Llama 7B", "Unsloth", "ChromaDB"],
        icon: <Bot size={13} />,
        color: "text-orange-500",
        bgHover: "hover:shadow-[0_4px_20px_-5px_rgba(249,115,22,0.3)]",
        borderHover: "hover:border-orange-200",
        iconBg: "bg-orange-50",
    },
    {
        title: "Sentiment Auto-Router",
        description: "Engineered an autonomous workflow to process anonymous letters. Integrated NLP sentiment analysis to filter toxicity and route positive messages, boosting efficiency by 200%.",
        tags: ["n8n", "NLP", "Webhooks"],
        icon: <Workflow size={13} />,
        color: "text-amber-500",
        bgHover: "hover:shadow-[0_4px_20px_-5px_rgba(245,158,11,0.3)]",
        borderHover: "hover:border-amber-200",
        iconBg: "bg-amber-50",
    },
    {
        title: "Shywarma Enterprise Grade Chatbot",
        description: "A high-performance travel chatbot using specialized RAG to dynamically reduce hotel prices by 30-40%. Features multi-layer Redis caching for 90% latency reduction.",
        tags: ["Redis", "RAG", "TypeScript"],
        icon: <Zap size={13} />, // Reusing Zap or similar, or I should import a new one. Let's check imports.
        color: "text-indigo-500",
        bgHover: "hover:shadow-[0_4px_20px_-5px_rgba(99,102,241,0.3)]",
        borderHover: "hover:border-indigo-200",
        iconBg: "bg-indigo-50",
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
                    className="text-3xl font-bold text-stone-900 mb-12 flex items-center gap-3"
                >
                    <span className="h-px w-8 bg-rose-500"></span> Selected Work
                </motion.h2>

                <div className="mb-16">
                    <h3 className="text-xl font-bold text-stone-800 mb-8 flex items-center gap-2">
                        <Code2 className="text-rose-500" size={20} /> Tech Projects
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
                                <Spotlight className={`h-full p-8 rounded-2xl bg-white border border-stone-200 transition-all duration-300 flex flex-col group ${project.borderHover} ${project.bgHover}`}>
                                    <div className={`absolute top-8 right-8 p-3 rounded-xl ${project.iconBg} ${project.color} transition-transform group-hover:scale-110 duration-300`}>
                                        {project.icon}
                                    </div>
                                    <h3 className={`text-2xl font-bold text-stone-900 mb-2 transition-colors group-hover:${project.color.replace('text-', 'text-')}`}>{project.title}</h3>
                                    <p className="text-stone-600 mb-6 flex-1 relative z-10">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-stone-100 rounded-full text-xs font-mono text-stone-600 border border-stone-200">
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
