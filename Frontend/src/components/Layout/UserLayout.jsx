import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Footer from "../Common/Footer";
import Header from "../Common/Header";

import { fetchCart } from "../../redux/slices/cartSlice";

const UserLayout = () => {
  const dispatch = useDispatch();

  const { user, guestId } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {

    // Logged-in user cart
    if (user?._id) {

      dispatch(
        fetchCart({
          userId: user._id,
        })
      );

    }

    // Guest cart
    else if (guestId) {

      dispatch(
        fetchCart({
          guestId,
        })
      );
    }

  }, [dispatch, user?._id, guestId]);

  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default UserLayout;
