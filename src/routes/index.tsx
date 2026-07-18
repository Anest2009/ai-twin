import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  ShieldCheck,
  Globe,
  Clock,
  Plus,
  Minus,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

const avatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
];

/* ---------------------------------------------------------------- */
/* Shared bits                                                       */
/* ---------------------------------------------------------------- */

function Eyebrow({
  children,
  tone = "ink",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "ink" | "light" | "amber";
  className?: string;
}) {
  const color =
    tone === "light"
      ? "text-white/70"
      : tone === "amber"
        ? "text-[#B98E4B]"
        : "text-[#5044A3]";
  const dot =
    tone === "light"
      ? "bg-white/70"
      : tone === "amber"
        ? "bg-[#FFB703]"
        : "bg-[#5044A3]";
  return (
    <div
      className={`flex items-center gap-2.5 font-inter text-xs font-semibold uppercase tracking-[0.22em] ${color} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Navigation                                                        */
/* ---------------------------------------------------------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-4 z-50 flex w-full justify-center px-4 sm:top-6 sm:px-6">
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-full border px-4 py-2.5 font-inter transition-all duration-300 md:px-5 ${
          scrolled
            ? "border-white/60 bg-white/70 shadow-[0_12px_40px_-12px_rgba(80,68,163,0.28)] backdrop-blur-2xl"
            : "border-white/40 bg-white/25 shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] backdrop-blur-xl"
        }`}
      >
        <a
          href="#top"
          className="flex items-center"
        >
          <img src="/images/bliss-black.png" alt="Bliss" className="h-6 w-auto md:h-8" />
        </a>
        <div className="hidden items-center gap-8 text-sm md:flex">
          <a href="#top" className="text-[#1a1a1a] transition-colors hover:text-black">
            Home
          </a>
          <a
            href="#how"
            className="text-[#1a1a1a]/60 transition-colors hover:text-[#1a1a1a]"
          >
            How it works
          </a>
          <a
            href="#features"
            className="text-[#1a1a1a]/60 transition-colors hover:text-[#1a1a1a]"
          >
            Features
          </a>
          <a
            href="#faq"
            className="text-[#1a1a1a]/60 transition-colors hover:text-[#1a1a1a]"
          >
            FAQ
          </a>
        </div>
        <button className="group flex items-center gap-1.5 rounded-full bg-[#5044A3] px-5 py-2 text-sm text-white transition-transform hover:scale-[1.03] md:px-6 md:py-2.5">
          Try AI Twin
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </nav>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Hero                                                              */
/* ---------------------------------------------------------------- */

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number;

    const updateOpacity = () => {
      if (video.duration) {
        const currentTime = video.currentTime;
        const duration = video.duration;
        const fadeDuration = 0.5;

        if (currentTime < fadeDuration) {
          setOpacity(currentTime / fadeDuration);
        } else if (currentTime > duration - fadeDuration) {
          setOpacity((duration - currentTime) / fadeDuration);
        } else {
          setOpacity(1);
        }
      }
      animationFrameId = requestAnimationFrame(updateOpacity);
    };

    const handlePlay = () => {
      animationFrameId = requestAnimationFrame(updateOpacity);
    };
    const handlePause = () => cancelAnimationFrame(animationFrameId);
    const handleEnded = () => {
      setOpacity(0);
      setTimeout(() => {
        if (video) {
          video.currentTime = 0;
          video.play().catch(() => {});
        }
      }, 100);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    video.play().catch(() => {});

    return () => {
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white px-6 pb-24 pt-32 text-center"
    >
      {/* Background video layer */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
          muted
          playsInline
          className="absolute h-full w-full object-cover transition-opacity duration-100 ease-linear"
          style={{ opacity, inset: "auto 0 0 0", top: "300px" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent via-50% to-[#D9D2FA]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#5044A3]/15 bg-white/70 px-4 py-1.5 shadow-sm backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7161EF] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7161EF]" />
          </span>
          <span className="font-inter text-xs font-medium tracking-wide text-[#5044A3]">
            Culturally intelligent mental health support
          </span>
        </motion.div>

        <h1 className="max-w-5xl font-instrument text-5xl font-normal leading-[0.95] tracking-[-0.03em] text-[#1a1a1a] opacity-0 animate-fade-rise sm:text-7xl md:text-[5.5rem]">
          Your mind is <span className="italic">always on.</span> Your support{" "}
          <span className="italic text-[#5044A3]">should be, too.</span>
        </h1>

        <p className="mt-7 max-w-xl font-inter text-base leading-relaxed text-[#1a1a1a]/75 opacity-0 animate-fade-rise-delay sm:text-lg">
          Bliss is a private AI twin trained to understand your language, your
          culture, and your story — offering evidence-based support the moment
          you need it, day or night.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 opacity-0 animate-fade-rise-delay-2 sm:flex-row">
          <button className="group flex items-center gap-2 rounded-full bg-[#5044A3] px-8 py-4 font-inter text-base text-white shadow-[0_16px_40px_-16px_rgba(80,68,163,0.7)] transition-transform hover:scale-[1.03]">
            Try your AI Twin
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <a
            href="#how"
            className="rounded-full border border-[#1a1a1a]/15 bg-white/60 px-8 py-4 font-inter text-base text-[#1a1a1a] backdrop-blur-md transition-colors hover:bg-white/90"
          >
            See how it works
          </a>
        </div>

        {/* Social proof */}
        <div className="mt-10 flex flex-col items-center gap-3 opacity-0 animate-fade-rise-delay-2 sm:flex-row sm:gap-5">
          <div className="flex -space-x-3">
            {avatars.map((src, i) => (
              <img
                key={i}
                src={src || "/placeholder.svg"}
                alt=""
                className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm"
              />
            ))}
          </div>
          <div className="flex flex-col items-center gap-0.5 sm:items-start">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-[#FFB703] text-[#FFB703]"
                />
              ))}
              <span className="ml-1 font-inter text-sm font-semibold text-[#1a1a1a]">
                4.9
              </span>
            </div>
            <span className="font-inter text-xs text-[#1a1a1a]/60">
              Trusted by 12,000+ minds worldwide
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Chat / privacy section                                            */
/* ---------------------------------------------------------------- */

function ChatSection() {
  const bubbles = [
    {
      side: "start",
      amber: false,
      text: "It went well! The breathing exercises you suggested beforehand really helped.",
    },
    {
      side: "end",
      amber: true,
      text: "That's wonderful to hear. You gave yourself space to pause — and it paid off.",
    },
    {
      side: "end",
      amber: false,
      text: "How did the conversation with your mother feel different this time?",
    },
    {
      side: "start",
      amber: false,
      text: "Yes, it felt completely different. I gave myself space to process it first, and we actually had a calm discussion.",
    },
  ];

  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      <div className="absolute inset-0 bg-[#D9D2FA]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_40%,#7161EF_0%,#9587F2_30%,transparent_70%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#D9D2FA] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-b from-transparent via-[#F4ECE9]/80 to-[#F4ECE9]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,#7161EF_0%,#9587F2_25%,transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <Eyebrow tone="light" className="mb-6">
            A single private thread
          </Eyebrow>
          <h2 className="font-display text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-[5rem]">
            Intuitive chat.
            <br />
            Total privacy.
          </h2>
          <p className="mx-auto mt-6 max-w-lg font-inter text-base text-white/85">
            No human observers. Bliss sees your patterns and remembers your
            history to give support that evolves with you — all in a single,
            private thread.
          </p>
        </motion.div>

        <div className="relative mx-auto mt-16 flex max-w-2xl flex-col gap-4">
          {bubbles.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className={`max-w-md px-6 py-4 text-left text-sm backdrop-blur-xl md:text-base ${
                b.side === "start"
                  ? "self-start rounded-3xl rounded-bl-lg"
                  : "self-end rounded-3xl rounded-br-lg"
              } ${
                b.amber
                  ? "border border-white/50 bg-gradient-to-br from-[#FFD972] to-[#FFC94A] text-[#121212] shadow-[0_20px_50px_-20px_rgba(255,201,74,0.6)]"
                  : "border border-white/60 bg-white/70 text-[#121212] shadow-[0_20px_50px_-20px_rgba(18,18,18,0.25)]"
              }`}
            >
              {b.text}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Process / How it works (reworked)                                 */
/* ---------------------------------------------------------------- */

const processPersonas = [
  {
    id: "liam",
    name: "Liam",
    context: "Lingering low mood",
    avatar: avatars[0],
    message: "It's been a long, stressful day, and I can't turn my mind off...",
    feeling: "flat and withdrawn as his low mood has been lingering.",
    thoughts: [
      "It's Saturday afternoon and he had social plans this morning",
      "Social interactions often trigger negative interpretations and self-doubt",
      "We've been working on evaluating thoughts before accepting them as fact",
    ],
    response:
      "Sounds like a stressful social morning. Why don't we take a step back and look at the thoughts your mind's getting hung up on?",
    badge: "MIND WORK",
    technique: "Catch it · Check it · Change it",
    image: "/mind_work_portrait.png",
  },
  {
    id: "sarah",
    name: "Sarah",
    context: "Performance anxiety",
    avatar: avatars[3],
    message: "I have a huge presentation tomorrow and my chest feels so tight.",
    feeling: "anxious and overwhelmed by performance pressure.",
    thoughts: [
      "Heart rate is elevated, indicating physical anxiety symptoms",
      "Anticipatory anxiety is causing a spiral of 'what-ifs'",
      "We need to regulate the nervous system before addressing the thoughts",
    ],
    response:
      "I hear how overwhelming this feels right now. Let's take a moment to regulate your breathing before we tackle the presentation.",
    badge: "SOMATIC",
    technique: "Box Breathing",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "maya",
    name: "Maya",
    context: "Strong inner critic",
    avatar: avatars[2],
    message: "I feel like I'm failing at everything lately. Nothing I do is enough.",
    feeling: "defeated, experiencing a strong inner critic.",
    thoughts: [
      "All-or-nothing thinking is dominating her current state",
      "She's discounting recent positive feedback from her manager",
      "A shift towards self-compassion is needed here",
    ],
    response:
      "That's a very heavy feeling to carry. Let's see if we can look at this through a more compassionate lens.",
    badge: "REFRAMING",
    technique: "Self-Compassion Break",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
  },
];

function Stage({
  index,
  label,
  highlight = false,
  children,
}: {
  index: number;
  label: string;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10 flex flex-col items-center">
      <div className="mb-6 flex h-16 items-center justify-center">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full font-instrument text-xl ${
            highlight
              ? "bg-[#FFB703] text-white shadow-[0_0_24px_rgba(255,183,3,0.45)]"
              : "border-2 border-[#B98E4B]/25 bg-white text-[#B98E4B] shadow-sm"
          }`}
        >
          {index}
        </div>
      </div>
      <div
        className={`flex min-h-[24rem] w-full flex-1 flex-col rounded-[1.75rem] border p-7 md:p-8 ${
          highlight
            ? "border-[#FFB703]/40 bg-gradient-to-b from-[#FFF8E7] to-[#FFEFC2] shadow-[0_30px_70px_-40px_rgba(255,183,3,0.6)]"
            : "border-white bg-[#FDFBF7] shadow-[0_20px_50px_-30px_rgba(18,18,18,0.2)]"
        }`}
      >
        <span className="mb-4 font-inter text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/40">
          {label}
        </span>
        {children}
      </div>
    </div>
  );
}

function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % processPersonas.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const current = processPersonas[activeIndex];

  return (
    <section id="how" className="relative overflow-hidden bg-[#F4ECE9] py-28 md:py-40">
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <Eyebrow tone="amber" className="mb-6">
            How it works
          </Eyebrow>
          <h2 className="max-w-3xl font-display text-4xl text-[#1a1a1a] sm:text-5xl md:text-6xl">
            Personalized support.
            <br />
            Intelligently adaptive.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-inter text-base leading-relaxed text-[#1a1a1a]/70 md:text-lg">
            With every interaction, Bliss learns what works best for you.
            Combining evidence-based practices — CBT, DBT, ACT — with real-world
            context, it gets smarter the more you use it.
          </p>
        </motion.div>

        {/* Persona selector */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
          {processPersonas.map((p, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={p.id}
                onClick={() => setActiveIndex(i)}
                className={`group flex items-center gap-3 rounded-full border py-2 pl-2 pr-5 transition-all duration-300 ${
                  isActive
                    ? "border-[#FFB703] bg-white shadow-[0_10px_30px_-12px_rgba(255,183,3,0.5)]"
                    : "border-transparent bg-white/50 hover:bg-white/80"
                }`}
              >
                <span className="relative h-9 w-9 shrink-0">
                  {isActive && (
                    <motion.svg
                      key={activeIndex}
                      className="absolute -inset-1 h-11 w-11 -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="48"
                        fill="none"
                        stroke="#FFB703"
                        strokeWidth="3"
                        strokeDasharray="301"
                        initial={{ strokeDashoffset: 301 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 9, ease: "linear" }}
                        strokeLinecap="round"
                      />
                    </motion.svg>
                  )}
                  <img
                    src={p.avatar || "/placeholder.svg"}
                    alt={p.name}
                    className={`h-9 w-9 rounded-full object-cover transition-all duration-500 ${
                      isActive ? "opacity-100" : "opacity-50 grayscale group-hover:opacity-80"
                    }`}
                  />
                </span>
                <span className="text-left">
                  <span className="block font-inter text-sm font-semibold leading-none text-[#1a1a1a]">
                    {p.name}
                  </span>
                  <span className="mt-0.5 block font-inter text-[11px] leading-none text-[#1a1a1a]/50">
                    {p.context}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Three-stage flow */}
        <div className="relative mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* connector line (desktop) */}
          <div className="pointer-events-none absolute left-[16.6%] right-[16.6%] top-8 hidden h-[2px] lg:block">
            <div className="h-full w-full rounded-full bg-[#1a1a1a]/5" />
            <motion.div
              key={`line-${activeIndex}`}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              className="absolute inset-0 h-full rounded-full bg-gradient-to-r from-[#FFB703]/50 via-[#FFB703] to-[#FFB703]"
            />
          </div>

          {/* Stage 1 — Input */}
          <Stage index={1} label="Shares">
            <AnimatePresence mode="wait">
              <motion.div
                key={`in-${activeIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="flex flex-1 flex-col"
              >
                <p className="font-display text-2xl leading-snug text-[#1a1a1a]">
                  &ldquo;{current.message}&rdquo;
                </p>
                <div className="mt-auto border-t border-[#1a1a1a]/5 pt-5">
                  <span className="mb-2 inline-block rounded-full bg-[#B98E4B]/10 px-3 py-1 font-inter text-[10px] font-bold uppercase tracking-[0.18em] text-[#B98E4B]">
                    Current state
                  </span>
                  <p className="font-inter text-sm leading-relaxed text-[#1a1a1a]/60">
                    <strong className="font-semibold text-[#1a1a1a]">
                      {current.name}
                    </strong>{" "}
                    is feeling {current.feeling}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </Stage>

          {/* Stage 2 — Thinking */}
          <Stage index={2} label="Understands">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFB703] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FFB703]" />
              </span>
              <span className="font-instrument text-xl italic text-[#B98E4B]">
                Bliss is thinking
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.ul
                key={`think-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-1 flex-col justify-center gap-5"
              >
                {current.thoughts.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 + i * 0.15 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFB703]/15">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FFB703]" />
                    </span>
                    <span className="font-inter text-[15px] leading-relaxed text-[#1a1a1a]/70">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </Stage>

          {/* Stage 3 — Response */}
          <Stage index={3} label="Responds" highlight>
            <AnimatePresence mode="wait">
              <motion.div
                key={`out-${activeIndex}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="flex flex-1 flex-col"
              >
                <p className="font-instrument text-[1.15rem] leading-relaxed text-[#1a1a1a]">
                  {current.response}
                </p>
                <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black">
                  <img
                    src={current.image || "/placeholder.svg"}
                    alt={`${current.technique} intervention`}
                    className="h-full w-full object-cover opacity-90"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/20 to-transparent" />
                  <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-white/20 px-3 py-1 backdrop-blur-md">
                    <span className="font-inter text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                      {current.badge}
                    </span>
                  </div>
                  <span className="absolute bottom-3 left-4 right-4 block font-instrument text-xl leading-tight text-white">
                    {current.technique}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </Stage>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Bento — Made for how you think                                    */
/* ---------------------------------------------------------------- */

function BlobGraphic({
  from,
  via,
  to,
  duration,
  rotate,
}: {
  from: string;
  via: string;
  to: string;
  duration: number;
  rotate: number;
}) {
  return (
    <div className="relative flex h-56 w-full items-center justify-center">
      <motion.div
        animate={{
          borderRadius: [
            "60% 40% 30% 70%/60% 30% 70% 40%",
            "30% 70% 70% 30%/30% 30% 70% 70%",
            "60% 40% 30% 70%/60% 30% 70% 40%",
          ],
          rotate: [0, rotate, 0],
        }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute h-48 w-48 bg-gradient-to-br ${from} ${via} ${to} shadow-[inset_10px_20px_30px_rgba(255,255,255,0.5)] backdrop-blur-md`}
      />
      <motion.div
        animate={{ scale: [0.8, 1, 0.8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-14 w-14 rounded-full bg-white/70 shadow-[0_0_30px_rgba(255,255,255,0.9)] backdrop-blur-xl"
      />
    </div>
  );
}

function Bento() {
  const cards = [
    {
      title: "Total Privacy.",
      body: "No human ever reads your conversations. Encrypted end to end and held for you alone.",
      tint: "from-[#7161EF]/15 to-transparent",
      graphic: (
        <BlobGraphic
          from="from-[#5044A3]"
          via="via-[#7161EF]/60"
          to="to-[#C7EAE4]/40"
          duration={10}
          rotate={180}
        />
      ),
    },
    {
      title: "Native Language.",
      body: "Fluent in 42+ languages, including the dialects and idioms of home.",
      tint: "from-[#FFD972]/25 to-transparent",
      graphic: (
        <BlobGraphic
          from="from-[#FFD972]"
          via="via-[#FF9F1C]/40"
          to="to-[#7161EF]/40"
          duration={9}
          rotate={-90}
        />
      ),
    },
    {
      title: "Cultural Context.",
      body: "Family, faith, migration — the context that shapes how you actually feel.",
      tint: "from-[#C7EAE4]/60 to-transparent",
      graphic: (
        <BlobGraphic
          from="from-[#C7EAE4]"
          via="via-[#7161EF]/40"
          to="to-[#FFD972]/60"
          duration={8}
          rotate={90}
        />
      ),
    },
  ];

  return (
    <section id="features" className="relative overflow-hidden py-28 md:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_90%_at_50%_50%,#C7EAE4_0%,#E5F4F1_40%,#F4ECE9_80%,#F4ECE9_100%)]" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#F4ECE9] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#F4ECE9] via-[#F4ECE9]/80 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-16 flex max-w-2xl flex-col items-center text-center"
        >
          <Eyebrow className="mb-6">Built around you</Eyebrow>
          <h2 className="font-display text-4xl text-[#121212] sm:text-5xl md:text-6xl">
            Made for how <span className="italic text-[#7161EF]">you</span> think.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className="group relative flex min-h-[26rem] flex-col overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 p-8 shadow-[0_30px_80px_-40px_rgba(18,18,18,0.25)] backdrop-blur-2xl transition-shadow hover:shadow-[0_40px_100px_-30px_rgba(18,18,18,0.3)] md:min-h-[30rem] md:p-9"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${c.tint}`}
              />
              <div className="relative z-10 -mt-2 mb-2 shrink-0">{c.graphic}</div>
              <div className="relative z-10 flex flex-1 flex-col">
                <h3 className="font-display text-3xl text-[#121212] md:text-[2rem]">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#121212]/65 md:text-base">
                  {c.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Impact — editorial numbers band                                   */
/* ---------------------------------------------------------------- */

function ImpactBand() {
  const stats = [
    { value: "89%", label: "feel calmer within their first two weeks" },
    { value: "42+", label: "languages and regional dialects supported" },
    { value: "24/7", label: "always-on support, never a waiting room" },
    { value: "0", label: "human observers — genuinely private, always" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F4ECE9] px-6 pb-8 pt-4 md:pb-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-y-12 rounded-[2rem] border border-white/70 bg-white/50 px-6 py-12 backdrop-blur-sm md:grid-cols-4 md:px-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center px-2 text-center"
            >
              <span className="font-instrument text-5xl leading-none text-[#5044A3] md:text-6xl">
                {s.value}
              </span>
              <span className="mt-4 max-w-[10rem] font-inter text-sm leading-relaxed text-[#1a1a1a]/60">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Testimonials                                                      */
/* ---------------------------------------------------------------- */

const baseTestimonials = [
  "A short 10-minute session had a surprisingly powerful effect on lifting my mood.",
  "Bliss changed my life. I'm speaking up more and handling challenges without stressing like before.",
  "I've noticed such an improvement in my mood since starting to use Bliss. My son even mentioned that I seem less stressed and happier lately.",
  "I'm very happy I chose to use Bliss. It's been helping me a lot and I can already feel the progress.",
  "I've been sleeping much better and feeling more relaxed. My overall mood has improved and stays more balanced during the day.",
];

const testimonials = [...baseTestimonials, ...baseTestimonials, ...baseTestimonials];

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(7);

  const handleNext = () => {
    if (activeIndex < testimonials.length - 1) setActiveIndex((p) => p + 1);
  };
  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex((p) => p - 1);
  };

  return (
    <section className="relative overflow-hidden bg-[#F4ECE9] py-28 md:py-40">
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <Eyebrow className="mb-6">In their words</Eyebrow>
          <h2 className="font-display text-4xl text-[#1a1a1a] sm:text-5xl md:text-6xl">
            Real stories.
            <br />
            Real impact.
          </h2>
          <p className="mx-auto mt-6 max-w-sm font-inter text-sm text-[#1a1a1a]/70">
            See how Bliss helps others, and find out what it can do for you.
          </p>
        </motion.div>
      </div>

      <div className="relative mt-16 flex h-[400px] w-full items-center justify-center md:h-[480px]">
        {testimonials.map((text, i) => {
          const offset = i - activeIndex;
          const absOffset = Math.abs(offset);
          const isActive = offset === 0;
          const sign = Math.sign(offset);
          const xOffset = sign * (absOffset * 300);
          const yOffset = absOffset * 25;
          if (absOffset > 5) return null;

          return (
            <motion.div
              key={i}
              animate={{
                x: xOffset,
                y: yOffset,
                rotateZ: offset * 8,
                scale: isActive ? 1 : 1 - absOffset * 0.05,
                zIndex: 50 - absOffset,
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute flex h-[360px] w-[280px] flex-col justify-center rounded-3xl p-8 shadow-[0_20px_40px_-20px_rgba(18,18,18,0.08)] transition-colors duration-500 md:h-[400px] md:w-[320px] md:p-10 ${
                isActive ? "bg-[#FDFBF7]" : "bg-[#EAE1DA]"
              }`}
            >
              {isActive && (
                <div className="mb-5 flex items-center gap-1">
                  {[...Array(5)].map((_, s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 fill-[#FFB703] text-[#FFB703]"
                    />
                  ))}
                </div>
              )}
              <p
                className="font-instrument text-xl leading-relaxed text-[#1a1a1a] transition-opacity duration-500 md:text-2xl"
                style={{
                  opacity: isActive ? 1 : Math.max(0, 0.5 - absOffset * 0.15),
                }}
              >
                &ldquo;{text}&rdquo;
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-50 mt-14 flex items-center justify-center gap-4">
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          aria-label="Previous testimonial"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1a1a1a] shadow-sm transition hover:scale-105 disabled:opacity-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={handleNext}
          disabled={activeIndex === testimonials.length - 1}
          aria-label="Next testimonial"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1a1a1a] shadow-sm transition hover:scale-105 disabled:opacity-50"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* FAQ                                                               */
/* ---------------------------------------------------------------- */

const faqs = [
  {
    q: "Is Bliss really private?",
    a: "Yes. Your conversations are encrypted end to end and never read by a human. Bliss remembers your history only to support you — it is never sold, shared, or reviewed.",
  },
  {
    q: "Which languages and cultures does Bliss understand?",
    a: "Bliss is fluent in 42+ languages, including regional dialects and idioms. It's trained to hold cultural context — family, faith, migration — so support feels like it comes from someone who truly gets you.",
  },
  {
    q: "Is Bliss a replacement for a therapist?",
    a: "No. Bliss offers evidence-based, 24/7 support between sessions and for the everyday moments in between. For clinical care, we help connect you with licensed human therapists.",
  },
  {
    q: "What approaches does Bliss draw from?",
    a: "Bliss blends CBT, DBT, and ACT techniques, adapting to what works best for you over time. The more you use it, the more personalized its support becomes.",
  },
  {
    q: "How do I get started?",
    a: "Enter your email to create your private AI twin. You can begin a conversation in seconds — no waiting rooms, no forms, no judgment.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-[#F4ECE9] py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow className="mb-6">Good to know</Eyebrow>
          <h2 className="font-display text-4xl text-[#1a1a1a] sm:text-5xl">
            Questions,
            <br />
            <span className="italic text-[#5044A3]">answered.</span>
          </h2>
          <p className="mt-6 max-w-sm font-inter text-base leading-relaxed text-[#1a1a1a]/65">
            Everything you might want to know before you meet your AI twin.
            Still curious? Reach out any time.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen
                    ? "border-[#5044A3]/20 bg-white"
                    : "border-white bg-white/60"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-instrument text-xl text-[#1a1a1a] md:text-2xl">
                    {f.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen ? "bg-[#5044A3] text-white" : "bg-[#5044A3]/10 text-[#5044A3]"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-6 pb-6 font-inter text-[15px] leading-relaxed text-[#1a1a1a]/65">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Footer / final CTA                                                */
/* ---------------------------------------------------------------- */

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="font-inter text-xs font-bold uppercase tracking-[0.18em] text-[#1a1a1a]/40">
        {title}
      </h4>
      <ul className="mt-5 flex flex-col gap-3">
        {links.map((l) => (
          <li key={l}>
            <a
              href="#"
              className="font-inter text-sm text-[#1a1a1a]/65 transition-colors hover:text-[#5044A3]"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#F4ECE9] px-6 pt-24 text-[#1a1a1a] md:pt-32">
      <div className="relative mx-auto max-w-6xl">
        {/* CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/60 px-6 py-16 text-center shadow-[0_40px_100px_-50px_rgba(80,68,163,0.5)] backdrop-blur-xl md:px-16 md:py-20"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(113,97,239,0.12),transparent_70%)]" />
          <div className="relative flex flex-col items-center">
            <Eyebrow className="mb-7">Begin whenever you&apos;re ready</Eyebrow>
            <h2 className="max-w-3xl font-instrument text-5xl font-normal leading-[0.95] tracking-[-0.03em] text-[#1a1a1a] sm:text-6xl md:text-[5rem]">
              Powered by real
              <br />
              <span className="italic text-[#5044A3]">cultural interactions.</span>
            </h2>
            <p className="mt-7 max-w-xl font-inter text-base leading-relaxed text-[#1a1a1a]/70 md:text-lg">
              Every conversation deepens Bliss&apos;s understanding of the
              cultures it serves — a proprietary engine trained where lived
              experience meets clinical care.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-12 flex w-full max-w-md items-center gap-2 rounded-full border border-[#1a1a1a]/10 bg-white/80 p-2 shadow-sm backdrop-blur-md transition-all focus-within:shadow-md"
            >
              <Input
                type="email"
                required
                placeholder="you@yourworld.com"
                aria-label="Email address"
                className="flex-1 border-0 bg-transparent px-4 font-inter text-sm text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 shadow-none focus-visible:ring-0"
              />
              <Button
                type="submit"
                className="shrink-0 rounded-full bg-[#5044A3] px-6 py-2.5 font-inter text-sm text-white transition-transform hover:scale-[1.03]"
              >
                Try AI Twin
              </Button>
            </form>
            <p className="mt-4 font-inter text-xs text-[#1a1a1a]/45">
              No credit card required · Private by design
            </p>
          </div>
        </motion.div>

        {/* Footer links */}
        <div className="grid grid-cols-2 gap-10 py-20 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <span className="flex items-center">
              <img src="/images/bliss-purple.png" alt="Bliss" className="h-8 w-auto md:h-10" />
            </span>
            <p className="mt-4 max-w-xs font-inter text-sm leading-relaxed text-[#1a1a1a]/55">
              A culturally intelligent, private AI twin for your mind — available
              whenever you need it.
            </p>
          </div>
          <FooterCol
            title="Product"
            links={["How it works", "Features", "Privacy", "Languages"]}
          />
          <FooterCol
            title="Company"
            links={["About", "Careers", "Human Therapy", "Contact"]}
          />
          <FooterCol
            title="Legal"
            links={["Terms", "Privacy Policy", "Security", "Cookies"]}
          />
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#1a1a1a]/10 py-8 font-inter text-sm text-[#1a1a1a]/50 md:flex-row">
          <span>© {new Date().getFullYear()} Bliss. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Support that never sleeps
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------- */
/* Page                                                              */
/* ---------------------------------------------------------------- */

function Landing() {
  return (
    <div className="min-h-screen bg-[#F4ECE9] text-[#1a1a1a]">
      <Nav />
      <Hero />
      <ChatSection />
      <ProcessSection />
      <Bento />
      <ImpactBand />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
