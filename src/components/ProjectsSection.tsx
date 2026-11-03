"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    title: "Trent Kelly Cricket Ground",
    year: "2026",
    category: "Championship Oval Square",
    image: "/images/stadium-1.png",
  },
  {
    title: "Willow Creek Stadium",
    year: "2025",
    category: "First-Class Wicket Block",
    image: "/images/stadium-2.png",
  },
  {
    title: "Boundary Ridge Arena",
    year: "2025",
    category: "Drop-In Tray Installation",
    image: "/images/cricket-ball.png",
  },
  {
    title: "Emerald Bay Cricket Club",
    year: "2024",
    category: "Community Square Renovation",
    image: "/images/match-action.png",
  },
  {
    title: "Victory Park Cricket Field",
    year: "2024",
    category: "Winter-to-Summer Transition",
    image: "/images/oval-crowd.png",
  },
  {
    title: "Sunset View Cricket Grounds",
    year: "2024",
    category: "Multi-Oval Facility Audit",
    image: "/images/batsman-crease.png",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full bg-[#f4f4f5] py-20 sm:py-28 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#e4e4e7]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#71717a] font-mono">
              PROVEN TRACK RECORD
            </span>
            <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight text-[#121212]">
              Surfaces Prepared Worldwide.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#71717a]">
            A proven curatorial track record spanning premier international stadiums to local South Australian community ovals.
          </p>
        </div>

        {/* 2-Column Grid (WHITE CARD on Light Gray Background) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((proj) => (
            <div
              key={proj.title}
              className="group bg-white rounded-[24px] overflow-hidden border border-[#e4e4e7] shadow-sm hover:shadow-xl hover:border-[#121212] transition-all duration-300"
            >
              <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-[#121212]">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white font-mono text-xs font-bold">
                    {proj.year}
                  </span>
                </div>
              </div>

              <div className="p-6 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-[#71717a] uppercase font-semibold">
                    {proj.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#121212] group-hover:text-[#3f3f46] transition mt-0.5">
                    {proj.title}
                  </h3>
                </div>

                <div className="h-9 w-9 rounded-full bg-[#f4f4f5] border border-[#e4e4e7] flex items-center justify-center text-[#121212] group-hover:bg-[#f8dc6c] transition shadow-sm">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
