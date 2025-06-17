
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
      title: 'E-Commerce Microservices Platform',
      description: 'A scalable e-commerce platform built with microservices architecture, featuring user authentication, product catalog, order management, and payment processing.',
      image: '/api/placeholder/600/400',
      tech: ['React', 'Node.js', 'Docker', 'Kubernetes', 'MongoDB', 'Redis'],
      features: [
        'Microservices architecture with Docker containers',
        'Kubernetes orchestration for high availability',
        'CI/CD pipeline with automated testing and deployment',
        'Real-time notifications using WebSocket connections'
      ],
      github: 'https://github.com/sarahchen/ecommerce-platform',
      demo: 'https://ecommerce-demo.sarahchen.dev'
    },
    {
      title: 'DevOps Dashboard & Monitoring',
      description: 'A comprehensive monitoring dashboard for DevOps teams to track application performance, infrastructure metrics, and deployment status across multiple environments.',
      image: '/api/placeholder/600/400',
      tech: ['Vue.js', 'Python', 'Prometheus', 'Grafana', 'AWS', 'Terraform'],
      features: [
        'Real-time metrics visualization with custom dashboards',
        'Automated alerting system for critical incidents',
        'Multi-cloud infrastructure monitoring',
        'Deployment pipeline status tracking'
      ],
      github: 'https://github.com/sarahchen/devops-dashboard',
      demo: 'https://monitoring.sarahchen.dev'
    },
    {
      title: 'Serverless Data Processing Pipeline',
      description: 'An automated data processing pipeline using serverless technologies to handle large-scale data ingestion, transformation, and analytics.',
      image: '/api/placeholder/600/400',
      tech: ['AWS Lambda', 'Python', 'Apache Kafka', 'Elasticsearch', 'S3', 'CloudFormation'],
      features: [
        'Event-driven architecture with AWS Lambda',
        'Real-time data streaming with Apache Kafka',
        'Automated data transformation and validation',
        'Scalable storage and search with Elasticsearch'
      ],
      github: 'https://github.com/sarahchen/serverless-pipeline',
      demo: 'https://pipeline.sarahchen.dev'
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
        {selectedProject !== null && (
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
        )}
      </div>
    </div>
  );
};
