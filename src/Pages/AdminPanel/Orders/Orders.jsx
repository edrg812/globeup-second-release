



import { Outlet, useSearchParams, Link } from "react-router-dom";
import { FiMinus } from "react-icons/fi";
import { useCallback, useEffect, useState } from "react";
import ActionButton from "../../../components/AdminPanel/Orders/ActionButton";
import Checkbox from "../../../components/shared/Checkbox/Checkbox";
import EditOrderModal from "../../../components/AdminPanel/Orders/EditOrderModal";
import FraudCheckModal from "../../../components/AdminPanel/Fraud_Check/FraudCheckModal";
const apiURL = import.meta.env.VITE_REACT_APP_API_URL


const Orders = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState([]); 
  const [selectedOrders, setSelectedOrders] = useState({});
  const [areAllChecked, setAreAllChecked] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [fraudModalOpen, setFraudModalOpen] = useState(null);

  const filterPages = {
    all: "All",
    pending: "Pending",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };

  const filter = searchParams.get("filter") || "all";

  // ✅ Fetch orders
  const fetchOrders = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`${apiURL}/orders/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Failed to fetch orders:", res.status);
        setOrders([]);
        return;
      }

      const data = await res.json();
      console.log("Fetched orders:", data);

      const normalized = Array.isArray(data)
        ? data
        : data.results || data.orders || [];
      setOrders(normalized);
    } catch (err) {
      console.error("Error fetching orders", err);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Filter
  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter(
          (order) =>
            order.status &&
            order.status.toLowerCase() === filter.toLowerCase()
        );

  // ✅ Delete
  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await fetch(`${apiURL}/orders/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete order");

      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (err) {
      console.error("Failed to delete order", err);
    }
  };

  // ✅ Save edit
  const saveEditedOrder = async (id, updatedData) => {
    try {
      const res = await fetch(`${apiURL}/orders/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update order");

      const updatedOrder = await res.json();
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? updatedOrder : order))
      );
      setEditingOrder(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  // ✅ Checkbox
  const isCheckboxChecked = useCallback(
    (order) => !!selectedOrders[order.id],
    [selectedOrders]
  );

  const checkboxOnClick = useCallback((order) => {
    setSelectedOrders((prev) => ({
      ...prev,
      [order.id]: !prev[order.id],
    }));
  }, []);

  useEffect(() => {
    const allSelected =
      filteredOrders.length > 0 &&
      filteredOrders.every((order) => selectedOrders[order.id]);
    setAreAllChecked(allSelected);
  }, [selectedOrders, filteredOrders]);

  useEffect(() => {
    if (!filterPages[filter]) {
      setSearchParams({ filter: "all" });

      return;
    }
  }, [searchParams]);

  return (
    <div className="space-y-4 mx-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">
          {filterPages[filter]} Orders ({filteredOrders.length})
        </h2>
        <Link
          to="/admin/order/create"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-md"
        >
          Create
        </Link>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex flex-wrap gap-2">
          <ActionButton
            icon={<FiMinus />}
            label={"Delete Selected"}
            onClick={() => {
              Object.keys(selectedOrders).forEach((id) => {
                if (selectedOrders[id]) deleteOrder(id);
              });
            }}
            bgColors="bg-red-500 hover:bg-red-600"
          />
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="py-1 px-2 border rounded"
          />
          <ActionButton label={"Search"} />
        </div>
      </div>

      {/* Orders List (manual map) */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="border p-4 rounded-lg shadow-sm bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <Checkbox
                  onClick={() => checkboxOnClick(order)}
                  checked={isCheckboxChecked(order)}
                  showCross={false}
                />
                <span className="ml-2 font-semibold">
                  Order #{order.id} - {order.status}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingOrder(order)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteOrder(order.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>

                <button
                  onClick={() => setFraudModalOpen(order)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Check Fraud Number
                </button>
              </div>
            </div>

            <p><strong>User:</strong> {order.user}</p>
            <p><strong>Phone set by admin:</strong> {order.customer_phone_orderedby_admin || "N/A"}</p>
            <p><strong>Name set by admin:</strong> {order.customer_name_orderedby_admin || "N/A"}</p>
            <p><strong>Shipping Address:</strong> {order.shipping_address}</p>
            <p><strong>Total:</strong> ${order.total_amount}</p>
            <p><strong>Created:</strong> {new Date(order.created_at).toLocaleString()}</p>

            <div className="mt-3">
              <h4 className="font-semibold">Items:</h4>
              <ul className="list-disc pl-5">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.product_variant?.name || "Unnamed Product"} 
                    — Qty: {item.quantity} — Price: ${item.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingOrder && (
        <EditOrderModal
          order={editingOrder}
          onClose={() => setEditingOrder(null)}
          onSave={saveEditedOrder}
        />
      )}

      {/*Fraud check modal*/ }
      {fraudModalOpen && (
        <FraudCheckModal 
          user={fraudModalOpen.user}     
          onClose={() => setFraudModalOpen(false)} />
      )}


      <Outlet />
    </div>
  );
};

export default Orders;






