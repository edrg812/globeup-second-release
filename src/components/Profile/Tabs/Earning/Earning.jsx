import React, { useState } from 'react';
import { FaDownload, FaPlus, FaTimes, FaEye } from 'react-icons/fa';
import { useEffect } from 'react';
const apiurl= import.meta.env.VITE_REACT_APP_API_URL
import axios from 'axios';
import WithdrawModal from './RequestWithdrawlModal';

const EarningTab = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [earningsData, setEarningsData] = useState({
     totalSales: 0,
    pendingPayouts: 0,
    completedPayouts: 0,
    withdrawalRequests: 0,
    totalEarning:0,
    withdrawable_balance:0
  });
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);



  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await axios.get(`${apiurl}/earnings/`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`, // if you use JWT
          },
        });

        // Map API fields into your frontend state
        setEarningsData({
          withdrawable_balance: response.data.results[0].current_balance, // or upcoming_balance if you prefer
          pendingPayouts: response.data.results[0].pending_payout,
          completedPayouts: response.data.results[0].completed_payout,
          withdrawalRequests: response.data.results[0].user_requested_amount_withdraw,
          totalSales:response.data.results[0].total_sales_balance,
          totalEarning: response.data.results[0].total_commission_earned

        });
      } catch (error) {
        console.error("Error fetching earnings:", error);
      }
    };

    fetchEarnings();
  }, []); // run once on mount
console.log(earningsData)
  
  const transactions = [
    {
      id: 1,
      date: 'Jul 20, 2024',
      type: 'Order Payment',
      amount: 500.00,
      status: 'Completed',
      transactionId: 'TXN1234567890',
      orderId: 'ORD9876543210',
      platformFee: 2.50,
      processingFee: 0.75
    },
    {
      id: 2,
      date: 'Jul 15, 2024',
      type: 'Withdrawal',
      amount: -1000.00,
      status: 'Completed',
      transactionId: 'TXN2345678901',
      orderId: 'ORD8765432109',
      platformFee: 0,
      processingFee: 0
    },
    {
      id: 3,
      date: 'Jul 10, 2024',
      type: 'Order Payment',
      amount: 300.00,
      status: 'Completed',
      transactionId: 'TXN3456789012',
      orderId: 'ORD7654321098',
      platformFee: 1.50,
      processingFee: 0.45
    },
    {
      id: 4,
      date: 'Jul 05, 2024',
      type: 'Withdrawal Request',
      amount: -500.00,
      status: 'Pending',
      transactionId: 'TXN4567890123',
      orderId: 'ORD6543210987',
      platformFee: 0,
      processingFee: 0
    },
    {
      id: 5,
      date: 'Jul 01, 2024',
      type: 'Order Payment',
      amount: 200.00,
      status: 'Completed',
      transactionId: 'TXN5678901234',
      orderId: 'ORD5432109876',
      platformFee: 1.00,
      processingFee: 0.30
    },
    {
      id: 6,
      date: 'Jun 28, 2024',
      type: 'Withdrawal',
      amount: -1200.00,
      status: 'Failed',
      transactionId: 'TXN6789012345',
      orderId: 'ORD4321098765',
      platformFee: 0,
      processingFee: 0
    }
  ];

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT'
    }).format(amount);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Earnings</h2>
            <p className="mt-1 text-base text-gray-500">Manage your earnings and payouts.</p>
          </div>
          <div className="flex gap-2">
          
            {/* <button className="btn btn-primary">
                <span><b>100</b></span>
              <p ><a href='#' className='text-green-800'>Request Withdrawal</a></p>
            </button> */}

            {/* instead of static , In want to open a modal here where reseller can request for withdrawl */}

           <button 
              className="btn btn-primary"
              onClick={() => setIsWithdrawModalOpen(true)}  // ✅ open modal
          >
          <span><b>100</b></span>
          <p className="text-green-800">Request Withdrawal</p>
          </button>

          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md border border-gray-200 bg-white p-6">
            <p className="text-sm font-medium text-gray-500">Total Sales</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{formatCurrency(earningsData.totalSales)}</p>
          </div>
          <div className="rounded-md border border-gray-200 bg-white p-6">
            <p className="text-sm font-medium text-gray-500">Total Earnings</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{formatCurrency(earningsData.totalEarning)}</p>
          </div>
          <div className="rounded-md border border-gray-200 bg-white p-6">
            <p className="text-sm font-medium text-gray-500">Withdrawable Balance</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{formatCurrency(earningsData.withdrawable_balance)}</p>
          </div>
          <div className="rounded-md border border-gray-200 bg-white p-6">
            <p className="text-sm font-medium text-gray-500">Pending Payouts</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{formatCurrency(earningsData.pendingPayouts)}</p>
          </div>
          <div className="rounded-md border border-gray-200 bg-white p-6">
            <p className="text-sm font-medium text-gray-500">Completed Payouts</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{formatCurrency(earningsData.completedPayouts)}</p>
          </div>
          <div className="rounded-md border border-gray-200 bg-white p-6">
            <p className="text-sm font-medium text-gray-500">Withdrawal Requests</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{earningsData.withdrawalRequests}</p>
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-gray-900">Transaction History</h3>
          <div className="mt-4 overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-md border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 bg-white">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" scope="col">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" scope="col">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" scope="col">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" scope="col">
                        Status
                      </th>
                      <th className="relative px-6 py-3" scope="col">
                        <span className="sr-only">Details</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{transaction.date}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{transaction.type}</td>
                        <td className={`whitespace-nowrap px-6 py-4 text-sm font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount >= 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <button
                            onClick={() => handleViewDetails(transaction)}
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            <FaEye className="mr-1" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">Showing 1 to 6 of 25 results</p>
            <div className="flex gap-2">
              <button className="btn btn-secondary">Previous</button>
              <button className="btn btn-secondary">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {isModalOpen && selectedTransaction && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={closeModal}></div>
          
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Transaction Details</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
                    <p className="font-medium text-gray-900">{selectedTransaction.transactionId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date</p>
                    <p className="font-medium text-gray-900">{selectedTransaction.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Amount</p>
                    <p className="font-semibold text-lg text-gray-900">
                      {selectedTransaction.amount >= 0 ? '+' : ''}{formatCurrency(selectedTransaction.amount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Type</p>
                    <p className="font-medium text-gray-900">{selectedTransaction.type}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600 mb-1">Associated Order</p>
                    <a className="font-medium text-blue-600 hover:underline" href="#">
                      {selectedTransaction.orderId}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(selectedTransaction.status)}`}>
                      {selectedTransaction.status}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  {selectedTransaction.platformFee > 0 && (
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">Platform Fee</p>
                      <p className="font-medium text-gray-900">-{formatCurrency(selectedTransaction.platformFee)}</p>
                    </div>
                  )}
                  {selectedTransaction.processingFee > 0 && (
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-600">Processing Fee</p>
                      <p className="font-medium text-gray-900">-{formatCurrency(selectedTransaction.processingFee)}</p>
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-dashed border-gray-200">
                    <p className="text-base font-bold text-gray-900">Net Payout</p>
                    <p className="text-xl font-bold text-green-600">
                      {formatCurrency(
                        selectedTransaction.amount - 
                        selectedTransaction.platformFee - 
                        selectedTransaction.processingFee
                      )}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end">
                <button 
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

{/* Request Withdrawal Modal */}
<WithdrawModal
  isOpen={isWithdrawModalOpen}
  onClose={() => setIsWithdrawModalOpen(false)}
  onConfirm={async ({ amount, payment_method, account_details }) => {
    try {

       // ✅ Convert to numbers for comparison
      const withdrawable = parseFloat(earningsData.withdrawable_balance);
      const requestedAmount = parseFloat(amount);

      // 🚫 Prevent invalid withdrawal
      if (isNaN(requestedAmount) || requestedAmount <= 0) {
        window.alert("Please enter a valid withdrawal amount.");
        return;
      }

      if (requestedAmount > withdrawable) {
        window.alert("Insufficient balance. You cannot withdraw more than your withdrawable balance.");
        return;
      }
      // 1️⃣ Create withdrawal request first
      const requestResponse = await axios.post(
        `${apiurl}/withdraw-request/create/`,
        { amount, payment_method, account_details },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log("Withdrawal request created:", requestResponse.data);

      // 2️⃣ Only if the request succeeds, deduct from earnings
      const withdrawResponse = await axios.post(
        `${apiurl}/earnings/withdraw/`,
        { amount, payment_method, account_details },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log("Amount withdrawn:", withdrawResponse.data);

      // 3️⃣ Refresh earnings data
      const refreshed = await axios.get(`${apiurl}/earnings/`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setEarningsData({
       withdrawable_balance: parseFloat(refreshed.data.results[0].current_balance),
        pendingPayouts: parseFloat(refreshed.data.results[0].pending_payout),
        completedPayouts: parseFloat(refreshed.data.results[0].completed_payout),
        withdrawalRequests: parseFloat(refreshed.data.results[0].user_requested_amount_withdraw),
        totalSales: parseFloat(refreshed.data.results[0].total_sales_balance),
        totalEarning: parseFloat(refreshed.data.results[0].total_commission_earned),
      });

      // 4️⃣ Close modal and show success
      setIsWithdrawModalOpen(false);
      window.alert("Withdrawal request submitted successfully!");
    } catch (error) {
      console.error("Withdraw error:", error);
      window.alert("Withdrawal failed. Please try again.");
    }
  }}
/>

     
    </div>
  );
};

export default EarningTab;