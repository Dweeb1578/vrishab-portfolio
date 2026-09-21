'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sparkles, PerformanceMonitor } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import {
    FogExp2,
    Color,
    PerspectiveCamera,
    Vector3,
    type BufferAttribute,
    type BufferGeometry,
    type LineBasicMaterial,
    type Object3D,
} from 'three';
import { buildLayout, ringRadius, SCENE_BG, PHOSPHOR, type NodeLayout } from './layout';
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
// Perspective magnifies the near side of the ring, so the orbs that clip the
// edges are the ones at roughly 45 degrees, not the ones furthest out. Framing
// those is what sets the distance, hence the factor on the radius rather than a
// constant that silently stops working every time a project is added.
function cameraDistance(narrow: boolean): number {
    const r = ringRadius(narrow ? 0.7 : 1);
    return narrow ? Math.max(26, r * 2.2) : Math.max(28, r * 2.05);
}

function ResponsiveCamera({ narrow }: { narrow: boolean }) {
    const camera = useThree((s) => s.camera);
    useEffect(() => {
        if (!(camera instanceof PerspectiveCamera)) return;
        const dist = camera.position.length() || 1;
        camera.position.multiplyScalar(cameraDistance(narrow) / dist);
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
    nodeObjects,
    thinking,
    reducedMotion,
}: {
    layout: NodeLayout[];
    /** live scene objects for each orb, registered by ProjectNode on mount */
    nodeObjects: RefObject<Map<string, Object3D>>;
    thinking: boolean;
    reducedMotion: boolean;
}) {
    const matRef = useRef<LineBasicMaterial>(null);
    const geomRef = useRef<BufferGeometry>(null);
    const probe = useRef(new Vector3());
    const positions = useMemo(() => {
        const arr: number[] = [];
        for (const n of layout) arr.push(0, 0, 0, ...n.position);
        return new Float32Array(arr);
    }, [layout]);

    useFrame((state) => {
        if (matRef.current) {
            const pulse =
                thinking && !reducedMotion
                    ? (Math.sin(state.clock.elapsedTime * 3) * 0.5 + 0.5) * 0.24
                    : 0;
            // ease toward target so toggling `thinking` doesn't snap
            matRef.current.opacity += (0.09 + pulse - matRef.current.opacity) * 0.1;
        }

        // Re-point each filament at where its orb ACTUALLY is this frame. The
        // endpoints used to be baked in at build time, so dragging an orb tore
        // it off its own line and left the line pointing at empty space.
        const attr = geomRef.current?.attributes.position as BufferAttribute | undefined;
        if (!attr) return;
        const arr = attr.array as Float32Array;
        let moved = false;
        for (let i = 0; i < layout.length; i++) {
            const obj = nodeObjects.current?.get(layout[i].project.slug);
            if (!obj) continue;
            obj.getWorldPosition(probe.current);
            const o = i * 6 + 3; // skip the centre endpoint of this segment
            if (arr[o] !== probe.current.x || arr[o + 1] !== probe.current.y || arr[o + 2] !== probe.current.z) {
                arr[o] = probe.current.x;
                arr[o + 1] = probe.current.y;
                arr[o + 2] = probe.current.z;
                moved = true;
            }
        }
        if (moved) attr.needsUpdate = true;
    });

    return (
        <lineSegments frustumCulled={false}>
            <bufferGeometry ref={geomRef}>
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
    // Live handles on each orb's scene object, so the filaments can follow one
    // that is being dragged or is still coasting after a throw.
    const nodeObjects = useRef<Map<string, Object3D>>(new Map());
    const registerNode = useCallback((slug: string, obj: Object3D | null) => {
        if (obj) nodeObjects.current.set(slug, obj);
        else nodeObjects.current.delete(slug);
    }, []);

    return (
        <Canvas
            camera={{
                position: narrow ? [0, 0, cameraDistance(true)] : [0, 6, cameraDistance(false)],
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

            <ConstellationLines
                layout={layout}
                nodeObjects={nodeObjects}
                thinking={thinking}
                reducedMotion={reducedMotion}
            />

            <CenterCore reducedMotion={reducedMotion} thinking={thinking} />

            {layout.map((node) => (
                <ProjectNode
                    key={node.project.slug}
                    node={node}
                    registerNode={registerNode}
                    labelAlways={!narrow}
                    labelScale={narrow ? 0.5 : 1}
                    heroFactor={narrow ? 0.8 : 0.6}
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
                maxDistance={Math.max(narrow ? 40 : 50, cameraDistance(narrow) * 1.6)}
                maxPolarAngle={narrow ? Math.PI : Math.PI * 0.62}
                autoRotate={autoRotate && !reducedMotion}
                autoRotateSpeed={0.45}
                enablePan={false}
            />
        </Canvas>
    );
}
