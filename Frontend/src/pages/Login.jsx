import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../assets/login.webp";
import { loginUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { guestId, loading, error } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  
  // Get redirect parameter and check if it's checkout or something
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await dispatch(loginUser({ email , password })).unwrap();

      if (cart?.products?.length > 0 && guestId) {
        await dispatch(mergeCart({ guestId, user })).unwrap();
      }

      navigate(isCheckoutRedirect ? "/checkout" : "/", { replace: true });
    } catch (err) {
      // Error state is already handled in Redux/UI
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

        .login-root { font-family: 'Montserrat', sans-serif; }
        .brand-font { font-family: 'Cormorant Garamond', serif; }

        .input-field {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid #d1c9be;
          padding: 12px 0;
          font-size: 14px;
          color: #1a1a1a;
          outline: none;
          font-family: 'Montserrat', sans-serif;
          transition: border-color 0.4s ease;
          letter-spacing: 0.05em;
        }
        .input-field::placeholder { color: #c4b9ae; }
        .input-field:focus { border-bottom-color: #1a1a1a; }

        .input-wrapper { position: relative; padding-top: 20px; }
        .float-label {
          position: absolute;
          top: 22px;
          left: 0;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #b0a499;
          transition: all 0.3s ease;
          pointer-events: none;
        }
        .float-label.active {
          top: 0;
          font-size: 9px;
          color: #1a1a1a;
        }

        .sign-btn {
          position: relative;
          width: 100%;
          background: #1a1a1a;
          color: #fff;
          border: none;
          padding: 18px;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          cursor: pointer;
          overflow: hidden;
          transition: background 0.3s ease;
        }
        .sign-btn::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255,255,255,0.08);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.5s ease, height 0.5s ease;
        }
        .sign-btn:hover::after { width: 400px; height: 400px; }

        .image-panel { position: relative; overflow: hidden; }
        .image-panel img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.03);
          transition: transform 8s ease;
        }
        .image-panel:hover img { transform: scale(1.0); }
        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%);
        }

        .fade-in { animation: fadeUp 0.7s ease forwards; opacity: 0; }
        .fade-in-1 { animation-delay: 0.1s; }
        .fade-in-2 { animation-delay: 0.25s; }
        .fade-in-3 { animation-delay: 0.4s; }
        .fade-in-4 { animation-delay: 0.55s; }
        .fade-in-5 { animation-delay: 0.7s; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="login-root flex min-h-screen bg-[#faf8f5]">

        {/* Form Side */}
        <div className="w-full md:w-[45%] flex flex-col justify-center px-10 md:px-20 py-16">

          {/* Brand */}
          <div className="fade-in fade-in-1 mb-16">
            <p className="brand-font text-3xl font-light tracking-[0.3em] text-[#1a1a1a]">AURELLE</p>
            <div style={{ width: 32, height: 1, background: '#c9a96e', marginTop: 8 }} />
          </div>

          {/* Heading */}
          <div className="fade-in fade-in-2 mb-12">
            <p className="text-[11px] font-semibold tracking-[0.25em] text-[#b0a499] uppercase mb-3">Welcome Back</p>
            <h1 className="brand-font text-5xl font-light text-[#1a1a1a] leading-tight">
              Sign in to<br/><em>your world</em>
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="fade-in fade-in-3 input-wrapper mb-8">
              <label className={`float-label ${email || focused === 'email' ? 'active' : ''}`}>Email Address</label>
              <input
                id="login-email"
                name="email"
                className="input-field"
                type="email"
                value={email}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused('')}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="fade-in fade-in-3 input-wrapper mb-12">
              <label className={`float-label ${password || focused === 'password' ? 'active' : ''}`}>Password</label>
              <input
                id="login-password"
                name="password"
                className="input-field"
                type="password"
                value={password}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused('')}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="fade-in fade-in-4 mb-6 text-[11px] tracking-wide text-red-500">
                {error}
              </p>
            )}

            <div className="fade-in fade-in-4">
              <button type="submit" className="sign-btn" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>

          <p className="fade-in fade-in-5 mt-10 text-[12px] text-[#b0a499] tracking-wide text-center">
            New to Aurelle?{" "}
            <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} className="text-[#1a1a1a] font-semibold border-b border-[#1a1a1a] pb-px hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors duration-300">
              Create Account
            </Link>
          </p>
        </div>

        {/* Image Side */}
        <div className="image-panel hidden md:block flex-1">
          <img src={login} alt="Login Visual" />
          <div className="image-overlay" />
          <div style={{ position: 'absolute', bottom: 48, left: 48, right: 48 }}>
            <p className="brand-font text-white text-4xl font-light leading-snug">
              "Elegance is not<br/>about being noticed,<br/>it's about being<br/><em>remembered."</em>
            </p>
            <div style={{ width: 40, height: 1, background: '#c9a96e', marginTop: 24 }} />
          </div>
        </div>

      </div>
    </>
  );
};

export default Login;
