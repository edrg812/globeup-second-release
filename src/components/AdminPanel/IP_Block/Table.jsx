


const Table = ({ columns, data, renderRow, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm bg-white text-gray-800 rounded-md overflow-hidden">
        <thead className="bg-gray-200 text-left">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="p-2 font-medium align-middle">
                <div className="flex items-center space-x-2">
                  <span>{col.text}</span>
                  {col.icon && <col.icon className="text-xs" />}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-left">
          {data.map((item, index) => renderRow(item, index, {onEdit}))}
        </tbody>
      </table>
    </div>
  );
};


export default Table;