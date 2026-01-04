import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { 
  AcademicCapIcon, 
  CalendarDaysIcon, 
  DocumentTextIcon, 
  ClipboardDocumentCheckIcon,
  ArrowDownTrayIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-50/50 via-white to-cyan-50/30">
      <div className="container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div className="space-y-8 lg:pr-8">
              <div className="space-y-4">
                <Badge variant="outline" className="text-base font-medium px-4 py-1.5 border-teal-200 bg-teal-50/50 flex items-center gap-2 w-fit">
                  <AcademicCapIcon className="w-5 h-5 text-teal-600" />
                  Associate Professor & Dean
                </Badge>
                <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-balance">
                  Dr. Kiran <br />
                  <span className="text-primary">TALELE</span>
                </h1>
              </div>

              <div className="space-y-4">
                <p className="text-2xl lg:text-3xl text-muted-foreground font-light text-pretty flex items-center gap-2 flex-wrap">
                  Teacher · Instructor · Guide · Mentor · Coach
                </p>
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed flex items-center gap-2">
                  Bharatiya Vidya Bhavan's Sardar Patel Institute of Technology, Mumbai
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="px-8 flex items-center gap-2">
                  <ArrowDownTrayIcon className="w-5 h-5" />
                  View Resume
                </Button>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="px-8 bg-transparent flex items-center gap-2">
                    <EnvelopeIcon className="w-5 h-5" />
                    Contact
                  </Button>
                </Link>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CalendarDaysIcon className="w-6 h-6 text-primary" />
                    <div className="text-4xl font-bold text-primary">33+</div>
                  </div>
                  <div className="text-base text-muted-foreground">Years Experience</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <DocumentTextIcon className="w-6 h-6 text-primary" />
                    <div className="text-4xl font-bold text-primary">85+</div>
                  </div>
                  <div className="text-base text-muted-foreground">Publications</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ClipboardDocumentCheckIcon className="w-6 h-6 text-primary" />
                    <div className="text-4xl font-bold text-primary">22</div>
                  </div>
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
                    src="/pfp1.png"
                    alt="Dr. K.T.V Talele"
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

