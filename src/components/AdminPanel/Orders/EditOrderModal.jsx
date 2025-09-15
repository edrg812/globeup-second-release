import { useState } from "react";

const EditOrderModal = ({ order, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    customer_name_orderedby_admin: order.customer_name_orderedby_admin || "",
    customer_phone_orderedby_admin: order.customer_phone_orderedby_admin || "",
    shipping_address: order.shipping_address || "",
    status: order.status || "pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(order.id, formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Order #{order.id}</h2>

        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="customer_name_orderedby_admin"
            value={formData.customer_name_orderedby_admin}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
        </label>

        <label className="block mb-2">
          Phone:
          <input
            type="text"
            name="customer_phone_orderedby_admin"
            value={formData.customer_phone_orderedby_admin}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
        </label>

        <label className="block mb-2">
          Shipping Address:
          <input
            type="text"
            name="shipping_address"
            value={formData.shipping_address}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
        </label>

        <label className="block mb-2">
          Status:
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrderModal;
