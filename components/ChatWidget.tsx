'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, X, MessageCircle, ArrowRight } from 'lucide-react';

type Message = {
    role: 'user' | 'assistant' | 'system';
    content: string;
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [showNudge, setShowNudge] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const sampleQuestions = [
        "Tell me about your internships 💼",
        "What is the PM Coach AI project? 🤖",
        "What are your top technical skills? 💻",
        "Explain your product strategy approach 📈"
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNudge(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (content: string) => {
        if (!content.trim()) return;

        const userMessage: Message = { role: 'user', content };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
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

            setMessages((prev) => [...prev, { role: 'assistant', content: "" }]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                aiResponse += chunk;
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

    const toggleChat = () => {
        setIsOpen(!isOpen);
        setShowNudge(false);
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none">

            {/* NUDGE BUBBLE - NOW VISIBLE ON MOBILE */}
            {!isOpen && showNudge && (
                <div className="pointer-events-auto mb-4 mr-2 bg-slate-800 text-slate-200 p-4 rounded-xl shadow-2xl border border-slate-700 w-[240px] relative animate-in slide-in-from-bottom-5 fade-in duration-500">
                    <button
                        onClick={() => setShowNudge(false)}
                        className="absolute top-2 right-2 text-slate-500 hover:text-white transition-colors"
                    >
                        <X size={14} />
                    </button>
                    <div className="flex gap-3 items-start">
                        <div className="bg-slate-900 p-2 rounded-full shrink-0 border border-slate-700">
                            <Sparkles size={18} className="text-blue-400" />
                        </div>
                        <div>
                            <p className="font-bold text-sm mb-1 text-white">Curious about my work?</p>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Ask me about my <strong>Internships</strong> or <strong>Product Decks</strong>!
                            </p>
                        </div>
                    </div>
                    <div className="absolute -bottom-2 right-6 w-4 h-4 bg-slate-800 transform rotate-45 border-r border-b border-slate-700"></div>
                </div>
            )}

            {/* CHAT WINDOW */}
            <div className={`transition-all duration-300 pointer-events-auto origin-bottom-right ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none h-0'}`}>
                {isOpen && (
                    <div className="mb-16 sm:mb-4 w-[90vw] h-[75vh] sm:w-[350px] sm:h-[550px] bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden ring-1 ring-white/10">

                        {/* Header */}
                        <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700 shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                <h3 className="font-bold text-slate-100">Dweeby</h3>
                            </div>
                            <button onClick={toggleChat} className="hover:bg-slate-700 p-1 rounded text-slate-400 hover:text-white transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-4 overflow-y-auto bg-slate-900 space-y-4 text-sm scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">

                            {messages.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full space-y-6">
                                    <div className="text-center">
                                        <div className="bg-slate-800 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
                                            <Bot size={28} className="text-blue-500/50" />
                                        </div>
                                        <p className="font-medium text-slate-400">Hi! I'm Vrishab's virtual assistant.</p>
                                    </div>

                                    <div className="w-full grid gap-2 px-1">
                                        <p className="text-xs text-slate-500 font-mono mb-1 uppercase tracking-wider text-center">Suggested Questions</p>
                                        {sampleQuestions.map((q, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleSendMessage(q)}
                                                className="text-left text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500/50 text-slate-300 p-3 rounded-xl transition-all flex items-center justify-between group"
                                            >
                                                <span className="truncate mr-2">{q}</span>
                                                <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 text-blue-400 shrink-0 transition-all" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ... inside the scrollable area ... */}

                            {messages.map((m, i) => (
                                <div
                                    key={i}
                                    className={`flex gap-2 mb-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {/* AVATAR (Left side, Assistant only) */}
                                    {m.role !== 'user' && (
                                        <div className="w-6 h-6 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1 hidden sm:flex">
                                            <Bot size={12} className="text-blue-400" />
                                        </div>
                                    )}

                                    {/* BUBBLE STACK CONTAINER */}
                                    <div className={`flex flex-col gap-2 max-w-[85%] ${m.role === 'user' ? 'items-end' : 'items-start'}`}>

                                        {/* THE SPLIT LOGIC: 
         1. Split the message by '|||'
         2. Map each part to a bubble 
      */}
                                        {m.content.split('|||').map((bubbleText, bubbleIndex) => {
                                            // Skip empty bubbles (happens during streaming sometimes)
                                            if (!bubbleText.trim()) return null;

                                            return (
                                                <div
                                                    key={bubbleIndex}
                                                    style={{
                                                        // 1. STAGGERED DELAY: 
                                                        // Bubble 0 = 0s, Bubble 1 = 0.5s, Bubble 2 = 1.0s
                                                        animationDelay: `${bubbleIndex * 0.5}s`,

                                                        // 2. FILL MODE: 
                                                        // 'both' ensures the bubble stays INVISIBLE (opacity: 0) 
                                                        // until the delay timer finishes.
                                                        animationFillMode: 'both'
                                                    }}
                                                    className={`
              p-3 rounded-2xl shadow-sm 
              
              /* ANIMATION BASE CLASSES */
              animate-in fade-in slide-in-from-bottom-4 duration-500
              
              /* CRITICAL: Start invisible so we don't see it waiting */
              opacity-0 
              
              ${m.role === 'user'
                                                            ? 'bg-blue-600 text-white rounded-br-none'
                                                            : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-none'
                                                        }
            `}
                                                >
                                                    <p className="whitespace-pre-wrap leading-relaxed">
                                                        {bubbleText.trim()}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-2 justify-start">
                                    <div className="w-6 h-6 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center flex-shrink-0 hidden sm:flex">
                                        <Bot size={12} className="text-blue-400" />
                                    </div>
                                    <div className="bg-slate-800 border border-slate-700 p-3 rounded-2xl rounded-bl-none">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-100"></span>
                                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-200"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-3 bg-slate-800 border-t border-slate-700 flex gap-2 shrink-0">
                            <input
                                className="flex-1 p-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-100 placeholder-slate-500 transition-all"
                                value={input}
                                placeholder="Ask me anything..."
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input}
                                className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-900/20"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {/* FLOATING BUTTON */}
            <button
                onClick={toggleChat}
                className="pointer-events-auto h-12 w-12 sm:h-14 sm:w-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-50 ring-2 ring-slate-900"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
            </button>

        </div>
    );
}
