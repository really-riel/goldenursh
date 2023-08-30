import React from "react";
import AdminDishesCard from "../../components/Admin/AdminDishesCard";
import { BiMessageSquareAdd } from "react-icons/bi";
import AdminDrinkCard from "../../components/Admin/AdminDrinkCard";
import { useState } from "react";
import AddNewItem from "../../components/Admin/AddNewItem";
import useGetCollection from "../../hooks/useGetCollection";
import { toast } from "react-toastify";
import OptionsPopUp from "../../components/OptionsPopUp";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import Loading from "../../components/Loading";
import EditItem from "../../components/Admin/EditItem";

const Dishes = () => {
  const [isShowAddNewItem, setIsShowAddNewItem] = useState(false);
  const [itemType, setItemType] = useState("");
  const [itemObject, setItemObject] = useState({});
  const dishesData = useGetCollection("dishes");
  const drinksData = useGetCollection("drinks");
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [isShowEditOption, setIsShowEditOption] = useState(false);

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
            <div className="loadingContainer">
              <Loading />
            </div>
          ) : (
            <div className="dishesWrapper">
              {dishesData.docItems?.map((item, index) => (
                <AdminDishesCard
                  key={index}
                  item={item}
                  setIsShowOptions={setIsShowOptions}
                  setItemObject={setItemObject}
                  setItemType={setItemType}
                  setIsShowEditOption={setIsShowEditOption}
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
            <div className="loadingContainer">
              <Loading />
            </div>
          ) : (
            <div className="drinksWrapper">
              {drinksData.docItems?.map((item, index) => (
                <AdminDrinkCard
                  key={index}
                  item={item}
                  setIsShowOptions={setIsShowOptions}
                  setItemObject={setItemObject}
                  setItemType={setItemType}
                  setIsShowEditOption={setIsShowEditOption}
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
          deleteItem={itemObject}
        />
      )}
      {isShowEditOption && (
        <EditItem
          itemObject={itemObject}
          itemType={itemType}
          setIsShowEditOption={setIsShowEditOption}
        />
      )}
    </main>
  );
};

export default Dishes;
