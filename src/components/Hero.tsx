
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-slate-900/20" />
        
        {/* Floating Code Lines Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute text-purple-300/20 font-mono text-sm animate-pulse`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              {i % 4 === 0 && 'const deploy = () => pipeline.run()'}
              {i % 4 === 1 && 'kubectl apply -f deployment.yaml'}
              {i % 4 === 2 && 'docker build -t app:latest .'}
              {i % 4 === 3 && 'terraform apply --auto-approve'}
            </div>
          ))}
        </div>

        {/* Geometric Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-purple-400/30 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-indigo-400/30 rounded-lg rotate-45 animate-pulse" />
          <div className="absolute top-3/4 left-1/3 w-16 h-16 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            <span className="inline-block animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Hi, I'm <span> </span>{'  '}
            </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent inline-block animate-fade-in" style={{ animationDelay: '0.4s' }}>
               Shahi Shreshth
            </span>
          </h1>
          
          <div className={`text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.6s' }}>
            <span className="block">Building scalable systems &</span>
            <span className="block mt-2">seamless user experiences</span>
          </div>

          <div className={`text-lg text-gray-400 mb-12 max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.8s' }}>
           Developer & DevOps Engineer passionate about creating robust applications 
            and automating cloud infrastructure for optimal performance and reliability.
          </div>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '1s' }}>
            <button 
              onClick={scrollToAbout}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore My Work
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border-2 border-purple-400 text-purple-400 rounded-lg font-semibold hover:bg-purple-400 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1.2s' }}>
          <ChevronDown 
            className="w-8 h-8 text-purple-400 animate-bounce cursor-pointer hover:text-purple-300 transition-colors"
            onClick={scrollToAbout}
          />
        </div>
      </div>
    </div>
  );
};
