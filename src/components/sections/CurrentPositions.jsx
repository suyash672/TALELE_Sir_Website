import React from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import Card from '../ui/Card';

const CurrentPositions = () => {
  const additionalPositions = [
    "Coordinator of Sardar Patel Institute of Technology Business Incubator",
    "Treasurer of IEEE Bombay Section",
    "In-Charge of IPR cell of Sardar Patel Institute of Technology",
    "Member of Governing body of Sardar Patel Institute of Technology",
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
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-teal-100 rounded-lg">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Associate Professor</h3>
                  <p className="text-muted-foreground text-base">Electronics Engineering Department</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-teal-100 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Dean</h3>
                  <p className="text-muted-foreground text-base">
                    Students, Alumni & External Relations in Sardar Patel Institute of Technology
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="pt-8">
            <h3 className="text-3xl font-bold text-foreground mb-6">Additional Positions</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {additionalPositions.map((position, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-white rounded-lg border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-foreground">{position}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentPositions;

