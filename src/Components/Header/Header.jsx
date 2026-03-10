import "./Header.css";
import header_img from "../../assets/header_img.png";
const Header = () => {
  return (
    <div className="header">
      <img src={header_img} alt="header" className="header-bg-img" fetchPriority="high" />
      <div className="header-contents">
        <h2>Order Your Favourite Food Here</h2>
        <p>
          Tomato is a fast and reliable food delivery platform that connects you
          with your favorite local restaurants in minutes. Browse, order, and
          enjoy fresh meals delivered straight to your door.
        </p>
        <button>
          <a href="#explore-menu">View Menu</a>
        </button>
      </div>
    </div>
  );
};

export default Header;
