import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./authSlice";

const handleAuthFailure = (error, rejectWithValue, dispatch) => {
  const message = error.response?.data?.message;
  if (
    error.response?.status === 401 &&
    (message === "Not authorized, token failed" || message === "Not authorized, no token")
  ) {
    dispatch(logout());
  }
  return rejectWithValue(error.response?.data || { message: "Request failed" });
};

// Async Thunk to fetch user orders
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
          }
        }
      );
      return response.data
    } catch (error) {
        return handleAuthFailure(error, rejectWithValue, dispatch)
    }
  }
);

// Async thunk to fetch orders details by ID
export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchOrderDetails",
  async (orderId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
        return handleAuthFailure(error, rejectWithValue, dispatch)

    }
  }
);

export const deleteUserOrder = createAsyncThunk(
  "orders/deleteUserOrder",
  async (orderId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return { orderId, ...response.data };
    } catch (error) {
      return handleAuthFailure(error, rejectWithValue, dispatch);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    totalOrders: 0,
    orderDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = Array.isArray(action.payload) ? action.payload.length : 0;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch orders";
      })
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch order details";
      })
      .addCase(deleteUserOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter((order) => order._id !== action.payload.orderId);
        state.totalOrders = state.orders.length;
        if (state.orderDetails?._id === action.payload.orderId) {
          state.orderDetails = null;
        }
      })
      .addCase(deleteUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete order";
      });
  },
});

export default orderSlice.reducer;
