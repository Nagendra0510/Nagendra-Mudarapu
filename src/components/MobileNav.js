import React from 'react';
import { Menu, X } from 'lucide-react';

const MobileNav = ({ isOpen, setIsOpen, activeSection }) => {
  const navItems = ['home', 'projects', 'timeline', 'contact'];

  return (
    <div className="md:hidden">
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-lg">
          {/* Navigation Container - Added padding-top to account for header height */}
          <div className="flex flex-col pt-15 px-6">
            {/* Menu Items */}
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setIsOpen(false)}
                className={`py-4 text-lg capitalize transition-all duration-300 hover:text-blue-400 border-b border-gray-800 ${
                  activeSection === item ? 'text-blue-400' : 'text-gray-400'
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Burger/Close Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2 text-gray-400 hover:text-blue-400 transition-colors duration-300 bg-gray-900/80 rounded-lg"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};

export default MobileNav;