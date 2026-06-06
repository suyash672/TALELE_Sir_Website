import React, { useMemo, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import Badge from '../components/ui/Badge';
import publicationsData from '../utils/publications_data.json';
import patentsData from '../utils/patents_data.json';

const parseDate = (value) => {
  if (!value || typeof value !== 'string') return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const toTitleCase = (str) => {
  if (!str || typeof str !== 'string') return str;
  return str
    .toLowerCase()
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
};

const formatDate = (date, fallback) => {
  if (date) {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  return fallback || 'Date not available';
};

const highlightText = (text, query) => {
  if (!query || query.trim() === '') return text;

  const escapeHtml = (str) =>
    String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  const escapedText = escapeHtml(text);
  const terms = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  let highlighted = escapedText;
  terms.forEach((term) => {
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedTerm})`, 'gi');
    highlighted = highlighted.replace(
      regex,
      '<mark class="bg-yellow-200 font-semibold">$1</mark>'
    );
  });

  return highlighted;
};

const Publications = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTypeFilter, setActiveTypeFilter] = useState('all');

  const allItems = useMemo(() => {
    const conferenceItems = (publicationsData?.publications?.conferencepapers || []).map((paper) => {
      const parsedDate = parseDate(paper.date);
      const authors = Array.isArray(paper.authors) ? paper.authors.join(', ') : paper.authors || '';

      return {
        id: `conf-${paper.id}`,
        type: 'Conference Publication',
        title: paper.title || 'Untitled',
        contributors: authors,
        venue: paper.conferencename || '',
        detail: paper.hostingvenue || '',
        doi: paper.doi && paper.doi !== 'Not available' ? paper.doi : null,
        link: paper.reference_link || null,
        sortDate: parsedDate,
        sortTime: parsedDate ? parsedDate.getTime() : 0,
        displayDate: formatDate(parsedDate, paper.date),
      };
    });

    const journalItems = (publicationsData?.publications?.journalpapers || []).map((paper) => {
      const parsedDate = parseDate(paper.publicationdate);
      const fallbackYear = Number(paper.publicationyear || 0);
      const authors = Array.isArray(paper.authors) ? paper.authors.join(', ') : paper.authors || '';

      return {
        id: `journal-${paper.id}`,
        type: 'Journal Publication',
        title: paper.title || 'Untitled',
        contributors: authors,
        venue: paper.journaltitle || '',
        detail: paper.publisher || '',
        doi: paper.doi && paper.doi !== 'Not available' ? paper.doi : null,
        link: paper.reference_link || null,
        sortDate: parsedDate,
        sortTime: parsedDate
          ? parsedDate.getTime()
          : fallbackYear
            ? new Date(fallbackYear, 0, 1).getTime()
            : 0,
        displayDate: formatDate(parsedDate, paper.publicationyear ? String(paper.publicationyear) : ''),
      };
    });

    const patentItems = (patentsData?.patents || []).map((patent) => {
      const parsedDate = parseDate(patent.publicationdate) || parseDate(patent.registrationdate) || parseDate(patent.date);
      const inventors = Array.isArray(patent.authors) ? patent.authors.join(', ') : patent.authors || '';
      const title = toTitleCase(patent.title || 'Untitled');

      return {
        id: `patent-${patent.id}`,
        type: 'Patent',
        title: title,
        contributors: inventors,
        venue: patent.organisation || 'India Patent Office',
        detail: patent.patentnumber
          ? `Patent No. ${patent.patentnumber}`
          : patent.applicationnumber
            ? `Application No. ${patent.applicationnumber}`
            : '',
        doi: null,
        link: patent.reference_link || null,
        sortDate: parsedDate,
        sortTime: parsedDate ? parsedDate.getTime() : 0,
        displayDate: formatDate(parsedDate, patent.publicationdate || patent.registrationdate || patent.date),
      };
    });

    return [...conferenceItems, ...journalItems, ...patentItems].sort((a, b) => b.sortTime - a.sortTime);
  }, []);

  const typeFilteredItems = useMemo(() => {
    return allItems.filter((item) => {
      if (activeTypeFilter === 'all') return true;
      if (activeTypeFilter === 'conference') return item.type === 'Conference Publication';
      if (activeTypeFilter === 'journal') return item.type === 'Journal Publication';
      if (activeTypeFilter === 'patent') return item.type === 'Patent';
      return false;
    });
  }, [allItems, activeTypeFilter]);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return typeFilteredItems;

    const terms = searchQuery
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    return typeFilteredItems.filter((item) => {
      const searchable = [
        item.type,
        item.title,
        item.contributors,
        item.venue,
        item.detail,
        item.displayDate,
      ]
        .join(' ')
        .toLowerCase();

      return terms.every((term) => searchable.includes(term));
    });
  }, [typeFilteredItems, searchQuery]);

  return (
    <main className="min-h-screen bg-white pt-24 lg:pt-28">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 lg:mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Publications</h1>
            <p className="text-lg text-gray-600 mb-3">
              Combined list of conference papers, journal publications, and patents
            </p>
            <p className="text-sm text-gray-500">
              {typeFilteredItems.length} total entries, ordered by latest date first
            </p>
          </div>

          <div className="mb-8 space-y-3">
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() =>
                  setActiveTypeFilter((prev) => (prev === 'patent' ? 'all' : 'patent'))
                }
                className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${activeTypeFilter === 'patent'
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
              >
                Patents
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveTypeFilter((prev) => (prev === 'journal' ? 'all' : 'journal'))
                }
                className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${activeTypeFilter === 'journal'
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
              >
                Journal Publications
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveTypeFilter((prev) => (prev === 'conference' ? 'all' : 'conference'))
                }
                className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${activeTypeFilter === 'conference'
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
              >
                Conference Publications
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, author/inventor, venue, patent number, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
              {searchQuery && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                  {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No entries found matching your search.</p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <article
                  key={item.id}
                  className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <Badge variant="outline">{item.type}</Badge>
                    <span className="text-sm text-gray-500">{item.displayDate}</span>
                  </div>

                  <h2
                    className="text-xl font-bold text-gray-900 mb-2"
                    dangerouslySetInnerHTML={{ __html: highlightText(item.title, searchQuery) }}
                  />

                  <p
                    className="text-gray-700 mb-2"
                    dangerouslySetInnerHTML={{ __html: highlightText(item.contributors, searchQuery) }}
                  />

                  {item.venue && (
                    <p
                      className="text-gray-700 mb-1"
                      dangerouslySetInnerHTML={{ __html: highlightText(item.venue, searchQuery) }}
                    />
                  )}

                  {item.detail && (
                    <p
                      className="text-sm text-gray-600 mb-2"
                      dangerouslySetInnerHTML={{ __html: highlightText(item.detail, searchQuery) }}
                    />
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Reference
                      </a>
                    )}
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Publications;



