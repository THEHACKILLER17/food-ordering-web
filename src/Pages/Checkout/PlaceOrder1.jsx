import AddressForm from "./components/AddressForm";
import CartSummary from "./components/CartSummary";
import PaymentMethodSelector from "./components/PaymentMethodSelector";
import PaymentProcessor from "./components/PaymentProcessor";
import OrderConfirmation from "./components/OrderConfirmation/OrderConfirmation";
import useCheckout from "./hooks/useCheckout";
import "./checkout.css";

const PlaceOrder1 = () => {
  const { orderStatus } = useCheckout();

  if (orderStatus === "success") {
    return <OrderConfirmation />;
  }

  return (
    <div className="checkout-page">
      <div className="place-order">
        <AddressForm />
        <div className="place-order-right">
          <CartSummary />
          <PaymentMethodSelector />
          <PaymentProcessor />
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder1;