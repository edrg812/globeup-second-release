import { FaFileExport, FaPrint } from "react-icons/fa";

const ExportButtons = ({ printFunction, exportFunction }) => {
  return (
    <div className="flex gap-2 justify-end mt-4">
      <button
        className="bg-teal-500 text-white px-3 py-2 rounded flex items-center gap-2 cursor-pointer"
        onClick={printFunction}
      >
        <FaPrint /> Print
      </button>
      <button
        className="bg-sky-400 text-white px-3 py-2 rounded flex items-center gap-2 cursor-pointer"
        onClick={exportFunction}
      >
        <FaFileExport /> Export
      </button>
    </div>
  );
};

export default ExportButtons;
