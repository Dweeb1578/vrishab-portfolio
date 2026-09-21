import { projects, type Project } from '../../data/projects';

// Phosphor palette. Every project is remapped to this family regardless of its
// 2D `color`, so the scene reads as one CRT rather than a box of highlighters.
// Lightness varies far more than hue on purpose: on a near-black background
// that is what separates one orb from the next.
export const NODE_HEXES = [
    '#39ff6a', // phosphor
    '#00d94f', // signal
    '#8cff9e', // pale phosphor
    '#17a83f', // deep
    '#5ff77d', // mint
    '#00b341', // crt
    '#b6ffbf', // washed
    '#2ee05f', // bright
    '#0f7a2e', // forest
];

export const SCENE_BG = '#040a06'; // near-black, faint green cast

// Single source for every non-orb colour in the scene and its overlay UI.
export const PHOSPHOR = {
    /** body copy: pale green, not pure white, so nothing reads as "not themed" */
    text: '#cdf6d6',
    /** the bright accent. Used sparingly — at scale it vibrates. */
    accent: '#39ff6a',
    /** secondary accent for borders and the deeper end of the scene */
    deep: '#00b341',
    /** dust, particles, muted chrome */
    muted: '#4f9c63',
    /** floor grid: centre lines and the rest */
    gridCenter: '#1c6b33',
    grid: '#0f3d1e',
} as const;

export interface NodeLayout {
    project: Project;
    position: [number, number, number];
    color: string;
    /** lowercased keyword bag used to pick the camera focus from a question */
    keywords: string[];
}

// Arrange the projects in a gently staggered ring so the camera has room to
// fly between them. Radius scales a touch with count to avoid crowding.
// `radiusScale` tightens the ring on portrait phones: the camera's field of
// view is vertical, so a narrow viewport sees far less width than a laptop and
// a full-size ring hangs off both edges of the screen.
//
// `vertical` does the more important half of the phone fix. The default ring is
// a horizontal circle, which needs width — the one dimension a portrait screen
// has least of. Standing the ring up maps its long axis onto the tall screen
// instead, and squashing it horizontally keeps it inside 390px. Without this,
// no camera distance works: pulling back far enough to fit the ring's width
// makes every orb a speck.
// The ring grows with the project count, so the camera has to grow with it too
// or new work simply falls off the edges of the frame.
export function ringRadius(radiusScale = 1): number {
    return (8 + projects.length * 0.3) * radiusScale;
}

export function buildLayout(radiusScale = 1, vertical = false): NodeLayout[] {
    const radius = ringRadius(radiusScale);
    const n = projects.length;
    return projects.map((project, i) => {
        const a = (i / n) * Math.PI * 2;
        const keywords = [
            ...project.slug.split('-'),
            ...project.title.toLowerCase().split(/\s+/),
            ...project.tags.map((t) => t.toLowerCase()),
        ];
        const position: [number, number, number] = vertical
            ? [Math.cos(a) * radius * 0.5, Math.sin(a) * radius * 0.95, Math.sin(i * 2.1) * 2]
            : [Math.cos(a) * radius, Math.sin(i * 1.7) * 2.6 * radiusScale, Math.sin(a) * radius];
        return {
            project,
            position,
            color: NODE_HEXES[i % NODE_HEXES.length],
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
