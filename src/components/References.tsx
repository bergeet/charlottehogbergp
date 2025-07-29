import { useEffect, useRef } from "react";

interface Company {
  name: string;
  logo?: string;
}

const companies: Company[] = [
  { name: "CHANEL" },
  { name: "DIOR" },
  { name: "GUCCI" },
  { name: "PRADA" },
  { name: "VERSACE" },
  { name: "SAINT LAURENT" },
  { name: "BALENCIAGA" },
  { name: "BOTTEGA VENETA" },
  { name: "GIVENCHY" },
  { name: "VALENTINO" },
  { name: "HERMÈS" },
  { name: "LOUIS VUITTON" },
];

export const References = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollStep = 1;
    const scrollSpeed = 30;

    const scroll = () => {
      if (scrollContainer) {
        scrollAmount += scrollStep;
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
        scrollContainer.scrollLeft = scrollAmount;
      }
    };

    const intervalId = setInterval(scroll, scrollSpeed);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="py-16 bg-background border-t border-fashion-divider">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-sm font-light tracking-[0.2em] text-fashion-light uppercase mb-4">
            Collaborations
          </h2>
          <div className="w-12 h-px bg-fashion-divider mx-auto"></div>
        </div>

        <div className="overflow-hidden">
          <div
            ref={scrollRef}
            className="flex space-x-16 animate-scroll"
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {/* First set of companies */}
            {companies.map((company, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 flex items-center justify-center min-w-[200px]"
              >
                <span className="text-lg font-light tracking-[0.1em] text-fashion-text opacity-60 hover:opacity-100 transition-opacity duration-300">
                  {company.name}
                </span>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {companies.map((company, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 flex items-center justify-center min-w-[200px]"
              >
                <span className="text-lg font-light tracking-[0.1em] text-fashion-text opacity-60 hover:opacity-100 transition-opacity duration-300">
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
