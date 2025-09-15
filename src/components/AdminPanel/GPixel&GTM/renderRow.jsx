import { FiEdit } from "react-icons/fi";
import { LuThumbsDown } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import TableRow from "../../shared/Table/TableRow";

const renderRow = (
  info = {
    id: "564131454584",
    status: "Active",
    itemId: 4,
  },
  index = 1,
  additionalProps
) => {
  return (
    <TableRow
      key={`${info.id} - ${index}`}
      cells={[
        <p className="font-medium text-gray-700">{index}</p>,

        <p>{info.id}</p>,

        <span className="px-2 py-1 rounded-full text-green-700 bg-green-100 text-sm">
          {info.status}
        </span>,

        <div className="flex space-x-2">
          {/* Deactivate Button */}
          <button
            onClick={() => additionalProps.onDeactivate?.(info.id)}
            className="text-gray-600 hover:text-white hover:bg-gray-600 bg-gray-200 p-1.5 rounded cursor-pointer"
            title="Deactivate"
          >
            <LuThumbsDown size={14} />
          </button>

          {/* Edit Link */}
          <button
            className="text-white bg-blue-500 hover:bg-blue-600 p-1.5 rounded cursor-pointer"
            title="Edit"
            onClick={() => additionalProps.onEdit?.(info.id)}
          >
            <FiEdit size={14} />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => additionalProps.onDelete?.(info.id)}
            className="text-white bg-red-500 hover:bg-red-600 p-1.5 rounded cursor-pointer"
            title="Delete"
          >
            <MdClose size={16} />
          </button>
        </div>,
      ]}
      verticalAlign="top"
    />
  );
};

export default renderRow;
