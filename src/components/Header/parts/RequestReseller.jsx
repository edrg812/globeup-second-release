import { IoCheckmark, IoArrowForward } from "react-icons/io5";
const apiUrl= import.meta.env.VITE_REACT_APP_API_URL
const RequestReseller = ({ onRequest, onClose }) => {
 const handleSubmit = async () => {
  try {
    const response = await fetch(`${apiUrl}/reseller-supplier-request/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      },
      body: JSON.stringify({
        "is_request": true,
        "request_for": "seller",
        "user-type": "customer",
        // add more fields here
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Application successful:", data);
      alert("Application submitted successfully!");
    } else {
      console.error("Error:", response.statusText);
      alert("Failed to submit application");
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("Something went wrong");
  }
};

  
  return (
    <div className="py-2">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Become a Reseller</h2>
        <p className="text-gray-600 mt-2">
          Join our network of trusted resellers and grow your business
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-blue-800 mb-2">Important Notes:</h3>
        <ul className="text-sm text-blue-700 space-y-2">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              You'll receive access to our reseller portal with exclusive
              resources
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              Approval process takes 3-5 business days after application
              submission
            </span>
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Benefits:</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <IoCheckmark className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-700">Wholesale Pricing</span>
          </div>
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <IoCheckmark className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-700">Marketing Support</span>
          </div>
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <IoCheckmark className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-700">
              Dedicated Account Manager
            </span>
          </div>
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <IoCheckmark className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-700">Early Product Access</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <button
          onClick={onClose}
          className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onRequest();      
            handleSubmit();
          }}
          className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center cursor-pointer"
        >
          Request to Join
          <IoArrowForward className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default RequestReseller;
