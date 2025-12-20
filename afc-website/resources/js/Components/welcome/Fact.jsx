import React, { useState } from 'react';
import './style/style.css';

const Fact = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className={`fact-section ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`glass-overlay ${isHovered ? 'show' : ''}`}>
        <h1 className="fact-section-title">Important TIPS</h1>
      </div>
      <div className="container">
        <div className="row content">
          <div className="col-sm-6 col-md-6 col-lg-3">
            <div className="fact">
              <h2>60</h2>
              <p>Support <br /> Countries</p>
              <i className="ti-basketball"></i>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
            <div className="fact">
              <h2>12K</h2>
              <p>Transactions <br /> per hour</p>
              <i className="ti-panel"></i>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
            <div className="fact">
              <h2>5B</h2>
              <p>Largest <br /> Transactions</p>
              <i className="ti-stats-up"></i>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
            <div className="fact">
              <h2 className='hhh'>240</h2>
              <p>Years <br /> of Experience</p>
              <i className="ti-user"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fact;
