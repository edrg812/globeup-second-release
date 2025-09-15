// import React, { useEffect, useState } from "react";

// const CourierAPI = () => {
//   const [couriers, setCouriers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [savingId, setSavingId] = useState(null);
//   const [adding, setAdding] = useState(false);
//   const [newCourier, setNewCourier] = useState({
//     name: "",
//     apiKey: "",
//     secretKey: "",
//     apiUrl: "",
//     token: "",
//     status: "Active",
//     lastSync: "",
//   });
//   const [addingLoading, setAddingLoading] = useState(false);

//   useEffect(() => {
//     fetch("https://your-backend.com/api/couriers")
//       .then((res) => res.json())
//       .then((data) => {
//         setCouriers(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Fetch error:", err);
//         setLoading(false);
//       });
//   }, []);

//   const handleInputChange = (id, field, value) => {
//     setCouriers((prev) =>
//       prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
//     );
//   };

//   const handleSave = async (id) => {
//     const courier = couriers.find((c) => c.id === id);
//     setSavingId(id);
//     try {
//       await fetch(`https://your-backend.com/api/couriers/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(courier),
//       });
//       alert("Saved successfully");
//     } catch (error) {
//       console.error("Save error:", error);
//       alert("Failed to save");
//     } finally {
//       setSavingId(null);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure to delete this courier?")) return;
//     try {
//       await fetch(`https://your-backend.com/api/couriers/${id}`, {
//         method: "DELETE",
//       });
//       setCouriers((prev) => prev.filter((c) => c.id !== id));
//     } catch (error) {
//       console.error("Delete error:", error);
//       alert("Failed to delete");
//     }
//   };

//   const handleNewCourierChange = (field, value) => {
//     setNewCourier((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleAddCourier = async (e) => {
//     e.preventDefault();
//     setAddingLoading(true);
//     try {
//       const res = await fetch("https://your-backend.com/api/couriers", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newCourier),
//       });
//       if (!res.ok) throw new Error("Failed to add courier");
//       const addedCourier = await res.json();
//       setCouriers((prev) => [...prev, addedCourier]);
//       setAdding(false);
//       setNewCourier({
//         name: "",
//         apiKey: "",
//         secretKey: "",
//         apiUrl: "",
//         token: "",
//         status: "Active",
//         lastSync: "",
//       });
//     } catch (error) {
//       console.error("Add courier error:", error);
//       alert("Failed to add courier");
//     } finally {
//       setAddingLoading(false);
//     }
//   };

//   if (loading) return <div className="p-4">Loading...</div>;

//   return (
//     <>
//       <div className="p-4 bg-gray-100 flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Courier API Management</h1>
//         <button
//           onClick={() => setAdding(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
//         >
//           Add Courier API
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="px-4 py-3">SL</th>
//               <th className="px-4 py-3">Courier Name</th>
//               <th className="px-4 py-3">API Key</th>
//               <th className="px-4 py-3">Secret Key</th>
//               <th className="px-4 py-3">API URL</th>
//               <th className="px-4 py-3">Token</th>
//               <th className="px-4 py-3">Status</th>
//               <th className="px-4 py-3">Last Sync</th>
//               <th className="px-4 py-3">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {couriers.map((courier, idx) => (
//               <tr key={courier.id} className="border-b">
//                 <td className="px-4 py-2">{idx + 1}</td>
//                 <td className="px-4 py-2">{courier.name}</td>
//                 <td className="px-4 py-2">
//                   <input
//                     type="text"
//                     value={courier.apiKey}
//                     onChange={(e) =>
//                       handleInputChange(courier.id, "apiKey", e.target.value)
//                     }
//                     className="border rounded px-2 py-1 w-full"
//                   />
//                 </td>
//                 <td className="px-4 py-2">
//                   <input
//                     type="text"
//                     value={courier.secretKey}
//                     onChange={(e) =>
//                       handleInputChange(courier.id, "secretKey", e.target.value)
//                     }
//                     className="border rounded px-2 py-1 w-full"
//                   />
//                 </td>
//                 <td className="px-4 py-2">
//                   <input
//                     type="text"
//                     value={courier.apiUrl}
//                     onChange={(e) =>
//                       handleInputChange(courier.id, "apiUrl", e.target.value)
//                     }
//                     className="border rounded px-2 py-1 w-full"
//                   />
//                 </td>
//                 <td className="px-4 py-2">
//                   <input
//                     type="text"
//                     value={courier.token}
//                     onChange={(e) =>
//                       handleInputChange(courier.id, "token", e.target.value)
//                     }
//                     className="border rounded px-2 py-1 w-full"
//                   />
//                 </td>
//                 <td className="px-4 py-2">
//                   <select
//                     value={courier.status}
//                     onChange={(e) =>
//                       handleInputChange(courier.id, "status", e.target.value)
//                     }
//                     className="border rounded px-2 py-1 w-full"
//                   >
//                     <option value="Active">Active</option>
//                     <option value="Inactive">Inactive</option>
//                   </select>
//                 </td>
//                 <td className="px-4 py-2">{courier.lastSync}</td>
//                 <td className="px-4 py-2">
//                   <div className="flex gap-2">
//                     <button
//                       disabled={savingId === courier.id}
//                       onClick={() => handleSave(courier.id)}
//                       className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:opacity-50"
//                     >
//                       {savingId === courier.id ? "Saving..." : "Save"}
//                     </button>
//                     <button
//                       onClick={() => handleDelete(courier.id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}

