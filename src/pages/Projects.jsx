import React from 'react';

import projectsData from '../utils/projects_data.json';

const Projects = () => {
  const projects = [...(projectsData.projects || [])].sort((a, b) => {
    return (b.academicYear || '').localeCompare(a.academicYear || '');
  });

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
