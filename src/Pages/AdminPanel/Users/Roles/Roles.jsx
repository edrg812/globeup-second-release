

import {FaEye, FaEdit, FaTrash, FaChevronLeft, FaChevronRight,  } from 'react-icons/fa';


import Table from "../../../../components/AdminPanel/Users/Table";

import {useState} from 'react';
import {Link} from "react-router-dom";



const RenderRolesDetailsRow = (item, index) => {
  
  return (
    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-3 px-3 align-middle">{index + 1}</td>
      <td className="py-3 px-3 align-middle">{item.name}</td>


      <td className="py-3 px-3 flex items-center space-x-2">
        <button className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-md">
           <FaEye className="text-sm" /> 
        </button>
        <Link 
          to={`/admin/users/roles/manage`}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
        >
          <FaEdit className="text-sm" />
        </Link>
        <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md">
          <FaTrash className="text-sm" />
        </button>
      </td>
    </tr>
  );
};

const Roles = () => {
    
    const [current, setCurrent] = useState(1);

    const handleScrolling = (direction, current) =>{
        // implement the logic for pagination here
    }


  const usersData = [
    { id: 1, name: 'Salesman', },
    { id: 2, name: 'Editor' },
    { id: 3, name: 'Admin' },
  ];

  const columns = [ 
    { text: 'SL'},
    { text: 'Name' },
    { text: 'Action' },
  ];


  return (
    <div className="bg-gray-50 font-sans" style={{ backgroundColor: '#f3e8ff' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Roles Manage</h1>
         <Link to="/admin/users/create" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300">
            Create
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
            <div className="flex items-center space-x-2">
              <button className="text-gray-600 hover:text-gray-800 font-medium py-1 px-3 border border-gray-300 rounded-md bg-gray-50">Copy</button>
              <button className="text-gray-600 hover:text-gray-800 font-medium py-1 px-3 border border-gray-300 rounded-md bg-gray-50">Print</button>
              <button className="text-gray-600 hover:text-gray-800 font-medium py-1 px-3 border border-gray-300 rounded-md bg-gray-50">PDF</button>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-gray-600" htmlFor="search">Search:</label>
              <input
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="search"
                type="text"
                placeholder="Search users..."
              />
            </div>
          </div>

          <Table
            columns={columns}
            data={usersData}
            renderRow={RenderRolesDetailsRow}
          />

          <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-2 md:space-y-0">
            <span className="text-gray-600 text-sm">Showing 1 to {usersData.length} of {usersData.length} entries</span>
            <div className="flex items-center space-x-1">
              <button
                onClick = {() => handleScrolling('left', 1)}

              className="text-gray-500 hover:text-gray-700 p-2 rounded-md">
                <FaChevronLeft className="text-lg" />
              </button>
              <button 
              className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm font-medium">{current}</button>
              <button
                onClick = {() => handleScrolling('right', 1)} 
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-md">
                <FaChevronRight className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roles;
