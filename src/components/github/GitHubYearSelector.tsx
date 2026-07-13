import React from "react";

interface GitHubYearSelectorProps {
  selectedYear: number;
  onChange: (year: number) => void;
  years?: number[];
}

export function GitHubYearSelector({
  selectedYear,
  onChange,
  years = [2026, 2025, 2024, 2023, 2022]
}: GitHubYearSelectorProps) {
  return (
    <div className="w-full">
      {/* Mobile Selector: Horizontal row above the calendar */}
      <div className="flex md:hidden flex-wrap gap-1.5 mb-4">
        {years.map((year) => {
          const isSelected = selectedYear === year;
          return (
            <button
              id={`year-btn-mobile-${year}`}
              key={year}
              onClick={() => onChange(year)}
              className={`px-3 py-1.5 text-xs font-sans font-medium transition-all duration-150 cursor-pointer rounded-md ${
                isSelected
                  ? "bg-[#1f6feb] text-white font-semibold"
                  : "bg-transparent text-[#8b949e] hover:bg-[#161b22] hover:text-[#f0f6fc]"
              }`}
            >
              {year}
            </button>
          );
        })}
      </div>

      {/* Desktop Selector: Vertical side list on the right */}
      <div className="hidden md:flex flex-col gap-1 w-28">
        {years.map((year) => {
          const isSelected = selectedYear === year;
          return (
            <button
              id={`year-btn-desktop-${year}`}
              key={year}
              onClick={() => onChange(year)}
              className={`w-full text-left px-4 py-2 text-xs font-sans font-medium transition-all duration-150 cursor-pointer rounded-md border border-transparent ${
                isSelected
                  ? "bg-[#1f6feb] text-white font-semibold"
                  : "bg-transparent text-[#8b949e] hover:bg-[#161b22] hover:text-[#f0f6fc]"
              }`}
            >
              {year}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default GitHubYearSelector;
