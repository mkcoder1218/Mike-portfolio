import React, { useState } from "react";
import { ContributionDay } from "../../lib/github";

interface GitHubContributionCellProps {
  day: ContributionDay;
  key?: React.Key;
}

export function GitHubContributionCell({ day }: GitHubContributionCellProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Map levels to GitHub dark theme contribution colors
  const getColor = (level: string) => {
    switch (level) {
      case "FIRST_QUARTILE":
        return "bg-[#0e4429]";
      case "SECOND_QUARTILE":
        return "bg-[#006d32]";
      case "THIRD_QUARTILE":
        return "bg-[#26a641]";
      case "FOURTH_QUARTILE":
        return "bg-[#39d353]";
      default:
        return "bg-[#161b22]";
    }
  };

  // Format date for display: "May 18, 2026"
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC"
    });
  };

  const contributionText = () => {
    if (day.contributionCount === 0) {
      return `No contributions on ${formatDate(day.date)}`;
    }
    return `${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"} on ${formatDate(day.date)}`;
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
    >
      <div
        id={`contribution-cell-${day.date}`}
        role="gridcell"
        tabIndex={0}
        aria-label={contributionText()}
        className={`w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] rounded-[2px] transition-all duration-150 outline-none focus:ring-1 focus:ring-[#1f6feb] cursor-pointer ${getColor(
          day.contributionLevel
        )}`}
      />

      {/* Tooltip mimicking GitHub's dark theme tooltip */}
      {showTooltip && (
        <div 
          id={`cell-tooltip-${day.date}`}
          className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] px-2.5 py-1.5 bg-[#6e7681] text-white text-[11px] font-sans font-normal rounded-md shadow-lg pointer-events-none animate-in fade-in zoom-in-95 duration-100"
          style={{ transform: "translate3d(-50%, 0, 0)" }}
        >
          {contributionText()}
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[4px] border-4 border-transparent border-t-[#6e7681]" />
        </div>
      )}
    </div>
  );
}
export default GitHubContributionCell;
