import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import CurrentPositions from '../components/sections/CurrentPositions';
import AreasOfInterest from '../components/sections/AreasOfInterest';
import AwardsAndRecognition from '../components/sections/AwardsAndRecognition';
import TeachingExperience from '../components/sections/TeachingExperience';
import VisitingFaculty from '../components/sections/VisitingFaculty';
import PastPositions from '../components/sections/PastPositions';
import StartupsCarousel from '../components/sections/StartupsCarousel';
import Contact from '../components/sections/Contact';

const Home = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <About />
      {/* <CurrentPositions /> */}
      {/* <AreasOfInterest /> */}
      {/* <AwardsAndRecognition /> */}
      {/* <TeachingExperience /> */}
      <StartupsCarousel />
      <PastPositions />
      <VisitingFaculty />
      <Contact />
    </main>
  );
};

export default Home;



