import { getPaymentStrategy } from "../services/paymentService";
import { useContext } from "react";
import { StoreContext } from "../../../Context/StoreContext";
import useCheckout from "../hooks/useCheckout";

const PaymentProcessor = () => {
  const { getFinalAmount } = useContext(StoreContext);

  const { paymentMethod, validate } = useCheckout();

  const handlePayment = async () => {
    const validation = validate();

    if (!validation.valid) {
      alert(validation.message);
      return;
    }

    const strategy = getPaymentStrategy(paymentMethod);

    try {
      const result = await strategy.process(getFinalAmount());

      if (result?.redirected) {
        return;
      }

      alert("Order placed successfully");
    } catch (error) {
      alert(error?.message || "Payment failed. Please try again.");
    }

  };

  return (
    <button
      className="checkout-submit-btn"
      onClick={handlePayment}
      disabled={getFinalAmount() === 0}
    >
      {paymentMethod === "paypal" ? "Continue to PayPal" : "Place Order"}
    </button>
  );
};

export default PaymentProcessor;
