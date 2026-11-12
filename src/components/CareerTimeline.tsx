"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeftLinear, ArrowRightLinear } from "solar-icon-set";

interface Milestone {
  year: string;
  tag: string;
  role: string;
  company: string;
  location: string;
  description: string;
  image: string;
}

// Sources: Wikipedia "Trent Kelly (cricketer)" (b. 1984, SA & WA first-class 2004–11,
// List A 2002–08, SA U19 assistant coach 2014–15, retired Oct 2015) + TK Turf Services brief.
const MILESTONES: Milestone[] = [
  {
    year: "1999",
    tag: "Turf",
    role: "Apprentice Greenkeeper",
    company: "Glenelg Golf Club",
    location: "Adelaide, SA",
    description: "First turf job at 15 — learning to cut, roll and water championship greens.",
    image: "/images/timeline/01-glenelg-greenkeeper.jpg",
  },
  {
    year: "1999–07",
    tag: "Curator",
    role: "Ground Staff & Head Curator",
    company: "Adelaide Oval · West Torrens DCC",
    location: "Adelaide, SA",
    description: "Pitch craft learned under Adelaide Oval legend Les Burdett OAM.",
    image: "/images/timeline/02-adelaide-oval-groundstaff.jpg",
  },
  {
    year: "2002–11",
    tag: "Player",
    role: "Right-arm Fast Bowler",
    company: "South Australia · Western Australia",
    location: "First-Class & List A",
    description: "8 first-class and 7 List A matches — reading pitches from the bowling crease.",
    image: "/images/timeline/03-fast-bowler.jpg",
  },
  {
    year: "2005–09",
    tag: "Interstate",
    role: "Head Curator · Curator",
    company: "NT Cricket · Claremont Nedlands CC",
    location: "Darwin, NT · Perth, WA",
    description: "Tropical wickets in Darwin, then club and country-club turf across Perth.",
    image: "/images/timeline/04-darwin-perth-curator.png",
  },
  {
    year: "2009",
    tag: "Founder",
    role: "Founder & Director",
    company: "TK Turf Services",
    location: "Adelaide, SA",
    description: "Independent consultancy for elite pitches, ovals and multi-sport renovations.",
    image: "/images/timeline/05-tk-turf-services.jpg",
  },
  {
    year: "2012",
    tag: "Equipment",
    role: "South Australian Distributor",
    company: "MowMaster Turf Equipment",
    location: "South Australia",
    description: "Matching cylinder mowers, renovators and rollers to every venue's needs.",
    image: "/images/timeline/06-mowmaster-equipment.jpg",
  },
  {
    year: "2014–15",
    tag: "Coaching",
    role: "Assistant Coach",
    company: "South Australia Under-19s",
    location: "U19 National Championships",
    description: "Passing a first-class bowler's eye on to the state's next generation.",
    image: "/images/timeline/07-u19-coaching.png",
  },
  {
    year: "2014–17",
    tag: "Advisory",
    role: "Event & Consultant Curator",
    company: "Cricket Australia · Cricket Victoria",
    location: "National & State",
    description: "Event surfaces and turf advisory, including Alice Springs Town Council.",
    image: "/images/timeline/08-event-curator.png",
  },
];

