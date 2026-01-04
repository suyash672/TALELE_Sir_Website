import React from 'react';
import { 
  SignalIcon, 
  EyeIcon, 
  FilmIcon 
} from '@heroicons/react/24/outline';
import Card from '../ui/Card';

const AreasOfInterest = () => {
  const areas = [
    {
      title: "Digital Signal and Image Processing",
      icon: SignalIcon,
      color: "teal"
    },
    {
      title: "Computer Vision and Machine Learning",
      icon: EyeIcon,
      color: "cyan"
    },
    {
      title: "Multimedia System Design",
      icon: FilmIcon,
      color: "emerald"
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold text-foreground">Areas of Interest</h2>
            <p className="text-xl text-muted-foreground">Research and expertise domains</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {areas.map((area, index) => {
              const IconComponent = area.icon;
              const colorClasses = {
                teal: { bg: 'bg-teal-100', text: 'text-teal-700' },
                cyan: { bg: 'bg-cyan-100', text: 'text-cyan-700' },
                emerald: { bg: 'bg-emerald-100', text: 'text-emerald-700' }
              };
              const colors = colorClasses[area.color];
              
              return (
                <Card
                  key={index}
                  className="p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-primary/20 cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center mx-auto`}>
                      <IconComponent className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <h3 className="font-semibold text-foreground">{area.title}</h3>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AreasOfInterest;

