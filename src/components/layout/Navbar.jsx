import { useState, useContext, useLayoutEffect, useRef, useEffect } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

const navLinks = [
  {
    href: "#home",
    label: "Home",
  },
  {
    href: "#about",
    label: "About",
  },
  {
    href: "#projects",
    label: "Projects",
  },
  {
    href: "#contact",
    label: "Contact",
  },
];
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { animationsComplete } = useContext(LoadingContext);
  const navRef = useRef(null);

  // Initial loading animations
  useLayoutEffect(() => {
    if (!animationsComplete) return;

    const ctx = gsap.context(() => {
      gsap.to(".nav-logo", {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      });

      gsap.to(".nav-link", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, navRef);

    return () => ctx.revert();
  }, [animationsComplete]);

  // Handle navbar visibility with GSAP
  useEffect(() => {
    if (!animationsComplete) return; // Don't start scroll handling until loading is complete

    let timeout;
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const shouldBeVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10;

      if (visible !== shouldBeVisible) {
        gsap.to(navRef.current, {
          y: shouldBeVisible ? 0 : -100,
          duration: 0.3,
          stagger: 0.1,
          ease: "power2.inOut"
        });
        setVisible(shouldBeVisible);
      }
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeout) clearTimeout(timeout);
    };
  }, [prevScrollPos, visible, animationsComplete]);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav ref={navRef} className="fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 nav-logo opacity-0">
            <span className="text-primary font-bold text-xl">JJ</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-8">
              {navLinks.map(({ href, label }) => (
                <div key={href} className="nav-link-container">
                  <a
                    href={href}
                    onClick={(e) => scrollToSection(e, href)}
                    className="nav-link opacity-0 translate-y-4 text-tertiary hover:text-primary transition-colors duration-300 text-sm font-medium"
                  >
                    {label}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button - Update the styling */}
          <div className={`md:hidden ${!animationsComplete ? 'opacity-0' : ''}`}>
            {animationsComplete && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-tertiary hover:text-primary p-2 relative z-[60]"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Update the styling */}
      {isMenuOpen && animationsComplete && (
        <div className="md:hidden fixed inset-0 bg-nav-bg/95 h-screen backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center space-y-8">
            {navLinks.map(({ href, label }) => (
              <div key={href} className="nav-link-container">
                <a
                  href={href}
                  onClick={(e) => scrollToSection(e, href)}
                  className="text-tertiary hover:text-primary text-4xl font-medium transition-colors duration-300"
                >
                  {label}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
