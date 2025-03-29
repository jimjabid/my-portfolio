import { useContext, useLayoutEffect, useRef, useState } from "react";
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
  const arrowBoxRef = useRef(null);
  const arrowRef = useRef(null);
  const fillRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

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

    // Arrow and elastic box animation
    if (arrowRef.current && arrowBoxRef.current) {
      // Create a timeline for the arrow movement
      const arrowTimeline = gsap.timeline({
        repeat: -1,
        yoyo: false,
      });
      
      // Set initial cylindrical shape
      gsap.set(arrowBoxRef.current, {
        borderRadius: "16px",
      });
      
      arrowTimeline
        .to(arrowRef.current, {
          y: 15,
          duration: 1,
          ease: "power1.inOut",
          onUpdate: function() {
            // Get current progress of the animation
            const progress = this.progress();
            // Apply elastic effect to the box when arrow moves down
            gsap.set(arrowBoxRef.current, {
              borderBottomLeftRadius: 16 + (12 * progress),
              borderBottomRightRadius: 16 + (12 * progress),
              height: 64 + (12 * progress),
              marginBottom: -(12 * progress),
            });
          }
        })
        .to(arrowRef.current, {
          y: 0,
          duration: 1,
          ease: "power1.inOut",
          onUpdate: function() {
            // Get current progress of the animation
            const progress = this.progress();
            // Apply elastic effect to the box when arrow moves up
            // Reverse the progress for the return animation
            const reverseProgress = 1 - progress;
            gsap.set(arrowBoxRef.current, {
              borderBottomLeftRadius: 16 + (12 * reverseProgress),
              borderBottomRightRadius: 16 + (12 * reverseProgress),
              height: 64 + (12 * reverseProgress),
              marginBottom: -(12 * reverseProgress),
            });
          }
        });
    }

    // Cleanup
    return () => ctx.current?.revert();
  }, [isLoading, animationsComplete]);

  // Handle hover effect
  useLayoutEffect(() => {
    if (!fillRef.current || !arrowRef.current) return;
    
    if (isHovering) {
      // Fill animation
      gsap.to(fillRef.current, {
        height: '100%',
        duration: 0.6,
        ease: 'power2.out'
      });
      
      // Change arrow color
      gsap.to(arrowRef.current.querySelector('path'), {
        fill: '#0a151f',
        duration: 0.6,
        ease: 'power2.out'
      });
    } else {
      // Reverse fill animation
      gsap.to(fillRef.current, {
        height: '0%',
        duration: 0.4,
        ease: 'power2.in'
      });
      
      // Restore arrow color
      gsap.to(arrowRef.current.querySelector('path'), {
        fill: '#FFFFFF',
        duration: 0.4,
        ease: 'power2.in'
      });
    }
  }, [isHovering]);

  // Handle scroll to next section
  const handleScrollToNext = () => {
    const nextSection = document.getElementById('about') || document.querySelector('section:nth-of-type(2)');
    if (nextSection) {
      // Smoother scrolling with GSAP
      gsap.to(window, {
        duration: 1.8,
        scrollTo: {
          y: nextSection.offsetTop +150,
          autoKill: false
        },
        ease: "power3.inOut"
      });
    }
  };

  return (
    <section id="home" className="h-screen flex items-center justify-center mx-auto">
      <div className="w-full px-4 sm:px-20 lg:px-15">
        <div
          ref={containerRef}
          className="home-left-col flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto"
        >
          <div className="hero-titles-container mb-16 w-full mt-[15vh] md:mt-[25vh]">
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
                  className={`hero-title uppercase z-10 text-primary text-shadow font-grotesque font-bold m-0 leading-0 whitespace-nowrap w-full md:text-[clamp(40px,12vw,100px)] text-[clamp(30px,10vw,80px)]`}
                  style={{
                    opacity: !animationsComplete ? 0 : 1,
                  }}
                >
                  {title}
                </h1>
              );
            })}
          </div>
          <SocialLinks />
          
          <div className="mt-12 flex justify-center">
            <div className="relative h-[100px]"> {/* Fixed height container to prevent layout shifts */}
              <div 
                ref={arrowBoxRef} 
                className="relative w-12 h-16 border-2 border-white flex items-center justify-center overflow-visible cursor-pointer"
                style={{
                  opacity: !animationsComplete ? 0 : 1,
                  transformOrigin: "center top",
                  borderRadius: "16px", // More cylindrical shape
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={handleScrollToNext}
              >
                {/* Fill effect on hover */}
                <div 
                  ref={fillRef}
                  className="absolute bottom-0 left-0 w-full bg-[#acd4f6] z-0"
                  style={{ 
                    height: '0%',
                    borderRadius: '16px 16px 16px 16px',
                  }}
                />
                
                <div ref={arrowRef} className="absolute z-10">
                  <svg width="20" height="40" viewBox="0 0 16 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      fillRule="evenodd" 
                      clipRule="evenodd" 
                      d="M9.28027 0.27636L9.27713 59.9036L13.9743 55.2064C14.3682 54.8125 14.5929 55.2542 15.0039 55.6652C15.4149 56.0763 15.8567 56.301 15.4628 56.6949L9.04372 63.1139C8.64981 63.5078 7.99728 63.4939 7.58625 63.0829L0.888126 56.3848C0.477094 55.9737 1.00354 55.6737 1.30354 55.3737C1.60355 55.0737 1.90355 54.5473 2.31458 54.9583L7.21596 59.8597L7.21587 0.280228L9.28027 0.27636Z" 
                      fill="#FFFFFF" 
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
