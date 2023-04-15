import { action } from "easy-peasy";

export const authModel = {
  user: null,
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  deleteUser: action((state) => {
    state.user = null;
  }),
  isUserInDataBase: false,
  setIsUserInDataBase: action((state, payload) => {
    state.IsUserInDataBase = payload;
  }),
};
