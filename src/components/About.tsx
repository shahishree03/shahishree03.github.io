
import { useEffect, useState } from 'react';
import { Code, Server, Cloud } from 'lucide-react';

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('about');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            About <span className="text-purple-400">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio Section */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '0.2s' }}>
            <div className="prose prose-invert prose-lg max-w-none">
            
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                I’m a <span className="text-purple-400 font-semibold">Developer</span> and{' '}
                <span className="text-indigo-400 font-semibold">DevOps Engineer</span> who turns ambitious ideas into resilient, cloud-native applications. I architect microservices on AWS, automate end-to-end CI/CD pipelines with Jenkins and GitHub Actions, and containerize workloads using Docker & Kubernetes. With  Ansible, I codify infrastructure for repeatable, secure deployments—ensuring in highly regulated environments.On the development side, 
                I love refactoring monoliths into scalable services, optimizing code for performance, and integrating observability to get real-time insights.
                As a lifelong learner, I’m always exploring new IaC techniques, chaos-engineering experiments, and SRE best practices.

 Ready to collaborate on your next cloud-automation or high-availability challenge? Let’s build something reliable, secure, and future-proof together.
              </p>


               <p className="text-gray-300 text-lg leading-relaxed">
                Today, I specialize in bridging the gap between development and operations, 
                ensuring applications not only function beautifully but also scale efficiently and maintain 
                high availability in production environments.
              </p>
            </div>
          </div>

          {/* Skills Overview Cards */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '0.4s' }}>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-800/30 to-indigo-800/30 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-3">
                  <Code className="w-8 h-8 text-purple-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Problem Solving </h3>
                </div>
                <p className="text-gray-300">
                 critical thinking, creative solutions, system design, debugging, and performance optimization—ensuring fast, reliable, and client-aligned outcomes.
                </p>
              </div>

              <div className="bg-gradient-to-r from-indigo-800/30 to-blue-800/30 backdrop-blur-sm p-6 rounded-xl border border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-3">
                  <Server className="w-8 h-8 text-indigo-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Backend & APIs</h3>
                </div>
                <p className="text-gray-300">
                  Building robust APIs and microservices with Node.js, Python, REST, and SQL/NoSQL databases, optimized for performance and reliability.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-800/30 to-purple-800/30 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-3">
                  <Cloud className="w-8 h-8 text-blue-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">DevOps & Cloud</h3>
                </div>
                <p className="text-gray-300">
                  Container orchestration, CI/CD pipelines, and multi-cloud deployments 
                  for reliable, automated infrastructure management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
