const VoucherDropdown = ({ showVoucherDropdown, voucherRef }) => {
  if (!showVoucherDropdown) return null;

  return (
    <div
      ref={voucherRef}
      className="absolute top-full mt-2 right-0 bg-white border rounded-lg shadow-lg w-80 p-4 z-20"
    >
      Voucher content...
    </div>
  );
};

export default VoucherDropdown;
