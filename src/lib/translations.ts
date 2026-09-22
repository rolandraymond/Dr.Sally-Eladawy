export type Language = "en" | "ar";

export interface TranslationContent {
  // Navbar
  nav: {
    home: string;
    about: string;
    services: string;
    doctors: string;
    offers: string;
    contact: string;
    bookAppointment: string;
  };

  // Hero
  hero: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    secondaryCta: string;
  };

  // Services
  services: {
    title: string;
    subtitle: string;
    dermatology: {
      title: string;
      description: string;
    };
    nutrition: {
      title: string;
      description: string;
    };
    hair: {
      title: string;
      description: string;
    };
    learnMore: string;
  };

  // Technologies
  technologies: {
    title: string;
    subtitle: string;
  };

  // Why Choose Us
  whyUs: {
    title: string;
    subtitle: string;
    doctorsCare: {
      title: string;
      description: string;
    };
    technology: {
      title: string;
      description: string;
    };
    customized: {
      title: string;
      description: string;
    };
    results: {
      title: string;
      description: string;
    };
  };

  // Footer
  footer: {
    about: string;
    aboutText: string;
    quickLinks: string;
    branches: string;
    damietta: string;
    newDamietta: string;
    workingHours: string;
    hours: string;
    copyright: string;
    followUs: string;
  };

  // Contact
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    send: string;
  };

  // About
  about: {
    title: string;
    vision: string;
    visionText: string;
    mission: string;
    missionText: string;
    founderTitle: string;
    founderName: string;
    founderBio: string;
  };

  // Common
  common: {
    readMore: string;
    viewAll: string;
    callNow: string;
    directions: string;
  };
}

