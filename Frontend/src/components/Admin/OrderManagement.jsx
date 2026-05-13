import { useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteOrder,
  fetchAllOrders,
  updateOrderStatus,
} from "../../redux/slices/adminOrderSlice";

const OrderManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector(
    (state) => state.adminOrders
  );

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(
      updateOrderStatus({
        id: orderId,
        status: newStatus,
      })
    );
  };

  const handleDelete = (orderId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this order?"
      )
    ) {
      dispatch(deleteOrder(orderId));
    }
  };

  const statusConfig = (status) => {
    switch (status) {
      case "Delivered":
        return "border border-green-200 bg-green-50 text-green-600";

      case "Shipping":
        return "border border-indigo-200 bg-indigo-50 text-indigo-500";

      case "Cancelled":
        return "border border-red-200 bg-red-50 text-red-500";

      default:
        return "border border-yellow-200 bg-yellow-50 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f7]">
        <p className="font-['Inter'] text-[11px] uppercase tracking-[0.3em] text-gray-400">
          Loading...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f7]">
        <p className="font-['Inter'] text-[11px] text-red-500">
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] px-4 py-10 font-['Inter'] sm:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-1 text-[9px] uppercase tracking-[0.3em] text-gray-400">
            Admin
          </p>

          <h1 className="font-['Space_Grotesk'] text-3xl font-semibold text-[#1a1a1a]">
            Order Management
          </h1>
        </div>

        {/* Orders Container */}
        <div className="overflow-hidden rounded-[10px] border border-[#e8e8ed] bg-white">

          {/* Top Header */}
          <div className="border-b border-[#f0f0f3] px-6 py-5">
            <p className="mb-1 text-[9px] uppercase tracking-[0.3em] text-gray-400">
              All Transactions
            </p>

            <h2 className="font-['Space_Grotesk'] text-lg font-semibold text-[#1a1a1a]">
              Orders
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>
                <tr className="border-b border-[#e8e8ed]">

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                    Order ID
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                    Customer
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                    Total Price
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                    Status
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => {
                    const isTerminal =
                      order.status === "Delivered" ||
                      order.status === "Cancelled";

                    return (
                      <tr
                        key={order._id}
                        className="cursor-pointer border-b border-[#f0f0f3] transition-all duration-150 hover:bg-[#f9f9fb]"
                      >

                        {/* Order ID */}
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-[11px] text-gray-500">
                          {order._id}
                        </td>

                        {/* Customer */}
                        <td className="px-4 py-3 text-sm font-medium text-[#1a1a1a]">
                          {order.user?.name || "N/A"}
                        </td>

                        {/* Price */}
                        <td className="px-4 py-3 text-sm font-medium text-[#1a1a1a]">
                          ${order.totalPrice}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] ${statusConfig(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap items-center gap-2">

                            {!isTerminal && (
                              <button
                                onClick={() =>
                                  handleStatusChange(
                                    order._id,
                                    "Delivered"
                                  )
                                }
                                className="whitespace-nowrap rounded border border-green-200 bg-green-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-green-600 transition-all duration-200 hover:border-green-400 hover:bg-green-100"
                              >
                                Mark Delivered
                              </button>
                            )}

                            {!isTerminal && (
                              <button
                                onClick={() =>
                                  handleStatusChange(
                                    order._id,
                                    "Cancelled"
                                  )
                                }
                                className="whitespace-nowrap rounded border border-yellow-200 bg-yellow-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-yellow-700 transition-all duration-200 hover:border-yellow-400 hover:bg-yellow-100"
                              >
                                Cancel Order
                              </button>
                            )}

                            {/* View */}
                            <button
                              onClick={() =>
                                navigate(`/order/${order._id}`)
                              }
                              className="flex h-7 w-7 items-center justify-center rounded border border-indigo-200 bg-indigo-50 text-indigo-500 transition-all duration-200 hover:border-indigo-400 hover:bg-indigo-100"
                            >
                              <FaEye className="text-[12px]" />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() =>
                                handleDelete(order._id)
                              }
                              className="rounded border border-red-200 bg-red-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-red-500 transition-all duration-200 hover:border-red-400 hover:bg-red-100"
                            >
                              Delete
                            </button>

                          </div>
                        </td>

                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-sm tracking-[0.1em] text-gray-400"
                    >
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;