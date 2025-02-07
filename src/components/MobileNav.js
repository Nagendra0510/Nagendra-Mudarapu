import React from 'react';
import { Menu, X } from 'lucide-react';

const MobileNav = ({ isOpen, setIsOpen, activeSection }) => {
  const navItems = ['home', 'projects', 'timeline', 'contact'];

  return (
    <div className="md:hidden">
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out min-h-screen ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Background container with blur and opacity */}
        <div className="absolute inset-0 h-full min-h-screen bg-white/75 dark:bg-gray-900/75 backdrop-blur-lg">
          {/* Content wrapper */}
          <div className="relative h-full min-h-screen">
            {/* Navigation Container */}
            <div className="flex flex-col min-h-screen h-full pt-20 px-6">
              {/* Menu Items */}
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setIsOpen(false)}
                  className={`py-4 text-lg capitalize transition-all duration-300 
                    hover:text-blue-500 dark:hover:text-blue-400 
                    border-b border-gray-200/0 dark:border-gray-800/0
                    font-medium
                    ${
                      activeSection === item 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-800 dark:text-gray-200'
                    }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Burger/Close Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2 transition-colors duration-300 
                 bg-white/90 dark:bg-gray-900/90 
                 text-gray-700 dark:text-gray-200
                 hover:text-blue-500 dark:hover:text-blue-400 
                 rounded-lg
                 border border-gray-200 dark:border-gray-800
                 shadow-lg"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};

export default MobileNav;