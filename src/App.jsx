import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Publications from './pages/Publications';
import ConferencePublications from './pages/ConferencePublications';
import JournalsPublished from './pages/JournalsPublished';
import Patents from './pages/Patents';
import OutreachActivities from './pages/OutreachActivities';
import Events from './pages/Events';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/journal-publications" element={<ConferencePublications />} />
        <Route path="/research-journals" element={<JournalsPublished />} />
        <Route path="/patents" element={<Patents />} />
        <Route path="/outreach-activities" element={<OutreachActivities />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
