import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Apple, Dumbbell, Zap, Activity, Heart, Target } from 'lucide-react';

const NutritionContouring = () => {
  const { language } = useLanguage();

  const services = [
    {
      icon: Apple,
      title: language === 'ar' ? 'خطط غذائية مخصصة' : 'Custom Diet Plans',
      description: language === 'ar'
        ? 'برامج غذائية مصممة خصيصاً لأهدافك الصحية'
        : 'Nutrition programs tailored to your health goals',
    },
    {
      icon: Activity,
      title: language === 'ar' ? 'أوندا' : 'Onda',
      description: language === 'ar'
        ? 'موجات باردة لتقليل السيلوليت والدهون'
        : 'Coolwaves for cellulite and fat reduction',
    },
    {
      icon: Dumbbell,
      title: language === 'ar' ? 'شوارزي' : 'Schwarzy',
      description: language === 'ar'
        ? 'جهاز بناء العضلات وشد الجسم'
        : 'Muscle building and body toning device',
    },
    {
      icon: Heart,
      title: language === 'ar' ? 'متابعة الوزن' : 'Weight Follow-up',
      description: language === 'ar'
        ? 'متابعة دورية لضمان تحقيق أهدافك'
        : 'Regular follow-up to ensure you reach your goals',
    },
    {
      icon: Target,
      title: language === 'ar' ? 'نحت الجسم' : 'Body Sculpting',
      description: language === 'ar'
        ? 'تقنيات متعددة لتحقيق الجسم المثالي'
        : 'Multiple techniques for achieving your ideal body',
    },
  ];

  return (
    <>
    <section className="section-padding">
      <div className="container-custom">
        <div
          dir={language === 'ar' ? 'rtl' : 'ltr'}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className={`
                group relative h-full overflow-hidden rounded-3xl
                border border-accent/15 bg-background p-7
                shadow-sm transition-[border-color,box-shadow] duration-300
                hover:border-accent/40 hover:shadow-lg
                lg:col-span-2
                ${index === 3 ? 'lg:col-start-2' : ''}
                ${
                  index === 4
                    ? 'md:col-span-2 md:w-[calc(50%-0.75rem)] md:justify-self-center lg:col-span-2 lg:col-start-4 lg:w-full'
                    : ''
                }
              `}
            >
              <div
                className="
                  mb-6 flex h-16 w-16 items-center justify-center
                  rounded-2xl bg-accent/10 text-accent
                  transition-colors duration-300
                  group-hover:bg-accent group-hover:text-white
                "
              >
                <service.icon strokeWidth={1.6} className="h-8 w-8" />
              </div>

             <h3 className="mb-3 text-xl font-semibold text-secondary">
                {language !== 'ar' && service.title === 'Weight Follow-up' ? (
                  <>
                    Weight Follow
                    <span style={{ fontFamily: 'Arial, sans-serif' }}>-</span>
                    up
                  </>
                ) : (
                  service.title
                )}
              </h3>

              <p className="text-sm leading-7 text-muted-foreground">
                {service.description}
              </p>

              <div
                className="
                  mt-7 h-1 w-10 rounded-full bg-accent/30
                  transition-all duration-300
                  group-hover:w-20 group-hover:bg-accent
                "
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-elevated"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-5">
                  <service.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-secondary mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default NutritionContouring;