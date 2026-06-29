'use client';

import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import type { PerspectiveCamera } from 'three';
import type { NodeLayout } from './layout';

interface Props {
    layout: NodeLayout[];
    focusSlug: string | null;
}

export const HOME = new Vector3(0, 6, 28);

type Controls = { target: Vector3; update: () => void; addEventListener: (e: string, cb: () => void) => void; removeEventListener: (e: string, cb: () => void) => void } | null;

/**
 * Camera director. It ONLY moves the camera while a fly-to animation is active
 * (triggered when `focusSlug` changes). Once it arrives — or the moment the
 * user grabs the scene — it stops and hands full control back to OrbitControls,
 * so dragging never gets yanked back toward the centre.
 */
export default function Rig({ layout, focusSlug }: Props) {
    const camera = useThree((s) => s.camera) as PerspectiveCamera;
    const controls = useThree((s) => s.controls) as Controls;

    const animating = useRef(false);
    const targetPos = useRef(new Vector3().copy(HOME));
    const targetLook = useRef(new Vector3(0, 0, 0));

    // Start a fly-to whenever the focus changes.
    useEffect(() => {
        const node = focusSlug ? layout.find((n) => n.project.slug === focusSlug) : null;
        if (node) {
            const np = new Vector3(...node.position);
            targetLook.current.copy(np);
            const dir = np.clone().setY(0).normalize().multiplyScalar(7);
            targetPos.current.copy(np).add(dir).add(new Vector3(0, 2.4, 0));
        } else {
            targetPos.current.copy(HOME);
            targetLook.current.set(0, 0, 0);
        }
        animating.current = true;
    }, [focusSlug, layout]);

    // Any manual interaction cancels the animation — user wins.
    useEffect(() => {
        if (!controls) return;
        const stop = () => {
            animating.current = false;
        };
        controls.addEventListener('start', stop);
        return () => controls.removeEventListener('start', stop);
    }, [controls]);

    useFrame((_, delta) => {
        if (!animating.current) return;
        const k = Math.min(delta * 2.4, 1);
        camera.position.lerp(targetPos.current, k);
        if (controls) {
            controls.target.lerp(targetLook.current, k);
            controls.update();
        }
        if (camera.position.distanceTo(targetPos.current) < 0.08) {
            animating.current = false;
        }
    });

    return null;
}
