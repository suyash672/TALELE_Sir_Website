import React, { useMemo, useState } from 'react';
import Badge from '../components/ui/Badge';
import publicationsData from '../utils/publications_data.json';
import patentsData from '../utils/patents_data.json';
import copyrightsData from '../utils/copyrights_data.json';

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
  const [expandedCerts, setExpandedCerts] = useState({});

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

      let datesStr = '';
      if (patent.registrationdate) {
        datesStr += `Registration Date: ${formatDate(parseDate(patent.registrationdate), patent.registrationdate)}`;
        if (patent.grantdate) {
          datesStr += ` • Grant Date: ${formatDate(parseDate(patent.grantdate), patent.grantdate)}`;
        }
      }

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
        datesDetail: datesStr,
        doi: null,
        link: patent.reference_link || null,
        images: patent.images || [],
        sortDate: parsedDate,
        sortTime: parsedDate ? parsedDate.getTime() : 0,
        displayDate: formatDate(parsedDate, patent.publicationdate || patent.registrationdate || patent.date),
      };
    });

    const copyrightItems = (copyrightsData?.copyrights || []).map((copyright) => {
      const parsedDate = parseDate(copyright.registrationdate);
      const authors = Array.isArray(copyright.authors) ? copyright.authors.join(', ') : copyright.authors || '';
      
      return {
        id: `copyright-${copyright.id}`,
        type: 'Copyright',
        title: copyright.title || 'Untitled',
        contributors: authors,
        venue: 'Copyright Office, Government of India',
        detail: copyright.description || '',
        datesDetail: `Registration Date: ${formatDate(parsedDate, copyright.registrationdate)}`,
        doi: null,
        link: null,
        images: copyright.images || [],
        sortDate: parsedDate,
        sortTime: parsedDate ? parsedDate.getTime() : 0,
        displayDate: formatDate(parsedDate, copyright.registrationdate),
      };
    });

    return [...conferenceItems, ...journalItems, ...patentItems, ...copyrightItems].sort((a, b) => b.sortTime - a.sortTime);
  }, []);

  const typeFilteredItems = useMemo(() => {
    return allItems.filter((item) => {
      if (activeTypeFilter === 'all') return true;
      if (activeTypeFilter === 'conference') return item.type === 'Conference Publication';
      if (activeTypeFilter === 'journal') return item.type === 'Journal Publication';
      if (activeTypeFilter === 'patent') return item.type === 'Patent';
      if (activeTypeFilter === 'copyright') return item.type === 'Copyright';
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

              <button
                type="button"
                onClick={() =>
                  setActiveTypeFilter((prev) => (prev === 'copyright' ? 'all' : 'copyright'))
                }
                className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${activeTypeFilter === 'copyright'
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
              >
                Copyrights
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

                  {item.datesDetail && (
                    <p
                      className="text-sm text-gray-600 mb-2"
                      dangerouslySetInnerHTML={{ __html: highlightText(item.datesDetail, searchQuery) }}
                    />
                  )}

                  {item.images && item.images.length > 0 && (
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => setExpandedCerts((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          {expandedCerts[item.id] ? (
                            <><polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" /><line x1="14" y1="10" x2="21" y2="3" /><line x1="3" y1="21" x2="10" y2="14" /></>
                          ) : (
                            <><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></>
                          )}
                        </svg>
                        {expandedCerts[item.id] ? 'Hide Certificate' : 'Show Certificate'}
                      </button>
                      {expandedCerts[item.id] && (
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {item.images.map((imgSrc, idx) => (
                            <a key={idx} href={imgSrc} target="_blank" rel="noopener noreferrer" className="block border border-gray-200 rounded-md overflow-hidden hover:opacity-90 transition-opacity">
                              <img src={imgSrc} alt={`${item.title} - Certificate ${idx + 1}`} className="w-full h-auto object-contain bg-gray-50" style={{ maxHeight: '400px' }} />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
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



