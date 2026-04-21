'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, X, MessageCircle, ArrowRight } from 'lucide-react';

type Message = {
    role: 'user' | 'assistant' | 'system';
    content: string;
};

// Helper function to parse basic markdown to HTML
const parseMarkdown = (text: string): string => {
    return text
        // Bold: **text** or __text__
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/__(.+?)__/g, '<strong>$1</strong>')
        // Italics: *text* or _text_ (but not inside words)
        .replace(/(?<!\w)\*([^*]+?)\*(?!\w)/g, '<em>$1</em>')
        .replace(/(?<!\w)_([^_]+?)_(?!\w)/g, '<em>$1</em>')
        // Bullet points: * at start of line
        .replace(/^\* /gm, '• ');
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [showNudge, setShowNudge] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    // 1. Add State
    const [suggestion, setSuggestion] = useState<string | null>(null);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // These only show up when the chat is empty (The "Welcome" state)
    const sampleQuestions = [
        "Tell me about your internships 💼",
        "What is the PM Coach AI? 🤖",
        "What are your top technical skills? 💻",
        "Explain your product strategy 📈"
    ];

    useEffect(() => {
        const timer = setTimeout(() => { setShowNudge(true); }, 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages.length, isLoading]);

    const handleSendMessage = async (content: string) => {
        if (!content.trim()) return;

        const userMessage: Message = { role: 'user', content };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setSuggestion(null); // Clear suggestion on send
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages }),
            });

            if (!response.body) throw new Error("No response body");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let aiResponse = "";
            let fullStreamBuffer = ""; // To track hidden tags

            setMessages((prev) => [...prev, { role: 'assistant', content: "" }]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                fullStreamBuffer += chunk;

                // Extract Suggestion
                const suggestionMatch = fullStreamBuffer.match(/\[SUGGESTION: (.*?)\]/);
                if (suggestionMatch) {
                    setSuggestion(suggestionMatch[1]);
                    // We DON'T add the suggestion tag to the visible message
                    aiResponse = fullStreamBuffer.replace(/\[SUGGESTION: .*?\]/, "");
                } else {
                    aiResponse = fullStreamBuffer;
                }

                setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { role: 'assistant', content: aiResponse };
                    return updated;
                });
            }

        } catch (error) {
            console.error("Error fetching chat:", error);
            setMessages((prev) => [...prev, { role: 'assistant', content: "Sorry, I encountered an error. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(input);
    };

    // TAB HANDLER
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Tab' && suggestion && !input) {
            e.preventDefault();
            setInput(suggestion);
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
        setShowNudge(false);
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none">

            {/* NUDGE BUBBLE */}
            {!isOpen && showNudge && (
                <div className="pointer-events-auto mb-4 mr-2 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 p-4 rounded-xl shadow-xl border border-stone-200 dark:border-stone-800 w-[240px] relative animate-in slide-in-from-bottom-5 fade-in duration-500">
                    <button onClick={() => setShowNudge(false)} className="absolute top-2 right-2 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"><X size={14} /></button>
                    <div className="flex gap-3 items-start">
                        <div className="bg-orange-50 dark:bg-orange-500/10 p-2 rounded-full shrink-0 border border-orange-100 dark:border-orange-500/30"><Sparkles size={18} className="text-orange-500" /></div>
                        <div>
                            <p className="font-bold text-sm mb-1 text-stone-900 dark:text-stone-50">Curious about my work?</p>
                            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">Ask me about my <strong>Internships</strong> or <strong>Product Decks</strong>!</p>
                        </div>
                    </div>
                    <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-stone-900 transform rotate-45 border-r border-b border-stone-200 dark:border-stone-800"></div>
                </div>
            )}

            {/* CHAT WINDOW */}
            <div className={`transition-all duration-300 pointer-events-auto origin-bottom-right ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none h-0'}`}>
                {isOpen && (
                    <div className="mb-16 sm:mb-4 w-[90vw] h-[75vh] sm:w-[350px] sm:h-[550px] bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col overflow-hidden ring-1 ring-black/5 dark:ring-white/5">

                        {/* Header */}
                        <div className="bg-stone-50 dark:bg-stone-950 p-4 flex justify-between items-center border-b border-stone-100 dark:border-stone-800 shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                <h3 className="font-bold text-stone-800 dark:text-stone-100">Dweeby</h3>
                            </div>
                            <button onClick={toggleChat} className="hover:bg-stone-200 dark:hover:bg-stone-800 p-1 rounded text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"><X size={18} /></button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-4 overflow-y-auto bg-white dark:bg-stone-900 space-y-4 text-sm scrollbar-thin scrollbar-thumb-stone-200 dark:scrollbar-thumb-stone-700 scrollbar-track-transparent">

                            {/* WELCOME STATE: Only shown when messages is empty */}
                            {messages.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full space-y-6">
                                    <div className="text-center">
                                        <div className="bg-orange-50 dark:bg-orange-500/10 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-100 dark:border-orange-500/30"><Bot size={28} className="text-orange-500" /></div>
                                        <p className="font-medium text-stone-500 dark:text-stone-400">Hi! I&apos;m Vrishab&apos;s virtual assistant.</p>
                                    </div>

                                    <div className="w-full grid gap-2 px-1">
                                        <p className="text-xs text-stone-400 dark:text-stone-500 font-mono mb-1 uppercase tracking-wider text-center">Suggested Questions</p>
                                        {sampleQuestions.map((q, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleSendMessage(q)}
                                                className="text-left text-xs bg-stone-50 dark:bg-stone-800 hover:bg-white dark:hover:bg-stone-700 border border-stone-100 dark:border-stone-700 hover:border-orange-300 dark:hover:border-orange-500/50 text-stone-600 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 p-3 rounded-xl transition-all flex items-center justify-between group hover:shadow-md cursor-pointer"
                                            >
                                                <span className="truncate mr-2">{q}</span>
                                                <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 text-orange-400 shrink-0 transition-all" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {messages.map((m, i) => (
                                <div key={i} className={`flex gap-2 mb-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {m.role !== 'user' && (
                                        <div className="w-6 h-6 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1 hidden sm:flex"><Bot size={12} className="text-orange-500" /></div>
                                    )}
                                    <div className={`flex flex-col gap-2 max-w-[85%] ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                                        {/* BUBBLE SPLITTING LOGIC - MODIFIED FOR STREAMING & WIDGETS */}
                                        {
                                            m.content.split('|||').map((bubbleText, bubbleIndex) => {
                                                if (!bubbleText.trim()) return null;

                                                // Check for Widget Markers
                                                // const hasSkillsWidget = bubbleText.includes('[WIDGET: SKILLS]'); // Removed
                                                const cleanText = bubbleText.replace('[WIDGET: SKILLS]', '').trim();

                                                return (
                                                    <div key={bubbleIndex} className="flex flex-col w-full">
                                                        {cleanText && (
                                                            <div
                                                                className={`p-3 rounded-2xl shadow-sm ${m.role === 'user'
                                                                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-br-none'
                                                                    : 'bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 text-stone-800 dark:text-stone-200 rounded-bl-none'
                                                                    }`}
                                                            >
                                                                <p
                                                                    className="whitespace-pre-wrap leading-relaxed [&>em]:italic [&>strong]:font-semibold"
                                                                    dangerouslySetInnerHTML={{ __html: parseMarkdown(cleanText) }}
                                                                />
                                                            </div>
                                                        )}

                                                        {/* Render Widget if Present */}
                                                        {/* {hasSkillsWidget && ( // Removed
                                                            <div className="mt-2 w-full max-w-full overflow-hidden">
                                                                <SkillsWidget />
                                                            </div>
                                                        )} */}
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-2 justify-start">
                                    <div className="w-6 h-6 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-full flex items-center justify-center flex-shrink-0 hidden sm:flex"><Bot size={12} className="text-orange-500" /></div>
                                    <div className="bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 p-3 rounded-2xl rounded-bl-none">
                                        <div className="flex gap-1"><span className="w-1.5 h-1.5 bg-stone-400 dark:bg-stone-500 rounded-full animate-bounce"></span><span className="w-1.5 h-1.5 bg-stone-400 dark:bg-stone-500 rounded-full animate-bounce delay-100"></span><span className="w-1.5 h-1.5 bg-stone-400 dark:bg-stone-500 rounded-full animate-bounce delay-200"></span></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area (No suggestions bar above it) */}
                        <form onSubmit={handleSubmit} className="p-3 bg-stone-50 dark:bg-stone-950 border-t border-stone-100 dark:border-stone-800 flex gap-2 shrink-0">
                            <div className="relative flex-1">
                                <input
                                    className="flex-1 p-2.5 text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 transition-all"
                                    value={input}
                                    placeholder={suggestion ? `Tab: ${suggestion}` : "Ask me anything..."}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <button type="submit" disabled={isLoading || !input} className="bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 p-2.5 rounded-xl hover:bg-orange-600 dark:hover:bg-orange-500 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-stone-900/10 hover:shadow-orange-500/20"><Send size={18} /></button>
                        </form>
                    </div>
                )}
            </div>

            {/* FLOATING BUTTON */}
            <button onClick={toggleChat} className="pointer-events-auto h-12 w-12 sm:h-14 sm:w-14 bg-stone-900 dark:bg-stone-100 hover:bg-orange-600 dark:hover:bg-orange-500 text-white dark:text-stone-900 dark:hover:text-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-orange-500/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-50 ring-2 ring-white dark:ring-stone-900 md:ring-stone-50 dark:md:ring-stone-900">{isOpen ? <X size={24} /> : <MessageCircle size={28} />}</button>
        </div>
    );
}