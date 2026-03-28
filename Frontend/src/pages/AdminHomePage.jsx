import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAdminProducts } from "../redux/slices/adminProductSlice";
import { fetchAllOrders } from "../redux/slices/adminOrderSlice";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);

  const {
    orders,
    totalOrders,
    totalSales,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  if (productsLoading || ordersLoading) {
    return (
      <div style={{ background: "#f5f5f7", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#999", fontFamily: "Inter", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>Loading...</p>
      </div>
    );
  }

  if (productsError) {
    return (
      <div style={{ background: "#f5f5f7", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#ef4444", fontFamily: "Inter", fontSize: 11 }}>Error: {productsError}</p>
      </div>
    );
  }

  if (ordersError) {
    return (
      <div style={{ background: "#f5f5f7", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#ef4444", fontFamily: "Inter", fontSize: 11 }}>Error: {ordersError}</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600&display=swap');
        .ah-root { font-family: 'Inter', sans-serif; }

        .ah-stat-card {
          background: #ffffff;
          border: 1px solid #e8e8ed;
          border-radius: 10px;
          padding: 24px;
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .ah-stat-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border-color: #c7c7cc;
        }

        .ah-stat-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 10px;
        }

        .ah-stat-value {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 30px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 10px;
        }

        .ah-manage-link {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: #6366f1;
          text-decoration: none;
          border-bottom: 1px solid rgba(99,102,241,0.3);
          padding-bottom: 1px;
          transition: border-color 0.2s ease;
        }
        .ah-manage-link:hover { border-color: #6366f1; }

        .ah-table { width: 100%; border-collapse: collapse; }
        .ah-table thead tr {
          border-bottom: 1px solid #e8e8ed;
        }
        .ah-table th {
          text-align: left;
          padding: 10px 16px;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #aaa;
        }
        .ah-table td {
          padding: 12px 16px;
          font-size: 12px;
          color: #444;
          border-bottom: 1px solid #f0f0f3;
          letter-spacing: 0.02em;
        }
        .ah-table tbody tr {
          transition: background 0.15s ease;
          cursor: pointer;
        }
        .ah-table tbody tr:hover {
          background: #f9f9fb;
        }

        .ah-status {
          display: inline-block;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 999px;
          background: rgba(99,102,241,0.08);
          color: #6366f1;
          border: 1px solid rgba(99,102,241,0.2);
        }
      `}</style>

      <div className="ah-root" style={{ background: "#f5f5f7", minHeight: "100vh", padding: "40px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#aaa", marginBottom: 6 }}>Overview</p>
            <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 28, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>
              Admin Dashboard
            </h1>
          </div>

          {/* Stat Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 40 }}>
            <div className="ah-stat-card">
              <p className="ah-stat-label">Revenue</p>
              <p className="ah-stat-value">${totalSales}</p>
            </div>
            <div className="ah-stat-card">
              <p className="ah-stat-label">Total Orders</p>
              <p className="ah-stat-value">{totalOrders}</p>
              <Link to="/admin/orders" className="ah-manage-link">Manage Orders</Link>
            </div>
            <div className="ah-stat-card">
              <p className="ah-stat-label">Total Products</p>
              <p className="ah-stat-value">{products.length}</p>
              <Link to="/admin/products" className="ah-manage-link">Manage Products</Link>
            </div>
          </div>

          {/* Recent Orders */}
          <div>
            <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#aaa", marginBottom: 6 }}>Latest Activity</p>
            <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 18, fontWeight: 600, color: "#1a1a1a", marginBottom: 16 }}>
              Recent Orders
            </h2>

            <div style={{ background: "#ffffff", border: "1px solid #e8e8ed", borderRadius: 10, overflow: "hidden" }}>
              <table className="ah-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Total Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order._id}>
                        <td style={{ color: "#888", fontFamily: "monospace", fontSize: 11 }}>{order._id}</td>
                        <td>{order.user?.name || "N/A"}</td>
                        <td style={{ color: "#1a1a1a", fontWeight: 500 }}>${order.totalPrice}</td>
                        <td>
                          <span className="ah-status">{order.status}</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ textAlign: "center", color: "#bbb", padding: 32, fontSize: 12, letterSpacing: "0.1em" }}>
                        No recent orders found
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

export default AdminHomePage;
