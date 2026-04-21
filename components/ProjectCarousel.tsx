'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react';
import type { Project } from '../data/projects';
import ProjectCard from './ProjectCard';

interface ProjectCarouselProps {
    projects: Project[];
}

const CARD_STEP = 380;

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [interacted, setInteracted] = useState(false);
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(true);

    const scrollBy = (dir: 1 | -1) => {
        const el = ref.current;
        if (!el) return;
        setInteracted(true);
        el.scrollBy({ left: dir * CARD_STEP, behavior: 'smooth' });
    };

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const onScroll = () => {
            setInteracted(true);
            setCanLeft(el.scrollLeft > 8);
            setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
        };
        onScroll();
        el.addEventListener('scroll', onScroll, { passive: true });
        return () => el.removeEventListener('scroll', onScroll);
    }, []);

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            scrollBy(1);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            scrollBy(-1);
        }
    };

    return (
        <div className="relative">
            <AnimatePresence>
                {!interacted && (
                    <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="absolute -top-10 right-0 flex items-center gap-1.5 text-xs font-mono text-stone-500 dark:text-stone-400 hidden sm:flex pointer-events-none"
                    >
                        <MoveHorizontal size={14} />
                        drag to explore
                    </motion.div>
                )}
            </AnimatePresence>

            <div
                ref={ref}
                role="region"
                aria-label="Projects"
                tabIndex={0}
                onKeyDown={onKeyDown}
                className="snap-x-mandatory flex gap-4 overflow-x-auto pb-6 pt-2 -mx-6 px-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40 rounded-xl"
            >
                {projects.map((p) => (
                    <ProjectCard key={p.slug} project={p} />
                ))}
            </div>

            <button
                onClick={() => scrollBy(-1)}
                disabled={!canLeft}
                aria-label="Previous project"
                className="hidden md:flex absolute -left-4 top-[40%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-lg items-center justify-center text-stone-700 dark:text-stone-200 disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:scale-110 enabled:hover:border-rose-300 dark:enabled:hover:border-rose-500/50 transition-all cursor-pointer"
            >
                <ChevronLeft size={18} />
            </button>
            <button
                onClick={() => scrollBy(1)}
                disabled={!canRight}
                aria-label="Next project"
                className="hidden md:flex absolute -right-4 top-[40%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-lg items-center justify-center text-stone-700 dark:text-stone-200 disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:scale-110 enabled:hover:border-rose-300 dark:enabled:hover:border-rose-500/50 transition-all cursor-pointer"
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );
}
