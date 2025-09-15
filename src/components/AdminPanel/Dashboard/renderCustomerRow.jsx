import TableRow from "../../shared/Table/TableRow";

const renderCustomerRow = (customer, index) => (
  <TableRow
    key={index}
    cells={[
      <span>{index + 1}</span>,
      customer.name,
      customer.phone,
      customer.date,
      <span
        className={`${
          customer.status === "Active"
            ? "bg-green-700"
            : customer.status === "Inactive"
            ? "bg-gray-500"
            : customer.status === "Pending"
            ? "bg-yellow-500"
            : "bg-red-500"
        } text-white text-xs px-2 py-1 rounded`}
      >
        {customer.status}
      </span>,
    ]}
  />
);

export default renderCustomerRow;
