import { memo } from "react";
import { FiEdit, FiEye, FiSettings, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

// const OrderActionButtonsCell = ({ invoice, handleFraudCheck }) => {
//   return (
//     <>
//       <div className="mb-2 space-y-2 text-gray-600">
//         <div className="flex justify-center items-center gap-2">
//           <Link
//             to={"/admin/order/invoice/" + invoice}
//             title="Invoice"
//             className="text-[#944df7]"
//           >
//             <FiEye />
//           </Link>
//           <Link
//             to={"/admin/order/process/" + invoice}
//             title="Process"
//             className="text-[#944df7]"
//           >
//             <FiSettings />
//           </Link>
//         </div>
//         <div className="flex justify-center items-center gap-2">
//           <Link
//             to={"/admin/order/edit/" + invoice}
//             title="Edit"
//             className="text-[#944df7]"
//           >
//             <FiEdit />
//           </Link>
//           <button
//             type="submit"
//             title="Delete"
//             className="text-red-500 hover:text-red-700 cursor-pointer"
//           >
//             <FiTrash2 />
//           </button>
//         </div>
//       </div>

//       {/* Fraud Check */}
//       <button
//         type="button"
//         title="Fraud Check"
//         onClick={handleFraudCheck}
//         className="bg-blue-400 text-white text-xs text-wrap px-1 py-3 rounded hover:bg-blue-500 cursor-pointer"
//       >
//         Fraud Check
//       </button>
//     </>
//   );
// };

// export default OrderActionButtonsCell;




const OrderActionButtonsCell = ({ invoice, handleFraudCheck, deleteOrderHandler }) => {
  return (
    <>
      <div className="mb-2 space-y-2 text-gray-600">
        <div className="flex justify-center items-center gap-2">
          <Link
            to={"/admin/order/invoice/" + invoice}
            title="Invoice"
            className="text-[#944df7]"
          >
            <FiEye />
          </Link>
          <Link
            to={"/admin/order/process/" + invoice}
            title="Process"
            className="text-[#944df7]"
          >
            <FiSettings />
          </Link>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Link
            to={"/admin/order/edit/" + invoice}
            title="Edit"
            className="text-[#944df7]"
          >
            <FiEdit />
          </Link>

          {/* DELETE BUTTON */}
          <button
            type="button"
            title="Delete"
            className="text-red-500 hover:text-red-700 cursor-pointer"
            onClick={deleteOrderHandler} // ✅ add this
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      {/* Fraud Check */}
      <button
        type="button"
        title="Fraud Check"
        onClick={handleFraudCheck}
        className="bg-blue-400 text-white text-xs text-wrap px-1 py-3 rounded hover:bg-blue-500 cursor-pointer"
      >
        Fraud Check
      </button>
    </>
  );
};

export default memo(OrderActionButtonsCell);
