import React, { useEffect } from "react";
import "./style/style.css";

const Process = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    const steps = document.querySelectorAll(".process-step");
    steps.forEach((step) => observer.observe(step));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="process-section spad">
      <div className="process-background"></div>
      <div className="container">
        <div className="section-title text-center">
          <h2>Get Started With AFCOIN</h2>
          <p>
            Begin your journey with AFC through our interactive tutorials. It’s simple, secure, and designed to get you started in minutes!
          </p>
        </div>
        <div className="row">
          <div className="col-md-4 process">
            <div className="process-step">
              <figure className="process-icon">
                <img src="img/process-icons/1.png" alt="Step 1" />
              </figure>
              <h4>Connect Your MetaMask Wallet</h4>
              <p>
                Link your MetaMask wallet to our platform to securely manage your digital assets and interact with the AFC ecosystem.
              </p>
            </div>
          </div>
          <div className="col-md-4 process">
            <div className="process-step">
              <figure className="process-icon">
                <img src="img/process-icons/2.png" alt="Step 2" />
              </figure>
              <h4>Mint Your AFC Tokens</h4>
              <p>
                Utilize our fully tested smart contracts, developed with best with Web3 and Blockchain Technologies, to mint your AFC tokens efficiently.
              </p>
            </div>
          </div>
          <div className="col-md-4 process">
            <div className="process-step">
              <figure className="process-icon">
                <img src="img/process-icons/3.png" alt="Step 3" />
              </figure>
              <h4>Explore the AFC Ecosystem</h4>
              <p>
                Discover advanced features such as account freezing, allowance management, approvals, and seamless transfers within our dynamic platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;

