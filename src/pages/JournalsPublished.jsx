import React, { useState, useMemo } from 'react';
import { ExternalLink, Link as LinkIcon } from 'lucide-react';
import Badge from '../components/ui/Badge';
import publicationsData from '../utils/publications_data.json';

const JournalsPublished = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedPublisher, setSelectedPublisher] = useState('all');

  // Transform JSON data to component format
  const publications = useMemo(() => {
    return publicationsData.publications.journalpapers.map((paper) => {
      // Extract year from publicationyear or publicationdate
      let year = paper.publicationyear || new Date().getFullYear();
      let formattedDate = '';
      
      if (paper.publicationdate) {
        try {
          const dateObj = new Date(paper.publicationdate);
          if (!isNaN(dateObj.getTime())) {
            formattedDate = dateObj.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            });
          } else {
            formattedDate = paper.publicationdate;
          }
        } catch (e) {
          formattedDate = paper.publicationdate;
        }
      }
      
      // Determine publisher from journaltitle, publisher field, or remark
      let publisher = 'Others';
      const journalTitle = paper.journaltitle?.toLowerCase() || '';
      const publisherField = paper.publisher?.toLowerCase() || '';
      const remark = paper.remark?.toLowerCase() || '';
      
      if (journalTitle.includes('ieee') || publisherField.includes('ieee') || remark.includes('ieee')) {
        publisher = 'IEEE';
      } else if (journalTitle.includes('acm') || publisherField.includes('acm') || remark.includes('acm')) {
        publisher = 'ACM';
      } else if (journalTitle.includes('springer') || publisherField.includes('springer') || remark.includes('springer')) {
        publisher = 'Springer';
      }
      
      // Format authors
      const authors = Array.isArray(paper.authors) 
        ? paper.authors.join(', ') 
        : paper.authors || '';
      
      // Format volume and issue
      let volumeIssue = '';
      if (paper.volume) {
        volumeIssue = `Vol. ${paper.volume}`;
        if (paper.issue) {
          volumeIssue += `, No. ${paper.issue}`;
        }
      }
      
      return {
        id: paper.id,
        title: paper.title,
        authors: authors,
        journal: paper.journaltitle,
        volume: paper.volume,
        issue: paper.issue,
        pages: paper.pages,
        volumeIssue: volumeIssue,
        date: formattedDate,
        year: year,
        publisher: publisher,
        doi: paper.doi && paper.doi !== 'Not available' ? paper.doi : null,
        paperLink: paper.reference_link || null,
        issn: paper.issn && paper.issn !== 'Not available' ? paper.issn : null,
      };
    });
  }, []);

  // Get unique years and publishers
  const years = useMemo(() => {
    const uniqueYears = [...new Set(publications.map(p => p.year))].sort((a, b) => b - a);
    return uniqueYears;
  }, [publications]);

  const publishers = useMemo(() => {
    return [...new Set(publications.map(p => p.publisher))].sort();
  }, [publications]);

  // Calculate metadata
  const totalPapers = publications.length;
  const activeYears = years.length;
  const yearRange = years.length > 0 ? `${years[years.length - 1]}-${years[0]}` : '';

  // Enhanced search function that tokenizes query and searches across multiple fields
  const matchesSearchQuery = (pub, query) => {
    if (!query || query.trim() === '') return true;
    
    const queryLower = query.toLowerCase().trim();
    const searchTerms = queryLower.split(/\s+/).filter(term => term.length > 0);
    
    // Create a searchable text string from all relevant fields
    const searchableText = [
      pub.title,
      pub.authors,
      pub.journal,
      pub.publisher,
      pub.doi || '',
      pub.issn || '',
      pub.volumeIssue || '',
      pub.pages || '',
    ].join(' ').toLowerCase();
    
    // Check if all search terms are found in the searchable text
    return searchTerms.every(term => searchableText.includes(term));
  };

  // Highlight search terms in text
  const highlightText = (text, query) => {
    if (!query || query.trim() === '') return text;
    
    // Escape HTML to prevent XSS
    const escapeHtml = (str) => {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };
    
    const escapedText = escapeHtml(text);
    const searchTerms = query.toLowerCase().trim().split(/\s+/).filter(term => term.length > 0);
    let highlightedText = escapedText;
    
    searchTerms.forEach(term => {
      // Escape special regex characters
      const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedTerm})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200 font-semibold">$1</mark>');
    });
    
    return highlightedText;
  };

  // Filter publications
  const filteredPublications = useMemo(() => {
    return publications.filter(pub => {
      const matchesSearch = matchesSearchQuery(pub, searchQuery);
      
      const matchesYear = selectedYear === 'all' || pub.year === parseInt(selectedYear);
      
      const matchesPublisher = selectedPublisher === 'all' || 
        (selectedPublisher === 'others' ? !['IEEE', 'ACM', 'Springer'].includes(pub.publisher) : pub.publisher === selectedPublisher);
      
      return matchesSearch && matchesYear && matchesPublisher;
    });
  }, [publications, searchQuery, selectedYear, selectedPublisher]);

  // Group publications by year and sort by date (most recent first)
  const groupedPublications = useMemo(() => {
    const grouped = {};
    filteredPublications.forEach(pub => {
      if (!grouped[pub.year]) {
        grouped[pub.year] = [];
      }
      grouped[pub.year].push(pub);
    });
    
    // Sort years in descending order (2024, 2023, etc.)
    const sortedYears = Object.keys(grouped).sort((a, b) => parseInt(b) - parseInt(a));
    const result = {};
    const sortedYearsArray = [];
    
    sortedYears.forEach(year => {
      // Sort items within each year by date (most recent first)
      result[year] = grouped[year].sort((a, b) => {
        const dateA = a.date ? new Date(a.date) : null;
        const dateB = b.date ? new Date(b.date) : null;
        if (dateA && dateB && !isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
          return dateB - dateA;
        }
        return 0;
      });
      sortedYearsArray.push(year);
    });
    
    return { grouped: result, sortedYears: sortedYearsArray };
  }, [filteredPublications]);

  const getPublisherBadgeVariant = (publisher) => {
    switch (publisher) {
      case 'IEEE':
        return 'outline';
      case 'ACM':
        return 'outline';
      case 'Springer':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <main className="min-h-screen bg-white pt-24 lg:pt-28">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 lg:mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              Journals Published
            </h1>
            <p className="text-lg text-gray-600 mb-3">
              Peer-reviewed journal articles
            </p>
            <p className="text-sm text-gray-500">
              {totalPapers} papers • {activeYears} {activeYears === 1 ? 'year' : 'years'} of research {yearRange && `(${yearRange})`}
            </p>
          </div>

          {/* Filter & Search Bar */}
          <div className="mb-8 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, authors, journal, DOI, ISSN, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
              {searchQuery && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                  {filteredPublications.length} {filteredPublications.length === 1 ? 'result' : 'results'}
                </div>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              {/* Year Filter */}
              <div className="flex-1 min-w-[150px]">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-900 bg-white cursor-pointer"
                >
                  <option value="all">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Publisher Filter */}
              <div className="flex-1 min-w-[150px]">
                <select
                  value={selectedPublisher}
                  onChange={(e) => setSelectedPublisher(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-900 bg-white cursor-pointer"
                >
                  <option value="all">All Publishers</option>
                  {publishers.map(publisher => (
                    <option key={publisher} value={publisher}>{publisher}</option>
                  ))}
                  <option value="others">Others</option>
                </select>
              </div>
            </div>
          </div>

          {/* Publications List */}
          <div className="space-y-12">
            {groupedPublications.sortedYears.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No publications found matching your criteria.</p>
              </div>
            ) : (
              groupedPublications.sortedYears.map((year) => {
                const yearPublications = groupedPublications.grouped[year];
                return (
                <section key={year} className="space-y-6">
                  {/* Year Heading */}
                  <h2 className="text-2xl font-semibold text-gray-900 border-b-2 border-gray-300 pb-2">
                    {year}
                  </h2>

                  {/* Papers for this year */}
                  <div className="space-y-6">
                    {yearPublications.map((pub) => (
                      <article
                        key={pub.id}
                        className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                      >
                        {/* Paper Title */}
                        <h3 
                          className="text-xl font-bold text-gray-900 mb-2"
                          dangerouslySetInnerHTML={{ __html: highlightText(pub.title, searchQuery) }}
                        />

                        {/* Authors */}
                        <p 
                          className="text-base text-gray-700 mb-2"
                          dangerouslySetInnerHTML={{ __html: highlightText(pub.authors, searchQuery) }}
                        />

                        {/* Journal Name */}
                        <p 
                          className="text-base font-semibold text-gray-800 mb-1 italic"
                          dangerouslySetInnerHTML={{ __html: highlightText(pub.journal, searchQuery) }}
                        />

                        {/* Volume, Issue, Pages, Date */}
                        <p 
                          className="text-sm text-gray-600 mb-4"
                          dangerouslySetInnerHTML={{ 
                            __html: highlightText(
                              `${pub.volumeIssue || ''}${pub.pages ? `${pub.volumeIssue ? ', ' : ''}Pages: ${pub.pages}` : ''}${pub.date ? `${pub.volumeIssue || pub.pages ? ' • ' : ''}${pub.date}` : ''}`,
                              searchQuery
                            )
                          }}
                        />

                        {/* Badges and Action Links */}
                        <div className="flex flex-wrap items-center gap-3">
                          {/* Publisher Badge */}
                          <Badge variant={getPublisherBadgeVariant(pub.publisher)} className="text-xs border-gray-400 text-gray-700 bg-white font-medium">
                            {pub.publisher}
                          </Badge>

                          {/* Action Links */}
                          <div className="flex items-center gap-4 ml-auto">
                            {pub.doi && (
                              <a
                                href={`https://doi.org/${pub.doi}`}
                                className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 underline cursor-pointer"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <LinkIcon className="w-4 h-4" />
                                DOI
                              </a>
                            )}
                            {pub.paperLink && (
                              <a
                                href={pub.paperLink}
                                className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 underline cursor-pointer"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="w-4 h-4" />
                                {pub.publisher === 'IEEE' ? 'IEEE Xplore' : pub.publisher === 'ACM' ? 'ACM DL' : pub.publisher === 'Springer' ? 'Springer Link' : 'View Paper'}
                              </a>
                            )}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
                );
              })
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default JournalsPublished;

