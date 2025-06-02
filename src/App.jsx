import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Droplets, Sparkles, HelpCircle, User, Sun, Moon, Leaf, Palette, Info, AlertTriangle, CheckCircle, Search, BookOpen, Edit3 } from 'lucide-react';

// Mock Data - In a real app, this would come from a backend or a more robust data store.

const hairPorosityData = {
  low: {
    id: 'low',
    name: 'Low Porosity',
    description: "Low porosity hair has a tightly bound cuticle layer, making it difficult for moisture to penetrate. It's often resistant to chemical treatments and can take a long time to dry.",
    characteristics: [
      "Hair takes a long time to get wet and dry.",
      "Products tend to sit on the hair rather than absorb.",
      "Prone to product buildup.",
      "Resistant to chemical treatments like coloring or perming."
    ],
    careTips: [
      "Use lightweight, water-based products.",
      "Apply products to damp, warm hair to help open cuticles.",
      "Incorporate clarifying shampoos to prevent buildup.",
      "Deep condition with gentle heat (e.g., steamer, warm towel) to help products penetrate."
    ],
    recommendedProducts: [
      { name: "Lightweight Leave-in Conditioners", reason: "Absorb more easily without weighing hair down." },
      { name: "Glycerin-based Moisturizers", reason: "Glycerin is a humectant that attracts moisture." },
      { name: "Argan Oil, Grapeseed Oil", reason: "Lighter oils that can penetrate better than heavier ones." },
      { name: "Clarifying Shampoos (used occasionally)", reason: "To remove product buildup." }
    ]
  },
  normal: {
    id: 'normal',
    name: 'Normal Porosity',
    description: "Normal porosity hair has a cuticle layer that is looser, allowing moisture to penetrate easily and also retaining it well. It generally requires less maintenance.",
    characteristics: [
      "Hair absorbs and retains moisture well.",
      "Holds styles easily.",
      "Responds well to coloring and chemical treatments.",
      "Generally looks healthy and shiny."
    ],
    careTips: [
      "Maintain a balanced routine; avoid over-processing.",
      "Regular deep conditioning helps maintain health.",
      "Protect from heat and environmental damage."
    ],
    recommendedProducts: [
      { name: "Balanced Shampoos & Conditioners", reason: "To maintain its natural state." },
      { name: "Occasional Protein Treatments", reason: "To maintain strength, if needed." },
      { name: "Jojoba Oil, Coconut Oil (in moderation)", reason: "Good for sealing moisture." }
    ]
  },
  high: {
    id: 'high',
    name: 'High Porosity',
    description: "High porosity hair has gaps and holes in its cuticle layer, allowing it to absorb moisture quickly but also lose it just as fast. It can be a result of genetics or damage from chemical treatments, heat, or environmental factors.",
    characteristics: [
      "Hair absorbs water quickly but also dries quickly.",
      "Often looks and feels dry or frizzy.",
      "Prone to breakage and tangling.",
      "Can be damaged from chemical treatments."
    ],
    careTips: [
      "Use leave-in conditioners and sealants to lock in moisture.",
      "Incorporate protein treatments to fill gaps in the cuticle (balance with moisture).",
      "Avoid harsh sulfates and very hot water.",
      "Use heavier creams and butters to seal moisture."
    ],
    recommendedProducts: [
      { name: "Leave-in Conditioners", reason: "To continuously provide moisture." },
      { name: "Heavy Creams and Butters (Shea, Mango)", reason: "To seal in moisture effectively." },
      { name: "Anti-humectants in humid climates", reason: "To prevent hair from absorbing too much moisture from the air and frizzing." },
      { name: "Protein-rich Deep Conditioners", reason: "To strengthen the hair shaft." }
    ]
  }
};

const porosityQuizQuestions = [
  {
    id: 'q1',
    text: "How quickly does your hair get wet in the shower?",
    options: [
      { text: "Takes a while, water seems to roll off at first.", value: 'low' },
      { text: "Gets wet fairly easily.", value: 'normal' },
      { text: "Saturates almost instantly.", value: 'high' }
    ]
  },
  {
    id: 'q2',
    text: "How long does your hair typically take to air dry?",
    options: [
      { text: "A very long time (many hours or even a day).", value: 'low' },
      { text: "A moderate amount of time (a few hours).", value: 'normal' },
      { text: "Very quickly (an hour or less).", value: 'high' }
    ]
  },
  {
    id: 'q3',
    text: "How do products generally feel on your hair?",
    options: [
      { text: "They tend to sit on top and don't absorb well.", value: 'low' },
      { text: "They absorb reasonably well.", value: 'normal' },
      { text: "My hair soaks them up quickly, sometimes needing more.", value: 'high' }
    ]
  },
  {
    id: 'q4',
    text: "Float Test (Optional - do this with a clean strand of hair in room temperature water): How does your hair behave in a glass of water after a few minutes?",
    options: [
      { text: "It floats at the top.", value: 'low' },
      { text: "It floats somewhere in the middle.", value: 'normal' },
      { text: "It sinks to the bottom quickly.", value: 'high' }
    ]
  }
];

