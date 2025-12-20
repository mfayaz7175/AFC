import React, { useEffect } from "react";
import "./style/style.css";
import './style/themify-icons.css';

const featuresData = [
  { icon: 'ti-mobile', title: 'Mobile Apps', description: 'Access your AFC wallet on the go with our user-friendly mobile apps, designed for secure and seamless transactions anywhere.' },
  { icon: 'ti-shield', title: 'Safe & Secure', description: 'AFC employs robust security measures and thorough testing to ensure a reliable platform for all your digital transactions.' },
  { icon: 'ti-wallet', title: 'Wallet', description: 'Manage your digital assets effortlessly with MetaMask integration and an intuitive AFC wallet built for simplicity and security.' },
  { icon: 'ti-headphone-alt', title: 'Expert Support', description: 'Our dedicated team of blockchain experts is ready to assist you, ensuring smooth navigation and efficient support for all AFC-related queries.' },
  { icon: 'ti-reload', title: 'Instant Exchange', description: 'Experience real-time exchange with minimal fees, facilitating quick and efficient transfers of AFC tokens.' },
  // { icon: 'ti-panel', title: 'Recurring Buys', description: 'Automate your investments with recurring buys, making it easier than ever to grow your digital asset portfolio.' },
  { icon: 'ti-settings', title: 'Smart Contract Capabilities', description: 'Leverage advanced features including a special minting strategy, account freezing, allowance management, approvals, and direct transfers, all integrated within our secure smart contract ecosystem.' },
];

const Features = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.feature').forEach(feature => observer.observe(feature));
  }, []);

  return (
    <section className="features-section spad bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm bg-opacity-90 py-24 px-4">
      <div className="container text-white">
        <div className="section-title text-center">
          <h2>Our Features</h2>
          <p className="text-white">Discover the innovative features of AFC, a secure and fully tested ERC-20 cryptocurrency designed for a seamless digital experience.</p>
        </div>
        <div className="row">
          {featuresData.map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-4 feature">
              <i className={feature.icon}></i>
              <div className="feature-content">
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
                <a href="/" className="readmore">Readmore</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
