import React from "react";

export default function King5Diagram() {
  return (
    <div className="w-full py-12 px-6 border border-white/[0.06] bg-[#131313] relative overflow-hidden">
      {/* Editorial subtitle */}
      <div className="text-[11px] font-mono tracking-widest text-[#99958E] uppercase mb-8 border-b border-white/[0.06] pb-3">
        FIG_01. ARCHITECTURAL TOPOLOGY
      </div>

      <div className="max-w-xl mx-auto flex flex-col items-center">
        {/* Node 1 */}
        <div className="text-center w-full">
          <div className="text-[10px] font-mono text-[#99958E] uppercase mb-1">01 / Ingress Data</div>
          <div className="text-base font-semibold text-[#F3F1EC]">Sports provider feed</div>
          <p className="text-xs text-[#99958E] mt-1 max-w-sm mx-auto font-sans font-light">
            Continuous live XML/JSON streaming API endpoints.
          </p>
        </div>

        {/* Vector Arrow */}
        <div className="my-6 flex flex-col items-center">
          <div className="w-[1px] h-10 bg-gradient-to-b from-[#D94A32] to-[#99958E]/40" />
          <span className="text-[10px] text-[#99958E]/60">↓</span>
        </div>

        {/* Node 2 */}
        <div className="text-center w-full">
          <div className="text-[10px] font-mono text-[#99958E] uppercase mb-1">02 / Automated Intake</div>
          <div className="text-base font-semibold text-[#F3F1EC]">Synchronization workers</div>
          <p className="text-xs text-[#99958E] mt-1 max-w-sm mx-auto font-sans font-light">
            Scheduled cron triggers executing raw feed compare algorithms at 1500ms intervals.
          </p>
        </div>

        {/* Vector Arrow */}
        <div className="my-6 flex flex-col items-center">
          <div className="w-[1px] h-10 bg-gradient-to-b from-[#99958E]/40 to-[#D94A32]" />
          <span className="text-[10px] text-[#99958E]/60">↓</span>
        </div>

        {/* Node 3 */}
        <div className="text-center w-full">
          <div className="text-[10px] font-mono text-[#99958E] uppercase mb-1">03 / Alignment logic</div>
          <div className="text-base font-semibold text-[#F3F1EC]">Fixture mapping</div>
          <p className="text-xs text-[#99958E] mt-1 max-w-sm mx-auto font-sans font-light">
            Unifying team aliases using strict lexicographical dictionary mapping.
          </p>
        </div>

        {/* Vector Arrow */}
        <div className="my-6 flex flex-col items-center">
          <div className="w-[1px] h-10 bg-[#99958E]/20" />
          <span className="text-[10px] text-[#99958E]/60">↓</span>
        </div>

        {/* Node 4 */}
        <div className="text-center w-full">
          <div className="text-[10px] font-mono text-[#99958E] uppercase mb-1">04 / Risk Calibration</div>
          <div className="text-base font-semibold text-[#F3F1EC]">Markets and odds</div>
          <p className="text-xs text-[#99958E] mt-1 max-w-sm mx-auto font-sans font-light">
            Dynamic margin capping and bookmaker priority normalization rules.
          </p>
        </div>

        {/* Vector Arrow */}
        <div className="my-6 flex flex-col items-center">
          <div className="w-[1px] h-10 bg-gradient-to-b from-[#99958E]/20 to-[#D94A32]" />
          <span className="text-[10px] text-[#99958E]/60">↓</span>
        </div>

        {/* Node 5 */}
        <div className="text-center w-full">
          <div className="text-[10px] font-mono text-[#99958E] uppercase mb-1">05 / Delivery</div>
          <div className="text-base font-semibold text-[#D94A32]">Product surfaces</div>
          <p className="text-xs text-[#99958E] mt-1 max-w-sm mx-auto font-sans font-light">
            Real-time interface distribution, cashbox terminals, and thermal ESC/POS printers.
          </p>
        </div>
      </div>
    </div>
  );
}
