
const IpBlockForm = () => {
  return (
    <div className="bg-purple-50 flex items-center justify-center ">
      <div className="bg-white p-3 rounded-lg shadow-md w-full max-w-lg">
        <form>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="ip-no">
              IP No *
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              id="ip-no"
              type="text"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="reason">
              Reason *
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-teal-500"
              id="reason"
              rows="4"
            ></textarea>
          </div>
          <div>
            <button
              className="bg-teal-500 text-white font-medium py-2 px-6 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IpBlockForm;