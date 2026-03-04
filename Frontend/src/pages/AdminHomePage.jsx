import { Link } from "react-router-dom";

const AdminHomePage = () => {
  const orders = [
    { _id: "1001", user: { name: "John Doe" }, totalPrice: 110, status: "Processing" },
    { _id: "1002", user: { name: "Jane Smith" }, totalPrice: 230, status: "Delivered" },
    { _id: "1003", user: { name: "Bob Johnson" }, totalPrice: 450, status: "Processing" },
    { _id: "1004", user: { name: "Alice Brown" }, totalPrice: 180, status: "Shipped" },
    { _id: "1005", user: { name: "Charlie Davis" }, totalPrice: 320, status: "Delivered" },
    { _id: "1006", user: { name: "Eva Wilson" }, totalPrice: 95, status: "Processing" },
    { _id: "1007", user: { name: "Frank Miller" }, totalPrice: 670, status: "Shipped" },
    { _id: "1008", user: { name: "Grace Lee" }, totalPrice: 145, status: "Delivered" },
    { _id: "1009", user: { name: "Henry Taylor" }, totalPrice: 290, status: "Processing" },
    { _id: "1010", user: { name: "Iris Clark" }, totalPrice: 510, status: "Shipped" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="text-2xl">$10000</p>
        </div>
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-2xl">$10000</p>
          <Link to="/admin/orders" className="text-blue-500 hover:underline">
            Manage Orders
          </Link>
        </div>
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-2xl">$10000</p>
          <Link to="/admin/products" className="text-blue-500 hover:underline">
            Manage Products
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full text-left text-gray-500">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50 cursor-pointer">
                    <td className="py-3 px-4">{order._id}</td>
                    <td className="py-3 px-4">{order.user.name}</td>
                    <td className="py-3 px-4">${order.totalPrice}</td>
                    <td className="py-3 px-4">{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No recent orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminHomePage;
