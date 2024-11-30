import { useRef, useLayoutEffect, useContext } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import { useAnimation } from "../../hooks/useAnimation";
import { Title } from "../ui/Title";
import { ProjectSlider } from "../ui/ProjectSlider";
import gsap from "gsap";

export function Projects() {
  const { animationsComplete } = useContext(LoadingContext);
  const { animateTitle, animateProjectsOnScroll } = useAnimation();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const sliderRef = useRef(null);

  useLayoutEffect(() => {
    if (!animationsComplete) return;

    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      animateTitle(titleRef.current, isMobile);
      animateProjectsOnScroll(sliderRef.current);
    }, sectionRef);

    return () => ctx.revert();
  }, [animationsComplete, animateTitle, animateProjectsOnScroll]);

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="sm:px-20 lg:px-1 lg:py-16 xs:pt-[200px] xs:pb-[40px] py-16 max-w-7xl mx-auto relative z-0"
    >
      <div ref={titleRef}>
        <Title>Works</Title>
      </div>
      <div ref={sliderRef}>
        <ProjectSlider />
      </div>
    </section>
  );
}
