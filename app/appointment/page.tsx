"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Check, Loader2 } from "lucide-react";

// --- TYPES & MOCK DATA ---

type Step = 1 | 2 | 3 | 4 | 5; // 5 is success

type ServiceId = "consultation" | "kundli" | "muhurat";
type ModeId = "video" | "whatsapp" | "phone";

interface BookingState {
  serviceId: ServiceId | null;
  modeId: ModeId | null;
  date: string | null;
  slot: string | null;
  email: string;
  name: string;
  dob: string;
  tob: string;
  pob: string;
  focus: string;
  isAuthenticated: boolean;
}

const SERVICES = [
  {
    id: "consultation" as const,
    title: "Vedic Astrology Consultation",
    duration: "60 min",
    fee: "₹5,000",
  },
  {
    id: "kundli" as const,
    title: "Kundli Analysis",
    duration: "45 min",
    fee: "₹3,500",
  },
  {
    id: "muhurat" as const,
    title: "Muhurat Guidance",
    duration: "30 min",
    fee: "₹2,000",
  },
];

const MODES = [
  { id: "video" as const, label: "Video call" },
  { id: "whatsapp" as const, label: "WhatsApp" },
  { id: "phone" as const, label: "Phone call" },
];

// PLACEHOLDER DATES & SLOTS
// To be wired to a real calendar integration later
const MOCK_DATES = [
  { date: "2026-09-28", label: "Mon 28", available: true },
  { date: "2026-09-29", label: "Tue 29", available: true },
  { date: "2026-09-30", label: "Wed 30", available: false },
  { date: "2026-10-01", label: "Thu 01", available: true },
  { date: "2026-10-02", label: "Fri 02", available: true },
  { date: "2026-10-03", label: "Sat 03", available: true },
  { date: "2026-10-04", label: "Sun 04", available: false },
];

const MOCK_SLOTS = [
  { id: "10:00", label: "10:00 AM", istLabel: "4:30 PM IST" },
  { id: "11:30", label: "11:30 AM", istLabel: "6:00 PM IST" },
  { id: "14:00", label: "2:00 PM", istLabel: "8:30 PM IST" },
  { id: "15:30", label: "3:30 PM", istLabel: "10:00 PM IST" },
];

