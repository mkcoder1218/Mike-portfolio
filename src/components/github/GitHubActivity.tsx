import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GitHubData } from "../../lib/github";
import GitHubContributionGraph from "./GitHubContributionGraph";
import GitHubYearSelector from "./GitHubYearSelector";

export function GitHubActivity() {
  const username = "mkcoder1218";
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Years array
  const years = [2026, 2025, 2024, 2023, 2022];

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetch(`/api/github?username=${username}&year=${selectedYear}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch GitHub data");
        }
        return res.json();
      })
      .then((fetchedData) => {
        if (active) {
          setData(fetchedData);
          setLoading(false);
          setError(null);
        }
      })
      .catch((err) => {
        console.error("Error fetching GitHub data:", err);
        if (active) {
          setError(err.message || "Could not retrieve GitHub activity details.");
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [selectedYear]);

  return (
    <section
      id="github-activity-section"
      className="w-full py-16 px-6 bg-[#000000] border-t border-white/[0.04] flex flex-col items-center"
    >
      <div className="w-full max-w-6xl">
        {/* Editorial Introduction */}
        <div className="max-w-3xl mb-8">
          <span className="text-[#D94A32] font-mono text-[11px] font-medium tracking-widest block uppercase mb-2">
            Open Source
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#F3F1EC] font-normal leading-tight">
            GitHub activity
          </h2>
          <p className="text-sm text-[#99958E] mt-3 font-sans font-light leading-relaxed">
            A lot of my work starts before the case study. A lot of the work is visible in the systems I ship.
            The rest is scattered across commits, experiments, fixes, and repositories.
          </p>
        </div>

        {/* Embedded GitHub Dark Contribution Section */}
        <div className="border border-[#30363d] bg-[#0d1117] rounded-md p-6 relative overflow-hidden">
          {/* Section header: "X contributions in the last year" */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 border-b border-[#30363d] pb-4">
            <h3 className="text-[14px] sm:text-base font-sans font-normal text-[#f0f6fc]">
              {loading ? (
                <span className="inline-block w-48 h-5 bg-[#30363d] animate-pulse rounded" />
              ) : (
                <span>
                  {data?.calendar?.totalContributions.toLocaleString() || 0} contributions in {selectedYear}
                </span>
              )}
            </h3>

            <span className="text-xs text-[#8b949e] font-sans font-normal cursor-default select-none">
              Contribution settings
            </span>
          </div>

          {/* Mobile Year Selector: transitions above graph on mobile */}
          <div className="block md:hidden">
            <GitHubYearSelector
              selectedYear={selectedYear}
              onChange={setSelectedYear}
              years={years}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Area: Calendar Graph */}
            <div className="md:col-span-10 xl:col-span-11 overflow-hidden">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 flex items-center justify-center text-xs text-[#8b949e] font-sans"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-6 h-6 border-2 border-[#1f6feb] border-t-transparent rounded-full animate-spin" />
                      <span>Loading GitHub contribution board...</span>
                    </div>
                  </motion.div>
                ) : error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center text-xs text-[#ff7b72] font-sans"
                  >
                    {error}
                  </motion.div>
                ) : (
                  <motion.div
                    key="graph"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <GitHubContributionGraph weeks={data?.calendar?.weeks || []} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Area: Desktop Year Selector */}
            <div className="hidden md:block md:col-span-2 xl:col-span-1">
              <GitHubYearSelector
                selectedYear={selectedYear}
                onChange={setSelectedYear}
                years={years}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GitHubActivity;
