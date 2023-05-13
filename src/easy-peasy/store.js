import { createStore, persist } from "easy-peasy";
import { authModel } from "./models/authModel";
import cartModel from "./models/cartModel";
import chooseOrderModel from "./models/chooseOrderModel";
import chatModel from "./models/chatModel";

export default createStore({
  auth: persist(authModel),
  cart: persist(cartModel),
  chooseOrder: chooseOrderModel,
  chat: persist(chatModel),
});
