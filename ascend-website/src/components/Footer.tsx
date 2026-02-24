import { Stars } from './Icons';
import { ALL_REVIEWS, avgRating } from '@/data/products';

const NAV_LINKS = ['Home', 'About', 'Our System', 'Our Formulation', 'Shop', 'Reviews', 'Contact'];

interface FooterProps {
  setPage: (page: string) => void;
}

export function Footer({ setPage }: FooterProps) {
  const handleNavClick = (link: string) => {
    setPage(link);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="border-t border-white/10 py-16 px-6 lg:px-10 bg-[var(--bg2)]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div 
            className="text-3xl font-bold mb-4 tracking-wider"
            style={{ fontFamily: 'var(--header)' }}
          >
            ASCEND
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            Clinical-grade acne control engineered for men who perform. No compromises.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-[#D4A574] text-xs tracking-widest uppercase mb-4">
            Navigate
          </h4>
          <div className="space-y-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className="block text-white/70 hover:text-[#D4A574] transition-colors text-sm"
              >
                {link}
              </button>
            ))}
          </div>
        </div>

        {/* System */}
        <div>
          <h4 className="text-[#D4A574] text-xs tracking-widest uppercase mb-4">
            The System
          </h4>
          <div className="space-y-2">
            {['Phase I — Clear', 'Phase II — Restore', 'Phase III — Treat'].map((phase) => (
              <div key={phase} className="text-white/70 text-sm">
                {phase}
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div>
          <h4 className="text-[#D4A574] text-xs tracking-widest uppercase mb-4">
            Reviews
          </h4>
          <div className="flex items-center gap-2 mb-2">
            <Stars count={5} />
            <span className="text-[#D4A574] font-bold">{avgRating}</span>
          </div>
          <p className="text-white/70 text-sm">
            {ALL_REVIEWS.length} verified reviews
          </p>
        </div>
      </div>

      <div className="gold-divider w-full max-w-6xl mx-auto mt-10 mb-5" />
      
      <p className="text-center text-white/50 text-xs">
        © 2025 ASCEND™ — All rights reserved. Results may vary. Dermatologist-recommended.
      </p>
    </footer>
  );
}
