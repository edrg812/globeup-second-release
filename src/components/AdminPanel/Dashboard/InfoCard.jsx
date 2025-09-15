import { useEffect, useState } from "react";

const InfoCard = ({ cardData }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let delay = 3000 / cardData.value;
    
    const interval = setInterval(() => {
      setValue((prev) => {
        if (prev >= cardData.value) {
          clearInterval(interval);
          return prev;
        }

        return prev + 1;
      });
    }, delay);
  }, []);

  return (
    <div
      className={`p-8 rounded ${cardData.shadowColor} bg-gradient-to-br ${cardData.gradientFrom} ${cardData.gradientTo}`}
    >
      <div className="flex">
        {/* Icon Section */}
        <div className="w-1/2">
          <div
            className={`w-[90px] h-[90px] rounded-full ${cardData.iconBg} border border-white flex items-center justify-center`}
          >
            <cardData.icon className="text-white text-xl" />
          </div>
        </div>

        {/* Text Section */}
        <div className="w-1/2 text-right">
          <h3 className="text-white text-2xl font-semibold mt-1">{value}</h3>
          <p className="text-white text-sm truncate">{cardData.label}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
