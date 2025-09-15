import { memo } from "react";

const Table = ({ ref, columns, data, renderRow, additionalProps = {} }) => {
  return (
    <div className="overflow-x-auto">
      <table
        ref={ref}
        className="min-w-full text-sm bg-white text-gray-800 rounded-md overflow-hidden"
      >
        <thead className="bg-gray-200 text-center">
          <tr className="text-left">
            {columns.map((col, idx) => (
              <th key={idx} className="p-2 font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map((item, index) => renderRow(item, index, additionalProps))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(Table);
