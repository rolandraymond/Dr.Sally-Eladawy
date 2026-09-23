import { useRef, useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CalendarDays, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const services = [
  ['dermatology', 'الجلدية والليزر', 'Dermatology & Laser'],
  ['nutrition', 'التغذية العلاجية ونحت الجسم', 'Medical Nutrition & Body Contouring'],
  ['hair', 'زراعة وعلاج الشعر', 'Hair Transplantation & Treatment'],
  ['consultation', 'محتاج استشارة لاختيار الخدمة', 'Help me choose a service'],
];
const branches = [
  ['damietta', 'دمياط القديمة', 'Damietta'],
  ['new-damietta', 'دمياط الجديدة', 'New Damietta'],
];
const normalizeDigits = (value: string) => value
  .replace(/[٠-٩]/g, c => String('٠١٢٣٤٥٦٧٨٩'.indexOf(c)))
  .replace(/[۰-۹]/g, c => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(c)));
const normalizeName = (value: string) => value.normalize('NFC').trim().replace(/ +/g, ' ');
const normalizePhone = (value: string) => {
  let phone = normalizeDigits(value).trim().replace(/[ ()-]/g, '');
  if (phone.startsWith('+20')) phone = '0' + phone.slice(3);
  else if (phone.startsWith('0020')) phone = '0' + phone.slice(4);
  else if (/^201/.test(phone)) phone = '0' + phone.slice(2);
  return phone;
};
const validName = (value: string) => value.length >= 2 && value.length <= 100
  && /^[\p{L}][\p{L}\p{M}]*(?:[ '\u2019-][\p{L}][\p{L}\p{M}]*)*$/u.test(value)
  && (value.match(/\p{L}/gu) || []).length >= 2;
const validPhone = (value: string) => /^01[0125][0-9]{8}$/.test(value);
const validDate = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + 'T12:00:00Z');
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};
const localToday = () => {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Africa/Cairo', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  return ['year', 'month', 'day'].map(type => parts.find(part => part.type === type)?.value).join('-');
};
const validateFields = (data: FormData, ar: boolean) => {
  const errors: Record<string, string> = {};
  if (!validName(normalizeName(String(data.get('name') ?? '')))) errors.name = ar
    ? 'اكتب اسمك بحروف فقط، من 2 لـ100 حرف. المسافات والشرطة والفاصلة العليا مسموحين بين أجزاء الاسم.'
    : 'Enter a name of 2–100 characters using letters. Spaces, hyphens and apostrophes are allowed between name parts.';
  if (!validPhone(normalizePhone(String(data.get('phone') ?? '')))) errors.phone = ar
    ? 'اكتب موبايل مصري من 11 رقم يبدأ بـ010 أو 011 أو 012 أو 015. ممكن تضيف +20 بدل أول صفر.'
    : 'Enter an 11-digit Egyptian mobile starting with 010, 011, 012 or 015. You can use +20 instead of the first zero.';
  if (!services.some(item => item[0] === data.get('service'))) errors.service = ar ? 'اختار خدمة من القائمة.' : 'Choose a service from the list.';
  if (!branches.some(item => item[0] === data.get('branch'))) errors.branch = ar ? 'اختار فرع من القائمة.' : 'Choose a branch from the list.';
  const date = String(data.get('date') ?? '');
  if (!validDate(date) || date < localToday()) errors.date = ar ? 'اختار تاريخ صحيح: النهارده أو يوم جاي.' : 'Choose a valid date: today or a future day.';
  const notes = String(data.get('notes') ?? '');
  if (notes.length > 500 || /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u202A-\u202E\u2066-\u2069]/.test(notes)) errors.notes = ar ? 'الملاحظات بحد أقصى 500 حرف ومن غير رموز تحكم مخفية.' : 'Notes must be at most 500 characters without hidden control characters.';
  return errors;
};
const fieldClass = 'mt-2 w-full min-w-0 rounded-xl border border-[#c9a15a]/30 bg-white px-4 py-3 text-[#3d2f2a] outline-none focus:border-[#a97c3f] focus:ring-2 focus:ring-[#c9a15a]/20';

