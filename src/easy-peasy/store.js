import { createStore } from "easy-peasy";
import { authModel } from "./models/authModel";
export default createStore({
  auth: authModel,
});
