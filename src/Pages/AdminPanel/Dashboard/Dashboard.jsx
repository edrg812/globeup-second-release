// import {
//   FiDatabase,
//   FiShoppingBag,
//   FiShoppingCart,
//   FiUser,
// } from "react-icons/fi";
// import InfoCard from "../../../components/AdminPanel/Dashboard/InfoCard";
// import { Link } from "react-router-dom";
// import { PiGlobeBold } from "react-icons/pi";
// import TableContainer from "../../../components/AdminPanel/Dashboard/TableContainer";
// import renderOrderRow from "../../../components/AdminPanel/Dashboard/renderOrderRow";
// import renderCustomerRow from "../../../components/AdminPanel/Dashboard/renderCustomerRow";
// const apiUrl= import.meta.env.VITE_REACT_APP_API_URL
// import { useEffect, useState } from "react";



// const Dashboard = () => {

//   const cardsData = [
//     {
//       id: 1,
//       icon: FiShoppingCart,
//       label: "Total Order",
//       value: 5,
//       gradientFrom: "from-[#E0F2FF]",
//       gradientTo: "to-[#3B82F6]",
//       shadowColor: "shadow-[0_4px_20px_#3B82F64D]", // rgba(59, 130, 246, 0.3)
//       iconBg: "bg-[#3B82F6]/25",
//     },
//     {
//       id: 2,
//       icon: FiShoppingBag,
//       label: "Today's Order",
//       value: 0,
//       gradientFrom: "from-[#D1FAF4]",
//       gradientTo: "to-[#14B8A6]",
//       shadowColor: "shadow-[0_4px_20px_#14B8A64D]", // rgba(20, 184, 166, 0.3)
//       iconBg: "bg-[#14B8A6]/25",
//     },
//     {
//       id: 3,
//       icon: FiDatabase,
//       label: "Products",
//       value: 26,
//       gradientFrom: "from-[#F3E8FF]",
//       gradientTo: "to-[#8B5CF6]",
//       shadowColor: "shadow-[0_4px_20px_#8B5CF64D]", // rgba(139, 92, 246, 0.3)
//       iconBg: "bg-[#8B5CF6]/25",
//     },
//     {
//       id: 4,
//       icon: FiUser,
//       label: "Customer",
//       value: 7,
//       gradientFrom: "from-[#FEF3C7]",
//       gradientTo: "to-[#F59E0B]",
//       shadowColor: "shadow-[0_4px_20px_#F59E0B4D]", // rgba(245, 158, 11, 0.3)
//       iconBg: "bg-[#F59E0B]/25",
//     },
//   ];



  
// const [orderloading, setOrderLoading] = useState(true);
// const [orderError, setOrderError] = useState(null);
// const [orders, setOrders] = useState([]);


//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("access_token"); // if JWT auth
//         const res = await fetch(`${apiUrl}/orders/`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token ? `Bearer ${token}` : "",
//           },
//         });

//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }

//         const data = await res.json();


//       const ORDERformatted = data.slice(0, 7).map((order) => ({
//         id: order.id,
//         invoice: order.id, // you may replace with actual invoice field if exists
//         amount: order.total_amount,
//         customer: order.customer_name_orderedby_admin || order.user,
//         status: order.status,
//         image: order.items[0]?.product_variant?.image || "",
//       }));

//       setOrders(ORDERformatted); // ✅ FIXED
//     } catch (err) {
//       console.error("❌ Error fetching orders:", err);
//       setOrderError(err.message);
//     } finally {
//       setOrderLoading(false);
//     }
//   };

//   fetchOrders();
// }, []);

//   if (orderloading) return <p>Loading users...</p>;
//   if (orderError) return <p className="text-red-500">Error: {orderError}</p>;





  

// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);
// const [customers, setCustomers] = useState([]);


//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem("access_token"); // if JWT auth
//         const res = await fetch(`${apiUrl}/all-users-list/`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token ? `Bearer ${token}` : "",
//           },
//         });

//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }

//         const data = await res.json();


//         const formatted = data.results.slice(0, 7).map((user) => ({
//   id: user.id,
//   name: `${user.first_name} ${user.last_name}`,
//   phone: user.phone_number,
//   date: new Date(user.modified_at).toLocaleDateString(),
//   status: user.is_verified ? "Active" : "Pending",
// }));

// setCustomers(formatted);


//       } catch (err) {
//         console.error("❌ Error fetching users:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) return <p>Loading users...</p>;
//   if (error) return <p className="text-red-500">Error: {error}</p>;




//   const orderColumns = [
//     "#",
//     "Product",
//     "Invoice",
//     "Amount",
//     "Customer",
//     "Status",
//   ];

//   const customerColumns = ["Id", "Name", "Phone", "Date", "Status"];

//   return (
//     <div className="space-y-8 px-4 lg:px-0 lg:pr-6">
//       <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-2">
//         <Link
//           to={"/"}
//           className="flex justify-start items-center gap-2 text-[17px] text-white text-nowrap w-min bg-[#1e88e5] px-4 py-2 rounded-[20px]"
//         >
//           <PiGlobeBold />
//           <span>Visit Website</span>
//         </Link>

//         <h2 className="text-2xl text-[red] font-medium">Live Dashboard</h2>
//       </div>

//       {/* info cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
//         {cardsData.map((card) => (
//           <InfoCard key={card.id} cardData={card} />
//         ))}
//       </div>

