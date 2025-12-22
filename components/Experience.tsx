'use client';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const experiences = [
    {
        company: "Pinch",
        role: "Founders Office Intern",
        period: "May 2025 - August 2025",
        description: "Working directly with founders on product strategy, fundraising, and operations.",
        details: [
            "Identified product gaps through competitive analysis of 7 networking apps and designed 3 Figma prototypes, leading to the prioritization of 2 high-impact roadmap features.",
            "Launched 'Streaks' gamification feature by coordinating with engineering and design, driving an 18% increase in 7-day user retention.",
            "Revamped the company website and implemented a new SEO strategy to improve organic search rankings.",
            "Built the investor pitch deck and sourced 34+ VCs, successfully securing 2 strategic investor meetings.",
            "Executed end-to-end hiring for 2 Marketing Executives via LinkedIn and Founder's Network."
        ],
        skills: ['Product Strategy', 'Figma', 'Growth', 'Fundraising', 'SEO'],
        color: "orange"
    },
    {
        company: "Stamp My Visa",
        role: "Generalist Intern",
        period: "May 2025 - July 2025",
        description: "Focused on UX optimization, process automation, and internal operations.",
        details: [
            "Redesigned the 'Automaton' product user flow and created UI mockups, streamlining a complex 9-step process into 4 steps to reduce drop-off.",
            "Produced 3 comprehensive training videos and onboarding decks, slashing new hire onboarding time from 2 weeks to just 5 days."
        ],
        skills: ['UX Design', 'Process Optimization', 'Operations', 'UI Mockups'],
        color: "stone"
    },
    {
        company: "Nam Nam Foods",
        role: "Product Marketing Intern",
        period: "Jan 2025 - March 2025",
        description: "Led digital growth strategies, packaging design, and content optimization.",
        details: [
            "Designed and executed a multi-channel Valentine's Campaign (Instagram, WhatsApp, Email), driving a 47% sales increase over 2 months.",
            "Optimized Instagram content strategy using analytics, growing account reach by 83% and followers by 15%.",
            "Redesigned product packaging based on customer feedback analysis to improve brand perception."
        ],
        skills: ['Growth Marketing', 'Analytics', 'GTM Strategy', 'Content'],
        color: "stone"
    }
];

export default function Experience() {
    return (
        <section id="experience" className="py-24 relative">
            <div className="container mx-auto px-6 max-w-5xl">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold text-stone-900 mb-16 flex items-center gap-3"
                >
                    <span className="h-px w-8 bg-orange-500"></span> Internships
                </motion.h2>

                <div className="relative border-l border-stone-200 ml-3 md:ml-6 space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative pl-8 md:pl-12 group"
                        >
                            {/* Timeline Dot */}
                            <div className={`absolute -left-[5px] top-6 h-2.5 w-2.5 rounded-full ring-4 ring-stone-100 transition-all duration-300 ${exp.color === 'orange' ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]' : 'bg-stone-400'}`}></div>

                            {/* Card */}
                            <div className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-orange-300 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-stone-900">{exp.role}</h3>
                                        <div className="text-orange-600 font-medium flex items-center gap-2 mt-1">
                                            <Briefcase size={16} /> {exp.company}
                                        </div>
                                    </div>
                                    <span className="text-xs font-mono text-stone-500 bg-stone-100 px-2 py-1 rounded border border-stone-200">
                                        {exp.period}
                                    </span>
                                </div>

                                <div className="text-stone-600 leading-relaxed">
                                    <p className="mb-3 italic text-stone-500">{exp.description}</p>
                                    <ul className="list-disc list-outside ml-4 space-y-2 marker:text-orange-500 mb-6">
                                        {exp.details.map((detail, i) => (
                                            <li key={i}>{detail}</li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-wrap gap-2">
                                        {exp.skills.map((tag) => (
                                            <span key={tag} className="px-2 py-1 rounded text-xs font-medium bg-orange-50/80 text-orange-600 border border-orange-100 hover:bg-orange-100 transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
