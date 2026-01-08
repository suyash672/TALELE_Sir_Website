import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Calendar, MapPin, Users, Globe } from 'lucide-react';
import Badge from '../components/ui/Badge';
import outreachData from '../utils/outreach_data.json';

// Section configuration
const SECTIONS = [
  { id: 'invited_talks', label: 'Invited Talks & Guest Lectures', key: 'invited_talks_guest_lectures' },
  { id: 'faculty_development', label: 'Faculty Development Programs', key: 'faculty_development_programs' },
  { id: 'workshops', label: 'Workshops & Training', key: 'workshops_training_programs' },
  { id: 'conferences', label: 'Conferences & Leadership Roles', key: 'conferences_panels_leadership' },
  { id: 'global_outreach', label: 'Global Outreach', key: 'global_outreach' },
];

// Helper function to get sortable date
const getSortableDate = (activity) => {
  if (activity.date) {
    return new Date(activity.date);
  }
  if (activity.date_range && activity.date_range[0]) {
    return new Date(activity.date_range[0]);
  }
  return new Date(0); // Put items without dates at the end
};

// Format date for display
const formatDate = (activity) => {
  if (activity.date_range && activity.date_range.length === 2) {
    const start = new Date(activity.date_range[0]);
    const end = new Date(activity.date_range[1]);
    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }
    return activity.date_range.join(' - ');
  }
  if (activity.date) {
    const date = new Date(activity.date);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
    return activity.date;
  }
  return 'Date not specified';
};

// Format location
const formatLocation = (activity) => {
  const parts = [];
  if (activity.location) parts.push(activity.location);
  if (activity.country) parts.push(activity.country);
  return parts.length > 0 ? parts.join(', ') : 'Location not specified';
};

