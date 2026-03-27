import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAdminProducts } from "../redux/slices/adminProductSlice";
import { fetchAllOrders } from "../redux/slices/adminOrderSlice";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
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
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.role !== "admin") {
      navigate("/");
      return;
    }
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch, navigate, user]);

  if (productsLoading || ordersLoading) {
    return (
      <div style={{ background: "#0d1117", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Inter", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>Loading...</p>
      </div>
    );
  }

  if (productsError) {
    return (
      <div style={{ background: "#0d1117", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#fca5a5", fontFamily: "Inter", fontSize: 11, letterSpacing: "0.2em" }}>Error: {productsError}</p>
      </div>
    );
  }

  if (ordersError) {
    return (
      <div style={{ background: "#0d1117", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#fca5a5", fontFamily: "Inter", fontSize: 11, letterSpacing: "0.2em" }}>Error: {ordersError}</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600&display=swap');
        .ah-root { font-family: 'Inter', sans-serif; }

        .ah-stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 8px;
          padding: 24px;
          transition: border-color 0.2s ease;
        }
        .ah-stat-card:hover {
          border-color: rgba(99,102,241,0.3);
        }

        .ah-stat-label {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 12px;
        }

        .ah-stat-value {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 32px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .ah-manage-link {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: #818cf8;
          text-decoration: none;
          border-bottom: 1px solid rgba(129,140,248,0.3);
          padding-bottom: 1px;
          transition: border-color 0.2s ease;
        }
        .ah-manage-link:hover { border-color: #818cf8; }

        .ah-table { width: 100%; border-collapse: collapse; }
        .ah-table thead tr {
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .ah-table th {
          text-align: left;
          padding: 10px 16px;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
        }
        .ah-table td {
          padding: 12px 16px;
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          border-bottom: 1px solid rgba(255,255,255,0.04);
          letter-spacing: 0.02em;
        }
        .ah-table tbody tr {
          transition: background 0.15s ease;
          cursor: pointer;
        }
        .ah-table tbody tr:hover {
          background: rgba(255,255,255,0.02);
        }

        .ah-status {
          display: inline-block;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 999px;
          background: rgba(99,102,241,0.1);
          color: #818cf8;
          border: 1px solid rgba(99,102,241,0.2);
        }
      `}</style>

      <div className="ah-root" style={{ background: "#0d1117", minHeight: "100vh", padding: "40px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 6 }}>Overview</p>
            <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 28, fontWeight: 600, color: "#ffffff", margin: 0 }}>
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
            <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 6 }}>Latest Activity</p>
            <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 18, fontWeight: 600, color: "#ffffff", marginBottom: 16 }}>
              Recent Orders
            </h2>

            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden" }}>
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
                        <td style={{ color: "rgba(255,255,255,0.25)", fontFamily: "monospace", fontSize: 11 }}>{order._id}</td>
                        <td>{order.user?.name || "N/A"}</td>
                        <td style={{ color: "#ffffff", fontWeight: 500 }}>${order.totalPrice}</td>
                        <td>
                          <span className="ah-status">{order.status}</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", padding: 32, fontSize: 12, letterSpacing: "0.1em" }}>
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
