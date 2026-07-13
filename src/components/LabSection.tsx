import React, { useState, useEffect } from "react";

export default function LabSection() {
  const [activeTab, setActiveTab] = useState<"normalizer" | "syncer">("normalizer");

  // 1. DATA NORMALIZATION STATES & DATA
  const mockFixtures = [
    {
      raw: "Addis-City v Adama Sports Club",
      provider: "BonaSport (API_ID: 104)",
      resolvedHome: "Addis Ababa City",
      resolvedAway: "Adama City FC",
      matchKey: "ETH_ADDIS_ADAMA_2026",
      status: "Mapped & Unified",
    },
    {
      raw: "Maddis_FC vs Adama-City",
      provider: "BetData Feed (API_ID: 302)",
      resolvedHome: "Addis Ababa City",
      resolvedAway: "Adama City FC",
      matchKey: "ETH_ADDIS_ADAMA_2026",
      status: "Mapped & Unified",
    },
    {
      raw: "Red_Sea_Mart_United_FC ➔ Hawasa-City",
      provider: "EastAfricanSport (API_ID: 991)",
      resolvedHome: "Red Sea Mart FC",
      resolvedAway: "Hawassa City FC",
      matchKey: "ETH_REDSEA_HAWASSA_2026",
      status: "Mapped & Unified",
    }
  ];

  const [selectedFixtureIdx, setSelectedFixtureIdx] = useState(0);
  const currentFixture = mockFixtures[selectedFixtureIdx];

  // 2. REALTIME CLOCK SYNCHRONIZATION STATES
  const [serverTime, setServerTime] = useState<number>(Date.now());
  const [clientDrift, setClientDrift] = useState<number>(3150); // client is 3150ms ahead
  const [latency, setLatency] = useState<number>(45); // 45ms network latency
  const [calculatedOffset, setCalculatedOffset] = useState<number>(0);
  const [syncStatus, setSyncStatus] = useState<"uncalibrated" | "syncing" | "calibrated">("uncalibrated");

  // Server clock ticking
  useEffect(() => {
    const timer = setInterval(() => {
      setServerTime((prev) => prev + 100);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const runSyncHandshake = () => {
    setSyncStatus("syncing");
    setTimeout(() => {
      // NTP Equation: Offset = ((T1 - T0) + (T2 - T3)) / 2
      const offsetValue = -clientDrift + (latency / 2);
      setCalculatedOffset(offsetValue);
      setSyncStatus("calibrated");
    }, 800);
  };

  const getFormatTime = (ms: number) => {
    const d = new Date(ms);
    return d.toTimeString().split(" ")[0] + "." + String(Math.floor(d.getMilliseconds() / 100));
  };

  return (
    <div className="w-full py-12 px-6 border border-white/[0.06] bg-[#131313] relative overflow-hidden">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/[0.06] pb-5 mb-8 gap-4">
        <div>
          <span className="text-[#D94A32] font-mono text-[11px] font-medium tracking-widest block uppercase mb-1">
            Research & Utilities
          </span>
          <h3 className="text-xl md:text-2xl font-serif text-[#F3F1EC] font-normal leading-tight">
            Engineering lab concepts
          </h3>
        </div>

        {/* Tab selection */}
        <div className="flex gap-1.5 bg-[#0D0D0D] p-1 border border-white/[0.06] rounded-none">
          <button
            id="tab-btn-normalizer"
            onClick={() => setActiveTab("normalizer")}
            className={`py-1.5 px-3 text-[10px] font-sans font-semibold tracking-wider transition-colors cursor-pointer rounded-none ${
              activeTab === "normalizer"
                ? "bg-[#D94A32] text-[#F3F1EC]"
                : "text-[#99958E] hover:text-[#F3F1EC]"
            }`}
          >
            PROVIDER NORMALIZER
          </button>
          <button
            id="tab-btn-syncer"
            onClick={() => setActiveTab("syncer")}
            className={`py-1.5 px-3 text-[10px] font-sans font-semibold tracking-wider transition-colors cursor-pointer rounded-none ${
              activeTab === "syncer"
                ? "bg-[#D94A32] text-[#F3F1EC]"
                : "text-[#99958E] hover:text-[#F3F1EC]"
            }`}
          >
            NTP CLOCK SYNCHRONIZATION
          </button>
        </div>
      </div>

      {activeTab === "normalizer" ? (
        <div id="tab-content-normalizer" className="space-y-6">
          <p className="text-xs text-[#99958E] max-w-2xl leading-relaxed font-sans font-light">
            Multi-bookmaker systems require unifying structural differences across feeds. Observe how incoming raw game identifiers map into uniform team aliases and stable DB keys.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Selection list */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-[10px] text-[#99958E] font-mono tracking-wider uppercase font-semibold">
                Select Raw Feed Record:
              </span>
              <div className="flex flex-col gap-1.5">
                {mockFixtures.map((fix, i) => (
                  <button
                    id={`fixture-option-${i}`}
                    key={i}
                    onClick={() => setSelectedFixtureIdx(i)}
                    className={`p-3 text-left border rounded-none transition-colors cursor-pointer ${
                      selectedFixtureIdx === i
                        ? "border-[#D94A32] bg-[#0D0D0D] text-[#F3F1EC]"
                        : "border-white/[0.04] bg-[#0D0D0D]/40 hover:bg-[#0D0D0D]/80 text-[#99958E]"
                    }`}
                  >
                    <div className="text-xs font-semibold truncate mb-1">"{fix.raw}"</div>
                    <div className="text-[10px] text-[#99958E]/60">{fix.provider}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Ingestion Steps Simulation */}
            <div className="lg:col-span-7 bg-[#0D0D0D] border border-white/[0.04] p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-white/[0.04] pb-2">
                <span className="font-semibold text-[#F3F1EC] text-xs font-sans uppercase">
                  Normalizer Data Pipeline
                </span>
                <span className="text-[9px] bg-emerald-950/20 text-emerald-400 py-0.5 px-2 border border-emerald-900/40 font-bold uppercase">ACTIVE</span>
              </div>

              {/* Step 1: Input */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4 font-mono text-xs">
                <div className="w-24 text-[#99958E] text-[10px] font-sans font-semibold uppercase pt-1">01 INCOMING</div>
                <div className="flex-1 bg-[#131313] p-3 border border-white/[0.04]">
                  <div className="text-[#99958E] text-[9px] font-sans uppercase font-semibold">RAW FIELD VALUE</div>
                  <div className="font-semibold text-[#D94A32] tracking-wider mt-0.5">"{currentFixture.raw}"</div>
                </div>
              </div>

              <div className="pl-12 text-[#99958E]/40 text-xs font-mono">↓</div>

              {/* Step 2: Mapping / Normalizing */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4 font-mono text-xs">
                <div className="w-24 text-[#99958E] text-[10px] font-sans font-semibold uppercase pt-1">02 RESOLUTION</div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#131313] p-3 border border-white/[0.04]">
                  <div>
                    <div className="text-[#99958E] text-[9px] font-sans uppercase font-semibold">RESOLVED HOME</div>
                    <div className="font-semibold text-[#F3F1EC] mt-0.5">{currentFixture.resolvedHome}</div>
                  </div>
                  <div>
                    <div className="text-[#99958E] text-[9px] font-sans uppercase font-semibold">RESOLVED AWAY</div>
                    <div className="font-semibold text-[#F3F1EC] mt-0.5">{currentFixture.resolvedAway}</div>
                  </div>
                </div>
              </div>

              <div className="pl-12 text-[#99958E]/40 text-xs font-mono">↓</div>

              {/* Step 3: Unified Key Output */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4 font-mono text-xs">
                <div className="w-24 text-[#99958E] text-[10px] font-sans font-semibold uppercase pt-1">03 DB INDEX KEY</div>
                <div className="flex-1 bg-[#131313] p-3 border border-white/[0.06] flex justify-between items-center gap-4">
                  <div>
                    <div className="text-[#99958E] text-[9px] font-sans uppercase font-semibold">UNIFIED MATCH REF KEY</div>
                    <div className="font-semibold tracking-widest text-[#D94A32] mt-0.5">{currentFixture.matchKey}</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] font-sans text-emerald-400 bg-emerald-950/20 px-2 py-1 border border-emerald-900/30">
                    {currentFixture.status.toUpperCase()}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      ) : (
        <div id="tab-content-syncer" className="space-y-6">
          <p className="text-xs text-[#99958E] max-w-2xl leading-relaxed font-sans font-light">
            Real-time game clients require synchronized timings. When a user clock drifts, countdown calculations break. The calibration below computes network roundtrip delays to offset client-side timers precisely.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Clock inputs */}
            <div className="lg:col-span-5 space-y-4 border border-white/[0.04] p-5 bg-[#0D0D0D]">
              <span className="text-[10px] text-[#99958E] block tracking-wider uppercase font-semibold">CLOCK DRIFT PARAMETERS:</span>

              <div className="space-y-4 font-sans text-xs">
                <div>
                  <label className="block text-[10px] text-[#99958E] mb-1.5 font-semibold uppercase tracking-wider">CLIENT MACHINE CLOCK DRIFT (MS):</label>
                  <div className="flex items-center gap-3">
                    <input
                      id="drift-slider"
                      type="range"
                      min={-8000}
                      max={8000}
                      step={250}
                      value={clientDrift}
                      onChange={(e) => {
                        setClientDrift(Number(e.target.value));
                        setSyncStatus("uncalibrated");
                      }}
                      className="w-full h-1 bg-[#131313] rounded-none appearance-none cursor-pointer accent-[#D94A32]"
                    />
                    <span className="font-mono font-semibold text-[#F3F1EC] w-16 text-right shrink-0">{clientDrift > 0 ? "+" : ""}{clientDrift}ms</span>
                  </div>
                  <span className="text-[10px] text-[#99958E]/60 block mt-1 font-light">Adjust to simulate client system clock offset.</span>
                </div>

                <div>
                  <label className="block text-[10px] text-[#99958E] mb-1.5 font-semibold uppercase tracking-wider">NETWORK ROUND-TRIP LATENCY (MS):</label>
                  <div className="flex items-center gap-3">
                    <input
                      id="latency-slider"
                      type="range"
                      min={10}
                      max={400}
                      step={5}
                      value={latency}
                      onChange={(e) => {
                        setLatency(Number(e.target.value));
                        setSyncStatus("uncalibrated");
                      }}
                      className="w-full h-1 bg-[#131313] rounded-none appearance-none cursor-pointer accent-[#D94A32]"
                    />
                    <span className="font-mono font-semibold text-[#F3F1EC] w-16 text-right shrink-0">{latency}ms</span>
                  </div>
                </div>

                <button
                  id="ping-handshake-btn"
                  onClick={runSyncHandshake}
                  disabled={syncStatus === "syncing"}
                  className="w-full py-2 bg-[#D94A32] hover:bg-[#b03b27] text-[#F3F1EC] font-semibold tracking-wider transition-colors cursor-pointer rounded-none border border-[#D94A32]"
                >
                  {syncStatus === "syncing" ? "TRANSMITTING HANDSHAKE PINGS..." : "CALCULATE DRIFT & SYNC CLOCKS"}
                </button>
              </div>
            </div>

            {/* Visual alignment simulation */}
            <div className="lg:col-span-7 bg-[#0D0D0D] border border-white/[0.04] p-5 text-[#99958E] flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex justify-between items-center border-b border-white/[0.04] pb-2 mb-4">
                  <span className="font-semibold text-[#F3F1EC] text-xs flex items-center gap-1.5 uppercase font-sans">
                    CLOCK ALIGNMENT MATRIX
                  </span>
                  <span className={`text-[9px] font-sans font-semibold py-0.5 px-2 rounded-none border ${
                    syncStatus === "calibrated" ? "bg-emerald-950/20 text-emerald-400 border-emerald-900/40" : "bg-[#131313] text-[#99958E] border-white/[0.04]"
                  }`}>
                    {syncStatus === "calibrated" ? "SYNCHRONIZED" : "DRIFT DETECTED"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 font-mono text-xs">
                  <div>
                    <div className="text-[10px] text-[#99958E]/60 uppercase font-sans font-semibold tracking-wider">SERVER CLOCK (UTC)</div>
                    <div className="text-sm font-semibold text-[#D94A32] tracking-wider mt-0.5">
                      {getFormatTime(serverTime)}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-[#99958E]/60 uppercase font-sans font-semibold tracking-wider">CLIENT MACHINE CLOCK</div>
                    <div className={`text-sm font-semibold tracking-wider mt-0.5 ${Math.abs(clientDrift) > 100 ? "text-amber-500" : "text-[#D94A32]"}`}>
                      {getFormatTime(serverTime + clientDrift)}
                    </div>
                  </div>
                </div>

                {/* Simulated Offset math display */}
                <div className="bg-[#131313] p-4 border border-white/[0.04] rounded-none">
                  <div className="text-[10px] text-[#99958E]/60 mb-2 uppercase font-sans font-semibold tracking-wider">NTP MATHEMATICAL RESOLUTION:</div>
                  <div className="space-y-1.5 text-[#99958E] text-xs">
                    <div className="flex justify-between font-mono">
                      <span className="font-sans">Configured Machine Drift (δ):</span>
                      <span className="text-amber-500 font-semibold">{clientDrift} ms</span>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span className="font-sans">Round-trip delay (rtt):</span>
                      <span className="text-[#F3F1EC] font-semibold">{latency} ms</span>
                    </div>
                    <div className="pt-2 border-t border-white/[0.04] flex justify-between font-bold text-[#F3F1EC] font-mono">
                      <span className="font-sans">CALCULATED DRIFT OFFSET (θ):</span>
                      <span className="text-[#D94A32]">{calculatedOffset !== 0 ? `${calculatedOffset.toFixed(1)} ms` : "0.0 ms"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-[#99958E]/60 mt-3 font-sans leading-relaxed uppercase">
                {syncStatus === "calibrated" ? (
                  <span className="text-emerald-400">✓ Alignment stable. Offset compensation registered. Timing accuracy &lt; 5ms.</span>
                ) : (
                  <span>Wait: Out of sync. Calibration sequence required to align active timers.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
