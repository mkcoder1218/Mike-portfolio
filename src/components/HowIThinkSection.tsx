import React, { useState } from "react";

interface ThinkStep {
  index: string;
  title: string;
  question: string;
  description: string;
  signals: string[];
}

export default function HowIThinkSection() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const steps: ThinkStep[] = [
    {
      index: "01",
      title: "Actors",
      question: "Who touches the system?",
      description: "Map out clear boundaries between stakeholders. A cashier printing a betting slip needs zero latency and physical hardware device control; an HR Admin managing payroll calculations needs absolute data consistency and precise privilege checks.",
      signals: ["Super Admin", "Admin", "HR Manager", "Employee", "Cashier", "End Customer"]
    },
    {
      index: "02",
      title: "Objects",
      question: "What exists in the system?",
      description: "Identify the primary domain entities. Rather than thinking about UI mockups, design relational models and constraints. Define database primary keys, relationships, and multi-tenant scoping.",
      signals: ["User Account", "Company Profile", "Attendance Log", "Betting Fixture", "Market Odd", "Store Order"]
    },
    {
      index: "03",
      title: "Relationships",
      question: "How are those objects connected?",
      description: "Define the strict integrity bounds between objects. One-to-many, many-to-many associations, cascading deletes, foreign key constraints, and dynamic mapping caches that prevent isolation leaks.",
      signals: ["Foreign Keys", "Cascade Triggers", "Indexing Maps", "Cache Normalization"]
    },
    {
      index: "04",
      title: "Rules",
      question: "Who can do what?",
      description: "Enforce rigorous business logic controls. Determine permission escalation bounds, required double-approvals, handling missing fields gracefully, and row-level security policies.",
      signals: ["RBAC Access Control", "Double Approvals", "Auto-lock Conditions", "Audit Trail Triggers"]
    },
    {
      index: "05",
      title: "States",
      question: "What can change?",
      description: "Establish strict state transitions. Objects must never exist in invalid states. Ensure transitions are fully validated server-side and recorded in immutable history logs.",
      signals: ["PENDING", "APPROVED", "WORKING", "ON_BREAK", "SETTLED", "FAILED"]
    },
    {
      index: "06",
      title: "Failure",
      question: "What happens when something goes wrong?",
      description: "Assume the network fails, tasks run twice, and requests arrive late. Build defensive pipelines: idempotent actions, connection retry loops, transaction rollbacks, offline synchronizers, and error buffers.",
      signals: ["Double-spend prevention", "Delayed provider feeds", "Connection drops", "Hardware printer jams"]
    },
    {
      index: "07",
      title: "Build",
      question: "How does it compile?",
      description: "Assemble the full architecture sequentially: models, transaction services, secure APIs, automated scheduled workers, responsive UI views, and redundant server-side deployments.",
      signals: ["Database Schemas", "TypeScript Services", "API Handlers", "Cron Workers", "Vercel / VPS Docker"]
    }
  ];

  const activeStep = steps[selectedIdx];

  return (
    <div className="w-full py-12 px-6 border border-white/[0.06] bg-[#131313] relative overflow-hidden">
      <div className="max-w-3xl mb-8 border-b border-white/[0.06] pb-4">
        <span className="text-[#D94A32] font-mono text-[11px] font-medium tracking-widest block uppercase mb-2">
          System Architecture Process
        </span>
        <h3 className="text-2xl md:text-3xl font-serif text-[#F3F1EC] font-normal leading-tight">
          Before I build, I need to know what exists.
        </h3>
        <p className="text-xs text-[#99958E] mt-3 font-sans font-light leading-relaxed">
          “I usually do not start by asking which framework to use. I start by asking what exists in the system, who touches it, what changes, and what can fail.”
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Staggered Index Menu */}
        <div className="lg:col-span-5 flex flex-col gap-1">
          <span className="text-[10px] text-[#99958E] font-mono tracking-widest uppercase mb-2 font-medium">
            System Phases
          </span>
          {steps.map((step, idx) => (
            <button
              id={`think-step-${step.index}`}
              key={step.index}
              onClick={() => setSelectedIdx(idx)}
              className={`p-3 text-left border rounded-none transition-colors flex items-center justify-between cursor-pointer ${
                selectedIdx === idx
                  ? "border-[#D94A32] bg-[#0D0D0D] text-[#F3F1EC] font-semibold"
                  : "border-transparent bg-transparent hover:bg-white/[0.02] text-[#99958E]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-[#99958E]/40 text-xs font-mono">{step.index}</span>
                <span className="tracking-tight text-xs font-sans uppercase">{step.title}</span>
              </div>
              <span className="text-[10px] text-[#99958E]/60 hidden sm:inline font-sans">{step.question}</span>
            </button>
          ))}
        </div>

        {/* Right Side: Step Content Inspector */}
        <div className="lg:col-span-7 bg-[#0D0D0D] border border-white/[0.04] p-6 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Header */}
            <div className="pb-3 border-b border-white/[0.04]">
              <span className="text-[9px] font-mono text-[#99958E] block leading-none font-medium uppercase mb-1">
                Phase {activeStep.index}
              </span>
              <h4 className="text-sm font-semibold text-[#F3F1EC] tracking-tight font-sans uppercase">
                {activeStep.title}
              </h4>
            </div>

            {/* Core explanation */}
            <div className="space-y-3 font-sans">
              <div className="text-xs text-[#D94A32] font-semibold bg-[#131313] py-2 px-3 border-l-2 border-[#D94A32] uppercase tracking-wider">
                {activeStep.question}
              </div>
              <p className="text-xs text-[#99958E] leading-relaxed font-light">
                {activeStep.description}
              </p>
            </div>

            {/* Signals / Entities */}
            <div className="pt-2 font-sans">
              <span className="text-[9px] text-[#99958E] block mb-2 uppercase tracking-wider font-semibold">
                Established Artifacts:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeStep.signals.map((sig, sIdx) => (
                  <span
                    key={sIdx}
                    className="py-1 px-2.5 bg-[#131313] border border-white/[0.06] text-[#F3F1EC] text-[10px] flex items-center gap-1.5 font-mono"
                  >
                    <span className="w-1 h-1 bg-[#D94A32]" />
                    {sig}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
