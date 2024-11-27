import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { TechBall } from './TechBall';
import figmaImg from '/img/figma.png'
import gitImg from '/img/git.png'
import githubImg from '/img/github.png'
import htmlImg from '/img/html.png'
import javascriptImg from '/img/javascript.png'
import mongodbImg from '/img/mongodb.png'
import nodejsImg from '/img/nodejs.png'
import reactImg from '/img/reactjs.png'
import tailwindImg from '/img/tailwind.png'
import threejsImg from '/img/threejs.svg'

const techStack = [
  { name: 'Figma', image: figmaImg },
  { name: 'Git', image: gitImg },
  { name: 'GitHub', image: githubImg },
  { name: 'HTML', image: htmlImg },
  { name: 'JavaScript', image: javascriptImg },
  { name: 'MongoDB', image: mongodbImg },
  { name: 'Node.js', image: nodejsImg },
  { name: 'React', image: reactImg },
  { name: 'Tailwind', image: tailwindImg },
  { name: 'Three.js', image: threejsImg },
];

export function TechGrid() {
  return (
    <div className="tech-container-wrapper mt-20 sm:mt-32">
      <div className="tech-container flex flex-row flex-wrap sm:justify-center lg:gap-10 justify-between">
        {techStack.map((tech) => (
          <div key={tech.name} className="w-[15rem] h-[11rem] tech-ball">
            <Canvas
              camera={{ position: [-0.3, -0.1, 3], fov: 70 }}
              dpr={Math.min(window.devicePixelRatio, 2)}
            >
              <OrbitControls 
                enableZoom={false}
                enableDamping
                dampingFactor={0.05}
              />
              <ambientLight intensity={1} />
              <directionalLight position={[200, 200, 200]} intensity={5} />
              <TechBall imageUrl={tech.image} />
            </Canvas>
          </div>
        ))}
      </div>
    </div>
  );
}
