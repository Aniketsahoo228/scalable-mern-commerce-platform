
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./authSlice";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

const handleAuthFailure = (
  error,
  rejectWithValue,
  dispatch
) => {
  const message =
    error.response?.data?.message;

  if (
    error.response?.status === 401 &&
    (
      message === "Not authorized, token failed" ||
      message === "Not authorized, no token"
    )
  ) {
    dispatch(logout());
  }

  return rejectWithValue(
    error.response?.data || {
      message: "Request failed",
    }
  );
};

// Fetch admin products
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchProducts",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/admin/products`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return response.data;

    } catch (error) {
      return handleAuthFailure(
        error,
        rejectWithValue,
        dispatch
      );
    }
  }
);

// Create product
export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",
  async (
    productData,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/products`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return response.data;

    } catch (error) {
      return handleAuthFailure(
        error,
        rejectWithValue,
        dispatch
      );
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async (
    { id, productData },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/products/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return response.data;

    } catch (error) {
      return handleAuthFailure(
        error,
        rejectWithValue,
        dispatch
      );
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(
        `${API_URL}/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return id;

    } catch (error) {
      return handleAuthFailure(
        error,
        rejectWithValue,
        dispatch
      );
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",

  initialState: {
    products: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch products
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload?.message ||
          "Failed to fetch products";
      })

      // Create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })

      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload?.message ||
          "Failed to create product";
      })

      // Update product
      .addCase(updateProduct.pending, (state) => {
        // FIX: removed loading=true to prevent admin table flicker
        state.error = null;
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) =>
            product._id === action.payload._id
        );

        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.error =
          action.payload?.message ||
          "Failed to update product";
      })

      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.products = state.products.filter(
          (product) =>
            product._id !== action.payload
        );
      })

      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload?.message ||
          "Failed to delete product";
      });
  },
});

export default adminProductSlice.reducer;


