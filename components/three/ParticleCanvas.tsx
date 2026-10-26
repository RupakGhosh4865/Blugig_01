"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { animate } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { particleFragment, particleVertex } from "@/components/three/shaders";
import { mulberry32 } from "@/lib/prng";
import { getShape, getShapeTint, SHAPE_SWAY, type ShapeName } from "@/lib/three/shapes";

export type ParticleCanvasProps = {
  shape: ShapeName;
  /** Temporarily morph toward another shape (e.g. "next service" hover). */
  morphTo?: ShapeName | null;
  colorA: string;
  colorB: string;
  sparkle: string;
  blending: "additive" | "normal";
  count: number;
  dpr: [number, number];
  interactive: boolean;
  active: boolean;
  pointSize: number;
  opacity: number;
  cameraZ: number;
  spin: number;
  onReady: () => void;
};

function hexToVec3(hex: string) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/(.)/g, "$1$1") : h, 16);
  return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

const easeInOutCubic = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

export default function ParticleCanvas(props: ParticleCanvasProps) {
  return (
    <Canvas
      flat
      linear
      dpr={props.dpr}
      frameloop={props.active ? "always" : "never"}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, props.cameraZ], fov: 40, near: 0.1, far: 50 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Particles {...props} />
    </Canvas>
  );
}

/**
 * One THREE.Points with a custom ShaderMaterial (BUILD_SPEC §6.3).
 * three.js objects are only mutated through refs (React Compiler friendly).
 */
