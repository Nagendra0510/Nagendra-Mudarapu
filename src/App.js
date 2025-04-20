import React, { useState, useEffect } from 'react';
import { GithubIcon, LinkedinIcon, MailIcon, MapPinIcon, SendIcon, ChevronDownIcon } from 'lucide-react';
import ProjectCard from './components/ProjectCard';
import ExpandedProjectCard from './components/ExpandedProjectCard';
import TimelineItem from './components/TimelineItem';
import AnimatedBackground from './components/AnimatedBackground';
import MobileNav from './components/MobileNav';
import { ThemeProvider } from './components/ThemeProvider';
import ProfilePic from './profile-pic.jpg'

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
      title: "AMR Logistic System",
      description: "Intracity Delivery Autonomous Mobile Robot for Urban Navigation System featuring fault-tolerant operation and seamless ROS2 integration.",
      tags: ['C++', 'ROS2', 'Navigation', 'Path Planning'],
      details: [
        "Engineered a production-grade Global Path Planner using Lanelet2 and GPS-based navigation",
        "Architected comprehensive modular ROS2-based system architecture",
        "Implemented Local Trajectory Planner using Quintic Bézier splines",
        "Integrated state-of-the-art velocity profiling system using Dynamic Window Approach",
        "Designed and implemented a custom RPROP optimization framework with gradient-based mapping"
      ],
      technologies: ['C++', 'ROS2', 'Lanelet2', 'Python', 'RPROP', 'OSM', 'Docker'],
      github: "https://github.com/Abhi-0212000/AMR-Logistic-System"
    },
    {
      title: "Production-Grade Robotics Software Development Challenge",
      description: "Developed a robust ROS2-based framework integrating modern DevOps practices, automated testing, and continuous deployment. Features containerized deployment and comprehensive quality assurance pipelines.",
      tags: ["DevOps", "ROS2", "CI", "Docker", "Software Architecture", "Production Systems"],
      details: [
        "Implemented ROS2 nodes with parameterized configuration management and real-time data visualization",
        "Built continuous integration pipeline using GitHub Actions for automated testing, linting, and Docker builds",
        "Established code quality gates with branch protection rules and automated PR validation workflows",
        "Developed thread-safe data handling with fault-tolerant error management",
        "Created automated test suite with pytest integration and launch testing"
      ],
      technologies: ["DevOps", "ROS2", "CI", "Docker", "Software Architecture", "Production Systems", 
        "GitHub Actions", "pytest", "Python", "Git"],
      github: "https://github.com/Abhi-0212000/ros2-dev-challenge"
    },
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
    },
    {
      title: "Road Lane Detection System",
      description: "Multi-approach Computer Vision Based Advanced Driver Assistance system implementing Classical CV, Sliding Window, and Deep Learning techniques, achieving up to 98% accuracy across different approaches.",
      tags: ['Computer Vision', 'Deep Learning', 'Python', 'OpenCV', 'TensorFlow'],
      approaches: [
        {
          name: "Classical Computer Vision Pipeline",
          details: [
            "Constructed a computer vision system using OpenCV and NumPy achieving 95% lane detection accuracy through Hough Transform algorithms and adaptive thresholding",
            "Developed real-time image processing pipeline integrating Gaussian blur and Canny edge detection, reducing false positives by 40%",
            "Established HSV color space transformation and dynamic ROI masking enabling 98% detection rate in varying lighting conditions",
            "Designed slope-intercept tracking algorithms in Python improving continuous detection during lane gaps by 65%"
          ],
          technologies: ['Python', 'OpenCV', 'NumPy', 'Hough Transform'],
          github: "https://github.com/Abhi-0212000/Road-Lane-Detection"
        },
        {
          name: "Sliding Window Algorithm",
          details: [
            "Architected an advanced detection system using sliding window technique and image moment calculations achieving 98% accuracy",
            "Incorporated Birds-Eye-View transformation using perspective matrices, improving curved road detection by 55%",
            "Engineered centroid tracking system with contour detection reducing false detections by 60% using statistical filtering",
            "Refined lane visualization using polynomial fitting and HLS color space, improving detection accuracy by 88%",
            "Devised a fail-safe mechanism reducing lane detection failures by 95% during challenging conditions"
          ],
          technologies: ['Python', 'OpenCV', 'NumPy', 'Polynomial Fitting'],
          github: "https://github.com/Abhi-0212000/Road-Lane-Detection-Using-Sliding-Window"
        },
        {
          name: "Deep Learning with FCN8",
          details: [
            "Architected FCN8 semantic segmentation network with VGG16 backbone using TensorFlow/Keras for road detection",
            "Trained the model on KITTI road dataset achieving 93% accuracy in road segmentation",
            "Streamlined data pipeline with tf.data API utilizing batch prefetching for efficient training",
            "Incorporated real-time video processing achieving 60 FPS with mask overlay visualization"
          ],
          technologies: ['Python', 'TensorFlow', 'Keras', 'FCN8', 'VGG16'],
          github: "https://github.com/Abhi-0212000/Road-Segmentation-Using-Deep-Learning"
        }
      ]
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
      github: "https://github.com/Abhi-0212000/State-Estimation-and-Localization-for-Self-Driving-Car"
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
              Abhishek Nannuri
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
                  Robotics Software Engineer
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  Developing comprehensive autonomous systems with expertise in motion planning, localization,
                  perception. Passionate about creating intelligent systems that push the boundaries
                  of what's possible in robotics.
                </p>
                
                <div className="flex justify-center items-center space-x-4 text-gray-600 dark:text-gray-400">
                  <MapPinIcon className="w-5 h-5" />
                  <span>Schmalkalden, DE</span>
                </div>

                <div className="flex justify-center space-x-6 pt-6">
                  <a 
                    href="https://github.com/Abhi-0212000/" 
                    className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transform hover:scale-110 transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon size={28} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/abhi-nannuri-02122000/" 
                    className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transform hover:scale-110 transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedinIcon size={28} />
                  </a>
                  <a 
                    href="mailto:abhishek.nannuri@outlook.com" 
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
          <TimelineItem
              year="03.2025 - Present"
              title="Intern Next Generation Robotics"
              subtitle="BMW"
              points={[
                "Development and implementaion of algorithms for robotic applications",
                "Conduct real-world testing and validation of algorithms on physical robotic manipulators in lab environment",
                "Engineer and optimize robotic manipulation solutions using MoveIt Pro and Behavior Trees for Universal Robot and Kuka platforms",
                "Contribute to DevOps workflows by developing CI pipelines and Docker configurations to streamline development processes",
                "Technology stack: C++, Python, ROS2, Docker, MoveIt Pro, Behavior Trees"
              ]}
              delay={100}
            />
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
              points={[
                "Built CI/CD pipelines across Azure & AWS, improving deployment efficiency by 40%",
                "Implemented security protocols and managed credentials via Azure Key Vault",
                "Developed enterprise applications using C# and PostgreSQL",
                "Assisted in AWS infrastructure modernization and optimization"
              ]}
              delay={200}
            />
            <TimelineItem
              year="2021"
              title="Bachelor of Technology"
              subtitle="Karunya University"
              description="Major in Mechanical Engineering"
              delay={300}
            />
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
            <p>&copy; {new Date().getFullYear()} Abhishek Nannuri. All rights reserved.</p>
          </div>
        </div>
      </footer>
    {/* </div> */}
    </ThemeProvider>
  );
};

export default Portfolio;