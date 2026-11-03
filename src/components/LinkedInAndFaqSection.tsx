"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Star,
  Plus,
  Minus,
  Check,
  Copy,
  MessageSquare,
} from "lucide-react";

const VERIFIED_TESTIMONIALS = [
  {
    id: 0,
    quote:
      "Trent brings a rare combination that you simply cannot teach in a classroom—he has bowled at First-Class level on the country's fastest tracks and spent 25+ years mastering the soil science underneath them.",
    detail:
      "When he audited our center square and matched our ground crew with a MowMaster 11-blade wicket mower and revised rolling table, our early-season bounce and carry improved within a single preparation cycle.",
    author: "Michael Henderson",
    role: "Head Curator & Turf Manager, Premier Cricket Venue",
    badge: "Verified via LinkedIn • Peer Curator Endorsement",
  },
  {
    id: 1,
    quote:
      "Having learned directly alongside Les Burdett (OAM), Trent understands clay mineralogy and drop-in pitch behavior better than almost anyone in Australian sports turf.",
    detail:
      "His independent feasibility study and winter-to-summer transition program saved our council oval weeks of spring downtime after a heavy wet-weather football season.",
    author: "David Thornton",
    role: "Senior Sports Turf & Precinct Coordinator",
    badge: "Verified via LinkedIn • Municipal Client",
  },
  {
    id: 2,
    quote:
      "What sets Trent apart is his commitment to upskilling our school's ground staff rather than creating dependency. A year later, our 1st XI square plays like a First-Class venue.",
    detail:
      "From setting bedknife-to-reel tolerances on our MowMaster fleet to teaching our team how to log TDR moisture gradients before rolling, his mentorship is gold-standard.",
    author: "Andrew Stirling",
    role: "Director of Sport, Independent College",
    badge: "Verified via LinkedIn • School Facility Advisory",
  },
];

const RESULTS_STATS = [
  {
    value: "25+",
    suffix: "Yrs",
    label: "Hands-on elite cricket pitch curation and sports turf agronomy.",
  },
  {
    value: "500+",
    suffix: "Peers",
    label: "Curators, Turf Managers & Sports Directors in Trent's LinkedIn network.",
  },
  {
    value: "2009",
    suffix: "Est.",
    label: "Independent B2B turf consultancy via TK Turf Services.",
  },
  {
    value: "100%",
    suffix: "Tailored",
    label: "Site-specific clay physics & MowMaster SA machinery matching.",
  },
];

const LINKEDIN_FIELD_NOTES = [
  {
    tag: "Pitch Preparation & Clay Physics",
    date: "Field Note • Spring Preparation",
    title:
      "Why rolling above the plastic moisture limit causes subsurface horizontal layering—and how to read your clay crust.",
    excerpt:
      "Every fast bowler feels a layered track immediately: the ball hits the seam and dies. Here is how we balance deep winter consolidation with surface evaporation...",
    metrics: "94 Reactions • 22 Curator Comments on LinkedIn",
  },
  {
    tag: "MowMaster SA Machinery Demo",
    date: "Field Note • Equipment Geometry",
    title:
      "11-Blade vs. 10-Blade cylinder geometry on 3.5mm Couchgrass (Cynodon dactylon) wicket tables.",
    excerpt:
      "Cutting quality in the final 72 hours before Day 1 dictates moisture draw and seam presentation. On-site demonstration with club ground staff in South Australia...",
    metrics: "78 Reactions • 16 Comments on LinkedIn",
  },
  {
    tag: "ASTMA & Industry Insights",
    date: "Field Note • Winter-to-Summer Transition",
    title:
      "Accelerating spring couchgrass stolon recovery (>20°C soil temp) after heavy winter football traffic.",
    excerpt:
      "Managing multi-use ovals requires aggressive spring thatch control, deep fracture aeration, and precise thermal timing. Key takeaways from recent venue audits...",
    metrics: "112 Reactions • 31 Comments on LinkedIn",
  },
];

const FAQ_CATEGORIES = [
  "Consultancy",
  "Machinery (SA)",
  "Drop-In & Hybrid",
  "Process",
] as const;

const FAQ_ITEMS: Record<
  (typeof FAQ_CATEGORIES)[number],
  { q: string; a: string }[]
