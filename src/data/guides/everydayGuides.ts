import type { GuideItem } from './types';

export const everydayGuides: GuideItem[] = [
  // 6. HOW TO CALCULATE GAS MILEAGE
  {
    slug: 'how-to-calculate-gas-mileage',
    title: 'How to Calculate Gas Mileage',
    description: 'Calculate your vehicle true fuel economy in miles per gallon (MPG) using real fill-up odometer readings, and understand why dashboard gauges differ.',
    excerpt: 'Calculate your vehicle true fuel economy in miles per gallon (MPG) using real fill-up odometer readings, and understand why dashboard gauges differ.',
    category: 'Everyday',
    publishedDate: 'February 05, 2026',
    updatedDate: 'February 27, 2026',
    readingTime: '5 min read',
    readTime: '5 min read',
    relatedTools: ['gas-mileage', 'fuel-cost', 'commute-cost'],
    relatedGuides: ['how-to-calculate-electricity-cost', 'how-to-calculate-percentage'],
    shortIntro: 'Modern vehicle dashboards display estimated fuel economy, but these readings rely on engine sensor approximations that often read 2% to 5% optimistic. The pump-to-pump manual method provides true, ground-truth fuel efficiency.',
    directAnswer: 'To calculate gas mileage (MPG): fill your fuel tank completely and reset your trip odometer to 0. Drive normally until your next fill-up. Fill the tank completely again, note the exact gallons pumped from the gas pump receipt, and divide your miles driven by gallons pumped. MPG = Miles Driven ÷ Gallons Pumped.',
    quickAnswer: {
      text: 'Fill your tank to full and reset your trip odometer. On your next fill-up, fill the tank completely again and divide the trip odometer miles by the exact gallons pumped.',
      formula: 'MPG = Miles Driven (Trip Odometer) / Gallons Pumped to Refill',
      example: '348 miles driven ÷ 11.2 gallons pumped = 31.07 MPG',
      targetCalculatorText: 'Gas Mileage Calculator',
    },
    conceptsIntro: 'Understanding fuel economy metrics helps you monitor vehicle mechanical health and budget for road trips.',
    concepts: [
      {
        term: 'Miles Driven (Trip Distance)',
        definition: 'The distance traveled between two consecutive full-tank fill-ups, recorded on your trip odometer.',
        example: '310.5 miles recorded between fuel stops.',
      },
      {
        term: 'Gallons Pumped (Fuel Volume)',
        definition: 'The exact volume of gasoline required to return the fuel tank to completely full, measured by the gas station pump meter.',
        example: '10.35 gallons pumped until auto-shutoff.',
      },
      {
        term: 'Cost Per Mile',
        definition: 'The direct financial fuel cost to drive one mile, calculated by dividing the price per gallon by your vehicle MPG.',
        example: '$3.60 per gallon ÷ 30 MPG = $0.12 per mile.',
      },
      {
        term: 'City vs. Highway Cycles',
        definition: 'City driving burns more fuel due to frequent braking and idling; highway driving maintains steady momentum in top gear.',
        example: 'A car rated at 24 City / 34 Highway averages ~28 combined MPG.',
      },
    ],
    formula: {
      name: 'Fuel Economy & Travel Cost Formulas',
      equation: 'MPG = Miles Driven / Gallons Pumped\nFuel Cost per Mile = Price per Gallon / MPG\nTrip Fuel Cost = (Trip Distance / MPG) × Price per Gallon',
      explanation: [
        'MPG: Distance traveled per unit volume of fuel.',
        'Cost Per Mile: Measures operating cost independent of vehicle make.',
        'Trip Fuel Cost: Enables accurate road trip budgeting.',
      ],
    },
    steps: [
      'Visit a gas station and fill your vehicle tank completely until the pump nozzle clicks off automatically.',
      'Reset your vehicle trip odometer (Trip A) to 0.0, or record your total odometer mileage.',
      'Drive your normal daily commute and errands until your tank is roughly 1/4 to 1/2 full.',
      'Return to a gas station and fill the tank completely again until the auto-shutoff clicks.',
      'Record the miles displayed on Trip A and the exact gallons pumped from the fuel receipt.',
      'Divide trip miles by gallons pumped to determine your real-world MPG.',
    ],
    workedExamples: [
      {
        title: 'Example 1: Commuter Sedan Weekly Fuel Check',
        scenario: 'A driver travels 348.5 miles on a tank and takes 11.24 gallons to refill.',
        steps: [
          'Miles Driven = 348.5 miles.',
          'Gallons Refilled = 11.24 gallons.',
          'MPG = 348.5 ÷ 11.24 = 31.005 MPG.',
        ],
        result: 'The car achieved 31.0 MPG.',
      },
      {
        title: 'Example 2: Calculating Cost per Mile for Road Trip Budgeting',
        scenario: 'Gasoline costs $3.60 per gallon and your crossover SUV achieves 24 MPG.',
        steps: [
          'Cost per Mile = $3.60 ÷ 24 = $0.15 per mile.',
          'For a 600-mile weekend road trip: 600 miles × $0.15 = $90.00.',
        ],
        result: 'Driving costs $0.15 per mile ($90.00 total for the 600-mile trip).',
      },
      {
        title: 'Example 3: Comparing Commute Costs (Sedan vs. Full-Size Truck)',
        scenario: 'A 40-mile daily round-trip commute (200 miles/week) at $3.50/gal gasoline.',
        steps: [
          'Sedan (32 MPG): 200 miles ÷ 32 = 6.25 gal × $3.50 = $21.88/week ($1,137/yr).',
          'Truck (16 MPG): 200 miles ÷ 16 = 12.50 gal × $3.50 = $43.75/week ($2,275/yr).',
          'Difference = $1,138 annual fuel savings.',
        ],
        result: 'The 32 MPG sedan saves $1,138 in fuel costs each year.',
      },
      {
        title: 'Example 4: Averaging Across Multiple Fill-ups',
        scenario: 'Tracking 3 tanks to eliminate pump auto-shutoff variance: Tank 1 (320 mi / 10.5 gal), Tank 2 (290 mi / 9.8 gal), Tank 3 (340 mi / 11.0 gal).',
        steps: [
          'Total Miles = 320 + 290 + 340 = 950 miles.',
          'Total Gallons = 10.5 + 9.8 + 11.0 = 31.3 gallons.',
          'Average MPG = 950 ÷ 31.3 = 30.35 MPG.',
        ],
        result: 'The three-tank combined average is 30.4 MPG.',
      },
    ],
    realWorldConsiderations: [
      {
        factor: 'Winter Blend Fuels & Temperature',
        description: 'Refineries switch to winter-blend fuel containing butane from October to April, which has ~1.5% lower energy density. Cold engine warm-up cycles and dense winter air further reduce fuel economy by 10% to 15%.',
        impact: 'A seasonal MPG drop in winter is normal and rarely indicates a mechanical fault.',
      },
      {
        factor: 'Underinflated Tires',
        description: 'Tires naturally lose 1 to 2 PSI for every 10°F drop in ambient temperature. Underinflation increases tire rolling resistance.',
        impact: 'Maintaining manufacturer door-jamb PSI ratings recovers 2% to 4% in fuel economy.',
      },
      {
        factor: 'Highway Aerodynamics & Speed',
        description: 'Aerodynamic drag increases with the square of speed. Driving at 75 MPH requires roughly 25% more engine energy than driving at 65 MPH.',
        impact: 'Cruising at 65 MPH instead of 75 MPH saves significant fuel over long distances.',
      },
    ],
    commonMistakes: [
      {
        title: 'Using total fuel tank capacity instead of gallons pumped',
        description: 'Looking up vehicle tank capacity (e.g. 15 gallons) and dividing trip miles by 15 produces incorrect results because the tank was not empty when refilled.',
        fix: 'Always divide by the exact gallons printed on your gas station receipt.',
      },
      {
        title: 'Topping off past the first auto-shutoff click',
        description: 'Clicking the nozzle repeatedly forces fuel into the vapor recovery system, altering your baseline and risking evaporative canister damage.',
        fix: 'Stop pumping the moment the nozzle clicks off automatically.',
      },
      {
        title: 'Relying solely on short trip meter readings',
        description: 'Calculating MPG over a single 40-mile highway stretch fails to represent combined real-world driving.',
        fix: 'Calculate fuel economy across an entire tank or average across 3 consecutive fill-ups.',
      },
    ],
    practicalTips: [
      'The 3-Tank Average: Averaging 3 consecutive fill-ups eliminates pump sensitivity and parking slope variances.',
      'Check Air Filter and Oxygen Sensors: A sudden 15%+ drop in fuel economy often indicates a dirty engine air filter or a failing O2 sensor.',
      'Remove Cargo Boxes When Not in Use: Roof-mounted ski boxes and bicycle racks increase aerodynamic drag, cutting highway efficiency by up to 10%.',
    ],
    faqs: [
      {
        question: 'Why does my car dashboard gauge show higher MPG than my calculation?',
        answer: 'Car dashboards calculate fuel economy by monitoring fuel injector pulse widths and wheel revolutions. They often round generously and do not account for fuel evaporative losses or minor tire wear circumferences.',
      },
      {
        question: 'Does running the air conditioning consume more gas?',
        answer: 'Yes, running the AC compressor lowers fuel economy by 1 to 3 MPG in city stop-and-go driving. Above 55 MPH on the highway, however, running the AC is often more aerodynamic than driving with open windows.',
      },
      {
        question: 'What is the difference between MPG (US) and MPG (UK)?',
        answer: 'An Imperial gallon (used in the UK) is 4.546 liters, while a US liquid gallon is 3.785 liters. Therefore, 30 MPG (US) equals approximately 36 MPG (Imperial).',
      },
    ],
    finalTakeaway: 'The pump-to-pump calculation remains the gold standard for measuring vehicle fuel efficiency. By dividing actual trip miles by gallons pumped, monitoring tire pressure, and averaging multiple fill-ups, you can track vehicle performance and budget travel costs with precision.',
  },

  // 7. HOW TO CALCULATE ELECTRICITY COST FOR AN APPLIANCE
  {
    slug: 'how-to-calculate-electricity-cost',
    title: 'How to Calculate Electricity Cost for an Appliance',
    description: 'Calculate appliance energy usage and running costs: convert watts to kilowatt-hours (kWh), factor electricity utility rates, and compare monthly expenses.',
    excerpt: 'Calculate appliance energy usage and running costs: convert watts to kilowatt-hours (kWh), factor electricity utility rates, and compare monthly expenses.',
    category: 'Everyday',
    publishedDate: 'February 10, 2026',
    updatedDate: 'February 28, 2026',
    readingTime: '6 min read',
    readTime: '6 min read',
    relatedTools: ['electricity-cost', 'fuel-cost', 'percentage'],
    relatedGuides: ['how-to-calculate-gas-mileage', 'how-to-calculate-percentage'],
    shortIntro: 'Wondering how much running a portable space heater, gaming computer, window air conditioner, or EV charger adds to your electric bill? Calculating kilowatt-hours takes just 3 simple steps.',
    directAnswer: 'To calculate electricity cost: multiply appliance wattage by daily hours of use, divide by 1,000 to convert to kilowatt-hours (kWh), and multiply by your utility electricity rate per kWh ($/kWh). Cost = (Watts × Hours / 1,000) × Utility Rate. At our calculator’s $0.165/kWh U.S. residential default (rounded from the 2024 EIA Table 2.10 average of 16.48¢/kWh), a 1,500W heater running 8 hours/day costs $1.98/day or $59.40/month.',
    quickAnswer: {
      text: 'Multiply appliance wattage by hours of use, divide by 1,000 to get kWh, and multiply by your utility cost per kWh ($/kWh).',
      formula: 'Cost ($) = [(Watts × Hours of Use) / 1,000] × Utility Rate ($ per kWh)',
      example: '1,500W heater × 8 hours = 12,000 Wh = 12 kWh. At $0.165/kWh: 12 × $0.165 = $1.98 per day ($59.40/month).',
      targetCalculatorText: 'Electricity Cost Calculator',
    },
    conceptsIntro: 'Electric bills are measured in energy consumption rather than instantaneous power. Distinguishing between Watts and Kilowatt-Hours makes your utility statement easy to interpret.',
    concepts: [
      {
        term: 'Watts (Power)',
        definition: 'The rate of electrical energy consumption at any given instant, printed on the appliance manufacturer label.',
        example: 'A space heater rated at 1,500 Watts (W).',
      },
      {
        term: 'Kilowatt-Hour (Energy / Work)',
        definition: '1 kilowatt-hour (kWh) equals 1,000 watts of electrical power running continuously for one full hour.',
        example: 'Ten 100W light bulbs on for 1 hour consume 1 kWh.',
      },
      {
        term: 'Utility Rate ($ per kWh)',
        definition: 'The total price your electric company charges for every kilowatt-hour used (U.S. EIA Table 2.10 2024 residential annual average was 16.48¢/kWh).',
        example: '$0.165/kWh on your monthly billing statement.',
      },
      {
        term: 'Duty Cycle',
        definition: 'The percentage of time an appliance actively consumes power while turned on. Refrigerators and heat pumps cycle their compressors on and off rather than drawing peak power continuously.',
        example: 'A refrigerator compressor runs roughly 35% of each hour.',
      },
    ],
    formula: {
      name: 'Appliance Electrical Energy & Cost Formulas',
      equation: 'Daily kWh = (Appliance Watts × Hours of Use per Day) / 1,000\nDaily Cost ($) = Daily kWh × Utility Rate ($/kWh)\nMonthly Cost ($) = Daily Cost × 30 days\nAnnual Cost ($) = Daily Cost × 365 days',
      explanation: [
        'Divide by 1,000: Converts raw Watt-hours into billing Kilowatt-hours (kWh).',
        'Utility Rate: Always use your all-in rate (generation + transmission delivery fees).',
        'Monthly Estimate: Multiplies daily usage by 30 days.',
      ],
    },
    steps: [
      'Locate the manufacturer rating label on the back or bottom of the appliance to find its rated wattage (Watts or W).',
      'If wattage is not listed, find Amps and Volts: Watts = Amps × Volts (standard US household outlet is 120V).',
      'Estimate how many hours per day the appliance actively operates.',
      'Multiply Watts by daily hours to obtain Watt-hours per day.',
      'Divide by 1,000 to convert into Kilowatt-hours (kWh).',
      'Multiply by your electric company rate per kWh found on your utility bill.',
    ],
    workedExamples: [
      {
        title: 'Example 1: 1,500-Watt Space Heater Running 8 Hours a Day at $0.165/kWh',
        scenario: 'Using a portable electric ceramic heater in a home office at the $0.165/kWh default U.S. rate.',
        steps: [
          'Daily Watt-hours = 1,500 W × 8 hours = 12,000 Watt-hours.',
          'Convert to kWh = 12,000 ÷ 1,000 = 12.0 kWh per day.',
          'Daily Cost = 12.0 kWh × $0.165 = $1.98 per day.',
          'Monthly Cost (30 days) = $1.98 × 30 = $59.40 per month.',
        ],
        result: 'Running the space heater costs $1.98/day or $59.40/month.',
      },
      {
        title: 'Example 2: 500-Watt High-End Gaming PC (4 Hours/Day)',
        scenario: 'A modern gaming computer with dedicated graphics card running at an illustrative custom utility rate of $0.18/kWh.',
        steps: [
          'Daily Watt-hours = 500 W × 4 hours = 2,000 Wh.',
          'Convert to kWh = 2,000 ÷ 1,000 = 2.0 kWh/day.',
          'Monthly Cost = 2.0 kWh × $0.18 × 30 days = $10.80 per month.',
        ],
        result: 'Gaming PC costs $10.80 per month to operate at $0.18/kWh.',
      },
      {
        title: 'Example 3: Incandescent vs. LED Light Bulb (3 Hours/Day for 1 Year at $0.165/kWh)',
        scenario: 'Comparing a traditional 60W bulb against a 9W LED (similar brightness) at $0.165/kWh.',
        steps: [
          '60W Incandescent: 60W × 3 hr × 365 days ÷ 1,000 = 65.7 kWh × $0.165 = $10.84/year.',
          '9W LED Bulb: 9W × 3 hr × 365 days ÷ 1,000 = 9.855 kWh × $0.165 = $1.63/year.',
          'Annual savings per socket = $10.8405 - $1.6261 = $9.21 per year per bulb.',
        ],
        result: 'Upgrading 20 household bulbs saves roughly $184.29 per year (~$184/yr).',
      },
      {
        title: 'Example 4: Window Air Conditioner (8,000 BTU, 700 Watts, 50% Duty Cycle)',
        scenario: 'A bedroom AC unit turned on for 10 hours overnight at an illustrative custom rate of $0.15/kWh.',
        steps: [
          'Compressor active hours (50% duty cycle): 10 hours × 0.50 = 5.0 hours.',
          'Daily kWh: 700 W × 5 hr ÷ 1,000 = 3.5 kWh.',
          'Daily Cost: 3.5 kWh × $0.15 = $0.525 per day.',
          'Monthly Cost (30-day month): $0.525 × 30 = $15.75 per month.',
        ],
        result: 'Running the window AC overnight costs $15.75 per month at $0.15/kWh.',
      },
    ],
    realWorldConsiderations: [
      {
        factor: 'All-In Utility Delivery Charges',
        description: 'Many utility bills display a "Generation Supply Rate" of $0.08/kWh, but add transmission, distribution, and clean-energy riders that bring the true all-in rate to $0.17/kWh.',
        impact: 'Divide your total bill dollar amount by total kWh used to find your real effective rate.',
      },
      {
        factor: 'Time-of-Use (TOU) Peak Pricing',
        description: 'Modern smart-meter plans charge 2x to 3x higher rates during peak grid hours (commonly 4 PM to 9 PM on summer weekdays).',
        impact: 'Running dishwashers, laundry dryers, and EV chargers during off-peak hours halves their running cost.',
      },
      {
        factor: 'Standby "Vampire" Loads',
        description: 'Smart TVs, microwave clocks, cable boxes, and gaming consoles continuously draw 2W to 15W even when switched off.',
        impact: 'Vampire loads can add $50 to $120 to an average home electricity bill each year.',
      },
    ],
    commonMistakes: [
      {
        title: 'Assuming cycling appliances draw peak wattage 24/7',
        description: 'A refrigerator rated at 400W compressor peak does not consume 400W × 24 hours (9.6 kWh). Its compressor cycles on only 30% to 40% of the time.',
        fix: 'Use the yellow EnergyGuide sticker rating (kWh/year) for cycling appliances like refrigerators and heat pumps.',
      },
      {
        title: 'Ignoring voltage differences for heavy appliances',
        description: 'Electric clothes dryers, ranges, and Level 2 EV chargers operate on 240V circuits, drawing substantially more power than standard 120V devices.',
        fix: 'Use 240 Volts when calculating Watts = Amps × Volts for large household appliances.',
      },
    ],
    practicalTips: [
      'Use a Plug-In Watt Meter: An inexpensive plug-in energy meter ($15-$25) measures actual cumulative kWh consumption for appliances with variable compressors or sleep modes.',
      'Target High-Wattage Heating Elements: Resistive heating (space heaters, hair dryers, clothes dryers, electric ovens, water heaters) consumes more electricity than almost all electronics combined.',
      'Check Thermostat Setpoints: Lowering your water heater from 140°F to 120°F saves 4% to 10% on water heating costs.',
    ],
    faqs: [
      {
        question: 'How do I convert Amps to Watts if wattage is not listed?',
        answer: 'Multiply Amps by the circuit voltage. In North America: Watts = Amps × 120V for standard outlets, or Watts = Amps × 240V for heavy appliance outlets. A 10-amp microwave on 120V draws 10 × 120 = 1,200 Watts.',
      },
      {
        question: 'What appliance uses the most electricity in a home?',
        answer: 'Central air conditioning and heating typically account for 45% to 50% of home energy consumption, followed by electric water heaters (18%), clothes dryers (5%), and refrigerators (4%).',
      },
      {
        question: 'Is it cheaper to leave a space heater on low all day or high when needed?',
        answer: 'It is always cheaper to heat only when occupied. Thermal energy dissipates through walls continuously; heating an empty room all day wastes significant kilowatt-hours.',
      },
    ],
    finalTakeaway: 'Calculating appliance operating costs is as simple as converting Watts to Kilowatt-hours and multiplying by your utility rate. Identifying your home highest-wattage appliances and shifting usage away from peak hours offers immediate control over your monthly electric bill.',
  },

  // 8. HOW TO SCALE A RECIPE UP OR DOWN
  {
    slug: 'how-to-scale-a-recipe',
    title: 'How to Scale a Recipe Up or Down',
    description: 'Scale culinary recipes accurately: serving conversion ratios, fraction math, volume to weight adjustments, and ingredients that do not scale linearly.',
    excerpt: 'Scale culinary recipes accurately: serving conversion ratios, fraction math, volume to weight adjustments, and ingredients that do not scale linearly.',
    category: 'Cooking',
    publishedDate: 'February 14, 2026',
    updatedDate: 'March 01, 2026',
    readingTime: '6 min read',
    readTime: '6 min read',
    relatedTools: ['recipe-scale', 'cups-to-grams', 'unit-converter'],
    relatedGuides: ['how-to-calculate-percentage'],
    shortIntro: 'Whether cooking for a dinner party of twelve from a recipe written for four, or halving a dessert recipe for two, culinary math ensures your dishes retain balanced flavor, moisture, and texture.',
    directAnswer: 'To scale a recipe, divide your desired servings by the original recipe servings to find your Scale Factor (Multiplier). Then multiply every ingredient by this scale factor. Scale Factor = Desired Servings ÷ Original Servings. To double a 4-serving recipe to 8: 8 ÷ 4 = 2.0 multiplier.',
    quickAnswer: {
      text: 'Divide target servings by original servings to find your Scale Factor, then multiply each ingredient amount by this factor.',
      formula: 'Scale Factor = Desired Servings / Original Servings  |  New Amount = Original Amount × Scale Factor',
      example: 'Scaling a 4-serving recipe to 10: Scale Factor = 10 ÷ 4 = 2.5. If recipe calls for 2 cups flour: 2 × 2.5 = 5 cups.',
      targetCalculatorText: 'Recipe Scale Calculator',
    },
    conceptsIntro: 'Scaling recipes involves both arithmetic and food science. While most volume ingredients scale directly, cooking vessels, evaporation, and potent seasonings require culinary intuition.',
    concepts: [
      {
        term: 'Original Recipe Yield',
        definition: 'The standard batch output or serving count specified by the recipe author.',
        example: 'A cookie recipe stated to yield "24 cookies" or "Serves 4".',
      },
      {
        term: 'Target (Desired) Yield',
        definition: 'The number of portions or items you intend to prepare.',
        example: 'Baking 12 cookies or cooking for 10 dinner guests.',
      },
      {
        term: 'Scale Factor (Multiplier)',
        definition: 'The ratio of desired servings to original servings applied to ingredient quantities.',
        example: 'Scaling 4 servings to 6 yields a multiplier of 6 ÷ 4 = 1.5.',
      },
      {
        term: 'Weight vs. Volume (Baker’s Precision)',
        definition: 'Measuring by weight (grams or ounces) remains consistent regardless of packing density, whereas measuring cups can vary by up to 25%.',
        example: 'One cup of flour can weigh between 120g (fluffed) and 150g (packed).',
      },
    ],
    formula: {
      name: 'Culinary Recipe Scaling Formulas',
      equation: 'Scale Factor = Desired Servings / Original Recipe Servings\nScaled Ingredient Amount = Original Amount × Scale Factor\nUnit Conversions: 1 Tbsp = 3 tsp | 1/4 Cup = 4 Tbsp | 1 Cup = 16 Tbsp = 8 fl oz',
      explanation: [
        'Scale Factor > 1.0: Scaling up (making a larger batch).',
        'Scale Factor < 1.0: Scaling down (making a smaller batch).',
        'Fraction Conversion: Converting awkward decimals (0.33 cups) into tablespoons and teaspoons.',
      ],
    },
    steps: [
      'Note the original serving yield stated in the recipe description.',
      'Decide how many servings or portions you need.',
      'Divide desired servings by original servings to calculate your scale factor.',
      'Multiply each ingredient amount by the scale factor.',
      'Convert awkward decimal fractions into standard kitchen measuring units (e.g. 0.375 cups = 6 tablespoons).',
      'Adjust pan dimensions and verify that cooking times match pan depth rather than total weight.',
      'Scale potent spices and salt cautiously (start at 1.5x to 2x when scaling up by 3x or more).',
    ],
    workedExamples: [
      {
        title: 'Example 1: Scaling Pasta Sauce from 4 Servings to 10 Servings (2.5x)',
        scenario: 'Hosting family dinner using your favorite marinara recipe designed for 4 people.',
        steps: [
          'Scale Factor = 10 ÷ 4 = 2.5.',
          'Olive oil (2 tbsp) × 2.5 = 5 tbsp (or 1/4 cup + 1 tbsp).',
          'Garlic (3 cloves) × 2.5 = 7.5 cloves (use 7 or 8 cloves).',
          'Crushed tomatoes (28 oz can) × 2.5 = 70 oz (2.5 large cans).',
          'Dried oregano (1 tsp) × 2.5 = 2.5 tsp (2 1/2 teaspoons).',
        ],
        result: 'Multiply all base ingredients by 2.5.',
      },
      {
        title: 'Example 2: Halving a Cookie Recipe (Yield 24 Down to 12 Cookies)',
        scenario: 'Halving a chocolate chip cookie recipe for a single baking sheet.',
        steps: [
          'Scale Factor = 12 ÷ 24 = 0.5.',
          'Flour: 2 1/4 cups (2.25) × 0.5 = 1 1/8 cups (1 cup + 2 tbsp).',
          'Butter: 1 cup (2 sticks) × 0.5 = 1/2 cup (1 stick).',
          'Egg: 1 large egg × 0.5 = 1/2 egg (whisk 1 whole egg and measure out 2 tablespoons).',
          'Baking soda: 1 tsp × 0.5 = 1/2 tsp.',
        ],
        result: 'Halve all ingredients; whisk 1 egg and use half (2 tbsp).',
      },
      {
        title: 'Example 3: Tripling a Soup Recipe (Serves 4 to 12)',
        scenario: 'Scaling a chicken noodle soup batch for meal prep freezing.',
        steps: [
          'Scale Factor = 12 ÷ 4 = 3.0.',
          'Chicken broth: 4 cups × 3 = 12 cups (3 quarts).',
          'Carrots: 2 cups × 3 = 6 cups diced.',
          'Liquid adjustment: Because surface area evaporation is proportionally lower in a tall stockpot, use 11 cups broth instead of 12.',
          'Black pepper and salt: Start at 2x and adjust to taste at the finish.',
        ],
        result: 'Triple the solids; reduce liquid slightly to prevent watery soup.',
      },
      {
        title: 'Example 4: Converting Decimal Cups to Tablespoons and Teaspoons',
        scenario: 'Your scaled calculation yields 0.625 cups of sugar.',
        steps: [
          '1 Cup = 16 Tablespoons.',
          '0.625 × 16 = 10 Tablespoons.',
          'Alternatively: 1/2 cup (8 tbsp) + 2 tablespoons.',
        ],
        result: 'Measure 1/2 cup plus 2 tablespoons.',
      },
    ],
    realWorldConsiderations: [
      {
        factor: 'Non-Linear Scaling of Spices and Salt',
        description: 'Potent seasonings (chili flakes, cayenne, cloves, nutmeg, alcohol extracts) and salt do not scale in a 1:1 linear fashion. Tripling cayenne pepper in a stew can render it unpalatable.',
        impact: 'When scaling recipes by 3x or more, start spices and salt at 1.5x to 2x, taste test, and adjust gradually.',
      },
      {
        factor: 'Pan Surface Area and Evaporation',
        description: 'Evaporation happens at the liquid surface. Doubling soup in a deep stockpot produces less evaporation than in two wide pans, which can dilute flavor.',
        impact: 'Reduce added liquids by 10% to 15% when making large batches of braises or sauces.',
      },
      {
        factor: 'Baking Pan Depth vs. Baking Time',
        description: 'Baking time depends on how deep the batter is in the pan, not the total weight. Doubling cake batter into two identical 9-inch pans takes the SAME baking time, whereas pouring all of it into one deep pan will burn the edges before cooking the center.',
        impact: 'Keep pan depth constant by using multiple standard-size baking pans.',
      },
    ],
    commonMistakes: [
      {
        title: 'Doubling oven temperature or baking time',
        description: 'Assuming a doubled recipe requires twice the baking time or a hotter oven.',
        fix: 'Never increase baking temperature. Use multiple standard pans and check doneness at the original recipe time.',
      },
      {
        title: 'Guessing partial egg measurements',
        description: 'Trying to eyeball half an egg by cracking it directly into the mixing bowl.',
        fix: 'Whisk the whole egg thoroughly in a small ramekin with a fork, then measure out 2 tablespoons (since 1 large egg = 4 tablespoons or ~50g).',
      },
      {
        title: 'Using volume cups instead of a kitchen scale for baking',
        description: 'Volume measurements compound flour density errors when scaled up or down.',
        fix: 'Convert flour and sugar to grams (1 cup spooned & leveled all-purpose flour ≈ 120g; 1 cup granulated sugar ≈ 200g) for consistent scaling.',
      },
    ],
    practicalTips: [
      'Kitchen Unit Conversion Cheat Sheet: 1 Tablespoon = 3 Teaspoons; 4 Tablespoons = 1/4 Cup; 5 1/3 Tablespoons = 1/3 Cup; 8 Tablespoons = 1/2 Cup; 16 Tablespoons = 1 Cup.',
      'Weigh in Grams for Flawless Baking: Digital scales allow you to multiply or divide grams with a calculator instantly without dealing with messy fraction cups.',
      'Yeast Dough Scaling: When tripling or quadrupling bread recipes, reduce yeast by 10% to 20% because larger masses of dough retain metabolic heat and ferment faster.',
    ],
    faqs: [
      {
        question: 'How do I divide an egg in half for a halved recipe?',
        answer: 'Crack the egg into a small bowl, whisk with a fork until the yolk and white are completely uniform, then measure out 2 tablespoons (or weigh out 25 grams).',
      },
      {
        question: 'Can all baking recipes be doubled easily?',
        answer: 'Quick breads, cookies, brownies, and sheet cakes double easily. Delicate soufflés, angel food cakes, and French macarons are best prepared in separate individual batches because mixer bowl aerations change with volume.',
      },
      {
        question: 'How do I scale cooking time when doubling a roast?',
        answer: 'Large roasts do not double in cooking time. A 4 lb roast taking 2 hours does not take 4 hours if replaced by an 8 lb roast; it typically takes 2.75 to 3.25 hours. Always use an instant-read meat thermometer to gauge doneness.',
      },
    ],
    finalTakeaway: 'Recipe scaling is a combination of arithmetic and practical kitchen knowledge. By finding your scale factor, converting fractions into standard measuring spoons, scaling spices cautiously, and keeping baking pan depths constant, you can adjust any recipe with gourmet results.',
  },
];
