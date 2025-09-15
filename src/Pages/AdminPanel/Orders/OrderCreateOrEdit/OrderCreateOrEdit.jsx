// import { useState } from 'react';
// import { FaShoppingCart, FaTimes } from 'react-icons/fa';
// import { useEffect } from 'react';


// const OrderCreateOrEdit = ({previousProducts, previousOrderedProduct, productCustomerInfo}) => {
 
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Replace with your backend API URL
//   const API_URL = "http://localhost:8000/";

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const token = localStorage.getItem("access_token"); // Or however you store JWT
//         const res = await fetch(`${API_URL}variants/`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // ✅ added authorization
//           },
//         });

//         if (!res.ok) {
//           throw new Error("Failed to fetch products");
//         }

//         const data = await res.json();
//         setProducts(data.results); // ✅ store API products
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
  
//   }, []);

  

//   const [selectedProduct, setSelectedProduct] = useState(previousOrderedProduct ||[]); // Changed to array
//   const [customer, setCustomer] = useState( productCustomerInfo || {
//     name: '',
//     number: '',
//     address: '',
//     area: ''
//   });


// // const [shippingFee, SetShiipingFee]=useState([])

// // const safeShippingFee = Number(shippingFee) || 0;
// //   const safeSubtotal = Number(subtotal) || 0;
// //   const safeDiscount = Number(discount) || 0;


// // const total = safeSubtotal + safeShippingFee - safeDiscount;

// //   const subtotal = selectedProduct.reduce((sum, product) => sum + (product.price * product.quantity), 0);

  
// //   // const discount = selectedProduct.reduce((sum, product) => sum + (product.discount * product.quantity), 0);
// //   // default discount was made 0;
// //   const discount = selectedProduct.reduce((sum, product) => sum + ((product.discount ?? 0) * (product.quantity ?? 1)),
// //   0
// // );

// // ✅ 1. Declare states at the top
// const [shippingFees, setShippingFees] = useState([]);   // all fees from backend
// const [shippingFee, setShippingFee] = useState(0);      // selected fee amount

// // ✅ 2. Derived values from selected products
// const subtotal = selectedProduct.reduce(
//   (sum, product) => sum + (product.price * product.quantity),
//   0
// );

// const discount = selectedProduct.reduce(
//   (sum, product) => sum + ((product.discount ?? 0) * (product.quantity ?? 1)),
//   0
// );

// // ✅ 3. Total (safe numbers)
// const total = subtotal + shippingFee - discount;



//   //shippingFEE BROUGHT from backend
//   useEffect(() => {
//     const fetchShippingFee = async () => {
//       try {
//         const token = localStorage.getItem("access_token"); // Or however you store JWT
//         const res = await fetch(`${API_URL}shipping-charges/`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // ✅ added authorization
//           },
//         });

//         if (!res.ok) {
//           throw new Error("Failed to shippingFee");
//         }

//         const data = await res.json();
//         setShippingFees(data.results); // ✅ store API products
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//   fetchShippingFee();
  
  
//   }, []);

  
// console.log(shippingFee)


//   const handleQuantityChange = (id, value) => {
//     const newQuantity = Math.max(0, parseInt(value) || 0);
//     setSelectedProduct(selectedProduct.map(product => 
//       product.id === id ? { ...product, quantity: newQuantity } : product
//     ));
//   };

//   const handleDiscountChange = (id, value) => {
//     const newDiscount = Math.max(0, parseInt(value) || 0);
//     setSelectedProduct(selectedProduct.map(product => 
//       product.id === id ? { ...product, discount: newDiscount } : product
//     ));
//   };

//   const removeProduct = (id) => {
//     setSelectedProduct(selectedProduct.filter(product => product.id !== id));
//   };

//   const handleCustomerChange = (e) => {
//     const { id, value } = e.target;
//     setCustomer({ ...customer, [id]: value });
//   };

//   const handleClear = () => {
//     setSelectedProduct([]);
//   };

//   const handleProductSelect = (e) => {
//     const productId = parseInt(e.target.value);
//     const productToAdd = products.find(p => p.id === productId);
    
//     if (productToAdd) {
//       // Check if product already exists in cart
//       const existingProductIndex = selectedProduct.findIndex(p => p.id === productId);
      
