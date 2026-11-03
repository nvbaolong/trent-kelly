"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Thermometer, Droplets, Activity, Check } from "lucide-react";

const PITCH_LAYERS = [
  {
    id: 0,
    code: "LAYER 01",
    depth: "0 – 6 mm Above Crown",
    title: "The Surface Canopy",
    subtitle: "Couchgrass (Cynodon dactylon) Sward",
    description:
      "Couchgrass (Cynodon dactylon) managed at precise cutting heights (3mm–6mm). Requires soil temperatures >20°C for lateral stolon growth, providing seam grip and preventing early surface dusting.",
    specs: [
      { label: "Cutting Height", value: "3.0 mm – 6.0 mm" },
      { label: "Soil Temp Threshold", value: "> 20°C Active Stolons" },
      { label: "Primary Function", value: "Seam Movement & Surface Binding" },
    ],
    color: "#5DC39B",
    bgClass: "from-[#14452F] to-[#216847]",
  },
  {
    id: 1,
    code: "LAYER 02",
    depth: "0 – 45 mm Depth",
    title: "The Upper Clay Crust",
    subtitle: "High-Smectite Cracking Black Clay Profile",
    description:
      "High-smectite cracking black clay profile. Engineered through controlled rolling and moisture evaporation to deliver uniform pace, true bounce, and controlled Day 3–4 wear.",
    specs: [
      { label: "Mineralogy", value: "High-Smectite Black Cracking Clay" },
      { label: "Compaction Target", value: "Staged Moisture-Window Rolling" },
      { label: "Primary Function", value: "True Pace, Carry & Day 3–4 Wear" },
    ],
    color: "#8B5A2B",
    bgClass: "from-[#3B2818] to-[#593A20]",
  },
  {
    id: 2,
    code: "LAYER 03",
    depth: "45 – 125 mm Depth",
    title: "The Rootzone Matrix",
    subtitle: "Fibrous Tensile Soil Reinforcement",
    description:
      "Dense, fibrous root architecture binding the clay profile together—preventing horizontal shearing (layering) and ensuring consistent energy transfer upon ball impact.",
    specs: [
      { label: "Root Architecture", value: "Deep Fibrous Vertical Binding" },
      { label: "Failure Prevention", value: "Eliminates Horizontal Layering" },
      { label: "Primary Function", value: "Kinetic Energy Transfer on Impact" },
    ],
    color: "#C88A4B",
    bgClass: "from-[#29221C] to-[#3D3127]",
  },
  {
    id: 3,
    code: "LAYER 04",
    depth: "125 – 300+ mm Depth",
    title: "Sub-Base & Drainage",
    subtitle: "Engineered Aggregate Foundation",
    description:
      "Engineered aggregate foundation regulating perched water tables, capillary moisture draw, and rapid recovery after heavy rainfall or winter football usage.",
    specs: [
      { label: "Aggregate Profile", value: "Graded Crushed Basalt / Gravel" },
      { label: "Hydrology", value: "Capillary Break & Perched Table Control" },
      { label: "Primary Function", value: "Rapid Post-Rain & Winter Recovery" },
    ],
    color: "#8C2D19",
    bgClass: "from-[#1F2422] to-[#2E3532]",
  },
];