const skinTypesData = {
  oily: {
    id: 'oily',
    name: "Oily Skin",
    description: "Oily skin is characterized by an overproduction of sebum, leading to a shiny or greasy appearance, especially in the T-zone (forehead, nose, and chin).",
    characteristics: ["Enlarged pores", "Shiny complexion", "Prone to blackheads, whiteheads, and acne breakouts"],
    careTips: [
      "Cleanse twice daily with a gentle, foaming cleanser.",
      "Use lightweight, oil-free, non-comedogenic moisturizers.",
      "Incorporate ingredients like salicylic acid or benzoyl peroxide for acne.",
      "Use clay masks to absorb excess oil."
    ],
    recommendedProducts: [
      { name: "Gel or Foaming Cleansers", reason: "Effectively remove excess oil without stripping the skin." },
      { name: "Salicylic Acid (BHA) Toners/Serums", reason: "Exfoliates inside pores to reduce oil and breakouts." },
      { name: "Lightweight, Oil-Free Moisturizers", reason: "Hydration is still important for oily skin." },
      { name: "Clay Masks (e.g., Bentonite, Kaolin)", reason: "Absorb excess sebum and impurities." }
    ]
  },
  dry: {
    id: 'dry',
    name: "Dry Skin",
    description: "Dry skin produces less sebum than normal skin, resulting in a lack of lipids needed to retain moisture and build a protective barrier against external influences.",
    characteristics: ["Feels tight, especially after cleansing", "Flaky, rough, or scaly patches", "Dull complexion", "More prone to fine lines and irritation"],
    careTips: [
      "Use gentle, hydrating, cream-based cleansers.",
      "Avoid hot water and harsh soaps.",
      "Moisturize frequently with rich creams or ointments.",
      "Incorporate hydrating ingredients like hyaluronic acid and ceramides."
    ],
    recommendedProducts: [
      { name: "Cream or Oil-Based Cleansers", reason: "Cleanse without stripping natural oils." },
      { name: "Hydrating Toners (alcohol-free)", reason: "Add an extra layer of moisture." },
      { name: "Rich Moisturizers with Ceramides, Hyaluronic Acid, Shea Butter", reason: "Replenish moisture and support skin barrier." },
      { name: "Facial Oils (e.g., Jojoba, Squalane)", reason: "Provide an occlusive layer to prevent moisture loss." }
    ]
  },
  normal: {
    id: 'normal',
    name: "Normal Skin",
    description: "Normal skin is well-balanced, neither too oily nor too dry. It has good elasticity and an even tone.",
    characteristics: ["Few imperfections", "No severe sensitivity", "Barely visible pores", "Radiant complexion"],
    careTips: [
      "Maintain a consistent, gentle skincare routine.",
      "Protect from sun exposure.",
      "Adjust routine based on seasonal changes if needed."
    ],
    recommendedProducts: [
      { name: "Gentle Cleansers", reason: "Maintain skin's natural balance." },
      { name: "Light to Medium Weight Moisturizers", reason: "Provide adequate hydration." },
      { name: "Broad-Spectrum Sunscreen", reason: "Essential for all skin types to prevent damage." },
      { name: "Antioxidant Serums (e.g., Vitamin C)", reason: "Protect against environmental stressors." }
    ]
  },
  combination: {
    id: 'combination',
    name: "Combination Skin",
    description: "Combination skin features characteristics of both oily and dry skin. Typically, the T-zone is oily, while the cheeks are normal or dry.",
    characteristics: ["Oily T-zone (forehead, nose, chin)", "Dry or normal cheeks", "Pores may be larger in oily areas", "May experience breakouts and dryness simultaneously"],
    careTips: [
      "Use gentle cleansers.",
      "Apply different products to different areas if needed (e.g., lighter moisturizer on T-zone, richer on cheeks).",
      "Consider multi-masking.",
      "Look for balancing ingredients."
    ],
    recommendedProducts: [
      { name: "Balancing Cleansers", reason: "Address both oily and dry areas without being too harsh." },
      { name: "Lightweight Moisturizer for Oily Areas, Richer for Dry Areas", reason: "Targeted hydration." },
      { name: "Exfoliants with AHAs/BHAs (used carefully)", reason: "Manage oil in T-zone and cell turnover." },
      { name: "Hydrating Serums", reason: "Can benefit all areas of combination skin." }
    ]
  },
  sensitive: {
    id: 'sensitive',
    name: "Sensitive Skin",
    description: "Sensitive skin is more prone to reactions such as redness, itching, burning, or dryness in response to products or environmental factors.",
    characteristics: ["Reacts easily to new products", "Prone to redness, itching, stinging, or burning", "May have conditions like rosacea or eczema", "Often dry and delicate"],
    careTips: [
      "Use hypoallergenic, fragrance-free products.",
      "Patch test new products before full application.",
      "Avoid harsh exfoliants and known irritants (e.g., alcohol, synthetic fragrances).",
      "Keep skincare routine simple."
    ],
    recommendedProducts: [
      { name: "Micellar Water or Gentle, Fragrance-Free Cleansers", reason: "Minimize irritation." },
      { name: "Soothing Toners with ingredients like Aloe Vera, Chamomile", reason: "Calm and reduce redness." },
      { name: "Moisturizers with Minimal Ingredients, Ceramides, Niacinamide", reason: "Support skin barrier and reduce sensitivity." },
      { name: "Mineral-Based Sunscreens (Zinc Oxide, Titanium Dioxide)", reason: "Less likely to cause irritation than chemical sunscreens." }
    ]
  }
};

