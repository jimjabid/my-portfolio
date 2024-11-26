export function AboutCard({ title, description }) {
  return (
    <div className="about-box xs:w-[300px] lg:w-[400px] w-full">
      <div className="w-full p-5 rounded-[20px] shadow-card bg-about-bg md:bg-secondary flex justify-center items-center flex-col min-h-[360px]">
        <h3 className="text-tertiary sm:text-[30px] text-center tracking-[1.5px]">
          {title}
        </h3>
        <p className="text-center">{description}</p>
      </div>
    </div>
  );
}
