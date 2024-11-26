import { createContext} from "react";
import gsap from "gsap";


export const AnimationContext = createContext({
   masterTimeline : null,
   isAnimating : false,
});

export function AnimationProvider({ children }) {
  const value = {
    masterTimeline: gsap.timeline(),
    isAnimating: false,
  }
  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};
