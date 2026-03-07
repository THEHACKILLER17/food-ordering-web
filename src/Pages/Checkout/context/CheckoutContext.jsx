import { createContext, useState } from "react";

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {

  const [address, setAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [orderStatus, setOrderStatus] = useState("idle");

  return (
    <CheckoutContext.Provider
      value={{
        address,
        setAddress,
        paymentMethod,
        setPaymentMethod,
        orderStatus,
        setOrderStatus
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};