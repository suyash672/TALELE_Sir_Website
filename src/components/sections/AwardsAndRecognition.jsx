import React from 'react';
import { Award } from 'lucide-react';
import Card from '../ui/Card';

const AwardsAndRecognition = () => {
  const recognitions = [
    "PG Teacher of Mumbai University in Electronics Engineering",
    "PG teacher of Mumbai University in Computer Engineering",
    "PG Teacher of Mumbai University in Electronics & Telecommunication Engineering",
  ];

  return (
    <section className="py-16 lg:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Awards */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-200 rounded-lg">
                  <Award className="w-6 h-6 text-teal-700" />
                </div>
                <h2 className="text-4xl font-bold text-foreground">Awards</h2>
              </div>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <p className="text-foreground leading-relaxed text-base">
                  Received incentives in year 2008-09 for excellent performance in academics and research from
                  Management of Bharatiya Vidya Bhavans' Sardar Patel Institute of Technology Mumbai.
                </p>
              </Card>
            </div>

            {/* Recognitions */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Award className="w-6 h-6 text-emerald-700" />
                </div>
                <h2 className="text-4xl font-bold text-foreground">Recognitions</h2>
              </div>
              <div className="space-y-4">
                {recognitions.map((recognition, index) => (
                  <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-foreground">{recognition}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsAndRecognition;