export const translations: Record<Language, TranslationContent> = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      services: "Services",
      doctors: "Meet Dr. Sally",
      offers: "Offers",
      contact: "Contact Us",
      bookAppointment: "Book an Appointment",
    },
    hero: {
      title: "Medical Expertise... Results That Make a Difference",
      subtitle: "Dr. Sally El-Adawy",
      description:
        "Specialized care in dermatology, aesthetics, and laser treatments, with personalized treatment plans based on each case and the latest technologies for natural-looking, safe results.",
      cta: "Book Your Consultation",
      secondaryCta: "Explore Services",
    },
    services: {
      title: "Our Services",
      subtitle:
        "From dermatology and laser treatments to nutrition, body contouring, and hair restoration, every service starts with a thorough assessment to find the most suitable approach.",
      dermatology: {
        title: "Dermatology & Laser",
        description:
          "Advanced skin treatments, laser procedures, and aesthetic injectables, with medical supervision and a plan suited to each case.",
      },
      nutrition: {
        title: "Medical Nutrition & Body Contouring",
        description:
          "Personalized nutrition plans, advanced body-contouring techniques, and modern technologies designed to achieve balanced, natural-looking results.",
      },
      hair: {
        title: "Hair Transplantation & Treatment",
        description:
          "Specialized solutions for hair transplantation and hair concerns, with a personalized plan designed to achieve the best possible outcome.",
      },
      learnMore: "Learn More",
    },
    technologies: {
      title: "Specialized Care",
      subtitle:
        "Medical care, advanced technologies, and attention that starts from the first consultation and continues until the right result is achieved.",
    },
    whyUs: {
      title: "Why Choose Dr. Sally El-Adawy?",
      subtitle: "Because the Small Details Make the Difference",
      doctorsCare: {
        title: "Precise Assessment",
        description:
          "Every case is carefully assessed before treatment to understand your features, needs, and the most suitable approach.",
      },
      technology: {
        title: "Personalized Treatment",
        description:
          "No two cases are the same. Your treatment plan is selected according to what best suits your individual needs.",
      },
      customized: {
        title: "Natural-Looking Results",
        description:
          "The goal is to enhance your features while keeping you looking like yourself—more refreshed, balanced, and natural.",
      },
      results: {
        title: "Care Beyond the Treatment",
        description:
          "From understanding every step before the procedure to follow-up afterward, you are supported throughout your treatment journey.",
      },
    },
    footer: {
      about: "Dr. Sally El-Adawy",
      aboutText:
        "Dr. Sally believes the best results start with the right diagnosis and the right treatment for each case, away from quick fixes and one-size-fits-all solutions.",
      quickLinks: "Quick Links",
      branches: "Our Branches",
      damietta: "Damietta Branch",
      newDamietta: "New Damietta Branch",
      workingHours: "Working Hours",
      hours: "Daily from 1 AM to 1 PM",
      copyright: "© 2026 Tungsten Media. All rights reserved.",
      followUs: "Follow Us",
    },
    contact: {
      title: "Have a Question? Let’s Start Here",
      subtitle:
        "Tell us how we can help. Leave your message or inquiry, and our team will contact you within 24 hours.",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      message: "Your Message or Inquiry",
      send: "Send Message",
    },
    about: {
      title: "Every Great Result Starts With the Right Beginning",
      vision: "My Vision",
      visionText:
        "To provide medical care based on science and experience, where every result is suited to the individual case while preserving a natural appearance.",
      mission: "My Mission",
      missionText:
        "To help every case achieve the best possible result through accurate diagnosis, a suitable treatment plan, and continuous follow-up at every step.",
      founderTitle: "Dermatology, Aesthetics & Laser Specialist",
      founderName: "Dr. Sally El-Adawy",
      founderBio:
        "Dr. Sally combines accurate diagnosis, practical experience, and the right procedure for each case. She believes aesthetics should enhance natural features, not change them.",
    },
    common: {
      readMore: "Read More",
      viewAll: "View All Services",
      callNow: "Call Now",
      directions: "Get Directions",
    },
  },

  ar: {
    nav: {
      home: "الرئيسية",
      about: "من نحن؟",
      services: "الخدمات",
      doctors: "عن د. سالي",
      offers: "العروض",
      contact: "تواصل معنا",
      bookAppointment: "احجز موعد",
    },
    hero: {
      title: "خبرة طبية... ونتائج تفرق",
      subtitle: "د. سالي العدوي",
      description:
        "رعاية طبية متخصصة في الجلدية والتجميل والليزر، مع خطط علاج بتتحدد حسب احتياجات كل حالة، وباستخدام أحدث التقنيات للحصول على نتائج طبيعية وآمنة.",
      cta: "احجز استشارتك",
      secondaryCta: "اكتشف الخدمات",
    },
    services: {
      title: "خدماتنا",
      subtitle:
        "من الجلدية والليزر، للتغذية ونحت الجسم، وزراعة وعلاج الشعر، كل خدمة بتبدأ بتقييم دقيق علشان نوصل لأفضل نتيجة ممكنة.",
      dermatology: {
        title: "الجلدية والليزر",
        description:
          "علاجات متقدمة للبشرة، وإجراءات الليزر والحقن التجميلية، بإشراف طبي وخطة تناسب طبيعة كل حالة.",
      },
      nutrition: {
        title: "التغذية العلاجية ونحت الجسم",
        description:
          "خطط غذائية مخصصة، وتقنيات متقدمة لنحت الجسم وأجهزة حديثة لتحقيق نتائج متوازنة وطبيعية.",
      },
      hair: {
        title: "زراعة وعلاج الشعر",
        description:
          "حلول متخصصة لزراعة الشعر وعلاج مشكلاته، مع خطة مناسبة لكل حالة للحصول على أفضل نتيجة ممكنة.",
      },
      learnMore: "تفاصيل أكتر",
    },
    technologies: {
      title: "رعاية متخصصة بمعايير طبية عالية",
      subtitle:
        "رعاية طبية، أحدث التقنيات، واهتمام يبدأ من أول استشارة وحتى الوصول للنتيجة المناسبة.",
    },
    whyUs: {
      title: "ليه تختار د. سالي العدوي؟",
      subtitle: "لأن التفاصيل الصغيرة هي اللي بتصنع الفرق",
      doctorsCare: {
        title: "تقييم دقيق قبل أي إجراء",
        description:
          "كل حالة بيتم تقييمها بعناية قبل العلاج علشان نفهم احتياجاتها ونحدد أنسب خطوة ليها.",
      },
      technology: {
        title: "اختيار العلاج المناسب",
        description:
          "مش كل تقنية تنفع لكل الناس، والإجراء بيتحدد حسب احتياجات كل حالة، مش حسب الترند.",
      },
      customized: {
        title: "نتائج طبيعية",
        description:
          "هدفنا نتيجة طبيعية ومتناسقة تحافظ على ملامحك وشخصيتك من غير مبالغة أو تغيير.",
      },
      results: {
        title: "متابعة مستمرة",
        description:
          "الرعاية مش بتقف عند نهاية الجلسة، والمتابعة جزء أساسي من رحلة العلاج والوصول لأفضل نتيجة.",
      },
    },
    footer: {
      about: "د. سالي العدوي",
      aboutText:
        "د. سالي العدوي أخصائية الجلدية والتجميل والليزر، وبتؤمن إن أفضل النتائج بتبدأ من تشخيص صح واختيار العلاج المناسب لكل حالة، بعيدًا عن الحلول السريعة أو الموحدة.",
      quickLinks: "روابط سريعة",
      branches: "فروعنا",
      damietta: "فرع دمياط القديمة",
      newDamietta: "فرع دمياط الجديدة",
      workingHours: "مواعيد العمل",
      hours: "يوميًا من الساعة 1 صباحًا حتى 1 مساءً",
      copyright: "© 2026 تنجستن ميديا. جميع الحقوق محفوظة.",
      followUs: "تابعنا",
    },
    contact: {
      title: "عندك سؤال؟ خلينا نبدأ من هنا",
      subtitle:
        "قولنا إزاي نقدر نساعدك. سيب رسالتك واستفسارك، وفريقنا هيتواصل معاك خلال 24 ساعة.",
      name: "الاسم بالكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الموبايل",
      message: "رسالتك أو استفسارك",
      send: "إرسال الرسالة",
    },
    about: {
      title: "كل نتيجة ناجحة ليها بداية صح",
      vision: "رؤيتي",
      visionText:
        "أقدم رعاية طبية مبنية على العلم والخبرة، بحيث تكون كل نتيجة مناسبة للحالة وتحافظ على المظهر الطبيعي.",
      mission: "رسالتي",
      missionText:
        "أساعد كل حالة لتصل لأفضل نتيجة ممكنة من خلال تشخيص دقيق، وخطة علاج مناسبة، ومتابعة مستمرة في كل خطوة.",
      founderTitle: "أخصائية الجلدية والتجميل والليزر",
      founderName: "د. سالي العدوي",
      founderBio:
        "بتعتمد د. سالي في شغلها على الجمع بين التشخيص الدقيق والخبرة العملية واختيار الإجراء المناسب لكل حالة، وبتؤمن إن التجميل هدفه نتيجة طبيعية ومتناسقة تحافظ على الملامح.",
    },
    common: {
      readMore: "اعرف المزيد",
      viewAll: "عرض كل الخدمات",
      callNow: "اتصل الآن",
      directions: "الاتجاهات",
    },
  },
};
