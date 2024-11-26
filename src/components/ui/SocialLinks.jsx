import { useContext, useLayoutEffect, useRef } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import { Github, Linkedin, MessageSquare } from "lucide-react";
import gsap from "gsap";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/jabid-jimenez-serrano-960215175/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/jimjabid",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://wa.me/5491166372967",
    icon: MessageSquare,
    label: "WhatsApp",
  },
];
export function SocialLinks() {
  const { animationsComplete } = useContext(LoadingContext);
  const socialsRef = useRef(null);

  useLayoutEffect(() => {
    if (!animationsComplete) return;

    const ctx = gsap.context(() => {
      gsap.to(".social-link", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, socialsRef);

    return () => ctx.revert();
  }, [animationsComplete]);

  return (
    <div ref={socialsRef} className="mt-auto flex justify-center gap-6">
      {socialLinks.map(({ href, icon: Icon, label }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="social-link opacity-0 translate-y-4 text-tertiary hover:text-primary transition-colors duration-300 md:text-[30px] xs:text-[25px] text-[15px]"
        >
          <Icon size={24} />
        </a>
      ))}
    </div>
  );
}
