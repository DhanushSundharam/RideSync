import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Car, MapPin, Clock, ArrowRight, ChevronDown,
  Shield, Star, Phone, CheckCircle, Smile, Navigation, MessageCircle
} from 'lucide-react';
import './Landing.css';

// ── Change this to your WhatsApp number ──
const WA_NUMBER = '919876543210'; // +91 98765 43210
const WA_MESSAGE = encodeURIComponent('Hi! I want to book a driver through RideSync.');
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;
const WA_QR = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(WA_LINK)}&color=6d28d9&bgcolor=ffffff&margin=12`;

const T = {
  en: {
    langBtn: 'தமிழ்',
    chip: 'Trusted by families & professionals',
    heroTitle1: 'Your Car.',
    heroTitle2: 'Our Expert Drivers.',
    heroSub: 'Tired of driving? Hire a professional driver to drive your own car — so you can relax, work, or enjoy the journey.',
    heroCta1: 'Book a Driver',
    heroCta2: 'How it works',
    cardName: 'Rahul M. — Driver Booked',
    cardMeta: 'BMW 5 Series · 4 hrs · ₹800',
    cardEta: 'Driver arriving in',
    cardEtaMin: '3 min',

    whoTitle: 'Who is this for?',
    whoSub: 'RideSync is perfect for anyone who owns a car but doesn\'t want to drive right now.',
    whoCards: [
      { icon: '🍻', title: 'Night Out?', desc: 'Going to a party or wedding? Hire a driver, enjoy your evening, and get home safely in your own car.' },
      { icon: '💼', title: 'Business Travel', desc: 'Have an important meeting? Let a professional drive while you prepare, make calls, or rest.' },
      { icon: '👨‍👩‍👧', title: 'Family Trips', desc: 'Long drives are exhausting. Hire a driver for family outings and enjoy the trip with your family.' },
      { icon: '🏥', title: 'Medical Need', desc: 'Not feeling well or just had a procedure? Get driven home safely without calling a cab.' },
    ],

    howTag: 'How It Works',
    howTitle: 'Book a driver in 3 simple steps.',
    steps: [
      { icon: <MapPin size={28}/>, title: 'Set Your Location', desc: 'Tell us where your car is parked. The driver will come to you.' },
      { icon: <Clock size={28}/>, title: 'Choose Duration', desc: 'Need a driver for 2 hours or all day? Pick what works for you.' },
      { icon: <Car size={28}/>, title: 'Driver Arrives', desc: 'A verified, rated driver arrives at your car and drives you wherever you need to go.' },
    ],

    whyTitle: 'Why customers love RideSync',
    whyCards: [
      { icon: <Shield size={24}/>, title: 'Verified & Safe', desc: 'Every driver is background-checked, licensed, and reviewed by real customers before joining.' },
      { icon: <Star size={24}/>, title: 'Rated by Real Users', desc: 'Read honest reviews from other customers. You choose the driver you trust.' },
      { icon: <Car size={24}/>, title: 'Your Own Car', desc: 'No stranger\'s car. You travel in the comfort and safety of your own vehicle.' },
      { icon: <Phone size={24}/>, title: 'Easy Booking', desc: 'Book a driver in under a minute. See their location on the map in real time.' },
      { icon: <Navigation size={24}/>, title: 'Track Live', desc: 'Watch your driver approach on the live map. Know exactly when they arrive.' },
      { icon: <Smile size={24}/>, title: 'Stress-Free Rides', desc: 'Sit back and relax. Let someone else handle the traffic, parking, and directions.' },
    ],

    ctaTitle: 'Ready to try it?',
    ctaSub: 'Search for a driver near you right now — it only takes a minute.',
    ctaBtn: 'Find a Driver Near Me',

    footer: '© 2025 RideSync. Your car. Our drivers. Your comfort.',
  },
  ta: {
    langBtn: 'English',
    chip: 'குடும்பங்கள் மற்றும் தொழில்முறையினர் நம்பும் சேவை',
    heroTitle1: 'உங்கள் கார்.',
    heroTitle2: 'எங்கள் சிறந்த ஓட்டுனர்கள்.',
    heroSub: 'ஓட்டுவதில் சோர்வாக இருக்கிறீர்களா? உங்கள் சொந்த காரை ஓட்ட ஒரு தொழில்முறை ஓட்டுனரை அமர்த்துங்கள் — நீங்கள் ஓய்வெடுக்கலாம், வேலை செய்யலாம் அல்லது பயணத்தை ரசிக்கலாம்.',
    heroCta1: 'ஓட்டுனரை பதிவு செய்',
    heroCta2: 'எப்படி செயல்படுகிறது',
    cardName: 'ராகுல் மி. — ஓட்டுனர் பதிவு',
    cardMeta: 'BMW 5 Series · 4 மணி · ₹800',
    cardEta: 'ஓட்டுனர் வருகிறார்',
    cardEtaMin: '3 நிமிடம்',

    whoTitle: 'யாருக்கு இது பயன்படும்?',
    whoSub: 'சொந்த கார் இருக்கிறது, ஆனால் இப்போது ஓட்ட விரும்பவில்லையா? RideSync உங்களுக்கானது.',
    whoCards: [
      { icon: '🍻', title: 'விழா / பார்ட்டி?', desc: 'திருமணம் அல்லது விழாவுக்கு செல்கிறீர்களா? ஓட்டுனரை அமர்த்துங்கள், மகிழ்ச்சியாக திரும்புங்கள்.' },
      { icon: '💼', title: 'வணிக பயணம்', desc: 'முக்கியமான கூட்டம் உள்ளதா? தொழில்முறை ஓட்டுனர் ஓட்ட, நீங்கள் தயாரிக்கலாம்.' },
      { icon: '👨‍👩‍👧', title: 'குடும்ப பயணம்', desc: 'நீண்ட தூரம் ஓட்டுவது களைப்பாக இருக்கும். குடும்பத்துடன் பயணத்தை ரசியுங்கள்.' },
      { icon: '🏥', title: 'மருத்துவ தேவை', desc: 'உடல் நலம் சரியில்லையா? பாதுகாப்பாக வீடு திரும்புங்கள்.' },
    ],

    howTag: 'எப்படி செயல்படுகிறது',
    howTitle: '3 எளிய படிகளில் ஓட்டுனரை பதிவு செய்யுங்கள்.',
    steps: [
      { icon: <MapPin size={28}/>, title: 'இடத்தை குறிக்கவும்', desc: 'உங்கள் கார் இருக்கும் இடத்தை தெரிவியுங்கள். ஓட்டுனர் உங்களிடம் வருவார்.' },
      { icon: <Clock size={28}/>, title: 'நேரத்தை தேர்வு செய்யுங்கள்', desc: '2 மணி நேரமா அல்லது முழு நாளா? உங்களுக்கு ஏற்றதை தேர்வு செய்யுங்கள்.' },
      { icon: <Car size={28}/>, title: 'ஓட்டுனர் வருகிறார்', desc: 'சரிபார்க்கப்பட்ட, மதிப்பிடப்பட்ட ஓட்டுனர் உங்கள் காரில் வந்து ஓட்டுவார்.' },
    ],

    whyTitle: 'வாடிக்கையாளர்கள் RideSync ஐ ஏன் விரும்புகிறார்கள்',
    whyCards: [
      { icon: <Shield size={24}/>, title: 'சரிபார்க்கப்பட்ட & பாதுகாப்பான', desc: 'ஒவ்வொரு ஓட்டுனரும் பின்னணி சரிபார்ப்பு மற்றும் உரிமம் பெற்றவர்.' },
      { icon: <Star size={24}/>, title: 'உண்மையான மதிப்பீடுகள்', desc: 'மற்ற வாடிக்கையாளர்களின் உண்மையான மதிப்புரைகளை படியுங்கள்.' },
      { icon: <Car size={24}/>, title: 'உங்கள் சொந்த கார்', desc: 'அந்நியரின் கார் இல்லை. உங்கள் சொந்த வாகனத்தில் பயணியுங்கள்.' },
      { icon: <Phone size={24}/>, title: 'எளிதான பதிவு', desc: 'ஒரு நிமிடத்தில் ஓட்டுனரை பதிவு செய்யுங்கள். நேரலை வரைபடத்தில் பாருங்கள்.' },
      { icon: <Navigation size={24}/>, title: 'நேரலை கண்காணிப்பு', desc: 'ஓட்டுனர் எங்கே இருக்கிறார் என்று வரைபடத்தில் பாருங்கள்.' },
      { icon: <Smile size={24}/>, title: 'மன அமைதி', desc: 'போக்குவரத்து, நிறுத்துமிடம் எல்லாம் அவர்கள் பார்த்துக்கொள்வார்கள்.' },
    ],

    ctaTitle: 'இப்போதே முயற்சிக்கவும்?',
    ctaSub: 'உங்களுக்கு அருகில் ஓட்டுனரை தேடுங்கள் — ஒரு நிமிடம் மட்டுமே ஆகும்.',
    ctaBtn: 'அருகில் ஓட்டுனரை தேடு',

    footer: '© 2025 ரைட்சிங்க். உங்கள் கார். எங்கள் ஓட்டுனர். உங்கள் ஓய்வு.',
  },
};

const Landing = () => {
  const [lang, setLang] = useState('en');
  const [activeStep, setActiveStep] = useState(0);
  const t = T[lang];

  return (
    <div className="landing-page">

      {/* Language Toggle */}
      <button className="lang-toggle-btn" onClick={() => setLang(l => l === 'en' ? 'ta' : 'en')}>
        🌐 {t.langBtn}
      </button>

      {/* ── HERO ────────────────────── */}
      <section className="lp-hero">
        <div className="lp-blob lp-blob-1" />
        <div className="lp-blob lp-blob-2" />
        <div className="lp-blob lp-blob-3" />

        <div className="lp-hero-inner">
          <div className="lp-chip">
            <span className="lp-chip-dot" />
            {t.chip}
          </div>

          <h1 className="lp-hero-title">
            {t.heroTitle1}<br />
            <span className="lp-gradient-text">{t.heroTitle2}</span>
          </h1>

          <p className="lp-hero-sub">{t.heroSub}</p>

          <div className="lp-hero-cta">
            <Link to="/login" className="lp-btn-primary">
              {t.heroCta1} <ArrowRight size={18} />
            </Link>
            <a href="#how" className="lp-btn-ghost">
              {t.heroCta2} <ChevronDown size={18} />
            </a>
          </div>

          {/* Floating booking card */}
          <div className="lp-hero-card">
            <div className="lp-hero-card-row">
              <div className="lp-avatar">R</div>
              <div>
                <p className="lp-card-name">{t.cardName}</p>
                <p className="lp-card-meta">{t.cardMeta}</p>
              </div>
              <div className="lp-card-badge">
                <Star size={12} fill="#f59e0b" color="#f59e0b" /> 4.9
              </div>
            </div>
            <div className="lp-card-track">
              <div className="lp-track-dot active" />
              <div className="lp-track-line" />
              <div className="lp-track-dot" />
            </div>
            <p className="lp-card-eta">{t.cardEta} <strong>{t.cardEtaMin}</strong></p>
          </div>
        </div>
      </section>

      {/* ── WHO IS THIS FOR ─────────── */}
      <section className="lp-who">
        <div className="lp-who-inner">
          <div className="lp-section-tag" style={{textAlign:'center', display:'block'}}>{t.whoTitle}</div>
          <h2 className="lp-section-title">{t.whoSub}</h2>
          <div className="lp-who-grid">
            {t.whoCards.map((c, i) => (
              <div key={i} className="lp-who-card">
                <div className="lp-who-emoji">{c.icon}</div>
                <h3 className="lp-who-title">{c.title}</h3>
                <p className="lp-who-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────── */}
      <section id="how" className="lp-how">
        <div className="lp-section-tag">{t.howTag}</div>
        <h2 className="lp-section-title">{t.howTitle}</h2>

        <div className="lp-steps lp-steps-3">
          {t.steps.map((s, i) => (
            <div
              key={i}
              className={`lp-step ${activeStep === i ? 'lp-step-active' : ''}`}
              onMouseEnter={() => setActiveStep(i)}
            >
              <div className="lp-step-num">0{i + 1}</div>
              <div className="lp-step-icon">{s.icon}</div>
              <h3 className="lp-step-title">{s.title}</h3>
              <p className="lp-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY CUSTOMERS LOVE IT ───── */}
      <section className="lp-why">
        <div className="lp-why-inner">
          <div className="lp-section-tag light" style={{textAlign:'center', display:'block'}}>{t.whyTitle}</div>
          <div className="lp-why-grid">
            {t.whyCards.map((c, i) => (
              <div key={i} className="lp-why-card">
                <div className="lp-why-icon">{c.icon}</div>
                <h4 className="lp-why-title">{c.title}</h4>
                <p className="lp-why-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────── */}
      <section className="lp-cta">
        <div className="lp-cta-glow" />
        <div className="lp-cta-check-row">
          {['No subscription needed', 'Book in under 1 minute', 'Cancel anytime'].map((t2, i) => (
            <span key={i} className="lp-cta-check"><CheckCircle size={16}/> {t2}</span>
          ))}
        </div>
        <h2 className="lp-cta-title">{t.ctaTitle}</h2>
        <p className="lp-cta-sub">{t.ctaSub}</p>
        <Link to="/login" className="lp-btn-primary lp-btn-large">
          {t.ctaBtn} <ArrowRight size={20} />
        </Link>
      </section>

      {/* ── FOOTER ──────────────────────────────── */}
      <footer className="lp-footer">
        {/* WhatsApp QR block */}
        <div className="lp-footer-wa">
          <div className="lp-wa-qr-wrap">
            <img src={WA_QR} alt="WhatsApp QR Code" className="lp-wa-qr" />
          </div>
          <div className="lp-wa-info">
            <div className="lp-wa-badge">
              <svg viewBox="0 0 24 24" fill="#25d366" width="20" height="20">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </div>
            <h4 className="lp-wa-title">Have a question? Let's chat!</h4>
            <p className="lp-wa-desc">Scan the QR code or click the button to reach us instantly on WhatsApp.</p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="lp-wa-btn">
              Open WhatsApp → +91 98765 43210
            </a>
          </div>
        </div>

        <div className="lp-footer-divider" />
        <div className="lp-footer-brand">
          <Car size={22} color="#a78bfa" />
          <span>{lang === 'en' ? 'RideSync' : 'ரைட்சிங்க்'}</span>
        </div>
        <p className="lp-footer-copy">{t.footer}</p>
      </footer>

      {/* ── UNIQUE WHATSAPP CHAT WIDGET ─── */}
      <div className="wa-widget">
        <div className="wa-widget-card">
          <div className="wa-widget-header">
            <div className="wa-agent-avatar">P</div>
            <div>
              <p className="wa-agent-name">Priya — RideSync Support</p>
              <p className="wa-agent-status"><span className="wa-online-dot"/>Online now</p>
            </div>
          </div>
          <div className="wa-bubble">
            👋 Hi! Need help booking a driver?<br/>
            <span>I'll reply in under 2 minutes!</span>
          </div>
          <div className="wa-typing">
            <span/><span/><span/>
          </div>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="wa-open-btn">
            <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        {/* Trigger bubble */}
        <div className="wa-trigger">
          <svg viewBox="0 0 24 24" fill="white" width="26" height="26">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="wa-trigger-ping"/>
        </div>
      </div>
    </div>
  );
};

export default Landing;
