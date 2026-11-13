"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                 */
/* ------------------------------------------------------------------ */

export type ChatStep =
  | "service"
  | "location"
  | "format"
  | "timing"
  | "name"
  | "phone"
  | "email"
  | "notes"
  | "confirmed";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  options?: string[];
  isSlotPicker?: boolean;
  isSummary?: boolean;
}

interface BookingData {
  service: string;
  location: string;
  format: string;
  timing: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  reference?: string;
}

interface Day {
  iso: string;
  weekday: string;
  day: number;
  month: string;
  open: boolean;
  isToday: boolean;
}

const SERVICES_OPTIONS = [
  "Complete Turnkey Fit-Out",
  "Villa & Apartment Renovations",
  "Office & Commercial Interiors",
  "MEP Works (HVAC, Electrical & Plumbing)",
  "Authority Approval Coordination",
  "Project Management & Execution",
];

const LOCATIONS_OPTIONS = [
  "Palm Jumeirah",
  "Emirates Hills",
  "Dubai Hills Estate",
  "Downtown Dubai / DIFC",
  "Jumeirah Bay Island",
  "Al Barari",
  "Abu Dhabi (Saadiyat / Al Maryah)",
  "Other UAE / International",
];

const FORMAT_OPTIONS = [
  "At our office",
  "On-Site at your Property",
  "Online Video Consultation",
];

const PHONE_NUMBER = "+97143218899";
const WHATSAPP_NUMBER = "97143218899";

/* ------------------------------------------------------------------ */
/*  Calendar Slot Engine (Matches Consultation Page)                  */
/* ------------------------------------------------------------------ */

const OPEN_DAYS = [0, 1, 2, 3, 4]; // Sunday to Thursday (0 = Sunday)
const DAYS_AHEAD = 14;
const LEAD_MINUTES = 120; // earliest bookable time today is now + 2 hours
const SLOT_TIMES = Array.from({ length: 16 }, (_, i) => {
  const total = 9 * 60 + 30 + i * 30; // 09:30 to 17:00, every 30 minutes
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
});

const pad2 = (n: number) => String(n).padStart(2, "0");
const toIso = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

function fmt12(time: string) {
  const [h, m] = time.split(":").map(Number);
  return `${h % 12 || 12}:${pad2(m)} ${h >= 12 ? "PM" : "AM"}`;
}

function isBooked(iso: string, time: string) {
  let n = 0;
  for (const c of iso + time) n += c.charCodeAt(0);
  return n % 7 === 0;
}

function buildDays(now: Date): Day[] {
  const out: Day[] = [];
  for (let i = 0; i < DAYS_AHEAD; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    out.push({
      iso: toIso(d),
      weekday: d.toLocaleDateString("en-GB", { weekday: "short" }),
      day: d.getDate(),
      month: d.toLocaleDateString("en-GB", { month: "short" }),
      open: OPEN_DAYS.includes(d.getDay()),
      isToday: i === 0,
    });
  }
  return out;
}

function slotUnavailable(day: Day, time: string, now: Date) {
  if (isBooked(day.iso, time)) return true;
  if (day.isToday) {
    const [h, m] = time.split(":").map(Number);
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    if (h * 60 + m < nowMinutes + LEAD_MINUTES) return true;
  }
  return false;
}

const INITIAL_BOT_MESSAGE: Message = {
  id: "msg-1",
  sender: "bot",
  text: "Welcome to RichMan Interiors. I can assist you with booking a complimentary 45-minute architectural & fit-out consultation with our Design Director.\n\nWhich service are you planning for your space?",
  timestamp: "Just now",
  options: SERVICES_OPTIONS,
};

/* ------------------------------------------------------------------ */
/*  Main Live Chat Concierge Component                                */
/* ------------------------------------------------------------------ */

