import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Offcanvas } from "react-bootstrap";
import "./style/Navbar.css";

const Sidebar = ({ handleScroll, sections, openLoginModal, openRegisterModal }) => {
  const [activeSection, setActiveSection] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);
          }
        });
      },
      { threshold: 0.6 }
    );

    // Observe important sections including footer
    const importantSections = [
      "home", "about", "features", "vision", "roadmap",
      "tokenomics", "team", "ecosystem", "faq", "community", "footer"
    ];

    importantSections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // 10 important menu items + footer
  const menuItems = [
    { id: "home", icon: "fas fa-home", text: "Home" },
    { id: "about", icon: "fas fa-info-circle", text: "About" },
    { id: "features", icon: "fas fa-star", text: "Features" },
    { id: "vision", icon: "fas fa-eye", text: "Vision" },
    { id: "roadmap", icon: "fas fa-map", text: "Roadmap" },
    { id: "tokenomics", icon: "fas fa-coins", text: "Tokenomics" },
    { id: "team", icon: "fas fa-users", text: "Team" },
    { id: "ecosystem", icon: "fas fa-globe", text: "Ecosystem" },
    // { id: "faq", icon: "fas fa-question-circle", text: "FAQ" },
    // { id: "community", icon: "fas fa-comments", text: "Community" },
    { id: "footer", icon: "fas fa-address-card", text: "Contact & Legal" }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 📌 Desktop Sidebar */}
      <aside
        className={`sidebar ${isHovered ? "hovered" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="sidebar-content">
          {/* Auth Buttons at the top */}
          <button className="menu-item" onClick={openLoginModal}>
            <i className="fas fa-sign-in-alt"></i>
            <span className="menu-text">Login</span>
          </button>
          <button className="menu-item" onClick={openRegisterModal}>
            <i className="fas fa-user-plus"></i>
            <span className="menu-text">Register</span>
          </button>

          {/* Important Sections */}
          {menuItems.map(({ id, icon, text }) => (
            <button
              key={id}
              className={`menu-item ${activeSection === id ? "active" : ""}`}
              onClick={() => scrollToSection(id)}
            >
              <i className={icon}></i>
              <span className="menu-text">{text}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* 📌 Mobile Navbar */}
      <Navbar expand="lg" className="mobile-navbar">
        <Button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <i className="fas fa-bars"></i>
        </Button>

        <Offcanvas
          show={isMobileMenuOpen}
          onHide={() => setIsMobileMenuOpen(false)}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Quick Links</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              {/* Auth Buttons */}
              <Nav.Link className="mobile-menu-item" onClick={openLoginModal}>
                <i className="fas fa-sign-in-alt"></i> Login
              </Nav.Link>
              <Nav.Link className="mobile-menu-item" onClick={openRegisterModal}>
                <i className="fas fa-user-plus"></i> Register
              </Nav.Link>

              {/* Important Sections */}
              {menuItems.map(({ id, icon, text }) => (
                <Nav.Link
                  key={id}
                  className={`mobile-menu-item ${activeSection === id ? "active" : ""}`}
                  onClick={() => {
                    scrollToSection(id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <i className={icon}></i> {text}
                </Nav.Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </Navbar>
    </>
  );
};

export default Sidebar;
