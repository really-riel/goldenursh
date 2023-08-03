import React from "react";
import AdminDishesCard from "../../components/Admin/AdminDishesCard";
import I1 from "../../assets/coconut_rice.jpeg";
import I2 from "../../assets/desert.jpg";
import I3 from "../../assets/grilled_meat.jpeg";
import { BiMessageSquareAdd } from "react-icons/bi";
import AdminDrinkCard from "../../components/Admin/AdminDrinkCard";
import { useState } from "react";
import AddNewItem from "../../components/Admin/AddNewItem";
import useGetCollection from "../../hooks/useGetCollection";
import { deleteItem } from "../../utils/firebaseFunctions";
import { toast } from "react-toastify";
import OptionsPopUp from "../../components/OptionsPopUp";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import Loading from "../../components/Loading";

const Dishes = () => {
  const [isShowAddNewItem, setIsShowAddNewItem] = useState(false);
  const [itemType, setItemType] = useState("");
  const [deleteItem, setDeleteItem] = useState({});
  const dishesData = useGetCollection("dishes");
  const drinksData = useGetCollection("drinks");
  const [isShowOptions, setIsShowOptions] = useState(false);

  const dishes = [
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
    {
      id: 2,
      mainMeal: "Rice & Chicken",
      extra: "plus a drink",
      image: I3,
      price: 3500,
      rating: 5,
      category: "Trending Orders",
      quantity: 1,
    },
    {
      id: 3,
      mainMeal: "Rice & Chicken",
      extra: "plus a drink",
      image: I2,
      price: 3500,
      rating: 5,
      category: "Trending Orders",
      quantity: 1,
    },
  ];
  const drinks = [
    {
      id: 1,
      drink: "Coca - Cola",
      image: I1,
      price: 500,
      rating: 5,
      category: "Trending Orders",
      quantity: 1,
    },
    {
      id: 1,
      drink: "Fanta",
      image: I1,
      price: 500,
      rating: 5,
      category: "Trending Orders",
      quantity: 1,
    },
    {
      id: 1,
      drink: "Fruit juice",
      image: I1,
      price: 500,
      rating: 5,
      category: "Trending Orders",
      quantity: 1,
    },
  ];

  console.log(itemType);

  const handleDeleteItem = async (item) => {
    try {
      deleteDoc(doc(db, itemType, item?.id));
      toast.success("Item deleted successfully 😊");
    } catch (error) {
      toast.error("error occurred while deleting, try again 🙇‍♂️");
    }
  };

  return (
    <main className="Dishes">
      <div className="sectionsContainer">
        <section className="dishesSection">
          <h1>Dishes</h1>
          <p>
            Add Edit or Delete Dishes <br /> and Drinks.
          </p>
          {dishesData?.isLoading ? (
            <Loading />
          ) : (
            <div className="dishesWrapper">
              {dishesData.docItems?.map((item, index) => (
                <AdminDishesCard
                  key={index}
                  item={item}
                  setIsShowOptions={setIsShowOptions}
                  setDeleteItem={setDeleteItem}
                  setItemType={setItemType}
                />
              ))}
            </div>
          )}
          <button
            className="addNewBtn"
            onClick={() => {
              setIsShowAddNewItem(true);
              setItemType("dishes");
            }}
          >
            Add new <BiMessageSquareAdd />
          </button>
        </section>

        <section className="drinkSection">
          <h1>Drinks</h1>
          {drinksData?.isLoading ? (
            <Loading />
          ) : (
            <div className="drinksWrapper">
              {drinksData.docItems?.map((item, index) => (
                <AdminDrinkCard
                  key={index}
                  item={item}
                  setIsShowOptions={setIsShowOptions}
                  setDeleteItem={setDeleteItem}
                  setItemType={setItemType}
                />
              ))}
            </div>
          )}
          <button
            className="addNewBtn"
            onClick={() => {
              setIsShowAddNewItem(true);
              setItemType("drinks");
            }}
          >
            Add new <BiMessageSquareAdd />
          </button>
        </section>
        <section className="choiceInput"></section>
      </div>
      {isShowAddNewItem && (
        <AddNewItem
          setIsShowAddNewItem={setIsShowAddNewItem}
          itemType={itemType}
        />
      )}
      {isShowOptions && (
        <OptionsPopUp
          setIsLogOutOptOpen={setIsShowOptions}
          handleDeleteItem={handleDeleteItem}
          deleteItem={deleteItem}
        />
      )}
    </main>
  );
};

export default Dishes;