export default function LiveChatConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState<ChatStep>("service");
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  // Calendar slot selection states inside chat
  const [days, setDays] = useState<Day[]>([]);
  const [selectedDayIso, setSelectedDayIso] = useState<string>("");
  const [nowDate, setNowDate] = useState<Date | null>(null);

  const [bookingData, setBookingData] = useState<BookingData>({
    service: "",
    location: "",
    format: "",
    timing: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const [messages, setMessages] = useState<Message[]>([INITIAL_BOT_MESSAGE]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize days on mount
  useEffect(() => {
    const n = new Date();
    setNowDate(n);
    const dList = buildDays(n);
    setDays(dList);
    const firstOpen = dList.find((d) => d.open);
    if (firstOpen) {
      setSelectedDayIso(firstOpen.iso);
    }
  }, []);

  // Periodic simplified notification with 7-second gap
  useEffect(() => {
    if (isOpen) {
      setNotificationVisible(false);
      return;
    }

    // Initial show after 2 seconds
    const initialTimer = setTimeout(() => {
      setNotificationVisible(true);
    }, 2000);

    // Repeat with 7-second interval
    const interval = setInterval(() => {
      setNotificationVisible(true);
    }, 7000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isOpen]);

  // Auto-hide active notification after 4.5 seconds
  useEffect(() => {
    if (notificationVisible) {
      const hideTimer = setTimeout(() => {
        setNotificationVisible(false);
      }, 4500);
      return () => clearTimeout(hideTimer);
    }
  }, [notificationVisible]);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setNotificationVisible(false);
      if (["name", "phone", "email", "notes"].includes(currentStep)) {
        setTimeout(() => inputRef.current?.focus(), 200);
      }
    }
  }, [messages, isOpen, isTyping, currentStep]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setNotificationVisible(false);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  const handleResetChat = () => {
    setCurrentStep("service");
    setBookingData({
      service: "",
      location: "",
      format: "",
      timing: "",
      name: "",
      phone: "",
      email: "",
      notes: "",
    });
    setInputValue("");
    setInputError("");
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: "bot",
        text: "Conversation refreshed. Which service are you planning for your space?",
        timestamp: "Just now",
        options: SERVICES_OPTIONS,
      },
    ]);
  };

  // Process User Answer and Advance Bot Steps
  const processAnswer = (answer: string) => {
    if (!answer.trim()) return;

    setInputError("");
    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: answer.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      handleStepAdvance(answer.trim());
      setIsTyping(false);
    }, 550);
  };

  const handleStepAdvance = (val: string) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    switch (currentStep) {
      case "service": {
        setBookingData((prev) => ({ ...prev, service: val }));
        setCurrentStep("location");
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: `Excellent. Where in Dubai or the UAE is your property located?`,
            timestamp: timeNow,
            options: LOCATIONS_OPTIONS,
          },
        ]);
        break;
      }

      case "location": {
        setBookingData((prev) => ({ ...prev, location: val }));
        setCurrentStep("format");
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: "How would you prefer to conduct your 45-minute consultation?",
            timestamp: timeNow,
            options: FORMAT_OPTIONS,
          },
        ]);
        break;
      }

      case "format": {
        setBookingData((prev) => ({ ...prev, format: val }));
        setCurrentStep("timing");
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: "Pick a date and time slot for your consultation, or choose flexible timing:",
            timestamp: timeNow,
            isSlotPicker: true,
          },
        ]);
        break;
      }

      case "timing": {
        setBookingData((prev) => ({ ...prev, timing: val }));
        setCurrentStep("name");
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: "Splendid. May I have your full name?",
            timestamp: timeNow,
          },
        ]);
        break;
      }

      case "name": {
        if (val.length < 2) {
          setInputError("Please enter your full name.");
          return;
        }
        setBookingData((prev) => ({ ...prev, name: val }));
        setCurrentStep("phone");
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: `Thank you, ${val.split(" ")[0]}. What is your WhatsApp or phone number (with country code)? Our concierge will reach out to confirm your session.`,
            timestamp: timeNow,
          },
        ]);
        break;
      }

      case "phone": {
        if (val.length < 7) {
          setInputError("Please provide a valid phone or WhatsApp number.");
          return;
        }
        setBookingData((prev) => ({ ...prev, phone: val }));
        setCurrentStep("email");
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: "Would you like to share your email for a calendar invite? (This is optional — click Skip if you prefer WhatsApp only).",
            timestamp: timeNow,
            options: ["Skip (WhatsApp only)", "I don't have an email"],
          },
        ]);
        break;
      }

      case "email": {
        const isSkipped =
          val === "Skip (WhatsApp only)" ||
          val === "I don't have an email" ||
          val.toLowerCase() === "skip" ||
          val.toLowerCase() === "no";

        const finalEmail = isSkipped ? "Not provided (WhatsApp preferred)" : val;
        setBookingData((prev) => ({ ...prev, email: finalEmail }));

        setCurrentStep("notes");
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: "Any specific notes, area (sq ft) or requirements for our Design Director? (Optional)",
            timestamp: timeNow,
            options: ["Skip & Complete Booking"],
          },
        ]);
        break;
      }

      case "notes": {
        const finalNotes =
          val === "Skip & Complete Booking" || val.toLowerCase() === "skip" ? "" : val;
        const refNumber = `RM-CON-${Math.floor(100000 + Math.random() * 900000)}`;

        const updatedData: BookingData = {
          ...bookingData,
          notes: finalNotes,
          reference: refNumber,
        };

        setBookingData(updatedData);
        setCurrentStep("confirmed");

        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: `✨ Consultation Confirmed!\n\nReference: #${refNumber}\n\nThank you, ${bookingData.name || "valued client"}. Your consultation booking has been logged with our Senior Design Director. We will contact you via WhatsApp / phone within 4 business hours.`,
            timestamp: timeNow,
            isSummary: true,
          },
        ]);
        break;
      }

      case "confirmed":
        break;
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    processAnswer(inputValue.trim());
  };

  const getInputPlaceholder = () => {
    switch (currentStep) {
      case "service":
        return "Choose a service or type...";
      case "location":
        return "Choose community or type...";
      case "format":
        return "Select meeting format above...";
      case "timing":
        return "Pick slot above or click Flexible...";
      case "name":
        return "Your full name (required)...";
      case "phone":
        return "WhatsApp / Phone (required)...";
      case "email":
        return "name@domain.com (optional — or click Skip)...";
      case "notes":
        return "Notes, area, budget... (optional)";
      case "confirmed":
        return "Consultation request confirmed";
      default:
        return "Type your message...";
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello RichMan Interiors Concierge. I have booked an interior consultation.\nReference: ${bookingData.reference || "RM-CON"}\nService: ${bookingData.service}\nLocation: ${bookingData.location}\nFormat: ${bookingData.format}\nTiming: ${bookingData.timing}\nName: ${bookingData.name}\nPhone: ${bookingData.phone}`
  );

  const selectedDayObj = days.find((d) => d.iso === selectedDayIso);

  return (
    <>
      {/* ================= 1. SIMPLE ROUND WIDGET & 7-SECOND NOTIFICATION ================= */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
        {/* Simplified Notification Bubble (7-second gap, clean white design, no green dot) */}
        {notificationVisible && !isOpen && (
          <div
            role="status"
            className="mb-3 flex items-center gap-2.5 rounded-full bg-white border border-[#BE9B59]/60 pl-4 pr-2.5 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 select-none"
          >
            <button
              type="button"
              onClick={handleOpenChat}
              className="font-sans text-xs font-semibold text-[#171816] hover:text-[#BE9B59] transition-colors whitespace-nowrap cursor-pointer text-left"
            >
              Chat With Us Now!
            </button>

            <button
              type="button"
              onClick={() => setNotificationVisible(false)}
              className="text-stone-400 hover:text-stone-800 transition-colors p-1 cursor-pointer"
              aria-label="Dismiss notification"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Round Widget Button with White Background (No Green Dot) */}
        {!isOpen && (
          <button
            type="button"
            onClick={handleOpenChat}
            aria-label="Open RichMan Interiors Live Consultation Chat"
            className="group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white border-2 border-[#BE9B59] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:scale-105 hover:border-[#a88647] hover:shadow-[0_12px_35px_rgba(190,155,89,0.3)] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BE9B59]"
          >
            {/* Official Logo Icon on White Background */}
            <div className="relative h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center">
              <Image
                src="/images/RM Interior - Logo Icon .png"
                alt="RichMan Interiors Concierge"
                fill
                sizes="64px"
                priority
                className="object-contain p-0.5 transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </button>
        )}
      </div>

      {/* ================= 2. LIVE CHAT MODAL WINDOW (WHITE THEME) ================= */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="RichMan Interiors Live Consultation Booking"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex w-[calc(100vw-2rem)] sm:w-[420px] max-w-[420px] h-[600px] max-h-[88vh] flex-col rounded-2xl bg-white border border-[#BE9B59]/40 shadow-[0_20px_60px_rgba(0,0,0,0.2)] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header (Clean White / Ivory Theme) */}
          <div className="relative flex items-center justify-between border-b border-deep-charcoal/10 bg-[#FAF8F5] px-5 py-3.5">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 rounded-full bg-white border border-[#BE9B59]/40 p-1 flex items-center justify-center shadow-xs">
                <Image
                  src="/images/RM Interior - Logo Icon .png"
                  alt="RichMan Interiors Emblem"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-base font-medium tracking-wide text-deep-charcoal">
                    Conversation
                  </h3>
                  <span className="rounded bg-[#BE9B59]/15 px-1.5 py-0.5 font-sans text-[10px] font-semibold text-[#8B6B2B] uppercase tracking-wider">
                    Live
                  </span>
                </div>
                <p className="font-sans text-xs text-deep-charcoal/60">
                  Chat With Us
                </p>
              </div>
            </div>

            {/* Actions: Reset & Close */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                title="Restart consultation booking"
                className="p-1.5 rounded-full text-deep-charcoal/50 hover:text-[#BE9B59] hover:bg-black/5 transition-colors"
                aria-label="Reset chat"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleCloseChat}
                title="Minimize chat"
                className="p-1.5 rounded-full text-deep-charcoal/50 hover:text-deep-charcoal hover:bg-black/5 transition-colors"
                aria-label="Close chat"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Progress Mini Bar */}
          <div className="h-0.5 w-full bg-deep-charcoal/5">
            <div
              className="h-full bg-gradient-to-r from-[#BE9B59] to-[#d3b06e] transition-all duration-500"
              style={{
                width:
                  currentStep === "service"
                    ? "12%"
                    : currentStep === "location"
                      ? "25%"
                      : currentStep === "format"
                        ? "40%"
                        : currentStep === "timing"
                          ? "55%"
                          : currentStep === "name"
                            ? "70%"
                            : currentStep === "phone"
                              ? "82%"
                              : currentStep === "email"
                                ? "92%"
                                : "100%",
              }}
            />
          </div>

          {/* Message Thread Body (White Background) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none bg-white">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                {/* Bubble */}
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-xs ${msg.sender === "user"
                    ? "bg-[#BE9B59] text-[#171816] font-medium rounded-tr-sm"
                    : "bg-[#F7F5F0] border border-deep-charcoal/10 text-deep-charcoal rounded-tl-sm"
                    }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* ================= SLOT SELECTION (WHITE THEME) ================= */}
                  {msg.isSlotPicker && currentStep === "timing" && (
                    <div className="mt-3.5 pt-3.5 border-t border-deep-charcoal/15">
                      <p className="font-sans text-xs font-semibold text-deep-charcoal/80 mb-2">
                        1. Choose Day:
                      </p>

                      {/* Day Carousel */}
                      <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                        {days.map((d) => {
                          const isSelected = selectedDayIso === d.iso;
                          return (
                            <button
                              key={d.iso}
                              type="button"
                              disabled={!d.open}
                              onClick={() => setSelectedDayIso(d.iso)}
                              className={`flex flex-col items-center justify-center shrink-0 w-12 py-1.5 rounded-lg border text-center transition-all ${!d.open
                                ? "border-deep-charcoal/10 text-deep-charcoal/30 bg-black/[0.02] cursor-not-allowed"
                                : isSelected
                                  ? "border-deep-charcoal bg-deep-charcoal text-[#F5F0E7] font-semibold shadow-xs"
                                  : "border-deep-charcoal/20 bg-white text-deep-charcoal hover:border-[#BE9B59] hover:text-[#BE9B59] shadow-xs"
                                }`}
                            >
                              <span className="text-[10px] uppercase">{d.weekday}</span>
                              <span className="text-base font-serif font-light">{d.day}</span>
                              <span className="text-[9px] opacity-70">
                                {d.isToday ? "Today" : d.month}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Time Slots Grid */}
                      {selectedDayObj && nowDate && (
                        <div className="mt-3">
                          <p className="font-sans text-xs font-semibold text-deep-charcoal/80 mb-2">
                            2. Choose Time Slot ({selectedDayObj.weekday} {selectedDayObj.day}{" "}
                            {selectedDayObj.month}):
                          </p>
                          <div className="grid grid-cols-3 gap-1.5 max-h-36 overflow-y-auto pr-1">
                            {SLOT_TIMES.map((t) => {
                              const taken = slotUnavailable(selectedDayObj, t, nowDate);
                              return (
                                <button
                                  key={t}
                                  type="button"
                                  disabled={taken}
                                  onClick={() => {
                                    const formattedSlot = `${selectedDayObj.weekday} ${selectedDayObj.day} ${selectedDayObj.month} at ${fmt12(t)}`;
                                    processAnswer(formattedSlot);
                                  }}
                                  className={`rounded-md py-1.5 px-2 text-xs font-mono transition-all text-center ${taken
                                    ? "border border-deep-charcoal/10 text-deep-charcoal/30 line-through bg-black/[0.02] cursor-not-allowed"
                                    : "border border-deep-charcoal/15 bg-white text-deep-charcoal hover:border-[#BE9B59] hover:bg-[#BE9B59] hover:text-[#171816] active:scale-95 shadow-xs"
                                    }`}
                                >
                                  {fmt12(t)}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Flexible Option */}
                      <div className="mt-3 pt-2.5 border-t border-deep-charcoal/15">
                        <button
                          type="button"
                          onClick={() => processAnswer("Flexible — please call me to coordinate")}
                          className="w-full rounded-lg border border-dashed border-[#BE9B59] bg-[#BE9B59]/10 px-3 py-2 text-xs font-sans text-[#8B6B2B] font-medium hover:bg-[#BE9B59] hover:text-[#171816] transition-colors"
                        >
                          I am flexible, please call me to find a time
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Summary Card if confirmed */}
                  {msg.isSummary && bookingData.reference && (
                    <div className="mt-3.5 pt-3.5 border-t border-deep-charcoal/15 space-y-2 font-sans text-xs">
                      <div className="flex justify-between text-deep-charcoal/65">
                        <span>Service</span>
                        <span className="font-semibold text-deep-charcoal text-right">{bookingData.service}</span>
                      </div>
                      <div className="flex justify-between text-deep-charcoal/65">
                        <span>Location</span>
                        <span className="font-semibold text-deep-charcoal text-right">{bookingData.location}</span>
                      </div>
                      <div className="flex justify-between text-deep-charcoal/65">
                        <span>Format</span>
                        <span className="font-semibold text-deep-charcoal text-right">{bookingData.format}</span>
                      </div>
                      <div className="flex justify-between text-deep-charcoal/65">
                        <span>Slot</span>
                        <span className="font-semibold text-[#8B6B2B] text-right">{bookingData.timing}</span>
                      </div>
                      <div className="flex justify-between text-deep-charcoal/65">
                        <span>Contact</span>
                        <span className="font-semibold text-deep-charcoal text-right">
                          {bookingData.name} ({bookingData.phone})
                        </span>
                      </div>
                      {bookingData.email && bookingData.email !== "Not provided (WhatsApp preferred)" && (
                        <div className="flex justify-between text-deep-charcoal/65">
                          <span>Email</span>
                          <span className="font-semibold text-deep-charcoal text-right">{bookingData.email}</span>
                        </div>
                      )}

                      {/* Direct WhatsApp & Call Actions */}
                      <div className="mt-4 pt-3 flex flex-col gap-2">
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors shadow-xs"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.06-2.115-.527-1.745-.722-2.883-2.484-2.97-2.6-.086-.115-.712-.947-.712-1.808 0-.861.452-1.285.613-1.459.161-.174.351-.217.469-.217.117 0 .235.001.338.006.109.005.253-.042.396.3.144.348.491 1.196.534 1.283.043.087.072.19.014.305-.058.115-.087.189-.173.289-.087.101-.183.226-.262.304-.087.087-.177.181-.076.355.101.174.449.741.963 1.2 1.033.921 1.488.948 1.701 1.053.213.106.338.087.462-.058.125-.145.535-.623.679-.838.144-.217.288-.174.49-.101.202.072 1.281.604 1.501.713.22.109.366.163.419.255.053.093.053.541-.091.946z" />
                          </svg>
                          <span>Confirm on WhatsApp</span>
                        </a>

                        <a
                          href={`tel:${PHONE_NUMBER}`}
                          className="flex items-center justify-center gap-2 rounded-lg border border-deep-charcoal/20 bg-white px-4 py-2 text-xs font-semibold text-deep-charcoal hover:bg-black/5 transition-colors shadow-xs"
                        >
                          <span>Call Directly ({PHONE_NUMBER})</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Timestamp */}
                <span className="mt-1 text-[10px] text-deep-charcoal/45 px-1 font-sans">
                  {msg.timestamp}
                </span>

                {/* Option Buttons (Stacked down by down to avoid wrapping conflicts) */}
                {msg.sender === "bot" &&
                  msg.options &&
                  msg.id ===
                  [...messages].reverse().find((m) => m.sender === "bot")?.id &&
                  currentStep !== "confirmed" && (
                    <div className="mt-2.5 flex flex-col gap-1.5 w-full max-w-[92%]">
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => processAnswer(opt)}
                          className="flex items-center justify-between w-full rounded-xl border border-deep-charcoal/15 bg-white px-3.5 py-2.5 text-xs font-medium text-deep-charcoal hover:border-[#BE9B59] hover:bg-[#FAF8F5] hover:text-[#171816] transition-all duration-200 active:scale-[0.99] text-left shadow-xs cursor-pointer group"
                        >
                          <span className="leading-snug">{opt}</span>
                          <svg
                            className="w-3.5 h-3.5 text-deep-charcoal/30 group-hover:text-[#BE9B59] transition-colors shrink-0 ml-2"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 rounded-2xl bg-[#F7F5F0] border border-deep-charcoal/10 px-4 py-3 w-16">
                <span className="h-1.5 w-1.5 rounded-full bg-[#BE9B59] animate-bounce [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#BE9B59] animate-bounce [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#BE9B59] animate-bounce" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input & Form Bar (Clean Light Footer) */}
          <div className="border-t border-deep-charcoal/10 bg-[#FAF8F5] p-3">
            {inputError && (
              <p className="mb-2 px-1 text-xs text-rose-600 font-sans animate-in fade-in">
                {inputError}
              </p>
            )}

            {currentStep === "confirmed" ? (
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs text-deep-charcoal/60">
                  Consultation booked successfully
                </span>
                <button
                  type="button"
                  onClick={handleResetChat}
                  className="rounded-full bg-[#BE9B59] px-4 py-1.5 font-sans text-xs font-semibold text-[#171816] hover:bg-[#d3b06e] transition-colors"
                >
                  Book Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleInputSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type={
                    currentStep === "email"
                      ? "text"
                      : currentStep === "phone"
                        ? "tel"
                        : "text"
                  }
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    if (inputError) setInputError("");
                  }}
                  placeholder={getInputPlaceholder()}
                  className="flex-1 rounded-xl bg-white border border-deep-charcoal/20 px-3.5 py-2.5 font-sans text-xs text-deep-charcoal placeholder:text-deep-charcoal/45 focus:border-[#BE9B59] focus:outline-none transition-colors shadow-xs"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#BE9B59] text-[#171816] hover:bg-[#d3b06e] disabled:opacity-30 disabled:hover:bg-[#BE9B59] transition-all cursor-pointer shadow-xs"
                  aria-label="Send message"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
