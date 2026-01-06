import React from 'react';

const Events = () => {
  return (
    <main className="min-h-screen bg-background pt-24 lg:pt-28">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4 mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground">Events</h1>
            <div className="w-16 h-1.5 bg-gradient-to-r from-primary to-cyan-300 rounded-full" />
          </div>
          <div className="text-lg text-muted-foreground">
            Events section content will be displayed here.
          </div>
        </div>
      </div>
    </main>
  );
};

export default Events;


