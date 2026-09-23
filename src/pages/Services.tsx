import React, { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, Apple, Scissors, Plus, Minus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const styles = `
.elite-services{background:#f5f1ea;color:#191919;padding:100px 24px;overflow:hidden;font-family:Arial,sans-serif;font-style:normal}
.elite-services[dir="rtl"]{font-family:Cairo,Tahoma,Arial,sans-serif}
.elite-services *{box-sizing:border-box}
.elite-services h2,.elite-services h3,.elite-services p{margin:0;font-family:inherit;font-style:normal}
.elite-services button,.elite-services a{font-family:inherit;font-style:normal}
.elite-services .es-wrap{max-width:1280px;margin:auto}
.elite-services .es-eyebrow{display:flex;align-items:center;gap:14px;color:#786344;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;margin-bottom:26px}
.elite-services[dir="rtl"] .es-eyebrow{letter-spacing:0}
.elite-services .es-eyebrow:before{content:"";width:36px;height:1px;background:#b39763}
.elite-services .es-header{display:grid;grid-template-columns:1.2fr 1fr;gap:64px;align-items:end;margin-bottom:54px}
.elite-services .es-title{font-size:clamp(34px,4.3vw,60px);font-weight:400;line-height:1.12;letter-spacing:-.045em;max-width:700px}
.elite-services .es-title span{display:block;color:#88704d;margin-top:5px}
.elite-services[dir="rtl"] .es-title{letter-spacing:0;line-height:1.5}
.elite-services .es-intro{font-size:15px;line-height:1.9;color:#68645e;max-width:470px;padding-bottom:4px}
.elite-services .es-layout{display:grid;grid-template-columns:1fr 1.05fr;gap:clamp(32px,6vw,88px);align-items:center}
.elite-services .es-visual{position:relative;height:570px;border-radius:5px;overflow:hidden;background:#e6ded0}
.elite-services .es-photo{position:absolute;inset:0;background:#e6ded0;overflow:hidden}
.elite-services .es-photo img{position:absolute;width:100%;height:100%;inset:0;object-fit:cover}
.elite-services .es-fallback{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:radial-gradient(ellipse at 30% 20%,#eee5d7,transparent 60%),linear-gradient(145deg,#ded2be,#a9987d);color:#f9f5ec}
.elite-services .es-fallback svg{width:100px;height:100px;stroke-width:.7}
.elite-services .es-image-shade{position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,rgba(25,25,25,.55));pointer-events:none}
.elite-services .es-image-label{position:absolute;bottom:28px;inset-inline:28px;display:flex;align-items:center;gap:16px;color:white;font-size:15px;line-height:1.5}
.elite-services .es-image-label span:first-child{font-size:12px;border:1px solid #ffffff60;padding:10px;border-radius:50%;font-variant-numeric:tabular-nums}
.elite-services .es-list{border-top:1px solid #d6cfc2}
.elite-services .es-item{border-bottom:1px solid #d6cfc2}
.elite-services .es-trigger{width:100%;display:flex;align-items:center;gap:20px;padding:28px 0;background:none;border:0;color:#69655e;cursor:pointer;text-align:start;transition:color .2s}
.elite-services .es-trigger:hover,.elite-services .es-trigger[aria-expanded="true"]{color:#191919}
.elite-services .es-number{font-size:11px;color:#88704d;font-weight:400;align-self:flex-start;padding-top:9px;font-variant-numeric:tabular-nums}
.elite-services .es-name{flex:1;font-size:clamp(21px,2.1vw,29px);font-weight:400;line-height:1.35;letter-spacing:-.025em}
.elite-services[dir="rtl"] .es-name{letter-spacing:0;line-height:1.65}
.elite-services .es-toggle{flex-shrink:0;width:36px;height:36px;border:1px solid #cfc5b4;border-radius:50%;display:grid;place-items:center;transition:background .2s,color .2s}
.elite-services .es-trigger[aria-expanded="true"] .es-toggle{background:#191919;color:#f5f1ea;border-color:#191919}
.elite-services .es-panel-inner{padding:0 0 30px;padding-inline-start:34px}
.elite-services .es-description{font-size:14px;line-height:1.9;color:#68645e;max-width:460px}
.elite-services .es-link{display:inline-flex;align-items:center;gap:18px;margin-top:24px;color:#191919;text-decoration:none;font-size:12px;font-weight:600;padding:8px 0;border-bottom:1px solid #b39763}
.elite-services .es-link svg{transition:transform .2s}
.elite-services .es-link:hover svg{transform:translateX(4px)}
.elite-services[dir="rtl"] .es-link svg{transform:rotate(180deg)}
.elite-services[dir="rtl"] .es-link:hover svg{transform:translateX(-4px) rotate(180deg)}
.elite-services .es-trigger:focus-visible,.elite-services .es-link:focus-visible{outline:2px solid #88704d;outline-offset:5px;border-radius:2px}
.elite-services .es-mobile-visual{display:none}
.elite-services .es-footer{display:flex;align-items:center;justify-content:space-between;margin-top:20px;color:#887e6d;font-size:10px;letter-spacing:.13em;text-transform:uppercase}
.elite-services[dir="rtl"] .es-footer{letter-spacing:0}
.elite-services .es-dots{display:flex;gap:6px}
.elite-services .es-dot{width:6px;height:6px;border-radius:50%;background:#d6cfc2}
.elite-services .es-dot.is-active{background:#88704d}
@media(min-width:768px) and (max-width:1023px){.elite-services .es-header{gap:32px}.elite-services .es-visual{height:510px}.elite-services .es-trigger{gap:12px}.elite-services .es-panel-inner{padding-inline-start:26px}}
@media(max-width:767px){.elite-services{padding:64px 20px}.elite-services .es-header{grid-template-columns:1fr;gap:22px;margin-bottom:34px}.elite-services .es-title{font-size:38px}.elite-services .es-intro{font-size:14px}.elite-services .es-layout{grid-template-columns:1fr;gap:0}.elite-services .es-desktop-visual{display:none}.elite-services .es-mobile-visual{display:block;position:relative;height:260px;overflow:hidden;border-radius:4px;margin-bottom:20px}.elite-services .es-trigger{padding:24px 0;gap:12px}.elite-services .es-name{font-size:22px}.elite-services .es-panel-inner{padding-inline-start:0}.elite-services .es-eyebrow{margin-bottom:20px}.elite-services .es-image-label{bottom:20px;inset-inline:20px}}
@media(prefers-reduced-motion:reduce){.elite-services *{transition:none!important}}
`;

type ServiceImageProps = {
  src: string;
  title: string;
  number: string;
  icon: typeof Sparkles;
};

// Failed remote images get a designed fallback instead of a broken-image label.
const ServiceImage = ({ src, title, number, icon: Icon }: ServiceImageProps) => {
  const [failed, setFailed] = useState(false);
  return (
    <div className="es-photo">
      <div className="es-fallback" aria-hidden="true"><Icon /></div>
      {!failed && (
        <img src={src} alt="" loading="lazy" decoding="async" onError={() => setFailed(true)} />
      )}
      <div className="es-image-shade" />
      <div className="es-image-label" aria-hidden="true">
        <span>{number}</span><span>{title}</span>
      </div>
    </div>
  );
};

const Services = () => {
  const { isRTL } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const instanceId = useId();
  const duration = reduceMotion ? 0 : 0.3;

  const services = [
    {
      id: '01',
      title: isRTL ? 'الجلدية والليزر' : 'Dermatology & Laser',
      description: isRTL
        ? 'علاجات متقدمة لمشاكل البشرة، وإجراءات الليزر والحقن التجميلية، مع اختيار التقنية المناسبة حسب طبيعة كل حالة.'
        : 'Advanced treatments for skin concerns, along with laser procedures and aesthetic injectables, with the right technology selected for each case.',
      icon: Sparkles,
      image: '/images/ChatGPT Image Sep 22, 2026, 04_20_42 PM.png',
      href: '/services/dermatology-laser',
    },
    {
      id: '02',
      title: isRTL ? 'التغذية العلاجية ونحت الجسم' : 'Medical Nutrition & Body Contouring',
      description: isRTL
        ? 'من خطط التغذية المخصصة لتقنيات نحت الجسم المتقدمة، بنشتغل على الوصول لتغيير متوازن يناسب احتياجات كل حالة.'
        : 'From personalized nutrition plans to advanced body-contouring techniques, we work toward balanced changes that suit each case and its needs.',
      icon: Apple,
      image: '/images/ChatGPT Image Sep 22, 2026, 04_26_02 PM.png',
      href: '/services/nutrition-contouring',
    },
    {
      id: '03',
      title: isRTL ? 'زراعة وعلاج الشعر' : 'Hair Transplantation & Treatment',
      description: isRTL
        ? 'حلول متخصصة لزراعة الشعر وعلاج مشكلاته، باستخدام تقنيات وأساليب علاجية مناسبة لطبيعة كل حالة.'
        : 'Specialized solutions for hair transplantation and hair concerns, using treatment techniques suited to each individual case.',
      icon: Scissors,
      image: '/images/ChatGPT Image Sep 22, 2026, 04_27_58 PM.png',
      href: '/services/hair-restoration',
    },
  ];
  const active = services[activeIndex];

  return (
    <section id="services" className="elite-services" dir={isRTL ? 'rtl' : 'ltr'} aria-labelledby={`${instanceId}-title`}>
      <style>{styles}</style>
      <div className="es-wrap">
        <div className="es-eyebrow">{isRTL ? 'خدماتنا' : 'Our Services'}</div>
        <div className="es-header">
          <h2 id={`${instanceId}-title`} className="es-title">
            {isRTL ? 'كل خدمة تبدأ' : 'Every Service Starts With'}
            <span>{isRTL ? 'بفهم احتياجات الحالة' : 'Understanding the Case'}</span>
          </h2>
          <p className="es-intro">
            {isRTL
              ? 'من الجلدية والليزر، للتغذية ونحت الجسم، وزراعة وعلاج الشعر، كل خدمة لها طريقة مختلفة في التقييم والعلاج، والهدف دايمًا اختيار الأنسب لكل حالة.'
              : 'From dermatology and laser treatments to nutrition, body contouring, and hair transplantation, every service requires a different approach to assessment and treatment. The goal is always to choose what is right for each case.'}
          </p>
        </div>

        <div className="es-layout">
          <div className="es-desktop-visual" aria-hidden="true">
            <div className="es-visual">
              <AnimatePresence initial={false}>
                <motion.div key={active.id} style={{ position: 'absolute', inset: 0 }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration }}>
                  <ServiceImage src={active.image} title={active.title} number={active.id} icon={active.icon} />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="es-footer">
              <span>{isRTL ? 'رعاية تناسب احتياجاتك' : 'Care, considered for you'}</span>
              <div className="es-dots">
                {services.map((service, index) => <span key={service.id} className={`es-dot${activeIndex === index ? ' is-active' : ''}`} />)}
              </div>
            </div>
          </div>

          <div className="es-list">
            {services.map((service, index) => {
              const isActive = index === activeIndex;
              const buttonId = `${instanceId}-button-${service.id}`;
              const panelId = `${instanceId}-panel-${service.id}`;
              return (
                <div className="es-item" key={service.id}>
                  <h3>
                    <button id={buttonId} type="button" className="es-trigger" aria-expanded={isActive}
                      aria-controls={panelId} onClick={() => setActiveIndex(index)}>
                      <span className="es-number" aria-hidden="true">{service.id}</span>
                      <span className="es-name">{service.title.split('&').map((part, index) => (
                        <React.Fragment key={index}>
                          {index > 0 && (
                            <span
                              style={{
                                fontFamily: 'Arial, sans-serif',
                                fontStyle: 'normal',
                                fontWeight: 700,
                              }}
                            >
                              &amp;
                            </span>
                          )}
                          {part}
                        </React.Fragment>
                      ))}</span>
                      <span className="es-toggle" aria-hidden="true">
                        {isActive ? <Minus size={16} /> : <Plus size={16} />}
                      </span>
                    </button>
                  </h3>
                  <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isActive}>
                    {isActive && (
                      <motion.div className="es-panel-inner" initial={{ opacity: reduceMotion ? 1 : 0 }}
                        animate={{ opacity: 1 }} transition={{ duration }}>
                        <div className="es-mobile-visual" aria-hidden="true">
                          <ServiceImage src={service.image} title={service.title} number={service.id} icon={service.icon} />
                        </div>
                        <p className="es-description">{service.description}</p>
                        <Link to={service.href} className="es-link" aria-label={`${isRTL ? 'اعرف المزيد عن' : 'Learn more about'} ${service.title}`}>
                          <span>{isRTL ? 'اعرف المزيد' : 'Learn More'}</span>
                          <ArrowRight size={17} aria-hidden="true" />
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
