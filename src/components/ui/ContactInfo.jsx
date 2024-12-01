export function ContactInfo() {
  return (
    <div className="flex flex-col justify-center items-center gap-[4rem] z-10">
      <div className="flex flex-col items-center reveal-item gap-y-5">
        <h2 className="text-primary text-shadow font-medium lg:text-[55px] md:text-[40px] sm:text-[30px] xs:text-[20px] uppercase font-bold tracking-[1.5px]">
          Send Me a Message
        </h2>
        <div className="w-max h-max text-center px-[1rem] py-[0.25rem] bg-secondary shadow-contact rounded">
          <a 
            href="mailto:jabidandresjimenezserrano@gmail.com"
            className="text-tertiary font-helvetica sm:text-[25px] text-center tracking-[1.5px]"
          >
            jabidandresjimenezserrano@gmail.com
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center reveal-item gap-y-5">
        <h2 className="text-primary text-shadow font-medium lg:text-[55px] md:text-[40px] sm:text-[30px] xs:text-[20px] uppercase font-bold tracking-[1.5px]">
          OR
        </h2>
        <h2 className="text-primary text-shadow font-medium lg:text-[55px] md:text-[40px] sm:text-[30px] xs:text-[20px] uppercase font-bold tracking-[1.5px]">
          Connect with me on social
        </h2>

        <div className="flex gap-x-20 social-links">
          <div className="w-max flex h-max text-center px-[1rem] py-[0.25rem] bg-secondary shadow-contact rounded">
            <a
              href="https://github.com/jimjabid"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tertiary font-helvetica sm:text-[25px] text-center tracking-[1.5px]"
            >
              GITHUB
            </a>
          </div>
          <div className="w-max flex gap-y-20 h-max text-center px-[1rem] py-[0.25rem] bg-secondary shadow-contact rounded">
            <a
              href="https://www.linkedin.com/in/jabid-jimenez-serrano-960215175/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tertiary font-helvetica sm:text-[25px] text-center tracking-[1.5px]"
            >
              LINKEDIN
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
