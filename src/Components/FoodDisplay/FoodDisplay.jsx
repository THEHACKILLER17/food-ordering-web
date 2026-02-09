import { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import { assets } from "../../assets/assets";

const FoodDisplay = ({ category }) => {

  const { getFilteredFoodList, searchQuery, setSearchQuery } = useContext(StoreContext)

  const productsToShow = getFilteredFoodList();


  return (
    <div className='food-display' id='food-display'>
      <span>Top dishes near you</span>
      <div className="search">
                <input
                  type="text"
                  className="search_input"
                  placeholder="Find Your Food"
                  value={searchQuery}
                  onChange={(e)=>setSearchQuery(e.target.value)}
                />
                <img src={assets.search_icon} alt="" />
              </div>
      <div className="food-display-list">
        {productsToShow.length > 0 ? (
          productsToShow.map((item) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              )
            }
            return null
          })
        ) : (
          <p className='no-results'>
            No results found for "{searchQuery}"
          </p>
        )}
      </div>
    </div>
  )
}

export default FoodDisplay
