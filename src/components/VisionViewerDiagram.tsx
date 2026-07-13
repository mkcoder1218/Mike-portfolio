import React from "react";

export default function VisionViewerDiagram() {
  const bytes = ["95", "3A", "05", "3D", "00", "00", "00", "97"];
  
  const annotations = [
    { byte: "95", name: "CRC", desc: "Cyclic Redundancy Check low byte verifying packet integrity." },
    { byte: "3A", name: "CMD", desc: "Command code specifying target client window operation." },
    { byte: "05", name: "LENGTH", desc: "Payload length indicator (5 bytes remaining)." },
    { byte: "3D", name: "CHECK", desc: "Auxiliary parity byte to validate header correctness." },
    { byte: "00", name: "DATA", desc: "Null channel routing padding." },
    { byte: "00", name: "DATA", desc: "Null channel routing padding." },
    { byte: "00", name: "DATA", desc: "Null channel routing padding." },
    { byte: "97", name: "FOOTER", desc: "Magic byte terminating the packet structure." }
  ];

  return (
    <div className="w-full py-12 px-6 border border-white/[0.06] bg-[#131313] relative overflow-hidden">
      {/* Title section matching constraints */}
      <div className="max-w-2xl mb-10">
        <h3 className="text-xl md:text-2xl font-light font-sans text-[#99958E] tracking-tight leading-none">
          I could see the packets.
        </h3>
        <h4 className="text-3xl md:text-5xl font-serif italic text-[#F3F1EC] font-normal mt-2 leading-tight">
          I wanted to understand what they meant.
        </h4>
      </div>

      {/* Horizontal Flow Pipeline */}
      <div className="mb-12">
        <div className="text-[10px] font-mono text-[#99958E] uppercase tracking-wider mb-3">
          RECONSTRUCTED SIGNAL PATHWAY
        </div>
        
        {/* Thin horizontal line pipeline */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 border-t border-b border-white/[0.06] py-4 text-center font-mono">
          <div>
            <div className="text-[#D94A32] text-xs font-semibold">Application</div>
            <div className="text-[9px] text-[#99958E] mt-0.5 font-sans font-light">Raw process state</div>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-white/[0.06] pt-2 md:pt-0">
            <div className="text-[#F3F1EC] text-xs font-semibold">→ TCP traffic</div>
            <div className="text-[9px] text-[#99958E] mt-0.5 font-sans font-light">Socket transport</div>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-white/[0.06] pt-2 md:pt-0">
            <div className="text-[#F3F1EC] text-xs font-semibold">→ Packet capture</div>
            <div className="text-[9px] text-[#99958E] mt-0.5 font-sans font-light">Promiscuous mode</div>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-white/[0.06] pt-2 md:pt-0">
            <div className="text-[#F3F1EC] text-xs font-semibold">→ Header analysis</div>
            <div className="text-[9px] text-[#99958E] mt-0.5 font-sans font-light">Structure mapping</div>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-white/[0.06] pt-2 md:pt-0">
            <div className="text-[#F3F1EC] text-xs font-semibold">→ Payload decoding</div>
            <div className="text-[9px] text-[#99958E] mt-0.5 font-sans font-light">UTF bit-shifting</div>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-white/[0.06] pt-2 md:pt-0">
            <div className="text-[#D94A32] text-xs font-semibold">→ Mock server</div>
            <div className="text-[9px] text-[#99958E] mt-0.5 font-sans font-light">Controlled interop</div>
          </div>
        </div>
      </div>

      {/* Bytes & Annotations */}
      <div className="space-y-6">
        <div className="text-[10px] font-mono text-[#99958E] uppercase tracking-wider">
          PROTOCOL BYTE STREAM SPECIFICATION (HEXADECIMAL RECONSTRUCTION)
        </div>

        {/* Large Bytes Display */}
        <div className="flex flex-wrap gap-2.5">
          {bytes.map((byte, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-14 h-14 bg-[#0D0D0D] border border-white/[0.06] flex items-center justify-center font-mono text-base font-bold text-[#F3F1EC] rounded-none">
                {byte}
              </div>
              <div className="text-[9px] font-mono text-[#D94A32] mt-1.5 font-semibold">
                {annotations[i].name}
              </div>
            </div>
          ))}
        </div>

        {/* Annotations List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/[0.04]">
          {annotations.map((ann, i) => (
            <div key={i} className="font-sans text-xs">
              <div className="flex items-center gap-1.5 font-mono mb-1">
                <span className="text-[#D94A32] font-bold">[{ann.byte}]</span>
                <span className="text-[#F3F1EC] font-semibold text-[10px] uppercase tracking-wider">{ann.name}</span>
              </div>
              <p className="text-[11px] text-[#99958E] font-light leading-relaxed">
                {ann.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
