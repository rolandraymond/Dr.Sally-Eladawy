import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Play, X, Quote } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface Testimonial {
  id: string;
  nameEn: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
  quoteEn: string;
  quoteAr: string;
  thumbnail: string;
  videoId: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    nameEn: "Dr. Sally El Adawy",
    nameAr: "د. سالي العدوي",
    roleEn: "Dermatology, Aesthetics & Laser Specialist",
    roleAr: "أخصائية الجلدية والتجميل والليزر",
    quoteEn:
      "Summer does not prevent Botox treatments. Discover the benefits of getting Botox during the summer.",
    quoteAr:
      "الصيف مش بيمنع البوتوكس، ده أكتر وقت بشرتك بتحتاجه فيه. تعالي نقولك إيه هي فوائد عمل البوتوكس في الصيف.",
    thumbnail: "/images/OES02481.jpg",
    videoId: "vDl3OBypXKY",
  },
  {
    id: "2",
    nameEn: "Dr. Sally El Adawy",
    nameAr: "د. سالي العدوي",
    roleEn: "Dermatology, Aesthetics & Laser Specialist",
    roleAr: "أخصائية الجلدية والتجميل والليزر",
    quoteEn:
      "Can you get fillers during the summer? Discover the benefits of filler treatments during the summer.",
    quoteAr:
      "أعمل الفيلر في الصيف ولا هيبوظ مني ويخلي بشرتي متدمرة؟ تعالي نقولك إيه هي فوائد عمل الفيلر في الصيف.",
    thumbnail: "/images/OES02416 (1).jpg",
    videoId: "ey8d6AZhzUs",
  },
  {
    id: "3",
    nameEn: "Dr. Sally El Adawy",
    nameAr: "د. سالي العدوي",
    roleEn: "Dermatology, Aesthetics & Laser Specialist",
    roleAr: "أخصائية الجلدية والتجميل والليزر",
    quoteEn:
      "Sagging skin can become a thing of the past with the hydro facelift technique. Discover how it works.",
    quoteAr:
      "ترهل الجلد هيكون موضة قديمة في وجود شد الوجه المائي. تعالي نقولك إيه هو تكنيك شد الوجه المائي.",
    thumbnail: "/images/OES02633.jpg",
    videoId: "1TxZEEpRpDs",
  },
  {
    id: "4",
    nameEn: "Dr. Sally El Adawy",
    nameAr: "د. سالي العدوي",
    roleEn: "Dermatology, Aesthetics & Laser Specialist",
    roleAr: "أخصائية الجلدية والتجميل والليزر",
    quoteEn:
      "No challenge will stop you anymore. Learn more about cellulite and the available ways to manage and treat it.",
    quoteAr:
      "مفيش Challenge هيوقفك بعد النهاردة. في الفيديو هنعرف أكتر عن الـ Cellulite وكيفية التعامل معاه وعلاجه.",
    thumbnail: "/images/OES02707.jpg",
    videoId: "Alow4bOE7nk",
  },
];


 const VideoGallery = () => {
  const { language } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<Testimonial | null>(null);

  return (
  <section className="relative overflow-hidden bg-[#F8F4EE] py-20 md:py-28">
    <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[70%] -translate-x-1/2 rounded-full bg-[#B8874A]/10 blur-[120px]" />

    <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto mb-14 max-w-3xl text-center md:mb-16"
      >
        <span className="mb-5 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#A24B3B]">
          <span className="h-px w-8 bg-[#A24B3B]/40" />
          {language === "en" ? "Expert Insights" : "معلومات من المتخصص"}
          <span className="h-px w-8 bg-[#A24B3B]/40" />
        </span>

        <h2 className="text-4xl font-semibold tracking-tight text-[#211D19] md:text-5xl lg:text-6xl">
          {language === "en" ? "Video Gallery" : "معرض الفيديوهات"}
        </h2>

        <h3 className="mt-5 font-neometric text-lg font-medium text-[#A24B3B] md:text-xl">
          {language === "en"
            ? "Hear It From the Expert"
            : "اسمع المعلومة من مصدرها"}
        </h3>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#211D19]/60 md:text-base">
          {language === "en"
            ? "Videos covering common skin concerns, answering frequently asked questions, and explaining when each treatment may be the right choice."
            : "فيديوهات بتشرح أشهر مشاكل البشرة، وتجاوب على الأسئلة اللي ناس كتير بتسألها، وتوضح إمتى يكون كل إجراء هو الاختيار المناسب."}
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {testimonials.map((testimonial, index) => (
          <motion.article
            key={testimonial.id}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.35 }}
            onClick={() => setSelectedVideo(testimonial)}
            className="group relative h-[520px] cursor-pointer overflow-hidden rounded-[2rem] border border-white/80 bg-[#211D19] shadow-[0_20px_60px_rgba(33,29,25,0.12)] sm:h-[480px] lg:h-[440px]"
          >
            <img
              src={testimonial.thumbnail}
              alt={
                language === "en"
                  ? testimonial.nameEn
                  : testimonial.nameAr
              }
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#17130F] via-[#17130F]/25 to-transparent" />

            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
              <span className="font-neometric text-[10px] font-medium uppercase tracking-[0.25em] text-white/70">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="rounded-full border border-white/20 bg-black/10 px-3 py-1.5 font-neometric text-[9px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
                {language === "en" ? "Watch video" : "شاهد الفيديو"}
              </span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 scale-125 rounded-full bg-[#B8874A]/25 blur-xl transition-transform duration-500 group-hover:scale-150" />

                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white shadow-xl backdrop-blur-md transition-all duration-500 group-hover:border-[#C9A761] group-hover:bg-[#C9A761] group-hover:text-[#211D19]">
                  <Play
                    className="ml-1 h-5 w-5"
                    fill="currentColor"
                  />
                </div>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="mb-3 inline-block rounded-full border border-[#C9A761]/30 bg-[#C9A761]/15 px-3 py-1 font-neometric text-[9px] font-medium uppercase tracking-[0.14em] text-[#F0D7A1] backdrop-blur-md">
                {language === "en"
                  ? testimonial.roleEn
                  : testimonial.roleAr}
              </span>

              <h3 className="font-neometric text-lg font-semibold text-white">
                {language === "en"
                  ? testimonial.nameEn
                  : testimonial.nameAr}
              </h3>

              <div className="mt-3 h-px w-10 bg-[#C9A761]" />

              <p className="mt-3 line-clamp-3 text-xs leading-6 text-white/70 md:text-sm">
                {language === "en"
                  ? testimonial.quoteEn
                  : testimonial.quoteAr}
              </p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>

    <AnimatePresence>
      {selectedVideo && (
        <Dialog
          open={Boolean(selectedVideo)}
          onOpenChange={(open) => {
            if (!open) setSelectedVideo(null);
          }}
        >
          <DialogContent className="w-[min(92vw,430px)] overflow-hidden rounded-[1.75rem] border border-white/10 bg-black p-0 shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
            <DialogTitle className="sr-only">
              {language === "en"
                ? selectedVideo.nameEn
                : selectedVideo.nameAr}
            </DialogTitle>

            <div className="relative aspect-[9/16] w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0&modestbranding=1`}
                title="Video from Dr. Sally El Adawy"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <button
              type="button"
              onClick={() => setSelectedVideo(null)}
              aria-label={language === "en" ? "Close video" : "إغلاق الفيديو"}
              className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  </section>
);
};

export default VideoGallery;