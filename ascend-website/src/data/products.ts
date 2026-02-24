import type { Product, Review } from '@/types';

const firstNames = ["Jake","Marcus","Tyler","Derek","Brandon","Chris","Alex","Jordan","Ryan","Kyle","Damon","Andre","Leo","Nate","Cole","Ethan","Malik","Trevor","Jace","Dominic","Isaiah","Hunter","Caleb","Omar","Miles","Aiden","Bryce","Gavin","Trent","Victor","Sean","Mason","Elijah","Landon","Dante","Kai","Zane","Micah","Jaylen","Colton","Tristan","Xavier","Brooks","Griffin","Roman","Nash","Easton","Reid","Beckett","Cash","Knox","Barrett","Jensen","Crew","Kyler","Hank","Nico","Grant","Shane","Brock","Lance","Darius","Tyrone","DeShawn","Jamal","Rashid","Kenji","Diego","Carlos","Rico","Pavel","Sven","Finn","Rowan","Ellis","Ashton","Logan","Carson","Dalton","Wyatt","Cody","Brett","Clay","Drew","Wade","Blake","Chase","Max","Ty","Cruz","Phoenix","Atlas","Axel","Orion","Hugo","Felix","Oscar","Rhett","Beau","Jude","Sterling"];
const lastInitials = "ABCDEFGHIJKLMNOPRSTUVWZ".split("");
const productsList = ["Phase I","Phase II","Phase III","The Full System"];
const timeAgo = ["2 days ago","3 days ago","1 week ago","2 weeks ago","3 weeks ago","1 month ago","5 weeks ago","6 weeks ago","2 months ago","3 months ago","4 months ago","5 months ago","6 months ago","7 months ago","8 months ago","9 months ago","10 months ago","11 months ago","1 year ago"];

