// import React from "react";
// import Table from "../../../components/shared/Table/Table";
// import TableRow from "../../../components/shared/Table/TableRow";
// import { FaEdit, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

// const ChildCategories = () => {
//   const columns = ["SL", "Category", "Name", "Status", "Action"];

//   // Mock subcategory data (replace with API data)
//   const data = [
//     {
//       id: 1,
//       category: "Women Bags",
//       name: "demo",
//       status: "Active",
//     },
//   ];

//   const renderRow = (item, index) => (
//     <TableRow
//       key={item.id}
//       cells={[
//         index + 1,
//         item.category,
//         item.name,
//         <span
//           className={`px-2 py-1 text-xs rounded ${
//             item.status === "Active"
//               ? "bg-green-100 text-green-700"
//               : "bg-red-100 text-red-700"
//           }`}
//         >
//           {item.status}
//         </span>,
//         <div className="flex justify-center gap-2">
//           {item.status === "Active" ? (
//             <button className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded">
//               <FaThumbsDown />
//             </button>
//           ) : (
//             <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded">
//               <FaThumbsUp />
//             </button>
//           )}
//           <button className="bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded">
//             <FaEdit />
//           </button>
//         </div>,
//       ]}
//     />
//   );

//   return <Table columns={columns} data={data} renderRow={renderRow} />;
// };

// export default ChildCategories;



// upor er code dorkar nai






import React from "react";
import Table from "../../../components/shared/Table/Table";
import TableRow from "../../../components/shared/Table/TableRow";
import {Link} from "react-router-dom";
import {FaEdit, FaThumbsUp, FaThumbsDown} from "react-icons/fa";


const ChildCategoryTable = () => {
  const columns = ["SL", "Name", "Image", "Status", "Action"];

  // Mock category data (replace with API data later)
  const data = [
    {
      id: 1,
      name: "PHPX.SHOP",
      image: "/images/phpex.png",
      status: "Inactive",
    },
    {
      id: 2,
      name: "Accessories",
      image: "/images/accessories.png",
      status: "Active",
    },
    {
      id: 3,
      name: "Makeup",
      image: "/images/makeup.png",
      status: "Active",
    },
    {
      id: 4,
      name: "Undergarments",
      image: "/images/undergarments.png",
      status: "Active",
    },
    {
      id: 5,
      name: "Kitchen item",
      image: "/images/kitchen.png",
      status: "Active",
    },
  ];

  const renderRow = (item, index) => (
    <TableRow
      key={item.id}
      cells={[
        index + 1,
        item.name,
        <img src={item.image} alt={item.name} className="w-8 h-8 mx-auto" />,
        <span
          className={`px-2 py-1 text-xs rounded ${
            item.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {item.status}
        </span>,
        <div className="flex justify-center gap-2">
          {item.status === "Inactive" ? (
            <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded">
              <FaThumbsUp />
            </button>
          ) : (
            <button className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded">
              <FaThumbsDown />
            </button>
          )}
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded">
            <Link to={`/admin/products/child-categories/edit/${1000}`}>
              <FaEdit />
            </Link>

          </button>
        </div>,
      ]}
    />
  );

  return (
    <div className="p-4 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Category Manage</h2>
        <Link
          to={"/admin/products/child-categories/create"}
        className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
          Create Category
        </Link>
      </div>
      <Table columns={columns} data={data} renderRow={renderRow} />
    </div>
  );
};

export default ChildCategoryTable;