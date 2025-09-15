const ActionButton = ({ icon, label, onClick, bgColors = "bg-blue-400 hover:bg-blue-500" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full ${bgColors} bg-gree text-white px-2 md:px-3 lg:px-4 py-1 md:py-2 text-sm transition cursor-pointer`}
    >
      {icon}
      {label}
    </button>
  );
};

export default ActionButton;
