'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion, animate } from 'framer-motion';

interface MetricCounterProps {
    value: number;
    prefix?: string;
    suffix?: string;
    duration?: number;
    className?: string;
}

export default function MetricCounter({
    value,
    prefix = '',
    suffix = '',
    duration = 1.5,
    className = '',
}: MetricCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    const reduced = useReducedMotion();
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView) return;
        if (reduced) {
            setDisplay(value);
            return;
        }
        const controls = animate(0, value, {
            duration,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => setDisplay(Math.round(v)),
        });
        return () => controls.stop();
    }, [inView, value, duration, reduced]);

    return (
        <span ref={ref} className={`tabular-nums ${className}`}>
            {prefix}
            {display}
            {suffix}
        </span>
    );
}
