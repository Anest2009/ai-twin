import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

function Nav() {
  return (
    <div className="fixed left-0 right-0 top-6 z-50 flex w-full justify-center px-4 sm:px-6">
      <nav className="flex w-full max-w-4xl items-center justify-between rounded-full border border-white/40 bg-white/20 px-4 py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] backdrop-blur-xl font-inter transition-all md:px-6">
        <div className="font-instrument text-2xl tracking-tight text-[#1a1a1a] md:text-3xl">
          Bliss
        </div>
        <div className="hidden items-center gap-8 text-sm md:flex">
          <a href="#" className="text-[#1a1a1a] transition-colors hover:text-black">Home</a>
          <a href="#chat" className="text-[#1a1a1a]/70 transition-colors hover:text-[#1a1a1a]">How it works</a>
          <a href="#features" className="text-[#1a1a1a]/70 transition-colors hover:text-[#1a1a1a]">Features</a>
          <a href="#" className="text-[#1a1a1a]/70 transition-colors hover:text-[#1a1a1a]">Try Bliss</a>
        </div>
        <button className="rounded-full bg-[#5044A3] px-5 py-2 text-sm text-white transition-transform hover:scale-[1.03] md:px-6 md:py-2.5">
          Try AI Twin
        </button>
      </nav>
    </div>
  );
}

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number;
    let isFadingOut = false;

    const updateOpacity = () => {
      if (video.duration) {
        const currentTime = video.currentTime;
        const duration = video.duration;
        const fadeDuration = 0.5;

        if (currentTime < fadeDuration) {
          setOpacity(currentTime / fadeDuration);
          isFadingOut = false;
        } else if (currentTime > duration - fadeDuration) {
          setOpacity((duration - currentTime) / fadeDuration);
          isFadingOut = true;
        } else {
          setOpacity(1);
          isFadingOut = false;
        }
      }
      animationFrameId = requestAnimationFrame(updateOpacity);
    };

    const handlePlay = () => {
      animationFrameId = requestAnimationFrame(updateOpacity);
    };

    const handlePause = () => {
      cancelAnimationFrame(animationFrameId);
    };

    const handleEnded = () => {
      setOpacity(0);
      setTimeout(() => {
        if (video) {
          video.currentTime = 0;
          video.play().catch(() => { });
        }
      }, 100);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    video.play().catch(() => { });

    return () => {
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white px-6 pb-40 pt-[calc(8rem-75px)] text-center">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
          muted
          playsInline
          className="absolute bottom-0 left-0 right-0 top-[300px] h-full w-full object-cover transition-opacity duration-100 ease-linear"
          style={{ opacity, inset: 'auto 0 0 0', top: '300px' }}
        />
        {/* Gradient overlay pulling the purple up from the next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent via-50% to-[#D9D2FA]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="font-instrument text-5xl font-normal leading-[0.95] tracking-[-2.46px] text-[#1a1a1a] opacity-0 animate-fade-rise sm:text-7xl md:text-8xl max-w-7xl">
          Your mind is <span className="italic text-[#1a1a1a]">always on.</span> Your support <span className="italic text-[#1a1a1a]">should be, too.</span>
        </h1>

        <p className="font-inter mt-8 max-w-2xl text-base leading-relaxed text-[#1a1a1a]/80 opacity-0 animate-fade-rise-delay sm:text-lg">
          Bliss is 24/7 support for your mind. A culturally intelligent, private AI twin that speaks your native language.
        </p>

        <button className="font-inter mt-12 rounded-full bg-[#5044A3] px-14 py-5 text-base text-[#FFFFFF] opacity-0 animate-fade-rise-delay-2 transition-transform hover:scale-[1.03]">
          Try AI Twin
        </button>
      </div>
    </section>
  );
}

function ChatSection() {
  return (
    <section id="chat" className="relative overflow-hidden py-32 md:py-48">
      {/* Base background color */}
      <div className="absolute inset-0 bg-[#D9D2FA]" />

      {/* The glowing center spotlight (retained from original design) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_40%,#7161EF_0%,#9587F2_30%,transparent_70%)]" />

      {/* Top seamless blend from Hero */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#D9D2FA] to-transparent" />

      {/* Heavy bottom linear blend to completely flatten the curve and merge into Bento */}
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-b from-transparent via-[#F4ECE9]/80 to-[#F4ECE9]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,#7161EF_0%,#9587F2_25%,transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="font-display text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          Intuitive chat.
          <br />
          Total privacy.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mx-auto mt-6 max-w-lg text-base text-white/85"
        >
          No human observers. Bliss sees your patterns and remembers your history to give support that evolves with you — all in a single, private thread.
        </motion.p>

        {/* Floating chat bubbles */}
        <div className="relative mx-auto mt-20 flex max-w-2xl flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-md self-start rounded-3xl rounded-bl-lg border border-white/60 bg-white/70 px-6 py-4 text-left text-sm text-[#121212] shadow-[0_20px_50px_-20px_rgba(18,18,18,0.25)] backdrop-blur-xl md:text-base"
          >
            It went well! The breathing exercises you suggested beforehand really helped.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-md self-end rounded-3xl rounded-br-lg border border-white/50 bg-gradient-to-br from-[#FFD972] to-[#FFC94A] px-6 py-4 text-left text-sm text-[#121212] shadow-[0_20px_50px_-20px_rgba(255,201,74,0.6)] backdrop-blur-xl md:text-base"
          >
            That's wonderful to hear. You gave yourself space to pause — and it paid off.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-md self-end rounded-3xl rounded-br-lg border border-white/60 bg-white/70 px-6 py-4 text-left text-sm text-[#121212] shadow-[0_20px_50px_-20px_rgba(18,18,18,0.25)] backdrop-blur-xl md:text-base"
          >
            How did the conversation with your mother feel different this time?
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="max-w-md self-start rounded-3xl rounded-bl-lg border border-white/60 bg-white/70 px-6 py-4 text-left text-sm text-[#121212] shadow-[0_20px_50px_-20px_rgba(18,18,18,0.25)] backdrop-blur-xl md:text-base"
          >
            Yes, it felt completely different. I gave myself space to process it first, and we actually had a calm discussion.
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Bento() {
  const cards = [
    {
      title: "Total Privacy.",
      body: "No human ever reads your conversations. Encrypted, held for you alone.",
      tint: "from-[#7161EF]/15 to-transparent",
      graphic: (
        <div className="relative flex h-64 w-full items-center justify-center">
          <motion.div
            animate={{ 
              borderRadius: ["60% 40% 30% 70%/60% 30% 70% 40%", "30% 70% 70% 30%/30% 30% 70% 70%", "60% 40% 30% 70%/60% 30% 70% 40%"],
              rotate: [0, 180, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-56 w-56 bg-gradient-to-br from-[#5044A3] via-[#7161EF]/60 to-[#C7EAE4]/40 shadow-[inset_10px_20px_30px_rgba(255,255,255,0.4)] backdrop-blur-md"
          />
          {/* Inner glowing core */}
          <motion.div
            animate={{ scale: [0.8, 1, 0.8] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-16 w-16 rounded-full bg-white/70 shadow-[0_0_30px_rgba(255,255,255,0.9)] backdrop-blur-xl"
          />
        </div>
      ),
    },
    {
      title: "Native Language.",
      body: "Fluent in 42+ languages, including the dialects and idioms of home.",
      tint: "from-[#FFD972]/25 to-transparent",
      graphic: (
        <div className="relative flex h-64 w-full items-center justify-center">
          <motion.div
            animate={{ 
              borderRadius: ["40% 60% 70% 30%/40% 40% 60% 50%", "70% 30% 30% 70%/70% 60% 40% 40%", "40% 60% 70% 30%/40% 40% 60% 50%"],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-56 w-56 bg-gradient-to-br from-[#FFD972] via-[#FF9F1C]/40 to-[#7161EF]/40 shadow-[inset_10px_20px_30px_rgba(255,255,255,0.6)] backdrop-blur-md"
          />
          {/* Inner glowing core */}
          <motion.div
            animate={{ scale: [0.85, 1.05, 0.85] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-14 w-14 rounded-full bg-white/80 shadow-[0_0_30px_rgba(255,255,255,0.9)] backdrop-blur-xl"
          />
        </div>
      ),
    },
    {
      title: "Cultural Context.",
      body: "Family, faith, migration — the context that shapes how you actually feel.",
      tint: "from-[#C7EAE4]/60 to-transparent",
      graphic: (
        <div className="relative flex h-64 w-full items-center justify-center">
          <motion.div
            animate={{ 
              borderRadius: ["60% 40% 30% 70%/60% 30% 70% 40%", "30% 70% 70% 30%/30% 30% 70% 70%", "60% 40% 30% 70%/60% 30% 70% 40%"],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-56 w-56 bg-gradient-to-br from-[#C7EAE4] via-[#7161EF]/40 to-[#FFD972]/60 shadow-[inset_10px_20px_30px_rgba(255,255,255,0.6)] backdrop-blur-md"
          />
          {/* Inner glowing core */}
          <motion.div
            animate={{ scale: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-16 w-16 rounded-full bg-white/70 shadow-[0_0_30px_rgba(255,255,255,0.9)] backdrop-blur-xl"
          />
        </div>
      ),
    },
  ];
  return (
    <section id="features" className="relative overflow-hidden py-32 md:py-48">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_90%_at_50%_50%,#C7EAE4_0%,#E5F4F1_40%,#F4ECE9_80%,#F4ECE9_100%)]" />
      {/* Seamless blend from the chat section above */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#F4ECE9] to-transparent" />
      {/* Seamless blend to the testimonials section below */}
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#F4ECE9] via-[#F4ECE9]/80 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-20 max-w-2xl text-center"
        >
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
              className="group relative flex min-h-[28rem] flex-col overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 p-8 shadow-[0_30px_80px_-40px_rgba(18,18,18,0.25)] backdrop-blur-2xl transition-shadow hover:shadow-[0_40px_100px_-30px_rgba(18,18,18,0.3)] md:min-h-[34rem] md:p-10"
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${c.tint}`} />
              <div className="relative z-10 -mt-4 mb-4 shrink-0">
                {c.graphic}
              </div>
              <div className="relative z-10 flex flex-1 flex-col">
                <h3 className="font-display text-3xl text-[#121212] md:text-4xl">{c.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#121212]/70 md:text-base">{c.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const baseTestimonials = [
  "A short 10-minute session had a surprisingly powerful effect on lifting my mood.",
  "Bliss changed my life. I'm speaking up more and handling challenges without stressing like before.",
  "I've noticed such an improvement in my mood since starting to use Bliss. My son even mentioned that I seem less stressed and happier lately.",
  "I'm very happy I chose to use Bliss. It's been helping me a lot and I can already feel the progress.",
  "I've been sleeping much better and feeling more relaxed. My overall mood has improved and stays more balanced during the day."
];

// Duplicate the array to create a wide, wrap-around effect that fills the screen from side to side
const testimonials = [...baseTestimonials, ...baseTestimonials, ...baseTestimonials];

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(7); // Start in the middle of the expanded array

  const handleNext = () => {
    if (activeIndex < testimonials.length - 1) setActiveIndex(prev => prev + 1);
  };
  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex(prev => prev - 1);
  };

  return (
    <section className="relative overflow-hidden bg-[#F4ECE9] py-32 md:py-48">
      {/* Header section constrained to max-width */}
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl text-[#1a1a1a] sm:text-5xl md:text-6xl">
            Real stories.<br />Real impact.
          </h2>
          <p className="mx-auto mt-6 max-w-sm text-sm text-[#1a1a1a]/70">
            See how Bliss helps others, and find out what it can do for you.
          </p>
        </motion.div>
      </div>

      {/* Carousel Track unconstrained, spans side to side */}
      <div className="relative mt-20 flex h-[400px] w-full items-center justify-center md:h-[500px]">
        {testimonials.map((text, i) => {
          const offset = i - activeIndex;
          const absOffset = Math.abs(offset);
          const isActive = offset === 0;
          const sign = Math.sign(offset);

          // Progressive horizontal shift for carousel depth. 
          // The cards bleed off the edge of the screen completely.
          const xOffset = sign * (absOffset * 300);
          
          // The arched shape (pushing down the side cards)
          const yOffset = absOffset * 25;

          // Only render cards that are relatively close to viewport
          if (absOffset > 5) return null;

          return (
            <motion.div
              key={i}
              animate={{
                x: xOffset,
                y: yOffset,
                rotateZ: offset * 8, // dramatic fan rotation
                scale: isActive ? 1 : 1 - absOffset * 0.05,
                zIndex: 50 - absOffset,
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute flex h-[360px] w-[280px] flex-col justify-center rounded-3xl p-8 shadow-[0_20px_40px_-20px_rgba(18,18,18,0.08)] transition-colors duration-500 md:h-[420px] md:w-[320px] md:p-10 ${
                isActive ? "bg-[#FDFBF7]" : "bg-[#EAE1DA]"
              }`}
            >
              {/* Text fades out on inactive cards, but the card itself remains solid */}
              <p 
                className="font-instrument text-xl leading-relaxed text-[#1a1a1a] transition-opacity duration-500 md:text-2xl"
                style={{ opacity: isActive ? 1 : Math.max(0, 0.5 - absOffset * 0.15) }}
              >
                “{text}”
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="relative z-50 mt-16 flex items-center justify-center gap-4">
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1a1a1a] shadow-sm transition hover:scale-105 disabled:opacity-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={handleNext}
          disabled={activeIndex === testimonials.length - 1}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1a1a1a] shadow-sm transition hover:scale-105 disabled:opacity-50"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <section className="relative overflow-hidden bg-[#F4ECE9] px-6 py-32 text-[#1a1a1a] md:py-48">
      <div className="relative mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex flex-col items-center"
        >
          <h2 className="font-instrument text-5xl font-normal leading-[0.95] tracking-[-0.03em] text-[#1a1a1a] sm:text-7xl md:text-[6.5rem]">
            Powered by real<br />
            <span className="italic text-[#5044A3]">cultural interactions.</span>
          </h2>
          <p className="mt-8 max-w-xl font-inter text-base leading-relaxed text-[#1a1a1a]/80 md:text-lg">
            Every conversation deepens Bliss's understanding of the cultures it serves — a proprietary engine trained where lived experience meets clinical care.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-14 flex w-full max-w-md items-center gap-2 rounded-full border border-[#1a1a1a]/10 bg-white/60 p-2 shadow-sm backdrop-blur-md transition-all focus-within:shadow-md hover:bg-white/80"
          >
            <Input
              type="email"
              required
              placeholder="you@yourworld.com"
              className="flex-1 border-0 bg-transparent px-4 font-inter text-sm text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 shadow-none focus-visible:ring-0"
            />
            <Button type="submit" className="shrink-0 rounded-full bg-[#5044A3] px-6 py-2.5 font-inter text-sm text-white transition-transform hover:scale-[1.03]">
              Try AI Twin
            </Button>
          </form>
        </motion.div>

        <div className="mt-32 flex flex-col items-center justify-between gap-6 border-t border-[#1a1a1a]/10 pt-8 font-inter text-sm text-[#1a1a1a]/50 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-instrument text-2xl tracking-tight text-[#1a1a1a]">Bliss</span>
            <span className="ml-2 mt-1 text-xs">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="transition-colors hover:text-[#1a1a1a]">Human Therapy</a>
            <a href="#" className="transition-colors hover:text-[#1a1a1a]">Privacy</a>
            <a href="#" className="transition-colors hover:text-[#1a1a1a]">Terms</a>
          </div>
        </div>
      </div>
    </section>
  );
}

const processPersonas = [
  {
    id: "liam",
    name: "Liam",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    message: "It's been a long, stressful day, and I can't turn my mind off...",
    feeling: "flat and withdrawn as his low mood has been lingering.",
    thoughts: [
      "It's Saturday afternoon and he had social plans this morning",
      "Social interactions often trigger negative interpretations and self-doubt",
      "We've been working on evaluating thoughts before accepting them as fact"
    ],
    response: "Sounds like a stressful social morning. Why don't we take a step back and look at the thoughts your mind's getting hung up on?",
    badge: "MIND WORK",
    technique: "Catch it-Check it-Change it",
    image: "/mind_work_portrait.png"
  },
  {
    id: "sarah",
    name: "Sarah",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    message: "I have a huge presentation tomorrow and my chest feels so tight.",
    feeling: "anxious and overwhelmed by performance pressure.",
    thoughts: [
      "Heart rate is elevated, indicating physical anxiety symptoms",
      "Anticipatory anxiety is causing a spiral of 'what-ifs'",
      "We need to regulate the nervous system before addressing the thoughts"
    ],
    response: "I hear how overwhelming this feels right now. Let's take a moment to regulate your breathing before we tackle the presentation.",
    badge: "SOMATIC",
    technique: "Box Breathing",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "maya",
    name: "Maya",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80",
    message: "I feel like I'm failing at everything lately. Nothing I do is enough.",
    feeling: "defeated, experiencing a strong inner critic.",
    thoughts: [
      "All-or-nothing thinking is dominating her current state",
      "She's discounting recent positive feedback from her manager",
      "A shift towards self-compassion is needed here"
    ],
    response: "That's a very heavy feeling to carry. Let's see if we can look at this through a more compassionate lens.",
    badge: "REFRAMING",
    technique: "Self-Compassion Break",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"
  }
];

function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % processPersonas.length);
    }, 10000); 
    return () => clearInterval(interval);
  }, []);

  const current = processPersonas[activeIndex];
  const words = current.message.split(" ");

  return (
    <section className="relative overflow-hidden bg-[#F4ECE9] py-32 md:py-48">
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-display text-4xl text-[#1a1a1a] sm:text-5xl md:text-6xl">
            Personalized support.<br />Intelligently adaptive.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-inter text-base leading-relaxed text-[#1a1a1a]/80 md:text-lg">
            With every interaction, Bliss learns what works best for you. By combining elements of evidence-based practices (CBT, DBT, ACT) with real-world context, it gets smarter the more you use it.
          </p>
        </motion.div>

        <div className="relative mx-auto mt-24 pb-12">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[24px] left-[16.6%] right-[16.6%] h-[2px] bg-[#1a1a1a]/5 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: "100%" }}
               viewport={{ once: true }}
               transition={{ duration: 2, ease: "easeInOut" }}
               className="h-full bg-gradient-to-r from-[#B98E4B]/40 via-[#FFB703] to-[#FFB703]" 
             />
          </div>
          
          {/* Connector Line (Mobile) */}
          <div className="lg:hidden absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-[#1a1a1a]/5 rounded-full overflow-hidden">
            <motion.div 
               initial={{ height: 0 }}
               whileInView={{ height: "100%" }}
               viewport={{ once: true }}
               transition={{ duration: 2, ease: "easeInOut" }}
               className="w-full bg-gradient-to-b from-[#B98E4B]/40 via-[#FFB703] to-[#FFB703]" 
             />
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8 items-stretch relative z-10">
            {/* Step 1: Input */}
            <div className="flex flex-col h-full items-center group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FDFBF7] border-2 border-[#B98E4B]/30 shadow-sm mb-8 relative z-20 transition-transform duration-300 group-hover:scale-110">
                 <span className="font-instrument text-xl text-[#B98E4B]">1</span>
              </div>
              
              <div className="w-full flex-1 rounded-[2rem] bg-[#FDFBF7]/80 backdrop-blur-sm p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
                <div className="flex justify-center gap-3 mb-6">
                  {processPersonas.map((p, i) => {
                    const isActive = i === activeIndex;
                    return (
                      <div key={p.id} onClick={() => setActiveIndex(i)} className="relative h-14 w-14 cursor-pointer">
                        {isActive && (
                          <motion.svg className="absolute -inset-1.5 h-[68px] w-[68px] -rotate-90" viewBox="0 0 100 100">
                            <motion.circle
                              cx="50" cy="50" r="48"
                              fill="none"
                              stroke="#FFB703"
                              strokeWidth="2"
                              strokeDasharray="301"
                              initial={{ strokeDashoffset: 301 }}
                              animate={{ strokeDashoffset: 0 }}
                              transition={{ duration: 10, ease: "linear" }}
                              strokeLinecap="round"
                            />
                          </motion.svg>
                        )}
                        <img 
                          src={p.avatar} 
                          alt={p.name} 
                          className={`h-full w-full rounded-full object-cover transition-all duration-500 ${isActive ? 'scale-100 opacity-100 ring-2 ring-white shadow-md' : 'scale-90 opacity-40 grayscale hover:grayscale-0 hover:opacity-100'}`} 
                        />
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex-1 flex items-center justify-center min-h-[120px] py-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`msg-${activeIndex}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-center w-full"
                    >
                      <p className="font-display text-[1.4rem] text-[#1a1a1a] leading-tight">
                        "{words.map((word, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.1, delay: i * 0.03 }}
                          >
                            {word}{" "}
                          </motion.span>
                        ))}"
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-auto pt-6 border-t border-[#1a1a1a]/5 text-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`feel-${activeIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="inline-block px-3 py-1 mb-3 rounded-full bg-[#B98E4B]/10 text-[10px] font-bold text-[#B98E4B] tracking-widest uppercase">Current State</span>
                      <p className="font-inter text-sm text-[#1a1a1a]/60 leading-relaxed">
                        <strong className="text-[#1a1a1a] font-semibold">{current.name}</strong> is feeling {current.feeling}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Step 2: Processing */}
            <div className="flex flex-col h-full items-center group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FDFBF7] border-2 border-[#FFB703] shadow-[0_0_15px_rgba(255,183,3,0.2)] mb-8 relative z-20 transition-transform duration-300 group-hover:scale-110">
                 <span className="font-instrument text-xl text-[#B98E4B]">2</span>
              </div>

              <div className="w-full flex-1 rounded-[2rem] bg-gradient-to-br from-[#FDFBF7] to-[#F4ECE9]/40 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="relative flex h-3 w-3 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB703] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFB703]"></span>
                  </div>
                  <h3 className="font-instrument text-2xl text-[#B98E4B]">Bliss is thinking</h3>
                </div>
                
                <div className="flex-1 flex flex-col justify-center pb-4">
                  <AnimatePresence mode="wait">
                    <motion.ul
                      key={`think-${activeIndex}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      {current.thoughts.map((item, i) => (
                        <motion.li 
                          key={i} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 + i * 0.15 }}
                          className="flex gap-4 items-start"
                        >
                          <div className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFB703]/20">
                             <div className="h-1.5 w-1.5 rounded-full bg-[#FFB703]" />
                          </div>
                          <span className="font-inter text-[15px] text-[#1a1a1a]/70 leading-relaxed">{item}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Step 3: Output */}
            <div className="flex flex-col h-full items-center group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFB703] text-white shadow-[0_0_20px_rgba(255,183,3,0.4)] mb-8 relative z-20 transition-transform duration-300 group-hover:scale-110">
                 <span className="font-instrument text-xl">3</span>
              </div>

              <div className="w-full flex-1 rounded-[2rem] bg-gradient-to-b from-[#FFB703] to-[#FFD972] p-2.5 shadow-xl flex flex-col ring-1 ring-black/5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <div className="px-6 py-8 flex-1 flex items-center justify-center text-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`resp-${activeIndex}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="font-instrument text-[1.1rem] leading-relaxed text-[#1a1a1a]"
                    >
                      {current.response}
                    </motion.p>
                  </AnimatePresence>
                </div>
                
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-black img-wrapper shrink-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`img-${activeIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                    >
                      <img src={current.image} alt="Intervention visual" className="h-full w-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/20 to-transparent" />
                      <div className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1 backdrop-blur-md border border-white/20">
                        <span className="font-inter text-[10px] font-bold tracking-[0.2em] text-white uppercase">{current.badge}</span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="font-instrument text-2xl text-white shadow-sm leading-tight block">{current.technique}</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-[#F4ECE9] text-[#1a1a1a]">
      <Nav />
      <Hero />
      <ChatSection />
      <ProcessSection />
      <Bento />
      <Testimonials />
      <Footer />
    </div>
  );
}
