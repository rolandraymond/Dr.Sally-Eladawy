import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Phone, Mail, Clock, MessageCircle, CalendarDays } from 'lucide-react';

const ContactUs = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  const branches = [
    {
      name: t.footer.damietta,
      address: language === 'ar' ? 'الصفوة مول - برج 2 - الدور الخامس - شقة 8' : 'Safwa Mall – Tower 2 – 5th Floor – Apartment 8',
      phone: '01558008278',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('عيادة سالي العدوي الصفوة مول دمياط'),
    },
    {
      name: t.footer.newDamietta,
      address: language === 'ar' ? 'المنطقة المركزية - أعلى المصرف المتحد - بجوار المركز الطبي' : 'Central Zone – Above United Bank – Next to the Medical Center',
      phone: '01503656589',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('عيادة سالي العدوي المنطقة المركزية المصرف المتحد دمياط الجديدة'),
    },
  ];

  const zigzagMask: CSSProperties = {
    WebkitMaskImage:
      'linear-gradient(135deg, transparent 7px, black 7px), linear-gradient(-135deg, transparent 7px, black 7px)',
    maskImage:
      'linear-gradient(135deg, transparent 7px, black 7px), linear-gradient(-135deg, transparent 7px, black 7px)',
    WebkitMaskSize: '14px 14px',
    maskSize: '14px 14px',
    WebkitMaskRepeat: 'repeat-x',
    maskRepeat: 'repeat-x',
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      {/* ================= HERO ================= */}
      <section className="relative pt-48 pb-20 overflow-hidden bg-gradient-to-b from-[#fdfbf8] via-[#faf3ec] to-[#f6e9df]" >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-3xl bg-[radial-gradient(circle,rgba(255,255,255,0.9)_0%,rgba(233,185,196,0.2)_45%,transparent_72%)] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <PetalParticle key={i} />
          ))}
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#3d2f2a] mb-6 font-cairo relative inline-block">
              {language === 'ar' ? 'تواصل معانا' : 'Contact Us'}
              <svg viewBox="0 0 220 20" className="absolute -bottom-3 left-0 w-full h-5 overflow-visible" preserveAspectRatio="none">
                <motion.path
                  d="M3,12 C45,3 90,17 115,9 C145,1 180,15 217,7"
                  fill="none"
                  stroke="#c9a15a"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
                />
              </svg>
            </h1>
            <p className="text-lg text-[#7a675d] font-medium mt-4">
              {language === 'ar' ? 'خلينا نبدأ من هنا' : "Let's start here"}
            </p>
            <p className="text-base text-[#8a7469] mt-3 max-w-xl mx-auto leading-relaxed">
              {language === 'ar' 
                ? 'لو عندك استفسار عن خدمة، علاج، أو حابب تعرف أنسب خطوة لحالتك، كلّم فريقنا على واتساب.' 
                : 'If you have an inquiry about a service, treatment, or would like to know the best next step for your condition, contact our team on WhatsApp.'}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-20 bg-[#fdfbf8]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative pt-6"
            >
              <div
                className="h-3.5 w-full bg-gradient-to-r from-[#b8894a] via-[#e0bd7a] to-[#c9a15a]"
                style={zigzagMask}
              />

              <div className="relative bg-white border border-[#c9a15a]/15 border-t-0 rounded-b-[1.75rem] shadow-xl shadow-[#c9a15a]/10 px-8 sm:px-10 pt-14 pb-10">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full bg-[#c9a15a]/25 blur-md" />
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#c9a15a] to-[#a97c3f] shadow-lg flex items-center justify-center border-2 border-white">
                      <span className="text-white font-cairo font-bold text-sm tracking-wider">SF</span>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-[#3d2f2a] text-center mb-4">
                  {isRTL ? 'إحنا هنا نساعدك' : "We're here to help"}
                </h2>
                <p className="text-[#7a675d] leading-8 text-center mb-8">
                  {isRTL ? 'عندك سؤال عن خدماتنا أو المواعيد؟ كلّم فريقنا على واتساب. ولو حابب تحجز، املا طلب الحجز وهننسق معاك الموعد المتاح.' : 'Questions about our services or opening hours? Chat with our team on WhatsApp, or fill in an appointment request so we can arrange an available time.'}
                </p>
                <div className="space-y-4">
                  <a href="https://wa.me/201503656589" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 rounded-full bg-[#3d2f2a] text-white p-4 hover:bg-[#554139]">
                    <MessageCircle size={20} />{isRTL ? 'كلّمنا واتساب' : 'Chat on WhatsApp'}
                  </a>
                  <a href="/booking" className="flex items-center justify-center gap-3 rounded-full bg-[#c9a15a] text-white p-4 hover:bg-[#a97c3f]">
                    <CalendarDays size={20} />{isRTL ? 'احجز موعد' : 'Book an Appointment'}
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-[#3d2f2a] mb-2 font-cairo">{t.footer.branches}</h2>

              {branches.map((branch, index) => (
                <BranchTicket key={index} branch={branch} directionsLabel={t.common.directions} />
              ))}

              <div className="relative bg-white border border-[#c9a15a]/15 rounded-[1.5rem] shadow-md shadow-[#c9a15a]/5 p-7 overflow-hidden">
                <motion.div
                  className="absolute top-4 end-4 w-16 h-16 opacity-70"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <path id="stampPath" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                    </defs>
                    <text fontSize="7.5" fill="#c9a15a" letterSpacing="2">
                      <textPath href="#stampPath">
                        {(language === 'ar' ? '• ساعات العمل • تواصلي معنا ' : '• OPENING HOURS • GET IN TOUCH ').repeat(2)}
                      </textPath>
                    </text>
                  </svg>
                </motion.div>

                <div className="flex gap-3 mb-5">
                  <Clock className="w-5 h-5 text-[#a97c3f] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-[#3d2f2a] mb-1">{t.footer.workingHours}</p>
                    <span className="text-[#7a675d] text-sm">{isRTL ? 'يوميًا من 1 ظهرًا لـ1 صباحًا' : 'Daily from 1 PM to 1 AM'}</span>
                  </div>
                </div>
                <div className="flex gap-3 pt-4 border-t border-[#c9a15a]/10">
                  <Mail className="w-5 h-5 text-[#a97c3f] flex-shrink-0" />
                  <a href="mailto:info@sftouchclinics.com" className="text-[#7a675d] text-sm hover:text-[#a97c3f] transition-colors">
                    info@sftouchclinics.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};



const BranchTicket = ({
  branch,
  directionsLabel,
}: {
  branch: { name: string; address: string; phone: string; mapUrl: string };
  directionsLabel: string;
}) => {
  return (
    <div className="relative bg-white border border-[#c9a15a]/15 rounded-[1.5rem] shadow-md shadow-[#c9a15a]/5 overflow-hidden">
      <div className="p-7 pb-5">
        <h3 className="text-lg font-bold text-[#3d2f2a] mb-4 font-cairo">{branch.name}</h3>
        <div className="space-y-3">
          <div className="flex gap-3">
            <MapPin className="w-5 h-5 text-[#a97c3f] flex-shrink-0" />
            <span className="text-[#7a675d] text-sm">{branch.address}</span>
          </div>
          <div className="flex gap-3">
            <Phone className="w-5 h-5 text-[#a97c3f] flex-shrink-0" />
            <a href={`tel:${branch.phone}`} className="text-[#7a675d] text-sm hover:text-[#a97c3f] transition-colors">
              {branch.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="relative flex items-center px-1">
        <span className="absolute -left-3 w-6 h-6 rounded-full bg-[#fdfbf8]" />
        <span className="absolute -right-3 w-6 h-6 rounded-full bg-[#fdfbf8]" />
        <div className="w-full border-t-2 border-dashed border-[#c9a15a]/25" />
      </div>

      <a
        href={branch.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-4 text-[#a97c3f] font-bold text-sm hover:bg-[#faf3ec] transition-colors"
      >
        <MapPin className="w-4 h-4" />
        {directionsLabel}
      </a>
    </div>
  );
};

const PetalParticle = () => {
  const randomX = Math.random() * 100;
  const randomDelay = Math.random() * 8;
  const size = Math.random() * 8 + 6;
  const swayDistance = Math.random() * 40 - 20;
  const duration = 16 + Math.random() * 8;

  return (
    <motion.div
      className="absolute bg-gradient-to-br from-[#e9b9c4] to-[#c9a15a]/60 opacity-40"
      style={{ left: `${randomX}%`, width: size, height: size * 1.2, borderRadius: '0% 100% 0% 100%' }}
      initial={{ y: '-10vh', rotate: 0 }}
      animate={{ y: '110vh', x: [0, swayDistance, 0, -swayDistance, 0], rotate: [0, 180, 360], opacity: [0, 0.5, 0.5, 0] }}
      transition={{ duration, repeat: Infinity, delay: randomDelay, ease: 'linear' }}
    />
  );
};

export default ContactUs;