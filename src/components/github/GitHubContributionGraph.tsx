import React from "react";
import { ContributionWeek } from "../../lib/github";
import { GitHubContributionCell } from "./GitHubContributionCell";

interface GitHubContributionGraphProps {
  weeks: ContributionWeek[];
}

export function GitHubContributionGraph({ weeks }: GitHubContributionGraphProps) {
  // Month names map
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Calculate month labels and their week indexes dynamically from the actual data
  const monthLabels: { label: string; weekIndex: number }[] = [];
  let prevMonth = -1;

  weeks.forEach((week, index) => {
    // Find the first day with valid date in the week
    const firstDayWithDate = week.contributionDays.find((d) => d.date);
    if (firstDayWithDate) {
      const d = new Date(firstDayWithDate.date + "T00:00:00Z");
      const m = d.getUTCMonth();
      if (m !== prevMonth) {
        // Only push if there's enough space (at least 3 weeks since the last label) to prevent crowding
        const lastLabel = monthLabels[monthLabels.length - 1];
        if (!lastLabel || index - lastLabel.weekIndex >= 3) {
          monthLabels.push({
            label: monthNames[m],
            weekIndex: index,
          });
          prevMonth = m;
        }
      }
    }
  });

  return (
    <div className="w-full font-sans">
      {/* Scrollable area for the contribution calendar */}
      <div className="overflow-x-auto pb-3 -mx-2 px-2 scrollbar-none">
        <div className="min-w-[650px] flex flex-col select-none">
          {/* Month Labels Row */}
          <div className="flex gap-[2px] sm:gap-[3px] mb-1 pl-8">
            {weeks.map((_, weekIndex) => {
              const labelObj = monthLabels.find((l) => l.weekIndex === weekIndex);
              return (
                <div
                  id={`month-label-week-${weekIndex}`}
                  key={weekIndex}
                  className="w-[10px] sm:w-[11px] text-[9px] text-[#8b949e] font-sans font-normal h-3 flex items-end justify-start whitespace-nowrap overflow-visible"
                >
                  {labelObj ? labelObj.label : ""}
                </div>
              );
            })}
          </div>

          {/* Grid Area with Weekday labels on the Left, and columns on the Right */}
          <div className="flex">
            {/* Weekday labels */}
            <div className="w-8 flex flex-col justify-between text-[9px] text-[#8b949e] font-sans pr-1 py-[2px] sm:py-[3px] h-[82px] sm:h-[95px] select-none">
              <div className="h-[10px] sm:h-[11px]" /> {/* Sunday spacing */}
              <div className="h-[10px] sm:h-[11px] flex items-center justify-start leading-none">Mon</div>
              <div className="h-[10px] sm:h-[11px]" /> {/* Tuesday spacing */}
              <div className="h-[10px] sm:h-[11px] flex items-center justify-start leading-none">Wed</div>
              <div className="h-[10px] sm:h-[11px]" /> {/* Thursday spacing */}
              <div className="h-[10px] sm:h-[11px] flex items-center justify-start leading-none">Fri</div>
              <div className="h-[10px] sm:h-[11px]" /> {/* Saturday spacing */}
            </div>

            {/* Weeks Columns */}
            <div className="flex gap-[2px] sm:gap-[3px]">
              {weeks.map((week, weekIndex) => (
                <div
                  id={`week-column-${weekIndex}`}
                  key={weekIndex}
                  className="flex flex-col gap-[2px] sm:gap-[3px]"
                >
                  {week.contributionDays.map((day, dayIndex) => (
                    <GitHubContributionCell key={dayIndex} day={day} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Graph Footer / Legend */}
      <div className="mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[11px] text-[#8b949e] font-sans">
        <a
          href="https://docs.github.com/en/github/setting-up-and-managing-your-github-profile/managing-contribution-graphs-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#58a6ff] hover:underline"
        >
          Learn how we count contributions
        </a>

        <div className="flex items-center gap-1.5 self-end sm:self-auto select-none">
          <span>Less</span>
          <div className="w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] rounded-[2px] bg-[#161b22]" />
          <div className="w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] rounded-[2px] bg-[#0e4429]" />
          <div className="w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] rounded-[2px] bg-[#006d32]" />
          <div className="w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] rounded-[2px] bg-[#26a641]" />
          <div className="w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] rounded-[2px] bg-[#39d353]" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

export default GitHubContributionGraph;
