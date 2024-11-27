import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTechBall } from '../../hooks/useTechBall';
import * as THREE from 'three';

export function TechBall({ imageUrl }) {
  const { texture, particlesGeometry } = useTechBall(imageUrl);
  const particlesRef = useRef();
  const decalRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // Animate particles and decal
    const floatY = Math.cos(time) * 0.03;
    const floatZ = Math.sin(time) * 0.03;
    
    if (particlesRef.current) {
      particlesRef.current.position.y = floatY;
      particlesRef.current.position.z = floatZ;
    }
    
    if (decalRef.current) {
      decalRef.current.position.y = floatY;
      decalRef.current.position.z = floatZ;
    }
  });

  return (
    <group>
      <points ref={particlesRef}>
        <bufferGeometry {...particlesGeometry} />
        <pointsMaterial
          size={0.02}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      
      <mesh ref={decalRef} position={[0, 0, 0.1]}>
        <planeGeometry args={[1.7, 1.7]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={1}
          depthWrite={false}
          depthTest={true}
        />
      </mesh>
    </group>
  );
} 