export interface GuideFormula {
  name: string;
  equation: string;
  explanation: string[];
}

export interface GuideExample {
  title: string;
  scenario: string;
  steps: string[];
  result: string;
}

export interface GuideMistake {
  title: string;
  description: string;
  fix: string;
}

export interface GuideFAQ {
  question: string;
  answer: string;
}

export interface GuideConcept {
  term: string;
  definition: string;
  example?: string;
}

export interface GuideRealWorldFactor {
  factor: string;
  description: string;
  impact: string;
}

export interface GuideQuickAnswer {
  text: string;
  formula: string;
  example: string;
  targetCalculatorText?: string;
}

export interface GuideItem {
  slug: string;
  title: string;
  description: string;
  excerpt: string; // backward compatibility
  category: 'Money' | 'Home' | 'Everyday' | 'Cooking' | 'Work & School';
  publishedDate: string;
  updatedDate: string;
  readingTime: string;
  readTime: string; // backward compatibility
  relatedTools: string[]; // calculator slugs
  relatedGuides: string[]; // guide slugs
  shortIntro: string;
  directAnswer: string; // backward compatibility
  quickAnswer?: GuideQuickAnswer;
  conceptsIntro?: string;
  concepts?: GuideConcept[];
  formula: GuideFormula;
  steps: string[];
  workedExamples: GuideExample[];
  realWorldConsiderations?: GuideRealWorldFactor[];
  commonMistakes: GuideMistake[];
  practicalTips: string[];
  faqs: GuideFAQ[];
  finalTakeaway?: string;
}
