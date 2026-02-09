import { useContext, useRef } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { IoInformationCircleOutline } from "react-icons/io5";
import { PiHandsClappingFill } from "react-icons/pi";

const Cart = () => {
  const {
    getCartItemsDetailed,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalCartAmount,
    getDeliveryFee,
    getFinalAmount,
    getDiscountAmount,
    applyPromoCode,
    promoInput,
    promoBtn,
    isApplyDisabled,
    handleInputChange,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const buttonRef = useRef(null);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isApplyDisabled) {
      e.preventDefault();
      buttonRef.current.click();
    }
  };

  const cartItems = getCartItemsDetailed();
  const discountAmount = getDiscountAmount();

  return (
    <div className="cart">
      {/* CART ITEMS LIST */}
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price ($)</p>
          <p>Quantity</p>
          <p>Total ($)</p>
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
                <p onClick={() => removeFromCart(item._id)} className="cross">
                  X
                </p>
              </div>
              <hr />
            </div>
          ))
        ) : (
          <div className="empty-cart-container">
            <p className="empty-cart">Your cart is empty</p>
            <button className="contBtn"
             onClick={() => navigate("/")}>Continue Shopping</button>
          </div>
        )}

        {
          cartItems.length > 0 
          ? <div className="clearCart">
          <button
            onClick={() => {
              clearCart();
            }}
          >
            Clear Cart
          </button>
        </div> : null
        }
        
      </div>

      {/* CART SUMMARY */}
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getDeliveryFee()}</p>
          </div>
          <hr />

          {discountAmount > 0 ? (
            <>
              <div className="cart-total-details">
                <p>Promo Discount <button className="promoBtn" onClick={() => { promoBtn() }}>X</button></p>
                <p>- ${discountAmount}</p>
              </div>
              <hr />
            </>
          ) : null}

          <div className="cart-total-details">
            <p>Total</p>
            <p>${getFinalAmount()}</p>
          </div>
          <hr />

          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* PROMO CODE */}
        <div className="cart-promocode">
          <p>If you have a promo code, enter it here</p>

          <div className="cart-promocode-input">
            <input
              type="text"
              placeholder="Promo code"
              value={promoInput}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button 
            onClick={() => applyPromoCode()}
            ref={buttonRef}
            disabled={isApplyDisabled}
            >Submit</button>
          </div>

          <div className="cart-promocode-info">
            {discountAmount === 0 ? (
              <div>
                
                <p>
                  <IoInformationCircleOutline size={20} />
                  Use code <span>SAVE5</span> to get $5 off, on Above $50.
                </p>
                <p>
                  <IoInformationCircleOutline size={20} />
                  Use code <span>SAVE10</span> to get $10 off, on Above $100.
                </p>
              </div>
              
            ) : (
              <>
                <PiHandsClappingFill size={20} />
                <p>
                  Congratulations! You saved <span>${discountAmount}</span> on your order.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