function Particles({
  shape,
  morphTo,
  colorA,
  colorB,
  sparkle,
  blending,
  count,
  interactive,
  pointSize,
  opacity,
  spin,
  onReady,
}: ParticleCanvasProps) {
  const group = useRef<THREE.Group>(null);
  const geo = useRef<THREE.BufferGeometry>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const state = useRef({
    progress: 1,
    ready: false,
    shape: shape as ShapeName,
    /** Shape whose tint the aTint attribute currently holds. */
    tintShape: getShapeTint(shape, count) ? shape : (null as ShapeName | null),
    mouse: new THREE.Vector2(10, 10),
    tilt: new THREE.Vector2(0, 0),
    tiltTarget: new THREE.Vector2(0, 0),
  });
  const gl = useThree((s) => s.gl);
  const target: ShapeName = morphTo ?? shape;

  // Buffers are created once per particle count; later shape changes morph instead of rebuilding.
  const buffers = useMemo(() => {
    const initial = getShape(shape, count);
    const seeds = new Float32Array(count);
    const rand = mulberry32(7);
    for (let i = 0; i < count; i++) seeds[i] = rand();
    const tint = getShapeTint(shape, count)?.slice() ?? new Float32Array(count).fill(-1);
    return { position: initial.slice(), from: initial.slice(), to: initial.slice(), seeds, tint };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 1 },
      uNoise: { value: 0.012 },
      uWave: { value: shape === "wave" ? 1 : 0 },
      uPointSize: { value: pointSize },
      uPixelRatio: { value: 1 },
      uMouse: { value: new THREE.Vector2(10, 10) },
      uMouseStrength: { value: interactive ? 1 : 0 },
      uColorA: { value: hexToVec3(colorA) },
      uColorB: { value: hexToVec3(colorB) },
      uSparkle: { value: hexToVec3(sparkle) },
      uOpacity: { value: opacity },
      uTint: { value: getShapeTint(shape, count) ? 1 : 0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // Live uniform updates when props change.
  useEffect(() => {
    const m = mat.current;
    if (!m) return;
    m.uniforms.uColorA.value = hexToVec3(colorA);
    m.uniforms.uColorB.value = hexToVec3(colorB);
    m.uniforms.uSparkle.value = hexToVec3(sparkle);
    m.uniforms.uOpacity.value = opacity;
    m.uniforms.uPointSize.value = pointSize;
    m.uniforms.uMouseStrength.value = interactive ? 1 : 0;
  }, [colorA, colorB, sparkle, opacity, pointSize, interactive]);

  // setShape(next): snapshot current positions into aFrom, write the target into aTo,
  // animate uProgress 0 → 1 (1.2s easeInOut) while uNoise bumps and settles, and the
  // brand tint fades toward the target's (a tinted target loads its tint into aTint first).
  useEffect(() => {
    const g = geo.current;
    const m = mat.current;
    if (!g || !m) return;
    const s = state.current;
    const fromAttr = g.getAttribute("aFrom") as THREE.BufferAttribute;
    const toAttr = g.getAttribute("aTo") as THREE.BufferAttribute;
    const tintAttr = g.getAttribute("aTint") as THREE.BufferAttribute;
    const running: { stop: () => void }[] = [];

    const morph = (next: ShapeName) => {
      const e = easeInOutCubic(s.progress);
      const fa = fromAttr.array as Float32Array;
      const ta = toAttr.array as Float32Array;
      for (let i = 0; i < fa.length; i++) fa[i] = fa[i] + (ta[i] - fa[i]) * e;
      ta.set(getShape(next, count));
      fromAttr.needsUpdate = true;
      toAttr.needsUpdate = true;
      const nextTint = getShapeTint(next, count);
      if (nextTint && s.tintShape !== next) {
        (tintAttr.array as Float32Array).set(nextTint);
        tintAttr.needsUpdate = true;
        s.tintShape = next;
        m.uniforms.uTint.value = 0;
      }
      s.progress = 0;
      s.shape = next;
      m.uniforms.uProgress.value = 0;
      running.forEach((r) => r.stop());
      running.length = 0;
      running.push(
        animate(0, 1, {
          duration: 1.2,
          ease: [0.65, 0, 0.35, 1],
          onUpdate: (v) => {
            s.progress = v;
            m.uniforms.uProgress.value = v;
          },
        }),
        animate(m.uniforms.uNoise.value as number, [0.13, 0.012], {
          duration: 1.2,
          ease: "easeInOut",
          onUpdate: (v) => {
            m.uniforms.uNoise.value = v;
          },
        }),
        animate(m.uniforms.uWave.value as number, next === "wave" ? 1 : 0, {
          duration: 1.2,
          onUpdate: (v) => {
            m.uniforms.uWave.value = v;
          },
        }),
        animate(m.uniforms.uTint.value as number, nextTint ? 1 : 0, {
          duration: 1.2,
          onUpdate: (v) => {
            m.uniforms.uTint.value = v;
          },
        }),
      );
    };

    let loop: ReturnType<typeof setInterval> | undefined;
    if (target === "migrate") {
      // Data Migration: cube ↔ sphere every 6s
      if (s.shape !== "cube" && s.shape !== "sphere" && s.shape !== "migrate") morph("cube");
      let sphere = false;
      loop = setInterval(() => {
        sphere = !sphere;
        morph(sphere ? "sphere" : "cube");
      }, 6000);
    } else if (target !== s.shape) {
      morph(target);
    }

    return () => {
      if (loop) clearInterval(loop);
      running.forEach((r) => r.stop());
    };
  }, [target, count, shape]);

  // Cursor tracking at window level — the canvas usually sits behind content.
  useEffect(() => {
    if (!interactive) return;
    const el = gl.domElement;
    const s = state.current;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      s.mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
    };
    const onLeave = () => s.mouse.set(10, 10);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [gl, interactive]);

  useFrame((frame, delta) => {
    const m = mat.current;
    const g = group.current;
    const s = state.current;
    if (m) {
      m.uniforms.uTime.value += delta;
      m.uniforms.uPixelRatio.value = frame.viewport.dpr;
      (m.uniforms.uMouse.value as THREE.Vector2).lerp(s.mouse, 0.12);
    }
    if (g) {
      // a brand mark sways (~12s period) so it never turns past side-on and reads mirrored
      const sway = SHAPE_SWAY[shape];
      if (sway) g.rotation.y = Math.sin((m ? (m.uniforms.uTime.value as number) : 0) * 0.5) * sway;
      else g.rotation.y += delta * spin;
      if (interactive) {
        // whole-group parallax ≤ ~6°
        const inside = Math.abs(s.mouse.x) <= 1.5;
        const mx = Math.max(-1, Math.min(1, s.mouse.x));
        const my = Math.max(-1, Math.min(1, s.mouse.y));
        s.tiltTarget.set(inside ? my * 0.1 : 0, inside ? mx * 0.1 : 0);
        s.tilt.lerp(s.tiltTarget, 0.05);
        g.rotation.x = s.tilt.x;
        g.rotation.z = -s.tilt.y * 0.4;
      }
    }
    if (!s.ready) {
      s.ready = true;
      requestAnimationFrame(() => onReady());
    }
  });

  return (
    <group ref={group}>
      <points frustumCulled={false}>
        <bufferGeometry ref={geo} key={count}>
          <bufferAttribute attach="attributes-position" args={[buffers.position, 3]} />
          <bufferAttribute attach="attributes-aFrom" args={[buffers.from, 3]} />
          <bufferAttribute attach="attributes-aTo" args={[buffers.to, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[buffers.seeds, 1]} />
          <bufferAttribute attach="attributes-aTint" args={[buffers.tint, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={mat}
          key={blending}
          vertexShader={particleVertex}
          fragmentShader={particleFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={blending === "additive" ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </points>
    </group>
  );
}
