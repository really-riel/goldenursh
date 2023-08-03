import I1 from "../assets/coconut_rice.jpeg";
import I2 from "../assets/desert.jpg";
import I3 from "../assets/grilled_meat.jpeg";
import I4 from "../assets/milkShake.jpg";

import I5 from "../assets/spagetti_meat.jpg";
import I6 from "../assets/steak_meat.jpg";
import I7 from "../assets/white_rice.jpeg";
import p1 from "../assets/profilePic1.jpg";
import p2 from "../assets/profilePic2.jpg";
import p3 from "../assets/profilePic3.jpg";
import p4 from "../assets/profilePic4.jpg";
import p5 from "../assets/profilePic5.jpg";
import p6 from "../assets/profilePic6.jpg";
import juice from "../assets/juice.jpg";
import drinks from "../assets/drinks.png";

export const mealSliderImages = [I1, I2, I3, I4, I5, I6, I7];

export const trendingOrders = [
  {
    id: 1,
    mainMeal: "Rice & Chicken",
    extra: "plus a drink",
    image: I1,
    price: 3500,
    rating: 5,
    category: "Trending Orders",
    quantity: 1,
  },
];

export const yourChoiceMeals = [
  {
    id: 1,
    title: "Main",
    foodItems: "Rice, yam, Beans, porridge and others",
    image: I3,
  },
  {
    id: 2,
    title: "Garnishing",
    foodItems: "Soup, choices, Goat, meat, beef and others",
    image: I1,
  },
  {
    id: 3,
    title: "Drinks",
    foodItems: "Bottled water, pepsi, coca-cola and others",
    image: drinks,
  },
  {
    id: 4,
    title: "Fruit Juice",
    foodItems: "Five alive, smoothie fruit shake and others",
    image: juice,
  },
];

export const customerReview = [
  {
    id: 1,
    name: "Odutoye Kolade",
    comment:
      "One of the best, easy ordering process plus fast delivery. Overall, it was a great meal",
    image: p1,
  },
  {
    id: 2,
    name: "Adeboye Kolade",
    comment:
      "One of the best, easy ordering process plus fast delivery. Overall, it was a great meal",
    image: p2,
  },
  {
    id: 3,
    name: "Odutoye Francis",
    comment:
      "One of the best, easy ordering process plus fast delivery. Overall, it was a great meal",
    image: p3,
  },
  {
    id: 4,
    name: "Odutoye Bola",
    comment:
      "One of the best, easy ordering process plus fast delivery. Overall, it was a great meal",
    image: p4,
  },
  {
    id: 5,
    name: "Odutoye olabosun",
    comment:
      "One of the best, easy ordering process plus fast delivery. Overall, it was a great meal",
    image: p5,
  },
  {
    id: 6,
    name: "Odutoye olabosun",
    comment:
      "One of the best, easy ordering process plus fast delivery. Overall, it was a great meal",
    image: p6,
  },
];

export const user = {
  name: "Oladewa Victor",
  image: p5,
  email: "stephenBalogun@gmail.com",
  phone: "+2348183705147",
  address: "No 22, irepedon ti oluwani street, Adegbayi, lagos.",
};

