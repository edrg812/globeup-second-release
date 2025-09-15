import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const PlaceOrderButton = ({
  apiEndPoint,
  shippingAddress,
  items = [],
  wholeSalePrice,
  resellingPrice,
  token,
  onSuccess,
  onError,
}) => {
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (
      !shippingAddress ||
      !items.length ||
      !wholeSalePrice ||
      !resellingPrice
    ) {
      // toast.error("Please fill in all required information.");
      // return;
    }

    setLoading(true);

    try {
      const payload = {
        shipping_address: shippingAddress,
        items: items.map((item) => ({
          product_variant_id: item.product_variant_id,
          quantity: item.quantity || 1,
          reselling_price: parseFloat(item.reselling_price) || item.price, // ✅ include reselling price
        })),
        wholeSale_price: wholeSalePrice,
        reselling_price: resellingPrice, // ✅ order-level total
      };
      const payloadForReseller = {
        
        wholeSale_price: wholeSalePrice,
        reselling_price: resellingPrice, // ✅ order-level total
      };

      const response = await axios.post(apiUrl + apiEndPoint, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      }); 

      if (onSuccess) onSuccess(response.data);
    } catch (error) {
      console.error(
        "❌ Failed to place order:",
        error.response?.data || error.message
      );
      if (onError) onError(error.response?.data || error.message);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePlaceOrder}
      className={`w-full py-3 rounded-md font-bold text-white transition duration-200 ease-in-out
        ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-pink-600 hover:bg-pink-700"
        }
      `}
      disabled={loading}
    >
      {loading ? "Placing Order..." : "Place Order"}
    </button>
  );
};

export default PlaceOrderButton;
