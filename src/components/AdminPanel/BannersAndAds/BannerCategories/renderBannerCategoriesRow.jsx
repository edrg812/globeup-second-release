import { FiEdit2, FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import TableRow from "../../../shared/Table/TableRow";

const renderBannerCategoryRow = (item, index, additionalParams) => {
  return (
    <TableRow
      key={item.id}
      cells={[
        // SL
        <span className="text-sm">{index + 1}</span>,

        // Image preview
        <div className="w-20 h-12 overflow-hidden rounded">
          <img
            src={item.image}
            alt={item.label}
            className="object-cover w-full h-full"
          />
        </div>,

        // Name
        <span className="text-sm font-medium text-gray-800">{item.label}</span>,

        // URL
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline break-words"
        >
          {item.url}
        </a>,

        // Status badge
        <span
          className={`px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide ${
            item.is_active
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {item.is_active ? "Active" : "Inactive"}
        </span>,

        // Actions
        <div className="flex items-center gap-2">
          <button
            onClick={() => additionalParams?.onToggleStatus?.(item)}
            className="p-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition cursor-pointer"
            title={item.status === "Active" ? "Deactivate" : "Activate"}
          >
            {item.is_active ? (
              <FiThumbsDown className="w-4 h-4" />
            ) : (
              <FiThumbsUp className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={() => additionalParams?.onEdit?.(item.id)}
            className="p-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition cursor-pointer"
            title="Edit"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>
        </div>,
      ]}
    />
  );
};

export default renderBannerCategoryRow;
