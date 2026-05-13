import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import "./FloatingCart.css";

const FloatingCart = () => {
  const { cartItems } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);

  // hide on cart and checkout pages
  if (totalItems === 0) return null;
  if (["/cart", "/order"].includes(location.pathname)) return null;

  return (
    <div className="floating-cart" onClick={() => navigate("/cart")}>
      🛒
      <span className="floating-cart-count">{totalItems}</span>
    </div>
  );
};

export default FloatingCart;