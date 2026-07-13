import React from "react";

export default function BlihDiagram() {
  const flowSteps = [
    { label: "Employee arrives", desc: "Terminal ingress check-in records precise local times." },
    { label: "Attendance recorded", desc: "Saves raw datetime strings into audited logs." },
    { label: "Schedule compared", desc: "Cross-references shift rules in the matrix database." },
    { label: "Break time considered", desc: "Subtracts minimum break thresholds automatically." },
    { label: "Variance calculated", desc: "Determines absolute differences down to the minute." },
    { label: "Administrative rules applied", desc: "Implements penalty calculations and rounding policies." },
    { label: "Report generated", desc: "Assembles clean data exports for accounting payroll pre-calc." }
  ];

  const technicalConcepts = [
    { variable: "activeDuration", val: "07H 30M", desc: "Net activity time excluding break deductions" },
    { variable: "breakDuration", val: "01H 00M", desc: "Configured resting periods mapped dynamically" },
    { variable: "scheduleVariance", val: "-00H 54M", desc: "Deviation against standard core expectation" },
    { variable: "targetDuration", val: "07H 30M", desc: "Required shift length before exception dispatch" }
  ];

  return (
    <div className="w-full py-12 px-6 border border-white/[0.06] bg-[#131313] relative overflow-hidden">
      <div className="text-[11px] font-mono tracking-widest text-[#99958E] uppercase mb-10 border-b border-white/[0.06] pb-3">
        FIG_02. WORKFLOW ENGINE & DATA MODEL
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Vertical Flow */}
        <div className="md:col-span-7 space-y-4">
          <div className="text-[10px] font-mono text-[#99958E] uppercase tracking-wider mb-4 block">
            WORKFLOW SEQUENTIAL MAP
          </div>
          
          <div className="space-y-0 pl-4 border-l border-white/[0.06]">
            {flowSteps.map((step, idx) => (
              <div key={idx} className="relative pb-6 last:pb-0">
                {/* Visual node bullet */}
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-[#D94A32] rounded-full border border-[#131313]" />
                
                <div className="pl-2">
                  <h4 className="text-xs font-semibold text-[#F3F1EC]">{step.label}</h4>
                  <p className="text-[11px] text-[#99958E] font-sans font-light mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Abstract Technical Concepts */}
        <div className="md:col-span-5 space-y-6">
          <div className="text-[10px] font-mono text-[#99958E] uppercase tracking-wider block">
            ABSTRACT TECHNICAL VALUES
          </div>

          <div className="space-y-4 bg-[#0D0D0D] p-5 border border-white/[0.04]">
            {technicalConcepts.map((item, idx) => (
              <div key={idx} className="font-mono">
                <div className="flex justify-between items-baseline">
                  <span className="text-[11px] text-[#D94A32]">{item.variable}</span>
                  <span className="text-[11px] text-[#F3F1EC] font-semibold">{item.val}</span>
                </div>
                <div className="text-[10px] text-[#99958E] font-sans font-light mt-0.5 leading-relaxed">
                  {item.desc}
                </div>
                {idx < technicalConcepts.length - 1 && (
                  <div className="border-b border-white/[0.04] mt-3" />
                )}
              </div>
            ))}
          </div>

          <p className="text-[11px] text-[#99958E] font-sans font-light leading-relaxed">
            By mapping actual human behaviors to explicit deterministic states and variables, administrators get absolute auditing clarity without mathematical guesswork.
          </p>
        </div>

      </div>
    </div>
  );
}
