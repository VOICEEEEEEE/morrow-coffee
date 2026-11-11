import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Compass,
  Copy,
  Mail,
  MapPin,
  Minus,
  Navigation,
  Phone,
  Plus,
  Send,
} from 'lucide-react';
import { BRAND_INFO } from '../data/coffeeData';
import { UI_TEXT } from '../data/translations';
import { Lang } from '../types';

interface LocationSectionProps {
  lang: Lang;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ lang }) => {
  const todayDayIndex = new Date().getDay();
  const t = UI_TEXT[lang].location;

  const [mapMode, setMapMode] = useState<'studio' | 'live'>('studio');
  const [zoom, setZoom] = useState<number>(1);
  const [activeLandmark, setActiveLandmark] = useState<string>('cafe');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<string>(t.topics[0]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedDemo, setSubmittedDemo] = useState(false);

  useEffect(() => {
    setTopic(t.topics[0]);
    setErrors({});
  }, [lang, t.topics]);

  const selectedPin = t.landmarks.find((l) => l.id === activeLandmark) ?? t.landmarks[0];

  const handleCopy = (label: string, value: string) => {
    navigator.clipboard?.writeText(value).catch(() => undefined);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const validateField = (field: keyof FormErrors, val: string): string | undefined => {
    const trimmed = val.trim();
    if (field === 'name') {
      if (!trimmed) return t.errors.nameRequired;
      if (trimmed.length < 2) return t.errors.nameShort;
    }
    if (field === 'email') {
      if (!trimmed) return t.errors.emailRequired;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) return t.errors.emailInvalid;
    }
    if (field === 'message') {
      if (!trimmed) return t.errors.messageRequired;
      if (trimmed.length < 10) return t.errors.messageShort;
    }
    return undefined;
  };

  const handleBlur = (field: keyof FormErrors, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: FormErrors = {
      name: validateField('name', name),
      email: validateField('email', email),
      message: validateField('message', message),
    };
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });

    if (nextErrors.name || nextErrors.email || nextErrors.message) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedDemo(true);
    }, 500);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
    setErrors({});
    setTouched({});
    setSubmittedDemo(false);
  };

  return (
    <section
      id="location"
      className="bg-[#F5F1E9] text-[#29221E] py-20 sm:py-28 lg:py-36 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Eyebrow */}
        <div className="flex items-center justify-between border-b border-[#29221E]/12 pb-4 mb-12 lg:mb-16">
          <span className="text-[11px] uppercase tracking-[0.24em] text-[#73765C] font-medium">
            {t.eyebrow}
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#665B54] tabular-nums">
            {BRAND_INFO.coordinatesLabel}
          </span>
        </div>

        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          {/* Left Column: Address, Hours, Phone, Email, Directions CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-9 min-w-0"
          >
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.03] font-light tracking-[-0.015em] mb-4">
                {t.titleStart}{' '}
                <span className="italic font-normal text-[#B78358]">{t.titleItalic}</span>
              </h2>
              <p className="text-sm sm:text-[15px] text-[#5B5048] leading-relaxed">
                {t.subtitle}
              </p>
            </div>

            {/* Address & Direct Contacts */}
            <div className="space-y-4 border-t border-[#29221E]/12 pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B78358] mt-1 shrink-0" />
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-[#73765C] mb-1">
                      {t.addressLabel}
                    </span>
                    <p className="text-sm font-medium text-[#29221E]">
                      {BRAND_INFO.addressLine1[lang]}
                    </p>
                    <p className="text-sm text-[#5B5048]">{BRAND_INFO.addressLine2[lang]}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('address', BRAND_INFO.fullAddress[lang])}
                  className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[#665B54] hover:text-[#29221E] cursor-pointer shrink-0 pt-1"
                  aria-label="Copy street address"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedField === 'address' ? t.copied : t.copy}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <a
                  href={`tel:${BRAND_INFO.phoneDisplay[lang].replace(/[^+\d]/g, '')}`}
                  className="flex items-center gap-3 p-3.5 border border-[#29221E]/12 bg-[#FFFFFF]/55 hover:border-[#29221E]/35 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#73765C] shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-[9px] uppercase tracking-[0.2em] text-[#665B54]">
                      {t.phoneLabel}
                    </span>
                    <span className="block text-xs font-medium text-[#29221E] tabular-nums truncate">
                      {BRAND_INFO.phoneDisplay[lang]}
                    </span>
                  </div>
                </a>

                <a
                  href={`mailto:${BRAND_INFO.email}`}
                  className="flex items-center gap-3 p-3.5 border border-[#29221E]/12 bg-[#FFFFFF]/55 hover:border-[#29221E]/35 transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#73765C] shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-[9px] uppercase tracking-[0.2em] text-[#665B54]">
                      {t.emailLabel}
                    </span>
                    <span className="block text-xs font-medium text-[#29221E] truncate">
                      {BRAND_INFO.email}
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Hours by Day of Week */}
            <div className="border-t border-[#29221E]/12 pt-6">
              <span className="block text-[10px] uppercase tracking-[0.22em] text-[#73765C] font-medium mb-4">
                {t.hoursTitle}
              </span>
              <dl className="space-y-2.5 text-sm">
                {t.weekdays.map((row) => {
                  const isToday = row.dayIndex === todayDayIndex;
                  return (
                    <div
                      key={row.day}
                      className={`flex items-center justify-between py-1 border-b border-[#29221E]/8 last:border-b-0 ${
                        isToday ? 'text-[#29221E] font-medium' : 'text-[#5B5048]'
                      }`}
                    >
                      <dt className="flex items-center gap-2">
                        <span>{row.day}</span>
                        {isToday && (
                          <span className="text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 bg-[#73765C] text-white">
                            {t.today}
                          </span>
                        )}
                      </dt>
                      <dd className="tabular-nums">{row.hours}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>

            <div>
              <a
                href={BRAND_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-7 py-4 bg-[#29221E] text-[#F5F1E9] text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:bg-[#B78358] hover:text-white cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 stroke-[1.6]" />
                <span>{t.directions}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Interactive Architectural Map Container */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 min-w-0 w-full"
          >
            <div className="border border-[#29221E]/15 bg-[#EBE4D6] overflow-hidden w-full max-w-full">
              {/* Map Control Header */}
              <div className="px-5 py-3.5 bg-[#F5F1E9] border-b border-[#29221E]/12 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#B78358]" />
                  <span className="text-[11px] uppercase tracking-[0.18em] font-medium text-[#29221E]">
                    {t.mapTitle}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setMapMode('studio')}
                    className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] cursor-pointer transition-colors ${
                      mapMode === 'studio'
                        ? 'bg-[#29221E] text-[#F5F1E9]'
                        : 'text-[#5B5048] hover:text-[#29221E]'
                    }`}
                  >
                    {t.mapStudio}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapMode('live')}
                    className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] cursor-pointer transition-colors ${
                      mapMode === 'live'
                        ? 'bg-[#29221E] text-[#F5F1E9]'
                        : 'text-[#5B5048] hover:text-[#29221E]'
                    }`}
                  >
                    {t.mapLive}
                  </button>
                </div>
              </div>

              {/* Map Viewport */}
              {mapMode === 'studio' ? (
                <div className="relative h-[380px] sm:h-[460px] w-full max-w-full overflow-hidden select-none bg-[#E6DEC9]">
                  <div
                    style={{ transform: `scale(${zoom})` }}
                    className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out origin-center"
                  >
                    <svg
                      viewBox="0 0 800 520"
                      preserveAspectRatio="xMidYMid slice"
                      className="block w-full h-full max-w-full"
                      aria-label={t.mapTitle}
                    >
                      <rect width="800" height="520" fill="#EAE3D4" />

                      <g fill="#F5F1E9" stroke="#D5CCB9" strokeWidth="1.2">
                        <rect x="40" y="36" width="170" height="110" />
                        <rect x="245" y="36" width="215" height="110" />
                        <rect x="495" y="36" width="265" height="110" />

                        <rect x="40" y="180" width="170" height="145" />
                        <rect x="245" y="180" width="215" height="145" />
                        <rect x="495" y="180" width="120" height="145" />
                        <rect x="645" y="180" width="115" height="145" fill="#DCE0D0" />

                        <rect x="40" y="360" width="170" height="125" />
                        <rect x="245" y="360" width="215" height="125" />
                        <rect x="495" y="360" width="265" height="125" />
                      </g>

                      <g fill="none" stroke="#FFFFFF" strokeLinecap="square">
                        <line x1="0" y1="163" x2="800" y2="163" strokeWidth="16" />
                        <line x1="0" y1="342" x2="800" y2="342" strokeWidth="18" />
                        <line x1="228" y1="0" x2="228" y2="520" strokeWidth="16" />
                        <line x1="478" y1="0" x2="478" y2="520" strokeWidth="18" />
                      </g>

                      <line
                        x1="228"
                        y1="0"
                        x2="228"
                        y2="520"
                        stroke="#73765C"
                        strokeWidth="1.5"
                        strokeDasharray="6 6"
                      />

                      <path
                        d="M775 0 C760 170 790 340 770 520"
                        stroke="#CFD5CA"
                        strokeWidth="18"
                        fill="none"
                      />

                      <g
                        fill="#7D7268"
                        fontSize="10"
                        fontFamily="Manrope, sans-serif"
                        letterSpacing="2.2"
                      >
                        <text x="275" y="166">{t.mapStreets.main}</text>
                        <text x="530" y="346">{t.mapStreets.cross}</text>
                        <text x="234" y="120" transform="rotate(-90 234 120)">
                          {t.mapStreets.avenue}
                        </text>
                        <text x="484" y="305" transform="rotate(-90 484 305)">
                          {t.mapStreets.walk}
                        </text>
                        <text x="664" y="255" fill="#5D6149" fontSize="9">
                          {t.mapStreets.park}
                        </text>
                      </g>
                    </svg>

                    {t.landmarks.map((pin) => {
                      const isSelected = activeLandmark === pin.id;
                      return (
                        <button
                          key={pin.id}
                          type="button"
                          onClick={() => setActiveLandmark(pin.id)}
                          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                          aria-label={pin.label}
                          className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#B78358]"
                        >
                          {pin.isPrimary ? (
                            <div className="relative flex flex-col items-center">
                              <span
                                className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold shadow-sm transition-transform duration-300 ${
                                  isSelected
                                    ? 'bg-[#29221E] text-[#F5F1E9] scale-105'
                                    : 'bg-[#29221E]/90 text-[#F5F1E9]'
                                }`}
                              >
                                MORROW
                              </span>
                              <span className="w-3.5 h-3.5 -mt-1 rotate-45 bg-[#29221E]" />
                              <span className="mt-1.5 w-3 h-3 rounded-full bg-[#B78358] ring-4 ring-[#B78358]/30" />
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <span
                                className={`w-3.5 h-3.5 rounded-full border-2 border-[#F5F1E9] transition-transform ${
                                  isSelected
                                    ? 'bg-[#73765C] scale-125'
                                    : 'bg-[#29221E]/75 group-hover:scale-110'
                                }`}
                              />
                              <span className="mt-1 px-2 py-0.5 bg-[#F5F1E9]/95 border border-[#29221E]/15 text-[9px] uppercase tracking-[0.12em] text-[#29221E] max-w-[115px] sm:max-w-none truncate">
                                {pin.label}
                              </span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Map Zoom Controls */}
                  <div className="absolute top-4 right-4 flex flex-col border border-[#29221E]/18 bg-[#F5F1E9]/95">
                    <button
                      type="button"
                      onClick={() => setZoom((z) => Math.min(1.45, Number((z + 0.15).toFixed(2))))}
                      aria-label="Zoom in map"
                      className="p-2.5 hover:bg-[#29221E] hover:text-[#F5F1E9] transition-colors border-b border-[#29221E]/12 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoom((z) => Math.max(0.85, Number((z - 0.15).toFixed(2))))}
                      aria-label="Zoom out map"
                      className="p-2.5 hover:bg-[#29221E] hover:text-[#F5F1E9] transition-colors border-b border-[#29221E]/12 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setZoom(1);
                        setActiveLandmark('cafe');
                      }}
                      aria-label="Center map"
                      className="p-2 text-[9px] uppercase tracking-[0.1em] font-medium hover:bg-[#29221E] hover:text-[#F5F1E9] transition-colors cursor-pointer"
                    >
                      {t.pinBtn}
                    </button>
                  </div>

                  {/* Selected Marker Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:min-w-[290px] bg-[#F5F1E9]/95 backdrop-blur-xs border border-[#29221E]/15 p-4">
                    <span className="block text-[9px] uppercase tracking-[0.22em] text-[#73765C] font-medium mb-1">
                      {t.selectedPin}
                    </span>
                    <p className="font-serif text-lg text-[#29221E] leading-tight">
                      {selectedPin.label}
                    </p>
                    <p className="text-xs text-[#5B5048] mt-1">{selectedPin.detail}</p>
                  </div>
                </div>
              ) : (
                <div className="h-[380px] sm:h-[460px] bg-[#EBE4D6]">
                  <iframe
                    title="MORROW COFFEE Map Embed"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-122.6815%2C45.5162%2C-122.6675%2C45.5242&layer=mapnik&marker=45.5202%2C-122.6742"
                    className="w-full h-full border-0 grayscale-[35%] contrast-[95%]"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Contact & Table / Tasting Inquiry Form */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="border-t border-[#29221E]/14 pt-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5 min-w-0">
              <span className="text-[11px] uppercase tracking-[0.24em] text-[#73765C] font-medium block mb-3">
                {t.formEyebrow}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#29221E] leading-tight mb-4">
                {t.formTitleStart}{' '}
                <span className="italic text-[#B78358] font-normal">{t.formTitleItalic}</span>
              </h3>
              <p className="text-sm text-[#5B5048] leading-relaxed mb-6">{t.formDesc}</p>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#665B54] border-l-2 border-[#B78358] pl-3">
                {t.formDemoNote}
              </p>
            </div>

            <div className="lg:col-span-7 min-w-0 bg-[#FFFFFF]/70 border border-[#29221E]/12 p-6 sm:p-10">
              {submittedDemo ? (
                <div className="py-6 space-y-4">
                  <div className="flex items-center gap-3 text-[#73765C]">
                    <CheckCircle2 className="w-6 h-6 stroke-[1.6]" />
                    <span className="text-xs uppercase tracking-[0.2em] font-medium">
                      {t.submittedTitle}
                    </span>
                  </div>
                  <h4 className="font-serif text-3xl text-[#29221E]">
                    {t.submittedGreeting}, {name.trim()}.
                  </h4>
                  <p className="text-sm text-[#5B5048] leading-relaxed">
                    {t.submittedBody
                      .replace('{topic}', topic)
                      .replace('{email}', BRAND_INFO.email)}
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-2 px-6 py-3 border border-[#29221E] text-[11px] uppercase tracking-[0.18em] font-medium hover:bg-[#29221E] hover:text-[#F5F1E9] transition-colors cursor-pointer"
                  >
                    {t.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-[10px] uppercase tracking-[0.2em] text-[#5B5048] font-medium mb-2"
                      >
                        {t.labelName}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (touched.name) {
                            setErrors((prev) => ({
                              ...prev,
                              name: validateField('name', e.target.value),
                            }));
                          }
                        }}
                        onBlur={(e) => handleBlur('name', e.target.value)}
                        placeholder={t.placeholderName}
                        aria-invalid={Boolean(errors.name)}
                        className={`w-full px-4 py-3 bg-[#F5F1E9]/65 border text-sm text-[#29221E] placeholder:text-[#665B54]/50 focus:outline-none focus:border-[#29221E] transition-colors ${
                          errors.name ? 'border-[#9B3B3B]' : 'border-[#29221E]/18'
                        }`}
                      />
                      {errors.name && (
                        <p role="alert" className="mt-1.5 text-xs text-[#9B3B3B]">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-[10px] uppercase tracking-[0.2em] text-[#5B5048] font-medium mb-2"
                      >
                        {t.labelEmail}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (touched.email) {
                            setErrors((prev) => ({
                              ...prev,
                              email: validateField('email', e.target.value),
                            }));
                          }
                        }}
                        onBlur={(e) => handleBlur('email', e.target.value)}
                        placeholder={t.placeholderEmail}
                        aria-invalid={Boolean(errors.email)}
                        className={`w-full px-4 py-3 bg-[#F5F1E9]/65 border text-sm text-[#29221E] placeholder:text-[#665B54]/50 focus:outline-none focus:border-[#29221E] transition-colors ${
                          errors.email ? 'border-[#9B3B3B]' : 'border-[#29221E]/18'
                        }`}
                      />
                      {errors.email && (
                        <p role="alert" className="mt-1.5 text-xs text-[#9B3B3B]">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-topic"
                      className="block text-[10px] uppercase tracking-[0.2em] text-[#5B5048] font-medium mb-2"
                    >
                      {t.labelTopic}
                    </label>
                    <select
                      id="contact-topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-4 py-3 bg-[#F5F1E9]/65 border border-[#29221E]/18 text-sm text-[#29221E] focus:outline-none focus:border-[#29221E]"
                    >
                      {t.topics.map((itemTopic) => (
                        <option key={itemTopic} value={itemTopic}>
                          {itemTopic}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-[10px] uppercase tracking-[0.2em] text-[#5B5048] font-medium mb-2"
                    >
                      {t.labelMessage}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (touched.message) {
                          setErrors((prev) => ({
                            ...prev,
                            message: validateField('message', e.target.value),
                          }));
                        }
                      }}
                      onBlur={(e) => handleBlur('message', e.target.value)}
                      placeholder={t.placeholderMessage}
                      aria-invalid={Boolean(errors.message)}
                      className={`w-full px-4 py-3 bg-[#F5F1E9]/65 border text-sm text-[#29221E] placeholder:text-[#665B54]/50 focus:outline-none focus:border-[#29221E] resize-y transition-colors ${
                        errors.message ? 'border-[#9B3B3B]' : 'border-[#29221E]/18'
                      }`}
                    />
                    {errors.message && (
                      <p role="alert" className="mt-1.5 text-xs text-[#9B3B3B]">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <span className="text-[11px] text-[#665B54]">{t.requiredNote}</span>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#29221E] text-[#F5F1E9] text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 hover:bg-[#B78358] hover:text-white disabled:opacity-50 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 stroke-[1.6]" />
                      <span>{isSubmitting ? t.submitting : t.submit}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
