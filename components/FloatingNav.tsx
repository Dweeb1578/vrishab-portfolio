'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, FolderGit2, Send, Zap } from 'lucide-react';

const navItems = [
    { name: 'About', link: '#about', icon: <User size={18} /> },
    { name: 'Experience', link: '#experience', icon: <Briefcase size={18} /> },
    { name: 'Work', link: '#work', icon: <FolderGit2 size={18} /> },
    { name: 'Contact', link: '#contact', icon: <Send size={18} /> },
];

export default function FloatingNav() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-6 inset-x-0 mx-auto max-w-fit z-50 pointer-events-auto"
        >
            <div className="flex items-center gap-1 px-3 py-3 rounded-full bg-white/70 backdrop-blur-md border border-stone-200 shadow-xl shadow-stone-500/5 ring-1 ring-black/5">

                {/* Brand/Home Icon */}
                <a href="#" className="pl-3 pr-4 font-bold text-stone-900 hover:text-orange-600 transition-colors border-r border-stone-200 mr-1 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-linear-to-tr from-orange-500 to-rose-500 flex items-center justify-center text-white text-xs shadow-md">VN</div>
                </a>

                {navItems.map((item, idx) => (
                    <a
                        key={item.name}
                        href={item.link}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="relative px-4 py-2 text-sm font-medium text-stone-600 transition-colors hover:text-stone-900"
                    >
                        <AnimatePresence>
                            {hoveredIndex === idx && (
                                <motion.span
                                    className="absolute inset-0 rounded-full bg-stone-100 -z-10"
                                    layoutId="hoverBackground"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                                />
                            )}
                        </AnimatePresence>
                        <span className="flex items-center gap-2">
                            <span className="hidden sm:inline">{item.name}</span>
                            <span className="sm:hidden">{item.icon}</span>
                        </span>
                    </a>
                ))}

            </div>
        </motion.div>
    );
}
