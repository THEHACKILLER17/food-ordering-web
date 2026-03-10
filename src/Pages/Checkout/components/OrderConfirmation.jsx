import { useContext } from "react";
import { StoreContext } from "../../../Context/StoreContext";
import useCheckout from "../hooks/useCheckout";
import { useNavigate } from "react-router-dom";
import OrderChart from "./OrderChart";

const OrderConfirmation = () => {
  const {
    cartItems,
    food_list,
    getTotalCartAmount,
    getDeliveryFee,
    getDiscountAmount,
    getFinalAmount,
    clearCart,
  } = useContext(StoreContext);
  const { address, paymentMethod, setOrderStatus, setAddress } =
    useCheckout();
  const navigate = useNavigate();

  const handleBackHome = () => {
    clearCart(); // clear the cart
    setOrderStatus("idle"); // reset confirmation back to default
    setAddress({})
    navigate("/"); // go home
  };

  const orderedItems = food_list.filter((item) => cartItems[item._id] > 0);

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "100px auto",
        padding: 24,
        border: "1px solid #ececec",
        borderRadius: 12,
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 48 }}>✅</div>
        <h2 style={{ color: "tomato" }}>Order Placed Successfully!</h2>
        <p style={{ color: "#666" }}>
          Thank you, {address.firstName}! Your order is confirmed.
        </p>
      </div>

      <hr />

      <h3>Delivery Address</h3>
      <p>
        {address.firstName} {address.lastName}
      </p>
      <p>
        {address.street}, {address.city}, {address.state} - {address.pincode}
      </p>
      <p>{address.country}</p>
      <p>📞 {address.phone}</p>
      <p>✉️ {address.email}</p>

      <hr />

      <h3><b>Order Summary</b></h3>
      {orderedItems.map((item) => (
        <div
          key={item._id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <span>
            {item.name} × {cartItems[item._id]}
          </span>
          <span>₹{item.price * cartItems[item._id]}</span>
        </div>
      ))}

      <hr />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Subtotal</span>
        <span>₹{getTotalCartAmount()}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Delivery</span>
        <span>₹{getDeliveryFee()}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Discount</span>
        <span>- ₹{getDiscountAmount()}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: 700,
          marginTop: 8,
        }}
      >
        <span>Total</span>
        <span>₹{getFinalAmount()}</span>
      </div>

      <hr />

      <p>
        <b>Payment:</b>{" "}
        {paymentMethod === "cod" ? "Cash on Delivery" : "PayPal"}
      </p>

      <OrderChart
        subtotal={getTotalCartAmount()}
        deliveryFee={getDeliveryFee()}
        discount={getDiscountAmount()}
      />

      {/* ← the button */}
      <button
        onClick={handleBackHome}
        style={{
          marginTop: 24,
          width: "100%",
          padding: 12,
          background: "tomato",
          border: "none",
          color: "white",
          borderRadius: 6,
          fontSize: 16,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default OrderConfirmation;
