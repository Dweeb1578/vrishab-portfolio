import { projects, type Project } from '../../data/projects';

// Warm, anti-"AI-slop" palette. Every project is remapped to this family
// regardless of its 2D `color`, so the 3D scene never reads as cyan/indigo.
export const WARM_HEXES = [
    '#e9a23b', // amber
    '#d8623a', // terracotta
    '#a8a06a', // olive
    '#c4703a', // clay
    '#8a9a5b', // warm moss
    '#e07a3f', // ember
    '#d9a441', // gold
    '#b8501f', // rust
    '#caa05a', // sand
];

export const SCENE_BG = '#16130f'; // warm charcoal

export interface NodeLayout {
    project: Project;
    position: [number, number, number];
    color: string;
    /** lowercased keyword bag used to pick the camera focus from a question */
    keywords: string[];
}

// Arrange the projects in a gently staggered ring so the camera has room to
// fly between them. Radius scales a touch with count to avoid crowding.
export function buildLayout(): NodeLayout[] {
    const n = projects.length;
    const radius = 8 + n * 0.35;
    return projects.map((project, i) => {
        const a = (i / n) * Math.PI * 2;
        const y = Math.sin(i * 1.7) * 2.6;
        const keywords = [
            ...project.slug.split('-'),
            ...project.title.toLowerCase().split(/\s+/),
            ...project.tags.map((t) => t.toLowerCase()),
        ];
        return {
            project,
            position: [Math.cos(a) * radius, y, Math.sin(a) * radius],
            color: WARM_HEXES[i % WARM_HEXES.length],
            keywords,
        };
    });
}

// Lightweight client-side retrieval: which node is a question "about"?
// (The real answer comes from /api/chat; this only steers the camera.)
export function pickFocus(question: string, layout: NodeLayout[]): string | null {
    const q = question.toLowerCase();
    let bestSlug: string | null = null;
    let best = 0;
    for (const node of layout) {
        let score = 0;
        if (q.includes(node.project.title.toLowerCase())) score += 6;
        for (const kw of node.keywords) {
            if (kw.length > 2 && q.includes(kw)) score += 2;
        }
        if (score > best) {
            best = score;
            bestSlug = node.project.slug;
        }
    }
    return best > 0 ? bestSlug : null;
}