const reviewTemplates: Record<number, string[]> = {
  5: [
    "This system actually works. My skin hasn't been this clear since high school.",
    "Used every product out there. ASCEND is the only one that stuck.",
    "Two weeks in and I'm already seeing a difference. Legit.",
    "I train 6 days a week and my skin was wrecked. Phase I alone changed the game.",
    "Finally something that doesn't dry my face out while actually clearing acne.",
    "The three-phase approach makes so much sense. My skin looks better every week.",
    "Bought this for my acne from wearing a football helmet. Night and day difference.",
    "Skeptical at first but the results speak for themselves. Clear skin, no irritation.",
    "My barber noticed the difference before I did. That says everything.",
    "Was spending $200/month on random products. This system replaced all of them.",
    "Phase III is the real MVP. Redness gone in under a month.",
    "I work construction — sweat, dirt, sun. My skin has never been this controlled.",
    "Stopped getting those deep cystic ones on my jawline. Nothing else did that.",
    "Girl at the gym asked what I use for my skin. That's never happened before.",
    "The cleanser doesn't strip your face like benzoyl peroxide. Way better approach.",
    "Had acne for 12 years. This is the first thing that actually addressed all of it.",
    "No flaking, no dryness, no rebound breakouts. Just steady improvement.",
    "Ordered for my son who's 19. His confidence is through the roof now.",
    "I'm a personal trainer and I recommend this to every client who asks.",
    "Three months in — zero active breakouts. I didn't think that was possible for me.",
    "The barrier repair phase is genius. My skin feels completely different.",
    "Azelaic acid > benzoyl peroxide. Wish I knew this years ago.",
    "My acne was hormonal from TRT. This system controlled it without going off cycle.",
    "Clean ingredients, no BS fragrance, actually works. What more do you need.",
    "Was about to go on Accutane. Tried this first. Glad I did.",
    "Texture on my forehead is finally smooth. The salicylic acid in Phase I is dialed in.",
    "Niacinamide in Phase II calmed my redness down like nothing else.",
    "I play D1 lacrosse and my helmet breakouts are basically gone.",
    "Best skincare purchase I've ever made. Not even close.",
    "The system approach is what separates this from everything else on the market.",
    "Post-acne marks fading faster than I expected. Phase III delivers.",
    "Oil control is insane. I used to be shiny by noon. Not anymore.",
    "My dermatologist was impressed with the formulation. That sealed it for me.",
    "Runs out slow too. 5 oz bottles last me almost 2 months each.",
    "Simple routine, real results. Three steps, done. No 10-step routine needed.",
    "Back acne from lifting is clearing up. Using it on face and back.",
    "The fact that it's sulfate-free and still cleans this well is impressive.",
    "Zinc PCA in Phase III keeps oil in check all day. Game changer for oily skin.",
    "Recommended by my wrestling coach. Half the team uses it now.",
    "Dark spots from old breakouts are fading. Didn't expect that bonus.",
  ],
  4: [
    "Really solid system. Takes about 3-4 weeks to see full results but worth the wait.",
    "Great products. Wish the bottles were slightly bigger but the quality is there.",
    "Phase I and III are amazing. Phase II is good but I'd like more hydration.",
    "Works well for my acne but shipping took a bit longer than expected.",
    "Very effective. Only reason for 4 stars is I wish they had a SPF option too.",
    "Good stuff. The cleanser is my favorite — leaves skin clean without that tight feeling.",
    "Solid results after 6 weeks. Not overnight but the improvement is real and lasting.",
    "Love the system concept. Price is fair for what you get. Would buy again.",
    "Phase III stings slightly on open acne for a few seconds but it works incredibly well.",
    "My skin is 80% clearer after 2 months. Working on that last 20%.",
    "Good formulations. The packaging could be more premium but the product inside is A+.",
    "Effective and simple. I just wish they shipped to Canada faster.",
    "Impressed with the ingredient list. Clinical grade stuff without the prescription.",
    "Does what it says. My only note is I go through Phase I faster than the others.",
    "Cleared most of my acne. A few stubborn spots remain but massive improvement overall.",
  ],
  3: [
    "Decent products. Working slowly for me but I have pretty severe acne.",
    "Good cleanser, average moisturizer, great treatment. Mixed bag but net positive.",
    "Takes a while to see results. About 6 weeks before I noticed real change.",
    "Works on my face but hasn't done much for my back acne yet. Continuing to use.",
    "Solid ingredients but I expected faster results based on the marketing.",
  ],
};

function generateReviews(count: number): Review[] {
  const reviews: Review[] = [];
  for (let i = 0; i < count; i++) {
    let star: number;
    const rand = Math.random();
    if (rand < 0.65) star = 5;
    else if (rand < 0.88) star = 4;
    else star = 3;
    const templates = reviewTemplates[star];
    const text = templates[Math.floor(Math.random() * templates.length)];
    const name = firstNames[Math.floor(Math.random() * firstNames.length)];
    const initial = lastInitials[Math.floor(Math.random() * lastInitials.length)];
    const product = productsList[Math.floor(Math.random() * productsList.length)];
    const time = timeAgo[Math.floor(Math.random() * timeAgo.length)];
    reviews.push({ id: i, name: `${name} ${initial}.`, star, text, product, time, verified: Math.random() > 0.1 });
  }
  return reviews;
}

export const ALL_REVIEWS = generateReviews(500);

