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
