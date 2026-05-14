import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MyOrdersPage from "../components/Products/MyOrderPage";

import {
  fetchProfile,
  logout,
  updateProfileImage,
} from "../redux/slices/authSlice";

import { fetchUserOrders } from "../redux/slices/orderSlice";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [mounted, setMounted] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.order);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/login");
  }, [navigate, user]);

  // ALWAYS fetch fresh profile + orders from DB
  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchUserOrders());
  }, [dispatch]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);

    return () => clearTimeout(t);
  }, []);

  const profileStats = useMemo(() => {
    const totalOrders = Array.isArray(orders)
      ? orders.length
      : 0;

    const totalSpent = Array.isArray(orders)
      ? orders.reduce(
          (sum, order) =>
            sum + (order.totalPrice || 0),
          0
        )
      : 0;

    return [
      {
        label: "Total Orders",
        value: String(totalOrders),
      },
      {
        label: "Total Spent",
        value: `$${totalSpent}`,
      },
      {
        label: "Role",
        value: user?.role || "-",
      },
    ];
  }, [orders, user]);

  const profileDetails = [
    {
      label: "Full Name",
      value: user?.name || "-",
    },
    {
      label: "Email",
      value: user?.email || "-",
    },
    {
      label: "Role",
      value: user?.role || "-",
    },
    {
      label: "Member Since",
      value: user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
            }
          )
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

  const displayImage =
    previewImage || user?.profileImage;

  const getInitials = (name = "") => {
    const parts = name
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (parts.length === 0) return "?";

    if (parts.length === 1) {
      return parts[0]
        .charAt(0)
        .toUpperCase();
    }

    return (
      parts[0].charAt(0) +
      parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  const initials = getInitials(user?.name);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#111] font-[Montserrat] text-white">

      {/* TOP LINE */}
      <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent animate-pulse" />

      {/* HIDDEN FILE INPUT */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* PARTICLES */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute h-[2px] w-[2px] rounded-full bg-[#c9a96e] animate-bounce opacity-20"
          style={{
            left: `${10 + i * 12}%`,
            bottom: `${10 + (i % 3) * 8}%`,
            animationDuration: `${4 + i * 0.8}s`,
            animationDelay: `${i * 0.6}s`,
          }}
        />
      ))}

      <div
        className={`mx-auto max-w-[780px] px-6 py-16 transition-all duration-700 ${
          mounted
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0"
        }`}
      >

        {/* HEADER */}
        <div className="mb-12 text-center">

          {/* AVATAR */}
          <div
            className="group relative mx-auto mb-5 h-[88px] w-[88px] cursor-pointer rounded-full"
            onClick={handleAvatarClick}
            title="Change profile photo"
          >

            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-[#c9a96e59] bg-[#c9a96e14] transition-all duration-300 group-hover:border-[#c9a96eb3]">

              {displayImage ? (
                <img
                  src={displayImage}
                  alt={user?.name || "Profile"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-[Cormorant_Garamond] text-[26px] tracking-[0.08em] text-[#c9a96e]">
                  {initials}
                </span>
              )}
            </div>

            {/* OVERLAY */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-full bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">

              <button
                className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#c9a96e]"
                onClick={handleAvatarClick}
              >
                Change
              </button>

              {displayImage && (
                <>
                  <div className="h-[1px] w-5 bg-[#c9a96e33]" />

                  <button
                    className="text-[7px] font-semibold uppercase tracking-[0.1em] text-red-400/60 transition hover:text-red-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage();
                    }}
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
          </div>

          <p className="mb-3 text-[9px] uppercase tracking-[0.4em] text-[#c9a96e]">
            Member Profile
          </p>

          <h1 className="mb-3 font-[Cormorant_Garamond] text-[56px] font-light tracking-[0.04em] text-[#c9a96e]">
            {user?.name || "Member"}
          </h1>

          <div className="mx-auto mb-3 h-[1px] w-8 bg-[#c9a96e]" />

          <p className="text-[11px] tracking-[0.2em] text-white/30">
            {user?.email || "-"}
          </p>
        </div>

        {/* STATS */}
        <div className="mb-10 grid grid-cols-1 gap-3 md:grid-cols-3">

          {profileStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-sm border border-[#c9a96e1f] bg-white/[0.03] px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a96e59] hover:bg-[#c9a96e0a]"
            >
              <p className="mb-1 font-[Cormorant_Garamond] text-[40px] font-light text-white">
                {stat.value}
              </p>

              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/30">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div className="mb-7 flex border-b border-white/10">

          {["orders", "details"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative mr-8 pb-3 text-[10px] font-semibold uppercase tracking-[0.25em] transition-colors duration-300 ${
                activeTab === tab
                  ? "text-[#c9a96e]"
                  : "text-white/30"
              }`}
            >
              {tab}

              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 h-[1px] w-full bg-[#c9a96e]" />
              )}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="transition-all duration-300">

          {activeTab === "orders" && (
            <div className="border border-white/10 bg-white/[0.02] p-6">
              <MyOrdersPage />
            </div>
          )}

          {activeTab === "details" && (
            <div className="border border-white/10 bg-white/[0.02]">

              {profileDetails.map((item, i, arr) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between px-6 py-5 transition-colors duration-300 hover:bg-[#c9a96e0a] ${
                    i < arr.length - 1
                      ? "border-b border-white/10"
                      : ""
                  }`}
                >
                  <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/30">
                    {item.label}
                  </span>

                  <span className="text-[13px] tracking-[0.05em] text-white">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* LOGOUT */}
        <div className="mt-10">

          <button
            className="group relative w-full overflow-hidden border border-red-400/20 px-4 py-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-red-400/50 transition-all duration-300 hover:border-red-400/50 hover:text-red-400"
            onClick={handleLogout}
          >
            <span className="relative z-10">
              Logout
            </span>

            <span className="absolute inset-0 -translate-x-full bg-red-400/10 transition-transform duration-300 group-hover:translate-x-0" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;