import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Phone, MapPin, Clock, ChevronDown, Globe, ScanFace, Zap, Activity, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------
// Palette (kept from the previous pass — client liked it):
// --ink #0E0D0A · --ink-soft #18140D · --gold #BE9A5A
// --gold-light #E9D6A6 · --ivory #F5EFE2 · --hairline rgba(190,154,90,.22)
//
// Content-sized link/action columns prevent overlap at desktop widths.
// The logo column takes the remaining space; compact spacing below 1536px
// keeps the full navigation readable from the 1280px desktop breakpoint.
// The services dropdown no longer anchors to its trigger (that's what
// pushed it off-screen) — it now drops as a full-width curtain fixed
// to the viewport, so it can never overflow horizontally regardless of
// where "Services" sits or how narrow the window is.
// ----------------------------------------------------------------------

const NAV_VARS: React.CSSProperties = {
  // @ts-ignore
  '--ink': '#0E0D0A',
  '--ink-soft': '#18140D',
  '--gold': '#BE9A5A',
  '--gold-light': '#E9D6A6',
  '--ivory': '#F5EFE2',
  '--hairline': 'rgba(190,154,90,0.22)',
};

const HEADER_H_TOP = 92; // px, header height at rest
const HEADER_H_SCROLLED = 68; // px, header height once scrolled

