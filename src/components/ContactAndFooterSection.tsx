"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Send, CheckCircle2, MessageSquare, Phone, Mail } from "lucide-react";

export default function ContactAndFooterSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer id="contact" className="w-full bg-[#f4f4f5] pt-10 pb-10 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Contact Container: WHITE CARD ON LIGHT GRAY */}
        <div className="bg-white rounded-[32px] p-8 sm:p-14 border border-[#e4e4e7] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#71717a] font-mono">
                CONTACT
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121212] leading-tight">
                Start a Conversation.
              </h2>
              <p className="text-sm sm:text-base text-[#71717a] leading-relaxed">
                Ready to elevate your surface? Reach out directly to discuss your tournament window, council renovation, or MowMaster machinery demo.
              </p>

              {/* Contact methods in subtle light gray pills */}
              <div className="pt-4 space-y-3">
                <a
                  href="https://www.linkedin.com/in/trent-kelly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#f4f4f5] border border-[#e4e4e7] hover:border-[#121212] transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#121212] text-[#f8dc6c] flex items-center justify-center">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-[#71717a]">LinkedIn Network</p>
                      <p className="text-sm font-bold text-[#121212]">Message Trent Directly</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#121212] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </a>

                <div className="p-4 rounded-2xl bg-[#f4f4f5] border border-[#e4e4e7] flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#f8dc6c] text-[#121212] flex items-center justify-center">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[#71717a]">Direct Email</p>
                    <p className="text-sm font-bold text-[#121212]">trent@tkturfservices.com.au</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#f4f4f5] border border-[#e4e4e7] flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white border border-[#e4e4e7] text-[#121212] flex items-center justify-center">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[#71717a]">Operating Hours</p>
                    <p className="text-sm font-bold text-[#121212]">Mon - Fri, 8:00 - 17:00 (ACST)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Form */}
            <div className="lg:col-span-7 bg-[#f4f4f5] rounded-[24px] p-6 sm:p-10 border border-[#e4e4e7]">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="h-14 w-14 rounded-full bg-[#f8dc6c] text-[#121212] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#121212]">Inquiry Received</h3>
                  <p className="text-sm text-[#71717a] max-w-md mx-auto">
                    Trent Kelly will review your request and get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs uppercase font-mono text-[#71717a] mb-1.5">
                      Full name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      className="w-full bg-white border border-[#e4e4e7] rounded-xl px-4 py-3 text-sm text-[#121212] focus:outline-none focus:border-[#121212]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono text-[#71717a] mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="hello@domain.com"
                      className="w-full bg-white border border-[#e4e4e7] rounded-xl px-4 py-3 text-sm text-[#121212] focus:outline-none focus:border-[#121212]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono text-[#71717a] mb-1.5">
                      Message / Pitch &amp; Machinery Request *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell Trent about your wicket block, tournament timeline, or the MowMaster machinery you want quoted..."
                      className="w-full bg-white border border-[#e4e4e7] rounded-xl px-4 py-3 text-sm text-[#121212] focus:outline-none focus:border-[#121212]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#f8dc6c] hover:bg-[#ffdc50] text-[#121212] py-4 text-xs font-bold uppercase tracking-wider transition shadow-sm"
                  >
                    <span>Send Message</span>
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Dark Bar */}
        <div className="mt-12 rounded-[24px] bg-[#121212] text-white px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-6 rounded-full bg-[#f8dc6c] text-[#121212] flex items-center justify-center font-bold text-xs">
              TK
            </div>
            <span className="font-bold text-xs uppercase tracking-wider">
              Trent Kelly • TK Turf Services
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-white/70">
            <Link href="#services" className="hover:text-white transition">Services</Link>
            <Link href="#machinery" className="hover:text-white transition">Machinery</Link>
            <Link href="#projects" className="hover:text-white transition">Projects</Link>
            <Link href="#contact" className="hover:text-white transition">Contact</Link>
          </div>

          <p className="text-[11px] text-white/50">
            © 2026 Trent Kelly. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
