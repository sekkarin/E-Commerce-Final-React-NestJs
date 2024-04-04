import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    item: [],
  },
  reducers: {
    addItem: (state, payload) => {
      console.log(payload.payload);

      // state.item.push(payload.payload);
    },
  },
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
