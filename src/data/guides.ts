import type {
  GuideItem,
  GuideFormula,
  GuideExample,
  GuideMistake,
  GuideFAQ,
  GuideConcept,
  GuideRealWorldFactor,
  GuideQuickAnswer,
} from './guides/types';

import { moneyGuides } from './guides/moneyGuides';
import { homeGuides } from './guides/homeGuides';
import { everydayGuides } from './guides/everydayGuides';

export type {
  GuideItem,
  GuideFormula,
  GuideExample,
  GuideMistake,
  GuideFAQ,
  GuideConcept,
  GuideRealWorldFactor,
  GuideQuickAnswer,
};

export const guides: GuideItem[] = [
  ...moneyGuides,
  ...homeGuides,
  ...everydayGuides,
];

export function getGuideBySlug(slug: string): GuideItem | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getRelatedGuides(slugs: string[]): GuideItem[] {
  return guides.filter((g) => slugs.includes(g.slug));
}

export const toolToGuideMap: Record<string, string> = {
  percentage: 'how-to-calculate-percentage',
  discount: 'how-to-calculate-discount',
  tip: 'how-to-calculate-tip',
  paint: 'how-much-paint-do-i-need',
  flooring: 'how-to-calculate-flooring',
  'gas-mileage': 'how-to-calculate-gas-mileage',
  'fuel-cost': 'how-to-calculate-gas-mileage',
  'commute-cost': 'how-to-calculate-gas-mileage',
  'electricity-cost': 'how-to-calculate-electricity-cost',
  'recipe-scale': 'how-to-scale-a-recipe',
  'unit-converter': 'how-to-scale-a-recipe',
  'cups-to-grams': 'how-to-scale-a-recipe',
  markup: 'how-to-calculate-discount',
  tile: 'how-to-calculate-flooring',
};

export function getCompanionGuideForTool(toolSlug: string): GuideItem | undefined {
  const guideSlug = toolToGuideMap[toolSlug];
  if (!guideSlug) return undefined;
  return getGuideBySlug(guideSlug);
}
