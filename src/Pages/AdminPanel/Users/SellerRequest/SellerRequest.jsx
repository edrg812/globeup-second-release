


// import { useEffect } from "react";



// import { MdCheckCircle, MdCancel } from "react-icons/md";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// const apiUrl= import.meta.env.VITE_REACT_APP_API_URL

// import Table from "../../../../components/AdminPanel/Users/Table";

// import {useState} from 'react';
// import {Link} from 'react-router-dom';



// const RenderUserDetailsRow = (item, index) => {
//   const handlePatch = async (id, approve, request_for, user_type) => {
//   try {
//     const payload = {
//       // is_request: approve,
//       // optionally, update request_for or user_type if 
//       "is_request": approve,
//       "request_for": request_for,  // set the new request_for value
//       "user_type": user_type,
//     };

//     const response = await fetch(`${apiUrl}/reseller-supplier-request/${id}/`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(JSON.stringify(errorData));
//     }

//     const updatedData = await response.json();
//     console.log("Request updated:", updatedData);

   
      
//     // // Update local state
//     // setUsersData(prev =>
//     //   prev.map(item => (item.id === id ? updatedData : item))
//     // );
    

//   } catch (error) {
//     console.error("Error updating request:", error);
//   }
// };

//   return (
//     <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
//       <td className="py-3 px-3 align-middle">{index + 1}</td>
//       <td className="py-3 px-3 align-middle">{item.full_name}</td>
//       <td className="py-3 px-3 align-middle">{item.phone_number}</td>
//       <td className="py-3 px-3 align-middle">{item.email}</td>
//       <td className="py-3 px-3 align-middle">{item.request_for}</td>
//       <td className="py-3 px-3 align-middle">{item.user_type}</td>
//       {/* <td className="py-3 px-3 align-middle">{item.is_request}</td> */}
     
//       <td className="py-3 px-3 flex items-center space-x-2">
        
//         <button  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
//     onClick={() => handlePatch(item.id, false, "", "reseller")} // approve
//         >
//           <MdCheckCircle className="text-sm" />
//         </button>
//         <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md"
//     onClick={() => handlePatch(item.id, false, "", "customer")} // reject

//         >
//           <MdCancel className="text-sm" />
//         </button>
//       </td>
//     </tr>
//   );
// };

// const SellerRequest = () => {
    
//     const [current, setCurrent] = useState(1);
//     const [usersData, setUsersData]=useState([])
//     const [loading, setLoading] = useState(true);

//     const handleScrolling = (direction, current) =>{
//         // implement the logic for pagination here
//     }