export default function AppointmentPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isPaying, setIsPaying] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [state, setState] = useState<BookingState>({
    serviceId: null,
    modeId: null,
    date: null,
    slot: null,
    email: "",
    name: "",
    dob: "",
    tob: "",
    pob: "",
    focus: "",
    isAuthenticated: false,
  });

  const updateState = (updates: Partial<BookingState>) => {
    setState((prev) => ({ ...prev, ...updates }));
    // Clear errors for fields that are being updated
    if (Object.keys(errors).length > 0) {
      const newErrors = { ...errors };
      Object.keys(updates).forEach((key) => delete newErrors[key]);
      setErrors(newErrors);
    }
  };

  const nextStep = () => setCurrentStep((prev) => (prev + 1) as Step);
  const prevStep = () => setCurrentStep((prev) => (prev - 1) as Step);

  // --- VALIDATION ---
  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!state.name.trim()) newErrors.name = "Name is required";
    if (!state.dob.trim()) newErrors.dob = "Date of birth is required";
    if (!state.tob.trim()) newErrors.tob = "Time of birth is required";
    if (!state.pob.trim()) newErrors.pob = "Place of birth is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep3Continue = () => {
    if (validateStep3()) {
      nextStep();
    }
  };

  // --- MOCK AUTH ---
  // To be replaced with real auth (e.g., NextAuth, Supabase, etc.)
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.email.trim() && state.email.includes("@")) {
      updateState({ isAuthenticated: true });
    } else {
      setErrors({ email: "Please enter a valid email address" });
    }
  };

  // --- MOCK PAYMENT ---
  // To be replaced with actual Razorpay or Stripe integration
  const simulatePayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setCurrentStep(5); // Success state
    }, 1500);
  };

  // --- STEP INDICATOR ---
  const steps = [
    { num: 1, label: "Service" },
    { num: 2, label: "Time" },
    { num: 3, label: "Details" },
    { num: 4, label: "Pay" },
  ];

  return (
    <div className="flex min-h-screen flex-col font-sans bg-cream text-ink">
      <Header theme="light" />

      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          {/* STEP INDICATOR */}
          {currentStep < 5 && (
            <div className="mb-12">
              <div className="flex items-center justify-between relative">
                {/* Connecting line */}
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-divider -z-10 transform -translate-y-1/2" />

                {steps.map((step) => {
                  const isCompleted = currentStep > step.num;
                  const isCurrent = currentStep === step.num;
                  const isFuture = currentStep < step.num;

                  return (
                    <div
                      key={step.num}
                      className="bg-cream px-2 flex flex-col items-center gap-2"
                    >
                      <div className="text-xs uppercase tracking-wider font-medium flex flex-col items-center gap-1">
                        {isCompleted && (
                          <Check
                            className="w-4 h-4 text-muted"
                            strokeWidth={2}
                          />
                        )}
                        {!isCompleted && (
                          <div className="w-4 h-4" /> // Spacing placeholder
                        )}
                        <span
                          className={`
                            ${isCurrent ? "text-ink" : "text-muted"}
                            ${isFuture && "opacity-60"}
                          `}
                        >
                          {step.label}
                        </span>
                        {/* Gold underline for current step */}
                        {isCurrent ? (
                          <div className="h-[2px] w-full bg-gold mt-1" />
                        ) : (
                          <div className="h-[2px] w-full bg-transparent mt-1" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 1: SERVICE & MODE */}
          {/* ========================================================= */}
          {currentStep === 1 && (
            <div className="animate-fade-in">
              <h1 className="font-serif text-3xl md:text-4xl mb-8">
                Choose a service
              </h1>

              <div className="flex flex-col gap-4 mb-10">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => updateState({ serviceId: s.id })}
                    className={`flex items-center justify-between p-5 border text-left transition-colors bg-cream
                      ${
                        state.serviceId === s.id
                          ? "border-divider border-l-gold border-l-2"
                          : "border-divider hover:border-ink/20"
                      }
                    `}
                  >
                    <div>
                      <h3 className="font-serif text-xl mb-1">{s.title}</h3>
                      <p className="text-sm text-muted">{s.duration}</p>
                    </div>
                    <span className="font-medium">{s.fee}</span>
                  </button>
                ))}
              </div>

              <h2 className="font-serif text-2xl mb-6">
                How would you like to consult?
              </h2>
              <div className="flex flex-col gap-3 mb-12">
                {MODES.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => updateState({ modeId: m.id })}
                    className={`p-4 border text-left transition-colors bg-cream font-medium
                      ${
                        state.modeId === m.id
                          ? "border-divider border-l-gold border-l-2"
                          : "border-divider hover:border-ink/20"
                      }
                    `}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              <div className="flex justify-end pt-6 border-t border-divider">
                <button
                  onClick={nextStep}
                  disabled={!state.serviceId || !state.modeId}
                  className="bg-ink text-cream px-8 py-3 rounded-full text-sm font-medium hover:bg-ink/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 2: DATE & TIME */}
          {/* ========================================================= */}
          {currentStep === 2 && (
            <div className="animate-fade-in">
              <h1 className="font-serif text-3xl md:text-4xl mb-8">
                Pick a time
              </h1>

              {/* Date Strip */}
              <div className="flex overflow-x-auto pb-4 mb-8 -mx-6 px-6 md:mx-0 md:px-0 hide-scrollbar border-b border-divider gap-4">
                {MOCK_DATES.map((d) => (
                  <button
                    key={d.date}
                    onClick={() =>
                      d.available &&
                      updateState({ date: d.date, slot: null })
                    }
                    disabled={!d.available}
                    className={`flex flex-col items-center pb-3 min-w-[60px] flex-shrink-0 transition-colors relative
                      ${
                        !d.available
                          ? "opacity-30 cursor-not-allowed"
                          : "hover:text-gold"
                      }
                      ${state.date === d.date ? "text-ink font-medium" : "text-muted"}
                    `}
                  >
                    <span className="text-sm">{d.label.split(" ")[0]}</span>
                    <span className="text-lg">{d.label.split(" ")[1]}</span>
                    {state.date === d.date && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold" />
                    )}
                  </button>
                ))}
              </div>

              {/* Slots Grid */}
              <p className="text-xs text-muted mb-6 leading-relaxed">
                Times shown in your local time (auto-detected timezone), IST
                also noted next to each slot.
              </p>

              {state.date ? (
                <div className="flex flex-wrap gap-4 mb-12">
                  {MOCK_SLOTS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => updateState({ slot: s.id })}
                      className={`px-5 py-3 border transition-colors text-sm font-medium flex flex-col items-start
                        ${
                          state.slot === s.id
                            ? "border-ink bg-ink text-cream"
                            : "border-divider text-ink hover:border-ink/30 bg-cream"
                        }
                      `}
                    >
                      <span>{s.label}</span>
                      <span
                        className={`text-xs mt-1 ${
                          state.slot === s.id ? "text-cream/70" : "text-muted"
                        }`}
                      >
                        ({s.istLabel})
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-muted mb-12 border border-divider">
                  Select a date above to see available times.
                </div>
              )}

              <div className="flex items-center justify-between pt-6 border-t border-divider">
                <button
                  onClick={prevStep}
                  className="text-sm text-muted hover:text-ink transition-colors underline underline-offset-4 decoration-transparent hover:decoration-ink/30"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!state.date || !state.slot}
                  className="bg-ink text-cream px-8 py-3 rounded-full text-sm font-medium hover:bg-ink/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 3: DETAILS */}
          {/* ========================================================= */}
          {currentStep === 3 && (
            <div className="animate-fade-in">
              <h1 className="font-serif text-3xl md:text-4xl mb-8">
                A few details
              </h1>

              {!state.isAuthenticated ? (
                <div className="mb-12">
                  <form onSubmit={handleAuth} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="email" className="text-sm font-medium mb-2">
                        Email address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={state.email}
                        onChange={(e) => updateState({ email: e.target.value })}
                        className={`border bg-transparent px-4 py-3 text-ink focus:outline-none focus:border-gold transition-colors ${
                          errors.email ? "border-red-800/40" : "border-divider"
                        }`}
                        placeholder="you@example.com"
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                      />
                      {errors.email && (
                        <span
                          id="email-error"
                          className="text-xs text-red-800/80 mt-2"
                        >
                          {errors.email}
                        </span>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="bg-ink text-cream px-6 py-3 font-medium hover:bg-ink/90 transition-colors"
                    >
                      Continue with email
                    </button>
                    <button
                      type="button"
                      className="border border-divider text-ink px-6 py-3 font-medium hover:border-ink/30 transition-colors"
                    >
                      Continue with Google
                    </button>
                  </form>
                </div>
              ) : (
                <div className="mb-12 animate-fade-in">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-divider">
                    <span className="text-sm text-muted">
                      Signed in as {state.email}
                    </span>
                    <button
                      onClick={() => updateState({ isAuthenticated: false })}
                      className="text-sm text-muted underline underline-offset-4 decoration-transparent hover:decoration-muted transition-colors"
                    >
                      Change
                    </button>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col">
                      <label htmlFor="name" className="text-sm font-medium mb-2">
                        Full name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={state.name}
                        onChange={(e) => updateState({ name: e.target.value })}
                        className={`border bg-transparent px-4 py-3 text-ink focus:outline-none focus:border-gold transition-colors ${
                          errors.name ? "border-red-800/40" : "border-divider"
                        }`}
                        aria-describedby={
                          errors.name ? "name-error" : undefined
                        }
                      />
                      {errors.name && (
                        <span
                          id="name-error"
                          className="text-xs text-red-800/80 mt-2"
                        >
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="dob" className="text-sm font-medium mb-2">
                        Date of birth
                      </label>
                      <input
                        id="dob"
                        type="date"
                        value={state.dob}
                        onChange={(e) => updateState({ dob: e.target.value })}
                        className={`border bg-transparent px-4 py-3 text-ink focus:outline-none focus:border-gold transition-colors ${
                          errors.dob ? "border-red-800/40" : "border-divider"
                        }`}
                        aria-describedby={errors.dob ? "dob-error" : undefined}
                      />
                      {errors.dob && (
                        <span
                          id="dob-error"
                          className="text-xs text-red-800/80 mt-2"
                        >
                          {errors.dob}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="tob" className="text-sm font-medium mb-1">
                        Time of birth
                      </label>
                      <p className="text-xs text-muted mb-2">
                        Exact birth time gives the most accurate reading.
                      </p>
                      <input
                        id="tob"
                        type="time"
                        value={state.tob}
                        onChange={(e) => updateState({ tob: e.target.value })}
                        className={`border bg-transparent px-4 py-3 text-ink focus:outline-none focus:border-gold transition-colors ${
                          errors.tob ? "border-red-800/40" : "border-divider"
                        }`}
                        aria-describedby={errors.tob ? "tob-error" : undefined}
                      />
                      {errors.tob && (
                        <span
                          id="tob-error"
                          className="text-xs text-red-800/80 mt-2"
                        >
                          {errors.tob}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="pob" className="text-sm font-medium mb-2">
                        Place of birth
                      </label>
                      <input
                        id="pob"
                        type="text"
                        value={state.pob}
                        onChange={(e) => updateState({ pob: e.target.value })}
                        placeholder="City, State, Country"
                        className={`border bg-transparent px-4 py-3 text-ink focus:outline-none focus:border-gold transition-colors ${
                          errors.pob ? "border-red-800/40" : "border-divider"
                        }`}
                        aria-describedby={errors.pob ? "pob-error" : undefined}
                      />
                      {errors.pob && (
                        <span
                          id="pob-error"
                          className="text-xs text-red-800/80 mt-2"
                        >
                          {errors.pob}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="focus"
                        className="text-sm font-medium mb-2"
                      >
                        What would you like to focus on? (optional)
                      </label>
                      <textarea
                        id="focus"
                        rows={4}
                        value={state.focus}
                        onChange={(e) => updateState({ focus: e.target.value })}
                        className="border border-divider bg-transparent px-4 py-3 text-ink focus:outline-none focus:border-gold transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-6 border-t border-divider">
                <button
                  onClick={prevStep}
                  className="text-sm text-muted hover:text-ink transition-colors underline underline-offset-4 decoration-transparent hover:decoration-ink/30"
                >
                  Back
                </button>
                <button
                  onClick={handleStep3Continue}
                  disabled={!state.isAuthenticated}
                  className="bg-ink text-cream px-8 py-3 rounded-full text-sm font-medium hover:bg-ink/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 4: REVIEW & PAY */}
          {/* ========================================================= */}
          {currentStep === 4 && (
            <div className="animate-fade-in">
              <h1 className="font-serif text-3xl md:text-4xl mb-8">
                Review your booking
              </h1>

              <div className="border border-divider p-6 mb-4 bg-transparent text-sm">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between border-b border-divider pb-4">
                    <span className="text-muted">Service</span>
                    <span className="font-medium text-right">
                      {SERVICES.find((s) => s.id === state.serviceId)?.title}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-divider pb-4">
                    <span className="text-muted">Mode</span>
                    <span className="font-medium capitalize text-right">
                      {MODES.find((m) => m.id === state.modeId)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-divider pb-4">
                    <span className="text-muted">Date & Time</span>
                    <span className="font-medium text-right">
                      {
                        MOCK_DATES.find((d) => d.date === state.date)?.label
                      }{" "}
                      · {MOCK_SLOTS.find((s) => s.id === state.slot)?.label}{" "}
                      <br className="md:hidden" />
                      <span className="text-muted font-normal">
                        ({MOCK_SLOTS.find((s) => s.id === state.slot)?.istLabel})
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-divider pb-4">
                    <span className="text-muted">Name</span>
                    <span className="font-medium text-right">{state.name}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-muted">Fee</span>
                    <span className="font-medium text-right">
                      {SERVICES.find((s) => s.id === state.serviceId)?.fee}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted mb-10 text-center">
                Your slot is held for 10 minutes while you complete payment.
              </p>

              <div className="flex flex-col items-center gap-6">
                <button
                  onClick={simulatePayment}
                  disabled={isPaying}
                  className="w-full md:w-auto bg-ink text-cream px-10 py-4 rounded-full text-base font-medium hover:bg-ink/90 transition-colors disabled:opacity-80 flex items-center justify-center min-w-[200px]"
                >
                  {isPaying ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Pay with Razorpay"
                  )}
                </button>
                <button
                  onClick={prevStep}
                  disabled={isPaying}
                  className="text-sm text-muted hover:text-ink transition-colors underline underline-offset-4 decoration-transparent hover:decoration-ink/30 disabled:opacity-50"
                >
                  Back to edit details
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 5: SUCCESS (Confirmation View) */}
          {/* ========================================================= */}
          {currentStep === 5 && (
            <div className="animate-fade-in text-center flex flex-col items-center py-12">
              <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mb-8">
                <Check className="w-8 h-8 text-gold" strokeWidth={1.5} />
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl mb-6">
                You&apos;re booked
              </h1>
              
              <p className="text-lg text-ink mb-2">
                {SERVICES.find((s) => s.id === state.serviceId)?.title}
              </p>
              <p className="text-muted mb-8">
                {MOCK_DATES.find((d) => d.date === state.date)?.label} ·{" "}
                {MOCK_SLOTS.find((s) => s.id === state.slot)?.label} (
                {MOCK_SLOTS.find((s) => s.id === state.slot)?.istLabel})
                <br />
                via {MODES.find((m) => m.id === state.modeId)?.label}
              </p>

              <p className="text-sm text-muted mb-12 border-t border-divider pt-8 max-w-md w-full">
                A confirmation with your video link has been sent to{" "}
                <span className="font-medium text-ink">{state.email}</span>
              </p>

              <div className="flex flex-col gap-4 w-full md:w-auto">
                <button className="bg-ink text-cream px-8 py-3 rounded-full text-sm font-medium hover:bg-ink/90 transition-colors">
                  Add to calendar
                </button>
                <Link
                  href="/"
                  className="text-sm font-medium text-ink underline underline-offset-4 decoration-divider hover:decoration-gold transition-colors mt-2"
                >
                  Back to home
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}} />
    </div>
  );
}
