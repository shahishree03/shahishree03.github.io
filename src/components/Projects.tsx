
import { useEffect, useState } from 'react';
import { ExternalLink, Github, Eye } from 'lucide-react';

export const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('projects');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: 'Vehicle Detection System',
      description: 'This project implements a real-time Vehicle Detection System using Python, OpenCV, and YOLOv3. The system is designed to monitor traffic flow, detect vehicles, and manage parking zones efficiently. It provides a solution for urban traffic congestion and parking challenges through accurate vehicle detection and data processing.',
      image: '/projects/image.png',
      tech: ['React', 'Node.js', 'Docker', 'Kubernetes', 'MongoDB', 'Redis'],
      features: [
        'Real-Time Vehicle Detection: Detects vehicles in traffic and parking zones with 95.4% accuracy.',
        'Traffic Monitoring: Tracks vehicle flow and congestion in real-time',
         'Parking Management: Provides updates on available parking spaces and maintains historical parking data.',
        'Data Storage: Stores vehicle count and parking data in a SQL database for analysis and reporting.'
      ],
      github: 'https://github.com/shahishree03/vehicle_detection'
      //demo: 'https://ecommerce-demo.shahishreshth.dev'
    },
    {
      title: 'OTT PLATFORM',
      description: 'Yoi Keiken is a demo Over-The-Top (OTT) platform designed to deliver a seamless streaming experience similar to popular platforms like Netflix. The app leverages the TMDb API to provide users with an up-to-date and diverse library of movies and TV shows, categorized by genres and trends. Firebase is used for user authentication and storing personalized data such as favorites. The front-end is built using React and Redux for state management, with additional libraries for routing, forms, animations, and UI components, ensuring a modern, fast, and responsive interface. Users can securely log in, browse content, search for titles, and curate their own list of favorite movies and series, all within an engaging and interactive UI.',
      image: '/projects/ott.png',
      tech: ['React', 'Redux', 'SCSS', 'Framer Motion', 'API', 'Netlify','Deploy'],
      features: [
        'Comprehensive Movie & Series Catalog: Integrates with The Movie Database (TMDb) API to fetch and display a wide range of movies and TV series, including trending, top-rated, and various genres (Action, Comedy, Animation, etc.)',
        'User Authentication & Personalization: Utilizes Firebase Authentication for secure sign-in/sign-up and stores user-specific preferences, enabling each user to have a personalized watchlist and favorites.',
        'Favorites & Watchlist Management: Allows users to add movies and series to their favorites for quick and easy access, supporting a custom, user-specific viewing experience.',
        'Modern UI/UX & Responsive Design: Built with React, Redux, SCSS, and enhanced with libraries like SwiperJS and Framer Motion for smooth transitions and a visually appealing, device-friendly interface.'
      ],
      github: 'https://github.com/shahishree03/OTT_',
      demo: 'https://youtu.be/syvMPwN3zjY?si=OogeWh0X3kmjG4Wm'
      
    },
    {
      title: 'Cloud Attendance System',
      description: 'The **Attendance System** is an application designed for efficient management and tracking of attendance in organizations, schools, or other groups.',
      image: '/projects/image1.png',
      tech: ['AWS EC2', 'HTML','SCSS','CSS','PHP' ,'S3','MYSQL'],
      features: [
      'User Authentication: Secure login system to ensure only authorized users can access and manage attendance data.',
      'Attendance Recording: Simple and efficient interface for marking daily attendance.',
      'Report Generation: Automated creation of attendance summaries and detailed reports for analysis',
      'Role Management: Supports multiple user roles (Admin, Employee) with tailored permissions.'
      ],
      github: 'https://github.com/HarshitShukla01/attendance_system',
      demo: 'https://attendancesystem.infinityfreeapp.com/'
    }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/20">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Featured <span className="text-purple-400">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full" />
          <p className="text-gray-300 text-lg mt-6 max-w-2xl mx-auto">
            Showcasing innovative solutions that combine cutting-edge development with robust DevOps practices
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group cursor-pointer transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 0.2}s` }}
              onClick={() => setSelectedProject(index)}
            >
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-purple-500/40 transition-all duration-300 transform hover:scale-105 overflow-hidden h-full">
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <a 
                      href={project.github}
                      className="p-2 bg-slate-800/80 rounded-full text-white hover:bg-purple-600 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a 
                      href={project.demo}
                      className="p-2 bg-slate-800/80 rounded-full text-white hover:bg-indigo-600 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded text-xs border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-1 bg-slate-600/20 text-gray-400 rounded text-xs">
                        +{project.tech.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-purple-400 text-sm font-medium flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </span>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs text-gray-400">Live</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Details Modal-like Section */}
     {/*   {selectedProject !== null && (
          <div className={`mt-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.6s' }}>
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/60 backdrop-blur-sm p-8 rounded-xl border border-purple-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">
                {projects[selectedProject].title} - Key Features
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">Technical Highlights</h4>
                  <ul className="space-y-2">
                    {projects[selectedProject].features.map((feature, index) => (
                      <li key={index} className="text-gray-300 flex items-start">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-indigo-400 mb-3">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {projects[selectedProject].tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-indigo-600/20 text-indigo-300 rounded-full text-sm border border-indigo-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}*/}
      </div>
    </div>
  );
};
