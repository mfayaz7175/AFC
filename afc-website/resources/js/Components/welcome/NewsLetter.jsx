import React, { useState } from "react";
import "./style/style.css"; // Custom styles (Make sure to include the relevant styles)

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., sending the email to a server)
    if (email) {
      alert(`Thank you for subscribing with ${email}!`);
      // Here you would typically send the email to a server or API
    } else {
      alert("Please enter a valid email.");
    }
  };

  return (
    <section className="newsletter-section gradient-bg">
      <div className="container text-white">
        <div className="row">
          {/* Newsletter Text Section */}
          <div className="col-lg-7 newsletter-text">
            <h2>Subscribe to our Newsletter</h2>
            <p>
              Sign up for our weekly industry updates, insider perspectives, and
              in-depth market analysis.
            </p>
          </div>

          {/* Newsletter Form Section */}
          <div className="col-lg-5 col-md-8 offset-lg-0 offset-md-2">
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Get Started</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
