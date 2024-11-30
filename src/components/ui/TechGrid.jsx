import { useRef, useLayoutEffect, useContext } from 'react';
import { LoadingContext } from '../../context/LoadingContext';
import { useAnimation } from '../../hooks/useAnimation';
import gsap from 'gsap';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { TechBall } from './TechBall';
import figmaImg from '/img/figma.svg'
import githubImg from '/img/github.svg'
import mongodbImg from '/img/mongodb.svg'
import nodejsImg from '/img/nodejs.svg'
import reactImg from '/img/react.svg'
import tailwindImg from '/img/tailwind.svg'
import threejsImg from '/img/threejs.svg'
import dynatraceImg from '/img/dynatrace.svg'
import nginxImg from '/img/nginx.svg'
import dockerImg from '/img/docker.svg'
import awsImg from '/img/aws.svg'

const techStack = [
  { name: 'Figma', image: figmaImg },
  { name: 'GitHub', image: githubImg },
   { name: 'MongoDB', image: mongodbImg },
  { name: 'Node.js', image: nodejsImg },
  { name: 'React', image: reactImg },
  { name: 'Tailwind', image: tailwindImg },
  { name: 'Three.js', image: threejsImg },
  { name: 'Dynatrace', image: dynatraceImg },
  { name: 'Nginx', image: nginxImg },
  { name: 'Docker', image: dockerImg },
  { name: 'AWS', image: awsImg },
];

export function TechGrid() {
  const { animationsComplete } = useContext(LoadingContext);
  const { animateTechBalls } = useAnimation();
  const techBallsRef = useRef([]);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!animationsComplete) return;

    const ctx = gsap.context(() => {
      animateTechBalls(techBallsRef.current);
    }, containerRef);

    return () => ctx.revert();
  }, [animationsComplete, animateTechBalls]);

  return (
    <div ref={containerRef} className="tech-container-wrapper mt-20 sm:mt-32">
      <div className="tech-container grid grid-cols-2 gap-4 sm:flex sm:flex-row sm:flex-wrap sm:justify-center lg:gap-10">
        {techStack.map((tech, index) => (
          <div 
            key={tech.name} 
            ref={el => (techBallsRef.current[index] = el)}
            className="tech-ball h-[11rem] sm:w-[15rem]"
          >
            <Canvas
              camera={{ position: [-0.3, -0.1, 3], fov: 70 }}
              dpr={Math.min(window.devicePixelRatio, 2)}
            >
              <OrbitControls 
                enableZoom={false}
                enableDamping
                dampingFactor={0.05}
                autoRotate={false}
                autoRotateSpeed={0.5}
              />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[-10, -10, -5]} intensity={0.5} />
              <TechBall imageUrl={tech.image} />
            </Canvas>
          </div>
        ))}
      </div>
    </div>
  );
}
