import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaMusic } from "react-icons/fa";
import './Projects.css';
import "./FloatingMusic.css";

const projectsData = [
  {
    name: "AeroTrack",
    tech: [
      { name: "JS", percentage: 45 },
      { name: "Three.js", percentage: 20 },
      { name: "GSAP", percentage: 15 },
      { name: "Bootstrap", percentage: 10 },
      { name: "HTML", percentage: 5 },
      { name: "CSS", percentage: 5},
    ],
    image: "./assets/project-images/aerotrack.png",
    doodle: "./assets/project-images/aerotrackdoodle.png",
    colorClass: "card-aerotrack",
    description: "AeroTrack is a flight booking and tracking web application designed to simplify the travel experience while providing a visually engaging interface. The platform enables users to book flights, view and manage their trip history, and monitor real-time flight status through live API integration. Its standout feature is an interactive front-end powered by Three.js and GSAP, where a dynamic 3D aircraft model responds to user interactions and scroll animations, creating an immersive journey through the site. Built with modern web tech on the frontend and leveraging browser local storage for user authentication and data management, it blends functionality with innovation to deliver a seamless and interactive travel management solution.",
    links: [
      { type: "GitHub Repo", url: "https://github.com/Khushi9667/AeroTrack" },
      { type: "Live Demo", url: "https://aerotrack-mrs2.onrender.com/" },
    ]
  },
  {
    name: "Tennesse Anomaly Detector",
    tech: [
      { name: "Python", percentage: 45 },
      { name: "Scikit-Learn", percentage: 20 },
      { name: "Streamlit", percentage: 15 },
      { name: "Pandas", percentage: 5 },
      { name: "Numpy", percentage: 5},
      { name: "Matplotlib", percentage: 5 },
      { name: "Seaborn", percentage: 5},
    ],
    image: "./assets/project-images/tep.png",
    doodle: "./assets/project-images/tepdoodle.png",
    colorClass: "card-tep",
    description: "Tennessee Eastman Anomaly Detector is an end-to-end industrial ML solution designed to monitor and identify process faults within the complex TEP chemical plant simulation. By leveraging multivariate time-series data from 50+ sensors, the system distinguishes between normal operations and 20 distinct fault types. It features a memory-optimized Python pipeline capable of handling large-scale industrial datasets through automated feature selection and correlation redundancy checks. The project is topped with a premium Streamlit dashboard that provides real-time inference tracking and a System Health Timeline, visualizing the exact moment a process drifts into a hazardous state.",
    links: [
      { type: "GitHub Repo", url: "https://github.com/Khushi9667/tennessee-eastman-anomaly-detector" },
    ]
  },
  {
    name: "YelpCamp",
    tech: [
      { name: "Node.js", percentage: 20 },
      { name: "Express", percentage: 10 },
      { name: "MongoDB", percentage: 25 },
      { name: "EJS", percentage: 10 },
      { name: "Bootstrap", percentage: 10 },
      { name: "JS", percentage: 15 },
      { name: "APIs", percentage: 10 },
    ],
    image: "./assets/project-images/yelpcamp.png",
    doodle: "./assets/project-images/yelpcampdoodle.png",
    colorClass: "card-yelpcamp",
    description: "YelpCamp is a full-stack web application, serving as a platform for campground listings and reviews. The project allows users to create, read, update, and delete campgrounds, as well as post comments and ratings, with a secure authentication system powered by Passport.js. Built using Node.js, Express, and MongoDB with Mongoose, and rendered on the front-end with EJS, YelpCamp demonstrates a complete understanding of RESTful routing, database integration, and dynamic server-side rendering. This project showcases practical skills in full-stack development, user authentication, authorization, and creating a responsive, interactive web application.",
    links: [
      { type: "GitHub Repo", url: "https://github.com/Khushi9667/YelpCamp" },
      { type: "Live Demo", url: "https://yelpcamp-yb8t.onrender.com/" },
    ]
  },
  {
    name: "Fake News Detection",
    tech: [
      { name: "TensorFlow", percentage: 25 },
      {name: "PyTorch", percentage: 20},
      { name: "NLP", percentage: 25 },
      { name: "XAI", percentage: 14 },
      { name: "Pandas", percentage: 8 },
      { name: "Numpy", percentage: 8},
    ],
    image: "./assets/project-images/fakenews.png", 
    doodle: "./assets/project-images/fakenewsdoodle.png",
    colorClass: "card-fakeNews",
    description: "Fake News Detection is an advanced deep learning solution designed to identify misinformation across both textual and multi-modal content. The project features a dual-pipeline architecture: a textual model leveraging a hybrid CNN-BiLSTM with Multi-Head Attention (trained on ISOT and LIAR datasets), and a multi-modal PyTorch network integrating BERT and ResNet50 to process text-image pairs from the Fakeddit dataset. To ensure transparency and trust in predictions, the system incorporates Explainable AI (SHAP and GradCAM), providing interpretable insights into the model's decision-making process. This project demonstrates expertise in natural language processing, computer vision, and model interpretability.",
    links: [
      { type: "GitHub Repo", url: "https://github.com/Khushi9667/Fake-News-Detection" }
    ]
  },
  {
    name: "FarmStand",
    tech: [
      { name: "Node.js", percentage: 25 },
      { name: "Express", percentage: 15 },
      { name: "MongoDB", percentage: 25 },
      { name: "EJS", percentage: 20 },
      { name: "HTML", percentage: 5 },
      { name: "CSS", percentage: 5}, 
      { name: "Bootstrap", percentage: 5}
    ],
    image: "./assets/project-images/farmstand.png",
    doodle: "./assets/project-images/farmstanddoodle.png",
    colorClass: "card-farmstand",
    description: "FarmStand is a full-stack CRUD web application that simulates an online marketplace for fresh produce. Built with Node.js, Express, and MongoDB, the application follows the MVC architecture and leverages EJS for server-side rendering. Users can add new products, browse the catalog, filter items by category (fruits, vegetables, or dairy), and update or delete existing entries, making it a complete inventory management system. The interface is styled with Bootstrap to ensure a clean and responsive design, while the backend demonstrates strong handling of routing, database interactions, and dynamic content generation.",
    links: [
      { type: "GitHub Repo", url: "https://github.com/Khushi9667/FarmStand" },
    ]
  },
  {
    name: "Comments CRUD App",
    tech: [
      { name: "Node.js", percentage: 25 },
      { name: "Express", percentage: 20},
      { name: "EJS", percentage: 25 },
      { name: "JS", percentage: 15 },
      { name: "HTML", percentage: 8 },
      {name: "CSS", percentage: 7}
    ],
    image: "./assets/project-images/comments.png",
    doodle: "./assets/project-images/commentsdoodle.png",
    colorClass: "card-comments",
    description: "Comments CRUD App is a RESTful web application that demonstrates the implementation of full CRUD (Create, Read, Update, Delete) functionality for managing user comments. Built with Node.js and Express, the application uses EJS for server-side rendering and follows a clean REST architecture with well-structured routing. Users can add new comments, view all existing ones, update text content, and delete entries, while 'method-override' middleware enables PATCH and DELETE operations via HTML forms. Designed as a foundational project, it highlights strong backend development practices and provides a practical demonstration of building dynamic, data-driven applications with Express.",
    links: [
      { type: "GitHub Repo", url: "https://github.com/Khushi9667/Comments-CRUD-App" },
    ]
  },
  {
    name: "MiniReddit",
    tech: [
      { name: "Node.js", percentage: 25 },
      { name: "Express", percentage: 20},
      { name: "EJS", percentage: 30 },
      { name: "JS", percentage: 15 },
      { name: "HTML", percentage: 5 },
      {name: "CSS", percentage: 5}
    ],
    image: "./assets/project-images/minireddit.png",
    doodle: "./assets/project-images/miniredditdoodle.png",
    colorClass: "card-miniReddit",
    description: "MiniReddit is a server-side rendered web application inspired by Reddit, designed to showcase content aggregation and dynamic routing. Built with Node.js, Express, and EJS, the project allows users to browse different 'subreddits' such as technology, education, and healthcare, with each page dynamically generated based on JSON data. The application highlights strong use of server-side rendering, modular templating with reusable partials, and clean routing practices, effectively simulating a database-driven platform. By combining structured data handling with intuitive content presentation, MiniReddit demonstrates practical skills in building scalable, content-focused web applications.",
    links: [
      { type: "GitHub Repo", url: "https://github.com/Khushi9667/MiniReddit" },
    ]
  }
];

