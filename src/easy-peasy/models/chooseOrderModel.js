import { action } from "easy-peasy";

const chooseOrderModel = {
  mainDish: "",
  setMainDish: action((state, payload) => {
    state.mainDish = payload;
  }),
  garnishing: "",
  setGarnishing: action((state, payload) => {
    state.garnishing = payload;
  }),
  soup: "",
  setSoup: action((state, payload) => {
    state.soup = payload;
  }),

  mainDishPrice: null,
  setMainDishPrice: action((state, payload) => {
    state.mainDishPrice = payload;
  }),
  garnishingPrice: null,
  setGarnishingPrice: action((state, payload) => {
    state.garnishingPrice = payload;
  }),
  soupPrice: null,
  setSoupPrice: action((state, payload) => {
    state.soupPrice = payload;
  }),

  mainDishQty: 1,
  setMaindishQty: action((state, payload) => {
    state.mainDishQty = payload;
  }),
  garnishingQty: 1,
  setGarnishingQty: action((state, payload) => {
    state.garnishingQty = payload;
  }),
  soupQty: 1,
  setSoupQty: action((state, payload) => {
    state.soupQty = payload;
  }),
};

export default chooseOrderModel;
