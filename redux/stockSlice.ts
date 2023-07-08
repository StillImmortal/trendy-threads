import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface StockState {
  value: number
}

const initialState: StockState = {
  value: 0
}

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
  }
})

export const { increment } = stockSlice.actions
export const stockSelector = (state: RootState) => state.stockReducer
export default stockSlice.reducer