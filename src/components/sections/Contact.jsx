import { Title } from "../ui/Title";
import { ContactInfo } from "../ui/ContactInfo";
import { SocialLinks } from "../ui/SocialLinks";
//comment added to test github workflow on commit

export function Contact() {
  return (
    <section id="contact" className="sm:px-20 lg:px-1 lg:py-16 sm:pt-[250px] xs:py-[40px] py-16">
      <Title>Contact</Title>
      <div className="lg:mt-[300px] mt-10 flex gap-5 justify-center items-center h-[80vh]">
        <ContactInfo />
        <SocialLinks />
      </div>
    </section>
  );
}
