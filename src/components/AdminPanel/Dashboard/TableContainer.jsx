import { FiMoreVertical } from "react-icons/fi";
import Table from "../../shared/Table/Table";
import { useState } from "react";

const TableContainer = ({ title, columns, data, renderRow }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="shadow-lg rounded-xl overflow-hidden border-0">
        <div className="bg-[#944df7] text-white p-5">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-lg font-semibold text-[#ffde59]">{title}</h4>
            <div className="relative group">
              <button
                className="text-white text-xl cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <FiMoreVertical />
              </button>
              <ul
                className={`absolute right-0 mt-2 ${
                  isMenuOpen ? "block" : "hidden"
                } bg-white text-black shadow-lg text-sm z-10 min-w-[140px]`}
              >
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Edit
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Export
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Action
                </li>
              </ul>
            </div>
          </div>

          <Table columns={columns} data={data} renderRow={renderRow} />
        </div>
      </div>
    </div>
  );
};

export default TableContainer;
