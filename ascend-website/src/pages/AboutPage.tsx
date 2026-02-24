import { FadeIn } from '@/components/FadeIn';
import { CheckIcon, XIcon } from '@/components/Icons';
import { ArrowRight, Droplets, Bug, Shield, Zap, Droplet } from 'lucide-react';

interface AboutPageProps {
  setPage: (page: string) => void;
}

const pillars = [
  { label: "OIL\nREGULATION", num: "01" },
  { label: "BACTERIA\nCONTROL", num: "02" },
  { label: "BARRIER\nREPAIR", num: "03" },
  { label: "INFLAMMATION\nCONTROL", num: "04" },
  { label: "SWEAT &\nFRICTION MGMT", num: "05" },
];

const comparisonData = [
  ["Excess Oil", false, true],
  ["Clogged Pores", true, true],
  ["Bacteria Buildup", true, true],
  ["Inflammation", false, true],
  ["Barrier Damage", false, true],
  ["Sweat + Friction", false, true]
];

export function AboutPage({ setPage }: AboutPageProps) {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-36 relative"
        style={{ 
          background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 100%), url(https://raw.githubusercontent.com/epalmer859-source/Photos/main/about-bg%5B1%5D.png) center/cover no-repeat'
        }}
      >
        <FadeIn>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal mb-2" style={{ fontFamily: 'var(--header)' }}>
            Clear skin.
          </h1>
          <p className="text-2xl sm:text-3xl lg:text-4xl text-[#D4A574] italic" style={{ fontFamily: 'var(--header)' }}>
            It's closer than you think.
          </p>
        </FadeIn>

        <FadeIn className="mt-20 max-w-2xl relative z-10">
          <p className="text-lg italic leading-relaxed">
            Our team analyzed acne at the minute level — <span className="underline text-[#D4A574]">identifying</span> the exact chain of events that leads to breakouts.
          </p>
        </FadeIn>
      </section>

      {/* System Architecture Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Background Effects */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 30% 20%, rgba(212,165,116,0.04) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(212,165,116,0.03) 0%, transparent 40%)'
          }}
        />
        <div className="absolute top-0 left-[10%] w-px h-full bg-gradient-to-b from-transparent via-[#D4A574]/10 to-transparent" />
        <div className="absolute top-0 right-[10%] w-px h-full bg-gradient-to-b from-transparent via-[#D4A574]/10 to-transparent" />
        <div className="absolute top-[30%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4A574]/5 to-transparent" />

        {/* Side Stats */}
        <div className="absolute left-[5%] top-1/2 -translate-y-1/2 text-left hidden lg:block">
          {[
            ['3', 'PHASES'],
            ['5', 'COMMON STRESSORS'],
            ['1', 'OUTCOME']
          ].map(([num, label], i) => (
            <div key={i} className="mb-10">
              <div className="text-4xl font-bold text-[#D4A574] tracking-wide" style={{ fontFamily: 'var(--header)' }}>{num}</div>
              <div className="text-xs tracking-widest text-white/50 mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Key Actives */}
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 text-right hidden lg:block">
          <div className="text-xs tracking-widest text-white/40 mb-5">KEY ACTIVES</div>
          {['Salicylic Acid', 'Sulfur Complex', 'Azelaic Acid', 'Zinc PCA'].map((active, i) => (
            <div 
              key={i} 
              className="mb-4 px-4 py-2.5 rounded border border-[#D4A574]/20"
              style={{ background: 'rgba(212,165,116,0.05)' }}
            >
              <div className="text-sm font-medium text-white">{active}</div>
            </div>
          ))}
        </div>

        <FadeIn className="relative z-10 text-center">
          <h2 
            className="text-3xl sm:text-4xl tracking-widest mb-3"
            style={{ fontFamily: 'var(--header)' }}
          >
            System Architecture
          </h2>
          <p className="text-[#D4A574] text-base italic mb-5">Five pillars. One integrated approach.</p>

          {/* Phase Flow */}
          <div className="flex items-center justify-center gap-2 mb-12 text-xs tracking-widest text-white/40">
            <span>PHASE I</span>
            <span className="text-[#D4A574]">→</span>
            <span>PHASE II</span>
            <span className="text-[#D4A574]">→</span>
            <span>PHASE III</span>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Clear Skin Result */}
            <div className="relative inline-block mb-12">
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-20"
                style={{ 
                  background: 'radial-gradient(ellipse, rgba(212,165,116,0.15) 0%, transparent 70%)',
                  filter: 'blur(20px)'
                }}
              />
              <div 
                className="relative px-16 py-7 rounded-lg border border-[#D4A574]/50"
                style={{ 
                  background: 'linear-gradient(145deg, rgba(212,165,116,0.12), rgba(212,165,116,0.03))',
                  boxShadow: '0 8px 32px rgba(212,165,116,0.15), inset 0 1px 0 rgba(255,255,255,0.05)'
                }}
              >
                <span className="text-2xl tracking-widest font-semibold" style={{ fontFamily: 'var(--header)' }}>CLEAR SKIN</span>
              </div>
            </div>

            {/* Connector */}
            <div className="absolute left-1/2 top-20 w-0.5 h-12 -translate-x-1/2 bg-gradient-to-b from-[#D4A574] to-[#D4A574]/20">
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#D4A574]" />
              <div className="absolute top-11 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#D4A574]" />
            </div>

            {/* Five Pillars */}
            <div className="flex justify-center gap-4 flex-wrap mb-12 relative mt-8">
              <div className="absolute top-7 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#D4A574]/15 to-transparent" />
              
              {pillars.map((pillar, i) => (
                <div key={i} className="flex flex-col items-center gap-3.5 relative">
                  <div className="absolute -top-2.5 -right-2.5 text-[9px] font-semibold text-[#D4A574]/50 tracking-wider">
                    {pillar.num}
                  </div>
                  <div 
                    className="w-13 h-13 rounded-full border-2 border-[#D4A574] flex items-center justify-center"
                    style={{ 
                      background: '#000',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 8px rgba(212,165,116,0.15)'
                    }}
                  >
                    {[
                      <Droplets key={0} className="w-5 h-5 text-[#D4A574]" />,
                      <Bug key={1} className="w-5 h-5 text-[#D4A574]" />,
                      <Shield key={2} className="w-5 h-5 text-[#D4A574]" />,
                      <Zap key={3} className="w-5 h-5 text-[#D4A574]" />,
                      <Droplet key={4} className="w-5 h-5 text-[#D4A574]" />
                    ][i]}
                  </div>
                  <div 
                    className="px-4 py-4 rounded-md text-xs tracking-wider font-medium whitespace-pre-line text-center min-w-[130px] leading-relaxed relative border border-white/10"
                    style={{ 
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#D4A574]/30" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#D4A574]/30" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#D4A574]/30" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#D4A574]/30" />
                    {pillar.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Connector */}
            <div className="relative h-12 mb-0">
              <div className="absolute left-1/2 top-0 w-0.5 h-12 -translate-x-1/2 bg-gradient-to-b from-[#D4A574]/30 to-[#D4A574]">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#D4A574]" />
              </div>
            </div>

            {/* The Ascend System */}
            <div className="relative inline-block">
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-24"
                style={{ 
                  background: 'radial-gradient(ellipse, rgba(212,165,116,0.2) 0%, transparent 70%)',
                  filter: 'blur(25px)'
                }}
              />
              <button 
                onClick={() => { setPage('Our System'); window.scrollTo(0,0); }}
                className="relative px-20 py-7 rounded-lg border border-[#D4A574]/60 hover:border-[#D4A574] hover:-translate-y-0.5 transition-all"
                style={{ 
                  background: 'linear-gradient(145deg, rgba(212,165,116,0.2), rgba(212,165,116,0.05))',
                  boxShadow: '0 12px 50px rgba(212,165,116,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
              >
                <span className="text-xl tracking-widest font-semibold" style={{ fontFamily: 'var(--header)' }}>THE ASCEND SYSTEM</span>
                <span className="block text-xs text-[#D4A574] mt-2.5 tracking-widest">Click to explore →</span>
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Reality Check Section */}
      <section className="section-pad bg-[var(--bg2)]">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl tracking-widest mb-3" style={{ fontFamily: 'var(--header)' }}>
            REALITY CHECK
          </h2>
          <p className="text-base text-white">Most brands fix symptoms. ASCEND controls variables.</p>
        </FadeIn>

        <FadeIn>
          <div className="max-w-2xl mx-auto rounded-xl overflow-hidden border border-white/10">
            <div className="grid grid-cols-3 bg-white/5">
              <div className="p-4 text-sm font-bold tracking-widest italic">VARIABLE</div>
              <div className="p-4 text-sm font-bold text-center">MOST BRANDS</div>
              <div className="p-4 text-sm font-bold text-center text-[#D4A574]">ASCEND</div>
            </div>
            {comparisonData.map(([label, brand], i) => (
              <div key={i} className="grid grid-cols-3 border-t border-white/10">
                <div className="p-3.5 text-sm">• {label as string}</div>
                <div className="p-3.5 flex justify-center">
                  {brand ? <CheckIcon /> : <XIcon />}
                </div>
                <div className="p-3.5 flex justify-center">
                  <CheckIcon />
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* CTA Section */}
      <section className="section-pad">
        <FadeIn>
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 
                className="text-2xl sm:text-3xl lg:text-4xl leading-snug mb-5"
                style={{ fontFamily: 'var(--header)' }}
              >
                <span className="text-[#D4A574]">ASCEND</span> was engineered for a specific <span className="text-[#D4A574]">breed of man.</span>
              </h2>
              <p className="text-base text-white mb-7">
                Not universal. Not diluted. <span className="text-[#D4A574]">Built to perform.</span>
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => { setPage('Shop'); window.scrollTo(0,0); }}
                  className="btn-outline w-fit"
                >
                  See if you're a fit
                </button>
                <button 
                  onClick={() => { setPage('Our System'); window.scrollTo(0,0); }}
                  className="btn-outline w-fit"
                >
                  Learn How It Works <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div 
              className="h-96 rounded-xl border border-white/10 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1a1a1a, #0a0a0a)' }}
            >
              <span className="text-8xl opacity-[0.08] font-bold" style={{ fontFamily: 'var(--header)' }}>A</span>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
