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
    relatedTools: ['percentage', 'discount', 'tip'],
    relatedGuides: ['how-to-calculate-discount', 'how-to-calculate-tip'],
    shortIntro: 'Calculating a percentage is easier once you know which part of the calculation you are trying to find. Whether you are figuring out a discount, comparing two numbers, or calculating a percentage of a total, the basic formulas are straightforward.',
    directAnswer: 'To calculate X% of a number Y: multiply the number Y by the percentage X, then divide by 100. Alternatively, convert the percentage to a decimal by moving the decimal point two places to the left, and multiply: 15% of 250 = 0.15 × 250 = 37.5.',
    quickAnswer: {
      text: 'To calculate X% of a number Y, multiply the number by the percentage and divide by 100. Alternatively, multiply the number directly by its decimal equivalent.',
      formula: 'X% of Y = (X × Y) / 100  or  Y × (X / 100)',
      example: '15% of 250 = (15 × 250) / 100 = 37.5',
      targetCalculatorText: 'Percentage Calculator',
    },
    conceptsIntro: 'Before diving into algebraic formulas, it helps to understand what a percentage fundamentally represents. The word "percent" originates from the Latin phrase "per centum", which translates literally to "by the hundred". A percentage is simply a ratio or fraction expressed with 100 as its common denominator.',
    concepts: [
      {
        term: 'The Whole (Base / Total)',
        definition: 'The complete starting amount representing 100%. In a discount scenario, this is the original sticker price; in a test score, it is the total points possible.',
        example: 'If a test has 80 questions, 80 is the whole.',
      },
      {
        term: 'The Part (Value)',
        definition: 'The specific subset or portion of the whole being measured.',
        example: 'If you answered 64 questions correctly, 64 is the part.',
      },
      {
        term: 'The Rate (Percentage)',
        definition: 'The proportion of the whole expressed as a number out of 100 (written with the % symbol).',
        example: '64 out of 80 equals an 80% score.',
      },
      {
        term: 'Decimal Conversion',
        definition: 'To do math on a percentage, you must remove the % symbol and divide by 100, which shifts the decimal point two places to the left.',
        example: '25% becomes 0.25; 7.5% becomes 0.075; 120% becomes 1.20.',
      },
    ],
    formula: {
      name: 'Standard Percentage Formulas',
      equation: 'Percentage of a Total: Value = (Percentage / 100) × Total\nWhat Percent X is of Y: Percentage = (Part / Total) × 100\nPercentage Change: Change % = ((New - Old) / Old) × 100',
      explanation: [
        'Finding the Part: Multiply the whole number by (Percentage ÷ 100).',
        'Finding the Percentage: Divide the part by the whole, then multiply by 100.',
        'Finding the Percentage Change: Subtract the old number from the new number, divide by the original starting baseline, then multiply by 100.',
      ],
    },
    steps: [
      'Identify what information you have and what you are solving for (Part, Total, or Percentage Rate).',
      'If finding a percentage of a number, convert the percentage into a decimal by moving the decimal point two spots to the left (e.g., 18% becomes 0.18).',
      'Multiply that decimal directly by the starting baseline amount.',
      'If finding what percentage one number is of another, divide the portion by the total baseline and multiply the resulting decimal by 100.',
      'For percentage increase or decrease, always divide the difference by the original baseline before multiplying by 100.',
    ],
    workedExamples: [
      {
        title: 'Example 1: Calculating 15% of a $60 Purchase',
        scenario: 'You want to compute how much a 15% service charge or discount represents on a $60 order.',
        steps: [
          'Convert the percentage to a decimal: 15 ÷ 100 = 0.15.',
          'Multiply by the base amount: 0.15 × $60 = $9.00.',
        ],
        result: '15% of $60 is exactly $9.00.',
      },
      {
        title: 'Example 2: Finding What Percent 35 is of 140',
        scenario: 'A student answered 35 questions correctly on a 140-question benchmark examination.',
        steps: [
          'Divide the part by the whole: 35 ÷ 140 = 0.25.',
          'Multiply by 100 to convert to a percentage: 0.25 × 100 = 25%.',
        ],
        result: '35 represents exactly 25% of 140.',
      },
      {
        title: 'Example 3: Percentage Increase from $50 to $65',
        scenario: 'An annual subscription fee increases from $50 to $65.',
        steps: [
          'Find the absolute difference: $65 - $50 = $15.',
          'Divide the difference by the original baseline: $15 ÷ $50 = 0.30.',
          'Multiply by 100 to get the percentage: 0.30 × 100 = +30%.',
        ],
        result: 'The price increased by 30%.',
      },
      {
        title: 'Example 4: Calculating a 20% Decrease on an $80 Item',
        scenario: 'A jacket originally priced at $80 is marked down by 20%.',
        steps: [
          'Calculate the discount amount: $80 × 0.20 = $16.00.',
          'Subtract from the original price: $80 - $16 = $64.00.',
          'Alternative shortcut: Multiply directly by the remaining complement: $80 × (1 - 0.20) = $80 × 0.80 = $64.00.',
        ],
        result: 'The reduced price is $64.00, saving $16.00.',
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
        impact: 'Always examine the raw baseline numbers alongside dramatic percentage claims in news headlines.',
      },
      {
        factor: 'Percentage Points vs. Percent Change',
        description: 'If an interest rate rises from 4% to 5%, the interest rate increased by 1 percentage point, but the cost of borrowing increased by 25% ((5 - 4) ÷ 4 = 0.25).',
        impact: 'Financial contracts and loans require distinguishing between points and relative rate change.',
      },
    ],
    commonMistakes: [
      {
        title: 'Dividing by the new number instead of original baseline',
        description: 'When computing percentage change, dividing the difference by the new value rather than the original baseline produces incorrect results.',
        fix: 'Always divide the difference by the starting original number: ((New - Old) ÷ Old) × 100.',
      },
      {
        title: 'Shifting decimals incorrectly for single-digit rates',
        description: 'Typing 5% as 0.5 instead of 0.05 accidentally calculates 50% instead of 5%, causing a tenfold error.',
        fix: 'Remember that single digits need a leading zero after the decimal point: 7% = 0.07, 3.5% = 0.035.',
      },
      {
        title: 'Adding sequential percentages directly',
        description: 'Assuming a 10% raise followed by a 10% cut leaves you with the exact same salary.',
        fix: 'Calculate each change sequentially on the newly adjusted balance.',
      },
    ],
    practicalTips: [
      'The 10% Mental Math Rule: Move the decimal point one place to the left to find 10%. Once you know 10%, halve it for 5%, double it for 20%, or add them for 15%. For 15% of $80: 10% is $8, 5% is $4, so 15% is $12.',
      'The Symmetry Trick (X% of Y = Y% of X): Computing 16% of 50 in your head feels difficult, but flip it: 50% of 16 is instantly 8! Both calculations yield the exact same answer.',
      'The 1% Micro-Step: For odd percentages like 7% or 13%, calculate 1% (move decimal two places left) and multiply by the target integer. 1% of $300 is $3, so 7% is $3 × 7 = $21.',
      'The Complement Shortcut: If an item is 30% off, you pay 70%. Multiply directly by 0.70 to get your final price in a single step.',
    ],
    faqs: [
      {
        question: 'Why does "percent" mean divided by 100?',
        answer: 'The term originates from the Latin "per centum", meaning "by the hundred". Dividing by 100 standardizes all ratios into a common scale of 100 parts, making it easy to compare fractions with different denominators.',
      },
      {
        question: 'Can a percentage be greater than 100%?',
        answer: 'Yes. Any percentage over 100% represents a value greater than the original baseline. For example, 150% of $40 is $60, representing the original $40 plus an additional $20.',
      },
      {
        question: 'How do I convert a fraction into a percentage?',
        answer: 'Divide the numerator by the denominator to get a decimal, then multiply by 100. For 3/8: 3 ÷ 8 = 0.375, and 0.375 × 100 = 37.5%.',
      },
      {
        question: 'How do I find the original price before a percentage increase?',
        answer: 'Divide the current price by (1 + Rate/100). If a price of $110 includes a 10% markup: $110 ÷ 1.10 = $100 original price.',
      },
    ],
    finalTakeaway: 'Mastering percentage arithmetic comes down to recognizing the relationship between the Part, the Whole, and the Rate. By converting rates into decimals or using quick mental shortcuts like the 10% rule and symmetry trick, you can quickly verify store discounts, restaurant tips, and financial calculations without second-guessing.',
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
      'Subtract the discount percentage from 100% to find what percentage you owe (100% - 20% = 80%).',
      'Convert that percentage to a decimal (80% = 0.80) and multiply by the original price ($50 × 0.80 = $40.00).',
      'If stacking a second coupon, apply the second discount to the newly reduced price, not the original price.',
      'Add your local sales tax to the discounted subtotal to determine the out-of-pocket register total.',
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
        title: 'Example 2: $249 Tablet with a 15% Discount',
        scenario: 'An electronic tablet listed at $249 has a weekend 15% coupon applied at checkout.',
        steps: [
          'Find 15% savings: $249 × 0.15 = $37.35.',
          'Deduct savings from original price: $249.00 - $37.35 = $211.65.',
        ],
        result: 'The sale price is $211.65 (saving $37.35).',
      },
      {
        title: 'Example 3: Stacked Discounts (20% Store Sale + 10% Loyalty Coupon on $100)',
        scenario: 'A retailer offers 20% off storewide, plus an additional 10% VIP coupon at checkout.',
        steps: [
          'Apply the first 20% discount: $100 - ($100 × 0.20) = $80.00 subtotal.',
          'Apply the secondary 10% coupon to the $80 balance: $80 × 0.10 = $8.00 additional savings.',
          'Final price: $80.00 - $8.00 = $72.00.',
        ],
        result: 'Final price is $72.00. The true effective discount is 28%, NOT 30%.',
      },
      {
        title: 'Example 4: Calculating How Much Was Saved from Final Price',
        scenario: 'You paid $45 for a shirt marked down by 25%. How much did it originally cost?',
        steps: [
          'Recognize you paid 75% of original price (100% - 25% = 75% = 0.75).',
          'Divide the sale price by 0.75: $45 ÷ 0.75 = $60.00 original price.',
          'Calculate savings: $60 - $45 = $15.00 saved.',
        ],
        result: 'Original price was $60.00; you saved $15.00.',
      },
    ],
    realWorldConsiderations: [
      {
        factor: 'Tax on Pre-Discount vs. Post-Discount Amounts',
        description: 'In most US states, sales tax is assessed on the discounted price when the store funds the discount. However, manufacturer coupons often require paying sales tax on the full pre-coupon price because the store is reimbursed by the manufacturer.',
        impact: 'Expect sales tax to vary depending on whether the coupon is store-issued or manufacturer-issued.',
      },
      {
        factor: 'BOGO Math (Buy One, Get One 50% Off)',
        description: 'A "Buy One, Get One 50% Off" promotion only gives a 25% total discount if both items have the exact same price. If you buy a $100 jacket and a $20 shirt, the 50% discount applies to the cheaper item ($10 off), yielding only an 8.3% overall discount.',
        impact: 'To maximize BOGO promotions, pair items of near-identical price.',
      },
      {
        factor: 'Clearance Exclusions & Minimum Spend Thresholds',
        description: 'Many "$20 off $100" coupons require you to spend additional money on items you might not need just to unlock the threshold.',
        impact: 'Spending $25 on unwanted items to save $20 results in spending $5 more overall.',
      },
    ],
    commonMistakes: [
      {
        title: 'Adding stacked coupons together (The 20% + 20% ≠ 40% Trap)',
        description: 'Shoppers often assume a 20% store discount plus a 20% member coupon equals 40% off. Because the second discount applies to the already discounted price, the actual discount is 36%.',
        fix: 'Apply each discount sequentially to each newly reduced balance.',
      },
      {
        title: 'Calculating sales tax before applying store markdowns',
        description: 'Applying sales tax to the sticker price and then subtracting the discount overpays tax in most jurisdictions.',
        fix: 'Compute the discounted sale price first, then apply your local sales tax percentage.',
      },
      {
        title: 'Confusing dollar discount with percentage discount',
        description: 'Seeing "$20 off" and assuming it is 20% off. On a $200 item, $20 is only 10%. On a $40 item, $20 is 50%.',
        fix: 'Divide the dollar discount by the original price to see the true percentage value.',
      },
    ],
    practicalTips: [
      'The Complement Shortcut: Don’t calculate the savings and then subtract. Multiply by what you pay. 30% off means you pay 70% (multiply by 0.7). 40% off means you pay 60% (multiply by 0.6).',
      'The $10 Benchmark: For every $10 an item costs, a 10% discount saves $1.00, 20% saves $2.00, and 30% saves $3.00. On a $70 item at 30% off: 7 × $3 = $21 saved.',
      'Check return policies: Clearance items marked with heavy percentage discounts are frequently designated "Final Sale" with no returns or exchanges permitted.',
    ],
    faqs: [
      {
        question: 'What is the easiest way to calculate 30% off in your head?',
        answer: 'Find 10% of the price by moving the decimal point left one spot, multiply that by 3 to find your savings, and subtract it from the original price. For $60: 10% is $6, so 30% is $18. $60 - $18 = $42.',
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
