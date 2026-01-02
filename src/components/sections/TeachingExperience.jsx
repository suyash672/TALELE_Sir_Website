import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const TeachingExperience = () => {
  const experiences = [
    {
      role: "Lecturer",
      institution: "D.Y.Patil College of Engineering Kolhapur",
      period: "01-08-1989 to 31-01-1992",
    },
    {
      role: "Lecturer",
      institution: "V.E.S Institute of Technology, Chembur, Mumbai",
      period: "01-08-1991 to 31-07-1993",
    },
    {
      role: "Lecturer",
      institution: "Walchand College of Engineering Sangli",
      period: "August 1993 To 30-04-1995",
    },
    {
      role: "Lecturer",
      institution: "M.G.M. College of Engineering Kamothe, New-Mumbai",
      period: "04-07-1995 To 01-04-1996",
    },
    {
      role: "Assistant Professor",
      institution: "M.G.M. College of Engineering Kamothe, New-Mumbai",
      period: "02-04-1996 To 31-07-1997",
    },
    {
      role: "Assistant Professor",
      institution: "Bharatiya Vidya Bhavans' Sardar Patel College of Engineering Andheri, Mumbai",
      period: "01-08-2005 to 31-12-2005",
    },
    {
      role: "Associate Professor",
      institution: "Bharatiya Vidya Bhavans' Sardar Patel College of Engineering Andheri, Mumbai",
      period: "01-01-2006 to till today",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold text-foreground">Teaching Experience</h2>
            <p className="text-xl text-muted-foreground">33+ years of academic excellence</p>
          </div>

          <div className="space-y-4">
            {experiences.map((experience, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">{experience.role}</h3>
                    <p className="text-muted-foreground">{experience.institution}</p>
                  </div>
                  <Badge variant="secondary" className="self-start md:self-center">
                    {experience.period}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeachingExperience;

