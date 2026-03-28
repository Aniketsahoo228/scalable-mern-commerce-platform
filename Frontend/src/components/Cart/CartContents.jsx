import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../../redux/slices/cartSlice";

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600&display=swap');
        .cc-brand { font-family: 'Cormorant Garamond', serif; }
        .cc-body  { font-family: 'Montserrat', sans-serif; }

        .cc-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 18px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: border-color 0.3s ease;
        }
        .cc-row:hover { border-color: rgba(201,169,110,0.2); }
        .cc-row:last-child { border-bottom: none; }

        .cc-img {
          width: 68px;
          height: 82px;
          object-fit: cover;
          border: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
          margin-right: 14px;
        }

        .cc-qty-btn {
          width: 28px;
          height: 28px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: rgba(255,255,255,0.5);
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .cc-qty-btn:hover { border-color: #c9a96e; color: #c9a96e; }

        .cc-delete-btn {
          background: transparent;
          border: 1px solid rgba(239,68,68,0.2);
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .cc-delete-btn:hover {
          background: rgba(239,68,68,0.08);
          border-color: rgba(239,68,68,0.5);
        }
      `}</style>

      <div className="cc-body">
        {cart.products.map((product, index) => (
          <div key={index} className="cc-row">
            <div className="flex items-start">
              <img src={product.image} alt={product.name} className="cc-img" />
              <div>
                <h3 className="cc-brand text-lg font-light text-white mb-1">{product.name}</h3>
                <p
                  className="text-[9px] tracking-[0.15em] uppercase mb-3"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {product.size} · {product.color}
                </p>
                <div className="flex items-center">
                  <button
                    className="cc-qty-btn"
                    onClick={() =>
                      handleAddToCart(
                        product.productId,
                        -1,
                        product.quantity,
                        product.size,
                        product.color
                      )
                    }
                  >
                    -
                  </button>
                  <span
                    className="text-[11px] text-white"
                    style={{
                      width: 32,
                      height: 28,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    {product.quantity}
                  </span>
                  <button
                    className="cc-qty-btn"
                    onClick={() =>
                      handleAddToCart(
                        product.productId,
                        1,
                        product.quantity,
                        product.size,
                        product.color
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <p className="cc-brand text-lg font-light" style={{ color: "#c9a96e" }}>
                Rs {product.price.toLocaleString()}
              </p>
              <button
                className="cc-delete-btn"
                onClick={() => handleRemoveFromCart(product.productId, product.size, product.color)}
              >
                <RiDeleteBin3Line style={{ color: "#f87171", width: 14, height: 14 }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CartContents;
