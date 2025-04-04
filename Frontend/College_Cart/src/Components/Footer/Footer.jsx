import React from 'react';
import { FaLinkedin, FaGithub, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import './footer.css'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About College Cart</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Team</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Sell & Buy</h4>
          <ul>
            <li><a href="#">Sell Items</a></li>
            <li><a href="#">Buy Items</a></li>
            <li><a href="#">Exchange Items</a></li>
            <li><a href="#">Policies</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Report Issues</a></li>
            <li><a href="#">Feedback</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Connect with Us</h4>
          <div className="social-links">
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="#" aria-label="GitHub"><FaGithub /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2025 College Cart. All rights reserved.</p>
          <p>Made with ❤️ by College Cart Team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;