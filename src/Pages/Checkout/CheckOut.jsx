// import { useState } from "react";
// import DeliveryAddress from "../../components/CheckOut/DeliveryAddress";
// import OrderSummary from "../../components/CheckOut/OrderSummary";
// import PriceDetails from "../../components/CheckOut/PriceDetails";
// import Coupon from "../../components/CheckOut/Coupon";
// import TermsAndConditions from "../../components/CheckOut/TermsAndConditions";
// import PlaceOrderButton from "../../components/CheckOut/PlaceOrderButton";
// import PaymentMethods from "../../components/CheckOut/PaymentMethods";
// import AddressFormModal from "../../components/CheckOut/AddressFormModal";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { clearCart, removeItem } from "../../redux/cart/cartSlice";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";




// const CheckOut = () => {
//   const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
//   const [savedAddress, setSavedAddress] = useState(null);
//   const [shippingAddress, setShippingAddress] = useState(
//     "123 Default St, City, Country"
//   ); // Default or fetched address
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   // ✅ Get all cart items from Redux store
//   const cartItems = useAppSelector((state) => state.cart.items);
//   console.log("All cart items:", cartItems);

//   // ✅ Prepare items array for checkout
//   const items = cartItems
//     .filter((item) => item.product_variant_id) // Ensure product_variant_id exists
//     .map((item) => ({
//       product_variant_id: item.product_variant_id,
//       quantity: item.quantity || 1,
//     }));

//   console.log("Checkout items:", items);

//   const openAddressModal = () => setIsAddressModalOpen(true);
//   const closeAddressModal = () => setIsAddressModalOpen(false);

//   const handleSaveAddress = (address) => {
//     setSavedAddress(address);
//     // console.log("Address saved:", address);
//     // Send to backend if needed
//   };

//   const handleRemoveItem = (product_variant_id) => {
//     dispatch(removeItem(product_variant_id));
//   };

//   // ✅ If no items in cart, show message
//   if (!cartItems.length || !items.length) {
//     return (
//       <div className="text-center p-10 text-red-500">
//         No product(s) selected for checkout.
//       </div>
//     );
//   }

//   return (
//     <div className="relative">
//       <div
//         className={`grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-100 min-h-screen ${
//           isAddressModalOpen ? "blur-sm" : ""
//         }`}
//       >
//         {/* Left section */}
//         <div className="md:col-span-2 space-y-6">
//           <div className="bg-white p-4 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
//             {savedAddress ? (
//               <div className="border p-3 rounded-md bg-gray-50">
//                 <p className="font-semibold">{savedAddress}</p>
//                 {savedAddress.isDefault && (
//                   <span className="text-sm text-green-600">
//                     Default Address
//                   </span>
//                 )}
//               </div>
//             ) : (
//               <p className="text-gray-600">No address saved yet.</p>
//             )}
//             <button
//               onClick={openAddressModal}
//               className="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-200 ease-in-out cursor-pointer"
//             >
//               {savedAddress ? "Edit Address" : "Add New Address"}
//             </button>
//           </div>

//           {/* ✅ Pass all cart items to OrderSummary */}
//           <OrderSummary cart={cartItems} removeItem={handleRemoveItem} />
//         </div>

//         {/* Right section */}
//         <div className="space-y-6">
//           {/* ✅ Pass all cart items to PriceDetails */}
//           <PriceDetails cart={cartItems} />
//           {/* <Coupon /> */}
//           <TermsAndConditions />
//           <PlaceOrderButton
//             apiEndPoint={"/orders/"}
//             shippingAddress={shippingAddress}
//             items={items} // ✅ Send all items for checkout
//             token={localStorage.getItem("access_token")}
//             onSuccess={(res) => {
//               console.log("Order success:", res);
//               // show success toast
//               toast.success("Order Placed Successfully!");

//               // navigate to home
//               navigate("/");

//               // clear the cart
//               dispatch(clearCart());
//             }}
//             onError={(err) => console.error("Order failed:", err)}
//           />
//           <PaymentMethods />
//         </div>
//       </div>

