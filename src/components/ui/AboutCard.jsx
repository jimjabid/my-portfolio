import { Award, AppWindow, Users } from 'lucide-react'; // Using Lucide icons instead of Remix icons

const iconMap = {
  'Experience': Award,
  'UI/UX': AppWindow,
  'Collaboration': Users
};

export function AboutCard({ title, description }) {
  const Icon = iconMap[title];

  return (
    <div className="about-box xs:w-[300px] lg:w-[400px] w-full">
      <div className="w-full p-5 rounded-[20px] shadow-card bg-about-bg md:bg-secondary flex justify-center items-center flex-col min-h-[360px]">
        {Icon && (
          <Icon 
            className="text-primary text-shadow mb-4" 
            size={80} 
            strokeWidth={1.5}
          />
        )}
        <h3 className="text-tertiary sm:text-[30px] text-center tracking-[1.5px] uppercase font-bold">
          {title}
        </h3>
        <p className="text-tertiary font-helvetica font-medium md:text-[20.8px] text-center p-5">
          {description}
        </p>
      </div>
    </div>
  );
}
