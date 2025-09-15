import { memo } from "react";

const OrderInvoiceCell = ({ order, index }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <p>
        SL: {index + 1} <br />
        Invoice: {order.invoice} <br />
        Date: {order.date} <br />
        Time: {order.time} <br />
        Name: <strong>{order.name}</strong> <br />
        Address: {order.address}
      </p>
      <p>
        Phone: {order.phone} <br />
        Assign: {order.assign || "-"} <br />
        Amount: ৳{order.amount} <br />
        IP: {order.ip} <br />
        Status: {order.status} <br />
        <span className="text-red-400 font-medium">Comment: </span>
      </p>
    </div>
  );
};

export default memo(OrderInvoiceCell);
