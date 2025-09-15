import React, { useState } from "react";

export default function SmsGatewayForm() {
  const [formData, setFormData] = useState({
    url: "https://msg.elitbuzz-bd.com/smsapi",
    apiKey: "C2008990663d9f8aae39e5.35450824",
    senderId: "8809601011625",
    status: true,
    orderConfirm: true,
    forgotPassword: true,
    passwordGenerator: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (field) => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You can replace console.log with API POST request
    // fetch("/api/smsgateway", { method: "POST", body: JSON.stringify(formData) })
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">SMS Gateway</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* URL */}
          <div>
            <label className="block text-sm font-medium mb-1">URL *</label>
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          {/* API Key */}
          <div>
            <label className="block text-sm font-medium mb-1">API Key *</label>
            <input
              type="text"
              name="apiKey"
              value={formData.apiKey}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          {/* Sender ID */}
          <div>
            <label className="block text-sm font-medium mb-1">Sender ID *</label>
            <input
              type="text"
              name="senderId"
              value={formData.senderId}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-6">
            {[
              { label: "Status", field: "status" },
              { label: "Order confirm", field: "orderConfirm" },
              { label: "Forgot password", field: "forgotPassword" },
              { label: "Password Generator", field: "passwordGenerator" },
            ].map(({ label, field }) => (
              <div key={field} className="flex items-center space-x-2">
                <span>{label}</span>
                <button
                  type="button"
                  onClick={() => handleToggle(field)}
                  className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                    formData[field] ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                      formData[field] ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}



