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
    directAnswer: 'One gallon of quality interior wall paint covers approximately 350 to 400 square feet with one coat. To find your gallons needed: measure the room perimeter, multiply by the ceiling height, subtract 20 sq ft per door and 15 sq ft per window, multiply by 2 coats, and divide by 350. Gallons = (Net Sq Ft × Coats) ÷ 350.',
    quickAnswer: {
      text: 'One gallon of paint covers 350 to 400 sq ft for a single coat. For standard two-coat coverage, compute your net wall area (perimeter × height minus doors and windows), multiply by 2, and divide by 350.',
      formula: 'Gallons = [(Perimeter × Height) - (Doors × 20 + Windows × 15)] × Coats / 350',
      example: '12×15 ft room with 8 ft ceiling: Perimeter = 54 ft. Gross area = 432 sq ft. Net area (1 door, 2 windows) = 382 sq ft. 2 coats = 764 sq ft ÷ 350 = 2.18 gal → Buy 3 gallons.',
      targetCalculatorText: 'Paint Calculator',
    },
    conceptsIntro: 'Accurate paint estimation depends on understanding the geometry of your room and the physical characteristics of paint application.',
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
        definition: 'Standard surface areas subtracted for unpainted openings. Standard doors are approximately 20 sq ft; standard windows are roughly 15 sq ft.',
        example: 'Two doors and two windows deduct (2 × 20) + (2 × 15) = 70 sq ft.',
      },
      {
        term: 'Coverage Rate (Spreading Rate)',
        definition: 'The square footage one gallon of paint covers at standard wet-film thickness. 350 sq ft/gal is the professional baseline for smooth drywall.',
        example: 'High-end paints achieve ~400 sq ft/gal on sealed walls; textured drywall averages ~300 sq ft/gal.',
      },
    ],
    formula: {
      name: 'Interior Wall Paint Coverage Formula',
      equation: 'Perimeter = 2 × (Length + Width)\nGross Area = Perimeter × Ceiling Height\nNet Area = Gross Area - [(Doors × 20) + (Windows × 15)]\nTotal Paint Area = Net Area × Number of Coats\nGallons Needed = Total Paint Area / Coverage per Gallon (typically 350)',
      explanation: [
        'Perimeter: Total linear footage of all walls.',
        'Net Area: Deducts standard openings so you do not over-purchase paint.',
        'Number of Coats: Standard practice requires 2 coats for uniform sheen and color depth.',
        'Rounding: Always round fractional gallons up to the nearest whole gallon or quart.',
      ],
    },
    steps: [
      'Measure the length and width of the room in feet with a tape measure.',
      'Add length and width together and multiply by 2 to find the room perimeter.',
      'Multiply the perimeter by the ceiling height (commonly 8, 9, or 10 feet) to get gross wall area.',
      'Count the number of doors and windows, and subtract 20 sq ft per door and 15 sq ft per window.',
      'Multiply the resulting net square footage by the number of coats required (always plan for 2 coats).',
      'Divide by 350 (standard coverage per gallon) and round up to the next full gallon or quart.',
    ],
    workedExamples: [
      {
        title: 'Example 1: Standard 12×15 ft Bedroom with 8 ft Ceilings (2 coats)',
        scenario: 'Repainting a master bedroom with 2 doors (closet and entry) and 2 exterior windows.',
        steps: [
          'Perimeter = 2 × (12 + 15) = 54 linear feet.',
          'Gross Wall Area = 54 × 8 = 432 square feet.',
          'Deductions = (2 doors × 20) + (2 windows × 15) = 40 + 30 = 70 sq ft.',
          'Net Wall Area = 432 - 70 = 362 square feet.',
          'Two Coats = 362 × 2 = 724 square feet total coverage.',
          'Gallons = 724 ÷ 350 = 2.07 gallons.',
        ],
        result: 'Buy 2 gallons and 1 quart, or purchase 3 full gallons to keep touch-up paint on hand.',
      },
      {
        title: 'Example 2: Small Powder Room (5×7 ft with 9 ft Ceilings)',
        scenario: 'Painting a compact half-bath with 1 entry door and no windows.',
        steps: [
          'Perimeter = 2 × (5 + 7) = 24 linear feet.',
          'Gross Area = 24 × 9 = 216 sq ft.',
          'Deduction = 1 door × 20 = 20 sq ft.',
          'Net Area = 216 - 20 = 196 sq ft.',
          'Two Coats = 196 × 2 = 392 sq ft.',
          'Gallons = 392 ÷ 350 = 1.12 gallons.',
        ],
        result: 'Purchase 1 gallon plus 1 quart.',
      },
      {
        title: 'Example 3: Single 10×14 ft Accent Wall (1 Coat Refresh)',
        scenario: 'Applying a single fresh coat of identical color to a clean feature wall with no openings.',
        steps: [
          'Wall Area = 10 × 14 = 140 square feet.',
          '1 Coat = 140 sq ft.',
          'Gallons = 140 ÷ 350 = 0.40 gallons (approx. 1.6 quarts).',
        ],
        result: 'Buy 2 quarts of paint.',
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
        description: 'Heavily textured drywall (orange peel, knockdown, or skip trowel) increases surface area by 20% to 35% compared to smooth level-5 finish drywall.',
        impact: 'Reduce coverage rate to 275-300 sq ft per gallon when painting heavily textured walls.',
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
    directAnswer: 'To calculate flooring needed: measure room length and width in feet and multiply to get square footage. Add a waste factor (10% for straight planks, 15% for diagonal or herringbone layouts). Divide total square footage needed by the square footage per box, and round UP to the nearest whole box. Boxes = (Sq Ft × [1 + Waste% / 100]) ÷ Box Size.',
    quickAnswer: {
      text: 'Calculate your net square footage (Length × Width), add a 10% waste factor for straight plank layouts (or 15% for herringbone/diagonal), and divide by the square footage printed on the box, rounding up to the next full carton.',
      formula: 'Total Sq Ft = (Length × Width) × (1 + Waste % / 100)  |  Boxes = Total Sq Ft / Sq Ft per Box',
      example: '14×18 ft room (252 sq ft) + 10% waste = 277.2 sq ft. At 21.5 sq ft/box: 277.2 ÷ 21.5 = 12.89 → Order 13 boxes.',
      targetCalculatorText: 'Flooring Calculator',
    },
    conceptsIntro: 'Flooring materials are sold in pre-packaged cartons rather than custom dimensions. Estimating flooring accurately requires converting room dimensions into whole-box units.',
    concepts: [
      {
        term: 'Net Floor Area',
        definition: 'The actual floor surface area inside the room (Length × Width in feet).',
        example: 'A 12×15 ft bedroom has 180 sq ft of floor area.',
      },
      {
        term: 'Waste Allowance (Cutting Margin)',
        definition: 'Extra material required for wall cuts, joint offsets, closet transitions, and flawed planks. 10% is standard; 15% is needed for diagonal or herringbone designs.',
        example: '180 sq ft × 1.10 = 198 sq ft of ordered material.',
      },
      {
        term: 'Carton / Box Coverage',
        definition: 'The exact square footage contained within a single manufacturer package.',
        example: 'Luxury Vinyl Plank typically comes in boxes of 18 to 24 sq ft.',
      },
      {
        term: 'Expansion Gap',
        definition: 'A 1/4 to 3/8 inch perimeter spacing left between planks and walls to allow natural seasonal expansion without buckling.',
        example: 'Baseboards and shoe moulding conceal this expansion gap.',
      },
    ],
    formula: {
      name: 'Flooring Area & Box Requirement Formulas',
      equation: 'Net Area = Room Length (ft) × Room Width (ft)\nTotal Area with Waste = Net Area × (1 + (Waste % / 100))\nBoxes to Order = Total Area with Waste / Box Coverage (sq ft/box)\nTotal Cost = Boxes to Order × Box Coverage × Price per Sq Ft',
      explanation: [
        'Net Area: Calculated in square feet.',
        'Waste Factor: Standard straight installation uses 10% (multiplier of 1.10).',
        'Box Rounding: Always round up to the next integer box because retailers do not sell partial cartons.',
      ],
    },
    steps: [
      'Measure the maximum length and width of the room in feet (include closets and alcoves).',
      'Multiply length by width to obtain net floor square footage.',
      'Multiply by 1.10 (for straight installation) or 1.15 (for diagonal or herringbone patterns) to include cutting waste.',
      'Check the coverage per carton printed on your chosen flooring product (e.g., 22.4 sq ft/box).',
      'Divide the total square footage needed by the carton coverage rate.',
      'Round the resulting number up to the nearest whole integer box.',
    ],
    workedExamples: [
      {
        title: 'Example 1: 14×18 ft Living Room with Luxury Vinyl Plank (10% Waste)',
        scenario: 'Installing click-lock LVP sold in 21.5 sq ft boxes with standard 10% cutting waste.',
        steps: [
          'Net Area = 14 × 18 = 252 square feet.',
          'Add 10% waste = 252 × 1.10 = 277.2 square feet.',
          'Divide by box size: 277.2 ÷ 21.5 = 12.89 boxes.',
          'Round up: 13 full boxes.',
        ],
        result: 'Purchase 13 boxes (providing 279.5 sq ft of material).',
      },
      {
        title: 'Example 2: L-Shaped Hallway with Closets',
        scenario: 'An irregular room divided into two rectangles: section A (8×12 ft = 96 sq ft) and section B (6×6 ft = 36 sq ft).',
        steps: [
          'Total Net Area = 96 + 36 = 132 sq ft.',
          'Add 12% waste for multiple doorways and transitions: 132 × 1.12 = 147.84 sq ft.',
          'Divide by 20 sq ft/box = 147.84 ÷ 20 = 7.39 boxes.',
          'Round up: 8 boxes.',
        ],
        result: 'Order 8 boxes.',
      },
      {
        title: 'Example 3: Herringbone Hardwood in a 12×12 ft Dining Room (15% Waste)',
        scenario: 'Herringbone pattern requires 45-degree angle cuts along every perimeter wall.',
        steps: [
          'Net Area = 12 × 12 = 144 square feet.',
          'Add 15% waste factor: 144 × 1.15 = 165.6 square feet.',
          'Box size: 18.2 sq ft per carton.',
          'Cartons = 165.6 ÷ 18.2 = 9.09 cartons.',
          'Round up: 10 full cartons.',
        ],
        result: 'Purchase 10 boxes (182 sq ft).',
      },
      {
        title: 'Example 4: Calculating Total Material Cost',
        scenario: 'You need 13 boxes of flooring (279.5 sq ft) priced at $3.49 per square foot.',
        steps: [
          'Total Material = 13 boxes × 21.5 sq ft/box = 279.5 sq ft.',
          'Cost = 279.5 sq ft × $3.49/sq ft = $975.46.',
          'Add local sales tax (e.g. 7%): $975.46 × 1.07 = $1,043.74.',
        ],
        result: 'Total flooring material cost is $1,043.74.',
      },
    ],
    realWorldConsiderations: [
      {
        factor: 'Dye Lot Matching and Reorder Hazards',
        description: 'Flooring manufacturers produce planks in distinct batches ("dye lots"). If you run one box short and reorder two weeks later, the new box may have visible shade or sheen differences.',
        impact: 'Order sufficient material upfront in a single order to guarantee all boxes share the same production run.',
      },
      {
        factor: 'Attic Stock for Future Repairs',
        description: 'Plumbing leaks, dropped heavy objects, and deep scratches will eventually occur over the life of a floor. If the flooring style is discontinued, replacing a single plank becomes impossible without spare boards.',
        impact: 'Retain at least one full unopened carton stored flat in a closet or climate-controlled space.',
      },
      {
        factor: 'Subfloor Acclimation',
        description: 'Hardwood and laminate expand or contract based on ambient indoor humidity.',
        impact: 'Store unopened boxes flat inside the installation room for 48 to 72 hours before installation begins.',
      },
    ],
    commonMistakes: [
      {
        title: 'Skipping the waste allowance to shave budget',
        description: 'Ordering exact square footage leaves you stranded on the final rows when cut ends cannot be reused.',
        fix: 'Never order less than 10% cutting waste for straight layouts or 15% for diagonal installations.',
      },
      {
        title: 'Forgetting closets and door jamb undercuts',
        description: 'Walk-in closets and doorway thresholds add 15 to 35 square feet that homeowners frequently omit when measuring room perimeters.',
        fix: 'Sketch the room floor plan and explicitly measure each closet and alcove.',
      },
      {
        title: 'Measuring from baseboards rather than drywall',
        description: 'Flooring runs under baseboards up to the drywall edge.',
        fix: 'Measure from wall to wall, not from baseboard to baseboard.',
      },
    ],
    practicalTips: [
      'Stagger Joints by at Least 6 to 8 Inches: Avoid aligning end seams between adjacent plank rows to prevent structural weakness and visible seam grouping.',
      'Check Return Policies for Unopened Cartons: Most major home improvement retailers accept returns on full, unopened cartons within 90 days. It is safer to over-order by one box.',
      'Underlayment Math: If your flooring does not have pre-attached acoustic padding, order roll underlayment equal to your net square footage plus 5% for seam overlap tape.',
    ],
    faqs: [
      {
        question: 'Do I need extra underlayment when installing flooring?',
        answer: 'If your flooring has pre-attached foam padding, you do not need additional underlayment (and adding it can void manufacturer warranty). For bare planks, order roll underlayment matching your net room area plus 5% for overlaps.',
      },
      {
        question: 'What if my room is not a perfect rectangle?',
        answer: 'Divide irregular or L-shaped rooms into smaller individual rectangles. Calculate the area of each section separately and add them together before applying your waste percentage.',
      },
      {
        question: 'How much extra should I buy for diagonal plank layouts?',
        answer: 'Diagonal and herringbone layouts require 15% to 20% waste allowance because every perimeter board requires a 45-degree angle cut, generating more unusable scrap.',
      },
    ],
    finalTakeaway: 'Flooring estimation is straightforward when you calculate net square footage, add a realistic 10% to 15% waste factor, divide by the manufacturer carton coverage, and round up to the nearest whole box. Storing an extra carton ensures you are prepared for future repairs.',
  },
];