//     {/* Latest orders table */}
// <TableContainer
//   title={"Latest 7 orders"}
//   columns={orderColumns}
//   data={orders}
//   renderRow={renderOrderRow}
// />
// {orderloading && <p>Loading orders...</p>}
// {orderError && <p className="text-red-500">Error: {orderError}</p>}

// {/* Latest users table */}
// <TableContainer
//   title={"Latest Customers"}
//   columns={customerColumns}
//   data={customers}
//   renderRow={renderCustomerRow}
// />
// {loading && <p>Loading users...</p>}
// {error && <p className="text-red-500">Error: {error}</p>}

//     </div>
//   );
// };

// export default Dashboard;




import {
  FiDatabase,
  FiShoppingBag,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import InfoCard from "../../../components/AdminPanel/Dashboard/InfoCard";
import { Link } from "react-router-dom";
import { PiGlobeBold } from "react-icons/pi";
import TableContainer from "../../../components/AdminPanel/Dashboard/TableContainer";
import renderOrderRow from "../../../components/AdminPanel/Dashboard/renderOrderRow";
import renderCustomerRow from "../../../components/AdminPanel/Dashboard/renderCustomerRow";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Dashboard = () => {
  // 📌 Orders
  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(true);
  const [orderError, setOrderError] = useState(null);

  // 📌 Customers
  const [customers, setCustomers] = useState([]);
  const [customerLoading, setCustomerLoading] = useState(true);
  const [customerError, setCustomerError] = useState(null);

  // Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch(`${apiUrl}/orders/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();

        const formatted = data.slice(0, 7).map((order) => ({
          id: order.id,
          invoice: order.id,
          amount: order.total_amount,
          customer: order.customer_name_orderedby_admin || order.user,
          status: order.status,
          image: order.items[0]?.product_variant?.image || "",
          image: order.items[0]?.product_variant?.name || "",
        }));

        setOrders(formatted);
      } catch (err) {
        setOrderError(err.message);
      } finally {
        setOrderLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch(`${apiUrl}/all-users-list/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();

        // Handle pagination or plain list
        const results = data.results ? data.results : data;

        const formatted = results.slice(0, 7).map((user) => ({
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          phone: user.phone_number,
          date: new Date(user.modified_at).toLocaleDateString(),
          status: user.is_verified ? "Active" : "Pending",
        }));

        setCustomers(formatted);
      } catch (err) {
        setCustomerError(err.message);
      } finally {
        setCustomerLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const cardsData = [
    {
      id: 1,
      icon: FiShoppingCart,
      label: "Total Order",
      value: orders.length,
      gradientFrom: "from-[#E0F2FF]",
      gradientTo: "to-[#3B82F6]",
      shadowColor: "shadow-[0_4px_20px_#3B82F64D]",
      iconBg: "bg-[#3B82F6]/25",
    },
    {
      id: 2,
      icon: FiShoppingBag,
      label: "Today's Order",
      value: 0,
      gradientFrom: "from-[#D1FAF4]",
      gradientTo: "to-[#14B8A6]",
      shadowColor: "shadow-[0_4px_20px_#14B8A64D]",
      iconBg: "bg-[#14B8A6]/25",
    },
    {
      id: 3,
      icon: FiDatabase,
      label: "Products",
      value: 26,
      gradientFrom: "from-[#F3E8FF]",
      gradientTo: "to-[#8B5CF6]",
      shadowColor: "shadow-[0_4px_20px_#8B5CF64D]",
      iconBg: "bg-[#8B5CF6]/25",
    },
    {
      id: 4,
      icon: FiUser,
      label: "Customer",
      value: customers.length,
      gradientFrom: "from-[#FEF3C7]",
      gradientTo: "to-[#F59E0B]",
      shadowColor: "shadow-[0_4px_20px_#F59E0B4D]",
      iconBg: "bg-[#F59E0B]/25",
    },
  ];

  const orderColumns = ["#", "Product", "Invoice", "Amount", "Customer", "Status"];
  const customerColumns = ["Id", "Name", "Phone", "Date", "Status"];

  return (
    <div className="space-y-8 px-4 lg:px-0 lg:pr-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-2">
        <Link
          to={"/"}
          className="flex justify-start items-center gap-2 text-[17px] text-white text-nowrap w-min bg-[#1e88e5] px-4 py-2 rounded-[20px]"
        >
          <PiGlobeBold />
          <span>Visit Website</span>
        </Link>
        <h2 className="text-2xl text-[red] font-medium">Live Dashboard</h2>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
        {cardsData.map((card) => (
          <InfoCard key={card.id} cardData={card} />
        ))}
      </div>

      {/* Latest Orders Table */}
      <TableContainer
        title={"Latest 7 orders"}
        columns={orderColumns}
        data={orders}
        renderRow={renderOrderRow}
      />
      {orderLoading && <p>Loading orders...</p>}
      {orderError && <p className="text-red-500">Error: {orderError}</p>}

      {/* Latest Customers Table */}
      <TableContainer
        title={"Latest Customers"}
        columns={customerColumns}
        data={customers}
        renderRow={renderCustomerRow}
      />
      {customerLoading && <p>Loading users...</p>}
      {customerError && <p className="text-red-500">Error: {customerError}</p>}
    </div>
  );
};

export default Dashboard;
