'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sparkles, PerformanceMonitor } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { FogExp2, Color, PerspectiveCamera, type LineBasicMaterial } from 'three';
import { buildLayout, SCENE_BG, PHOSPHOR, type NodeLayout } from './layout';
import ProjectNode from './ProjectNode';
import CenterCore from './CenterCore';

interface Props {
    focusSlug: string | null;
    autoRotate: boolean;
    reducedMotion: boolean;
    thinking: boolean;
    onSelect: (slug: string | null) => void;
}

// A portrait phone sees far less width than a laptop, because a perspective
// camera's field of view is vertical: the same ring that fills a desktop
// viewport hangs off both edges of a phone. Read the match synchronously on the
// first render (this component is client-only) so the camera is never briefly
// framed for the wrong device.
const NARROW_QUERY = '(max-width: 640px)';

function useNarrowViewport(): boolean {
    const [narrow, setNarrow] = useState(
        () => typeof window !== 'undefined' && window.matchMedia(NARROW_QUERY).matches,
    );
    useEffect(() => {
        const mq = window.matchMedia(NARROW_QUERY);
        const apply = () => setNarrow(mq.matches);
        apply();
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
    }, []);
    return narrow;
}

// <Canvas camera={...}> is only read on mount, so a rotation from portrait to
// landscape has to move the camera imperatively.
function ResponsiveCamera({ narrow }: { narrow: boolean }) {
    const camera = useThree((s) => s.camera);
    useEffect(() => {
        if (!(camera instanceof PerspectiveCamera)) return;
        const dist = camera.position.length() || 1;
        const target = narrow ? 26 : 28;
        camera.position.multiplyScalar(target / dist);
        camera.fov = narrow ? 58 : 50;
        camera.updateProjectionMatrix();
    }, [camera, narrow]);
    return null;
}

// Faint filaments from the center core out to every orb — a constellation
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
            <lineBasicMaterial ref={matRef} color={PHOSPHOR.accent} transparent opacity={0.09} />
        </lineSegments>
    );
}

export default function SpatialScene({ focusSlug, autoRotate, reducedMotion, thinking, onSelect }: Props) {
    const narrow = useNarrowViewport();
    const layout = useMemo(() => buildLayout(narrow ? 0.7 : 1, narrow), [narrow]);
    // Adaptive resolution: start at a retina-friendly 1.5x and let the
    // PerformanceMonitor below drop to 1x if the frame rate sags, so the bloom
    // pass doesn't cook weaker GPUs. (Capped at 1.5 rather than 2 — bloom at
    // native 2x retina is the single biggest cost here.)
    const [dpr, setDpr] = useState(1.5);

    return (
        <Canvas
            camera={{
                position: narrow ? [0, 0, 26] : [0, 6, 28],
                fov: narrow ? 58 : 50,
                near: 0.1,
                far: 200,
            }}
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

            <ResponsiveCamera narrow={narrow} />

            {/* phosphor lighting */}
            <ambientLight color="#dfffe8" intensity={0.35} />
            <directionalLight color="#b6ffbf" intensity={1.6} position={[6, 12, 8]} />
            <pointLight color={PHOSPHOR.deep} intensity={60} distance={40} position={[-8, 3, -6]} />
            <pointLight color={PHOSPHOR.accent} intensity={40} distance={30} position={[8, -2, 4]} />

            {/* floor grid */}
            <gridHelper
                args={[80, 60, PHOSPHOR.gridCenter, PHOSPHOR.grid]}
                position={[0, narrow ? -2.6 : -4, 0]}
            />

            {/* floating dust */}
            <Sparkles
                count={narrow ? 35 : 70}
                scale={[40, 16, 40]}
                size={3}
                speed={reducedMotion ? 0 : 0.3}
                color={PHOSPHOR.muted}
                opacity={0.5}
            />

            <ConstellationLines layout={layout} thinking={thinking} reducedMotion={reducedMotion} />

            <CenterCore reducedMotion={reducedMotion} thinking={thinking} />

            {layout.map((node) => (
                <ProjectNode
                    key={node.project.slug}
                    node={node}
                    labelAlways={!narrow}
                    labelScale={narrow ? 0.5 : 1}
                    focused={focusSlug === node.project.slug}
                    focusActive={focusSlug !== null}
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
                minDistance={narrow ? 9 : 10}
                maxDistance={narrow ? 40 : 50}
                maxPolarAngle={narrow ? Math.PI : Math.PI * 0.62}
                autoRotate={autoRotate && !reducedMotion}
                autoRotateSpeed={0.45}
                enablePan={false}
            />
        </Canvas>
    );
}
