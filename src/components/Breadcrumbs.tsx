import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import type { BreadcrumbItem } from '../types';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Breadcrumbs" className="mb-6 flex items-center text-xs text-slate-500 font-medium overflow-x-auto whitespace-nowrap py-1">
      <ol className="flex items-center gap-1.5 list-none p-0 m-0">
        <li className="flex items-center">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="flex items-center gap-1 hover:text-slate-900 transition-colors p-1 rounded focus:outline-none"
            title="Home"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </a>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" aria-hidden="true" />
              {isLast || !item.url ? (
                <span className="text-slate-800 font-semibold truncate max-w-[240px]" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.url}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.url) onNavigate(item.url);
                  }}
                  className="hover:text-slate-900 transition-colors truncate max-w-[200px] p-1 rounded focus:outline-none"
                >
                  {item.name}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
