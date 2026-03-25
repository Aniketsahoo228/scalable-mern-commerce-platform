import { useDispatch, useSelector } from "react-redux";
import MyOrdersPage from "../components/Products/MyOrderPage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

   const handleLogout = () => {
     dispatch(logout());
     dispatch(clearCart());
     navigate("/login");
   }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600&display=swap');
        .profile-root { font-family: 'Montserrat', sans-serif; }
        .profile-brand { font-family: 'Cormorant Garamond', serif; }
      `}</style>

      <div
        className="profile-root min-h-screen"
        style={{ background: "linear-gradient(160deg, #1a1a1a 0%, #111 100%)" }}
      >
        {/* Gold top line */}
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #c9a96e, transparent)" }} />

        <div className="max-w-4xl mx-auto px-6 py-16">

          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-[9px] font-semibold tracking-[0.4em] uppercase mb-4" style={{ color: "#c9a96e" }}>
              Member Profile
            </p>
            <h1 className="profile-brand text-6xl font-light text-white tracking-wide mb-2">
              {user?.name}
            </h1>
            <div style={{ width: 32, height: 1, background: "#c9a96e", margin: "12px auto" }} />
            <p className="text-[11px] tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.35)" }}>
               {user?.email}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { label: "Total Orders", value: "2" },
              { label: "Total Spent",  value: "$240" },
              { label: "Wishlist",     value: "—" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center py-6 px-4"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(201,169,110,0.15)",
                  borderRadius: 2,
                }}
              >
                <p className="profile-brand text-4xl font-light text-white mb-1">{stat.value}</p>
                <p className="text-[9px] font-semibold tracking-[0.25em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex mb-8" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            {["orders", "details"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative pb-3 mr-8 text-[10px] font-semibold tracking-[0.25em] uppercase transition-colors duration-300 capitalize"
                style={{
                  color: activeTab === tab ? "#c9a96e" : "rgba(255,255,255,0.3)",
                  background: "none", border: "none", cursor: "pointer",
                }}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full" style={{ height: 1, background: "#c9a96e" }} />
                )}
              </button>
            ))}
          </div>

          {/* ✅ Only change — added wrapper div */}
          {activeTab === "orders" && (
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "24px" }}>
              <MyOrdersPage />
            </div>
          )}

          {/* Details Tab */}
          {activeTab === "details" && (
            <div style={{ border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}>
              {[
                { label: "Full Name",    value: "John Doe" },
                { label: "Email",        value: "john@example.com" },
                { label: "Phone",        value: "+91 98765 43210" },
                { label: "Member Since", value: "January 2024" },
              ].map((item, i, arr) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center px-6 py-5"
                  style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
                >
                  <span className="text-[9px] font-semibold tracking-[0.25em] uppercase"
                    style={{ color: "rgba(255,255,255,0.3)" }}>
                    {item.label}
                  </span>
                  <span className="text-[13px] tracking-wide text-white">{item.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Logout */}
          <button
            className="mt-10 w-full py-4 text-[10px] font-semibold tracking-[0.3em] uppercase transition-all duration-300"
            style={{
              background: "transparent",
              border: "1px solid rgba(239,68,68,0.25)",
              color: "rgba(239,68,68,0.6)",
              cursor: "pointer",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(239,68,68,0.07)";
              e.currentTarget.style.borderColor = "rgba(239,68,68,0.5)";
              e.currentTarget.style.color = "#f87171";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(239,68,68,0.25)";
              e.currentTarget.style.color = "rgba(239,68,68,0.6)";
            }}
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      </div>
    </>
  );
};

export default Profile;
