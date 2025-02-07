import React from 'react';
import { X, Github } from 'lucide-react';

const ApproachCard = ({ approach }) => (
  <div className="bg-gray-100/50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
    <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
      {approach.name}
    </h4>
    <ul className="list-disc pl-4 space-y-2 text-gray-600 dark:text-gray-300 mb-4">
      {approach.details.map((detail, index) => (
        <li key={index}>{detail}</li>
      ))}
    </ul>
    <div className="flex flex-wrap gap-2 mb-3">
      {approach.technologies.map((tech, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-gray-200/50 dark:bg-gray-900/50 rounded-full text-gray-700 dark:text-blue-400 text-sm"
        >
          {tech}
        </span>
      ))}
    </div>
    {approach.github && (
      <a
        href={approach.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors w-fit"
      >
        <Github size={20} />
        <span>View Implementation</span>
      </a>
    )}
  </div>
);

const SingleProjectView = ({ project }) => (
  <div className="space-y-4">
    <div className="prose prose-invert max-w-none">
      <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
      
      {project.details && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Key Features:</h4>
          <ul className="list-disc pl-4 space-y-2 text-gray-600 dark:text-gray-300">
            {project.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      )}

      {project.technologies && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Technologies Used:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200/50 dark:bg-gray-900/50 rounded-full text-gray-700 dark:text-blue-400 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>

    {project.github && (
      <div className="flex space-x-4 pt-4">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
        >
          <Github size={20} />
          <span>View Source</span>
        </a>
      </div>
    )}
  </div>
);

const MultiApproachView = ({ project }) => (
  <div className="space-y-6">
    <div className="prose prose-invert max-w-none">
      <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
      
      {project.approaches && (
        <div className="mt-6">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Implementation Approaches:</h4>
          {project.approaches.map((approach, index) => (
            <ApproachCard key={index} approach={approach} />
          ))}
        </div>
      )}
    </div>
  </div>
);

const ExpandedProjectCard = ({ project, onClose }) => {
  if (!project) return null;
  
  const isMultiApproach = Boolean(project.approaches);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-900 rounded-xl max-w-3xl w-full p-6 border border-gray-200 dark:border-gray-700 max-h-[80vh] overflow-y-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          {/* Project content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent">
              {project.title}
            </h3>

            {isMultiApproach ? (
              <MultiApproachView project={project} />
            ) : (
              <SingleProjectView project={project} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedProjectCard;