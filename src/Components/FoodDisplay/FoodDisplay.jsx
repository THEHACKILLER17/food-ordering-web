import { useContext, useState, useEffect } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import { assets } from "../../assets/assets";
import Pagination from "./components/Pagination";

const ITEMS_PER_PAGE = 9;

const FoodDisplay = ({ category }) => {
  const {
    getFilteredFoodList,
    searchQuery,
    setSearchQuery,
    foodLoading,
    foodError,
    fetchFoodList,
  } = useContext(StoreContext);

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(foodLoading);
  }, [foodLoading]);

  // reset to page 1 when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, category]);

  const filtered = getFilteredFoodList().filter(
    (item) => category === "All" || item.category === category,
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="food-display" id="food-display">
      <span>Top dishes near you</span>
      <div className="search">
        <input
          type="text"
          className="search_input"
          placeholder="Find Your Food"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <img src={assets.search_icon} alt="" />
      </div>

      <div className="food-display-list">
        {loading ? (
          Array(8)
            .fill(0)
            .map((_, i) => <div key={i} className="skeleton-card"></div>)
        ) : foodError ? (
          <div>
            <p className="no-results">{foodError}</p>
            <button
              onClick={fetchFoodList}
              style={{
                marginTop: 10,
                padding: "8px 16px",
                background: "tomato",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Retry
            </button>
          </div>
        ) : currentItems.length > 0 ? (
          currentItems.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p className="no-results">No results found for "{searchQuery}"</p>
        )}
      </div>

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default FoodDisplay;
