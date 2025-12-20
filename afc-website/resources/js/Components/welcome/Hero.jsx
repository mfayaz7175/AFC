import React, { useState } from "react";
import "./style/style.css";
import Coin from "./Coin";
import { usePage } from "@inertiajs/react";
import { LoadingAnimation } from "../animations/Loading";

const Hero = ({ openLoginModal, openRegisterModal }) => {
  const { csrf_token, locale } = usePage().props;
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading animation

    try {
      const response = await fetch("/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrf_token,
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.exists) {
        openLoginModal();
      } else {
        openRegisterModal();
      }
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setIsLoading(false); // Hide loading animation after request completes
    }
  };

  // Inline style for the language switcher (adjust as needed)
  const languageSwitcherStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 1000,
    background: 'rgba(255,255,255,0.8)',
    padding: '5px 10px',
    borderRadius: '4px',
    fontSize: '14px'
  };

  return (
    <>
      {/* Loading Overlay */}
      {isLoading && <LoadingAnimation />}

      {/* Language Switcher */}
      <div style={languageSwitcherStyle}>
        <a
          href="/locale/en"
          style={{ fontWeight: locale === 'en' ? 'bold' : 'normal', marginRight: '5px' }}
        >
          English
        </a>
        |
        <a
          href="/locale/fa"
          style={{ fontWeight: locale === 'fa' ? 'bold' : 'normal', margin: '0 5px' }}
        >
          فارسی
        </a>
        |
        <a
          href="/locale/ps"
          style={{ fontWeight: locale === 'ps' ? 'bold' : 'normal', marginLeft: '5px' }}
        >
          پښتو
        </a>
      </div>

      {/* Hero Section */}
      <section className="hero-section" style={{ position: 'relative' }}>
        <div className="container">
          <div className="row">
            {/* Left Section: Text Content */}
            <div className="col-md-6 hero-text">
              <h2>
                {/** Example usage of translations */}
                {usePage().props.translations.invest || 'Invest in'} <span>AFCoin</span> <br />
                AFCoin Trading
              </h2>
              <h4>
                {usePage().props.translations.description ||
                  'Use modern progressive technologies of AFCoin to earn money'}
              </h4>
              <form className="hero-subscribe-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder={
                    usePage().props.translations.enter_email ||
                    "Enter your email"
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="site-btn sb-gradients">
                  {usePage().props.translations.get_started ||
                    "Get Started"}
                </button>
              </form>
            </div>

            {/* Right Section: Image */}
            <div className="col-md-6">
              <img
                src="/img/laptop.png"
                className="laptop-image"
                alt="Laptop showcasing Bitcoin trading"
              />
            </div>
            <Coin />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;

