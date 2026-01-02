import React from 'react';

const PastPositions = () => {
  const positions = [
    "In-charge of Unaided Wing of Sardar Patel College of Engineering from 1997-05-31 to 2001-04-30",
    "In-charge Head of Electronics Engineering Department from 2001-05-31 to 2004-04-30",
    "In-charge Head of Electronics Engineering Department from 2008-04-30 to 2009-05-31",
    "In-charge Head of Electronics Engineering Department from 2011-03-31 to 2011-08-31",
    "In-charge Head of IT Department from 2004-06-30 to 2007-05-31",
    "Member of Local Managing Committee of Sardar Patel College of Engineering from 2005-01-01 to 2008-01-01",
    "In-charge Principal of Sardar Patel Institute of Technology from 2008-10-04 to",
    "Information Officer under RTI act of - from 2009-01-01 to 2011-01-01",
    "Exe-com Committee Member of IEEE Bombay Section from 2009-01-01 to 2009-01-01",
    "Exe-com Committee Member of IEEE Bombay Section from 2012-01-01 to 2012-01-01",
    "Exe-com Committee Member of IEEE Bombay Section from 2015-01-01 to 2024-01-01",
    "Students Activities Chair of IEEE Bombay Section from 2015-01-01 to 2020-01-01",
    "Treasurer of IEEE Bombay Section from 2020-01-01 to 2023-01-01",
    "In-charge Head of MCA from to",
    "Co-ordinator of DST funded Innovation & Entrepreneurship Development Center (IEDC) from 2009-03-31 to 2020-01-01",
    "Head Academic Relations and Chief Finance Officer of Sardar Patel Technology Business Incubator from 2015-01-01 to 2024-01-01",
    "Member of Governing Body of Sardar Patel Institute of Technology from 2023-01-01 to 2025-01-01",
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold text-foreground">Past Positions</h2>
            <p className="text-xl text-muted-foreground">Previous administrative and leadership roles</p>
          </div>

          <div className="space-y-3">
            {positions.map((position, index) => (
              <div
                key={index}
                className="p-4 bg-secondary/50 rounded-lg border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                  <p className="text-foreground text-base">{position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PastPositions;

