import { useState } from "react";
import Checkbox from "../../shared/Checkbox/Checkbox";

const EditForm = ({ label, details }) => {
  const [id, setId] = useState(details.id || "");
  const [status, setStatus] = useState(
    details.status?.toLowerCase() === "active"
  );

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleStatusToggle = () => {
    setStatus((prev) => !prev);
  };

  const handleSubmit = () => {
    const updatedDetails = {
      ...details,
      id: id,
      status: status ? "active" : "inactive",
    };

    console.log("Updated Details:", updatedDetails);
    // You can pass this to a parent handler via props if needed
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-sm">
      <h1 className="mb-4 text-xl font-semibold text-gray-800">Edit {label}</h1>

      <div className="space-y-6">
        {/* Item ID Input */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="Id" className="text-gray-700 font-medium">
            {label} ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={id}
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

export default EditForm;
