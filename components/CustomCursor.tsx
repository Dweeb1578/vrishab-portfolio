'use client';
import { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTOR =
    'a, button, [role="button"], input, textarea, select, [data-cursor-hover], label[for]';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [enabled, setEnabled] = useState(false);
    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        const coarse = window.matchMedia('(pointer: coarse)').matches;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (coarse || reduced) return;

        setEnabled(true);
        document.documentElement.classList.add('cursor-none');

        let raf = 0;
        let mx = -100;
        let my = -100;
        let rx = -100;
        let ry = -100;

        const onMove = (e: PointerEvent) => {
            mx = e.clientX;
            my = e.clientY;
            const dot = dotRef.current;
            if (dot) dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
        };

        const loop = () => {
            rx += (mx - rx) * 0.18;
            ry += (my - ry) * 0.18;
            const ring = ringRef.current;
            if (ring) ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        const onOver = (e: PointerEvent) => {
            const t = e.target as Element | null;
            if (t?.closest(INTERACTIVE_SELECTOR)) setHovering(true);
        };
        const onOut = (e: PointerEvent) => {
            const t = e.target as Element | null;
            if (t?.closest(INTERACTIVE_SELECTOR)) setHovering(false);
        };
        const onLeaveWindow = () => {
            mx = -100;
            my = -100;
        };

        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerover', onOver);
        window.addEventListener('pointerout', onOut);
        document.addEventListener('pointerleave', onLeaveWindow);

        return () => {
            cancelAnimationFrame(raf);
            document.documentElement.classList.remove('cursor-none');
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerover', onOver);
            window.removeEventListener('pointerout', onOut);
            document.removeEventListener('pointerleave', onLeaveWindow);
        };
    }, []);

    if (!enabled) return null;

    return (
        <>
            <div
                ref={dotRef}
                aria-hidden
                className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform hidden md:block"
                style={{ transform: 'translate3d(-100px, -100px, 0)' }}
            >
                <div
                    className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500 transition-[width,height] duration-150 ease-out ${
                        hovering ? 'w-3 h-3' : 'w-2 h-2'
                    }`}
                />
            </div>
            <div
                ref={ringRef}
                aria-hidden
                className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform hidden md:block"
                style={{ transform: 'translate3d(-100px, -100px, 0)' }}
            >
                <div
                    className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/60 backdrop-blur-[1px] transition-[width,height,border-width,background-color,opacity] duration-200 ease-out ${
                        hovering
                            ? 'w-14 h-14 border-2 opacity-100 bg-orange-500/10'
                            : 'w-8 h-8 opacity-70'
                    }`}
                />
            </div>
        </>
    );
}
