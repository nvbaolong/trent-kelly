"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Play, Pause, Star } from "lucide-react";

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-full p-3 sm:p-5">
      <section className="relative w-full min-h-[90vh] lg:min-h-[94vh] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#121212] text-white flex flex-col justify-between shadow-2xl">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            src="/sequence-01.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-[#121212]/85 pointer-events-none" />
        </div>

        {/* Floating Navbar */}
        <header className="relative z-30 w-full px-5 sm:px-12 pt-6 sm:pt-8 flex items-center justify-between">
          <div className="flex items-center gap-6 h-[54px] px-5 sm:px-7 rounded-full bg-[#1c1c1c]/80 backdrop-blur-xl border border-white/10 shadow-lg">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-[#f8dc6c] text-[#121212] flex items-center justify-center font-bold text-xs tracking-wider">
                TK
              </div>
              <span className="font-bold tracking-tight text-sm uppercase text-white">
                Trent Kelly
              </span>
            </Link>

            <span className="hidden md:block h-4 w-[1px] bg-white/20" />

            <nav className="hidden md:flex items-center gap-6 text-[13px] text-white/80">
              <Link href="#about" className="hover:text-[#ffdc50] transition">
                The Specialist
              </Link>
              <Link href="#services" className="hover:text-[#ffdc50] transition">
                Services
              </Link>
              <Link href="#machinery" className="hover:text-[#ffdc50] transition">
                Machinery (SA)
              </Link>
              <Link href="#projects" className="hover:text-[#ffdc50] transition">
                Projects
              </Link>
              <Link href="#contact" className="hover:text-[#ffdc50] transition">
                Contact
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleVideo}
              title={isPlaying ? "Pause Video" : "Play Video"}
              className="hidden sm:flex h-[50px] px-4 items-center gap-2 rounded-full bg-[#1c1c1c]/70 backdrop-blur-md border border-white/10 text-xs text-white/80 hover:text-white transition"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5 text-[#f8dc6c]" /> : <Play className="h-3.5 w-3.5 text-[#f8dc6c]" />}
              <span className="font-mono">PITCH REEL</span>
            </button>

            <Link
              href="#contact"
              className="inline-flex items-center gap-2.5 h-[50px] px-6 rounded-full bg-[#f8dc6c] hover:bg-[#ffdc50] text-[#121212] text-sm font-semibold transition-transform hover:scale-[1.02] shadow-lg"
            >
              <span>Book a call</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        {/* Hero Body */}
        <div className="relative z-10 w-full max-w-6xl px-6 sm:px-14 py-16 sm:py-24 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 text-xs font-mono text-[#ffdc50]">
            <span className="h-2 w-2 rounded-full bg-[#ffdc50] animate-pulse" />
            <span>FIRST-CLASS BOWLER • MASTER TURF AGRONOMIST • MOWMASTER SA</span>
          </div>

          <h1 className="text-4xl sm:text-7xl lg:text-8xl font-bold tracking-tight uppercase text-[#ffdc50] leading-[1.02] max-w-5xl">
            The science beneath 22 yards
          </h1>

          <p className="max-w-2xl text-base sm:text-lg text-white/85 leading-relaxed font-normal">
            Where Australian First-Class fast bowling intuition meets elite geotechnical soil science. Engineered cricket squares, drop-in wicket advisory, and stadium-grade turf machinery.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="#services"
              className="inline-flex items-center gap-3 rounded-full bg-[#f8dc6c] hover:bg-[#ffdc50] text-[#121212] px-7 py-3.5 text-sm font-semibold transition shadow-lg"
            >
              <span>Explore Solutions</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="#machinery"
              className="inline-flex items-center gap-3 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 text-white px-6 py-3.5 text-sm font-medium transition"
            >
              <span>MowMaster Machinery (SA)</span>
              <span className="text-xs font-mono text-[#f8dc6c]">POA</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-20 w-full px-6 sm:px-14 pb-8 sm:pb-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <div className="flex -space-x-2">
              <div className="h-10 w-10 rounded-full bg-[#3d3d3d] border-2 border-[#121212] flex items-center justify-center text-xs font-bold text-white">
                LB
              </div>
              <div className="h-10 w-10 rounded-full bg-[#767676] border-2 border-[#121212] flex items-center justify-center text-xs font-bold text-white">
                TK
              </div>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-white">
                Trusted by <strong className="text-[#ffdc50]">2,000+</strong> grounds worldwide
              </p>
              <div className="flex items-center gap-1.5 text-xs text-white/70 mt-0.5">
                <div className="flex text-[#f8dc6c]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                </div>
                <span>25+ Years Curatorial Authority</span>
              </div>
            </div>
          </div>

          <Link
            href="https://www.linkedin.com/in/trent-kelly"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#1c1c1c]/80 border border-white/10 px-4 py-2 text-xs text-white/80 hover:text-white transition"
          >
            <span className="h-2 w-2 rounded-full bg-[#ffdc50]" />
            <span>Connect on LinkedIn (500+ Curators &amp; Directors)</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#ffdc50]" />
          </Link>
        </div>
      </section>
    </div>
  );
}
