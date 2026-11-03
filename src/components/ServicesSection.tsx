"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const PITCH_SOLUTIONS = [
  {
    title: "Tournament Consulting",
    tagline: "Global Board & Stadium Management",
    desc: "On-site preparation and clay moisture calibration for global cricket boards, franchise tournaments, and multi-week match windows.",
    image: "/images/pitch-tournament.png",
    aspect: "col-span-1 md:col-span-2 lg:col-span-2",
  },
  {
    title: "Geotechnical Moisture Testing",
    tagline: "Clegg Impact & TDR Sensor Probes",
    desc: "Scientific moisture profiling down to 150mm clay depths to deliver true 300 CIV pace and eliminate two-paced bounce.",
    image: "/images/pitch-close.png",
    aspect: "col-span-1",
  },
  {
    title: "Bowler Biomechanics & Seam Grip",
    tagline: "3mm–6mm Canopy Geometry",
    desc: "Precision Couchgrass (Cynodon dactylon) grooming designed to maximize seam carry and eliminate early-day dust out.",
    image: "/images/bowler-action.png",
    aspect: "col-span-1",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="w-full bg-[#f4f4f5] py-20 sm:py-28 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-[#e4e4e7]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#71717a] font-mono">
              STADIUM QUALITY FOR EVERY PITCH
            </span>
            <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight text-[#121212]">
              Tailored Pitch Solutions
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#71717a]">
            Complete turf agronomy solutions from world-stage tournaments to local community and school grounds.
          </p>
        </div>

        {/* 3 Visual Grid Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PITCH_SOLUTIONS.map((sol) => (
            <div
              key={sol.title}
              className={`group relative rounded-[24px] overflow-hidden border border-[#e4e4e7] min-h-[380px] flex flex-col justify-end p-6 ${sol.aspect} shadow-sm hover:shadow-xl transition-all duration-300 bg-[#121212]`}
            >
              <Image
                src={sol.image}
                alt={sol.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

              <div className="relative z-10 text-white space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-[#f8dc6c] text-[#121212] font-mono text-[10px] font-bold uppercase tracking-wider">
                  {sol.tagline}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold leading-tight">
                  {sol.title}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed max-w-md line-clamp-3">
                  {sol.desc}
                </p>
                <div className="pt-2">
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ffdc50] hover:underline"
                  >
                    <span>BOOK CONSULTING</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