//       {isAddressModalOpen && (
//         <AddressFormModal
//           onClose={closeAddressModal}
//           onSave={handleSaveAddress}
//         />
//       )}
//     </div>
//   );
// };

// export default CheckOut;















// // src/pages/CheckOut/CheckOut.jsx
// import { useState } from "react";
// import DeliveryAddress from "../../components/CheckOut/DeliveryAddress";
// import OrderSummary from "../../components/CheckOut/OrderSummary";
// import PriceDetails from "../../components/CheckOut/PriceDetails";
// import Coupon from "../../components/CheckOut/Coupon";
// import TermsAndConditions from "../../components/CheckOut/TermsAndConditions";
// import PlaceOrderButton from "../../components/CheckOut/PlaceOrderButton";
// import PaymentMethods from "../../components/CheckOut/PaymentMethods";
// import AddressFormModal from "../../components/CheckOut/AddressFormModal";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { clearCart, removeItem, incrementQuantity, decrementQuantity } from "../../redux/cart/cartSlice";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const CheckOut = () => {
//   const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
//   const [savedAddress, setSavedAddress] = useState(null);
//   const [shippingAddress, setShippingAddress] = useState(
//     "123 Default St, City, Country"
//   );

// const incrementQuantityHandler = (variantId) => {
//   dispatch(incrementQuantity(variantId));  // ✅ dispatch Redux action
// };

// const decrementQuantityHandler = (variantId) => {
//   dispatch(decrementQuantity(variantId));  // ✅ dispatch Redux action


//   // ✅ State for editable reselling prices
//   const [resellingPrices, setResellingPrices] = useState({});

//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const cartItems = useAppSelector((state) => state.cart.items);

//   // Prepare items array for checkout API
//   const items = cartItems
//     .filter((item) => item.product_variant_id)
//     .map((item) => ({
//       product_variant_id: item.product_variant_id,
//       quantity: item.quantity || 1,
//       reselling_price: resellingPrices[item.product_variant_id] || item.price,
//     }));

//   const openAddressModal = () => setIsAddressModalOpen(true);
//   const closeAddressModal = () => setIsAddressModalOpen(false);

//   const handleSaveAddress = (address) => {
//     setSavedAddress(address);
//   };

//   const handleRemoveItem = (product_variant_id) => {
//     dispatch(removeItem(product_variant_id));
//     setResellingPrices((prev) => {
//       const updated = { ...prev };
//       delete updated[product_variant_id];
//       return updated;
//     });
//   };

//   const handleResellingPriceChange = (variantId, value) => {
//     setResellingPrices((prev) => ({
//       ...prev,
//       [variantId]: value,
//     }));
//   };

//   // If no items in cart
//   if (!cartItems.length || !items.length) {
//     return (
//       <div className="text-center p-10 text-red-500">
//         No product(s) selected for checkout.
//       </div>
//     );
//   }

//   return (
//     <div className="relative">
//       <div
//         className={`grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-100 min-h-screen ${
//           isAddressModalOpen ? "blur-sm" : ""
//         }`}
//       >
//         {/* Left section */}
//         <div className="md:col-span-2 space-y-6">
//           <div className="bg-white p-4 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
//             {savedAddress ? (
//               <div className="border p-3 rounded-md bg-gray-50">
//                 <p className="font-semibold">{savedAddress}</p>
//                 {savedAddress.isDefault && (
//                   <span className="text-sm text-green-600">
//                     Default Address
//                   </span>
//                 )}
//               </div>
//             ) : (
//               <p className="text-gray-600">No address saved yet.</p>
//             )}
//             <button
//               onClick={openAddressModal}
//               className="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-200 ease-in-out cursor-pointer"
//             >
//               {savedAddress ? "Edit Address" : "Add New Address"}
//             </button>
//           </div>

//           {/* ✅ Pass resellingPrices + handler */}
//           <OrderSummary
//             cart={cartItems}
//             removeItem={handleRemoveItem}
//             resellingPrices={resellingPrices}
//             onResellingPriceChange={handleResellingPriceChange}
//               incrementQuantity={incrementQuantityHandler}
//               decrementQuantity={decrementQuantityHandler}
//           />
//         </div>

