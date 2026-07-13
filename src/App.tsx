import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Github, 
  Mail, 
  Phone,
  ExternalLink, 
  Search, 
  ArrowRight, 
  ArrowUpRight,
  Menu, 
  X, 
  Cpu, 
  Terminal,
  Layers,
  Database,
  CheckCircle,
  HelpCircle,
  Clock,
  Printer
} from "lucide-react";

// Component imports
import King5Diagram from "./components/King5Diagram";
import BlihDiagram from "./components/BlihDiagram";
import VisionViewerDiagram from "./components/VisionViewerDiagram";
import LabSection from "./components/LabSection";
import HowIThinkSection from "./components/HowIThinkSection";
import SurfacesSection from "./components/SurfacesSection";
import GitHubActivity from "./components/github/GitHubActivity";

// Data imports
import { PROJECT_ARCHIVE, TECHNICAL_STACK, Project } from "./data";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("INDEX");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Archive States
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>("ALL");
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>("ALL");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Selected row preview index
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  // References for scrolling state
  const heroRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const labRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;

      if (heroRef.current && scrollPos < heroRef.current.offsetTop + heroRef.current.offsetHeight) {
        setActiveSection("INDEX");
      } else if (workRef.current && scrollPos < workRef.current.offsetTop + workRef.current.offsetHeight) {
        setActiveSection("WORK");
      } else if (labRef.current && scrollPos < labRef.current.offsetTop + labRef.current.offsetHeight) {
        setActiveSection("LAB");
      } else if (aboutRef.current && scrollPos < aboutRef.current.offsetTop + aboutRef.current.offsetHeight) {
        setActiveSection("ABOUT");
      } else if (contactRef.current) {
        setActiveSection("CONTACT");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (elementId: string, sectionKey: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionKey);
      setMobileMenuOpen(false);
    }
  };

  // Unique categories for filters
  const allDomains = ["ALL", ...Array.from(new Set(PROJECT_ARCHIVE.map(p => p.domain.split(" / ")[0])))];
  const allRoles = [
    "ALL", 
    "FULL STACK", 
    "BACKEND", 
    "FRONTEND", 
    "MOBILE", 
    "UI ONLY", 
    "BACKEND CONTRIBUTION", 
    "FRONTEND CONTRIBUTION", 
    "MOBILE CONTRIBUTION", 
    "AUTOMATION", 
    "CLIENT PROJECT", 
    "CASE STUDY DESIGN"
  ];

  // Filtering & Sorting
  const filteredProjects = PROJECT_ARCHIVE.filter((proj) => {
    const matchesSearch = proj.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          proj.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRoleFilter === "ALL" || 
                        proj.role === selectedRoleFilter ||
                        (selectedRoleFilter === "FULL STACK" && proj.role === "FULL STACK") ||
                        (selectedRoleFilter === "BACKEND" && proj.role === "BACKEND") ||
                        (selectedRoleFilter === "FRONTEND" && proj.role === "FRONTEND") ||
                        (selectedRoleFilter === "MOBILE" && proj.role === "MOBILE");
    
    const matchesDomain = selectedDomainFilter === "ALL" || proj.domain.startsWith(selectedDomainFilter);

    return matchesSearch && matchesRole && matchesDomain;
  }).sort((a, b) => {
    return sortOrder === "asc" 
      ? a.index.localeCompare(b.index) 
      : b.index.localeCompare(a.index);
  });

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F3F1EC] selection:bg-[#D94A32] selection:text-[#0D0D0D] font-sans antialiased">
      
      {/* ---------------- NAVIGATION HEADER ---------------- */}
      <header className="sticky top-0 z-50 bg-[#0D0D0D]/90 backdrop-blur-md border-b border-white/[0.06] transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo / Left side identity */}
          <button 
            id="nav-logo"
            onClick={() => scrollToSection("hero-section", "INDEX")} 
            className="font-sans text-sm font-semibold tracking-tight text-[#F3F1EC] cursor-pointer hover:text-[#D94A32] transition-colors"
          >
            Mikeyas Derje
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-sans text-xs font-medium tracking-tight">
            {[
              { key: "INDEX", id: "hero-section", label: "Work" },
              { key: "WORK", id: "selected-systems-section", label: "Projects" },
              { key: "LAB", id: "lab-section", label: "Reverse Engineering" },
              { key: "ABOUT", id: "about-section", label: "About" },
              { key: "CONTACT", id: "contact-section", label: "Contact" },
            ].map((item) => (
              <button
                id={`nav-link-${item.key}`}
                key={item.key}
                onClick={() => scrollToSection(item.id, item.key)}
                className={`transition-colors py-1 cursor-pointer relative ${
                  activeSection === item.key 
                    ? "text-[#F3F1EC]" 
                    : "text-[#99958E] hover:text-[#F3F1EC]"
                }`}
              >
                {item.label}
                {activeSection === item.key && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D94A32]" />
                )}
              </button>
            ))}
          </nav>

          {/* Subtle Right details */}
          <div className="hidden lg:flex items-center text-xs text-[#99958E] font-sans">
            <span>Addis Ababa, Ethiopia</span>
            <span className="mx-3 text-[#99958E]/40 select-none">·</span>
            <span>Available for opportunities</span>
          </div>

          {/* Premium Animated Hamburger Menu Toggle */}
          <button 
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden flex flex-col justify-center items-end gap-1.5 w-8 h-8 cursor-pointer focus:outline-none group"
            aria-label="Open navigation menu"
          >
            <span className="h-[1px] bg-[#F3F1EC] w-6 transition-all duration-300 group-hover:bg-[#D94A32]" />
            <span className="h-[1px] bg-[#F3F1EC] w-4 transition-all duration-300 group-hover:bg-[#D94A32]" />
          </button>
        </div>
      </header>

      {/* Immersive Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-[#0D0D0D] p-6 overflow-y-auto md:hidden flex flex-col justify-between"
          >
            {/* Header top inside overlay */}
            <div className="flex items-center justify-between h-16 border-b border-white/[0.06]">
              <span className="font-sans text-sm font-semibold tracking-tight text-[#F3F1EC]">
                Mikeyas Derje
              </span>
              
              {/* Premium Close button inside full-screen menu */}
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="flex flex-col justify-center items-center w-8 h-8 cursor-pointer focus:outline-none group relative"
                aria-label="Close navigation menu"
              >
                <span className="absolute h-[1px] bg-[#F3F1EC] w-6 rotate-45 transition-all duration-300 group-hover:bg-[#D94A32]" />
                <span className="absolute h-[1px] bg-[#F3F1EC] w-6 -rotate-45 transition-all duration-300 group-hover:bg-[#D94A32]" />
              </button>
            </div>

            {/* Menu options with clean, quiet typography */}
            <div className="flex-1 flex flex-col justify-center space-y-8 py-12 font-sans">
              {[
                { key: "INDEX", id: "hero-section", label: "Work" },
                { key: "WORK", id: "selected-systems-section", label: "Projects" },
                { key: "LAB", id: "lab-section", label: "Reverse Engineering" },
                { key: "ABOUT", id: "about-section", label: "About" },
                { key: "CONTACT", id: "contact-section", label: "Contact" },
              ].map((item) => (
                <button
                  id={`mobile-nav-${item.key}`}
                  key={item.key}
                  onClick={() => scrollToSection(item.id, item.key)}
                  className="group block w-full text-left cursor-pointer focus:outline-none"
                >
                  <div className="flex flex-col items-start">
                    <span className={`text-3xl font-light tracking-tight transition-colors ${
                      activeSection === item.key 
                        ? "text-[#F3F1EC]" 
                        : "text-[#99958E] group-hover:text-[#F3F1EC]"
                    }`}>
                      {item.label}
                    </span>
                    {activeSection === item.key && (
                      <span className="w-8 h-[1px] bg-[#D94A32] mt-1.5" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Footer inside mobile overlay with context data */}
            <div className="border-t border-white/[0.06] pt-6 space-y-4 font-sans">
              <div className="space-y-1 text-xs text-[#99958E] font-light">
                <div className="tracking-tight text-[#F3F1EC]/60">Addis Ababa, Ethiopia</div>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="text-[11px] tracking-tight">Available for opportunities</span>
                </div>
              </div>

              {/* Direct clickable channels inside menu footer */}
              <div className="flex gap-4 text-[10px] text-[#99958E]/60 pt-2 border-t border-white/[0.03]">
                <a href="mailto:codemk1218@gmail.com" className="hover:text-[#D94A32] transition-colors">Email</a>
                <span>·</span>
                <a href="tel:+251933894492" className="hover:text-[#D94A32] transition-colors">Call</a>
                <span>·</span>
                <a href="https://github.com/mkcoder1218" target="_blank" rel="noreferrer" className="hover:text-[#D94A32] transition-colors">GitHub</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- MAIN CONTAINER ---------------- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-36">
        
        {/* ---------------- HERO SECTION ---------------- */}
        <section 
          id="hero-section" 
          ref={heroRef}
          className="min-h-[60vh] flex flex-col justify-between pt-4 pb-12 border-b border-white/[0.06] relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side: Editorial bio info and main message */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-1">
                <span className="text-sm font-semibold tracking-tight text-[#D94A32]">
                  Mikeyas Derje
                </span>
                <span className="text-xs text-[#99958E] block tracking-tight font-light">
                  Full Stack Software Engineer · Based in Addis Ababa, Ethiopia
                </span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#F3F1EC] leading-[1.05]">
                  I build complicated products
                  <span className="block font-serif italic text-[#D94A32] font-normal mt-2 leading-none">
                    until they make sense.
                  </span>
                </h1>
              </div>

              <div className="max-w-2xl space-y-6 text-sm text-[#99958E] font-sans font-light leading-relaxed">
                <p>
                  I work across frontend, backend systems, mobile products, real-time data, and production infrastructure. Most of my work starts with a messy business problem and ends as something people can actually use.
                </p>
                <p>
                  I don't just write visual frontends or isolated APIs. I build full, cohesive system integrations where connected surfaces, transactional state safety, scheduled data synchronization, and hardware interaction operate as a single unified product.
                </p>
              </div>

              {/* Simple links / triggers */}
              <div className="flex flex-wrap gap-x-8 gap-y-3 pt-4 text-xs font-medium">
                <button 
                  onClick={() => scrollToSection("selected-systems-section", "WORK")}
                  className="text-[#F3F1EC] hover:text-[#D94A32] transition-colors flex items-center gap-1.5 group cursor-pointer"
                >
                  <span>Selected work</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-white/[0.1] hidden sm:inline">|</span>
                <span className="text-[#99958E] font-light">Currently in Addis Ababa</span>
                <span className="text-white/[0.1] hidden sm:inline">|</span>
                <span className="text-emerald-500 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available for remote & full-time high-impact roles
                </span>
              </div>
            </div>

            {/* Right side: Human details / Direct context list */}
            <div className="lg:col-span-4 space-y-8 pt-4 lg:pt-12">
              <div className="space-y-4 border-l border-white/[0.06] pl-6 py-2">
                <div className="text-[10px] font-mono tracking-wider text-[#99958E] uppercase font-medium">
                  ENGINEERING CONTACTS
                </div>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-[9px] font-mono text-[#99958E]/60 block uppercase">Direct Inquiries</span>
                    <a 
                      href="mailto:codemk1218@gmail.com" 
                      className="text-sm font-semibold text-[#F3F1EC] hover:text-[#D94A32] transition-colors"
                    >
                      codemk1218@gmail.com
                    </a>
                  </div>

                  <div>
                    <span className="text-[9px] font-mono text-[#99958E]/60 block uppercase">Call / Telephone</span>
                    <a 
                      href="tel:+251933894492" 
                      className="text-sm font-semibold text-[#F3F1EC] hover:text-[#D94A32] transition-colors"
                    >
                      +251 933 894 492
                    </a>
                  </div>

                  <div>
                    <span className="text-[9px] font-mono text-[#99958E]/60 block uppercase">Code Repositories</span>
                    <a 
                      href="https://github.com/mkcoder1218" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-sm font-semibold text-[#F3F1EC] hover:text-[#D94A32] transition-colors flex items-center gap-1 mt-0.5"
                    >
                      <span>github.com/mkcoder1218</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-2 border-l border-white/[0.06] pl-6 py-1">
                <div className="text-[10px] font-mono tracking-wider text-[#99958E] uppercase font-medium">
                  SYSTEM SCOPE
                </div>
                <p className="text-xs text-[#99958E] leading-relaxed font-sans font-light">
                  Active implementations cover REST/GraphQL APIs, real-time WebSockets, binary frame decoding, scheduled database synchronization, native mobile apps, and customized hardware client operations.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ---------------- SELECTED PROJECTS SECTION (CASE STUDIES) ---------------- */}
        <section 
          id="selected-systems-section" 
          ref={workRef}
          className="space-y-16 pt-8 border-t border-white/[0.06]"
        >
          <div className="space-y-2 max-w-3xl">
            <span className="text-xs font-mono tracking-widest text-[#D94A32] uppercase font-medium">MAJOR PROJECTS</span>
            <h2 className="text-3xl sm:text-4xl font-light text-[#F3F1EC] tracking-tight font-sans">
              Selected system case studies
            </h2>
            <p className="text-sm text-[#99958E] font-sans font-light leading-relaxed max-w-2xl">
              Complex products where client views, backend ledger transactions, low-level devices, and background tasks are engineered to run as a single synchronized unit.
            </p>
          </div>

          <div className="space-y-24">
            
            {/* Major Case Study 1: KING5.BET */}
            <div id="case-study-king5" className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start border-b border-white/[0.06] pb-20">
              <div className="xl:col-span-4 space-y-6">
                <div className="space-y-1">
                  <span className="font-serif italic text-4xl text-[#D94A32] block">01</span>
                  <span className="text-[10px] font-mono tracking-wider text-[#99958E]/60 uppercase block">REAL-TIME SPORTS DATA</span>
                  <h3 className="text-2xl font-light text-[#F3F1EC] tracking-tight mt-1">KING5.BET</h3>
                </div>

                <p className="text-sm text-[#99958E] leading-relaxed font-sans font-light">
                  A high-performance gaming ecosystem handling real-time fixture updates, sports provider API normalizations, odds calculations, cashier tickets thermal printer routing, and live financial settlement.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="text-[10px] font-mono tracking-wider text-[#F3F1EC] uppercase font-medium">CONNECTED SURFACES</div>
                  <div className="flex flex-wrap gap-1.5">
                    {["User Web App", "Admin Desk", "Transaction API", "Cashier System", "Thermal Printers"].map((surf) => (
                      <span key={surf} className="text-[10px] bg-white/[0.02] text-[#99958E] py-1 px-2.5 border border-white/[0.06] rounded-none">
                        {surf}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 border-l border-[#D94A32] pl-4 py-1 text-xs text-[#99958E]">
                  <div className="font-semibold text-[#F3F1EC]">Engineering Focus:</div>
                  <p className="font-light leading-relaxed">
                    Provider data normalization, bookmaker prioritization, custom ESCPOS byte buffer construction, and immediate betting slip settlements.
                  </p>
                </div>
              </div>

              <div className="xl:col-span-8">
                {/* Embedded Interactive Topology Map */}
                <King5Diagram />
              </div>
            </div>

            {/* Major Case Study 2: BLIH HR */}
            <div id="case-study-blih-hr" className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start border-b border-white/[0.06] pb-20">
              <div className="xl:col-span-4 space-y-6">
                <div className="space-y-1">
                  <span className="font-serif italic text-4xl text-[#D94A32] block">02</span>
                  <span className="text-[10px] font-mono tracking-wider text-[#99958E]/60 uppercase block">ENTERPRISE ERP & OPERATIONS</span>
                  <h3 className="text-2xl font-light text-[#F3F1EC] tracking-tight mt-1">BLIH HR / LIFECYCLE ERP</h3>
                </div>

                <p className="text-sm text-[#99958E] leading-relaxed font-sans font-light">
                  An enterprise-grade lifecycle and attendance engine. Designed state-driven logs, schedule matching metrics, break verification hooks, and real-time check-in penalty algorithms.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="text-[10px] font-mono tracking-wider text-[#F3F1EC] uppercase font-medium">CONNECTED SURFACES</div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Operations Portal", "Management Client", "Transactional Backend"].map((surf) => (
                      <span key={surf} className="text-[10px] bg-white/[0.02] text-[#99958E] py-1 px-2.5 border border-white/[0.06] rounded-none">
                        {surf}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 border-l border-[#D94A32] pl-4 py-1 text-xs text-[#99958E]">
                  <div className="font-semibold text-[#F3F1EC]">Engineering Focus:</div>
                  <p className="font-light leading-relaxed">
                    Shift scheduling models, time variance analysis, transition audit logs, automated break rules, and payroll pre-calculations.
                  </p>
                </div>
              </div>

              <div className="xl:col-span-8">
                {/* Embedded Interactive State Simulator */}
                <BlihDiagram />
              </div>
            </div>

            {/* Major Case Study 3: RED SEA MART */}
            <div id="case-study-red-sea-mart" className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
              <div className="xl:col-span-4 space-y-6">
                <div className="space-y-1">
                  <span className="font-serif italic text-4xl text-[#D94A32] block">03</span>
                  <span className="text-[10px] font-mono tracking-wider text-[#99958E]/60 uppercase block">LOGISTICS & MOBILE E-COMMERCE</span>
                  <h3 className="text-2xl font-light text-[#F3F1EC] tracking-tight mt-1">RED SEA MART</h3>
                </div>

                <p className="text-sm text-[#99958E] leading-relaxed font-sans font-light">
                  A high-volume consumer retail delivery application connecting native iOS and Android apps directly to inventory database row-locks and real-time back-office routing triggers.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="text-[10px] font-mono tracking-wider text-[#F3F1EC] uppercase font-medium">CONNECTED SURFACES</div>
                  <div className="flex flex-wrap gap-1.5">
                    {["iOS Native App", "Android Native App", "Logistics Portal", "Central SQL Database"].map((surf) => (
                      <span key={surf} className="text-[10px] bg-white/[0.02] text-[#99958E] py-1 px-2.5 border border-white/[0.06] rounded-none">
                        {surf}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 border-l border-[#D94A32] pl-4 py-1 text-xs text-[#99958E]">
                  <div className="font-semibold text-[#F3F1EC]">Engineering Focus:</div>
                  <p className="font-light leading-relaxed">
                    EAS multi-env compile pipelines, optimistic stock reservation via SQL row-locks, APNs/FCM push dispatch broker, and App Store approval procedures.
                  </p>
                </div>
              </div>

              <div className="xl:col-span-8">
                {/* Editorial Diagram of the Synchronisation Loop */}
                <div className="bg-[#131313] border border-white/[0.06] p-8 space-y-8">
                  <div className="flex justify-between items-center border-b border-white/[0.06] pb-4">
                    <span className="text-xs font-mono text-[#F3F1EC] tracking-tight uppercase font-medium">E-COMMERCE SYNCHRONIZATION DIAGRAM</span>
                    <span className="text-[10px] text-[#D94A32] font-mono uppercase font-semibold">Active State Pipeline</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border border-white/[0.06] p-4 bg-[#0D0D0D]/60 space-y-2">
                      <span className="text-[10px] font-mono text-[#99958E]/60 uppercase block">01 // Storefront Reservation</span>
                      <div className="text-[#F3F1EC] font-medium text-xs">Optimistic Row Lock</div>
                      <p className="text-[11px] text-[#99958E] font-light leading-relaxed">
                        Rather than using client-side intervals, the web/mobile checkouts utilize database-level atomic triggers to lock stock limits instantly upon checkout initiation.
                      </p>
                    </div>

                    <div className="border border-white/[0.06] p-4 bg-[#0D0D0D]/60 space-y-2">
                      <span className="text-[10px] font-mono text-[#99958E]/60 uppercase block">02 // Real-time Dispatch Broker</span>
                      <div className="text-[#F3F1EC] font-medium text-xs">WebSocket APNs / FCM</div>
                      <p className="text-[11px] text-[#99958E] font-light leading-relaxed">
                        Transactional status updates are routed to push notification microservices, validating courier location offsets with delivery buffers under 150ms.
                      </p>
                    </div>

                    <div className="border border-white/[0.06] p-4 bg-[#0D0D0D]/60 space-y-2">
                      <span className="text-[10px] font-mono text-[#99958E]/60 uppercase block">03 // Mobile Native Execution</span>
                      <div className="text-[#F3F1EC] font-medium text-xs">Expo EAS Release Bundles</div>
                      <p className="text-[11px] text-[#99958E] font-light leading-relaxed">
                        Custom native code compiled across environments ensuring secure local SQLite transaction caches work offline and sync back when internet resumes.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-[#0D0D0D]/40 text-xs text-[#99958E] leading-relaxed border-l-2 border-[#D94A32] font-light">
                    The synchronization engine couples database consistency rules directly to active mobile clients. Optimized background tasks handle transient connectivity issues in mobile delivery regions without state fragmentation.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ---------------- MAIN SYSTEM INDEX REGISTER (EDITORIAL LIST) ---------------- */}
        <section 
          id="archive-section" 
          className="space-y-12 pt-8 border-t border-white/[0.06]"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-4 gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono tracking-widest text-[#D94A32] uppercase font-medium">COMPLETE CATALOGUE</span>
              <h2 className="text-3xl sm:text-4xl font-light text-[#F3F1EC] tracking-tight font-sans">
                The System Register
              </h2>
              <p className="text-sm text-[#99958E] font-sans font-light leading-relaxed">
                An archival index tracing technical contributions across twenty-seven commercial software systems and operational products.
              </p>
            </div>

            <div className="text-[10px] text-[#99958E] font-mono uppercase bg-white/[0.02] px-3.5 py-1.5 border border-white/[0.06] font-medium tracking-wider">
              RECORDS LOGGED: <span className="text-[#F3F1EC] font-semibold">{PROJECT_ARCHIVE.length}</span>
            </div>
          </div>

          {/* Minimalist Filter Bar */}
          <div className="bg-[#131313] p-4 border border-white/[0.06] space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              {/* Keyword Search */}
              <div className="md:col-span-5 relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#99958E]/60" />
                <input
                  id="archive-search"
                  type="text"
                  placeholder="Filter by system name, role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0D0D0D] border border-white/[0.06] py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-[#D94A32] rounded-none text-[#F3F1EC] placeholder-[#99958E]/30 tracking-tight"
                />
              </div>

              {/* Domain Category */}
              <div className="md:col-span-3 flex items-center gap-2">
                <span className="text-[10px] text-[#99958E] shrink-0 font-mono">DOMAIN:</span>
                <select
                  id="filter-domain"
                  value={selectedDomainFilter}
                  onChange={(e) => setSelectedDomainFilter(e.target.value)}
                  className="w-full bg-[#0D0D0D] border border-white/[0.06] py-2 px-2.5 text-xs focus:outline-none focus:border-[#D94A32] rounded-none text-[#99958E] cursor-pointer font-medium"
                >
                  {allDomains.map((dom) => (
                    <option key={dom} value={dom}>{dom}</option>
                  ))}
                </select>
              </div>

              {/* Precise Contribution Filter */}
              <div className="md:col-span-2 flex items-center gap-2">
                <span className="text-[10px] text-[#99958E] shrink-0 font-mono">ROLE:</span>
                <select
                  id="filter-role"
                  value={selectedRoleFilter}
                  onChange={(e) => setSelectedRoleFilter(e.target.value)}
                  className="w-full bg-[#0D0D0D] border border-white/[0.06] py-2 px-2.5 text-xs focus:outline-none focus:border-[#D94A32] rounded-none text-[#99958E] cursor-pointer font-medium"
                >
                  {allRoles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {/* Sort switch */}
              <div className="md:col-span-2 flex justify-end">
                <button
                  id="toggle-sort"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className="py-2 px-4 bg-[#0D0D0D] border border-white/[0.06] text-[#99958E] font-mono hover:text-[#F3F1EC] hover:border-[#D94A32] transition-colors cursor-pointer text-[10px] tracking-wider w-full md:w-auto text-center uppercase font-medium"
                >
                  DIR: {sortOrder.toUpperCase()}
                </button>
              </div>

            </div>
          </div>

          {/* Large Editorial Project List */}
          <div className="border-t border-white/[0.06] divide-y divide-white/[0.06] bg-[#0D0D0D] relative">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((proj) => {
                const isSelected = hoveredProject?.id === proj.id;
                return (
                  <div 
                    key={proj.id} 
                    onMouseEnter={() => setHoveredProject(proj)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group cursor-pointer transition-colors hover:bg-white/[0.01] px-4"
                  >
                    {/* Index & Name */}
                    <div className="flex items-center gap-6 min-w-0 flex-1">
                      <span className="font-serif italic text-lg text-[#D94A32] opacity-80 w-8 shrink-0">
                        {proj.index}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="text-lg md:text-xl font-light text-[#F3F1EC] group-hover:translate-x-1.5 transition-transform duration-200">
                            {proj.name}
                          </h4>
                          {proj.hasCaseStudy && (
                            <span className="text-[9px] bg-[#D94A32]/10 text-[#D94A32] py-0.5 px-2 border border-[#D94A32]/20 font-mono uppercase tracking-wider">
                              CASE
                            </span>
                          )}
                        </div>
                        {/* Domain & Role indicators */}
                        <div className="flex items-center gap-3 text-xs text-[#99958E] mt-1 font-light">
                          <span className="uppercase tracking-tight text-[11px]">{proj.domain}</span>
                          <span className="text-white/[0.15]">•</span>
                          <span className="uppercase tracking-tight text-[11px] text-[#D94A32]/80 font-medium">{proj.role}</span>
                        </div>
                      </div>
                    </div>

                    {/* Surfaces slide in on hover / reveal info */}
                    <div className="flex items-center gap-4 shrink-0">
                      {/* Desktop hover container */}
                      <div className="hidden lg:block h-6 overflow-hidden">
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ 
                            opacity: isSelected ? 1 : 0, 
                            x: isSelected ? 0 : -10 
                          }}
                          transition={{ duration: 0.15 }}
                          className="text-xs text-[#99958E]/80 tracking-tight flex items-center gap-2"
                        >
                          <span className="font-mono text-[9px] text-[#D94A32]/60 uppercase">SURFACES:</span>
                          <span className="font-light">
                            {proj.surfaces ? proj.surfaces.join(" · ") : "N/A"}
                          </span>
                        </motion.div>
                      </div>

                      {/* Always show on mobile / small screen details */}
                      <div className="lg:hidden text-[11px] text-[#99958E]/70 font-light max-w-[200px] truncate">
                        {proj.surfaces ? proj.surfaces.join(" · ") : "N/A"}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-16 text-center text-[#99958E]/40 text-xs font-light tracking-tight">
                No system register records match the specified query parameters.
              </div>
            )}
          </div>

          {/* Dynamic hover bottom drawer details for tablet/desktop */}
          {hoveredProject && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden lg:block bg-[#131313] border border-white/[0.06] p-5 space-y-3"
            >
              <div className="flex justify-between items-center border-b border-white/[0.06] pb-2">
                <span className="font-medium text-[#F3F1EC] text-sm">{hoveredProject.name}</span>
                <span className="text-xs font-mono text-[#D94A32]/60">PROJECT ARCHIVE RECORD #{hoveredProject.index}</span>
              </div>
              <p className="text-[#99958E] text-xs font-sans font-light leading-relaxed max-w-4xl">
                {hoveredProject.description}
              </p>
              {hoveredProject.technicalSignals && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {hoveredProject.technicalSignals.map((sig, sIdx) => (
                    <span key={sIdx} className="bg-[#0D0D0D] text-[#F3F1EC] border border-white/[0.06] px-2 py-0.5 text-[9px] font-mono tracking-tight">
                      {sig}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}

        </section>

        {/* ---------------- HOW I THINK SECTION ---------------- */}
        <section 
          id="how-i-think-section" 
          className="pt-8 border-t border-white/10"
        >
          <HowIThinkSection />
        </section>

        {/* ---------------- LAB & REVERSE ENGINEERING SECTION ---------------- */}
        <section 
          id="lab-section" 
          ref={labRef}
          className="space-y-8 pt-8 border-t border-white/[0.06]"
        >
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest text-[#D94A32] uppercase font-medium">ENGINEERING LAB</span>
            <h2 className="text-2xl md:text-3xl font-light text-[#F3F1EC] tracking-tight font-sans">
              I wanted to know what was happening under the UI.
            </h2>
            <p className="text-sm text-[#99958E] font-sans font-light leading-relaxed max-w-3xl">
              Reverse engineered the communication structure of a real-time Windows application using decompiled functions, debugger observations, network captures, and custom Python tooling. Built packet parsing, payload analysis, packet encoding, and mock-server scripts for controlled protocol testing.
            </p>
          </div>

          {/* Embedded Custom Protocol Builder / Decoder Diagram */}
          <VisionViewerDiagram />

          {/* Embedded Custom Lab Simulators Tab Panel */}
          <LabSection />
        </section>

        {/* ---------------- PRODUCT SURFACES SECTION ---------------- */}
        <section 
          id="surfaces-section" 
          className="pt-8 border-t border-white/[0.06]"
        >
          <SurfacesSection />
        </section>

        {/* ---------------- GITHUB ACTIVITY SECTION ---------------- */}
        <GitHubActivity />

        {/* ---------------- TECHNICAL STACK SECTION ---------------- */}
        <section 
          id="tech-stack-section" 
          className="space-y-8 pt-8 border-t border-white/[0.06]"
        >
          <div className="space-y-2 max-w-3xl">
            <span className="text-xs font-mono tracking-widest text-[#D94A32] uppercase font-medium">CAPABILITY REGISTER</span>
            <h2 className="text-3xl font-light text-[#F3F1EC] tracking-tight font-sans">Technical stack & specialties</h2>
            <p className="text-sm text-[#99958E] font-sans font-light leading-relaxed">
              Indices mapping production-grade libraries, languages, databases, and deployment platforms I manage daily.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {TECHNICAL_STACK.map((cat, idx) => (
              <div 
                key={idx}
                className="p-6 border border-white/[0.06] bg-[#131313] space-y-4 rounded-none"
              >
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                  <span className="font-semibold text-[#F3F1EC] tracking-tight uppercase text-xs">{cat.title}</span>
                  <span className="text-[#D94A32] font-serif italic text-base">0{idx + 1}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {cat.items.map((tech) => (
                    <div 
                      key={tech} 
                      className="p-2 bg-[#0D0D0D] border border-white/[0.06] flex items-center gap-2 truncate"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D94A32]/40 shrink-0" />
                      <span className="text-[#99958E] truncate text-[10px] font-mono lowercase">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- ABOUT SECTION ---------------- */}
        <section 
          id="about-section" 
          ref={aboutRef}
          className="pt-8 border-t border-white/[0.06] grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
        >
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono tracking-widest text-[#D94A32] uppercase font-medium block">THE ENGINEER UNDERNEATH</span>
            <h2 className="text-3xl font-light text-[#F3F1EC] tracking-tight font-sans leading-none">
              Mikeyas Derje
            </h2>
            <p className="text-[#99958E] text-xs font-light">
              Full Stack Software Engineer · Based in Addis Ababa, Ethiopia
            </p>

            <div className="bg-[#131313] p-6 border border-white/[0.06] space-y-3 rounded-none">
              <div className="text-[10px] font-mono text-[#D94A32] uppercase tracking-wider font-semibold">CORE MOTIVATION</div>
              <p className="italic font-serif text-sm text-[#F3F1EC] leading-relaxed">
                “I did not plan to become a 'systems engineer'. I just kept asking one more question. When something does not make sense, I keep going until it does.”
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-sm text-[#99958E] leading-relaxed font-sans font-light">
            <p>
              I started heavily on frontend work, building responsive user interfaces. However, frontend questions kept turning into backend questions.
            </p>
            
            <div className="py-2 pl-4 border-l border-white/[0.06] space-y-1.5 font-mono text-[11px] text-[#D94A32]/80 uppercase">
              <div>• Where does this data actually come from?</div>
              <div>• Who is permitted to mutate this object and when?</div>
              <div>• What happens if this worker executes twice?</div>
              <div>• How does the mobile client stay in sync offline?</div>
              <div>• Why is this packet structured with an eight-byte offset?</div>
            </div>

            <p>
              That curiosity pushed me down the stack into building backend engines, complex database scheduling, mobile applications, reverse engineering, and low-level communications protocol analysis.
            </p>
            <p>
              Today, I focus on turning complex, real-world business mechanics into clean, durable, production-grade applications that operate seamlessly from databases up to end-user displays.
            </p>
          </div>
        </section>

        {/* ---------------- CONTACT SECTION ---------------- */}
        <section 
          id="contact-section" 
          ref={contactRef}
          className="pt-12 border-t border-white/[0.06]"
        >
          <div className="bg-[#131313] border border-white/[0.06] text-[#F3F1EC] p-8 sm:p-12 relative overflow-hidden rounded-none">
            
            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="text-xs font-mono tracking-widest text-[#D94A32] uppercase font-medium block">COMMENCE INTEROP CONNECTION</span>
              
              <h2 className="text-3xl sm:text-5xl font-light text-[#F3F1EC] tracking-tight leading-tight font-sans">
                Have a system that is 
                <span className="block font-serif italic text-[#D94A32] font-normal mt-2 leading-none">
                  getting complicated?
                </span>
              </h2>

              <p className="text-sm text-[#99958E] leading-relaxed max-w-2xl font-sans font-light">
                That is usually where I become interested. If you need a complete product built, an unexposed protocol integrated, an ERP schedule calculated, or transaction pipelines debugged, let's open a connection.
              </p>

              {/* Direct clickable triggers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs font-medium">
                
                <a 
                  id="contact-email"
                  href="mailto:codemk1218@gmail.com"
                  className="p-5 border border-white/[0.06] hover:border-[#D94A32] bg-[#0D0D0D] flex items-center justify-between transition-colors rounded-none"
                >
                  <div>
                    <div className="text-[#99958E] text-[9px] font-mono uppercase tracking-wider font-light">SEND EMAIL</div>
                    <div className="text-[#F3F1EC] font-semibold mt-1 text-sm">codemk1218@gmail.com</div>
                  </div>
                  <Mail className="w-4 h-4 text-[#99958E]/60 group-hover:text-[#D94A32] transition-colors" />
                </a>

                <a 
                  id="contact-phone"
                  href="tel:+251933894492"
                  className="p-5 border border-white/[0.06] hover:border-[#D94A32] bg-[#0D0D0D] flex items-center justify-between transition-colors rounded-none"
                >
                  <div>
                    <div className="text-[#99958E] text-[9px] font-mono uppercase tracking-wider font-light">CALL / TELEPHONE</div>
                    <div className="text-[#F3F1EC] font-semibold mt-1 text-sm">+251 933 894 492</div>
                  </div>
                  <Phone className="w-4 h-4 text-[#99958E]/60 group-hover:text-[#D94A32] transition-colors" />
                </a>

              </div>

              {/* External Metadata info */}
              <div className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] text-[#99958E]/50 border-t border-white/[0.06] gap-2.5 font-mono">
                <span>PORTFOLIO RECORD KEY: mk-eng-sys-v2</span>
                <span className="uppercase text-[#D94A32] font-semibold">Available for remote & high-value full-time roles</span>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* ---------------- FOOTER SIGNATURE ---------------- */}
      <footer className="border-t border-white/[0.06] bg-[#0D0D0D] py-12 text-xs text-[#99958E] mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-semibold text-[#F3F1EC] tracking-tight">Mikeyas Derje</div>
            <div className="text-[#99958E]/60 font-light text-[11px]">Full Stack Software Engineer · Addis Ababa, Ethiopia</div>
          </div>
          <div className="flex gap-8 text-[#99958E]/60 font-medium">
            <a href="mailto:codemk1218@gmail.com" className="hover:text-[#D94A32] transition-colors">Email</a>
            <a href="tel:+251933894492" className="hover:text-[#D94A32] transition-colors">Phone</a>
            <a href="https://github.com/mkcoder1218" target="_blank" rel="noreferrer" className="hover:text-[#D94A32] transition-colors">GitHub</a>
          </div>
          <div className="text-center sm:text-right text-[#99958E]/40 font-mono text-[10px]">
            © {new Date().getFullYear()} MIKEYAS DERJE. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>

    </div>
  );
}
