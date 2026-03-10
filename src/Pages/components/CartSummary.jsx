import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const CartSummary = () => {
  const {
    getTotalCartAmount,
    getDeliveryFee,
    getFinalAmount,
    getDiscountAmount,
    promoBtn,
  } = useContext(StoreContext);

  const discountAmount = getDiscountAmount();
  const isDiabled = getFinalAmount() === 0;

  const navigate = useNavigate();

  return (
    <>
      <div className="cart-total">
        <h2>Cart Totals</h2>

        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>₹{getTotalCartAmount()}</p>
        </div>
        <hr />

          
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{getDeliveryFee()}</p>
          </div>

        <hr />

        {discountAmount > 0 ? (
          <>
            <div className="cart-total-details">
              <p>
                Promo Discount{" "}
                <button
                  className="promoBtn"
                  onClick={() => {
                    promoBtn();
                  }}
                >
                  X
                </button>
              </p>
              <p>- ₹{discountAmount}</p>
            </div>
            <hr />
          </>
        ) : null}

        <div className="cart-total-details">
          <p>Total</p>
          <p>₹{getFinalAmount()}</p>
        </div>
        <hr />

        <button disabled={isDiabled} onClick={() => navigate("/order")}>
          PROCEED TO CHECKOUT
        </button>
      </div>
    </>
  );
};

export default CartSummary;
