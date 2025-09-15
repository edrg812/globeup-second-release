
import { Link } from "react-router-dom";
import { FaArrowLeft, FaPrint } from 'react-icons/fa';

const Invoice = () => {
    return (
        <div className="bg-white max-w-4xl mx-auto my-8 p-4 md:p-8 shadow-lg">
            {/* Header with back button and print button */}
            <div className="flex justify-between items-center mb-6">
                <Link
                    to="/admin/order"
                    className="text-purple-600 flex items-center hover:text-purple-800 cursor-pointer"
                >
                    <FaArrowLeft className="mr-2" />
                    <span>Back To Order</span>
                </Link>
                <button className="text-white bg-green-500 p-2 rounded-md hover:bg-green-600">
                    <FaPrint />
                </button>
            </div>

            {/* Invoice title section */}
            <div className="border-b-2 border-gray-200 pb-8">
                <div className="flex justify-between items-start">
                    <img
                        alt="Company Logo"
                        className="h-12"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxvyw_gbDO0ELAQuZmkNDqq0oXNIreQXU9vyzL3h7tTiEt832s6o6ejT2ZohVUe1VQLpI4mtMlSFQBJCq8hPW_sbzi0hW02p4darHYJmHGYa4h_tnABXzwKODdx_Yr1vqJFOYyLAk92UPJl9Z65NdZ6TQeOmXtyFHt7hNIHw0DWaVO7xe8FcRlW2bdpLuqw2GchESgJQWPJrv5XfNs8HWBbeMkHhnNEMtCDoQbKtKut_Y7rwoxG4006dL4bH51qdcpURNIPt77iDg"
                    />
                    <div className="bg-green-500 text-white text-right p-4 -mr-8" style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%)' }}>
                        <h1 className="text-2xl md:text-4xl font-bold">INVOICE</h1>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-4">
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm text-gray-500">
                            Payment Method: <span className="font-semibold text-gray-800">CASH ON DELIVERY</span>
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">
                            Invoice ID: <span className="font-bold text-gray-800">#27879</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            Invoice Date: <span className="font-bold text-gray-800">28-07-25</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* From and To sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                <div>
                    <h2 className="font-semibold text-gray-500 mb-2">Invoice From:</h2>
                    <p className="font-bold text-gray-800">Daraz BD</p>
                    <p className="text-gray-600">+8809638365975</p>
                    <p className="text-gray-600">dev.morsalin@gmail.com</p>
                    <p className="text-gray-600">Labsa, Satkhira, Khulna</p>
                </div>
                <div className="text-left md:text-right">
                    <h2 className="font-semibold text-gray-500 mb-2">Invoice To:</h2>
                    <p className="font-bold text-gray-800">Aynal Haque</p>
                    <p className="text-gray-600">01993247534</p>
                    <p className="text-gray-600">362, 363 West Nakhalpara (Nakhalpara Railcrossing),</p>
                    <p className="text-gray-600">Tejgaon, Dhaka 1215</p>
                    <p className="text-gray-600">ঢাকার ভিতরে ৮০ টাকা</p>
                </div>
            </div>

            {/* Products table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-700 text-white">
                            <th className="p-3">SL</th>
                            <th className="p-3">Product</th>
                            <th className="p-3 text-right">Price</th>
                            <th className="p-3 text-right">Qty</th>
                            <th className="p-3 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="p-3">1</td>
                            <td className="p-3 max-w-xs">
                                Nylon Shoulder Backpacks Bags new Designer Backpacks For Women Schoolbag For Female Fashion Business Travelling Bag
                            </td>
                            <td className="p-3 text-right">৳700</td>
                            <td className="p-3 text-right">1</td>
                            <td className="p-3 text-right">৳700</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Totals section */}
            <div className="flex justify-end mt-8">
                <div className="w-full md:w-1/2 lg:w-1/3">
                    <div className="flex justify-between p-3 border-b">
                        <span className="text-gray-600">SubTotal</span>
                        <span className="font-semibold text-gray-800">৳700</span>
                    </div>
                    <div className="flex justify-between p-3 border-b">
                        <span className="text-gray-600">Shipping(+)</span>
                        <span className="font-semibold text-gray-800">৳80</span>
                    </div>
                    <div className="flex justify-between p-3 border-b">
                        <span className="text-gray-600">Discount(-)</span>
                        <span className="font-semibold text-gray-800">৳0</span>
                    </div>
                    <div className="flex justify-between p-3 bg-green-500 text-white font-bold rounded-b-lg">
                        <span>Final Total</span>
                        <span>৳780</span>
                    </div>
                </div>
            </div>

            {/* Invoice Footer */}
            <div className="mt-12 text-center border-t pt-4">
                <p className="font-semibold text-purple-600 mb-2">Terms & Conditions</p>
                <p className="text-xs text-gray-500">
                    * This is a computer generated invoice, does not require any signature.
                </p>
            </div>
        </div>
    );
};

export default Invoice;