const CrestLink = ({
  to,
  label,
  active,
  onEnter,
}: {
  to: string;
  label: string;
  active: boolean;
  onEnter?: () => void;
}) => (
  <Link
    to={to}
    onMouseEnter={onEnter}
    className="relative shrink-0 px-2 py-2 text-[11px] font-medium uppercase tracking-[0.12em] 2xl:px-3 2xl:text-[12px] 2xl:tracking-[0.2em] whitespace-nowrap transition-colors duration-300"
    style={{ color: active ? 'var(--gold-light)' : 'rgba(245,239,226,0.72)' }}
  >
    {label}
    <span className="absolute left-1/2 -translate-x-1/2 -bottom-[3px] h-px w-full max-w-[calc(100%-16px)]">
      <motion.span
        className="block h-px mx-auto"
        style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
        initial={false}
        animate={{ width: active ? '100%' : '0%', opacity: active ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
      />
    </span>
  </Link>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const location = useLocation();
  const { scrollY } = useScroll();
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => setLanguage(language === 'en' ? 'ar' : 'en');

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const scrolled = latest > 12;
    if (scrolled !== isScrolled) setIsScrolled(scrolled);
  });

  React.useEffect(() => {
    setIsOpen(false);
    setIsMobileServicesOpen(false);
  }, [location.pathname]);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsServicesOpen(true);
  };
  const scheduleCloseServices = () => {
    closeTimer.current = setTimeout(() => setIsServicesOpen(false), 150);
  };

  

  const serviceSubLinks = [
    {
      id: 'dermatology',
      label: language === 'en' ? 'Dermatology & Laser' : 'الجلدية والليزر',
      desc:
        language === 'en'
          ? 'Skin, laser and aesthetic treatments'
          : 'علاجات البشرة والليزر والحقن التجميلية',
      icon: ScanFace,
      href: '/services/dermatology-laser',
    },
    {
      id: 'nutrition',
      label:
        language === 'en'
          ? 'Medical Nutrition & Body Contouring'
          : 'التغذية العلاجية ونحت الجسم',
      desc:
        language === 'en'
          ? 'Personalized nutrition and body-contouring plans'
          : 'خطط تغذية مخصصة وتقنيات متقدمة لنحت الجسم',
      icon: Activity,
      href: '/services/nutrition-contouring',
    },
    {
      id: 'hair',
      label:
        language === 'en'
          ? 'Hair Transplantation & Treatment'
          : 'زراعة وعلاج الشعر',
      desc:
        language === 'en'
          ? 'Specialized hair restoration and treatment solutions'
          : 'حلول متخصصة لزراعة الشعر وعلاج مشكلاته',
      icon: Zap,
      href: '/services/hair-restoration',
    },
  ];

  const leftLinks = [
    { href: '/', label: language === 'en' ? 'Home' : 'الرئيسية' },
    { href: '/about-us', label: language === 'en' ? 'About Us' : 'من نحن؟' },
  ];
  const rightLinks = [
    { href: '/doctors', label: language === 'en' ? 'Meet Dr. Sally' : 'عن د. سالي' },
    { href: '/offers', label: language === 'en' ? 'Offers' : 'العروض' },
    { href: '/contact-us', label: language === 'en' ? 'Contact Us' : 'تواصل معنا' },
  ];
  const servicesLink = { href: '/services', label: language === 'en' ? 'Services' : 'الخدمات' };
  const isServicesActive = location.pathname.startsWith('/services');

  const panelTop = isScrolled
  ? HEADER_H_SCROLLED
  : HEADER_H_TOP;

  return (
    <div style={NAV_VARS}>
      {/* ======================= TOP STRIP ======================= */}
      {/* ======================= GLOBAL SPACER ======================= */}
      {/* <div className="h-[40px] lg:h-[80px] w-full shrink-0" aria-hidden="true" />
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 text-[11px] tracking-wide border-b overflow-hidden"
        style={{ background: 'var(--ink)', borderColor: 'var(--hairline)' }}
        initial={false}
        animate={{ height: isScrolled ? 0 : TOPBAR_H, opacity: isScrolled ? 0 : 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="container mx-auto px-4 sm:px-6 h-9 flex justify-between items-center">
          <div className="flex items-center gap-3 sm:gap-5">
            <a href="tel:+201551820062" className="flex items-center gap-1.5" style={{ color: 'rgba(245,239,226,0.75)' }}>
              <Phone className="w-3 h-3 shrink-0" style={{ color: 'var(--gold)' }} />
              <span dir="ltr" className="hidden xs:inline [unicode-bidi:isolate]">015 518 20062</span>
            </a>
            <span className="hidden md:flex items-center gap-1.5" style={{ color: 'rgba(245,239,226,0.5)' }}>
              <MapPin className="w-3 h-3" style={{ color: 'var(--gold)' }} />
              {language === 'en' ? 'Damietta & New Damietta' : 'دمياط القديمة والجديدة'}
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4" style={{ color: 'rgba(245,239,226,0.5)' }}>
            <span className="hidden sm:flex items-center gap-1.5">
              <Clock className="w-3 h-3" style={{ color: 'var(--gold)' }} />
              {language === 'en' ? 'Daily: 1 AM – 1 PM' : 'يوميًا: 1 صباحًا – 1 مساءً'}
            </span>
            <button onClick={toggleLanguage} className="lg:hidden font-bold" style={{ color: 'var(--ivory)' }}>
              {language === 'en' ? 'AR' : 'EN'}
            </button>
          </div>
        </div>
      </motion.div> */}
      <div className="h-[68px] xl:h-[92px] w-full shrink-0" aria-hidden="true" />
      {/* ======================= MAIN NAVBAR ======================= */}
      <header
        className="fixed left-0 right-0 z-40 transition-[top] duration-300"
        style={{ top: 0 }}
        onMouseLeave={scheduleCloseServices}
      >
        <div
          className="w-full border-b transition-all duration-300"
          style={{
            background: isScrolled ? 'rgba(14,13,10,0.94)' : 'var(--ink)',
            borderColor: 'var(--hairline)',
            backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          }}
        >
          {/* ---- DESKTOP: content-sized columns with a flexible logo column ---- */}
                    <div
              dir="ltr"
              className={cn(
                "relative mx-auto hidden w-full max-w-[1600px] grid-cols-[max-content_max-content_minmax(96px,1fr)_max-content_max-content] items-center gap-3 px-6 2xl:gap-6 transition-all duration-300 xl:grid",
                isScrolled ? "h-[68px]" : "h-[92px]"
              )}
            >
              <button
                onClick={toggleLanguage}
                className="col-start-1 row-start-1 flex items-center gap-1.5 justify-self-start px-2 py-2 text-[11px] font-semibold uppercase tracking-wider transition-colors"
                style={{ color: "rgba(245,239,226,0.7)" }}
              >
                <Globe className="h-3.5 w-3.5" />
                {language === "en" ? "AR" : "EN"}
              </button>

              <nav className="col-start-2 row-start-1 flex items-center justify-end gap-1">
                {leftLinks.map((link) => (
                  <CrestLink
                    key={link.href}
                    to={link.href}
                    label={link.label}
                    active={location.pathname === link.href}
                    onEnter={scheduleCloseServices}
                  />
                ))}

                <span onMouseEnter={openServices} className="inline-flex items-center">
                  <CrestLink
                    to={servicesLink.href}
                    label={servicesLink.label}
                    active={isServicesActive || isServicesOpen}
                  />

                  <ChevronDown
                    className="h-3 w-3 -ml-1.5 transition-transform duration-300"
                    style={{
                      color: isServicesOpen
                        ? "var(--gold-light)"
                        : "rgba(245,239,226,0.5)",
                      transform: isServicesOpen ? "rotate(180deg)" : "none",
                    }}
                  />
                </span>
              </nav>

              <Link
                to="/"
                onMouseEnter={scheduleCloseServices}
                className="col-start-3 row-start-1 flex items-center justify-center px-2 2xl:px-6"
              >
                <img
                  src="/blogo.png"
                  alt="SF Touch"
                  className={cn(
                    "object-contain brightness-0 invert transition-all duration-300",
                    isScrolled ? "w-20" : "w-24"
                  )}
                />
              </Link>

              <nav
                className="col-start-4 row-start-1 flex items-center justify-start gap-1"
                onMouseEnter={scheduleCloseServices}
              >
                {rightLinks.map((link) => (
                  <CrestLink
                    key={link.href}
                    to={link.href}
                    label={link.label}
                    active={location.pathname === link.href}
                  />
                ))}
              </nav>

              <button
                className="col-start-5 row-start-1 justify-self-end whitespace-nowrap border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] 2xl:px-6 2xl:text-[12px] 2xl:tracking-[0.15em] transition-colors duration-300"
                style={{
                  borderColor: "var(--gold)",
                  color: "var(--gold-light)",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.background = "var(--gold)";
                  event.currentTarget.style.color = "var(--ink)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.background = "transparent";
                  event.currentTarget.style.color = "var(--gold-light)";
                }}
              >
                {language === "en" ? "Book an Appointment" : "احجز موعد"}
              </button>
            </div>
          {/* ---- MOBILE / TABLET: centered emblem, balanced hamburger ---- */}
          <div className="grid xl:hidden grid-cols-[44px_1fr_44px] items-center container mx-auto px-4 sm:px-6 h-[68px]">
            <span aria-hidden className="w-[44px]" />
            <Link to="/" className="flex justify-center">
              <img src="/blogo.png" alt="SF Touch" className="w-20 object-contain brightness-0 invert" />
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="justify-self-end p-2.5 border"
              style={{ borderColor: 'var(--hairline)', color: 'var(--ivory)' }}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ======================= CURTAIN DROPDOWN (viewport-safe) ======================= */}
        <AnimatePresence>
          {isServicesOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.65, 0, 0.35, 1] }}
              onMouseEnter={openServices}
              onMouseLeave={scheduleCloseServices}
              className="fixed left-0 right-0 z-30 hidden border-b shadow-2xl xl:block"
              style={{ top: panelTop, background: 'var(--ink-soft)', borderColor: 'var(--hairline)' }}
            >
              <div className="container mx-auto px-4 sm:px-6 xl:px-10 py-9">
                <div className="text-center text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: 'var(--gold)' }}>
                  {language === 'en' ? 'Our Specialties' : 'تخصصاتنا'}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'var(--hairline)' }}>
                  {serviceSubLinks.map((sub) => (
                    <Link
                      key={sub.id}
                      to={sub.href}
                      onClick={() => setIsServicesOpen(false)}
                      className="group flex flex-col items-center text-center gap-3 px-6 py-8 transition-colors hover:bg-white/[0.04]"
                      style={{ background: 'var(--ink-soft)' }}
                    >
                      <div
                        className="flex items-center justify-center w-12 h-12 rounded-full border transition-colors group-hover:border-[color:var(--gold)]"
                        style={{ borderColor: 'var(--hairline)' }}
                      >
                        <sub.icon className="w-5 h-5" style={{ color: 'var(--gold)' }} />
                      </div>
                      <div className="text-sm font-medium" style={{ color: 'var(--ivory)' }}>{sub.label}</div>
                      <div className="text-xs" style={{ color: 'rgba(245,239,226,0.5)' }}>{sub.desc}</div>
                      <span
                        className="flex items-center gap-1 text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: 'var(--gold)' }}
                      >
                        {language === 'en' ? 'Explore' : 'اعرف أكتر'}
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ======================= MOBILE MENU ======================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 xl:hidden flex flex-col"
            style={{ background: 'var(--ink)' }}
          >
            <div className="flex justify-between items-center px-6 py-5 border-b" style={{ borderColor: 'var(--hairline)' }}>
              <img src="/images/logo.png" alt="SF Touch" className="w-20 brightness-0 invert opacity-90" />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 border transition-colors"
                style={{ borderColor: 'var(--hairline)', color: 'var(--ivory)' }}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col">
              {[leftLinks[0], leftLinks[1], servicesLink, ...rightLinks].map((link, i) => {
                const isActive = link.href === servicesLink.href ? isServicesActive : location.pathname === link.href;
                const hasDropdown = link.href === servicesLink.href;

                if (hasDropdown) {
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.04 }}
                      className="border-b"
                      style={{ borderColor: 'var(--hairline)' }}
                    >
                      <div className="flex items-center justify-between py-4 cursor-pointer" onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}>
                        <span className="text-xl tracking-wide" style={{ color: 'var(--ivory)' }}>{link.label}</span>
                        <ChevronDown
                          className="w-4 h-4 transition-transform duration-300"
                          style={{ color: 'var(--gold)', transform: isMobileServicesOpen ? 'rotate(180deg)' : 'none' }}
                        />
                      </div>
                      <AnimatePresence>
                        {isMobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-4 flex flex-col gap-1">
                              {serviceSubLinks.map((sub) => (
                                <Link
                                  key={sub.id}
                                  to={sub.href}
                                  onClick={() => setIsOpen(false)}
                                  className="flex items-center gap-3 py-2.5"
                                >
                                  <sub.icon className="w-4 h-4 shrink-0" style={{ color: 'var(--gold)' }} />
                                  <span className="text-[15px]" style={{ color: 'rgba(245,239,226,0.75)' }}>{sub.label}</span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                    className="border-b"
                    style={{ borderColor: 'var(--hairline)' }}
                  >
                    <Link to={link.href} onClick={() => setIsOpen(false)} className="flex items-center justify-between py-4">
                      <span className="text-xl tracking-wide" style={{ color: isActive ? 'var(--gold-light)' : 'var(--ivory)' }}>
                        {link.label}
                      </span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--gold)' }} />}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="px-6 py-6 border-t flex flex-col gap-4" style={{ borderColor: 'var(--hairline)' }}>
              <div className="flex items-center justify-between text-sm" style={{ color: 'rgba(245,239,226,0.5)' }}>
                <span>{language === 'en' ? 'Language' : 'اللغة'}</span>
                <button onClick={toggleLanguage} className="font-semibold px-3 py-1.5 border" style={{ color: 'var(--ivory)', borderColor: 'var(--hairline)' }}>
                  {language === 'en' ? 'العربية' : 'English'}
                </button>
              </div>
              <button
                className="w-full py-4 text-sm font-semibold uppercase tracking-[0.15em] border"
                style={{ borderColor: 'var(--gold)', color: 'var(--gold-light)' }}
              >
                {language === 'en' ? 'Book an Appointment' : 'احجز موعد'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
