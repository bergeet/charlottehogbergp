import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";
import ImageUpload from "@/components/ImageUpload";
import { References } from "@/components/References";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        <div id="hero">
          <Hero />
        </div>
        <Portfolio />
        <References />
        <About />
        <Contact />
      </main>

      <footer className="py-12 px-4 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm tracking-wider text-muted-foreground">
            © 2024 ELENA NOIR. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
