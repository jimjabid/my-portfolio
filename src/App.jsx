import { LoadingProvider } from "./context/LoadingContext";
import { AnimationProvider } from "./context/AnimationContext";
import './lib/gsap';
import { Loader } from "./components/layout/Loader";
import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Contact } from "./components/sections/Contact";
import { SmoothScrollProvider } from "./context/SmoothScrollContext";

export default function App() {
  return (
    <LoadingProvider>
      <SmoothScrollProvider>
        <AnimationProvider>
          <div className="min-h-screen bg-body-color">
            <Loader />
            <Navbar />
            <main>
              <Hero />
              <About />
              <Projects />
              <Contact />
            </main>
          </div>
        </AnimationProvider>
      </SmoothScrollProvider>
    </LoadingProvider>
  );
}
