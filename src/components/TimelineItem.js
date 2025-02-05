import React from 'react';

const TimelineItem = ({ year, title, subtitle, description, delay = 0 }) => (
  <div 
    className="relative pl-8 border-l border-gray-700 py-4 group hover:border-blue-500 transition-colors duration-300"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute left-0 top-0 w-3 h-3 -ml-1.5 mt-6 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors duration-300" />
    <span className="text-lg font-bold text-blue-400 mb-2 block">{year}</span>
    <h3 className="text-xl font-bold text-gray-100 group-hover:text-blue-400 transition-colors duration-300">
      {title}
    </h3>
    <h4 className="text-lg text-gray-400 mb-2">{subtitle}</h4>
    <p className="text-gray-500">{description}</p>
  </div>
);

export default TimelineItem;