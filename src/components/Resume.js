import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom"; 
import { Document, Page, pdfjs } from "react-pdf";
import { FaMusic } from "react-icons/fa";
import "./FloatingMusic.css";
import "./Resume.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

const Resume = () => {
  const [numPages, setNumPages] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [pdfWidth, setPdfWidth] = useState(800);
  const [deviceType, setDeviceType] = useState("desktop"); 
  const [isFullscreen, setIsFullscreen] = useState(false); 
  const sectionRef = useRef(null);

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setDeviceType("mobile");
        setPdfWidth(700); 
      } else if (width <= 992) {
        setDeviceType("tablet");
        setPdfWidth(900);
      } else {
        setDeviceType("desktop");
        setPdfWidth(800);
      }
    };
    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFullscreen]);

  const renderPDFDocument = (widthToRender) => (
    <Document file="/Khushi_Jain_Resume.pdf" onLoadSuccess={onDocumentLoadSuccess}>
      {Array.from(new Array(numPages), (_, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          width={widthToRender} 
        />
      ))}
    </Document>
  );

  return (
    <>
      <section id="resume" className={`resume-section ${isVisible ? "screen-on" : "screen-off"}`} ref={sectionRef}>
        <div className="music-symbol top-left">
          <FaMusic />
          <span className="hover-text">"Designing the future, one line at a time."</span>
          <div className="music-shadow"></div>
        </div>
        <div className={`hardware-wrapper ${deviceType}`}>
          <div className="device-frame">
            <div 
              className="device-screen" 
              onClick={() => deviceType === "mobile" && setIsFullscreen(true)}
            >
              <div className="pdf-container">
                {isVisible && renderPDFDocument(pdfWidth)}
              </div>
              {deviceType === "mobile" && !isFullscreen && (
                <div className="tap-to-expand">Tap to Expand</div>
              )}
            </div>
            <a href="/Khushi_Jain_Resume.pdf" download className="download-btn embedded-download">
              Download Resume
            </a>
          </div>
          <div className="device-stand"></div>
          <div className="device-base"></div>
        </div>
        <div className="music-symbol bottom-right">
          <FaMusic />
          <span className="hover-text">"Curiosity is my compass."</span>
          <div className="music-shadow"></div>
        </div>
      </section>
      {isFullscreen && createPortal(
        <div className="resume-fullscreen-overlay" onClick={() => setIsFullscreen(false)}>
          <button className="fullscreen-close-btn" onClick={() => setIsFullscreen(false)}>
            ✕ Close
          </button>
          <div className="fullscreen-pdf-wrapper" onClick={(e) => e.stopPropagation()}>
            {renderPDFDocument((window.innerWidth - 20) * (window.devicePixelRatio || 2))}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Resume;