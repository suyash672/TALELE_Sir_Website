import React from 'react';
import { Clock, Sparkles } from 'lucide-react';

const Projects = () => {
  return (
    <main className="min-h-screen bg-white pt-24 lg:pt-28">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Coming Soon Section */}
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            {/* Icon */}
            <div className="relative mb-8">
              {/* <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center shadow-lg">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-200 to-cyan-200 flex items-center justify-center">
                  <Clock className="w-12 h-12 text-teal-600" />
                </div>
              </div> */}
              {/* Decorative sparkles */}
              {/* <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-teal-400 animate-pulse" />
              </div>
              <div className="absolute -bottom-2 -left-2">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse delay-300" />
              </div> */}
            </div>

            {/* Heading */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Projects Coming Soon
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              We're currently curating and organizing a comprehensive collection of research projects, 
              funded initiatives, and student innovations. Check back soon to explore our portfolio!
            </p>

            {/* Additional Info */}
            <div className="mt-12 p-6 bg-gradient-to-br from-teal-50/50 to-cyan-50/30 rounded-2xl border border-teal-100 max-w-md w-full">
              <p className="text-sm text-gray-600">
                In the meantime, feel free to explore other sections of the portfolio or 
                <a 
                  href="/contact" 
                  className="text-teal-600 hover:text-teal-700 font-medium hover:underline ml-1"
                >
                  get in touch
                </a>
                {' '}if you have any questions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Projects;
