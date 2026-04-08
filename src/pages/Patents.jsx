import React, { useState, useMemo } from 'react';
import { ExternalLink, Link as LinkIcon } from 'lucide-react';
import Badge from '../components/ui/Badge';
import patentsData from '../utils/patents_data.json';

// Academic year label (August to May), e.g. "2024-2025"
const getAcademicYearLabel = (date, fallbackYear) => {
  if (!date || isNaN(date.getTime())) {
    if (!fallbackYear) return 'Other';
    const fy = fallbackYear;
    return `${fy - 1}-${fy}`;
  }
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-11
  let startYear;

  if (month >= 7) {
    // August (7) to December (11): academic year starts this calendar year
    startYear = year;
  } else {
    // January (0) to July (6): academic year started previous calendar year
    startYear = year - 1;
  }

  const endYear = startYear + 1;
  return `${startYear}-${endYear}`;
};

// Transform JSON data to component format - moved outside component to avoid React compiler warning
const transformPatentsData = () => {
  const patentsArray = patentsData.patents || [];
  
  if (patentsArray.length === 0) {
    return [];
  }

  return patentsArray.map((patent) => {
      // Extract year from date or publicationdate
      let year = new Date().getFullYear();
      let formattedDate = '';
      let formattedPublicationDate = '';
      let filingDateObj = null;
      let publicationDateObj = null;
      
      if (patent.date) {
        try {
          filingDateObj = new Date(patent.date);
          if (!isNaN(filingDateObj.getTime())) {
            year = filingDateObj.getFullYear();
            formattedDate = filingDateObj.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            });
          } else {
            const yearMatch = patent.date.match(/(\d{4})/);
            year = yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear();
            formattedDate = patent.date;
          }
        } catch {
          const yearMatch = patent.date.match(/(\d{4})/);
          year = yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear();
          formattedDate = patent.date;
        }
      }
      
      if (patent.publicationdate) {
        try {
          publicationDateObj = new Date(patent.publicationdate);
          if (!isNaN(publicationDateObj.getTime())) {
            formattedPublicationDate = publicationDateObj.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            });
          } else {
            formattedPublicationDate = patent.publicationdate;
          }
        } catch {
          formattedPublicationDate = patent.publicationdate;
        }
      }
      
      // Format authors/inventors
      const inventors = Array.isArray(patent.authors) 
        ? patent.authors.join(', ') 
        : patent.authors || '';
      
      // Normalize status
      const status = patent.status?.toLowerCase() || 'pending';
      
      // Academic year label based on filing or publication date
      const academicYear = getAcademicYearLabel(publicationDateObj || filingDateObj, year);
      
      return {
        id: patent.id,
        title: patent.title,
        inventors: inventors,
        patentNumber: patent.patentnumber || null,
        applicationNumber: patent.applicationnumber || null,
        filingDate: formattedDate,
        publicationDate: formattedPublicationDate,
        date: formattedDate,
        year: year,
        status: status,
        academicYear: academicYear,
        organisation: patent.organisation || 'Not specified',
        link: patent.reference_link || null,
        sortTime: publicationDateObj?.getTime() || filingDateObj?.getTime() || 0,
        remark: patent.remark || '',
      };
    });
};

