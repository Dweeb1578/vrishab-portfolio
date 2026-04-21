'use client';
import { useEffect } from 'react';
import {
    motion,
    useMotionValue,
    useTransform,
    animate,
    type MotionValue,
} from 'framer-motion';
import { Cpu, Brain, Workflow, type LucideIcon } from 'lucide-react';

type Node = {
    Icon: LucideIcon;
    label: string;
    iconClass: string;
    offset: number;
};

const NODES: Node[] = [
    { Icon: Cpu, label: 'Hardware', iconClass: 'text-orange-500', offset: 0 },
    { Icon: Brain, label: 'AI', iconClass: 'text-rose-500', offset: 120 },
    { Icon: Workflow, label: 'Ops', iconClass: 'text-amber-500', offset: 240 },
];

function OrbitingNode({
    angle,
    offset,
    radius,
    node,
}: {
    angle: MotionValue<number>;
    offset: number;
    radius: number;
    node: Node;
}) {
    const x = useTransform(angle, (a) =>
        radius * Math.cos(((a + offset) * Math.PI) / 180),
    );
    const y = useTransform(angle, (a) =>
        radius * Math.sin(((a + offset) * Math.PI) / 180),
    );
    const Icon = node.Icon;
    return (
        <motion.div
            className="absolute top-1/2 left-1/2 z-20"
            style={{ x, y }}
        >
            <div className="-translate-x-1/2 -translate-y-1/2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-stone-200 dark:border-stone-800 shadow-md text-xs font-mono whitespace-nowrap ring-1 ring-black/5 dark:ring-white/5">
                    <Icon size={14} className={node.iconClass} />
                    <span className="text-stone-700 dark:text-stone-200">
                        {node.label}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

interface OrbitingNodesProps {
    radius?: number;
    duration?: number;
    className?: string;
}

export default function OrbitingNodes({
    radius = 290,
    duration = 40,
    className = '',
}: OrbitingNodesProps) {
    const angle = useMotionValue(0);
    useEffect(() => {
        const controls = animate(angle, 360, {
            duration,
            ease: 'linear',
            repeat: Infinity,
        });
        return () => controls.stop();
    }, [angle, duration]);

    return (
        <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 ${className}`}
        >
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-stone-300/50 dark:border-stone-700/50"
                style={{ width: radius * 2, height: radius * 2 }}
            />
            {NODES.map((n) => (
                <OrbitingNode
                    key={n.label}
                    angle={angle}
                    offset={n.offset}
                    radius={radius}
                    node={n}
                />
            ))}
        </div>
    );
}
