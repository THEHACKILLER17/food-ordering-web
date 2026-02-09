import { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/Storecontext'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

const PlaceOrder = () => {

  const {getTotalCartAmount, getDiscountAmount, getFinalAmount} = useContext(StoreContext)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('paypal')

  const totalAmount = getTotalCartAmount() + 2

  return (
    <PayPalScriptProvider options={{ "client-id": "test" }}>
      <div>
        <form className="place-order">
          <div className="place-order-left">
            <p className='title'>Delivery Information</p>
            <div className="multi-fields">
              <input type="text" placeholder='First Name' required/>
              <input type="text" placeholder='Last Name'required />
            </div>
            <input type="text" placeholder='Email address' required/>
            <input type="text" placeholder='Street'required />
             <div className="multi-fields">
              <input type="text" placeholder='City' required/>
              <input type="text" placeholder='State' required/>
            </div>
             <div className="multi-fields">
              <input type="text" placeholder='Pin code' required/>
              <input type="text" placeholder='Country' required/>
            </div>
            <input type="number" placeholder='Phone' required/>
          </div>
          <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>${2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Promo Discount</p>
                  <p>- ${getDiscountAmount()}</p>
                </div>
                <hr />
                <br />
                <div className="cart-total-details">
                  <p><b>Total</b></p>
                  <p><b>${getFinalAmount()}</b></p>
                </div>
                <hr />
              </div>
              <div className="payment-method">
                <h3>Payment Method</h3>
                <label>
                  <input type="radio" value="paypal" checked={paymentMethod === 'paypal'} onChange={(e) => setPaymentMethod(e.target.value)} />
                  PayPal
                </label>
                <label>
                  <input type="radio" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} />
                  Cash on Delivery
                </label>
              </div>
              {!paymentSuccess ? (
                paymentMethod === 'paypal' ? (
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: totalAmount.toString(),
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
                  <button onClick={() => { setPaymentSuccess(true); alert("Order placed with Cash on Delivery."); }}>Place Order</button>
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
  )
}

export default PlaceOrder
