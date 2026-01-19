import React from 'react';

const StartupsCarousel = () => {
  const startups = [
    {
      id: 1,
      name: 'Anudaan Jagruti',
      image: '/aj_logo.png',
      url: 'https://www.anudaanjagruti.com'
    },
    {
      id: 2,
      name: 'VehiScrap',
      image: '/vehiscrap_logo.png',
      url: 'https://www.vehiscrap.com/#/pages/home'
    },
    {
      id: 3,
      name: 'Seam Online',
      image: '/seam.png',
      url: 'https://play.google.com/store/apps/details?id=com.softifybd.seamonline&hl=en'
    },
    {
      id: 4,
      name: 'Serenity Sphere',
      image: '/serenity.png',
      url: 'https://qalb-e-rooh-rpa2zx2.gamma.site/'
    }
  ];

  // Duplicate the array to create seamless infinite scroll
  const duplicatedStartups = [...startups, ...startups];

  return (
    <section className="relative mt-6 lg:mt-10 pt-16 pb-20 lg:pt-24 lg:pb-28 bg-white overflow-hidden border-t border-border/70 bg-linear-to-b from-muted/20 to-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Startups Mentored
          </h2>
          <p className="text-muted-foreground text-lg">
            Companies I've had the privilege to mentor and guide
          </p>
        </div>

        <div className="relative startups-carousel">
          {/* Infinite scroll container */}
          <div className="overflow-hidden">
            <div className="flex animate-infinite-scroll">
              {duplicatedStartups.map((startup, index) => (
                <div key={`${startup.id}-${index}`} className="shrink-0 mx-4">
                  <a
                    href={startup.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={startup.name}
                    className="group block w-80 h-64 bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-border"
                  >
                    <div className="relative w-full h-48 overflow-hidden bg-white">
                      <img
                        src={startup.image}
                        alt={startup.name}
                        loading="lazy"
                        className="w-full h-full object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4 bg-card">
                      <h3 className="text-xl font-semibold text-center text-foreground transition-colors duration-300 group-hover:text-primary">
                        {startup.name}
                      </h3>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-white to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
};

export default StartupsCarousel;
