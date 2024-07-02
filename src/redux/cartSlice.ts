import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity, color, rom } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.id === id &&
          item.color.id === color.id &&
          item.rom.id === rom.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...action.payload, quantity });
      }
    },
    removeFromCart: (state, action) => {
      const { id, color, rom } = action.payload;
      state.items = state.items.filter(
        (item) =>
          item.id !== id ||
          item.color.id !== color.id ||
          item.rom.id !== rom.id
      );
    },
    increase: (state, action) => {
      const { id, color, rom } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.id === id &&
          item.color.id === color.id &&
          item.rom.id === rom.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decrease: (state, action) => {
      const { id, color, rom } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.id === id &&
          item.color.id === color.id &&
          item.rom.id === rom.id
      );

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, increase, decrease, clearCart } =
  cartSlice.actions;

export const totalPrice = createSelector(
  (state) => state.cart.items,
  (items) => items.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const selectCartItems = createSelector(
  (state) => state.cart.items,
  (items) => items
)

export const selectCartCount = createSelector(
  (state) => state.cart.items,
  (items) => items.reduce((count, item) => count + item.quantity, 0)
);

export default cartSlice.reducer;