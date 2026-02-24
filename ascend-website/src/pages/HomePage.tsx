import { useState } from 'react';
import { FadeIn } from '@/components/FadeIn';
import { Stars } from '@/components/Icons';
import { ALL_REVIEWS, avgRating } from '@/data/products';
// Images removed - using external URLs instead
import { ArrowRight, X } from 'lucide-react';

interface HomePageProps {
  setPage: (page: string) => void;
}

const modalData = [
  { 
    title: "Heat, Sweat, & Occlusion", 
    text: "ASCEND manages heat- and sweat-driven congestion by clearing occluded buildup with salicylic acid while preserving an optimized cleansing-to-hydration ratio. Skin-identical ceramides, niacinamide, humectants, and copper tripeptide-1 (GHK-Cu) stabilize the barrier and moisture balance under sustained heat and occlusion.", 
    icon: "bicep" 
  },
  { 
    title: "Bacteria & Inflammation", 
    text: "ASCEND controls acne-causing bacteria and inflammation through a high-strength azelaic acid system supported by zinc regulation and sulfur's antimicrobial activity. This approach suppresses bacterial overgrowth within the pore while calming inflammation and supporting long-term skin clarity.", 
    icon: "bacteria" 
  },
  { 
    title: "Excess Oil & Clogged Pores", 
    text: "ASCEND targets excess oil and clogged pores by regulating sebum production and normalizing pore turnover. Keratolytic actives clear existing buildup, while antimicrobial and oil-modulating components help prevent new congestion.", 
    icon: "bottle" 
  },
  { 
    title: "Redness & Irritation", 
    text: "ASCEND reduces redness and irritation by calming inflammatory pathways and reinforcing the skin barrier. Barrier-supporting components help the skin withstand repeated contact, shaving, and daily movement without triggering flare-ups, while balanced hydration keeps skin resilient under stress.", 
    icon: "nosymbol" 
  },
];

