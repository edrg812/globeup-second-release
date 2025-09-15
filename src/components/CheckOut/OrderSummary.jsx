import { ImCross } from "react-icons/im";

const OrderSummary = ({
  cart,
  removeItem,
  incrementQuantity,
  decrementQuantity,
}) => {
  if (!cart || cart.length === 0) {
    return (
      <div className="bg-white p-4 rounded-xl shadow text-gray-500">
        No products in cart.
      </div>
    );
  }

  // Calculate total quantity and subtotal
  const totalQuantity = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );
  const subtotal = cart.reduce((total, item) => {
    const itemPrice = item.price || 0;
    const itemQuantity = item.quantity || 1;
    return total + itemPrice * itemQuantity;
  }, 0);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">
        Order summary - {totalQuantity} item{totalQuantity > 1 ? "s" : ""}
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm table-auto">
          <thead className="bg-yellow-50 text-gray-700">
            <tr>
              <th className="text-left p-2">Product Details</th>
              <th className="p-2">Price</th>
              <th className="p-2">QTY</th>
              <th className="p-2">Total</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => {
              console.log(item);
              const itemTotal = (item.price || 0) * (item.quantity || 1);

              return (
                <tr key={index} className="border-t">
                  <td className="p-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          item.image ||
                          "https://placehold.co/100x100/F0F0F0/CCC?text=No+Image"
                        }
                        alt={item.name || "Product"}
                        className="w-[80px] h-[80px] object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <p className="font-medium">
                          {item.name || "Unnamed Product"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.brand && `Brand: ${item.brand}`}
                          {item.brand && item.color && " | "}
                          {item.color && `Color: ${item.color}`}
                          {(item.color || item.brand) && item.size && " | "}
                          {item.size && `Size: ${item.size}`}
                        </p>
                        {item.sku && (
                          <p className="text-xs text-green-600">
                            SKU: {item.sku}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="text-center p-2">
                    ৳ {(item.price || 0).toLocaleString()}
                  </td>
                  <td className="text-center p-2">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() =>
                          decrementQuantity(item.product_variant_id)
                        }
                        className={`w-6 h-6 flex items-center justify-center rounded-md ${
                          item.quantity <= 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-2 w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          incrementQuantity(item.product_variant_id)
                        }
                        className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="text-center p-2">
                    ৳ {itemTotal.toLocaleString()}
                  </td>
                  <td className="text-center p-2">
                    <button
                      onClick={() => removeItem(item.product_variant_id)} // Ensure you pass removeItem function as a prop
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                      aria-label="Remove item"
                    >
                      <ImCross className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="text-right mt-4 text-sm text-gray-600">
          {totalQuantity} item{totalQuantity > 1 ? "s" : ""}, Subtotal: ৳{" "}
          {subtotal.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
