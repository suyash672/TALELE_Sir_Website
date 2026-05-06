import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Publications', path: '/publications' },
    { name: 'Outreach Activities', path: '/outreach-activities' },
    { name: 'CourseZ' , path: 'https://coursez.in/'},
    { name: 'Scholarship', path:'https://www.anudaanjagruti.com/'},
    { name: 'Contact', path: '/contact' }
  ];

  const renderNavItem = (item, isMobile = false) => {
    const isExternal = typeof item.path === 'string' && item.path.startsWith('http');
    const isActive = !isExternal && item.path && location.pathname === item.path;
    const baseClasses = isMobile
      ? `block w-full text-left px-5 py-3.5 text-base font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
          isActive
            ? 'text-primary bg-primary/15 shadow-sm border-l-4 border-primary'
            : 'text-foreground hover:text-primary hover:bg-primary/5'
        }`
      : `px-5 py-3 text-base font-semibold rounded-lg transition-all duration-200 relative cursor-pointer overflow-visible ${
          isActive
            ? 'text-primary bg-primary/15 shadow-sm'
            : 'text-foreground hover:text-primary hover:bg-primary/5'
        }`;

    if (isExternal) {
      return (
        <a
          key={item.name}
          href={item.path}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          {item.name}
        </a>
      );
    }

    if (!item.path) {
      return (
        <span key={item.name} className={baseClasses}>
          {item.name}
        </span>
      );
    }

    return (
      <Link
        key={item.path}
        to={item.path}
        onClick={() => isMobile && setIsMobileMenuOpen(false)}
        className={baseClasses}
      >
        {item.name}
        {!isMobile && isActive && (
          <span className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
        )}
      </Link>
    );
  };

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
            className="flex items-center space-x-2 group cursor-pointer"
          >
            <span className="text-lg lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
              Dr. Kiran <span className="text-primary">TALELE</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2 overflow-visible">
            {navItems.map((item) => renderNavItem(item, false))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 text-foreground hover:text-primary transition-colors rounded-lg hover:bg-accent cursor-pointer"
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
            {navItems.map((item) => renderNavItem(item, true))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

