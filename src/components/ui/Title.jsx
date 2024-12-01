export function Title({ children }) {
  return (
    <div className="title-container relative left-0 lg:-left-[2%]">
      <div className="bg-secondary shadow-card rounded-r-[20px] py-2 px-8 inline-block min-w-[200px] max-w-[95%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[75%]">
        <h2 className="font-helvetica font-bold md:text-[75px] sm:text-[45px] text-[30px] tracking-[1.5px] text-primary text-shadow uppercase whitespace-nowrap">
          {children}
        </h2>
      </div>
    </div>
  );
}
