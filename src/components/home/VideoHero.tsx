"use client";

import React, { useRef } from "react";
import {
  motion,
  Variants,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Star,
  ShieldCheck,
  HeartPulse,
} from "lucide-react";

const EditorialHeroSection = () => {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const prefersReducedMotion = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.4 });

  const stageRotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const stageRotateY = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const orbShiftX = useTransform(sx, [-0.5, 0.5], [-24, 24]);
  const orbShiftY = useTransform(sy, [-0.5, 0.5], [-24, 24]);

  const handleFieldMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const resetField = () => {
    mx.set(0);
    my.set(0);
  };

  const btnRef = useRef<HTMLDivElement>(null);
  const bx = useMotionValue(0);
  const by = useMotionValue(0);
  const bxs = useSpring(bx, { stiffness: 220, damping: 18 });
  const bys = useSpring(by, { stiffness: 220, damping: 18 });
  const handleBtnMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    bx.set(((e.clientX - r.left) / r.width - 0.5) * 18);
    by.set(((e.clientY - r.top) / r.height - 0.5) * 18);
  };
  const resetBtn = () => {
    bx.set(0);
    by.set(0);
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
  };
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };
  const wordIn: Variants = {
    hidden: { opacity: 0, y: 40, rotateX: -50 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  const headlineTop = isRTL ? "خبرة طبية" : "Medical Expertise";
  const headlineBottomWords = isRTL
    ? ["ونتائج", "تفرق"]
    : ["Results", "That", "Make", "a", "Difference"];

  const specimens = [
    {
      label: isRTL ? "دبلومة الجلدية" : "Dermatology Diploma",
      note: isRTL
        ? "الأمراض الجلدية والتجميل والتناسلية – جامعة المنوفية"
        : "Dermatology, Venereology & Aesthetics – Menoufia University",
      icon: ShieldCheck,
    },
    {
      label: isRTL ? "دبلومة الليزر" : "Laser Diploma",
      note: isRTL
        ? "المعهد القومي لعلوم الليزر – جامعة القاهرة"
        : "National Institute of Laser Sciences – Cairo University",
      icon: Sparkles,
    },
    {
      label: isRTL ? "رعاية متخصصة" : "Specialized Care",
      note: isRTL ? "من أول استشارة للنتيجة" : "From consultation to results",
      icon: HeartPulse,
    },
  ];

  const marqueeWords = isRTL
    ? ["جلدية", "ليزر", "تجميل", "تغذية", "شعر", "بوتوكس", "فيلر"]
    : ["DERMATOLOGY", "LASER", "AESTHETICS", "NUTRITION", "HAIR", "BOTOX", "FILLERS"];

  const heroImage = "/images/website-header.png";

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#FAF6F0] text-[#211D19]"
      style={{ fontFamily: "'Manrope', ui-sans-serif, system-ui" }}
    >

      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className={`h-full w-full object-cover object-top transition-transform duration-500 ${
            isRTL ? "-scale-x-100" : "scale-x-100"
          }`}
        />
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,420;0,9..144,600;0,9..144,700;1,9..144,500&family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        .eh-display { font-family: 'Fraunces', ui-serif, Georgia, serif; }
        .eh-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        @keyframes eh-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes eh-marquee-rtl { from { transform: translateX(0); } to { transform: translateX(50%); } }
        @keyframes eh-sweep { 0% { transform: translate(-30%, -30%) rotate(18deg); } 100% { transform: translate(30%, 30%) rotate(18deg); } }
        .eh-marquee-track { animation: eh-marquee 26s linear infinite; }
        .eh-marquee-track.rtl { animation-name: eh-marquee-rtl; }
        .eh-sweep { animation: eh-sweep 7s ease-in-out infinite alternate; }
        @media (prefers-reduced-motion: reduce) {
          .eh-marquee-track, .eh-sweep { animation: none !important; }
        }
      `}</style>



      <div
        className={`absolute top-1/2 z-20 hidden -translate-y-1/2 lg:block ${isRTL ? "right-4" : "left-4"}`}
      >
        <div
          className="eh-mono whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.4em] text-[#4A2436]/70"
          style={{ writingMode: "vertical-rl", transform: isRTL ? "rotate(0deg)" : "rotate(180deg)" }}
        >
          {isRTL
            ? "د. سالي العدوي — أخصائية الجلدية والتجميل والليزر"
            : "Dr. Sally El-Adawy — Dermatology, Aesthetics & Laser Specialist"}
        </div>
      </div>

      {/* <div className="absolute left-0 right-0 top-20 z-20 overflow-hidden border-y border-[#211D19]/10 bg-[#211D19] py-2">
        <div className={`eh-marquee-track flex w-max gap-8 ${isRTL ? "rtl" : ""}`}>
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span
              key={i}
              className="eh-mono flex items-center gap-8 text-[11px] font-medium uppercase tracking-[0.3em] text-[#F0E4D6]/80"
            >
              {w}
              <span className="text-[#B8874A]">✦</span>
            </span>
          ))}
        </div>
      </div> */}

      <div
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8"
        onMouseMove={handleFieldMove}
        onMouseLeave={resetField}
      >
        <motion.div variants={container} initial="hidden" animate="visible" className="w-full">
          <div className="relative z-10 grid min-h-[calc(100svh-92px)] items-center lg:grid-cols-2">
            <div className="relative z-20 max-w-xl py-20 lg:py-24">
              <div className="max-w-xl">
                <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
                  <span className="eh-mono text-[11px]  font-special   tracking-[0.35em] text-[#A24B3B]">
                    {isRTL ? "د. سالي العدوي" : "Dr. Sally El-Adawy"}
                  </span>
                  <span className="h-px flex-1 bg-[#211D19]/15" />
                </motion.div>

            <h1 className="flex flex-col tracking-tight text-[#211D19]">
                <motion.span
                  variants={wordIn}
                  className={`block whitespace-nowrap text-4xl font-semibold leading-tight md:text-5xl lg:text-[4rem] ${
                    isRTL ? "font-mudir" : "font-neometric"
                  }`}
                >
                  {isRTL ? "خبرة طبية" : "Medical Expertise"}
                </motion.span>

                <motion.span
                  variants={wordIn}
                  className={`mt-5 block leading-tight text-[#aa1920] md:mt-6 ${
                    isRTL
                      ? "font-mudir text-3xl md:text-4xl lg:text-[3.2rem]"
                      : "font-mersin whitespace-nowrap text-2xl md:text-3xl lg:text-[2.3rem]"
                  }`}
                >
                  {isRTL
                    ? "ونتائج تفرق"
                    : "Results That Make a Difference"}
                </motion.span>
              </h1>

                <motion.p variants={fadeUp} className="mt-7 text-base leading-8 text-[#211D19]/70 md:text-lg">
                  {t.hero.description ||
                    (isRTL
                      ? "رعاية طبية متخصصة في الجلدية والتجميل والليزر، مع خطط علاج بتتحدد حسب احتياجات كل حالة، وباستخدام أحدث التقنيات للحصول على نتائج طبيعية وآمنة."
                      : "Specialized care in dermatology, aesthetics, and laser treatments, with personalized treatment plans based on each case and the latest technologies for natural-looking, safe results.")}
                </motion.p>

                <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
                  <div
                    ref={btnRef}
                    onMouseMove={handleBtnMove}
                    onMouseLeave={resetBtn}
                    className="inline-block"
                  >
                    <Link to="/contact-us" className="group inline-flex">
                      <motion.div
                        style={{ x: bxs, y: bys }}
                        whileTap={{ scale: 0.96 }}
                        className="inline-flex items-center gap-3 rounded-full bg-[#211D19] px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#FAF6F0] shadow-[0_18px_50px_rgba(33,29,25,0.28)]"
                      >
                        {t.hero.cta || (isRTL ? "احجز استشارتك" : "Book Consultation")}
                        <ArrowIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                      </motion.div>
                    </Link>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full border border-[#211D19]/10 bg-white/70 px-4 py-3 text-sm font-semibold text-[#211D19]/80 shadow-sm backdrop-blur-md">
                    <Star className="h-4 w-4 fill-[#B8874A] text-[#B8874A]" />
                    {isRTL
                      ? "خبرة تدي ثقة من أول زيارة"
                      : "Expertise You Can Trust From Your First Visit"}
                  </div>
                </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-12 divide-y divide-[#211D19]/10 border-y border-[#211D19]/10"
              >
                {specimens.map((s) => {
                  const Icon = s.icon;

                  return (
                    <div
                      key={s.label}
                      className="grid grid-cols-[36px_160px_minmax(0,1fr)] items-center gap-x-4 py-4"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0E4D6] text-[#A24B3B]">
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="eh-display whitespace-nowrap text-sm font-semibold text-[#211D19]">
                        {s.label}
                      </div>

                      <div className="eh-mono whitespace-nowrap text-[9px] uppercase tracking-[0.14em] text-[#211D19]/50">
                        {s.note}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
              </div>
            </div>


          </div>

          <motion.div
            variants={fadeUp}
            className="mt-14 flex flex-col gap-4 rounded-[2rem] border border-[#211D19]/10 bg-white/70 px-5 py-4 shadow-[0_14px_40px_rgba(33,29,25,0.08)] backdrop-blur-md md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F0E4D6] text-[#A24B3B]">
                <HeartPulse className="h-5 w-5" />
              </div>
              <div>
                <div className="eh-display text-sm font-semibold text-[#211D19]">
                  {isRTL ? "رعاية طبية متخصصة" : "Specialized Medical Care"}
                </div>
                <div className="text-xs text-[#211D19]/60">
                  {isRTL
                    ? "رعاية طبية، أحدث التقنيات، واهتمام يبدأ من أول استشارة وحتى الوصول للنتيجة المناسبة."
                    : "Medical care, latest technologies, and attention from the first consultation until reaching the desired result."}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#211D19]/70">
              <div className="flex items-center gap-1 text-[#B8874A]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <span className="eh-mono text-[11px] uppercase tracking-[0.2em]">
                {isRTL ? "معايير طبية عالية" : "High Medical Standards"}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EditorialHeroSection;
