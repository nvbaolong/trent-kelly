"use client";

import React, { useState, useEffect } from "react";
import {
  ClockCircleLinear,
  VideocameraLinear,
  GlobalLinear,
  CalendarLinear,
  AltArrowLeftLinear,
  AltArrowRightLinear,
  CheckCircleBold,
  ArrowRightLinear,
  CloseCircleLinear,
} from "solar-icon-set";

const imgScreenshotTrent = "/figma-assets/0573e1610acc04d2a77892cad5e7a1f95c3b3f3c.png";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TIME_SLOTS = [
  "09:00 AM",
  "10:30 AM",
  "01:30 PM",
  "03:00 PM",
  "04:30 PM",
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS_OF_WEEK = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  // Deterministic initial dates for SSR/prerender stability
  const [today, setToday] = useState<Date>(() => new Date(2026, 10, 1));
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date(2026, 10, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  
  // Step state: 1 = Date & Time, 2 = Form Details, 3 = Confirmed
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    venueType: "Turf Wicket Block (Couch/Rye)",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync actual client-side date on mount or when modal opens
  useEffect(() => {
    if (typeof window !== "undefined") {
      const now = new Date();
      setToday(now);
      setCurrentDate(new Date(now.getFullYear(), now.getMonth(), 1));
    }
  }, [isOpen]);

  // Keyboard navigation & lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset state when closing/opening
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setSelectedDate(null);
      setSelectedSlot(null);
      setIsSubmitting(false);
    }, 250);
  };

  if (!isOpen) return null;

  // Calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isPastDate = (day: number) => {
    const cellDate = new Date(year, month, day);
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return cellDate < startOfToday;
  };

  const isWeekend = (day: number) => {
    const dayOfWeek = new Date(year, month, day).getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // Sun = 0, Sat = 6
  };

  const handleDateClick = (day: number) => {
    if (isPastDate(day) || isWeekend(day)) return;
    const picked = new Date(year, month, day);
    setSelectedDate(picked);
    setSelectedSlot(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 800);
  };

  const formattedSelectedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-8 animate-in fade-in duration-200"
      onClick={handleClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-zinc-200/80 flex flex-col md:flex-row max-h-[92vh] text-[#121212]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top-Right Close Button (Solar Icon CloseCircleLinear) */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close booking modal"
          className="absolute top-4 right-4 text-zinc-400 hover:text-black bg-zinc-100 hover:bg-zinc-200 p-1.5 rounded-full transition-colors cursor-pointer z-20 shadow-xs flex items-center justify-center"
        >
          <CloseCircleLinear size={22} />
        </button>

        {/* =========================================================================
            LEFT PANEL: Host & Meeting Details (Calendly Style)
           ========================================================================= */}
        <div className="w-full md:w-5/12 bg-zinc-50/90 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-zinc-200/60 flex flex-col justify-between shrink-0">
          <div>
            {/* Host Identity */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="relative size-12 rounded-full shrink-0">
                <img
                  src={imgScreenshotTrent}
                  alt="Trent Kelly"
                  className="size-full rounded-full object-cover border border-zinc-200 shadow-sm"
                />
                <span className="absolute bottom-0 right-0 size-3 rounded-full bg-[#b6e400] border-2 border-white shadow-xs" />
              </div>
              <div>
                <p className="text-[11px] font-mono tracking-widest uppercase font-bold text-[#b45309]">
                  TK Turf Services
                </p>
                <h3 className="font-bold text-base text-[#121212] leading-tight">
                  Trent Kelly
                </h3>
                <p className="text-xs text-zinc-500">Master Agronomist &amp; Curator</p>
              </div>
            </div>

            {/* Meeting Name */}
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#121212] leading-tight">
              30 Min Discovery Consultation
            </h2>

            {/* Meeting Meta Details */}
            <div className="mt-5 space-y-3 text-xs text-zinc-600">
              <div className="flex items-center gap-2.5">
                <ClockCircleLinear size={18} className="text-zinc-400 shrink-0" />
                <span className="font-semibold text-zinc-800">30 minutes</span>
              </div>
              <div className="flex items-center gap-2.5">
                <VideocameraLinear size={18} className="text-zinc-400 shrink-0" />
                <span>Google Meet / Video Conference</span>
              </div>
              <div className="flex items-center gap-2.5">
                <GlobalLinear size={18} className="text-zinc-400 shrink-0" />
                <span>Adelaide Time (ACDT · UTC+10:30)</span>
              </div>
            </div>

            {/* Description */}
            <p className="mt-5 text-xs text-zinc-500 leading-relaxed border-t border-zinc-200/60 pt-4">
              Direct technical consultation on First-Class wicket preparation, soil compaction benchmarks (CIV 300), tournament window management, or specialized fleet procurement.
            </p>
          </div>

          {/* Trust Footer */}
          <div className="mt-6 pt-4 border-t border-zinc-200/60 flex items-center gap-2 text-[11px] font-mono text-zinc-500">
            <span className="size-1.5 rounded-full bg-[#f8dc6c]" />
            <span>Adelaide Oval Mentorship Standard</span>
          </div>
        </div>

        {/* =========================================================================
            RIGHT PANEL: Interactive Calendly Booking Workflow
           ========================================================================= */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 overflow-y-auto max-h-[85vh] bg-white flex flex-col justify-between">
          
          {/* STEP 1: Select Date & Time */}
          {step === 1 && (
            <div>
              <div className="mb-4">
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-zinc-400 block mb-1">
                  Step 1 of 2
                </span>
                <h4 className="text-lg font-bold text-[#121212]">
                  Select a Date &amp; Time
                </h4>
              </div>

              {/* Month Navigator */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-sm text-[#121212]">
                  {MONTH_NAMES[month]} {year}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="size-8 rounded-lg border border-zinc-200 hover:bg-zinc-100 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <AltArrowLeftLinear size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="size-8 rounded-lg border border-zinc-200 hover:bg-zinc-100 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <AltArrowRightLinear size={16} />
                  </button>
                </div>
              </div>

              {/* Calendar Grid Header */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono font-bold text-zinc-400 mb-2">
                {DAYS_OF_WEEK.map((d) => (
                  <div key={d} className="py-1">
                    {d}
                  </div>
                ))}
              </div>

              {/* Calendar Grid Cells */}
              <div className="grid grid-cols-7 gap-1.5 text-xs text-center mb-6">
                {/* Blank days before 1st of month */}
                {Array.from({ length: firstDayIndex }).map((_, i) => (
                  <div key={`empty-${i}`} className="p-2" />
                ))}

                {/* Actual month days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const past = isPastDate(day);
                  const weekend = isWeekend(day);
                  const isSelected =
                    selectedDate &&
                    selectedDate.getFullYear() === year &&
                    selectedDate.getMonth() === month &&
                    selectedDate.getDate() === day;

                  const isAvailable = !past && !weekend;

                  return (
                    <button
                      key={day}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => handleDateClick(day)}
                      className={`relative aspect-square rounded-xl font-semibold text-xs flex flex-col items-center justify-center transition-all ${
                        isSelected
                          ? "bg-zinc-950 text-white shadow-md scale-105"
                          : isAvailable
                          ? "bg-zinc-50 hover:bg-[#f8dc6c] text-[#121212] cursor-pointer hover:font-bold"
                          : "text-zinc-300 cursor-not-allowed opacity-50"
                      }`}
                    >
                      <span>{day}</span>
                      {isAvailable && !isSelected && (
                        <span className="size-1 rounded-full bg-[#f8dc6c] mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Available Time Slots Section */}
              {selectedDate ? (
                <div className="pt-4 border-t border-zinc-100 animate-in fade-in slide-in-from-top-2 duration-200">
                  <p className="text-xs font-bold text-[#121212] mb-3">
                    Available times for <span className="text-[#b45309]">{formattedSelectedDate}</span>:
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                    {TIME_SLOTS.map((slot) => {
                      const isSlotActive = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                            isSlotActive
                              ? "bg-zinc-950 text-white border-zinc-950 shadow-sm"
                              : "bg-white border-zinc-200/80 text-zinc-700 hover:border-black hover:text-black"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>

                  {selectedSlot && (
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#f8dc6c] hover:bg-[#ffdc50] text-[#121212] font-semibold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-md cursor-pointer"
                    >
                      <span>Next: Enter Details</span>
                      <ArrowRightLinear size={16} />
                    </button>
                  )}
                </div>
              ) : (
                <div className="py-4 text-center rounded-xl bg-zinc-50 border border-zinc-200/60 text-xs text-zinc-500">
                  <CalendarLinear size={18} className="mx-auto mb-1.5 text-zinc-400" />
                  Select an available weekday on the calendar to view time slots.
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Enter Details Form */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-black transition-colors mb-2 cursor-pointer"
                >
                  <AltArrowLeftLinear size={14} />
                  <span>Back to date selection</span>
                </button>

                <h4 className="text-lg font-bold text-[#121212]">
                  Enter Consultation Details
                </h4>

                {/* Selected Slot Pill */}
                <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 text-xs text-zinc-700 font-mono">
                  <CalendarLinear size={14} className="text-[#b45309]" />
                  <span>{formattedSelectedDate} at {selectedSlot} (ACDT)</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Cameron Smith"
                    className="w-full bg-[#f8f8f8] border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs text-[#121212] focus:outline-none focus:border-black"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="curator@cricketclub.com.au"
                      className="w-full bg-[#f8f8f8] border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs text-[#121212] focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+61 400 000 000"
                      className="w-full bg-[#f8f8f8] border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs text-[#121212] focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
                    Cricket Club / School / Council Facility
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Adelaide District Cricket Club / St Peter's College"
                    className="w-full bg-[#f8f8f8] border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs text-[#121212] focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
                    Primary Area of Inquiry
                  </label>
                  <select
                    value={formData.venueType}
                    onChange={(e) => setFormData({ ...formData, venueType: e.target.value })}
                    className="w-full bg-[#f8f8f8] border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs text-[#121212] focus:outline-none focus:border-black cursor-pointer"
                  >
                    <option value="Turf Wicket Block (Couch/Rye)">Turf Wicket Block (Couch/Rye Preparation)</option>
                    <option value="Drop-In Wicket Engineering">Drop-In Wicket Calibration &amp; Analysis</option>
                    <option value="Machinery Specification">Machinery Fleet Specification (POA)</option>
                    <option value="Soil Profile & Compaction Testing">Soil Profile &amp; Clegg Compaction (CIV 300)</option>
                    <option value="Seasonal Renovation">End of Season Wicket Renovation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
                    Please share any details about your venue or questions:
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. 8-pitch center square experiencing slow bounce or organic thatch buildup..."
                    className="w-full bg-[#f8f8f8] border border-zinc-200 rounded-xl p-3 text-xs text-[#121212] focus:outline-none focus:border-black resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-5 rounded-xl bg-zinc-950 hover:bg-black text-white font-semibold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Scheduling with Trent...</span>
                ) : (
                  <>
                    <span>Confirm Consultation Booking</span>
                    <ArrowRightLinear size={16} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 3: Confirmed View (Success) */}
          {step === 3 && (
            <div className="py-8 text-center flex flex-col items-center justify-center my-auto">
              <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-xs">
                <CheckCircleBold size={36} />
              </div>

              <h4 className="text-2xl font-bold text-[#121212]">
                Booking Confirmed!
              </h4>

              <p className="text-xs text-zinc-600 mt-2 max-w-sm">
                You are scheduled for a consultation with <strong className="text-zinc-900">Trent Kelly</strong>. A calendar invitation has been sent to your email.
              </p>

              {/* Confirmation Details Card */}
              <div className="w-full max-w-sm mt-6 p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-left text-xs space-y-2.5">
                <div className="flex items-start gap-2">
                  <CalendarLinear size={16} className="text-[#b45309] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#121212] block">
                      {formattedSelectedDate}
                    </span>
                    <span className="text-zinc-500">
                      {selectedSlot} – {selectedSlot ? selectedSlot.replace("AM", "30 AM").replace("PM", "30 PM") : ""} (ACDT)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-zinc-200/60">
                  <VideocameraLinear size={16} className="text-[#b45309] shrink-0" />
                  <span className="text-zinc-700">Google Meet (Link in email invite)</span>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-zinc-200/60 text-[11px] text-zinc-500">
                  <span>Guest: <strong>{formData.name}</strong> ({formData.email})</span>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3 w-full max-w-sm">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-3 rounded-xl bg-zinc-950 hover:bg-black text-white font-semibold text-xs transition cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