export function HomePage({ setPage }: HomePageProps) {
  const [modalOpen, setModalOpen] = useState<number | null>(null);

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-auto flex flex-col items-center justify-center px-6 pt-36 pb-8 text-center relative overflow-hidden">
        <div 
          className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(212,165,116,0.06) 0%, transparent 70%)' }}
        />

        <FadeIn>
          <h1 
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-widest font-normal mb-4"
            style={{ fontFamily: 'var(--header)' }}
          >
            THE NEW STANDARD FOR ACNE CONTROL.
          </h1>
          <p className="text-white text-lg font-normal mb-12">
            Clear skin for men — without compromise.
          </p>
        </FadeIn>

        <FadeIn className="w-full max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-6 lg:gap-10 px-4 flex-wrap lg:flex-nowrap">
            {/* Left Box */}
            <div className="w-36 lg:w-40 border border-white/20 rounded-sm p-5 text-center order-2 lg:order-1">
              <svg className="w-8 h-8 mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="#D4A574" strokeWidth="1.5">
                <circle cx="12" cy="5" r="2" />
                <path d="M10 10h4l-1 5h-2z" />
                <path d="M8 22v-6l2-2 2 6 2-6 2 2v6" />
              </svg>
              <h3 className="text-sm font-semibold leading-snug mb-3" style={{ fontFamily: 'var(--header)' }}>
                Built for<br/>Men Under<br/>Pressure
              </h3>
              <p className="text-[#D4A574] text-xs font-medium leading-relaxed">
                Sweat. Stress.<br/>Training. Long<br/>days.
              </p>
              <p className="text-white/80 text-xs leading-relaxed mt-2">
                Acne shouldn't<br/>be part of the<br/>equation.
              </p>
            </div>

            {/* Product Image */}
            <div className="flex justify-center relative flex-1 max-w-2xl order-1 lg:order-2 w-full">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-sm tracking-[0.2em] text-white/60 mb-2" style={{ fontFamily: 'var(--header)' }}>ASCEND</div>
                  <div className="text-4xl lg:text-5xl text-[#D4A574] font-bold" style={{ fontFamily: 'var(--header)' }}>3-PHASE</div>
                  <div className="text-xl text-white/80 mt-1" style={{ fontFamily: 'var(--header)' }}>SYSTEM</div>
                </div>
              </div>
            </div>

            {/* Right Box */}
            <div className="w-36 lg:w-40 border border-white/20 rounded-sm p-5 text-center order-3">
              <svg className="w-8 h-8 mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="#D4A574" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <h3 className="text-sm font-semibold leading-snug mb-3" style={{ fontFamily: 'var(--header)' }}>
                Tired of<br/>acne that<br/>never clears?
              </h3>
              <p className="text-[#D4A574] text-xs font-medium leading-relaxed">
                ASCEND<br/>shuts the<br/>acne cycle<br/>down.
              </p>
              <p className="text-white/80 text-xs leading-relaxed mt-2">
                So your skin<br/>stops holding<br/>you back.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-8 flex flex-col items-center gap-4">
          <button 
            onClick={() => { setPage('Our System'); window.scrollTo(0,0); }}
            className="btn-gold"
          >
            View the system <ArrowRight className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4 text-sm tracking-widest font-medium text-white">
            <span>PHASE I</span><span className="text-[#D4A574]">→</span>
            <span>PHASE II</span><span className="text-[#D4A574]">→</span>
            <span>PHASE III</span>
          </div>
        </FadeIn>
      </section>

      {/* Trust Badges */}
      <FadeIn>
        <div className="flex justify-center gap-8 lg:gap-12 flex-wrap px-6 py-8">
          {[
            ['⚗️', 'Formulated for Skin Under Stress.'],
            ['✓', 'Dermatologist-Recommended.'],
            ['🛡️', 'No sulfates. No parabens. No drying alcohols.']
          ].map(([icon, text], i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xl w-9 h-9 border border-white/10 rounded-full flex items-center justify-center">{icon}</span>
              <span className="text-sm font-medium">{text}</span>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Acne Protocol Section */}
      <section className="py-20 px-6 bg-black">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16 px-4">
          <h2 
            className="text-2xl sm:text-3xl lg:text-4xl tracking-widest mb-4"
            style={{ fontFamily: 'var(--header)' }}
          >
            THE MODERN-DAY ACNE PROTOCOL
          </h2>
          <p className="text-white italic text-lg">Most treatments stop short.</p>
          <p className="text-xl mt-2 mb-5">We didn't.</p>
          <p className="text-xl text-[#E8C49A]" style={{ fontFamily: 'var(--header)' }}>
            Because Acne Never Fails For Just <span className="text-2xl font-bold">ONE</span> Reason.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 max-w-[1400px] mx-auto px-6">
          {[
            { img: "https://raw.githubusercontent.com/epalmer859-source/Photos/main/acne-1%5B1%5D.png", title: "Heat, Sweat, & Occlusion", items: ["Competitive athletes", "High-volume lifters", "Labor-heavy jobs", "Prolonged workouts"] },
            { img: "https://raw.githubusercontent.com/epalmer859-source/Photos/main/acne-2%5B1%5D.png", title: "Bacteria and Inflammation", items: ["Acne that never fully clears", "Cycles of flare-ups", "Aggressive bulking phases", "Barriers compromised by irritation"] },
            { img: "https://raw.githubusercontent.com/epalmer859-source/Photos/main/acne-3%5B2%5D.png", title: "Excess Oil and Clogged Pores", items: ["Men with naturally oily skin", "Hormonal imbalances", "Breakouts that never fully clear", "Texture that never smooths out"] },
            { img: "https://raw.githubusercontent.com/epalmer859-source/Photos/main/acne-4%5B1%5D.png", title: "Redness & Irritation", items: ["Daily contact with equipment", "Repeated shaving", "Barriers weakened by overuse", "Irritation that never settles"] },
          ].map((card, i) => (
            <FadeIn key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="text-center">
                <div className="w-full mb-6">
                  <img 
                    src={card.img} 
                    alt={card.title}
                    className="w-full h-auto max-h-[400px] object-contain mx-auto"
                  />
                </div>
                <h3 className="text-xl mb-4 text-[#D4A574]" style={{ fontFamily: 'var(--header)' }}>{card.title}</h3>
                <p className="text-white/60 text-sm mb-3">Seen often in:</p>
                <ul className="list-disc pl-6 text-white/80 text-sm leading-7 mb-6 text-left">
                  {card.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
                <button 
                  onClick={() => setModalOpen(i)}
                  className="w-full btn-outline justify-center text-xs py-3"
                >
                  How ASCEND treats this problem +
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Modal */}
      {modalOpen !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={() => setModalOpen(null)}
          />
          <div 
            className="relative bg-[#0a0a0a] border border-[#D4A574]/30 rounded-lg p-8 sm:p-10 max-w-xl w-full text-left"
          >
            <button 
              onClick={() => setModalOpen(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl mb-4" style={{ fontFamily: 'var(--header)' }}>
              {modalData[modalOpen].title}
            </h3>
            <div className="gold-divider w-48 mb-6" />
            <p className="text-white leading-relaxed mb-8">
              {modalData[modalOpen].text}
            </p>
            <button 
              onClick={() => setModalOpen(null)}
              className="btn-gold mx-auto block"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* System Section */}
      <section className="section-pad">
        <FadeIn>
          <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-10 lg:gap-12 items-center">
            <div>
              <h2 
                className="text-3xl sm:text-4xl mb-3"
                style={{ fontFamily: 'var(--header)' }}
              >
                The ASCEND System.
              </h2>
              <p className="text-[#D4A574] italic text-lg mb-7">
                Three phases. One outcome. No guesswork.
              </p>
              <button 
                onClick={() => { setPage('Our Formulation'); window.scrollTo(0,0); }}
                className="btn-gold mb-5"
              >
                Explore ASCEND™ signature formulations <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-[#D4A574] text-sm italic">
                Clinically informed. System-driven. Built for long-term control.
              </p>
              <div className="flex gap-4 mt-7 text-sm tracking-widest font-medium text-white">
                <span>PHASE I</span><span className="text-[#D4A574]">→</span>
                <span>PHASE II</span><span className="text-[#D4A574]">→</span>
                <span>PHASE III</span>
              </div>
            </div>

            <div className="hidden lg:block w-px h-full bg-white/10" />

            <div className="flex justify-center gap-3">
              {['I', 'II', 'III'].map((n, i) => (
                <div 
                  key={i} 
                  className="w-28 h-56 rounded-xl border border-white/10 flex flex-col items-center justify-center p-3 text-center"
                  style={{ background: 'linear-gradient(180deg, #1a1a1a, #080808)' }}
                >
                  <div className="text-xs font-bold tracking-widest mb-1" style={{ fontFamily: 'var(--header)' }}>ASCEND</div>
                  <div className="text-base text-[#D4A574]" style={{ fontFamily: 'var(--header)' }}>Phase {n}</div>
                  <div className="text-[8px] text-white mt-auto">150ML / 5 FL OZ</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-6 bg-[var(--bg2)]">
        <FadeIn className="text-center mb-10">
          <h2 className="text-3xl mb-2" style={{ fontFamily: 'var(--header)' }}>
            What Men Are Saying
          </h2>
          <div className="flex items-center justify-center gap-3">
            <Stars count={5} />
            <span className="text-[#D4A574] text-xl font-bold">{avgRating}</span>
            <span className="text-white/70 text-sm">from {ALL_REVIEWS.length} reviews</span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {ALL_REVIEWS.slice(0, 6).map((review) => (
            <FadeIn key={review.id}>
              <div className="glass-card h-full">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <strong className="text-sm">{review.name}</strong>
                    {review.verified && (
                      <span className="text-xs text-[#D4A574] ml-2">✓ Verified</span>
                    )}
                  </div>
                  <span className="text-xs text-white/60">{review.time}</span>
                </div>
                <Stars count={review.star} />
                <p className="text-white/80 text-sm mt-3 leading-relaxed">{review.text}</p>
                <p className="text-xs text-[#D4A574] mt-3 italic">Purchased: {review.product}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="text-center mt-8">
          <button 
            onClick={() => { setPage('Reviews'); window.scrollTo(0,0); }}
            className="btn-gold"
          >
            See all {ALL_REVIEWS.length} reviews <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
