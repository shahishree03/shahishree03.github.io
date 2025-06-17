
import { useEffect, useState } from 'react';

export const Skills = () => {
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

    const element = document.getElementById('skills');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      title: 'Languages',
      skills: [
        { name: 'JavaScript', level: 65},
        { name: 'HTML', level: 75 },
        { name: 'Python', level: 80 },
        { name: 'CPP', level: 85 },
        { name: 'CSS', level: 60 },
      ],
    },
    {
      title: 'Cloud & DevOps Tools',
      skills: [
        { name: 'Docker', level: 60 },
        { name: 'Kubernetes', level: 60 },
        { name: 'Jenkins', level: 60 },
        { name: 'GitLab CI/CD', level: 85 },
         { name: 'AWS', level: 75 },
      {name: 'Microservices' ,level :60}
      ],
    },
    {
      title: 'Bacend , Database & API ',
      skills: [
       { name: 'Node.js', level: 60 },
        { name: 'MongoDB', level: 60 },
        { name: 'RESTful APIs', level: 75 },
        {name: 'MVP', level:60}
      ],
    },
    {
      title: 'Artificial Intelligence & Machine Learning',
      skills: [
        
        { name: 'Machine Learning', level: 60 },
        { name: 'Deep Learning', level: 60 },
        { name: 'Natural Language Processing', level: 60 },
        { name: 'Computer Vision', level: 60 },
        { name: 'Reinforcement Learning', level: 60 },
        { name: 'Generative AI', level: 60 },
        { name: 'AI Tools', level: 60 },
        { name: 'RAG', level: 75 }

      ],
    },
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/20">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Technical <span className="text-purple-400">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full" />
          <p className="text-gray-300 text-lg mt-6 max-w-2xl mx-auto">
            A comprehensive toolkit spanning development, cloud infrastructure, and DevOps automation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${categoryIndex * 0.2}s` }}
            >
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm p-6 rounded-xl border border-slate-600/30 hover:border-purple-500/40 transition-all duration-300 h-full">
                <h3 className="text-xl font-semibold text-white mb-6 text-center">
                  {category.title}
                </h3>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-purple-400 text-sm font-semibold">{skill.level}%</span>
                      </div>
                      
                      <div className="w-full bg-slate-700/50 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-1000 ease-out ${
                            isVisible ? 'animate-pulse' : ''
                          }`}
                          style={{
                            width: isVisible ? `${skill.level}%` : '0%',
                            transitionDelay: `${(categoryIndex * 0.2) + (skillIndex * 0.1)}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Icons/Badges */}
        <div className={`mt-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.8s' }}>
          <h3 className="text-2xl font-semibold text-white text-center mb-8">
            Technologies I Work With
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'React', 'Node.js', 'Docker', 'Kubernetes', 'AWS', 'MongoDB', 
              'MVP', 'Apache', 'Linux', 'Git', 'VS Code', 'API', 'C++', 'Problem Solving', 'Data Structures', 'Algorithms', 'Machine Learning'
            ].map((tech, index) => (
              <span
                key={tech}
                className={`px-4 py-2 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-purple-300 rounded-full border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 transform hover:scale-105 ${
                  isVisible ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${1 + (index * 0.1)}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
