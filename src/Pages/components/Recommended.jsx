import React, { useContext, useEffect, useState } from "react";
import FoodItem from "../../Components/FoodItem/FoodItem";
import { StoreContext } from "../../Context/StoreContext";

const Recommended = ({ category = "All" }) => {
  const { getFilteredFoodList, cartItems } = useContext(StoreContext);
  const [recommended, setRecommended] = useState([]);

  const generateRecommendations = () => {
    const foods = getFilteredFoodList();

    // categories currently in cart
    const cartCategories = foods
      .filter(item => cartItems[item._id])
      .map(item => item.category);

    // if cart empty fallback to category or random
    let baseList;
    if (cartCategories.length === 0) {
      baseList =
        category === "All"
          ? foods
          : foods.filter(item => item.category === category);
    } else {
      baseList = foods.filter(item =>
        cartCategories.includes(item.category)
      );
    }

    // remove items already in cart
    const filtered = baseList.filter(item => !cartItems[item._id]);

    const shuffled = [...filtered]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    setRecommended(shuffled);
  };

  useEffect(() => {
    generateRecommendations();
  }, [cartItems, category]);

  return (
    <div>
      {recommended.length > 0 && (
        <>
          <h6>Recommended for you</h6>
          <div className="recommended">
            {recommended.map(item => (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
          <button onClick={generateRecommendations} className="recommend-btn">
            🔄 Show new recommendations
          </button>
        </>
      )}
    </div>
  );
};

export default Recommended;