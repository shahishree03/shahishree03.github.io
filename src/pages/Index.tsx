
import { useEffect, useState } from 'react';
import { Home } from '@/components/Home';
import { Navigation } from '@/components/Navigation';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { Blogs } from '@/components/Blogs';
import { Resume } from "@/components/Resume";
import { Contact } from '@/components/Contact';


const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'blogs', 'resume', 'contact'];
      const scrollPosition = window.scrollY;

      // If user is at the very top, always set to home
      if (scrollPosition <= 150) {
        setActiveSection('home');
        return;
      }

      // Find which section is currently most visible
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const element = document.getElementById(section);
        
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = window.scrollY + rect.top;
          const elementBottom = elementTop + rect.height;
          
          // Check if we're in this section (with some buffer)
          if (scrollPosition >= elementTop - 300 && scrollPosition < elementBottom - 100) {
            setActiveSection(section);
            return;
          }
        }
      }
    };

    // Force set to home initially
    setActiveSection('home');
    
    // Ensure page starts at the top
    window.scrollTo({ top: 0, behavior: 'auto' });

    window.addEventListener('scroll', handleScroll);
    
    // Also listen for load and resize events to handle edge cases
    window.addEventListener('load', () => setActiveSection('home'));
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', () => setActiveSection('home'));
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
      <Navigation activeSection={activeSection} />
      
      <section id="home">
        <Home />
      </section>
      
      <section id="about">
        <About />
      </section>
      
      <section id="skills">
        <Skills />
      </section>
      
      <section id="experience">
        <Experience />
      </section>
      
      <section id="projects">
        <Projects />
      </section>
      
      <section id="blogs">
        <Blogs />
      </section>

      <section id ="resume">
        <Resume />
      </section>
      
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default Index;
