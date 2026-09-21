'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { buildLayout } from '../components/spatial/layout';
import AskBar from '../components/spatial/AskBar';
import ProjectDetail from '../components/spatial/ProjectDetail';

// R3F's <Canvas> can't render on the server — load it client-only.
const SpatialScene = dynamic(() => import('../components/spatial/SpatialScene'), {
    ssr: false,
    loading: () => (
        <div className="grid h-full place-items-center font-mono text-xs uppercase tracking-[0.2em] text-[#cdf6d6]/60">
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
        <main className="fixed inset-0 overflow-hidden bg-[#040a06]">
            <SpatialScene
                focusSlug={focusSlug}
                autoRotate={focusSlug === null}
                reducedMotion={reducedMotion}
                thinking={thinking}
                onSelect={handleSelect}
            />

            <ProjectDetail node={detailNode} onClose={() => { setDetailSlug(null); setFocusSlug(null); }} />

            {/* brand */}
            <div className="pointer-events-none fixed left-5 top-5 z-20 flex items-start gap-3 text-[#cdf6d6] sm:left-9 sm:top-8">
                <Image
                    src="/avatar.png"
                    alt=""
                    width={96}
                    height={96}
                    priority
                    className="phosphor-photo pointer-events-auto mt-[2px] h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-[#39ff6a]/45 sm:h-12 sm:w-12"
                />
                <div>
                <h1 className="font-mono text-[19px] font-semibold tracking-wide sm:text-[22px]">Vrishab Nair</h1>
                <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.15em] opacity-60">
                    Spatial Portfolio
                </p>
                <div className="pointer-events-auto mt-3 flex gap-4 font-mono text-[11px] uppercase tracking-wider">
                    <a
                        href="https://www.linkedin.com/in/vrishab-nair-212769290/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#cdf6d6] opacity-60 transition-opacity hover:opacity-100"
                    >
                        linkedin ↗
                    </a>
                </div>
                </div>
            </div>

            {/* Interaction hint. Hidden on phones, where it would collide with
                the top-left brand and "scroll to zoom" is the wrong gesture —
                the chips already invite the first tap there. */}
            <div className="pointer-events-none fixed inset-x-0 top-8 z-10 hidden text-center font-mono text-[11px] uppercase tracking-[0.15em] text-[#cdf6d6]/50 sm:block">
                drag to explore · <span className="text-[#39ff6a]">or just ask below</span>
            </div>

            <AskBar layout={layout} onFocus={handleAskFocus} onThinking={setThinking} />
        </main>
    );
}
