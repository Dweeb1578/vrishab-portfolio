'use client';

import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Billboard } from '@react-three/drei';
import type { Mesh, Group } from 'three';
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

export default function ProjectNode({ node, focused, focusActive, reducedMotion, thinking, onSelect }: Props) {
    const groupRef = useRef<Group>(null);
    const crystalRef = useRef<Mesh>(null);
    const [hovered, setHovered] = useState(false);

    // Distance from the center core, used to phase-shift the pulse so it reads
    // as a wave travelling outward from the core rather than every orb blinking
    // in unison.
    const dist = useMemo(() => Math.hypot(...node.position), [node.position]);
    // Unit vector pointing from the core out through this orb — the direction it
    // drifts when another orb takes the stage.
    const outward = useMemo(() => {
        const [x, y, z] = node.position;
        const len = Math.hypot(x, y, z) || 1;
        return [x / len, y / len, z / len] as const;
    }, [node.position]);

    useFrame((state, delta) => {
        const g = groupRef.current;
        const c = crystalRef.current;
        if (!g || !c) return;

        const isHero = focused;
        const isReceding = focusActive && !focused;

        // Radial "listening" wave: while a question is being answered, a pulse
        // ripples out from the center core. Receding orbs sit it out so the
        // stage stays calm around the hero.
        const wave = thinking && !reducedMotion && !isReceding
            ? Math.sin(state.clock.elapsedTime * 3 - dist * 0.55) * 0.5 + 0.5
            : 0;

        // Restructure: the hero holds its ring slot (so the camera still frames
        // it) and swells; everyone else drifts outward and shrinks to clear the
        // view, then eases home when focus releases.
        const push = isReceding && !reducedMotion ? 3.8 : 0;
        const ease = (cur: number, target: number, k: number) => cur + (target - cur) * Math.min(delta * k, 1);
        g.position.x = ease(g.position.x, outward[0] * push, 3);
        g.position.y = ease(g.position.y, outward[1] * push, 3);
        g.position.z = ease(g.position.z, outward[2] * push, 3);

        const baseScale = isHero ? 1.4 : hovered ? 1.18 : isReceding ? 0.55 : 1;
        const targetScale = baseScale + wave * 0.14;
        g.scale.x = ease(g.scale.x, targetScale, 6);
        g.scale.y = g.scale.z = g.scale.x;

        if (!reducedMotion) {
            // orbs spin up on the crest of the wave; the hero keeps a lively spin
            const spin = (isHero ? 1.6 : 1) + wave * 1.6;
            c.rotation.x += delta * 0.25 * spin;
            c.rotation.y += delta * 0.35 * spin;
        }

        // ease emissive glow: hero burns bright, receding orbs dim down
        const mat = c.material as unknown as { emissiveIntensity: number };
        const baseGlow = isHero ? 1.2 : hovered ? 1.0 : isReceding ? 0.1 : 0.35;
        mat.emissiveIntensity = ease(mat.emissiveIntensity, baseGlow + wave * 0.7, 6);
    });

    return (
        <Float
            speed={reducedMotion ? 0 : 1.1}
            rotationIntensity={reducedMotion ? 0 : 0.3}
            floatIntensity={reducedMotion ? 0 : 0.8}
            position={node.position}
        >
            <group
                ref={groupRef}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect(node.project.slug);
                }}
                onDoubleClick={(e) => {
                    e.stopPropagation();
                    const url = node.project.githubUrl ?? node.project.liveUrl;
                    if (url) window.open(url, '_blank', 'noopener,noreferrer');
                }}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                    setHovered(false);
                    document.body.style.cursor = 'default';
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
