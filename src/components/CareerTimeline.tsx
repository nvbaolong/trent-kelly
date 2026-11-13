"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDownLinear } from "solar-icon-set";

interface Milestone {
  year: string;
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
    role: "Apprentice Greenkeeper",
    company: "Glenelg Golf Club",
    location: "Adelaide, SA",
    description: "First turf job at 15 — learning to cut, roll and water championship greens.",
    image: "/images/timeline/01-glenelg-greenkeeper.jpg",
  },
  {
    year: "1999 – 2007",
    role: "Ground Staff & Head Curator",
    company: "Adelaide Oval · West Torrens DCC",
    location: "Adelaide, SA",
    description: "Pitch craft learned under Adelaide Oval legend Les Burdett OAM.",
    image: "/images/timeline/02-adelaide-oval-groundstaff.jpg",
  },
  {
    year: "2002 – 2011",
    role: "Right-arm Fast Bowler",
    company: "South Australia · Western Australia",
    location: "First-Class & List A",
    description: "8 first-class and 7 List A matches — reading pitches from the bowling crease.",
    image: "/images/timeline/03-fast-bowler.jpg",
  },
  {
    year: "2005 – 2009",
    role: "Head Curator · Curator",
    company: "NT Cricket · Claremont Nedlands CC",
    location: "Darwin, NT · Perth, WA",
    description: "Tropical wickets in Darwin, then club and country-club turf across Perth.",
    image: "/images/timeline/04-darwin-perth-curator.png",
  },
  {
    year: "2009",
    role: "Founder & Director",
    company: "TK Turf Services",
    location: "Adelaide, SA",
    description: "Independent consultancy for elite pitches, ovals and multi-sport renovations.",
    image: "/images/timeline/05-tk-turf-services.jpg",
  },
  {
    year: "2012",
    role: "South Australian Distributor",
    company: "MowMaster Turf Equipment",
    location: "South Australia",
    description: "Matching cylinder mowers, renovators and rollers to every venue's needs.",
    image: "/images/timeline/06-mowmaster-equipment.jpg",
  },
  {
    year: "2014 – 2015",
    role: "Assistant Coach",
    company: "South Australia Under-19s",
    location: "U19 National Championships",
    description: "Passing a first-class bowler's eye on to the state's next generation.",
    image: "/images/timeline/07-u19-coaching.png",
  },
  {
    year: "2014 – 2017",
    role: "Event & Consultant Curator",
    company: "Cricket Australia · Cricket Victoria",
    location: "National & State",
    description: "Event surfaces and turf advisory, including Alice Springs Town Council.",
    image: "/images/timeline/08-event-curator.png",
  },
];

