
const About = () => {
  return (
    <section id="about" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-light tracking-wider mb-8">
              ABOUT
            </h2>
            <div className="w-24 h-px bg-foreground mb-8"></div>
            
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                Elena Noir is a contemporary fashion designer based in Milan, dedicated to creating 
                pieces that transcend seasonal trends and speak to the modern woman's desire for 
                both comfort and sophistication.
              </p>
              
              <p>
                With over a decade of experience in haute couture, Elena's work has been featured 
                in Vogue, Harper's Bazaar, and Elle. Her designs have graced international runways 
                from Paris to New York.
              </p>
              
              <p>
                Each collection reflects a philosophy of sustainable luxury, where quality 
                craftsmanship meets innovative design. Elena believes that true elegance lies 
                in the perfect balance between form and function.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm tracking-widest mb-2 text-foreground">EDUCATION</h3>
                <p className="text-muted-foreground">Parsons School of Design</p>
                <p className="text-muted-foreground">Central Saint Martins</p>
              </div>
              <div>
                <h3 className="text-sm tracking-widest mb-2 text-foreground">AWARDS</h3>
                <p className="text-muted-foreground">CFDA Fashion Award 2023</p>
                <p className="text-muted-foreground">Emerging Designer Prize 2021</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[3/4] bg-muted overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=800&fit=crop"
                alt="Elena Noir"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
