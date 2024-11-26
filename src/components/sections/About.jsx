import { useLayoutEffect, useRef } from "react";
import { useContext } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import { useAnimation } from "../../context/AnimationContext";
import { Title } from "../ui/Title";
import { AboutCard } from "../ui/AboutCard";
import { TechGrid } from "../ui/TechGrid";
import gsap from "gsap";

const aboutCards = [
  {
    title: "Experience",
    description: "3 years experienced IT professional with a passion for web design and development.",
  },
  {
    title: "UI/UX",
    description: "2 years background in sales. I understand the importance of creating user-friendly interfaces.",
  },
  {
    title: "Collaboration",
    description: "Let's work together to create something beautiful and effective.",
  },
];

export function About() {
  const { animationsComplete } = useContext(LoadingContext);
  const { animateTitle, animateCards} = useAnimation();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  
  useLayoutEffect(() => {
    if (!animationsComplete) return;

    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      animateTitle(titleRef.current, isMobile);
      animateCards(cardsRef.current, isMobile);
      // animateSection(sectionRef.current);
    }, sectionRef);

    return () => ctx.revert();
  }, [animationsComplete, animateTitle, animateCards]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about sm:px-20 lg:px-1 lg:py-16 sm:pt-[250px] xs:py-[40px] py-16 max-w-7xl mx-auto relative z-0"
    >
      <div ref={titleRef}>
        <Title>ABOUT</Title>
      </div>

      <div className="about-container lg:mt-[300px] mt-56 relative flex flex-wrap gap-5 justify-center">
        {aboutCards.map((card, index) => (
          <div key={card.title} ref={el => (cardsRef.current[index] = el)}>
            <AboutCard {...card} />
          </div>
        ))}
      </div>

      <div className="mt-20 sm:mt-32">
        <TechGrid />
      </div>
    </section>
  );
}
