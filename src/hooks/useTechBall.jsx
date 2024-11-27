import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

export function useTechBall(imageUrl) {
  const texture = useTexture(imageUrl);
  
  const particlesGeometry = new THREE.BufferGeometry();
  const particleCount = 2000; // Adjust based on performance needs
  
  const positions = new Float32Array(particleCount * 3);
  const randoms = new Float32Array(particleCount);
  
  // Create icosahedron for reference positions
  const baseGeometry = new THREE.IcosahedronGeometry(1, 4);
  const basePositions = baseGeometry.attributes.position.array;
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = basePositions[i3 % basePositions.length];
    positions[i3 + 1] = basePositions[(i3 + 1) % basePositions.length];
    positions[i3 + 2] = basePositions[(i3 + 2) % basePositions.length];
    randoms[i] = Math.random();
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('random', new THREE.BufferAttribute(randoms, 1));

  return {
    texture,
    particlesGeometry,
  };
} 