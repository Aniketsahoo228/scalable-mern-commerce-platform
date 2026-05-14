import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const order = location.state?.order;

  useEffect(() => {
    if (order?._id) {
      dispatch(clearCart());
    }
  }, [order, dispatch]);

  const calculateEstimatedDelivery = (createdAt) => {
    if (!createdAt) return "Unavailable";

    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);

    return orderDate.toLocaleDateString();
  };

  // Safe fallback after refresh
  if (!order) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center px-6">
        <div className="text-center border border-white/10 bg-white/[0.02] p-10 max-w-md w-full">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#c9a96e] mb-4">
            Azurelle
          </p>

          <h1 className="text-3xl text-white font-light mb-4">
            Order Not Found
          </h1>

          <p className="text-sm text-white/50 mb-8 leading-6">
            This page was refreshed or opened directly.
            Your order information is no longer available in temporary state.
          </p>

          <Link
            to="/my-orders"
            className="inline-block border border-[#c9a96e]/40 text-[#c9a96e] px-6 py-3 text-[11px] tracking-[0.2em] uppercase hover:bg-[#c9a96e] hover:text-black transition-all duration-300"
          >
            View My Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111] text-white">

      {/* Top Gold Line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e] mb-3">
            Azurelle
          </p>

          <h1 className="text-5xl font-light mb-4">
            Order Confirmed
          </h1>

          <div className="w-10 h-[1px] bg-[#c9a96e]" />
        </div>

        {/* Main Card */}
        <div className="border border-white/10 bg-white/[0.02] p-8 lg:p-10">

          {/* Order Meta */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">

            <div>
              <p className="text-sm text-white mb-2 break-all">
                <span className="text-[#c9a96e] tracking-[0.15em] uppercase">
                  Order ID:
                </span>{" "}
                <span className="text-white/50">
                  {order._id}
                </span>
              </p>

              <p className="text-xs tracking-[0.12em] text-white/40">
                Order Date:{" "}
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : "Unavailable"}
              </p>
            </div>

            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-green-400">
                Estimated Delivery:
                {" "}
                {calculateEstimatedDelivery(order.createdAt)}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="mb-12">

            <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] mb-6">
              Items
            </p>

            <div className="border-t border-white/10 pt-6">

              {order?.orderItems?.length > 0 ? (
                order.orderItems.map((item, index) => (
                  <div
                    key={`${item.productId}-${index}`}
                    className="flex flex-col sm:flex-row sm:items-center gap-5 pb-6 mb-6 border-b border-white/5"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-[72px] h-[88px] object-cover border border-white/10"
                    />

                    <div className="flex-1">
                      <p className="text-sm text-white mb-2">
                        {item.name}
                      </p>

                      <p className="text-[11px] tracking-[0.1em] text-white/40">
                        {item.color} | {item.size}
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-lg text-[#c9a96e] mb-1">
                        ${item.price}
                      </p>

                      <p className="text-[11px] tracking-[0.1em] text-white/40">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-white/40">
                  No items found.
                </p>
              )}

            </div>
          </div>

          {/* Payment + Delivery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">

            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] mb-4">
                Payment
              </p>

              <p className="text-sm tracking-[0.1em] text-white/50">
                {order.paymentMethod || "Unavailable"}
              </p>
            </div>

            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] mb-4">
                Delivery
              </p>

              <div className="space-y-2 text-sm tracking-[0.08em] text-white/50">
                <p>{order?.shippingAddress?.address}</p>

                <p>
                  {order?.shippingAddress?.city}
                  {" "}
                  {order?.shippingAddress?.postalCode}
                </p>

                <p>{order?.shippingAddress?.country}</p>
              </div>
            </div>

          </div>

          {/* Footer Action */}
          <div className="border-t border-white/10 pt-8">

            <Link
              to={`/order/${order._id}`}
              className="inline-block text-[11px] tracking-[0.2em] uppercase text-[#c9a96e] border-b border-[#c9a96e]/40 pb-1 hover:border-[#c9a96e] transition-all duration-300"
            >
              View Order Details →
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderConfirmationPage;