const ReviewItem = ({ review }) => {
  const reviewDate = new Date(review.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col gap-3 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
          {review.user.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <p className="text-gray-800 text-base font-medium">
            {review.user.name}
          </p>
          <p className="text-gray-500 text-sm">{reviewDate}</p>
        </div>
      </div>
      <RatingStars rating={review.rating} />
      <p className="text-gray-700 text-base">{review.comment}</p>
      <div className="flex gap-6 text-gray-500">
        <button className="flex items-center gap-2 hover:text-blue-500">
          <FaThumbsUp className="w-4 h-4" /> <span className="text-sm">0</span>
        </button>
        <button className="flex items-center gap-2 hover:text-red-500">
          <FaThumbsDown className="w-4 h-4" />{" "}
          <span className="text-sm">0</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewItem;
