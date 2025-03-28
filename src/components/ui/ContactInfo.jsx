export function ContactInfo() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 z-10">
      <div className="flex flex-col items-center reveal-item gap-y-3">
        <h2 className="text-primary text-shadow font-medium text-lg md:text-xl lg:text-2xl uppercase font-medium tracking-wide">
          Send Me a Message
        </h2>
        <div className="w-max h-max text-center px-3 py-1 bg-secondary shadow-contact rounded">
          <a 
            href="mailto:jabidandresjimenezserrano@gmail.com"
            className="text-tertiary font-helvetica text-sm md:text-base tracking-wide"
          >
            jabidandresjimenezserrano@gmail.com
          </a>
        </div>
      </div>

    </div>
  );
}
