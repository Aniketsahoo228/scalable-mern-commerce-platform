import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createCheckout } from "../../redux/slices/checkoutSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart, loading, error } = useSelector(
    (state) => state.cart
  );

  const { user } = useSelector(
    (state) => state.auth
  );

  const payableAmount = Number(
    cart?.totalPrice || 0
  ).toFixed(2);

  const [checkoutId, setCheckoutId] =
    useState(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [shippingAddress, setShippingAddress] =
    useState({
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      phone: "",
    });

  useEffect(() => {
    if (
      !isSubmitting &&
      (!cart ||
        !cart.products ||
        cart.products.length === 0)
    ) {
      navigate("/");
    }
  }, [cart, navigate, isSubmitting]);

  const handlePaymentSuccess = async (
    details
  ) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: "paid",
          paymentDetails: details,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "userToken"
            )}`,
          },
        }
      );

      if (response.status === 200) {
        await handleFinalizeCheckout(
          checkoutId
        );
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateCheckout = async (e) => {
    e.preventDefault();

    if (
      cart &&
      cart.products.length > 0
    ) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "Paypal",
          totalPrice: cart.totalPrice,
        })
      );

      if (
        res.payload &&
        res.payload._id
      ) {
        setCheckoutId(res.payload._id);
      }
    }
  };

  const handleFinalizeCheckout = async (
    checkoutId
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "userToken"
            )}`,
          },
        }
      );

      if (
        (response.status === 200 ||
          response.status === 201) &&
        response.data
      ) {
        setIsSubmitting(true);

        navigate(
          "/order-confirmation",
          {
            state: {
              order: response.data,
            },
          }
        );
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111]">
        <p className="font-['Montserrat'] text-[12px] uppercase tracking-[0.3em] text-white/40">
          Loading Cart...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111]">
        <p className="font-['Montserrat'] text-[12px] tracking-[0.1em] text-red-300">
          Error: {error}
        </p>
      </div>
    );
  }

  if (
    !cart ||
    !cart.products ||
    cart.products.length === 0
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111]">
        <p className="font-['Montserrat'] text-[12px] uppercase tracking-[0.3em] text-white/40">
          Your Cart Is Empty
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent" />

      <div className="min-h-screen bg-[#111] px-6 py-16 font-['Montserrat']">

        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-10">

            <p className="mb-2 text-[9px] uppercase tracking-[0.4em] text-[#c9a96e]">
              Azurelle
            </p>

            <h1 className="mb-3 font-['Cormorant_Garamond'] text-5xl font-light text-white">
              Checkout
            </h1>

            <div className="h-px w-8 bg-[#c9a96e]" />

          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

            {/* Left Side */}
            <div className="border border-white/5 bg-white/[0.02] p-8">

              <form onSubmit={handleCreateCheckout}>

                {/* Contact */}
                <p className="mb-4 text-[9px] uppercase tracking-[0.3em] text-[#c9a96e]">
                  Contact Details
                </p>

                <div className="mb-5">
                  <label className="mb-1.5 block text-[9px] uppercase tracking-[0.25em] text-white/35">
                    Email
                  </label>

                  <input
                    id="checkout-email"
                    name="email"
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[12px] tracking-[0.05em] text-white outline-none transition-all duration-300 focus:border-[#c9a96e]/50 disabled:cursor-not-allowed disabled:opacity-40"
                  />
                </div>

                {/* Delivery */}
                <p className="mb-4 mt-7 text-[9px] uppercase tracking-[0.3em] text-[#c9a96e]">
                  Delivery
                </p>

                <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2">

                  <div>
                    <label className="mb-1.5 block text-[9px] uppercase tracking-[0.25em] text-white/35">
                      First Name
                    </label>

                    <input
                      type="text"
                      value={
                        shippingAddress.firstName
                      }
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          firstName:
                            e.target.value,
                        })
                      }
                      className="w-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[12px] tracking-[0.05em] text-white outline-none transition-all duration-300 focus:border-[#c9a96e]/50"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[9px] uppercase tracking-[0.25em] text-white/35">
                      Last Name
                    </label>

                    <input
                      type="text"
                      value={
                        shippingAddress.lastName
                      }
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          lastName:
                            e.target.value,
                        })
                      }
                      className="w-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[12px] tracking-[0.05em] text-white outline-none transition-all duration-300 focus:border-[#c9a96e]/50"
                    />
                  </div>

                </div>

                <div className="mb-5">
                  <label className="mb-1.5 block text-[9px] uppercase tracking-[0.25em] text-white/35">
                    Address
                  </label>

                  <input
                    type="text"
                    required
                    value={shippingAddress.address}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        address:
                          e.target.value,
                      })
                    }
                    className="w-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[12px] tracking-[0.05em] text-white outline-none transition-all duration-300 focus:border-[#c9a96e]/50"
                  />
                </div>

                <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2">

                  <div>
                    <label className="mb-1.5 block text-[9px] uppercase tracking-[0.25em] text-white/35">
                      City
                    </label>

                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          city: e.target.value,
                        })
                      }
                      className="w-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[12px] tracking-[0.05em] text-white outline-none transition-all duration-300 focus:border-[#c9a96e]/50"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[9px] uppercase tracking-[0.25em] text-white/35">
                      Postal Code
                    </label>

                    <input
                      type="text"
                      value={
                        shippingAddress.postalCode
                      }
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          postalCode:
                            e.target.value,
                        })
                      }
                      className="w-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[12px] tracking-[0.05em] text-white outline-none transition-all duration-300 focus:border-[#c9a96e]/50"
                    />
                  </div>

                </div>

                <div className="mb-5">
                  <label className="mb-1.5 block text-[9px] uppercase tracking-[0.25em] text-white/35">
                    Country
                  </label>

                  <input
                    type="text"
                    required
                    value={shippingAddress.country}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        country:
                          e.target.value,
                      })
                    }
                    className="w-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[12px] tracking-[0.05em] text-white outline-none transition-all duration-300 focus:border-[#c9a96e]/50"
                  />
                </div>

                <div className="mb-7">
                  <label className="mb-1.5 block text-[9px] uppercase tracking-[0.25em] text-white/35">
                    Phone
                  </label>

                  <input
                    type="tel"
                    required
                    value={shippingAddress.phone}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        phone:
                          e.target.value,
                      })
                    }
                    className="w-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[12px] tracking-[0.05em] text-white outline-none transition-all duration-300 focus:border-[#c9a96e]/50"
                  />
                </div>

                {!checkoutId ? (
                  <button
                    type="submit"
                    className="group relative w-full overflow-hidden bg-[#c9a96e] px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#111] transition-all duration-300"
                  >

                    <span className="relative z-10 transition-all duration-300 group-hover:text-[#c9a96e]">
                      Continue The Payment
                    </span>

                    <span className="absolute inset-0 translate-x-[-100%] bg-[#1a1a1a] transition-transform duration-500 group-hover:translate-x-0" />

                  </button>
                ) : (
                  <div>

                    <p className="mb-4 text-[9px] uppercase tracking-[0.3em] text-[#c9a96e]">
                      Pay with Paypal
                    </p>

                    <PayPalButton
                      key={checkoutId}
                      amount={payableAmount}
                      onSuccess={
                        handlePaymentSuccess
                      }
                      onError={() =>
                        alert(
                          "Payment failed. Try again"
                        )
                      }
                    />

                  </div>
                )}

              </form>

            </div>

            {/* Right Side */}
            <div className="border border-white/5 bg-white/[0.02] p-8">

              <p className="mb-5 text-[9px] uppercase tracking-[0.3em] text-[#c9a96e]">
                Order Summary
              </p>

              <div className="mb-4 border-t border-white/10 pt-4">

                {cart.products.map(
                  (product, index) => (
                    <div
                      key={index}
                      className="mb-4 flex items-start justify-between border-b border-white/5 pb-4"
                    >

                      <div className="flex items-start">

                        <img
                          src={product.image}
                          alt={product.name}
                          className="mr-4 h-[88px] w-[72px] object-cover"
                        />

                        <div>

                          <p className="mb-1 text-[12px] text-white">
                            {product.name}
                          </p>

                          <p className="text-[10px] tracking-[0.1em] text-white/30">
                            Size: {product.size}
                          </p>

                          <p className="text-[10px] tracking-[0.1em] text-white/30">
                            Color: {product.color}
                          </p>

                          <p className="text-[10px] tracking-[0.1em] text-white/30">
                            Qty: {product.quantity}
                          </p>

                        </div>

                      </div>

                      <div className="text-right">

                        <p className="mb-1 text-[14px] text-[#c9a96e]">
                          $
                          {(
                            (product.price ||
                              0) *
                            (product.quantity ||
                              1)
                          ).toLocaleString()}
                        </p>

                        <p className="text-[10px] tracking-[0.1em] text-white/30">
                          $
                          {product.price?.toLocaleString()}{" "}
                          each
                        </p>

                      </div>

                    </div>
                  )
                )}

              </div>

              <div className="border-t border-white/10 pt-4">

                <div className="mb-3 flex items-center justify-between">

                  <p className="text-[11px] tracking-[0.1em] text-white/40">
                    Subtotal
                  </p>

                  <p className="text-[11px] text-white">
                    $
                    {cart.totalPrice?.toLocaleString()}
                  </p>

                </div>

                <div className="mb-3 flex items-center justify-between">

                  <p className="text-[11px] tracking-[0.1em] text-white/40">
                    Shipping
                  </p>

                  <p className="text-[11px] text-emerald-300">
                    Free
                  </p>

                </div>

                <div className="my-4 h-px bg-gradient-to-r from-[#c9a96e] to-transparent" />

                <div className="flex items-center justify-between">

                  <p className="text-[13px] tracking-[0.1em] text-white">
                    Total
                  </p>

                  <p className="font-['Cormorant_Garamond'] text-[18px] text-[#c9a96e]">
                    $
                    {cart.totalPrice?.toLocaleString()}
                  </p>

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
