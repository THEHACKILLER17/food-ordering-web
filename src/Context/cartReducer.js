export const cartReducer = (state, action) => {
  switch (action.type) {

    case "ADD_TO_CART": {
      return {
        ...state,
        [action.payload]: (state[action.payload] || 0) + 1,
      };
    }

    case "REMOVE_FROM_CART": {
      if (!state[action.payload]) return state;

      const updatedCart = { ...state };

      if (updatedCart[action.payload] === 1) {
        delete updatedCart[action.payload];
      } else {
        updatedCart[action.payload] -= 1;
      }

      return updatedCart;
    }

    case "CLEAR_CART":
      return {};

    default:
      return state;
  }
};

export default cartReducer;
