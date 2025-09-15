import React, { useState } from "react";

const PaymentGatewayForm = () => {
  const [bkash, setBkash] = useState({
    username: "",
    appKey: "",
    appSecret: "",
    password: "",
    baseUrl: "",
    status: false,
  });

  const [shurjopay, setShurjopay] = useState({
    username: "",
    prefix: "",
    successUrl: "",
    returnUrl: "",
    baseUrl: "",
    password: "",
    status: false,
  });

  const handleBkashChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBkash((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleShurjopayChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShurjopay((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitBkash = async () => {
    const response = await fetch("/api/payment-gateway/bkash/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"), // CSRF for Django
      },
      body: JSON.stringify(bkash),
    });
    if (response.ok) {
      alert("Bkash settings saved!");
    } else {
      alert("Failed to save Bkash settings.");
    }
  };

  const handleSubmitShurjopay = async () => {
    const response = await fetch("/api/payment-gateway/shurjopay/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"), // CSRF for Django
      },
      body: JSON.stringify(shurjopay),
    });
    if (response.ok) {
      alert("Shurjopay settings saved!");
    } else {
      alert("Failed to save Shurjopay settings.");
    }
  };

  // Helper for CSRF token from Django cookie
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  return (
    <div className="space-y-8">
      {/* Bkash Section */}
      <div className="bg-white shadow p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Bkash</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            name="username"
            placeholder="User Name *"
            className="border p-2 rounded"
            value={bkash.username}
            onChange={handleBkashChange}
          />
          <input
            name="appKey"
            placeholder="App Key *"
            className="border p-2 rounded"
            value={bkash.appKey}
            onChange={handleBkashChange}
          />
          <input
            name="appSecret"
            placeholder="App Secret *"
            className="border p-2 rounded"
            value={bkash.appSecret}
            onChange={handleBkashChange}
          />
          <div className="flex items-center space-x-2">
            <label>Status</label>
            <input
              type="checkbox"
              name="status"
              checked={bkash.status}
              onChange={handleBkashChange}
            />
          </div>
          <input
            name="password"
            placeholder="Password *"
            type="password"
            className="border p-2 rounded"
            value={bkash.password}
            onChange={handleBkashChange}
          />
          <input
            name="baseUrl"
            placeholder="Base Url *"
            className="border p-2 rounded"
            value={bkash.baseUrl}
            onChange={handleBkashChange}
          />
        </div>
        <button
          onClick={handleSubmitBkash}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>

      {/* Shurjopay Section */}
      <div className="bg-white shadow p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Shurjopay</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            name="username"
            placeholder="User Name *"
            className="border p-2 rounded"
            value={shurjopay.username}
            onChange={handleShurjopayChange}
          />
          <input
            name="prefix"
            placeholder="Prefix *"
            className="border p-2 rounded"
            value={shurjopay.prefix}
            onChange={handleShurjopayChange}
          />
          <input
            name="successUrl"
            placeholder="Success Url *"
            className="border p-2 rounded"
            value={shurjopay.successUrl}
            onChange={handleShurjopayChange}
          />
          <input
            name="returnUrl"
            placeholder="Return Url *"
            className="border p-2 rounded"
            value={shurjopay.returnUrl}
            onChange={handleShurjopayChange}
          />
          <input
            name="baseUrl"
            placeholder="Base Url *"
            className="border p-2 rounded"
            value={shurjopay.baseUrl}
            onChange={handleShurjopayChange}
          />
          <div className="flex items-center space-x-2">
            <label>Status</label>
            <input
              type="checkbox"
              name="status"
              checked={shurjopay.status}
              onChange={handleShurjopayChange}
            />
          </div>
          <input
            name="password"
            placeholder="Password *"
            type="password"
            className="border p-2 rounded"
            value={shurjopay.password}
            onChange={handleShurjopayChange}
          />
        </div>
        <button
          onClick={handleSubmitShurjopay}
          className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PaymentGatewayForm;
