import "./CreaterSection.css";
import { assets } from "../../assets/assets";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { MdWavingHand } from "react-icons/md";

const CreaterSection = () => {
  return (
    <div className="creater-section" id="creater-section">
      <img src={assets.profile_icon} alt="logo" className="profile-logo" />
      <h1 className="heading">
        <span className="hey-text">
          Hey <MdWavingHand className="wave-icon" size={25} />
        </span>
        , I'm Zaid Shaikh
      </h1>

      <p className="para">
        This website is based on a referenced concept and was independently
        improved and developed by me, including additional features and design
        enhancements.
      </p>
      <div className="social-media-links">
        <a
          href="https://www.linkedin.com/in/zaid-shaikh-9b1b4b1b3/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={30} color="#0077B5" />
        </a>
        <a
          href="https://www.github.com/THEHACKILLER17"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithubSquare size={30} color="#333" />
        </a>
      </div>
    </div>
  );
};

export default CreaterSection;
