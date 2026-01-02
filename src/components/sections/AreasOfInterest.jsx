import React from 'react';
import { FileText } from 'lucide-react';
import Card from '../ui/Card';

const AreasOfInterest = () => {
  const areas = [
    "Digital Signal and Image Processing",
    "Computer Vision and Machine Learning",
    "Multimedia System Design",
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
            {areas.map((area, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-primary/20"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{area}</h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AreasOfInterest;

