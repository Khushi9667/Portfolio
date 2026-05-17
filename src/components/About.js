import React, { useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaMusic } from "react-icons/fa";
import "./About.css";
import "./FloatingMusic.css";

const Home = () => {
  const aboutCardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = aboutCardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = ((y / height) - 0.5) * 15;
    const rotateY = ((x / width) - 0.5) * 15;
    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetTilt = () => {
    const card = aboutCardRef.current;
    if (card) card.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  const handleKeywordContainerMouseMove = (e) => {
    e.stopPropagation(); 
    resetTilt();
  };

  return (
    <>
      <section id="about" className="about-section">
        <div className="music-symbol top-right">
          <FaMusic />
          <span className="hover-text">"Stay curious, stay grounded, and never stop exploring."</span>
          <div className="music-shadow"></div>
        </div>
        <Container>
          <Row className="justify-content-center">
            <Col md={12}>
              <Row className="align-items-center">
                <Col md={3} className="text-center">
                  <video
                    src="/assets/video-final.webm"
                    width="300"
                    muted
                    playsInline
                    loop
                    autoPlay
                    className="img-fluid rounded-circle shadow-lg about-video"
                  />
                </Col>
                <Col md={9}>
                  <div
                    className="about-card"
                    ref={aboutCardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={resetTilt}
                  >
                    <video autoPlay loop muted playsInline className="img-fluid rounded-circle shadow-lg card-video">
                      <source src="/assets/video-final.webm" type="video/mp4" />
                    </video>
                    <h2 className="about-heading">About Me</h2>
                    <div className="item-quote">
                      <p>
                      Hi, I’m <b>Khushi Jain</b>, a curious mind who loves solving
                      problems and bringing ideas to life. I believe technology is
                      as much about people as it is about code, and I enjoy creating
                      experiences that feel intuitive, thoughtful, and a little fun.
                      </p>
                      <p>
                      I’m passionate about turning <i>“what ifs”</i> into <i>“why nots”</i> and making the process enjoyable along the way. <b>Life (and code)</b> is full of puzzles, and I genuinely love figuring them out.
                      </p>
                      <p>
                      Outside of work, I find joy in books or brainstorming. At heart, I’m a mix of creativity and discipline.
                      I love exploring fresh ideas but equally value the structure of turning them into reality.
                      </p>
                    </div>
                    <div className="keywords" onMouseMove={handleKeywordContainerMouseMove} onMouseLeave={resetTilt}>
                      <span className="badge">Hardworking</span>
                      <span className="badge">Optimistic</span>
                      <span className="badge">Creative</span>
                      <span className="badge">Disciplined</span>
                      <span className="badge">Curious</span>
                      <span className="badge">Collaborative</span>
                      <span className="badge">Honest</span>
                      <span className="badge">Resilient</span>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <div className="music-symbol bottom-left">
          <FaMusic />
          <span className="hover-text">"Simplicity is the ultimate sophistication."</span>
          <div className="music-shadow"></div>
        </div>
      </section>
    </>
  );
};

export default Home;
