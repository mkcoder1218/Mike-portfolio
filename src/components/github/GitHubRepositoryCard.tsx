import React from "react";
import { Star, GitFork } from "lucide-react";
import { GitHubRepository } from "../../lib/github";

interface GitHubRepositoryCardProps {
  repo: GitHubRepository;
}

// GitHub language colors map
const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  "C++": "#f34b7d",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  Shell: "#89e051"
};

export function GitHubRepositoryCard({ repo }: GitHubRepositoryCardProps) {
  const languageColor = repo.language ? languageColors[repo.language] || "#8b949e" : "#8b949e";

  return (
    <div
      id={`repo-card-${repo.name}`}
      className="bg-[#0d1117] border border-[#30363d] rounded-md p-4 flex flex-col justify-between hover:border-[#8b949e]/30 transition-colors duration-150 h-full font-sans"
    >
      <div>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#58a6ff] hover:underline font-semibold text-[14px] tracking-tight break-all"
          >
            {repo.name}
          </a>
          <span className="text-[10px] text-[#8b949e] font-medium px-2 py-0.5 border border-[#30363d] rounded-full bg-transparent">
            Public
          </span>
        </div>

        <p className="text-xs text-[#8b949e] mt-2 mb-4 leading-relaxed font-light line-clamp-2">
          {repo.description || "No description provided."}
        </p>
      </div>

      <div className="flex items-center gap-4 text-xs text-[#8b949e]">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: languageColor }}
            />
            <span className="text-[11px] font-normal">{repo.language}</span>
          </div>
        )}

        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5" />
          <span className="text-[11px] font-normal">{repo.stars}</span>
        </div>

        <div className="flex items-center gap-1">
          <GitFork className="w-3.5 h-3.5" />
          <span className="text-[11px] font-normal">{repo.forks}</span>
        </div>
      </div>
    </div>
  );
}

export default GitHubRepositoryCard;
