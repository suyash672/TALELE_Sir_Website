import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import PhotoSlideshow from './PhotoSlideshow';
import { 
  CalendarDaysIcon, 
  DocumentTextIcon, 
  ClipboardDocumentCheckIcon,
  ArrowDownTrayIcon,
  EnvelopeIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';
import publicationsData from '../../utils/publications_data.json';
import patentsData from '../../utils/patents_data.json';

const Hero = () => {
  const totalPublications = (publicationsData?.publications?.conferencepapers?.length || 0) + 
                            (publicationsData?.publications?.journalpapers?.length || 0);
  const totalPatents = patentsData?.patents?.length || 0;

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-teal-50/50 via-white to-cyan-50/30">
      <div className="container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight whitespace-nowrap leading-tight">
                  Dr. Kiran <span className="text-primary">TALELE</span>
                </h1>
              </div>

              <div className="space-y-4">
                <p className="text-xl lg:text-2xl text-muted-foreground font-light text-pretty flex items-center gap-2 flex-wrap">
                  Academician · Instructor · Guide · Mentor · Coach
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pt-8 border-t border-border">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CalendarDaysIcon className="w-6 h-6 text-primary" />
                    <div className="text-4xl font-bold text-primary">36+</div>
                  </div>
                  <div className="text-base text-muted-foreground">Years Experience</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <DocumentTextIcon className="w-6 h-6 text-primary" />
                    <div className="text-4xl font-bold text-primary">{totalPublications}+</div>
                  </div>
                  <div className="text-base text-muted-foreground">Publications</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ClipboardDocumentCheckIcon className="w-6 h-6 text-primary" />
                    <div className="text-4xl font-bold text-primary">{totalPatents}+</div>
                  </div>
                  <div className="text-base text-muted-foreground">Patents</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <LightBulbIcon className="w-6 h-6 text-primary" />
                    <div className="text-4xl font-bold text-primary">4</div>
                  </div>
                  <div className="text-base text-muted-foreground">Startups</div>
                </div>
              </div>
            </div>

            {/* Right slideshow */}
            <div className="flex justify-center lg:justify-end items-center lg:translate-x-6">
              <PhotoSlideshow
                images={[
                  '/slideshow/slide1.jpg',
                  '/slideshow/slide2.jpg',
                  '/slideshow/slide3.jpg',
                  '/slideshow/slide4.jpg',
                  '/slideshow/slide5.jpg',
                ]}
                interval={4500}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

