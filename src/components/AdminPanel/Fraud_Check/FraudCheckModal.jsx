// import { useEffect, useState } from "react";

// const FraudCheckModal = ({ onClose }) => {
//   const [fraudData, setFraudData] = useState(null);

//   useEffect(() => {
//     const fetchFraudData = async () => {
//       try {
//         const token = localStorage.getItem("access_token");
//         const res = await fetch("http://localhost:8000/fraud-apis/", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token ? `Bearer ${token}` : "",
//           },
//         });

//         if (!res.ok) throw new Error("Failed to fetch fraud API data");

//         const data = await res.json();
//         console.log("Fraud APIs:", data);
//         setFraudData(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchFraudData();
//   }, []);

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] relative">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
//         >
//           ✖
//         </button>

//         <h2 className="text-xl font-bold mb-4">Courier Fraud Check</h2>

//         {!fraudData ? (
//           <p>Loading...</p>
//         ) : (
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border px-3 py-2">Courier</th>
//                 <th className="border px-3 py-2">Total</th>
//                 <th className="border px-3 py-2">Success</th>
//                 <th className="border px-3 py-2">Cancel</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* Example static structure – replace with API courierData later */}
//               <tr>
//                 <td className="border px-3 py-2">Pathao</td>
//                 <td className="border px-3 py-2">0</td>
//                 <td className="border px-3 py-2">0</td>
//                 <td className="border px-3 py-2">0</td>
//               </tr>
//               <tr>
//                 <td className="border px-3 py-2">SteadFast</td>
//                 <td className="border px-3 py-2">2</td>
//                 <td className="border px-3 py-2">2</td>
//                 <td className="border px-3 py-2">0</td>
//               </tr>
//               {/* You can map API response here */}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FraudCheckModal;





// import { useEffect, useState } from "react";

// const FraudCheckModal = ({ onClose }) => {
//   const [courierData, setCourierData] = useState(null);

//   useEffect(() => {
//     const fetchFraudData = async () => {
//       try {
//         const token = localStorage.getItem("access_token");
//         const res = await fetch("http://localhost:8000/fraud-apis/", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token ? `Bearer ${token}` : "",
//           },
//         });

//         if (!res.ok) throw new Error("Failed to fetch fraud API data");

//         const data = await res.json();
//         console.log("Fraud APIs:", data);

//         // Example: pick courierData directly if backend response matches your JSON
//         if (data.courierData) {
//           setCourierData(data.courierData);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchFraudData();
//   }, []);

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-[650px] relative">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
//         >
//           ✖
//         </button>

//         <h2 className="text-xl font-bold mb-4">Courier Fraud Check</h2>

//         {!courierData ? (
//           <p>Loading...</p>
//         ) : (
//           <table className="w-full border-collapse border border-gray-300 text-center">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border px-3 py-2">Courier</th>
//                 <th className="border px-3 py-2">Total</th>
//                 <th className="border px-3 py-2">Success</th>
//                 <th className="border px-3 py-2">Cancel</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.entries(courierData)
//                 .filter(([key]) => key !== "summary") // skip summary row
//                 .map(([key, courier]) => (
//                   <tr key={key}>
//                     <td className="border px-3 py-2">{courier.name}</td>
//                     <td className="border px-3 py-2">{courier.total_parcel}</td>
//                     <td className="border px-3 py-2">{courier.success_parcel}</td>
//                     <td className="border px-3 py-2">{courier.cancelled_parcel}</td>
//                   </tr>
//                 ))}

//               {/* ✅ Summary row */}
//               <tr className="bg-gray-100 font-semibold">
//                 <td className="border px-3 py-2">Total</td>
//                 <td className="border px-3 py-2">{courierData.summary.total_parcel}</td>
//                 <td className="border px-3 py-2">{courierData.summary.success_parcel}</td>
//                 <td className="border px-3 py-2">{courierData.summary.cancelled_parcel}</td>
//               </tr>
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FraudCheckModal;



import { useEffect, useState } from "react";

const FraudCheckModal = ({ onClose, user }) => {
  const [courierData, setCourierData] = useState(null);

  useEffect(() => {
    const fetchFraudData = async () => {
      try {
        // 1️⃣ Get fraud API credentials from your backend
        const res = await fetch("http://localhost:8000/fraud-apis/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          },
          
        });

        if (!res.ok) throw new Error("Failed to fetch fraud API list");

        const apis = await res.json();
        if (!apis.length) throw new Error("No fraud APIs configured");

        const { api_url, api_key } = apis[0]; // use first one for now

        // 2️⃣ Call external courier-check API with api_key
        const courierRes = await fetch(api_url, {
          method: "POST", // or POST if required
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${api_key}`, // using api_key instead of access_token
          },
          body:JSON.stringify({
            phone: user, // user is already a phone number passed from parent
          }),
        });

        if (!courierRes.ok) throw new Error("Failed to fetch courier data");

        const courierJson = await courierRes.json();
        console.log("Courier Data:", courierJson);

        if (courierJson.courierData) {
          setCourierData(courierJson.courierData);
        } else {
          throw new Error("No courierData found in API response");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchFraudData();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[650px] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4">Courier Fraud Check</h2>

        {!courierData ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2">Courier</th>
                <th className="border px-3 py-2">Total</th>
                <th className="border px-3 py-2">Success</th>
                <th className="border px-3 py-2">Cancel</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(courierData)
                .filter(([key]) => key !== "summary")
                .map(([key, courier]) => (
                  <tr key={key}>
                    <td className="border px-3 py-2">{courier.name}</td>
                    <td className="border px-3 py-2">{courier.total_parcel}</td>
                    <td className="border px-3 py-2">{courier.success_parcel}</td>
                    <td className="border px-3 py-2">{courier.cancelled_parcel}</td>
                  </tr>
                ))}

              {/* Summary row */}
              {courierData.summary && (
                <tr className="bg-gray-100 font-semibold">
                  <td className="border px-3 py-2">Total</td>
                  <td className="border px-3 py-2">{courierData.summary.total_parcel}</td>
                  <td className="border px-3 py-2">{courierData.summary.success_parcel}</td>
                  <td className="border px-3 py-2">{courierData.summary.cancelled_parcel}</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FraudCheckModal;
