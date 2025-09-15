import { Link } from "react-router-dom";

const Product = ({ product }) => {
  // Pick first variant's image if available, else placeholder
  const image =
    product.variants && product.variants.length > 0 && product.variants[0].image
      ? product.variants[0].image
      : "https://via.placeholder.com/300x300?text=No+Image";

  // Prices from first variant if available
  const price =
    product.variants && product.variants.length > 0
      ? product.variants[0].price
      : 0;

  const originalPrice =
    product.variants && product.variants.length > 0
      ? product.variants[0].old_price
      : null;

  // Calculate discount if both prices exist
  const discount =
    originalPrice && price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  // Ratings and reviews
  const rating = product.rating || 0;
  const reviewsCount = product.reviews ? product.reviews.length : 0;

  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 overflow-hidden"
    >
      {/* Image */}
      <div className="w-full h-48 bg-white p-2 flex items-center justify-center">
        <img
          src={image}
          alt={product.name || "Unnamed Product"}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col justify-between h-[145px]">
        {/* Title */}
        <h3 className="text-sm font-normal text-gray-800 leading-snug">
          {product.name || "Unnamed Product"}
        </h3>

        {/* Price & Discount */}
        <div className="mt-1">
          <div className="flex items-center space-x-1">
            <span className="text-red-600 text-lg font-bold">৳ {price}</span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ৳ {originalPrice}
              </span>
            )}
            {discount && (
              <span className="text-xs text-red-500 ml-2 font-semibold">
                -{discount}%
              </span>
            )}
          </div>
        </div>

        {/* Ratings & Reviews */}
        <div className="flex items-center space-x-1 text-sm mt-2 text-yellow-500">
          <div className="flex items-center space-x-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i}>{i < Math.round(rating) ? "★" : "☆"}</span>
            ))}
          </div>
          <span className="text-gray-500 text-xs ml-1">({reviewsCount})</span>
        </div>
      </div>
    </Link>
  )
};

export default Product;


