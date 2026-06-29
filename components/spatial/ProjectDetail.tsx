'use client';

import type { NodeLayout } from './layout';

interface Props {
    node: NodeLayout | null;
    onClose: () => void;
}

/**
 * Panel shown when an orb is clicked — explains the project and links to its
 * repo. Docked to the right so it doesn't fight the answer card on the left.
 */
export default function ProjectDetail({ node, onClose }: Props) {
    if (!node) return null;
    const { project, color } = node;
    const repo = project.githubUrl ?? project.liveUrl;

    return (
        <div className="pointer-events-auto fixed right-6 top-1/2 z-20 w-[min(340px,82vw)] max-h-[70vh] -translate-y-1/2 overflow-y-auto rounded-2xl border bg-[#16130f]/85 px-6 py-5 text-[#f3ead7] shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
            style={{ borderColor: `${color}55` }}
        >
            <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color }}>
                    ✦ project
                </span>
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="font-mono text-[12px] text-[#f3ead7]/50 transition-colors hover:text-[#f3ead7]"
                >
                    ✕
                </button>
            </div>

            <h2 className="mt-2 text-[22px] font-semibold leading-tight">{project.title}</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-[#f3ead7]/70">{project.hook}</p>
            <p className="mt-3 text-[13px] leading-relaxed text-[#f3ead7]/85">{project.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                    <span
                        key={t}
                        className="rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wide"
                        style={{ borderColor: `${color}44`, color }}
                    >
                        {t}
                    </span>
                ))}
            </div>

            {repo ? (
                <a
                    href={repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-semibold text-[#16130f] transition-opacity hover:opacity-90"
                    style={{ backgroundColor: color }}
                >
                    {project.githubUrl ? 'View repo' : 'View live'} ↗
                </a>
            ) : (
                <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-[#f3ead7]/35">
                    private / no public repo
                </p>
            )}

            <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-[#f3ead7]/35">
                tip: double-click the orb to open it
            </p>
        </div>
    );
}
