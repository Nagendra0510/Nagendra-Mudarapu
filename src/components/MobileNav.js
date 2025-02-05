import React from 'react';
import { Menu, X } from 'lucide-react';

const MobileNav = ({ isOpen, setIsOpen, activeSection }) => {
  const navItems = ['home', 'projects', 'timeline', 'contact'];

  return (
    <div className="md:hidden">
      {/* Burger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-300"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-lg">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setIsOpen(false)}
                className={`text-2xl capitalize transition-all duration-300 hover:text-blue-400 ${
                  activeSection === item ? 'text-blue-400' : 'text-gray-400'
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;