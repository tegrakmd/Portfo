import React from 'react';
import { motion } from 'motion/react';
import {
  CategoryFilter,
  FILTER_CATEGORIES,
  ViewMode,
} from '../data/projects';

interface WorksControlsProps {
  activeCategory: CategoryFilter;
  onSelectCategory: (category: CategoryFilter) => void;
  viewMode: ViewMode;
  onSelectViewMode: (mode: ViewMode) => void;
}

export const WorksControls: React.FC<WorksControlsProps> = ({
  activeCategory,
  onSelectCategory,
  viewMode,
  onSelectViewMode,
}) => {
  const chars = Array.from(activeCategory);

  return (
    <section
      aria-label="Portfolio filters and view controls"
      className="w-full pt-[102px] pb-[44px] md:pt-[192px] md:pb-[64px] grid grid-cols-1 md:grid-cols-4 gap-y-[52px] md:gap-y-0 md:gap-x-[2px] items-start"
    >
      {/* Left 2 columns (50% width = 709px at 1440px): Active Category H1 */}
      <div className="md:col-span-2 p-[2px]">
        <h1
          key={activeCategory}
          className="text-[36px] leading-[40px] tracking-[-1.8px] md:text-[56px] md:leading-[50.4px] md:tracking-[-2.8px] font-normal text-black pb-[5px] m-0"
        >
          <span className="sr-only">{activeCategory}</span>
          <span aria-hidden="true" className="inline-flex flex-wrap">
            {chars.map((char, index) => (
              <motion.span
                key={`${activeCategory}-${index}`}
                initial={{ y: '40%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{
                  duration: 0.18,
                  delay: Math.min(index * 0.015, 0.16),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        </h1>
      </div>

      {/* Mobile wrapper keeps Filter and Viwe side-by-side on mobile just like reference */}
      <div className="grid grid-cols-2 gap-x-[6px] md:contents">
        {/* Col 3 (353.5px at 1440px): Filter list */}
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-[#9c9c9c] m-0">
            Filter:
          </p>
          <div
            role="group"
            aria-label="Filter works by discipline"
            className="flex flex-col gap-[1px]"
          >
            {FILTER_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => onSelectCategory(category)}
                  aria-pressed={isActive}
                  className={`w-full h-[28.2px] px-[5px] rounded-[5px] flex items-center text-left text-[14px] leading-[18.2px] tracking-[-0.14px] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#f5f5f5] text-black'
                      : 'bg-transparent text-[#303030] hover:bg-black hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Col 4 (353.5px at 1440px): Viwe toggle ("Grid" / "List") */}
        <div className="flex flex-col gap-[6px]">
          <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-[#9c9c9c] m-0">
            Viwe:
          </p>
          <div
            role="group"
            aria-label="Switch portfolio layout view"
            className="flex flex-col gap-[1px]"
          >
            {(['grid', 'list'] as const).map((mode) => {
              const isActive = viewMode === mode;
              const label = mode === 'grid' ? 'Grid' : 'List';
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => onSelectViewMode(mode)}
                  aria-pressed={isActive}
                  className={`w-full h-[28.2px] px-[5px] rounded-[5px] flex items-center text-left text-[14px] leading-[18.2px] tracking-[-0.14px] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#f5f5f5] text-black'
                      : 'bg-transparent text-black hover:bg-black hover:text-white'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