export const chooseOrder = {
  Dishes: {
    mainDish: [
      {
        foodType: "rice",
        price: "250",
      },
      {
        foodType: "Jollof Rice",
        price: "300",
      },
      {
        foodType: "Fried Rice",
        price: "350",
      },
      {
        foodType: "Bean",
        price: "150",
      },
      {
        foodType: "Yam",
        price: "200",
      },
      {
        foodType: "Porridge",
        price: "250",
      },
    ],

    garnishing: [
      {
        foodType: "Beef",
        price: "100",
      },
      {
        foodType: "Turkey",
        price: "300",
      },
      {
        foodType: "Chicken",
        price: "250",
      },
      {
        foodType: "Goat meat",
        price: "300",
      },
      {
        foodType: "Snail",
        price: "300",
      },
      {
        foodType: "Fish",
        price: "150",
      },
      {
        foodType: "Gizzard",
        price: "150",
      },
    ],

    soup: [
      {
        foodType: "Pepper Soup",
        price: "250",
      },
      {
        foodType: "Goatmeat Soup",
        price: "300",
      },
      {
        foodType: "Ogbono Soup",
        price: "350",
      },
      {
        foodType: "Efo riro",
        price: "150",
      },
      {
        foodType: "Gbegiri",
        price: "200",
      },
      {
        foodType: "Afang Soup",
        price: "250",
      },
    ],
  },

  Drinks: {
    Drink: [
      {
        foodType: "Pepsi",
        price: "150",
      },
      {
        foodType: "Coca-Cola",
        price: "200",
      },
      {
        foodType: "Sprite",
        price: "150",
      },
      {
        foodType: "Maltina",
        price: "300",
      },
      {
        foodType: "Fanta",
        price: "150",
      },
      {
        foodType: "Nutri-milk",
        price: "250",
      },
    ],

    FruitJuice: [
      {
        foodType: "Smoothie",
        price: "300",
      },
      {
        foodType: "5-Alive",
        price: "500",
      },
      {
        foodType: "Chi Exotic",
        price: "150",
      },
      {
        foodType: "Chi Active",
        price: "300",
      },
    ],
  },
};

export const chooseOrderHeading = {
  dishes: {
    mainDish: ["Main Dish", "Quantity", "Price"],
    garnishing: ["Garnishing", "Quantity", "Price"],
    soup: ["Soup", "Quantity", "Price"],
  },
  drinks: {
    drink: ["Drink", "Quantity", "Price"],
    FruitJuice: ["Fruit Juice", "Quantity", "Price"],
  },
};

export const chartData = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 82,
  },
  {
    id: 3,
    year: 2018,
    userGain: 85000,
    userLost: 863,
  },
  {
    id: 4,
    year: 2019,
    userGain: 80000,
    userLost: 555,
  },
  {
    id: 5,
    year: 2020,
    userGain: 87000,
    userLost: 55,
  },
];
export const summaryCardData = [
  {
    id: 1,
    total: 5000,
    category: "Total Sales",
  },
  {
    id: 2,
    total: "100,000",
    category: "Total Revenue",
  },
  {
    id: 1,
    total: 500,
    category: "Total Orders",
  },
  {
    id: 1,
    total: 600,
    category: "Total Users",
  },
];

export const pieData = [
  {
    id: 1,
    itemSold: "Juice Bottles",
    quantity: 20,
    type: "pieData",
  },
  {
    id: 2,
    itemSold: "Soft Drinks",
    quantity: 45,
    type: "pieData",
  },
  {
    id: 3,
    itemSold: "Dishes",
    quantity: 67,
    type: "pieData",
  },
];

export const pieDataColor = ["#c4a838", "#edda8b", "#f9fbe1"];

export const LineChartData = [
  {
    period: "Feb 10",
    previousWeek: 20000,
    currentWeek: 16000,
  },
  {
    period: "Feb 11",
    previousWeek: 2000,
    currentWeek: 13000,
  },
  {
    period: "Feb 12",
    previousWeek: 24000,
    currentWeek: 1600,
  },
  {
    period: "Feb 13",
    previousWeek: 23000,
    currentWeek: 6000,
  },
  {
    period: "Feb 14",
    previousWeek: 2000,
    currentWeek: 15000,
  },
  {
    period: "Feb 15",
    previousWeek: 2000,
    currentWeek: 17000,
  },
];

export const userMapData = [
  {
    period: "Jan",
    users: 10,
  },
  {
    period: "Feb",
    users: 5,
  },
  {
    period: "Mar",
    users: 13,
  },
  {
    period: "Apr",
    users: 8,
  },
];

export const orderSummaryData = [
  {
    id: 1,
    quantity: 250,
    label: "Ordered",
  },
  {
    id: 2,
    quantity: 20,
    label: "Cancelled",
  },
  {
    id: 3,
    quantity: 30,
    label: "Processed",
  },
  {
    id: 4,
    quantity: 50,
    label: "Delivered",
  },
];
