import { useState } from 'react'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import Header from '../../Components/Header/Header'
import './Home.css'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay'
import CreaterSection from '../../Components/CreaterSection/CreaterSection'
const Home = () => {

  const [category, setCategory] =useState("All");

  return (
    <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category}  />
        <CreaterSection />
    </div>
  )
}

export default Home