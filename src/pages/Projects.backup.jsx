import React, { useState, useEffect, useRef } from 'react';
import { Youtube, FileText, X, Play, ChevronDown, ChevronUp } from 'lucide-react';

// Modal Component for Video/Report
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

// Project Card Component with Accordion-style Design
const ProjectCard = ({ project, showButtons = true }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const hasDetails = project.description || project.abstract || project.group;

  return (
    <>
      <article className="border border-gray-200 rounded-md bg-white hover:border-gray-300 transition-colors overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          {project.image ? (
            <div className="md:w-80 lg:w-96 flex-shrink-0 relative overflow-hidden">
              <div className="aspect-[4/3] md:aspect-auto md:h-full bg-gradient-to-br from-gray-100 to-gray-200">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="md:w-80 lg:w-96 flex-shrink-0 relative overflow-hidden">
              <div className="aspect-[4/3] md:aspect-auto md:h-full bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-50/50 to-cyan-50/50">
                  <div className="text-center space-y-3 p-8">
                    <div className="w-20 h-20 mx-auto rounded-full bg-white/90 flex items-center justify-center shadow-md">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-cyan-300/20 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-cyan-400"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Card Header - Always Visible */}
          <div className="flex-1">
            <div
              className={`p-5 ${hasDetails ? 'cursor-pointer' : ''}`}
              onClick={() => hasDetails && setIsExpanded(!isExpanded)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Metadata */}
                  {project.metadata && (
                    <div className="text-xs text-gray-500 mb-2">
                      {project.metadata}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {project.title}
                  </h3>

                  {/* Description Preview (collapsed) */}
                  {!isExpanded && project.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {project.description}
                    </p>
                  )}

                  {/* Action Buttons */}
                  {showButtons && (
                    <div className="flex items-center gap-3 mt-4">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowReport(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors cursor-pointer"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Read Report</span>
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowVideo(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors cursor-pointer"
                      >
                        <Play className="w-4 h-4" />
                        <span>Watch Demo</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Expand/Collapse Icon */}
                {hasDetails && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(!isExpanded);
                    }}
                    className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && hasDetails && (
              <div className="px-5 pb-5 pt-0 border-t border-gray-100 transition-all duration-200 ease-in-out">
                <div className="space-y-4 mt-4">
                  {/* Group/Team */}
                  {project.group && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-1.5">Project Team</h4>
                      <p className="text-sm text-gray-600">{project.group}</p>
                    </div>
                  )}

                  {/* Full Description */}
                  {(project.description || project.abstract) && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-1.5">Description</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {project.description || project.abstract}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Video Modal */}
      {showButtons && (
        <>
          <Modal isOpen={showVideo} onClose={() => setShowVideo(false)} title={`${project.title} - Demo Video`}>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-red-500/20 flex items-center justify-center">
                    <Youtube className="w-10 h-10 text-red-500" />
                  </div>
                  <p className="text-white/80">Video demonstration for {project.title}</p>
                  <p className="text-white/50 text-sm">Video content will be embedded here</p>
                </div>
              </div>
            </div>
          </Modal>

          {/* Report Modal */}
          <Modal isOpen={showReport} onClose={() => setShowReport(false)} title={`${project.title} - Project Report`}>
            <div className="min-h-[60vh] bg-gray-50 rounded-lg p-8">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center space-y-2 pb-6 border-b border-border">
                  <h2 className="text-2xl font-semibold text-foreground">{project.title}</h2>
                  {project.group && <p className="text-primary font-medium">{project.group}</p>}
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Abstract</h4>
                  <p className="text-muted-foreground leading-relaxed">{project.description || project.abstract}</p>
                </div>
                <div className="pt-4 flex justify-center">
                  <div className="text-center space-y-2">
                    <FileText className="w-12 h-12 mx-auto text-primary/50" />
                    <p className="text-sm text-muted-foreground">Full report document will be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

// Section configuration
const PROJECT_SECTIONS = [
  { id: 'funded_research', label: 'Funded Research Projects', key: 'funded' },
  { id: 'sponsored', label: 'Mentored Sponsored Projects', key: 'sponsored' },
  { id: 'undergraduate', label: 'Undergraduate Projects', key: 'undergraduate' },
  { id: 'postgraduate', label: 'Postgraduate Projects', key: 'postgraduate' },
];

const Projects = () => {
  const [activeSection, setActiveSection] = useState('funded_research');
  const sectionRefs = useRef({});

  // Funded Research Projects Data
  const fundedProjects = [
    {
      title: "Suspicious Activity Detection and Tracking",
      metadata: "Oct 2014 — Mar 2015 · Mumbai University",
      description: "A research project focused on developing advanced algorithms for detecting and tracking suspicious activities in video surveillance systems. The system utilizes computer vision and machine learning techniques to identify anomalous behaviors in real-time.",
    },
    {
      title: "Customized Deep Learning based Patient Monitoring System using Video Analytics",
      metadata: "Mar 2020 — Dec 2020 · Mumbai University",
      description: "A customized Deep Learning system designed to monitor patient vitals and movement without invasive sensors. The system utilizes computer vision to detect irregularities in behavior and alert medical staff in real-time.",
    }
  ];

  // Mentored Sponsored Projects Data
  const sponsoredProjects = [
    {
      title: "eMobility",
      metadata: "2023-24 · DST NIDHI Prayas",
      description: "An innovative electric mobility solution focused on developing sustainable transportation systems with advanced battery management and charging infrastructure.",
    },
    {
      title: "Drones for Smart Agriculture",
      metadata: "2023-24 · IEEE AESS",
      description: "A comprehensive drone-based agricultural monitoring system that uses aerial imaging and AI to optimize crop health, irrigation, and yield prediction for modern farming practices.",
    },
    {
      title: "Electronics Language Interpreter",
      metadata: "2011-12 · DST",
      description: "A real-time language interpretation system that bridges communication gaps using advanced signal processing and natural language processing technologies.",
    },
    {
      title: "Alcohol Level Detector",
      metadata: "2012-13 · DST",
      description: "A non-invasive alcohol detection system designed for vehicle safety applications, using advanced sensor technology to accurately measure blood alcohol content.",
    },
    {
      title: "Driver Fatigue Detection",
      metadata: "2010-11 · DST",
      description: "An intelligent system that monitors driver behavior and physiological signals to detect signs of fatigue, providing timely alerts to prevent accidents and improve road safety.",
    }
  ];

  // Undergraduate Projects Data
  const undergraduateProjects = [
    {
      title: "Smart Irrigation System",
      metadata: "Undergraduate Project · GreenTech Innovators",
      description: "An automated irrigation system that optimizes water usage for agricultural fields using IoT sensors and intelligent algorithms. The system monitors soil moisture, weather conditions, and crop requirements to deliver precise irrigation schedules.",
      group: "GreenTech Innovators",
    },
    {
      title: "Health Monitoring Wearable",
      metadata: "Undergraduate Project · BioTech Enthusiasts",
      description: "A wearable device that continuously monitors and reports health metrics including heart rate, SpO2, and activity levels. The device provides real-time health insights and emergency alerts through a connected mobile application.",
      group: "BioTech Enthusiasts",
    },
    {
      title: "AI-Powered Tutor",
      metadata: "Undergraduate Project · EdTech Solutions",
      description: "An AI-powered tutor that provides personalized learning experiences for students with adaptive content delivery. The system analyzes learning patterns and adjusts difficulty levels to optimize educational outcomes.",
      group: "EdTech Solutions",
    },
    {
      title: "Smart Home Assistant",
      metadata: "Undergraduate Project · Home Automation Experts",
      description: "An integrated system that automates and controls various home appliances through voice commands and mobile app. The assistant learns user preferences and optimizes energy consumption while providing seamless home management.",
      group: "Home Automation Experts",
    },
    {
      title: "Renewable Energy Tracker",
      metadata: "Undergraduate Project · Eco Warriors",
      description: "A system to monitor and optimize renewable energy consumption with real-time analytics and insights. The platform tracks solar and wind energy generation, consumption patterns, and provides recommendations for energy efficiency.",
      group: "Eco Warriors",
    }
  ];

  // Postgraduate Projects Data
  const postgraduateProjects = [
    {
      title: "Autonomous Delivery Drone",
      metadata: "Postgraduate Project · AeroTech Innovators",
      description: "A drone system designed for efficient and safe delivery of packages with obstacle avoidance and GPS navigation. The system includes advanced flight control algorithms and real-time path optimization for urban environments.",
      group: "AeroTech Innovators",
    },
    {
      title: "Smart Traffic Management",
      metadata: "Postgraduate Project · UrbanTech Developers",
      description: "A solution to optimize traffic flow and reduce congestion in urban areas using computer vision and ML algorithms. The system provides real-time traffic analysis, signal optimization, and predictive traffic management.",
      group: "UrbanTech Developers",
    },
    {
      title: "Virtual Reality Classroom",
      metadata: "Postgraduate Project · EduTech Pioneers",
      description: "A VR-based classroom environment for immersive learning experiences with interactive 3D content. The platform enables students to explore complex concepts through virtual simulations and collaborative learning spaces.",
      group: "EduTech Pioneers",
    },
    {
      title: "Blockchain Voting System",
      metadata: "Postgraduate Project · CryptoTech Innovators",
      description: "A secure and transparent voting system using blockchain technology ensuring tamper-proof elections. The platform provides end-to-end encryption, voter anonymity, and real-time result verification.",
      group: "CryptoTech Innovators",
    },
    {
      title: "Telemedicine Platform",
      metadata: "Postgraduate Project · HealthTech Solutions",
      description: "A platform to facilitate remote medical consultations and treatment with video conferencing and health records. The system enables secure patient-doctor interactions, prescription management, and health data analytics.",
      group: "HealthTech Solutions",
    }
  ];

  // Group projects by section
  const groupedProjects = {
    funded_research: fundedProjects,
    sponsored: sponsoredProjects,
    undergraduate: undergraduateProjects,
    postgraduate: postgraduateProjects,
  };

  // Get section counts
  const sectionCounts = {
    funded_research: fundedProjects.length,
    sponsored: sponsoredProjects.length,
    undergraduate: undergraduateProjects.length,
    postgraduate: postgraduateProjects.length,
  };

  // Scroll to section with smooth transition
  const scrollToSection = (sectionId) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      setActiveSection(sectionId);
      const offset = 100; // Account for sticky nav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      PROJECT_SECTIONS.forEach(section => {
        const element = sectionRefs.current[section.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalProjects = fundedProjects.length + sponsoredProjects.length + 
                       undergraduateProjects.length + postgraduateProjects.length;

  return (
    <main className="min-h-screen bg-white pt-24 lg:pt-28">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 lg:mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              Projects
            </h1>
            <p className="text-lg text-gray-600 mb-3">
              A comprehensive collection of research projects, funded initiatives, and student innovations
            </p>
            <p className="text-sm text-gray-500">
              {totalProjects} {totalProjects === 1 ? 'project' : 'projects'} across {PROJECT_SECTIONS.length} categories
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sticky Side Navigation */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <nav className="lg:space-y-1 lg:border-r lg:border-gray-200 lg:pr-4">
                  {/* Mobile: Wrap navigation items */}
                  <div className="flex flex-wrap lg:flex-col gap-2 lg:gap-0">
                    {PROJECT_SECTIONS.map(section => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`flex-shrink-0 lg:w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ease-in-out cursor-pointer ${
                          activeSection === section.id
                            ? 'bg-gray-100 text-gray-900 lg:border-l-2 lg:border-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span>{section.label}</span>
                          <span className="text-xs text-gray-500">
                            ({sectionCounts[section.id]})
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="space-y-16">
                {PROJECT_SECTIONS.map(section => {
                  const projects = groupedProjects[section.id] || [];
                  if (projects.length === 0) return null;

                  return (
                    <section
                      key={section.id}
                      id={section.id}
                      ref={el => sectionRefs.current[section.id] = el}
                      className="scroll-mt-24"
                    >
                      {/* Section Header */}
                      <div className="mb-8 pb-3 border-b-2 border-gray-300">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-1">
                          {section.label}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {projects.length} {projects.length === 1 ? 'project' : 'projects'}
                        </p>
                      </div>

                      {/* Projects List */}
                      <div className="space-y-4">
                        {projects.map((project, index) => (
                          <ProjectCard 
                            key={index} 
                            project={project} 
                            showButtons={section.id === 'undergraduate' || section.id === 'postgraduate'}
                          />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Projects;
