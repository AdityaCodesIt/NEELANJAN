"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ChevronDown } from "lucide-react";

// --- FAQ DATA ---
// PLACEHOLDER CONTENT: Please review and finalize these answers, especially the
// policies (cancellation, refund, privacy) before going live.

const FAQ_GROUPS = [
  {
    title: "Before you book",
    questions: [
      {
        id: "info-needed",
        q: "What information do I need to give you?",
        a: "You will need to provide your full name, along with the exact date, time, and place of your birth. If you have a specific focus area (like career or marriage), sharing that briefly beforehand is helpful but not mandatory.",
      },
      {
        id: "birth-time-accuracy",
        q: "How accurate does my birth time need to be?",
        a: "Your birth time should ideally be exact to the minute, as recorded on a birth certificate. Even a few minutes of difference can change important divisional charts (like the Navamsha) and alter the reading significantly.",
      },
      {
        id: "unknown-time",
        q: "Can I book if I don't know my exact birth time?",
        a: "If you only have an approximate time (e.g., a 1-2 hour window), a limited reading is possible, but please mention this before booking. For completely unknown times, a chart cannot be accurately drawn in the Parashara tradition.",
      },
      {
        id: "hindi",
        q: "Do you offer readings in Hindi?",
        a: "Yes, readings can be conducted fully in Hindi or a mix of English and Hindi depending on what you are most comfortable with. You can let me know your preference at the start of the session.",
      },
    ],
  },
  {
    title: "During the session",
    questions: [
      {
        id: "duration",
        q: "How long does a session last?",
        a: "A comprehensive Vedic Astrology Consultation typically lasts 60 minutes. Kundli Analysis takes about 45 minutes, and Muhurat Guidance takes around 30 minutes. The time is dedicated solely to reading the chart and answering your questions.",
      },
      {
        id: "video-vs-whatsapp",
        q: "What happens on a video call vs WhatsApp?",
        a: "A video call allows us to converse face-to-face, which often makes it easier to discuss nuanced topics. WhatsApp consultations are voice-only calls, which some clients prefer for privacy or convenience. The astrological reading itself is identical in both formats.",
      },
      {
        id: "recording",
        q: "Can I record the session?",
        a: "Yes, you are welcome to record the audio of our session for your personal reference later. If we are on a video platform that supports it, I can also provide a recording link upon request.",
      },
      {
        id: "follow-up",
        q: "What if I have follow-up questions afterward?",
        a: "If you have a quick point of clarification regarding something we discussed, you can message me within 48 hours of the reading. However, for entirely new questions or deeper analysis, a new follow-up session will need to be booked.",
      },
    ],
  },
  {
    title: "Payment and policy",
    questions: [
      {
        id: "payment-method",
        q: "How do I pay?",
        a: "Payment is collected at the time of booking through a secure gateway (Razorpay). You can pay via UPI, credit/debit cards, or net banking.",
      },
      {
        id: "cancellation-policy", // PLACEHOLDER: Update real policy text here
        q: "What is your cancellation and rescheduling policy?",
        a: "You can reschedule your appointment up to 24 hours in advance using the link in your confirmation email. Cancellations made less than 24 hours before the session cannot be accommodated.",
      },
      {
        id: "refund-policy", // PLACEHOLDER: Update real policy text here
        q: "Do you offer refunds?",
        a: "Refunds are provided if a cancellation is made at least 24 hours prior to the scheduled time. Once a reading has been conducted, no refunds are given, as you are paying for the astrologer's time and expertise.",
      },
      {
        id: "privacy", // PLACEHOLDER: Update real policy text here
        q: "Is my personal and birth information kept private?",
        a: "Absolutely. All birth details, personal circumstances, and questions discussed during the reading are kept strictly confidential and will never be shared with any third party.",
      },
    ],
  },
  {
    title: "Practice and tradition",
    questions: [
      {
        id: "parashara",
        q: "What is the Parashara tradition?",
        a: "The Parashara tradition (Brihat Parashara Hora Shastra) is the foundational text and system of classical Vedic astrology. It relies on precise mathematical calculations, planetary dignities, and Dasha systems to analyze karma and timing.",
      },
      {
        id: "predictions-vs-guidance",
        q: "Do you make predictions, or just give guidance?",
        a: "Both. The chart shows objective karmic patterns and timing (predictions), but how you navigate them requires practical advice (guidance). The goal is to provide clarity so you can make informed choices, not to instill fear or fatalism.",
      },
      {
        id: "kundli-vs-consultation",
        q: "How is a Kundli reading different from a general consultation?",
        a: "A general consultation covers all major areas of life comprehensively. A specific Kundli Analysis is typically shorter and heavily focused on answering 1-2 pressing questions or examining the current Dasha period you are running.",
      },
    ],
  },
];

export default function FaqPage() {
  // State to track which accordions are open (allows multiple open simultaneously)
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="flex min-h-screen flex-col font-sans bg-cream text-ink">
      <Header theme="light" />

      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-[720px] mx-auto">
          {/* 1. Page intro block */}
          <div className="mb-20">
            <h1 className="font-serif text-4xl text-ink mb-4">
              Frequently asked questions
            </h1>
            <p className="text-muted text-lg">
              Everything you need to know before booking a reading. Still unsure?{" "}
              <Link
                href="#whatsapp"
                className="text-gold underline underline-offset-4 decoration-gold/30 hover:decoration-gold transition-colors"
              >
                Message on WhatsApp
              </Link>
              .
            </p>
          </div>

          {/* 2. Grouped accordion */}
          <div className="flex flex-col gap-16">
            {FAQ_GROUPS.map((group) => (
              <section key={group.title} className="flex flex-col">
                <h2 className="font-serif text-xl mb-2 text-ink">
                  {group.title}
                </h2>
                <div className="h-[1px] w-full bg-divider mb-4" />

                <div className="flex flex-col">
                  {group.questions.map((item) => {
                    const isOpen = !!openItems[item.id];

                    return (
                      <div
                        key={item.id}
                        className="border-b border-divider flex flex-col group"
                      >
                        <button
                          onClick={() => toggleItem(item.id)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-answer-${item.id}`}
                          className="w-full text-left py-6 flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream transition-colors group-hover:text-ink text-ink/90"
                        >
                          <h3 className="font-serif text-lg font-medium pr-8 leading-snug">
                            {item.q}
                          </h3>
                          <ChevronDown
                            className={`w-5 h-5 flex-shrink-0 text-muted transition-transform duration-300 ease-in-out ${
                              isOpen ? "rotate-180" : ""
                            }`}
                            strokeWidth={1.5}
                          />
                        </button>
                        <div
                          id={`faq-answer-${item.id}`}
                          role="region"
                          className={`grid transition-all duration-300 ease-in-out ${
                            isOpen
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            {/* Inner div provides padding that doesn't mess with the 0fr height */}
                            <p className="pb-6 text-muted text-base leading-relaxed pr-8">
                              {item.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* 4. Closing nudge */}
          <div className="mt-24 pt-12 border-t border-divider text-center">
            <p className="text-muted">
              Didn&apos;t find your answer?{" "}
              <Link
                href="#whatsapp"
                className="text-gold underline underline-offset-4 decoration-gold/30 hover:decoration-gold transition-colors"
              >
                Ask on WhatsApp
              </Link>
              {" or "}
              <Link
                href="/contact"
                className="text-gold underline underline-offset-4 decoration-gold/30 hover:decoration-gold transition-colors"
              >
                send a message
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
