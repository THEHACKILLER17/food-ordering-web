export const storageService = {
    getCart() {
        const data = localStorage.getItem("cartItems");
        return data ? JSON.parse(data) : {};
    },

    saveCart(cart) {
        localStorage.setItem("cartItems", JSON.stringify(cart));
    },

    clearCart() {
        localStorage.removeItem("cartItems");
    },

    getPromoCode() {
        const data = localStorage.getItem("promoInput");
        return data ? JSON.parse(data) : "";
    },
    savePromoCode(code) {
        localStorage.setItem("promoInput", JSON.stringify(code));
    },
    clearPromoCode() {
        localStorage.removeItem("promoInput");
    }
}
export default storageService;