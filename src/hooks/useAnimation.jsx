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
  return{
    animateTitle,
    animateCards,
  }    
} 

