import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  try {
    const serializedCart = localStorage.getItem("resellerCart");
    if (serializedCart === null) {
      return {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
      };
    }

    return JSON.parse(serializedCart);
  } catch (err) {
    console.error("Could not load cart from localStorage", err);
    return {
      items: [],
      totalQuantity: 0,
      totalAmount: 0,
    };
  }
};

const saveCartToStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem("resellerCart", serializedCart);
  } catch (err) {
    console.log("Could not save reseller cart to localStorage", err);
  }
};

/* const saveCartToBackendDatabase = (product_variant_id, quantity) => {
  // implement backend api here

  fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/items/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify({
      product_variant_id,
      quantity: quantity,
    }),
  });
}; */

const initialState = loadCartFromStorage();

const resellerCartSlice = createSlice({
  name: "resellerCart",
  initialState: initialState,
  reducers: {
    addItemToReseller: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.product_variant_id === newItem.product_variant_id
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1,
          totalPrice: newItem.price * (newItem.quantity || 1),
        });
      }

      state.totalQuantity += newItem.quantity || 1;
      state.totalAmount += newItem.price * (newItem.quantity || 1);

      // save to localStorage
      saveCartToStorage(state);
    },
    removeItemFromReseller: (state, action) => {
      const product_variant_id = action.payload;
      const existingItem = state.items.find(
        (item) => item.product_variant_id === product_variant_id
      );
      console.log(existingItem);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.quantity * existingItem.price;
        state.items = state.items.filter(
          (item) => item.product_variant_id != product_variant_id
        );

        // save to localStorage
        saveCartToStorage(state);
      }
    },
    updateQuantityOnReseller: (state, action) => {
      const { product_variant_id, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product_variant_id === product_variant_id
      );

      if (existingItem && quantity > 0) {
        const quantityDiff = quantity - existingItem.quantity;
        state.totalQuantity += quantityDiff;
        state.totalAmount += quantityDiff * existingItem.price;
        existingItem.quantity = quantity;
        existingItem.totalPrice = existingItem.price * quantity;

        // save to localStorage
        saveCartToStorage(state);
      }
    },
    incrementQuantityToReseller: (state, action) => {
      const product_variant_id = action.payload;
      const existingItem = state.items.find(
        (item) => item.product_variant_id === product_variant_id
      );

      if (existingItem) {
        // increment on the existing item
        existingItem.quantity += 1;
        existingItem.totalPrice += existingItem.price;

        // increment on the cart
        state.totalQuantity += 1;
        state.totalAmount += existingItem.price;

        // save to localStorage
        saveCartToStorage(state);
      }
    },
    decrementQuantityFromReseller: (state, action) => {
      const product_variant_id = action.payload;
      const existingItem = state.items.find(
        (item) => item.product_variant_id === product_variant_id
      );

      if (existingItem && existingItem.quantity > 1) {
        // decrement on the existing item
        existingItem.quantity -= 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;

        // decrement on the cart
        state.totalQuantity -= 1;
        state.totalAmount -= existingItem.price;

        // save to localStorage
        saveCartToStorage(state);
      }
    },
    clearResellerCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;

      // save to localStorage
      saveCartToStorage(state);
    },
  },
});

export const {
  addItemToReseller,
  removeItemFromReseller,
  updateQuantityOnReseller,
  incrementQuantityToReseller,
  decrementQuantityFromReseller,
  clearResellerCart,
} = resellerCartSlice.actions;

export default resellerCartSlice.reducer;
