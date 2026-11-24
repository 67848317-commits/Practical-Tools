import type { ToolDefinition } from '../types';

export const tools: ToolDefinition[] = [
  // ==========================================
  // CATEGORY 1: MONEY
  // ==========================================
  {
    slug: 'percentage',
    path: '/calculators/percentage',
    title: 'Percentage Calculator',
    shortTitle: 'Percentage',
    category: 'money',
    badge: 'Essential',
    metaTitle: 'Percentage Calculator – Fast, Step-by-Step Online Calculation',
    metaDescription: 'Calculate percentages of any number instantly. Includes percent change, percent of total, and reverse percentage formulas with step-by-step arithmetic.',
    shortIntro: 'Find the exact percentage of any number, calculate percentage increases or discounts, and determine the proportion between two figures with live arithmetic verification.',
    formulaDescription: 'Result = (Percentage / 100) × Base Number',
    formulaExplanation: [
      'Percentage Value: Multiply the base amount by (P / 100).',
      'What Percent X is of Y: Divide (X / Y) and multiply by 100.',
      'Percentage Increase/Decrease: ((New Value - Baseline) / |Baseline|) × 100.',
    ],
    howItWorks: [
      'Enter the percentage you want to evaluate (e.g. 15%).',
      'Enter the base number or initial value (e.g. 250).',
      'The engine immediately multiplies (15 / 100) × 250 to return 37.5.',
      'Inspect the step-by-step arithmetic breakdown below the primary result card.',
    ],
    examples: [
      {
        title: 'Calculate 15% of 250',
        scenario: 'You want to compute a standard 15% commission or tip on a $250 invoice.',
        steps: [
          'Convert 15% into decimal notation: 15 ÷ 100 = 0.15.',
          'Multiply by base value: 0.15 × 250 = 37.5.',
        ],
        result: '15% of 250 equals exactly 37.5 (or $37.50).',
      },
      {
        title: 'Exam Score Percentage (42 out of 50)',
        scenario: 'A student scored 42 points out of a 50-point exam.',
        steps: [
          'Divide score by total points: 42 ÷ 50 = 0.84.',
          'Convert decimal to percentage: 0.84 × 100 = 84%.',
        ],
        result: 'The test grade is 84% (B letter grade).',
      },
      {
        title: 'Salary Increase from $60,000 to $69,000',
        scenario: 'Your annual compensation increases by $9,000.',
        steps: [
          'Find absolute delta: $69,000 - $60,000 = $9,000.',
          'Divide by original baseline: $9,000 ÷ $60,000 = 0.15.',
          'Multiply by 100: 0.15 × 100 = +15%.',
        ],
        result: 'Your compensation increased by 15.0%.',
      },
    ],
    assumptions: [
      'Percentages are evaluated in linear base-10 arithmetic.',
      'Percentage changes assume the baseline is non-zero.',
      'Values round to 2 decimal places unless greater precision is requested.',
    ],
    commonMistakes: [
      {
        title: 'Dividing by the final value instead of the original',
        description: 'When computing percentage increase or decrease, always use the starting baseline in the denominator.',
        fix: 'Formula is always (New - Old) / Old, never (New - Old) / New.',
      },
      {
        title: 'Confusing percentage points with percent change',
        description: 'An interest rate rising from 4% to 5% is a 1 percentage point rise, but a 25% relative increase.',
        fix: 'State whether you are referencing relative change or absolute points.',
      },
    ],
    faqs: [
      {
        question: 'How do you calculate 15% of a number quickly in your head?',
        answer: 'Find 10% first by moving the decimal point one place to the left, then take half of that value (5%) and add them together. For example, 15% of $80: 10% is $8, 5% is $4, so $8 + $4 = $12.',
      },
      {
        question: 'How do I reverse a percentage tax or discount?',
        answer: 'To find the pre-tax price when tax is included at rate t%, divide the total by (1 + t/100). For example, $108 with 8% sales tax: 108 / 1.08 = $100 original price.',
      },
      {
        question: 'Can a percentage increase exceed 100%?',
        answer: 'Yes. Any increase where the final figure is more than double the starting figure exceeds 100%. An increase from 10 to 30 is a 200% increase.',
      },
    ],
    relatedSlugs: ['discount', 'tip', 'markup', 'salary-to-hourly'],
    keywords: ['percentage calculator', 'percent of number', 'calculate percentage', 'percent increase', 'percentage change'],
  },

  {
    slug: 'discount',
    path: '/calculators/discount',
    title: 'Discount Calculator',
    shortTitle: 'Discount',
    category: 'money',
    badge: 'Shopping',
    metaTitle: 'Discount Calculator – Sale Price, Savings & Tax',
    metaDescription: 'Calculate the final sale price, dollar savings, and percentage saved after retail discounts and optional sales tax.',
    shortIntro: 'Determine your exact final out-of-pocket cost and dollar savings after store markdowns, coupons, and local sales taxes.',
    formulaDescription: 'Discount Amount = Original Price × (Discount % / 100) | Final Price = Original Price - Discount Amount',
    formulaExplanation: [
      'Savings = Original Price × (Discount Percentage / 100)',
      'Pre-tax Sale Price = Original Price - Savings',
      'Final Out-of-Pocket = Pre-tax Sale Price + (Pre-tax Sale Price × Tax Rate / 100)',
    ],
    howItWorks: [
      'Enter the item sticker price before any markdowns.',
      'Input the discount percentage offered by the retailer.',
      'Optionally specify a second stacked promo code or local sales tax rate.',
      'The calculator computes your total savings and final register total.',
    ],
    examples: [
      {
        title: '30% Off a $120 Winter Coat',
        scenario: 'A retail jacket with an MSRP of $120 is marked down 30% during a clearance event.',
        steps: [
          'Calculate dollar discount: $120 × (30 / 100) = $36.00.',
          'Subtract savings from original price: $120 - $36 = $84.00.',
        ],
        result: 'You save $36.00 and pay $84.00 before tax.',
      },
      {
        title: 'Stacked Coupon: 20% Store Sale + Extra 10% VIP Coupon on $80',
        scenario: 'Applying an additional 10% coupon on an already discounted 20% item.',
        steps: [
          'First 20% discount: $80 - $16 = $64.00.',
          'Second 10% coupon applied to $64: $64 × 0.10 = $6.40 savings.',
          'Final price: $64 - $6.40 = $57.60 total savings of $22.40 (28% effective discount, not 30%).',
        ],
        result: 'Final price is $57.60 with total savings of $22.40.',
      },
    ],
    assumptions: [
      'Discounts are applied before sales tax unless local regulations stipulate post-tax rebates.',
      'Stacked discounts are calculated sequentially rather than summed additively.',
      'Prices cannot drop below $0.00.',
    ],
    commonMistakes: [
      {
        title: 'Adding stacked discounts together directly',
        description: 'A 20% discount followed by a 20% coupon does not equal 40% off. It equals 36% off because the second discount applies to the reduced price.',
        fix: 'Apply subsequent percentage discounts sequentially to each intermediate subtotal.',
      },
    ],
    faqs: [
      {
        question: 'Is sales tax calculated before or after the discount?',
        answer: 'In nearly all US states and jurisdictions, retail sales tax is applied to the discounted sale price, meaning you pay less sales tax when an item is on sale.',
      },
      {
        question: 'What does "save up to 50%" legally mean?',
        answer: 'It means the maximum discount in the store or category is 50%, but individual items may only be discounted by 10% or 15%.',
      },
    ],
    relatedSlugs: ['percentage', 'markup', 'tip'],
    keywords: ['discount calculator', 'sale price calculator', 'percent off calculator', 'coupon savings', 'clearance price'],
  },

  {
    slug: 'tip',
    path: '/calculators/tip',
    title: 'Tip Calculator',
    shortTitle: 'Tip & Bill Split',
    category: 'money',
    badge: 'Dining',
    metaTitle: 'Tip & Bill Split Calculator – Fast Per-Person Breakdown',
    metaDescription: 'Calculate restaurant gratuity and split the bill evenly among friends. Includes custom tip rates and pre-tax tipping options.',
    shortIntro: 'Calculate fair gratuity for restaurant dining, delivery, or hospitality services, with instant bill splitting among multiple guests.',
    formulaDescription: 'Tip Amount = Bill Total × (Tip % / 100) | Per Person = (Bill + Tip) / Number of Diners',
    formulaExplanation: [
      'Tip = Bill Subtotal × (Tip Percentage / 100)',
      'Total Payable = Bill Subtotal + Tip Amount',
      'Share per Guest = Total Payable ÷ Number of Diners',
    ],
    howItWorks: [
      'Enter the dining check total or subtotal before taxes.',
      'Select a tip percentage (standard 15%, 18%, 20%, or custom).',
      'Specify how many diners are sharing the bill evenly.',
      'View individual diner shares and total tip amount instantly.',
    ],
    examples: [
      {
        title: 'Dinner for Four ($140 bill with 20% tip)',
        scenario: 'Four friends split a dinner check totaling $140.00 with exceptional service.',
        steps: [
          'Calculate total gratuity: $140 × 0.20 = $28.00 tip.',
          'Calculate combined bill: $140 + $28 = $168.00.',
          'Divide evenly among 4 guests: $168 ÷ 4 = $42.00 each.',
        ],
        result: 'Total tip is $28.00; each person pays $42.00.',
      },
      {
        title: 'Solo lunch check ($18.50 with 18% tip)',
        scenario: 'A solo lunch diner tipping 18% on an $18.50 tab.',
        steps: [
          'Calculate tip: $18.50 × 0.18 = $3.33.',
          'Add to check: $18.50 + $3.33 = $21.83.',
        ],
        result: 'Total payment is $21.83 with a $3.33 tip.',
      },
    ],
    assumptions: [
      'Tips are calculated on the food and beverage subtotal before tax when possible.',
      'Diners split the total evenly; individual itemized splits are not accounted for.',
      'Service charges or auto-gratuities already added by the venue must not be double-tipped.',
    ],
    commonMistakes: [
      {
        title: 'Tipping on top of an automatic service charge',
        description: 'Large parties of 6 or more often already include an 18% or 20% automatic gratuity on the receipt.',
        fix: 'Check the receipt line items for "Service Charge" or "Auto-Gratuity" before adding an additional tip.',
      },
    ],
    faqs: [
      {
        question: 'Should I tip on the pre-tax or post-tax total?',
        answer: 'Standard dining etiquette suggests calculating gratuity on the pre-tax food and beverage subtotal, though many diners tip on the post-tax total for simplicity.',
      },
      {
        question: 'What is the standard tipping percentage in the United States?',
        answer: '15% for acceptable service, 18% for good service, and 20%+ for excellent service at sit-down dining establishments.',
      },
    ],
    relatedSlugs: ['percentage', 'discount', 'salary-to-hourly'],
    keywords: ['tip calculator', 'bill split calculator', 'gratuity calculator', 'restaurant tip', 'split check'],
  },

  {
    slug: 'salary-to-hourly',
    path: '/calculators/salary-to-hourly',
    title: 'Salary to Hourly Calculator',
    shortTitle: 'Salary to Hourly',
    category: 'money',
    badge: 'Career',
    metaTitle: 'Salary to Hourly Wage Calculator – Annual to Hourly Pay',
    metaDescription: 'Convert annual salary into equivalent hourly, weekly, bi-weekly, and monthly rates. Customize hours worked per week and paid weeks per year.',
    shortIntro: 'Convert an annual salaried compensation figure into exact hourly wage, weekly paycheck, bi-weekly direct deposit, and monthly earnings.',
    formulaDescription: 'Hourly Rate = Annual Salary / (Hours per Week × Weeks per Year)',
    formulaExplanation: [
      'Annual Working Hours = Hours per Week × Weeks per Year (standard: 40 × 52 = 2,080 hours)',
      'Hourly Wage = Annual Gross Salary ÷ Annual Working Hours',
      'Weekly Gross = Annual Salary ÷ Weeks per Year',
      'Monthly Gross = Annual Salary ÷ 12',
    ],
    howItWorks: [
      'Enter your gross annual salary (e.g. $75,000).',
      'Specify expected weekly working hours (default standard: 40 hours).',
      'Set weeks worked per year (52 weeks standard, or 50 if taking 2 weeks unpaid leave).',
      'The calculator computes your gross equivalent across all payroll frequencies.',
    ],
    examples: [
      {
        title: '$75,000 Annual Salary at Standard 40 Hours/Week',
        scenario: 'A full-time corporate role paying $75,000 yearly across 52 weeks.',
        steps: [
          'Calculate total yearly hours: 40 hours × 52 weeks = 2,080 work hours.',
          'Divide salary: $75,000 ÷ 2,080 hours = $36.06 per hour.',
          'Monthly gross: $75,000 ÷ 12 = $6,250.00.',
        ],
        result: 'Equivalent to $36.06/hour, $1,442.31/week, and $6,250.00/month.',
      },
      {
        title: '$52,000 Salary with 2 Weeks Unpaid Vacation (50 Weeks)',
        scenario: 'Contractor working 35 hours per week for 50 paid weeks.',
        steps: [
          'Total hours: 35 hours × 50 weeks = 1,750 work hours.',
          'Hourly rate: $52,000 ÷ 1,750 hours = $29.71 per hour.',
        ],
        result: 'Equivalent to $29.71/hour.',
      },
    ],
    assumptions: [
      'Calculations reflect gross pre-tax income before income tax, FICA, or retirement deductions.',
      'Assumes consistent weekly hours without overtime multipliers.',
      'Paid holidays and PTO are counted as paid work time unless weeks worked is explicitly reduced.',
    ],
    commonMistakes: [
      {
        title: 'Assuming monthly pay is simply 4 times weekly pay',
        description: 'A month has an average of 4.333 weeks (52 / 12), not exactly 4 weeks.',
        fix: 'Calculate monthly salary by dividing annual pay by 12, or multiplying weekly pay by 4.333.',
      },
    ],
    faqs: [
      {
        question: 'How many work hours are in a standard year?',
        answer: 'A standard full-time year (40 hours/week × 52 weeks) equals 2,080 working hours. For a leap year with 261 workdays, it equals 2,088 hours.',
      },
      {
        question: 'Does this calculator include payroll taxes or benefits?',
        answer: 'No. This calculates gross pre-tax wage equivalence. Net take-home pay depends on federal/state withholding, health insurance premiums, and 401(k) contributions.',
      },
    ],
    relatedSlugs: ['hours', 'percentage', 'commute-cost'],
    keywords: ['salary to hourly calculator', 'annual salary to hourly wage', 'paycheck calculator', 'wage converter', 'hourly rate from salary'],
  },

  {
    slug: 'markup',
    path: '/calculators/markup',
    title: 'Markup Calculator',
    shortTitle: 'Markup & Margin',
    category: 'money',
    badge: 'Business',
    metaTitle: 'Markup Calculator – Profit Margin & Selling Price Tool',
    metaDescription: 'Calculate selling price, gross profit, and gross profit margin percentage from wholesale cost price and target markup.',
    shortIntro: 'Determine your retail selling price and clarify the critical financial difference between markup percentage and gross profit margin.',
    formulaDescription: 'Selling Price = Cost × (1 + Markup / 100) | Margin % = (Profit / Selling Price) × 100',
    formulaExplanation: [
      'Dollar Profit = Cost Price × (Markup Percentage / 100)',
      'Selling Price = Cost Price + Dollar Profit',
      'Gross Margin % = (Dollar Profit / Selling Price) × 100',
    ],
    howItWorks: [
      'Enter your wholesale or unit manufacturing cost.',
      'Specify your desired markup percentage (e.g. 50%).',
      'The calculator computes the required selling price, dollar profit, and resulting profit margin.',
    ],
    examples: [
      {
        title: '50% Markup on a $40 Product',
        scenario: 'A retailer purchases an inventory item for $40 and marks it up 50%.',
        steps: [
          'Calculate profit: $40 × (50 / 100) = $20.00 profit.',
          'Selling price: $40 + $20 = $60.00.',
          'Gross margin: ($20 ÷ $60) × 100 = 33.33% margin.',
        ],
        result: 'Selling price is $60.00 with a 33.33% profit margin.',
      },
      {
        title: '100% Markup (Keystone Pricing) on $25 Item',
        scenario: 'Standard retail keystone pricing doubling the wholesale cost.',
        steps: [
          'Profit: $25 × 1.00 = $25.00 profit.',
          'Selling price: $25 + $25 = $50.00.',
          'Gross margin: ($25 ÷ $50) × 100 = 50.0% margin.',
        ],
        result: 'Selling price is $50.00 with an exact 50.0% gross margin.',
      },
    ],
    assumptions: [
      'Cost reflects direct cost of goods sold (COGS) for a single unit.',
      'Selling price does not include customer sales tax or shipping surcharges.',
      'Gross profit margin does not factor in general overhead or administrative fixed costs.',
    ],
    commonMistakes: [
      {
        title: 'Confusing markup percentage with gross margin percentage',
        description: 'A 50% markup yields a 33.3% margin, not a 50% margin. Markup is relative to cost, whereas margin is relative to selling price.',
        fix: 'Always verify whether business targets specify markup (over cost) or margin (share of revenue).',
      },
    ],
    faqs: [
      {
        question: 'What is keystone pricing in retail?',
        answer: 'Keystone pricing is a retail rule of thumb where merchandise is priced at double wholesale cost (100% markup), resulting in a 50% gross margin.',
      },
      {
        question: 'Can gross margin ever exceed 100%?',
        answer: 'No. Gross margin cannot exceed 100% because profit cannot exceed total revenue unless cost is negative. In contrast, markup can be 200%, 500%, or higher.',
      },
    ],
    relatedSlugs: ['percentage', 'discount', 'salary-to-hourly'],
    keywords: ['markup calculator', 'profit margin calculator', 'selling price calculator', 'cost markup', 'keystone pricing'],
  },

  // ==========================================
  // CATEGORY 2: HOME & CONSTRUCTION
  // ==========================================
  {
    slug: 'paint',
    path: '/calculators/paint',
    title: 'Paint Calculator',
    shortTitle: 'Paint Estimator',
    category: 'home',
    badge: 'DIY',
    metaTitle: 'Paint Calculator – Room Square Footage & Gallons Needed',
    metaDescription: 'Calculate how many gallons of paint you need for any room. Automatically deducts doors and windows, and factors in multiple coats.',
    shortIntro: 'Estimate exact paint volume required for interior walls and ceilings, factoring in standard door and window deductions and multiple coats.',
    formulaDescription: 'Net Area = (Perimeter × Height) - Deductions | Gallons = (Net Area × Coats) / 350',
    formulaExplanation: [
      'Wall Perimeter = 2 × (Length + Width)',
      'Gross Wall Area = Perimeter × Wall Height',
      'Deductions = (Doors × 20 sq ft) + (Windows × 15 sq ft) [Illustrative planning defaults]',
      'Net Paintable Area = max(0, Gross Wall Area - Deductions)',
      'Paint Required = (Net Paintable Area × Number of Coats) ÷ Spreading Coverage',
      'Suggested Package Mix = Whole Gallons + Quarts (for requirements exceeding whole gallons)',
    ],
    howItWorks: [
      'Enter room dimensions: length, width, and wall height in feet (or meters).',
      'Input the count of standard interior doors (~20 sq ft planning default) and windows (~15 sq ft default).',
      'Select wall texture (smooth primed drywall covers 350 sq ft/gal; textured covers 275 sq ft/gal).',
      'Select coats (2 coats recommended for even, durable opacity).',
      'View net paintable area, total paint volume, and the suggested Gallon + Quart retail package combination.',
    ],
    examples: [
      {
        title: '14×12 ft Bedroom with 8 ft Ceilings (2 coats)',
        scenario: 'Painting a standard bedroom with 1 door and 2 windows.',
        steps: [
          'Gross wall area: 2 × (14 + 12) × 8 = 52 × 8 = 416 sq ft.',
          'Deductions: 1 door (20 sq ft) + 2 windows (30 sq ft) = 50 sq ft.',
          'Net area: 416 - 50 = 366 sq ft.',
          'Two coats: 366 × 2 = 732 sq ft total coverage needed.',
          'Gallons required: 732 ÷ 350 = 2.09 gallons.',
          'Package Suggestion: Buying 2 Gallons + 1 Quart provides 2.25 Gal (leaving a 0.16 Gal touchup buffer).',
        ],
        result: 'Buy 2 Gallons + 1 Quart for exact coverage with a touch-up buffer.',
      },
    ],
    assumptions: [
      'Standard paint spreading rate is 350 square feet per gallon on pre-primed drywall (Sherwin-Williams & Benjamin Moore Technical Specifications).',
      'Standard interior door opening deduction is an illustrative planning convention of 20 sq ft (nominal 32"×80" plus casing trim).',
      'Standard window opening deduction is an illustrative planning convention of 15 sq ft (nominal 3×5 ft).',
      'Package combination guide assumes 1 gallon = 4 quarts; purchasing 1 quart for fractional requirements up to 0.25–0.50 gal provides coverage while minimizing excess leftover paint.',
      'Unprimed drywall, textured orange-peel plaster, or dark-to-light color transitions absorb up to 25% more paint and require primer.',
    ],
    commonMistakes: [
      {
        title: 'Purchasing only single-coat volume for bare drywall',
        description: 'Unpainted drywall or dramatic color changes absorb paint rapidly and require at least two full coats plus a primer coat.',
        fix: 'Always calculate for 2 coats when repainting or changing color shades.',
      },
    ],
    faqs: [
      {
        question: 'How many square feet does one gallon of paint cover?',
        answer: 'A standard gallon of architectural interior latex paint covers between 350 and 400 square feet of smooth, pre-primed wall surface.',
      },
      {
        question: 'Should I paint ceilings the same color as the walls?',
        answer: 'Flat ceiling white reflects light best and hides surface imperfections. If painting ceilings, calculate ceiling square footage (Length × Width) separately.',
      },
    ],
    relatedSlugs: ['flooring', 'tile', 'concrete'],
    keywords: ['paint calculator', 'how much paint do i need', 'room paint estimator', 'wall square footage', 'paint gallons calculator'],
  },

  {
    slug: 'flooring',
    path: '/calculators/flooring',
    title: 'Flooring Calculator',
    shortTitle: 'Flooring Estimator',
    category: 'home',
    badge: 'Flooring',
    metaTitle: 'Flooring Calculator – Square Footage & Box Waste Estimator',
    metaDescription: 'Calculate hardwood, laminate, vinyl plank, or carpet square footage needed for a room, including cutting waste and full carton packaging.',
    shortIntro: 'Determine total square footage and material box quantities required for hardwood, luxury vinyl plank (LVP), laminate, or carpet projects.',
    formulaDescription: 'Gross Sq Ft = Room Length × Room Width | Recommended = Gross Sq Ft × (1 + Waste % / 100)',
    formulaExplanation: [
      'Net Room Area = Room Length (ft) × Room Width (ft)',
      'Waste Factor = Net Room Area × (Waste Percentage / 100) [Trade planning allowances: 10% straight, 15% diagonal, 20% herringbone]',
      'Total Material Needed = Net Room Area + Waste Factor',
      'Cartons to Purchase = ceil(Total Material Needed ÷ Sq Ft per Box)',
      'Total Area Purchased = Cartons to Purchase × Sq Ft per Box',
    ],
    howItWorks: [
      'Enter room length and width in feet (or meters).',
      'Select an illustrative pattern preset (10% straight parallel planks, 15% diagonal 45°, 20% herringbone) or enter a custom waste percentage.',
      'Specify carton box coverage from manufacturer box label (typically 20–25 sq ft/box).',
      'Optionally enter price per square foot to project total material expenditure.',
      'View net room floor area, recommended order footage, required full cartons, and total purchased reserve.',
    ],
    examples: [
      {
        title: '15×20 ft Living Room with Hardwood (10% straight lay planning allowance)',
        scenario: 'Installing click-lock hardwood flooring in a 300 sq ft room with 24 sq ft boxes.',
        steps: [
          'Net floor area: 15 × 20 = 300 sq ft.',
          'Add 10% cut & waste buffer: 300 × 1.10 = 330 sq ft.',
          'Box calculation: ceil(330 ÷ 24) = 14 full boxes.',
          'Actual purchased coverage: 14 boxes × 24 sq ft = 336 sq ft (36 sq ft total reserve over net floor).',
        ],
        result: 'Purchase 14 full cartons (336 sq ft), reserving leftover boards for future repairs.',
      },
    ],
    assumptions: [
      'Waste factor percentages (10% straight, 15% diagonal, 20% herringbone) are illustrative trade planning allowances; actual waste depends on room geometry, plank width, installer skill, and defect culling.',
      'Suppliers sell flooring strictly in full, unopened cartons.',
      'Planks from separate manufacturing dye lots can have subtle color and gloss variances; all boxes should be ordered together.',
      'Acclimation is required prior to installation: 3–7 days for solid hardwood, 48 hours for engineered or LVP.',
    ],
    commonMistakes: [
      {
        title: 'Ordering exact net square footage with 0% waste',
        description: 'Flooring cuts along perimeter walls and doorways cannot always be reused, leading to project shortages.',
        fix: 'Always add a 10% waste factor for straight plank layouts, and 15% for herringbone or diagonal designs.',
      },
    ],
    faqs: [
      {
        question: 'Why do flooring installers recommend 10% to 15% extra material?',
        answer: 'Planks must be cut to fit perimeter edges, closets, and door jambs. Cut ends shorter than 8 to 12 inches cannot be reused, and keeping a few spare planks from the same production dye lot is essential for future repairs.',
      },
    ],
    relatedSlugs: ['tile', 'paint', 'concrete'],
    keywords: ['flooring calculator', 'hardwood floor calculator', 'lvp square footage', 'laminate flooring estimator', 'carpet square footage'],
  },

  {
    slug: 'tile',
    path: '/calculators/tile',
    title: 'Tile Calculator',
    shortTitle: 'Tile Estimator',
    category: 'home',
    badge: 'Renovation',
    metaTitle: 'Tile Calculator – Square Footage & Piece Count with Waste',
    metaDescription: 'Calculate how many tiles you need for floors, walls, showers, and backsplashes. Includes tile dimensions, cut waste, and square footage.',
    shortIntro: 'Calculate exact tile piece counts and square footage for bathroom floors, kitchen backsplashes, and walk-in showers with customizable waste allowances.',
    formulaDescription: 'Room Area = L × W | Tile Area = (L_tile × W_tile) / 144 | Tiles = (Room Area / Tile Area) × (1 + Waste / 100)',
    formulaExplanation: [
      'Room Area = Length (ft) × Width (ft)',
      'Tile Area (sq ft) = [Tile Length (in) × Tile Width (in)] ÷ 144',
      'Base Tiles Needed = Room Area ÷ Tile Area',
      'Recommended Tiles with Waste = ceil(Base Tiles × (1 + Waste % / 100))',
    ],
    howItWorks: [
      'Enter the area dimensions (length and width in feet or meters).',
      'Input the dimensions of an individual tile in inches (e.g. 12×12 or 3×6).',
      'Specify waste percentage (10% standard grid, 15% for diagonal/herringbone).',
      'The tool computes total surface area, single tile coverage, and recommended tile count.',
    ],
    examples: [
      {
        title: '10×8 ft Bathroom Floor with 12×12 inch Ceramic Tiles',
        scenario: 'Tiling an 80 sq ft bathroom floor with 10% cut waste.',
        steps: [
          'Room area: 10 × 8 = 80 sq ft.',
          'Tile area: (12 × 12) ÷ 144 = 1.0 sq ft per tile.',
          'Base tile count: 80 ÷ 1.0 = 80 tiles.',
          'Add 10% waste: 80 × 1.10 = 88 tiles.',
        ],
        result: 'Order 88 tiles (80 for coverage, 8 for cut waste).',
      },
      {
        title: '30 sq ft Kitchen Backsplash with 3×6 inch Subway Tiles',
        scenario: 'Backsplash with 15% waste for edge cuts around outlets.',
        steps: [
          'Tile area: (3 × 6) ÷ 144 = 0.125 sq ft per tile (8 tiles per sq ft).',
          'Base tiles: 30 ÷ 0.125 = 240 tiles.',
          'Add 15% waste: 240 × 1.15 = 276 tiles.',
        ],
        result: 'Order 276 subway tiles.',
      },
    ],
    assumptions: [
      'Calculations assume standard grout joint widths (1/16" to 1/8") included in waste buffer.',
      'Surface is flat and plumb without substantial subfloor variations.',
      'Dye lots match across the entire purchase.',
    ],
    commonMistakes: [
      {
        title: 'Not accounting for tile breaks during diagonal wet-saw cuts',
        description: 'Complex tile cuts around drains, pipes, and electrical outlets frequently fracture natural stone or porcelain tiles.',
        fix: 'Use a 15% waste factor when tiling bathrooms or kitchens with numerous obstacles.',
      },
    ],
    faqs: [
      {
        question: 'How many 12x12 tiles are in a square foot?',
        answer: 'Exactly 1 tile. A 12-inch by 12-inch tile equals 144 square inches, which is precisely 1 square foot.',
      },
      {
        question: 'How many 3x6 subway tiles are in a square foot?',
        answer: '8 tiles. Each 3×6 tile covers 18 square inches. 144 / 18 = 8 tiles per square foot.',
      },
    ],
    relatedSlugs: ['flooring', 'paint', 'concrete'],
    keywords: ['tile calculator', 'how many tiles do i need', 'subway tile calculator', 'bathroom tile estimator', 'square feet to tile count'],
  },

  {
    slug: 'concrete',
    path: '/calculators/concrete',
    title: 'Concrete Calculator',
    shortTitle: 'Concrete Slab',
    category: 'home',
    badge: 'Masonry',
    metaTitle: 'Concrete Calculator – Cubic Yards & Bags for Slabs and Footings',
    metaDescription: 'Calculate cubic yards and 60lb/80lb bags of ready-mix concrete for slabs, patios, footings, and driveways with waste safety margins.',
    shortIntro: 'Calculate concrete volume in cubic feet and cubic yards, and determine premix bag quantities for slabs, footings, and patios.',
    formulaDescription: 'Volume (cu yd) = [Length (ft) × Width (ft) × Depth (in) / 12] / 27',
    formulaExplanation: [
      'Depth in Feet = Depth in Inches ÷ 12',
      'Volume (Cubic Feet) = Length (ft) × Width (ft) × Depth (ft)',
      'Volume (Cubic Yards) = Volume (cu ft) ÷ 27',
      'Recommended Order = Volume (cu yd) × (1 + Waste % / 100)',
      '80 lb Bags Needed = ceil(Recommended Volume (cu ft) ÷ Bag Yield) [Commercial Premix TDS: ~0.60 cu ft/bag]',
      'Total Premix Weight (lbs) = Bags × Bag Weight',
    ],
    howItWorks: [
      'Enter slab length and width in feet (or meters).',
      'Enter slab thickness (depth) in inches (4" typical for walkways/patios, 5-6" for driveways).',
      'Set waste margin (contractors recommend 10% for grade unevenness and form deflection).',
      'Select preferred premix bag size (80 lb, 60 lb, or 50 lb).',
      'View total cubic yards, bag count, total bagged weight in pounds/tons, and delivery logistics advice.',
    ],
    examples: [
      {
        title: '10×20 ft Patio Slab at 4 Inches Deep (10% waste)',
        scenario: 'Pouring a backyard concrete patio with 10% extra for grade variations.',
        steps: [
          'Convert depth to feet: 4 in ÷ 12 = 0.333 ft.',
          'Slab volume: 10 × 20 × 0.333 = 66.67 cubic feet (2.47 cu yd).',
          'Add 10% safety buffer: 2.47 × 1.10 = 2.72 cubic yards (73.33 cu ft).',
          'Premix bags: ceil(73.33 ÷ 0.60 cu ft/bag) = 123 bags (80 lb).',
          'Weight check: 123 bags × 80 lbs = 9,840 lbs (4.92 US tons).',
        ],
        result: 'Order 2.75 cubic yards of ready-mix truck delivery (4.92 tons exceeds pickup payload limits).',
      },
    ],
    assumptions: [
      '1 cubic yard of concrete equals 27 cubic feet.',
      'Bag yields: 80 lb (~0.60 cu ft) and 60 lb (~0.45 cu ft) reflect commercial manufacturer technical data (QUIKRETE® #1101, Sakrete), while 50 lb (~0.375 cu ft) is an editable proportional planning estimate. Always check your product bag label.',
      'Uneven subgrade excavation, soil compaction, and form deflection require a 10% buffer.',
      'Consumer 1/2-ton pickup trucks generally carry 1,500 to 2,000 lbs maximum payload (including passengers and cargo); hauling tons of concrete requires multiple trips or truck delivery.',
      'For projects exceeding roughly 1 to 2 cubic yards (~45+ bags), compare local ready-mix delivery quotes against bagged concrete, noting that batch plants often apply short-load fees for smaller truck deliveries.',
    ],
    commonMistakes: [
      {
        title: 'Ordering the exact calculated yardage without buffer',
        description: 'Excavated soil is never perfectly flat, and forms deflect under wet concrete pressure, risking an expensive short pour.',
        fix: 'Always add 10% extra ready-mix concrete to prevent cold joints.',
      },
    ],
    faqs: [
      {
        question: 'When should I order ready-mix truck concrete instead of buying bags?',
        answer: 'If your project requires more than 1 cubic yard (about 45 bags of 80 lb concrete), ordering a ready-mix truck is significantly faster, structurally more consistent, and easier on your back.',
      },
      {
        question: 'How thick should a concrete driveway be?',
        answer: 'A standard residential driveway should be at least 4 inches thick for light vehicles, and 5 to 6 inches thick with rebar reinforcement for heavy pickup trucks or RVs.',
      },
    ],
    relatedSlugs: ['mulch', 'flooring', 'tile'],
    keywords: ['concrete calculator', 'cubic yards concrete', 'concrete slab calculator', 'how many bags of concrete', 'concrete volume'],
  },

  {
    slug: 'mulch',
    path: '/calculators/mulch',
    title: 'Mulch Calculator',
    shortTitle: 'Mulch & Soil',
    category: 'home',
    badge: 'Garden',
    metaTitle: 'Mulch Calculator – Cubic Yards & Bagged Landscaping Estimator',
    metaDescription: 'Calculate cubic yards and standard 2 cu ft / 3 cu ft bags of mulch, compost, or topsoil required to cover garden beds and landscaping.',
    shortIntro: 'Estimate bulk cubic yards and bagged quantities of bark mulch, wood chips, or garden soil based on bed dimensions and layer depth.',
    formulaDescription: 'Cubic Yards = [Length (ft) × Width (ft) × Depth (in) / 12] / 27',
    formulaExplanation: [
      'Garden Bed Area = Length (ft) × Width (ft)',
      'Depth in Feet = Depth in Inches ÷ 12',
      'Volume (Cubic Feet) = Area (sq ft) × Depth (ft)',
      'Volume (Cubic Yards) = Volume (cu ft) ÷ 27',
      '2 cu ft Bags = ceil(Volume cu ft ÷ 2)',
      '3 cu ft Bags = ceil(Volume cu ft ÷ 3)',
    ],
    howItWorks: [
      'Enter garden bed length and width in feet.',
      'Enter desired mulch depth in inches (2 to 3 inches standard for weed barrier and moisture).',
      'The calculator computes total cubic feet, bulk cubic yards, and bagged equivalents.',
    ],
    examples: [
      {
        title: '25×8 ft Garden Bed with 3 Inches of Cedar Mulch',
        scenario: 'Mulching a residential front garden bed.',
        steps: [
          'Surface area: 25 × 8 = 200 sq ft.',
          'Depth in feet: 3 ÷ 12 = 0.25 ft.',
          'Volume: 200 × 0.25 = 50 cubic feet.',
          'Convert to cubic yards: 50 ÷ 27 = 1.85 cubic yards.',
          '2 cu ft bags: 50 ÷ 2 = 25 bags.',
        ],
        result: 'You need 1.85 cubic yards (or 25 standard 2 cu ft bags).',
      },
    ],
    assumptions: [
      'Standard retail mulch bags are 2 cubic feet; contractor bags are 3 cubic feet.',
      'Mulch settles 10% to 15% after initial watering and decomposition.',
      'Existing landscape bed is graded and free of heavy debris.',
    ],
    commonMistakes: [
      {
        title: 'Mulching too deeply against tree trunks (mulch volcanoes)',
        description: 'Piling mulch more than 4 inches deep or suffocating tree bark promotes fungal rot and root suffocation.',
        fix: 'Keep mulch 2-3 inches deep and maintain a 3-inch gap around tree trunks.',
      },
    ],
    faqs: [
      {
        question: 'How deep should mulch be applied?',
        answer: '2 to 3 inches is optimal for weed suppression and soil moisture retention. Annual freshening typically only requires 1 to 1.5 inches.',
      },
      {
        question: 'How many bags of mulch make a cubic yard?',
        answer: 'One cubic yard equals 27 cubic feet. That equals 13.5 bags of 2 cu ft mulch, or 9 bags of 3 cu ft mulch.',
      },
    ],
    relatedSlugs: ['concrete', 'paint', 'flooring'],
    keywords: ['mulch calculator', 'how many bags of mulch', 'cubic yards mulch', 'garden bed soil calculator', 'wood chips estimator'],
  },

  // ==========================================
  // CATEGORY 3: DAILY LIFE & TRAVEL
  // ==========================================
  {
    slug: 'fuel-cost',
    path: '/calculators/fuel-cost',
    title: 'Fuel Cost Calculator',
    shortTitle: 'Trip Gas Cost',
    category: 'everyday',
    badge: 'Travel',
    metaTitle: 'Fuel Cost Calculator – Road Trip Gas Expense Estimator',
    metaDescription: 'Calculate total gas cost, fuel volume needed, and cost per mile for any road trip or driving route.',
    shortIntro: 'Estimate exact fuel expense and volume required for road trips or routine driving based on route distance, vehicle MPG, and current gas price.',
    formulaDescription: 'Gallons = Distance / MPG | Total Cost = Gallons × Price per Gallon',
    formulaExplanation: [
      'Fuel Consumed = Trip Distance (miles) ÷ Vehicle MPG',
      'Total Fuel Expense = Fuel Consumed (gallons) × Gas Price ($/gallon)',
      'Cost per Mile = Total Fuel Expense ÷ Trip Distance',
    ],
    howItWorks: [
      'Enter the one-way or round-trip distance of your journey in miles (or kilometers).',
      'Input your vehicle fuel economy (MPG or L/100 km).',
      'Enter current gas price per gallon or liter.',
      'View total fuel needed, estimated trip cost, and cost per mile.',
    ],
    examples: [
      {
        title: '450-Mile Road Trip at 28 MPG ($3.60/gal)',
        scenario: 'Driving across state for a weekend getaway.',
        steps: [
          'Calculate fuel needed: 450 ÷ 28 = 16.07 gallons.',
          'Calculate total cost: 16.07 × $3.60 = $57.85.',
          'Cost per mile: $57.85 ÷ 450 = $0.128/mile.',
        ],
        result: 'Trip requires 16.07 gallons costing $57.85 ($0.13/mile).',
      },
    ],
    assumptions: [
      'Calculations assume steady driving conditions; severe head winds or mountain passes increase fuel consumption.',
      'Fuel price is treated as constant throughout the trip route.',
      'Tolls and vehicle depreciation are not included in fuel-only expense.',
    ],
    commonMistakes: [
      {
        title: 'Using sticker EPA highway rating for a loaded family road trip',
        description: 'Roof boxes, bicycle racks, heavy luggage, and 4 passengers reduce real highway fuel economy by 10% to 20%.',
        fix: 'Use a slightly lower realistic MPG figure when calculating vacation road trips.',
      },
    ],
    faqs: [
      {
        question: 'How can I calculate fuel cost in metric (L/100 km)?',
        answer: 'Multiply distance (km) by (L/100km / 100) to find total liters consumed, then multiply by the price per liter.',
      },
    ],
    relatedSlugs: ['gas-mileage', 'commute-cost', 'electricity-cost'],
    keywords: ['fuel cost calculator', 'gas calculator for trip', 'road trip fuel estimator', 'gas price per mile', 'drive cost calculator'],
  },

  {
    slug: 'gas-mileage',
    path: '/calculators/gas-mileage',
    title: 'Gas Mileage Calculator',
    shortTitle: 'MPG Calculator',
    category: 'everyday',
    badge: 'Automotive',
    metaTitle: 'Gas Mileage Calculator – Real-World MPG & L/100km',
    metaDescription: 'Calculate your vehicle true fuel efficiency in Miles Per Gallon (MPG) and Liters per 100 km from odometer readings.',
    shortIntro: 'Determine your vehicle actual real-world fuel economy in MPG and L/100 km by tracking odometer trip distance and fuel pumped.',
    formulaDescription: 'MPG = Distance (miles) / Gallons Pumped | L/100km = (Liters / Kilometers) × 100',
    formulaExplanation: [
      'Miles Per Gallon (US) = Trip Distance (miles) ÷ Gallons Used',
      'Metric Consumption = (Fuel Used in Liters ÷ Distance in km) × 100',
      'Conversion Factor: MPG × L/100km = 235.215',
    ],
    howItWorks: [
      'Select US (miles/gallons) or Metric (km/liters).',
      'Enter the miles driven recorded on your trip odometer since your last fill-up.',
      'Enter the exact volume of fuel pumped to refill the tank full.',
      'The calculator computes your MPG and dual metric equivalent.',
    ],
    examples: [
      {
        title: '320 Miles on 11.5 Gallons',
        scenario: 'Commuter car filled to the click after a week of mixed driving.',
        steps: [
          'Divide miles by gallons: 320 ÷ 11.5 = 27.83 MPG.',
          'Convert to metric: 235.215 ÷ 27.83 = 8.45 L/100 km.',
        ],
        result: 'Vehicle achieved 27.83 MPG (8.45 L/100 km).',
      },
    ],
    assumptions: [
      'Fuel tank is filled to the automatic shutoff click at both start and end points of the test.',
      'Tire pressure matches manufacturer door jamb specification to avoid odometer error.',
    ],
    commonMistakes: [
      {
        title: 'Relying solely on dashboard digital estimates',
        description: 'In-dash fuel economy readouts frequently read 2-5% optimistic compared to actual pump measurements.',
        fix: 'Divide odometer miles by pump gallon receipt values over 3 consecutive fill-ups for accuracy.',
      },
    ],
    faqs: [
      {
        question: 'What is considered good gas mileage?',
        answer: 'For non-hybrid gasoline sedans, 30+ MPG combined is considered good. Hybrid vehicles frequently achieve 45 to 55+ MPG.',
      },
    ],
    relatedSlugs: ['fuel-cost', 'commute-cost', 'electricity-cost'],
    keywords: ['gas mileage calculator', 'mpg calculator', 'fuel economy calculator', 'miles per gallon', 'l/100km calculator'],
  },

  {
    slug: 'commute-cost',
    path: '/calculators/commute-cost',
    title: 'Commute Cost Calculator',
    shortTitle: 'Commute Expense',
    category: 'everyday',
    badge: 'Budget',
    metaTitle: 'Commute Cost Calculator – Daily, Monthly & Annual Driving Cost',
    metaDescription: 'Calculate how much you spend driving to work every day, month, and year based on mileage, MPG, and gas prices.',
    shortIntro: 'Estimate your true recurring workplace transportation costs across daily round-trips, weekly commuting, and full-year totals.',
    formulaDescription: 'Round-Trip = 2 × One-Way | Monthly Cost = Daily Cost × Workdays per Month',
    formulaExplanation: [
      'Daily Distance = 2 × One-Way Miles',
      'Daily Fuel Used = Daily Distance ÷ Vehicle MPG',
      'Daily Cost = Daily Fuel Used × Price per Gallon',
      'Weekly Cost = Daily Cost × Commute Days per Week',
      'Annual Cost = Weekly Cost × 52 Weeks',
      'Monthly Cost = Annual Cost ÷ 12',
    ],
    howItWorks: [
      'Enter your one-way distance to work in miles.',
      'Enter how many days per week you travel to the workplace.',
      'Input vehicle MPG and current local gas price.',
      'The calculator computes your monthly commuting budget and annual fuel expense.',
    ],
    examples: [
      {
        title: '20-Mile One-Way Commute (5 days/week at 28 MPG, $3.65/gal)',
        scenario: 'Daily hybrid commute driving 40 miles round-trip.',
        steps: [
          'Daily round-trip: 20 × 2 = 40 miles/day.',
          'Daily gas used: 40 ÷ 28 = 1.429 gallons.',
          'Daily cost: 1.429 × $3.65 = $5.21/day.',
          'Weekly cost (5 days): $5.21 × 5 = $26.07/week.',
          'Annual cost: $26.07 × 52 = $1,355.71/year.',
          'Monthly budget: $1,355.71 ÷ 12 = $112.98/month.',
        ],
        result: 'Monthly commute gas cost is $112.98 ($1,355.71/year).',
      },
    ],
    assumptions: [
      'Calculations reflect fuel costs only; tires, oil changes, insurance, and depreciation are separate maintenance items.',
      'Assumes consistent weekly schedule without extended vacation absences.',
    ],
    commonMistakes: [
      {
        title: 'Entering round-trip mileage in the one-way field',
        description: 'Accidentally entering the full round-trip distance doubles the computed fuel expense.',
        fix: 'Verify whether you are inputting one-way mileage or total daily miles.',
      },
    ],
    faqs: [
      {
        question: 'What is the IRS standard mileage rate?',
        answer: 'The IRS publishes an updated annual standard business mileage rate each tax year (covering fuel, depreciation, maintenance, and insurance); verify the current tax-year rate directly at IRS.gov.',
      },
    ],
    relatedSlugs: ['fuel-cost', 'gas-mileage', 'salary-to-hourly'],
    keywords: ['commute cost calculator', 'driving to work cost', 'monthly gas budget', 'commuter expense calculator', 'cost of commuting'],
  },

  {
    slug: 'electricity-cost',
    path: '/calculators/electricity-cost',
    title: 'Electricity Cost Calculator',
    shortTitle: 'Appliance Power Cost',
    category: 'everyday',
    badge: 'Utility',
    metaTitle: 'Electricity Cost Calculator – Appliance Power Usage & Bill',
    metaDescription: 'Calculate the electricity cost of running any household appliance, heater, air conditioner, or computer by wattage and utility rate.',
    shortIntro: 'Estimate power consumption in kilowatt-hours (kWh) and calculate monthly and annual electric utility costs for any home appliance.',
    formulaDescription: 'Daily kWh = (Watts × Hours / Day) / 1000 | Cost = kWh × Rate per kWh',
    formulaExplanation: [
      'Hourly Energy Draw (kW) = Appliance Watts ÷ 1,000',
      'Hourly Running Cost = Hourly kW × Utility Rate per kWh',
      'Daily Energy (kWh) = Hourly kW × Daily Active Hours',
      'Daily Electricity Cost = Daily kWh × Utility Price per kWh',
      'Total Period Cost = Daily Cost × Number of Days (e.g. 30 for monthly billing cycle)',
      'Annual Cost = Daily Cost × 365 days',
    ],
    howItWorks: [
      'Enter the appliance wattage rating from its UL nameplate or yellow EnergyGuide label.',
      'Specify the average active runtime hours per day.',
      'Select an illustrative benchmark rate from U.S. EIA 2024 annual survey data ($0.165/kWh US residential annual average, Table 2.10) or enter your actual utility rate from your electric bill.',
      'Set billing duration (default: 30 days) to calculate hourly, daily, monthly, and annual operational costs.',
    ],
    examples: [
      {
        title: '1,500W Space Heater Running 6 Hours/Day for 30 Days ($0.165/kWh EIA 2024 Benchmark)',
        scenario: 'Using an electric space heater during a cold winter month.',
        steps: [
          'Hourly draw: 1,500 W ÷ 1,000 = 1.5 kW ($0.2475 per hour).',
          'Daily kWh: 1.5 kW × 6 hrs = 9.0 kWh/day ($1.485/day).',
          '30-day bill: 9.0 kWh/day × 30 days = 270 kWh × $0.165 = $44.55.',
        ],
        result: 'Running the space heater costs $44.55 per month ($0.25/hr, 270 kWh total).',
      },
      {
        title: '400W Gaming Computer Running 4 Hours/Day for a Full Year ($0.165/kWh)',
        scenario: 'Estimating the annual power expense of a high-performance desktop workstation.',
        steps: [
          'Daily kWh: (400 × 4) ÷ 1,000 = 1.6 kWh/day.',
          'Annual kWh: 1.6 × 365 = 584 kWh/year.',
          'Annual cost: 584 × $0.165 = $96.36/year ($8.03/month).',
        ],
        result: 'Gaming PC costs $96.36 per year to operate ($0.066/hr).',
      },
    ],
    assumptions: [
      'Default utility rate calibrated to U.S. Energy Information Administration (EIA) Electric Power Annual Table 2.10 residential benchmark ($0.165/kWh [16.48¢], 2024 annual average). The rate is fully editable.',
      'Appliance is assumed to consume full rated wattage while actively running.',
      'Thermostatically cycled devices (refrigerators, AC compressors, space heaters) cycle on and off, averaging lower net draw than peak rating.',
      'Utility rate is assumed flat; time-of-use (TOU) on-peak vs off-peak tiering is not simulated.',
      'Standby / phantom power is not included; modern electronics typically draw 1W to 15W continuously when turned "off".',
    ],
    commonMistakes: [
      {
        title: 'Confusing Watts with Kilowatt-Hours (kWh)',
        description: 'Watts measure instantaneous power draw, whereas kilowatt-hours measure total energy consumed over time.',
        fix: 'Divide watt-hours by 1,000 to convert to billable kWh.',
      },
    ],
    faqs: [
      {
        question: 'What is the average price of electricity in the United States?',
        answer: 'According to the U.S. EIA Electric Power Annual (Table 2.10, 2024 annual data), the U.S. residential average was 16.48¢ per kWh (~$0.165/kWh), ranging from 11.90¢/kWh in lower-cost states like Washington to 31.97¢/kWh in California and 42.86¢/kWh in Hawaii.',
      },
    ],
    relatedSlugs: ['commute-cost', 'fuel-cost', 'date-difference'],
    keywords: ['electricity cost calculator', 'appliance power consumption', 'kwh calculator', 'electric bill estimator', 'space heater cost to run'],
  },

  {
    slug: 'date-difference',
    path: '/calculators/date-difference',
    title: 'Date Difference Calculator',
    shortTitle: 'Days Between Dates',
    category: 'everyday',
    badge: 'Productivity',
    metaTitle: 'Date Difference Calculator – Days, Weeks & Business Days',
    metaDescription: 'Calculate the exact number of days, weeks, months, business days, and weekend days between any two calendar dates.',
    shortIntro: 'Find the exact calendar span between any two dates, with breakdowns into total days, full weeks, business workdays, and weekend days.',
    formulaDescription: 'Total Days = (End Date - Start Date) in Milliseconds / (1000 × 60 × 60 × 24)',
    formulaExplanation: [
      'Exclusive Calendar Span = End Date - Start Date (standard convention)',
      'Inclusive Calendar Span = Total Days + 1 day (counting both start and end days)',
      'Weeks Breakdown = floor(Total Days / 7) + (Total Days % 7) remaining days',
      'Business Days = Count of Mondays through Fridays within the calendar range',
    ],
    howItWorks: [
      'Select your starting calendar date.',
      'Select your target end date.',
      'Toggle whether you want standard exclusive counting or inclusive counting (+1 day).',
      'The calculator computes calendar days, business workdays, and remaining weeks.',
    ],
    examples: [
      {
        title: 'Days Between March 1 and April 15 (Standard Exclusive)',
        scenario: 'Planning project timeline and tax filing deadline.',
        steps: [
          'March has 31 days (31 - 1 = 30 days in March).',
          'April has 15 days.',
          'Total span: 30 + 15 = 45 days (6 weeks and 3 days).',
        ],
        result: '45 total days, consisting of 32 business days and 13 weekend days.',
      },
    ],
    assumptions: [
      'Standard counting convention is exclusive of the end date (Monday to Tuesday is 1 day).',
      'Business days exclude Saturdays and Sundays; public bank holidays are not automatically deducted.',
      'Leap years are accounted for in Gregorian calendar calculations.',
    ],
    commonMistakes: [
      {
        title: 'Forgetting whether the start or end date was included',
        description: 'Contract durations often count both start and end days inclusive, which is 1 day higher than the calendar difference.',
        fix: 'Use the "Include end date" checkbox when both boundary days must be counted.',
      },
    ],
    faqs: [
      {
        question: 'Does this calculator exclude federal holidays from business days?',
        answer: 'This calculator excludes Saturdays and Sundays. Since statutory holidays vary by country and employer, specific federal holidays are not deducted.',
      },
    ],
    relatedSlugs: ['hours', 'commute-cost', 'recipe-scale'],
    keywords: ['date difference calculator', 'days between dates', 'business days calculator', 'work days counter', 'how many days until'],
  },

  // ==========================================
  // CATEGORY 4: COOKING & CONVERSIONS
  // ==========================================
  {
    slug: 'recipe-scale',
    path: '/calculators/recipe-scale',
    title: 'Recipe Scale Calculator',
    shortTitle: 'Recipe Scaler',
    category: 'cooking',
    badge: 'Culinary',
    metaTitle: 'Recipe Scale Calculator – Double, Half & Yield Scaler',
    metaDescription: 'Scale recipe ingredients up or down precisely based on target servings. Includes kitchen measuring spoon fraction approximations.',
    shortIntro: 'Adjust recipe ingredient quantities proportionally when cooking for larger parties, meal prepping, or halving a dish for two.',
    formulaDescription: 'Scale Factor = Desired Servings / Original Servings | Adjusted = Amount × Scale Factor',
    formulaExplanation: [
      'Scaling Multiplier = Desired Servings ÷ Original Recipe Servings',
      'Adjusted Ingredient Amount = Original Quantity × Scaling Multiplier',
      'Fraction Conversion = Converts decimal quantities into common kitchen fractions (1/4, 1/3, 1/2, 3/4)',
    ],
    howItWorks: [
      'Enter the original recipe yield (e.g. 4 servings).',
      'Enter your desired target portions (e.g. 6 servings or 10 servings).',
      'Input the ingredient amount and unit (e.g. 2.5 cups or 150 grams).',
      'The calculator computes the scaled amount and displays kitchen fraction equivalents.',
    ],
    examples: [
      {
        title: 'Scaling 4 Servings up to 6 Servings (1.5× Yield)',
        scenario: 'A cake recipe calls for 2 cups of sugar for 4 servings; you need 6 servings.',
        steps: [
          'Calculate multiplier: 6 ÷ 4 = 1.5× factor.',
          'Multiply ingredient: 2 cups × 1.5 = 3 cups of sugar.',
        ],
        result: 'Use 3 cups of sugar for 6 servings.',
      },
      {
        title: 'Halving a 4-Serving Recipe for 2 People (0.5×)',
        scenario: 'Scaling down 1.5 teaspoons of vanilla extract.',
        steps: [
          'Calculate factor: 2 ÷ 4 = 0.5× factor.',
          'Multiply: 1.5 × 0.5 = 0.75 teaspoons (3/4 tsp).',
        ],
        result: 'Use 3/4 teaspoon of vanilla extract.',
      },
    ],
    assumptions: [
      'Liquid and dry ingredient quantities scale linearly with serving yield.',
      'Baking leaveners (yeast, baking powder, baking soda) may require slight reduction when multiplying by 4× or more.',
      'Cooking time and pan sizes do not scale linearly with ingredient volume.',
    ],
    commonMistakes: [
      {
        title: 'Doubling the oven temperature or cooking time when doubling a recipe',
        description: 'Doubling a recipe increases mass, not required thermal baking temperature. Doubling oven heat will burn the exterior.',
        fix: 'Keep oven temperature identical; monitor internal food temperature or bake in two separate pans.',
      },
    ],
    faqs: [
      {
        question: 'Do spices and salt scale linearly when doubling a recipe?',
        answer: 'Pungent spices (cayenne, chili flakes, cloves) and salt should generally be scaled to about 1.5× when doubling a recipe, then adjusted to taste.',
      },
    ],
    relatedSlugs: ['unit-converter', 'cups-to-grams', 'percentage'],
    keywords: ['recipe scale calculator', 'recipe multiplier', 'double recipe calculator', 'scale ingredients', 'baking portion converter'],
  },

  {
    slug: 'unit-converter',
    path: '/calculators/unit-converter',
    title: 'Cooking Unit Converter',
    shortTitle: 'Kitchen Volume Converter',
    category: 'cooking',
    badge: 'Kitchen',
    metaTitle: 'Cooking Unit Converter – Teaspoons, Tablespoons, Cups, mL & Liters',
    metaDescription: 'Convert cooking and baking volume between teaspoons, tablespoons, fluid ounces, cups, pints, quarts, gallons, milliliters, and liters.',
    shortIntro: 'Convert liquid measuring units between kitchen spoons, cups, fluid ounces, pints, quarts, liters, and milliliters instantly.',
    formulaDescription: 'Target Volume = (Input Amount × Source Unit mL) / Target Unit mL',
    formulaExplanation: [
      '1 US Tablespoon = 3 Teaspoons = 14.787 mL',
      '1 US Cup = 16 Tablespoons = 8 Fluid Ounces = 236.588 mL',
      '1 US Pint = 2 Cups = 473.176 mL | 1 US Quart = 2 Pints = 4 Cups = 946.353 mL',
      '1 US Gallon = 4 Quarts = 128 Fluid Ounces = 3,785.41 mL (3.785 L)',
    ],
    howItWorks: [
      'Enter the quantity you wish to convert.',
      'Select your source unit (e.g. Cups).',
      'Select your target conversion unit (e.g. Tablespoons or Milliliters).',
      'The calculator computes the exact conversion and provides an equivalence table.',
    ],
    examples: [
      {
        title: 'Convert 1/4 Cup into Tablespoons',
        scenario: 'Your measuring cup is in the dishwasher and you only have measuring spoons.',
        steps: [
          'Recall: 1 US cup = 16 tablespoons.',
          'Calculate: 0.25 cup × 16 = 4 tablespoons.',
        ],
        result: '1/4 cup equals exactly 4 level tablespoons.',
      },
      {
        title: 'Convert 2 US Cups into Milliliters (mL)',
        scenario: 'Converting an American recipe for a European metric measuring jug.',
        steps: [
          'Recall: 1 US cup = 236.588 mL.',
          'Calculate: 2 × 236.588 = 473.18 mL.',
        ],
        result: '2 cups equals 473.2 mL (or ~0.47 Liters).',
      },
    ],
    assumptions: [
      'Applies to liquid volume (fluid ounces, cups, milliliters).',
      'Does not convert dry weight (grams/ounces) — use the Cups to Grams Converter for dry baking ingredients.',
      'Conversions use US Customary fluid measurements unless metric is selected.',
    ],
    commonMistakes: [
      {
        title: 'Confusing fluid ounces (volume) with dry weight ounces',
        description: '8 fluid ounces of honey weighs ~12 ounces; 8 fluid ounces of flour weighs ~4.2 ounces. Volume and weight are only equal for pure water.',
        fix: 'Use a kitchen scale for dry ingredients like flour, sugar, and butter.',
      },
    ],
    faqs: [
      {
        question: 'How many tablespoons are in a cup?',
        answer: 'There are exactly 16 tablespoons in 1 US cup (48 teaspoons).',
      },
      {
        question: 'What is the difference between a US cup and a metric cup?',
        answer: 'A US legal cup is approximately 240 mL (US customary cup is 236.6 mL), whereas an Australian/Commonwealth metric cup is exactly 250 mL.',
      },
    ],
    relatedSlugs: ['cups-to-grams', 'recipe-scale', 'percentage'],
    keywords: ['cooking unit converter', 'tablespoons to cups', 'cups to ml', 'kitchen conversion calculator', 'fluid ounces to cups'],
  },

  {
    slug: 'cups-to-grams',
    path: '/calculators/cups-to-grams',
    title: 'Cups to Grams Converter',
    shortTitle: 'Baking Weight Converter',
    category: 'cooking',
    badge: 'Baking',
    metaTitle: 'Cups to Grams Converter – Flour, Sugar & Baking Ingredients',
    metaDescription: 'Convert recipe cups to grams and ounces accurately based on specific ingredient densities like flour, sugar, butter, and oats.',
    shortIntro: 'Convert baking cups to exact grams and ounces based on true ingredient physical densities for consistent pastry and bread results.',
    formulaDescription: 'Weight (Grams) = Cups × Ingredient Density (Grams per Cup)',
    formulaExplanation: [
      'All-Purpose Flour: 120 grams per US cup (King Arthur Weight Chart spooned & leveled; USDA FDC 168893 uses 125g)',
      'Bread Flour: 125 grams per US cup (culinary default; King Arthur lists 120g)',
      'Granulated White Sugar: 200 grams per US cup (USDA FDC 169655; King Arthur lists 198g)',
      'Packed Brown Sugar: 220 grams per US cup (culinary default; King Arthur lists 213g)',
      'Unsalted Butter: 227 grams per cup (2 standard sticks = 8 oz)',
      'Powdered Confectioners Sugar: 120 grams per cup (culinary default; King Arthur lists 113g unsifted)',
      'Unsweetened Cocoa Powder: 85 grams per cup (culinary default; King Arthur 84g, USDA 86g)',
      'Rolled Oats: 90 grams per cup (culinary default; King Arthur lists 89g)',
    ],
    howItWorks: [
      'Choose conversion direction: Cups → Grams or Grams → Cups.',
      'Select your baking ingredient from the standardized density database.',
      'Enter the quantity of cups (fractions like 1/2 or 1 1/2 supported) or grams.',
      'View accurate digital scale grams, avoirdupois dry ounces, and baker’s measuring tips.',
    ],
    examples: [
      {
        title: '2.5 Cups of All-Purpose Flour to Grams (Spooned & Leveled)',
        scenario: 'Baking sourdough bread using a digital kitchen scale.',
        steps: [
          'Flour density: 1 cup = 120 grams (King Arthur Baking Weight Chart, spooned & leveled; USDA FDC 168893 uses 125g).',
          'Calculate: 2.5 cups × 120 g/cup = 300 grams.',
        ],
        result: '2.5 cups of all-purpose flour equals 300 grams (10.58 oz).',
      },
      {
        title: '1 Cup of Packed Brown Sugar to Grams',
        scenario: 'Measuring brown sugar for chocolate chip cookies.',
        steps: [
          'Brown sugar density: 1 cup packed = 220 grams (culinary planning default; King Arthur lists 213g).',
          'Calculate: 1.0 × 220 = 220 grams.',
        ],
        result: '1 cup packed brown sugar equals 220 grams (7.76 oz).',
      },
    ],
    assumptions: [
      'Verified anchors include King Arthur Baking Weight Chart (120g all-purpose flour, 227g butter), USDA FoodData Central granulated sugar (FDC ID 169655: 200g), and FDA Legal Cup water (21 CFR 101.9: 240 mL = 240g). Remaining entries (bread flour 125g, brown sugar 220g, powdered sugar 120g, cocoa 85g, oats 90g, whole milk 245g) are rounded culinary planning defaults.',
      'All-purpose flour is assumed spooned and leveled at 120g/cup; dipping the measuring cup directly into the flour sack packs 140–150g, causing dry, heavy baked goods.',
      'Brown sugar assumes standard firmly packed density (holds cup shape when inverted).',
      'Butter is converted at standard US stick density (1 cup = 2 sticks = 8 oz = 227g).',
      'Liquid water uses the FDA US legal cup (240 mL = 240g); whole milk uses ~245g/cup culinary reference (USDA FoodData Central lists 244g).',
    ],
    commonMistakes: [
      {
        title: 'Scooping flour directly with the measuring cup',
        description: 'Scooping flour packs it down tightly, packing up to 150g into a 1-cup measure (a 25% error that makes baked goods dry and dense).',
        fix: 'Fluff flour with a fork, spoon it into the measuring cup, and sweep the excess level with a butter knife.',
      },
    ],
    faqs: [
      {
        question: 'Why do professional bakers always measure by weight instead of volume?',
        answer: 'Flour can vary in volume by up to 30% depending on humidity and how tightly it is packed in a cup. A kitchen scale reading grams is 100% repeatable and foolproof.',
      },
    ],
    relatedSlugs: ['unit-converter', 'recipe-scale', 'percentage'],
    keywords: ['cups to grams converter', 'flour cups to grams', 'baking converter grams', 'sugar cups to grams', 'grams to cups calculator'],
  },

  // ==========================================
  // CATEGORY 5: WORK & STUDY
  // ==========================================
  {
    slug: 'hours',
    path: '/calculators/hours',
    title: 'Work Hours Calculator',
    shortTitle: 'Time Card Calculator',
    category: 'work-school',
    badge: 'Productivity',
    metaTitle: 'Work Hours & Time Card Calculator – Shift Hours & Payroll',
    metaDescription: 'Calculate net work shift hours, deduct unpaid lunch breaks, convert to decimal hours for payroll timesheets, and compute gross earnings.',
    shortIntro: 'Calculate daily shift duration, deduct unpaid meal breaks, convert clock time to decimal hours for timesheets, and estimate gross shift pay.',
    formulaDescription: 'Net Time = (End Time - Start Time) - Unpaid Break | Decimal = Hours + (Minutes / 60)',
    formulaExplanation: [
      'Total Shift Span = End Clock Time - Start Clock Time (handles midnight rollover automatically)',
      'Net Working Minutes = Total Span Minutes - Unpaid Break Minutes',
      'Decimal Hours = Net Working Minutes ÷ 60 (rounded to 2 decimals for payroll)',
      'Estimated Gross Earnings = Decimal Hours × Hourly Wage',
    ],
    howItWorks: [
      'Enter shift start time (e.g. 09:00 AM).',
      'Enter shift end time (e.g. 05:30 PM).',
      'Enter unpaid meal break duration in minutes (e.g. 30 mins).',
      'Optionally enter your hourly wage to see gross shift compensation.',
    ],
    examples: [
      {
        title: '8:30 AM to 5:00 PM with 30-Minute Lunch Break ($25/hr)',
        scenario: 'Standard full-time office work day.',
        steps: [
          'Total clock span: 8 hours and 30 minutes (510 minutes).',
          'Deduct 30 min break: 510 - 30 = 480 minutes.',
          'Convert to decimal: 480 ÷ 60 = 8.00 decimal hours.',
          'Gross pay: 8.00 × $25.00 = $200.00.',
        ],
        result: 'Net work time is 8 hours 0 mins (8.00 decimal hours); pay is $200.00.',
      },
      {
        title: 'Overnight Shift: 10:00 PM to 6:30 AM with 30-Minute Break',
        scenario: 'Night shift crossing midnight into the following morning.',
        steps: [
          'Shift crosses midnight: 2 hours before midnight + 6.5 hours after midnight = 8.5 hours (510 mins).',
          'Deduct 30 min break: 510 - 30 = 480 minutes (8.00 hours).',
        ],
        result: 'Net work time is 8.00 hours.',
      },
    ],
    assumptions: [
      'Shifts ending earlier than start time are automatically calculated as crossing midnight (+24 hour rollover).',
      'Breaks are unpaid unless contractually agreed otherwise.',
      'Overtime multipliers (e.g. 1.5× for hours over 8) are not applied to single-shift calculations.',
    ],
    commonMistakes: [
      {
        title: 'Entering clock minutes directly into payroll timesheets',
        description: 'Writing 7.45 on a timesheet for 7 hours and 45 minutes results in an underpayment because 45 minutes is 0.75 hours, not 0.45 hours.',
        fix: 'Always use decimal hours (e.g. 7.75) when reporting hours to payroll.',
      },
    ],
    faqs: [
      {
        question: 'How do you convert minutes to decimal hours for timesheets?',
        answer: 'Divide the minutes by 60. Common equivalents: 15 minutes = 0.25 hrs, 30 minutes = 0.50 hrs, 45 minutes = 0.75 hrs.',
      },
      {
        question: 'Can this calculator handle overnight shifts?',
        answer: 'Yes. If your end time is earlier in the day than your start time (e.g. 10:00 PM to 6:00 AM), the calculator automatically detects overnight rollover across midnight.',
      },
    ],
    relatedSlugs: ['salary-to-hourly', 'date-difference', 'commute-cost'],
    keywords: ['work hours calculator', 'time card calculator', 'shift hours calculator', 'decimal hours converter', 'timesheet calculator'],
  },

  {
    slug: 'gpa',
    path: '/calculators/gpa',
    title: 'GPA Calculator',
    shortTitle: 'College GPA',
    category: 'work-school',
    badge: 'Academic',
    metaTitle: 'GPA Calculator – College & High School 4.0 Scale Estimator',
    metaDescription: 'Calculate your weighted cumulative GPA on the standard 4.0 grading scale. Add courses, credit hours, and letter grades with live results.',
    shortIntro: 'Calculate semester or cumulative Grade Point Average (GPA) on the standard 4.0 scale weighted by course credit hours.',
    formulaDescription: 'GPA = Total Grade Points Earned / Total Attempted Credit Hours',
    formulaExplanation: [
      'Standard 4.0 Scale: A=4.0, A-=3.7, B+=3.3, B=3.0, B-=2.7, C+=2.3, C=2.0, C-=1.7, D+=1.3, D=1.0, F=0.0',
      'Course Grade Points = Course Credit Hours × Grade Numeric Value',
      'Total Grade Points = Sum of all (Course Credits × Grade Numeric Value)',
      'Cumulative GPA = Total Grade Points ÷ Total Attempted Credit Hours',
    ],
    howItWorks: [
      'Add your courses with class title, credit hours (e.g. 3 or 4 credits), and letter grade.',
      'Click "+ Add Course" to add additional classes as needed.',
      'The calculator computes total credit hours, total quality points, and your weighted GPA.',
    ],
    examples: [
      {
        title: 'Semester with 4 Classes (14 Total Credits)',
        scenario: 'Calculus (4 cr, A), Physics (4 cr, B), English (3 cr, A), History (3 cr, B+).',
        steps: [
          'Calculus: 4 credits × 4.0 = 16.0 points.',
          'Physics: 4 credits × 3.0 = 12.0 points.',
          'English: 3 credits × 4.0 = 12.0 points.',
          'History: 3 credits × 3.3 = 9.9 points.',
          'Total points: 16.0 + 12.0 + 12.0 + 9.9 = 49.9 points.',
          'Divide by credits: 49.9 ÷ 14 = 3.56 GPA.',
        ],
        result: 'Cumulative GPA is 3.56.',
      },
    ],
    assumptions: [
      'Uses an illustrative North American 4.0 unweighted scale (A+/A=4.0, A-=3.7 ... F=0.0) and optional 5.0 weighted bonuses (+0.5 Honors, +1.0 AP/IB).',
      'Assumes all listed courses are credit-bearing letter grades (Pass/Fail and 0-credit audited courses are excluded from GPA).',
      'Official grading scales, +/- point steps, and weighted course bonuses vary by school and university.',
    ],
    commonMistakes: [
      {
        title: 'Averaging letter grade values without weighting by credit hours',
        description: 'A 4-credit laboratory science course has double the impact on your GPA compared to a 2-credit elective.',
        fix: 'Always multiply grade point value by credit hours before dividing by total credit hours.',
      },
    ],
    faqs: [
      {
        question: 'What letter grade equals a 3.0 GPA?',
        answer: 'A "B" letter grade corresponds to a 3.00 on the standard 4.0 grading scale.',
      },
      {
        question: 'Do withdrawals (W) or incomplete (I) grades affect GPA?',
        answer: 'Standard withdrawals (W) do not impact GPA because no credit hours are earned or quality points assigned. However, an incomplete (I) that turns into an F will impact your average.',
      },
    ],
    relatedSlugs: ['percentage', 'hours', 'date-difference'],
    keywords: ['gpa calculator', 'college gpa calculator', 'calculate cumulative gpa', 'high school gpa', '4.0 scale gpa'],
  },
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  const normalized = slug.trim().toLowerCase();
  return tools.find(
    (t) =>
      t.slug === normalized ||
      t.slug.replace('-calculator', '') === normalized.replace('-calculator', '') ||
      t.path === `/calculators/${normalized}` ||
      t.path === normalized
  );
}

export function getToolsByCategory(categorySlug: string): ToolDefinition[] {
  return tools.filter((t) => t.category === categorySlug);
}

export function getRelatedTools(tool: ToolDefinition): ToolDefinition[] {
  return tool.relatedSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolDefinition => t !== undefined);
}

export function getAllTools(): ToolDefinition[] {
  return tools;
}

export function getFeaturedTools(): ToolDefinition[] {
  return tools.filter((t) => t.badge !== undefined);
}
