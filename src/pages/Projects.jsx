import React, { useState } from 'react';
import { Youtube, FileText, X, Play } from 'lucide-react';

// Modal Component for Video/Report
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
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

// Unified Project Card Component (Image left, Info right)
const ProjectCard = ({ project, showButtons = true }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [showReport, setShowReport] = useState(false);

  return (
    <>
      <div className="group bg-white rounded-2xl border border-border/50 shadow-sm hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.01)] hover:border-primary transition-all duration-300 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
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

          {/* Info Section */}
          <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Metadata */}
              {project.metadata && (
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <span>{project.metadata}</span>
                </div>
              )}
              
              {/* Title */}
              <h3 className="text-2xl lg:text-3xl font-semibold text-foreground leading-tight">
                {project.title}
              </h3>
              
              {/* Description */}
              <p className="text-muted-foreground leading-relaxed text-base">
                {project.description || project.abstract}
              </p>
            </div>

            {/* Action Buttons */}
            {showButtons && (
              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border/50">
                <button 
                  onClick={() => setShowReport(true)}
                  className="flex items-center gap-2 px-5 py-2.5 cursor-pointer bg-white border border-border hover:bg-muted rounded-lg transition-all duration-200 text-foreground"
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">Read Report</span>
                </button>
                <button 
                  onClick={() => setShowVideo(true)}
                  className="flex items-center gap-2 px-5 py-2.5 cursor-pointer bg-white border border-border hover:bg-muted rounded-lg transition-all duration-200 text-foreground"
                >
                  <Play className="w-4 h-4" />
                  <span className="text-sm font-medium">Watch Demo</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

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

// Section Header Component - Minimalistic Design
const SectionHeader = ({ title }) => {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-4">
        <div className="w-1 h-8 bg-primary"></div>
        <h2 className="text-2xl lg:text-3xl font-medium text-foreground uppercase tracking-wide">
          {title}
        </h2>
      </div>
    </div>
  );
};

const Projects = () => {
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white pt-24 lg:pt-28">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16 lg:mb-20">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-semibold text-foreground mb-4">
              Projects
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-cyan-300 rounded-full mx-auto mb-6" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive collection of research projects, funded initiatives, and student innovations
            </p>
          </div>

          {/* Funded Research Projects */}
          <section className="mb-20">
            <SectionHeader title="Funded Research Projects" />
            <div className="space-y-6">
              {fundedProjects.map((project, index) => (
                <ProjectCard key={index} project={project} showButtons={false} />
              ))}
            </div>
          </section>

          {/* Mentored Sponsored Projects */}
          <section className="mb-20">
            <SectionHeader title="Mentored Sponsored Projects" />
            <div className="space-y-6">
              {sponsoredProjects.map((project, index) => (
                <ProjectCard key={index} project={project} showButtons={false} />
              ))}
            </div>
          </section>

          {/* Undergraduate Projects */}
          <section className="mb-20">
            <SectionHeader title="Undergraduate Projects" />
            <div className="space-y-6">
              {undergraduateProjects.map((project, index) => (
                <ProjectCard key={index} project={project} showButtons={true} />
              ))}
            </div>
          </section>

          {/* Postgraduate Projects */}
          <section className="mb-12">
            <SectionHeader title="Postgraduate Projects" />
            <div className="space-y-6">
              {postgraduateProjects.map((project, index) => (
                <ProjectCard key={index} project={project} showButtons={true} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Projects;
