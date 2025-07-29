import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface PortfolioImage {
  id: string;
  title: string;
  description: string;
  image_url: string;
  alt_text: string;
  collection: string;
  display_order: number;
}

const Portfolio = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);

  // const fetchImages = async () => {
  //   try {

  // };

  // useEffect(() => {
  //   fetchImages();
  // }, []);

  const openLightbox = (imageIndex: number) => {
    setIndex(imageIndex);
    setOpen(true);
  };

  // Fallback images if no images are uploaded yet
  const fallbackImages = [
    {
      id: "fallback-1",
      title: "Ethereal Collection",
      description: "Sample design",
      image_url:
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=1200&fit=crop",
      alt_text: "Fashion Design 1",
      collection: "Sample",
      display_order: 1,
    },
    {
      id: "fallback-2",
      title: "Urban Minimalism",
      description: "Sample design",
      image_url:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=1200&fit=crop",
      alt_text: "Fashion Design 2",
      collection: "Sample",
      display_order: 2,
    },
    {
      id: "fallback-3",
      title: "Contemporary Edge",
      description: "Sample design",
      image_url:
        "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=1200&fit=crop",
      alt_text: "Fashion Design 3",
      collection: "Sample",
      display_order: 3,
    },
    {
      id: "fallback-4",
      title: "Structured Lines",
      description: "Sample design",
      image_url:
        "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=800&h=1200&fit=crop",
      alt_text: "Fashion Design 4",
      collection: "Sample",
      display_order: 4,
    },
    {
      id: "fallback-5",
      title: "Avant-garde Series",
      description: "Sample design",
      image_url:
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=1200&fit=crop",
      alt_text: "Fashion Design 5",
      collection: "Sample",
      display_order: 5,
    },
    {
      id: "fallback-6",
      title: "Timeless Elegance",
      description: "Sample design",
      image_url:
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=1200&fit=crop",
      alt_text: "Fashion Design 6",
      collection: "Sample",
      display_order: 6,
    },
    {
      id: "fallback-7",
      title: "Fluid Forms",
      description: "Sample design",
      image_url:
        "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&h=1200&fit=crop",
      alt_text: "Fashion Design 7",
      collection: "Sample",
      display_order: 7,
    },
    {
      id: "fallback-8",
      title: "Modern Classics",
      description: "Sample design",
      image_url:
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=1200&fit=crop",
      alt_text: "Fashion Design 8",
      collection: "Sample",
      display_order: 8,
    },
  ];

  const displayImages = fallbackImages;

  if (!loading) {
    return (
      <section id="portfolio" className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg tracking-wider">Loading portfolio...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-light tracking-wider mb-4">
            PORTFOLIO
          </h2>
          <div className="w-24 h-px bg-foreground mx-auto"></div>
        </div>

        {images.length === 0 && (
          <div className="text-center mb-8">
            <p className="text-muted-foreground">
              Sample images shown below. Upload your own images to replace them.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayImages.map((image, imageIndex) => (
            <div
              key={image.id}
              className="group cursor-pointer relative overflow-hidden aspect-[3/4] bg-muted"
              onClick={() => openLightbox(imageIndex)}
            >
              <img
                src={image.image_url}
                alt={image.alt_text}
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
          slides={displayImages.map((img) => ({
            src: img.image_url,
            alt: img.alt_text,
          }))}
          styles={{
            container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
          }}
        />
      </div>
    </section>
  );
};

export default Portfolio;
