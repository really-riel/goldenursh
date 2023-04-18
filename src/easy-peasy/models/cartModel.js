import { action } from "easy-peasy";
import secureLocalStorage from "react-secure-storage";

const cartModel = {
  cartItems: secureLocalStorage.getItem("cartItems") || [],
  setCartItems: action((state, payload) => {
    const item = state.cartItems.find((data) => data.id === payload.id);

    item
      ? (item.quantity += payload.quantity)
      : (state.cartItems = [...state.cartItems, payload]);

    secureLocalStorage.setItem("cartItems", state.cartItems);
  }),
  deleteItem: action((state, payload) => {
    state.cartItems = state.cartItems.filter((item) => item.id !== payload.id);
    secureLocalStorage.setItem("cartItems", state.cartItems);
  }),

  clearCart: action((state) => {
    state.cartItems = [];
    secureLocalStorage.setItem("cartItems", state.cartItems);
  }),

  increaseQuantity: action((state, payload) => {
    const item = state.cartItems.find((item) => item.id === payload.id);
    if (item) item.quantity++;
    secureLocalStorage.setItem("cartItems", state.cartItems);
  }),
  decreaseQuantity: action((state, payload) => {
    const item = state.cartItems.find((item) => item.id === payload.id);

    item?.quantity === 1 ? (item.quantity = 1) : item.quantity--;
    secureLocalStorage.setItem("cartItems", state.cartItems);
  }),
};

export default cartModel;
