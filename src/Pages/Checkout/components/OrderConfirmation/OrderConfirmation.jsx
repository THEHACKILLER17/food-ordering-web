import { useContext } from "react";
import { StoreContext } from "../../../../Context/StoreContext";
import useCheckout from "../../hooks/useCheckout";
import { useNavigate } from "react-router-dom";
import OrderChart from "../OrderChart";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
  const {
    cartItems, food_list, getTotalCartAmount,
    getDeliveryFee, getDiscountAmount, getFinalAmount, clearCart,
  } = useContext(StoreContext);
  const { address, paymentMethod, setOrderStatus, setAddress } = useCheckout();
  const navigate = useNavigate();

  const handleBackHome = () => {
    clearCart();
    setOrderStatus("idle");
    setAddress({});
    navigate("/");
  };

  const orderedItems = food_list.filter((item) => cartItems[item._id] > 0);

  return (
    <div className="confirmation-wrapper">

      <div className="confirmation-header">
        <div className="check-icon">✅</div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you, {address.firstName}! Your order is confirmed.</p>
      </div>

      <hr />

      <h3>Delivery Address</h3>
      <div className="address-block">
        <p>{address.firstName} {address.lastName}</p>
        <p>{address.street}, {address.city}, {address.state} - {address.pincode}</p>
        <p>{address.country}</p>
        <p>📞 {address.phone}</p>
        <p>✉️ {address.email}</p>
      </div>

      <hr />

      <h3>Order Summary</h3>
      {orderedItems.map((item) => (
        <div key={item._id} className="order-item-row">
          <span>{item.name} × {cartItems[item._id]}</span>
          <span>₹{item.price * cartItems[item._id]}</span>
        </div>
      ))}

      <hr />

      <div className="totals-row"><span>Subtotal</span><span>₹{getTotalCartAmount()}</span></div>
      <div className="totals-row"><span>Delivery</span><span>₹{getDeliveryFee()}</span></div>
      <div className="totals-row"><span>Discount</span><span>- ₹{getDiscountAmount()}</span></div>
      <div className="totals-row bold"><span>Total</span><span>₹{getFinalAmount()}</span></div>

      <hr />

      <p className="payment-info"><b>Payment:</b> {paymentMethod === "cod" ? "Cash on Delivery" : "PayPal"}</p>

      <OrderChart
        subtotal={getTotalCartAmount()}
        deliveryFee={getDeliveryFee()}
        discount={getDiscountAmount()}
      />

      <button className="btn-primary" onClick={handleBackHome}>Back to Home</button>
      <button className="btn-outline" onClick={() => navigate("/my-orders")}>View My Orders</button>

    </div>
  );
};

export default OrderConfirmation;