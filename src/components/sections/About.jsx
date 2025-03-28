import { useLayoutEffect, useRef } from "react";
import { useContext } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import { useAnimation } from "../../hooks/useAnimation";
import { Title } from "../ui/Title";
import { TechGrid } from "../ui/TechGrid";
import { Award, Code, Users, Palette, Globe, Lightbulb } from 'lucide-react';
import gsap from "gsap";

const skillCategories = [
  {
    icon: Code,
    title: "Development",
    skills: ["React", "Three.js", "GSAP", "Node.js", "Express", "MongoDB"]
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    skills: ["Responsive Design", "Interactive UIs", "User Experience", "Animations"]
  },
  {
    icon: Lightbulb,
    title: "Problem Solving",
    skills: ["Debugging", "Postman", "AppDynamics", "Dynatrace", "Automation"]
  }
];

export function About() {
  const { animationsComplete } = useContext(LoadingContext);
  const { animateTitle } = useAnimation();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const bioRef = useRef(null);
  const skillsRef = useRef(null);
  
  useLayoutEffect(() => {
    if (!animationsComplete) return;

    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      // Animate title
      animateTitle(titleRef.current, isMobile);
      
      // Animate bio section
      gsap.from(bioRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: bioRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
          once: true,
        }
      });
      
      // Make sure skills are visible by default
      gsap.set(skillsRef.current.children, { opacity: 1, y: 0 });
      
      // Then animate them when scrolled into view
      gsap.from(skillsRef.current.children, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 75%",
          end: "top 40%",
          scrub: 1,
          once: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [animationsComplete, animateTitle]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about sm:px-20 lg:px-1 lg:py-16 sm:pt-[250px] xs:py-[40px] py-16 max-w-7xl mx-auto relative z-0"
    >
      <div ref={titleRef}>
        <Title>ABOUT</Title>
      </div>

      <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Bio Section */}
        <div ref={bioRef} className="bg-secondary bg-opacity-30 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-primary bg-opacity-10 rounded-full mr-4">
              <Award size={36} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-tertiary">My Journey</h3>
          </div>
          
          <div className="space-y-4 text-tertiary">
            <p className="leading-relaxed">
              I'm Jabid, originally from Colombia and living in Argentina since 2021. I speak Spanish and English fluently.
            </p>
            <p className="leading-relaxed">
              With 4+ years in IT support, DevOps, and software development, I'm transitioning to full-time development, bringing technical expertise and a problem-solving mindset to new challenges.
            </p>
            <p className="leading-relaxed">
              I thrive in team environments, communicate effectively, and adapt quickly to new technologies and challenges.
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div ref={skillsRef} className="space-y-6">
          {skillCategories.map((category, index) => (
            <div 
              key={category.title}
              className="bg-secondary bg-opacity-30 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-opacity-40 group"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary bg-opacity-10 rounded-full mr-4 group-hover:bg-opacity-20 transition-all duration-300">
                  <category.icon size={28} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-tertiary">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 bg-primary bg-opacity-10 rounded-full text-primary text-sm font-medium hover:bg-opacity-20 transition-all duration-300 hover:scale-105 transform"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 sm:mt-32">
        <TechGrid />
      </div>
    </section>
  );
}
