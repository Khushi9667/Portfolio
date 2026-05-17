import React, { useState, useEffect } from "react";
import { CgCPlusPlus } from "react-icons/cg";
import { DiJavascript1, DiNodejs, DiReact, DiMongodb, DiGit, DiPython, DiCss3, DiHtml5, DiGithub, DiVisualstudio } from "react-icons/di";
import { SiMongoose, SiMaterialdesign, SiBootstrap, SiNpm, SiVite, SiSolidity, SiFlutter, SiDart, SiPostman, SiAndroidstudio, SiSqlite, SiExpress, SiScikitlearn, SiStreamlit, SiPandas, SiNumpy, SiTensorflow, SiPytorch } from "react-icons/si";
import { FaMusic } from "react-icons/fa";
import "./FloatingMusic.css";
import "./SkillsSection.css";

const IconC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" stroke="currentColor" strokeWidth="10" > 
    <text x="64" y="98" fontFamily="Arial, sans-serif" fontSize="100" fontWeight="550" fill="currentColor" textAnchor="middle" stroke="none" > C </text> 
  </svg> 
);

const allSkills = {
  python: { icon: <DiPython />, title: "Python" },
  c: { icon: <IconC />, title: "C" },
  cpp: { icon: <CgCPlusPlus />, title: "C++" },
  dart: { icon: <SiDart />, title: "Dart" },
  solidity: { icon: <SiSolidity />, title: "Solidity" },
  tensorflow: { icon: <SiTensorflow />, title: "TensorFlow" },
  pytorch: { icon: <SiPytorch />, title: "PyTorch" },
  scikit: { icon: <SiScikitlearn />, title: "Scikit-Learn" },
  pandas: { icon: <SiPandas />, title: "Pandas" },
  numpy: { icon: <SiNumpy />, title: "NumPy" },
  streamlit: { icon: <SiStreamlit />, title: "Streamlit" },
  react: { icon: <DiReact />, title: "React.js" },
  mui: { icon: <SiMaterialdesign />, title: "Material-UI" },
  bootstrap: { icon: <SiBootstrap />, title: "Bootstrap" },
  js: { icon: <DiJavascript1 />, title: "JavaScript" },
  html5: { icon: <DiHtml5 />, title: "HTML5" },
  css3: { icon: <DiCss3 />, title: "CSS3" },
  node: { icon: <DiNodejs />, title: "Node.js" },
  express: { icon: <SiExpress />, title: "Express.js" },
  postman: { icon: <SiPostman />, title: "Postman" },
  mongo: { icon: <DiMongodb />, title: "MongoDB" },
  sql: { icon: <SiSqlite />, title: "SQL" },
  mongoose: { icon: <SiMongoose />, title: "Mongoose" },
  flutter: { icon: <SiFlutter />, title: "Flutter" },
  reactNative: { icon: <DiReact />, title: "React Native" },
  androidStudio: { icon: <SiAndroidstudio />, title: "Android Studio" },
  git: { icon: <DiGit />, title: "Git" },
  github: { icon: <DiGithub />, title: "Github" },
  npm: { icon: <SiNpm />, title: "NPM" },
  vsCode: { icon: <DiVisualstudio />, title: "VS Code" },
  vite: { icon: <SiVite />, title: "Vite" },
};
  
const skillCategories = [
  {
    id: 'languages',
    title: 'Languages',
    gradient: 'linear-gradient(135deg, #e29f58, #da8337)', 
    color:'#a9662d', 
    skills: [allSkills.python, allSkills.c, allSkills.cpp, allSkills.dart,allSkills.solidity],
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    gradient: 'linear-gradient(135deg, #be8554, #8d5226)', 
    color: '#6f3e15', 
    skills: [allSkills.tensorflow, allSkills.pytorch, allSkills.scikit, allSkills.pandas, allSkills.numpy, allSkills.streamlit],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    gradient: 'linear-gradient(135deg, #893c10, #a14f1f)', 
    color: '#6b3414',
    skills: [allSkills.react,allSkills.mui,allSkills.bootstrap, allSkills.js, allSkills.html5,allSkills.css3],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    gradient: 'linear-gradient(135deg, #941015, #8b0919)', 
    color: '#c20d22', 
    skills: [allSkills.node, allSkills.express,allSkills.postman],
  },
  {
    id: 'databases',
    title: 'Databases',
    gradient: 'linear-gradient(135deg, #b43321, #e05625)',
    color: '#8d271a',
    skills: [allSkills.mongo, allSkills.sql,allSkills.mongoose],
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    gradient: 'linear-gradient(135deg, #c75e2a, #582018)',
    color: '#461008',
    skills: [allSkills.flutter, allSkills.reactNative, allSkills.androidStudio],
  }, 
  {
    id: 'tools',
    title: 'Development tools',
    gradient: 'linear-gradient(135deg, #df802f, #8d4124)',
    color: '#ab441c',
    skills: [allSkills.git, allSkills.github,allSkills.npm,allSkills.vsCode,allSkills.vite],
  }, 
];

const SkillHexagon = ({ skill, style, color }) => (
  <div className="skill-hexagon-wrapper" style={style}>
    <div className="skill-hexagon-shadow" />
    <div className="skill-hexagon-body">
      <div className="skill-hexagon-inner-face">
        <div className="skill-hexagon-icon" title={skill.title} style={{color:color}}>
          {skill.icon}
        </div>
      </div>
    </div>
  </div>
);

const CategoryHexagon = ({ category, onClick, isModal }) => {
  const skillPositions = [
    { top: '10%', left: '50%' },
    { top: '75%', left: '80%' },
    { top: '75%', left: '20%' },
    { top: '35%', left: '90%' },
    { top: '35%', left: '10%' },
    { top: '90%', left: '50%' }
  ];

  return (
    <div 
      className={`category-hexagon-wrapper ${isModal ? 'is-modal' : ''}`} 
      id={category.id}
      onClick={onClick}
    >
      <div className="floating-skills-container">
        {category.skills.map((skill, index) => (
          <SkillHexagon
            key={skill.title}
            skill={skill}
            style={skillPositions[index % skillPositions.length]} 
            color={category.color}
          />
        ))}
      </div>
      <div
        className="category-hexagon-base"
        style={{ background: category.gradient }}
      >
        <h3 className="category-title">{category.title}</h3>
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    if (selectedCategory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    if (window.innerWidth <= 768) {
      setSelectedCategory(category);
    }
  };

  return (
    <>
      <section className="skills-section" id="skills">
        <div className="music-symbol top-left">
          <FaMusic />
          <span className="hover-text">"There is a kind of quiet magic in making things work."</span>
          <div className="music-shadow"></div>
        </div>
        <h1 className="skills-section-title">My Digital Toolbox</h1>
        <div className="honeycomb-grid-container">
          <div className="honeycomb-grid">
            {skillCategories.map(category => (
              <CategoryHexagon 
                key={category.id} 
                category={category} 
                onClick={() => handleCategoryClick(category)}
              />
            ))}
          </div>
        </div>
        <div className="music-symbol bottom-right">
          <FaMusic />
          <span className="hover-text">"Always learning, always building."</span>
          <div className="music-shadow"></div>
        </div>
      </section>
      {selectedCategory && (
        <div className="skills-modal-overlay" onClick={() => setSelectedCategory(null)}>
          <div className="skills-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="skills-modal-close" 
              onClick={() => setSelectedCategory(null)}
              aria-label="Close modal"
            >
              ✕
            </button>
            <div className="modal-hex-showcase">
              <CategoryHexagon category={selectedCategory} isModal={true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SkillsSection;