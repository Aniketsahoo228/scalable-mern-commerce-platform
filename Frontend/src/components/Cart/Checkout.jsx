import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createCheckout } from "../../redux/slices/checkoutSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const payableAmount = Number(cart?.totalPrice || 0).toFixed(2);

  const [checkoutId, setCheckoutId] = useState(null)
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });
 
  const handlePaymentSuccess = async (details) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      if (response.status === 200){
        await handleFinalizeCheckout(checkoutId);
      }else{
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() =>{
    if(!cart || !cart.products || cart.products.length === 0){
      navigate("/")
    }
  }, [cart, navigate])

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "Paypal",
          totalPrice: cart.totalPrice,
        })
      );
      if (res.payload && res.payload._id){
        setCheckoutId(res.payload._id);
      }
    }
  }

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      if ((response.status === 200 || response.status === 201) && response.data) {
        navigate("/order-confirmation", {
          state: { order: response.data },
        });
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return (
    <div style={{ background: '#111', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Montserrat', fontSize: 12, letterSpacing: '0.3em' }}>LOADING CART...</p>
    </div>
  );
  if (error) return (
    <div style={{ background: '#111', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#fca5a5', fontFamily: 'Montserrat', fontSize: 12, letterSpacing: '0.3em' }}>Error: {error}</p>
    </div>
  );
  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <div style={{ background: '#111', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Montserrat', fontSize: 12, letterSpacing: '0.3em' }}>YOUR CART IS EMPTY</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600&display=swap');
        .co-brand { font-family: 'Cormorant Garamond', serif; }
        .co-body  { font-family: 'Montserrat', sans-serif; }

        .co-input {
          width: 100%;
          padding: 10px 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: white;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          letter-spacing: 0.05em;
          outline: none;
          transition: border-color 0.3s ease;
        }
        .co-input:focus { border-color: rgba(201,169,110,0.5); }
        .co-input:disabled { opacity: 0.4; cursor: not-allowed; }

        .co-label {
          display: block;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 6px;
        }

        .co-submit-btn {
          width: 100%;
          padding: 14px;
          background: #c9a96e;
          color: #111;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .co-submit-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #1a1a1a;
          transform: translateX(-100%);
          transition: transform 0.4s ease;
        }
        .co-submit-btn:hover::after { transform: translateX(0); }
        .co-submit-btn span { position: relative; z-index: 1; }
        .co-submit-btn:hover span { color: #c9a96e; }
      `}</style>

      {/* Gold top line */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)' }} />

      <div className="co-body" style={{ background: '#111', minHeight: '100vh', padding: '60px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Page Header */}
          <div className="mb-10">
            <p style={{ fontSize: 9, letterSpacing: '0.4em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 8 }}>Azurelle</p>
            <h1 className="co-brand" style={{ fontSize: 48, fontWeight: 300, color: 'white', marginBottom: 12 }}>Checkout</h1>
            <div style={{ width: 32, height: 1, background: '#c9a96e' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }} className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left — Form */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: 32 }}>
              <form onSubmit={handleCreateCheckout}>

                {/* Contact Details */}
                <p style={{ fontSize: 9, letterSpacing: '0.3em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 16 }}>Contact Details</p>
                <div style={{ marginBottom: 20 }}>
                  <label className="co-label">Email</label>
                  <input
                    id="checkout-email"
                    name="email"
                    type="email"
                    value={user?.email || ""}
                    className="co-input"
                    disabled />
                </div>

                {/* Delivery */}
                <p style={{ fontSize: 9, letterSpacing: '0.3em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 16, marginTop: 28 }}>Delivery</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                  <div>
                    <label className="co-label">First Name</label>
                    <input
                      id="checkout-first-name"
                      name="firstName"
                      type="text"
                      value={shippingAddress.firstName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                      className="co-input" />
                  </div>
                  <div>
                    <label className="co-label">Last Name</label>
                    <input
                      id="checkout-last-name"
                      name="lastName"
                      type="text"
                      value={shippingAddress.lastName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                      className="co-input" />
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label className="co-label">Address</label>
                  <input
                    id="checkout-address"
                    name="address"
                    type="text"
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                    className="co-input"
                    required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                  <div>
                    <label className="co-label">City</label>
                    <input
                      id="checkout-city"
                      name="city"
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className="co-input" />
                  </div>
                  <div>
                    <label className="co-label">Postal Code</label>
                    <input
                      id="checkout-postal-code"
                      name="postalCode"
                      type="text"
                      value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                      className="co-input" />
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label className="co-label">Country</label>
                  <input
                    id="checkout-country"
                    name="country"
                    type="text"
                    value={shippingAddress.country}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                    className="co-input"
                    required />
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label className="co-label">Phone</label>
                  <input
                    id="checkout-phone"
                    name="phone"
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                    className="co-input"
                    required />
                </div>

                <div>
                  {!checkoutId ? (
                    <button type="submit" className="co-submit-btn">
                      <span>Continue The Payment</span>
                    </button>
                  ) : (
                    <div>
                      <p style={{ fontSize: 9, letterSpacing: '0.3em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 16 }}>Pay with Paypal</p>
                      <PayPalButton
                        key={`${checkoutId}-${payableAmount}`}
                        amount={payableAmount}
                        onSuccess={handlePaymentSuccess}
                        onError={(err) => alert("Payment failed. Try again")}
                      />
                    </div>
                  )}
                </div>

              </form>
            </div>

            {/* Right — Order Summary */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: 32 }}>
              <p style={{ fontSize: 9, letterSpacing: '0.3em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 20 }}>Order Summary</p>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16, marginBottom: 16 }}>
                {cart.products.map((product, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: 16, marginBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: 72, height: 88, objectFit: 'cover', marginRight: 16 }} />
                      <div>
                        <p style={{ fontSize: 12, color: 'white', marginBottom: 4 }}>{product.name}</p>
                        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>Size: {product.size}</p>
                        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>Color: {product.color}</p>
                        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>Qty: {product.quantity}</p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: 14, color: '#c9a96e', marginBottom: 4 }}>
                        ${((product.price || 0) * (product.quantity || 1)).toLocaleString()}
                      </p>
                      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
                        ${product.price?.toLocaleString()} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>Subtotal</p>
                  <p style={{ fontSize: 11, color: 'white' }}>${cart.totalPrice?.toLocaleString()}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>Shipping</p>
                  <p style={{ fontSize: 11, color: '#6ee7b7' }}>Free</p>
                </div>
                <div style={{ height: 1, background: 'linear-gradient(90deg, #c9a96e, transparent)', margin: '16px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: 13, color: 'white', letterSpacing: '0.1em' }}>Total</p>
                  <p style={{ fontSize: 16, color: '#c9a96e', fontFamily: 'Cormorant Garamond, serif' }}>${cart.totalPrice?.toLocaleString()}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
