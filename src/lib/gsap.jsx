import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

// Register the plugins
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, Observer);

// Add a refresh on resize
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});

// Add this to help with touch devices
ScrollTrigger.config({ limitCallbacks: true });

// Remove default smoothness on touch devices
ScrollTrigger.defaults({ scroller: document.documentElement });

export default gsap; 