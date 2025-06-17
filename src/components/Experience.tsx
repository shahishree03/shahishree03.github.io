
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
      role: 'Senior DevOps Engineer',
      company: 'TechFlow Solutions',
      location: 'San Francisco, CA',
      period: '2022 - Present',
      achievements: [
        'Led migration of monolithic applications to microservices architecture, reducing deployment time by 75%',
        'Implemented comprehensive CI/CD pipelines using GitLab CI and Jenkins, serving 50+ development teams',
        'Designed and deployed multi-region AWS infrastructure with 99.9% uptime SLA',
        'Established monitoring and alerting systems using Prometheus and Grafana, reducing MTTR by 60%'
      ]
    },
    {
      role: 'Full-Stack Developer & DevOps Specialist',
      company: 'StartupVenture Inc.',
      location: 'Austin, TX',
      period: '2020 - 2022',
      achievements: [
        'Developed scalable React applications serving 100K+ monthly active users',
        'Built and maintained Node.js APIs handling 1M+ requests per day',
        'Containerized applications using Docker and orchestrated with Kubernetes',
        'Automated infrastructure provisioning using Terraform, reducing setup time by 80%'
      ]
    },
    {
      role: 'Frontend Developer',
      company: 'Digital Creative Agency',
      location: 'Seattle, WA',
      period: '2019 - 2020',
      achievements: [
        'Created responsive web applications using React, TypeScript, and modern CSS frameworks',
        'Collaborated with design teams to implement pixel-perfect UI/UX designs',
        'Optimized application performance, achieving 95+ Google Lighthouse scores',
        'Mentored junior developers and established coding standards and best practices'
      ]
    }
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
