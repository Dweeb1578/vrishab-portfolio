'use client';

import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { Float, Text, Billboard } from '@react-three/drei';
import { Vector3, Vector2, Plane, Raycaster } from 'three';
import type { Mesh, Group, Camera, WebGLRenderer } from 'three';
import type { NodeLayout } from './layout';

interface Props {
    node: NodeLayout;
    focused: boolean;
    /** true when SOME orb is focused — the non-focused ones part to make way */
    focusActive: boolean;
    reducedMotion: boolean;
    /** true while a question is being answered — drives the radial pulse */
    thinking: boolean;
    onSelect: (slug: string) => void;
}

type Controls = { enabled: boolean } | null;

// Keep thrown orbs within a sane shell around the center core so they never end
// up behind the camera or lost in the fog.
const MIN_R = 6;
const MAX_R = 24;

export default function ProjectNode({ node, focused, focusActive, reducedMotion, thinking, onSelect }: Props) {
    const groupRef = useRef<Group>(null);
    const crystalRef = useRef<Mesh>(null);
    const [hovered, setHovered] = useState(false);
    // `grabbed` = under manual physics (being dragged or coasting after a throw).
    // State, not a ref, because it gates <Float> off so the offset isn't swung
    // around by the float wobble.
    const [grabbed, setGrabbed] = useState(false);

    const camera = useThree((s) => s.camera) as Camera;
    const gl = useThree((s) => s.gl) as WebGLRenderer;
    const controls = useThree((s) => s.controls) as Controls;

    // The orb's rest position. MUTABLE: when you throw an orb it coasts to a stop
    // and adopts that spot as its new home, so it stays where you flung it
    // instead of snapping back. The <Float> frame stays anchored at the original
    // node.position; everything is expressed as a local offset from there.
    const home = useRef(new Vector3(...node.position));

    // Drag/throw working state (refs so it survives frames without re-render).
    const dragging = useRef(false);
    const movedPx = useRef(false);
    const downClient = useRef<[number, number]>([0, 0]);
    const pos = useRef(new Vector3());
    const vel = useRef(new Vector3());
    const dragTarget = useRef(new Vector3());
    const plane = useRef(new Plane());
    const raycaster = useRef(new Raycaster());
    const ndc = useRef(new Vector2());
    const listeners = useRef<{ move: (e: PointerEvent) => void; up: (e: PointerEvent) => void } | null>(null);

    // Screen pointer → world point on the drag plane (a plane facing the camera
    // through the grab point), so the orb tracks the cursor even after it leaves
    // the mesh during a fast drag.
    function pointerToPlane(clientX: number, clientY: number, out: Vector3): boolean {
        const rect = gl.domElement.getBoundingClientRect();
        ndc.current.set(
            ((clientX - rect.left) / rect.width) * 2 - 1,
            -((clientY - rect.top) / rect.height) * 2 + 1,
        );
        raycaster.current.setFromCamera(ndc.current, camera);
        return raycaster.current.ray.intersectPlane(plane.current, out) !== null;
    }

    function detachListeners() {
        if (!listeners.current) return;
        window.removeEventListener('pointermove', listeners.current.move);
        window.removeEventListener('pointerup', listeners.current.up);
        listeners.current = null;
    }
    useEffect(() => detachListeners, []);

    function onPointerDown(e: ThreeEvent<PointerEvent>) {
        e.stopPropagation();
        dragging.current = true;
        movedPx.current = false;
        downClient.current = [e.nativeEvent.clientX, e.nativeEvent.clientY];

        // Start physics from the orb's real current world position.
        const wp = new Vector3();
        groupRef.current?.getWorldPosition(wp);
        pos.current.copy(wp);
        vel.current.set(0, 0, 0);
        dragTarget.current.copy(wp);

        // Drag plane faces the camera through the grab point.
        const camDir = new Vector3();
        camera.getWorldDirection(camDir);
        plane.current.setFromNormalAndCoplanarPoint(camDir, wp);

        if (controls) controls.enabled = false; // don't orbit the camera while holding an orb
        document.body.style.cursor = 'grabbing';
        setGrabbed(true);

        // Pointer capture on a mesh stops firing R3F object events once the
        // cursor leaves it, so drive the drag from window listeners and raycast
        // manually. Attached imperatively so a very fast click can't release
        // before a listener exists.
        const move = (ev: PointerEvent) => {
            if (!dragging.current) return;
            const dx = ev.clientX - downClient.current[0];
            const dy = ev.clientY - downClient.current[1];
            if (dx * dx + dy * dy > 36) movedPx.current = true; // >6px = a drag, not a click
            const hit = new Vector3();
            if (pointerToPlane(ev.clientX, ev.clientY, hit)) dragTarget.current.copy(hit);
        };
        const up = () => {
            dragging.current = false;
            detachListeners();
            if (controls) controls.enabled = true;
            document.body.style.cursor = 'default';
            // A press that never really moved is a click — select; otherwise the
            // throw physics coast it to rest (grabbed stays true until settled).
            if (!movedPx.current) {
                setGrabbed(false);
                onSelect(node.project.slug);
            }
        };
        detachListeners();
        listeners.current = { move, up };
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
    }

    useFrame((state, delta) => {
        const g = groupRef.current;
        const c = crystalRef.current;
        if (!g || !c) return;
        const ease = (cur: number, target: number, k: number) => cur + (target - cur) * Math.min(delta * k, 1);

        // --- Grabbed: manual drag + throw-and-coast (overrides focus layout) ---
        if (grabbed) {
            const p = pos.current;
            const v = vel.current;
            if (dragging.current) {
                // stick to the cursor; remember the velocity for the throw
                v.copy(dragTarget.current).sub(p).divideScalar(Math.max(delta, 1 / 120));
                if (v.length() > 60) v.setLength(60);
                p.copy(dragTarget.current);
            } else {
                // released: coast with friction (NO spring) and keep it on-shell,
                // then adopt the landing spot as the orb's new home.
                v.multiplyScalar(Math.max(0, 1 - 2.2 * delta));
                p.addScaledVector(v, delta);
                const r = p.length();
                if (r > MAX_R) { p.setLength(MAX_R); v.multiplyScalar(0.4); }
                else if (r < MIN_R) { p.setLength(MIN_R); v.multiplyScalar(0.4); }
                if (v.length() < 0.25) {
                    home.current.copy(p);
                    setGrabbed(false); // settled — float idly at the new home
                }
            }
            g.position.set(p.x - node.position[0], p.y - node.position[1], p.z - node.position[2]);
            g.scale.setScalar(ease(g.scale.x, hovered || dragging.current ? 1.28 : 1.1, 8));
            if (!reducedMotion) {
                c.rotation.x += delta * 0.5;
                c.rotation.y += delta * 0.6;
            }
            const mat = c.material as unknown as { emissiveIntensity: number };
            mat.emissiveIntensity = ease(mat.emissiveIntensity, 1.1, 6);
            return;
        }

        // --- Normal: focus layout, all relative to the (possibly moved) home ---
        const h = home.current;
        const isHero = focused;
        const isReceding = focusActive && !focused;

        const wave = thinking && !reducedMotion && !isReceding
            ? Math.sin(state.clock.elapsedTime * 3 - h.length() * 0.55) * 0.5 + 0.5
            : 0;

        let wx = h.x, wy = h.y, wz = h.z;
        if (isHero) {
            const cam = state.camera.position;
            wx = cam.x * 0.6;
            wy = cam.y * 0.6;
            wz = cam.z * 0.6;
        } else if (isReceding && !reducedMotion) {
            const len = h.length() || 1;
            wx = h.x + (h.x / len) * 4.4;
            wy = h.y + (h.y / len) * 4.4;
            wz = h.z + (h.z / len) * 4.4;
        }
        const posK = isHero ? 4 : 3;
        g.position.x = ease(g.position.x, wx - node.position[0], posK);
        g.position.y = ease(g.position.y, wy - node.position[1], posK);
        g.position.z = ease(g.position.z, wz - node.position[2], posK);

        const baseScale = isHero ? 1.7 : hovered ? 1.18 : isReceding ? 0.5 : 1;
        g.scale.setScalar(ease(g.scale.x, baseScale + wave * 0.14, 6));

        if (!reducedMotion) {
            const spin = (isHero ? 1.6 : 1) + wave * 1.6;
            c.rotation.x += delta * 0.25 * spin;
            c.rotation.y += delta * 0.35 * spin;
        }

        const mat = c.material as unknown as { emissiveIntensity: number };
        const baseGlow = isHero ? 1.2 : hovered ? 1.0 : isReceding ? 0.1 : 0.35;
        mat.emissiveIntensity = ease(mat.emissiveIntensity, baseGlow + wave * 0.7, 6);
    });

    // Float bobs the orb at rest; switch it off while focused or grabbed so a
    // large position offset isn't rotated around by the float wobble.
    const floatOff = reducedMotion || focused || grabbed;

    return (
        <Float
            speed={floatOff ? 0 : 1.1}
            rotationIntensity={floatOff ? 0 : 0.3}
            floatIntensity={floatOff ? 0 : 0.8}
            position={node.position}
        >
            <group
                ref={groupRef}
                onPointerDown={onPointerDown}
                onDoubleClick={(e) => {
                    e.stopPropagation();
                    const url = node.project.githubUrl ?? node.project.liveUrl;
                    if (url) window.open(url, '_blank', 'noopener,noreferrer');
                }}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    if (!dragging.current) document.body.style.cursor = 'grab';
                }}
                onPointerOut={() => {
                    setHovered(false);
                    if (!dragging.current) document.body.style.cursor = 'default';
                }}
            >
                <mesh ref={crystalRef}>
                    <icosahedronGeometry args={[1.15, 0]} />
                    <meshStandardMaterial
                        color={node.color}
                        emissive={node.color}
                        emissiveIntensity={0.35}
                        roughness={0.25}
                        metalness={0.4}
                        flatShading
                    />
                </mesh>

                <mesh>
                    <icosahedronGeometry args={[1.55, 0]} />
                    <meshBasicMaterial color={node.color} wireframe transparent opacity={0.22} />
                </mesh>

                <Billboard position={[0, 2.1, 0]}>
                    <Text
                        fontSize={0.5}
                        color="#f3ead7"
                        anchorX="center"
                        anchorY="middle"
                        maxWidth={6}
                        textAlign="center"
                        outlineWidth={0.012}
                        outlineColor="#16130f"
                    >
                        {node.project.title}
                    </Text>
                </Billboard>
            </group>
        </Float>
    );
}
