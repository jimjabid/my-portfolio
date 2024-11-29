import { useRef } from 'react';
import  useThree  from '../../hooks/useThree';

export function Background() {
  const containerRef = useRef(null);
  useThree(containerRef);

  return (
    <div 
      ref={containerRef}
      id="myThreeJsCanvas"
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1,
        background: '#0a151f'
      }}
    />
  );
} 