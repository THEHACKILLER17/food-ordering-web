export const calculateTotal = (cart, food_list) => {
    return Object.entries(cart).reduce((total, [id, qty]) => {
        const item = food_list.find(food => food._id === id);
        return item ? total + item.price * qty : total;
    }, 0);
};

export const promoStrategies = {
  SAVE50: { minTotal: 500, discount: 50 },
  SAVE100: { minTotal: 1000, discount: 100 },
};

export const validatePromo = (code, total) => {
  const promo = promoStrategies[code];
  if (!promo || total < promo.minTotal) return { valid: false };
  return { valid: true, promo };
};

export const applyPromo = (code, total) => {
  const promo = promoStrategies[code];
  if (!promo || total < promo.minTotal) return total;
  return total - promo.discount;
};


export default { calculateTotal, applyPromo, validatePromo };
