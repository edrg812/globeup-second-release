import TableRow from "../../shared/Table/TableRow";

const renderOrderRow = (order, index) => (
  <TableRow
    key={order.invoice}
    cells={[
      <span>{index + 1}</span>,

      <img
        src={order.image}
        alt="Product"
        className="rounded-full w-10 h-10 mx-auto shadow"
      />,

      <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded">
        {order.invoice}
      </span>,

      <span className="text-green-600 font-semibold">৳{order.amount}</span>,
      order.customer,

      <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded">
        {order.status}
      </span>,
    ]}
  />
);

export default renderOrderRow;
