'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { NodeLayout } from './layout';
import { pickFocus } from './layout';

interface Props {
    layout: NodeLayout[];
    onFocus: (slug: string | null) => void;
    onThinking: (thinking: boolean) => void;
}

// First two carry the strongest answers, and are the only two shown on a phone
// where a four-chip block wraps into a wall that shoves the input off-screen.
const CHIPS = [
    'What did you build at Speechify?',
    'How did you source $105K in pipeline?',
    'Tell me about speed-to-lead',
    'What have you built with RAG?',
];

// strip the hidden protocol tokens the API streams (bubble splits + suggestion)
// and normalise punctuation. The system prompt asks for plain ASCII dashes and
// the model ignores it about half the time, so it is enforced here where it
// cannot regress. Dashes are escaped rather than literal because an en dash and
// an em dash are indistinguishable in source.
function clean(raw: string): string {
    return raw
        .replace(/\[SUGGESTION:[\s\S]*?\]/g, '')
        .replace(/\|\|\|/g, '\n\n')
        .replace(/^\*\s/gm, '• ')
        // fancy hyphen variants inside a word: sign[U+2011]ups -> sign-ups
        .replace(/[‐‑‒]/g, '-')
        // numeric range: 10[en]20% -> 10-20%
        .replace(/(\d)\s*[–—]\s*(\d)/g, '$1-$2')
        // date range: Jun 2026 [en] Sep 2026 -> Jun 2026 to Sep 2026
        .replace(/(\d{4})\s*[–—]\s*([A-Z][a-z]+)/g, '$1 to $2')
        // anything left is prose, where a comma is what he would have written
        .replace(/\s*[–—]\s*/g, ', ')
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
    // The full placeholder is clipped mid-word in a phone-width input.
    const [placeholder, setPlaceholder] = useState('Ask me anything about Vrishab…');
    const [answer, setAnswer] = useState('');
    const [focusTitle, setFocusTitle] = useState<string | null>(null);
    const [streaming, setStreaming] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const focusedSlug = useRef<string | null>(null);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 640px)');
        const apply = () =>
            setPlaceholder(mq.matches ? 'Ask me anything…' : 'Ask me anything about Vrishab…');
        apply();
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
    }, []);

    function focusOn(slug: string | null) {
        if (slug === focusedSlug.current) return;
        focusedSlug.current = slug;
        onFocus(slug);
        setFocusTitle(slug ? layout.find((n) => n.project.slug === slug)?.project.title ?? null : null);
    }

    // Dismiss the answer card and release the camera back to its idle orbit, so
    // the visitor gets a clean slate for the next question.
    function clearAnswer() {
        setAnswer('');
        focusOn(null);
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
            {/* The answer. On a phone it spans the width and sits directly above
                the input stack; from sm up it becomes a slim card docked left so
                the flying orb stays visible beside it. */}
            {(answer || streaming) && (
                <div className="pointer-events-auto fixed inset-x-4 bottom-[11.5rem] z-20 max-h-[34vh] overflow-y-auto rounded-2xl border border-[#00b341]/35 bg-[#040a06]/85 px-5 py-4 text-[#cdf6d6] shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-md sm:inset-x-auto sm:bottom-28 sm:left-6 sm:max-h-[44vh] sm:w-[min(340px,82vw)]">
                    <div className="flex items-start justify-between gap-3">
                        {/* The photo marks who is talking, which matters more
                            now the replies are written in his own voice. */}
                        <span className="flex min-w-0 items-center gap-2">
                            <Image
                                src="/avatar.png"
                                alt=""
                                width={56}
                                height={56}
                                className="phosphor-photo h-6 w-6 shrink-0 rounded-full object-cover ring-1 ring-[#39ff6a]/45"
                            />
                            {focusTitle && (
                                <span className="truncate font-mono text-[11px] uppercase tracking-wider text-[#39ff6a]">
                                    {focusTitle}
                                </span>
                            )}
                        </span>
                        {/* Dismiss once the answer lands — clears the card and
                            releases the camera for a fresh question. */}
                        {answer && !streaming && (
                            <button
                                onClick={clearAnswer}
                                aria-label="Clear answer"
                                className="-mr-2 -mt-2 grid h-9 w-9 place-items-center font-mono text-[15px] leading-none text-[#cdf6d6]/45 transition-colors hover:text-[#cdf6d6]"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    <p
                        className="mt-2 whitespace-pre-wrap text-[13px] leading-relaxed [&_strong]:font-semibold [&_strong]:text-[#39ff6a] [&_em]:italic"
                        dangerouslySetInnerHTML={{ __html: renderMd(answer) }}
                    />
                    {streaming && <span className="mt-1 inline-block h-3.5 w-2 animate-pulse bg-[#39ff6a]" />}
                </div>
            )}

            {/* `pb-[env(safe-area-inset-bottom)]` keeps the input clear of the
                iOS home indicator, which otherwise sits on top of it. */}
            <div className="pointer-events-none fixed inset-x-0 bottom-6 z-20 flex flex-col items-center px-4 pb-[env(safe-area-inset-bottom)] sm:bottom-10">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    ask(input);
                }}
                className="pointer-events-auto flex w-full max-w-xl items-center gap-2 rounded-full border border-[#39ff6a]/40 bg-[#040a06]/80 py-2 pl-5 pr-2 backdrop-blur-md"
            >
                <span className="font-mono text-sm text-[#39ff6a]">✦</span>
                {/* 16px keeps iOS Safari from zooming the whole page on focus. */}
                <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={placeholder}
                    className="min-w-0 flex-1 bg-transparent font-mono text-[16px] text-[#cdf6d6] outline-none placeholder:text-[#cdf6d6]/40"
                />
                <button
                    type="submit"
                    disabled={streaming}
                    aria-label="Ask"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#00b341] font-bold text-[#040a06] transition-colors hover:bg-[#39ff6a] disabled:opacity-50"
                >
                    →
                </button>
            </form>

            {/* Suggestion chips stay available the whole time so there's always a
                next thing to ask — they just dim while an answer is streaming.
                A phone shows the first two; four wrap into three rows there. */}
            <div className="pointer-events-auto mt-3 flex flex-wrap justify-center gap-2">
                {CHIPS.map((c, i) => (
                    <button
                        key={c}
                        onClick={() => ask(c)}
                        disabled={streaming}
                        className={`rounded-full border border-[#4f9c63]/40 bg-[#4f9c63]/10 px-3 py-2 font-mono text-[11px] text-[#cdf6d6]/80 transition-colors hover:border-[#39ff6a] hover:text-[#39ff6a] disabled:opacity-40 ${i > 1 ? 'hidden sm:block' : ''}`}
                    >
                        {c}
                    </button>
                ))}
            </div>
            </div>
        </>
    );
}
