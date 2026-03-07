export default function validateAddress(address) {

  const required = [
    "firstName",
    "lastName",
    "email",
    "street",
    "city",
    "state",
    "pincode",
    "country",
    "phone"
  ];

  for (let field of required) {
    if (!address[field] || address[field].trim() === "") {
      return {
        valid: false,
        message: `${field} is required`
      };
    }
  }

  return { valid: true };
}