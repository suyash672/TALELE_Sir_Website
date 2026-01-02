import React from 'react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-50/50 via-white to-cyan-50/30">
      <div className="container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div className="space-y-8 lg:pr-8">
              <div className="space-y-4">
                <Badge variant="outline" className="text-base font-medium px-4 py-1.5 border-teal-200 bg-teal-50/50">
                  Associate Professor & Dean
                </Badge>
                <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-balance">
                  Prof. Kiran <br />
                  <span className="text-primary">TALELE</span>
                </h1>
              </div>

              <div className="space-y-4">
                <p className="text-2xl lg:text-3xl text-muted-foreground font-light text-pretty">
                  Teacher · Instructor · Guide · Mentor · Coach
                </p>
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                  Bharatiya Vidya Bhavan's Sardar Patel Institute of Technology, Mumbai
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="px-8">
                  View Resume
                </Button>
                <Button size="lg" variant="outline" className="px-8 bg-transparent">
                  Contact
                </Button>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                <div className="space-y-1">
                  <div className="text-4xl font-bold text-primary">33+</div>
                  <div className="text-base text-muted-foreground">Years Experience</div>
                </div>
                <div className="space-y-1">
                  <div className="text-4xl font-bold text-primary">85+</div>
                  <div className="text-base text-muted-foreground">Publications</div>
                </div>
                <div className="space-y-1">
                  <div className="text-4xl font-bold text-primary">22</div>
                  <div className="text-base text-muted-foreground">Patents</div>
                </div>
              </div>
            </div>

            {/* Right image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-teal-200/40 to-cyan-200/40 rounded-full blur-2xl" />
                <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-teal-100">
                  <img
                    src="/pfp.png"
                    alt="Prof. K.T.V Talele"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

