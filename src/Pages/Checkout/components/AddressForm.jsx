import useCheckout from "../hooks/useCheckout";

const AddressForm = () => {

  const { address, updateAddress } = useCheckout();

  return (
    <div className="place-order-left">
      <p className="title">Delivery Information</p>

      <div className="multi-fields">
        <input
          name="firstName"
          placeholder="First Name"
          value={address.firstName || ""}
          onChange={updateAddress}
        />

        <input
          name="lastName"
          placeholder="Last Name"
          value={address.lastName || ""}
          onChange={updateAddress}
        />
      </div>

      <input
        name="email"
        placeholder="Email Address"
        value={address.email || ""}
        onChange={updateAddress}
      />

      <input
        name="street"
        placeholder="Street"
        value={address.street || ""}
        onChange={updateAddress}
      />

      <div className="multi-fields">
        <input
          name="city"
          placeholder="City"
          value={address.city || ""}
          onChange={updateAddress}
        />

        <input
          name="state"
          placeholder="State"
          value={address.state || ""}
          onChange={updateAddress}
        />
      </div>

      <div className="multi-fields">
        <input
          name="pincode"
          placeholder="Pincode"
          value={address.pincode || ""}
          onChange={updateAddress}
        />

        <input
          name="country"
          placeholder="Country"
          value={address.country || ""}
          onChange={updateAddress}
        />
      </div>

      <input
        name="phone"
        placeholder="Phone"
        value={address.phone || ""}
        onChange={updateAddress}
      />
    </div>
  );
};

export default AddressForm;
