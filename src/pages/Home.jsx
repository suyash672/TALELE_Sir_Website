import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import CurrentPositions from '../components/sections/CurrentPositions';
import AreasOfInterest from '../components/sections/AreasOfInterest';
import AwardsAndRecognition from '../components/sections/AwardsAndRecognition';
import TeachingExperience from '../components/sections/TeachingExperience';
import VisitingFaculty from '../components/sections/VisitingFaculty';
import PastPositions from '../components/sections/PastPositions';
import Contact from '../components/sections/Contact';

const Home = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <About />
      <CurrentPositions />
      <AreasOfInterest />
      <AwardsAndRecognition />
      <TeachingExperience />
      <VisitingFaculty />
      <PastPositions />
      <Contact />
    </main>
  );
};

export default Home;

