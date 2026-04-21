'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Github, Check } from 'lucide-react';

export default function Contact() {
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('vrishabnair44@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="text-center max-w-2xl mx-auto relative z-50">
            <h2 className="text-4xl font-bold text-stone-900 dark:text-stone-50 mb-6">
                Ready to collaborate?
            </h2>
            <p className="text-stone-600 dark:text-stone-400 mb-5">
                I&apos;m always open to discussing Product Management roles, Engineering challenges, or just nerding out over new tech.
            </p>

            <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 mb-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-xs font-medium text-emerald-700 dark:text-emerald-400"
            >
                <span className="relative flex w-2 h-2" aria-hidden>
                    <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                    <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500"></span>
                </span>
                Open to Product &amp; Founder&apos;s Office roles · Bangalore / remote
            </motion.div>

            <div className="flex justify-center gap-4">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopyEmail}
                    className={`flex items-center justify-center gap-2 px-6 py-4 rounded-full transition-colors cursor-pointer shadow-lg border ${
                        copied
                            ? 'bg-emerald-100 dark:bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                            : 'bg-stone-900 dark:bg-stone-100 border-transparent hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white dark:hover:text-white text-stone-50 dark:text-stone-900'
                    }`}
                    aria-label="Copy email"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {copied ? (
                            <motion.span
                                key="check"
                                initial={{ scale: 0.4, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.4, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 520, damping: 18 }}
                                className="flex items-center gap-2"
                            >
                                <Check size={24} />
                                <span className="font-bold text-sm">Copied!</span>
                            </motion.span>
                        ) : (
                            <motion.span
                                key="mail"
                                initial={{ scale: 0.6, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.6, opacity: 0 }}
                                transition={{ duration: 0.18 }}
                            >
                                <Mail size={24} />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>

                <motion.a
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://linkedin.com/in/vrishab-nair-212769290/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 bg-stone-900 dark:bg-stone-100 rounded-full hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition-colors text-stone-50 dark:text-stone-900 cursor-pointer shadow-lg hover:shadow-blue-500/20 border border-transparent"
                    aria-label="LinkedIn"
                >
                    <Linkedin size={24} />
                </motion.a>

                <motion.a
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://github.com/Dweeb1578"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 bg-stone-900 dark:bg-stone-100 rounded-full hover:bg-stone-700 dark:hover:bg-stone-300 hover:text-white dark:hover:text-stone-900 transition-colors text-stone-50 dark:text-stone-900 cursor-pointer shadow-lg hover:shadow-stone-500/20 border border-transparent"
                    aria-label="GitHub"
                >
                    <Github size={24} />
                </motion.a>
            </div>
        </div>
    );
}
