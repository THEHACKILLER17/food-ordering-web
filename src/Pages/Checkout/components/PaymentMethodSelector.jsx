import useCheckout from "../hooks/useCheckout";

const PaymentMethodSelector = () => {

  const { paymentMethod, setPaymentMethod } = useCheckout();

  return (
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
  );
};

export default PaymentMethodSelector;