const skinTypeQuizQuestions = [
  {
    id: 'sq1',
    text: "How does your skin feel an hour after cleansing (without applying any products)?",
    options: [
      { text: "Shiny all over or in the T-zone.", value: ['oily', 'combination'] },
      { text: "Tight, dry, or flaky.", value: ['dry', 'sensitive'] },
      { text: "Comfortable and balanced.", value: 'normal' },
      { text: "Mostly comfortable, maybe a little oily in the T-zone.", value: 'combination' }
    ]
  },
  {
    id: 'sq2',
    text: "How often do you experience breakouts (pimples, blackheads)?",
    options: [
      { text: "Frequently, especially in the T-zone.", value: ['oily', 'combination'] },
      { text: "Rarely, if ever.", value: ['dry', 'normal'] },
      { text: "Occasionally, sometimes related to products or stress.", value: ['sensitive', 'combination'] }
    ]
  },
  {
    id: 'sq3',
    text: "How would you describe your pore size?",
    options: [
      { text: "Large and visible, especially on nose and chin.", value: 'oily' },
      { text: "Small and barely visible.", value: ['dry', 'normal'] },
      { text: "Visible in the T-zone, smaller on cheeks.", value: 'combination' },
      { text: "Can vary, sometimes look irritated.", value: 'sensitive' }
    ]
  },
  {
    id: 'sq4',
    text: "Does your skin often react negatively (redness, itching, burning) to new products or environmental changes?",
    options: [
      { text: "Yes, quite often.", value: 'sensitive' },
      { text: "Sometimes, if the product is harsh.", value: ['combination', 'dry'] },
      { text: "Rarely.", value: ['oily', 'normal'] }
    ]
  }
];

const diyRemediesData = [
  {
    id: 'rice-water',
    name: "Rice Water Rinse (Hair & Skin)",
    category: "Haircare & Skincare",
    icon: <Droplets className="w-6 h-6 text-blue-500" />,
    ingredients: ["1/2 cup uncooked rice (any type)", "2-3 cups water"],
    benefits: [
      "Hair: Strengthens hair, promotes growth, adds shine, detangles.",
      "Skin: Soothes irritation, brightens complexion, tightens pores."
    ],
    howToUse: [
      "Rinse rice to remove impurities.",
      "Soak rice in water for 30 minutes to 24 hours (fermented rice water is more potent but has a strong smell).",
      "Strain the water into a clean container.",
      "Hair: After shampooing, pour rice water over hair. Massage into scalp and hair. Leave for 5-20 minutes, then rinse thoroughly. Use 1-2 times a week.",
      "Skin: Apply to clean skin with a cotton pad as a toner, or use as a facial rinse. Let it air dry. Use daily or as needed."
    ],
    precautions: [
      "Hair: Fermented rice water can be very potent; dilute if needed. Protein-sensitive hair might experience stiffness with overuse; monitor your hair's reaction.",
      "Skin: Patch test first, especially if you have sensitive skin. Discontinue use if irritation occurs.",
      "Store unused rice water in the refrigerator for up to a week."
    ]
  },
  {
    id: 'rosemary-water',
    name: "Rosemary Water Rinse (Hair)",
    category: "Haircare",
    icon: <Leaf className="w-6 h-6 text-green-600" />,
    ingredients: ["2-3 sprigs fresh rosemary (or 2 tbsp dried)", "2 cups water"],
    benefits: ["Stimulates scalp circulation, promotes hair growth, reduces dandruff, adds shine."],
    howToUse: [
      "Bring water to a boil, then add rosemary.",
      "Reduce heat, cover, and simmer for 15-20 minutes.",
      "Remove from heat and let it steep, covered, until cool (at least 1 hour, or overnight for stronger infusion).",
      "Strain the rosemary water into a spray bottle or clean container.",
      "After shampooing and conditioning, spray or pour onto scalp and hair. Massage gently. Do not rinse out (or lightly rinse if preferred).",
      "Use 2-3 times a week."
    ],
    precautions: [
      "Patch test on scalp if you have sensitivities.",
      "Rosemary can slightly darken hair over time for some individuals.",
      "Store in the refrigerator for up to 1-2 weeks."
    ]
  },
  {
    id: 'ginger-scalp-treatment',
    name: "Ginger Scalp Treatment (Hair)",
    category: "Haircare",
    icon: <Sparkles className="w-6 h-6 text-yellow-500" />,
    ingredients: ["1-2 inch piece of fresh ginger", "1 tbsp carrier oil (coconut, olive, jojoba)"],
    benefits: ["Stimulates blood flow to scalp, promotes hair growth, anti-inflammatory, anti-fungal (can help with dandruff)."],
    howToUse: [
      "Grate or blend fresh ginger to extract juice (about 1-2 tablespoons).",
      "Mix ginger juice with the carrier oil.",
      "Apply the mixture directly to your scalp, section by section. Massage gently for 5-10 minutes.",
      "Leave on for 20-30 minutes. You might feel a warming sensation.",
      "Shampoo and condition as usual.",
      "Use 1-2 times a week."
    ],
    precautions: [
      "Ginger can cause a warming or tingling sensation; this is normal but should not be painful. If it burns, rinse off immediately.",
      "Patch test on a small area of your scalp first, especially if sensitive.",
      "Avoid if you have open sores or very irritated scalp."
    ]
  },
  {
    id: 'cornstarch-dry-shampoo',
    name: "Cornstarch Dry Shampoo (Hair)",
    category: "Haircare",
    icon: <Sun className="w-6 h-6 text-yellow-400" />,
    ingredients: ["2-4 tbsp cornstarch", "Optional: 1 tbsp cocoa powder (for dark hair)", "Optional: Few drops of essential oil (e.g., lavender, peppermint) for scent"],
    benefits: ["Absorbs excess oil and grease from scalp and hair, refreshes hair between washes, adds volume."],
    howToUse: [
      "Mix cornstarch (and cocoa powder if using) in a small bowl.",
      "Add essential oil if desired and mix well.",
      "Using a makeup brush or your fingers, apply sparingly to the roots of your hair, focusing on oily areas.",
      "Let it sit for a few minutes to absorb oil.",
      "Brush or massage through your hair to distribute and remove any excess powder.",
      "Style as usual."
    ],
    precautions: [
      "Use sparingly to avoid a white cast, especially on dark hair (cocoa powder helps with this).",
      "Ensure it's well brushed out.",
      "Not a replacement for regular washing."
    ]
  },
   {
    id: 'alum-deodorant',
    name: "Sodium Alum (Potassium Alum) Deodorant Stone",
    category: "Body Care",
    icon: <Droplets className="w-6 h-6 text-gray-400" />,
    ingredients: ["Potassium Alum stone (often sold as 'crystal deodorant')"],
    benefits: ["Natural deodorant, inhibits odor-causing bacteria, non-staining, fragrance-free."],
    howToUse: [
      "Slightly wet the top of the alum stone with water.",
      "Apply to clean underarms, just like a regular deodorant stick.",
      "Rinse the stone and let it dry after use to prevent erosion.",
      "Can be used daily."
    ],
    precautions: [
      "Ensure you are using Potassium Alum, not Ammonium Alum, which can be more irritating for some.",
      "While generally safe, discontinue use if any irritation occurs.",
      "It prevents odor but doesn't stop sweating (it's not an antiperspirant)."
    ]
  }
];

