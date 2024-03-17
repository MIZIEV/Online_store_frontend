import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartProduct {
  id: number;
  brand: string;
  model: string;
  price: number;
  quantity: number;
}

export interface CartState {
  modalVisible: boolean;
  items: CartProduct[];
}

const initialState: CartState = {
  modalVisible: false,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleModalVisibility: (state) => {
      state.modalVisible = !state.modalVisible;
    },
    addToCart: (state, action) => {
      const { id } = action.payload;
      console.log(id)
      const existingItem = state.items.find((item) => item.id === id);
      console.log(state.items);

      if (existingItem) {
        console.log("item exists");
        state.items = state.items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        state.items = [...state.items, { ...action.payload, quantity: 1 }];
      }
    },
  },
});

export const { toggleModalVisibility, addToCart } = cartSlice.actions;

export default cartSlice.reducer;
