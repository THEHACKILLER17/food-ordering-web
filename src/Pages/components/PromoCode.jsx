import React, { useContext, useRef } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { PiHandsClappingFill } from "react-icons/pi";
import { CiDeliveryTruck } from "react-icons/ci";
// import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";

const PromoCode = () => {
  const {
    applyPromoCode,
    promoInput,
    handleInputChange,
    getDiscountAmount,
    isApplyDisabled,
  } = useContext(StoreContext);

  const buttonRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isApplyDisabled) {
      e.preventDefault();
      buttonRef.current.click();
    }
  };

  const discountAmount = getDiscountAmount();

  return (
    <>
      <div className="cart-promocode">
        <p>If you have a promo code, enter it here</p>

        <div className="cart-promocode-input">
          <input
            type="text"
            placeholder="Promo code"
            value={promoInput}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={() => applyPromoCode()}
            ref={buttonRef}
            disabled={isApplyDisabled}
          >
            Submit
          </button>
        </div>

        <div className="cart-promocode-info">
          {discountAmount === 0 ? (
            <div>
              <p>
                <IoInformationCircleOutline size={20} />
                Use code <span>SAVE50</span> to get ₹50 off, on Above ₹500.
              </p>
              <p>
                <IoInformationCircleOutline size={20} />
                Use code <span>SAVE100</span> to get ₹100 off, on Above ₹1000.
              </p>
            </div>
          ) : (
            <>
              
              <p>
                <PiHandsClappingFill size={20} />
                Congratulations! You saved <span>₹{discountAmount}</span> on
                your order.
              </p>
            </>
          )}
          <p>
            <CiDeliveryTruck size={20} />
            <span>Free delivery</span> on orders above ₹999.
          </p>
        </div>
      </div>
    </>
  );
};

export default PromoCode;
