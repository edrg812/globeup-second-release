import { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import OrderSummary from "../../components/ResellerPanel/Checkout/OrderSummary";
import PriceDetails from "../../components/CheckOut/PriceDetails";
import TermsAndConditions from "../../components/CheckOut/TermsAndConditions";
import PlaceOrderButton from "../../components/CheckOut/PlaceOrderButton";
import PaymentMethods from "../../components/CheckOut/PaymentMethods";
import AddressFormModal from "../../components/CheckOut/AddressFormModal";
import {
  clearResellerCart,
  decrementQuantityFromReseller,
  incrementQuantityToReseller,
  removeItemFromReseller,
} from "../../redux/cart/resellerCart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResellerCheckOut = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [savedAddress, setSavedAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState(
    "123 Default St, City, Country"
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // ✅ Get all cart items from Redux store
  const cartItems = useAppSelector((state) => state.resellerCart.items);

  // ✅ Manage per-item reselling prices
  const [resellingPrices, setResellingPrices] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.product_variant_id] = item.price; // default = wholesale price
      return acc;
    }, {})
  );

  const handleResellingPriceChange = (product_variant_id, value) => {
    setResellingPrices({
      ...resellingPrices,
      [product_variant_id]: value,
    });
  };

  // ✅ Prepare items array and calculate totals (memoized)
  const { items, wholesalePrice, resellingPrice } = useMemo(() => {
    let totalWholesale = 0;
    let totalReselling = 0;

    const checkoutItems = cartItems.map((item) => {
      const wholesale = (item.price || 0) * (item.quantity || 1);
      totalWholesale += wholesale;

      const resellerUnitPrice =
        parseFloat(resellingPrices[item.product_variant_id]) || item.price || 0;

      totalReselling += resellerUnitPrice * (item.quantity || 1);

      return {
        product_variant_id: item.product_variant_id,
        quantity: item.quantity || 1,
        reselling_price: resellerUnitPrice,
      };
    });

    return {
      items: checkoutItems,
      wholesalePrice: totalWholesale.toFixed(2),
      resellingPrice: totalReselling.toFixed(2),
    };
  }, [cartItems, resellingPrices]);

  const openAddressModal = () => setIsAddressModalOpen(true);
  const closeAddressModal = () => setIsAddressModalOpen(false);

  const handleSaveAddress = (address) => {
    setSavedAddress(address);
    setShippingAddress(address);
    toast.success("Address saved successfully!");
  };

  const handleRemoveItem = (product_variant_id) => {
    dispatch(removeItemFromReseller(product_variant_id));
    toast.info("Item removed from cart.");
  };

  const handleIncrementQuantity = (product_variant_id) => {
    dispatch(incrementQuantityToReseller(product_variant_id));
    toast.success("Item quantity increased.");
  };

  const handleDecrementQuantity = (product_variant_id) => {
    dispatch(decrementQuantityFromReseller(product_variant_id));
    toast.success("Item quantity decreased.");
  };

  // ✅ If no items in cart, show message
  if (!cartItems.length || !items.length) {
    return (
      <div className="text-center p-10 text-red-500">
        No product(s) selected for checkout.
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-100 min-h-screen ${
          isAddressModalOpen ? "blur-sm" : ""
        }`}
      >
        {/* Left section */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
            {savedAddress ? (
              <div className="border p-3 rounded-md bg-gray-50">
                <p className="font-semibold">{savedAddress}</p>
              </div>
            ) : (
              <p className="text-gray-600">No address saved yet.</p>
            )}
            <button
              onClick={openAddressModal}
              className="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-200 ease-in-out cursor-pointer"
            >
              {savedAddress ? "Edit Address" : "Add New Address"}
            </button>
          </div>

          {/* ✅ OrderSummary with reselling price input support */}
          <OrderSummary
            cart={cartItems}
            removeItem={handleRemoveItem}
            incrementQuantity={handleIncrementQuantity}
            decrementQuantity={handleDecrementQuantity}
            resellingPrices={resellingPrices}
            onResellingPriceChange={handleResellingPriceChange}
          />
        </div>

        {/* Right section */}
        <div className="space-y-6">
          <PriceDetails cart={cartItems} resellingPrices={resellingPrices} />
          <TermsAndConditions />
          <PlaceOrderButton
            apiEndPoint={"/reseller/orders/"}
            shippingAddress={shippingAddress}
            items={items}
            wholeSalePrice={wholesalePrice}
            resellingPrice={resellingPrice}
            token={localStorage.getItem("access_token")}
            disabled={!savedAddress}
            onSuccess={(res) => {
              console.log("Order success:", res);
              toast.success("Order Placed Successfully!");
              navigate("/");
              dispatch(clearResellerCart());
            }}
            onError={(err) => console.error("Order failed:", err)}
          />
          <PaymentMethods />
        </div>
      </div>

      {isAddressModalOpen && (
        <AddressFormModal
          onClose={closeAddressModal}
          onSave={handleSaveAddress}
        />
      )}
    </div>
  );
};

export default ResellerCheckOut;
