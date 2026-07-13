import React from "react";
import { GitHubRepository, GitHubStats } from "../../lib/github";

interface GitHubActivityOverviewProps {
  stats: GitHubStats;
  repositories: GitHubRepository[];
  username: string;
}

export function GitHubActivityOverview({ stats, repositories, username }: GitHubActivityOverviewProps) {
  // Extract up to 5 real repositories contributed to
  const contributedRepos = repositories.slice(0, 5);

  const total = stats.commits + stats.pullRequests + stats.issues + stats.reviews;

  // Calculate percentages
  const commitPct = total > 0 ? (stats.commits / total) * 100 : 0;
  const prPct = total > 0 ? (stats.pullRequests / total) * 100 : 0;
  const issuePct = total > 0 ? (stats.issues / total) * 100 : 0;
  const reviewPct = total > 0 ? (stats.reviews / total) * 100 : 0;

  return (
    <div className="mt-6 border border-[#30363d] bg-[#0d1117] rounded-md p-6 font-sans">
      <h4 className="text-sm font-sans font-medium text-[#f0f6fc] mb-6 border-b border-[#30363d] pb-2">
        Activity overview
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Contributed to */}
        <div className="md:col-span-6 space-y-4">
          <span className="text-xs font-sans text-[#8b949e] font-semibold block uppercase tracking-wider">
            Contributed to
          </span>
          
          <ul className="space-y-3">
            {contributedRepos.map((repo) => (
              <li key={repo.name} className="flex items-center text-xs">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#58a6ff] hover:underline font-medium break-all"
                >
                  {username}/{repo.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="pt-2">
            <a
              href={`https://github.com/${username}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#8b949e] hover:text-[#58a6ff] transition-colors"
            >
              View more on GitHub →
            </a>
          </div>
        </div>

        {/* Right Column: Visual Breakdown */}
        <div className="md:col-span-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-sans text-[#8b949e] font-semibold block uppercase tracking-wider mb-4">
              Breakdown of contributions
            </span>

            {total > 0 ? (
              <div className="space-y-4">
                {/* Visual Segmented Progress Bar */}
                <div className="w-full h-3 bg-[#161b22] rounded-full overflow-hidden flex">
                  {stats.commits > 0 && (
                    <div
                      className="bg-[#2188ff] h-full"
                      style={{ width: `${commitPct}%` }}
                      title={`Commits: ${stats.commits}`}
                    />
                  )}
                  {stats.pullRequests > 0 && (
                    <div
                      className="bg-[#34d058] h-full"
                      style={{ width: `${prPct}%` }}
                      title={`Pull requests: ${stats.pullRequests}`}
                    />
                  )}
                  {stats.reviews > 0 && (
                    <div
                      className="bg-[#b392f0] h-full"
                      style={{ width: `${reviewPct}%` }}
                      title={`Code reviews: ${stats.reviews}`}
                    />
                  )}
                  {stats.issues > 0 && (
                    <div
                      className="bg-[#ff7b72] h-full"
                      style={{ width: `${issuePct}%` }}
                      title={`Issues: ${stats.issues}`}
                    />
                  )}
                </div>

                {/* Legend list */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-[#8b949e]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2188ff]" />
                    <span className="font-medium text-[#f0f6fc]">{stats.commits}</span>
                    <span>Commits ({Math.round(commitPct)}%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#34d058]" />
                    <span className="font-medium text-[#f0f6fc]">{stats.pullRequests}</span>
                    <span>Pull requests ({Math.round(prPct)}%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#b392f0]" />
                    <span className="font-medium text-[#f0f6fc]">{stats.reviews}</span>
                    <span>Code reviews ({Math.round(reviewPct)}%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff7b72]" />
                    <span className="font-medium text-[#f0f6fc]">{stats.issues}</span>
                    <span>Issues ({Math.round(issuePct)}%)</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#8b949e] italic">
                No commit, issue, or pull request activity recorded for this year.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GitHubActivityOverview;
