'use client';

import { useState } from 'react';
import { Mail, Linkedin, Github, Check, Copy } from 'lucide-react';

export default function Contact() {
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("vrishabnair44@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="py-20 border-t border-slate-800 scroll-mt-24 relative z-40">
            <div className="text-center max-w-2xl mx-auto relative z-50">
                <h2 className="text-4xl font-bold text-white mb-6">Ready to collaborate?</h2>
                <p className="text-slate-400 mb-8">
                    I'm always open to discussing Product Management roles, Engineering challenges, or just nerding out over new tech.
                </p>

                <div className="flex justify-center gap-4">

                    {/* EMAIL BUTTON - CLICK TO COPY */}
                    <button
                        onClick={handleCopyEmail}
                        className={`flex items-center justify-center gap-2 px-6 py-4 rounded-full transition-all cursor-pointer shadow-lg active:scale-95 border ${copied
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                            : 'bg-slate-800 border-transparent hover:bg-blue-600 hover:text-white text-slate-300'
                            }`}
                        aria-label="Copy Email"
                    >
                        {copied ? <Check size={24} /> : <Mail size={24} />}
                        {copied && <span className="font-bold text-sm">Copied!</span>}
                    </button>

                    {/* LINKEDIN BUTTON */}
                    <a
                        href="https://linkedin.com/in/vrishab-nair-212769290/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center p-4 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition-all text-slate-300 cursor-pointer shadow-lg hover:shadow-blue-500/20 active:scale-95 border border-transparent"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={24} />
                    </a>


                </div>
            </div>
        </section>
    );
}