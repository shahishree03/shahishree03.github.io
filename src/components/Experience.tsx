
import { useEffect, useState } from 'react';
import { Calendar, MapPin, Award } from 'lucide-react';

export const Experience = () => {
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

    const element = document.getElementById('experience');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      role: 'Cloud and Cyber Security Trainee',
      company: 'TechFlow Solutions',
      location: 'Noida, INDIA',
      period: 'November 2024 - June 2025',
      achievements: [
        'Collected and reviewed 50+ academic and industry references related to MITRE TTP and CAPEC and performed 30+ SonarQube scans to extract CTI and CVSS data. Implemented a risk profiling model that increased detection rates to 85%',
        'Produced a threat report with CTI-driven insights, improving critical vulnerability identification by 20% and securing stakeholder approval for future planning (FY24)',
        'Launched an enterprise-wide AI vulnerability program (FY25) to enhance system security.',
        'Developed custom tools for risk classification and vendor analysis, automated profile updates, and boosted client productivity by 20%.'
      ]
    },
    
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Professional <span className="text-purple-400">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full" />
          <p className="text-gray-300 text-lg mt-6 max-w-2xl mx-auto">
            A journey of continuous growth, innovation, and impactful contributions to scalable technology solutions
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full hidden lg:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 0.3}s` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full border-4 border-slate-900 z-10 hidden lg:block" />

                <div className={`lg:flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Content Card */}
                  <div className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm p-8 rounded-xl border border-slate-600/30 hover:border-purple-500/40 transition-all duration-300 transform hover:scale-105">
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                        <div className="text-purple-400 text-xl font-semibold mb-4">{exp.company}</div>
                        
                        <div className="flex flex-wrap gap-4 text-gray-300 text-sm">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                            {exp.period}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-purple-400" />
                            {exp.location}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {exp.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="flex items-start">
                            <Award className="w-5 h-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                            <p className="text-gray-300 leading-relaxed">{achievement}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for timeline */}
                  <div className="hidden lg:block lg:w-2/12" />
                  
                  {/* Empty space for alternating layout */}
                  <div className="hidden lg:block lg:w-5/12" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
