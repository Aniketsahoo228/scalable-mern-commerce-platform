import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyOrdersPage from "../components/Products/MyOrderPage";
import { fetchProfile, logout, updateProfileImage } from "../redux/slices/authSlice";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [mounted, setMounted] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [navigate, user]);

  useEffect(() => {
    if (user && !user.createdAt) dispatch(fetchProfile());
  }, [dispatch, user]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const profileStats = useMemo(() => {
    const totalOrders = Array.isArray(orders) ? orders.length : 0;
    const totalSpent = Array.isArray(orders)
      ? orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0)
      : 0;
    return [
      { label: "Total Orders", value: String(totalOrders) },
      { label: "Total Spent", value: `$${totalSpent}` },
      { label: "Role", value: user?.role || "-" },
    ];
  }, [orders, user]);

  const profileDetails = [
    { label: "Full Name", value: user?.name || "-" },
    { label: "Email", value: user?.email || "-" },
    { label: "Role", value: user?.role || "-" },
    {
      label: "Member Since",
      value: user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })
        : "-",
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setPreviewImage(localUrl);
    await dispatch(updateProfileImage(localUrl));
  };

  const handleRemoveImage = async () => {
    setPreviewImage(null);
    await dispatch(updateProfileImage(null));
  };

  const displayImage = previewImage || user?.profileImage;

  const getInitials = (name = "") => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "?";
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const initials = getInitials(user?.name);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600&display=swap');

        .pr-root { font-family: 'Montserrat', sans-serif; }
        .pr-brand { font-family: 'Cormorant Garamond', serif; }

        .pr-page {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .pr-page.in { opacity: 1; transform: translateY(0); }

        .pr-fade {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .pr-page.in .pr-fade { opacity: 1; transform: translateY(0); }
        .pr-page.in .pr-fade:nth-child(1) { transition-delay: 0.1s; }
        .pr-page.in .pr-fade:nth-child(2) { transition-delay: 0.2s; }
        .pr-page.in .pr-fade:nth-child(3) { transition-delay: 0.3s; }
        .pr-page.in .pr-fade:nth-child(4) { transition-delay: 0.4s; }
        .pr-page.in .pr-fade:nth-child(5) { transition-delay: 0.5s; }

        @keyframes ring-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201,169,110,0.4); }
          50%       { box-shadow: 0 0 0 8px rgba(201,169,110,0); }
        }

        .pr-avatar-wrap {
          position: relative;
          width: 88px;
          height: 88px;
          margin: 0 auto 20px;
          cursor: pointer;
          border-radius: 50%;
        }

        .pr-avatar {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: rgba(201,169,110,0.08);
          border: 1px solid rgba(201,169,110,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          animation: ring-pulse 3s ease-in-out infinite;
          transition: border-color 0.3s ease;
        }
        .pr-avatar-wrap:hover .pr-avatar {
          border-color: rgba(201,169,110,0.7);
        }
        .pr-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pr-initials {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          font-weight: 400;
          color: #c9a96e;
          letter-spacing: 0.08em;
          user-select: none;
        }

        .pr-avatar-overlay {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(0,0,0,0.65);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .pr-avatar-wrap:hover .pr-avatar-overlay { opacity: 1; }

        .pr-camera-icon {
          width: 18px;
          height: 18px;
          border: 1.5px solid #c9a96e;
          border-radius: 3px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .pr-camera-icon::before {
          content: '';
          width: 7px; height: 7px;
          border-radius: 50%;
          border: 1.5px solid #c9a96e;
        }
        .pr-camera-icon::after {
          content: '';
          position: absolute;
          top: -4px; left: 50%;
          transform: translateX(-50%);
          width: 5px; height: 3px;
          border-radius: 2px 2px 0 0;
          border: 1.5px solid #c9a96e;
          border-bottom: none;
        }

        .pr-overlay-text {
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #c9a96e;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }

        .pr-overlay-divider {
          width: 20px;
          height: 1px;
          background: rgba(201,169,110,0.2);
        }

        .pr-overlay-remove {
          font-size: 7px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(239,100,100,0.55);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          line-height: 1;
          transition: color 0.2s ease;
        }
        .pr-overlay-remove:hover { color: rgba(239,100,100,0.9); }

        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .pr-name {
          background: linear-gradient(90deg, #c9a96e 30%, #f0d898 50%, #c9a96e 70%);
          background-size: 400px 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        @keyframes scan {
          0%   { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        .pr-topline {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #c9a96e 50%, transparent 100%);
          background-size: 200% 100%;
          animation: scan 3s linear infinite;
        }

        .pr-stat {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,169,110,0.12);
          border-radius: 2px;
          text-align: center;
          padding: 24px 16px;
          cursor: default;
          transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .pr-stat::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 100%; height: 1px;
          background: #c9a96e;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .pr-stat:hover { transform: translateY(-4px); border-color: rgba(201,169,110,0.35); background: rgba(201,169,110,0.04); }
        .pr-stat:hover::before { transform: scaleX(1); }

        .pr-tab {
          position: relative;
          padding-bottom: 12px;
          margin-right: 32px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        .pr-tab::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 100%; height: 1px;
          background: #c9a96e;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }
        .pr-tab.active::after { transform: scaleX(1); }

        .pr-detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          transition: background 0.25s ease;
        }
        .pr-detail-row:hover { background: rgba(201,169,110,0.04); }

        .pr-tab-content { animation: tabIn 0.4s ease both; }
        @keyframes tabIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .pr-logout {
          width: 100%;
          margin-top: 40px;
          padding: 16px;
          background: transparent;
          border: 1px solid rgba(239,68,68,0.2);
          color: rgba(239,68,68,0.5);
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: color 0.3s ease, border-color 0.3s ease;
        }
        .pr-logout::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(239,68,68,0.06);
          transform: translateX(-100%);
          transition: transform 0.4s ease;
        }
        .pr-logout:hover { color: #f87171; border-color: rgba(239,68,68,0.45); }
        .pr-logout:hover::after { transform: translateX(0); }
        .pr-logout span { position: relative; z-index: 1; }

        @keyframes float-up {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          10%  { opacity: 0.6; }
          90%  { opacity: 0.2; }
          100% { transform: translateY(-120px) translateX(20px); opacity: 0; }
        }
        .pr-particle {
          position: absolute;
          width: 2px; height: 2px;
          border-radius: 50%;
          background: #c9a96e;
          animation: float-up linear infinite;
          pointer-events: none;
        }
      `}</style>

      <div className="pr-root" style={{ background: "#111", minHeight: "100vh", position: "relative", overflow: "hidden" }}>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {[...Array(8)].map((_, i) => (
          <div key={i} className="pr-particle" style={{
            left: `${10 + i * 12}%`,
            bottom: `${10 + (i % 3) * 8}%`,
            animationDuration: `${4 + i * 0.8}s`,
            animationDelay: `${i * 0.6}s`,
            opacity: 0,
          }} />
        ))}

        <div className="pr-topline" />

        <div className={`pr-page ${mounted ? "in" : ""}`} style={{ maxWidth: 780, margin: "0 auto", padding: "64px 24px" }}>

          {/* Header */}
          <div className="pr-fade" style={{ textAlign: "center", marginBottom: 48 }}>

            <div className="pr-avatar-wrap" onClick={handleAvatarClick} title="Change profile photo">
              <div className="pr-avatar">
                {displayImage ? (
                  <img src={displayImage} alt={user?.name || "Profile"} />
                ) : (
                  <span className="pr-initials">{initials}</span>
                )}
              </div>
              <div className="pr-avatar-overlay">
                <div className="pr-camera-icon" />
                <button className="pr-overlay-text" onClick={handleAvatarClick}>
                  Change
                </button>
                {displayImage && (
                  <>
                    <div className="pr-overlay-divider" />
                    <button
                      className="pr-overlay-remove"
                      onClick={(e) => { e.stopPropagation(); handleRemoveImage(); }}
                    >
                      Remove
                    </button>
                  </>
                )}
              </div>
            </div>

            <p style={{ fontSize: 9, letterSpacing: "0.4em", color: "#c9a96e", textTransform: "uppercase", marginBottom: 12 }}>
              Member Profile
            </p>
            <h1 className="pr-brand pr-name" style={{ fontSize: 56, fontWeight: 300, letterSpacing: "0.04em", margin: "0 0 12px" }}>
              {user?.name || "Member"}
            </h1>
            <div style={{ width: 32, height: 1, background: "#c9a96e", margin: "0 auto 12px" }} />
            <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)" }}>
              {user?.email || "-"}
            </p>
          </div>

          {/* Stats */}
          <div className="pr-fade" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 40 }}>
            {profileStats.map((stat, i) => (
              <div key={stat.label} className="pr-stat" style={{ transitionDelay: `${0.05 * i}s` }}>
                <p className="pr-brand" style={{ fontSize: 40, fontWeight: 300, color: "#fff", marginBottom: 6 }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="pr-fade" style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: 28 }}>
            {["orders", "details"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pr-tab ${activeTab === tab ? "active" : ""}`}
                style={{ color: activeTab === tab ? "#c9a96e" : "rgba(255,255,255,0.3)" }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="pr-fade">
            {activeTab === "orders" && (
              <div key="orders" className="pr-tab-content" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: 24 }}>
                <MyOrdersPage />
              </div>
            )}
            {activeTab === "details" && (
              <div key="details" className="pr-tab-content" style={{ border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}>
                {profileDetails.map((item, i, arr) => (
                  <div key={item.label} className="pr-detail-row" style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
                      {item.label}
                    </span>
                    <span style={{ fontSize: 13, letterSpacing: "0.05em", color: "#fff" }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Logout */}
          <div className="pr-fade">
            <button className="pr-logout" onClick={handleLogout}>
              <span>Logout</span>
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default Profile;
