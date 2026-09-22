import React from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  ScanFace,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface ServiceItem {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  icon: React.ElementType;
  href: string;
}

const HairRootIcon = ({
  className,
}: {
  className?: string;
}) => (
  <img
    src="/icons/hair-root-skin-icon.svg"
    alt=""
    aria-hidden="true"
    className={className}
  />
);

const services: ServiceItem[] = [
  {
    id: "dermatology",
    titleEn: "Dermatology & Laser",
    titleAr: "الجلدية والليزر",
    descriptionEn:
      "Advanced skin, laser, and aesthetic treatments selected according to the needs of every case.",
    descriptionAr:
      "علاجات متقدمة للبشرة، وإجراءات الليزر والحقن التجميلية، بخطة تناسب طبيعة كل حالة.",
    icon: ScanFace,
    href: "/services/dermatology-laser",
  },
  {
    id: "nutrition",
    titleEn: "Clinical Nutrition & Body Contouring",
    titleAr: "التغذية العلاجية ونحت الجسم",
    descriptionEn:
      "Personalized nutrition plans and advanced body-contouring technologies for balanced, natural results.",
    descriptionAr:
      "خطط غذائية مخصصة وتقنيات متقدمة لنحت الجسم لتحقيق نتائج متوازنة وطبيعية.",
    icon: Activity,
    href: "/services/nutrition-contouring",
  },
  {
    id: "hair",
    titleEn: "Hair Transplantation & Treatment",
    titleAr: "زراعة وعلاج الشعر",
    descriptionEn:
      "Specialized hair transplantation and treatment solutions tailored to every individual case.",
    descriptionAr:
      "حلول متخصصة لزراعة الشعر وعلاج مشكلاته، مع خطة مناسبة لكل حالة.",
    icon: HairRootIcon,
    href: "/services/hair-restoration",
  },
];

const ServicesSection = () => {
  const { isRTL } = useLanguage();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="services"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#FCFAF7] py-20 md:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[85%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#C9A761]/40 to-transparent" />

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mx-auto mb-16 max-w-3xl text-center md:mb-20"
        >
          <span className="mb-5 block text-[11px] font-semibold uppercase tracking-[0.35em] text-[#A24B3B]">
            {isRTL ? "رعاية متخصصة" : "Specialized Care"}
          </span>

          <h2
            className={cn(
              "text-4xl font-medium uppercase tracking-[0.12em] text-[#211D19] md:text-5xl",
              isRTL
                ? "font-mudir tracking-normal"
                : "font-neometric"
            )}
          >
            {isRTL ? "خدماتنا الرئيسية" : "Our Main Services"}
          </h2>

          <div className="mx-auto mt-6 h-px w-16 bg-[#C9A761]" />

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-[#756B64] md:text-base">
            {isRTL
              ? "كل خدمة بتبدأ بتقييم دقيق وخطة مناسبة، علشان نوصل لأفضل نتيجة ممكنة لكل حالة."
              : "Every service begins with a precise assessment and a personalized plan to achieve the best possible result."}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-0"
        >
          {services.map((service, index) => (
            <ServiceItemCard
              key={service.id}
              service={service}
              isRTL={isRTL}
              index={index}
              variants={itemVariants}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.4,
          }}
          className="mt-16 flex justify-center md:mt-20"
        >
          <Link
            to="/services"
            className="group inline-flex items-center gap-3 border border-[#C9A761] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#8F6B2F] transition-all duration-300 hover:bg-[#C9A761] hover:text-white"
          >
            {isRTL ? "عرض كل الخدمات" : "View All Services"}

            <ArrowUpRight
              className={cn(
                "h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                isRTL && "-scale-x-100"
              )}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceItemCard = ({
  service,
  isRTL,
  index,
  variants,
}: {
  service: ServiceItem;
  isRTL: boolean;
  index: number;
  variants: Variants;
}) => {
  const Icon = service.icon;

  return (
    <motion.div
      variants={variants}
      className={cn(
        "relative px-5 text-center sm:px-8 lg:px-12",
        index !== 0 &&
          "md:border-l md:border-[#211D19]/10",
        isRTL &&
          index !== services.length - 1 &&
          "md:border-l-0 md:border-r md:border-[#211D19]/10"
      )}
    >
      <Link
        to={service.href}
        className="group flex h-full flex-col items-center"
      >
        <div className="relative mb-8 flex h-28 w-28 items-center justify-center">
          <div className="absolute inset-0 scale-75 rounded-full border border-[#C9A761]/0 transition-all duration-500 group-hover:scale-100 group-hover:border-[#C9A761]/30" />

          <div className="absolute inset-3 scale-75 rounded-full bg-[#C9A761]/0 transition-all duration-500 group-hover:scale-100 group-hover:bg-[#C9A761]/10" />

          <Icon
            strokeWidth={1.2}
            className="relative z-10 h-20 w-20 text-[#C9A761] transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <h3
          className={cn(
            "mb-5 min-h-[64px] text-xl font-medium leading-8 tracking-[0.04em] text-[#332D29] transition-colors duration-300 group-hover:text-[#9D7534] lg:text-2xl",
            isRTL ? "font-mudir" : "font-neometric"
          )}
        >
          {isRTL ? service.titleAr : service.titleEn}
        </h3>

        <p className="max-w-sm text-sm font-normal leading-7 text-[#7D746E]">
          {isRTL
            ? service.descriptionAr
            : service.descriptionEn}
        </p>

        <span className="mt-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9D7534] opacity-0 transition-all duration-300 group-hover:opacity-100">
          {isRTL ? "تفاصيل أكتر" : "Learn More"}

          <ArrowUpRight
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
              isRTL && "-scale-x-100"
            )}
          />
        </span>
      </Link>
    </motion.div>
  );
};

export default ServicesSection;