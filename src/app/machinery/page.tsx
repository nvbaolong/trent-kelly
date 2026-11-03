"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRightLinear,
  MagniferLinear,
  AddCircleLinear,
  CloseCircleLinear,
  CheckCircleBold,
  LetterLinear,
  SettingsMinimalisticBold,
  ShieldCheckBold,
  PhoneCallingRoundedBold,
  GlobalLinear,
  ShareCircleBold,
  MapPointLinear,
} from "solar-icon-set";
import { MACHINERY_CATALOG, MachineryItem } from "@/data/machinery";

const imgPolygon3 = "/figma-assets/6e9c39745ead91c4fc1dbbe0e9335014893590a9.svg";
const imgScreenshotTrent = "/figma-assets/0573e1610acc04d2a77892cad5e7a1f95c3b3f3c.png";

// Tab filter definition mirroring Section 6 of Home Page (media_1793615992687_cfec46b0.png)
interface CategoryTab {
  id: string;
  num: string;
  label: string;
  sublabel: string;
  count: number;
  matchCategory?: string;
}

const CATEGORY_TABS: CategoryTab[] = [
  {
    id: "all",
    num: "All",
    label: "All Equipment",
    sublabel: "Complete curatorial fleet for championship wickets and outfields.",
    count: 8,
  },
  {
    id: "01",
    num: "01",
    label: "Wicket Cylinder Mowers",
    sublabel: "11-blade high-frequency cutting reels for 3mm–6mm couchgrass wicket tables.",
    count: 2,
    matchCategory: "Wicket Cylinder Mowers",
  },
  {
    id: "02",
    num: "02",
    label: "Outfield & Surrounds",
    sublabel: "Heavy-duty commercial rotary and reel mowers for wide-area coverage & match-day striping.",
    count: 2,
    matchCategory: "Outfield & Surrounds Mowers",
  },
  {
    id: "03",
    num: "03",
    label: "Scarifiers & Renovators",
    sublabel: "Laser-cut tungsten verticutting reels for organic thatch removal and seasonal renovation.",
    count: 2,
    matchCategory: "Scarifiers & Renovators",
  },
  {
    id: "04",
    num: "04",
    label: "Rollers & Diagnostic Tools",
    sublabel: "Precision dual-drum split rollers, Clegg Impact Hammer and diagnostic soil test kits.",
    count: 2,
    matchCategory: "Rollers & Pitch Tools",
  },
];

function MachineryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [activeTabId, setActiveTabId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "name" | "model">("featured");
  const [quoteList, setQuoteList] = useState<string[]>([]);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  useEffect(() => {
    if (categoryParam) {
      const match = CATEGORY_TABS.find(
        (t) =>
          t.matchCategory?.toLowerCase() === categoryParam.toLowerCase() ||
          t.label.toLowerCase() === categoryParam.toLowerCase()
      );
      if (match) {
        setActiveTabId(match.id);
      }
    }
  }, [categoryParam]);

  const toggleQuote = (slug: string) => {
    setQuoteList((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const currentTab = CATEGORY_TABS.find((t) => t.id === activeTabId) || CATEGORY_TABS[0];

  const filtered = MACHINERY_CATALOG.filter((item) => {
    const matchesCategory =
      activeTabId === "all" ||
      !currentTab.matchCategory ||
      item.category === currentTab.matchCategory;

    const matchesQuery =
      !searchQuery.trim() ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.modelCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.badge.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesQuery;
  }).sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "model") return a.modelCode.localeCompare(b.modelCode);
    return 0; // featured default
  });

  const selectedItems: MachineryItem[] = MACHINERY_CATALOG.filter((m) =>
    quoteList.includes(m.slug)
  );

  return (
    <div className="min-h-screen bg-[#f4f4f5] text-[#121212] font-sans selection:bg-[#ffdc50] selection:text-black">
      
      {/* =========================================================================
          TOP NAVIGATION BAR (Consistent With Site Nav & Figma Button)
         ========================================================================= */}
      <header className="w-full bg-white/90 backdrop-blur-md border-b border-zinc-200/60 sticky top-0 z-40 transition-colors">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="size-9 rounded-full bg-[#f8dc6c] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                <img alt="Fleet symbol" className="size-5" src={imgPolygon3} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base sm:text-lg text-[#121212] uppercase tracking-tight leading-none">
                  Trent Kelly
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#b45309] uppercase font-semibold">
                  Turf Agronomy
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs sm:text-sm font-medium">
            <Link href="/" className="text-zinc-600 hover:text-black transition-colors">
              Home
            </Link>
            <Link href="/#specialist" className="text-zinc-600 hover:text-black transition-colors">
              The Specialist
            </Link>
            <Link href="/#solutions" className="text-zinc-600 hover:text-black transition-colors">
              Solutions
            </Link>
            <Link
              href="/machinery"
              className="text-black font-semibold flex items-center gap-1.5 border-b-2 border-black pb-0.5"
            >
              <span>Machinery</span>
              <span className="size-1.5 rounded-full bg-[#f8dc6c]" />
            </Link>
            <Link href="/#projects" className="text-zinc-600 hover:text-black transition-colors">
              Surfaces
            </Link>
            <Link href="/#contact" className="text-zinc-600 hover:text-black transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Action: Primary Quote List Button (Replaces Book a Call on Machinery Page) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuoteModalOpen(true)}
              className="inline-flex items-center gap-2.5 rounded-xl bg-zinc-950 hover:bg-black text-white px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 shadow-md cursor-pointer group"
            >
              <span>Quote List</span>
              <span className="bg-[#f8dc6c] text-[#121212] size-5 rounded-full flex items-center justify-center text-[11px] font-bold shadow-xs">
                {quoteList.length}
              </span>
              <ArrowRightLinear
                size={15}
                color="#f8dc6c"
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </button>
          </div>

        </div>
      </header>

      <main className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 py-8 sm:py-12">
        
        {/* =========================================================================
            HERO SECTION (Modeled on Tervyra's Collection Hero)
           ========================================================================= */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 lg:p-12 border border-zinc-200/60 card-soft-shadow mb-8 sm:mb-10 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            {/* Pill Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/60 text-[11px] font-mono font-bold text-[#121212] uppercase tracking-wider mb-4">
              <span className="size-2 rounded-full bg-[#f8dc6c] animate-pulse" />
              <span>CRICKET TURF MACHINERY SHOWROOM</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121212] leading-[1.1]">
              The Curatorial Fleet.
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[#71717a] mt-2.5">
              Championship cricket turf machinery, engineered for 22 yards.
            </p>

            <p className="text-xs sm:text-sm text-[#52525b] mt-4 leading-relaxed max-w-2xl">
              A considered collection of high-frequency tournament cylinder mowers, tungsten scarifiers, split-drum wicket rollers, and agronomic diagnostic suites. Curated, specified, and calibrated by former First-Class bowler &amp; master curator Trent Kelly for Australian cricket surfaces.
            </p>

            {/* Trust Highlights */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 mt-6 pt-6 border-t border-zinc-100 text-xs sm:text-sm font-medium text-[#121212]">
              <div className="flex items-center gap-2">
                <ShieldCheckBold size={18} className="text-[#f8dc6c]" />
                <span>100% Australian Engineered Fine Turf Standard</span>
              </div>
              <div className="flex items-center gap-2">
                <SettingsMinimalisticBold size={18} className="text-[#f8dc6c]" />
                <span>On-Site Soil &amp; Clip Height Calibration</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500" />
                <span>Commercial B2B Fleet Supply (POA)</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            TABBED FILTER BAR (Mirrors Home Page Categories & Tervyra Filter Bar)
           ========================================================================= */}
        <section className="mb-8">
          
          {/* Main Category Tabs */}
          <div className="bg-white rounded-2xl p-2 sm:p-2.5 border border-zinc-200/60 card-soft-shadow mb-4">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {CATEGORY_TABS.map((tab) => {
                const isActive = activeTabId === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTabId(tab.id);
                      setSearchQuery("");
                    }}
                    className={`group relative shrink-0 px-4 sm:px-5 py-3 rounded-xl transition-all duration-200 flex items-center gap-2.5 cursor-pointer text-left ${
                      isActive
                        ? "bg-zinc-950 text-white shadow-sm"
                        : "bg-transparent hover:bg-zinc-100/70 text-zinc-700 hover:text-black"
                    }`}
                  >
                    <span
                      className={`text-[11px] font-mono font-bold transition-colors ${
                        isActive ? "text-[#f8dc6c]" : "text-zinc-400 group-hover:text-zinc-600"
                      }`}
                    >
                      {tab.num}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold tracking-tight whitespace-nowrap">
                      {tab.label}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full transition-colors ml-1 ${
                        isActive
                          ? "bg-white/15 text-[#f8dc6c]"
                          : "bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200/70"
                      }`}
                    >
                      {tab.count} Models
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub-bar: Search Input, Category Description & Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-1">
            <p className="text-xs text-zinc-500 line-clamp-1 italic">
              {currentTab.sublabel}
            </p>

            <div className="flex items-center gap-2.5">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-64">
                <MagniferLinear
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search model or spec..."
                  className="w-full bg-white border border-zinc-200/60 rounded-xl pl-9 pr-3.5 py-2 text-xs text-[#121212] placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 card-soft-shadow transition"
                />
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-zinc-200/60 rounded-xl px-3.5 py-2 text-xs font-semibold text-zinc-800 focus:outline-none cursor-pointer card-soft-shadow"
              >
                <option value="featured">Sort: Featured</option>
                <option value="name">Sort: Name (A–Z)</option>
                <option value="model">Sort: Model Code</option>
              </select>
            </div>
          </div>

        </section>

        {/* =========================================================================
            CATALOGUE GRID (Tervyra Collection Architecture: 3-Col, "See more" Button)
           ========================================================================= */}
        <section className="mb-14 sm:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((item) => {
              const isAdded = quoteList.includes(item.slug);

              return (
                <div
                  key={item.slug}
                  onClick={() => router.push(`/machinery/${item.slug}`)}
                  className="group relative bg-white rounded-2xl p-4 sm:p-5 pb-5 border border-zinc-200/60 card-soft-shadow hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Image Well with Floating Category Badge (Tervyra Style) */}
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 mb-4.5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Top-Left Floating Category Pill Badge */}
                      <div className="absolute top-3.5 left-3.5 backdrop-blur-md bg-white/95 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                        <span className="size-1.5 rounded-full bg-[#f8dc6c]" />
                        <span className="text-[10px] font-mono tracking-widest text-[#121212] uppercase font-bold">
                          {item.badge}
                        </span>
                      </div>

                      {/* Top-Right Model Code Chip */}
                      <div className="absolute top-3.5 right-3.5 backdrop-blur-md bg-black/75 px-2.5 py-1 rounded-full">
                        <span className="text-[10px] font-mono text-[#ffdc50] font-bold">
                          {item.modelCode}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="px-1">
                      <Link
                        href={`/machinery/${item.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="block"
                      >
                        <h3 className="font-bold text-lg sm:text-xl text-[#121212] group-hover:text-black transition-colors line-clamp-1">
                          {item.name}
                        </h3>
                      </Link>
                      
                      <p className="text-xs sm:text-[13px] text-[#71717a] mt-1.5 leading-relaxed line-clamp-2">
                        {item.shortDescription}
                      </p>

                      {/* Key Specification Chips */}
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {item.specs.slice(0, 2).map((s) => (
                          <span
                            key={s.label}
                            className="text-[11px] font-mono bg-zinc-50 border border-zinc-200/50 px-2.5 py-0.5 rounded-md text-zinc-600"
                          >
                            <strong className="text-zinc-900">{s.label}:</strong> {s.value}
                          </span>
                        ))}
                      </div>

                      {/* Trent's Agronomic Curatorial Quote */}
                      <div className="mt-3.5 pt-2.5 border-t border-zinc-100">
                        <p className="text-[11px] italic text-zinc-500 line-clamp-2">
                          “{item.trentNote}”
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Row: Quote Button & Tag Left, "See more" Button Right */}
                  <div className="mt-5 pt-3.5 border-t border-zinc-100 flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleQuote(item.slug);
                        }}
                        title={isAdded ? "Remove from quote list" : "Add to commercial quote list"}
                        className={`size-7 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                          isAdded
                            ? "bg-black text-[#f8dc6c]"
                            : "bg-zinc-100 text-zinc-700 hover:bg-black hover:text-white"
                        }`}
                      >
                        {isAdded ? (
                          <CloseCircleLinear size={15} />
                        ) : (
                          <AddCircleLinear size={15} />
                        )}
                      </button>
                      <span className="text-xs font-semibold text-zinc-800">
                        POA Quote
                      </span>
                    </div>

                    {/* "See more" Button with dot and right arrow */}
                    <Link
                      href={`/machinery/${item.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-950 text-zinc-800 hover:text-white text-xs font-semibold transition-all duration-200 group/btn"
                    >
                      <span className="size-1.5 rounded-full bg-[#f8dc6c]" />
                      <span>See more</span>
                      <ArrowRightLinear
                        size={14}
                        color="currentColor"
                        className="group-hover/btn:translate-x-0.5 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center border border-zinc-200/60 card-soft-shadow my-8">
              <p className="text-base font-semibold text-[#121212]">
                No equipment matches your search filter.
              </p>
              <button
                onClick={() => {
                  setActiveTabId("all");
                  setSearchQuery("");
                }}
                className="mt-3 text-xs font-semibold text-[#121212] bg-[#f8dc6c] hover:bg-[#ffdc50] px-4 py-2 rounded-full cursor-pointer transition"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

        {/* =========================================================================
            CURATORIAL PHILOSOPHY / STORY SECTION (Tervyra Collection Story Style)
           ========================================================================= */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 lg:p-12 border border-zinc-200/60 card-soft-shadow mb-8 sm:mb-12">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#71717a] block mb-2">
              CURATORIAL PHILOSOPHY
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#121212]">
              Machinery that respects the clay beneath.
            </h2>
            <p className="text-xs sm:text-sm text-[#52525b] mt-3 leading-relaxed">
              Every strip of turf has a story told through its moisture gradient, soil compaction, and millimeter-precise cut. A dull cylinder reel bruises couchgrass stolons and creates fungal entry points, while an incorrectly ballasted roller destroys black-clay crumb structure. Trent Kelly matches your venue's clay profile, turf species, and ground staff workflow with equipment engineered for tournament playability.
            </p>
          </div>

          {/* 3 Story Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-[#f8f8f8] hover:bg-white transition-all duration-200 p-5 sm:p-6 rounded-xl border border-zinc-200/40 hover:border-zinc-200/80 hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.035)] group">
              <span className="text-xs font-mono font-bold text-[#b45309] block mb-2">01 / CUTTING GEOMETRY</span>
              <h3 className="text-base sm:text-lg font-bold text-[#121212]">Micro-Metric Clip Rate</h3>
              <p className="text-xs sm:text-[13px] text-[#52525b] mt-2 leading-relaxed">
                11-blade carbon steel cylinders delivering 140+ cuts per meter at 3mm–6mm heights without scalping or crown tearing.
              </p>
            </div>

            <div className="bg-[#f8f8f8] hover:bg-white transition-all duration-200 p-5 sm:p-6 rounded-xl border border-zinc-200/40 hover:border-zinc-200/80 hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.035)] group">
              <span className="text-xs font-mono font-bold text-[#b45309] block mb-2">02 / ZERO-SCUFF DRIVES</span>
              <h3 className="text-base sm:text-lg font-bold text-[#121212]">Split-Drum Differential</h3>
              <p className="text-xs sm:text-[13px] text-[#52525b] mt-2 leading-relaxed">
                Twin-drive differential rear rollers prevent turf twisting and furrowing during sharp 180° turns on the 22-yard square.
              </p>
            </div>

            <div className="bg-[#f8f8f8] hover:bg-white transition-all duration-200 p-5 sm:p-6 rounded-xl border border-zinc-200/40 hover:border-zinc-200/80 hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.035)] group">
              <span className="text-xs font-mono font-bold text-[#b45309] block mb-2">03 / SUBTERRANEAN PHYSICS</span>
              <h3 className="text-base sm:text-lg font-bold text-[#121212]">Target Compaction (CIV)</h3>
              <p className="text-xs sm:text-[13px] text-[#52525b] mt-2 leading-relaxed">
                Matched staged ballast systems allow curators to reach 300 CIV impact hardness without inducing subsurface clay shearing.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            TECHNICAL CONSULTATION / HELP PANEL (Tervyra "Need Help Choosing?" Style)
           ========================================================================= */}
        <section className="bg-[#1c1c1c] text-white rounded-2xl p-8 sm:p-12 border border-zinc-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#f8dc6c] block mb-2">
              TECHNICAL CONSULTATION &amp; FLEET AUDIT
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Need curatorial advice for your sports facility?
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-2.5 leading-relaxed">
              Trent Kelly conducts on-site equipment audits, staff operational training, and customized fleet procurement quotes for clubs, schools, and municipal councils across South Australia.
            </p>
            <div className="mt-4 flex items-center gap-2.5 text-xs text-stone-400 font-mono">
              <span className="size-2 rounded-full bg-emerald-400" />
              <span>Available for on-site Adelaide &amp; South Australian regional demonstrations</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={() => setQuoteModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 h-11 px-7 rounded-xl bg-[#f8dc6c] hover:bg-[#ffdc50] text-[#121212] font-semibold text-xs sm:text-sm transition cursor-pointer shadow-md"
            >
              <span>Request Fleet Quote &amp; Demo</span>
              <ArrowRightLinear size={16} color="#000000" />
            </button>
            <a
              href="mailto:trent@tkturf.com.au"
              className="inline-flex items-center justify-center gap-2 h-11 px-7 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm border border-white/20 transition cursor-pointer"
            >
              <LetterLinear size={16} />
              <span>Email Trent Kelly Directly</span>
            </a>
          </div>
        </section>

      </main>

      {/* =========================================================================
          COMMERCIAL QUOTE REQUEST MODAL
         ========================================================================= */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 relative border border-zinc-200/60 card-soft-shadow shadow-2xl">
            <button
              onClick={() => setQuoteModalOpen(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-black cursor-pointer transition-colors"
            >
              <CloseCircleLinear size={22} />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-[10px] font-mono font-bold text-[#121212] uppercase mb-3">
              <span>TURF EQUIPMENT ADVISORY</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[#121212]">
              Commercial Fleet Inquiry
            </h2>
            <p className="text-xs text-[#71717a] mt-1 leading-relaxed">
              Select machines for quotation and demonstration by Trent Kelly (South Australia).
            </p>

            {quoteSubmitted ? (
              <div className="py-10 text-center">
                <CheckCircleBold size={44} className="text-emerald-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-[#121212]">
                  Inquiry Dispatched
                </h3>
                <p className="text-xs text-[#71717a] mt-1.5 max-w-sm mx-auto">
                  Trent Kelly will review your club/venue requirements and respond with technical specifications and demonstration dates within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setQuoteSubmitted(false);
                    setQuoteModalOpen(false);
                  }}
                  className="mt-6 text-xs font-semibold bg-[#121212] text-white px-5 py-2.5 rounded-xl cursor-pointer hover:bg-black transition"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                {selectedItems.length === 0 ? (
                  <div className="py-7 px-4 rounded-xl bg-zinc-50 border border-zinc-200/60 text-center">
                    <SettingsMinimalisticBold size={24} className="text-zinc-400 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-[#121212]">No machines in your quote list yet.</p>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      Click the (+) icon on any equipment card to add it to this quotation list.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {selectedItems.map((item) => (
                      <div
                        key={item.slug}
                        className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-200/60 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="size-10 rounded-lg object-cover" />
                          <div>
                            <p className="font-semibold text-[#121212]">{item.name}</p>
                            <p className="text-zinc-500 font-mono text-[10px]">{item.modelCode}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleQuote(item.slug)}
                          className="text-red-500 hover:text-red-700 cursor-pointer font-semibold text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-3 border-t border-zinc-100 space-y-2.5">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    className="w-full bg-[#f8f8f8] border border-zinc-200/60 rounded-xl px-4 py-2.5 text-xs text-[#121212] focus:outline-none focus:border-zinc-400"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Cricket Club / School / Council Facility"
                    className="w-full bg-[#f8f8f8] border border-zinc-200/60 rounded-xl px-4 py-2.5 text-xs text-[#121212] focus:outline-none focus:border-zinc-400"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Official Email Address"
                    className="w-full bg-[#f8f8f8] border border-zinc-200/60 rounded-xl px-4 py-2.5 text-xs text-[#121212] focus:outline-none focus:border-zinc-400"
                  />
                  <textarea
                    rows={2}
                    placeholder="Target pitch type (couch, rye), venue location, or required delivery window..."
                    className="w-full bg-[#f8f8f8] border border-zinc-200/60 rounded-xl p-3 text-xs text-[#121212] focus:outline-none focus:border-zinc-400 resize-none"
                  />
                  <button
                    disabled={selectedItems.length === 0}
                    onClick={() => setQuoteSubmitted(true)}
                    className="w-full bg-[#121212] hover:bg-black disabled:opacity-40 text-white font-semibold py-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition shadow-md"
                  >
                    <LetterLinear size={15} />
                    <span>Send Commercial Inquiry to Trent Kelly</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          FOOTER
         ========================================================================= */}
      <footer className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 pb-12">
        <div className="bg-[#1c1c1c] text-white rounded-2xl p-8 sm:p-12 border border-zinc-800 flex flex-col justify-between gap-10">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-white/10 pb-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-[#f8dc6c] flex items-center justify-center">
                <img alt="Fleet symbol" className="size-5" src={imgPolygon3} />
              </div>
              <p className="font-bold text-lg sm:text-xl text-white uppercase tracking-tight">
                Trent Kelly
              </p>
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-white/80">
              <Link href="/#specialist" className="hover:text-[#ffdc50] transition-colors">Services</Link>
              <Link href="/machinery" className="text-[#ffdc50] font-semibold">Machinery Fleet</Link>
              <Link href="/#solutions" className="hover:text-[#ffdc50] transition-colors">Programs</Link>
              <Link href="/#projects" className="hover:text-[#ffdc50] transition-colors">Results</Link>
              <Link href="/#contact" className="hover:text-[#ffdc50] transition-colors">Contact</Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-white/60">
            <p className="text-center sm:text-left">
              Copyright © 2026 – TK Turf Services. All Rights Reserved.
            </p>

            <div className="flex items-center gap-2">
              <a href="/#contact" aria-label="Website" className="size-8 rounded-full bg-black flex items-center justify-center hover:bg-[#333] transition">
                <GlobalLinear size={15} className="text-white/80 hover:text-[#ffdc50]" />
              </a>
              <a href="/#contact" aria-label="Email" className="size-8 rounded-full bg-black flex items-center justify-center hover:bg-[#333] transition">
                <LetterLinear size={15} className="text-white/80 hover:text-[#ffdc50]" />
              </a>
              <a href="/#contact" aria-label="Phone" className="size-8 rounded-full bg-black flex items-center justify-center hover:bg-[#333] transition">
                <PhoneCallingRoundedBold size={15} className="text-white/80 hover:text-[#ffdc50]" />
              </a>
              <a href="/#contact" aria-label="Share" className="size-8 rounded-full bg-black flex items-center justify-center hover:bg-[#333] transition">
                <ShareCircleBold size={15} className="text-white/80 hover:text-[#ffdc50]" />
              </a>
              <a href="/#contact" aria-label="Location" className="size-8 rounded-full bg-black flex items-center justify-center hover:bg-[#333] transition">
                <MapPointLinear size={15} className="text-white/80 hover:text-[#ffdc50]" />
              </a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default function MachineryStorefrontPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f4f4f5] flex items-center justify-center text-xs font-semibold text-zinc-500">
          Loading curatorial machinery fleet...
        </div>
      }
    >
      <MachineryContent />
    </Suspense>
  );
}
