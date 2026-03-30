import React from 'react';
import { Briefcase, Users, Lightbulb, BookOpen, FileText, Award } from 'lucide-react';
import Badge from '../ui/Badge';

const About = () => {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left side - About heading and key highlights */}
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl lg:text-6xl font-bold text-foreground">About</h2>
                <div className="w-16 h-1.5 bg-gradient-to-r from-primary to-cyan-300 rounded-full" />
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-cyan-50/50 rounded-xl border border-cyan-100">
                  <div className="p-2 bg-cyan-100 rounded-lg flex-shrink-0">
                    <Users className="w-5 h-5 text-cyan-700" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-semibold text-foreground text-base">Dean</div>
                    <div className="text-sm text-muted-foreground">Students, Alumni & External Relations</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <div className="p-2 bg-emerald-100 rounded-lg flex-shrink-0">
                    <Lightbulb className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-semibold text-foreground text-base">Director</div>
                    <div className="text-sm text-muted-foreground">Sardar Patel Technology Business Incubator</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Detailed description */}
            <div className="lg:col-span-8">
              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p className="text-xl">
                    Dr. Kiran TALELE is a Professor in the Electronics & Telecommunication Engineering Department of
                    Bharatiya Vidya Bhavans' Sardar Patel Institute of Technology, Mumbai, bringing over 36 years of
                    distinguished experience in academia.
                  </p>

                  <p className="text-lg">
                    Currently serving as the Dean of Students, Alumni and External Relations at Sardar Patel Institute
                    of Technology, Andheri Mumbai, he plays a pivotal role in shaping the institution's engagement
                    with stakeholders and fostering a vibrant academic community.
                  </p>

                  <p className="text-lg">
                    As the Director of Sardar Patel Technology Business Incubator in Mumbai, Dr. TALELE actively
                    contributes to nurturing innovation and entrepreneurship among students and startups.
                  </p>

                  <div className="bg-teal-50/50 border-l-4 border-primary p-6 rounded-r-lg my-8">
                    <h3 className="text-foreground font-semibold mb-3 text-lg">Research Focus</h3>
                    <p className="text-foreground text-base">
                      His research expertise spans Digital Signal & Image Processing, Computer Vision, Machine
                      Learning, and Multimedia System Design.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <BookOpen className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-semibold text-foreground">Publications</div>
                          <div className="text-base">
                            <span className="font-bold">85+ </span>
                            <span className="text-muted-foreground">research papers in national & international refered conferences and journals</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <FileText className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-semibold text-foreground">Patents</div>
                          <div className="text-base">
                            <span className="font-bold">24+ </span>
                            <span className="text-muted-foreground">patents across India, UK, and Germany</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <Lightbulb className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-semibold text-foreground">Startups</div>
                          <div className="text-base">
                            <span className="font-bold">4 </span>
                            <span className="text-muted-foreground">startups</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-lg mt-6">
                    <h3 className="text-foreground font-semibold mb-2">Awards & Recognition</h3>
                    <ul className="space-y-2 ">
                      <li className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className='text-gray-800'>Excellence in Academics and Research Award (2008-09) from S.P.I.T. Management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className='text-gray-800'>P.R. Bapat IEEE Bombay Section Outstanding Volunteer Award (2019)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className='text-gray-800'>Innovative Teaching Learning & Evaluation Methodology Award (2025)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

