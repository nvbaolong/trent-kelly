"use client";

import React from "react";
import { MachineryItem } from "@/data/machinery";

export default function MachineryVisual({
  item,
  size = "card",
}: {
  item: MachineryItem;
  size?: "card" | "hero";
}) {
  const diagramType = item.visualTheme?.diagramType || "cylinder-mower";
  const accent = item.visualTheme?.accent || "#f8dc6c";
  const gradient = item.visualTheme?.gradient || "from-stone-900 to-zinc-950";

  return (
    <div
      className={`relative w-full overflow-hidden bg-gradient-to-br ${gradient} ${
        size === "hero" ? "h-[340px] sm:h-[420px]" : "h-[235px]"
      } select-none`}
    >
      {/* Subtle Blueprint Grid Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient Glow */}
      <div
        className="pointer-events-none absolute -bottom-12 left-1/2 -translate-x-1/2 h-40 w-64 rounded-full blur-3xl opacity-35"
        style={{ backgroundColor: accent }}
      />

      {/* Top Metadata Strip */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#181C1A]/80 backdrop-blur-md border border-white/15 px-3 py-1 font-mono text-[10px] font-semibold tracking-wider text-[#F9FAF9]">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: accent }}
          />
          {item.modelCode}
        </span>

        <span className="rounded-full bg-white/10 backdrop-blur-md px-2.5 py-1 font-mono text-[10px] text-[#F9FAF9]/80">
          {item.badge}
        </span>
      </div>

      {/* Center Architectural Engineering Schematic SVG */}
      <div className="relative z-10 flex h-full items-center justify-center px-6 pb-8">
        {diagramType === "cylinder-wicket" && (
          <svg
            viewBox="0 0 360 180"
            className="w-full max-w-[300px] h-auto drop-shadow-[0_12px_25px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105"
            fill="none"
          >
            {/* Turf Line */}
            <line
              x1="20"
              y1="152"
              x2="340"
              y2="152"
              stroke="#5DC39B"
              strokeWidth="2"
              strokeDasharray="4 4"
              opacity="0.6"
            />
            {/* Grass Catcher Box (Front Left) */}
            <path
              d="M38 92 L112 82 L116 144 L48 144 Z"
              fill="#14452F"
              stroke="#5DC39B"
              strokeWidth="1.8"
            />
            <text
              x="56"
              y="118"
              fill="#F9FAF9"
              fontSize="9"
              fontFamily="monospace"
              letterSpacing="1"
            >
              MOWMASTER
            </text>
            {/* Main Chassis */}
            <rect
              x="122"
              y="62"
              width="115"
              height="68"
              rx="10"
              fill="#1E2622"
              stroke="#F9FAF9"
              strokeWidth="1.8"
            />
            {/* Engine Block */}
            <rect
              x="145"
              y="36"
              width="66"
              height="30"
              rx="5"
              fill="#8C2D19"
              stroke="#F9FAF9"
              strokeWidth="1.4"
            />
            <text
              x="156"
              y="55"
              fill="#F9FAF9"
              fontSize="8"
              fontFamily="monospace"
            >
              GX PRO OHV
            </text>
            {/* 11-Blade Precision Cutting Cylinder (Front Bottom) */}
            <circle
              cx="142"
              cy="132"
              r="20"
              fill="#181C1A"
              stroke="#5DC39B"
              strokeWidth="2.2"
            />
            {[0, 32, 65, 98, 130, 163, 196, 229, 261, 294, 327].map((deg) => (
              <line
                key={deg}
                x1="142"
                y1="132"
                x2={142 + 18 * Math.cos((deg * Math.PI) / 180)}
                y2={132 + 18 * Math.sin((deg * Math.PI) / 180)}
                stroke="#5DC39B"
                strokeWidth="1.3"
              />
            ))}
            {/* Rear Split Differential Roller */}
            <circle
              cx="215"
              cy="128"
              r="24"
              fill="#2B332F"
              stroke="#F9FAF9"
              strokeWidth="2.2"
            />
            <circle
              cx="215"
              cy="128"
              r="10"
              fill="#181C1A"
              stroke="#5DC39B"
              strokeWidth="1.5"
            />
            {/* Operator Handlebar */}
            <path
              d="M230 82 L310 28 M298 24 L322 34"
              stroke="#F9FAF9"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Precision Callout */}
            <text
              x="118"
              y="168"
              fill="#5DC39B"
              fontSize="9"
              fontFamily="monospace"
            >
              3.0mm – 6.0mm CLIP GEOMETRY • 11-BLADE REEL
            </text>
          </svg>
        )}

        {diagramType === "cylinder-outfield" && (
          <svg
            viewBox="0 0 360 180"
            className="w-full max-w-[300px] h-auto drop-shadow-[0_12px_25px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105"
            fill="none"
          >
            <line
              x1="20"
              y1="152"
              x2="340"
              y2="152"
              stroke="#8B5A2B"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            {/* Catcher */}
            <path
              d="M28 86 L108 76 L112 144 L36 144 Z"
              fill="#8B5A2B"
              fillOpacity="0.35"
              stroke="#F5F5E9"
              strokeWidth="1.8"
            />
            {/* Wide 30-inch Deck */}
            <rect
              x="116"
              y="56"
              width="130"
              height="74"
              rx="12"
              fill="#181C1A"
              stroke="#8B5A2B"
              strokeWidth="2.2"
            />
            <rect
              x="148"
              y="30"
              width="74"
              height="30"
              rx="6"
              fill="#14452F"
              stroke="#F9FAF9"
              strokeWidth="1.5"
            />
            <text
              x="159"
              y="49"
              fill="#F9FAF9"
              fontSize="8.5"
              fontFamily="monospace"
            >
              GM30 9.0HP
            </text>
            {/* 8-Blade Reel */}
            <circle
              cx="140"
              cy="132"
              r="20"
              fill="#181C1A"
              stroke="#5DC39B"
              strokeWidth="2"
            />
            {/* Heavy Striping Roller */}
            <circle
              cx="222"
              cy="126"
              r="26"
              fill="#2B241E"
              stroke="#F5F5E9"
              strokeWidth="2.5"
            />
            <path
              d="M240 78 L318 26"
              stroke="#F5F5E9"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <text
              x="105"
              y="168"
              fill="#F5F5E9"
              fontSize="9"
              fontFamily="monospace"
            >
              760MM SWATH • HEAVY OVAL STRIPING ROLLER
            </text>
          </svg>
        )}

        {diagramType === "scarifier" && (
          <svg
            viewBox="0 0 360 180"
            className="w-full max-w-[300px] h-auto drop-shadow-[0_12px_25px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105"
            fill="none"
          >
            {/* Soil & Thatch Layer */}
            <rect
              x="25"
              y="144"
              width="310"
              height="14"
              rx="3"
              fill="#8B5A2B"
              fillOpacity="0.4"
            />
            {/* Scarifier Housing */}
            <rect
              x="95"
              y="55"
              width="140"
              height="76"
              rx="14"
              fill="#181C1A"
              stroke="#8C2D19"
              strokeWidth="2.2"
            />
            {/* Vertical TCT Scarifying Reel */}
            <circle
              cx="165"
              cy="128"
              r="28"
              fill="#261A17"
              stroke="#F9FAF9"
              strokeWidth="2"
            />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
              (deg) => (
                <line
                  key={deg}
                  x1="165"
                  y1="128"
                  x2={165 + 31 * Math.cos((deg * Math.PI) / 180)}
                  y2={128 + 31 * Math.sin((deg * Math.PI) / 180)}
                  stroke="#5DC39B"
                  strokeWidth="2"
                />
              )
            )}
            <text
              x="115"
              y="82"
              fill="#F9FAF9"
              fontSize="9.5"
              fontFamily="monospace"
            >
              TCT VERTICUTTER REEL
            </text>
            <path
              d="M235 76 L310 28"
              stroke="#F9FAF9"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <text
              x="92"
              y="172"
              fill="#5DC39B"
              fontSize="9"
              fontFamily="monospace"
            >
              TUNGSTEN-CARBIDE STOLON &amp; THATCH GROOMING
            </text>
          </svg>
        )}

        {diagramType === "roller" && (
          <svg
            viewBox="0 0 360 180"
            className="w-full max-w-[300px] h-auto drop-shadow-[0_12px_25px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105"
            fill="none"
          >
            {/* Compacted Smectite Clay Layer */}
            <rect
              x="25"
              y="146"
              width="310"
              height="16"
              rx="3"
              fill="#8B5A2B"
              fillOpacity="0.55"
            />
            {/* Twin Seamless Compaction Drums */}
            <circle
              cx="125"
              cy="116"
              r="30"
              fill="#2B332F"
              stroke="#F9FAF9"
              strokeWidth="2.8"
            />
            <circle
              cx="125"
              cy="116"
              r="12"
              fill="#14452F"
              stroke="#5DC39B"
              strokeWidth="1.8"
            />
            <circle
              cx="235"
              cy="116"
              r="30"
              fill="#2B332F"
              stroke="#F9FAF9"
              strokeWidth="2.8"
            />
            <circle
              cx="235"
              cy="116"
              r="12"
              fill="#14452F"
              stroke="#5DC39B"
              strokeWidth="1.8"
            />
            {/* Bridge Frame */}
            <path
              d="M95 82 L265 82 L250 50 L110 50 Z"
              fill="#14452F"
              stroke="#F9FAF9"
              strokeWidth="2"
            />
            <text
              x="128"
              y="70"
              fill="#F9FAF9"
              fontSize="9.5"
              fontFamily="monospace"
            >
              HYDROSTATIC BALLAST
            </text>
            <text
              x="86"
              y="174"
              fill="#F5F5E9"
              fontSize="9"
              fontFamily="monospace"
            >
              SMECTITE CLAY COMPACTION • BEVELED DRUMS
            </text>
          </svg>
        )}

        {diagramType === "testing" && (
          <svg
            viewBox="0 0 360 180"
            className="w-full max-w-[300px] h-auto drop-shadow-[0_12px_25px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105"
            fill="none"
          >
            {/* 4 Soil Layers Cross-Section */}
            <rect
              x="45"
              y="55"
              width="150"
              height="16"
              rx="3"
              fill="#5DC39B"
              fillOpacity="0.8"
            />
            <rect
              x="45"
              y="74"
              width="150"
              height="26"
              rx="3"
              fill="#2A2421"
              stroke="#8B5A2B"
            />
            <rect
              x="45"
              y="103"
              width="150"
              height="26"
              rx="3"
              fill="#8B5A2B"
              fillOpacity="0.65"
            />
            <rect
              x="45"
              y="132"
              width="150"
              height="20"
              rx="3"
              fill="#616161"
              fillOpacity="0.5"
            />
            {/* Core Sampler & TDR Probe */}
            <rect
              x="235"
              y="38"
              width="75"
              height="112"
              rx="10"
              fill="#181C1A"
              stroke="#5DC39B"
              strokeWidth="2"
            />
            <text
              x="248"
              y="66"
              fill="#5DC39B"
              fontSize="11"
              fontFamily="monospace"
              fontWeight="bold"
            >
              24.8% VWC
            </text>
            <text
              x="248"
              y="86"
              fill="#F9FAF9"
              fontSize="9"
              fontFamily="monospace"
            >
              TEMP: 23.4°C
            </text>
            <text
              x="248"
              y="106"
              fill="#F9FAF9"
              fontSize="9"
              fontFamily="monospace"
            >
              325 GRAVITIES
            </text>
            <text
              x="248"
              y="130"
              fill="#8B5A2B"
              fontSize="8.5"
              fontFamily="monospace"
            >
              CORE: 150MM
            </text>
          </svg>
        )}
      </div>

      {/* Bottom Authorized Badge Bar */}
      <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[10px] font-mono text-[#F9FAF9]/75 border-t border-white/10 pt-2">
        <span>MOWMASTER SA DISTRIBUTOR</span>
        <span className="text-[#5DC39B]">SPECIFICATION &amp; QUOTE →</span>
      </div>
    </div>
  );
}

