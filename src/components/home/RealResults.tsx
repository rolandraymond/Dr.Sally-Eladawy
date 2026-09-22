"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Scissors,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const VARS = {
  "--ink": "#132D29",
  "--ink-soft": "#1D3B36",
  "--pearl": "#F5F1E9",
  "--paper": "#FFFCF7",
  "--champagne": "#C6A66A",
  "--champagne-light": "#E6D5B2",
  "--sage": "#AAB9AF",
  "--muted": "#6F7F79",
  "--hairline": "rgba(19,45,41,0.12)",
} as React.CSSProperties;

interface Case {
  image: string;
}

interface Service {
  id: string;
  labelEn: string;
  labelAr: string;
  case: Case;
  link: string;
}

interface Specialty {
  id: string;
  labelEn: string;
  labelAr: string;
  icon: React.ReactNode;
  mainLink: string;
  services: Service[];
}

const specialties: Specialty[] = [
  {
    id: "lip-filler",
    labelEn: "Lip Filler",
    labelAr: "فيلر الشفايف",
    icon: <Sparkles className="h-5 w-5" />,
    mainLink: "/services/dermatology",
    services: [
      {
        id: "lip-filler-case-1",
        labelEn: "Case 1",
        labelAr: "الحالة 1",
        link: "/services/dermatology",
        case: {
          image: "/images/sally filler2.png",
        },
      },
      {
        id: "lip-filler-case-2",
        labelEn: "Case 2",
        labelAr: "الحالة 2",
        link: "/services/dermatology",
        case: {
          image: "/images/tungsten-drsally-sep-case filler 10.jpg",
        },
      },
      {
        id: "lip-filler-case-3",
        labelEn: "Case 3",
        labelAr: "الحالة 3",
        link: "/services/dermatology",
        case: {
          image: "/images/tungsten-dr.sally-LIPFILLER.png",
        },
      },
      {
        id: "lip-filler-case-4",
        labelEn: "Case 4",
        labelAr: "الحالة 4",
        link: "/services/dermatology",
        case: {
          image: "/images/tungsten-drsally-sep-case filler 11.jpg",
        },
      },
      {
        id: "lip-filler-case-5",
        labelEn: "Case 5",
        labelAr: "الحالة 5",
        link: "/services/dermatology",
        case: {
          image: "/images/tungsten-drsally-sep-case filler.jpg",
        },
      },
    ],
  },
  {
    id: "hair-transplant",
    labelEn: "Hair Transplant",
    labelAr: "زراعة الشعر",
    icon: <Scissors className="h-5 w-5" />,
    mainLink: "/services/hair-restoration",
    services: [
      {
        id: "hair-transplant-case-1",
        labelEn: "Case 1",
        labelAr: "الحالة 1",
        link: "/services/hair-restoration",
        case: {
          image: "/images/tungsten-dr.sally-hair.png",
        },
      },
      {
        id: "hair-transplant-case-2",
        labelEn: "Case 2",
        labelAr: "الحالة 2",
        link: "/services/hair-restoration",
        case: { image: "images/tungsten-dr.sally-cases-Nanofatpng.png" },
      },
      {
        id: "hair-transplant-case-3",
        labelEn: "Case 3",
        labelAr: "الحالة 3",
        link: "/services/hair-restoration",
        case: { image: "images/tungsten-dr.sally-EXOSOME-HAIR-TREATMENT-new-layout.png" },
      },
    ],
  },
  {
    id: "full-face",
    labelEn: "Full Face",
    labelAr: "الوجه بالكامل",
    icon: <Sparkles className="h-5 w-5" />,
    mainLink: "/services/dermatology-laser",
    services: [
      {
        id: "full-face-case-1",
        labelEn: "Case 1",
        labelAr: "الحالة 1",
        link: "/services/dermatology-laser",
        case: {
          image: "/images/tungsten-dr.sally-cases.-acne-scare..png",
        },
      },
      {
        id: "full-face-case-2",
        labelEn: "Case 2",
        labelAr: "الحالة 2",
        link: "/services/dermatology-laser",
        case: {
          image: "/images/tungsten-dr.sally-cases-july-Full face enhancement.2.png",
        },
      },
      {
        id: "full-face-case-3",
        labelEn: "Case 3",
        labelAr: "الحالة 3",
        link: "/services/dermatology-laser",
        case: { image: "/images/case sally full face aug 2 (1).png" },
      },
    ],
  },
  {
    id: "jawline-texas",
    labelEn: "Jawline (Texas)",
    labelAr: "تحديد الفك (تكساس)",
    icon: <Sparkles className="h-5 w-5" />,
    mainLink: "/services/dermatology-laser",
    services: [
      {
        id: "jawline-texas-case-1",
        labelEn: "Case 1",
        labelAr: "الحالة 1",
        link: "/services/dermatology-laser",
        case: { image: "/images/tungsten-dr.sally-cases-july-jawline.png" },
      },
      {
        id: "jawline-texas-case-2",
        labelEn: "Case 2",
        labelAr: "الحالة 2",
        link: "/services/dermatology-laser",
        case: { image: "/images/tungsten-dr.sally-cases-july-jawline-results.png" },
      },
      {
        id: "jawline-texas-case-3",
        labelEn: "Case 3",
        labelAr: "الحالة 3",
        link: "/images/tungsten-drSALLY CASES-TEXAS png.png",
        case: { image: "/images/tungsten-drSALLY CASES-TEXAS png.png" },
      },
    ],
  },
];

