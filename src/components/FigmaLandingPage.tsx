"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import BookingModal from "./BookingModal";
import {
  StarBold,
  PlayBold,
  ArrowRightUpLinear,
  ArrowRightLinear,
  ArrowLeftLinear,
  ArrowDownLinear,
  ChatRoundLineBold,
  PhoneCallingRoundedBold,
  PhoneLinear,
  CupFirstBold,
  FootballBold,
  Flag2Bold,
  GlobalLinear,
  LetterLinear,
  ShareCircleBold,
  MapPointLinear,
  SettingsMinimalisticBold,
  CheckCircleBold,
} from "solar-icon-set";

// Image assets
const imgScreenshotTrent = "/figma-assets/0573e1610acc04d2a77892cad5e7a1f95c3b3f3c.png";
const imgCustomer1 = "/figma-assets/50da95228a4e513b009a7f1fbafaeb06d14ecf97.png";
const imgCustomer2 = "/figma-assets/4453f3ca3abaf00b1c9e59cc794c0019c123bd94.png";
const imgTailored1 = "/figma-assets/65996b591ed76bc6e72db6163e4245de3ccc4a8e.png";
const imgTailored2 = "/figma-assets/9652a0014c30d49b58e59e86a06a506a20a2e72d.png";
const imgTailored3 = "/figma-assets/e7f665e16744685b00a596e5779c82420903d545.png";
const imgProject1 = "/figma-assets/eb2e709a1a5ae0cf1d3bd65e4e4699f30e56f4f8.png";
const imgProject2 = "/figma-assets/e8673f8af14f522eb6198e1b9bd6d8dba40f82b0.png";
const imgProject3 = "/figma-assets/93caa1d33b02c86db956c75d0a8d2c7772d2b87e.png";
const imgProject4 = "/figma-assets/4268bce76e9db0ef2359999a96174eaef545722a.png";
const imgProject5 = "/figma-assets/20df6e8fd68522e5e6d9b25d235d46fed125f1cf.png";
const imgProject6 = "/figma-assets/2b8e3409c49ddfa732be6099fda6129dbb7b33b9.png";
const imgPolygon3 = "/figma-assets/6e9c39745ead91c4fc1dbbe0e9335014893590a9.svg";
const imgMarquee1 = "/figma-assets/8437160b4b6a00dc1fbea76b1fddac14cdc95176.svg";
const imgMarquee2 = "/figma-assets/be3bb842d7fde34a30f7c2ca97ba27670096976f.svg";
const imgMarquee3 = "/figma-assets/3cd536807d623690b4d43416cedc7af59b056e82.svg";
const imgMarquee4 = "/figma-assets/b73eae2796ac6e5d4fa710260d013bb4ad561113.svg";

// Official LinkedIn Vector Icon
const LinkedInIcon = ({ className = "size-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

// Smooth count-up animated number on scroll into view
function AnimatedCounter({
  target,
  duration = 1600,
  prefix = "",
}: {
  target: number;
  duration?: number;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;

          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quart for a crisp and natural deceleration
            const easeOut = 1 - Math.pow(1 - progress, 4);
            setCount(Math.round(easeOut * target));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.25 }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) observer.unobserve(currentEl);
    };
  }, [target, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {prefix}{count}
    </span>
  );
}

// Equipment Categories (retained specifically in this section)
const EQUIPMENT_CATEGORIES_LIST = [
  {
    num: "01",
    name: "Wicket Cylinder Mowers",
    description: "11-blade high-frequency cutting reels for 3mm–6mm couchgrass wicket tables.",
    count: "2 Models",
    image: "/images/machinery/cricket-wicket-mower.jpg",
    href: "/machinery?category=Wicket+Cylinder+Mowers",
  },
  {
    num: "02",
    name: "Outfield & Surrounds",
    description: "Heavy-duty commercial rotary and reel mowers for wide-area coverage & match-day striping.",
    count: "2 Models",
    image: "/images/machinery/cricket-outfield-mower.jpg",
    href: "/machinery?category=Outfield+%26+Surrounds+Mowers",
  },
  {
    num: "03",
    name: "Scarifiers & Renovators",
    description: "Laser-cut tungsten verticutting reels for organic thatch removal and seasonal renovation.",
    count: "2 Models",
    image: "/images/machinery/cricket-turf-scarifier.jpg",
    href: "/machinery?category=Scarifiers+%26+Renovators",
  },
  {
    num: "04",
    name: "Rollers & Diagnostic Tools",
    description: "Precision dual-drum split rollers, Clegg Impact Hammer and diagnostic soil test kits.",
    count: "2 Models",
    image: "/images/machinery/cricket-pitch-roller.jpg",
    href: "/machinery?category=Rollers+%26+Pitch+Tools",
  },
];

