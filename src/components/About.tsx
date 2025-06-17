
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
                I'm a passionate <span className="text-purple-400 font-semibold">Full-Stack Developer</span> and{' '}
                <span className="text-indigo-400 font-semibold">DevOps Engineer</span> with over 5 years of experience 
                building scalable web applications and robust cloud infrastructure.
              </p>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                My journey began with frontend development, where I discovered my love for creating intuitive user experiences. 
                As I delved deeper into the full development lifecycle, I became fascinated with backend systems, 
                cloud architecture, and the art of seamless deployment pipelines.
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
                  <h3 className="text-xl font-semibold text-white">Frontend Development</h3>
                </div>
                <p className="text-gray-300">
                  React, TypeScript, Next.js, and modern CSS frameworks to create responsive, 
                  interactive user interfaces that delight users.
                </p>
              </div>

              <div className="bg-gradient-to-r from-indigo-800/30 to-blue-800/30 backdrop-blur-sm p-6 rounded-xl border border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-3">
                  <Server className="w-8 h-8 text-indigo-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Backend & APIs</h3>
                </div>
                <p className="text-gray-300">
                  Node.js, Python, and database design to build robust, scalable server-side 
                  applications and RESTful APIs.
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
