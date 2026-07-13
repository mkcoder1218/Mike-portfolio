import React, { useState } from "react";

interface Surface {
  id: string;
  name: string;
  description: string;
  projects: string[];
}

export default function SurfacesSection() {
  const [activeSurface, setActiveSurface] = useState<string>("BACKEND");

  const surfaces: Surface[] = [
    {
      id: "WEB",
      name: "Web frontends",
      description: "Performant, fully responsive client applications with optimistic states, custom typography, and modular component structures.",
      projects: ["King5.bet", "Red Sea Mart", "WikiTides Peptide", "Fast Keno", "Boingo.ai", "Glam Nest Salon", "STW Media", "Tap Trade Fund", "Milk Subscription", "Little Paris", "Perfume Storefront"],
    },
    {
      id: "ADMIN",
      name: "Admin suites / ERP",
      description: "Data-dense management consoles with granular roles, custom exception reports, audit logs, and system configuration matrices.",
      projects: ["King5.bet", "Blih HR / ERP", "Red Sea Mart", "WikiTides Peptide", "Fast Keno", "Negari Government", "Glam Nest Salon", "Vick Burger & Pizza", "Used Product Seller", "Nitsu Kitchen", "Milk Subscription", "M Advertising Inventory", "Perfume Storefront"],
    },
    {
      id: "BACKEND",
      name: "Backend / APIs",
      description: "Robust transactional logic, scheduling workers, distributed caching, relational database optimization, and secure OAuth credentials.",
      projects: ["King5.bet", "Blih HR / ERP", "Red Sea Mart", "VisionViewer", "WikiTides Peptide", "Fast Keno", "Negari Government", "Boingo.ai", "Era 2026", "Vick Burger & Pizza", "Eagle Health Care", "Fetan Bot", "Nitsu Kitchen", "Spin Game Engine", "Milk Subscription", "M Advertising Inventory"],
    },
    {
      id: "MOBILE",
      name: "Mobile apps",
      description: "Native applications deployed on app stores, integrating local key-value databases, push alerts, and physical hardware interfaces.",
      projects: ["Red Sea Mart", "Wave Equb", "Salesman Tracking"],
    },
    {
      id: "CASHBOX",
      name: "Cashier boxes",
      description: "Low-latency POS local terminal flows with hardware integrations, session balancing, and cash drawer coordination.",
      projects: ["King5.bet"],
    },
    {
      id: "PRINTER",
      name: "Hardware / Printing",
      description: "Raw ESC/POS protocol compilation, ticket templates, buffer rendering, and hardware printer queue managers.",
      projects: ["King5.bet"],
    },
    {
      id: "BOT",
      name: "Telegram bot engines",
      description: "High-throughput messaging loops, server state transitions, inline keyboards, and automated job alerts.",
      projects: ["Fetan Bot"],
    },
    {
      id: "AUTOMATION",
      name: "Automation / n8n",
      description: "Continuous synchronization tasks, multi-service webhook ingestion, and workflow orchestration engines.",
      projects: ["2 Merkato Automation"],
    },
  ];

  const currentSurfaceData = surfaces.find((s) => s.id === activeSurface)!;

  return (
    <div className="w-full py-12 px-6 border border-white/[0.06] bg-[#131313] relative overflow-hidden">
      <div className="max-w-3xl mb-8 border-b border-white/[0.06] pb-4">
        <span className="text-[#D94A32] font-mono text-[11px] font-medium tracking-widest block uppercase mb-2">
          Platform Coverage
        </span>
        <h3 className="text-2xl md:text-3xl font-serif text-[#F3F1EC] font-normal leading-tight">
          I build across product surfaces
        </h3>
        <p className="text-xs text-[#99958E] mt-3 font-sans font-light leading-relaxed">
          An engineer's capability is defined by the variety of platforms they can construct. Select a surface to map its structural scope and connected projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Surfaces Grid List */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-2">
          {surfaces.map((s) => {
            const isSelected = activeSurface === s.id;
            return (
              <button
                id={`surface-btn-${s.id}`}
                key={s.id}
                onClick={() => setActiveSurface(s.id)}
                className={`p-4 text-left border aspect-video flex flex-col justify-between transition-colors cursor-pointer rounded-none ${
                  isSelected
                    ? "border-[#D94A32] bg-[#0D0D0D] text-[#F3F1EC]"
                    : "border-white/[0.04] bg-[#131313]/60 hover:bg-[#131313] text-[#99958E]"
                }`}
              >
                <span className="font-mono text-[9px] text-[#99958E] bg-[#131313] px-1.5 py-0.5 border border-white/[0.04]">
                  {s.projects.length} CASE{s.projects.length !== 1 ? "S" : ""}
                </span>
                <div className="text-[11px] tracking-wider font-semibold text-[#F3F1EC] uppercase font-sans mt-2">
                  {s.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Mapping Explorer Panel */}
        <div className="lg:col-span-7 bg-[#0D0D0D] border border-white/[0.04] p-6 flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-white/[0.04] mb-4">
              <span className="text-[10px] font-mono text-[#D94A32] tracking-widest uppercase font-medium">
                {currentSurfaceData.id} ARCHITECTURE SPEC
              </span>
            </div>

            <p className="text-xs text-[#99958E] leading-relaxed font-sans font-light">
              {currentSurfaceData.description}
            </p>

            <div className="mt-5">
              <span className="text-[10px] text-[#99958E] uppercase tracking-wider block mb-3 font-semibold">
                Connected cases:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {currentSurfaceData.projects.map((proj, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-2.5 bg-[#131313] border border-white/[0.04] text-[#F3F1EC] flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-[#D94A32] shrink-0" />
                    <span className="truncate uppercase font-mono text-[9px] font-semibold">{proj}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
