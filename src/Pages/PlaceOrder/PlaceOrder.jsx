import { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PlaceOrder = () => {
  // form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });
  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // reset form
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      phone: "",
    });
  };
  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const emptyField = Object.values(formData).some(
      (value) => value.trim() === "",
    );

    if (emptyField) {
      alert("Please fill all delivery details before placing order.");
      return false;
    }

    // place order logic here
    alert("Order placed successfully!");
    resetForm(); // clears form
    setPaymentSuccess(true);
    return true;
  };

  const {
    getTotalCartAmount,
    getDiscountAmount,
    getFinalAmount,
    getDeliveryFee,
  } = useContext(StoreContext);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("paypal");

  return (
    <PayPalScriptProvider options={{ "client-id": "test" }}>
      <div>
        <form className="place-order" onSubmit={handleSubmit}>
          <div className="place-order-left">
            <p className="title">Delivery Information</p>
            <div className="multi-fields">
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                name="firstName"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                name="lastName"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              name="email"
              required
            />
            <input
              type="text"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
              name="street"
              required
            />
            <div className="multi-fields">
              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                name="city"
                required
              />
              <input
                type="text"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                name="state"
                required
              />
            </div>
            <div className="multi-fields">
              <input
                type="text"
                placeholder="Pin code"
                value={formData.pincode}
                onChange={handleChange}
                name="pincode"
                required
              />
              <input
                type="text"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                name="country"
                required
              />
            </div>
            <input
              type="number"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              name="phone"
              required
            />
          </div>

          <div className="place-order-right">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
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
                <div className="cart-total-details">
                  <p>Promo Discount</p>
                  <p>- ₹{getDiscountAmount()}</p>
                </div>
                <hr />
                <br />
                <div className="cart-total-details">
                  <p>
                    <b>Total</b>
                  </p>
                  <p>
                    <b>₹{getFinalAmount()}</b>
                  </p>
                </div>
                <hr />
              </div>
              <div className="payment-method">
                <h3>Payment Method</h3>
                <label>
                  <input
                    type="radio"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  PayPal
                </label>
                <label>
                  <input
                    type="radio"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Cash on Delivery
                </label>
              </div>
              {!paymentSuccess ? (
                paymentMethod === "paypal" ? (
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: getFinalAmount().toString()
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        setPaymentSuccess(true);
                        alert("Payment successful! Order placed.");
                      });
                    }}
                    onError={(err) => {
                      console.error("PayPal Checkout onError", err);
                      alert("Payment failed. Please try again.");
                    }}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      const success = handleSubmit(e);
                      if (success) {
                        setPaymentSuccess(true);
                      }
                    }}
                    disabled={getFinalAmount() === 0}
                  >
                    Place Order
                  </button>
                )
              ) : (
                <div className="payment-success">
                  <p>Order placed successfully!</p>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </PayPalScriptProvider>
  );
};

export default PlaceOrder;