const makeupData = {
  dailyNaturalTips: [
    "Start with a clean, moisturized, and primed face. Sunscreen is a must!",
    "Use a lightweight BB cream, CC cream, or tinted moisturizer for sheer coverage that evens out skin tone.",
    "Apply concealer strategically: under eyes (in a V-shape and blend), around the nose, and on any blemishes. Blend well.",
    "A touch of cream or powder blush on the apples of your cheeks adds a healthy glow. Choose a natural shade.",
    "Groom your eyebrows. Fill in sparse areas lightly with a pencil or powder for a defined but natural look.",
    "A single coat of mascara can open up your eyes. Curl lashes beforehand for extra lift.",
    "For lips, a tinted lip balm, a nude lipstick, or a light gloss is perfect for a natural look.",
    "Optional: A subtle highlighter on cheekbones, brow bones, and cupid's bow for a dewy finish.",
    "Set makeup lightly with translucent powder if you tend to get oily, focusing on the T-zone."
  ],
  beginnerProductGuide: [
    { name: "Primer", purpose: "Creates a smooth canvas for makeup, helps it last longer." },
    { name: "Foundation/BB/CC Cream/Tinted Moisturizer", purpose: "Evens out skin tone. Coverage varies from sheer to full." },
    { name: "Concealer", purpose: "Covers blemishes, dark circles, and redness." },
    { name: "Setting Powder", purpose: "Sets liquid/cream products, reduces shine, helps makeup last." },
    { name: "Blush", purpose: "Adds color and a healthy glow to the cheeks." },
    { name: "Bronzer", purpose: "Adds warmth and dimension to the face." },
    { name: "Highlighter", purpose: "Accentuates high points of the face with a luminous glow." },
    { name: "Eyebrow Pencil/Powder/Gel", purpose: "Defines and fills in eyebrows." },
    { name: "Mascara", purpose: "Enhances eyelashes, making them look longer, thicker, and darker." },
    { name: "Eyeliner", purpose: "Defines the eyes. Pencils are beginner-friendly." },
    { name: "Lipstick/Lip Gloss/Lip Tint/Lip Balm", purpose: "Adds color and/or moisture to lips." },
    { name: "Makeup Brushes/Sponges", purpose: "Essential tools for applying and blending makeup." }
  ],
  skinToneRecommendations: { // Simplified
    fair: {
      foundation: "Look for shades with pink, neutral, or slightly yellow undertones. Avoid shades that are too dark or orange.",
      blush: "Light pinks, peaches, soft corals.",
      lipstick: "Nudes with pink/peach undertones, soft pinks, berry shades (sheer)."
    },
    lightMedium: {
      foundation: "Neutral, warm, or golden undertones often work well.",
      blush: "Peachy pinks, warm roses, corals.",
      lipstick: "Warm nudes, rosy pinks, corals, muted berries."
    },
    mediumTan: {
      foundation: "Golden, olive, or warm beige undertones.",
      blush: "Deeper peaches, roses, berries, bronzy mauves.",
      lipstick: "Caramel nudes, terracotta, rosewood, vibrant berries."
    },
    deep: {
      foundation: "Rich golden, red, or neutral brown undertones. Ensure it doesn't look ashy.",
      blush: "Rich berries, plums, deep oranges, vibrant fuchsias.",
      lipstick: "Deep nudes (chocolate, mahogany), rich reds, plums, vibrant purples."
    }
  },
  lookInspirations: [ // Placeholder for actual image URLs or detailed descriptions
    { name: "Everyday Glow", description: "Focuses on radiant skin, subtle definition, and a fresh look.", products: "Tinted moisturizer, cream blush, brow gel, mascara, lip tint." },
    { name: "Soft Glam", description: "A step up from natural, with soft eyeshadow, defined lashes, and a slightly bolder lip.", products: "Light-medium coverage foundation, powder blush/bronzer, neutral eyeshadow palette, eyeliner, mascara, satin lipstick." },
    { name: "Minimalist Chic", description: "Very few products, emphasizing skin and one feature (e.g., bold lip or defined brows).", products: "Concealer (spot treat), brow pencil, mascara, bold lipstick OR tinted moisturizer, brow gel, clear lip gloss." }
  ]
};

