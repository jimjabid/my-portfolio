import { useRef, useLayoutEffect, useContext } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import { useAnimation } from "../../hooks/useAnimation";
import { Title } from "../ui/Title";
import { ContactInfo } from "../ui/ContactInfo";
import gsap from "gsap";

export function Contact() {
  const { animationsComplete } = useContext(LoadingContext);
  const { animateTitle, animateContactContent } = useAnimation();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    if (!animationsComplete) return;

    const ctx = gsap.context(() => {
      animateTitle(titleRef.current);
      animateContactContent(contentRef.current);
    }, sectionRef);

    return () => ctx.revert();
  }, [animationsComplete, animateTitle, animateContactContent]);

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="sm:px-20 lg:px-1 lg:py-16 sm:pt-[250px] xs:py-[40px] py-16"
    >
      <div ref={titleRef}>
        <Title>Contact</Title>
      </div>

      <div 
        ref={contentRef}
        className="contact-container lg:mt-[300px] mt-10 flex gap-5 justify-center items-center h-[80vh]"
      >
        <ContactInfo />
      </div>
    </section>
  );
}
