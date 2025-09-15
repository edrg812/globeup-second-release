





import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaUserCheck, FaUserSlash } from 'react-icons/fa';


import Table from "../../../components/AdminPanel/IP_Block/Table";

import {useState} from 'react';

import IP_Block_Modal from './IP_Block_Modal';
import IP_Block_Form from "../../../components/AdminPanel/IP_Block/IP_Block_Form";


const RenderIPDetailsRow = (item, index, {onEdit}) => {
  
  return (
    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-3 px-2 align-middle">{index + 1}</td>
      <td className="py-3 px-2 align-middle">{item.ip}</td>
      <td className="py-3 px-2 align-middle">{item.reason}</td>
  
      <td className="py-3 px-2 flex items-center space-x-2">
      
        <button
          onClick= {onEdit}
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md">
          <FaEdit className="text-sm" />
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md">
          <FaTrash className="text-sm" />
        </button>
      </td>
    </tr>
  );
};




const IP_Block = () => {
    
    const [current, setCurrent] = useState(1);

    const handleScrolling = (direction, current) =>{
        // implement the logic for pagination here
    }

  const [isOpen, setIsOpen] = useState(false);
  const [ipData, setIpData] = useState({
    ipNo: '192.168.1.1',
    reason: 'no reason'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIpData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // We have to handle submission logic here,
    console.log('IP data submitted:', ipData);
    setIsOpen(false);
  };


  const allIpData = [
    { id: 1, ip: '192.168.1.1', reason: 'Malicious activity' },
    { id: 2, ip: '192.168.1.2', reason: 'Spamming' },
    { id: 3, ip: '192.168.1.3', reason: 'Unauthorized access' },
  ];

  const columns = [ 
    { text: 'SL'},
    { text: 'IP'},
    { text: 'Reason'},
    { text: 'Action' },
  ];


  return (
    <div className="bg-gray-50 font-sans" style={{ backgroundColor: '#f3e8ff' }}>
      <div className="container mx-auto px-4 py-8">
       <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">IP Block Manage</h1>
        
        </div>
        {isOpen && 
            <IP_Block_Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={handleSubmit}
          ipData={ipData}
          handleChange={handleChange}
        />
        }

        <IP_Block_Form />
        

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
            data={allIpData}
            renderRow={RenderIPDetailsRow}
            onEdit={() => setIsOpen(true)}

          />

          <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-2 md:space-y-0">
            <span className="text-gray-600 text-sm">Showing 1 to {ipData.length} of {ipData.length} entries</span>
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

export default IP_Block;

