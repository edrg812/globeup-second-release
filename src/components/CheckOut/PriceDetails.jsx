// import React from "react";

// const PriceDetails = ({ cart, resellingPrices }) => {
//   if (!cart || cart.length === 0) {
//     return (
//       <div className="bg-white p-4 rounded-xl shadow text-gray-500">
//         No products in cart.
//       </div>
//     );
//   }

//   // Calculate totals
//   let wholesaleTotal = 0;
//   let resellingTotal = 0;

//   cart.forEach((item) => {
//     const quantity = item.quantity || 1;
//     const wholesalePrice = item.price || 0;
//     const resellingPrice =
//       parseFloat(resellingPrices[item.product_variant_id]) || wholesalePrice;

//     wholesaleTotal += wholesalePrice * quantity;
//     resellingTotal += resellingPrice * quantity;
//   });

//   const deliveryFee = 60; // Fixed delivery fee
//   const grandTotal = resellingTotal + deliveryFee;

//   return (
//     <div className="bg-white p-4 rounded-xl shadow space-y-4">
//       <h3 className="text-lg font-semibold mb-4">Price Details</h3>

//       {/* Item-wise breakdown */}
//       <div className="space-y-2">
//         {cart.map((item) => {
//           const quantity = item.quantity || 1;
//           const wholesalePrice = item.price || 0;
//           const resellingPrice =
//             parseFloat(resellingPrices[item.product_variant_id]) ||
//             wholesalePrice;
//           const itemTotal = resellingPrice * quantity;

//           return (
//             <div
//               key={item.product_variant_id}
//               className="flex justify-between text-sm"
//             >
//               <span className="text-gray-600">
//                 {item.name} × {quantity}
//               </span>
//               <span>৳ {itemTotal.toLocaleString()}</span>
//             </div>
//           );
//         })}
//       </div>

//       <hr className="my-3" />

//       {/* Wholesale subtotal */}
//       <div className="flex justify-between">
//         <span>Subtotal (Wholesale):</span>
//         <span>৳ {wholesaleTotal.toLocaleString()}</span>
//       </div>

//       {/* Reselling subtotal */}
//       <div className="flex justify-between">
//         <span>Subtotal (Reselling):</span>
//         <span>৳ {resellingTotal.toLocaleString()}</span>
//       </div>

//       {/* Delivery Fee */}
//       <div className="flex justify-between">
//         <span>Delivery Fee:</span>
//         <span>৳ {deliveryFee.toLocaleString()}</span>
//       </div>

//       {/* Grand Total */}
//       <div className="flex justify-between border-t pt-3">
//         <span className="text-lg font-semibold">Total:</span>
//         <span className="font-bold text-xl text-pink-600">
//           ৳ {grandTotal.toLocaleString()}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default PriceDetails;


import React from "react";

const PriceDetails = ({ cart, resellingPrices }) => {
  if (!cart || cart.length === 0) {
    return (
      <div className="bg-white p-4 rounded-xl shadow text-gray-500">
        No products in cart.
      </div>
    );
  }

  // Calculate totals
  let wholesaleTotal = 0;
  let resellingTotal = 0;

  cart.forEach((item) => {
    const quantity = item.quantity || 1;
    const wholesalePrice = item.price || 0;

    const rawPrice = resellingPrices?.[item.product_variant_id];
    const resellingPrice = !isNaN(parseFloat(rawPrice))
      ? parseFloat(rawPrice)
      : wholesalePrice;

    wholesaleTotal += wholesalePrice * quantity;
    resellingTotal += resellingPrice * quantity;
  });

  const deliveryFee = 60; // Fixed delivery fee
  const grandTotal = resellingTotal + deliveryFee;

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-4">
      <h3 className="text-lg font-semibold mb-4">Price Details</h3>

      {/* Item-wise breakdown */}
      <div className="space-y-2">
        {cart.map((item) => {
          const quantity = item.quantity || 1;
          const wholesalePrice = item.price || 0;

          const rawPrice = resellingPrices?.[item.product_variant_id];
          const resellingPrice = !isNaN(parseFloat(rawPrice))
            ? parseFloat(rawPrice)
            : wholesalePrice;

          const itemTotal = resellingPrice * quantity;

          return (
            <div
              key={item.product_variant_id}
              className="flex justify-between text-sm"
            >
              <span className="text-gray-600">
                {item.name} × {quantity}
              </span>
              <span>৳ {itemTotal.toLocaleString()}</span>
            </div>
          );
        })}
      </div>

      <hr className="my-3" />

      {/* Wholesale subtotal */}
      <div className="flex justify-between">
        <span>Subtotal (Wholesale):</span>
        <span>৳ {wholesaleTotal.toLocaleString()}</span>
      </div>

      {/* Reselling subtotal */}
      <div className="flex justify-between">
        <span>Subtotal (Reselling):</span>
        <span>৳ {resellingTotal.toLocaleString()}</span>
      </div>

      {/* Delivery Fee */}
      <div className="flex justify-between">
        <span>Delivery Fee:</span>
        <span>৳ {deliveryFee.toLocaleString()}</span>
      </div>

      {/* Grand Total */}
      <div className="flex justify-between border-t pt-3">
        <span className="text-lg font-semibold">Total:</span>
        <span className="font-bold text-xl text-pink-600">
          ৳ {grandTotal.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default PriceDetails;
