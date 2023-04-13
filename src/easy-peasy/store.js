import { createStore } from "easy-peasy";
import { authModel } from "./models/authModel";
import cartModel from "./models/cartModel";

export default createStore({
  auth: authModel,
  cart: cartModel,
});
