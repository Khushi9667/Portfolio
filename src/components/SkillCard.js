import React from 'react';
import './SkillsSection.css';

const SkillCard = ({ icon, title, description, color }) => {
  return (
    <div className={`skill-card-hexagon ${color}`}>
      <div className="skill-card-content">
        <div className="skill-icon">{icon}</div>
        <h3 className="skill-title">{title}</h3>
        <p className="skill-description">{description}</p>
      </div>
    </div>
  );
};

export default SkillCard;