export default function AnatomyLabSection() {
  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <section
      id="agronomy"
      className="relative w-full bg-[#181C1A] text-[#F9FAF9] px-5 sm:px-10 lg:px-20 py-24 sm:py-32 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute top-0 left-1/3 h-96 w-96 rounded-full bg-[#14452F]/35 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[#8B5A2B]/20 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header (Modeled on Kora "How we work" Intro) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-14 border-b border-white/10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#5DC39B]/15 border border-[#5DC39B]/30 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#5DC39B]">
              The 22-Yard Agronomy Lab
            </span>
            <h2 className="mt-5 text-4xl sm:text-6xl font-bold tracking-[-0.035em] leading-[1.06]">
              Anatomy of the{" "}
              <span className="font-serif italic font-normal text-[#5DC39B]">
                22 Yards.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#F9FAF9]/75 leading-relaxed">
            Click through the 4 subterranean strata of a championship cricket
            wicket to see how surface canopy physiology and deep clay physics
            interact on ball impact.
          </p>
        </div>

        {/* Interactive Split Layout: Left 3D/Cross-Section Visual Stack + Right Kora Process Accordion */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* LEFT (5 Cols): Interactive Subterranean Pitch Core Cross-Section */}
          <div className="lg:col-span-5 rounded-[32px] bg-white/[0.04] border border-white/10 p-6 sm:p-8">
            <div className="flex items-center justify-between text-xs font-mono text-[#F9FAF9]/70 mb-5">
              <span>SUBTERRANEAN CORE PROFILE</span>
              <span className="text-[#5DC39B]">CLICK LAYER TO INSPECT</span>
            </div>

            {/* 4 Interactive Strata Layers */}
            <div className="space-y-3">
              {PITCH_LAYERS.map((layer, index) => {
                const isSelected = activeLayer === index;
                return (
                  <button
                    key={layer.code}
                    type="button"
                    onClick={() => setActiveLayer(index)}
                    className={`w-full text-left rounded-2xl p-4 sm:p-5 transition-all duration-300 border relative overflow-hidden ${
                      isSelected
                        ? `bg-gradient-to-r ${layer.bgClass} border-[#5DC39B] scale-[1.02] shadow-[0_12px_35px_rgba(0,0,0,0.45)]`
                        : "bg-white/[0.03] border-white/10 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="font-mono text-xs font-bold tracking-wider"
                        style={{ color: layer.color }}
                      >
                        {layer.code} • {layer.depth}
                      </span>
                      {isSelected && (
                        <span className="rounded-full bg-[#5DC39B] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#181C1A]">
                          ACTIVE STRATUM
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-base sm:text-lg font-bold text-white">
                      {layer.title}
                    </p>
                    <p className="text-xs text-[#F9FAF9]/70 mt-0.5">
                      {layer.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Telemetry Footer inside Left Panel */}
            <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-white/[0.03] p-3">
                <p className="font-mono text-sm sm:text-base font-bold text-[#5DC39B]">
                  3–6mm
                </p>
                <p className="text-[10px] font-mono text-[#F9FAF9]/60 mt-0.5">
                  CANOPY CUT
                </p>
              </div>
              <div className="rounded-xl bg-white/[0.03] p-3">
                <p className="font-mono text-sm sm:text-base font-bold text-[#F5F5E9]">
                  &gt;20°C
                </p>
                <p className="text-[10px] font-mono text-[#F9FAF9]/60 mt-0.5">
                  SOIL TEMP
                </p>
              </div>
              <div className="rounded-xl bg-white/[0.03] p-3">
                <p className="font-mono text-sm sm:text-base font-bold text-[#8B5A2B]">
                  20.12m
                </p>
                <p className="text-[10px] font-mono text-[#F9FAF9]/60 mt-0.5">
                  22-YD STRIP
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT (7 Cols): Kora Process Accordion Cards */}
          <div className="lg:col-span-7 space-y-4">
            {PITCH_LAYERS.map((layer, index) => {
              const isOpen = activeLayer === index;
              return (
                <div
                  key={layer.code}
                  onClick={() => setActiveLayer(index)}
                  className={`cursor-pointer rounded-[28px] transition-all duration-300 border p-6 sm:p-8 ${
                    isOpen
                      ? "bg-[#F5F5E9] text-[#181C1A] border-[#F5F5E9] shadow-2xl"
                      : "bg-white/[0.04] text-[#F9FAF9] border-white/10 hover:bg-white/[0.07]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full font-mono text-xs font-bold ${
                          isOpen
                            ? "bg-[#14452F] text-[#F9FAF9]"
                            : "bg-white/10 text-[#5DC39B]"
                        }`}
                      >
                        0{index + 1}
                      </span>
                      <div>
                        <span
                          className={`font-mono text-[11px] uppercase tracking-wider ${
                            isOpen ? "text-[#8B5A2B]" : "text-[#5DC39B]"
                          }`}
                        >
                          {layer.code} — {layer.depth}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                          {layer.title}
                        </h3>
                      </div>
                    </div>

                    {/* Phase Dots (Kora Process Dots) */}
                    <div className="hidden sm:flex items-center gap-1.5">
                      {[0, 1, 2, 3].map((dot) => (
                        <span
                          key={dot}
                          className={`h-2 w-2 rounded-full ${
                            dot <= index
                              ? isOpen
                                ? "bg-[#14452F]"
                                : "bg-[#5DC39B]"
                              : isOpen
                              ? "bg-[#181C1A]/20"
                              : "bg-white/20"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="mt-5 pt-5 border-t border-[#181C1A]/10"
                    >
                      <p className="text-sm sm:text-base text-[#3D3D3D] leading-relaxed">
                        {layer.description}
                      </p>

                      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {layer.specs.map((spec) => (
                          <div
                            key={spec.label}
                            className="rounded-2xl bg-[#FFFFFA] p-3.5 border border-[#181C1A]/8"
                          >
                            <p className="font-mono text-[10px] uppercase tracking-wider text-[#616161]">
                              {spec.label}
                            </p>
                            <p className="mt-1 font-mono text-xs sm:text-sm font-bold text-[#14452F]">
                              {spec.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

