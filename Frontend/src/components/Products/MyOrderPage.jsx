import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/order/${id}`);
  };

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
      <div className="flex flex-col items-center justify-center"
        style={{ background: '#111', minHeight: '100vh' }}>
        <div className="w-8 h-8 rounded-full mb-4"
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
      <div className="flex flex-col items-center justify-center"
        style={{ background: '#111', minHeight: '100vh' }}>
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mop-card { animation: fadeUp 0.5s ease both; }
        .mop-card:nth-child(1) { animation-delay: 0.05s; }
        .mop-card:nth-child(2) { animation-delay: 0.15s; }
        .mop-card:nth-child(3) { animation-delay: 0.25s; }
        .mop-card:nth-child(4) { animation-delay: 0.35s; }
      `}</style>

      <div style={{ fontFamily: "'Montserrat', sans-serif", background: '#111', minHeight: '100vh' }}>

        {/* Gold top line */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)' }} />

        <div className="max-w-5xl mx-auto px-6 py-16">

          {/* Page Header */}
          <div className="mb-12">
            <p className="text-[9px] font-semibold tracking-[0.4em] uppercase mb-2" style={{ color: '#c9a96e' }}>
              Your Account
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-5xl font-light text-white mb-3">
              Order History
            </h1>
            <div style={{ width: 32, height: 1, background: '#c9a96e' }} />
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { label: "Total Orders", value: orders.length },
              { label: "Paid",         value: orders.filter(o => o.isPaid).length },
              { label: "Pending",      value: orders.filter(o => !o.isPaid).length },
            ].map((stat) => (
              <div key={stat.label} className="text-center py-8"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(201,169,110,0.12)',
                }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", color: '#c9a96e' }}
                  className="text-5xl font-light mb-2">{stat.value}</p>
                <p className="text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-6">
            <p className="text-[9px] font-semibold tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Recent Orders
            </p>
            <div className="flex-1" style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />
          </div>

          {/* Order Cards — changed from table to cards for fuller look */}
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                onClick={() => handleRowClick(order._id)}
                className="mop-card cursor-pointer transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,169,110,0.25)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
              >
                <div className="flex items-center gap-6 p-5">

                  {/* Image */}
                  <img
                    src={order.orderItems[0].image}
                    alt={order.orderItems[0].name}
                    className="flex-shrink-0 object-cover"
                    style={{ width: 72, height: 88, border: '1px solid rgba(255,255,255,0.08)' }}
                  />

                  {/* Main Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <Link
                          to={`/order/${order._id}`}
                          onClick={e => e.stopPropagation()}
                          className="text-[11px] font-semibold tracking-[0.2em] uppercase"
                          style={{ color: '#c9a96e' }}
                        >
                          Order #{order._id}
                        </Link>
                        <p className="text-[10px] mt-1 tracking-wide" style={{ color: 'rgba(255,255,255,0.3)' }}>
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </p>
                      </div>

                      {/* Status badge */}
                      <span
                        className="text-[9px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5"
                        style={
                          order.isPaid
                            ? { background: 'rgba(16,185,129,0.08)', color: '#6ee7b7', border: '1px solid rgba(16,185,129,0.2)' }
                            : { background: 'rgba(239,68,68,0.08)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.2)' }
                        }
                      >
                        {order.isPaid ? "Paid" : "Pending"}
                      </span>
                    </div>

                    {/* Meta row */}
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-[8px] tracking-[0.2em] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.2)' }}>Location</p>
                        <p className="text-[11px] text-white">{order.shippingAddress.city}, {order.shippingAddress.country}</p>
                      </div>
                      <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.06)' }} />
                      <div>
                        <p className="text-[8px] tracking-[0.2em] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.2)' }}>Items</p>
                        <p className="text-[11px] text-white">{order.orderItems.length}</p>
                      </div>
                      <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.06)' }} />
                      <div>
                        <p className="text-[8px] tracking-[0.2em] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.2)' }}>Total</p>
                        <p className="text-[13px] font-semibold" style={{ color: '#c9a96e' }}>${order.totalPrice}</p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 text-[18px]" style={{ color: 'rgba(201,169,110,0.3)' }}>›</div>

                </div>
              </div>
            ))}
          </div>

          {/* Footer hint */}
          <div className="mt-10 text-center">
            <p className="text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.12)' }}>
              Click any order to view full details
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default MyOrdersPage;