//         {/* Right section */}
//         <div className="space-y-6">
//           <PriceDetails cart={cartItems} resellingPrices={resellingPrices} />
//           {/* <Coupon /> */}
//           <TermsAndConditions />
//           <PlaceOrderButton
//             apiEndPoint={"/orders/"}
//             shippingAddress={shippingAddress}
//             items={items}
//             token={localStorage.getItem("access_token")}
//             onSuccess={(res) => {
//               toast.success("Order Placed Successfully!");
//               navigate("/");
//               dispatch(clearCart());
//             }}
//             onError={(err) => console.error("Order failed:", err)}
//           />
//           <PaymentMethods />
//         </div>
//       </div>

//       {isAddressModalOpen && (
//         <AddressFormModal
//           onClose={closeAddressModal}
//           onSave={handleSaveAddress}
//         />
//       )}
//     </div>
//   );
// };

// export default CheckOut;



import { useState } from "react";
import DeliveryAddress from "../../components/CheckOut/DeliveryAddress";
import OrderSummary from "../../components/CheckOut/OrderSummary";
import PriceDetails from "../../components/CheckOut/PriceDetails";
import Coupon from "../../components/CheckOut/Coupon";
import TermsAndConditions from "../../components/CheckOut/TermsAndConditions";
import PlaceOrderButton from "../../components/CheckOut/PlaceOrderButton";
import PaymentMethods from "../../components/CheckOut/PaymentMethods";
import AddressFormModal from "../../components/CheckOut/AddressFormModal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  clearCart,
  removeItem,
  incrementQuantity,
  decrementQuantity,
} from "../../redux/cart/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [savedAddress, setSavedAddress] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(
    "123 Default St, City, Country"
  );
  const [resellingPrices, setResellingPrices] = useState({});

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cartItems = useAppSelector((state) => state.cart.items);

  // ✅ handlers for quantity
  const incrementQuantityHandler = (variantId) => {
    dispatch(incrementQuantity(variantId));
  };

  const decrementQuantityHandler = (variantId) => {
    dispatch(decrementQuantity(variantId));
  };

  // ✅ Prepare items array for checkout API
  const items = cartItems
    .filter((item) => item.product_variant_id)
    .map((item) => ({
      product_variant_id: item.product_variant_id,
      quantity: item.quantity || 1,
      reselling_price: resellingPrices[item.product_variant_id] || item.price,
    }));

  const openAddressModal = () => setIsAddressModalOpen(true);
  const closeAddressModal = () => setIsAddressModalOpen(false);

  const handleSaveAddress = (address) => {
    setSavedAddress(address);
  };

  const handleRemoveItem = (product_variant_id) => {
    dispatch(removeItem(product_variant_id));
    setResellingPrices((prev) => {
      const updated = { ...prev };
      delete updated[product_variant_id];
      return updated;
    });
  };

  const handleResellingPriceChange = (variantId, value) => {
    setResellingPrices((prev) => ({
      ...prev,
      [variantId]: value,
    }));
  };

  // ✅ If no items in cart
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
                {savedAddress.isDefault && (
                  <span className="text-sm text-green-600">
                    Default Address
                  </span>
                )}
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

          {/* ✅ Order Summary */}
          <OrderSummary
            cart={cartItems}
            removeItem={handleRemoveItem}
            resellingPrices={resellingPrices}
            onResellingPriceChange={handleResellingPriceChange}
            incrementQuantity={incrementQuantityHandler}
            decrementQuantity={decrementQuantityHandler}
          />
        </div>

        {/* Right section */}
        <div className="space-y-6">
          <PriceDetails cart={cartItems} resellingPrices={resellingPrices} />
          {/* <Coupon /> */}
          <TermsAndConditions />
          <PlaceOrderButton
            apiEndPoint={"/orders/"}
            shippingAddress={shippingAddress}
            items={items}
            token={localStorage.getItem("access_token")}
            onSuccess={(res) => {
              toast.success("Order Placed Successfully!");
              navigate("/");
              dispatch(clearCart());
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

export default CheckOut;
