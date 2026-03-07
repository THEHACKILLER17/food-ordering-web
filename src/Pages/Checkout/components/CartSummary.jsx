import { useContext } from "react";
import { StoreContext } from "../../../Context/StoreContext";

const CartSummary = () => {
  const { getTotalCartAmount, getDeliveryFee, getDiscountAmount, getFinalAmount } =
    useContext(StoreContext);

  return (
    <div className="cart-total">
      <h2>Cart Totals</h2>

      <div className="cart-total-details">
        <p>Subtotal</p>
        <p>Rs. {getTotalCartAmount()}</p>
      </div>

      <div className="cart-total-details">
        <p>Delivery Fee</p>
        <p>Rs. {getDeliveryFee()}</p>
      </div>

      <div className="cart-total-details">
        <p>Discount</p>
        <p>- Rs. {getDiscountAmount()}</p>
      </div>

      <hr />

      <div className="cart-total-details">
        <b>Total</b>
        <b>Rs. {getFinalAmount()}</b>
      </div>
    </div>
  );
};

export default CartSummary;
