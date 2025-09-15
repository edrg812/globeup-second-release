const UnlistedProduct = ({ product }) => {
  return (
    <div className="bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 overflow-hidden">
      {/* Image */}
      <div className="w-full h-48 bg-white p-2 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col justify-between h-fit">
        {/* Title */}
        <h3 className="text-sm font-normal text-gray-800 leading-snug line-clamp-2">
          {product.name}
        </h3>

        {/* Category */}
        <span className="text-xs text-gray-500 mt-1">{product.category}</span>

        {/* Price & Stock */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mt-2">
            <span className="text-red-600 text-lg font-bold">
              ৳ {product.price}
            </span>
            <span
              className={`text-xs font-medium ${
                product.inStock > 0 ? "text-green-600" : "text-gray-400"
              }`}
            >
              {product.inStock > 0
                ? `${product.inStock} in stock`
                : "Out of stock"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlistedProduct;