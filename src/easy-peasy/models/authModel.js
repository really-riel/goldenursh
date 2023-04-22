import { action } from "easy-peasy";
import secureLocalStorage from "react-secure-storage";

export const authModel = {
  user: secureLocalStorage.getItem("user") || null,
  setUser: action((state, payload) => {
    state.user = payload;
    if (payload.rememberMe) secureLocalStorage.setItem("user", state.user);
  }),
  deleteUser: action((state) => {
    state.user = null;
    secureLocalStorage.setItem("user", state.user);
  }),

  isAdmin: false,
  setIsAdmin: action((state, payload) => {
    state.isAdmin = payload;
  }),
};
