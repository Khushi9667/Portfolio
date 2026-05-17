import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Container, Row, Col } from "react-bootstrap";
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaHeart } from "react-icons/fa";
import { Environment } from "@react-three/drei";
import emailjs from '@emailjs/browser';
import Sudoku from "./Sudoku";
import Butterfly from "./Butterfly"; 
import "./Footer.css";

const Footer = () => {
  const sectionRef = useRef(null);
  const form = useRef();
  const [startFlying, setStartFlying] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartFlying(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/iPhone|iPad|iPod|Android/i.test(userAgent)) {
      setIsMobile(true);
    }
  }, []);

  const email = "khushijain.25.2003@gmail.com";
  const mobileLink = `mailto:${email}`;
  const desktopLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,  
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,  
      form.current, 
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY   
    )   
    .then((result) => {
        setShowSuccessModal(true);
        e.target.reset();
        setIsSending(false);
    }, (error) => {
        alert("Oops! Something went wrong. Please try again.");
        setIsSending(false);
    });
  };

  return (
    <footer id="contact" className="site-footer" style={{ position: "relative", overflow: "hidden" }}>
      <div 
        className="butterfly-canvas-container" 
        style={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          width: "100%", 
          height: "100%", 
          zIndex: 0, 
          pointerEvents: "none"
        }}
      >
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <Environment files="/potsdamer_platz_1k.hdr"/>
          <Butterfly isVisible={startFlying} scale={0.7} />
        </Canvas>
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <Container>
          <Row>
            <Col lg={4} md={12} className="footer-col mb-4">
              <h2>Khushi Jain</h2>
              <p>
                A passionate software developer dedicated to building high-performance, user-friendly applications. Combining a strong foundation in problem-solving with an eye for modern, interactive design, I love bridging the gap between creative aesthetics and flawless tech execution. 
                <br></br>
                <i>Let's build something amazing together.</i>
              </p>
              <div className="mt-4">
                <h4 className="connect-heading">CONNECT</h4>
                <div className="social-icons">
                  <div className="tech-icons">
                    <a href="https://github.com/Khushi9667" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                      <FaGithub />
                    </a>
                  </div>
                  <div className="tech-icons">
                    <a href="https://linkedin.com/in/khushi-2512-jain" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin />
                    </a>
                  </div>
                  <div className="tech-icons">
                    <a 
                      href={isMobile ? mobileLink : desktopLink} 
                      target={isMobile ? "_self" : "_blank"} 
                      rel="noopener noreferrer"
                      aria-label="Email"
                    >
                      <FaEnvelope />
                    </a>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6} sm={12} className="footer-col footer-sudoku mb-4">
              <Sudoku />
            </Col>
            <Col lg={4} md={6} sm={12} className="footer-col mb-4">
              <h4>Let's get in touch</h4>
              <form ref={form} onSubmit={sendEmail} className="contact-form">
                <input type="text" name="user_name" placeholder="Your Name" required />
                <input type="email" name="user_email" placeholder="Your Email" required />
                <textarea name="message" rows="3" placeholder="Your Message" required></textarea>
                <button type="submit" disabled={isSending}>
                  {isSending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </Col>
          </Row>
          <hr className="footer-divider" />
          <div className="footer-bottom text-center">
            <p className="mb-0">
              Hand-coded with <FaHeart className="heart-icon" /> and{" "}
              <FaCode className="code-icon" /> by <b>Khushi Jain</b>
            </p>
            <p className="copyright-text">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
        </Container>
      </div>
      {showSuccessModal && (
        <div className="custom-modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="custom-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">✨</div>
            <h3>Message Sent!</h3>
            <p>Thank you, Khushi will get back to you soon.</p>
            <button className="modal-ok-btn" onClick={() => setShowSuccessModal(false)}>
              Okay
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