export const products: Product[] = [
  {
    id: 1,
    name: "Phase I — Core Acne Cleanser",
    shortName: "Phase I",
    tagline: "The Foundation of Clear Skin",
    price: 27,
    subscriptionPrice: 23,
    size: "150ML / 5 FL OZ",
    sub: "ASCEND™ Active Complex",
    desc: "Deep pore cleansing with 2% Salicylic Acid and Sulfur Complex. The essential first step that removes congestion, controls oil, and prepares your skin for the complete ASCEND system.",
    heroGradient: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)",
    badge: undefined,
    subscriptionEligible: true,
    subscriptionInterval: 5,
    keyBenefits: [
      { icon: "🧪", title: "2% Salicylic Acid", desc: "Oil-soluble BHA penetrates deep into pores to dissolve buildup and unclog congestion" },
      { icon: "⚡", title: "Sulfur Complex", desc: "Regulates oil production while creating an environment where acne bacteria cannot thrive" },
      { icon: "🛡️", title: "Barrier-Safe", desc: "Cleans deep without stripping your skin's natural protective barrier" },
      { icon: "🎯", title: "pH-Optimized", desc: "Engineered at the optimal pH for maximum efficacy without irritation" }
    ],
    howToUse: {
      steps: [
        "Wet face with lukewarm water",
        "Dispense a dime-sized amount into palm",
        "Massage onto face in circular motions for 60 seconds",
        "Rinse thoroughly and pat dry",
        "Use morning and evening"
      ],
      tip: "For best results, follow immediately with Phase II within 60 seconds while skin is still receptive."
    },
    fullIngredients: "Water (Aqua), Sodium C14-16 Olefin Sulfonate, Cocamidopropyl Betaine, Salicylic Acid (2%), Colloidal Sulfur, Glycerin, Niacinamide, Panthenol, Allantoin, Aloe Barbadensis Leaf Juice, Camellia Sinensis Leaf Extract, Hamamelis Virginiana (Witch Hazel) Water, Sodium Hyaluronate, Zinc PCA, Tocopheryl Acetate, Phenoxyethanol, Ethylhexylglycerin, Citric Acid, Sodium Hydroxide.",
    keyActives: [
      { name: "Salicylic Acid", percent: "2%", desc: "Beta hydroxy acid that exfoliates inside pores, dissolves sebum, and prevents future breakouts" },
      { name: "Colloidal Sulfur", percent: "3%", desc: "Natural antimicrobial that reduces acne-causing bacteria and absorbs excess oil" },
      { name: "Niacinamide", percent: "2%", desc: "Vitamin B3 that strengthens barrier function and reduces inflammation" },
      { name: "Zinc PCA", percent: "1%", desc: "Sebum-regulating compound with natural antibacterial properties" }
    ],
    results: {
      timeline: [
        { week: "Week 1", result: "Reduced surface oil, cleaner feeling skin" },
        { week: "Week 2", result: "Visible reduction in active breakouts" },
        { week: "Week 4", result: "Smoother texture, fewer new blemishes" },
        { week: "Week 8", result: "Significantly clearer, more balanced skin" }
      ],
      stat: "87%",
      statLabel: "saw clearer skin in 4 weeks"
    },
    reviews: ALL_REVIEWS.filter(r => r.product === "Phase I"),
    avgRating: "4.8",
    related: [2, 3, 4]
  },
  {
    id: 2,
    name: "Phase II — Barrier Preparation",
    shortName: "Phase II",
    tagline: "Repair. Restore. Lock In Results.",
    price: 27,
    subscriptionPrice: 23,
    size: "150ML / 5 FL OZ",
    sub: "ASCEND™ Triple Lipid Matrix",
    desc: "Barrier-repair moisturizer with three essential ceramides and 5% Niacinamide. Stabilizes skin after cleansing, rebuilds the lipid barrier, and prepares your skin for Phase III treatment.",
    heroGradient: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)",
    badge: undefined,
    subscriptionEligible: true,
    subscriptionInterval: 5,
    keyBenefits: [
      { icon: "🔬", title: "Triple Ceramide Complex", desc: "Ceramides 1, 3, and 6-II restore your skin's natural protective barrier" },
      { icon: "💧", title: "5% Niacinamide", desc: "Clinical concentration for oil control, pore refinement, and barrier support" },
      { icon: "🔄", title: "Phase Bridge Technology", desc: "Optimizes skin to receive maximum benefit from Phase III treatment" },
      { icon: "⏱️", title: "24-Hour Hydration", desc: "Non-greasy moisture that lasts all day without clogging pores" }
    ],
    howToUse: {
      steps: [
        "Apply to clean, dry skin after Phase I",
        "Use 2-3 pumps for full face coverage",
        "Gently press into skin, don't rub",
        "Allow 60 seconds to absorb",
        "Follow with Phase III treatment"
      ],
      tip: "Can be used alone on off-days or when skin needs extra recovery time."
    },
    fullIngredients: "Water (Aqua), Glycerin, Niacinamide (5%), Caprylic/Capric Triglyceride, Cetearyl Alcohol, Ceramide NP, Ceramide AP, Ceramide EOP, Carbomer, Dimethicone, Ceteareth-20, Sodium Polyacrylate, Sodium Lauroyl Lactylate, Cholesterol, Phenoxyethanol, Disodium EDTA, Dipotassium Glycyrrhizate, Tocopheryl Acetate, Xanthan Gum, Phytosphingosine, Ethylhexylglycerin, Sodium Hyaluronate, Panthenol, Allantoin.",
    keyActives: [
      { name: "Niacinamide", percent: "5%", desc: "Clinical-grade vitamin B3 reduces oil production, minimizes pores, and strengthens barrier" },
      { name: "Ceramide Complex", percent: "1%", desc: "Three essential ceramides (1, 3, 6-II) rebuild the skin's lipid barrier" },
      { name: "Hyaluronic Acid", percent: "0.5%", desc: "Holds 1000x its weight in water for deep, lasting hydration" },
      { name: "Phytosphingosine", percent: "0.2%", desc: "Naturally occurring lipid that reinforces barrier function" }
    ],
    results: {
      timeline: [
        { week: "Week 1", result: "Softer, more comfortable skin" },
        { week: "Week 2", result: "Reduced redness and irritation" },
        { week: "Week 4", result: "Balanced oil production, smaller pores" },
        { week: "Week 8", result: "Resilient, healthy-looking skin barrier" }
      ],
      stat: "92%",
      statLabel: "reported improved skin texture"
    },
    reviews: ALL_REVIEWS.filter(r => r.product === "Phase II"),
    avgRating: "4.9",
    related: [1, 3, 4]
  },
  {
    id: 3,
    name: "Phase III — Final Acne Treatment",
    shortName: "Phase III",
    tagline: "The Treatment That Finishes The Job.",
    price: 27,
    subscriptionPrice: 23,
    size: "150ML / 5 FL OZ",
    sub: "ASCEND™ Azelaic System",
    desc: "Clinical-strength treatment with 15% Azelaic Acid and Zinc PCA. The final corrective phase that targets active acne, reduces post-breakout marks, and prevents future breakouts.",
    heroGradient: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)",
    badge: undefined,
    subscriptionEligible: true,
    subscriptionInterval: 5,
    keyBenefits: [
      { icon: "🎯", title: "15% Azelaic Acid", desc: "Treatment-level concentration for maximum acne-fighting power" },
      { icon: "✨", title: "Mark Fading", desc: "Reduces post-acne discoloration and evens skin tone" },
      { icon: "🦠", title: "Non-Oxidative", desc: "Kills bacteria without the irritation of benzoyl peroxide" },
      { icon: "🔒", title: "Breakout Prevention", desc: "Regulates cell turnover to prevent pores from clogging" }
    ],
    howToUse: {
      steps: [
        "Apply after Phase II has fully absorbed",
        "Use a pea-sized amount for entire face",
        "Dot on forehead, cheeks, nose, and chin",
        "Gently spread in upward motions",
        "Use once daily, preferably at night"
      ],
      tip: "Start with every other night if new to azelaic acid, then increase to nightly use."
    },
    fullIngredients: "Water (Aqua), Azelaic Acid (15%), Propanediol, Dimethicone, Glycerin, C13-14 Alkane, Zinc PCA, Cetearyl Alcohol, Cetearyl Glucoside, Tocopheryl Acetate, Bisabolol, Allantoin, Sodium Hyaluronate, Xanthan Gum, Phenoxyethanol, Ethylhexylglycerin, Disodium EDTA, Sodium Hydroxide.",
    keyActives: [
      { name: "Azelaic Acid", percent: "15%", desc: "Treatment-grade dicarboxylic acid that kills bacteria, reduces inflammation, and fades marks" },
      { name: "Zinc PCA", percent: "2%", desc: "Sebum-regulating compound that supports antimicrobial action" },
      { name: "Bisabolol", percent: "0.5%", desc: "Soothing agent from chamomile that calms irritation" },
      { name: "Vitamin E", percent: "0.5%", desc: "Antioxidant that supports skin healing and protection" }
    ],
    results: {
      timeline: [
        { week: "Week 1", result: "Reduced inflammation on active blemishes" },
        { week: "Week 2", result: "Faster healing of breakouts" },
        { week: "Week 4", result: "Fewer new breakouts, fading marks" },
        { week: "Week 8", result: "Dramatically clearer, more even skin tone" }
      ],
      stat: "89%",
      statLabel: "saw reduced acne in 6 weeks"
    },
    reviews: ALL_REVIEWS.filter(r => r.product === "Phase III"),
    avgRating: "4.7",
    related: [1, 2, 4]
  },
  {
    id: 4,
    name: "The Full System",
    shortName: "The Full System",
    tagline: "Complete 3-Phase Acne Control.",
    price: 81,
    subscriptionPrice: 69,
    size: "3 × 150ML / 15 FL OZ Total",
    sub: "All Three Phases",
    desc: "The complete ASCEND experience. All three phases working in sequence to clear acne, repair your barrier, and lock in lasting results. Subscribe for maximum savings and never miss a treatment.",
    heroGradient: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)",
    badge: "BEST VALUE",
    subscriptionEligible: true,
    subscriptionInterval: 5,
    keyBenefits: [
      { icon: "📋", title: "Complete Protocol", desc: "All three phases designed to work together in perfect sequence" },
      { icon: "💰", title: "Save $12", desc: "Subscription saves you $12 every refill vs. buying individually" },
      { icon: "📈", title: "Maximum Results", desc: "Clinical testing shows best results with complete system use" },
      { icon: "🚚", title: "Free Refill Shipping", desc: "Never pay shipping on refills after your first delivery" }
    ],
    howToUse: {
      steps: [
        "Morning: Phase I → Phase II (skip Phase III in AM)",
        "Evening: Phase I → Phase II → Phase III",
        "Follow the 60-second rule between each phase",
        "Be consistent - use twice daily for best results",
        "Allow 4-8 weeks for full transformation"
      ],
      tip: "The system is designed to work together. Don't skip phases for optimal results."
    },
    fullIngredients: "See individual phase ingredients above. Each phase is formulated to complement the others without interference or redundancy.",
    keyActives: [
      { name: "Phase I", percent: "", desc: "2% Salicylic Acid + 3% Colloidal Sulfur for deep pore cleansing" },
      { name: "Phase II", percent: "", desc: "5% Niacinamide + Triple Ceramide Complex for barrier repair" },
      { name: "Phase III", percent: "", desc: "15% Azelaic Acid + Zinc PCA for treatment and prevention" },
      { name: "System Synergy", percent: "", desc: "Each phase enhances the effectiveness of the next" }
    ],
    results: {
      timeline: [
        { week: "Week 1", result: "Cleaner, fresher feeling skin" },
        { week: "Week 2", result: "Visible reduction in active acne" },
        { week: "Week 4", result: "Significantly clearer, more balanced skin" },
        { week: "Week 12", result: "Transformed, healthy, clear skin" }
      ],
      stat: "94%",
      statLabel: "achieved clearer skin in 12 weeks"
    },
    reviews: ALL_REVIEWS.filter(r => r.product === "The Full System"),
    avgRating: "4.9",
    related: [1, 2, 3]
  }
];

export const avgRating = (ALL_REVIEWS.reduce((s, r) => s + r.star, 0) / ALL_REVIEWS.length).toFixed(1);
