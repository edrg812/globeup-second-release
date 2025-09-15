import { FaThumbsDown, FaThumbsUp, FaEdit, FaTrash } from "react-icons/fa";
import TableRow from "../../../shared/Table/TableRow";

const renderBannersRow = (banner, index, additionalParams = {}) => {
  return (
    <TableRow
      key={banner.id || index}
      cells={[
        banner.id,
        banner.title,
        <img
          src={banner.image}
          alt={banner.title}
          className="max-w-[100px] rounded"
        />,
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            banner.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {banner.status}
        </span>,
        <div className="flex items-center gap-2">
          <button
            onClick={() => additionalParams?.onToggleStatus?.(banner.id)}
            className="p-1.5 text-white bg-gray-500 hover:bg-gray-600 rounded text-sm cursor-pointer"
            title={banner.status === "Active" ? "Deactivate" : "Activate"}
          >
            {banner.status === "Active" ? (
              <FaThumbsDown size={14} />
            ) : (
              <FaThumbsUp size={14} />
            )}
          </button>

          <button
            onClick={() => additionalParams?.onEdit?.(banner.id)}
            className="p-1.5 text-white bg-blue-500 hover:bg-blue-600 rounded text-sm cursor-pointer"
            title="Edit"
          >
            <FaEdit size={14} />
          </button>

          <button
            onClick={() => additionalParams?.onDelete?.(banner.id)}
            className="p-1.5 text-white bg-red-500 hover:bg-red-600 rounded text-sm cursor-pointer"
            title="Delete"
          >
            <FaTrash size={14} />
          </button>
        </div>,
      ]}
    />
  );
};

export default renderBannersRow;
