"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function TerrainCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Fast WebGL check
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl", { powerPreference: "low-power" });
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    let animationFrameId: number;
    let isVisible = true;
    let lastRenderTime = 0;
    const targetFpsInterval = 1000 / 30; // Cap at 30 FPS for ultra-smooth, lightweight performance

    const width = currentMount.clientWidth || 800;
    const height = currentMount.clientHeight || 500;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a1d16, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 80);
    camera.position.set(0, 11, 20);
    camera.lookAt(0, 0, 0);

    // 2. Optimized Renderer (capped pixel ratio 1 to eliminate GPU strain)
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false, // Turn off heavy multisample antialiasing
      powerPreference: "low-power",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(1);
    renderer.setClearColor(0x0a1d16, 0);
    currentMount.appendChild(renderer.domElement);

    // 3. Lightweight Topographic Wireframe (24 segments instead of 45: 75% fewer polygons)
    const planeSize = 34;
    const segments = 24;
    const geometry = new THREE.PlaneGeometry(planeSize, planeSize, segments, segments);
    geometry.rotateX(-Math.PI / 2);

    const positionAttribute = geometry.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      const elevation =
        Math.sin(vertex.x * 0.22) * Math.cos(vertex.z * 0.22) * 2.2 +
        Math.sin(vertex.x * 0.45 + vertex.z * 0.3) * 0.8;
      positionAttribute.setY(i, elevation);
    }
    geometry.computeVertexNormals();

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xc8a870,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    const terrainWireframe = new THREE.Mesh(geometry, wireframeMaterial);
    scene.add(terrainWireframe);

    // Subtle dark base underlay
    const solidMaterial = new THREE.MeshBasicMaterial({
      color: 0x071b14,
      transparent: true,
      opacity: 0.65,
    });
    const terrainSolid = new THREE.Mesh(geometry, solidMaterial);
    terrainSolid.position.y = -0.05;
    scene.add(terrainSolid);

    // 4. Few lightweight markers
    const beaconGeo = new THREE.CylinderGeometry(0.04, 0.04, 3, 6);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xdfbe82 });
    const markers = [
      { x: -5, z: 2, y: 1.8 },
      { x: 4, z: -3, y: 1.2 },
      { x: -7, z: -4, y: 1.6 },
    ];

    markers.forEach((m) => {
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(m.x, m.y + 1.5, m.z);
      scene.add(beacon);
    });

    // 5. Throttled Mouse movement
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let ticking = false;

    const handleMouseMove = (event: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = currentMount.getBoundingClientRect();
          targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 1.5;
          targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 1.5;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 6. Resize handling
    const handleResize = () => {
      if (!currentMount) return;
      const newW = currentMount.clientWidth;
      const newH = currentMount.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // 7. Throttled Animation Loop
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      // If out of view or tab hidden, do not schedule the next frame (0% CPU/GPU overhead)
      if (!isVisible || document.hidden) return;

      animationFrameId = requestAnimationFrame(animate);

      const elapsedSinceLastRender = currentTime - lastRenderTime;
      if (elapsedSinceLastRender < targetFpsInterval) return;

      lastRenderTime = currentTime - (elapsedSinceLastRender % targetFpsInterval);

      const elapsedTime = (currentTime - startTime) * 0.001;

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      camera.position.x = Math.sin(elapsedTime * 0.1) * 1.2 + mouseX * 2.5;
      camera.position.z = 20 + Math.cos(elapsedTime * 0.08) * 0.8;
      camera.position.y = 11 - mouseY * 1.5;
      camera.lookAt(0, 0, 0);

      if (!prefersReducedMotion) {
        terrainWireframe.rotation.y = elapsedTime * 0.02;
        terrainSolid.rotation.y = elapsedTime * 0.02;
      }

      renderer.render(scene, camera);
    };

    // 8. Intersection Observer: Stop loop completely when scrolled away, resume when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;
          if (!wasVisible && isVisible) {
            lastRenderTime = performance.now();
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(currentMount);

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      wireframeMaterial.dispose();
      solidMaterial.dispose();
      beaconGeo.dispose();
      beaconMat.dispose();
      renderer.dispose();

      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full bg-[#0A1D16] flex items-center justify-center opacity-60">
        <div className="text-center p-6 border border-[#C8A870]/20 rounded-lg">
          <p className="text-xs uppercase tracking-widest text-[#C8A870]">
            Topographic Landscape Preview
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="w-full h-full relative pointer-events-auto"
      style={{ touchAction: "none" }}
    >
      <div className="absolute bottom-3 right-4 z-10 pointer-events-none text-[9px] uppercase tracking-wider text-[#C8A870]/60 bg-[#0A1D16]/80 px-2 py-0.5 rounded border border-[#C8A870]/20">
        3D Topographic Simulation [30 FPS Optimized]
      </div>
    </div>
  );
}
