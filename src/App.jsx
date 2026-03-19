import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import Footer from "./Components/Footer/Footer";
import { useState } from "react";
import LoginPopup from "./Components/LoginPopup/LoginPopup";
import PlaceOrder1 from "./Pages/Checkout/PlaceOrder1";
import { CheckoutProvider } from "./Pages/Checkout/context/CheckoutContext";
import MyOrders from "./Pages/MyOrders/MyOrders";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <CheckoutProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={
              <ProtectedRoute setShowLogin={setShowLogin}>  
                <PlaceOrder1 />
              </ProtectedRoute>
            } />
            <Route path="/my-orders" element={
              <ProtectedRoute setShowLogin={setShowLogin}>
                <MyOrders />
              </ProtectedRoute> 
            } />
          </Routes>
        </CheckoutProvider>
      </div>
      <Footer />
    </>
  );
};

export default App;
