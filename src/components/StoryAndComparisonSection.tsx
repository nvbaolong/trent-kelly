"use client";

import React from "react";
import Image from "next/image";
import { Award, Shield } from "lucide-react";

export default function StoryAndComparisonSection() {
  return (
    <section id="about" className="w-full bg-[#f4f4f5] py-20 sm:py-28 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto">
        {/* 3 Metrics Cards (White card on Light Gray background) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-white rounded-2xl p-8 border border-[#e4e4e7] shadow-sm hover:border-[#121212] transition-colors">
            <p className="text-4xl sm:text-5xl font-bold tracking-tight text-[#121212]">
              +100
            </p>
            <p className="mt-3 text-sm text-[#71717a] leading-relaxed">
              Championship &amp; Community Pitches Prepared across Australia
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-[#e4e4e7] shadow-sm hover:border-[#121212] transition-colors">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-bold tracking-tight text-[#121212]">
                300
              </span>
              <span className="text-lg font-bold text-[#121212] bg-[#f8dc6c] px-2 py-0.5 rounded font-mono">
                CIV
              </span>
            </div>
            <p className="mt-3 text-sm text-[#71717a] leading-relaxed">
              Target Clegg Hammer Impact Value for consistent pace and true bounce
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-[#e4e4e7] shadow-sm hover:border-[#121212] transition-colors">
            <p className="text-4xl sm:text-5xl font-bold tracking-tight text-[#121212]">
              Global
            </p>
            <p className="mt-3 text-sm text-[#71717a] leading-relaxed">
              Drop-in wicket advisory &amp; pitch deployments across Australia &amp; the USA
            </p>
          </div>
        </div>

        {/* The Specialist: Trent Kelly Portrait Card + Biography (White Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Trent Kelly Photo Card (White Card) */}
          <div className="lg:col-span-5 bg-white rounded-[28px] overflow-hidden border border-[#e4e4e7] shadow-sm flex flex-col">
            <div className="relative w-full h-[380px] sm:h-[440px] bg-[#121212]">
              <Image
                src="/images/trent-kelly.png"
                alt="Trent Kelly - First-Class Cricketer and Turf Agronomist"
                fill
                priority
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-[#f8dc6c] text-[#121212] font-mono text-[11px] font-bold uppercase tracking-wider mb-2">
                  First-Class Paceman • Master Curator
                </span>
                <p className="text-xl font-bold leading-tight">
                  Trent Peter Kelly
                </p>
                <p className="text-xs text-white/80 mt-0.5">
                  South Australia &amp; Western Australia Representative
                </p>
              </div>
            </div>

            <div className="p-6 bg-white space-y-3 border-t border-[#e4e4e7]">
              <div className="flex items-center gap-3 text-xs text-[#71717a]">
                <Award className="h-4 w-4 text-[#121212]" />
                <span>Mentored by Adelaide Oval Head Curator Les Burdett (OAM)</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#71717a]">
                <Shield className="h-4 w-4 text-[#121212]" />
                <span>Director, TK Turf Services (Est. 2009)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative (White Card) */}
          <div className="lg:col-span-7 bg-white rounded-[28px] p-8 sm:p-12 border border-[#e4e4e7] shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#71717a] font-mono">
                THE SPECIALIST
              </span>
              <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight text-[#121212] leading-tight">
                Hi, I’m Trent.
              </h2>

              <div className="mt-6 space-y-4 text-base text-[#3f3f46] leading-relaxed">
                <p>
                  For over 25 years, my work has lived at the intersection of geotechnical soil science, player biomechanics, and high-stakes tournament preparation.
                </p>
                <p>
                  Having bowled at the First-Class level for South Australia and Western Australia, I understand pitch pace, bounce, seam movement, and subsurface compaction from the athlete&apos;s vantage point—translating player feedback directly into rootzone engineering.
                </p>
                <p>
                  Every strip of turf tells a story through its moisture gradient, smectite clay density, and millimeter-precise cut. Through <strong>TK Turf Services</strong> and our authorized <strong>MowMaster South Australia</strong> distribution, my goal is simple: deliver world-class curatorial precision, proven machinery, and uncompromised playability to every venue I step onto.
                </p>
              </div>
            </div>

            {/* Credential Badges */}
            <div className="pt-6 border-t border-[#e4e4e7] grid grid-cols-3 gap-3 text-center">
              <div className="p-3.5 rounded-xl bg-[#f4f4f5] border border-[#e4e4e7]">
                <span className="block text-xs font-bold text-[#121212]">A Player’s Eye</span>
                <span className="text-[11px] text-[#71717a] block mt-0.5">Athlete Intuition</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#f4f4f5] border border-[#e4e4e7]">
                <span className="block text-xs font-bold text-[#121212]">Soil Physics</span>
                <span className="text-[11px] text-[#71717a] block mt-0.5">Rootzone Science</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#f4f4f5] border border-[#e4e4e7]">
                <span className="block text-xs font-bold text-[#121212]">MowMaster SA</span>
                <span className="text-[11px] text-[#71717a] block mt-0.5">Official Equipment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
