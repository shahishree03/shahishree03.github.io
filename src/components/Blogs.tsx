
import { useEffect, useState } from 'react';
import { Clock, ArrowRight, Calendar } from 'lucide-react';

export const Blogs = () => {
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

    const element = document.getElementById('blogs');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const blogPosts = [
    {
      title: 'Building Resilient Microservices: Lessons from Production',
      excerpt: 'Discover the key patterns and practices for creating microservices that can handle real-world challenges, from circuit breakers to graceful degradation.',
      readTime: '8 min read',
      date: 'March 15, 2024',
      category: 'DevOps',
      image: '/api/placeholder/400/250',
      link: 'https://dev.to/sarahchen/building-resilient-microservices'
    },
    {
      title: 'Kubernetes Security Best Practices: A Comprehensive Guide',
      excerpt: 'A deep dive into securing your Kubernetes clusters, covering RBAC, network policies, pod security standards, and security scanning.',
      readTime: '12 min read',
      date: 'February 28, 2024',
      category: 'Security',
      image: '/api/placeholder/400/250',
      link: 'https://dev.to/sarahchen/kubernetes-security-guide'
    },
    {
      title: 'From Monolith to Microservices: A Strategic Migration Approach',
      excerpt: 'Step-by-step guidance on breaking down monolithic applications into scalable microservices without disrupting your business operations.',
      readTime: '10 min read',
      date: 'February 10, 2024',
      category: 'Architecture',
      image: '/api/placeholder/400/250',
      link: 'https://dev.to/sarahchen/monolith-to-microservices'
    },
    {
      title: 'Infrastructure as Code: Terraform Best Practices',
      excerpt: 'Learn how to write maintainable, scalable Terraform configurations with proper state management, modules, and CI/CD integration.',
      readTime: '6 min read',
      date: 'January 22, 2024',
      category: 'Infrastructure',
      image: '/api/placeholder/400/250',
      link: 'https://dev.to/sarahchen/terraform-best-practices'
    }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Latest <span className="text-purple-400">Blogs</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full" />
          <p className="text-gray-300 text-lg mt-6 max-w-2xl mx-auto">
            Sharing insights, experiences, and technical knowledge from the world of development and DevOps
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className={`group cursor-pointer transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-purple-500/40 transition-all duration-300 transform hover:scale-105 overflow-hidden h-full">
                {/* Blog Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-purple-600/80 backdrop-blur-sm text-white rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>

                  {/* Read More Arrow */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <a 
                      href={post.link}
                      className="text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors flex items-center group-hover:underline"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </a>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs text-gray-400">Published</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Blogs Button */}
        <div className={`text-center mt-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.8s' }}>
          <a 
            href="https://dev.to/sarahchen"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Blog Posts
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};
