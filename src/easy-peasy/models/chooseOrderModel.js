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
  drink: "",
  setDrink: action((state, payload) => {
    state.drink = payload;
  }),
  fruitJuice: "",
  setFruitJuice: action((state, payload) => {
    state.fruitJuice = payload;
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
  drinkPrice: null,
  setDrinkPrice: action((state, payload) => {
    state.drinkPrice = payload;
  }),
  fruitJuicePrice: null,
  setFruitJuicePrice: action((state, payload) => {
    state.fruitJuicePrice = payload;
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
  drinkQty: 1,
  setDrinkQty: action((state, payload) => {
    state.drinkQty = payload;
  }),
  fruitJuiceQty: 1,
  setFruitJuiceQty: action((state, payload) => {
    state.fruitJuiceQty = payload;
  }),
};

export default chooseOrderModel;
