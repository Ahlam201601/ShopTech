import { createSlice } from "@reduxjs/toolkit";
import { generateSalesText } from "./aiThunk"; 

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    text: "",
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateSalesText.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateSalesText.fulfilled, (state, action) => {
        state.loading = false;
        state.text = action.payload;
      })
      .addCase(generateSalesText.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearText } = aiSlice.actions;
export default aiSlice.reducer;
