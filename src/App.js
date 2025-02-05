import React, { useState, useEffect } from 'react';
import { GithubIcon, LinkedinIcon, MailIcon, MapPinIcon, SendIcon, ChevronDownIcon } from 'lucide-react';
import ProjectCard from './components/ProjectCard';
import ExpandedProjectCard from './components/ExpandedProjectCard';
import TimelineItem from './components/TimelineItem';
import AnimatedBackground from './components/AnimatedBackground';
import MobileNav from './components/MobileNav';

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [contactForm, setContactForm] = useState({ email: '', subject: '', content: '' });
  const [showForm, setShowForm] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Project Data
  const projectsData = [
    {
      title: "AMR Logistic System",
      description: "Intracity Delivery Autonomous Mobile Robot for Urban Navigation System featuring fault-tolerant operation and seamless ROS2 integration.",
      tags: ['C++', 'ROS2', 'Navigation', 'Path Planning'],
      details: [
        "Engineered a production-grade Global Path Planner using Lanelet2 and GPS-based navigation",
        "Architected comprehensive modular ROS2-based system architecture",
        "Implemented Local Trajectory Planner using Quintic Bézier splines",
        "Integrated state-of-the-art velocity profiling system using Dynamic Window Approach"
      ],
      technologies: ['C++', 'ROS2', 'Lanelet2', 'Python', 'Navigation Stack'],
      github: "https://github.com/yourusername/amr-logistics"
    },
    {
      title: "Visual Odometry for Localization",
      description: "Implemented visual odometry using Essential Matrix Decomposition, achieving 92% accuracy in camera motion estimation.",
      tags: ['Computer Vision', 'SLAM', 'Python'],
      details: [
        "Programmed a feature extraction pipeline using SIFT descriptors",
        "Implemented visual odometry using Essential Matrix Decomposition",
        "Achieved 92% accuracy in camera motion estimation",
        "Reconstructed vehicle trajectory through incremental pose transformations"
      ],
      technologies: ['Python', 'OpenCV', 'NumPy', 'SIFT', 'Essential Matrix'],
      github: "https://github.com/yourusername/visual-odometry"
    },
    {
      title: "Road Lane Detection System",
      description: "Multi-approach system using Classical CV, Sliding Window, and Deep Learning techniques achieving up to 98% accuracy.",
      tags: ['Computer Vision', 'Deep Learning', 'Python'],
      details: [
        "Constructed computer vision system using OpenCV achieving 95% lane detection accuracy",
        "Developed real-time image processing pipeline with adaptive thresholding",
        "Implemented sliding window technique with 98% accuracy",
        "Created deep learning approach using FCN8 network"
      ],
      technologies: ['Python', 'OpenCV', 'TensorFlow', 'Deep Learning'],
      github: "https://github.com/yourusername/lane-detection"
    },
    {
      title: "State Estimation and Localization",
      description: "EKF sensor fusion pipeline integrating IMU, GNSS, and LIDAR data for vehicle state estimation.",
      tags: ['Sensor Fusion', 'EKF', 'Python'],
      details: [
        "Formulated Extended Kalman Filter sensor fusion pipeline",
        "Integrated multi-sensor data with covariance tracking",
        "Built 3D visualization tools for trajectory analysis",
        "Implemented robust error state modeling"
      ],
      technologies: ['Python', 'NumPy', 'Matplotlib', 'Sensor Fusion'],
      github: "https://github.com/yourusername/state-estimation"
    }
  ];

  useEffect(() => {
    // Simulated loading effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

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
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:abhishek.nannuri@outlook.com?subject=${encodeURIComponent(contactForm.subject)}&body=${encodeURIComponent(contactForm.content)}`;
    setContactForm({ email: '', subject: '', content: '' });
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

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <AnimatedBackground />

      {/* Progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full bg-gray-900/80 backdrop-blur-lg z-40 transform transition-all duration-300 ${
        isNavVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Abhishek Nannuri
            </h1>
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'projects', 'timeline', 'contact'].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`text-lg capitalize transition-all duration-300 hover:text-blue-400 ${
                    activeSection === section ? 'text-blue-400' : 'text-gray-400'
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
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <img 
                src="/api/placeholder/300/300" 
                alt="Profile"
                className="relative w-48 h-48 rounded-full object-cover border-4 border-gray-800 group-hover:border-blue-500 transition duration-300"
              />
            </div>
            
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Robotic Software Engineer
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                Developing comprehensive autonomous systems with expertise in motion planning, localization,
                perception, and control. Passionate about creating intelligent systems that push the boundaries
                of what's possible in robotics.
              </p>
              
              <div className="flex justify-center items-center space-x-4 text-gray-400">
                <MapPinIcon className="w-5 h-5" />
                <span>Schmalkalden, DE</span>
              </div>

              <div className="flex justify-center space-x-6 pt-6">
                <a 
                  href="https://github.com" 
                  className="text-gray-400 hover:text-blue-400 transform hover:scale-110 transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon size={28} />
                </a>
                <a 
                  href="https://linkedin.com" 
                  className="text-gray-400 hover:text-blue-400 transform hover:scale-110 transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedinIcon size={28} />
                </a>
                <a 
                  href="mailto:abhishek.nannuri@outlook.com" 
                  className="text-gray-400 hover:text-blue-400 transform hover:scale-110 transition duration-300"
                >
                  <MailIcon size={28} />
                </a>
              </div>
            </div>

            <a 
              href="#projects" 
              className="absolute bottom-8 animate-bounce text-gray-400 hover:text-blue-400 transition duration-300"
            >
              <ChevronDownIcon size={32} />
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-blue-500/5" />
        <div className="max-w-6xl mx-auto px-4 relative">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
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
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
        <div className="max-w-3xl mx-auto px-4 relative">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Journey So Far
          </h2>
          <div className="space-y-8">
            <TimelineItem
              year="2022 - Present"
              title="Master of Engineering"
              subtitle="Hochschule Schmalkalden"
              description="Major in Mechatronics & Robotics with focus on Autonomous Systems"
              delay={100}
            />
            <TimelineItem
              year="2021 - 2022"
              title="DevOps Engineer"
              subtitle="Accenture"
              description="Worked on infrastructure modernization and CI/CD pipeline integration"
              delay={200}
            />
            <TimelineItem
              year="2017 - 2021"
              title="Bachelor of Technology"
              subtitle="Karunya University"
              description="Major in Mechanical Engineering"
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-blue-500/5" />
        <div className="max-w-3xl mx-auto px-4 relative">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-colors duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Your Email</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-gray-300"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-gray-300"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Message</label>
                <textarea
                  value={contactForm.content}
                  onChange={(e) => setContactForm({...contactForm, content: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-gray-300 h-32 resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg hover:opacity-90 transform hover:scale-[0.99] transition-all duration-300 flex items-center justify-center space-x-2 font-medium"
              >
                <SendIcon size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900/50 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Abhishek Nannuri. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;