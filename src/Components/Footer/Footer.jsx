import { useState } from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  const [formStatus, setFormStatus] = useState("");
  const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!web3FormsAccessKey) {
      setFormStatus("Contact form is not configured. Add VITE_WEB3FORMS_ACCESS_KEY.");
      return;
    }

    setFormStatus("Sending message...");

    const formData = new FormData(event.target);
    formData.append("access_key", web3FormsAccessKey);
    formData.append("subject", "New message from Tomato footer contact form");
    formData.append("from_name", "Tomato Footer Contact");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus("Message sent successfully.");
        event.target.reset();
      } else {
        setFormStatus(data.message || "Unable to send message. Please try again.");
      }
    } catch (error) {
      setFormStatus("Network error. Please try again.");
    }
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img src={assets.logo} alt="Tomato logo" />
          <p>
            Tomato delivers fresh meals to your doorstep quickly and reliably.
            We serve quality food with safe delivery every day.
          </p>
          <div className="footer-social-icons">
            <a href="#" aria-label="Facebook">
              <img src={assets.facebook_icon} alt="" />
            </a>
            <a href="#" aria-label="Twitter">
              <img src={assets.twitter_icon} alt="" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <img src={assets.linkedin_icon} alt="" />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-links-block">
            <h2>Company</h2>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          <div className="footer-links-block">
            <h2>Get In Touch</h2>
            <ul>
              <li>+91 86690 16756</li>
              <li>contact@tomato.com</li>
              <li>Mon - Sun, 8:00 AM - 11:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="footer-contact-form-wrap">
          <h2>Contact Us</h2>
          <form className="footer-contact-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea
              name="message"
              placeholder="Write your message"
              rows="4"
              required
            />
            <input type="checkbox" name="botcheck" className="hidden-field" />
            <button type="submit">Send Message</button>
            {formStatus ? <p className="form-status">{formStatus}</p> : null}
          </form>
        </div>
      </div>

      <hr />
      <p className="footer-copyright">
        Copyright 2026 &copy; Tomato.com - All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
