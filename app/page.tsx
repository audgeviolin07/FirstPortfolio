"use client"

import * as THREE from 'three';
import { useEffect, useRef } from 'react';

const MyComponent = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      if (mountRef.current !== null) {
        mountRef.current.appendChild(renderer.domElement);
      }

      const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 ); 
      //const geometry = new THREE.TorusKnotGeometry( 1, 3, 10, 6 ); 
      const material = new THREE.MeshBasicMaterial({ color: 0xffff, wireframe: true });
      const cube = new THREE.Mesh(geometry, material);
      const scene = new THREE.Scene();
      scene.add(cube);

      camera.position.z = 5;
      
      const animate = function () {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.007;
        cube.rotation.y += 0.007;

        renderer.render(scene, camera);
      };

      animate();
    }
  }, []);

  return <div ref={mountRef}>My Three.js app</div>;
};

export default function Home() {
  return <MyComponent />;
}

