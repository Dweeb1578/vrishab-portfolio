'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { FogExp2, Color, type LineBasicMaterial } from 'three';
import { buildLayout, SCENE_BG, type NodeLayout } from './layout';
import ProjectNode from './ProjectNode';
import CenterCore from './CenterCore';
import Rig from './Rig';

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

    return (
        <Canvas
            camera={{ position: [0, 6, 28], fov: 50, near: 0.1, far: 200 }}
            dpr={[1, 2]}
            gl={{ antialias: true }}
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
            {/* warm lighting */}
            <ambientLight color="#fff0e0" intensity={0.35} />
            <directionalLight color="#ffd9a0" intensity={1.6} position={[6, 12, 8]} />
            <pointLight color="#d8623a" intensity={60} distance={40} position={[-8, 3, -6]} />
            <pointLight color="#e9a23b" intensity={40} distance={30} position={[8, -2, 4]} />

            {/* warm floor grid */}
            <gridHelper args={[80, 60, '#8a3b1f', '#2a241c']} position={[0, -4, 0]} />

            {/* warm floating dust */}
            <Sparkles count={120} scale={[40, 16, 40]} size={3} speed={reducedMotion ? 0 : 0.3} color="#a8a06a" opacity={0.5} />

            <ConstellationLines layout={layout} thinking={thinking} reducedMotion={reducedMotion} />

            <CenterCore reducedMotion={reducedMotion} thinking={thinking} />

            {layout.map((node) => (
                <ProjectNode
                    key={node.project.slug}
                    node={node}
                    focused={focusSlug === node.project.slug}
                    reducedMotion={reducedMotion}
                    thinking={thinking}
                    onSelect={onSelect}
                />
            ))}

            <Rig layout={layout} focusSlug={focusSlug} />

            {/* Glow pass: the emissive orbs, core, and filaments bloom into the
                warm dark, and a soft vignette pulls focus to the center. This is
                the difference between "flat glow" and a scene that feels lit. */}
            <EffectComposer enableNormalPass={false}>
                <Bloom
                    intensity={0.85}
                    luminanceThreshold={0.2}
                    luminanceSmoothing={0.9}
                    mipmapBlur
                    radius={0.7}
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
