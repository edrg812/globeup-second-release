import Table from "../../../../components/shared/Table/Table";
import renderStockReportRow from "../../../../components/AdminPanel/Reports/StockReport/renderStockReportRow";
import PaginationControls from "../../../../components/shared/PaginationControls";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import StockReportFilters from "../../../../components/AdminPanel/Reports/StockReport/StockReportFilters";
import ExportButtons from "../../../../components/shared/ExportButtons";

const stockData = [
  {
    sl: 1,
    productName: "Premium Velvet Cushion Cover | PLW-620",
    price: 250,
    stock: 100,
    total: 25000,
  },
  {
    sl: 2,
    productName: "Premium Velvet Cushion Cover | PLW-512",
    price: 250,
    stock: 100,
    total: 25000,
  },
  {
    sl: 3,
    productName: "Premium Velvet Cushion Cover | PLW-514",
    price: 250,
    stock: 100,
    total: 25000,
  },
  {
    sl: 4,
    productName: "Fashion Bag for Women",
    price: 400,
    stock: 100,
    total: 40000,
  },
];
const pages = ["1", "2", "3", "4", "5", "6", "7"];

const StockReport = () => {
  const ref = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const columns = ["SL", "Product Name", "Price", "Stock", "Total"];

  const printFunction = () => {
    // write actual print function for printing the table
    console.log("printing");
  };

  const exportFunction = () => {
    // write actual export function for exporting the table
    console.log("exporting");
  };

  // get the current page number
  useEffect(() => {
    const currentPage = searchParams.get("page") || "1";
    setCurrentPage(currentPage);
  }, [searchParams]);

  return (
    <div className="p-6 space-y-4">
      <div className="mb-4">
        <h4 className="text-xl font-semibold">{"Stock Report"}</h4>
      </div>

      <StockReportFilters />
      <div className="flex justify-between items-center">
        <PaginationControls
          pages={pages}
          current={currentPage}
          firstPage={"0"}
          lastPage={"7"}
          onClickHandler={(page) => setSearchParams({ page: page })}
        />
        <ExportButtons
          printFunction={printFunction}
          exportFunction={exportFunction}
        />
      </div>
      <Table
        ref={ref}
        columns={columns}
        data={stockData}
        renderRow={renderStockReportRow}
      />
    </div>
  );
};

export default StockReport;