//       if (existingProductIndex >= 0) {
//         // If exists, increase quantity
//         const updatedProducts = [...selectedProduct];
//         updatedProducts[existingProductIndex].quantity += 1;
//         setSelectedProduct(updatedProducts);
//       } else {
//         // If new, add to cart with quantity 1
//         setSelectedProduct([...selectedProduct, { ...productToAdd, quantity: 1 }]);
//       }
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Submit logic here
//     console.log({ customer, products: selectedProduct, total });
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* Header */}
//       <div className="bg-white shadow-md">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <h1 className="text-xl font-bold text-gray-800">{productCustomerInfo ? 'Order Edit': "Order Create"}</h1>
//           <button
//             onClick={handleClear}
//             className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition duration-300"
//           >
//             <FaShoppingCart className="mr-2" />
//             Cart Clear
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto p-4">
//         <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
//           {/* Product Selection */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="products">
//               Products *
//             </label>
//             <select
//               onChange={handleProductSelect}
//               className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
//               id="products"
//               name="products"
//               defaultValue=""
//             >
//               <option value="" disabled>Select a product</option>
//               {products.map((product) => (
//                 <option key={product.id} value={product.id}>
//                   {product.product_name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Products Table */}
//           <div className="overflow-x-auto mb-8">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-gray-50">
//                   <th className="p-3 font-medium text-gray-600 uppercase tracking-wider">Image</th>
//                   <th className="p-3 font-medium text-gray-600 uppercase tracking-wider">Name</th>
//                   <th className="p-3 font-medium text-gray-600 uppercase tracking-wider text-center">Quantity</th>
//                   <th className="p-3 font-medium text-gray-600 uppercase tracking-wider">Sell Price</th>
//                   <th className="p-3 font-medium text-gray-600 uppercase tracking-wider">Discount</th>
//                   <th className="p-3 font-medium text-gray-600 uppercase tracking-wider">Sub Total</th>
//                   <th className="p-3 font-medium text-gray-600 uppercase tracking-wider text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {selectedProduct.map((product) => (
//                   <tr key={product.id}>
//                     <td className="p-3">
//                       <img
//                         alt="Product"
//                         className="h-12 w-12 object-cover rounded-md"
//                         src={product.image}
//                       />
//                     </td>
//                     <td className="p-3 text-gray-700">{product.product_name}</td>
//                     <td className="p-3">
//                       <div className="flex items-center justify-center">
//                         <button
//                           className="bg-gray-200 text-gray-600 px-3 py-1 rounded-l-md hover:bg-gray-300"
//                           onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
//                         >
//                           -
//                         </button>
//                         <input
//                           className="w-12 text-center border-t border-b border-gray-300 p-1"
//                           type="number"
//                           min="0"
//                           value={product.quantity}
//                           onChange={(e) => handleQuantityChange(product.id, e.target.value)}
//                         />
//                         <button
//                           className="bg-gray-200 text-gray-600 px-3 py-1 rounded-r-md hover:bg-gray-300"
//                           onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </td>
//                     <td className="p-3 text-gray-700">{product.price}</td>
//                     <td className="p-3">
//                       <input
//                         className="w-24 border border-gray-300 rounded-md p-2"
//                         type="number"
//                         min="0"
//                         value={product.discount}
//                         onChange={(e) => handleDiscountChange(product.id, e.target.value)}
//                       />
//                     </td>
//                     <td className="p-3 text-gray-700">
//                       {product.price * product.quantity - product.discount * product.quantity}
//                     </td>
//                     <td className="p-3 text-center">
//                       <button
//                         className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
//                         onClick={() => removeProduct(product.id)}
//                       >
//                         <FaTimes className="text-sm" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Customer and Summary Section */}
//           <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Customer Information */}
//             <div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700" htmlFor="name">
//                   Customer Name
//                 </label>
//                 <input
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                   id="name"
//                   type="text"
//                   value={customer.name}
//                   onChange={handleCustomerChange}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700" htmlFor="number">
//                   Customer Number
//                 </label>
//                 <input
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                   id="number"
//                   type="text"
//                   value={customer.number}
//                   onChange={handleCustomerChange}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700" htmlFor="address">
//                   Address
//                 </label>
//                 <input
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                   id="address"
//                   type="text"
//                   value={customer.address}
//                   onChange={handleCustomerChange}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700" htmlFor="area">
//                   Area
//                 </label>
//                 <select
//                   className="w-full border border-gray-300 rounded-md p-2 mt-1"
//                   id="area"
//                   value={customer.area}
//                   onChange={handleCustomerChange}
//                 ><option value="">Select....</option>
// {shippingFees.map((fee) => (
//   <option key={fee.id} value={fee.area}>
//     {fee.area} - ({fee.amount})
//   </option>
// ))}

                  
//                 </select>
//               </div>
//             </div>

