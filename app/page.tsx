'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { buildLayout } from '../components/spatial/layout';
import AskBar from '../components/spatial/AskBar';
import ProjectDetail from '../components/spatial/ProjectDetail';

// R3F's <Canvas> can't render on the server — load it client-only.
const SpatialScene = dynamic(() => import('../components/spatial/SpatialScene'), {
    ssr: false,
    loading: () => (
        <div className="grid h-full place-items-center font-mono text-xs uppercase tracking-[0.2em] text-[#f3ead7]/60">
            loading scene…
        </div>
    ),
});

export default function Home() {
    const layout = useMemo(() => buildLayout(), []);
    const [focusSlug, setFocusSlug] = useState<string | null>(null);
    const [detailSlug, setDetailSlug] = useState<string | null>(null);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [thinking, setThinking] = useState(false);

    const detailNode = detailSlug ? layout.find((n) => n.project.slug === detailSlug) ?? null : null;

    // Clicking an orb: fly there AND open its detail panel.
    const handleSelect = (slug: string | null) => {
        setFocusSlug(slug);
        setDetailSlug(slug);
    };

    // Asking a question: fly the camera but show the answer card, not the panel.
    const handleAskFocus = (slug: string | null) => {
        setFocusSlug(slug);
        setDetailSlug(null);
    };

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const apply = () => setReducedMotion(mq.matches);
        apply();
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
    }, []);

    return (
        <main className="fixed inset-0 overflow-hidden bg-[#16130f]">
            <SpatialScene
                focusSlug={focusSlug}
                autoRotate={focusSlug === null}
                reducedMotion={reducedMotion}
                thinking={thinking}
                onSelect={handleSelect}
            />

            <ProjectDetail node={detailNode} onClose={() => { setDetailSlug(null); setFocusSlug(null); }} />

            {/* brand */}
            <div className="pointer-events-none fixed left-9 top-8 z-20 text-[#f3ead7]">
                <h1 className="text-[22px] font-semibold tracking-wide">Vrishab Nair</h1>
                <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.15em] opacity-60">
                    Spatial Portfolio
                </p>
                <div className="pointer-events-auto mt-3 flex gap-4 font-mono text-[11px] uppercase tracking-wider">
                    <a
                        href="https://www.linkedin.com/in/vrishab-nair-212769290/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#f3ead7] opacity-50 transition-opacity hover:opacity-100"
                    >
                        linkedin ↗
                    </a>
                </div>
            </div>

            <div className="pointer-events-none fixed inset-x-0 top-8 z-10 text-center font-mono text-[11px] uppercase tracking-[0.15em] text-[#f3ead7]/50">
                drag to orbit · scroll to zoom · <span className="text-[#e9a23b]">or just ask below</span>
            </div>

            <AskBar layout={layout} onFocus={handleAskFocus} onThinking={setThinking} />
        </main>
    );
}
