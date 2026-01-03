import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Publications from './pages/Publications';
import ConferencePublications from './pages/ConferencePublications';
import JournalsPublished from './pages/JournalsPublished';
import Patents from './pages/Patents';
import OutreachActivities from './pages/OutreachActivities';
import Events from './pages/Events';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/conference-publications" element={<ConferencePublications />} />
        <Route path="/journals-published" element={<JournalsPublished />} />
        <Route path="/patents" element={<Patents />} />
        <Route path="/outreach-activities" element={<OutreachActivities />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </div>
  );
}

export default App;
