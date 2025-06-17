
import { useEffect, useState } from 'react';
import { Hero } from '@/components/Hero';
import { Navigation } from '@/components/Navigation';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { Blogs } from '@/components/Blogs';
import { Contact } from '@/components/Contact';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'blogs', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
      <Navigation activeSection={activeSection} />
      
      <section id="home">
        <Hero />
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
      
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default Index;