export default function BookingSection() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const reduceMotion = useReducedMotion();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const busy = useRef(false);
  const request = useRef({ fingerprint: '', id: '' });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy.current) return;
    setFieldErrors({});
    setWhatsappUrl('');
    const data = new FormData(event.currentTarget);
    const errors = validateFields(data, ar);
    setFieldErrors(errors);
    const firstInvalid = Object.keys(errors)[0];
    if (firstInvalid) {
      const field = event.currentTarget.elements.namedItem(firstInvalid);
      if (field instanceof HTMLElement) field.focus();
      return;
    }
    if (String(data.get('website') ?? '')) return;
    const name = normalizeName(String(data.get('name') ?? ''));
    const normalized = normalizePhone(String(data.get('phone') ?? ''));
    const date = String(data.get('date') ?? '');
    const service = services.find(item => item[0] === data.get('service'));
    const branch = branches.find(item => item[0] === data.get('branch'));
    if (!service || !branch) return;
    const text = [
      ar ? 'طلب حجز من موقع SF Touch' : 'SF Touch website appointment request',
      `${ar ? 'الاسم' : 'Name'}: ${name}`,
      `${ar ? 'الموبايل' : 'Phone'}: ${normalized}`,
      `${ar ? 'الخدمة' : 'Service'}: ${service[ar ? 1 : 2]}`,
      `${ar ? 'الفرع' : 'Branch'}: ${branch[ar ? 1 : 2]}`,
      `${ar ? 'اليوم المفضل' : 'Preferred day'}: ${date}`,
      `${ar ? 'ملاحظات' : 'Notes'}: ${String(data.get('notes') ?? '').trim() || '—'}`,
      ar ? 'في انتظار تأكيد الموعد من فريق العيادة.' : 'Awaiting appointment confirmation from the clinic.',
    ].join('\n');
    const url = `https://wa.me/201503656589?text=${encodeURIComponent(text)}`;
    setWhatsappUrl(url);
    busy.current = true;
    setSending(true);
    let timer: number | undefined;
    try {
      const endpoint = import.meta.env.VITE_BOOKING_SCRIPT_URL?.trim();
      if (!endpoint || !/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/.test(endpoint)) {
        throw new Error('Booking endpoint not configured');
      }
      const payload = {
        name, phone: normalized, date, service: service[0], branch: branch[0],
        notes: String(data.get('notes') ?? '').trim(),
        website: String(data.get('website') ?? ''),
      };
      const fingerprint = JSON.stringify(payload);
      if (request.current.fingerprint !== fingerprint) {
        request.current = { fingerprint, id: crypto.randomUUID() };
      }
      const requestId = request.current.id;
      const controller = new AbortController();
      // A slow/unavailable sheet must not keep the visitor waiting indefinitely.
      timer = window.setTimeout(() => controller.abort(), 8000);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        credentials: 'omit',
        redirect: 'follow',
        body: JSON.stringify({ ...payload, requestId }),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true || result.requestId !== requestId) {
        throw new Error('Sheet save not confirmed');
      }
    } catch {
      // No customer-facing sheet errors or false claims that the request was saved.
      // No form data is logged. Keep the same request ID for an eventual retry.
      console.warn('[booking] Sheet save not confirmed; continuing to WhatsApp.');
    } finally {
      if (timer !== undefined) window.clearTimeout(timer);
      busy.current = false;
      setSending(false);
      // Always continue after the save attempt, even on network/config/server errors.
      try {
        window.location.assign(url);
      } catch {
        // Keep the visible WhatsApp link if navigation is blocked by the browser.
      }
    }
  };

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      id="booking" dir={ar ? 'rtl' : 'ltr'} className="scroll-mt-36 bg-[#f7efe6] px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="lg:pt-8">
          <CalendarDays className="mb-6 h-10 w-10 text-[#a97c3f]" />
          <p className="mb-3 text-sm font-semibold text-[#a97c3f]">SF TOUCH CLINIC</p>
          <h2 className="text-3xl font-bold leading-tight text-[#3d2f2a] sm:text-4xl">{ar ? 'خطوتك الأولى تبدأ من هنا' : 'Your first step starts here'}</h2>
          <p className="mt-5 leading-8 text-[#7a675d]">{ar ? 'اختار الخدمة والفرع واليوم المناسب ليك. هنفتح واتساب برسالة جاهزة ببياناتك؛ اضغط إرسال هناك وفريقنا هيأكد معاك الموعد.' : 'Choose your service, branch and preferred day. We will open a WhatsApp draft with your details. Press Send there and our team will confirm your appointment.'}</p>
          <p className="mt-6 font-medium text-[#3d2f2a]">{ar ? 'يوميًا من 1 ظهرًا لـ1 صباحًا' : 'Daily from 1 PM to 1 AM'}</p>
          <a href="tel:+201503656589" dir="ltr" className="mt-3 inline-block text-[#a97c3f] underline underline-offset-4">01503656589</a>
        </motion.div>
        <motion.form initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.08, ease: 'easeOut' }} noValidate onChange={(event) => {
          if (busy.current) return;
          setWhatsappUrl('');
          const field = event.target as HTMLInputElement;
          const errors = validateFields(new FormData(event.currentTarget), ar);
          setFieldErrors(previous => ({ ...previous, [field.name]: previous[field.name] ? (errors[field.name] || '') : '' }));
        }} onBlur={(event) => {
          if (busy.current) return;
          const field = event.target as HTMLInputElement;
          if (!['name', 'phone', 'service', 'branch', 'date', 'notes'].includes(field.name)) return;
          if (field.name === 'name') field.value = normalizeName(field.value);
          if (field.name === 'phone') field.value = normalizePhone(field.value);
          const errors = validateFields(new FormData(event.currentTarget), ar);
          setFieldErrors(previous => ({ ...previous, [field.name]: errors[field.name] || '' }));
        }} onSubmit={handleSubmit} className="min-w-0 rounded-3xl border border-[#c9a15a]/20 bg-white p-6 shadow-sm sm:p-9">
          <h3 className="mb-6 text-2xl font-bold text-[#3d2f2a]">{ar ? 'طلب حجز موعد' : 'Request an appointment'}</h3>
          <fieldset disabled={sending} className="grid min-w-0 gap-5 sm:grid-cols-2">
            <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
            <label className="text-sm font-medium text-[#3d2f2a]">{ar ? 'الاسم *' : 'Full name *'}<input name="name" aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? "booking-name-error" : undefined} autoComplete="name" required minLength={2} maxLength={100} className={`${fieldClass} ${fieldErrors.name ? "border-red-600 focus:border-red-600" : ""}`} />{fieldErrors.name && <span id="booking-name-error" role="alert" className="mt-2 block text-xs leading-5 text-red-700">{fieldErrors.name}</span>}</label>
            <label className="text-sm font-medium text-[#3d2f2a]">{ar ? 'رقم الموبايل *' : 'Mobile number *'}<input name="phone" aria-invalid={Boolean(fieldErrors.phone)} aria-describedby={fieldErrors.phone ? "booking-phone-error" : undefined} type="tel" inputMode="tel" placeholder="01012345678" autoComplete="tel" dir="ltr" required maxLength={25} className={`${fieldClass} ${fieldErrors.phone ? "border-red-600 focus:border-red-600" : ""}`} />{fieldErrors.phone && <span id="booking-phone-error" role="alert" className="mt-2 block text-xs leading-5 text-red-700">{fieldErrors.phone}</span>}</label>
            <label className="text-sm font-medium text-[#3d2f2a]">{ar ? 'الخدمة *' : 'Service *'}<select name="service" aria-invalid={Boolean(fieldErrors.service)} aria-describedby={fieldErrors.service ? "booking-service-error" : undefined} required defaultValue="" className={`${fieldClass} ${fieldErrors.service ? "border-red-600 focus:border-red-600" : ""}`}><option value="" disabled>{ar ? 'اختار الخدمة' : 'Choose a service'}</option>{services.map(([id, arabic, english]) => <option key={id} value={id}>{ar ? arabic : english}</option>)}</select>{fieldErrors.service && <span id="booking-service-error" role="alert" className="mt-2 block text-xs leading-5 text-red-700">{fieldErrors.service}</span>}</label>
            <label className="text-sm font-medium text-[#3d2f2a]">{ar ? 'الفرع *' : 'Branch *'}<select name="branch" aria-invalid={Boolean(fieldErrors.branch)} aria-describedby={fieldErrors.branch ? "booking-branch-error" : undefined} required defaultValue="" className={`${fieldClass} ${fieldErrors.branch ? "border-red-600 focus:border-red-600" : ""}`}><option value="" disabled>{ar ? 'اختار الفرع' : 'Choose a branch'}</option>{branches.map(([id, arabic, english]) => <option key={id} value={id}>{ar ? arabic : english}</option>)}</select>{fieldErrors.branch && <span id="booking-branch-error" role="alert" className="mt-2 block text-xs leading-5 text-red-700">{fieldErrors.branch}</span>}</label>
            <label className="text-sm font-medium text-[#3d2f2a] sm:col-span-2">{ar ? 'اليوم المفضل *' : 'Preferred day *'}<input name="date" aria-invalid={Boolean(fieldErrors.date)} aria-describedby={fieldErrors.date ? "booking-date-error" : undefined} type="date" required min={localToday()} className={`${fieldClass} ${fieldErrors.date ? "border-red-600 focus:border-red-600" : ""}`} />{fieldErrors.date && <span id="booking-date-error" role="alert" className="mt-2 block text-xs leading-5 text-red-700">{fieldErrors.date}</span>}</label>
            <label className="text-sm font-medium text-[#3d2f2a] sm:col-span-2">{ar ? 'ملاحظات (اختياري)' : 'Notes (optional)'}<textarea name="notes" aria-invalid={Boolean(fieldErrors.notes)} aria-describedby={fieldErrors.notes ? "booking-notes-error" : undefined} rows={3} maxLength={500} className={`${fieldClass} ${fieldErrors.notes ? "border-red-600 focus:border-red-600" : ""}`} />{fieldErrors.notes && <span id="booking-notes-error" role="alert" className="mt-2 block text-xs leading-5 text-red-700">{fieldErrors.notes}</span>}</label>
          </fieldset>
          {whatsappUrl && !sending && (
            <a href={whatsappUrl} className="mt-4 flex items-center justify-center gap-2 rounded-full border border-[#a97c3f] px-5 py-3 font-semibold text-[#3d2f2a] hover:bg-[#f7efe6]">
              <MessageCircle size={20} />
              {ar ? 'كمّل على واتساب' : 'Continue on WhatsApp'}
            </a>
          )}
          <p className="my-5 text-xs leading-6 text-[#7a675d]">{ar ? 'بالضغط على الزر، بتوافق نسجّل بيانات طلبك ونتواصل معاك بخصوص الحجز. بعد فتح واتساب، اضغط إرسال؛ الرسالة مش بتتبعت تلقائيًا.' : 'By continuing, you agree to have your request details saved and to be contacted about your booking. Press Send once WhatsApp opens; the message is not sent automatically.'}</p>
          <button type="submit" disabled={sending} aria-busy={sending} className="disabled:opacity-60 disabled:cursor-wait flex w-full items-center justify-center gap-2 rounded-full bg-[#3d2f2a] px-5 py-4 font-semibold text-white transition-colors hover:bg-[#a97c3f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a97c3f]"><MessageCircle size={20} />{sending ? (ar ? 'جاري فتح واتساب...' : 'Opening WhatsApp...') : (ar ? 'كمّل الحجز على واتساب' : 'Continue booking on WhatsApp')}</button>
        </motion.form>
      </div>
    </motion.section>
  );
}
