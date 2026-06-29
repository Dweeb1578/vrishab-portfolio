'use client';

import { useRef, useState } from 'react';
import type { NodeLayout } from './layout';
import { pickFocus } from './layout';

interface Props {
    layout: NodeLayout[];
    onFocus: (slug: string | null) => void;
    onThinking: (thinking: boolean) => void;
}

const CHIPS = [
    'What do you do at Speechify?',
    'How did you source $50K in pipeline?',
    'Tell me about the AI DJ',
    'What have you built with RAG?',
];

// strip the hidden protocol tokens the API streams (bubble splits + suggestion)
function clean(raw: string): string {
    return raw
        .replace(/\[SUGGESTION:[\s\S]*?\]/g, '')
        .replace(/\|\|\|/g, '\n\n')
        .replace(/^\*\s/gm, '• ')
        .trim();
}

// render the assistant's lightweight markdown (**bold**, *italic*) as real HTML
// instead of leaking raw asterisks into the UI. HTML is escaped first.
function renderMd(raw: string): string {
    return raw
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/(?<![*\w])\*(?!\*)([^*\n]+?)\*(?![*\w])/g, '<em>$1</em>');
}

export default function AskBar({ layout, onFocus, onThinking }: Props) {
    const [input, setInput] = useState('');
    const [answer, setAnswer] = useState('');
    const [focusTitle, setFocusTitle] = useState<string | null>(null);
    const [streaming, setStreaming] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const focusedSlug = useRef<string | null>(null);

    function focusOn(slug: string | null) {
        if (slug === focusedSlug.current) return;
        focusedSlug.current = slug;
        onFocus(slug);
        setFocusTitle(slug ? layout.find((n) => n.project.slug === slug)?.project.title ?? null : null);
    }

    // Find the first project the answer text names (so the camera follows what
    // the assistant is actually talking about, not just the question keywords).
    function projectMentionedIn(text: string): string | null {
        const lower = text.toLowerCase();
        let bestSlug: string | null = null;
        let bestPos = Infinity;
        for (const n of layout) {
            const pos = lower.indexOf(n.project.title.toLowerCase());
            if (pos !== -1 && pos < bestPos) {
                bestPos = pos;
                bestSlug = n.project.slug;
            }
        }
        return bestSlug;
    }

    async function ask(question: string) {
        const q = question.trim();
        if (!q || streaming) return;
        setInput('');
        inputRef.current?.blur();

        // first guess from the question itself (instant camera movement)
        focusOn(pickFocus(q, layout));

        setStreaming(true);
        onThinking(true);
        setAnswer('');

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [{ role: 'user', content: q }] }),
            });
            if (!res.body) throw new Error('no stream');

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let buf = '';
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buf += decoder.decode(value, { stream: true });
                const cleaned = clean(buf);
                setAnswer(cleaned);
                // follow the answer: fly to the project it's currently naming
                const mentioned = projectMentionedIn(cleaned);
                if (mentioned) focusOn(mentioned);
            }
        } catch {
            setAnswer("Hmm, I couldn't reach my memory just now. Try again in a moment.");
        } finally {
            setStreaming(false);
            onThinking(false);
        }
    }

    return (
        <>
            {/* answer — a slim card docked to the side so the flying orb stays visible */}
            {(answer || streaming) && (
                <div className="pointer-events-auto fixed bottom-28 left-6 z-20 w-[min(340px,82vw)] max-h-[44vh] overflow-y-auto rounded-2xl border border-[#d8623a]/30 bg-[#16130f]/80 px-5 py-4 text-[#f3ead7] shadow-[0_8px_40px_rgba(0,0,0,0.4)] backdrop-blur-md">
                    {focusTitle && (
                        <span className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-[#e9a23b]">
                            ✦ {focusTitle}
                        </span>
                    )}
                    <p
                        className="whitespace-pre-wrap text-[13px] leading-relaxed [&_strong]:font-semibold [&_strong]:text-[#e9a23b] [&_em]:italic"
                        dangerouslySetInnerHTML={{ __html: renderMd(answer) }}
                    />
                    {streaming && <span className="mt-1 inline-block h-3.5 w-2 animate-pulse bg-[#e9a23b]" />}
                </div>
            )}

            <div className="pointer-events-none fixed inset-x-0 bottom-10 z-20 flex flex-col items-center px-4">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    ask(input);
                }}
                className="pointer-events-auto flex w-full max-w-xl items-center gap-2 rounded-full border border-[#e9a23b]/35 bg-[#16130f]/75 py-2 pl-5 pr-2 backdrop-blur-md"
            >
                <span className="font-mono text-sm text-[#e9a23b]">✦</span>
                <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything about Vrishab…"
                    className="flex-1 bg-transparent text-[15px] text-[#f3ead7] outline-none placeholder:text-[#f3ead7]/40"
                />
                <button
                    type="submit"
                    disabled={streaming}
                    aria-label="Ask"
                    className="grid h-9 w-9 place-items-center rounded-full bg-[#d8623a] font-bold text-[#16130f] transition-colors hover:bg-[#e9a23b] disabled:opacity-50"
                >
                    →
                </button>
            </form>

            {/* Blank-state primer: the chips invite a first question, then get
                out of the way once a conversation is underway. */}
            {!answer && !streaming && (
                <div className="pointer-events-auto mt-3 flex flex-wrap justify-center gap-2">
                    {CHIPS.map((c) => (
                        <button
                            key={c}
                            onClick={() => ask(c)}
                            className="rounded-full border border-[#a8a06a]/30 bg-[#a8a06a]/10 px-3 py-1.5 font-mono text-[11px] text-[#f3ead7]/80 transition-colors hover:border-[#e9a23b] hover:text-[#e9a23b]"
                        >
                            {c}
                        </button>
                    ))}
                </div>
            )}
            </div>
        </>
    );
}
