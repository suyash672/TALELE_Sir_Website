import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const VisitingFaculty = () => {
  const facultyPositions = [
    {
      institution: "Institute of technology for Women (SNDT University)",
      period: "2003-04",
      course: "Image Processing",
    },
    {
      institution: "S.P.Jain Institute of Management Studies and Research",
      period: "2005-07",
      course: "Computer Graphics",
    },
    {
      institution: "Veermata Jijabai Institute of Technology (V.J.T.I)",
      period: "2010-11",
      course: "Digital Signal Processing",
    },
    {
      institution: "Shah & Anchor College of Engineering",
      period: "--",
      course: "eCommerce & Entreprenurship",
    },
    {
      institution: "Vivekanand Education Society's Institute of Technology",
      period: "2004-05",
      course: "Analog & Digital Communication",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold text-foreground">Visiting Faculty</h2>
            <p className="text-xl text-muted-foreground">Guest lectures and teaching engagements</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {facultyPositions.map((faculty, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold text-foreground flex-1">{faculty.institution}</h3>
                    <Badge variant="outline">{faculty.period}</Badge>
                  </div>
                  <p className="text-base text-muted-foreground">Course: {faculty.course}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitingFaculty;

