import { useState } from "react";
import Checkbox from "../../../shared/Checkbox/Checkbox";

const BannerCategoryEditForm = ({ details }) => {
  const [name, setName] = useState(details.name || "");
  const [status, setStatus] = useState(
    details.status?.toLowerCase() === "active"
  );

  const handleIdChange = (e) => {
    setName(e.target.value);
  };

  const handleStatusToggle = () => {
    setStatus((prev) => !prev);
  };

  const handleSubmit = () => {
    const updatedDetails = {
      ...details,
      name: name,
      status: status ? "active" : "inactive",
    };

    console.log("Updated Details:", updatedDetails);
    // You can pass this to a parent handler via props if needed
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-sm">
      <h1 className="mb-4 text-xl font-semibold text-gray-800">
        Edit Banner Category
      </h1>

      <div className="space-y-6">
        {/* Name Input */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="name" className="text-gray-700 font-medium">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={handleIdChange}
            placeholder="Type your Tag ID"
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1abc9c]"
            required
          />
        </div>

        {/* Status Checkbox */}
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={status}
            onClick={handleStatusToggle}
            showCross={false}
          />
          <label className="text-gray-700">Active Status</label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            className="w-full bg-[#1abc9c] hover:bg-[#16a085] text-white py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerCategoryEditForm;
