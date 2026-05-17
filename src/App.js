import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"; 
import About from "./components/About"; 
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import Footer from "./components/Footer";
import CurvedNavbar from "./components/CurvedNavbar";

export default function App() {
  return (
    <Router>
      <CurvedNavbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
      <About />
      <Skills />
      <Projects />
      <Resume />
      <Footer />
    </Router>
  );
}
