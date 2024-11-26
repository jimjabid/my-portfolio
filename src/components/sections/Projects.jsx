import { Title } from "../ui/Title";
import { ProjectSlider } from "../ui/ProjectSlider";

export function Projects() {
  return (
    <section id="projects" className="sm:px-20 lg:px-1 lg:py-16 xs:pt-[200px] xs:pb-[40px] py-16 max-w-7xl mx-auto relative z-0">
      <Title>Works</Title>
      <ProjectSlider />
    </section>
  );
}
