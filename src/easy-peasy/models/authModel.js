import { action } from "easy-peasy";

export const authModel = {
  user: null,
  setUser: action((state, payload) => {
    state.user = payload;
  }),
};