const NavButton = ({ direction, onClick, disabled }) => (
  <button onClick={onClick} className="nav-button" disabled={disabled}>
  <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    {direction === 'prev' ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    )}
  </svg>
  </button>
);

const LinkButton = ({ type, url }) => {
  const icon = type.includes('GitHub') ? 'fab fa-github' : type.includes('Demo') ? 'fas fa-external-link-alt' :'fas fa-link';
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="modal-link-button"
    >
      <i className={icon}></i>
      <span>{type}</span>
    </a>
  );
};

const CardModal = ({ project, onClose, onPrev, onNext, isFirst, isLast, nextProject }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  const TechCard = ({ tech, percentage }) => {
    const [fillHeight, setFillHeight] = useState(0);
    useEffect(() => {
      const timer = setTimeout(() => {
        setFillHeight(percentage + 25);
      }, 150);
      return () => clearTimeout(timer);
    }, [percentage]);

    const colors = {
      HTML: { top: "#B84514", bottom: "#D46A2F" },
      CSS: { top: "#AF4B4B", bottom: "#C96868" },
      JS: { top: "#C29B1A", bottom: "#DDB83B" },
      EJS: { top: "#4A6B48", bottom: "#648A61" },
      Python: { top: "#2D5A51", bottom: "#4B7C71" },
      GSAP: { top: "#feba52", bottom: "#fca421"},
      Bootstrap: {top: "#E7993A", bottom: "#a16b28"},
      Streamlit: {top: "#923c27", bottom: "#98280c"},
      Pandas: {top: "#632223", bottom: "#490607"},
      Numpy: {top: "#8d2831", bottom: "#8a0813"},
      Matplotlib: {top: "#6a2e00", bottom: "#3d1b00"},
      Seaborn: {top: "#9c3f00", bottom: "#612701"},
      Express: {top: "#d96c00", bottom: "#a55301"},
      MongoDB: {top: "#f2b277", bottom: "#f39742"},
      APIs: {top: "#cb553d", bottom: "#c93416"},
      TensorFlow: {top: "#E87E47", bottom: "#e8611e"},
      PyTorch: {top: "#F0A065", bottom: "#f0802f"},
      NLP: {top: "#d49882", bottom: "#d27655"},
      XAI: {top: "#ba7b72", bottom: "#a7463a"},
      default: { top: "#8C4F2B", bottom: "#AD6B42" },
    };

    const { top, bottom } = colors[tech] || colors.default;

    return (
      <div className="tech-card liquid">
        <div
          className="liquid-fill"
          style={{
            top: `${100 - (fillHeight + 10)}%`, 
            background: `linear-gradient(to bottom, ${top}, ${bottom})`
          }}
        ></div>
        <div className="tech-card-content">
          <div className="tech-card-name">{tech}</div>
        </div>
      </div>
    );
  };
  
  return createPortal(
    <div>
      <div className="modal-close-button-wrapper">
        <button
        onClick={onClose}
        className="modal-close-button"
        aria-label="Close modal"
        >
        Close &nbsp; ✕
        </button>
      </div>
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className={`modal-container slide-up ${project.colorClass}`}>
          <div>
            <aside className="modal-sidebar">
              <div className="sidebar-nav-container">
                <button 
                  className="sidebar-nav-btn" 
                  onClick={onPrev} 
                  disabled={isFirst} 
                  aria-label="Previous project"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              </div>
              <div className="sidebar-content">
                {nextProject && (
                  <span className="next-project">{nextProject.name}</span>
                )}
                <span className="current-project">{project.name}</span>
              </div>
              <div className="sidebar-nav-container">
                <button 
                  className="sidebar-nav-btn" 
                  onClick={onNext} 
                  disabled={isLast} 
                  aria-label="Next project"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </aside>
          </div>
          <div className="modal-content-area">
            <div className="modal-image-wrapper">
              <img
              src={project.image}
              alt={`${project.name}`}
              className="project-image"
              />
            </div>
            <div className="modal-details-content">
              <div className="modal-title-header">
                <h2 className="project-title">{project.name}</h2>
                <p className="project-description">{project.description}</p>
              </div>
              <div className="modal-bottom-content">
                <div className="modal-interactive-section">
                  <div className="tech-card-container">
                    {project.tech.map((techItem, i) => (
                      <TechCard key={i} tech={techItem.name} percentage={techItem.percentage} />
                    ))}
                  </div>
                  <div className="modal-links-section">
                    {project.links.map((link, index) => (
                      <LinkButton key={index} type={link.type} url={link.url} />
                    ))}
                  </div>
                </div>
                <img
                  src={project.doodle}
                  alt="Illustration"
                  className="project-doodle"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState(1);
  const [cardWidth, setCardWidth] = useState(0);
  const scrollTimeout = useRef(null);
  const data = projectsData;

  useEffect(() => {
    const calculateMetrics = () => {
      if (containerRef.current && containerRef.current.children.length > 0) {
        const containerWidth = containerRef.current.offsetWidth;
        const cardElement = containerRef.current.children[0];
        const fullCardWidth = cardElement.offsetWidth + 24;
        setVisibleCards(Math.max(1, Math.floor(containerWidth / fullCardWidth)));
        setCardWidth(fullCardWidth);
      }
    };
    calculateMetrics();
    window.addEventListener("resize", calculateMetrics);
    return () => window.removeEventListener("resize", calculateMetrics);
  }, []);

  const handleCardClick = (project, index) => {
    setSelectedProject(project);
    setCurrentIndex(index);
    setIsModalVisible(true);   
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);  
    setSelectedProject(null);
  };

  const handleCarouselNavClick = (direction) => {
    let newIndex = currentIndex;
    if (direction === "prev") {
      newIndex = Math.max(0, currentIndex - visibleCards);
    } else {
      newIndex = Math.min(data.length - visibleCards, currentIndex + visibleCards);
    }
    setCurrentIndex(newIndex);
    setSelectedProject(data[newIndex]);
    if (containerRef.current && cardWidth > 0) {
      containerRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleModalNavClick = (direction) => {
    const newIndex = direction === 'next'
      ? Math.min(data.length - 1, currentIndex + 1)
      : Math.max(0, currentIndex - 1);

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      setSelectedProject(data[newIndex]);
    }
  };

  const handleScroll = () => {
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      if (containerRef.current && cardWidth > 0) {
        const newIndex = Math.round(containerRef.current.scrollLeft / cardWidth);
        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
        }
      }
    }, 150);
  };

  return (
    <>
      <section id="projects" className="projects-section">
        <div className="app-container">
          <div className="music-symbol top-right">
            <FaMusic />
            <span className="hover-text">"Find beauty in the details and peace in the process."</span>
            <div className="music-shadow"></div>
          </div>
          <header className="header">
            <div className="header-brand">
              <span>My Projects</span>
            </div>
            <a
              href="https://github.com/Khushi9667"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link mobile-header-link"
            >
              GitHub
            </a>
          </header>
          <main className="main-content-wrapper">
            {!isModalVisible ? (
              <div ref={containerRef} className="characters-carousel" onScroll={handleScroll}>
                {data.map((project, index) => {
                  const isActive = index >= currentIndex && index < currentIndex + visibleCards;
                  return (
                    <div
                      key={index}
                      className="character-card"
                      onClick={(e) => handleCardClick(project, index)}
                    >
                      <div className={`colored-card-base ${project.colorClass}`}></div>
                      <img src={project.image} alt={project.name} className="card-image" />
                      <div className="card-info">
                        <h3>{project.name}</h3>
                        <p className="card-tech">
                        {project.tech.map(t => t.name).join(', ')}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </main>
          {!isModalVisible && (
            <div className="carousel-footer">
              <a
                href="https://github.com/Khushi9667"
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
              GitHub
              </a>
              <div className="carousel-nav-buttons">
                <NavButton
                direction="prev"
                onClick={() => handleCarouselNavClick("prev")}
                disabled={currentIndex === 0}
                />
                <NavButton
                  direction="next"
                  onClick={() => handleCarouselNavClick("next")}
                  disabled={currentIndex >= data.length - visibleCards}
                />
              </div>
            </div>
          )}
          {isModalVisible && selectedProject && ( 
            <CardModal
            project={selectedProject}
              nextProject={currentIndex < data.length - 1 ? data[currentIndex + 1] : null}
              onClose={handleCloseModal}
              onPrev={() => handleModalNavClick("prev")}
              onNext={() => handleModalNavClick("next")}
              isFirst={currentIndex === 0}
              isLast={currentIndex === data.length - 1}
            />
          )}
        </div>
      </section>
    </>
  );
}