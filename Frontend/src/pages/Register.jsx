import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import register from "../assets/register.webp";
import { registerUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { guestId, loading, error } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await dispatch(registerUser({ name, email, password })).unwrap();

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

        .reg-root { font-family: 'Montserrat', sans-serif; }
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
        .float-label.active { top: 0; font-size: 9px; color: #1a1a1a; }

        .reg-btn {
          position: relative;
          width: 100%;
          background: transparent;
          color: #1a1a1a;
          border: 1px solid #1a1a1a;
          padding: 18px;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.4s ease;
        }
        .reg-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #1a1a1a;
          transform: translateX(-100%);
          transition: transform 0.4s ease;
          z-index: 0;
        }
        .reg-btn:hover::before { transform: translateX(0); }
        .reg-btn:hover { color: #fff; }
        .reg-btn span { position: relative; z-index: 1; }

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
          background: linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, transparent 100%);
        }

        .fade-in { animation: fadeUp 0.7s ease forwards; opacity: 0; }
        .fade-in-1 { animation-delay: 0.1s; }
        .fade-in-2 { animation-delay: 0.25s; }
        .fade-in-3 { animation-delay: 0.4s; }
        .fade-in-4 { animation-delay: 0.55s; }
        .fade-in-5 { animation-delay: 0.65s; }
        .fade-in-6 { animation-delay: 0.75s; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="reg-root flex min-h-screen bg-[#faf8f5]">

        {/* Image Side — LEFT for Register */}
        <div className="image-panel hidden md:block w-[45%]">
          <img src={register} alt="Register Visual" />
          <div className="image-overlay" />
          <div style={{ position: 'absolute', top: 48, left: 48, right: 48 }}>
            <p className="brand-font text-white text-3xl font-light tracking-[0.3em]">AURELLE</p>
            <div style={{ width: 32, height: 1, background: '#c9a96e', marginTop: 10 }} />
          </div>
          <div style={{ position: 'absolute', bottom: 48, left: 48, right: 48 }}>
            <p className="text-white/60 text-[10px] tracking-[0.25em] uppercase mb-3 font-semibold">Our Promise</p>
            <p className="brand-font text-white text-3xl font-light leading-snug">
              Crafted for those<br/>who appreciate the<br/><em>art of dressing well.</em>
            </p>
          </div>
        </div>

        {/* Form Side */}
        <div className="flex-1 flex flex-col justify-center px-10 md:px-20 py-16">

          <div className="fade-in fade-in-1 mb-12">
            <p className="text-[11px] font-semibold tracking-[0.25em] text-[#b0a499] uppercase mb-3">Join Aurelle</p>
            <h1 className="brand-font text-5xl font-light text-[#1a1a1a] leading-tight">
              Begin your<br/><em>journey</em>
            </h1>
            <div style={{ width: 32, height: 1, background: '#c9a96e', marginTop: 16 }} />
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-md">

            <div className="fade-in fade-in-2 input-wrapper mb-7">
              <label className={`float-label ${name || focused === 'name' ? 'active' : ''}`}>Full Name</label>
              <input id="register-name" name="name" className="input-field" type="text" value={name}
                onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="fade-in fade-in-3 input-wrapper mb-7">
              <label className={`float-label ${email || focused === 'email' ? 'active' : ''}`}>Email Address</label>
              <input id="register-email" name="email" className="input-field" type="email" value={email}
                onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="fade-in fade-in-4 input-wrapper mb-12">
              <label className={`float-label ${password || focused === 'password' ? 'active' : ''}`}>Password</label>
              <input id="register-password" name="password" className="input-field" type="password" value={password}
                onFocus={() => setFocused('password')} onBlur={() => setFocused('')}
                onChange={(e) => setPassword(e.target.value)} minLength={6} required />
            </div>

            {error && (
              <p className="fade-in fade-in-5 mb-6 text-[11px] tracking-wide text-red-500">
                {error}
              </p>
            )}

            <div className="fade-in fade-in-5">
              <button type="submit" className="reg-btn" disabled={loading}>
                <span>{loading ? "Creating Account..." : "Create Account"}</span>
              </button>
            </div>
          </form>

          <p className="fade-in fade-in-6 mt-10 text-[12px] text-[#b0a499] tracking-wide">
            Already a member?{" "}
            <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-[#1a1a1a] font-semibold border-b border-[#1a1a1a] pb-px hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors duration-300">
              Sign In
            </Link>
          </p>

        </div>
      </div>
    </>
  );
};

export default Register;