> = {
  Consultancy: [
    {
      q: "What types of venues and organizations does TK Turf Services work with?",
      a: "Established in 2009, TK Turf Services advises Premier and Grade cricket clubs, independent private schools, local government councils, regional cricket associations, and state/national sporting bodies across Australia.",
    },
    {
      q: "How does Trent's First-Class playing background change his agronomic approach?",
      a: "Having bowled at the First-Class and List A level for South Australia and Western Australia, Trent translates what athletes feel at the crease—pace, carry, seam grip, and consistent bounce—directly into empirical soil compaction, clay mineralogy, and canopy density targets.",
    },
    {
      q: "Do you provide hands-on mentoring for existing school or club ground staff?",
      a: "Yes. Rather than delivering theoretical slide decks, Trent works directly on the square alongside your curatorial team—calibrating rolling schedules, moisture testing, scarifying depths, and seasonal renovation playbooks.",
    },
  ],
  "Machinery (SA)": [
    {
      q: "Why aren't retail prices listed on the MowMaster Turf Equipment showroom?",
      a: "As the official South Australian Distributor for MowMaster Turf Equipment since 2012, every machine is configured to your venue's specific turf species, cutting width, blade count (e.g., 8, 10, or 11-blade reels), and roller setup. We provide tailored B2B facility quotes and on-site demonstrations.",
    },
    {
      q: "Can we book an on-site demonstration of MowMaster cylinder mowers or scarifiers?",
      a: "Absolutely. South Australian clubs, schools, and councils can request an on-site demonstration on their own wicket square or outfield so your staff can evaluate clip quality and handling firsthand.",
    },
  ],
  "Drop-In & Hybrid": [
    {
      q: "Do you advise on both traditional in-situ squares and portable drop-in wickets?",
      a: "Yes. Mentored by Adelaide Oval legend Les Burdett (OAM)—the pioneer of modern Australian drop-in wicket technology—Trent provides independent feasibility studies, nursery management protocols, and performance benchmarking for both drop-in and in-situ blocks.",
    },
    {
      q: "How do you manage multi-sport ovals transitioning from winter football to summer cricket?",
      a: "We design structured 6-to-8 week spring transition programs combining deep subsurface decompaction, tungsten-tipped vertical scarification, and thermal growth modeling once soil temperatures cross 20°C.",
    },
  ],
  Process: [
    {
      q: "How do we start a pitch consultation or machinery inquiry?",
      a: "Every engagement starts with a direct conversation—either via our B2B inquiry form below or a 1-click message to Trent Kelly on LinkedIn—followed by an on-site curatorial audit or equipment assessment.",
    },
  ],
};

