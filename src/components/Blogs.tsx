
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
      title: 'CI/CD: The Secret Weapon in Your Software Development Arsenal',
      excerpt: 'Discover the CI/CD can be visualized as a pipeline with distinct stages:Benefits of CI/CD:Getting Started with CI/CD using Docker: A Step-by-Step GuideTechLearn India: Your Gateway to CI/CD Mastery.',
      readTime: '4 min read',
      category: 'DevOps',
      image: '/BLOGS/cicd.png',
      link: 'https://blog.techlearnindia.com/cicd-the-secret-weapon-in-your-software-development-arsenal'
    },
    {
      title: 'Mathematics: Your Secret Weapon in Computer Science',
      excerpt: 'Mathematics is the hidden force behind efficient coding, smart algorithms, and resilient system design. This blog reveals how math empowers developers to solve complex problems and innovate in computer science.',
      readTime: '5 min read',
      category: 'Mathematics',
      image: '/BLOGS/a.gif',
      link: 'https://medium.com/@shahishresth/mathematics-your-secret-weapon-in-computer-science-82b707117f66'
    },
    {
      title: 'Demystifying Cloud Security: A Journey from Vulnerability to Resilience',
      excerpt: 'Cloud security is more than protection — it’s a layered strategy to defend against threats and ensure resilience. This blog guides readers through key vulnerabilities, best practices, and a comprehensive security framework for robust cloud defense.',
      readTime: '2 min read',
      category: 'Cloud',
      image: '/BLOGS/cloud_Security.png',
      link: 'https://blog.techlearnindia.com/demystifying-cloud-security-a-journey-from-vulnerability-to-resilience'
    },
    {
      title: 'Flow vs. Ethereum',
      excerpt: 'This blog compares Flow and Ethereum across architecture, smart contracts, fees, and use cases — helping developers choose the right blockchain for their project goals and learn in-demand Ethereum skills for the Web3 future.',
      readTime: '2 min read',
      category: 'Cryptography',
      image: '/BLOGS/crypto.png',
      link: 'https://blog.techlearnindia.com/flow-vs-ethereum'
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
            <a
              key={index}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group cursor-pointer transition-all duration-1000 block ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <article className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm rounded-xl border border-slate-600/30 hover:border-purple-500/40 transition-all duration-300 transform hover:scale-105 overflow-hidden h-full">
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
              </article>
            </a>
          ))}
        </div>

        {/* View All Blogs Button */}
        <div className={`text-center mt-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.8s' }}>
          <a 
            href="https://blog.techlearnindia.com/"
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
