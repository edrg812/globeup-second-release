import { FaRegStar, FaStar } from "react-icons/fa";

const RatingStars = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < rating ? (
      <FaStar key={i} className="text-yellow-400 w-4 h-4" />
    ) : (
      <FaRegStar key={i} className="text-gray-300 w-4 h-4" />
    )
  );

  return <div className="flex">{stars}</div>;
};

export default RatingStars;
