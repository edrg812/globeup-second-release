const StockReportFilters = () => (
  <form className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded shadow">
    <div>
      <label className="block mb-1 font-medium">Keyword</label>
      <input type="text" className="w-full border rounded p-2" />
    </div>

    <div>
      <label className="block mb-1 font-medium">Category</label>
      <select className="w-full border rounded p-2">
        <option value="">Select...</option>
        <option value="bags">Women Bags</option>
        <option value="hijabs">Hijabs</option>
        <option value="fashion">Boy Fashion</option>
      </select>
    </div>

    <div>
      <label className="block mb-1 font-medium">Start Date</label>
      <input type="date" className="w-full border rounded p-2" />
    </div>

    <div>
      <label className="block mb-1 font-medium">End Date</label>
      <input type="date" className="w-full border rounded p-2" />
    </div>

    <div className="md:col-span-4">
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  </form>
);

export default StockReportFilters;
