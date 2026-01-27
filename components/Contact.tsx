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
        <div className="text-center max-w-2xl mx-auto relative z-50">
            <h2 className="text-4xl font-bold text-stone-900 mb-6">Ready to collaborate?</h2>
            <p className="text-stone-600 mb-8">
                I'm always open to discussing Product Management roles, Engineering challenges, or just nerding out over new tech.
            </p>

            <div className="flex justify-center gap-4">

                {/* EMAIL BUTTON - CLICK TO COPY */}
                <button
                    onClick={handleCopyEmail}
                    className={`flex items-center justify-center gap-2 px-6 py-4 rounded-full transition-all cursor-pointer shadow-lg active:scale-95 border ${copied
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-700'
                        : 'bg-stone-900 border-transparent hover:bg-orange-600 hover:text-white text-stone-50'
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
                    className="flex items-center justify-center p-4 bg-stone-900 rounded-full hover:bg-blue-600 hover:text-white transition-all text-stone-50 cursor-pointer shadow-lg hover:shadow-blue-500/20 active:scale-95 border border-transparent"
                    aria-label="LinkedIn"
                >
                    <Linkedin size={24} />
                </a>

                {/* GITHUB BUTTON */}
                <a
                    href="https://github.com/Dweeb1578"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 bg-stone-900 rounded-full hover:bg-stone-700 hover:text-white transition-all text-stone-50 cursor-pointer shadow-lg hover:shadow-stone-500/20 active:scale-95 border border-transparent"
                    aria-label="GitHub"
                >
                    <Github size={24} />
                </a>


            </div>
        </div>
    );
}