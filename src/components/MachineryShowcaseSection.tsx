"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MACHINERY_CATALOG } from "@/data/machinery";

export default function MachineryShowcaseSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Wicket Cylinder Mowers",
    "Outfield & Surrounds Mowers",
    "Scarifiers & Renovators",
    "Rollers & Pitch Tools",
  ];

  const filtered = activeCategory === "All"
    ? MACHINERY_CATALOG
    : MACHINERY_CATALOG.filter((m) => m.category === activeCategory);

  return (
    <section id="machinery" className="w-full bg-[#f4f4f5] py-20 sm:py-28 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#e4e4e7]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#71717a] font-mono">
              AUTHORIZED SOUTH AUSTRALIAN DISTRIBUTOR • SINCE 2012
            </span>
            <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight text-[#121212]">
              MowMaster Turf Machinery
            </h2>
          </div>
          <Link
            href="/machinery"
            className="inline-flex items-center gap-2 rounded-full bg-[#121212] hover:bg-[#27272a] text-white px-6 py-3 text-xs font-semibold uppercase tracking-wider transition shadow-sm"
          >
            <span>Open Equipment Showroom</span>
            <ArrowUpRight className="h-4 w-4 text-[#f8dc6c]" />
          </Link>
        </div>

        {/* Category Pills (White pills on Light Gray background) */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                activeCategory === cat
                  ? "bg-[#121212] text-white"
                  : "bg-white text-[#71717a] hover:bg-white/80 border border-[#e4e4e7]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Machinery Cards: WHITE BACKGROUND CARDS on light gray */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.slug}
              className="bg-white rounded-[24px] border border-[#e4e4e7] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#121212] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo container */}
                <div className="relative w-full h-52 bg-[#121212] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#ffdc50] font-mono text-[10px] font-bold">
                      {item.modelCode}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f8dc6c] text-[#121212] text-[10px] font-bold">
                      POA
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-[11px] font-mono uppercase text-[#71717a] font-semibold">
                    {item.category}
                  </span>
                  <Link href={`/machinery/${item.slug}`}>
                    <h3 className="mt-1 text-lg font-bold text-[#121212] group-hover:text-[#3f3f46] transition">
                      {item.name}
                    </h3>
                  </Link>

                  <p className="mt-2.5 text-xs text-[#71717a] leading-relaxed line-clamp-3">
                    {item.shortDescription}
                  </p>

                  {/* Specs Strip */}
                  <div className="mt-5 pt-4 border-t border-[#e4e4e7] grid grid-cols-2 gap-2 text-xs font-mono">
                    {item.specs.slice(0, 2).map((s) => (
                      <div key={s.label} className="bg-[#f4f4f5] p-2.5 rounded-xl border border-[#e4e4e7]">
                        <span className="block text-[9px] text-[#71717a] uppercase">{s.label}</span>
                        <span className="font-bold text-[#121212] truncate block mt-0.5">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#e4e4e7] mt-4 flex items-center justify-between">
                <Link
                  href={`/machinery/${item.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#121212] hover:text-[#71717a] transition"
                >
                  <span>REQUEST QUOTE &amp; DEMO</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#121212]" />
                </Link>
                <span className="text-[10px] font-mono text-[#71717a]">SOUTH AUSTRALIA</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
