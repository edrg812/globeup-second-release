



const CreateOrEditIpAddressModal = ({isOpen, onClose, IP_Data, onChange, onSubmit}) => {
  


  


  return (
    <div>
 
      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Edit IP Address</h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <span className="material-icons">close</span>
              </button>
            </div>

            <form onSubmit={onSubmit} className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="ipNo">
                  IP No *
                </label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  id="ipNo"
                  name="ipNo"
                  type="text"
                  value={IP_Data?.ipNo}
                  onChange={onChange}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="reason">
                  Reason *
                </label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  id="reason"
                  name="reason"
                  rows="3"
                  value={IP_Data?.reason}
                  onChange={onChange}
                  required
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button 
                  type="button"
                  onClick={onClose}
                  className="mr-3 bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-teal-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateOrEditIpAddressModal;