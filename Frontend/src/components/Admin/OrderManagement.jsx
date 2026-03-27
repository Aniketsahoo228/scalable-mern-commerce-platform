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
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
  };

  const handleDelete = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(deleteOrder(orderId));
    }
  };

  const statusConfig = (status) => {
    switch (status) {
      case "Delivered":
        return { bg: "rgba(34,197,94,0.08)", color: "#16a34a", border: "rgba(34,197,94,0.2)" };
      case "Shipping":
        return { bg: "rgba(99,102,241,0.08)", color: "#6366f1", border: "rgba(99,102,241,0.2)" };
      case "Cancelled":
        return { bg: "rgba(239,68,68,0.08)", color: "#ef4444", border: "rgba(239,68,68,0.2)" };
      default:
        return { bg: "rgba(234,179,8,0.08)", color: "#b45309", border: "rgba(234,179,8,0.2)" };
    }
  };

  if (loading) return (
    <div style={{ background: "#f5f5f7", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#999", fontFamily: "Inter", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>Loading...</p>
    </div>
  );

  if (error) return (
    <div style={{ background: "#f5f5f7", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#ef4444", fontFamily: "Inter", fontSize: 11 }}>Error: {error}</p>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600&display=swap');
        .om-root { font-family: 'Inter', sans-serif; }

        .om-table { width: 100%; border-collapse: collapse; }
        .om-table thead tr { border-bottom: 1px solid #e8e8ed; }
        .om-table th {
          text-align: left;
          padding: 10px 16px;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #aaa;
        }
        .om-table td {
          padding: 12px 16px;
          font-size: 12px;
          color: #444;
          border-bottom: 1px solid #f0f0f3;
          vertical-align: middle;
        }
        .om-table tbody tr { transition: background 0.15s ease; cursor: pointer; }
        .om-table tbody tr:hover { background: #f9f9fb; }

        .om-deliver-btn {
          padding: 5px 12px;
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 4px;
          color: #16a34a;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .om-deliver-btn:hover {
          background: rgba(34,197,94,0.15);
          border-color: rgba(34,197,94,0.4);
        }

        .om-view-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          background: rgba(99,102,241,0.08);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 4px;
          color: #6366f1;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 12px;
        }
        .om-view-btn:hover {
          background: rgba(99,102,241,0.15);
          border-color: rgba(99,102,241,0.4);
        }

        .om-delete-btn {
          padding: 5px 12px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 4px;
          color: #ef4444;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .om-delete-btn:hover {
          background: rgba(239,68,68,0.15);
          border-color: rgba(239,68,68,0.4);
        }
      `}</style>

      <div className="om-root" style={{ background: "#f5f5f7", minHeight: "100vh", padding: "40px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#aaa", marginBottom: 6 }}>Admin</p>
            <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 28, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>
              Order Management
            </h1>
          </div>

          {/* Table Card */}
          <div style={{ background: "#ffffff", border: "1px solid #e8e8ed", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0f0f3" }}>
              <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#aaa", marginBottom: 4 }}>All Transactions</p>
              <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 16, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>
                Orders
              </h2>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table className="om-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order) => {
                      const s = statusConfig(order.status);
                      return (
                        <tr key={order._id}>
                          <td style={{ color: "#888", fontFamily: "monospace", fontSize: 11, whiteSpace: "nowrap" }}>
                            {order._id}
                          </td>
                          <td style={{ color: "#1a1a1a", fontWeight: 500 }}>
                            {order.user?.name || "N/A"}
                          </td>
                          <td style={{ color: "#1a1a1a", fontWeight: 500 }}>
                            ${order.totalPrice}
                          </td>
                          <td>
                            <span style={{
                              display: "inline-block",
                              padding: "3px 10px",
                              borderRadius: "999px",
                              fontSize: 9,
                              fontWeight: 600,
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                              background: s.bg,
                              color: s.color,
                              border: `1px solid ${s.border}`,
                            }}>
                              {order.status}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              {/* Show 'Mark Delivered' if the order is not yet Delivered or Cancelled */}
                              {order.status !== "Delivered" && order.status !== "Cancelled" && (
                                <button
                                  onClick={() => handleStatusChange(order._id, "Delivered")}
                                  className="om-deliver-btn"
                                >
                                  Mark Delivered
                                </button>
                              )}

                              {/* NEW: Cancel Button - Show if order is active (not Delivered/Cancelled) */}
                              {order.status !== "Cancelled" && order.status !== "Delivered" && (
                                <button
                                  onClick={() => {
                                    if (window.confirm("Are you sure you want to cancel this order?")) {
                                      handleStatusChange(order._id, "Cancelled");
                                    }
                                  }}
                                  className="om-delete-btn"
                                >
                                  Cancel
                                </button>
                              )}

                              <button
                                onClick={() => navigate(`/order/${order._id}`)}
                                className="om-view-btn"
                              >
                                <FaEye />
                              </button>

                              <button
                                onClick={() => handleDelete(order._id)}
                                className="om-delete-btn"
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
                      <td colSpan={5} style={{ textAlign: "center", color: "#bbb", padding: 32, fontSize: 12, letterSpacing: "0.1em" }}>
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
    </>
  );
};

export default OrderManagement;