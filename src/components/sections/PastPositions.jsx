import React from 'react';
import Card from '../ui/Card';

const PastPositions = () => {
  // Group positions by role and institution
  const groupedPositions = [
    {
      role: "Incharge of Unaided Wing of Sardar Patel College of Engineering",
      periods: ["From June 1997 to May 2001"],
    },
    {
      role: "Head of Electronics Engineering Department",
      periods: [
        "From June 2001 to May 2004",
        "From May 2008 to June 2009",
        "From April 2011 to September 2011",
      ],
    },
    {
      role: "Head of Information Technology Department",
      periods: ["From July 2004 to June 2007"],
    },
    {
      role: "Head of MCA",
      periods: ["With effect from July 2009 to August 2016"],
    },
    {
      role: "Elected Member of Local Managing Committee in Sardar Patel College of Engineering",
      periods: ["During 2005-2008"],
    },
    {
      role: "Information Officer under RTI act",
      periods: ["During 2009-2011"],
    },
    {
      role: "Coordinator of Innovation & Entrepreneurship Development Centre funded by DST Govt. of India",
      periods: ["From April 2009 to June 2021"],
    },
    {
      role: "Coordinator of Sardar Patel Technology Business Incubator (SP-TBI)",
      periods: ["From July 2015 to August 2022"],
    },
    {
      role: "Exe-com Committee Member",
      institution: "IEEE Bombay Section",
      periods: ["2009", "2012", "2015-2025"],
    },
    {
      role: "Student Activities Chair",
      institution: "IEEE Bombay Section",
      periods: ["2015 - 2019"],
    },
    {
      role: "Treasurer",
      institution: "IEEE Bombay Section",
      periods: ["August 2020 to November 2025"],
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold text-foreground">Past Positions</h2>
          </div>

          <div className="space-y-4">
            {groupedPositions.map((position, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/30 border-l-4 border-l-primary bg-gradient-to-r from-white to-secondary/20"
              >
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground text-lg leading-relaxed">
                    {position.role}
                    {position.institution && (
                      <span className="text-muted-foreground font-normal">, {position.institution}</span>
                    )}
                  </h3>
                  {position.periods.length > 0 && (
                    <ul className="space-y-2 ml-4 list-none">
                      {position.periods.map((period, periodIndex) => (
                        <li key={periodIndex} className="flex items-start gap-3">
                          <span className="text-primary text-lg mt-0.5">•</span>
                          <span className="text-muted-foreground text-base leading-relaxed">{period}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PastPositions;

