


import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight,  } from 'react-icons/fa';


import Table from "../../../../components/AdminPanel/Users/Table";

import {useState} from 'react';


const RenderPermissionDetailsRow = (item, index) => {
  
  return (
    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-3 px-3 align-middle">{index + 1}</td>
      <td className="py-3 px-3 align-middle">{item.name}</td>


      <td className="py-3 px-3 flex items-center space-x-2">

        <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md">
          <FaEdit className="text-sm" />
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md">
          <FaTrash className="text-sm" />
        </button>
      </td>
    </tr>
  );
};

const Permissions = () => {
    
    const [current, setCurrent] = useState(1);

    const handleScrolling = (direction, current) =>{
        // implement the logic for pagination here
    }

const usersData = [
    { id: 1, name: 'childcategory-delete' },
    { id: 2, name: 'childcategory-edit' },
    { id: 3, name: 'childcategory-create' },
    { id: 4, name: 'childcategory-list' },
    { id: 5, name: 'subcategory-delete' },
    { id: 6, name: 'subcategory-edit' },
    { id: 7, name: 'subcategory-create' },
    { id: 8, name: 'subcategory-list' },
    { id: 9, name: 'color-delete' },
    { id: 10, name: 'color-edit' },
    { id: 11, name: 'color-create' },
    { id: 12, name: 'color-list' },
    { id: 13, name: 'shipping-delete' },
    { id: 14, name: 'shipping-edit' },
    { id: 15, name: 'shipping-create' },
    { id: 16, name: 'shipping-list' },
    { id: 17, name: 'page-delete' }
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
          <h1 className="text-2xl font-bold text-gray-800">Permissions Manage</h1>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300">
            Create
          </button>
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
            renderRow={RenderPermissionDetailsRow}
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

export default Permissions;
