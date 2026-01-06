import React from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import Card from '../ui/Card';

const CurrentPositions = () => {
  const positions = [
    {
      title: "Dean",
      description: "Students, Alumni & External Relations in Sardar Patel Institute of Technology",
      icon: GraduationCap,
    },
    {
      title: "Director",
      description: "Sardar Patel Technology Business Incubator",
      icon: Briefcase,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold text-foreground">Current Positions</h2>
            <p className="text-xl text-muted-foreground">Leadership roles and responsibilities</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {positions.map((position, index) => {
              const Icon = position.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-teal-100 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground">{position.title}</h3>
                      <p className="text-muted-foreground text-base">{position.description}</p>
                    </div>
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

export default CurrentPositions;

