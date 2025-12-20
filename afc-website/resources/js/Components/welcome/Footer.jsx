import React from "react";
import "./style/style.css"; // Ensure CSS is correctly imported

const Footer = ({ openLoginModal }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row spad">
          {/* Footer Widget 1 */}
          <div className="col-md-6 col-lg-3 footer-widget">
            <img src="img/logo.png" className="mb-4" alt="Logo" />
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia dese mollit anim id est laborum.
            </p>
            <span>
              Copyright &copy; {currentYear} All rights reserved | This Website is made with {"######"}{" "}
              <i className="fa fa-heart-o" aria-hidden="true"></i> by{" "}
              <a href="https://senator-mahdi-portfolio.web.app" target="_blank" rel="noopener noreferrer">
                SENATOR
              </a>
            </span>
          </div>

          {/* Footer Widget 2 - Resources */}
          <div className="col-md-6 col-lg-2 offset-lg-1 footer-widget">
            <h5 className="widget-title">Resources</h5>
            <ul>
              <li>
                <button className="footer-link" onClick={openLoginModal} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer" }}>
                  AFC Dashboard
                </button>
              </li>
              <li><a href="#">Hero</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Process</a></li>
            </ul>
          </div>

          {/* Footer Widget 3 - Quick Links */}
          <div className="col-md-6 col-lg-2 offset-lg-1 footer-widget">
            <h5 className="widget-title">Quick Links</h5>
            <ul>
              <li><a href="#">Network Stats</a></li>
              <li><a href="#">Block Explorers</a></li>
              <li><a href="#">Governance</a></li>
              <li><a href="#">Exchange Markets</a></li>
              <li><a href="#">Get Theme</a></li>
            </ul>
          </div>

          {/* Footer Widget 4 - Follow Us */}
          <div className="col-md-6 col-lg-3 footer-widget pl-lg-5 pl-3">
            <h5 className="widget-title">Follow Us</h5>
            <div className="social">
              <a href="#" className="facebook"><i className="fa fa-facebook"></i></a>
              <a href="#" className="google"><i className="fa fa-google-plus"></i></a>
              <a href="#" className="instagram"><i className="fa fa-instagram"></i></a>
              <a href="#" className="twitter"><i className="fa fa-twitter"></i></a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="row">
            <div className="col-lg-4 store-links text-center text-lg-left pb-3 pb-lg-0">
              <a href="#"><img src="img/appstore.png" alt="App Store" className="mr-2" /></a>
              <a href="#"><img src="img/playstore.png" alt="Play Store" /></a>
            </div>
            <div className="col-lg-8 text-center text-lg-right">
              <ul className="footer-nav">
                <li><a href="#">DPA</a></li>
                <li><a href="#">Terms of Use</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="mailto:support@company.com">support@company.com</a></li>
                <li><a href="tel:+1234567890">(123) 456-7890</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