interface CaseArtworkProps {
  image: string;
  title: string;
  language: string;
}

const CaseArtwork = ({
  image,
  title,
  language,
}: CaseArtworkProps) => (
  <div className="relative isolate mx-auto max-w-3xl">
    <div className="absolute -inset-3 rounded-[2.25rem] border border-[#C6A66A]/25 md:-inset-5 md:rounded-[3rem]" />
    <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-[#AAB9AF]/30 blur-3xl" />

    <div className="relative overflow-hidden rounded-[1.75rem] border border-[#132D29]/10 bg-[#FFFCF7] p-2.5 shadow-[0_35px_90px_rgba(19,45,41,0.16)] md:rounded-[2.5rem] md:p-3.5">
      <AnimatePresence mode="wait">
        <motion.figure
          key={image}
          initial={{ opacity: 0, y: 18, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.99 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[1.35rem] bg-[#EAE4D9] md:rounded-[2rem]"
        >
          {image ? (
          <img
            src={image}
            alt={`${title} ${language === "en" ? "before and after result" : "نتيجة قبل وبعد"}`}
            className="block h-auto w-full object-contain"
          />
          ) : (
            <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 px-6 py-16 text-center md:min-h-[480px]">
              <Sparkles className="h-8 w-8 text-[#9C7940]" />
              <p className="text-xl font-semibold text-[#132D29]">{title}</p>
              <p className="text-sm text-[#6F7F79]">
                {language === "en" ? "Case image coming soon" : "صورة الحالة هتتوفر قريب"}
              </p>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/30" />
        </motion.figure>
      </AnimatePresence>
    </div>
  </div>
);

interface SpecialtyRailProps {
  active: Specialty;
  onSelect: (specialty: Specialty) => void;
  language: string;
}

const SpecialtyRail = ({
  active,
  onSelect,
  language,
}: SpecialtyRailProps) => {
  return (
    <div className="relative flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0">
      <div className="absolute left-7 right-7 top-7 hidden h-px bg-[#132D29]/10 sm:block lg:bottom-7 lg:left-7 lg:right-auto lg:top-7 lg:h-auto lg:w-px" />

      {specialties.map((specialty) => {
        const isActive = active.id === specialty.id;

        return (
          <button
            key={specialty.id}
            type="button"
            onClick={() => onSelect(specialty)}
            className={cn(
              "group relative z-10 flex min-w-fit items-center gap-4 rounded-2xl border px-3 py-3 text-left transition-all duration-300 rtl:text-right lg:w-full lg:px-3 lg:py-4",
              isActive
                ? "border-[#132D29]/10 bg-white/70 shadow-[0_16px_40px_rgba(19,45,41,0.08)]"
                : "border-transparent bg-transparent hover:border-[#132D29]/10 hover:bg-white/45"
            )}
          >
            <span
              className={cn(
                "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                isActive
                  ? "border-[#132D29] bg-[#132D29] text-[#F5F1E9]"
                  : "border-[#132D29]/12 bg-white/70 text-[#132D29]/35 group-hover:border-[#C6A66A] group-hover:text-[#132D29]"
              )}
            >
              {specialty.icon}

              {isActive && (
                <motion.span
                  layoutId="specialty-ring"
                  className="absolute -inset-1 rounded-full border border-[#C6A66A]/45"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 28,
                  }}
                />
              )}
            </span>

            <span className="flex flex-col">
              <span
                className={cn(
                  "text-sm font-semibold tracking-tight transition-colors md:text-base",
                  isActive
                    ? "text-[#132D29]"
                    : "text-[#132D29]/45 group-hover:text-[#132D29]/75"
                )}
              >
                {language === "en"
                  ? specialty.labelEn
                  : specialty.labelAr}
              </span>

              <span
                className={cn(
                  "mt-1 text-[9px] font-medium uppercase tracking-[0.2em]",
                  isActive ? "text-[#9C7940]" : "text-[#132D29]/25"
                )}
              >
                {specialty.services.filter((service) => service.case.image).length}{" "}
                {language === "en" ? "Cases" : "حالات"}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
};

interface CaseTabsProps {
  services: Service[];
  active: Service;
  onSelect: (service: Service) => void;
  language: string;
}

const CaseTabs = ({
  services,
  active,
  onSelect,
  language,
}: CaseTabsProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
      {services.map((service) => {
        const isActive = active.id === service.id;

        return (
          <button
            key={service.id}
            type="button"
            onClick={() => onSelect(service)}
            className={cn(
              "relative whitespace-nowrap rounded-full border px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 md:px-6 md:text-[11px]",
              isActive
                ? "border-[#132D29] bg-[#132D29] text-[#F5F1E9] shadow-[0_14px_30px_rgba(19,45,41,0.14)]"
                : "border-[#132D29]/10 bg-white/60 text-[#132D29]/50 hover:border-[#C6A66A] hover:bg-white hover:text-[#132D29]"
            )}
          >
            {language === "en" ? service.labelEn : service.labelAr}
          </button>
        );
      })}
    </div>
  );
};

const RealResults = () => {
  const { language, isRTL } = useLanguage();

  const [activeSpecialty, setActiveSpecialty] = useState<Specialty>(
    specialties[0]
  );

  const [activeService, setActiveService] = useState<Service>(
    specialties[0].services[0]
  );

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

const header = {
  subtitle:
    language === "en" ? "Transformation Journeys" : "رحلات التحول",

  title1:
    language === "en" ? "Results That" : "نتائج",

  title2:
    language === "en" ? "Speak for Themselves" : "تتحدث عن نفسها",
};

  const handleSpecialty = (specialty: Specialty) => {
    setActiveSpecialty(specialty);
    setActiveService(specialty.services[0]);
  };

  return (
    <section
      id="real-results"
      dir={isRTL ? "rtl" : "ltr"}
      style={VARS}
      className="relative overflow-hidden bg-[#F5F1E9] py-20 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(198,166,106,0.22),transparent_32%),radial-gradient(circle_at_8%_88%,rgba(170,185,175,0.32),transparent_30%)]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C6A66A]/70 to-transparent" />

      <div className="pointer-events-none absolute right-[-10rem] top-24 h-[28rem] w-[28rem] rounded-full border border-[#132D29]/5" />

      <div className="pointer-events-none absolute right-[-6rem] top-40 h-[20rem] w-[20rem] rounded-full border border-[#C6A66A]/15" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={cn(
            "relative mb-14 max-w-3xl md:mb-20",
            isRTL ? "text-right" : "text-left"
          )}
        >
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-10 bg-[#C6A66A]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#8F6D35] md:text-xs">
              {header.subtitle}
            </span>
          </div>

          <h2
            className={cn(
              "leading-[0.92] tracking-tight",
              isRTL ? "font-mudir" : "font-mersin"
            )}
          >
            <span className="block text-5xl font-semibold text-[#132D29] md:text-7xl lg:text-[5.5rem]">
              {header.title1}
            </span>

            <span className="mt-3 block text-4xl text-[#9C7940] md:text-6xl lg:text-[4.8rem]">
              {header.title2}
            </span>
          </h2>

        <p className="mt-7 max-w-xl text-sm leading-7 text-[#132D29]/60 md:text-base md:leading-8">
          {language === "en"
            ? "Explore real results from different cases, with carefully planned treatment and aesthetic procedures that preserve a natural look."
            : "اكتشفي نتائج حقيقية لحالات مختلفة، من خلال خطط علاج مدروسة وإجراءات تجميلية تحافظ على المظهر الطبيعي."}
        </p>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <aside className="lg:col-span-3">
            <SpecialtyRail
              active={activeSpecialty}
              onSelect={handleSpecialty}
              language={language}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSpecialty.id}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="mt-5 lg:ms-[76px]"
              >
                <Link
                  to={activeSpecialty.mainLink}
                  className="group inline-flex items-center gap-2 rounded-full border border-[#132D29]/15 bg-white/45 px-5 py-2.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#132D29]/55 transition-all duration-300 hover:border-[#C6A66A] hover:bg-white hover:text-[#132D29] md:text-[10px]"
                >
                  <ExternalLink className="h-3 w-3" />

                  {language === "en" ? "View Page" : "عرض الصفحة"}
                </Link>
              </motion.div>
            </AnimatePresence>
          </aside>

          <div className="lg:col-span-9">
            <div className="mb-7 md:mb-9">
              <CaseTabs
                services={activeSpecialty.services}
                active={activeService}
                onSelect={setActiveService}
                language={language}
              />
            </div>

            <CaseArtwork
              image={activeService.case.image}
              title={language === "en" ? activeService.labelEn : activeService.labelAr}
              language={language}
            />

            <div className="mt-8 flex flex-col gap-6 border-t border-[#132D29]/10 pt-8 md:mt-10 md:flex-row md:items-center md:justify-between md:pt-10">
              <div className="space-y-3">
                <h3
                  className={cn(
                    "text-2xl font-semibold text-[#132D29] md:text-3xl",
                    isRTL ? "font-mudir" : "font-neometric"
                  )}
                >
                  {language === "en"
                    ? activeService.labelEn
                    : activeService.labelAr}
                </h3>

                <Link
                  to={activeService.link}
                  className="group flex w-fit items-center gap-2"
                >
                  <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#132D29]/45 transition-colors duration-300 group-hover:text-[#8F6D35] md:text-[10px]">
                    {language === "en"
                      ? "Procedure Details"
                      : "تفاصيل الإجراء"}
                  </span>

                  <ArrowIcon className="h-3 w-3 text-[#9C7940] transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </Link>
              </div>

              <Link to="/contact-us" className="w-full md:w-auto">
                <motion.button
                  type="button"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#132D29] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F5F1E9] shadow-[0_18px_50px_rgba(19,45,41,0.18)] transition-all duration-300 hover:bg-[#1D3B36] md:w-auto md:px-10 md:py-5"
                >
                  {language === "en"
                    ? "Book Your Consultation"
                    : "احجز استشارتك"}

                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealResults;
