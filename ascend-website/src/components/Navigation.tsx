import { useState, useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import { CartIcon, MenuIcon, CloseIcon } from './Icons';

const NAV_LINKS = ['Home', 'About', 'Our System', 'Our Formulation', 'Shop', 'Reviews', 'Subscriptions', 'Contact'];

interface NavigationProps {
  page: string;
  setPage: (page: string) => void;
}

export function Navigation({ page, setPage }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't show nav on Welcome page
  if (page === 'Welcome') return null;

  const handleNavClick = (link: string) => {
    setPage(link);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 px-6 lg:px-10 py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled 
          ? 'bg-black/95 backdrop-blur-md border-b border-white/5' 
          : 'bg-transparent'
      }`}
    >
      {/* Left - Nav Links */}
      <div className="flex items-center gap-8">
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <MenuIcon />
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex gap-6 flex-wrap">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => handleNavClick(link)}
              className={`text-sm font-medium tracking-wide transition-all pb-1 ${
                page === link 
                  ? 'text-[#D4A574] border-b border-[#D4A574]' 
                  : 'text-gray-400 hover:text-[#D4A574]'
              }`}
            >
              {link}
            </button>
          ))}
        </div>
      </div>

      {/* Center - Logo */}
      <button 
        onClick={() => handleNavClick('Home')}
        className="absolute left-1/2 -translate-x-1/2 text-3xl lg:text-4xl font-bold tracking-wider"
        style={{ fontFamily: 'var(--header)' }}
      >
        ASCEND
      </button>

      {/* Right - Cart */}
      <CartIcon 
        count={totalItems} 
        onClick={() => handleNavClick('Cart')}
      />

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/97 z-[100] flex flex-col items-center justify-center gap-7 lg:hidden">
          <button 
            className="absolute top-5 right-5"
            onClick={() => setMenuOpen(false)}
          >
            <CloseIcon />
          </button>
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => handleNavClick(link)}
              className={`text-2xl font-medium ${
                page === link ? 'text-[#D4A574]' : 'text-white'
              }`}
              style={{ fontFamily: 'var(--header)' }}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
