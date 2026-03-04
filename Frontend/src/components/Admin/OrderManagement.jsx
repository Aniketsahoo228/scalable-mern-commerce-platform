import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrderManagement = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([
    { _id: 12312321, user: { name: "John Doe"    }, totalPrice: 110, status: "Processing" },
    { _id: 23423432, user: { name: "Jane Smith"  }, totalPrice: 250, status: "Shipped"    },
    { _id: 34534543, user: { name: "Bob Wilson"  }, totalPrice: 180, status: "Delivered"  },
    { _id: 45645654, user: { name: "Alice Brown" }, totalPrice: 320, status: "Cancelled"  },
  ]);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => o._id === orderId ? { ...o, status: newStatus } : o)
    );
    console.log("Status updated:", orderId, "→", newStatus);
  };

  const statusStyle = (status) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-700";
      case "Shipped":   return "bg-blue-100 text-blue-700";
      case "Cancelled": return "bg-red-100 text-red-700";
      default:          return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  {/* Order ID */}
                  <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                    {order._id}
                  </td>

                  {/* Customer */}
                  <td className="p-4">{order.user.name}</td>

                  {/* Total */}
                  <td className="p-4">${order.totalPrice}</td>

                  {/* Status */}
                  <td className="p-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${statusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="p-4 flex items-center gap-3">
                    {/* ✅ Mark as Delivered — only shows if not already delivered */}
                    {order.status !== "Delivered" && (
                      <button
                        onClick={() => handleStatusChange(order._id, "Delivered")}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
                      >
                        Mark as Delivered
                      </button>
                    )}

                    {/* ✅ View button */}
                    <button
                      onClick={() => navigate(`/order/${order._id}`)}
                      className="text-gray-500 hover:text-gray-800 transition"
                    >
                      <FaEye />
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;