const IconMap = {
  Skincare: <Sun className="w-5 h-5 mr-3 text-pink-500" />,
  Haircare: <Droplets className="w-5 h-5 mr-3 text-blue-500" />,
  'DIY Remedies': <Leaf className="w-5 h-5 mr-3 text-green-500" />,
  Makeup: <Palette className="w-5 h-5 mr-3 text-purple-500" />,
};

const AccordionItem = ({ title, children, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 text-left text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
      >
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <span className="font-medium">{title}</span>
        </div>
        {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>
      {isOpen && <div className="p-4 bg-gray-50 text-gray-600">{children}</div>}
    </div>
  );
};

const App = () => {
  const [activeSection, setActiveSection] = useState('Skincare');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to open on larger screens

  const sections = ['Skincare', 'Haircare', 'DIY Remedies', 'Makeup'];

  // Toggle sidebar for mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { // Tailwind's md breakpoint
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const renderContent = () => {
    switch (activeSection) {
      case 'Skincare':
        return <SkincareSection />;
      case 'Haircare':
        return <HaircareSection />;
      case 'DIY Remedies':
        return <DIYRemediesSection />;
      case 'Makeup':
        return <MakeupSection />;
      default:
        return <div className="p-6 text-gray-700">Welcome! Select a section to get started.</div>;
    }
  };

  return (
    <div className="flex h-screen font-sans bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-white text-gray-800 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-0'} overflow-hidden md:w-64 flex flex-col shadow-lg`}>
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-pink-600 flex items-center">
            <Sparkles className="w-7 h-7 mr-2" />
            Beauty Hub
          </h1>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => {
                setActiveSection(section);
                if (window.innerWidth < 768) setIsSidebarOpen(false); // Close sidebar on mobile after selection
              }}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ease-in-out
                ${activeSection === section
                  ? 'bg-pink-500 text-white shadow-md transform scale-105'
                  : 'hover:bg-pink-100 hover:text-pink-600 text-gray-700'
                }`}
            >
              {IconMap[section]}
              {section}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
          &copy; 2025 Self-Care App
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
         {/* Top Bar for Mobile Toggle and Section Title */}
        <header className="bg-white shadow-md p-4 md:hidden flex justify-between items-center">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-pink-600 p-2 rounded-md hover:bg-pink-100">
            <Search className="w-6 h-6" /> {/* Using Search as a generic menu icon */}
          </button>
          <h2 className="text-xl font-semibold text-pink-600">{activeSection}</h2>
          <div className="w-8"></div> {/* Spacer */}
        </header>
         <header className="bg-white shadow-md p-4 hidden md:block">
          <h2 className="text-2xl font-semibold text-pink-700">{activeSection}</h2>
        </header>
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

// --- Skincare Section ---
const SkincareSection = () => {
  const [answers, setAnswers] = useState({});
  const [skinTypeResult, setSkinTypeResult] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleQuizChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateSkinType = () => {
    const counts = { oily: 0, dry: 0, normal: 0, combination: 0, sensitive: 0 };
    Object.values(answers).forEach(answerValues => {
      (Array.isArray(answerValues) ? answerValues : [answerValues]).forEach(type => {
        if (counts[type] !== undefined) counts[type]++;
      });
    });

    // Simple logic: highest count wins. If sensitive has a high score, it's prioritized.
    // This is a very basic algorithm.
    if (counts.sensitive >= 2) { // Prioritize sensitive if it gets enough votes
        setSkinTypeResult('sensitive');
        return;
    }
    
    let majorityType = 'normal'; // Default
    let maxCount = 0;
    for (const type in counts) {
      if (counts[type] > maxCount && type !== 'sensitive') { // Don't let sensitive win here if already checked
        maxCount = counts[type];
        majorityType = type;
      }
    }
    // If combination has a decent score and oily/dry also do, it might be combination
    if (counts.combination > 0 && (counts.oily > 0 || counts.dry > 0) && counts.combination >= maxCount / 2) {
        majorityType = 'combination';
    }


    setSkinTypeResult(majorityType);
    setShowQuiz(false); // Hide quiz after calculation
  };
  
  const resetQuiz = () => {
    setAnswers({});
    setSkinTypeResult(null);
    setShowQuiz(true);
  };

  return (
    <div className="space-y-8">
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold text-pink-700 mb-4 flex items-center"><User className="mr-2"/>Understanding Skin Types</h3>
        <p className="text-gray-600 mb-4">
          Knowing your skin type is the first step to effective skincare. Common skin types include Oily, Dry, Normal, Combination, and Sensitive. Each has unique characteristics and requires different care.
        </p>
        {!showQuiz && !skinTypeResult && (
          <button 
            onClick={() => setShowQuiz(true)}
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center"
          >
            <HelpCircle className="mr-2 w-5 h-5" /> Take the Skin Type Quiz
          </button>
        )}
      </div>

      {showQuiz && (
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <h4 className="text-xl font-semibold text-pink-600 mb-4">Skin Type Quiz</h4>
          {skinTypeQuizQuestions.map(q => (
            <div key={q.id} className="mb-6 p-4 border border-pink-200 rounded-lg bg-pink-50">
              <p className="font-medium text-gray-700 mb-2">{q.text}</p>
              <div className="space-y-2">
                {q.options.map(opt => (
                  <label key={opt.text} className="flex items-center p-2 rounded-md hover:bg-pink-100 cursor-pointer">
                    <input 
                      type="radio" 
                      name={q.id} 
                      value={opt.text} // Using text as value for display, logic uses opt.value
                      checked={answers[q.id] === opt.value}
                      onChange={() => handleQuizChange(q.id, opt.value)}
                      className="form-radio h-4 w-4 text-pink-600 border-gray-300 focus:ring-pink-500 mr-3"
                    />
                    <span className="text-gray-700">{opt.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button 
            onClick={calculateSkinType}
            disabled={Object.keys(answers).length !== skinTypeQuizQuestions.length}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 flex items-center"
          >
            <CheckCircle className="mr-2 w-5 h-5" /> Get My Skin Type
          </button>
        </div>
      )}

      {skinTypeResult && skinTypesData[skinTypeResult] && (
        <div className="p-6 bg-white rounded-xl shadow-lg border-2 border-pink-500">
          <h4 className="text-2xl font-semibold text-pink-700 mb-3">Your Probable Skin Type: {skinTypesData[skinTypeResult].name}</h4>
          <p className="text-gray-700 mb-4">{skinTypesData[skinTypeResult].description}</p>
          
          <div className="mb-4">
            <h5 className="font-semibold text-pink-600 mb-1">Characteristics:</h5>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {skinTypesData[skinTypeResult].characteristics.map(char => <li key={char}>{char}</li>)}
            </ul>
          </div>
          <div className="mb-4">
            <h5 className="font-semibold text-pink-600 mb-1">Care Tips:</h5>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {skinTypesData[skinTypeResult].careTips.map(tip => <li key={tip}>{tip}</li>)}
            </ul>
          </div>
           <div>
            <h5 className="font-semibold text-pink-600 mb-2">Recommended Product Types:</h5>
            <div className="space-y-3">
              {skinTypesData[skinTypeResult].recommendedProducts.map(prod => (
                <div key={prod.name} className="p-3 bg-pink-50 rounded-md border border-pink-200">
                  <p className="font-medium text-pink-700">{prod.name}</p>
                  <p className="text-sm text-gray-600">{prod.reason}</p>
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={resetQuiz}
            className="mt-6 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
          >
            <HelpCircle className="mr-2 w-5 h-5" /> Retake Quiz or View Other Types
          </button>
        </div>
      )}
      
      {!skinTypeResult && (
        <div className="mt-8">
            <h4 className="text-xl font-semibold text-pink-700 mb-3">General Skin Type Information:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.values(skinTypesData).map(type => (
                <div key={type.id} className="p-4 bg-white rounded-lg shadow-md">
                <h5 className="font-bold text-lg text-pink-600 mb-1">{type.name}</h5>
                <p className="text-sm text-gray-600 mb-2">{type.description.substring(0,100)}...</p>
                <button onClick={() => { setSkinTypeResult(type.id); setShowQuiz(false); window.scrollTo(0,0); }} className="text-sm text-pink-500 hover:text-pink-700 font-medium">Learn More &raquo;</button>
                </div>
            ))}
            </div>
        </div>
        )}
    </div>
  );
};

// --- Haircare Section ---
const HaircareSection = () => {
  const [answers, setAnswers] = useState({});
  const [porosityResult, setPorosityResult] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleQuizChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculatePorosity = () => {
    const counts = { low: 0, normal: 0, high: 0 };
    Object.values(answers).forEach(value => {
      if (counts[value] !== undefined) counts[value]++;
    });
    
    let majorityType = 'normal'; // Default
    let maxCount = 0;
    for (const type in counts) {
      if (counts[type] > maxCount) {
        maxCount = counts[type];
        majorityType = type;
      }
    }
    setPorosityResult(majorityType);
    setShowQuiz(false);
  };

  const resetQuiz = () => {
    setAnswers({});
    setPorosityResult(null);
    setShowQuiz(true);
  };

  return (
    <div className="space-y-8">
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center"><Droplets className="mr-2"/>Understanding Hair Porosity</h3>
        <p className="text-gray-600 mb-4">
          Hair porosity refers to your hair's ability to absorb and retain moisture. It's determined by the structure of your hair's cuticle layer. Knowing your hair's porosity (Low, Normal, or High) can help you choose the right products and treatments.
        </p>
        {!showQuiz && !porosityResult && (
          <button 
            onClick={() => setShowQuiz(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
          >
            <HelpCircle className="mr-2 w-5 h-5" /> Take the Hair Porosity Quiz
          </button>
        )}
      </div>

      {showQuiz && (
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <h4 className="text-xl font-semibold text-blue-600 mb-4">Hair Porosity Quiz</h4>
          {porosityQuizQuestions.map(q => (
            <div key={q.id} className="mb-6 p-4 border border-blue-200 rounded-lg bg-blue-50">
              <p className="font-medium text-gray-700 mb-2">{q.text}</p>
              <div className="space-y-2">
                {q.options.map(opt => (
                  <label key={opt.text} className="flex items-center p-2 rounded-md hover:bg-blue-100 cursor-pointer">
                    <input 
                      type="radio" 
                      name={q.id} 
                      value={opt.value}
                      checked={answers[q.id] === opt.value}
                      onChange={() => handleQuizChange(q.id, opt.value)}
                      className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 mr-3"
                    />
                     <span className="text-gray-700">{opt.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button 
            onClick={calculatePorosity}
            disabled={Object.keys(answers).length !== porosityQuizQuestions.length}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 flex items-center"
          >
            <CheckCircle className="mr-2 w-5 h-5" /> Get My Hair Porosity
          </button>
        </div>
      )}

      {porosityResult && hairPorosityData[porosityResult] && (
        <div className="p-6 bg-white rounded-xl shadow-lg border-2 border-blue-500">
          <h4 className="text-2xl font-semibold text-blue-700 mb-3">Your Probable Hair Porosity: {hairPorosityData[porosityResult].name}</h4>
          <p className="text-gray-700 mb-4">{hairPorosityData[porosityResult].description}</p>
          
          <div className="mb-4">
            <h5 className="font-semibold text-blue-600 mb-1">Characteristics:</h5>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {hairPorosityData[porosityResult].characteristics.map(char => <li key={char}>{char}</li>)}
            </ul>
          </div>
          <div className="mb-4">
            <h5 className="font-semibold text-blue-600 mb-1">Care Tips:</h5>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {hairPorosityData[porosityResult].careTips.map(tip => <li key={tip}>{tip}</li>)}
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-blue-600 mb-2">Recommended Product Types:</h5>
            <div className="space-y-3">
              {hairPorosityData[porosityResult].recommendedProducts.map(prod => (
                <div key={prod.name} className="p-3 bg-blue-50 rounded-md border border-blue-200">
                  <p className="font-medium text-blue-700">{prod.name}</p>
                  <p className="text-sm text-gray-600">{prod.reason}</p>
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={resetQuiz}
            className="mt-6 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
          >
            <HelpCircle className="mr-2 w-5 h-5" /> Retake Quiz or View Other Types
          </button>
        </div>
      )}
      {!porosityResult && (
        <div className="mt-8">
            <h4 className="text-xl font-semibold text-blue-700 mb-3">General Hair Porosity Information:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(hairPorosityData).map(type => (
                <div key={type.id} className="p-4 bg-white rounded-lg shadow-md">
                <h5 className="font-bold text-lg text-blue-600 mb-1">{type.name}</h5>
                <p className="text-sm text-gray-600 mb-2">{type.description.substring(0,100)}...</p>
                <button onClick={() => { setPorosityResult(type.id); setShowQuiz(false); window.scrollTo(0,0); }} className="text-sm text-blue-500 hover:text-blue-700 font-medium">Learn More &raquo;</button>
                </div>
            ))}
            </div>
        </div>
        )}
    </div>
  );
};

// --- DIY Remedies Section ---
const DIYRemediesSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(diyRemediesData.map(remedy => remedy.category))];

  const filteredRemedies = diyRemediesData.filter(remedy => {
    const matchesCategory = selectedCategory === 'All' || remedy.category === selectedCategory;
    const matchesSearchTerm = remedy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              remedy.ingredients.join(' ').toLowerCase().includes(searchTerm.toLowerCase()) ||
                              remedy.benefits.join(' ').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  return (
    <div className="space-y-8">
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold text-green-700 mb-4 flex items-center"><Leaf className="mr-2"/>DIY Home Remedies</h3>
        <p className="text-gray-600 mb-4">
          Discover safe and easy home remedies using natural ingredients. Always patch test before full application and be mindful of any personal allergies or sensitivities.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <input 
              type="text"
              placeholder="Search remedies (e.g., rice water, hair growth)"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredRemedies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRemedies.map(remedy => (
            <div key={remedy.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
              <div className="p-6 flex-grow">
                <div className="flex items-center mb-3">
                  {remedy.icon || <Sparkles className="w-6 h-6 text-green-500" />}
                  <h4 className="text-xl font-semibold text-green-700 ml-2">{remedy.name}</h4>
                </div>
                <p className="text-sm text-gray-500 mb-3">Category: {remedy.category}</p>
                
                <div className="mb-3">
                  <h5 className="font-semibold text-green-600 text-sm mb-1">Ingredients:</h5>
                  <p className="text-gray-600 text-sm">{remedy.ingredients.join(', ')}</p>
                </div>

                <AccordionItem title="Benefits" icon={<CheckCircle className="w-4 h-4 text-green-500"/>}>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {remedy.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}
                  </ul>
                </AccordionItem>
                <AccordionItem title="How to Use" icon={<Info className="w-4 h-4 text-blue-500"/>}>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {remedy.howToUse.map(step => <li key={step}>{step}</li>)}
                  </ul>
                </AccordionItem>
                <AccordionItem title="Precautions" icon={<AlertTriangle className="w-4 h-4 text-yellow-500"/>}>
                   <ul className="list-disc list-inside text-sm space-y-1">
                    {remedy.precautions.map(caution => <li key={caution}>{caution}</li>)}
                  </ul>
                </AccordionItem>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 bg-white rounded-xl shadow-lg text-center">
          <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No remedies found matching your criteria. Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  );
};

// --- Makeup Section ---
const MakeupSection = () => {
  return (
    <div className="space-y-8">
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold text-purple-700 mb-4 flex items-center"><Palette className="mr-2"/>Makeup Corner</h3>
        <p className="text-gray-600">
          Explore makeup tips, product guides, and inspiration to enhance your natural beauty. Whether you're a beginner or looking for new ideas, find helpful advice here.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <AccordionItem title="Daily / Natural Makeup Tips" icon={<Sun className="w-5 h-5 text-yellow-500"/>}>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {makeupData.dailyNaturalTips.map((tip, index) => <li key={index}>{tip}</li>)}
          </ul>
        </AccordionItem>

        <AccordionItem title="Basic Product Guide for Beginners" icon={<BookOpen className="w-5 h-5 text-blue-500"/>}>
          <div className="space-y-3">
            {makeupData.beginnerProductGuide.map((product, index) => (
              <div key={index} className="p-3 bg-purple-50 rounded-md border border-purple-200">
                <h5 className="font-semibold text-purple-700">{product.name}</h5>
                <p className="text-sm text-gray-600">{product.purpose}</p>
              </div>
            ))}
          </div>
        </AccordionItem>

        <AccordionItem title="Skin-Tone Based Product Recommendations (Simplified)" icon={<User className="w-5 h-5 text-orange-500"/>}>
          <div className="space-y-4">
            {Object.entries(makeupData.skinToneRecommendations).map(([tone, recs]) => (
              <div key={tone} className="p-3 bg-purple-50 rounded-md border border-purple-200">
                <h5 className="font-semibold text-purple-700 capitalize mb-1">{tone} Skin Tones:</h5>
                <p className="text-sm text-gray-600"><strong>Foundation:</strong> {recs.foundation}</p>
                <p className="text-sm text-gray-600"><strong>Blush:</strong> {recs.blush}</p>
                <p className="text-sm text-gray-600"><strong>Lipstick:</strong> {recs.lipstick}</p>
              </div>
            ))}
          </div>
        </AccordionItem>
        
        <AccordionItem title="Look Inspiration (Ideas)" icon={<Sparkles className="w-5 h-5 text-pink-500"/>}>
           <div className="space-y-4">
            {makeupData.lookInspirations.map((look, index) => (
              <div key={index} className="p-3 bg-purple-50 rounded-md border border-purple-200">
                <h5 className="font-semibold text-purple-700">{look.name}</h5>
                <p className="text-sm text-gray-600 mb-1">{look.description}</p>
                <p className="text-xs text-gray-500"><strong>Key Products:</strong> {look.products}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500">
            (Optional: In a full app, this section could feature image galleries, video tutorials, or links to external resources.)
          </p>
        </AccordionItem>
      </div>
    </div>
  );
};


export default App;

