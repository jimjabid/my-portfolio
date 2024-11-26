import { useContext, useRef, useLayoutEffect } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import gsap from "gsap";

export function Loader() {
  const { isLoading, setIsLoading, setAnimationsComplete } =
    useContext(LoadingContext);
  const loaderRef = useRef(null);
  const ctx = useRef(null);

  useLayoutEffect(() => {
    if (!loaderRef.current) return;

    ctx.current = gsap.context(() => {
      const masterTimeline = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
          setAnimationsComplete(true);
        },
      });

      // Initial setup
      gsap.set(".loading-text", { yPercent: 100, opacity: 0 });
      gsap.set(".loader", { scaleX: 0, transformOrigin: "left" });
      gsap.set(".loader-container", { opacity: 0 });
      gsap.set(".loader-fill", { scaleX: 0, transformOrigin: "left" });
      gsap.set([".block-top", ".block-bottom"], { yPercent: 0 });

      // Text animation setup
      const loadingText = loaderRef.current.querySelector(".loading-text");
      const letters = loadingText.textContent.split("");
      loadingText.innerHTML = letters
        .map((letter) => `<span class="letter">${letter}</span>`)
        .join("");

      gsap.set(".letter", { opacity: 0, y: 20 });

      // Text animation sequence
      const textTimeline = gsap.timeline();
      textTimeline
        .to(".loading-text", {
          yPercent: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        })
        .to(".letter", {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.03,
          ease: "power2.out",
        }, "-=0.2");

      // New enhanced loader animation
      const loaderTimeline = gsap.timeline();
      loaderTimeline
        .to(".loader-container", {
          opacity: 1,
          duration: 0.2,
        })
        .to(".loader", {
          scaleX: 1,
          duration: 0.6,
          ease: "power1.inOut",
        })
        .to(".loader-fill", {
          scaleX: 1,
          duration: 0.5,
          ease: "power1.inOut",
        })
        .to(".loader-container", {
          width: "100vw",
          height: "2px",
          left: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });

      // Exit animation sequence
      const exitTimeline = gsap.timeline();
      exitTimeline
        .to(".loading-text", {
          yPercent: -100,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        })
        .to([".block-top", ".block-bottom"], {
          yPercent: (index) => (index === 0 ? -101 : 101),
          duration: 0.6,
          ease: "power2.inOut",
          stagger: 0.1,
        }, "-=0.2");

      // Combine all timelines
      masterTimeline
        .add(textTimeline)
        .add(loaderTimeline, "-=0.3")
        .add(exitTimeline, "+=0.1");

      return () => ctx.current?.revert();
    }, loaderRef);
  }, []);

  if (!isLoading) return null;

  return (
    <div ref={loaderRef} className="fixed inset-0 z-50 overflow-hidden">
      <div className="blocks fixed w-screen h-screen">
        {/* Top Block */}
        <div className="block-top w-full h-1/2 bg-nav-bg grid items-end justify-center overflow-hidden">
          <div className="relative mb-8">
            <h1 className="loading-text text-primary font-helvetica font-bold tracking-[0.2em] text-center text-4xl sm:text-6xl">
              WELCOME
            </h1>
          </div>
        </div>

        {/* Bottom Block */}
        <div className="block-bottom w-full h-1/2 bg-nav-bg grid items-start justify-center">
          <div className="loader-container relative w-[300px] sm:w-[400px] mt-0">
            <div className="loader-bg w-full h-[2px] bg-[rgba(172,212,246,0.2)]">
              <div className="loader w-full h-full bg-primary absolute top-0 left-0" />
              <div className="loader-fill w-full h-full bg-body-color absolute top-0 left-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
