import paypal from "./strategies/paypal";
import cod from "./strategies/cod";

const strategies = {
  paypal,
  cod
};

export function getPaymentStrategy(method) {
  return strategies[method];
}