const OutreachActivities = () => {
  const [expandedCards, setExpandedCards] = useState(new Set());

  // Extract all activities from data
  const allActivities = useMemo(() => {
    const activities = [];
    SECTIONS.forEach(section => {
      const sectionData = outreachData.academic_outreach[section.key] || [];
      sectionData.forEach(activity => {
        activities.push({
          ...activity,
          sectionId: section.id,
          sectionKey: section.key,
          sortableDate: getSortableDate(activity),
        });
      });
    });
    return activities;
  }, []);

  // Group activities by section and sort chronologically
  const groupedActivities = useMemo(() => {
    const grouped = {};
    SECTIONS.forEach(section => {
      const sectionActivities = allActivities
        .filter(a => a.sectionId === section.id)
        .sort((a, b) => b.sortableDate - a.sortableDate); // Latest first
      grouped[section.id] = sectionActivities;
    });
    return grouped;
  }, [allActivities]);

  // Get section counts
  const sectionCounts = useMemo(() => {
    const counts = {};
    SECTIONS.forEach(section => {
      counts[section.id] = groupedActivities[section.id]?.length || 0;
    });
    return counts;
  }, [groupedActivities]);

  // Toggle card expansion
  const toggleCard = (id) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  return (
    <main className="min-h-screen bg-white pt-24 lg:pt-28">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 lg:mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              Outreach & Professional Activities
            </h1>
            <p className="text-lg text-gray-600 mb-3">
              Academic collaborations, invited talks, workshops, and leadership roles
            </p>
            <p className="text-sm text-gray-500">
              {allActivities.length} {allActivities.length === 1 ? 'activity' : 'activities'} across {SECTIONS.filter(s => sectionCounts[s.id] > 0).length} categories
            </p>
          </div>

          {/* Main Content */}
          <div className="w-full">
              {allActivities.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No activities available at this time.</p>
                </div>
              ) : (
                <div className="space-y-16">
                  {SECTIONS.map(section => {
                    const activities = groupedActivities[section.id] || [];
                    if (activities.length === 0) return null;

                    return (
                      <section
                        key={section.id}
                        id={section.id}
                        className="scroll-mt-24"
                      >
                        {/* Section Header - Only for Global Outreach */}
                        {section.id === 'global_outreach' && (
                          <div className="mb-8 pb-3 border-b-2 border-gray-300">
                            <h2 className="text-3xl font-semibold text-gray-900 mb-1">
                              {section.label}
                            </h2>
                            <p className="text-sm text-gray-600">
                              {activities.length} {activities.length === 1 ? 'activity' : 'activities'}
                            </p>
                          </div>
                        )}

                        {/* Activities List */}
                        <div className="space-y-4">
                          {activities.map(activity => {
                            const isExpanded = expandedCards.has(activity.id);
                            const hasDetails = activity.description || 
                              (activity.topics_or_focus_areas && activity.topics_or_focus_areas.length > 0) ||
                              activity.outcome_or_impact;

                            return (
                              <article
                                key={activity.id}
                                className="border border-gray-200 rounded-md bg-white hover:border-gray-300 transition-colors"
                              >
                                {/* Card Header - Always Visible */}
                                <div
                                  className={`p-5 ${hasDetails ? 'cursor-pointer' : ''}`}
                                  onClick={() => hasDetails && toggleCard(activity.id)}
                                >
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                      {/* Title */}
                                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {activity.title}
                                      </h3>

                                      {/* Role and Institution */}
                                      <div className="space-y-1.5 mb-3">
                                        {activity.role && (
                                          <p className="text-sm font-medium text-gray-700">
                                            {activity.role}
                                          </p>
                                        )}
                                        {activity.institution && (
                                          <p className="text-sm text-gray-600">
                                            {activity.institution}
                                          </p>
                                        )}
                                      </div>

                                      {/* Metadata Row */}
                                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                                        {/* Date */}
                                        <div className="flex items-center gap-1">
                                          <Calendar className="w-3.5 h-3.5" />
                                          <span>{formatDate(activity)}</span>
                                        </div>

                                        {/* Location */}
                                        {(activity.location || activity.country) && (
                                          <div className="flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span>{formatLocation(activity)}</span>
                                          </div>
                                        )}

                                        {/* Mode Badge */}
                                        {activity.mode && (
                                          <Badge variant="outline" className="text-xs border-gray-400 text-gray-700 bg-white">
                                            {activity.mode}
                                          </Badge>
                                        )}

                                        {/* Audience */}
                                        {activity.audience && activity.audience.length > 0 && (
                                          <div className="flex items-center gap-1">
                                            <Users className="w-3.5 h-3.5" />
                                            <span>{activity.audience.join(', ')}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Expand/Collapse Icon */}
                                    {hasDetails && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleCard(activity.id);
                                        }}
                                        className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
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
                                      {/* Description */}
                                      {activity.description && (
                                        <div>
                                          <h4 className="text-sm font-semibold text-gray-700 mb-1.5">Description</h4>
                                          <p className="text-sm text-gray-600 leading-relaxed">
                                            {activity.description}
                                          </p>
                                        </div>
                                      )}

                                      {/* Topics/Focus Areas */}
                                      {activity.topics_or_focus_areas && activity.topics_or_focus_areas.length > 0 && (
                                        <div>
                                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Topics & Focus Areas</h4>
                                          <div className="flex flex-wrap gap-2">
                                            {activity.topics_or_focus_areas.map((topic, idx) => (
                                              <Badge
                                                key={idx}
                                                variant="outline"
                                                className="text-xs border-gray-300 text-gray-700 bg-gray-50"
                                              >
                                                {topic}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                      )}

                                      {/* Outcome/Impact */}
                                      {activity.outcome_or_impact && (
                                        <div>
                                          <h4 className="text-sm font-semibold text-gray-700 mb-1.5">Outcome & Impact</h4>
                                          <p className="text-sm text-gray-600 leading-relaxed">
                                            {activity.outcome_or_impact}
                                          </p>
                                        </div>
                                      )}

                                      {/* Documents/Links */}
                                      {activity.documents_or_links && (
                                        <div>
                                          <h4 className="text-sm font-semibold text-gray-700 mb-1.5">Documents & Links</h4>
                                          <div className="text-sm text-gray-600">
                                            {typeof activity.documents_or_links === 'string' ? (
                                              <a
                                                href={activity.documents_or_links}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1 cursor-pointer"
                                              >
                                                <Globe className="w-4 h-4" />
                                                View Document
                                              </a>
                                            ) : (
                                              <span className="text-gray-500">Not available</span>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </article>
                            );
                          })}
                        </div>
                      </section>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

    </main>
  );
};

export default OutreachActivities;
