import { createSelector, createSlice } from "@reduxjs/toolkit";
import { SelectedPhone } from "../shared.types";
// import type { PayloadAction } from "@reduxjs/toolkit";



export interface CartState {
  items: SelectedPhone[];
}

const initialState: CartState = {
  items: [],
};

export const selectCartItems = createSelector(
  (state: { cart: CartState }) => state.cart.items,
  (items) => items
)

export const totalPrice = createSelector(
  (state) => state.cart.items,
  (items) => {
    return items.reduce(
      (total: number, item: { quantity: number; price: number }) =>
        total + item.quantity * item.price,
      0
    );
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.items = state.items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        state.items = [...state.items, { ...action.payload, quantity: 1 }];
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.items = [...state.items].filter((item) => item.id !== id);
    },
    increase: (state, action) => {
      const { id } = action.payload;

      state.items = state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    },
    decrease: (state, action) => {
      const { id } = action.payload;

      state.items = state.items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const selectCartCount = createSelector(
  (state: { cart: CartState }) => state.cart.items,
  (items) => items.reduce((count, item) => count + item.quantity, 0)
);


export const { addToCart, removeFromCart, increase, decrease, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;