import React from 'react';

const Projects = () => {
  const projects = [
    {
      academicYear: '2023-24',
      title: 'Intelligent Aerial system for Crop Health Monitoring and Precision Agriculture',
      team: 'Gandhar Kulkarni, Vedant Bhagwat, Dev Oza',
      abstract:
        'Drones, also known as unmanned aerial vehicles (UAVs), are rapidly transforming the agricultural industry. They can offer farmers a new and innovative way to collect data, monitor their crops, and apply pesticides and fertilizers.',
      weblink: '',
    },
    {
      academicYear: '2023-24',
      title: 'Electrify Mobility',
      team: 'Arpit Patil, Atharav Bhagwat, and Chirag Vasani',
      abstract: 'Enhancing Mobility and Independence, remote control device for accessing Car functionalities for PWDs"',
      weblink: '',
    },
    {
      academicYear: '2024-25',
      title: 'Autonomous Ground Robot for Agricultural Spraying',
      team: 'Preyes Parab, Om Patil',
      abstract:
        'This project uses UAVs and UGVs for crop monitoring and targeted pesticide application. It improves efficiency and supports sustainable farming.',
      weblink: '',
    },
    {
      academicYear: '2024-25',
      title: 'Collaborative UAV Swarm for Efficient Tunnel Inspections and Precision Terrain Mapping',
      team: 'Malay Phadke, Neel Patel',
      abstract:
        'This project uses a UAV swarm for faster and safer tunnel inspection and mapping. It improves efficiency and enables automated infrastructure monitoring.',
      weblink: '',
    },
    {
      academicYear: '2024-26',
      title: 'Blind spot detection in vehicles in foggy and rainy weathers',
      team: 'Himanshu Agrawal, Eshaan Golatkar, Ganesh Kakade',
      abstract:
        'Blind spot detection systems struggle in poor conditions, reducing accuracy and increasing accident risk.',
      weblink: '',
    },
    {
      academicYear: '2024-26',
      title: 'Path and Trajectory Planning for UGV and UAV Marsupial Robotic System',
      team: 'Surabhi Vishwasrao, Akash Mahajan, Yash Surve',
      abstract:
        'This project combines UGV and UAV for autonomous monitoring and mapping. It improves efficiency in surveillance and search operations.',
      weblink: '',
    },
    {
      academicYear: '2024-26',
      title: 'Enhancement of YOLO algorithm for object detection and application using Nvidia Jetson board',
      team: 'Vedant Kulkarni, Muneeb Shaikh, Satyam Drode',
      abstract:
        'This guide summarizes the evolution of YOLO for real-time object detection.It highlights key improvements and applications in areas like surveillance and automation.',
      weblink: '',
    },
    {
      academicYear: '2024-26',
      title: 'Blind Spot Detection in Extreme Weather Conditions by Fusion of Multiple Sensors',
      team: 'Himanshu Agrawal, Eshaan Golatkar, Ganesh Kakade',
      abstract:
        'Blind spot detection systems often fail in poor weather, reducing safety. ORAMA is an AI-based system using YOLOv8 for real-time detection and risk alerts in foggy and rainy conditions.It offers an effective solution for improving vehicle safety in challenging environments.',
      weblink: '',
    },
    {
      academicYear: '2025-27',
      title: 'A Trust-Aware and Causality-Driven Autonomous Intelligence Framework for Risk-Critical Pipeline Infrastructure for Gas and LPG',
      team: 'Anuraag Bagal, Bhavik Desai Gargi Dhulekar',
      abstract:
        'Gas and LPG pipelines face risks like corrosion, pressure stress, and material fatigue, leading to gradual structural damage. Existing systems are reactive and limited in prediction.TRUSTLINE is a proactive framework designed for intelligent, risk-aware pipeline monitoring.',
      weblink: '',
    },
    {
      academicYear: '2025-27',
      title: 'Physics-Informed Machine Learning for Hydro-Climatic Analysis Using Satellite-Derived Hydrometeorological Data on NVIDIA\'s Jetson Nano',
      team: 'Aarushi Ghosh, Vidhi Gond, Anushka Patil',
      abstract:
        'This project proposes a physics-informed ML framework for hydro-climatic analysis using satellite data on Jetson Nano. It provides real-time predictions of water levels, discharge, and flood risk.',
      weblink: '',
    },
  ];

  return (
    <main className="min-h-screen bg-white pt-24 lg:pt-28">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Major Projects</h1>
          <p className="text-gray-600 mb-8">{projects.length} projects</p>

          <div className="space-y-6">
            {projects.map((project, index) => (
              <article key={index} className="border border-gray-200 rounded-md p-5">
                <p className="text-sm text-gray-600 mb-1">Academic Year : {project.academicYear}</p>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Title : {project.title}</h2>
                <p className="text-gray-700 mb-2">Team : {project.team}</p>
                <p className="text-gray-700 mb-2 leading-relaxed">Abstract : {project.abstract}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Projects;
