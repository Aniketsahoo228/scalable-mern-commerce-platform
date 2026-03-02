import { useEffect, useState } from "react";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockOrders = [
        {
          _id: "12345",
          createdAt: new Date(),
          shippingAddress: { city: "New York", country: "USA" },
          orderItems: [{ name: "Product 1", image: "https://picsum.photos/500/500?random=1" }],
          totalPrice: 120,
          isPaid: true,
        },
        {
          _id: "34567",
          createdAt: new Date(),
          shippingAddress: { city: "New York", country: "USA" },
          orderItems: [{ name: "Product 2", image: "https://picsum.photos/500/500?random=2" }],
          totalPrice: 120,
          isPaid: false,
        },
      ];
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div
          className="w-8 h-8 rounded-full mb-4"
          style={{
            border: "1px solid rgba(201,169,110,0.3)",
            borderTop: "1px solid #c9a96e",
            animation: "spin 1s linear infinite",
          }}
        />
        <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>
          Loading Orders...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20"
        style={{ border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
          style={{ border: "1px solid rgba(201,169,110,0.3)" }}>
          <span style={{ color: "#c9a96e", fontSize: 20 }}>✦</span>
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl font-light text-white mb-2">
          No orders yet
        </p>
        <p className="text-[11px] tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>
          Your order history will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      {/* Table Header */}
      <div
        className="grid grid-cols-7 gap-2 px-4 py-3 mb-1"
        style={{ borderBottom: "1px solid rgba(201,169,110,0.15)" }}
      >
        {["Image", "Order ID", "Date", "Location", "Items", "Price", "Status"].map((h) => (
          <p key={h} className="text-[8px] font-semibold tracking-[0.25em] uppercase"
            style={{ color: "rgba(255,255,255,0.25)" }}>
            {h}
          </p>
        ))}
      </div>

      {/* Rows */}
      <div className="space-y-1">
        {orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-7 gap-2 items-center px-4 py-4 transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.04)",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(201,169,110,0.2)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)"}
          >
            {/* Image */}
            <div>
              <img
                src={order.orderItems[0].image}
                alt={order.orderItems[0].name}
                className="w-10 h-10 object-cover"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              />
            </div>

            {/* Order ID */}
            <p className="text-[11px] tracking-wide text-white font-medium truncate">
              #{order._id}
            </p>

            {/* Date */}
            <p className="text-[10px] tracking-wide" style={{ color: "rgba(255,255,255,0.4)" }}>
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            {/* Location */}
            <p className="text-[10px] tracking-wide" style={{ color: "rgba(255,255,255,0.4)" }}>
              {order.shippingAddress.city}, {order.shippingAddress.country}
            </p>

            {/* Items */}
            <p className="text-[11px] text-white">{order.orderItems.length}</p>

            {/* Price */}
            <p className="text-[11px] font-semibold" style={{ color: "#c9a96e" }}>
              ${order.totalPrice}
            </p>

            {/* Status */}
            <span
              className="text-[9px] font-semibold tracking-[0.15em] uppercase px-2 py-1 text-center"
              style={
                order.isPaid
                  ? { background: "rgba(16,185,129,0.1)", color: "#6ee7b7", border: "1px solid rgba(16,185,129,0.2)" }
                  : { background: "rgba(239,68,68,0.08)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.2)" }
              }
            >
              {order.isPaid ? "Paid" : "Pending"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;