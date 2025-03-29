import { useRef, useLayoutEffect, useContext } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import { useAnimation } from "../../hooks/useAnimation";
import { Title } from "../ui/Title";
import { ContactInfo } from "../ui/ContactInfo";
import { Mail, Send, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { SocialLinks } from "../ui/SocialLinks";

export function Contact() {
  const { animationsComplete } = useContext(LoadingContext);
  const { animateTitle, animateContactContent, animateContactInfo } = useAnimation();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    if (!animationsComplete) return;

    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      // Animate title
      animateTitle(titleRef.current, isMobile);

      animateContactContent(contentRef.current);
        
      animateContactInfo(contentRef.current);
    }, sectionRef);

    return () => ctx.revert();
  }, [animationsComplete, animateTitle, animateContactContent, animateContactInfo]);

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="sm:px-20 lg:px-1 lg:py-16 sm:pt-[250px] xs:py-[40px] py-16 max-w-7xl mx-auto"
    >
      <div ref={titleRef}>
        <Title>Contact</Title>
      </div>

      <div 
        ref={contentRef}
        className="mt-16 max-w-3xl mx-auto"
      >
        {/* Contact Info Card */}
        <div className="bg-secondary bg-opacity-30 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-primary bg-opacity-10 rounded-full mr-4">
              <Mail size={28} className="text-primary" />
            </div>
            <h3 className="text-xl font-grotesque text-primary">Get In Touch</h3>
          </div>
          
          <div className="space-y-6 text-tertiary">
            <p className="leading-relaxed">
              I'm currently open to new opportunities and collaborations. Feel free to reach out if you have a project in mind or just want to connect!
            </p>
            
            <ContactInfo />
            
            <div className="pt-4 border-t border-primary border-opacity-20">
              <p className="text-sm text-tertiary opacity-80 text-center mt-4">
                Or connect with me on social media
              </p>
              <div className="flex justify-center mt-4">
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to action */}
      <div className="mt-16 text-center">
        <a 
          href="#home" 
          className="inline-flex items-center text-primary hover:text-primary-light transition-colors duration-300 group"
        >
          <span className="mr-2">Back to top</span>
          <div className="transform rotate-[-135deg] transition-transform duration-300 group-hover:translate-y-[-3px]">
            <ArrowRight size={20} />
          </div>
        </a>
      </div>
    </section>
  );
}
