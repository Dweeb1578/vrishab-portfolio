'use client';

import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Billboard } from '@react-three/drei';
import type { Mesh, Group } from 'three';
import type { NodeLayout } from './layout';

interface Props {
    node: NodeLayout;
    focused: boolean;
    reducedMotion: boolean;
    /** true while a question is being answered — drives the radial pulse */
    thinking: boolean;
    onSelect: (slug: string) => void;
}

export default function ProjectNode({ node, focused, reducedMotion, thinking, onSelect }: Props) {
    const groupRef = useRef<Group>(null);
    const crystalRef = useRef<Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const active = hovered || focused;

    // Distance from the center core, used to phase-shift the pulse so it reads
    // as a wave travelling outward from the core rather than every orb blinking
    // in unison.
    const dist = useMemo(() => Math.hypot(...node.position), [node.position]);

    useFrame((state, delta) => {
        const g = groupRef.current;
        const c = crystalRef.current;
        if (!g || !c) return;

        // Radial "listening" wave: while a question is being answered, a pulse
        // ripples out from the center core through the constellation. 0→1 each
        // crest; phase offset by distance so the wave visibly travels.
        const wave = thinking && !reducedMotion
            ? Math.sin(state.clock.elapsedTime * 3 - dist * 0.55) * 0.5 + 0.5
            : 0;

        // ease scale toward active state, plus the pulse swell
        const targetScale = (active ? 1.18 : 1) + wave * 0.14;
        g.scale.x += (targetScale - g.scale.x) * Math.min(delta * 8, 1);
        g.scale.y = g.scale.z = g.scale.x;

        if (!reducedMotion) {
            // orbs spin up on the crest of the wave
            const spin = 1 + wave * 1.6;
            c.rotation.x += delta * 0.25 * spin;
            c.rotation.y += delta * 0.35 * spin;
        }

        // ease emissive glow, brightened by the pulse
        const mat = c.material as unknown as { emissiveIntensity: number };
        const targetGlow = (active ? 1.0 : 0.35) + wave * 0.7;
        mat.emissiveIntensity += (targetGlow - mat.emissiveIntensity) * Math.min(delta * 6, 1);
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
