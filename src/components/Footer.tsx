import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Linkedin, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ContactItemProps {
  icon: React.ElementType;
  title: string;
  desc: string;
  isLink?: boolean;
  href?: string;
}

const Footer = () => {
  const { t, isRTL } = useLanguage();

  const quickLinks = [
    { href: '/', label: isRTL ? 'الرئيسية' : 'Home' },
    { href: '/about-us', label: isRTL ? 'من نحن؟' : 'About Us' },
    { href: '/services', label: isRTL ? 'الخدمات' : 'Services' },
    { href: '/doctors', label: isRTL ? 'عن د. سالي' : 'Meet Dr. Sally' },
    { href: '/offers', label: isRTL ? 'العروض' : 'Offers' },
    { href: '/contact-us', label: isRTL ? 'تواصل معنا' : 'Contact Us' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com' },
    { icon: Instagram, href: 'https://instagram.com' },
    { icon: Twitter, href: 'https://twitter.com' },
    { icon: Linkedin, href: 'https://linkedin.com' },
  ];

  const particles = Array.from({ length: 16 }).map((_, i) => ({
    id: i,
    left: `${(i * 6.4 + 3) % 100}%`,
    size: 3 + (i % 4) * 1.5,
    duration: 9 + (i % 5) * 2.2,
    delay: (i % 8) * 0.9,
  }));

  const sealText = isRTL
    ? '• عيادة تجميل فاخرة •   سالي • '
    : '• LUXURY BEAUTY CLINIC • Sally • ';

  return (
    <footer
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative overflow-hidden pt-28 pb-10 bg-gradient-to-b from-[#fdfbf8] via-[#f9f1ea] to-[#f3e4d9] text-[#3d2f2a]"
    >
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden bg-[#e7d6c2]">
        <motion.div
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-[#c9a15a] to-transparent"
          animate={{ x: ['-100%', '400%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full bg-[#e9b9c4]/30 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-48 -right-24 w-[460px] h-[460px] rounded-full bg-[#c9a15a]/20 blur-[130px] pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none motion-reduce:hidden">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-[#c9a15a]/50"
            style={{ left: p.left, width: p.size, height: p.size, bottom: '-12px' }}
            animate={{ y: [0, -540], opacity: [0, 0.9, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="container relative z-10 px-4 sm:px-6 mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="inline-flex flex-col items-center gap-5"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full bg-[#c9a15a]/25 blur-2xl motion-reduce:hidden"
                animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <Link to="/" className="relative block">
                <img
                  src="/blogo.png"
                  alt="SF Touch Clinic Logo"
                  className="h-16 w-auto object-contain transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://ui-avatars.com/api/?name=SF+Touch&background=c9a15a&color=fff&size=128&font-size=0.4&rounded=true';
                  }}
                />
              </Link>
            </div>

            <p className="max-w-md text-sm md:text-[15px] leading-loose text-[#7a675d] font-medium">
              <span className="block mb-2 font-bold text-[#3d2f2a]">
                {isRTL
                  ? 'د. سالي العدوي — أخصائية الجلدية والتجميل والليزر'
                  : 'Dr. Sally El-Adawy — Dermatology, Aesthetics & Laser Specialist'}
              </span>
              {isRTL
                ? 'بتؤمن إن أفضل النتائج بتبدأ من تشخيص صح، واختيار العلاج المناسب لكل حالة، بعيدًا عن الحلول السريعة أو الموحدة.'
                : 'She believes the best results start with the right diagnosis and the right treatment for each case, away from quick fixes and one-size-fits-all solutions.'}
            </p>

            <div className="flex items-center gap-3 text-[#c9a15a]">
              <span className="h-px w-9 bg-gradient-to-r from-transparent to-[#c9a15a]/60" />
              <Sparkles className="w-4 h-4" />
              <span className="h-px w-9 bg-gradient-to-l from-transparent to-[#c9a15a]/60" />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-10 mb-20">
          <div>
            <h4 className="text-lg font-bold text-[#3d2f2a] mb-8 relative inline-block font-cairo">
              {t.footer.quickLinks}
              <span className="absolute -bottom-3 left-0 w-8 h-[3px] rounded-full bg-gradient-to-r from-[#c9a15a] to-[#e0bd7a]" />
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.href}
                    className="group relative inline-flex items-center gap-3 text-sm text-[#6b5850] font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a15a]/40 group-hover:bg-[#c9a15a] group-hover:scale-125 transition-all duration-300" />
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c9a15a] group-hover:w-full transition-all duration-500 ease-out" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start gap-8">
            <div>
              <h4 className="text-lg font-bold text-[#3d2f2a] mb-8 relative inline-block font-cairo">
                {isRTL ? 'تابعونا' : 'Follow Us'}
                <span className="absolute -bottom-3 left-0 w-8 h-[3px] rounded-full bg-gradient-to-r from-[#c9a15a] to-[#e0bd7a]" />
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/70 border border-[#c9a15a]/25 flex items-center justify-center shadow-sm text-[#a97c3f] transition-all duration-500 hover:-translate-y-1 hover:bg-[#c9a15a] hover:text-white hover:border-[#c9a15a] hover:shadow-[0_8px_20px_-6px_rgba(201,161,90,0.6)]"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <motion.div
              className="relative w-24 h-24 self-center opacity-90 motion-reduce:animate-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <path id="sealPath" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                </defs>
                <text fontSize="7.2" fill="#c9a15a" letterSpacing="2">
                  <textPath href="#sealPath">{sealText.repeat(2)}</textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#c9a15a]" />
              </div>
            </motion.div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-[#3d2f2a] mb-8 relative inline-block font-cairo">
              {t.footer.branches}
              <span className="absolute -bottom-3 left-0 w-8 h-[3px] rounded-full bg-gradient-to-r from-[#c9a15a] to-[#e0bd7a]" />
            </h4>
            <div className="space-y-6">
              <ContactItem
                icon={MapPin}
                title={isRTL ? 'فرع دمياط القديمة' : 'Damietta Branch'}
                desc={
                  isRTL
                    ? 'الصفوة مول - برج 2 - الدور الخامس - شقة 8'
                    : 'Safwa Mall – Tower 2 – 5th Floor – Apartment 8'
                }
              />
              <ContactItem
                icon={MapPin}
                title={isRTL ? 'فرع دمياط الجديدة' : 'New Damietta Branch'}
                desc={
                  isRTL
                    ? 'المنطقة المركزية - أعلى المصرف المتحد - بجوار المركز الطبي'
                    : 'Central Zone – Above United Bank – Next to the Medical Center'
                }
              />
              <ContactItem
                icon={Phone}
                title={isRTL ? 'فرع دمياط القديمة' : 'Damietta Branch'}
                desc="015 580 08278"
                isLink
                href="tel:+201558008278"
              />
              <ContactItem
                icon={Phone}
                title={isRTL ? 'فرع دمياط الجديدة' : 'New Damietta Branch'}
                desc="015 0365 6589"
                isLink
                href="tel:+201503656589"
              />
              <ContactItem
                icon={Phone}
                title={isRTL ? 'تواصل معنا' : 'Contact Us'}
                desc="015 518 20062"
                isLink
                href="tel:+201551820062"
              />
              <ContactItem
                icon={Phone}
                title={isRTL ? 'تواصل معنا' : 'Contact Us'}
                desc="015 580 08978"
                isLink
                href="tel:+201558008978"
              />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-[#3d2f2a] mb-8 relative inline-block font-cairo">
              {t.footer.workingHours}
              <span className="absolute -bottom-3 left-0 w-8 h-[3px] rounded-full bg-gradient-to-r from-[#c9a15a] to-[#e0bd7a]" />
            </h4>

            <div className="mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#c9a15a]/10 flex items-center justify-center shrink-0 border border-[#c9a15a]/25">
                  <Clock className="w-5 h-5 text-[#a97c3f]" />
                </div>
                <div>
                  <p className="text-[#3d2f2a] font-bold text-sm mb-1">{isRTL ? 'ساعات العمل' : 'Opening Hours'}</p>
                  <p className="text-xs text-[#7a675d] font-medium leading-relaxed">
                    {isRTL ? 'يوميًا من الساعة 1 صباحًا حتى 1 مساءً' : 'Daily from 1 AM to 1 PM'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 border-t border-[#c9a15a]/15 pt-4">
                <div className="w-10 h-10 rounded-full bg-[#3d2f2a]/5 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#6b5850]" />
                </div>
                <a
                  href="mailto:info@sftouchclinics.com"
                  className="text-sm font-medium text-[#6b5850] hover:text-[#a97c3f] transition-colors"
                >
                  info@sftouchclinics.com
                </a>
              </div>
            </div>

            <div className="relative group">
              <input
                type="search"
                placeholder={isRTL ? 'ابحث من هنا ...' : 'Search here...'}
                className={`w-full bg-white/70 border border-[#c9a15a]/25 rounded-full py-3.5 ${
                  isRTL ? 'pr-5 pl-14' : 'pl-5 pr-14'
                } text-sm text-[#3d2f2a] placeholder:text-[#a3928a] focus:outline-none focus:border-[#c9a15a] focus:bg-white transition-all duration-300 shadow-inner`}
              />
              <button
                className={`absolute top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#c9a15a] to-[#e0bd7a] rounded-full p-2.5 text-white hover:shadow-[0_0_15px_rgba(201,161,90,0.5)] transition-all duration-300 hover:scale-105 ${
                  isRTL ? 'left-1.5' : 'right-1.5'
                }`}
              >
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
{/* ================= Bottom Bar ================= */}
<div className="border-t border-[#c9a15a]/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
  <p className="text-sm text-[#8a7469] font-medium">
    {t.footer.copyright}
  </p>

  <a
    href="https://tungsten-media.com"
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-2 text-sm text-[#8a7469] font-medium transition-colors hover:text-[#a97c3f]"
  >
    <span>{isRTL ? "تم التطوير بواسطة" : "Powered by"}</span>

    <span className="relative font-semibold text-[#c9a15a] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#c9a15a] after:transition-all after:duration-300 group-hover:after:w-full">
      Tungsten
    </span>
  </a>
</div>
      </div>
    </footer>
  );
};

const ContactItem = ({ icon: Icon, title, desc, isLink, href }: ContactItemProps) => {
  const Content = (
    <div className="flex items-center gap-4 group cursor-default">
      <div className="w-11 h-11 rounded-full bg-white/70 border border-[#c9a15a]/25 flex items-center justify-center shrink-0 shadow-sm group-hover:border-[#c9a15a] group-hover:bg-[#c9a15a]/10 group-hover:-translate-y-1 transition-all duration-500">
        <Icon className="w-4 h-4 text-[#a97c3f]" />
      </div>
      <div>
        <p className="text-[#3d2f2a] font-bold text-sm mb-0.5 group-hover:text-[#a97c3f] transition-colors duration-300">
          {title}
        </p>
        <p className="text-xs text-[#8a7469] font-medium">{desc}</p>
      </div>
    </div>
  );

  return isLink ? (
    <a href={href} className="block">
      {Content}
    </a>
  ) : (
    Content
  );
};

export default Footer;
