'use client';

import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles, PerformanceMonitor } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { FogExp2, Color, type LineBasicMaterial } from 'three';
import { buildLayout, SCENE_BG, type NodeLayout } from './layout';
import ProjectNode from './ProjectNode';
import CenterCore from './CenterCore';

interface Props {
    focusSlug: string | null;
    autoRotate: boolean;
    reducedMotion: boolean;
    thinking: boolean;
    onSelect: (slug: string | null) => void;
}

// Faint amber filaments from the center core out to every orb — a constellation
// that reads as one connected mind. They sit dim at rest and surge brighter on
// the same pulse that ripples the orbs while a question is being answered, so
// the whole network visibly "lights up" when you ask something. One draw call.
function ConstellationLines({
    layout,
    thinking,
    reducedMotion,
}: {
    layout: NodeLayout[];
    thinking: boolean;
    reducedMotion: boolean;
}) {
    const matRef = useRef<LineBasicMaterial>(null);
    const positions = useMemo(() => {
        const arr: number[] = [];
        for (const n of layout) arr.push(0, 0, 0, ...n.position);
        return new Float32Array(arr);
    }, [layout]);

    useFrame((state) => {
        if (!matRef.current) return;
        const pulse =
            thinking && !reducedMotion
                ? (Math.sin(state.clock.elapsedTime * 3) * 0.5 + 0.5) * 0.24
                : 0;
        // ease toward target so toggling `thinking` doesn't snap
        matRef.current.opacity += (0.09 + pulse - matRef.current.opacity) * 0.1;
    });

    return (
        <lineSegments>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <lineBasicMaterial ref={matRef} color="#e9a23b" transparent opacity={0.09} />
        </lineSegments>
    );
}

export default function SpatialScene({ focusSlug, autoRotate, reducedMotion, thinking, onSelect }: Props) {
    const layout = useMemo(() => buildLayout(), []);

    // Which orbs share a theme with the focused one. A question (or click) picks
    // a hero; every other orb that shares a meaningful keyword (tech, topic) with
    // it is "related" — these stay lit and sprout a satellite instead of receding,
    // surfacing the real overlap across the work (lots of Python / RAG / Groq).
    const relatedSlugs = useMemo(() => {
        const set = new Set<string>();
        if (!focusSlug) return set;
        const hero = layout.find((n) => n.project.slug === focusSlug);
        if (!hero) return set;
        const heroKw = new Set(hero.keywords.filter((k) => k.length > 2));
        for (const n of layout) {
            if (n.project.slug === focusSlug) continue;
            if (n.keywords.some((k) => k.length > 2 && heroKw.has(k))) set.add(n.project.slug);
        }
        return set;
    }, [focusSlug, layout]);
    // Adaptive resolution: start at a retina-friendly 1.5x and let the
    // PerformanceMonitor below drop to 1x if the frame rate sags, so the bloom
    // pass doesn't cook weaker GPUs. (Capped at 1.5 rather than 2 — bloom at
    // native 2x retina is the single biggest cost here.)
    const [dpr, setDpr] = useState(1.5);

    return (
        <Canvas
            camera={{ position: [0, 6, 28], fov: 50, near: 0.1, far: 200 }}
            dpr={dpr}
            gl={{ antialias: true, powerPreference: 'default' }}
            style={{ background: SCENE_BG }}
            onPointerMissed={() => onSelect(null)}
            onCreated={({ scene, gl }) => {
                scene.background = new Color(SCENE_BG);
                scene.fog = new FogExp2(SCENE_BG, 0.018);
                // Keep the canvas from blanking to white if the GL context is
                // ever lost (HMR remounts, GPU resets); allow the browser to
                // fire `webglcontextrestored` so three can rebuild.
                gl.domElement.addEventListener(
                    'webglcontextlost',
                    (e) => e.preventDefault(),
                    false,
                );
            }}
        >
            {/* Drop to 1x DPI on sustained frame-rate decline, step back up when
                it recovers — keeps the experience smooth on weak GPUs without
                permanently degrading strong ones. */}
            <PerformanceMonitor
                onDecline={() => setDpr(1)}
                onIncline={() => setDpr(1.5)}
            />

            {/* warm lighting */}
            <ambientLight color="#fff0e0" intensity={0.35} />
            <directionalLight color="#ffd9a0" intensity={1.6} position={[6, 12, 8]} />
            <pointLight color="#d8623a" intensity={60} distance={40} position={[-8, 3, -6]} />
            <pointLight color="#e9a23b" intensity={40} distance={30} position={[8, -2, 4]} />

            {/* warm floor grid */}
            <gridHelper args={[80, 60, '#8a3b1f', '#2a241c']} position={[0, -4, 0]} />

            {/* warm floating dust */}
            <Sparkles count={70} scale={[40, 16, 40]} size={3} speed={reducedMotion ? 0 : 0.3} color="#a8a06a" opacity={0.5} />

            <ConstellationLines layout={layout} thinking={thinking} reducedMotion={reducedMotion} />

            <CenterCore reducedMotion={reducedMotion} thinking={thinking} />

            {layout.map((node) => (
                <ProjectNode
                    key={node.project.slug}
                    node={node}
                    focused={focusSlug === node.project.slug}
                    focusActive={focusSlug !== null}
                    related={relatedSlugs.has(node.project.slug)}
                    reducedMotion={reducedMotion}
                    thinking={thinking}
                    onSelect={onSelect}
                />
            ))}

            {/* Glow pass: the emissive orbs, core, and filaments bloom into the
                warm dark, and a soft vignette pulls focus to the center. This is
                the difference between "flat glow" and a scene that feels lit. */}
            <EffectComposer enableNormalPass={false} multisampling={0}>
                <Bloom
                    intensity={0.7}
                    luminanceThreshold={0.25}
                    luminanceSmoothing={0.9}
                    mipmapBlur
                    radius={0.6}
                />
                <Vignette eskil={false} offset={0.3} darkness={0.55} />
            </EffectComposer>

            <OrbitControls
                makeDefault
                enableDamping
                dampingFactor={0.06}
                minDistance={10}
                maxDistance={50}
                maxPolarAngle={Math.PI * 0.62}
                autoRotate={autoRotate && !reducedMotion}
                autoRotateSpeed={0.45}
                enablePan={false}
            />
        </Canvas>
    );
}
