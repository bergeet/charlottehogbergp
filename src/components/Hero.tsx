
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative px-4">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-light tracking-wider mb-6 text-foreground opacity-0 animate-fade-in">
         CHARLOTTE HÖGBERG
        </h1>
        <p className="text-xl md:text-2xl font-light tracking-widest text-muted-foreground mb-8 opacity-0 animate-fade-in [animation-delay:0.3s]">
          FASHION DESIGNER
        </p>
        <div className="w-24 h-px bg-foreground mx-auto mb-8 opacity-0 animate-fade-in [animation-delay:0.6s]"></div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in [animation-delay:0.9s]">
          Creating timeless pieces that blend contemporary aesthetics with classical elegance. 
          Each design tells a story of modern sophistication.
        </p>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in [animation-delay:1.2s]">
        <ArrowDown className="w-6 h-6 text-muted-foreground animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
