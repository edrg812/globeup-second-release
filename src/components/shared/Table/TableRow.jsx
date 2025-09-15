import { memo } from "react";

const TableRow = ({ cells, verticalAlign = "center" }) => {
  return (
    <tr className="hover:bg-gray-300 text-[gray] text-left">
      {cells.map((cell, idx) => (
        <td
          key={idx}
          className="p-2 border border-[#dddeee]"
          style={{ verticalAlign }}
        >
          {cell}
        </td>
      ))}
    </tr>
  );
};

export default memo(TableRow);
