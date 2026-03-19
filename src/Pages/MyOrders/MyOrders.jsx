import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import "./MyOrders.css";

const STATUS_STEPS = ["Food Processing", "Out for Delivery", "Delivered"];

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      if (res.data.success) setOrders(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  if (loading) return <p className="orders-loading">Loading your orders...</p>;
  if (orders.length === 0) return <p className="orders-empty">No orders yet.</p>;

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">

            <div className="order-card-header">
              <span className="order-id">#{order._id.slice(-6).toUpperCase()}</span>
              <span className="order-date">
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric"
                })}
              </span>
            </div>

            <div className="order-items">
              {order.items.map((item, i) => (
                <span key={i} className="order-item-chip">
                  {item.name} × {item.quantity}
                </span>
              ))}
            </div>

            <div className="order-meta">
              <span>💰 ₹{order.amount}</span>
              <span>🚚 {order.paymentMethod?.toUpperCase()}</span>
              <span>{order.payment ? "✅ Paid" : "⏳ Payment Pending"}</span>
            </div>

            {/* Progress Bar */}
            <div className="order-progress">
              {STATUS_STEPS.map((step, i) => {
                const currentIndex = STATUS_STEPS.indexOf(order.status);
                const isCompleted = i <= currentIndex;
                return (
                  <div key={step} className="progress-step">
                    <div className={`step-dot ${isCompleted ? "completed" : ""}`} />
                    <p className={isCompleted ? "step-label active" : "step-label"}>{step}</p>
                    {i < STATUS_STEPS.length - 1 && (
                      <div className={`step-line ${i < currentIndex ? "completed" : ""}`} />
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;