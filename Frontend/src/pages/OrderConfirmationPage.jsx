import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  useEffect(() => {
    if (order && order._id) {
      dispatch(clearCart());
    } else {
      navigate("/my-order");
    }
  }, [order, dispatch, navigate]);

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  if (!order) {
    return null;
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600&display=swap');
        .oc-brand { font-family: 'Cormorant Garamond', serif; }
        .oc-body  { font-family: 'Montserrat', sans-serif; }

        .oc-section-title {
          font-size: 9px;
          letter-spacing: 0.3em;
          color: #c9a96e;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .oc-detail-link {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c9a96e;
          text-decoration: none;
          border-bottom: 1px solid rgba(201,169,110,0.3);
          padding-bottom: 2px;
          transition: border-color 0.3s ease;
        }
        .oc-detail-link:hover { border-color: #c9a96e; }

        .oc-product-row {
          display: flex;
          align-items: center;
          padding-bottom: 16px;
          margin-bottom: 16px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
      `}</style>

      {/* Gold top line */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #c9a96e, transparent)" }} />

      <div className="oc-body" style={{ background: "#111", minHeight: "100vh", padding: "60px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>

          {/* Page Header */}
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.4em", color: "#c9a96e", textTransform: "uppercase", marginBottom: 8 }}>Azurelle</p>
            <h1 className="oc-brand" style={{ fontSize: 48, fontWeight: 300, color: "white", marginBottom: 12 }}>Order Confirmed</h1>
            <div style={{ width: 32, height: 1, background: "#c9a96e" }} />
          </div>

          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: 32 }}>

            {/* Order Meta */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 32, gap: 16 }}>
              <div>
                <p style={{ fontSize: 12, color: "white", marginBottom: 6 }}>
                  <span style={{ color: "#c9a96e", letterSpacing: "0.1em" }}>Order ID:</span>{" "}
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>{order._id}</span>
                </p>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
                  Order Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6ee7b7" }}>
                  Estimated Delivery: {calculateEstimatedDelivery(order.createdAt)}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <p className="oc-section-title">Items</p>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16, marginBottom: 32 }}>
              {order.orderItems.map((item) => (
                <div key={item.productId} className="oc-product-row">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: 72, height: 88, objectFit: "cover", marginRight: 16 }}
                  />
                  <div>
                    <p style={{ fontSize: 12, color: "white", marginBottom: 4 }}>{item.name}</p>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", marginBottom: 2 }}>
                      {item.color} | {item.size}
                    </p>
                  </div>
                  <div style={{ marginLeft: "auto", textAlign: "right" }}>
                    <p style={{ fontSize: 14, color: "#c9a96e", marginBottom: 4 }}>${item.price}</p>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment + Delivery */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24, marginBottom: 32 }}>
              <div>
                <p className="oc-section-title">Payment</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>{order.paymentMethod}</p>
              </div>
              <div>
                <p className="oc-section-title">Delivery</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", marginBottom: 4 }}>{order.shippingAddress.address}</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", marginBottom: 4 }}>
                  {order.shippingAddress.city} {order.shippingAddress.postalCode}
                </p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>{order.shippingAddress.country}</p>
              </div>
            </div>

            {/* View Order Link */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 24 }}>
              <Link to={`/order/${order._id}`} className="oc-detail-link">View Order Details →</Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmationPage;
