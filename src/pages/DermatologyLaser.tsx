import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Zap, Syringe, Sun, Target, Waves, ArrowDown, Phone } from 'lucide-react';

interface DermatologyService {
  icon: React.ElementType;
  title: string;
  description: string;
  image: string;
  href?: string;
}

const DermatologyLaser = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const tints = [
    { soft: 'from-[#c9a15a]/25 to-[#c9a15a]/5', ring: '#c9a15a', dot: 'bg-[#c9a15a]' },
    { soft: 'from-[#e9b9c4]/30 to-[#e9b9c4]/5', ring: '#c98a97', dot: 'bg-[#c98a97]' },
    { soft: 'from-[#8a7469]/20 to-[#8a7469]/5', ring: '#8a7469', dot: 'bg-[#8a7469]' },
  ];

  const services: DermatologyService[] = [
  {
    icon: Sparkles,
    title: language === "ar" ? "علاج البشرة" : "Skin Treatment",
    description:
      language === "ar"
        ? "علاجات متقدمة لحب الشباب والتصبغات والندبات"
        : "Advanced treatments for acne, pigmentation, and scars",
    image: "/images/64b91e60ee991bc3355749ae_laser.jpeg",
  },
  {
    icon: Zap,
    title:
      language === "ar"
        ? "إزالة الشعر بالليزر"
        : "Laser Hair Removal",
    description:
      language === "ar"
        ? "تقنيات متقدمة لإزالة الشعر حسب نوع البشرة"
        : "Advanced hair removal technology selected for every skin type",
    image: "",
  },
  {
    icon: Syringe,
    title:
      language === "ar"
        ? "البوتوكس والفيلر"
        : "Botox & Fillers",
    description:
      language === "ar"
        ? "إجراءات تجميلية مدروسة للحصول على نتيجة طبيعية ومتناسقة"
        : "Carefully planned aesthetic procedures for natural, balanced results",
    image: "",
  },
  {
    icon: Sun,
    title:
      language === "ar"
        ? "علاج التصبغات"
        : "Pigmentation Treatment",
    description:
      language === "ar"
        ? "تقنيات متخصصة للمساعدة في توحيد لون البشرة"
        : "Specialized techniques designed to improve uneven skin tone",
    image: "",
  },
  {
    icon: Target,
    title:
      language === "ar"
        ? "علاج حب الشباب"
        : "Acne Treatment",
    description:
      language === "ar"
        ? "خطط علاج مناسبة لطبيعة البشرة ودرجة الحالة"
        : "Treatment plans tailored to the skin and severity of every case",
    image: "",
  },
  {
    icon: Waves,
    title:
      language === "ar"
        ? "شد البشرة"
        : "Skin Tightening",
    description:
      language === "ar"
        ? "تقنيات غير جراحية لتحسين تماسك ومظهر البشرة"
        : "Non-surgical technologies designed to improve skin firmness",
    image: "",
  },
];

  return (
    <>
      {/* ================= HERO: غرفة المسح الضوئي (Scan Chamber) ================= */}
      <section className="relative pt-40 pb-28 overflow-hidden bg-gradient-to-b from-[#fdfbf8] via-[#faf3ec] to-[#f6e9df]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] max-w-4xl bg-[radial-gradient(circle,rgba(255,255,255,0.9)_0%,rgba(201,161,90,0.18)_45%,transparent_72%)] pointer-events-none" />

        {/* خط الليزر الماسح - يتحرك أفقياً عبر الهيرو باستمرار */}
        <div className="absolute inset-y-0 left-0 right-0 overflow-hidden pointer-events-none opacity-70">
          <motion.div
            className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#c9a15a] to-transparent blur-[1px]"
            style={{ boxShadow: '0 0 20px 4px rgba(201,161,90,0.5)' }}
            animate={{ left: ['-5%', '105%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
          />
        </div>

        {/* أيقونات عائمة بعمق ثلاثي الأبعاد */}
        <div className="absolute inset-0 hidden md:block pointer-events-none" style={{ perspective: 800 }}>
          <FloatingIcon icon={Sparkles} top="18%" left="12%" delay={0} />
          <FloatingIcon icon={Zap} top="28%" left="85%" delay={0.8} />
          <FloatingIcon icon={Waves} top="72%" left="10%" delay={1.6} />
          <FloatingIcon icon={Sun} top="68%" left="88%" delay={2.4} />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto flex flex-col items-center"
          >
            <span className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a15a]/35 bg-white/70 backdrop-blur-sm text-[#8a5f2c] text-sm font-bold tracking-widest uppercase shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-[#c9a15a]" />
              {language === 'ar' ? 'خدماتنا' : 'Our Services'}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3d2f2a] mb-6 font-cairo leading-tight">
              {language === 'ar' ? 'بشرة صح..' : 'Dermatology &'} {' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a97c3f] via-[#c9a15a] to-[#a97c3f] bg-[size:200%] animate-gradient-x">
                  {language === 'ar' ? 'تبدأ بفهمها' : 'Laser'}
                </span>
                <svg viewBox="0 0 200 20" className="absolute -bottom-2 left-0 w-full h-5 overflow-visible" preserveAspectRatio="none">
                  <motion.path
                    d="M3,12 C40,3 80,17 100,9 C130,1 165,15 197,7"
                    fill="none"
                    stroke="#c9a15a"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.8 }}
                    transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg text-[#7a675d] leading-relaxed font-medium mb-10">
              {language === 'ar'
                ? 'حلول متخصصة لمشاكل البشرة والليزر والتجميل، بخطة تناسب طبيعة كل حالة.'
                : 'Advanced skin treatments delivered by specialist doctors using the latest technologies.'}
            </p>

            <motion.a
              href="#services-grid"
              whileHover={{ y: 4 }}
              className="flex flex-col items-center gap-2 text-[#a97c3f] text-xs font-bold tracking-widest uppercase"
            >
              {language === 'ar' ? 'استكشفي الخدمات' : 'Explore Treatments'}
              <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
                <ArrowDown className="w-4 h-4" />
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ================= شبكة بطاقات "الكبسولة الضوئية" (3D + Laser Scan) ================= */}
      <section id="services-grid" className="section-padding relative bg-[#fdfbf8]">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {services.map((service, index) => (
              <ServiceCapsule key={index} service={service} index={index} tint={tints[index % tints.length]} isRTL={isRTL} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= شريط ختامي ================= */}
      <section className="relative py-20 bg-gradient-to-b from-[#fdfbf8] to-[#f6e9df] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-[#c9a15a]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container-custom relative z-10 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[#3d2f2a] mb-6 font-cairo">
            {language === 'ar' ? 'مستعدة تبدئي رحلة بشرتك؟' : 'Ready to start your skin journey?'}
          </h3>
          <div className="relative inline-block group">
            <motion.span
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c9a15a] to-[#e0bd7a] origin-center"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
            <a
              href="tel:01551820062"
              className="relative z-10 flex items-center gap-3 px-8 py-4 rounded-full border border-[#c9a15a]/40 bg-white/70 backdrop-blur-md text-[#3d2f2a] group-hover:text-white font-bold transition-colors duration-300"
            >
              <Phone className="w-4 h-4" />
              {language === "ar"
                ? "احجز استشارتك"
                : "Book Your Consultation"}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

// ================= بطاقة خدمة "كبسولة ضوئية" بميلان ثلاثي الأبعاد ومسح ليزر =================
const ServiceCapsule = ({
  service,
  index,
  tint,
  isRTL,
}: {
  service: DermatologyService;
  index: number;
  tint: {
    soft: string;
    ring: string;
    dot: string;
  };
  isRTL: boolean;
}) => {
  const Icon = service.icon;
  const isAvailable = Boolean(service.href);

  const cardContent = (
    <div
      className={`group relative flex min-h-[330px] flex-col overflow-hidden border bg-white p-7 transition-all duration-500 md:p-8 ${
        isAvailable
          ? "cursor-pointer border-[#3d2f2a]/10 hover:-translate-y-1 hover:border-[#c9a15a]/60 hover:shadow-[0_24px_60px_-30px_rgba(61,47,42,0.35)]"
          : "cursor-default border-[#3d2f2a]/8"
      }`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${tint.soft}`}
      />

      <div className="mb-10 flex items-start justify-between">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full border bg-[#fdfbf8]"
          style={{ borderColor: `${tint.ring}55` }}
        >
          <Icon
            className="h-6 w-6"
            strokeWidth={1.5}
            style={{ color: tint.ring }}
          />
        </div>

        <span className="text-xs font-medium tracking-[0.2em] text-[#3d2f2a]/25">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-auto">
        <h3
          className={`mb-4 text-2xl font-semibold leading-tight text-[#3d2f2a] ${
            isRTL ? "font-mudir" : "font-neometric"
          }`}
        >
          {service.title}
        </h3>

        <p className="max-w-sm text-sm leading-7 text-[#7a675d]">
          {service.description}
        </p>

        <div className="mt-8 flex items-center justify-between border-t border-[#3d2f2a]/10 pt-5">
          <span
            className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
              isAvailable
                ? "text-[#a97c3f]"
                : "text-[#3d2f2a]/35"
            }`}
          >
            {isAvailable
              ? isRTL
                ? "عرض التفاصيل"
                : "View Details"
              : isRTL
                ? "قريبًا"
                : "Coming Soon"}
          </span>

          <span
            className={`h-2 w-2 rounded-full ${
              isAvailable ? tint.dot : "bg-[#3d2f2a]/15"
            }`}
          />
        </div>
      </div>

      {isAvailable && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#c9a15a]/8 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {service.href ? (
        <Link
          to={service.href}
          className="block"
          aria-label={service.title}
        >
          {cardContent}
        </Link>
      ) : (
        <div aria-disabled="true">
          {cardContent}
        </div>
      )}
    </motion.div>
  );
};
// ================= أيقونة عائمة بعمق ثلاثي الأبعاد في الهيرو =================
const FloatingIcon = ({
  icon: Icon,
  top,
  left,
  delay,
}: {
  icon: React.ElementType;
  top: string;
  left: string;
  delay: number;
}) => (
  <motion.div
    className="absolute w-14 h-14 rounded-2xl bg-white/70 backdrop-blur-md border border-[#c9a15a]/25 shadow-lg flex items-center justify-center"
    style={{ top, left }}
    animate={{ y: [0, -16, 0], rotateY: [0, 20, 0] }}
    transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }}
  >
    <Icon className="w-6 h-6 text-[#c9a15a]" />
  </motion.div>
);

export default DermatologyLaser;