
import { useState, useEffect } from "react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="text-xl font-light tracking-widest cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            EN
          </div>
          
          <div className="flex space-x-8">
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="text-sm tracking-wider hover:text-primary transition-colors"
            >
              PORTFOLIO
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-sm tracking-wider hover:text-primary transition-colors"
            >
              ABOUT
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-sm tracking-wider hover:text-primary transition-colors"
            >
              CONTACT
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
