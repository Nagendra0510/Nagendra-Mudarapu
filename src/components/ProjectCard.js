import React from 'react';
import { ExternalLink } from 'lucide-react';

const ProjectCard = ({ project, onClick, delay = 0 }) => {
  const { title, description, tags, technologies } = project;

  // Use tags if available, otherwise fall back to technologies
  const displayTechnologies = tags || technologies || [];

  return (
    <div 
      onClick={onClick}
      className="group bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h3>
        <ExternalLink 
          className="text-gray-600 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300" 
          size={20} 
        />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {displayTechnologies.slice(0, 4).map((tech, index) => (
          <span 
            key={index} 
            className="bg-gray-100 dark:bg-gray-900/50 text-gray-700 dark:text-blue-400 text-sm px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

// Example usage of ProjectCard for your projects
// Add this in the parent component where ProjectCard is used

const projectData = [
  {
    title: 'Implementation of Digital Twin in a Bottle Filling Plant',
    description: 'Developed Digital Product Passports, integrated QR codes for traceability, and ensured compliance with regulatory standards.',
    technologies: ['Digital Twin', 'QR Codes', 'Lifecycle Assessment', 'ISO-14040'],
  },
  {
    title: 'Self-optimized Industry 4.0 Plant',
    description: 'Implemented RFID traceability, tested ladder logic, and created PLC-HMI communication tags for automation.',
    technologies: ['RFID', 'Raspberry Pi', 'PLC', 'HMI'],
  },
  {
    title: 'Micro Drilling Studies on FDM Sample (PLA BRONZE)',
    description: 'Analyzed performance differences of FDM printed specimens subjected to CNC micro-drilling and improved processing techniques.',
    technologies: ['CNC', 'FDM', 'SEM Analysis'],
  },
  {
    title: 'Mechatronic Robotic Device for Precision Irrigation',
    description: 'Developed a robotic device for self-regulating and precision irrigation using ROS.',
    technologies: ['ROS', 'Mechatronics', 'Precision Irrigation'],
  },
];

// Render project cards
{projectData.map((project, index) => (
  <ProjectCard
    key={index}
    project={project}
    delay={index * 100}
  />
))}

export default ProjectCard;