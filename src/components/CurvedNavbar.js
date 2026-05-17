import React, { useState } from "react";
import { FaHome, FaUser, FaCode, FaFilePdf, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import "./CurvedNavbar.css";

const CurvedNavbar = () => {
  const [active, setActive] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoExpanded, setIsLogoExpanded] = useState(false);

  const handleNavigation = (sectionId) => {
    setActive(sectionId); 
    setIsMobileMenuOpen(false); 
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start", 
      });
    }
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLogo = () => {
    setIsLogoExpanded(!isLogoExpanded);
  };

  return (
    <div className="curved-navbar">
      <div 
        className={`logo ${isLogoExpanded ? "expanded" : ""}`} 
        onClick={toggleLogo}
      >
        KJ
      </div>
      <div className="mobile-toggle" onClick={toggleMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? "active" : ""}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
      <div className={`nav-container ${isMobileMenuOpen ? "open" : ""}`}>
        <ul className="nav-list">
          <li
            className={`nav-item ${active === "home" ? "active" : ""}`}
            onClick={() => handleNavigation("home")}
          >
            <FaHome /> <span className="nav-text">Home</span>
          </li>
          <li
            className={`nav-item ${active === "about" ? "active" : ""}`}
            onClick={() => handleNavigation("about")}
          >
            <FaUser /> <span className="nav-text">About</span>
          </li>
          <li
            className={`nav-item ${active === "projects" ? "active" : ""}`}
            onClick={() => handleNavigation("projects")}
          >
            <FaCode /> <span className="nav-text">Projects</span>
          </li>
          <li
            className={`nav-item ${active === "resume" ? "active" : ""}`}
            onClick={() => handleNavigation("resume")}
          >
            <FaFilePdf /> <span className="nav-text">Resume</span>
          </li>
          <li
            className={`nav-item ${active === "contact" ? "active" : ""}`}
            onClick={() => handleNavigation("contact")}
          >
            <FaEnvelope /> <span className="nav-text">Contact</span>
          </li>
        </ul>
        <div className={`curve ${active}`}></div>
      </div>
    </div>
  );
};

export default CurvedNavbar;