const Patents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Use transformed data and remove "awaiting request for examination" patents
  const patents = transformPatentsData().filter(
    (p) => p.status !== 'awaiting request for examination'
  );

  // Get unique academic years and statuses
  const years = useMemo(() => {
    const uniqueYears = [...new Set(patents.map(p => p.academicYear))].filter(Boolean);
    const sorted = uniqueYears.sort((a, b) => {
      const [aStart] = a.split('-').map(Number);
      const [bStart] = b.split('-').map(Number);
      if (isNaN(aStart) || isNaN(bStart)) return 0;
      return bStart - aStart; // Latest academic year first
    });
    return sorted;
  }, [patents]);

  const statuses = useMemo(() => {
    return [...new Set(patents.map(p => p.status))].sort();
  }, [patents]);

  // Calculate metadata
  const totalPatents = patents.length;
  const activeYears = years.length;

  // Filter patents
  const filteredPatents = useMemo(() => {
    return patents.filter(patent => {
      const matchesSearch = searchQuery === '' || 
        patent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patent.inventors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (patent.patentNumber && patent.patentNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (patent.applicationNumber && patent.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesYear = selectedYear === 'all' || patent.academicYear === selectedYear;
      
      const matchesStatus = selectedStatus === 'all' || patent.status === selectedStatus;
      
      return matchesSearch && matchesYear && matchesStatus;
    });
  }, [patents, searchQuery, selectedYear, selectedStatus]);

  // Group patents by academic year and sort by date (most recent first)
  const groupedPatents = useMemo(() => {
    const grouped = {};
    filteredPatents.forEach(patent => {
      const label = patent.academicYear || 'Other';
      if (!grouped[label]) {
        grouped[label] = [];
      }
      grouped[label].push(patent);
    });
    
    const sortedLabels = Object.keys(grouped).sort((a, b) => {
      const [aStart] = a.split('-').map(Number);
      const [bStart] = b.split('-').map(Number);
      if (isNaN(aStart) || isNaN(bStart)) return 0;
      return bStart - aStart;
    });

    const result = {};
    const sortedYearsArray = [];
    
    sortedLabels.forEach(label => {
      result[label] = grouped[label].sort((a, b) => {
        return (b.sortTime || 0) - (a.sortTime || 0);
      });
      sortedYearsArray.push(label);
    });
    
    return { grouped: result, sortedYears: sortedYearsArray };
  }, [filteredPatents]);

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'granted':
        return 'outline';
      case 'pending':
      case 'application awaiting examination':
      case 'awaiting request for examination':
        return 'outline';
      case 'abandoned':
      case 'deemed to be withdrawn':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const formatStatus = (status) => {
    // Capitalize first letter of each word
    return status.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  return (
    <main className="min-h-screen bg-white pt-24 lg:pt-28">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 lg:mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              Patents
            </h1>
            <p className="text-lg text-gray-600 mb-3">
              Intellectual property and patent applications
            </p>
            <p className="text-sm text-gray-500">
              {totalPatents} {totalPatents === 1 ? 'patent' : 'patents'} • {activeYears} {activeYears === 1 ? 'academic year' : 'academic years'}
            </p>
          </div>

          {/* Filter & Search Bar */}
          <div className="mb-8 space-y-4">
            {/* Search Input */}
            <div>
              <input
                type="text"
                placeholder="Search by patent title, inventor, or patent number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              {/* Academic Year Filter */}
              <div className="flex-1 min-w-[150px]">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-900 bg-white cursor-pointer"
                >
                  <option value="all">All Academic Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex-1 min-w-[150px]">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-900 bg-white cursor-pointer"
                >
                  <option value="all">All Status</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{formatStatus(status)}</option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* Patents List */}
          <div className="space-y-12">
            {totalPatents === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No patents available at this time.</p>
              </div>
            ) : groupedPatents.sortedYears.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No patents found matching your criteria.</p>
              </div>
            ) : (
              groupedPatents.sortedYears.map((year) => {
                const yearPatents = groupedPatents.grouped[year];
                return (
                <section key={year} className="space-y-6">
                  {/* Year Heading */}
                  <h2 className="text-2xl font-semibold text-gray-900 border-b-2 border-gray-300 pb-2">
                    {year}
                  </h2>

                  {/* Patents for this year */}
                  <div className="space-y-6">
                    {yearPatents.map((patent) => (
                      <article
                        key={patent.id}
                        className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                      >
                        {/* Patent Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {patent.title}
                        </h3>

                        {/* Inventors */}
                        <p className="text-base text-gray-700 mb-2">
                          {patent.inventors}
                        </p>

                        {/* Application Number, Patent Number, Organisation */}
                        <p className="text-base font-semibold text-gray-800 mb-1">
                          {patent.applicationNumber && `Application No. ${patent.applicationNumber}`}
                          {patent.patentNumber && `${patent.applicationNumber ? ' • ' : ''}Patent No. ${patent.patentNumber}`}
                          {patent.organisation && `${(patent.applicationNumber || patent.patentNumber) ? ' • ' : ''}${patent.organisation}`}
                        </p>

                        {/* Filing Date, Publication Date */}
                        <p className="text-sm text-gray-600 mb-4">
                          {patent.filingDate && `Filed: ${patent.filingDate}`}
                          {patent.publicationDate && `${patent.filingDate ? ' • ' : ''}Published: ${patent.publicationDate}`}
                        </p>

                        {/* Badges and Action Links */}
                        <div className="flex flex-wrap items-center gap-3">
                          {/* Status Badge */}
                          <Badge variant={getStatusBadgeVariant(patent.status)} className="text-xs border-gray-400 text-gray-700 bg-white font-medium">
                            {formatStatus(patent.status)}
                          </Badge>

                          {/* Action Links */}
                          {patent.link && (
                            <div className="flex items-center gap-4 ml-auto">
                              <a
                                href={patent.link}
                                className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 underline cursor-pointer"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="w-4 h-4" />
                                View Patent
                              </a>
                            </div>
                          )}
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

export default Patents;

