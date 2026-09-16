import React from 'react';
import { getRelatedTools } from '../data/tools';
import { ToolCard } from './ToolCard';
import type { ToolDefinition } from '../types';

interface RelatedToolsProps {
  tool: ToolDefinition;
  onNavigate: (path: string) => void;
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({ tool, onNavigate }) => {
  const related = getRelatedTools(tool);

  if (related.length === 0) return null;

  return (
    <section className="my-12 pt-8 border-t border-slate-200" aria-labelledby="related-tools-heading">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 id="related-tools-heading" className="text-xl font-bold text-slate-900">
            Related Calculators
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Other everyday decision tools that pair well with the {tool.shortTitle}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {related.map((rTool) => (
          <ToolCard key={rTool.slug} tool={rTool} onNavigate={onNavigate} />
        ))}
      </div>
    </section>
  );
};
