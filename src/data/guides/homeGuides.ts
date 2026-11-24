import type { GuideItem } from './types';

export const homeGuides: GuideItem[] = [
  // 4. HOW MUCH PAINT DO I NEED? A PRACTICAL GUIDE
  {
    slug: 'how-much-paint-do-i-need',
    title: 'How Much Paint Do I Need? A Practical Guide',
    description: 'Calculate exact paint requirements for any room: wall surface area, deductions for doors and windows, coats needed, and coverage per gallon.',
    excerpt: 'Calculate exact paint requirements for any room: wall surface area, deductions for doors and windows, coats needed, and coverage per gallon.',
    category: 'Home',
    publishedDate: 'January 28, 2026',
    updatedDate: 'February 25, 2026',
    readingTime: '6 min read',
    readTime: '6 min read',
    relatedTools: ['paint', 'flooring', 'percentage'],
    relatedGuides: ['how-to-calculate-flooring', 'how-to-calculate-percentage'],
    shortIntro: 'Underestimating paint leaves you stranded mid-project with uneven drying edges, while overestimating wastes money on expensive custom-tinted cans that cannot be returned. Professional painters use a simple perimeter-based method to calculate paint coverage accurately.',
    directAnswer: 'Interior architectural latex paint commonly lists Product Data Sheet (PDS) spreading ranges of roughly 350–400 sq ft/gal (Sherwin-Williams) or 350–450 sq ft/gal (Benjamin Moore), depending on line and surface smoothness. Using our conservative 350 sq ft/gal smooth-wall planning default, multiply room perimeter by ceiling height, subtract editable planning deductions (20 sq ft per door, 15 sq ft per window), multiply by 2 coats, and divide by 350—then compare full gallons against a Gallon + Quart package mix.',
    quickAnswer: {
      text: 'Using our 350 sq ft/gal smooth-drywall planning default (inside major PDS ranges of 350–450 sq ft/gal), calculate net wall area, multiply by 2 coats, divide by 350, and pair whole gallons with quarts when fractional overage is ≤ 0.50 gal.',
      formula: 'Gallons = [(Perimeter × Height) - (Doors × 20 + Windows × 15)] × Coats / 350',
      example: '12×15 ft room, 8 ft ceiling (1 door, 2 windows): Perimeter = 54 ft, Net = 382 sq ft, 2 coats = 764 sq ft ÷ 350 = 2.18 gal → Package suggestion: 2 Gallons + 1 Quart (2.25 gal, or 3 gallons for generous touch-up reserve).',
      targetCalculatorText: 'Paint Calculator',
    },
    conceptsIntro: 'Accurate paint estimation depends on room geometry, editable opening deductions, surface texture, and how paint manufacturers sell retail container sizes.',
    concepts: [
      {
        term: 'Room Perimeter',
        definition: 'The total distance around all four walls combined (2 × [Length + Width]).',
        example: 'In a 10×12 ft bedroom, the perimeter is 2 × (10 + 12) = 44 linear feet.',
      },
      {
        term: 'Gross Wall Area',
        definition: 'The total vertical surface area of all walls before accounting for any openings.',
        example: 'A 44 ft perimeter with 9 ft ceilings has 44 × 9 = 396 sq ft of gross wall area.',
      },
      {
        term: 'Openings Deductions',
        definition: 'Editable surface-area planning allowances subtracted for unpainted openings—defaulting to 20 sq ft per standard interior door and 15 sq ft per double-hung window.',
        example: 'Two doors and two windows deduct (2 × 20) + (2 × 15) = 70 sq ft.',
      },
      {
        term: 'PDS Spreading Rate vs. Planning Defaults',
        definition: 'Published PDS ranges for smooth primed drywall span 350–400 sq ft/gal (Sherwin-Williams) and 350–450 sq ft/gal (Benjamin Moore Aura/Regal Select). Our calculator uses 350 sq ft/gal as a conservative smooth-wall default, plus illustrative editable defaults of 275 sq ft/gal for textured and 175 sq ft/gal for rough masonry.',
        example: 'Adjust the coverage field in the widget if your chosen can specifies 400 sq ft/gal or if painting porous masonry.',
      },
    ],
    formula: {
      name: 'Interior Wall Paint Coverage Formula',
      equation: 'Perimeter = 2 × (Length + Width)\nGross Area = Perimeter × Ceiling Height\nNet Area = Gross Area - [(Doors × 20) + (Windows × 15)]\nTotal Paint Area = Net Area × Number of Coats\nGallons Needed = Total Paint Area / Coverage per Gallon (default 350 smooth)',
      explanation: [
        'Perimeter: Total linear footage of all walls.',
        'Net Area: Deducts editable door and window planning allowances so you do not significantly over-buy.',
        'Number of Coats: Standard practice plans for 2 coats for uniform sheen and color depth.',
        'Gallon + Quart Package Mix: When fractional need exceeds whole gallons by ≤ 0.25 gal, adding 1 quart (0.25 gal) suffices; from 0.25–0.50 gal, 2 quarts (0.50 gal) suffice; above 0.50 gal, rounding up to the next full gallon matches calculator output and often costs less.',
      ],
    },
    steps: [
      'Measure the length and width of the room in feet with a tape measure.',
      'Add length and width together and multiply by 2 to find the room perimeter.',
      'Multiply the perimeter by ceiling height (commonly 8, 9, or 10 feet) to get gross wall area.',
      'Count doors and windows using the 20 sq ft door / 15 sq ft window defaults (or enter custom opening sizes for oversized patio doors or bay windows).',
      'Multiply net square footage by the number of coats (typically 2 coats) and divide by your surface coverage rate (350 sq ft/gal smooth default, 275 textured, 175 rough).',
      'Compare exact gallons required against a Gallon + Quart package mix (or buy an extra full gallon if you want spare touch-up paint or a 5-gallon pail for larger jobs).',
    ],
    workedExamples: [
      {
        title: 'Example 1: Standard 12×15 ft Bedroom with 8 ft Ceilings (2 coats)',
        scenario: 'Repainting a smooth bedroom with 2 doors (closet and entry) and 2 exterior windows at 350 sq ft/gal.',
        steps: [
          'Perimeter = 2 × (12 + 15) = 54 linear feet.',
          'Gross Wall Area = 54 × 8 = 432 square feet.',
          'Deductions = (2 doors × 20) + (2 windows × 15) = 40 + 30 = 70 sq ft.',
          'Net Wall Area = 432 - 70 = 362 square feet.',
          'Two Coats = 362 × 2 = 724 square feet total coverage.',
          'Gallons = 724 ÷ 350 = 2.07 gallons (0.07 gal excess ≤ 0.25 gal).',
        ],
        result: 'Estimated need is 2.07 gallons; the package optimizer suggests 2 Gallons + 1 Quart (2.25 gal, leaving a 0.18 gal touch-up buffer)—or 3 full gallons for extra long-term touch-up stock.',
      },
      {
        title: 'Example 2: Small Powder Room (5×7 ft with 9 ft Ceilings)',
        scenario: 'Painting a compact half-bath with 1 entry door and no windows at 350 sq ft/gal.',
        steps: [
          'Perimeter = 2 × (5 + 7) = 24 linear feet.',
          'Gross Area = 24 × 9 = 216 sq ft.',
          'Deduction = 1 door × 20 = 20 sq ft.',
          'Net Area = 216 - 20 = 196 sq ft.',
          'Two Coats = 196 × 2 = 392 sq ft.',
          'Gallons = 392 ÷ 350 = 1.12 gallons (0.12 gal excess ≤ 0.25 gal).',
        ],
        result: 'Purchase 1 Gallon + 1 Quart (1.25 gal, leaving a 0.13 gal reserve).',
      },
      {
        title: 'Example 3: Single 10×14 ft Accent Wall (1 Coat Refresh)',
        scenario: 'Applying a single fresh coat of identical color to a clean feature wall with no openings.',
        steps: [
          'Wall Area = 10 × 14 = 140 square feet.',
          '1 Coat = 140 sq ft.',
          'Gallons = 140 ÷ 350 = 0.40 gallons (0.25 < 0.40 ≤ 0.50 gal).',
        ],
        result: 'Purchase 2 Quarts (0.50 gal total, leaving a 0.10 gal reserve).',
      },
      {
        title: 'Example 4: Calculating Ceiling Paint for a 14×18 ft Living Room',
        scenario: 'Painting the ceiling white with a dedicated flat ceiling paint (1 coat).',
        steps: [
          'Ceiling Area = Length × Width = 14 × 18 = 252 square feet.',
          '1 Coat = 252 sq ft.',
          'Gallons = 252 ÷ 350 = 0.72 gallons.',
        ],
        result: 'Buy 1 gallon of flat ceiling paint.',
      },
    ],
    realWorldConsiderations: [
      {
        factor: 'Drywall Texture & Porosity',
        description: 'Heavily textured drywall (orange peel, knockdown, or skip trowel) and unprimed porous surfaces significantly increase surface area compared to smooth level-5 drywall.',
        impact: 'Switch the calculator preset to Textured (275 sq ft/gal) or Rough Masonry (175 sq ft/gal) as illustrative planning defaults.',
      },
      {
        factor: 'Dark to Light Color Transitions',
        description: 'Painting pale off-white over deep red, navy, or dark gray requires more than 2 coats unless a high-hiding grey-tinted primer is applied first.',
        impact: 'Apply 1 coat of tinted primer plus 2 coats of topcoat rather than attempting 3-4 coats of expensive topcoat.',
      },
      {
        factor: 'Boxing Paint for Color Uniformity',
        description: 'Computerized tint dispensers can have minute 0.5% shade variances between separate gallon cans.',
        impact: 'Pour all gallon cans into a single 5-gallon bucket ("boxing") and stir thoroughly before rolling.',
      },
    ],
    commonMistakes: [
      {
        title: 'Assuming "Paint + Primer" eliminates the need for 2 coats',
        description: 'Paint-and-primer products have better adhesion, but rarely achieve full color depth and uniform sheen in a single coat.',
        fix: 'Always budget for 2 coats, regardless of marketing claims on the can.',
      },
      {
        title: 'Failing to prime bare drywall patches or repairs',
        description: 'Bare spackle and drywall mud absorb paint moisture quickly, causing "flashing" (dull spots that reflect light differently).',
        fix: 'Spot-prime all spackled holes and patched joints before applying wall paint.',
      },
      {
        title: 'Forgetting touch-up paint storage',
        description: 'Purchasing the bare minimum leaves zero paint for touching up future scuffs or furniture marks.',
        fix: 'Always round up so you have at least 1 quart of leftover paint stored in a climate-controlled space.',
      },
    ],
    practicalTips: [
      'The 5-Gallon Contractor Rule: If your room calculation calls for 4 or more gallons, purchase a single 5-gallon contractor bucket. It typically costs 15% to 20% less than 4 individual gallon cans.',
      'Proper Storage: Never store leftover paint in an unheated garage or shed where it can freeze. Extreme cold destroys the chemical binders and emulsifiers in latex paint.',
      'Clean Rim Seal: Before hammering the lid closed, place plastic wrap over the can mouth. This prevents dried paint flakes from falling into the liquid when reopened.',
    ],
    faqs: [
      {
        question: 'Does primer need the same amount of coverage as paint?',
        answer: 'Yes, primer generally covers between 300 and 350 sq ft per gallon. Bare drywall absorbs primer quickly, so expect the lower end of that range on new construction.',
      },
      {
        question: 'How much paint do I need for baseboards and doors?',
        answer: 'Two standard interior six-panel doors (front, back, and frame) require approximately 1 quart of semi-gloss enamel paint.',
      },
      {
        question: 'What finish/sheen should I use for each room?',
        answer: 'Flat/Matte for ceilings and low-traffic bedrooms; Eggshell or Satin for living rooms, hallways, and kids bedrooms; Semi-Gloss for bathrooms, kitchens, doors, and trim for moisture and wipe-down resistance.',
      },
    ],
    finalTakeaway: 'Calculating paint requirements takes the guesswork out of home improvement. By measuring room perimeter, subtracting window and door allowances, budgeting for two coats at 350 sq ft per gallon, and accounting for wall texture, your project will run smoothly without extra trips to the hardware store.',
  },

  // 5. HOW TO CALCULATE FLOORING NEEDED FOR A ROOM
  {
    slug: 'how-to-calculate-flooring',
    title: 'How to Calculate Flooring Needed for a Room',
    description: 'Master flooring estimation: room square footage, cutting waste percentages, plank box rounding, and allowances for complex layouts.',
    excerpt: 'Master flooring estimation: room square footage, cutting waste percentages, plank box rounding, and allowances for complex layouts.',
    category: 'Home',
    publishedDate: 'February 02, 2026',
    updatedDate: 'February 26, 2026',
    readingTime: '6 min read',
    readTime: '6 min read',
    relatedTools: ['flooring', 'tile', 'paint'],
    relatedGuides: ['how-much-paint-do-i-need', 'how-to-calculate-percentage'],
    shortIntro: 'Whether installing luxury vinyl plank (LVP), engineered hardwood, or tile, ordering only the exact square footage of your floor guarantees you will run short. Wall cuts, staggered joints, and damaged pieces require a calculated waste allowance.',
    directAnswer: 'To calculate flooring needed: measure room length and width (breaking L-shaped rooms into rectangles), add an illustrative waste allowance (typically 10% for straight parallel planks, 15% for 45° diagonal, or 20% for herringbone layouts), divide by the square footage printed on the carton, and round UP to the next whole box. Boxes = ceil((Sq Ft × [1 + Waste% / 100]) ÷ Box Size).',
    quickAnswer: {
      text: 'Calculate your net floor area (Length × Width), add an illustrative waste buffer (10% straight lay, 15% diagonal 45°, or 20% herringbone—more for cut-up hallways), divide by carton coverage, and round up to whole cartons.',
      formula: 'Total Sq Ft = (Length × Width) × (1 + Waste % / 100)  |  Boxes = ceil(Total Sq Ft / Sq Ft per Box)',
      example: '14×18 ft room (252 sq ft) + 10% straight-lay buffer = 277.2 sq ft. At 21.5 sq ft/box: 277.2 ÷ 21.5 = 12.89 → Order 13 boxes (279.5 sq ft).',
      targetCalculatorText: 'Flooring Calculator',
    },
    conceptsIntro: 'Flooring materials are packaged in fixed cartons rather than sold by exact square foot. Accurate planning converts room geometry into whole boxes with matched dye lots and repair stock.',
    concepts: [
      {
        term: 'Net Floor Area',
        definition: 'The actual floor surface area inside the room, including closets and alcoves (Length × Width in feet). For L-shaped rooms, sum individual rectangular zones.',
        example: 'A 12×15 ft bedroom has 180 sq ft of floor area.',
      },
      {
        term: 'Illustrative Waste Allowance (Cutting Margin)',
        definition: 'Extra material budgeted for perimeter cuts, staggered end-joint minimums, closet transitions, and board defect culling. Common planning starting points are 10% (straight lay), 15% (diagonal 45°), and 20% (herringbone), adjusted higher for narrow corridors or non-square walls.',
        example: '180 sq ft × 1.10 = 198 sq ft of straight-lay order coverage.',
      },
      {
        term: 'Carton Coverage & Whole-Box Rounding',
        definition: 'Manufacturers sell planks strictly in full sealed cartons (commonly 18 to 25 sq ft/box), so any fractional box requirement rounds up to the next whole carton.',
        example: 'Needing 12.89 cartons rounds up to 13 full boxes.',
      },
      {
        term: 'Dye Lot Matching & Attic Stock',
        definition: 'Cartons from different factory production runs can vary subtly in gloss or stain tone. Retaining spare planks ("attic stock") from the same batch makes future board replacements seamless.',
        example: 'Keep 1 unopened carton stored flat in a climate-controlled closet.',
      },
    ],
    formula: {
      name: 'Flooring Area, Carton Rounding & Cost Formulas',
      equation: 'Net Area = Room Length (ft) × Room Width (ft)\nTotal Area with Waste = Net Area × (1 + (Waste % / 100))\nBoxes to Order = ceil(Total Area with Waste / Box Coverage)\nActual Area Purchased = Boxes to Order × Box Coverage\nTotal Material Cost = Actual Area Purchased × Price per Sq Ft',
      explanation: [
        'Net Area: Sum rectangular sections if the room includes closets, bay alcoves, or an L-shaped hallway.',
        'Illustrative Waste Factor: 10% straight (1.10×), 15% diagonal (1.15×), 20% herringbone (1.20×)—editable in the calculator based on room complexity.',
        'Whole-Box Costing: Suppliers charge for Actual Area Purchased (full cartons rounded up), not just the unrounded target square footage.',
      ],
    },
    steps: [
      'Sketch the floor plan and divide L-shaped spaces, alcoves, and walk-in closets into measurable rectangles from drywall to drywall (not baseboard to baseboard).',
      'Multiply length by width for each zone and sum them to find total net square footage.',
      'Apply an illustrative waste percentage suited to your layout and room complexity (10% straight lay, 15% diagonal 45°, 20% herringbone—or slightly higher for cut-up hallways or wide-plank culling).',
      'Check the exact square footage per box printed on the manufacturer carton label (e.g., 21.5 sq ft/box).',
      'Divide your buffered total square footage by carton coverage and round UP to the nearest whole carton.',
      'Order all cartons together from the same production dye lot, including enough leftover/unopened planks for attic stock.',
    ],
    workedExamples: [
      {
        title: 'Example 1: 14×18 ft Living Room with Luxury Vinyl Plank (10% Straight Lay)',
        scenario: 'Installing click-lock LVP sold in 21.5 sq ft boxes with an illustrative 10% straight-lay waste allowance.',
        steps: [
          'Net Area = 14 × 18 = 252.0 square feet.',
          'Add 10% waste = 252 × 1.10 = 277.2 square feet.',
          'Divide by box size: 277.2 ÷ 21.5 = 12.893 boxes.',
          'Round up: 13 full boxes (13 × 21.5 = 279.5 sq ft purchased, giving 27.5 sq ft total reserve over net area).',
        ],
        result: 'Purchase 13 boxes (279.5 sq ft total material).',
      },
      {
        title: 'Example 2: Irregular L-Shaped Hallway & Closet Zone',
        scenario: 'Breaking an irregular floor plan into two rectangles—Main Hall (8×12 ft = 96 sq ft) + Alcove & Closet (6×6 ft = 36 sq ft)—with a 15% allowance for tight doorways and narrow-width end cuts.',
        steps: [
          'Total Net Area = 96 + 36 = 132.0 sq ft.',
          'Add 15% cut allowance: 132 × 1.15 = 151.8 sq ft.',
          'Divide by 20 sq ft/box: 151.8 ÷ 20 = 7.59 boxes.',
          'Round up to whole cartons: 8 boxes (160 sq ft purchased).',
        ],
        result: 'Order 8 full boxes (160 sq ft, providing 28 sq ft above net floor area for intricate doorway cuts and spare boards).',
      },
      {
        title: 'Example 3: Herringbone Hardwood in a 12×12 ft Dining Room (20% Waste)',
        scenario: 'Patterned herringbone layouts require repeated angled end cuts along every perimeter wall and tighter grain/tongue alignment, using our calculator’s 20% herringbone planning allowance.',
        steps: [
          'Net Area = 12 × 12 = 144.0 square feet.',
          'Add 20% herringbone waste factor: 144 × 1.20 = 172.8 square feet.',
          'Box size: 18.2 sq ft per carton.',
          'Exact cartons: 172.8 ÷ 18.2 = 9.495 cartons.',
          'Round up to whole boxes: 10 full cartons (10 × 18.2 = 182.0 sq ft purchased).',
        ],
        result: 'Purchase 10 boxes (182.0 sq ft total), keeping leftover full planks in the same dye lot as attic stock.',
      },
      {
        title: 'Example 4: Calculating Total Purchased Material Cost',
        scenario: 'Checking your real checkout price on the 13 cartons (279.5 sq ft) from Example 1 at $3.49/sq ft.',
        steps: [
          'Actual Purchased Area = 13 boxes × 21.5 sq ft/box = 279.5 sq ft.',
          'Pre-tax material subtotal: 279.5 sq ft × $3.49/sq ft = $975.46 ($975.455 rounded to cents).',
          'Add 7% illustrative sales tax: $975.455 × 1.07 = $1,043.74.',
        ],
        result: 'Total flooring material cost (based on full cartons) is $975.46 pre-tax, or $1,043.74 with 7% sales tax.',
      },
    ],
    realWorldConsiderations: [
      {
        factor: 'Dye Lot Matching and Reorder Hazards',
        description: 'Flooring manufacturers produce planks in distinct batches ("dye lots"). Ordering one short box weeks later frequently introduces visible shade, grain, or gloss mismatches.',
        impact: 'Verify all cartons share the same Run/Lot number and buy your entire project quantity—plus repair reserve—in one order.',
      },
      {
        factor: 'Attic Stock for Future Repairs',
        description: 'Plumbing leaks, dropped heavy items, and pet scratches happen years after installation, when lines may be discontinued.',
        impact: 'Retain spare full-length boards or an unopened carton stored flat inside a climate-controlled space.',
      },
      {
        factor: 'Room Geometry, Acclimation & Expansion Gaps',
        description: 'Actual waste depends on room complexity, plank width, and installer skill—not pattern alone. Solid hardwood typically acclimates 3–7 days (48 hours for engineered/LVP), with a 1/4–3/8 inch perimeter expansion gap hidden under baseboards.',
        impact: 'Follow the manufacturer technical sheet for acclimation hours and perimeter expansion spacing before cutting.',
      },
    ],
    commonMistakes: [
      {
        title: 'Skipping the waste allowance to shave budget',
        description: 'Ordering exact net square footage leaves installers short on the final rows when short perimeter cut-offs cannot be reused.',
        fix: 'Budget an illustrative cut allowance suited to your layout (commonly 10% straight, 15% diagonal, or 20% herringbone, plus extra for irregular closets/alcoves).',
      },
      {
        title: 'Forgetting closets and door jamb undercuts',
        description: 'Walk-in closets and doorway thresholds add 15 to 35 square feet that homeowners frequently omit when measuring room perimeters.',
        fix: 'Sketch the room floor plan and explicitly include each closet and alcove rectangle.',
      },
      {
        title: 'Measuring from baseboards rather than drywall',
        description: 'Flooring installs up to the drywall wall plate beneath baseboards or shoe moulding.',
        fix: 'Measure wall-to-wall rather than inside existing quarter-round trim.',
      },
    ],
    practicalTips: [
      'Stagger End Joints by at Least 6 to 8 Inches: Avoid aligning end seams across adjacent plank rows to prevent weak joints and stair-step visual patterns.',
      'Verify Unopened Carton Return Policies: Many home improvement retailers accept unopened full boxes within 90 days—making it safer to add one spare box up front from the same dye lot than risk mid-job delays.',
      'Check Underlayment Requirements: If your LVP or laminate already has attached acoustic foam, skip extra padding (which can void warranties); for unbacked floors, add ~5% extra roll underlayment for tape overlaps.',
    ],
    faqs: [
      {
        question: 'Do I need extra underlayment when installing flooring?',
        answer: 'If your flooring has pre-attached foam padding, additional underlayment is usually unnecessary and can void manufacturer warranties. For bare planks, order roll underlayment matching net area plus ~5% for seam overlaps.',
      },
      {
        question: 'What if my room is L-shaped or not a perfect rectangle?',
        answer: 'Divide irregular or L-shaped rooms into smaller rectangles, sum their square footages first, and consider bumping the waste buffer (for example from 10% toward 15%) to handle extra doorway and corner cuts.',
      },
      {
        question: 'How much extra should I allow for diagonal vs. herringbone layouts?',
        answer: 'Our Flooring Calculator uses illustrative trade starting allowances of 10% for straight parallel planks, 15% for 45° diagonal layouts, and 20% for herringbone patterns because angled perimeter cuts produce more non-reusable offcuts.',
      },
    ],
    finalTakeaway: 'Accurate flooring orders start with summing wall-to-wall rectangular zones, adding an illustrative pattern and geometry buffer (10% straight, 15% diagonal, 20% herringbone), rounding up to whole cartons from a single dye lot, and stashing spare boards as attic stock.',
  },
];
