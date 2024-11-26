export function Title({ children }) {
  return (
    <div className="title-container xs:w-[60%] lg:w-1/3 flex justify-end px-8 rounded-r-[20px] shadow-card bg-secondary absolute left-0 lg:-left-[10%]">
      <h2 className="font-title md:text-[75px] sm:text-[45px] text-[30px] tracking-[1.5px] text-primary text-shadow">
        {children}
      </h2>
    </div>
  );
}
