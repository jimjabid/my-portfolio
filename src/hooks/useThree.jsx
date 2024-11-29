import { useContext, useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import vertexBg from '../shaders/vertexBg.glsl';
import fragmentBg from '../shaders/fragmentBg.glsl';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LoadingContext } from '../context/LoadingContext';

const useThree = (containerRef) => {
  const { isLoading, animationsComplete } = useContext(LoadingContext);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const isPlayingRef = useRef(true);

  useEffect(() => {
    // Don't initialize while loading
    if (isLoading || !animationsComplete) return;

    if (!containerRef.current) {
      console.log('No container ref');
      return;
    }

    console.log('Initializing Three.js scene');
    
    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    
    console.log('Container dimensions:', { width, height });

    // Scene setup
    sceneRef.current = new THREE.Scene();
    
    // Camera setup
    cameraRef.current = new THREE.PerspectiveCamera(65, width / height, 1, 1000);
    cameraRef.current.position.set(0, 0, 2.5);
    cameraRef.current.zoom = 1.2;
    cameraRef.current.updateProjectionMatrix();

    // Renderer setup
    rendererRef.current = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current.setSize(width, height);
    rendererRef.current.setClearColor("#0a151f", 1);
    
    console.log('Before appendChild');
    container.appendChild(rendererRef.current.domElement);
    console.log('After appendChild');

    // Create geometry and material
    const geometry = new THREE.IcosahedronGeometry(
      1.1,
      25
    );

    const vertices = geometry.attributes.position.array.length;
    const randoms = new Float32Array(vertices / 3);
    const colorRandom = new Float32Array(vertices / 3);

    for (let i = 0; i < vertices / 3; i++) {
      randoms[i] = Math.random();
      colorRandom[i] = Math.random();
    }

    geometry.setAttribute('randoms', new THREE.BufferAttribute(randoms, 1));
    geometry.setAttribute('colorRandom', new THREE.BufferAttribute(colorRandom, 1));

    materialRef.current = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable",
      },
      defines: {
        IS_MOBILE: false
      },
      uniforms: {
        time: { value: 0.0 },
        uColor1: { value: new THREE.Color(0x0a151f) },
        uColor2: { value: new THREE.Color(0xacd4f6) },
        uColor3: { value: new THREE.Color(0x193852) },
      },
      vertexShader: vertexBg,
      fragmentShader: fragmentBg,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    meshRef.current = new THREE.Points(geometry, materialRef.current);
    sceneRef.current.add(meshRef.current);

    // Animation loop
    function animate() {
      if (!isPlayingRef.current || isLoading) {
        console.log('Animation stopped');
        return;
      }

      const time = clockRef.current.getElapsedTime();
      
      if (meshRef.current) {
        const amplitude = 0.01;
        meshRef.current.position.y = Math.cos(time) * amplitude;
        meshRef.current.position.z = Math.cos(time) * amplitude;
        meshRef.current.rotation.y = Math.sin(time * 0.1) * 0.02;
      }

      if (materialRef.current) {
        materialRef.current.uniforms.time.value = time;
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current);
      requestAnimationFrame(animate);
    }

    console.log('Starting animation');
    animate();

    // Add resize handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;
      
      rendererRef.current.setSize(width, height);
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Scroll animation
    const bodyElement = document.querySelector("#body");
    
    if (bodyElement) {
      const scrollTrigger = ScrollTrigger.create({
        trigger: bodyElement,
        start: "top top",
        end: () => {
          // Check if element still exists before accessing offsetHeight
          const element = document.querySelector("#body");
          return element ? "+=" + element.offsetHeight * 1.25 : "+=100%";
        },
        onUpdate: (self) => {
          if (!meshRef.current) return;
          
          const progress = self.progress;
          const rotationAmount = Math.PI * 2 * progress;
          const rotationSpeed = -1;
          
          meshRef.current.rotation.x = rotationAmount * rotationSpeed;
          
          const minZoom = 1.1;
          const maxZoom = 2.2;
          const zoomAmount = minZoom + (progress * (maxZoom - minZoom));
          
          cameraRef.current.zoom = zoomAmount;
          cameraRef.current.updateProjectionMatrix();
        },
        invalidateOnRefresh: true,
      });

      // Add scrollTrigger to cleanup
      return () => {
        isPlayingRef.current = false;
        scrollTrigger.kill();
        geometry.dispose();
        materialRef.current.dispose();
        rendererRef.current.dispose();
        container.removeChild(rendererRef.current.domElement);
      };
    }

    // Return cleanup without scrollTrigger if body element doesn't exist
    return () => {
      console.log('Cleaning up Three.js scene');
      window.removeEventListener('resize', handleResize);
      isPlayingRef.current = false;
      geometry.dispose();
      materialRef.current.dispose();
      rendererRef.current.dispose();
      container.removeChild(rendererRef.current.domElement);
    };
  }, [containerRef, isLoading, animationsComplete]);

  return {
    scene: sceneRef.current,
    camera: cameraRef.current,
    renderer: rendererRef.current,
  };
};

export default useThree;