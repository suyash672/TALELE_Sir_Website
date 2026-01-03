import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPublicationsDropdownOpen, setIsPublicationsDropdownOpen] = useState(false);
  const [isMobilePublicationsOpen, setIsMobilePublicationsOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Publications', path: '/publications', hasDropdown: true },
    { name: 'Outreach Activities', path: '/outreach-activities' },
    { name: 'Events', path: '/events' },
  ];

  const publicationsSubItems = [
    { name: 'Conference Papers', path: '/conference-publications' },
    { name: 'Journals Published', path: '/journals-published' },
    { name: 'Patents', path: '/patents' },
  ];

  // Handle hover for dropdown - removed separate handler, using inline handlers

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/98 backdrop-blur-lg shadow-lg border-b-2 border-primary/20'
          : 'bg-background/95 backdrop-blur-md border-b border-border/50'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="flex items-center space-x-2 group"
          >
            <span className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
              Prof. K.T.V <span className="text-primary">Talele</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.hasDropdown && publicationsSubItems.some(sub => location.pathname === sub.path));
              
              if (item.hasDropdown) {
                return (
                  <div 
                    key={item.path} 
                    className="relative" 
                    ref={dropdownRef}
                    onMouseEnter={() => setIsPublicationsDropdownOpen(true)}
                    onMouseLeave={() => setIsPublicationsDropdownOpen(false)}
                  >
                    <button
                      className={`px-5 py-3 text-base font-semibold rounded-lg transition-all duration-200 relative flex items-center gap-1 ${
                        isActive
                          ? 'text-primary bg-primary/15 shadow-sm'
                          : 'text-foreground hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${isPublicationsDropdownOpen ? 'rotate-180' : ''}`} />
                      {isActive && (
                        <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                      )}
                    </button>
                    {isPublicationsDropdownOpen && (
                      <div 
                        className="absolute top-full left-0 pt-2 w-56 z-50"
                        onMouseEnter={() => setIsPublicationsDropdownOpen(true)}
                        onMouseLeave={() => setIsPublicationsDropdownOpen(false)}
                      >
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                          {publicationsSubItems.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className={`block px-4 py-3 text-sm font-medium transition-colors ${
                                location.pathname === subItem.path
                                  ? 'bg-primary/10 text-primary'
                                  : 'text-foreground hover:bg-primary/5 hover:text-primary'
                              } ${subItem !== publicationsSubItems[0] ? 'border-t border-gray-200' : ''}`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-5 py-3 text-base font-semibold rounded-lg transition-all duration-200 relative ${
                    isActive
                      ? 'text-primary bg-primary/15 shadow-sm'
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 text-foreground hover:text-primary transition-colors rounded-lg hover:bg-accent"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-2 border-t-2 border-border/50 mt-2 bg-background/98">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.hasDropdown && publicationsSubItems.some(sub => location.pathname === sub.path));
              
              if (item.hasDropdown) {
                return (
                  <div key={item.path}>
                    <button
                      onClick={() => setIsMobilePublicationsOpen(!isMobilePublicationsOpen)}
                      className={`w-full text-left px-5 py-3.5 text-base font-semibold rounded-lg transition-all duration-200 flex items-center justify-between ${
                        isActive
                          ? 'text-primary bg-primary/15 shadow-sm border-l-4 border-primary'
                          : 'text-foreground hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${isMobilePublicationsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isMobilePublicationsOpen && (
                      <div className="pl-4 mt-2 space-y-1">
                        {publicationsSubItems.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsMobilePublicationsOpen(false);
                            }}
                            className={`block px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                              location.pathname === subItem.path
                                ? 'text-primary bg-primary/10'
                                : 'text-foreground hover:text-primary hover:bg-primary/5'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full text-left px-5 py-3.5 text-base font-semibold rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-primary bg-primary/15 shadow-sm border-l-4 border-primary'
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