export default function LinkedInAndFaqSection() {
  const [openTestimonial, setOpenTestimonial] = useState(0);
  const [activeFaqTab, setActiveFaqTab] =
    useState<(typeof FAQ_CATEGORIES)[number]>("Consultancy");
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("trent@tkturfservices.com.au");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      id="linkedin"
      className="relative w-full bg-[#F5F5E9] px-5 sm:px-10 lg:px-20 py-20 sm:py-28 text-[#181C1A]"
    >
      <div className="mx-auto max-w-7xl">
        {/* ================= 1. KORA FEATURED TESTIMONIAL & ACCORDION + STAT GRID ================= */}
        <div className="rounded-[36px] bg-[#181C1A] text-[#F9FAF9] p-7 sm:p-12 lg:p-16 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-white/10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#5DC39B]/15 border border-[#5DC39B]/30 px-4 py-1.5 font-mono text-xs font-semibold text-[#5DC39B]">
                Verified via LinkedIn • Peer Authority
              </span>
              <h2 className="mt-4 text-3xl sm:text-5xl font-bold tracking-[-0.03em]">
                Endorsed by Australia&apos;s{" "}
                <span className="font-serif italic font-normal text-[#5DC39B]">
                  Head Curators &amp; Directors.
                </span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[#5DC39B] text-[#5DC39B]"
                  />
                ))}
              </div>
              <span className="font-mono text-xs text-[#F9FAF9]/80">
                500+ Industry Connections on LinkedIn
              </span>
            </div>
          </div>

          {/* Expandable Peer Recommendations (Kora "More testimonials" Accordion) */}
          <div className="mt-10 space-y-4">
            {VERIFIED_TESTIMONIALS.map((item, idx) => {
              const isOpen = openTestimonial === idx;
              return (
                <div
                  key={item.author}
                  onClick={() => setOpenTestimonial(idx)}
                  className={`cursor-pointer rounded-[28px] p-6 sm:p-8 transition-all border ${
                    isOpen
                      ? "bg-[#F5F5E9] text-[#181C1A] border-[#F5F5E9]"
                      : "bg-white/[0.04] text-[#F9FAF9] border-white/10 hover:bg-white/[0.07]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 max-w-4xl">
                      <span
                        className={`inline-block font-mono text-[11px] font-semibold uppercase tracking-wider ${
                          isOpen ? "text-[#14452F]" : "text-[#5DC39B]"
                        }`}
                      >
                        {item.badge}
                      </span>
                      <p className="text-lg sm:text-2xl font-semibold tracking-tight leading-snug">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label="Toggle recommendation"
                      className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        isOpen
                          ? "bg-[#181C1A] text-white"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {isOpen && (
                    <div className="mt-5 pt-5 border-t border-[#181C1A]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <p className="text-sm sm:text-[15px] text-[#3D3D3D] max-w-3xl leading-relaxed">
                        {item.detail}
                      </p>
                      <div className="shrink-0 sm:text-right">
                        <p className="font-bold text-sm text-[#181C1A]">
                          {item.author}
                        </p>
                        <p className="font-mono text-xs text-[#8B5A2B]">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Kora 4-Column Stat Grid (Results) */}
          <div className="mt-12 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESULTS_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white/[0.04] border border-white/10 p-6"
              >
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono text-4xl sm:text-5xl font-bold text-[#F9FAF9]">
                    {stat.value}
                  </span>
                  <span className="font-mono text-lg font-semibold text-[#5DC39B]">
                    {stat.suffix}
                  </span>
                </div>
                <p className="mt-3 text-xs sm:text-sm text-[#F9FAF9]/75 leading-relaxed">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 2. 'FIELD NOTES FROM LINKEDIN' 3-CARD FEED (KORA INSIGHTS) ================= */}
        <div className="mt-24 sm:mt-32">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#14452F] font-semibold">
                THOUGHT LEADERSHIP &amp; CURATORIAL DISPATCHES
              </span>
              <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-[#181C1A]">
                Field Notes from{" "}
                <span className="font-serif italic font-normal text-[#14452F]">
                  LinkedIn.
                </span>
              </h2>
            </div>

            <a
              href="https://www.linkedin.com/in/trent-kelly"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#181C1A] hover:bg-[#14452F] px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#F9FAF9] transition-colors"
            >
              <span>Follow Trent on LinkedIn (500+)</span>
              <ArrowUpRight className="h-4 w-4 text-[#5DC39B]" />
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {LINKEDIN_FIELD_NOTES.map((post, idx) => (
              <motion.a
                key={post.title}
                href="https://www.linkedin.com/in/trent-kelly"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group rounded-[30px] bg-[#FFFFFA] border border-[#181C1A]/10 p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-[#14452F]/10 px-3 py-1 font-mono text-[11px] font-semibold text-[#14452F]">
                      {post.tag}
                    </span>
                    <span className="font-mono text-[11px] text-[#616161]">
                      {post.date}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg sm:text-xl font-bold text-[#181C1A] group-hover:text-[#14452F] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-[#3D3D3D] leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#181C1A]/10 flex items-center justify-between text-xs font-mono text-[#8B5A2B]">
                  <span>{post.metrics}</span>
                  <ArrowUpRight className="h-4 w-4 text-[#14452F] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* ================= 3. KORA CATEGORIZED FAQ SECTION ================= */}
        <div className="mt-24 sm:mt-32 rounded-[36px] bg-[#FFFFFA] border border-[#181C1A]/10 p-7 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Title + Category Filter Pills */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#8B5A2B] font-semibold">
                  TECHNICAL &amp; ADVISORY FAQ
                </span>
                <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-[#181C1A]">
                  Frequently Asked{" "}
                  <span className="font-serif italic font-normal text-[#14452F]">
                    Questions.
                  </span>
                </h2>

                <div className="mt-8 flex flex-wrap gap-2">
                  {FAQ_CATEGORIES.map((cat) => {
                    const active = activeFaqTab === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setActiveFaqTab(cat);
                          setOpenFaqIndex(0);
                        }}
                        className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                          active
                            ? "bg-[#181C1A] text-[#F9FAF9]"
                            : "bg-[#F5F5E9] text-[#3D3D3D] hover:bg-[#EAEAD8]"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Kora Copy-Email Quick Box */}
              <div className="mt-10 rounded-2xl bg-[#F5F5E9] p-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-[#616161]">
                    Direct agronomic or machinery question?
                  </p>
                  <p className="font-mono text-xs sm:text-sm font-bold text-[#181C1A] mt-0.5">
                    trent@tkturfservices.com.au
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#181C1A] text-white px-4 py-2 text-xs font-mono font-semibold hover:bg-[#14452F] transition"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#5DC39B]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[#5DC39B]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Expandable FAQ Items */}
            <div className="lg:col-span-7 space-y-3.5">
              {FAQ_ITEMS[activeFaqTab].map((faq, i) => {
                const open = openFaqIndex === i;
                return (
                  <div
                    key={faq.q}
                    onClick={() => setOpenFaqIndex(open ? -1 : i)}
                    className={`cursor-pointer rounded-3xl p-6 transition-all border ${
                      open
                        ? "bg-[#F5F5E9] border-[#181C1A]/15"
                        : "bg-[#FFFFFA] border-[#181C1A]/10 hover:bg-[#F5F5E9]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-base sm:text-lg font-bold text-[#181C1A]">
                        {faq.q}
                      </h3>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#181C1A]/10 text-[#181C1A]">
                        {open ? (
                          <Minus className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </span>
                    </div>
                    {open && (
                      <p className="mt-3 pt-3 border-t border-[#181C1A]/10 text-sm sm:text-[15px] text-[#3D3D3D] leading-relaxed">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

