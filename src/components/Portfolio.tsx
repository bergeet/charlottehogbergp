
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Portfolio = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Sample portfolio images - these would be replaced with actual fashion photos
  const images = [
    {
      src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=1200&fit=crop",
      alt: "Fashion Design 1",
      title: "Ethereal Collection"
    },
    {
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=1200&fit=crop",
      alt: "Fashion Design 2",
      title: "Urban Minimalism"
    },
    {
      src: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=1200&fit=crop",
      alt: "Fashion Design 3",
      title: "Contemporary Edge"
    },
    {
      src: "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=800&h=1200&fit=crop",
      alt: "Fashion Design 4",
      title: "Structured Lines"
    },
    {
      src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=1200&fit=crop",
      alt: "Fashion Design 5",
      title: "Avant-garde Series"
    },
    {
      src: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=1200&fit=crop",
      alt: "Fashion Design 6",
      title: "Timeless Elegance"
    },
    {
      src: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&h=1200&fit=crop",
      alt: "Fashion Design 7",
      title: "Fluid Forms"
    },
    {
      src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=1200&fit=crop",
      alt: "Fashion Design 8",
      title: "Modern Classics"
    }
  ];

  const openLightbox = (imageIndex: number) => {
    setIndex(imageIndex);
    setOpen(true);
  };

  return (
    <section id="portfolio" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-light tracking-wider mb-4">
            PORTFOLIO
          </h2>
          <div className="w-24 h-px bg-foreground mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((image, imageIndex) => (
            <div
              key={imageIndex}
              className="group cursor-pointer relative overflow-hidden aspect-[3/4] bg-muted"
              onClick={() => openLightbox(imageIndex)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-light tracking-wider text-sm">
                  {image.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={images.map(img => ({ src: img.src, alt: img.alt }))}
          styles={{
            container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
          }}
        />
      </div>
    </section>
  );
};

export default Portfolio;
