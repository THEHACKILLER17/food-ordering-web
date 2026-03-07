import AddressForm from "./components/AddressForm";
import CartSummary from "./components/CartSummary";
import PaymentMethodSelector from "./components/PaymentMethodSelector";
import PaymentProcessor from "./components/PaymentProcessor";
import "./checkout.css";

const PlaceOrder1 = () => {
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
