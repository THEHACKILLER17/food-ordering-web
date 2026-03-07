import { useContext } from "react";
import { CheckoutContext } from "../context/CheckoutContext";
import validateAddress from "../validation/addressValidator";

export default function useCheckout() {

  const {
    address,
    setAddress,
    paymentMethod,
    setPaymentMethod,
    orderStatus,
    setOrderStatus
  } = useContext(CheckoutContext);

  const updateAddress = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    return validateAddress(address);
  };

  return {
    address,
    updateAddress,
    paymentMethod,
    setPaymentMethod,
    orderStatus,
    setOrderStatus,
    validate
  };
}