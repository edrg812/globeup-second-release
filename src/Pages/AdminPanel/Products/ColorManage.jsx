
// import React from 'react';

// const ColorManage = () => {
//   return (
//     <div>
//       {/* Top Navbar */}
//       <nav className="sticky top-0 bg-white p-4 flex justify-between items-center border-b z-10">
//         <h1 className="text-2xl font-bold">
//           Color Management
//         </h1>
//         <button
//           className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//         >
//           Create
//         </button>
//       </nav>

//       {/* Table Wrapper */}
//       <div className="overflow-x-auto">
//         <table className="w-full table-fixed border-collapse">
//           <thead className="bg-gray-100 sticky top-0 z-10">
//             <tr style={{ height: '70px' }}>
//               <th className="w-16 px-4 py-2 text-left">SL</th>
//               <th className="w-32 px-4 py-2 text-left">Color Name</th>
//               <th className="w-24 px-4 py-2 text-left">Status</th>
//               <th className="w-40 px-4 py-2 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody>

//            <tr style={{ backgroundColor: '#fff', height: '50px' }}>
//               <td className="w-16 px-4 py-2 text-left">1</td>
//               <td className="w-32 px-4 py-2 text-left">Color Name</td>
//               <td className="w-24 px-4 py-2 text-left">active</td>
//               <td className="w-40 px-4 py-2 text-left"><button>Change Status</button><button>Delete</button></td>
//             </tr>
//            <tr style={{ backgroundColor: '#fff', height: '70px' }}>
//               <td className="w-16 px-4 py-2 text-left">2</td>
//               <td className="w-32 px-4 py-2 text-left">aqua</td>
//               <td className="w-24 px-4 py-2 text-left">inactive</td>
//               <td className="w-40 px-4 py-2 text-left"><button>Change Status</button><button>Delete</button></td>
//             </tr>
//            <tr style={{ backgroundColor: '#fff', height: '70px' }}>
//               <td className="w-16 px-4 py-2 text-left">3</td>
//               <td className="w-32 px-4 py-2 text-left">aqua</td>
//               <td className="w-24 px-4 py-2 text-left">active</td>
//               <td className="w-40 px-4 py-2 text-left">Action</td>
//             </tr>
//            <tr style={{ backgroundColor: '#ffffffff', height: '70px' }}>
//               <td className="w-16 px-4 py-2 text-left">4</td>
//               <td className="w-32 px-4 py-2 text-left">aqua</td>
//               <td className="w-24 px-4 py-2 text-left">active</td>
//               <td className="w-40 px-4 py-2 text-left"><button>Change Status</button><button>Delete</button></td>
//             </tr>
//            <tr style={{ backgroundColor: '#ffffffff', height: '70px' }}>
//               <td className="w-16 px-4 py-2 text-left">5</td>
//               <td className="w-32 px-4 py-2 text-left">red</td>
//               <td className="w-24 px-4 py-2 text-left">inactive</td>
//               <td className="w-40 px-4 py-2 text-left"><button>Change Status</button><button>Delete</button></td>
//             </tr>
//            <tr style={{ backgroundColor: '#ffffffff', height: '70px' }}>
//               <td className="w-16 px-4 py-2 text-left">6</td>
//               <td className="w-32 px-4 py-2 text-left">blue</td>
//               <td className="w-24 px-4 py-2 text-left">active</td>
//               <td className="w-40 px-4 py-2 text-left"><button>Change Status</button><button>Delete</button></td>
//             </tr>
//            <tr style={{ backgroundColor: '#ffffffff', height: '70px' }}>
//               <td className="w-16 px-4 py-2 text-left">7</td>
//               <td className="w-32 px-4 py-2 text-left">aqua</td>
//               <td className="w-24 px-4 py-2 text-left">active</td>
//               <td className="w-40 px-4 py-2 text-left"><button>Change Status</button><button>Delete</button></td>
//             </tr>
//            <tr style={{ backgroundColor: '#ffffffff', height: '70px' }}>
//               <td className="w-16 px-4 py-2 text-left">8</td>
//               <td className="w-32 px-4 py-2 text-left">aqua</td>
//               <td className="w-24 px-4 py-2 text-left">active</td>
//               <td className="w-40 px-4 py-2 text-left"><button>Change Status</button><button>Delete</button></td>
//             </tr>
//            <tr style={{ backgroundColor: '#ffffffff', height: '70px' }}>
//               <td className="w-16 px-4 py-2 text-left">9</td>
//               <td className="w-32 px-4 py-2 text-left">aqua</td>
//               <td className="w-24 px-4 py-2 text-left">active</td>
//               <td className="w-40 px-4 py-2 text-left"><button>Change Status</button><button>Delete</button></td>
//             </tr>
//            <tr style={{ backgroundColor: '#ffffffff', height: '70px' }}>
//               <td className="w-16 px-4 py-2 text-left">10</td>
//               <td className="w-32 px-4 py-2 text-left">aqua</td>
//               <td className="w-24 px-4 py-2 text-left">active</td>
//               <td className="w-40 px-4 py-2 text-left"><button>Change Status</button><button>Delete</button></td>
//             </tr>
            

//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ColorManage;





import React, { useEffect, useState } from "react";
import axios from "axios";

const ColorManage = () => {
  const [colors, setColors] = useState([]);

  // Fetch data
  const fetchColors = async () => {
    try {
      // Dummy data for now
      const data = [
        { id: 1, name: "Red", status: "active" },
        { id: 2, name: "Aqua", status: "inactive" },
        { id: 3, name: "Blue", status: "active" },
        { id: 4, name: "Green", status: "inactive" },
      ];
      // If using backend:
      // const res = await axios.get("/api/colors");
      // setColors(res.data);
      setColors(data);
    } catch (err) {
      console.error("Error fetching colors:", err);
    }
  };

  useEffect(() => {
    fetchColors();
  }, []);

  // Change status
  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    try {
      // Backend update
      // await axios.put(`/api/colors/${id}`, { status: newStatus });

      // Update UI instantly
      setColors((prev) =>
        prev.map((color) =>
          color.id === id ? { ...color, status: newStatus } : color
        )
      );

      // Reload data from backend
      // fetchColors();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Delete row
  const handleDelete = async (id) => {
    try {
      // Backend delete
      // await axios.delete(`/api/colors/${id}`);

      // Update UI instantly
      setColors((prev) => prev.filter((color) => color.id !== id));

      // Reload from backend
      // fetchColors();
    } catch (err) {
      console.error("Error deleting color:", err);
    }
  };

  return (
    <div>
      {/* Top Navbar */}
      <nav className="sticky top-0 bg-white p-4 flex justify-between items-center border-b z-10">
        <h1 className="text-2xl font-bold">Color Management</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700">
          Create
        </button>
      </nav>

      {/* Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr style={{ height: "70px" }}>
              <th className="w-16 px-4 py-2 text-left">SL</th>
              <th className="w-32 px-4 py-2 text-left">Color Name</th>
              <th className="w-24 px-4 py-2 text-left">Status</th>
              <th className="w-40 px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {colors.map((color, index) => (
              <tr key={color.id} style={{ backgroundColor: "#fff" }}>
                <td className="w-16 px-4 py-2">{index + 1}</td>
                <td className="w-32 px-4 py-2">{color.name}</td>
                <td className="w-24 px-4 py-2">{color.status}</td>
                <td className="w-40 px-4 py-2 space-x-2">
                  <button
                    onClick={() =>
                      handleToggleStatus(color.id, color.status)
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                  >
                    Change Status
                  </button>
                  <button
                    onClick={() => handleDelete(color.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {colors.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No colors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ColorManage;








