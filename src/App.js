import React, { useState, useEffect } from 'react';
import { GithubIcon, LinkedinIcon, MailIcon, MapPinIcon, SendIcon, ChevronDownIcon } from 'lucide-react';
import ProjectCard from './components/ProjectCard';
import ExpandedProjectCard from './components/ExpandedProjectCard';
import TimelineItem from './components/TimelineItem';
import AnimatedBackground from './components/AnimatedBackground';
import MobileNav from './components/MobileNav';
import { ThemeProvider } from './components/ThemeProvider';
import ProfilePic from './profile-pic.jpg'
import { timelineData } from './data/timelineData';

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [contactForm, setContactForm] = useState({ email: '', subject: '', content: '' });
  // const [showForm, setShowForm] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Project Data
  const projectsData = [
    {
      title: "Visual Odometry for Localization",
      description: "Implemented visual odometry using Essential Matrix Decomposition, achieving 92% accuracy in camera motion estimation.",
      tags: ['Computer Vision', 'SLAM', 'Python'],
      details: [
        "Programmed a feature extraction pipeline using SIFT descriptors, FLANN matching",
        "Reduced outliers by 85% using RANSAC outlier rejection",
        "Implemented visual odometry using Essential Matrix Decomposition",
        "Achieved 92% accuracy in camera motion estimation",
        "Reconstructed vehicle trajectory through incremental pose transformations"
      ],
      technologies: ['Python', 'OpenCV', 'NumPy', 'SIFT', 'Essential Matrix', 'FLANN'],
      github: "https://github.com/Abhi-0212000/Visual-Odometry-for-Localization"
    }
  ];

  useEffect(() => {
    // Simulated loading effect
    // const timer = setTimeout(() => {
    //   setIsLoading(false);
    // }, 2000);
    setIsLoading(false);

    // Scroll progress and section detection
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Update progress bar
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / totalScroll) * 100;
      setScrollProgress(progress);

      // Update active section based on scroll position
      const sections = ['home', 'projects', 'timeline', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      // clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a properly formatted email body with line breaks
    const formattedBody = `
    Message from: ${contactForm.email}
    
    ${contactForm.content}
      `.trim();
    // Properly encode the subject and body for mailto
    const mailtoLink = `mailto:abhishek.nannuri@outlook.com?subject=${encodeURIComponent(contactForm.subject)}&body=${encodeURIComponent(formattedBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form
    setContactForm({ email: '', subject: '', content: '' });
    
    // Optional: Add a success message
    alert('Opening your email client...');
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <div className="mt-4 text-blue-400 animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  // Updated name and links to reflect your details
  const githubLink = "https://github.com/Nagendra0510";
  const linkedinLink = "https://www.linkedin.com/in/nagendra-mudarapu/";
  const emailLink = "mailto:mudarapu.nagendra@gmail.com";

  return (
    <ThemeProvider>
      {/* <div className="min-h-screen bg-[#1a1f35] text-gray-900 dark:text-gray-100 transition-colors duration-300"> */}
      <AnimatedBackground />
      {/* <div className="relative min-h-screen bg-white dark:bg-[#1a1f35] text-gray-900 dark:text-gray-100 transition-colors duration-300"></div> */}

      {/* Progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full bg-white/80 dark:bg-[#1a1f35]/80 backdrop-blur-lg z-40 transition-all duration-300 ${
          isNavVisible ? 'translate-y-0' : '-translate-y-full'
        }`}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent">
              Nagendra Mudarapu
            </h1>
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'projects', 'timeline', 'contact'].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`text-lg capitalize transition-all duration-300 hover:text-blue-500 dark:hover:text-blue-400 ${
                    activeSection === section 
                      ? 'text-blue-500 dark:text-blue-400' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {section}
                </a>
              ))}
            </div>
            {/* Mobile Navigation */}
            <MobileNav 
              isOpen={isMobileMenuOpen} 
              setIsOpen={setIsMobileMenuOpen} 
              activeSection={activeSection}
            />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen relative flex items-center justify-center pt-16">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 dark:from-blue-500/10 dark:to-purple-500/10" />
          <div className="max-w-6xl mx-auto px-4 relative">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                <img 
                  src={ProfilePic}
                  alt="Abhi"
                  className="relative w-48 h-48 rounded-full object-cover border-4 border-gray-300 dark:border-gray-800 group-hover:border-blue-500 transition duration-300"
                />
              </div>
              
              <div className="space-y-5 max-w-2xl">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent pb-2">
                  Digitalisation and Sustainability Engineer
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                Digitalisation and Sustainability Engineer focused on implementing Digital Twin Solution as Digital Product Passports to support regulatory compliance, transparency, and sustainable practices in the automotive industry aligning with upcoming EU regulations.
                </p>
                
                <div className="flex justify-center items-center space-x-4 text-gray-600 dark:text-gray-400">
                  <MapPinIcon className="w-5 h-5" />
                  <span>Regensburg, DE</span>
                </div>

                <div className="flex justify-center space-x-6 pt-6">
                  <a 
                    href={githubLink} 
                    className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transform hover:scale-110 transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon size={28} />
                  </a>
                  <a 
                    href={linkedinLink} 
                    className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transform hover:scale-110 transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedinIcon size={28} />
                  </a>
                  <a 
                    href={emailLink} 
                    className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transform hover:scale-110 transition duration-300"
                  >
                    <MailIcon size={28} />
                  </a>
                </div>
              </div>

              <a 
                href="#projects" 
                className="absolute bottom-8 animate-bounce text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition duration-300"
              >
                <ChevronDownIcon size={32} />
              </a>
            </div>
          </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-20 relative bg-transparent">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-light/10 dark:from-accent-dark/10 to-blue-500/5" />
        <div className="max-w-6xl mx-auto px-4 relative">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                onClick={() => setSelectedProject(project)}
                delay={index * 100}
              />
            ))}
          </div>

          {/* Expanded Project Modal */}
          {selectedProject && (
            <ExpandedProjectCard
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="min-h-screen py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-light/10 dark:from-accent-dark/10 to-purple-500/5" />
        <div className="max-w-3xl mx-auto px-4 relative">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Journey So Far
          </h2>
          <div className="space-y-8">
            {timelineData.map((item, index) => (
              <TimelineItem
                key={index}
                year={item.year}
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
                points={item.points}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20 relative bg-transparent">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-light/10 dark:from-accent-dark/10 to-blue-500/5" />
        <div className="max-w-3xl mx-auto px-4 relative">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-8 border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-colors duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Your Email</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-gray-800 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-gray-800 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea
                  value={contactForm.content}
                  onChange={(e) => setContactForm({...contactForm, content: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-gray-800 dark:text-gray-300 h-32 resize-none placeholder-gray-500 dark:placeholder-gray-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white py-3 px-4 rounded-lg hover:opacity-90 transform hover:scale-[0.99] transition-all duration-300 flex items-center justify-center space-x-2 font-medium"
              >
                <SendIcon size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-50/50 dark:bg-[#1a1f35]/50 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} Nagendra Mudarapu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    {/* </div> */}
    </ThemeProvider>
  );
};

export default Portfolio;