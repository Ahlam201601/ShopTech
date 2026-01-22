import { createAsyncThunk } from "@reduxjs/toolkit";

export const generateSalesText = createAsyncThunk(
  "ai/generateSalesText",
  async (salesData, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/generate-sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ salesData })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur API");

      return data.text;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
