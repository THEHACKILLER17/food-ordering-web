import { getPaymentStrategy } from "../services/paymentService";
import { useContext } from "react";
import { StoreContext } from "../../../Context/StoreContext";
import useCheckout from "../hooks/useCheckout";
import toast from "react-hot-toast";

const PaymentProcessor = () => {
  const { getFinalAmount, getCartItemsDetailed, user, clearCart, clearPromo } = useContext(StoreContext);
  const { paymentMethod, validate, setOrderStatus, address } = useCheckout();

  const handlePayment = async () => {
    if (!user) {
    toast.error("Please login to place an order");
    return;
    };
    const validation = validate();
    if (!validation.valid) { toast.error(validation.message); return; }

    const strategy = getPaymentStrategy(paymentMethod);

    const orderData = {
      userId: user?._id,
      items: getCartItemsDetailed(),
      address,
    };

    try {
      const result = await strategy.process(getFinalAmount(), orderData);
      if (result?.redirected) return;
      clearCart();
      clearPromo();
      setOrderStatus("success");
    } catch (error) {
      toast.error(error?.message || "Payment failed. Please try again.");
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