export default function CareerTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const distanceRef = useRef(0);
  const [sectionHeight, setSectionHeight] = useState<number | null>(null);
  const [active, setActive] = useState(0);

  const last = MILESTONES.length - 1;
  const SCROLL_FACTOR = 1.25; // vertical px scrolled per horizontal px moved

  // Measure horizontal travel distance and size the section accordingly
  useEffect(() => {
    const measure = () => {
      const row = rowRef.current;
      const sticky = stickyRef.current;
      if (!row || !sticky) return;
      const distance = Math.max(0, row.scrollWidth - sticky.clientWidth);
      distanceRef.current = distance;
      setSectionHeight(window.innerHeight + distance * SCROLL_FACTOR);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (rowRef.current) ro.observe(rowRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Map vertical scroll progress -> horizontal translation
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const section = sectionRef.current;
      const row = rowRef.current;
      if (!section || !row) return;
      const total = section.offsetHeight - window.innerHeight;
      const rect = section.getBoundingClientRect();
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      row.style.transform = `translate3d(${-p * distanceRef.current}px, 0, 0)`;
      if (progressRef.current) progressRef.current.style.width = `${p * 100}%`;
      setActive(Math.round(p * last));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [last, sectionHeight]);

  const goTo = useCallback(
    (idx: number) => {
      const section = sectionRef.current;
      if (!section) return;
      const total = section.offsetHeight - window.innerHeight;
      const top = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + (idx / last) * total, behavior: "smooth" });
    },
    [last]
  );

  const continueToNext = () => {
    document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="career"
      ref={sectionRef}
      className="relative w-full"
      style={{ height: sectionHeight ? `${sectionHeight}px` : "300vh" }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center gap-6 sm:gap-8 py-8"
      >
        {/* Header */}
        <div className="px-6 sm:px-10 lg:px-14 xl:px-20">
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
        </div>

        {/* Timeline Track */}
        <div className="px-6 sm:px-10 lg:px-14 xl:px-20">
          <div className="relative pt-1 pb-7">
            <div className="absolute left-0 right-0 top-[9px] h-px bg-zinc-300/70" />
            <div
              ref={progressRef}
              className="absolute left-0 top-[8px] h-[3px] rounded-full bg-[#121212]"
              style={{ width: "0%" }}
            />
            <div className="relative flex justify-between">
              {MILESTONES.map((m, i) => {
                const isActive = i === active;
                const isPast = i < active;
                return (
                  <button
                    key={m.year + m.role}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to ${m.year}`}
                    className="relative flex flex-col items-center group cursor-pointer"
                  >
                    <span
                      className={`rounded-full border transition-all duration-300 ${
                        isActive
                          ? "size-[18px] bg-[#f8dc6c] border-[#121212] border-2"
                          : isPast
                          ? "size-[11px] mt-[3.5px] bg-[#121212] border-[#121212]"
                          : "size-[11px] mt-[3.5px] bg-[#f4f4f5] border-zinc-400 group-hover:border-black"
                      }`}
                    />
                    <span
                      className={`absolute top-6 text-[10px] sm:text-[11px] font-mono tracking-wide whitespace-nowrap transition-colors ${
                        isActive ? "text-black font-bold" : "text-zinc-500 group-hover:text-black"
                      } ${i === 0 ? "left-0" : i === last ? "right-0" : "left-1/2 -translate-x-1/2"} ${
                        isActive ? "" : "hidden lg:block"
                      }`}
                    >
                      {m.year}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cards Row (translated horizontally by vertical scroll) */}
        <div className="w-full">
          <div
            ref={rowRef}
            className="flex w-max gap-5 sm:gap-6 px-6 sm:px-10 lg:px-14 xl:px-20 will-change-transform"
          >
            {MILESTONES.map((m, i) => (
              <div
                key={m.year + m.role}
                className={`shrink-0 w-[84vw] sm:w-[600px] lg:w-[760px] bg-white rounded-2xl border border-zinc-200/60 p-3 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 transition-opacity duration-300 ${
                  i === active ? "opacity-100" : "opacity-70"
                }`}
              >
                {/* Image */}
                <div className="relative rounded-xl overflow-hidden bg-zinc-100 h-[170px] sm:h-[240px] md:h-full md:min-h-[300px]">
                  <img
                    src={m.image}
                    alt={`${m.role} — ${m.company}`}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between gap-5 py-1 sm:py-2 pr-1 sm:pr-2">
                  <div>
                    <span className="block font-bold text-2xl sm:text-3xl tracking-tight text-[#121212] leading-none">
                      {m.year}
                    </span>
                    <p className="mt-3 text-sm sm:text-base italic text-[#3f3f46] leading-relaxed">
                      {m.description}
                    </p>
                  </div>

                  <dl className="divide-y divide-zinc-200/70 border-t border-zinc-200/70 text-xs sm:text-sm">
                    <div className="flex items-center justify-between gap-4 py-2.5 sm:py-3">
                      <dt className="text-zinc-500">Role</dt>
                      <dd className="font-semibold text-[#121212] text-right">{m.role}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 py-2.5 sm:py-3">
                      <dt className="text-zinc-500">Organisation</dt>
                      <dd className="font-semibold text-[#121212] text-right">{m.company}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 py-2.5 sm:py-3">
                      <dt className="text-zinc-500">Location</dt>
                      <dd className="font-semibold text-[#121212] text-right">{m.location}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Centered Skip Action */}
        <div className="flex justify-center w-full px-6 pt-1">
          <button
            type="button"
            onClick={continueToNext}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-black underline-offset-4 hover:underline transition-colors cursor-pointer group"
          >
            <span>Skip</span>
            <ArrowDownLinear size={13} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
