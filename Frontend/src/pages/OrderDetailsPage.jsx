import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails } from "../redux/slices/orderSlice";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderDetails, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderDetails(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div style={{ background: "#111", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Montserrat", fontSize: 12, letterSpacing: "0.3em" }}>LOADING ORDER...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ background: "#111", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#fca5a5", fontFamily: "Montserrat", fontSize: 12, letterSpacing: "0.2em" }}>
          {error}
        </p>
      </div>
    );
  }

  if (!orderDetails || orderDetails._id !== id) {
    return (
      <div style={{ background: "#111", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Montserrat", fontSize: 12, letterSpacing: "0.2em" }}>
          ORDER DETAILS NOT AVAILABLE
        </p>
      </div>
    );
  }

  const subtotal = orderDetails.orderItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600&display=swap');
        .od-brand { font-family: 'Cormorant Garamond', serif; }
        .od-body  { font-family: 'Montserrat', sans-serif; }

        .od-section-title {
          font-size: 9px;
          letter-spacing: 0.3em;
          color: #c9a96e;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .od-back-link {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c9a96e;
          text-decoration: none;
          border-bottom: 1px solid rgba(201,169,110,0.3);
          padding-bottom: 2px;
          transition: border-color 0.3s ease;
        }
        .od-back-link:hover { border-color: #c9a96e; }

        .od-product-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding-bottom: 16px;
          margin-bottom: 16px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
      `}</style>

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #c9a96e, transparent)" }} />

      <div className="od-body" style={{ background: "#111", minHeight: "100vh", padding: "60px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="mb-10">
            <p style={{ fontSize: 9, letterSpacing: "0.4em", color: "#c9a96e", textTransform: "uppercase", marginBottom: 8 }}>Azurelle</p>
            <h1 className="od-brand" style={{ fontSize: 48, fontWeight: 300, color: "white", marginBottom: 12 }}>Order Details</h1>
            <div style={{ width: 32, height: 1, background: "#c9a96e" }} />
          </div>

          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: 32 }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 32, gap: 16 }}>
              <div>
                <p style={{ fontSize: 12, color: "white", marginBottom: 6 }}>
                  <span style={{ color: "#c9a96e", letterSpacing: "0.1em" }}>Order ID:</span>{" "}
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>#{orderDetails._id}</span>
                </p>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", marginBottom: 4 }}>
                  {new Date(orderDetails.createdAt).toLocaleDateString()}
                </p>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", marginBottom: 4 }}>
                  Payment: {orderDetails.paymentMethod}
                </p>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
                  Status: {orderDetails.paymentStatus || (orderDetails.isPaid ? "paid" : "pending")}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                <span
                  style={{
                    background: orderDetails.isPaid ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                    color: orderDetails.isPaid ? "#6ee7b7" : "#fca5a5",
                    border: `1px solid ${orderDetails.isPaid ? "rgba(110,231,183,0.2)" : "rgba(252,165,165,0.2)"}`,
                    padding: "4px 14px",
                    fontSize: 9,
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  {orderDetails.isPaid ? "Approved" : "Not Paid"}
                </span>
                <span
                  style={{
                    background: orderDetails.isDelivered ? "rgba(34,197,94,0.1)" : "rgba(201,169,110,0.1)",
                    color: orderDetails.isDelivered ? "#6ee7b7" : "#c9a96e",
                    border: `1px solid ${orderDetails.isDelivered ? "rgba(110,231,183,0.2)" : "rgba(201,169,110,0.2)"}`,
                    padding: "4px 14px",
                    fontSize: 9,
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  {orderDetails.isDelivered ? "Delivered" : "Processing Delivery"}
                </span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24, marginBottom: 32 }}>
              <div>
                <p className="od-section-title">Payment Info</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", marginBottom: 4 }}>
                  Method: {orderDetails.paymentMethod}
                </p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
                  Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}
                </p>
              </div>
              <div>
                <p className="od-section-title">Shipping Info</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", marginBottom: 4 }}>
                  {orderDetails.shippingAddress?.address}
                </p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", marginBottom: 4 }}>
                  {orderDetails.shippingAddress?.city} {orderDetails.shippingAddress?.postalCode}
                </p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
                  {orderDetails.shippingAddress?.country}
                </p>
              </div>
            </div>

            <p className="od-section-title">Order Summary</p>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16, marginBottom: 16 }}>
              {orderDetails.orderItems.map((item) => (
                <div key={`${item.productId}-${item.size || ""}-${item.color || ""}`} className="od-product-row">
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: 72, height: 88, objectFit: "cover", marginRight: 16 }}
                    />
                    <div>
                      <Link
                        to={`/product/${item.productId}`}
                        style={{ fontSize: 12, color: "white", textDecoration: "none", display: "block", marginBottom: 4 }}
                      >
                        {item.name}
                      </Link>
                      <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", marginBottom: 2 }}>
                        Qty: {item.quantity}
                      </p>
                      <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", marginBottom: 2 }}>
                        {item.color} {item.size ? `| ${item.size}` : ""}
                      </p>
                      <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
                        Unit: ${Number(item.price || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: "#c9a96e" }}>
                    ${Number((item.price || 0) * (item.quantity || 0)).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>Subtotal</p>
                <p style={{ fontSize: 11, color: "white" }}>${subtotal.toLocaleString()}</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>Shipping</p>
                <p style={{ fontSize: 11, color: "#6ee7b7" }}>Free</p>
              </div>
              <div style={{ height: 1, background: "linear-gradient(90deg, #c9a96e, transparent)", margin: "16px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontSize: 13, color: "white", letterSpacing: "0.1em" }}>Total</p>
                <p className="od-brand" style={{ fontSize: 16, color: "#c9a96e" }}>
                  ${Number(orderDetails.totalPrice ?? subtotal).toLocaleString()}
                </p>
              </div>
            </div>

            <div style={{ marginTop: 32, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 24 }}>
              <Link to={user?.role === "admin" ? "/admin/orders" : "/my-order"} className="od-back-link">
                {user?.role === "admin" ? "Back to Order Management" : "Back to My Orders"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsPage;