// Featured Pieces (retained specifically in this section)
const FEATURED_PIECES = [
  {
    id: "mc22-wicket-cylinder",
    title: "MC22 Pro Wicket Cylinder",
    badge: "WICKET CYLINDER",
    spec: "11-blade reel, micro-metric 2mm–18mm cut",
    tag: "First-Class Standard",
    image: "/images/machinery/cricket-wicket-mower.jpg",
    slug: "mc22-pro-wicket-cylinder-mower",
  },
  {
    id: "sc18-turf-scarifier",
    title: "SC18 Pro Turf Scarifier",
    badge: "TURF SCARIFIER",
    spec: "Tungsten-carbide verticutter, thatch control",
    tag: "Thatch Control",
    image: "/images/machinery/cricket-turf-scarifier.jpg",
    slug: "sc18-pro-turf-scarifier-verticutter",
  },
  {
    id: "wr-pitch-roller",
    title: "WR Heavy Compaction Roller",
    badge: "PITCH ROLLER",
    spec: "Dual-drum hydrostatic drive, beveled edges",
    tag: "Clay Compaction",
    image: "/images/machinery/cricket-pitch-roller.jpg",
    slug: "wr-heavy-hydrostatic-pitch-roller",
  },
  {
    id: "gm30-outfield-master",
    title: "GM30 Outfield Striping Master",
    badge: "OUTFIELD REEL",
    spec: "Heavy-wall rear roller, 8-blade cylinder",
    tag: "Stadium Striping",
    image: "/images/machinery/cricket-outfield-mower.jpg",
    slug: "gm30-outfield-boundary-reel-mower",
  },
  {
    id: "clegg-diagnostic-kit",
    title: "Clegg Impact & Diagnostic Suite",
    badge: "SOIL DIAGNOSTICS",
    spec: "Clegg Impact tester, dual TDR moisture probe",
    tag: "Agronomic Lab",
    image: "/images/machinery/cricket-clegg-hammer.jpg",
    slug: "tk-pitch-diagnostic-clegg-hammer-suite",
  },
  {
    id: "mc26-table-cylinder",
    title: "MC26 Wide-Cut Table Cylinder",
    badge: "TABLE CYLINDER",
    spec: "26\" wide swath, 10-blade fine turf cylinder",
    tag: "Multi-Pitch Prep",
    image: "/images/machinery/cricket-wicket-mower.jpg",
    slug: "mc26-wide-table-cylinder-mower",
  },
];

// Tailored Solutions data for expanding accordion hover
const TAILORED_SOLUTIONS = [
  {
    num: "01",
    title: "Tournament Consulting",
    description: "On-site preparation and surface management for global boards, franchises, and multi-week match windows.",
    cta: "BOOK CONSULTING",
    image: imgTailored1,
    href: "#contact",
  },
  {
    num: "02",
    title: "Drop-In Calibrations",
    description: "Clegg Impact Value (CIV) testing, soil bulk density, and moisture gradient calibration.",
    cta: "BOOK CALIBRATION",
    image: imgTailored2,
    href: "#contact",
  },
  {
    num: "03",
    title: "Wicket Construction",
    description: "Laser leveling, rootzone profiling, and seasonal wicket revitalization for clubs and schools.",
    cta: "DISCUSS RENOVATION",
    image: imgTailored3,
    href: "#contact",
  },
];

