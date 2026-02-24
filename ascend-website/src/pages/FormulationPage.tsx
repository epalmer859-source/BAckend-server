import { FadeIn } from '@/components/FadeIn';

const phases = [
  { 
    num: "Phase I",
    sub: "The controlled foundation of the ASCEND™ system.",
    left: {
      title: "ENGINEERED. NOT IMPROVISED.",
      items: [
        "Function-first actives selected for predictable performance.",
        "Blended with barrier-compatible humectants to regulate hydration.",
        "pH-engineered for stability and skin compatibility."
      ]
    },
    right: {
      title: "WHY THIS WORKS.",
      items: [
        "Cleans deep without wrecking your skin barrier.",
        "Stops the cycle of dryness, irritation, and over-oil production.",
        "Shuts down acne at the source instead of chasing symptoms."
      ]
    },
    complex: "ASCEND™ Active Complex",
    complexBullets: "Targets pores without barrier damage • No flaking • No rebound oil • No guesswork",
    ings: [
      {
        name: "Salicylic Acid",
        sub: "Targeted Pore Corrector",
        desc: "ASCEND™ refines salicylic acid through deliberate formulation and controlled delivery to achieve consistent pore correction without irritation."
      },
      {
        name: "Sulfur",
        sub: "Strategic Oil Regulation & Antibacterial",
        desc: "ASCEND™ selects high-purity sulfur and precisely controls its integration to harmonize oil production while addressing acne's bacterial environment without overwhelming the skin barrier."
      }
    ]
  },
  { 
    num: "Phase II",
    sub: "Repair the Barrier. Lock the Results.",
    left: {
      title: "BUILT FOR REPAIR. NOT TEMPORARY RELIEF",
      items: [
        "Skin-identical ceramide complex rebuilds surface lipid structure.",
        "5% Niacinamide stabilizes the barrier post-correction.",
        "Balanced with multiple humectants and soothing agents."
      ]
    },
    right: {
      title: "WHY THIS WORKS",
      items: [
        "Restores moisture balance so oil production stays in check.",
        "Stabilizes the skin barrier to enhance Phase III effectiveness.",
        "Prevents acne from restarting once correction begins."
      ]
    },
    complex: "ASCEND™ Triple Lipid Matrix",
    complexBullets: "Non-occlusive recovery • Reinforces the barrier • Results, preserved. • No sensitivity rebound",
    ings: [
      {
        name: "Ceramide-Complex",
        sub: "Structural Barrier Restoration",
        desc: "ASCEND™ engineers a ceramide complex designed to reinforce the skin barrier through targeted lipid restoration and controlled hydration retention."
      },
      {
        name: "Purified Niacinamide",
        sub: "Oil Control & Skin Clarity",
        desc: "ASCEND™ utilizes purified niacinamide to regulate excess oil while refining tone and texture. Integrated for cellular balance, it improves clarity and pore appearance without compromising barrier stability."
      }
    ]
  },
  { 
    num: "Phase III",
    sub: "Precision treatment. Results secured.",
    left: {
      title: "TREATMENT-LEVEL CORRECTION",
      items: [
        "15% Azelaic Acid delivered at clinical treatment concentration.",
        "Actively reduces acne lesions, redness, and uneven tone.",
        "Zinc PCA regulates sebum during treatment exposure.",
        "Non-oxidative antibacterial system for consistent correction."
      ]
    },
    right: {
      title: "WHY THIS WORKS.",
      items: [
        "Eliminates bacteria without irritation or barrier breakdown.",
        "Selected over benzoyl peroxide to preserve skin stability.",
        "Reduces inflammation and visible redness during active treatment."
      ]
    },
    complex: "ASCEND™ Azelaic System",
    complexBullets: "Active acne corrected • Visible redness reduced during treatment • Oil production controlled • No purging",
    ings: [
      {
        name: "Azelaic Acid",
        sub: "Clinical Treatment Active",
        desc: "ASCEND™ uses treatment-level azelaic acid to correct active acne while reducing redness and inflammation. Non-oxidative antibacterial control delivers consistent results without purging or irritation."
      },
      {
        name: "Zinc PCA",
        sub: "Sebum Control & Treatment Stabilization",
        desc: "ASCEND™ incorporates Zinc PCA to support antimicrobial control during active treatment. By helping limit bacterial activity and inflammatory signaling, Zinc PCA complements azelaic acid and helps maintain a stable treatment environment."
      }
    ]
  },
];

export function FormulationPage() {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="pt-36 pb-16 px-6 text-center"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(212,165,116,0.04), transparent 50%)' }}
      >
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-2" style={{ fontFamily: 'var(--header)' }}>
            Inside the Formulation
          </h2>
          <p className="text-[#D4A574] italic text-lg">
            A phase-by-phase look at each signature formulation
          </p>
        </FadeIn>
      </section>

      {/* Phase Sections */}
      {phases.map((phase, i) => (
        <section 
          key={i} 
          className="py-16 px-6 border-t border-white/10"
          style={{ background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg2)' }}
        >
          <FadeIn className="text-center max-w-4xl mx-auto mb-10">
            <h2 className="text-4xl mb-2" style={{ fontFamily: 'var(--header)' }}>{phase.num}</h2>
            <p className="text-[#D4A574] italic text-base">{phase.sub}</p>
            <div className="gold-divider w-72 mt-5" />
          </FadeIn>

          <FadeIn>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
              {[phase.left, phase.right].map((card, j) => (
                <div key={j} className="glass-card">
                  <h4 className="text-[#D4A574] text-sm tracking-widest font-bold mb-4">
                    {card.title}
                  </h4>
                  <ul className="list-disc pl-5 text-white/80 text-sm leading-7">
                    {card.items.map((item, k) => <li key={k}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="text-center max-w-4xl mx-auto mb-10">
            <div className="gold-divider w-full mb-5" />
            <h3 className="text-[#D4A574] italic text-xl mb-2" style={{ fontFamily: 'var(--header)' }}>
              {phase.complex}
            </h3>
            <p className="text-white text-sm">{phase.complexBullets}</p>
            <div className="gold-divider w-full mt-5" />
          </FadeIn>

          <FadeIn>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {phase.ings.map((ing, j) => (
                <div key={j} className="glass-card">
                  <h3 className="text-2xl mb-1" style={{ fontFamily: 'var(--header)' }}>{ing.name}</h3>
                  <p className="text-white text-sm mb-3">{ing.sub}</p>
                  <div className="gold-divider w-20 mb-4" />
                  <p className="text-white/80 text-sm leading-relaxed mb-4">{ing.desc}</p>
                  <div 
                    className="h-36 rounded-lg border border-white/10 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #151515, #0a0a0a)' }}
                  >
                    <span className="text-5xl opacity-[0.08] font-bold" style={{ fontFamily: 'var(--header)' }}>
                      {ing.name[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>
      ))}

      {/* Closing Statement */}
      <FadeIn className="text-center py-16 px-6">
        <p className="text-[#D4A574] italic text-xl" style={{ fontFamily: 'var(--header)' }}>
          Every phase engineered with purpose. Every ingredient chosen to finish the job.
        </p>
      </FadeIn>
    </div>
  );
}
