import { action } from "easy-peasy";

const cartModel = {
  cartItems: [],
  setCartItems: action((state, payload) => {
    const item = state.cartItems.find((data) => data.id === payload.id);

    item
      ? (item.quantity += payload.quantity)
      : (state.cartItems = [...state.cartItems, payload]);
  }),
  deleteItem: action((state, payload) => {
    state.cartItems = state.cartItems.filter((item) => item.id !== payload.id);
  }),

  clearCart: action((state) => {
    state.cartItems = [];
  }),

  increaseQuantity: action((state, payload) => {
    const item = state.cartItems.find((item) => item.id === payload.id);
    if (item) item.quantity++;
  }),
  decreaseQuantity: action((state, payload) => {
    const item = state.cartItems.find((item) => item.id === payload.id);

    item?.quantity === 1 ? (item.quantity = 1) : item.quantity--;
  }),
};

export default cartModel;
