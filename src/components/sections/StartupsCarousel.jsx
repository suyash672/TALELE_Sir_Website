import React from 'react';

const StartupsCarousel = () => {
  // Startup data - you can update these with actual startup information
  const startups = [
    {
      id: 1,
      name: 'Startup 1',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
      url: 'https://example.com/startup1'
    },
    {
      id: 2,
      name: 'Startup 2',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop',
      url: 'https://example.com/startup2'
    },
    {
      id: 3,
      name: 'Startup 3',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      url: 'https://example.com/startup3'
    },
    {
      id: 4,
      name: 'Startup 4',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
      url: 'https://example.com/startup4'
    }
  ];

  // Duplicate the array to create seamless infinite scroll
  const duplicatedStartups = [...startups, ...startups];

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Startups Mentored
          </h2>
          <p className="text-muted-foreground text-lg">
            Companies I've had the privilege to mentor and guide
          </p>
        </div>

        <div className="relative group">
          {/* Infinite scroll container */}
          <div className="overflow-hidden">
            <div className="flex animate-infinite-scroll">
              {duplicatedStartups.map((startup, index) => (
                <a
                  key={`${startup.id}-${index}`}
                  href={startup.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 mx-4 group cursor-pointer"
                >
                  <div className="w-80 h-64 bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border">
                    <div className="relative w-full h-48 overflow-hidden">
                      <img
                        src={startup.image}
                        alt={startup.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4 bg-card">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {startup.name}
                      </h3>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
};

export default StartupsCarousel;
