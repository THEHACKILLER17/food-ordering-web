import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const cod = {
  process: async (amount, orderData) => {
    const response = await axios.post(`${url}/api/order/place`, {
      ...orderData,
      amount,
      paymentMethod: "cod",
      payment: false,
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "Order failed");
    }

    return { success: true };
  }
};

export default cod;