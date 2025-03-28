import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTechBall } from '../../hooks/useTechBall';
import * as THREE from 'three';

export function TechBall({ imageUrl, initialRotation = [0, 0, 0] }) {
  const { texture, particlesGeometry } = useTechBall(imageUrl);
  const particlesRef = useRef();
  const decalFrontRef = useRef();
  const decalBackRef = useRef();
  const meshRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // Animate particles with a more snow globe feel
    if (particlesRef.current) {
      //  particlesRef.current.rotation.y += delta * 0.05; // Gentle constant rotation
      
      // Make particles move in a more random, floating pattern
      particlesRef.current.geometry.attributes.position.array.forEach((_, i) => {
        if (i % 3 === 0) {
          particlesRef.current.geometry.attributes.position.array[i] += Math.sin(time + i) * 0.0003;
          particlesRef.current.geometry.attributes.position.array[i + 1] += Math.cos(time + i) * 0.0003;
        }
      });
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Synchronize decals rotation
    if (decalFrontRef.current && decalBackRef.current) {
      const floatY = Math.cos(time * 0.15) * 0.02;
      const floatZ = Math.cos(time * 0.15) * 0.02;
      
      decalFrontRef.current.position.y = floatY;
      decalFrontRef.current.position.z = floatZ;
      
      decalBackRef.current.position.y = floatY;
      decalBackRef.current.position.z = -floatZ;
    }
  });

  // Apply the initial rotation when the component mounts
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = initialRotation[0];
      meshRef.current.rotation.y = initialRotation[1];
      meshRef.current.rotation.z = initialRotation[2];
    }
  }, [initialRotation]);

  return (
    <group ref={meshRef}>
      {/* Particles system */}
      <points ref={particlesRef}>
        <bufferGeometry {...particlesGeometry} />
        <pointsMaterial
          size={0.030}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          color={0x193852}
          opacity={0.6}
          sizeAttenuation={true}
        />
      </points>
      
      {/* Front decal */}
      <mesh ref={decalFrontRef} position={[0.0, 0, 0.2]} rotation={[0, -0.5, 0]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={1}
          depthWrite={false}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Back decal (rotated 180 degrees) */}
      <mesh ref={decalBackRef} position={[0.0, 0, -0.2]} rotation={[0, Math.PI+0.5, 0]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={1}
          depthWrite={false}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Glass-like sphere effect */}
      <mesh>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshPhysicalMaterial
          transparent
          opacity={0.1}
          roughness={0}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
} 