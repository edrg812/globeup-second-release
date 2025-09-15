import axios from "axios";
import React, { useState } from "react";
import { FiUserPlus } from "react-icons/fi";

const BecomeAReseller = () => {

  const handleSubmit = () => {
    const api_base = import.meta.env.VITE_REACT_APP_API_URL;

    axios.post()
  };

  return (
    <main className="max-w-3xl mx-auto p-6 text-center">
      <button
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-md transition"
        aria-label="Apply to become a reseller"
        onClick={handleSubmit}
      >
        <FiUserPlus size={24} />
        Become a Reseller
      </button>
    </main>
  );
};

export default BecomeAReseller;