//             {/* Order Summary */}
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <table className="w-full">
//                 <tbody>
//                   <tr className="border-b border-gray-200">
//                     <td className="py-2 text-gray-600">Sub Total</td>
//                     <td className="py-2 text-right font-semibold text-gray-800">{subtotal}</td>
//                   </tr>
//                   <tr className="border-b border-gray-200">
//                     <td className="py-2 text-gray-600">Shipping Fee</td>
//                     <td className="py-2 text-right font-semibold text-gray-800">{shippingFee}</td>
//                   </tr>
//                   <tr className="border-b border-gray-200">
//                     <td className="py-2 text-gray-600">Discount</td>
//                     <td className="py-2 text-right font-semibold text-gray-800">{discount}</td>
//                   </tr>
//                   <tr>
//                     <td className="pt-4 text-gray-800 font-bold text-lg">Total</td>
//                     <td className="pt-4 text-right text-teal-500 font-bold text-lg">{total}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="mt-8">
//             <button
//               className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 transition duration-300"
//               onClick={handleSubmit}
//             >
//               Order Submit
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderCreateOrEdit;



import { useState, useEffect } from "react";
import { FaShoppingCart, FaTimes } from "react-icons/fa";

const OrderCreateOrEdit = ({ previousProducts, previousOrderedProduct, productCustomerInfo }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace with your backend API URL
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL

  // ✅ Load products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch(`${API_URL}/products/variants/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data.results || data); // safe fallback
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const [selectedProduct, setSelectedProduct] = useState(previousOrderedProduct || []);
  const [customer, setCustomer] = useState(
    productCustomerInfo || { name: "", number: "", address: "", area: "" }
  );

  // ✅ Shipping fees
  const [shippingFees, setShippingFees] = useState([]);
  const [shippingFee, setShippingFee] = useState(0);

  // ✅ Subtotal
  const subtotal = selectedProduct.reduce(
    (sum, product) => sum + (product.price * product.quantity),
    0
  );

  // ✅ Discount
  const discount = selectedProduct.reduce(
    (sum, product) => sum + ((product.discount ?? 0) * (product.quantity ?? 1)),
    0
  );

  // ✅ Total
  const total = (Number(subtotal) || 0) + (Number(shippingFee) || 0) - (Number(discount) || 0);

  // ✅ Load shipping fees
  useEffect(() => {
    const fetchShippingFee = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch(`${API_URL}/shipping-charges/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch shipping fees");

        const data = await res.json();

        // ✅ Fix: handle both array or paginated response
        setShippingFees(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        console.error(err);
        setShippingFees([]); // fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchShippingFee();
  }, []);

  // Handlers
  const handleQuantityChange = (id, value) => {
    const newQuantity = Math.max(0, parseInt(value) || 0);
    setSelectedProduct(
      selectedProduct.map((product) =>
        product.id === id ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  const handleDiscountChange = (id, value) => {
    const newDiscount = Math.max(0, parseInt(value) || 0);
    setSelectedProduct(
      selectedProduct.map((product) =>
        product.id === id ? { ...product, discount: newDiscount } : product
      )
    );
  };

  const removeProduct = (id) => {
    setSelectedProduct(selectedProduct.filter((product) => product.id !== id));
  };

  const handleCustomerChange = (e) => {
    const { id, value } = e.target;
    setCustomer({ ...customer, [id]: value });
  };

  const handleClear = () => {
    setSelectedProduct([]);
  };

  const handleProductSelect = (e) => {
    const productId = parseInt(e.target.value);
    const productToAdd = products.find((p) => p.id === productId);

    if (productToAdd) {
      const existingProductIndex = selectedProduct.findIndex((p) => p.id === productId);

      if (existingProductIndex >= 0) {
        const updatedProducts = [...selectedProduct];
        updatedProducts[existingProductIndex].quantity += 1;
        setSelectedProduct(updatedProducts);
      } else {
        setSelectedProduct([...selectedProduct, { ...productToAdd, quantity: 1 }]);
      }
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Build JSON payload
const payload = {
  // user_id: 1,  // required
  shipping_address: customer.address,
  customer_name_orderedby_admin: customer.name,
  customer_phone_orderedby_admin: customer.number,
  items: selectedProduct.map(p => ({
    product_variant_id: p.id,
    quantity: p.quantity
  }))
};



  console.log("Sending order:", payload);

  try {
    const token = localStorage.getItem("access_token"); // get JWT
    const res = await fetch(`${API_URL}/orders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Order create failed:", errorData);
      alert("Failed to create order: " + JSON.stringify(errorData));
      return;
    }

    const data = await res.json();
    console.log("Order created:", data);

    alert("✅ Order submitted successfully!");
    // Optional: clear cart after successful order
    setSelectedProduct([]);
    setCustomer({ name: "", number: "", address: "", area: "" });
    setShippingFee(0);
  } catch (err) {
    console.error("Error submitting order:", err);
    alert("Error submitting order, check console.");
  }
};

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            {productCustomerInfo ? "Order Edit" : "Order Create"}
          </h1>
          <button
            onClick={handleClear}
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition duration-300"
          >
            <FaShoppingCart className="mr-2" />
            Cart Clear
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
          {/* Product Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="products">
              Products *
            </label>
            <select
              onChange={handleProductSelect}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
              id="products"
              name="products"
              defaultValue=""
            >
              <option value="" disabled>
                Select a product
              </option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.product_name}
                </option>
              ))}
            </select>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3 text-center">Quantity</th>
                  <th className="p-3">Sell Price</th>
                  <th className="p-3">Discount</th>
                  <th className="p-3">Sub Total</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {selectedProduct.map((product) => (
                  <tr key={product.id}>
                    <td className="p-3">
                      <img
                        alt="Product"
                        className="h-12 w-12 object-cover rounded-md"
                        src={product.image}
                      />
                    </td>
                    <td className="p-3">{product.product_name}</td>
                    <td className="p-3">
                      <div className="flex items-center justify-center">
                        <button
                          className="bg-gray-200 px-3 py-1 rounded-l-md hover:bg-gray-300"
                          onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                        >
                          -
                        </button>
                        <input
                          className="w-12 text-center border-t border-b border-gray-300 p-1"
                          type="number"
                          min="0"
                          value={product.quantity}
                          onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                        />
                        <button
                          className="bg-gray-200 px-3 py-1 rounded-r-md hover:bg-gray-300"
                          onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-3">{product.price}</td>
                    <td className="p-3">
                      <input
                        className="w-24 border rounded-md p-2"
                        type="number"
                        min="0"
                        value={product.discount}
                        onChange={(e) => handleDiscountChange(product.id, e.target.value)}
                      />
                    </td>
                    <td className="p-3">
                      {(product.price * product.quantity) -
                        (product.discount ?? 0) * (product.quantity ?? 1)}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                        onClick={() => removeProduct(product.id)}
                      >
                        <FaTimes className="text-sm" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Customer + Summary */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Customer Info */}
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium" htmlFor="name">
                  Customer Name
                </label>
                <input
                  className="mt-1 block w-full border rounded-md p-2"
                  id="name"
                  type="text"
                  value={customer.name}
                  onChange={handleCustomerChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium" htmlFor="number">
                  Customer Number
                </label>
                <input
                  className="mt-1 block w-full border rounded-md p-2"
                  id="number"
                  type="text"
                  value={customer.number}
                  onChange={handleCustomerChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium" htmlFor="address">
                  Address
                </label>
                <input
                  className="mt-1 block w-full border rounded-md p-2"
                  id="address"
                  type="text"
                  value={customer.address}
                  onChange={handleCustomerChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium" htmlFor="area">
                  Area
                </label>
                <select
                  className="w-full border rounded-md p-2 mt-1"
                  id="area"
                  value={customer.area}
                  onChange={(e) => {
                    const selectedArea = e.target.value;
                    setCustomer({ ...customer, area: selectedArea });

                    // ✅ Set shipping fee
                    const feeObj = shippingFees.find((f) => f.area === selectedArea);
                    setShippingFee(feeObj ? Number(feeObj.amount) : 0);
                  }}
                >
                  <option value="">Select....</option>
                  {Array.isArray(shippingFees) &&
                    shippingFees.map((fee) => (
                      <option key={fee.id} value={fee.area}>
                        {fee.area} - ({fee.amount})
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Sub Total</td>
                    <td className="py-2 text-right font-semibold">{subtotal || 0}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Shipping Fee</td>
                    <td className="py-2 text-right font-semibold">{shippingFee || 0}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Discount</td>
                    <td className="py-2 text-right font-semibold">{discount || 0}</td>
                  </tr>
                  <tr>
                    <td className="pt-4 font-bold text-lg">Total</td>
                    <td className="pt-4 text-right text-teal-500 font-bold text-lg">
                      {total || 0}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-8">
            <button
              className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600"
              onClick={handleSubmit}
            >
              Order Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCreateOrEdit;