export default function FigmaLandingPage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeSolution, setActiveSolution] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVideoModalOpen(false);
      }
    };
    if (isVideoModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoModalOpen]);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const firstCard = container.querySelector<HTMLElement>(":scope > div");
      const cardWidth = firstCard ? firstCard.offsetWidth : 300;
      const scrollStep = cardWidth + 24; // Card width + gap-6
      container.scrollBy({
        left: direction === "left" ? -scrollStep : scrollStep,
        behavior: "smooth",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <div className="bg-[#f4f4f5] flex flex-col items-center relative w-full min-h-screen selection:bg-[#ffdc50] selection:text-black overflow-x-hidden font-sans">
      
      {/* =========================================================================
          1. HERO SECTION (Fullscreen, Video, Reduced Text, 2 Custom CTA Buttons)
         ========================================================================= */}
      <section
        id="home"
        className="relative w-full h-screen min-h-[640px] flex flex-col justify-between overflow-hidden bg-black"
      >
        {/* Fullscreen Background Video & Crisp Overlay */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-95"
            src="/sequence-01.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/50" />
        </div>

        {/* Transparent Clean Navbar (No Container Fill or Stroke) */}
        <header className="relative z-30 pt-6 sm:pt-8 px-6 sm:px-10 lg:px-14 xl:px-20 w-full">
          <div className="w-full flex items-center justify-between py-2">
            
            {/* Brand Logo */}
            <a href="#home" className="flex items-center gap-3 group">
              <div className="size-9 rounded-full bg-[#f8dc6c] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                <img alt="Fleet symbol" className="size-5" src={imgPolygon3} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base sm:text-lg text-white uppercase tracking-tight leading-none">
                  Trent Kelly
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#f8dc6c] uppercase">
                  Turf Agronomy
                </span>
              </div>
            </a>

            {/* David UI Nav Links */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <a
                href="#specialist"
                className="text-xs lg:text-sm font-medium text-zinc-300 hover:text-[#ffdc50] transition-colors"
              >
                The Specialist
              </a>
              <a
                href="#solutions"
                className="text-xs lg:text-sm font-medium text-zinc-300 hover:text-[#ffdc50] transition-colors"
              >
                Solutions
              </a>
              <a
                href="#categories"
                className="text-xs lg:text-sm font-medium text-zinc-300 hover:text-[#ffdc50] transition-colors"
              >
                Equipment
              </a>
              <a
                href="#projects"
                className="text-xs lg:text-sm font-medium text-zinc-300 hover:text-[#ffdc50] transition-colors"
              >
                Surfaces
              </a>
              <a
                href="#contact"
                className="text-xs lg:text-sm font-medium text-zinc-300 hover:text-[#ffdc50] transition-colors"
              >
                Contact
              </a>
            </nav>

            {/* Action Button: Direct Contact / Book a Call (Figma Glassmorphism + Available Indicator) */}
            <button
              type="button"
              onClick={() => setIsBookingModalOpen(true)}
              className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-semibold text-xs sm:text-sm pl-2 pr-4 py-1.5 sm:py-2 rounded-xl transition-all duration-200 active:scale-95 shadow-sm group cursor-pointer"
            >
              {/* Larger Avatar with Green Available Indicator */}
              <div className="relative size-8 sm:size-9 rounded-full shrink-0">
                <img
                  src={imgScreenshotTrent}
                  alt="Trent Kelly"
                  className="size-full rounded-full object-cover border border-white/20 group-hover:scale-105 transition-transform duration-200"
                />
                {/* Available Status Dot */}
                <span className="absolute -bottom-0.5 -right-0.5 size-2.5 sm:size-3 rounded-full bg-[#b6e400] border-2 border-black/80 shadow-sm" />
              </div>
              <span className="tracking-tight text-white group-hover:text-[#ffdc50] transition-colors">
                Book a call
              </span>
            </button>
          </div>
        </header>

        {/* Center Hero Content (Shifted Down Towards Bottom) */}
        <div className="relative z-20 px-6 sm:px-10 lg:px-14 xl:px-20 w-full mt-auto mb-6 sm:mb-8 lg:mb-12 flex flex-col items-start justify-end">
          
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#ffdc50] text-xs font-semibold uppercase tracking-wider mb-5 shadow-sm">
            <span className="size-2 rounded-full bg-[#f8dc6c] animate-pulse" />
            <span>South Australia Cricket Turf Specialist &amp; Master Agronomist</span>
          </div>

          {/* Massive, Punchy Title */}
          <h1 className="font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[96px] text-white tracking-tight uppercase leading-[0.92]">
            The Science <br />
            <span className="text-[#ffdc50]">Beneath 22 Yards</span>
          </h1>

          {/* Hero 2 CTA Buttons as requested by User */}
          <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
            {/* Button 1: Play Video (Opens full video modal with audio) */}
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(true)}
              className="inline-flex items-center gap-2.5 bg-[#f8dc6c] hover:bg-[#ffdc50] text-black font-semibold text-xs sm:text-sm md:text-base px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 group cursor-pointer"
            >
              <PlayBold size={18} className="text-black group-hover:scale-110 transition-transform" />
              <span>Play Video</span>
            </button>

            {/* Button 2: Connect on LinkedIn with official LinkedIn logo */}
            <a
              href="https://www.linkedin.com/in/trent-kelly-18b52044/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-semibold text-xs sm:text-sm md:text-base px-5 sm:px-6 py-3.5 rounded-xl transition-all duration-200 active:scale-95 shadow-lg group cursor-pointer"
            >
              <span className="size-5 rounded bg-[#0a66c2] text-white flex items-center justify-center p-0.5 shrink-0 group-hover:scale-105 transition-transform">
                <LinkedInIcon className="size-full text-white" />
              </span>
              <span>Connect on LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Bottom Hero Trust Row */}
        <div className="relative z-20 pb-6 sm:pb-8 px-6 sm:px-10 lg:px-14 xl:px-20 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 pt-5">
          {/* Customer Trust Proof */}
          <div className="flex items-center gap-3">
            <div className="backdrop-blur-md bg-black/40 flex items-center p-1 rounded-full border border-white/15">
              <img
                alt="Client"
                className="size-8 sm:size-9 rounded-full object-cover border border-white/30"
                src={imgCustomer1}
              />
              <img
                alt="Client"
                className="size-8 sm:size-9 rounded-full object-cover -ml-2.5 border border-white/30"
                src={imgCustomer2}
              />
            </div>
            <div className="flex flex-col text-white text-xs sm:text-sm">
              <p className="font-medium">
                Trusted by <strong className="font-bold text-[#ffdc50]">2,000+</strong> venues worldwide
              </p>
              <div className="flex items-center gap-1 text-zinc-300 text-xs">
                <StarBold size={13} className="text-[#ffdc50]" />
                <span>Rated 4.9 / 5.0 for surface bounce &amp; consistency</span>
              </div>
            </div>
          </div>

          {/* Scroll Down Indicator with Icon */}
          <a
            href="#specialist"
            className="hidden sm:inline-flex items-center gap-2.5 text-xs font-medium text-zinc-300 hover:text-white transition-colors group cursor-pointer"
          >
            <span>Scroll to discover</span>
            <div className="size-6 rounded-full border border-white/20 bg-white/5 flex items-center justify-center group-hover:border-[#ffdc50] transition-colors">
              <ArrowDownLinear size={13} className="text-[#f8dc6c] group-hover:translate-y-0.5 transition-transform" />
            </div>
          </a>
        </div>
      </section>

      {/* =========================================================================
          2. MARQUEE PARTNER TICKER (Minimalist White Bar, Subtle Border)
         ========================================================================= */}
      <section className="bg-white flex h-24 items-center justify-center overflow-hidden py-6 relative w-full border-b border-zinc-200/60">
        <div className="w-full overflow-hidden opacity-30 hover:opacity-70 transition duration-300">
          <div className="animate-marquee flex items-center gap-12 sm:gap-16">
            {[...Array(8)].map((_, i) => (
              <React.Fragment key={i}>
                <div className="flex h-10 items-center justify-center shrink-0 w-36">
                  <img alt="Partner emblem" className="h-5 w-auto max-w-[90px] object-contain" src={imgMarquee1} />
                </div>
                <div className="flex h-10 items-center justify-center shrink-0 w-36">
                  <img alt="Partner emblem" className="h-6 w-auto max-w-[85px] object-contain" src={imgMarquee2} />
                </div>
                <div className="flex h-10 items-center justify-center shrink-0 w-36">
                  <img alt="Partner emblem" className="h-5 w-auto max-w-[79px] object-contain" src={imgMarquee3} />
                </div>
                <div className="flex h-10 items-center justify-center shrink-0 w-36">
                  <img alt="Partner emblem" className="h-5 w-auto max-w-[66px] object-contain" src={imgMarquee4} />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. STATS SECTION (No Container Fill / Stroke - Pure Clean Minimalist)
         ========================================================================= */}
      <section className="py-10 sm:py-14 px-6 sm:px-10 lg:px-14 xl:px-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Stat 1 */}
          <div className="flex flex-col justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#71717a]">
              PITCH VOLUME
            </span>
            <div className="my-2.5 font-extrabold text-5xl sm:text-6xl text-black tracking-tight flex items-baseline">
              <span className="font-bold mr-0.5 text-black">+</span>
              <AnimatedCounter target={100} duration={1600} />
            </div>
            <p className="font-medium text-sm text-[#52525b] leading-relaxed">
              Championship &amp; First-Class pitch tables prepared across the globe.
            </p>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#71717a]">
              IMPACT HARMONICS
            </span>
            <div className="my-2.5 font-extrabold text-5xl sm:text-6xl text-black tracking-tight flex items-baseline">
              <AnimatedCounter target={300} duration={1600} />
              <span className="font-normal text-3xl sm:text-4xl text-[#71717a] ml-2">CIV</span>
            </div>
            <p className="font-medium text-sm text-[#52525b] leading-relaxed">
              Target Clegg Hammer Impact Value calibrated for true and consistent bounce.
            </p>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#71717a]">
              GEOGRAPHIC SCOPE
            </span>
            <div className="my-2.5 font-extrabold text-5xl sm:text-6xl text-black tracking-tight">
              Global
            </div>
            <p className="font-medium text-sm text-[#52525b] leading-relaxed">
              Active tournament deployments across Australia, the USA, and premier leagues.
            </p>
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. THE SPECIALIST ("Hi, I'm Trent" - Fluid Responsive Grid, Unified Borders)
         ========================================================================= */}
      <section id="specialist" className="py-12 sm:py-16 px-6 sm:px-10 lg:px-14 xl:px-20 w-full">
        <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-12 card-soft-shadow border border-zinc-200/60 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch overflow-hidden">
          
          {/* Left Column: Trent's Portrait Image (Clean rounded fit, completely contained inside card) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-xl overflow-hidden w-full h-[380px] sm:h-[460px] lg:h-full min-h-[380px] shadow-[0_16px_36px_-10px_rgba(0,0,0,0.06)] group">
              <img
                alt="Trent Kelly - Turf Specialist"
                className="w-full h-full object-cover object-top group-hover:scale-102 transition duration-500"
                src={imgScreenshotTrent}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#ffdc50] block mb-1">
                  Founder &amp; Principal Agronomist
                </span>
                <p className="font-bold text-xl">
                  Trent Kelly
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 border border-zinc-200/60 text-xs font-semibold uppercase tracking-wider w-fit">
                <span className="size-1.5 rounded-full bg-[#f8dc6c]" />
                The Specialist
              </span>
              <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-black tracking-tight mt-1">
                Hi, I’m Trent.
              </h2>
            </div>

            <div className="text-sm sm:text-base leading-relaxed text-[#27272a] space-y-4">
              <p>
                For over 15 years, my work has lived at the intersection of geotechnical soil science and high-stakes tournament preparation.
              </p>
              <p>
                Whether I’m curating championship match surfaces across Australia, calibrating drop-in wickets under 40°C heat in the United States, or helping a South Australian council restore a worn community oval—my standard never changes.
              </p>
              <p>
                Through TK Turf Services, my goal is simple: bring world-class curatorial precision, geotechnical soil insight, and uncompromised playability to every venue I step onto.
              </p>
            </div>

            {/* Credentials Info (No Container Fill / Stroke) */}
            <div className="pt-1">
              <p className="font-bold text-black text-sm sm:text-base">
                Trent Kelly
              </p>
              <p className="italic text-xs sm:text-sm text-[#52525b] mt-0.5">
                Director, TK Turf Services • Mentored by Les Burdett OAM (Legendary Adelaide Oval Curator)
              </p>
              <a
                href="#solutions"
                className="font-semibold text-xs sm:text-sm text-[#b45309] hover:underline inline-flex items-center gap-1.5 mt-2 group"
              >
                <span>First-Class Pitch Curation &amp; Drop-In Wicket Engineering</span>
                <ArrowRightLinear size={14} className="text-[#b45309] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* 3 Philosophy Cards with Unified Soft Borders */}
            <div className="flex flex-col gap-3 pt-2">
              <h3 className="font-semibold text-lg text-black tracking-tight">
                Curatorial Philosophy
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {/* Philosophy 1 */}
                <div className="bg-[#f8f8f8] hover:bg-white transition-all duration-200 p-4 sm:p-5 rounded-xl flex flex-col justify-between min-h-[140px] border border-zinc-200/40 hover:border-zinc-200/80 hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.035)] group">
                  <div className="size-8 relative mb-3">
                    <FootballBold size={28} className="text-[#f8dc6c] group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="font-semibold text-xs sm:text-sm text-black leading-snug">
                    A player’s eye, backed by soil science
                  </p>
                </div>

                {/* Philosophy 2 */}
                <div className="bg-[#f8f8f8] hover:bg-white transition-all duration-200 p-4 sm:p-5 rounded-xl flex flex-col justify-between min-h-[140px] border border-zinc-200/40 hover:border-zinc-200/80 hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.035)] group">
                  <div className="size-8 relative mb-3">
                    <CupFirstBold size={28} className="text-[#f8dc6c] group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="font-semibold text-xs sm:text-sm text-black leading-snug">
                    Trained by legends, trusted worldwide
                  </p>
                </div>

                {/* Philosophy 3 */}
                <div className="bg-[#f8f8f8] hover:bg-white transition-all duration-200 p-4 sm:p-5 rounded-xl flex flex-col justify-between min-h-[140px] border border-zinc-200/40 hover:border-zinc-200/80 hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.035)] group">
                  <div className="size-8 relative mb-3">
                    <Flag2Bold size={28} className="text-[#f8dc6c] group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="font-semibold text-xs sm:text-sm text-black leading-snug">
                    Stadium quality for every cricket pitch
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          5. TAILORED PITCH SOLUTIONS (Consulting Services)
         ========================================================================= */}
      <section id="solutions" className="py-12 sm:py-16 px-6 sm:px-10 lg:px-14 xl:px-20 w-full">
        <div className="flex flex-col gap-8">
          
          {/* Section Header */}
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 border border-zinc-200/60 text-xs font-semibold uppercase tracking-wider w-fit">
              <span className="size-1.5 rounded-full bg-[#f8dc6c]" />
              Tailored Solutions
            </span>
            <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-black tracking-tight mt-1">
              Tailored Pitch Solutions
            </h2>
            <p className="text-sm sm:text-base text-[#52525b] max-w-2xl">
              Complete turf engineering solutions from world-stage tournaments to local community grounds.
            </p>
          </div>

          {/* Solution Cards (Interactive Expanding Accordion on Hover) */}
          <div
            className="flex flex-col lg:flex-row gap-5 w-full"
            onMouseLeave={() => setActiveSolution(0)}
          >
            {TAILORED_SOLUTIONS.map((sol, index) => {
              const isActive = activeSolution === index;
              return (
                <div
                  key={sol.num}
                  onMouseEnter={() => setActiveSolution(index)}
                  onClick={() => setActiveSolution(index)}
                  className="relative rounded-2xl overflow-hidden card-soft-shadow group border border-zinc-200/40 cursor-pointer h-[420px] sm:h-[460px] lg:h-[500px]"
                  style={{
                    flex: isActive ? 2.4 : 1,
                    transition: "flex 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {/* Background Image */}
                  <img
                    alt={sol.title}
                    className="absolute inset-0 size-full object-cover group-hover:scale-105 transition duration-700"
                    src={sol.image}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
                  
                  {/* Content Container */}
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white">
                    {/* Index Badge */}
                    <span className="backdrop-blur-md bg-black/40 px-3.5 py-1.5 rounded-xl text-xs font-mono border border-white/15 w-fit">
                      {sol.num}
                    </span>
                    
                    {/* Bottom Info & Button */}
                    <div className="flex flex-col gap-3 max-w-[500px]">
                      <h3 className={`font-bold text-white transition-all duration-300 ${isActive ? "text-2xl sm:text-3xl" : "text-xl"}`}>
                        {sol.title}
                      </h3>
                      <p className={`text-zinc-200 leading-relaxed transition-all duration-300 ${isActive ? "text-xs sm:text-sm max-w-[440px]" : "text-xs line-clamp-2 max-w-[280px]"}`}>
                        {sol.description}
                      </p>
                      
                      {/* Button (Reveals with smooth fade-in and slide when active) */}
                      <div className={`transition-all duration-400 ease-out ${isActive ? "opacity-100 max-h-16 pt-1 translate-y-0" : "opacity-0 max-h-0 pointer-events-none translate-y-2 overflow-hidden"}`}>
                        <a
                          href={sol.href}
                          className="backdrop-blur-md bg-white/20 hover:bg-[#ffdc50] hover:text-black border border-white/25 text-white font-semibold text-xs tracking-wider uppercase px-5 py-3 rounded-xl flex items-center gap-2 w-fit transition-all active:scale-95 group/btn"
                        >
                          <span>{sol.cta}</span>
                          <ArrowRightLinear size={16} className="group-hover/btn:translate-x-1 transition" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. EQUIPMENT CATEGORIES (Dedicated Section for Equipment, Soft Dividers)
         ========================================================================= */}
      <section id="categories" className="py-12 sm:py-16 px-6 sm:px-10 lg:px-14 xl:px-20 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-200/60">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#71717a] block mb-2">
              THE EQUIPMENT FLEET · 04 CORE CATEGORIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#121212] tracking-tight leading-tight">
              A collection of considered essentials.
            </h2>
            <p className="text-sm sm:text-base text-[#52525b] mt-3 leading-relaxed">
              Discover precision turf machinery and diagnostic instruments engineered to respect the clay beneath. Clean cuts, surgical verticutting, and scientific soil calibration across every strip.
            </p>
          </div>

          <Link
            href="/machinery"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all active:scale-95 shadow-sm shrink-0 self-start md:self-end group"
          >
            <span className="size-1.5 rounded-full bg-[#f8dc6c]" />
            <span>View All Equipment</span>
            <ArrowRightLinear size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Categories Row List (Unified Soft Dividers) */}
        <div className="flex flex-col divide-y divide-zinc-200/60">
          {EQUIPMENT_CATEGORIES_LIST.map((cat) => (
            <Link
              key={cat.num}
              href={cat.href}
              className="py-6 sm:py-7 flex flex-col md:flex-row md:items-center justify-between gap-5 group hover:bg-white/60 px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-2xl transition-all duration-200"
            >
              {/* Left: Index & Title */}
              <div className="flex items-start sm:items-center gap-5 sm:gap-8 min-w-[280px] lg:min-w-[340px]">
                <span className="text-xs sm:text-sm font-mono text-[#71717a] group-hover:text-black transition-colors font-medium">
                  {cat.num}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#121212] group-hover:text-black tracking-tight">
                  {cat.name}
                </h3>
              </div>

              {/* Middle: Short Description */}
              <p className="text-xs sm:text-sm text-[#71717a] max-w-xl leading-relaxed">
                {cat.description}
              </p>

              {/* Right: Small Image Thumbnail + Action */}
              <div className="flex items-center gap-4 self-end md:self-auto shrink-0">
                <div className="size-14 sm:size-16 rounded-xl overflow-hidden bg-zinc-100 shrink-0">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="size-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#121212] group-hover:text-black">
                  <span>{cat.count}</span>
                  <ArrowRightLinear size={16} className="text-[#f8dc6c] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          7. FEATURED PIECES (Tervyra Architecture: Inset Cards, Clean Nav, No Cutoffs)
         ========================================================================= */}
      <section id="machinery" className="py-12 sm:py-16 px-6 sm:px-10 lg:px-14 xl:px-20 w-full">
        {/* Section Header with Left/Right Arrows & Tervyra Sub-Label */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-zinc-200/60">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#71717a] block mb-1">
              CURATED SELECTION
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#121212] tracking-tight">
              Featured pieces
            </h3>
          </div>

          {/* Navigation Arrows & Right-aligned Subtitle */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-xs font-mono text-zinc-500">
              Commercial B2B Specification · Turf &amp; Pitch Prep
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCarousel("left")}
                className="size-10 sm:size-11 rounded-full border border-zinc-200/70 bg-white hover:bg-zinc-100 flex items-center justify-center transition-all active:scale-95 shadow-sm group cursor-pointer"
                aria-label="Previous equipment"
              >
                <ArrowLeftLinear size={18} className="text-zinc-800 group-hover:text-black transition-colors" />
              </button>
              <button
                onClick={() => scrollCarousel("right")}
                className="size-10 sm:size-11 rounded-full border border-zinc-200/70 bg-white hover:bg-zinc-100 flex items-center justify-center transition-all active:scale-95 shadow-sm group cursor-pointer"
                aria-label="Next equipment"
              >
                <ArrowRightLinear size={18} className="text-zinc-800 group-hover:text-black transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container (4 Items Fit Perfectly on Desktop with 0 Cutoff) */}
        <div
          ref={carouselRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 pb-4 scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {FEATURED_PIECES.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-3.5 sm:p-4 pb-5 border border-zinc-200/60 card-soft-shadow hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shrink-0 w-[280px] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] snap-start group"
            >
              <div>
                {/* Image Container with Floating Category Badge (Tervyra Style) */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#f4f4f5] mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Floating category pill badge top-left */}
                  <div className="absolute top-3.5 left-3.5 backdrop-blur-md bg-white/95 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <span className="size-1.5 rounded-full bg-[#f8dc6c]" />
                    <span className="text-[10px] font-mono tracking-widest text-[#121212] uppercase font-bold">
                      {item.badge}
                    </span>
                  </div>
                </div>

                {/* Title & Specs */}
                <div className="px-1">
                  <Link href={`/machinery/${item.slug}`} className="block">
                    <h4 className="font-bold text-base sm:text-lg text-[#121212] group-hover:text-black transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                  </Link>
                  <p className="text-xs sm:text-sm text-[#71717a] mt-1.5 leading-relaxed line-clamp-1">
                    {item.spec}
                  </p>
                </div>
              </div>

              {/* Bottom Row (Tag Left, • See more with right arrow) */}
              <div className="mt-4 pt-3.5 border-t border-zinc-100 flex items-center justify-between px-1">
                <span className="text-xs sm:text-sm font-semibold text-[#121212]">
                  {item.tag}
                </span>
                <Link
                  href={`/machinery/${item.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#52525b] group-hover:text-black transition-colors group/link"
                >
                  <span className="size-1.5 rounded-full bg-[#f8dc6c]" />
                  <span>See more</span>
                  <ArrowRightLinear size={14} className="text-black group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to view full fleet in /machinery */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/machinery"
            className="inline-flex items-center gap-2 h-11 px-7 rounded-xl bg-white hover:bg-zinc-950 text-zinc-900 hover:text-white border border-zinc-200/70 hover:border-black font-semibold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-sm group"
          >
            <SettingsMinimalisticBold size={16} className="text-[#f8dc6c]" />
            <span>Explore All Specialized Machinery (8 Models)</span>
            <ArrowRightLinear size={16} className="text-[#f8dc6c] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          8. SURFACES PREPARED WORLDWIDE (Fluid Responsive Grid, Unified Borders)
         ========================================================================= */}
      <section id="projects" className="py-12 sm:py-20 px-6 sm:px-10 lg:px-14 xl:px-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: 3 Project Cards + CTA Button */}
          <div className="flex flex-col gap-6">
            {/* Project 1 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-zinc-200/60 card-soft-shadow hover:-translate-y-1 transition-all duration-300">
              <div className="h-[320px] sm:h-[400px] relative overflow-hidden">
                <img
                  alt="Trent Kelly Cricket Ground"
                  className="size-full object-cover hover:scale-105 transition duration-500"
                  src={imgProject1}
                />
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-xl text-black">
                    Trent Kelly Cricket Ground
                  </h4>
                  <p className="text-sm text-[#71717a]">Championship Table Restoration</p>
                </div>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#f4f4f5] text-black">
                  2026
                </span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-zinc-200/60 card-soft-shadow hover:-translate-y-1 transition-all duration-300">
              <div className="h-[320px] sm:h-[400px] relative overflow-hidden">
                <img
                  alt="Willow Creek Stadium"
                  className="size-full object-cover hover:scale-105 transition duration-500"
                  src={imgProject2}
                />
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-xl text-black">
                    Willow Creek Stadium
                  </h4>
                  <p className="text-sm text-[#71717a]">Tournament Wicket Preparation</p>
                </div>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#f4f4f5] text-black">
                  2025
                </span>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-zinc-200/60 card-soft-shadow hover:-translate-y-1 transition-all duration-300">
              <div className="h-[320px] sm:h-[400px] relative overflow-hidden">
                <img
                  alt="Boundary Ridge Arena"
                  className="size-full object-cover hover:scale-105 transition duration-500"
                  src={imgProject3}
                />
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-xl text-black">
                    Boundary Ridge Arena
                  </h4>
                  <p className="text-sm text-[#71717a]">Drop-in Tray Installation</p>
                </div>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#f4f4f5] text-black">
                  2025
                </span>
              </div>
            </div>

            {/* David UI Button to Contact */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-[#f8dc6c] hover:bg-[#ffdc50] text-[#1a1a17] font-semibold text-sm transition-all duration-200 active:scale-95 shadow-md w-full sm:w-fit cursor-pointer group"
            >
              <span>Discuss Surface Requirements</span>
              <ArrowRightLinear size={18} className="text-[#1a1a17] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right Column: Heading + 3 Project Cards */}
          <div className="flex flex-col gap-6">
            {/* Section Header */}
            <div className="pt-2 pb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 border border-zinc-200/60 text-xs font-semibold uppercase tracking-wider mb-2">
                <span className="size-1.5 rounded-full bg-[#f8dc6c]" />
                Proven Track Record
              </span>
              <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-black tracking-tight leading-tight mt-1">
                Surfaces Prepared <br className="hidden sm:inline" />Worldwide.
              </h2>
            </div>

            {/* Project 4 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-zinc-200/60 card-soft-shadow hover:-translate-y-1 transition-all duration-300">
              <div className="h-[320px] sm:h-[400px] relative overflow-hidden">
                <img
                  alt="Emerald Bay Cricket Club"
                  className="size-full object-cover hover:scale-105 transition duration-500"
                  src={imgProject4}
                />
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-xl text-black">
                    Emerald Bay Cricket Club
                  </h4>
                  <p className="text-sm text-[#71717a]">Multi-pitch Community Precinct</p>
                </div>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#f4f4f5] text-black">
                  2024
                </span>
              </div>
            </div>

            {/* Project 5 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-zinc-200/60 card-soft-shadow hover:-translate-y-1 transition-all duration-300">
              <div className="h-[320px] sm:h-[400px] relative overflow-hidden">
                <img
                  alt="Victory Park Cricket Field"
                  className="size-full object-cover hover:scale-105 transition duration-500"
                  src={imgProject5}
                />
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-xl text-black">
                    Victory Park Cricket Field
                  </h4>
                  <p className="text-sm text-[#71717a]">Regional First-Class Outfield</p>
                </div>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#f4f4f5] text-black">
                  2024
                </span>
              </div>
            </div>

            {/* Project 6 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-zinc-200/60 card-soft-shadow hover:-translate-y-1 transition-all duration-300">
              <div className="h-[320px] sm:h-[400px] relative overflow-hidden">
                <img
                  alt="Sunset View Cricket Grounds"
                  className="size-full object-cover hover:scale-105 transition duration-500"
                  src={imgProject6}
                />
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-xl text-black">
                    Sunset View Cricket Grounds
                  </h4>
                  <p className="text-sm text-[#71717a]">Laser-Leveled Turf Wickets</p>
                </div>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#f4f4f5] text-black">
                  2024
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          9. CONTACT & CONSULTATION (Unified Subtle Borders)
         ========================================================================= */}
      <section id="contact" className="py-12 sm:py-20 px-6 sm:px-10 lg:px-14 xl:px-20 w-full">
        <div className="bg-white rounded-2xl p-6 sm:p-10 lg:p-14 border border-zinc-200/60 card-soft-shadow">
          
          <div className="flex flex-col gap-2 mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 border border-zinc-200/60 text-xs font-semibold uppercase tracking-wider w-fit">
              <span className="size-1.5 rounded-full bg-[#f8dc6c]" />
              Direct Advisory
            </span>
            <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-black tracking-tight mt-1">
              Start a Conversation.
            </h2>
            <p className="text-sm sm:text-base text-[#52525b] max-w-[560px]">
              Ready to elevate your cricket surface? Reach out today for tournament preparation, club consulting, or curatorial surface audits.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            {/* Left Column: Direct Contact Info (3 Matching Light Cards) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Card 1: Chat */}
              <div className="bg-[#f8f8f8] hover:bg-white transition-all duration-300 p-5 rounded-xl border border-zinc-200/60 flex items-center justify-between group cursor-pointer shadow-[0_12px_30px_-10px_rgba(0,0,0,0.025)] hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-3.5">
                  <div className="size-11 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <ChatRoundLineBold size={22} className="text-[#121212]" color="#121212" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-black">Direct Inquiry</h4>
                    <p className="text-xs text-[#71717a]">Direct consultation with Trent</p>
                  </div>
                </div>
                <div className="size-9 rounded-lg bg-black flex items-center justify-center text-white group-hover:bg-[#333] transition">
                  <ArrowRightUpLinear size={16} color="#ffffff" />
                </div>
              </div>

              {/* Card 2: Call us */}
              <div className="bg-[#f8f8f8] hover:bg-white transition-all duration-300 p-5 rounded-xl border border-zinc-200/60 flex items-center justify-between group cursor-pointer shadow-[0_12px_30px_-10px_rgba(0,0,0,0.025)] hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-3.5">
                  <div className="size-11 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <PhoneCallingRoundedBold size={22} className="text-[#121212]" color="#121212" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-black">Phone Call</h4>
                    <p className="text-xs text-[#71717a]">Adelaide &amp; South Australia</p>
                  </div>
                </div>
                <div className="size-9 rounded-lg bg-black flex items-center justify-center text-white group-hover:bg-[#333] transition">
                  <ArrowRightUpLinear size={16} color="#ffffff" />
                </div>
              </div>

              {/* Card 3: Connect on LinkedIn (Same color, same style as 2 cards above) */}
              <a
                href="https://www.linkedin.com/in/trent-kelly-18b52044/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#f8f8f8] hover:bg-white transition-all duration-300 p-5 rounded-xl border border-zinc-200/60 flex items-center justify-between group cursor-pointer shadow-[0_12px_30px_-10px_rgba(0,0,0,0.025)] hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="size-11 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <LinkedInIcon className="size-5 text-[#0a66c2]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-black group-hover:text-[#0a66c2] transition-colors">
                      Connect on LinkedIn
                    </h4>
                    <p className="text-xs text-[#71717a]">Professional network &amp; agronomy notes</p>
                  </div>
                </div>
                <div className="size-9 rounded-lg bg-black flex items-center justify-center text-white group-hover:bg-[#333] transition">
                  <ArrowRightUpLinear size={16} color="#ffffff" />
                </div>
              </a>
            </div>

            {/* Right Column: David UI Styled Form (Consistent Subtle Input Borders) */}
            <div className="lg:col-span-7">
              <h3 className="font-semibold text-xl sm:text-2xl text-black tracking-tight mb-5">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#52525b]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Warner"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full rounded-xl border border-zinc-200/80 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#52525b]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="curator@cricketclub.com.au"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full rounded-xl border border-zinc-200/80 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#52525b]">
                    Message / Venue Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your venue, tournament dates, or surface requirements..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full rounded-xl border border-zinc-200/80 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950 transition-all resize-none"
                  />
                </div>

                {submitted && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm flex items-center gap-2">
                    <CheckCircleBold size={18} className="text-emerald-600 shrink-0" />
                    <span>Inquiry sent successfully! Trent will review your pitch specifications and get in touch.</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="mt-2 w-full bg-zinc-950 hover:bg-zinc-900 text-white flex items-center justify-between px-6 py-3.5 rounded-xl transition-all duration-200 active:scale-95 shadow-md group cursor-pointer"
                >
                  <span className="font-semibold text-sm sm:text-base">
                    {submitted ? "Message Dispatched" : "Send Inquiry"}
                  </span>
                  <div className="bg-[#f8dc6c] group-hover:bg-[#ffdc50] flex items-center justify-center rounded-lg size-8 transition">
                    <ArrowRightLinear size={16} color="#000000" className="text-black" />
                  </div>
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          10. FOOTER (Subtle Dark Border)
         ========================================================================= */}
      <footer className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 mb-12">
        <div className="bg-zinc-950 text-white rounded-2xl p-8 sm:p-12 flex flex-col justify-between gap-8 border border-zinc-800/80">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-zinc-800/80 pb-8">
            <a href="#home" className="flex items-center gap-2.5">
              <div className="size-8 rounded-full bg-[#f8dc6c] flex items-center justify-center">
                <img alt="Fleet symbol" className="size-5" src={imgPolygon3} />
              </div>
              <p className="font-bold text-xl text-white uppercase tracking-tight">
                Trent Kelly
              </p>
            </a>

            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-zinc-300">
              <a href="#specialist" className="hover:text-[#ffdc50] transition">The Specialist</a>
              <a href="#solutions" className="hover:text-[#ffdc50] transition">Solutions</a>
              <a href="#categories" className="hover:text-[#ffdc50] transition">Equipment</a>
              <a href="#projects" className="hover:text-[#ffdc50] transition">Surfaces</a>
              <a href="#contact" className="hover:text-[#ffdc50] transition">Contact</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
            <p className="text-center sm:text-left">
              Copyright © 2026 – TK Turf Services. All Rights Reserved.
            </p>

            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/in/trent-kelly-18b52044/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="size-8 rounded-full bg-zinc-900 border border-zinc-800/80 flex items-center justify-center hover:bg-[#0077b5] text-zinc-300 hover:text-white transition"
              >
                <LinkedInIcon className="size-3.5" />
              </a>
              <a href="#contact" aria-label="Website" className="size-8 rounded-full bg-zinc-900 border border-zinc-800/80 flex items-center justify-center hover:bg-zinc-800 transition">
                <GlobalLinear size={15} className="text-zinc-300 hover:text-[#ffdc50]" />
              </a>
              <a href="#contact" aria-label="Email" className="size-8 rounded-full bg-zinc-900 border border-zinc-800/80 flex items-center justify-center hover:bg-zinc-800 transition">
                <LetterLinear size={15} className="text-zinc-300 hover:text-[#ffdc50]" />
              </a>
              <a href="#contact" aria-label="Phone" className="size-8 rounded-full bg-zinc-900 border border-zinc-800/80 flex items-center justify-center hover:bg-zinc-800 transition">
                <PhoneLinear size={15} className="text-zinc-300 hover:text-[#ffdc50]" />
              </a>
              <a href="#contact" aria-label="Share" className="size-8 rounded-full bg-zinc-900 border border-zinc-800/80 flex items-center justify-center hover:bg-zinc-800 transition">
                <ShareCircleBold size={15} className="text-zinc-300 hover:text-[#ffdc50]" />
              </a>
              <a href="#contact" aria-label="Location" className="size-8 rounded-full bg-zinc-900 border border-zinc-800/80 flex items-center justify-center hover:bg-zinc-800 transition">
                <MapPointLinear size={15} className="text-zinc-300 hover:text-[#ffdc50]" />
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* =========================================================================
          FULL VIDEO MODAL (With Sound & Clean Top-Right Close Icon Button)
         ========================================================================= */}
      {isVideoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8"
          onClick={() => setIsVideoModalOpen(false)}
        >
          {/* Top-Right Corner Close Button (Only Close Icon) */}
          <button
            type="button"
            onClick={() => setIsVideoModalOpen(false)}
            aria-label="Close video"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 active:scale-95 p-2.5 sm:p-3 rounded-full transition-all duration-200 cursor-pointer z-50 backdrop-blur-md shadow-lg"
          >
            <svg
              className="size-5 sm:size-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="6" />
            </svg>
          </button>

          {/* Video Container (With Sound and Controls) */}
          <div
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              autoPlay
              controls
              playsInline
              className="size-full object-contain bg-black"
              src="/sequence-01.mp4"
            />
          </div>
        </div>
      )}

      {/* =========================================================================
          CALENDLY-STYLE BOOKING POPUP MODAL
         ========================================================================= */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

    </div>
  );
}
