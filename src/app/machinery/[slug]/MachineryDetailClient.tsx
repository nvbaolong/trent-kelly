"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeftLinear,
  ArrowRightLinear,
  CheckCircleBold,
  AddCircleLinear,
  ShieldCheckBold,
  SettingsMinimalisticBold,
  PhoneCallingRoundedBold,
  GlobalLinear,
  ShareCircleBold,
  MapPointLinear,
  DocumentTextLinear,
  ClockCircleLinear,
  LetterLinear,
} from "solar-icon-set";
import { MACHINERY_CATALOG } from "@/data/machinery";

const imgPolygon3 = "/figma-assets/6e9c39745ead91c4fc1dbbe0e9335014893590a9.svg";

export default function MachineryDetailClient({ slug }: { slug: string }) {
  const router = useRouter();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [inQuoteList, setInQuoteList] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Find target item or fallback
  const item =
    MACHINERY_CATALOG.find((m) => m.slug === slug) || MACHINERY_CATALOG[0];

  // 3 Related items for "More pieces" section
  const relatedItems = MACHINERY_CATALOG.filter((m) => m.slug !== item.slug).slice(0, 3);

  // Perspective gallery images
  const galleryImages = [
    item.image,
    "/images/machinery/cricket-wicket-mower.jpg",
    "/images/machinery/cricket-turf-scarifier.jpg",
    "/images/machinery/cricket-pitch-roller.jpg",
  ];

  return (
    <div className="min-h-screen bg-[#f4f4f5] text-[#121212] font-sans selection:bg-[#ffdc50] selection:text-black">
      
      {/* =========================================================================
          TOP NAVIGATION BAR (Consistent With Site Nav)
         ========================================================================= */}
      <header className="w-full bg-white/90 backdrop-blur-md border-b border-zinc-200/60 sticky top-0 z-40 transition-colors">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Back to Machinery Fleet */}
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

            <span className="hidden md:block h-5 w-[1px] bg-zinc-200" />

            <Link
              href="/machinery"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-black transition"
            >
              <ArrowLeftLinear size={15} />
              <span>Back to Machinery Fleet</span>
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

          {/* Right Action: Primary Quote Inquiry Button */}
          <div className="flex items-center gap-3">
            <a
              href="#inquiry"
              className="inline-flex items-center gap-2.5 rounded-xl bg-zinc-950 hover:bg-black text-white px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 shadow-md cursor-pointer group"
            >
              <span>Request Quote</span>
              <span className="bg-[#f8dc6c] text-[#121212] size-5 rounded-full flex items-center justify-center text-[11px] font-bold shadow-xs">
                {inQuoteList ? "1" : "0"}
              </span>
              <ArrowRightLinear
                size={15}
                color="#f8dc6c"
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </a>
          </div>

        </div>
      </header>

      {/* =========================================================================
          MAIN PRODUCT DETAIL WRAPPER
         ========================================================================= */}
      <main className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 py-8 sm:py-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-6">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/machinery" className="hover:text-black transition-colors">Machinery</Link>
          <span>/</span>
          <Link href={`/machinery?category=${encodeURIComponent(item.category)}`} className="hover:text-black transition-colors">
            {item.category}
          </Link>
          <span>/</span>
          <span className="text-[#121212] font-semibold">{item.modelCode}</span>
        </div>

        {/* =========================================================================
            SECTION 1: PRODUCT HERO & DETAILS (Two-Column Layout)
           ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-14 sm:mb-20">
          
          {/* Left Column: Image Showcase & Perspectives */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Primary Main Image Container */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-zinc-200/60 card-soft-shadow group">
              <img
                src={galleryImages[activeImageIdx] || item.image}
                alt={item.name}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Floating Category Pill Badge Top-Left */}
              <div className="absolute top-4 left-4 backdrop-blur-md bg-white/95 px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                <span className="size-2 rounded-full bg-[#f8dc6c]" />
                <span className="text-[11px] font-mono tracking-widest text-[#121212] uppercase font-bold">
                  {item.badge}
                </span>
              </div>

              {/* Top-Right Model Code Chip */}
              <div className="absolute top-4 right-4 backdrop-blur-md bg-black/80 px-3 py-1.5 rounded-full">
                <span className="text-[11px] font-mono text-[#ffdc50] font-bold">
                  {item.modelCode}
                </span>
              </div>
            </div>

            {/* Thumbnail Perspective Strip */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer ${
                    activeImageIdx === idx
                      ? "border-black ring-2 ring-black/10 scale-[1.02]"
                      : "border-zinc-200/60 opacity-70 hover:opacity-100 hover:border-zinc-400"
                  }`}
                >
                  <img src={img} alt="Equipment angle" className="size-full object-cover" />
                </button>
              ))}
            </div>

            {/* Full Agronomic Description Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200/60 card-soft-shadow space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 block">
                CURATORIAL OVERVIEW
              </span>
              <p className="text-sm sm:text-base text-[#27272a] leading-relaxed">
                {item.fullDescription}
              </p>
              
              <div className="pt-4 border-t border-zinc-100 flex flex-wrap items-center gap-4 text-xs text-zinc-600">
                <div className="flex items-center gap-1.5 font-medium">
                  <ShieldCheckBold size={16} className="text-[#f8dc6c]" />
                  <span>South Australia Official Supply</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <SettingsMinimalisticBold size={16} className="text-[#f8dc6c]" />
                  <span>On-Site Setting &amp; Handover</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Specification & Inquiry Card */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200/60 card-soft-shadow space-y-6">
              
              {/* Category & Title */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/60 text-[10px] font-mono font-bold text-[#121212] uppercase mb-3">
                  <span className="size-1.5 rounded-full bg-[#f8dc6c]" />
                  <span>{item.category}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121212] leading-tight">
                  {item.name}
                </h1>

                {/* Price / Quote Policy */}
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-xs font-mono uppercase text-zinc-500">Commercial Quote:</span>
                  <span className="text-base sm:text-lg font-bold text-[#121212]">Price on Application (POA)</span>
                </div>

                <p className="text-xs sm:text-sm text-[#71717a] mt-3 leading-relaxed">
                  {item.shortDescription}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <a
                  href="#inquiry"
                  className="w-full inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-zinc-950 hover:bg-black text-white font-semibold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-md group cursor-pointer"
                >
                  <span>Request Fleet Demonstration &amp; Quote</span>
                  <ArrowRightLinear size={16} color="#ffffff" className="group-hover:translate-x-1 transition-transform" />
                </a>

                <button
                  type="button"
                  onClick={() => setInQuoteList(!inQuoteList)}
                  className={`w-full inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl border text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    inQuoteList
                      ? "bg-black text-[#f8dc6c] border-black"
                      : "bg-white hover:bg-zinc-50 text-zinc-800 border-zinc-200/70"
                  }`}
                >
                  {inQuoteList ? (
                    <>
                      <CheckCircleBold size={16} className="text-[#f8dc6c]" />
                      <span>Added to Quote List</span>
                    </>
                  ) : (
                    <>
                      <AddCircleLinear size={16} />
                      <span>Add to Commercial Quote List</span>
                    </>
                  )}
                </button>
              </div>

              {/* Key Technical Specifications Table */}
              <div className="pt-4 border-t border-zinc-100">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 block mb-3">
                  SPECIFICATION HIGHLIGHTS
                </span>

                <div className="border border-zinc-200/60 rounded-xl overflow-hidden divide-y divide-zinc-100 text-xs">
                  {item.specs.map((s) => (
                    <div key={s.label} className="grid grid-cols-2 px-3.5 py-2.5 bg-zinc-50/50">
                      <span className="text-zinc-500 font-medium">{s.label}</span>
                      <span className="text-zinc-900 font-semibold">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal Venues */}
              <div className="pt-4 border-t border-zinc-100">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 block mb-3">
                  IDEAL VENUE APPLICATION
                </span>
                <ul className="space-y-2">
                  {item.idealFor.map((target, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-zinc-700">
                      <span className="size-1.5 rounded-full bg-[#f8dc6c] shrink-0" />
                      <span>{target}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </section>

        {/* =========================================================================
            SECTION 2: PRODUCT STORY
           ========================================================================= */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 lg:p-12 border border-zinc-200/60 card-soft-shadow mb-12 sm:mb-16">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#71717a] block mb-2">
              CURATORIAL PHILOSOPHY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121212]">
              Engineered to respect the smectite clay beneath.
            </h2>
            <p className="text-xs sm:text-sm text-[#52525b] mt-3 leading-relaxed">
              Every strip of turf has a story told through its moisture gradient, soil compaction, and millimeter-precise cut. A dull cylinder reel bruises couchgrass stolons and creates fungal entry points, while an incorrectly ballasted roller destroys black-clay crumb structure. Trent Kelly matches your venue's clay profile, turf species, and ground staff workflow with equipment engineered for tournament playability.
            </p>
          </div>

          {/* Trent's Agronomic Curatorial Quote Card */}
          <div className="mb-8 rounded-xl bg-zinc-50 border border-zinc-200/60 p-6 sm:p-8">
            <span className="text-[11px] font-mono font-bold text-[#b45309] uppercase tracking-wider block mb-2">
              Trent Kelly’s Curatorial Note
            </span>
            <p className="text-sm sm:text-base text-zinc-800 italic leading-relaxed">
              “{item.trentNote}”
            </p>
            <p className="text-xs font-bold text-[#121212] mt-4">
              Trent Kelly • Director, TK Turf Services (Mentored by Les Burdett OAM)
            </p>
          </div>

          {/* 3 Engineering Highlights Cards */}
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
            SECTION 3: CARE, CALIBRATION & DELIVERY
           ========================================================================= */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 lg:p-12 border border-zinc-200/60 card-soft-shadow mb-12 sm:mb-16">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#71717a] block mb-2">
              OPERATIONAL SUPPORT &amp; HANDOVER
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121212]">
              Care, calibration and match-day readiness.
            </h2>
            <p className="text-xs sm:text-sm text-[#52525b] mt-3 leading-relaxed">
              Precision turf machinery requires disciplined daily maintenance to safeguard Adelaide Oval-standard clip quality and clay integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-xl bg-zinc-50 border border-zinc-200/60 space-y-3">
              <div className="size-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center shadow-xs">
                <SettingsMinimalisticBold size={18} className="text-[#b45309]" />
              </div>
              <h3 className="text-base font-bold text-[#121212]">On-Site Calibration Handover</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Every unit delivered by Trent Kelly includes on-site setup, bedknife clearance setting with feeler gauges, and operator training on your specific square.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-50 border border-zinc-200/60 space-y-3">
              <div className="size-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center shadow-xs">
                <DocumentTextLinear size={18} className="text-[#b45309]" />
              </div>
              <h3 className="text-base font-bold text-[#121212]">Reel Grinding Guidelines</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Spin grinding and relief angle specifications tailored for couchgrass stolons to avoid tearing during 3mm tournament preparations.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-50 border border-zinc-200/60 space-y-3">
              <div className="size-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center shadow-xs">
                <ClockCircleLinear size={18} className="text-[#b45309]" />
              </div>
              <h3 className="text-base font-bold text-[#121212]">Lead Times &amp; SA Freight</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Stock available for direct demonstration across metropolitan Adelaide and regional South Australia clubs, schools, and councils.
              </p>
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INQUIRY FORM
           ========================================================================= */}
        <section id="inquiry" className="bg-[#1c1c1c] text-white rounded-2xl p-8 sm:p-12 border border-zinc-800 shadow-xl mb-14 sm:mb-20">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#f8dc6c] block mb-2">
              DIRECT FLEET CONSULTATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Request a quote or demonstration for {item.name}.
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-2.5 leading-relaxed">
              Trent Kelly conducts on-site equipment audits and tailored procurement consultations for clubs, schools, and councils across South Australia.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-xl bg-white/10 border border-white/20 text-center max-w-lg">
              <CheckCircleBold size={40} className="text-emerald-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">Inquiry Sent to Trent Kelly</h3>
              <p className="text-xs text-stone-300 mt-2">
                Thank you. Trent will review your venue details and respond with full commercial specifications and demonstration windows within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl"
            >
              <input
                type="text"
                required
                placeholder="Full Name"
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder:text-stone-400 focus:outline-none focus:border-[#f8dc6c]"
              />
              <input
                type="text"
                required
                placeholder="Cricket Club / School / Council"
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder:text-stone-400 focus:outline-none focus:border-[#f8dc6c]"
              />
              <input
                type="email"
                required
                placeholder="Email Address"
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder:text-stone-400 focus:outline-none focus:border-[#f8dc6c]"
              />
              <input
                type="tel"
                placeholder="Phone Number (Optional)"
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder:text-stone-400 focus:outline-none focus:border-[#f8dc6c]"
              />
              <textarea
                rows={3}
                placeholder="Venue notes, square size (e.g. 8 pitches), turf species, or target delivery timeline..."
                className="sm:col-span-2 bg-white/10 border border-white/20 rounded-xl p-3 text-xs text-white placeholder:text-stone-400 focus:outline-none focus:border-[#f8dc6c] resize-none"
              />
              <button
                type="submit"
                className="sm:col-span-2 inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-[#f8dc6c] hover:bg-[#ffdc50] text-[#121212] font-semibold text-xs sm:text-sm transition cursor-pointer shadow-md"
              >
                <span>Submit Technical Demonstration Inquiry</span>
                <ArrowRightLinear size={16} color="#000000" />
              </button>
            </form>
          )}
        </section>

        {/* =========================================================================
            SECTION 5: MORE PIECES
           ========================================================================= */}
        <section className="mb-14 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-zinc-200/60">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#71717a] block mb-1">
                COMPLEMENTING CURATORIAL FLEET
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#121212] tracking-tight">
                More equipment for championship wickets
              </h3>
            </div>

            <Link
              href="/machinery"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 hover:text-black transition"
            >
              <span>View All 8 Models</span>
              <ArrowRightLinear size={14} color="#000000" />
            </Link>
          </div>

          {/* 3 Related Cards Matching Exact Collection Card Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {relatedItems.map((rel) => (
              <div
                key={rel.slug}
                onClick={() => router.push(`/machinery/${rel.slug}`)}
                className="group relative bg-white rounded-2xl p-4 sm:p-5 pb-5 border border-zinc-200/60 card-soft-shadow hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Image Well */}
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 mb-4.5">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3.5 left-3.5 backdrop-blur-md bg-white/95 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                      <span className="size-1.5 rounded-full bg-[#f8dc6c]" />
                      <span className="text-[10px] font-mono tracking-widest text-[#121212] uppercase font-bold">
                        {rel.badge}
                      </span>
                    </div>
                    <div className="absolute top-3.5 right-3.5 backdrop-blur-md bg-black/75 px-2.5 py-1 rounded-full">
                      <span className="text-[10px] font-mono text-[#ffdc50] font-bold">
                        {rel.modelCode}
                      </span>
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <div className="px-1">
                    <Link
                      href={`/machinery/${rel.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="block"
                    >
                      <h4 className="font-bold text-lg sm:text-xl text-[#121212] group-hover:text-black transition-colors line-clamp-1">
                        {rel.name}
                      </h4>
                    </Link>
                    <p className="text-xs sm:text-[13px] text-[#71717a] mt-1.5 leading-relaxed line-clamp-2">
                      {rel.shortDescription}
                    </p>

                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {rel.specs.slice(0, 2).map((s) => (
                        <span
                          key={s.label}
                          className="text-[11px] font-mono bg-zinc-50 border border-zinc-200/50 px-2.5 py-0.5 rounded-md text-zinc-600"
                        >
                          <strong className="text-zinc-900">{s.label}:</strong> {s.value}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Row with "See more" Button */}
                <div className="mt-5 pt-3.5 border-t border-zinc-100 flex items-center justify-between px-1">
                  <span className="text-xs font-semibold text-zinc-800">
                    POA Quote
                  </span>

                  <Link
                    href={`/machinery/${rel.slug}`}
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
            ))}
          </div>
        </section>

      </main>

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