//   // const usersData = [
//   //   { id: 1, name: 'MD Khaled Masud', phone: "01893476370",  email: 'admin@khaled.com' },
//   //   { id: 2, name: 'Admin', phone: "01314610048", email: 'admin@gmail.com' },
//   // ];

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(`${apiUrl}/user/requested`,{
//           headers:{
//               "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
//               "Content-Type": "application/json",

//           }
//         }); 
//         if (!response.ok) {
//           throw new Error("Failed to fetch users");
//         }
//         const data = await response.json();
//         const filtered = data.results.filter(
//         (user) => user.request_for === "seller"
//       );
//       setUsersData(filtered);
//         // setUsersData(data.results);   // set data from backend
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []); // runs only once when component mounts

//   if (loading) {
//     return <p>Loading users...</p>;
//   }


//   const columns = [ 
//     { text: 'SL'},
//     { text: 'Name' },
//     {text: 'Phone' },
//     { text: 'Email' },
   
//     { text: 'Action' },
//   ];


//   return (
//     <div className="bg-gray-50 font-sans" style={{ backgroundColor: '#f3e8ff' }}>
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">Supplier Requests</h1>
       
//         </div>

//         <div className="bg-white rounded-lg shadow-lg p-6">
          
//           <Table
//             columns={columns}
//             data={usersData}
//             renderRow={RenderUserDetailsRow}
//           />

//           <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-2 md:space-y-0">
//             <span className="text-gray-600 text-sm">Showing 1 to {usersData.length} of {usersData.length} entries</span>
//             <div className="flex items-center space-x-1">
//               <button
//                 onClick = {() => handleScrolling('left', 1)}

//               className="text-gray-500 hover:text-gray-700 p-2 rounded-md">
//                 <FaChevronLeft className="text-lg" />
//               </button>
//               <button 
//               className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm font-medium">{current}</button>
//               <button
//                 onClick = {() => handleScrolling('right', 1)} 
//                     className="text-gray-500 hover:text-gray-700 p-2 rounded-md">
//                 <FaChevronRight className="text-lg" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerRequest;











// import { useEffect, useState } from "react";
// import { MdCheckCircle, MdCancel } from "react-icons/md";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import Table from "../../../../components/AdminPanel/Users/Table";

// const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

// const RenderUserDetailsRow = (item, index, handlePatch) => {
//   return (
//     <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
//       <td className="py-3 px-3 align-middle">{index + 1}</td>
//       <td className="py-3 px-3 align-middle">{item.full_name}</td>
//       <td className="py-3 px-3 align-middle">{item.phone_number}</td>
//       <td className="py-3 px-3 align-middle">{item.email}</td>
//       <td className="py-3 px-3 align-middle">{item.request_for}</td>
//       <td className="py-3 px-3 align-middle">{item.user_type}</td>

//       <td className="py-3 px-3 flex items-center space-x-2">
//         {/* Approve */}
//         <button
//           className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
//           onClick={() => handlePatch(item.id, false, "", "reseller")}
//         >
//           <MdCheckCircle className="text-sm" />
//         </button>
//         {/* Reject */}
//         <button
//           className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md"
//           onClick={() => handlePatch(item.id, false, "", "customer")}
//         >
//           <MdCancel className="text-sm" />
//         </button>
//       </td>
//     </tr>
//   );
// };

// const SellerRequest = () => {
//   const [current, setCurrent] = useState(1);
//   const [usersData, setUsersData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const handleScrolling = (direction, current) => {
//     // implement pagination if needed
//   };

//   const handlePatch = async (id, approve, request_for, user_type) => {
//     try {
//       const payload = {
//         is_request: approve,
//         request_for,
//         user_type,
//       };

//       const response = await fetch(`${apiUrl}/reseller-supplier-request/${id}/`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) throw new Error("Failed to update request");

//       const updatedData = await response.json();
//       console.log("Request updated:", updatedData);

//       // Remove user from state after approve/reject
//       setUsersData((prev) => prev.filter((user) => user.id !== id));
//     } catch (error) {
//       console.error("Error updating request:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(`${apiUrl}/user/requested`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//             "Content-Type": "application/json",
//           },
//         });
//         if (!response.ok) throw new Error("Failed to fetch users");

//         const data = await response.json();
//         const filtered = data.results.filter(
//           (user) => user.request_for === "seller"
//         );
//         setUsersData(filtered);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) return <p>Loading users...</p>;

//   const columns = [
//     { text: "SL" },
//     { text: "Name" },
//     { text: "Phone" },
//     { text: "Email" },
//     { text: "Request For" },
//     { text: "User Type" },
//     { text: "Action" },
//   ];

//   return (
//     <div className="bg-gray-50 font-sans" style={{ backgroundColor: "#f3e8ff" }}>
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">
//             Supplier Requests
//           </h1>
//         </div>

//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <Table
//             columns={columns}
//             data={usersData}
//             renderRow={(item, index) =>
//               RenderUserDetailsRow(item, index, handlePatch)
//             }
//           />

//           <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-2 md:space-y-0">
//             <span className="text-gray-600 text-sm">
//               Showing 1 to {usersData.length} of {usersData.length} entries
//             </span>
//             <div className="flex items-center space-x-1">
//               <button
//                 onClick={() => handleScrolling("left", 1)}
//                 className="text-gray-500 hover:text-gray-700 p-2 rounded-md"
//               >
//                 <FaChevronLeft className="text-lg" />
//               </button>
//               <button className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm font-medium">
//                 {current}
//               </button>
//               <button
//                 onClick={() => handleScrolling("right", 1)}
//                 className="text-gray-500 hover:text-gray-700 p-2 rounded-md"
//               >
//                 <FaChevronRight className="text-lg" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerRequest;







import { useEffect, useState } from "react";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Table from "../../../../components/AdminPanel/Users/Table";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const RenderUserDetailsRow = (item, index, handlePatch) => {
  return (
    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-3 px-3 align-middle">{index + 1}</td>
      <td className="py-3 px-3 align-middle">{item.full_name}</td>
      <td className="py-3 px-3 align-middle">{item.phone_number}</td>
      <td className="py-3 px-3 align-middle">{item.email}</td>
      <td className="py-3 px-3 align-middle">{item.request_for}</td>
      <td className="py-3 px-3 align-middle">{item.user_type}</td>

      <td className="py-3 px-3 flex items-center space-x-2">
        {/* Approve */}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
          onClick={() => handlePatch(item.id, false, "", "reseller", "approved")}
        >
          <MdCheckCircle className="text-sm" />
        </button>
        {/* Reject */}
        <button
          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md"
          onClick={() => handlePatch(item.id, false, "", "customer", "rejected")}
        >
          <MdCancel className="text-sm" />
        </button>
      </td>
    </tr>
  );
};

const SellerRequest = () => {
  const [current, setCurrent] = useState(1);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleScrolling = (direction, current) => {
    // implement pagination if needed
  };

  const handlePatch = async (id, approve, request_for, user_type, action) => {
    try {
      const payload = {
        is_request: approve,
        request_for,
        user_type,
      };

      const response = await fetch(`${apiUrl}/reseller-supplier-request/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to update request");

      const updatedData = await response.json();
      console.log("Request updated:", updatedData);

      // Remove user from state after approve/reject
      setUsersData((prev) => prev.filter((user) => user.id !== id));

      // Show toast notification
      if (action === "approved") {
        toast.success("Request approved successfully ✅");
      } else {
        toast.error("Request rejected ❌");
      }
    } catch (error) {
      console.error("Error updating request:", error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}/user/requested`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        const filtered = data.results.filter(
          (user) => user.request_for === "seller"
        );
        setUsersData(filtered);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users!");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  const columns = [
    { text: "SL" },
    { text: "Name" },
    { text: "Phone" },
    { text: "Email" },
    { text: "Request For" },
    { text: "User Type" },
    { text: "Action" },
  ];

  return (
    <div className="bg-gray-50 font-sans" style={{ backgroundColor: "#f3e8ff" }}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Supplier Requests
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <Table
            columns={columns}
            data={usersData}
            renderRow={(item, index) =>
              RenderUserDetailsRow(item, index, handlePatch)
            }
          />

          <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-2 md:space-y-0">
            <span className="text-gray-600 text-sm">
              Showing 1 to {usersData.length} of {usersData.length} entries
            </span>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handleScrolling("left", 1)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-md"
              >
                <FaChevronLeft className="text-lg" />
              </button>
              <button className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm font-medium">
                {current}
              </button>
              <button
                onClick={() => handleScrolling("right", 1)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-md"
              >
                <FaChevronRight className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SellerRequest;


