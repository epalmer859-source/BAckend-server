import { FadeIn } from '@/components/FadeIn';

const phases = [
  { 
    name: "CLEAR",
    label: "Phase I – Core Acne Cleanser",
    desc: "Remove congestion. Control Oil. Prepare the skin.",
    how: [
      "Dissolves pore-clogging oil and sweat.",
      "Clears bacteria without stripping the barrier.",
      "Prepares skin to absorb subsequent phases."
    ],
    ing: "2% Salicylic Acid",
    ingType: "Active Ingredient",
    ingDesc: "Oil-soluble BHA that penetrates pores to dissolve buildup, unclog congestion, and reduce acne."
  },
  { 
    name: "Restore",
    label: "Phase II – Barrier Preparation & Recovery",
    desc: "Restore barrier function. Replenish essential lipids. Stabilize the skin for treatment.",
    how: [
      "Rebuilds the skin barrier with skin-identical ceramides.",
      "Rehydrates and stabilizes the skin at an optimized pH.",
      "Prepares the skin to optimally absorb targeted treatment."
    ],
    ing: "Niacinamide",
    ingType: "Barrier Active",
    ingDesc: "A form of vitamin B3 that strengthens the skin barrier, controls oil, reduces redness, and helps clear breakouts."
  },
  { 
    name: "Treat",
    label: "Phase III – Final Acne Treatment",
    desc: "Target acne at its source. Normalize skin. End the cycle.",
    how: [
      "Targets acne-causing bacteria with 15% Azelaic Acid.",
      "Reduces redness and post-breakout discoloration.",
      "Regulates excess sebum and shine using Zinc PCA."
    ],
    ing: "15% Azelaic Acid",
    ingType: "Active Ingredient",
    ingDesc: "Multifunctional acid that reduces acne-causing bacteria and calms inflammation to prevent breakouts and fade post-acne marks."
  },
];

export function SystemPage() {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-36"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(212,165,116,0.06), transparent 60%)' }}
      >
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-3" style={{ fontFamily: 'var(--header)' }}>
            The ASCEND System.
          </h2>
          <p className="text-lg text-white mb-5">Three Phases. One outcome. No Guesswork.</p>
          <div className="gold-divider w-48 mb-5" />
          <p className="text-[#D4A574] italic text-base">Engineered to work in sequence. Built to lock in results.</p>
        </FadeIn>

        <FadeIn className="flex items-center gap-6 mt-12 flex-wrap justify-center">
          {['Clear', 'Restore', 'Treat'].map((phase, i) => (
            <div key={i} className="flex items-center gap-6">
              <div 
                className="px-8 py-5 rounded border border-[#D4A574] text-xl font-medium"
                style={{ 
                  animation: `glowPulse 3s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`
                }}
              >
                {phase}
                <div className="text-xs text-white mt-1">Phase {['I', 'II', 'III'][i]}</div>
              </div>
              {i < 2 && <span className="text-[#D4A574] text-2xl font-bold">»</span>}
            </div>
          ))}
        </FadeIn>
      </section>

      {/* Phase Details */}
      {phases.map((phase, i) => (
        <section 
          key={i} 
          className="py-20 px-6 border-t border-white/10"
          style={{ background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg2)' }}
        >
          {i === 2 && (
            <FadeIn className="text-center mb-12">
              <p className="text-[#D4A574] italic text-base">Phase 3 of 3. The final corrective phase of the ASCEND system.</p>
              <div className="gold-divider w-72 mt-4" />
            </FadeIn>
          )}

          <FadeIn>
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 max-w-6xl mx-auto items-start">
              <div>
                <h2 
                  className="text-5xl sm:text-6xl mb-2 tracking-widest"
                  style={{ fontFamily: i === 0 ? 'var(--header)' : 'serif' }}
                >
                  {phase.name}
                </h2>
                <h3 className="text-xl font-normal mb-3" style={{ fontFamily: 'var(--header)' }}>
                  {phase.label}
                </h3>
                <p className="text-white text-base mb-6">{phase.desc}</p>
                <div className="gold-divider w-48 mb-6" />
                <h4 className="text-[#D4A574] italic text-base mb-4">How it works</h4>
                <ul className="list-disc pl-5 text-white/80 text-base leading-8">
                  {phase.how.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              </div>

              <div className="glass-card lg:sticky lg:top-28">
                <div className="text-center text-[#D4A574] text-sm font-semibold mb-3 tracking-wide">
                  {phase.ingType}
                </div>
                <div className="text-center text-2xl font-bold mb-4">{phase.ing}</div>
                <div 
                  className="h-44 rounded-lg border border-white/10 mb-4 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #1a1a1a, #0d0d0d)' }}
                >
                  <span className="text-5xl opacity-10 font-bold" style={{ fontFamily: 'var(--header)' }}>
                    {phase.ing[0]}
                  </span>
                </div>
                <p className="text-white text-sm text-center leading-relaxed">{phase.ingDesc}</p>
                <div className="flex justify-center gap-1.5 mt-4">
                  {[0, 1, 2, 3, 4].map((d) => (
                    <div 
                      key={d} 
                      className={`w-2 h-2 rounded-full ${d === 0 ? 'bg-white' : 'bg-white/20'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
      ))}
    </div>
  );
}
