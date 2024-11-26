import { createContext, useContext, useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SmoothScrollContext = createContext({
  lenis: null,
});

export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    // Connect Lenis to ScrollTrigger
    const lenis = lenisRef.current?.lenis;
    
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
    }

    return () => {
      gsap.ticker.remove(update);
      lenis?.destroy();
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}

export const useSmoothScroll = () => useContext(SmoothScrollContext);