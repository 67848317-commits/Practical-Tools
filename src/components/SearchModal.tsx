import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Calculator, ArrowRight, Tag } from 'lucide-react';
import { tools } from '../data/tools';
import type { ToolDefinition } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectTool }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Filter tools
  const filteredTools = tools.filter((tool) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      tool.title.toLowerCase().includes(q) ||
      tool.shortIntro.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredTools.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredTools.length - 1));
      } else if (e.key === 'Enter') {
        if (filteredTools[selectedIndex]) {
          e.preventDefault();
          onSelectTool(filteredTools[selectedIndex].slug);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredTools, selectedIndex, onClose, onSelectTool]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/40 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search calculators and tools"
    >
      <div
        className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input bar */}
        <div className="flex items-center px-4 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search tools, e.g. percentage, tip, paint, salary..."
            className="w-full py-4 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
            aria-label="Search query"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 text-xs font-semibold px-2 py-1 text-slate-500 hover:text-slate-700 bg-slate-100 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filteredTools.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              No matching calculators found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Calculators & Estimators</span>
                <span>{filteredTools.length} tools</span>
              </div>
              {filteredTools.map((tool, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={tool.slug}
                    onClick={() => {
                      onSelectTool(tool.slug);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      isSelected ? 'bg-slate-100 text-slate-900' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center shrink-0">
                        <Calculator className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-slate-900 flex items-center gap-2">
                          <span>{tool.title}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-600 uppercase font-medium">
                            {tool.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {tool.shortIntro}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-slate-900 translate-x-1' : 'text-slate-300'}`} />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-slate-600">↑</kbd> <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-slate-600">↓</kbd> to navigate</span>
            <span><kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-slate-600">↵</kbd> to open</span>
          </div>
          <span>Instant browser calculation</span>
        </div>
      </div>
    </div>
  );
};
