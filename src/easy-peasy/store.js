import { createStore, persist } from "easy-peasy";
import { authModel } from "./models/authModel";
import cartModel from "./models/cartModel";

export default createStore({
  auth: persist(authModel),
  cart: persist(cartModel),
});
