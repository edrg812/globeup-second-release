import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductImageGallery from "./ProductImageGallery";
import LoadingSkeleton from "./LoadingSkeleton";
import { FaHeart, FaShare } from "react-icons/fa";
import SharePopup from "./SharePopup";
import RatingStars from "./RatingStars";
import VoucherDropdown from "./VoucherDropdown";
import { useAppDispatch } from "../../redux/hooks";
import { addItem } from "../../redux/cart/cartSlice";
import { toast } from "react-toastify";

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showVoucherDropdown, setShowVoucherDropdown] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const voucherRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleBuyNow = () => {
    const item = {
      product_variant_id: selectedVariant.id, // ✅ correct ID for backend
      image: selectedVariant.image,
      name: product.name,
      brand: product.brand,
      price: selectedVariant.price,
      color: selectedVariant.color,
      size: selectedVariant.size,
      sku: selectedVariant.sku,
      quantity: quantity, // ✅ comes from input
    };
    dispatch(addItem(item));

    navigate("/checkout");
  };

  const handleCartAdd = () => {
    const item = {
      product_variant_id: selectedVariant.id,
      image: selectedVariant.image,
      name: product.name,
      brand: product.brand,
      price: selectedVariant.price,
      color: selectedVariant.color,
      size: selectedVariant.size,
      sku: selectedVariant.sku,
      quantity: quantity, // ✅ comes from input
    };
    dispatch(addItem(item));

    toast.success("Product added to cart successfully!");
  };

  useEffect(() => {
    if (product?.variants?.length > 0) {
      const initialVariant = product?.variants[0];
      setSelectedVariant(initialVariant);
      setMainImage(initialVariant?.image);
    }
  }, [product]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (voucherRef.current && !voucherRef.current.contains(e.target)) {
        setShowVoucherDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setMainImage(variant.image);
  };

  // Loading skeleton
  if (!product || !selectedVariant) {
    return <LoadingSkeleton />;
  }

  const uniqueColors = [
    ...new Map(product.variants.map((v) => [v.color, v])).values(),
  ];
  const uniqueSizes = [...new Set(product.variants.map((v) => v.size))];
  const thumbnails = product.variants.map((v) => v.image).filter(Boolean);

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-md">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductImageGallery
          mainImage={mainImage}
          thumbnails={thumbnails}
          onImageChange={setMainImage}
        />

        <div className="relative">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              {product.name}
            </h1>
            <div className="flex items-center space-x-2 md:space-x-4">
              <button
                className="text-gray-500 hover:text-pink-500 cursor-pointer"
                onClick={() => setShowSharePopup(!showSharePopup)}
              >
                <FaShare />
              </button>
              <button
                className={
                  (isFavorite ? "text-pink-500" : "text-gray-500") +
                  " cursor-pointer"
                }
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <FaHeart />
              </button>
            </div>
          </div>

          <SharePopup showSharePopup={showSharePopup} />

          <div className="flex items-center mb-4">
            <RatingStars rating={4} />
            <span className="text-gray-500 text-sm ml-2">
              {/* ({product.reviews.length} reviews) */}(
              {product?.reviews?.length || 0} reviews)
            </span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 text-sm text-gray-500">
            <span>
              Brand:{" "}
              <a className="text-blue-600" href="#">
                {product.brand}
              </a>
            </span>
            <span className="mt-2 md:mt-0">Free Shipping</span>
          </div>

          <div className="mb-4 flex flex-col md:flex-row md:items-center">
            <div className="flex items-center">
              <span className="text-2xl md:text-3xl font-bold text-pink-500">
                ৳ {selectedVariant.price}
              </span>
              {selectedVariant.old_price && (
                <>
                  <span className="text-gray-500 line-through ml-2">
                    ৳ {selectedVariant.old_price}
                  </span>
                  {selectedVariant.discount_percentage && (
                    <span className="bg-pink-100 text-pink-500 text-xs font-semibold ml-2 px-2.5 py-0.5 rounded">
                      -{selectedVariant.discount_percentage}%
                    </span>
                  )}
                </>
              )}
            </div>
            <span
              className={`font-semibold mt-2 md:mt-0 md:ml-auto ${
                selectedVariant.stock > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {selectedVariant.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="relative mb-4 pb-4 border-b flex items-center justify-between">
            <span className="text-gray-600">Voucher</span>
            <button
              className="border border-pink-300 text-pink-500 px-4 py-1 rounded-full flex items-center text-sm"
              onClick={() => setShowVoucherDropdown((p) => !p)}
            >
              Vouchers
            </button>
            <span className="text-gray-500 text-xs md:text-sm">
              SKU: {selectedVariant.sku}
            </span>

            <VoucherDropdown
              showVoucherDropdown={showVoucherDropdown}
              voucherRef={voucherRef}
            />
          </div>

          <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              Color: {selectedVariant.color}
            </h3>
            <div className="flex items-center space-x-2">
              {uniqueColors.map((variant) => (
                <div
                  key={variant.id}
                  className="text-center cursor-pointer"
                  onClick={() => handleVariantChange(variant)}
                >
                  <div
                    className={`w-12 h-12 rounded-md p-1 ${
                      selectedVariant.id === variant.id
                        ? "border-2 border-pink-500"
                        : "border"
                    }`}
                  >
                    <img
                      alt={variant.color}
                      className="w-full h-full object-cover rounded-sm"
                      src={variant.image}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-800 mb-2">Size:</h3>
            <div className="flex space-x-2">
              {uniqueSizes.map((size) => (
                <button
                  key={size}
                  className={`border px-4 py-2 rounded-md ${
                    selectedVariant.size === size
                      ? "border-pink-500 text-pink-500 bg-pink-50"
                      : "hover:border-pink-500 hover:text-pink-500"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <h3 className="text-md font-semibold text-gray-800 mr-4">
              Quantity:
            </h3>
            <div className="flex items-center border rounded-md">
              <button
                className="px-3 py-1 text-gray-600 cursor-pointer"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <input
                className="w-12 text-center border-l border-r"
                type="text"
                value={quantity}
                readOnly
              />
              <button
                className="px-3 py-1 text-gray-600 cursor-pointer"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <button
              className="flex-1 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors disabled:bg-gray-400 cursor-pointer"
              disabled={selectedVariant.stock === 0}
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            <button
              className="flex-1 bg-pink-100 text-pink-500 px-6 py-3 rounded-lg hover:bg-pink-200 transition-colors disabled:bg-gray-200 disabled:text-gray-400 cursor-pointer"
              disabled={selectedVariant.stock === 0}
              onClick={handleCartAdd}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
