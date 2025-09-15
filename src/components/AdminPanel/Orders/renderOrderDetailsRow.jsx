// import Checkbox from "../../shared/Checkbox/Checkbox";
// import TableRow from "../../shared/Table/TableRow";
// import OrderActionButtonsCell from "./RowCells/OrderActionButtonsCell";
// import OrderInvoiceCell from "./RowCells/OrderInvoiceCell";
// import OrderProductsCell from "./RowCells/OrderProductsCell";

// const renderOrderDetailsRow = (order, index, additionalProps) => (
//   <TableRow
//     key={index}
//     verticalAlign="top"
//     cells={[
//       <Checkbox
//         size="small"
//         showCross={false}
//         checked={additionalProps.isCheckboxChecked?.(order) || false}
//         onClick={() => additionalProps.checkboxOnClick?.(order)}
//       />,

//       <OrderActionButtonsCell
//         invoice={order.invoice}
//         handleFraudCheck={() => additionalProps.handleFraudCheck?.(order)}
//         deleteOrderHandler={() => additionalProps.deleteOrderHandler?.(order.internalId)}
//       />,

//       <OrderInvoiceCell order={order} index={index} />,

//       <OrderProductsCell products={order.products} />,
//     ]}
//   />
// );

// export default renderOrderDetailsRow;


import Checkbox from "../../shared/Checkbox/Checkbox";
import TableRow from "../../shared/Table/TableRow";
import OrderActionButtonsCell from "./RowCells/OrderActionButtonsCell";
import OrderInvoiceCell from "./RowCells/OrderInvoiceCell";
import OrderProductsCell from "./RowCells/OrderProductsCell";

const renderOrderDetailsRow = (order, index, additionalProps) => (
  <TableRow
    key={order.id || index}
    verticalAlign="top"
    cells={[
      <Checkbox
        size="small"
        showCross={false}
        checked={additionalProps.isCheckboxChecked?.(order) || false}
        onClick={() => additionalProps.checkboxOnClick?.(order)}
      />,

      <OrderActionButtonsCell
        invoice={order.invoice}
        handleFraudCheck={() => additionalProps.handleFraudCheck?.(order)}
        deleteOrderHandler={() => additionalProps.onDelete?.(order.id)}
      />,

      <OrderInvoiceCell order={order} index={index} />,

      <OrderProductsCell products={order.items || []} />,
    ]}
  />
);

export default renderOrderDetailsRow;

