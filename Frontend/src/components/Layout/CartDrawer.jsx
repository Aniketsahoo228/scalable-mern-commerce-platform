import { IoMdClose } from 'react-icons/io';
import CartContents from '../Cart/CartContents';

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600&display=swap');
        .cd-brand { font-family: 'Cormorant Garamond', serif; }
        .cd-body  { font-family: 'Montserrat', sans-serif; }

        .cd-checkout-btn {
          width: 100%;
          padding: 16px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.3em; text-transform: uppercase;
          background: #c9a96e; color: #1a1a1a;
          border: none; cursor: pointer;
          position: relative; overflow: hidden;
          transition: color 0.4s ease;
        }
        .cd-checkout-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: #1a1a1a;
          transform: translateX(-100%);
          transition: transform 0.4s ease; z-index: 0;
        }
        .cd-checkout-btn:hover::before { transform: translateX(0); }
        .cd-checkout-btn:hover { color: #c9a96e; }
        .cd-checkout-btn span { position: relative; z-index: 1; }

        .cd-close-btn {
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: rgba(255,255,255,0.4);
          transition: all 0.3s ease;
        }
        .cd-close-btn:hover {
          border-color: #c9a96e;
          color: #c9a96e;
        }

        .cd-scroll::-webkit-scrollbar { width: 3px; }
        .cd-scroll::-webkit-scrollbar-track { background: transparent; }
        .cd-scroll::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.2); }
        .cd-scroll::-webkit-scrollbar-thumb:hover { background: #c9a96e; }
      `}</style>

      {/* Backdrop */}
      {drawerOpen && (
        <div
          onClick={toggleCartDrawer}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 40,
          }}
        />
      )}

      <div
        className={`cd-body fixed top-0 right-0 h-full flex flex-col z-50
        transform transition-transform duration-500 ease-in-out
        ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'linear-gradient(180deg, #1a1a1a 0%, #111 100%)',
          borderLeft: '1px solid rgba(201,169,110,0.15)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div>
            <p className="text-[9px] font-semibold tracking-[0.4em] uppercase mb-1"
              style={{ color: '#c9a96e' }}>
              Your Selection
            </p>
            <h2 className="cd-brand text-2xl font-light text-white">Your Cart</h2>
          </div>
          <button className="cd-close-btn" onClick={toggleCartDrawer}>
            <IoMdClose className="h-4 w-4" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="cd-scroll flex-grow overflow-y-auto px-6 py-4">
          <CartContents />
        </div>

        {/* Footer */}
        <div
          className="px-6 py-5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <button className="cd-checkout-btn">
            <span>Checkout</span>
          </button>
          <p
            className="text-center mt-3 text-[10px] tracking-wide"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            Shipping, taxes & discounts calculated at checkout
          </p>
        </div>

      </div>
    </>
  );
};

export default CartDrawer;
