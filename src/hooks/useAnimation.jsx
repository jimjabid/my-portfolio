import { useContext } from "react";
import { AnimationContext } from "../context/AnimationContext";
import gsap from "gsap";

export function useAnimation() {
    const { masterTimeline, isAnimating } = useContext(AnimationContext);

    const animateTitle = (titleRef, isMobile = false) => {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        return gsap.from(titleRef, {
          duration: isTouch ? 1.5 : 3.5,
          xPercent: isTouch ? -50 : -100,
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef,
            start: "top 80%",
            end: "top 20%",
            scrub: isTouch ? 1 : true,
            once: isTouch,
          },
        });
      };
    
      const animateCards = (cardsRef, isMobile = false) => {
        if (isMobile) {
          gsap.set(cardsRef, {
            xPercent: 100,
            opacity: 0,
          });
    
          return cardsRef.forEach((card, i) => {
            gsap.to(card, {
              xPercent: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                end: "top center",
                scrub: 1,
              }
            });
          });
        }
    
        return gsap.from(cardsRef, {
          duration: 5,
          yPercent: 10,
          opacity: 0,
          stagger: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef[0],
            start: "top bottom-=200",
            end: "top center+=100",
            scrub: 3,
          }
        });
      };
    
    //   const animateSection = (sectionRef) => {
    //     return gsap.fromTo(sectionRef, 
    //       {
    //         yPercent: 0,
    //       },
    //       {
    //         yPercent: -40,
    //         ease: "none",
    //         scrollTrigger: {
    //           trigger: sectionRef,
    //           start: "top bottom",
    //           end: "bottom top",
    //           scrub: 1,
    //           markers: true,
    //           invalidateOnRefresh: true,
    //         }
    //       }
    //     );
    //   };

    const animateProjectSlider = (projectRef) => {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        return gsap.from(projectRef, {
            duration: isTouch ? 1 : 1.5,
            xPercent: isTouch ? -50 : -100,
            opacity: 0,
            scrollTrigger: {
                trigger: projectRef,
                start: "top 80%",
                end: "top 20%",
                scrub: isTouch ? 1 : true,
                once: isTouch,
            }
        });
    };

    const animateProjectsOnScroll = (projectRef) => {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        return gsap.from(projectRef, {
            duration: isTouch ? 1 : 1.5,
            yPercent: isTouch ? 15 : 15,
            opacity: 0,
            scrollTrigger: {
                trigger: projectRef,
                start: "top 80%",
                end: "top 20%",
                scrub: isTouch ? 1 : true,
                once: isTouch,
            
            }
        });
    };

    const handleProjectHover = (project, projectInfo) => {
        gsap.to(projectInfo, {
            scaleY: 1,
            duration: 0.5,
            ease: "power3.out"
        });
    };

    const handleProjectLeave = (project, projectInfo) => {
        gsap.to(projectInfo, {
            scaleY: 0,
            duration: 0.3,
            ease: "power3.in"
        });
    };

    const animateTechBalls = (techBallsRef) => {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        return gsap.from(techBallsRef, {
            duration: isTouch ? 1 : 2,
            y: 100,
            opacity: 0,
            stagger: {
                each: 0.1,
                ease: "power2.out"
            },
            scrollTrigger: {
                trigger: techBallsRef[0],
                start: "top bottom-=100",
                end: "top center+=100",
                scrub: isTouch ? 1 : 2,
            }
        });
    };

    const animateContactContent = (contentRef) => {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        return gsap.from(contentRef.children, {
            y: 50,
            opacity: 0,
            duration: isTouch ? 1 : 1.5,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: contentRef,
                start: "top 80%",
                end: "top 20%",
                scrub: isTouch ? 1 : true,
                once: isTouch,
            }
        });
    };

    const animateContactInfo = (containerRef) => {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        // Animate reveal items
        gsap.from(".reveal-item", {
            y: 100,
            opacity: 0,
            duration: isTouch ? 1 : 1.5,
            stagger: 0.3,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef,
                start: "top 80%",
                end: "top 20%",
                scrub: isTouch ? 1 : true,
                once: isTouch,
            }
        });

        // Animate social links with a slight delay
        gsap.from(".social-links > div", {
            scale: 0,
            opacity: 0,
            duration: isTouch ? 0.8 : 1.2,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: containerRef,
                start: "top 70%",
                end: "top 20%",
                scrub: isTouch ? 1 : true,
                once: isTouch,
            }
        });
    };

    return{
        animateTitle,
        animateCards,
        animateProjectSlider,
        animateProjectsOnScroll,
        handleProjectHover,
        handleProjectLeave,
        animateTechBalls,
        animateContactContent,
        animateContactInfo,
    }    
} 

