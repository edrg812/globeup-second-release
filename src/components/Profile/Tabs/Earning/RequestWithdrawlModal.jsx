// import { useState } from 'react';
// import { useEffect } from 'react';



// const WithdrawModal = ({ isOpen, onClose, onConfirm }) => {
//   const [amount, setAmount] = useState("");

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
//       <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4">Request Withdrawal</h2>
//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="w-full border rounded px-3 py-2 mb-4"
//           placeholder="Enter amount"
//         />
//         <div className="flex justify-end gap-2">
//           <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
//           <button
//             onClick={() => onConfirm(amount)} // 🔑 send amount back to parent
//             className="px-4 py-2 bg-blue-600 text-white rounded"
//           >
//             Confirm
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default WithdrawModal;


import { useState } from 'react';

const WithdrawModal = ({ isOpen, onClose, onConfirm }) => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(""); // new
  const [accountDetails, setAccountDetails] = useState(""); // new

  if (!isOpen) return null;

  const handleConfirm = () => {
    // Send all three fields back to parent
    onConfirm({ amount, payment_method: paymentMethod, account_details: accountDetails });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Request Withdrawal</h2>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          placeholder="Enter amount (min 500)"
        />

        <input
          type="text"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          placeholder="Payment method (e.g. Bank Transfer)"
        />

        <textarea
          value={accountDetails}
          onChange={(e) => setAccountDetails(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          placeholder="Enter account details"
          rows={3}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
         <button
  onClick={handleConfirm}
  disabled={
    amount === "" || parseInt(amount) < 500 || paymentMethod === "" || accountDetails === ""
  }
  className={`px-4 py-2 rounded ${
    amount === "" || parseInt(amount) < 500 || paymentMethod === "" || accountDetails === ""
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 text-white"
  }`}
>
  Confirm
</button>

        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
