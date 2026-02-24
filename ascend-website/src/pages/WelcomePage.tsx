import { useState } from 'react';
import { FadeIn } from '@/components/FadeIn';
import { ArrowRight, Check } from 'lucide-react';

interface WelcomePageProps {
  setPage: (page: string) => void;
}

export function WelcomePage({ setPage }: WelcomePageProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)' }}
      >
        {/* Background Glow */}
        <div 
          className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
          style={{ 
            background: 'radial-gradient(ellipse, rgba(212,165,116,0.08) 0%, transparent 60%)',
            filter: 'blur(80px)'
          }}
        />

        {/* Floating Particles */}
        <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-[#D4A574] rounded-full opacity-30 animate-pulse" />
        <div className="absolute top-[35%] right-[20%] w-1.5 h-1.5 bg-[#D4A574] rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[25%] left-[25%] w-1 h-1 bg-[#D4A574] rounded-full opacity-25 animate-pulse" style={{ animationDelay: '0.5s' }} />

        <FadeIn>
          {/* Logo */}
          <div 
            className="text-sm tracking-[0.3em] text-[#D4A574] mb-16"
            style={{ fontFamily: 'var(--header)' }}
          >
            ASCEND
          </div>

          {/* Main Headline */}
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl text-center mb-4 leading-tight"
            style={{ fontFamily: 'var(--header)' }}
          >
            Clear Skin Is
            <br />
            <span className="text-[#D4A574]">Closer Than You Think</span>
          </h1>

          <p className="text-lg text-white/70 text-center max-w-lg mb-12 leading-relaxed">
            Clinical-grade acne control engineered for men who perform. No compromises.
          </p>
        </FadeIn>

        {/* Offer Card */}
        <FadeIn className="w-full max-w-md">
          {!submitted ? (
            <div 
              className="p-8 sm:p-10 rounded-2xl"
              style={{ 
                background: 'linear-gradient(145deg, rgba(212,165,116,0.1), rgba(0,0,0,0.6))',
                border: '1px solid rgba(212,165,116,0.3)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(212,165,116,0.1)'
              }}
            >
              {/* Badge */}
              <div 
                className="inline-block bg-[#D4A574] text-black text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-wider"
              >
                LIMITED TIME OFFER
              </div>

              <h2 className="text-2xl sm:text-3xl mb-2" style={{ fontFamily: 'var(--header)' }}>
                Get $10 Off Your First Order
              </h2>

              <p className="text-white/60 text-sm mb-7 leading-relaxed">
                Enter your email to receive your exclusive discount code. Valid on any purchase over $30.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="flex gap-3 mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1"
                  />
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-[#D4A574] text-black font-semibold rounded-lg hover:bg-[#E8C49A] transition-colors whitespace-nowrap text-sm"
                    style={{ fontFamily: 'var(--header)' }}
                  >
                    Get Code <ArrowRight className="w-4 h-4 inline ml-1" />
                  </button>
                </div>
              </form>

              <p className="text-white/40 text-xs text-center">
                No spam. Unsubscribe anytime. Code sent instantly.
              </p>
            </div>
          ) : (
            <div 
              className="p-10 sm:p-12 rounded-2xl text-center"
              style={{ 
                background: 'linear-gradient(145deg, rgba(212,165,116,0.15), rgba(0,0,0,0.6))',
                border: '1px solid rgba(212,165,116,0.4)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 60px rgba(212,165,116,0.15)'
              }}
            >
              {/* Success Icon */}
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl"
                style={{ 
                  background: 'linear-gradient(145deg, rgba(212,165,116,0.2), rgba(212,165,116,0.05))',
                  border: '2px solid #D4A574'
                }}
              >
                <Check className="w-8 h-8 text-[#D4A574]" />
              </div>

              <h2 className="text-2xl mb-3" style={{ fontFamily: 'var(--header)' }}>
                Your Code Is Ready!
              </h2>

              <div 
                className="p-5 rounded-lg mb-6"
                style={{ background: 'rgba(0,0,0,0.4)', border: '2px dashed #D4A574' }}
              >
                <div 
                  className="text-3xl tracking-widest text-[#D4A574] font-bold"
                  style={{ fontFamily: 'var(--header)' }}
                >
                  WELCOME10
                </div>
                <p className="text-white/50 text-xs mt-2">
                  $10 off your first purchase of $30+
                </p>
              </div>

              <button 
                onClick={() => setPage('Home')}
                className="w-full py-4 bg-[#D4A574] text-black font-semibold rounded-lg hover:bg-[#E8C49A] transition-colors"
                style={{ fontFamily: 'var(--header)' }}
              >
                Shop Now <ArrowRight className="w-5 h-5 inline ml-2" />
              </button>
            </div>
          )}
        </FadeIn>

        {/* Skip Link */}
        <FadeIn className="mt-8">
          <button 
            onClick={() => setPage('Home')}
            className="text-white/40 hover:text-[#D4A574] transition-colors text-sm"
          >
            Continue without code →
          </button>
        </FadeIn>
      </section>

      {/* Features Bar */}
      <section className="py-10 px-6 bg-[var(--bg2)] border-t border-white/10">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 sm:gap-16">
          {[
            { icon: '🧪', text: 'Dermatologist Tested' },
            { icon: '🐰', text: 'Cruelty Free' },
            { icon: '🇺🇸', text: 'Made in USA' },
            { icon: '↩️', text: '30-Day Guarantee' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm text-white/70">{item.text}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
