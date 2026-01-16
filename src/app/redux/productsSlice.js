import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3001/products";

//  GET PRODUCTS
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await axios.get(API_URL);
    return response.data; // envoyée data au reducer
  }
);

//  POST PRODUCT
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, newProduct);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding product");
    }
  }
);

//  SLICE
const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle", 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* -------- GET -------- */
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      /* -------- POST -------- */
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload); // ✅ update list
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
