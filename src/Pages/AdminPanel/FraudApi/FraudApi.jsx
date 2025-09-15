

// import { useState } from 'react';
// import {FaLock, FaShippingFast} from "react-icons/fa";
// import { MdHeadsetMic } from "react-icons/md";
// import { useNavigate } from 'react-router-dom';

// const FraudAPI = () => {
//   const [apis, setApis] = useState([
//     {
//       id: 1,
//       type: 'free',
//       url: 'https://bdcourier.com/api/courier-check',
//       key: '',
//       active: false
//     },
//     {
//       id: 2,
//       type: 'Paid',
//       url: 'https://bdcourier.com/api/pro/courier-check',
//       key: '',
//       active: true
//     }
//   ]);

//   const handleApiKeyChange = (id, value) => {
//     setApis(apis.map(api => 
//       api.id === id ? { ...api, key: value } : api
//     ));
//   };

//   const handleActiveChange = (id) => {
//     setApis(apis.map(api => ({
//       ...api,
//       active: api.id === id
//     })));
//   };

//   const handleSave = () => {
//     // Logic to save the API keys and active status
   
    
//   };

//   const navigate = useNavigate();

//   return (
//     <div className="bg-purple-50 min-h-screen p-4 md:p-8">
//       <div className="container mx-auto">
//         <div className="flex items-center mb-6 md:mb-8">
//           <span className="material-icons text-yellow-500 text-3xl mr-3"><FaLock /></span>
//           <h1 className="text-xl md:text-2xl font-bold text-gray-800">Manage Fraud APIs</h1>
//         </div>
        
//         <div className="bg-white rounded-lg shadow-md p-4 md:p-6 overflow-x-auto">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="bg-purple-100">
//                 <th className="p-3 md:p-4 rounded-tl-lg">#</th>
//                 <th className="p-3 md:p-4">Type</th>
//                 <th className="p-3 md:p-4">API URL</th>
//                 <th className="p-3 md:p-4">API Key</th>
//                 <th className="p-3 md:p-4 rounded-tr-lg">Active</th>
//               </tr>
//             </thead>
//             <tbody>
//               {apis.map((api) => (
//                 <tr key={api.id} className="border-b border-gray-200">
//                   <td className="p-3 md:p-4">{api.id}</td>
//                   <td className="p-3 md:p-4">
//                     <span className={`${api.type === 'free' ? 'bg-blue-200 text-blue-800' : 'bg-indigo-200 text-indigo-800'} text-sm font-medium px-2.5 py-0.5 rounded`}>
//                       {api.type}
//                     </span>
//                   </td>
//                   <td className="p-3 md:p-4">
//                     <input 
//                       className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" 
//                       type="text" 
//                       value={api.url}
//                       readOnly
//                     />
//                   </td>
//                   <td className="p-3 md:p-4">
//                     <input 
//                       className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" 
//                       type="text"
//                       value={api.key}
//                       onChange={(e) => handleApiKeyChange(api.id, e.target.value)}
//                       placeholder="Enter API key"
//                     />
//                   </td>
//                   <td className="p-3 md:p-4">
//                     <input 
//                       className="form-radio h-5 w-5"
//                       name="active_api" 
//                       type="radio"
//                       checked={api.active}
//                       onChange={() => handleActiveChange(api.id)}
//                       style={{ color: api.active ? '#9333ea' : '#9ca3af' }}
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
          
//           <div className="flex justify-end mt-4 md:mt-6">
//             <button 
//               className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md flex items-center"
//               onClick={handleSave}
//             >
//               <span className="material-icons mr-2">save</span>
//               Save Changes
//             </button>
//           </div>
//         </div>
        
//         <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 md:mt-12">
//           <button
//             onClick={() => window.open("https://bdcourier.com/", "_blank", "noopener,noreferrer")}

//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-full flex items-center justify-center">
//             <span className="material-icons mr-2"><FaShippingFast/></span>
//             Buy API Key
//           </button>
//           <button 
//             onClick={() => window.open("https://github.com/dev-morsalin-islam", "_blank", "noopener,noreferrer")}
//             className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-full flex items-center justify-center">
//             <span className="material-icons mr-2"><MdHeadsetMic/></span>
//             Developer Support
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FraudAPI;



import { useState, useEffect } from 'react';
import axios from "axios";
import { FaLock, FaShippingFast } from "react-icons/fa";
import { MdHeadsetMic } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const FraudAPI = () => {
  const [apis, setApis] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch data from backend when component loads
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/fraud-apis/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`, // if JWT auth
      }
    })
    .then(res => setApis(res.data))
    .catch(err => console.error(err));
  }, []);

  const handleApiKeyChange = (id, value) => {
    setApis(apis.map(api => 
      api.id === id ? { ...api, api_key: value } : api
    ));
  };

  const handleActiveChange = (id) => {
    setApis(apis.map(api => ({
      ...api,
      active: api.id === id
    })));
  };

  // ✅ Save data to backend
  const handleSave = () => {
    apis.forEach(api => {
      axios.put(`http://127.0.0.1:8000/fraud-apis/${api.id}/`, api, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        }
      })
      .then(res => console.log("Updated:", res.data))
      .catch(err => console.error("Update error:", err));
    });
    alert("Changes saved ✅");
  };

  return (
    <div className="bg-purple-50 min-h-screen p-4 md:p-8">
      <div className="container mx-auto">
        <div className="flex items-center mb-6 md:mb-8">
          <span className="material-icons text-yellow-500 text-3xl mr-3"><FaLock /></span>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Manage Fraud APIs</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-purple-100">
                <th className="p-3 md:p-4 rounded-tl-lg">#</th>
                <th className="p-3 md:p-4">Type</th>
                <th className="p-3 md:p-4">API URL</th>
                <th className="p-3 md:p-4">API Key</th>
                <th className="p-3 md:p-4 rounded-tr-lg">Active</th>
              </tr>
            </thead>
            <tbody>
              {apis.map((api) => (
                <tr key={api.id} className="border-b border-gray-200">
                  <td className="p-3 md:p-4">{api.id}</td>
                  <td className="p-3 md:p-4">
                    <span className={`${api.type === 'ip' ? 'bg-blue-200 text-blue-800' : 'bg-indigo-200 text-indigo-800'} text-sm font-medium px-2.5 py-0.5 rounded`}>
                      {api.type}
                    </span>
                  </td>
                  <td className="p-3 md:p-4">
                    <input 
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" 
                      type="text" 
                      value={api.api_url}
                      readOnly
                    />
                  </td>
                  <td className="p-3 md:p-4">
                    <input 
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" 
                      type="text"
                      value={api.api_key || ""}
                      onChange={(e) => handleApiKeyChange(api.id, e.target.value)}
                      placeholder="Enter API key"
                    />
                  </td>
                  <td className="p-3 md:p-4">
                    <input 
                      className="form-radio h-5 w-5"
                      name="active_api" 
                      type="radio"
                      checked={api.active || false}
                      onChange={() => handleActiveChange(api.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="flex justify-end mt-4 md:mt-6">
            <button 
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md flex items-center"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 md:mt-12">
          <button
            onClick={() => window.open("https://bdcourier.com/", "_blank", "noopener,noreferrer")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-full flex items-center justify-center">
            <FaShippingFast className="mr-2"/> Buy API Key
          </button>
          <button 
            onClick={() => window.open("https://github.com/dev-morsalin-islam", "_blank", "noopener,noreferrer")}
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-full flex items-center justify-center">
            <MdHeadsetMic className="mr-2"/> Developer Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FraudAPI;
