import React, { useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ReactTyped } from "react-typed";
import "./Home.css";

const Home = () => {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const stringRef = useRef(null);

  useEffect(() => {
    function pluckEffect() {
      const letters = textContainerRef.current?.querySelectorAll("span");
      const string = stringRef.current;

      if (letters && string) {
        letters.forEach((letter, i) => {
          setTimeout(() => {
            letter.classList.add("animate-pluck");
            setTimeout(() => letter.classList.remove("animate-pluck"), 800);
          }, i * 80);
        });

        string.classList.add("animate-string");
        setTimeout(() => string.classList.remove("animate-string"), 800);
      }
    }

    pluckEffect();
    const interval = setInterval(pluckEffect, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const leafImages = [
      "/assets/yellow-leaf.png",
      "/assets/red-leaf.png",
      "/assets/orange-leaf.png",
      "/assets/brown-leaf.png",
    ];

    const createdLeaves = [];

    for (let i = 0; i < 35; i++) {
      const leaf = document.createElement("div");
      leaf.className = "leaf";
      leaf.style.backgroundImage = `url(${
        leafImages[Math.floor(Math.random() * leafImages.length)]
      })`;
      
      leaf.style.left = `${Math.random() * 100}vw`;
      const baseSize = 20 + Math.random() * 20;
      leaf.style.width = `clamp(12px, ${baseSize / 5}vw, ${baseSize}px)`;
      leaf.style.height = leaf.style.width;

      const fallDuration = 8 + Math.random() * 8;
      const fallDelay = Math.random() * 2;
      const animationType = Math.random() > 0.5 ? "fall-drift" : "fall-swirl";

      leaf.style.animationName = animationType;
      leaf.style.animationDuration = `${fallDuration}s`;
      leaf.style.animationDelay = `${fallDelay}s`;
      leaf.style.animationTimingFunction = "linear";
      leaf.style.animationIterationCount = "infinite";

      container.appendChild(leaf);
      createdLeaves.push(leaf);
    }
    return () => {
      createdLeaves.forEach((leaf) => leaf.remove());
    };
  }, []);

  return (
    <section id="home" className="home-section">
      <Container fluid className="px-md-5 position-relative wrapper-container"> 
        <Row className="align-items-center h-100 w-100 m-0 text-row"> 
          <Col xs={12} md={8} lg={7} className="left-column">
            <div className="home-content">
              <div className="guitar-container">
                <h1 className="guitar-text" ref={textContainerRef}>
                  <span>K</span><span>h</span><span>u</span><span>s</span><span>h</span><span>i</span>
                  <span>&nbsp;</span>
                  <span>J</span><span>a</span><span>i</span><span>n</span>
                </h1>
                <svg viewBox="0 0 600 50" preserveAspectRatio="none">
                  <path id="guitar-string" ref={stringRef} d="M0,50 Q150,50 300,50 Q450,50 600,50"></path>
                </svg>
              </div>
              <div className="typed-container">
                <ReactTyped
                  strings={[
                    "Software Developer",
                    "Web Developer",
                    "App Developer",
                    "MERN Stack Developer",
                    "ML Enthusiast",
                    "Tech Explorer",
                  ]}
                  typeSpeed={80}
                  backSpeed={50}
                  loop
                />
              </div>
            </div>
          </Col>
        </Row>
        <div className="tree-column">
          <img
            src="/assets/autumn-tree.png"
            alt="Autumn Tree"
            className="autumn-tree"
          />
        </div>
        <div className="falling-leaves" ref={containerRef}></div>
      </Container>
    </section>
  );
};

export default Home;