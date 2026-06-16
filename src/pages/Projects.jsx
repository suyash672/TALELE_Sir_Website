import React, { useState } from 'react';

import projectsData from '../utils/projects_data.json';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('Major Project');

  const tabs = ['Mini Project', 'Major Project', 'Internship Project'];

  const projects = [...(projectsData.projects || [])]
    .filter((p) => {
      if (activeTab === 'Major Project') {
        return !p.type || p.type === 'Major Project' || p.type === 'Major';
      }
      if (activeTab === 'Mini Project') {
        return p.type === 'Mini Project' || p.type === 'Mini';
      }
      if (activeTab === 'Internship Project') {
        return p.type === 'Internship Project' || p.type === 'Internship';
      }
      return false;
    })
    .sort((a, b) => {
      return (b.academicYear || '').localeCompare(a.academicYear || '');
    });

  return (
    <main className="min-h-screen bg-white pt-24 lg:pt-28">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-5xl mx-auto">
          
          <div className="mb-8 lg:mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Projects</h1>
            <p className="text-lg text-gray-600 mb-3">
              Explore my mini projects, major projects, and internship projects
            </p>
            <p className="text-sm text-gray-500">
              {projects.length} total entries, ordered by latest date first
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <article key={index} className="border border-gray-200 rounded-md p-5">
                  <p className="text-sm text-gray-600 mb-1">Academic Year : {project.academicYear}</p>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Title : {project.title}</h2>
                  <p className="text-gray-700 mb-2">Team : {project.team}</p>
                  <p className="text-gray-700 mb-2 leading-relaxed">Abstract : {project.abstract}</p>
                </article>
              ))
            ) : (
              <p className="text-gray-500">No projects found for this category yet.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Projects;
