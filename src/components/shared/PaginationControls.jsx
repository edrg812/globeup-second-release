const PaginationControls = ({
  pages,
  current,
  firstPage,
  lastPage,
  onClickHandler,
}) => {
  return (
    <nav className="flex gap-2 mt-4">
      <button
        className="px-3 py-1 border rounded bg-gray-200 cursor-pointer"
        onClick={() => onClickHandler(firstPage)}
        disabled={firstPage === current}
      >
        ‹
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 border rounded ${
            page === current ? "bg-blue-500 text-white" : "hover:bg-blue-200"
          } cursor-pointer`}
          onClick={() => onClickHandler(page)}
          disabled={page === current}
        >
          {page}
        </button>
      ))}
      <button
        className="px-3 py-1 border rounded bg-gray-200 cursor-pointer"
        onClick={() => onClickHandler(lastPage)}
        disabled={lastPage === current}
      >
        ›
      </button>
    </nav>
  );
};

export default PaginationControls;
