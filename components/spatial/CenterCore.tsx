'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { Group, Mesh, Points } from 'three';

interface Props {
    reducedMotion: boolean;
    /** true while the RAG is retrieving/streaming an answer — the core "thinks" */
    thinking: boolean;
}

/**
 * Abstract centerpiece: a glowing inner core inside a slowly counter-rotating
 * wireframe shell, wrapped in a sphere of drifting particles. Reads as a "mind"
 * the work orbits around — deliberately no face, no name, no résumé tags.
 */
export default function CenterCore({ reducedMotion, thinking }: Props) {
    const coreRef = useRef<Mesh>(null);
    const shellRef = useRef<Mesh>(null);
    const cloudRef = useRef<Points>(null);
    const groupRef = useRef<Group>(null);
    const energy = useRef(0); // eased 0→1 "thinking" intensity

    // particle shell: points scattered on a sphere
    const positions = useMemo(() => {
        const N = 600;
        const arr = new Float32Array(N * 3);
        for (let i = 0; i < N; i++) {
            const r = 3.1 + Math.random() * 0.5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            arr[i * 3 + 2] = r * Math.cos(phi);
        }
        return arr;
    }, []);

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime;
        // ease the "thinking" energy toward its target
        energy.current += ((thinking ? 1 : 0) - energy.current) * Math.min(delta * 4, 1);
        const e = energy.current;
        const spin = reducedMotion ? 0 : 1 + e * 2.5; // spins up while thinking
        const group = groupRef.current;
        if (group) {
            const target = 1 + e * 0.12; // swells slightly while thinking
            group.scale.x += (target - group.scale.x) * Math.min(delta * 5, 1);
            group.scale.y = group.scale.z = group.scale.x;
        }
        if (coreRef.current) {
            coreRef.current.rotation.y += delta * 0.3 * spin;
            coreRef.current.rotation.x += delta * 0.12 * spin;
            const mat = coreRef.current.material as unknown as { emissiveIntensity: number };
            // calm pulse at rest; brighter + faster flicker while thinking
            mat.emissiveIntensity = 0.7 + Math.sin(t * (1.4 + e * 5)) * (0.25 + e * 0.7) + e * 0.5;
        }
        if (shellRef.current && !reducedMotion) {
            shellRef.current.rotation.y -= delta * 0.16 * spin;
            shellRef.current.rotation.z += delta * 0.06 * spin;
        }
        if (cloudRef.current && !reducedMotion) {
            cloudRef.current.rotation.y += delta * (0.04 + e * 0.2);
        }
    });

    return (
        <Float speed={reducedMotion ? 0 : 0.5} floatIntensity={reducedMotion ? 0 : 0.4} rotationIntensity={0}>
            <group ref={groupRef}>
                {/* glowing inner core */}
                <mesh ref={coreRef}>
                    <icosahedronGeometry args={[1.25, 1]} />
                    <meshStandardMaterial
                        color="#f3ead7"
                        emissive="#e9a23b"
                        emissiveIntensity={0.7}
                        roughness={0.15}
                        metalness={0.6}
                        flatShading
                    />
                </mesh>

                {/* counter-rotating wireframe shell */}
                <mesh ref={shellRef}>
                    <icosahedronGeometry args={[2.2, 1]} />
                    <meshBasicMaterial color="#d8623a" wireframe transparent opacity={0.28} />
                </mesh>

                {/* drifting particle sphere */}
                <points ref={cloudRef}>
                    <bufferGeometry>
                        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                    </bufferGeometry>
                    <pointsMaterial color="#caa05a" size={0.045} transparent opacity={0.7} sizeAttenuation />
                </points>
            </group>
        </Float>
    );
}
