import TableRow from "../../../shared/Table/TableRow";

const renderStockReportRow = (item, index) => {
  return (
    <TableRow
      key={index}
      cells={[index + 1, item.productName, item.price, item.stock, item.total]}
    />
  );
};

export default renderStockReportRow;
