'use client';

import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sparkles } from '@react-three/drei';
import { FogExp2, Color } from 'three';
import { buildLayout, SCENE_BG } from './layout';
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

            <CenterCore reducedMotion={reducedMotion} thinking={thinking} />

            {layout.map((node) => (
                <ProjectNode
                    key={node.project.slug}
                    node={node}
                    focused={focusSlug === node.project.slug}
                    reducedMotion={reducedMotion}
                    onSelect={onSelect}
                />
            ))}

            <Rig layout={layout} focusSlug={focusSlug} />

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
