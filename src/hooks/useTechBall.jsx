import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

export function useTechBall(imageUrl) {
  const texture = useTexture(imageUrl);
  
  const particlesGeometry = new THREE.BufferGeometry();
  const particleCount = 2500; // Increased for more snow globe effect
  
  const positions = new Float32Array(particleCount * 3);
  const randoms = new Float32Array(particleCount);
  
  // Create sphere distribution for particles
  for (let i = 0; i < particleCount; i++) {
    const radius = 1;
    const theta = THREE.MathUtils.randFloatSpread(360); 
    const phi = THREE.MathUtils.randFloatSpread(360);

    positions[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
    positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
    positions[i * 3 + 2] = radius * Math.cos(theta);
    
    randoms[i] = Math.random();
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('random', new THREE.BufferAttribute(randoms, 1));

  return {
    texture,
    particlesGeometry,
  };
} 