//             {couriers.length === 0 && (
//               <tr>
//                 <td
//                   colSpan="9"
//                   className="px-4 py-3 text-center text-gray-500"
//                 >
//                   No couriers found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Courier Modal */}
//       {adding && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
//             <h2 className="text-xl font-bold mb-4">Add Courier API</h2>
//             <form onSubmit={handleAddCourier} className="space-y-4">
//               <div>
//                 <label className="block font-medium mb-1">Courier Name</label>
//                 <input
//                   type="text"
//                   required
//                   value={newCourier.name}
//                   onChange={(e) => handleNewCourierChange("name", e.target.value)}
//                   className="border rounded px-3 py-2 w-full"
//                 />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">API Key</label>
//                 <input
//                   type="text"
//                   required
//                   value={newCourier.apiKey}
//                   onChange={(e) => handleNewCourierChange("apiKey", e.target.value)}
//                   className="border rounded px-3 py-2 w-full"
//                 />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Secret Key</label>
//                 <input
//                   type="text"
//                   required
//                   value={newCourier.secretKey}
//                   onChange={(e) =>
//                     handleNewCourierChange("secretKey", e.target.value)
//                   }
//                   className="border rounded px-3 py-2 w-full"
//                 />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">API URL</label>
//                 <input
//                   type="url"
//                   required
//                   value={newCourier.apiUrl}
//                   onChange={(e) => handleNewCourierChange("apiUrl", e.target.value)}
//                   className="border rounded px-3 py-2 w-full"
//                 />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Token</label>
//                 <input
//                   type="text"
//                   value={newCourier.token}
//                   onChange={(e) => handleNewCourierChange("token", e.target.value)}
//                   className="border rounded px-3 py-2 w-full"
//                 />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Status</label>
//                 <select
//                   value={newCourier.status}
//                   onChange={(e) => handleNewCourierChange("status", e.target.value)}
//                   className="border rounded px-3 py-2 w-full"
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Last Sync</label>
//                 <input
//                   type="datetime-local"
//                   value={newCourier.lastSync}
//                   onChange={(e) => handleNewCourierChange("lastSync", e.target.value)}
//                   className="border rounded px-3 py-2 w-full"
//                 />
//               </div>

//               <div className="flex justify-end gap-4 mt-6">
//                 <button
//                   type="button"
//                   onClick={() => setAdding(false)}
//                   className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
//                   disabled={addingLoading}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//                   disabled={addingLoading}
//                 >
//                   {addingLoading ? "Saving..." : "Save"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CourierAPI;




import React, { useState } from "react";

export default function CourierAPI() {
  const [steadfast, setSteadfast] = useState({
    apiKey: "jsteoamsskhoyblujdzn3rcrprmiglb",
    secretKey: "emwhjknpuoutuw2e05acr07h7",
    url: "https://portal.packzy.com/api/v1",
    status: true,
  });

  const [pathao, setPathao] = useState({
    url: "https://api-hermes.5556856pathao.com/aladdin",
    token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImp0aSI6IjYxNzVkOWQyODAwNjk2YzU4Y2E1MmZkMGQ5Y2RiZWR",
    status: true,
  });

  const handleSteadfastChange = (e) => {
    const { name, value } = e.target;
    setSteadfast((prev) => ({ ...prev, [name]: value }));
  };

  const handlePathaoChange = (e) => {
    const { name, value } = e.target;
    setPathao((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSteadfast = () => {
    setSteadfast((prev) => ({ ...prev, status: !prev.status }));
  };

  const togglePathao = () => {
    setPathao((prev) => ({ ...prev, status: !prev.status }));
  };

  const submitSteadfast = (e) => {
    e.preventDefault();
    console.log("Steadfast Courier:", steadfast);
    // fetch("/api/steadfast", { method: "POST", body: JSON.stringify(steadfast) })
  };

  const submitPathao = (e) => {
    e.preventDefault();
    console.log("Pathao Courier:", pathao);
    // fetch("/api/pathao", { method: "POST", body: JSON.stringify(pathao) })
  };

  const ToggleSwitch = ({ on, toggle }) => (
    <button
      type="button"
      onClick={toggle}
      className={`w-12 h-6 rounded-full flex items-center transition-colors ${
        on ? "bg-blue-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
          on ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 p-8 space-y-10">
      {/* Steadfast Courier */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Steadfast Courier</h2>
        <form onSubmit={submitSteadfast} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">API key *</label>
            <input
              type="text"
              name="apiKey"
              value={steadfast.apiKey}
              onChange={handleSteadfastChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Secret key *</label>
            <input
              type="text"
              name="secretKey"
              value={steadfast.secretKey}
              onChange={handleSteadfastChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">URL *</label>
            <input
              type="text"
              name="url"
              value={steadfast.url}
              onChange={handleSteadfastChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <span>Status</span>
            <ToggleSwitch on={steadfast.status} toggle={toggleSteadfast} />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Pathao Courier */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Pathao Courier</h2>
        <form onSubmit={submitPathao} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">URL *</label>
            <input
              type="text"
              name="url"
              value={pathao.url}
              onChange={handlePathaoChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Token *</label>
            <input
              type="text"
              name="token"
              value={pathao.token}
              onChange={handlePathaoChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <span>Status</span>
            <ToggleSwitch on={pathao.status} toggle={togglePathao} />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

















