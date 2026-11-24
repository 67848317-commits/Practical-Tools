import type { GuideItem } from './types';

export const moneyGuides: GuideItem[] = [
  // 1. HOW TO CALCULATE A PERCENTAGE
  {
    slug: 'how-to-calculate-percentage',
    title: 'How to Calculate a Percentage: A Simple Guide',
    description: 'Learn how percentages work with straightforward formulas, step-by-step arithmetic, and everyday examples for shopping, tips, and financial increases.',
    excerpt: 'Learn how percentages work with straightforward formulas, step-by-step arithmetic, and everyday examples for shopping, tips, and financial increases.',
    category: 'Money',
    publishedDate: 'January 15, 2026',
    updatedDate: 'February 20, 2026',
    readingTime: '6 min read',
    readTime: '6 min read',
    relatedTools: ['percentage', 'discount', 'markup'],
    relatedGuides: ['how-to-calculate-discount', 'how-to-calculate-tip'],
    shortIntro: 'Most percentage problems fall into three forward questions—finding X% of a number, expressing one value as a percentage of another, or measuring percent change—plus reverse percentages when working backward from a discounted or taxed total.',
    directAnswer: 'To calculate X% of Y, multiply Y by (X ÷ 100): 15% of 240 = 0.15 × 240 = 36. To express part X as a percentage of whole Y, compute (X ÷ Y) × 100. To measure percent change from Old to New, divide (New - Old) by |Old| and multiply by 100. For reverse percentages (recovering an original pre-tax or pre-discount price), divide the final total by (1 + Rate/100) or (1 - Discount/100).',
    quickAnswer: {
      text: 'Multiply by (X / 100) to find a percentage of a number, divide Part by Whole for percentage share, divide (New - Old) by |Old| for percent change, or divide by (1 ± Rate/100) to work backward.',
      formula: 'X% of Y = (X / 100) × Y  |  Reverse Price = Final ÷ (1 ± Rate / 100)',
      example: 'Forward: 15% of 240 = 36.0 | Reverse (25% off $80 sale): $60 ÷ (1 - 0.25) = $80 original price',
      targetCalculatorText: 'Percentage Calculator',
    },
    conceptsIntro: 'Before selecting a formula, identify which percentage problem you are solving—a forward ratio, a rate of change, or a reverse total—and whether a specialized tool (such as Discount or Markup) fits better.',
    concepts: [
      {
        term: 'The Whole, Part, and Rate',
        definition: 'The Whole is the 100% baseline amount, the Part is the portion being measured, and the Rate (%) expresses that ratio per 100 ("per centum").',
        example: 'If you answered 64 of 80 questions correctly, 80 is the whole, 64 is the part, and 64 ÷ 80 × 100 = 80%.',
      },
      {
        term: 'Decimal Conversion',
        definition: 'To compute with a percentage, divide by 100 (shifting the decimal point two places to the left).',
        example: '25% becomes 0.25; 7.5% becomes 0.075; 120% becomes 1.20.',
      },
      {
        term: 'Percentage Change vs. Percentage Points',
        definition: 'Percentage change measures relative growth or decline against the starting value, whereas percentage points measure the raw arithmetic difference between two percentages.',
        example: 'Moving from 4% to 5% is a +1 percentage point increase, but a +25% relative increase ((5 - 4) ÷ 4).',
      },
      {
        term: 'Reverse Percentage (Working Backward)',
        definition: 'When you only know a post-tax or post-discount final amount and the percentage rate, you cannot simply multiply by that percentage. Divide by the multiplier (1 + Tax Rate) or complement (1 - Discount Rate) to recover the 100% original baseline.',
        example: 'An item costing $60 after a 25% discount originally cost $60 ÷ 0.75 = $80.',
      },
    ],
    formula: {
      name: 'Forward & Reverse Percentage Formulas',
      equation: 'What is X% of Y?: Value = (X / 100) × Y\nX is what % of Y?: Percentage = (Part / Whole) × 100\nPercentage Change: Change % = ((New - Old) / |Old|) × 100\nReverse Increase (Pre-Tax): Original = Final ÷ (1 + Rate / 100)\nReverse Discount (Pre-Sale): Original = Sale Price ÷ (1 - Discount / 100)',
      explanation: [
        'Three Calculator Modes: Our interactive Percentage Calculator directly computes What is X% of Y?, X is what % of Y?, and % Change.',
        'Reverse Percentage Calculation: Because reversing a tax or markdown divides by the multiplier rather than subtracting a flat percent, use the manual Reverse formula above when recovering a pre-tax or pre-discount price.',
        'Related Calculators: For retail markdowns plus sales tax use the Discount Calculator; for unit cost vs. gross margin pricing use the Markup Calculator.',
      ],
    },
    steps: [
      'Identify whether your problem is a percentage of a number, a part-to-whole ratio, a percentage change, or a reverse percentage.',
      'For the first three forward cases, open the matching tab inside the Percentage Calculator and enter your two known figures.',
      'To find X% of Y manually, move the percentage decimal point two places left (15% = 0.15) and multiply by Y.',
      'For percentage increase or decrease, subtract the original baseline from the new figure, divide by |Original|, and multiply by 100.',
      'For a reverse percentage (such as stripping out 8% sales tax or undoing a 25% discount), divide the final figure by (1 + Tax/100) or (1 - Discount/100).',
    ],
    workedExamples: [
      {
        title: 'Example 1: Mode 1 — Calculating 15% of $240',
        scenario: 'You want to compute a 15% referral allocation or commission on a $240 invoice.',
        steps: [
          'Convert percentage to decimal: 15 ÷ 100 = 0.15.',
          'Multiply by the base amount: 0.15 × $240 = $36.00.',
        ],
        result: '15% of $240 equals $36.00.',
      },
      {
        title: 'Example 2: Mode 2 — Finding What Percent 36 is of 180',
        scenario: 'Out of 180 completed orders, 36 were returned or refunded.',
        steps: [
          'Divide the part by the whole: 36 ÷ 180 = 0.20.',
          'Multiply by 100 to convert to a percentage: 0.20 × 100 = 20%.',
        ],
        result: '36 represents exactly 20% of 180.',
      },
      {
        title: 'Example 3: Mode 3 — Percentage Increase from $50 to $75',
        scenario: 'A monthly software subscription increases from $50 to $75.',
        steps: [
          'Find the absolute difference: $75 - $50 = $25.',
          'Divide by the original baseline: $25 ÷ $50 = 0.50.',
          'Multiply by 100: 0.50 × 100 = +50%.',
        ],
        result: 'The subscription increased by +50%.',
      },
      {
        title: 'Example 4: Reverse Percentage — Pre-Discount & Pre-Tax Originals',
        scenario: 'Recovering original prices manually when working backward from a sale receipt or tax-included invoice.',
        steps: [
          'Pre-Discount Check ($60 paid after 25% off): You paid 100% - 25% = 75% (0.75) of list price.',
          'Divide final price by 0.75: $60.00 ÷ 0.75 = $80.00 original list price.',
          'Pre-Tax Check ($108.00 total including 8% sales tax): Total equals 1.08 × Pre-tax price.',
          'Divide total by 1.08: $108.00 ÷ 1.08 = $100.00 pre-tax price ($8.00 tax).',
        ],
        result: 'The pre-discount list price was $80.00, and the pre-tax price on the $108 receipt was $100.00.',
      },
    ],
    realWorldConsiderations: [
      {
        factor: 'Asymmetry of Gains and Losses',
        description: 'A percentage loss requires a larger percentage gain to return to even. If an investment drops by 50% (from $100 to $50), it requires a 100% gain (from $50 back to $100) just to break even.',
        impact: 'Never assume equal percentage increases and decreases cancel each other out.',
      },
      {
        factor: 'Base Effect in Small Numbers',
        description: 'When starting from a very small number, modest raw changes appear as massive percentages. An increase from 1 incident to 3 incidents is a 200% increase, yet represents only 2 additional occurrences.',
        impact: 'Always examine the raw baseline numbers alongside dramatic percentage claims.',
      },
      {
        factor: 'Percentage Calculator vs. Discount vs. Markup',
        description: 'Retail markdowns with tax and business profit pricing share percentage math but solve distinct workflows: discounts subtract from sticker price before sales tax, while markup divides profit by cost rather than revenue.',
        impact: 'Switch to the Discount Calculator for shopping register totals and the Markup Calculator for gross margin pricing.',
      },
    ],
    commonMistakes: [
      {
        title: 'Multiplying the final amount when reversing a tax or discount',
        description: 'Taking 8% of $108 ($8.64) and subtracting gives $99.36 instead of $100.00 because the 8% tax was originally calculated on $100, not $108.',
        fix: 'Always divide backward totals by (1 + Tax Rate) or (1 - Discount Rate): $108 ÷ 1.08 = $100.00.',
      },
      {
        title: 'Dividing by the new number instead of the original baseline',
        description: 'When computing percentage change, dividing the difference by the ending value instead of the starting value skews the rate.',
        fix: 'Always keep the starting baseline in the denominator: ((New - Old) ÷ |Old|) × 100.',
      },
      {
        title: 'Shifting decimals incorrectly for single-digit rates',
        description: 'Writing 5% as 0.5 instead of 0.05 accidentally calculates 50% instead of 5%, causing a tenfold error.',
        fix: 'Keep the leading zero after the decimal point for single-digit percentages: 7% = 0.07, 3.5% = 0.035.',
      },
    ],
    practicalTips: [
      'The Symmetry Trick (X% of Y = Y% of X): Computing 16% of 50 in your head feels difficult, until you flip it to 50% of 16, which is immediately 8.',
      'The 1% Micro-Step: For irregular rates like 7% or 13%, move the decimal two places left to find 1%, then multiply. 1% of $300 is $3, so 7% is $21.',
      'The Reverse Complement Check: Whenever a receipt includes tax or a markdown, verify the original price by dividing by 1.08 or 0.75 instead of subtracting or adding the rate directly.',
      'Mode Match in the Widget: Use tabs 1–3 for forward percentage math, and keep the Tip Calculator or Discount Calculator handy for hospitality gratuities and register tax totals.',
    ],
    faqs: [
      {
        question: 'Why does "percent" mean divided by 100?',
        answer: 'The term comes from the Latin "per centum", meaning "by the hundred". Standardizing ratios out of 100 makes it simple to compare fractions with different denominators.',
      },
      {
        question: 'Can a percentage be greater than 100%?',
        answer: 'Yes. Any percentage over 100% represents a quantity larger than the original whole. For example, 150% of $40 is $60, and growing from 10 to 30 is a +200% increase.',
      },
      {
        question: 'How do I convert a fraction into a percentage?',
        answer: 'Divide the numerator by the denominator to get a decimal, then multiply by 100. For 3/8: 3 ÷ 8 = 0.375, and 0.375 × 100 = 37.5%.',
      },
      {
        question: 'How do I calculate a reverse percentage on the calculator?',
        answer: 'The Percentage Calculator widget runs the three forward percentage modes directly. For reverse percentages, divide the ending value manually by (1 + Rate/100) for increases/tax or (1 - Discount/100) for markdowns.',
      },
    ],
    finalTakeaway: 'Most percentage tasks reduce to four clear operations: finding a part, expressing a share, measuring change from a baseline, and dividing by (1 ± Rate) when working backward. Choosing the right formula or companion calculator prevents decimal-shift and reverse-tax mistakes.',
  },

  // 2. HOW TO CALCULATE A DISCOUNT AND FINAL PRICE
  {
    slug: 'how-to-calculate-discount',
    title: 'How to Calculate a Discount and Final Price',
    description: 'Learn how to calculate retail markdown discounts, final prices, stacked coupon codes, and post-tax checkout totals with straightforward formulas.',
    excerpt: 'Learn how to calculate retail markdown discounts, final prices, stacked coupon codes, and post-tax checkout totals with straightforward formulas.',
    category: 'Money',
    publishedDate: 'January 18, 2026',
    updatedDate: 'February 22, 2026',
    readingTime: '5 min read',
    readTime: '5 min read',
    relatedTools: ['discount', 'percentage', 'markup'],
    relatedGuides: ['how-to-calculate-percentage', 'how-to-calculate-tip'],
    shortIntro: 'Retail signs frequently advertise "30% off today" or "Take an extra 20% off clearance." Understanding how discounts are applied ensures you know the exact checkout price and avoid common checkout register surprises.',
    directAnswer: 'To find the final price after a discount: multiply the original price by the discount rate divided by 100 to get your savings, then subtract that savings from the original price. Or multiply directly by (1 - Discount% / 100). For 30% off $80: $80 × 0.70 = $56.00.',
    quickAnswer: {
      text: 'To calculate the sale price quickly, multiply the original price by the percentage you actually pay (100% minus the discount percentage).',
      formula: 'Sale Price = Original Price × (1 - (Discount % / 100))',
      example: '30% off $80: You pay 70% → $80 × 0.70 = $56.00 (Savings = $24.00)',
      targetCalculatorText: 'Discount Calculator',
    },
    conceptsIntro: 'When shopping sales, retail terminology can sometimes be confusing. Clarifying the four core components of a sale makes mental calculation effortless.',
    concepts: [
      {
        term: 'Original Price (List Price / MSRP)',
        definition: 'The full starting retail price before any markdowns, promotions, or coupons are applied.',
        example: 'A winter jacket tagged at $120.00.',
      },
      {
        term: 'Discount Percentage (Markdown Rate)',
        definition: 'The fraction of the original price you do not have to pay, expressed as a percent.',
        example: 'A "25% off" storewide promotion.',
      },
      {
        term: 'Discount Amount (Savings)',
        definition: 'The actual dollar amount subtracted from the original sticker price.',
        example: '$120 × 0.25 = $30.00 saved.',
      },
      {
        term: 'Sale Price (Final Pre-Tax Price)',
        definition: 'The price you pay at the register before state or local sales tax is added.',
        example: '$120 - $30 = $90.00.',
      },
    ],
    formula: {
      name: 'Discount & Sale Price Formulas',
      equation: 'Discount Amount = Original Price × (Discount % / 100)\nSale Price = Original Price - Discount Amount\nDirect Formula: Sale Price = Original Price × (1 - (Discount % / 100))\nPost-Tax Total = Sale Price × (1 + (Sales Tax % / 100))',
      explanation: [
        'Discount Amount: Shows the exact dollar savings.',
        'Direct Complement Formula: Multiplies by what you actually pay, saving a calculation step.',
        'Post-Tax Total: Applies sales tax to the discounted sale price in jurisdictions where applicable.',
      ],
    },
    steps: [
      'Locate the item original sticker price or manufacturer suggested retail price (MSRP).',
      'Determine the promotional discount percentage (e.g., 20% off).',
      'Subtract the discount percentage from 100% to find the percentage you pay (100% - 20% = 80%), or enter the price and discount into our single-discount widget.',
      'Multiply that decimal complement (0.80) by the original price ($50 × 0.80 = $40.00).',
      'If stacking a second promo code manually, apply the second percentage to the already reduced subtotal—or enter the reduced subtotal as the starting price in a second calculator pass.',
      'Add your local sales tax percentage to the discounted subtotal to estimate your out-of-pocket register total.',
    ],
    workedExamples: [
      {
        title: 'Example 1: 35% off a $140 Winter Jacket',
        scenario: 'A department store offers a 35% markdown on a winter coat originally priced at $140.',
        steps: [
          'Calculate dollar savings: $140 × 0.35 = $49.00 savings.',
          'Subtract savings from original price: $140 - $49.00 = $91.00.',
          'Quick check using complement: $140 × (1 - 0.35) = $140 × 0.65 = $91.00.',
        ],
        result: 'You pay $91.00 before tax and save $49.00.',
      },
      {
        title: 'Example 2: $249 Tablet with a 15% Discount and 6% Sales Tax',
        scenario: 'An electronic tablet listed at $249 has a weekend 15% store markdown plus 6% local sales tax.',
        steps: [
          'Find 15% savings: $249 × 0.15 = $37.35.',
          'Pre-tax sale price: $249.00 - $37.35 = $211.65.',
          'Apply 6% sales tax to sale price: $211.65 × 0.06 = $12.70.',
          'Register total: $211.65 + $12.70 = $224.35.',
        ],
        result: 'The pre-tax sale price is $211.65 (saving $37.35) and out-of-pocket total with 6% tax is $224.35.',
      },
      {
        title: 'Example 3: Sequential Stacked Coupons (20% Store Sale + 10% Extra Coupon on $100)',
        scenario: 'Retailers often combine a 20% storewide markdown with an extra 10% loyalty coupon. Because the Discount Calculator widget applies one discount at a time, calculate sequentially as shown below or enter the combined 28% effective markdown.',
        steps: [
          'Apply the first 20% discount: $100 - ($100 × 0.20) = $80.00 intermediate price.',
          'Apply the secondary 10% coupon to the $80.00 intermediate balance: $80.00 × 0.10 = $8.00 additional savings.',
          'Final pre-tax price: $80.00 - $8.00 = $72.00 (a combined 28% discount, not 30%).',
        ],
        result: 'Final price is $72.00. The true effective discount is 28%, NOT 30%.',
      },
      {
        title: 'Example 4: Reversing a Sale Price to Find Original Price Paid Before 25% Off',
        scenario: 'You paid $45.00 pre-tax for a shirt marked down by 25%. How much did it originally cost?',
        steps: [
          'Recognize you paid 75% of original price (100% - 25% = 75% = 0.75).',
          'Divide the sale price by 0.75: $45.00 ÷ 0.75 = $60.00 original price.',
          'Calculate savings: $60.00 - $45.00 = $15.00 saved.',
        ],
        result: 'Original price was $60.00; you saved $15.00.',
      },
    ],
    realWorldConsiderations: [
      {
        factor: 'Tax on Store Discounts vs. Manufacturer Coupons',
        description: 'In most US states, sales tax is assessed on the reduced sale price when the retailer funds the markdown or store coupon. By contrast, manufacturer-reimbursed coupons often leave sales tax calculated on the full pre-coupon price.',
        impact: 'Verify whether a promo is store-funded or manufacturer-funded when estimating exact checkout tax.',
      },
      {
        factor: 'BOGO Math (Buy One, Get One 50% Off)',
        description: 'A "Buy One, Get One 50% Off" promotion only yields a 25% total discount if both items cost the exact same price. Pairing a $100 jacket with a $20 shirt discounts the cheaper item ($10 off $120), yielding just an 8.33% overall discount.',
        impact: 'Pair similarly priced items on BOGO deals, or compare total savings divided by combined list price.',
      },
      {
        factor: 'Minimum Spend Thresholds ("$20 off $100+")',
        description: 'Threshold coupons often nudge shoppers into adding low-utility filler items just to cross the spending tier.',
        impact: 'Adding $25 of unwanted goods to unlock $20 off increases total spending by $5.',
      },
    ],
    commonMistakes: [
      {
        title: 'Adding stacked coupons together (The 20% + 20% ≠ 40% Trap)',
        description: 'Shoppers often assume a 20% store discount plus a 20% member coupon equals 40% off. Because the second discount applies to the 80% balance, the combined discount is 36%.',
        fix: 'Apply each discount sequentially to each newly reduced balance, or compute the effective combined rate (1 - 0.80 × 0.80 = 36%) before entering it in the calculator.',
      },
      {
        title: 'Calculating sales tax before applying store markdowns',
        description: 'Applying sales tax to the sticker price and then subtracting a store discount overestimates tax in most jurisdictions.',
        fix: 'Compute the discounted sale price first, then apply your local sales tax percentage.',
      },
      {
        title: 'Confusing dollar discount with percentage discount',
        description: 'Seeing "$20 off" and assuming it matches 20% off. On a $200 item, $20 is 10%; on a $40 item, $20 is 50%.',
        fix: 'Divide the dollar discount by the original price to compare flat-dollar and percent-off promos directly.',
      },
    ],
    practicalTips: [
      'The Complement Shortcut: Skip subtracting savings in two steps—multiply directly by what you pay (30% off = × 0.70; 40% off = × 0.60).',
      'Effective Stacked Rate Formula: Combine two sequential discounts d1% and d2% as 1 - (1 - d1/100) × (1 - d2/100) so you can enter the single true rate into the Discount Calculator.',
      'Check Return Policies Before Buying: Heavy markdowns (40%–75% off) are frequently flagged "Final Sale" with no returns or store-credit-only exchanges.',
    ],
    faqs: [
      {
        question: 'Can the Discount Calculator compute two stacked promo codes at once?',
        answer: 'The interactive widget evaluates one discount percentage plus optional sales tax at a time. To check two stacked discounts, either run the first discount and paste the resulting sale price back in as the Original Price, or enter the combined sequential rate (such as 28% for 20% + 10%).',
      },
      {
        question: 'How do I calculate percentage discount if I know original and sale price?',
        answer: 'Subtract the sale price from the original price to find the savings, divide that savings by the original price, and multiply by 100. If an item drops from $80 to $60: ($80 - $60) ÷ $80 = 20 ÷ 80 = 0.25 × 100 = 25% discount.',
      },
      {
        question: 'Is 50% off followed by another 50% off free?',
        answer: 'No. The first 50% cuts the price in half (e.g., $100 becomes $50). The second 50% cuts that $50 in half, leaving a final price of $25 (a total 75% discount).',
      },
    ],
    finalTakeaway: 'Calculating retail discounts is simple once you use the complement method: subtract the discount percentage from 100% and multiply by the original price. Be mindful of sequential stacked coupons and tax regulations to calculate your exact checkout total every time.',
  },

  // 3. HOW TO CALCULATE A TIP QUICKLY
  {
    slug: 'how-to-calculate-tip',
    title: 'How to Calculate a Tip Quickly',
    description: 'Learn how to calculate restaurant tips, split bills fairly among dining guests, and compute gratuity on pre-tax vs. post-tax subtotals without stress.',
    excerpt: 'Learn how to calculate restaurant tips, split bills fairly among dining guests, and compute gratuity on pre-tax vs. post-tax subtotals without stress.',
    category: 'Money',
    publishedDate: 'January 22, 2026',
    updatedDate: 'February 24, 2026',
    readingTime: '5 min read',
    readTime: '5 min read',
    relatedTools: ['tip', 'percentage', 'discount'],
    relatedGuides: ['how-to-calculate-percentage', 'how-to-calculate-discount'],
    shortIntro: 'Dining out should be relaxing, but figuring out gratuity when the check arrives often causes unnecessary hesitation. With a few mental math shortcuts, calculating a fair tip and splitting the bill takes under ten seconds.',
    directAnswer: 'To calculate a 20% tip quickly in your head: move the decimal point of your bill one space to the left to find 10%, then double that number. For a $64.00 bill, 10% is $6.40, and doubling it gives a $12.80 tip, for a total of $76.80.',
    quickAnswer: {
      text: 'To calculate a 20% tip, find 10% of the bill by moving the decimal point one space to the left, then double that amount.',
      formula: '20% Tip = (Bill ÷ 10) × 2  |  Total = Bill + Tip',
      example: 'On a $64 bill: 10% is $6.40 → Double it: $6.40 × 2 = $12.80 tip (Total = $76.80)',
      targetCalculatorText: 'Tip Calculator',
    },
    conceptsIntro: 'Tipping customs and terms vary across services. Understanding the receipt breakdown ensures you never tip twice or miscalculate your party bill.',
    concepts: [
      {
        term: 'Food & Beverage Subtotal',
        definition: 'The sum of all menu items ordered before sales tax, venue fees, or gratuity are added.',
        example: 'Entrees, drinks, and appetizers totaling $85.00.',
      },
      {
        term: 'Gratuity / Tip',
        definition: 'A discretionary payment given directly to service staff for hospitality and service quality.',
        example: 'A 18% or 20% addition to the food and beverage subtotal.',
      },
      {
        term: 'Auto-Gratuity (Service Charge)',
        definition: 'A mandatory service percentage automatically added by the restaurant, common for large parties of 6 or more.',
        example: 'An "18% Gratuity" line item already printed on your final bill.',
      },
      {
        term: 'Per-Person Split Share',
        definition: 'The total bill (including tax and tip) divided by the number of contributing diners.',
        example: '$120 total split among 4 diners = $30.00 each.',
      },
    ],
    formula: {
      name: 'Tip & Per-Person Split Formulas',
      equation: 'Tip Amount = Subtotal × (Tip Rate % / 100)\nGrand Total = Subtotal + Tax + Tip Amount\nPer Person Share = Grand Total / Number of Diners',
      explanation: [
        'Tip Amount: Customarily based on the pre-tax food and beverage subtotal.',
        'Grand Total: Sum of subtotal, applicable taxes, and discretionary gratuity.',
        'Even Split Share: Divides the final balance evenly among all dining guests.',
      ],
    },
    steps: [
      'Examine the itemized receipt to verify orders and check whether an auto-gratuity is already included.',
      'Identify the pre-tax subtotal line.',
      'Choose your tip percentage (typically 15% for standard service, 18% for good service, 20%+ for excellent service).',
      'Use the 10% doubling method for 20%, or calculate the exact percentage.',
      'Add the tip amount to the subtotal and sales tax to find the final total.',
      'If splitting the check evenly, divide the final total by the number of guests.',
    ],
    workedExamples: [
      {
        title: 'Example 1: 20% Tip on a $64.00 Check',
        scenario: 'A dinner for two with friendly, attentive service.',
        steps: [
          'Find 10% of $64.00: Move decimal point left = $6.40.',
          'Double 10% to get 20%: $6.40 × 2 = $12.80 tip.',
          'Add to bill: $64.00 + $12.80 = $76.80 total.',
        ],
        result: 'Tip is $12.80; grand total is $76.80.',
      },
      {
        title: 'Example 2: 15% Tip on a $42.00 Lunch',
        scenario: 'A casual work lunch where you want to leave a standard 15% tip.',
        steps: [
          'Find 10%: $42.00 ÷ 10 = $4.20.',
          'Find 5% (half of 10%): $4.20 ÷ 2 = $2.10.',
          'Add 10% + 5% = $4.20 + $2.10 = $6.30 tip.',
          'Total: $42.00 + $6.30 = $48.30.',
        ],
        result: 'Tip is $6.30; total is $48.30.',
      },
      {
        title: 'Example 3: Splitting a $160 Bill Among 4 People with 20% Tip',
        scenario: 'Four friends sharing dinner with equal contributions.',
        steps: [
          'Subtotal = $160.00; Sales tax at 8% = $12.80.',
          'Calculate 20% tip on $160 subtotal: $160 × 0.20 = $32.00.',
          'Grand total: $160.00 + $12.80 + $32.00 = $204.80.',
          'Divide evenly by 4: $204.80 ÷ 4 = $51.20 per person.',
        ],
        result: 'Each person pays $51.20.',
      },
      {
        title: 'Example 4: 18% Tip on an $85.50 Bill (Quick Mental Estimation)',
        scenario: 'You want an accurate ~18% tip without pulling out a calculator app.',
        steps: [
          'Round $85.50 to $86.00.',
          'Find 20%: 10% is $8.60, doubled is $17.20.',
          'Subtract ~10% of the tip amount ($1.70) to drop from 20% to 18%: $17.20 - $1.70 ≈ $15.50.',
          'Add to bill: $85.50 + $15.50 = $101.00.',
        ],
        result: 'An 18% tip is approximately $15.40 to $15.50.',
      },
    ],
    realWorldConsiderations: [
      {
        factor: 'Pre-Tax vs. Post-Tax Tipping',
        description: 'Standard etiquette recommends tipping on the food and beverage subtotal before tax. Tipping on the post-tax total means you are tipping on government taxes.',
        impact: 'On large bills in high-tax cities (10%+ sales tax), tipping pre-tax saves several dollars while maintaining proper gratuity for your server.',
      },
      {
        factor: 'Automatic Gratuity Clauses',
        description: 'Restaurants frequently append an 18% or 20% auto-gratuity for parties of 5, 6, or more. This is legally a mandatory service charge, not a suggestion.',
        impact: 'Always check the itemized receipt before writing a tip on the "Additional Tip" line to avoid accidentally tipping 40%.',
      },
      {
        factor: 'Delivery App Economics',
        description: 'Delivery drivers pay for their own vehicle maintenance and gas. A 15% tip on an $11 sandwich order is only $1.65, which does not cover driver travel expenses.',
        impact: 'On delivery apps, consider tipping a minimum flat amount ($4 to $6) rather than a percentage on small orders.',
      },
    ],
    commonMistakes: [
      {
        title: 'Double-tipping on receipts with included service charges',
        description: 'Failing to inspect the bill and adding a 20% tip when an 18% service charge is already included.',
        fix: 'Look for "Service Charge", "Gratuity Included", or "Auto-Grat" on the itemized bill before writing in a tip.',
      },
      {
        title: 'Forgetting to tip on discounted or gift certificate subtotals',
        description: 'If a coupon or promo code knocks $30 off your $100 bill, tipping on the reduced $70 penalizes the server who delivered $100 worth of food and service.',
        fix: 'Always calculate your tip based on the pre-discount food subtotal.',
      },
      {
        title: 'Unfair bill splitting when orders vary widely',
        description: 'Splitting an entire tab equally when one guest had water and a side salad while another had three cocktails and a steak.',
        fix: 'Have the higher spender contribute extra cash or calculate proportional split shares.',
      },
    ],
    practicalTips: [
      'The 20% Rule of Thumb: Move the decimal point one digit left and double it. It takes three seconds and is the standard for good service across North America.',
      'The Tax-Doubling Shortcut: In areas where local sales tax is around 8% to 10% (like California or New York), doubling the tax amount listed on your receipt gives an instant 16% to 20% tip.',
      'Rounding for Easy Math: Round your tip to make the total bill an even dollar amount. It simplifies balancing your credit card statement later.',
    ],
    faqs: [
      {
        question: 'Should I tip on takeout and carryout orders?',
        answer: 'While sit-down service involves ongoing table service, takeout packaging still requires host and kitchen prep time. Tipping 10% or $2 to $5 on carryout orders is customary and appreciated.',
      },
      {
        question: 'What is the difference between a tip and a service fee?',
        answer: 'Gratuities and tips legally belong to the service workers who received them. Mandatory service fees are collected by the business owners, who may or may not distribute them to front-of-house staff.',
      },
      {
        question: 'How do I handle tipping on expensive bottles of wine?',
        answer: 'Many diners tip the standard percentage up to a reasonable cap, or tip 15% to 20% on the food and a lower flat fee per high-end bottle, unless a dedicated sommelier provided extensive service.',
      },
    ],
    finalTakeaway: 'Calculating tips does not require an app or stressful mental math. By using the 10% move-and-double method, tipping on pre-tax food subtotals, and checking for auto-gratuity, you can settle your bill with total confidence every time.',
  },
];
