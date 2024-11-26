import { useContext, useLayoutEffect, useRef } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import { SocialLinks } from "../ui/SocialLinks";
import gsap from "gsap";
import { useSplitText } from "../../hooks/useSplitText";

export function Hero() {
  const { isLoading, animationsComplete } = useContext(LoadingContext);
  const titles = ["Jabid Jimenez", "Frontend Dev", "Backend Dev"];
  const containerRef = useRef(null);
  const titleRefs = useRef([]);
  const ctx = useRef(null);

  useLayoutEffect(() => {
    // Don't start animation while loading
    if (isLoading || !animationsComplete) return;

    titleRefs.current.forEach((titleRefs, index) => {
      if (!titleRefs.splitText?.current?.chars) return;
      gsap.set(titleRefs.splitText.current.chars, {
        y: 16,
        // opacity: 0,
      });
    });
    // Create GSAP context
    ctx.current = gsap.context(() => {
      const timeline = gsap.timeline({
        repeat: -1,
      });
//small comment only to dev branch
      titleRefs.current.forEach((titleRef) => {
        if (!titleRef.splitText?.current?.chars) return;

        // Show characters
        timeline.from(
          titleRef.splitText.current.chars,
          {
            y: 16,
            opacity: 1,
            rotateX: -90,
            stagger: 0.02,
          },
          "<0.8"
        );

        // Hide characters
        timeline.to(
          titleRef.splitText.current.chars,
          {
            y: -16,
            opacity: 0,
            rotateX: 90,
            stagger: 0.02,
          },
          "<2"
        );
      });
    }, containerRef);

    // Cleanup
    return () => ctx.current?.revert();
  }, [isLoading, animationsComplete]);

  return (
    <section id="home" className="mx-auto">
      <div className="lg:px-15 sm:px-20 xs:py-[120px] sm:py-[130px] py-32 min-h-screen flex items-center">
        <div
          ref={containerRef}
          className="home-left-col flex flex-col text-center lg:text-center font-title max-w-4xl mx-auto"
        >
          <div className="hero-titles-container mb-20">
            {titles.map((title, index) => {
              const [elementRef, splitTextRef] = useSplitText(title);
              // Store refs for animation
              titleRefs.current[index] = {
                elementRef,
                splitText: splitTextRef,
              };

              return (
                <h1
                  key={title}
                  ref={elementRef}
                  className={`hero-title uppercase z-10 text-primary text-shadow font-helvetica font-bold m-0 leading-0 lg:text-[100px] md:text-[65px] sm:text-[50px] text-[40px]`}
                  style={{
                    opacity: !animationsComplete ? 0 : 1,
                    // visibility: isLoading ? "hidden" : "visible",
                  }}
                >
                  {title}
                </h1>
              );
            })}
          </div>
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
