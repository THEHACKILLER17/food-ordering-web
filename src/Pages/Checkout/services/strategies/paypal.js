const formatAmount = (amount) => {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return null;
  }

  return numericAmount.toFixed(2);
};

const buildPayPalRedirectUrl = (amount) => {
  const paypalMeLink = (import.meta.env.VITE_PAYPAL_ME_LINK || "").trim();
  const formattedAmount = formatAmount(amount);

  if (paypalMeLink) {
    const normalizedBase = paypalMeLink.replace(/\/+$/, "");
    return formattedAmount ? `${normalizedBase}/${formattedAmount}` : normalizedBase;
  }

  return "https://www.paypal.com/";
};

const paypal = {
  process: async (amount) => {
    const redirectUrl = buildPayPalRedirectUrl(amount);
    window.location.assign(redirectUrl);
    return { redirected: true };
  }
};

export default paypal;