export default function CareerTimeline() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const scrollToIndex = useCallback((idx: number) => {
    const scroller = scrollerRef.current;
    const card = cardRefs.current[idx];
    if (!scroller || !card) return;
    scroller.scrollTo({ left: card.offsetLeft - scroller.offsetLeft, behavior: "smooth" });
  }, []);

  // Track which card is closest to the left edge of the scroller
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const maxScroll = scroller.scrollWidth - scroller.clientWidth;
        if (scroller.scrollLeft >= maxScroll - 4) {
          setActive(MILESTONES.length - 1);
          return;
        }
        let best = 0;
        let bestDist = Infinity;
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const dist = Math.abs(card.offsetLeft - scroller.offsetLeft - scroller.scrollLeft);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        });
        setActive(best);
      });
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const progress = MILESTONES.length > 1 ? (active / (MILESTONES.length - 1)) * 100 : 0;

  return (
    <section id="career" className="py-12 sm:py-16 w-full overflow-hidden">
      {/* Header */}
      <div className="px-6 sm:px-10 lg:px-14 xl:px-20 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 border border-zinc-200/60 text-xs font-semibold uppercase tracking-wider w-fit">
            <span className="size-1.5 rounded-full bg-[#f8dc6c]" />
            The Journey
          </span>
          <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-black tracking-tight mt-1">
            From the crease to the curator&apos;s shed.
          </h2>
          <p className="text-sm sm:text-base text-[#52525b]">
            Over 25 years on Australian turf — as a greenkeeper, first-class fast bowler, curator and consultant.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => scrollToIndex(Math.max(0, active - 1))}
            disabled={active === 0}
            aria-label="Previous milestone"
            className="size-10 sm:size-11 rounded-full border border-zinc-200/70 bg-white hover:bg-zinc-100 flex items-center justify-center transition-all active:scale-95 shadow-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeftLinear size={18} className="text-zinc-800" />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(Math.min(MILESTONES.length - 1, active + 1))}
            disabled={active === MILESTONES.length - 1}
            aria-label="Next milestone"
            className="size-10 sm:size-11 rounded-full border border-zinc-200/70 bg-white hover:bg-zinc-100 flex items-center justify-center transition-all active:scale-95 shadow-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowRightLinear size={18} className="text-zinc-800" />
          </button>
        </div>
      </div>

      {/* Timeline Track */}
      <div className="px-6 sm:px-10 lg:px-14 xl:px-20 mb-8">
        <div className="relative pt-1 pb-7">
          <div className="absolute left-0 right-0 top-[9px] h-px bg-zinc-300/70" />
          <div
            className="absolute left-0 top-[8px] h-[3px] rounded-full bg-[#121212] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
          <div className="relative flex justify-between">
            {MILESTONES.map((m, i) => {
              const isActive = i === active;
              const isPast = i < active;
              return (
                <button
                  key={m.year + m.role}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to ${m.year}`}
                  className="relative flex flex-col items-center group cursor-pointer"
                >
                  <span
                    className={`rounded-full border transition-all duration-300 ${
                      isActive
                        ? "size-[18px] bg-[#f8dc6c] border-[#121212] border-2 shadow-[0_0_0_4px_rgba(248,220,108,0.35)]"
                        : isPast
                        ? "size-[11px] mt-[3.5px] bg-[#121212] border-[#121212]"
                        : "size-[11px] mt-[3.5px] bg-[#f4f4f5] border-zinc-400 group-hover:border-black"
                    }`}
                  />
                  <span
                    className={`absolute top-6 text-[10px] sm:text-[11px] font-mono tracking-wider whitespace-nowrap transition-colors ${
                      isActive ? "text-black font-bold" : "text-zinc-500 group-hover:text-black"
                    } ${i % 2 === 1 ? "hidden sm:block" : ""}`}
                  >
                    {m.year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cards Scroller */}
      <div
        ref={scrollerRef}
        className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none px-6 sm:px-10 lg:px-14 xl:px-20 pb-4 scroll-px-6 sm:scroll-px-10 lg:scroll-px-14 xl:scroll-px-20"
      >
        {MILESTONES.map((m, i) => (
          <div
            key={m.year + m.role}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={`snap-start shrink-0 w-[86vw] sm:w-[640px] lg:w-[820px] bg-white rounded-2xl border border-zinc-200/60 card-soft-shadow p-3 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 transition-opacity duration-300 ${
              i === active ? "opacity-100" : "opacity-80 hover:opacity-100"
            }`}
          >
            {/* Image */}
            <div className="relative rounded-xl overflow-hidden bg-zinc-100 h-[220px] sm:h-[280px] md:h-full md:min-h-[340px] group">
              <img
                src={m.image}
                alt={`${m.role} — ${m.company}`}
                loading="lazy"
                className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-3 left-3 backdrop-blur-md bg-black/40 text-white px-3 py-1 rounded-lg text-[11px] font-mono border border-white/15">
                {String(i + 1).padStart(2, "0")} / {String(MILESTONES.length).padStart(2, "0")}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between gap-6 py-1 sm:py-3 pr-1 sm:pr-3">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <span className="font-bold text-5xl sm:text-6xl tracking-tight text-[#121212] leading-none">
                    {m.year}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-200 text-[10px] font-semibold uppercase tracking-widest text-zinc-600 shrink-0 mt-1">
                    <span className="size-1.5 rounded-full bg-[#f8dc6c]" />
                    {m.tag}
                  </span>
                </div>
                <p className="mt-4 text-sm sm:text-base italic text-[#3f3f46] leading-relaxed">
                  {m.description}
                </p>
              </div>

              <dl className="divide-y divide-zinc-200/70 border-t border-zinc-200/70 text-xs sm:text-sm">
                <div className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-zinc-500">Role</dt>
                  <dd className="font-semibold text-[#121212] text-right">{m.role}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-zinc-500">Organisation</dt>
                  <dd className="font-semibold text-[#121212] text-right">{m.company}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-zinc-500">Location</dt>
                  <dd className="font-semibold text-[#121212] text-right">{m.location}</dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
        {/* Trailing spacer so the last card can snap to the start */}
        <div className="shrink-0 w-px" aria-hidden="true" />
      </div>
    </section>
  );
}
