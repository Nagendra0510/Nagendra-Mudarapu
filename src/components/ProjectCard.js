import React from 'react';
import { ExternalLink } from 'lucide-react';

const ProjectCard = ({ project, onClick, delay = 0 }) => {
  const { title, description, tags } = project;  // Destructure the project object

  return (
    <div 
      onClick={onClick}
      className="group bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h3>
        <ExternalLink className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300" size={20} />
      </div>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags && tags.map((tag, index) => (
          <span 
            key={index} 
            className="bg-gray-900/50 text-blue-400 text-sm px-3 py-1 rounded-full border border-gray-700"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;