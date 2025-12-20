import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./style/style.css";

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutRef.current.classList.add("in-view");
          observer.disconnect();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.2 });
    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      className="about-section spad"
      ref={aboutRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-6 about-text">
            <h2>What is AFC</h2>
            <h5>AFC is a pioneering ERC-20 cryptocurrency for a decentralized future.</h5>
            <p>
              Built on the robust Ethereum network using advanced, secured Web3 technologies, AFC is a fully tested 'Chai', secure, and innovative digital asset. Seamlessly integrated with MetaMask, AFC empowers you to manage and transfer value with ease. Discover a new era of financial freedom on our official platform.
            </p>
            <a href="/" className="site-btn sb-gradients sbg-line mt-5">
              Get Started
            </a>
          </div>
        </div>
        <div className="about-img">
          <img src="img/about-img.png" alt="About AFC" />
        </div>
      </div>
    </motion.section>
  );
};

export default About;

