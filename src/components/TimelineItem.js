import React from 'react';

const TimelineItem = ({ year, title, subtitle, description, points = [], delay = 0 }) => (
  <div 
    className="relative pl-8 border-l border-gray-300 dark:border-gray-700 py-4 group hover:border-blue-500 transition-colors duration-300"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute left-0 top-0 w-3 h-3 -ml-1.5 mt-6 rounded-full bg-gray-300 dark:bg-gray-700 group-hover:bg-blue-500 transition-colors duration-300" />
    <span className="text-lg font-bold text-blue-500 dark:text-blue-400 mb-2 block">{year}</span>
    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
      {title}
    </h3>
    <h4 className="text-lg text-gray-700 dark:text-gray-300 mb-2">{subtitle}</h4>
    {description && <p className="text-gray-600 dark:text-gray-400 mb-2">{description}</p>}
    {points.length > 0 && (
      <ul className="list-disc list-inside space-y-1">
        {points.map((point, index) => (
          <li key={index} className="text-gray-600 dark:text-gray-400 pl-2">{point}</li>
        ))}
      </ul>
    )}
  </div>
);

export default TimelineItem;