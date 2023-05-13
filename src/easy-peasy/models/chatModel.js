import { action } from "easy-peasy";

const chatModel = {
  chatAdminDetails: {},
  setChatAdminDetails: action((state, payload) => {
    state.chatAdminDetails = payload;
  }),
};

export default chatModel;
