import { createContext, useCallback, useEffect, useReducer, useState } from "react";
import axios from "axios";
import cartReducer from "./cartReducer";
import storageService from "./storageService";
import { applyPromo, calculateTotal, validatePromo } from "./cartService";

export const StoreContext = createContext(null);

// Backend URL
const url = import.meta.env.VITE_BACKEND_URL || "https://tomato-backend-rz14.onrender.com";

// ye function add to cart, remove from cart, clear cart aur local storage ka kaam karega
const StoreContextProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(
    cartReducer,
    {},
    storageService.getCart,
  );

  // Token state for authentication
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // User info state
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Logout function
  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // ye state search ke liye hain
  const [searchQuery, setSearchQuery] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [foodLoading, setFoodLoading] = useState(true);
  const [foodError, setFoodError] = useState("");

  const fetchFoodList = useCallback(async () => {
    try {
      setFoodLoading(true);
      setFoodError("");
      const response = await axios.get(`${url}/api/food/list`);

      if (response.data?.success) {
        setFoodList(response.data.data || []);
      } else {
        setFoodError(response.data?.message || "Failed to fetch foods.");
      }
    } catch (error) {
      setFoodError(
        error.response?.data?.message ||
          "Unable to connect to food service. Please try again.",
      );
    } finally {
      setFoodLoading(false);
    }
  }, [url]);

  // local storage mein cart items save karenge jab bhi cartItems change ho
  useEffect(() => {
    storageService.saveCart(cartItems);
  }, [cartItems]);

  useEffect(() => {
    fetchFoodList();
  }, [fetchFoodList]);

  // total cart amount calculate karenge
  const getTotalCartAmount = () => {
    return calculateTotal(cartItems, foodList);
  };

  // filtered food list based on search query
 const getFilteredFoodList = () => {
  const query = searchQuery.trim().toLowerCase();

  return foodList.filter((item) => {
    const name = item.name?.toLowerCase() || "";
    const desc = item.description?.toLowerCase() || "";

    return name.includes(query) || desc.includes(query);
  });
};

  // quantity sirf ek item ke liye return karega
  const getItemQuantity = (id) => {
    return cartItems[id] || 0;
  };

  // delivery fee calculate karenge
  const getDeliveryFee = () => {
    return getTotalCartAmount() === 0 ? 0 : 99;
  };

  // total cart amount calculate karenge
  const getFinalAmount = () => {
    const total = getTotalCartAmount();
    const delivery = getDeliveryFee();
    const discountedTotal = applyPromo(promoCode, total);
    return Math.max(discountedTotal + delivery, 0);
  };

  // cart items ke detailed list return karega
  const getCartItemsDetailed = () => {
    return foodList
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cartItems[item._id],
        totalPrice: item.price * cartItems[item._id],
      }));
  };

  // ye promo code handle karega everything from promo code
  const [promoInput, setPromoInput] = useState("");
  const [promoCode, setPromoCode] = useState("");

  const handleInputChange = (value) => {
    setPromoInput(value);
  };

  const applyPromoCode = () => {
    const code = promoInput.trim().toUpperCase();
    const total = getTotalCartAmount();

    if (!code) return;

    const { valid } = validatePromo(code, total);

    if (!valid) {
      alert(
        `Promo code ${code} is not applicable for the current total amount.`,
      );
      setPromoInput("");
      storageService.clearPromoCode();
      return;
    }

    setPromoCode(code);
    storageService.savePromoCode(code);
    setPromoInput("");
    alert(`Promo code ${code} applied!`);
  };

  useEffect(() => {
    const savedCode = storageService.getPromoCode();
    if (savedCode) {
      setPromoCode(savedCode);
    }
  }, []);

  const promoBtn = () => {
    alert("Really! You want to remove the promo code?");
    setPromoCode("");
    storageService.clearPromoCode();
  };

  const isApplyDisabled = promoInput.trim() === "";

  // discount amount calculate karenge
  const getDiscountAmount = () => {
    const total = getTotalCartAmount();
    const discountedTotal = applyPromo(promoCode, total);
    return total - discountedTotal;
  };

  const contextValue = {
    url,
    fetchFoodList,
    foodLoading,
    foodError,
    token,
    setToken,
    user,
    setUser,
    logout,
    food_list: foodList,
    cartItems,

    addToCart: (id) => dispatch({ type: "ADD_TO_CART", payload: id }),
    removeFromCart: (id) => dispatch({ type: "REMOVE_FROM_CART", payload: id }),
    deleteCompletly: (id) => dispatch({ type: "DELETE_FROM_CART", payload: id }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),

    searchQuery,
    setSearchQuery,

    getFilteredFoodList,
    getItemQuantity,
    getDeliveryFee,
    getFinalAmount,
    getCartItemsDetailed,
    applyPromoCode,
    getTotalCartAmount,
    getDiscountAmount,
    promoInput,
    promoBtn,
    isApplyDisabled,
    handleInputChange,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
