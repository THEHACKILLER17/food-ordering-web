import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import Recommended from "../components/Recommended";
import PromoCode from "../components/PromoCode";
import CartSummary from "../components/CartSummary";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    getCartItemsDetailed,
    addToCart,
    removeFromCart,
    clearCart,
    deleteCompletly,
  } = useContext(StoreContext);

  const cartItems = getCartItemsDetailed();

  const navigate = useNavigate();

  return (
    <div className="cart">
      {/* CART ITEMS LIST */}
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price (₹)</p>
          <p>Quantity</p>
          <p>Total (₹)</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item._id}>
              <div className="cart-items-title cart-items-item">
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>
                  <span onClick={() => removeFromCart(item._id)}>-</span>
                  {item.quantity}
                  <span onClick={() => addToCart(item._id)}>+</span>
                </p>
                <p>{item.totalPrice}</p>
                <p onClick={() => deleteCompletly(item._id)} className="cross">
                  X
                </p>
              </div>
              <hr />
            </div>
          ))
        ) : (
          <div className="empty-cart-container">
            <p className="empty-cart">Your cart is empty</p>
            <button className="contBtn" onClick={() => navigate("/")}>
              Continue Shopping
            </button>
          </div>
        )}

        {cartItems.length > 0 ? (
          <div className="clearCart">
            <button
              onClick={() => {
                clearCart();
              }}
            >
              Clear Cart
            </button>
          </div>
        ) : null}
      </div>

      <Recommended />

      <div className="cart-bottom">
        <CartSummary />

        <PromoCode />
      </div>
    </div>
  );
};

export default Cart;
