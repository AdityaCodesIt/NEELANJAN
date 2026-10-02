"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import {
  Video,
  MessageCircle,
  Phone,
  BookOpen,
  Clock,
  Sparkles,
  Moon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { FadeIn } from "@/app/components/FadeIn";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const { language } = useLanguage();
  const [currentDate, setCurrentDate] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isHoroscopeHovered, setIsHoroscopeHovered] = useState(false);

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 2; // Loop from 0:02
      videoRef.current.play().catch((e) => console.log("Loop play prevented:", e));
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      const scrollAmount = 344; // scroll width of one card + gap
      let target = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

      if (direction === 'right' && scrollLeft + clientWidth >= scrollWidth - 20) {
        target = 0;
      } else if (direction === 'left' && scrollLeft <= 10) {
        target = scrollWidth - clientWidth;
      }

      scrollRef.current.scrollTo({
        left: target,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (isHoroscopeHovered) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 344, behavior: 'smooth' });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isHoroscopeHovered]);

  useEffect(() => {
    // Attempt to ensure video plays on load (some browsers block initial autoplay)
    if (videoRef.current) {
      videoRef.current.play().catch((e) => console.log("Autoplay prevented:", e));
    }
    
    // Set formatted date for the horoscope section on client side
    const date = new Date();
    setCurrentDate(date.toLocaleDateString(language === 'en' ? 'en-US' : 'hi-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
  }, [language]);

  const dict = {
    en: {
      subtitle: "Vedic astrology, in the Parashara tradition",
      h1_1: "Read with patience.",
      h1_2: "Guided by tradition.",
      hero_desc: "Kundli analysis and muhurat guidance from a practitioner trained in the classical Parashara lineage. Consult by video or WhatsApp from anywhere.",
      book_cta: "Book a consultation",
      how_it_works: "See how a reading works",
      consult_anywhere: "Consult from anywhere",
      video_call: "Video call",
      whatsapp: "WhatsApp",
      phone_call: "Phone call",
      years_practice: "Years in practice",
      readings_given: "Readings given",
      traditions: "Traditions studied",
      rooted_title: "Rooted in tradition. Read with care.",
      classical_title: "Classical training",
      classical_desc: "Trained in the CVA program, studying under Roeland de Loof. Strictly following ancient principles.",
      patient_title: "Patient reading",
      patient_desc: "The chart is read fully before anything is said about the future. Rushed readings yield poor results.",
      clear_title: "Clear guidance",
      clear_desc: "Plain answers to the questions that brought you here, not vague generalities or fear-mongering.",
      
      // Horoscope Section EN
      horoscope_title: "Daily Horoscope",
      horoscope_subtitle: "Vedic moon sign insights for today",
      horoscope_signs: [
        { name: "Aries (Mesha)", forecast: "A good day for initiating new projects. Energy levels remain high." },
        { name: "Taurus (Vrishabha)", forecast: "Financial stability is highlighted today. Avoid impulsive purchases." },
        { name: "Gemini (Mithuna)", forecast: "Communication flows smoothly. Good time to resolve old conflicts." },
        { name: "Cancer (Karka)", forecast: "Focus on domestic peace and emotional well-being today." },
        { name: "Leo (Simha)", forecast: "Leadership opportunities may arise at work. Step up with confidence." },
        { name: "Virgo (Kanya)", forecast: "Attention to detail brings rewards. Health routines show positive results." },
        { name: "Libra (Tula)", forecast: "Partnerships are favored. A balanced approach resolves a tricky situation." },
        { name: "Scorpio (Vrishchika)", forecast: "Intuition is strong today. Trust your gut feelings regarding investments." },
        { name: "Sagittarius (Dhanu)", forecast: "Travel or learning something new brings joy and expands your horizons." },
        { name: "Capricorn (Makara)", forecast: "Hard work starts paying off. Stay disciplined in your professional goals." },
        { name: "Aquarius (Kumbha)", forecast: "Social connections bring unexpected benefits. Networking is highly favored." },
        { name: "Pisces (Meena)", forecast: "Take time for spiritual or creative pursuits to recharge your mental energy." },
      ],

      ways_title: "Ways to consult",
      view_all: "View all services",
      services: [
        {
          title: "Vedic Astrology Consultation",
          desc: "A comprehensive reading of your birth chart covering all major life areas.",
          fee: "₹5,000",
        },
        {
          title: "Kundli Analysis",
          desc: "In-depth chart analysis focusing on specific questions or current dasha.",
          fee: "₹3,500",
        },
        {
          title: "Muhurat Guidance",
          desc: "Finding the most auspicious date and time for important life events.",
          fee: "₹2,000",
        },
      ],
      book_service: "Book",
      testimonials_title: "What clients say",
      t1_quote: `"The reading was incredibly grounding. Neelanjan didn't just give predictions, but explained the planetary cycles in a way that brought clarity and peace to my current situation."`,
      t1_author: "— A. Sharma",
      t1_loc: "New Delhi",
      t2_quote: `"I appreciated the patient and thorough approach. He took time to understand my concerns before looking at the chart. The guidance was practical and clear, devoid of unnecessary fear."`,
      t2_author: "— M. Patel",
      t2_loc: "Mumbai",
      vichar_title: "From Vichar",
      vichar_subtitle: "Notes on the practice of Vedic astrology",
      articles: [
        { title: "Understanding the role of Saturn in a night birth", time: "4 min read", slug: "saturn-night-birth" },
        { title: "Why patience is the astrologer's most vital tool", time: "3 min read", slug: "patience-vital-tool" },
        { title: "Navigating difficult Dashas with practical remedies", time: "6 min read", slug: "navigating-dashas" },
      ],
      ready_talk: "Ready to talk?",
      msg_whatsapp: "Message on WhatsApp",
    },
    hi: {
      subtitle: "पाराशर परंपरा में वैदिक ज्योतिष",
      h1_1: "धैर्य के साथ पठन।",
      h1_2: "परंपरा द्वारा निर्देशित।",
      hero_desc: "शास्त्रीय पाराशर वंश में प्रशिक्षित अभ्यासी से कुंडली विश्लेषण और मुहूर्त मार्गदर्शन। कहीं से भी वीडियो या व्हाट्सएप द्वारा परामर्श लें।",
      book_cta: "परामर्श बुक करें",
      how_it_works: "देखें कि पठन कैसे काम करता है",
      consult_anywhere: "कहीं से भी परामर्श लें",
      video_call: "वीडियो कॉल",
      whatsapp: "व्हाट्सएप",
      phone_call: "फोन कॉल",
      years_practice: "वर्षों का अभ्यास",
      readings_given: "परामर्श दिए गए",
      traditions: "अध्ययन की गई परंपराएं",
      rooted_title: "परंपरा में निहित। सावधानी से पठन।",
      classical_title: "शास्त्रीय प्रशिक्षण",
      classical_desc: "रोलैंड डी लूफ के तहत सीवीए (CVA) कार्यक्रम में प्रशिक्षित। प्राचीन सिद्धांतों का कड़ाई से पालन।",
      patient_title: "धैर्यपूर्ण पठन",
      patient_desc: "भविष्य के बारे में कुछ भी कहने से पहले चार्ट को पूरी तरह से पढ़ा जाता है। जल्दबाजी में किए गए पठन के परिणाम खराब होते हैं।",
      clear_title: "स्पष्ट मार्गदर्शन",
      clear_desc: "उन सवालों के स्पष्ट उत्तर जो आपको यहाँ लाए हैं, न कि अस्पष्ट सामान्यीकरण या डर फैलाना।",
      
      // Horoscope Section HI
      horoscope_title: "दैनिक राशिफल",
      horoscope_subtitle: "आज के लिए आपकी चंद्र राशि पर आधारित अंतर्दृष्टि",
      horoscope_signs: [
        { name: "मेष", forecast: "नई परियोजनाएं शुरू करने के लिए अच्छा दिन है। ऊर्जा का स्तर ऊंचा रहेगा।" },
        { name: "वृषभ", forecast: "वित्तीय स्थिरता पर प्रकाश डाला गया है। आवेगी खरीदारी से बचें।" },
        { name: "मिथुन", forecast: "संचार सुचारू रूप से चलता है। पुराने विवादों को सुलझाने का अच्छा समय है।" },
        { name: "कर्क", forecast: "आज घरेलू शांति और भावनात्मक भलाई पर ध्यान दें।" },
        { name: "सिंह", forecast: "काम पर नेतृत्व के अवसर पैदा हो सकते हैं। आत्मविश्वास के साथ आगे बढ़ें।" },
        { name: "कन्या", forecast: "विस्तार पर ध्यान देने से पुरस्कार मिलता है। स्वास्थ्य दिनचर्या सकारात्मक परिणाम दिखाती है।" },
        { name: "तुला", forecast: "साझेदारी का पक्ष लिया जाता है। एक संतुलित दृष्टिकोण मुश्किल स्थिति को हल करता है।" },
        { name: "वृश्चिक", forecast: "अंतर्ज्ञान आज मजबूत है। निवेश के संबंध में अपनी भावनाओं पर भरोसा करें।" },
        { name: "धनु", forecast: "यात्रा करना या कुछ नया सीखना खुशी लाता है और आपके क्षितिज का विस्तार करता है।" },
        { name: "मकर", forecast: "कड़ी मेहनत का फल मिलने लगता है। अपने पेशेवर लक्ष्यों में अनुशासित रहें।" },
        { name: "कुंभ", forecast: "सामाजिक संबंध अप्रत्याशित लाभ लाते हैं। नेटवर्किंग अत्यधिक अनुकूल है।" },
        { name: "मीन", forecast: "अपनी मानसिक ऊर्जा को रिचार्ज करने के लिए आध्यात्मिक या रचनात्मक गतिविधियों के लिए समय निकालें।" },
      ],

      ways_title: "परामर्श के तरीके",
      view_all: "सभी सेवाएं देखें",
      services: [
        {
          title: "वैदिक ज्योतिष परामर्श",
          desc: "जीवन के सभी प्रमुख क्षेत्रों को कवर करने वाले आपके जन्म चार्ट का व्यापक पठन।",
          fee: "₹5,000",
        },
        {
          title: "कुंडली विश्लेषण",
          desc: "विशिष्ट प्रश्नों या वर्तमान दशा पर ध्यान केंद्रित करते हुए गहन चार्ट विश्लेषण।",
          fee: "₹3,500",
        },
        {
          title: "मुहूर्त मार्गदर्शन",
          desc: "महत्वपूर्ण जीवन की घटनाओं के लिए सबसे शुभ तिथि और समय खोजना।",
          fee: "₹2,000",
        },
      ],
      book_service: "बुक करें",
      testimonials_title: "ग्राहक क्या कहते हैं",
      t1_quote: `"पठन अविश्वसनीय रूप से शांतिपूर्ण था। नीलांजन ने सिर्फ भविष्यवाणियां नहीं दीं, बल्कि ग्रहों के चक्रों को इस तरह से समझाया जिससे मेरी वर्तमान स्थिति में स्पष्टता और शांति आई।"`,
      t1_author: "— ए. शर्मा",
      t1_loc: "नई दिल्ली",
      t2_quote: `"मैंने उनके धैर्यपूर्ण और गहन दृष्टिकोण की सराहना की। चार्ट देखने से पहले उन्होंने मेरी चिंताओं को समझने के लिए समय लिया। मार्गदर्शन व्यावहारिक और स्पष्ट था, अनावश्यक भय से रहित।"`,
      t2_author: "— एम. पटेल",
      t2_loc: "मुंबई",
      vichar_title: "विचार से",
      vichar_subtitle: "वैदिक ज्योतिष के अभ्यास पर टिप्पणियाँ",
      articles: [
        { title: "रात के जन्म में शनि की भूमिका को समझना", time: "4 मिनट का पठन", slug: "saturn-night-birth" },
        { title: "धैर्य ज्योतिषी का सबसे महत्वपूर्ण उपकरण क्यों है", time: "3 मिनट का पठन", slug: "patience-vital-tool" },
        { title: "व्यावहारिक उपायों के साथ कठिन दशाओं को नेविगेट करना", time: "6 मिनट का पठन", slug: "navigating-dashas" },
      ],
      ready_talk: "क्या आप बात करने के लिए तैयार हैं?",
      msg_whatsapp: "व्हाट्सएप पर संदेश भेजें",
    }
  };

  const t = dict[language];

  return (
    <main className="flex min-h-screen flex-col font-sans">
      <Header theme="dark" />

      {/* 2. HERO */}
      <section className="sticky top-0 -z-10 w-full h-[80vh] md:h-screen flex items-center justify-start overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 bg-ink">
          <video
            ref={videoRef}
            src="/ref1.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-left px-6 md:px-12 lg:px-16 max-w-3xl flex flex-col items-start animate-fade-in">
          <span className="text-glow text-sm md:text-base mb-6 tracking-wide uppercase font-medium">
            {t.subtitle}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-cream leading-tight mb-8">
            {t.h1_1} <br className="hidden md:block" />
            {t.h1_2}
          </h1>
          <p className="text-cream/90 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-light">
            {t.hero_desc}
          </p>

          <div className="flex flex-col items-start gap-4 w-full md:w-auto">
            <Link
              href="/appointment"
              className="w-full md:w-auto bg-ink text-cream px-8 py-4 rounded-full text-base font-medium hover:bg-ink/90 transition-colors text-center"
            >
              {t.book_cta}
            </Link>
            <Link
              href="#how-it-works"
              className="text-cream text-sm hover:text-glow underline underline-offset-4 decoration-cream/30 hover:decoration-glow transition-colors"
            >
              {t.how_it_works}
            </Link>
          </div>
        </div>
      </section>

      {/* 3. TRUST / METHOD ROW */}
      <section className="bg-cream border-b border-divider py-20 md:py-28 px-6">
        <FadeIn className="max-w-5xl mx-auto flex flex-col items-center">
          <span className="text-muted text-sm tracking-widest uppercase mb-10">
            {t.consult_anywhere}
          </span>
          <div className="flex flex-col md:flex-row gap-8 md:gap-24 w-full justify-center">
            <div className="flex items-center gap-3 text-ink">
              <Video className="w-5 h-5 text-gold" strokeWidth={1.5} />
              <span className="font-medium text-lg">{t.video_call}</span>
            </div>
            <div className="flex items-center gap-3 text-ink">
              <MessageCircle className="w-5 h-5 text-gold" strokeWidth={1.5} />
              <span className="font-medium text-lg">{t.whatsapp}</span>
            </div>
            <div className="flex items-center gap-3 text-ink">
              <Phone className="w-5 h-5 text-gold" strokeWidth={1.5} />
              <span className="font-medium text-lg">{t.phone_call}</span>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 4. STAT ROW */}
      <section className="bg-[#faf7f2] py-24 md:py-36 px-6 border-b border-divider">
        <FadeIn className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 text-center" delay={100}>
          <div>
            <div className="font-serif text-5xl md:text-6xl text-ink mb-3">15+</div>
            <div className="text-muted text-sm uppercase tracking-wider font-medium">
              {t.years_practice}
            </div>
          </div>
          <div>
            <div className="font-serif text-5xl md:text-6xl text-ink mb-3">500+</div>
            <div className="text-muted text-sm uppercase tracking-wider font-medium">
              {t.readings_given}
            </div>
          </div>
          <div>
            <div className="font-serif text-5xl md:text-6xl text-ink mb-3">2</div>
            <div className="text-muted text-sm uppercase tracking-wider font-medium">
              {t.traditions}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 5. READ WITH CARE - FEATURES */}
      <section className="bg-cream py-28 md:py-40 px-6 border-b border-divider" id="about">
        <FadeIn className="max-w-6xl mx-auto" direction="up">
          <h2 className="font-serif text-4xl md:text-5xl text-ink mb-20 md:mb-24 text-center">
            {t.rooted_title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
            <div className="flex flex-col">
              <BookOpen className="w-7 h-7 text-gold mb-6" strokeWidth={1.5} />
              <h3 className="text-xl text-ink font-medium mb-3">
                {t.classical_title}
              </h3>
              <p className="text-muted leading-relaxed">
                {t.classical_desc}
              </p>
            </div>
            <div className="flex flex-col">
              <Clock className="w-7 h-7 text-gold mb-6" strokeWidth={1.5} />
              <h3 className="text-xl text-ink font-medium mb-3">
                {t.patient_title}
              </h3>
              <p className="text-muted leading-relaxed">
                {t.patient_desc}
              </p>
            </div>
            <div className="flex flex-col">
              <Sparkles className="w-7 h-7 text-gold mb-6" strokeWidth={1.5} />
              <h3 className="text-xl text-ink font-medium mb-3">
                {t.clear_title}
              </h3>
              <p className="text-muted leading-relaxed">
                {t.clear_desc}
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 5.5 DAILY HOROSCOPE SECTION */}
      <section className="bg-[#fcfaf5] py-24 px-6 border-b border-divider" id="horoscope">
        <FadeIn className="max-w-6xl mx-auto" delay={150}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-gold/30 mb-4 bg-cream shadow-sm">
              <Moon className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-ink mb-4">
              {t.horoscope_title}
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              {t.horoscope_subtitle}
            </p>
            <p className="text-sm font-medium text-gold mt-4 uppercase tracking-widest">
              {currentDate}
            </p>
          </div>

          <div 
            className="relative w-full py-4 group"
            onMouseEnter={() => setIsHoroscopeHovered(true)}
            onMouseLeave={() => setIsHoroscopeHovered(false)}
          >
            {/* Gradient masks for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-[#fcfaf5] to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-[#fcfaf5] to-transparent pointer-events-none"></div>
            
            {/* Navigation Arrows */}
            <button 
              onClick={() => scroll('left')}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-cream text-ink border border-divider p-2 rounded-full shadow-md hover:bg-[#f6f0e1] hover:text-gold transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-cream text-ink border border-divider p-2 rounded-full shadow-md hover:bg-[#f6f0e1] hover:text-gold transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>

            <div 
              ref={scrollRef}
              tabIndex={0}
              className="flex w-full overflow-x-auto snap-x snap-mandatory gap-6 px-12 py-2 outline-none focus:ring-2 focus:ring-gold/30 rounded-lg"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Hide webkit scrollbar via inline styles in react is tricky, we'll use a global class or just let it be hidden via native tailwind plugins if available. Native scrollbarWidth works for modern browsers. */}
              {t.horoscope_signs.map((sign, i) => (
                <div key={i} className="w-[280px] md:w-[320px] shrink-0 snap-start bg-cream border border-divider p-6 hover:border-gold transition-colors duration-300">
                  <h3 className="font-serif text-xl text-ink mb-3">{sign.name}</h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {sign.forecast}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Note indicating it's updated daily via backend/API in the future */}
          <p className="text-center text-muted/60 text-xs mt-12 max-w-md mx-auto">
            (Mock data: Real horoscopes will be fetched daily from the database or an external astrology API).
          </p>
        </FadeIn>
      </section>

      {/* 6. SERVICES PREVIEW */}
      <section className="bg-cream py-24 px-6 border-b border-divider" id="services">
        <FadeIn className="max-w-6xl mx-auto" delay={100}>
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-6">
            <h2 className="font-serif text-4xl text-ink">{t.ways_title}</h2>
            <Link
              href="/services"
              className="text-ink font-medium hover:text-gold transition-colors inline-flex items-center gap-2"
            >
              {t.view_all} <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.services.map((service, i) => (
              <div
                key={i}
                className="border border-divider p-8 flex flex-col h-full bg-cream"
              >
                <h3 className="text-2xl text-ink font-serif mb-3">
                  {service.title}
                </h3>
                <p className="text-muted mb-8 flex-grow leading-relaxed">
                  {service.desc}
                </p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-divider">
                  <span className="text-ink font-medium">{service.fee}</span>
                  <Link
                    href="/appointment"
                    className="text-sm font-medium text-ink underline underline-offset-4 decoration-divider hover:decoration-gold transition-colors"
                  >
                    {t.book_service}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="bg-cream py-24 px-6 border-b border-divider">
        <FadeIn className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl text-ink mb-16 text-center">
            {t.testimonials_title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 max-w-4xl mx-auto">
            <div className="pl-6 border-l border-gold flex flex-col justify-between">
              <p className="text-ink text-lg leading-relaxed mb-6 italic font-serif">
                {t.t1_quote}
              </p>
              <div>
                <div className="text-ink font-medium">{t.t1_author}</div>
                <div className="text-muted text-sm">{t.t1_loc}</div>
              </div>
            </div>
            <div className="pl-6 border-l border-gold flex flex-col justify-between">
              <p className="text-ink text-lg leading-relaxed mb-6 italic font-serif">
                {t.t2_quote}
              </p>
              <div>
                <div className="text-ink font-medium">{t.t2_author}</div>
                <div className="text-muted text-sm">{t.t2_loc}</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 8. VICHAR PREVIEW */}
      <section className="bg-cream py-24 px-6" id="vichar">
        <FadeIn className="max-w-4xl mx-auto" delay={150}>
          <div className="mb-12">
            <h2 className="font-serif text-4xl text-ink mb-4">{t.vichar_title}</h2>
            <p className="text-muted">{t.vichar_subtitle}</p>
          </div>

          <div className="flex flex-col gap-8">
            {t.articles.map((article, i) => (
              <Link
                key={i}
                href={`/vichar/${article.slug}`}
                className="group flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-divider hover:border-gold transition-colors"
              >
                <h3 className="text-xl text-ink font-medium group-hover:text-gold transition-colors mb-2 md:mb-0">
                  {article.title}
                </h3>
                <span className="text-sm text-muted">{article.time}</span>
              </Link>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* 9. CLOSING CTA */}
      <section className="bg-ink py-24 px-6 text-center" id="contact">
        <FadeIn className="max-w-3xl mx-auto" direction="up">
          <h2 className="font-serif text-5xl text-cream mb-12">
            {t.ready_talk}
          </h2>
          <div className="flex flex-col items-center gap-6">
            <Link
              href="/appointment"
              className="bg-cream text-ink px-10 py-4 rounded-full text-base font-medium hover:bg-glow transition-colors"
            >
              {t.book_cta}
            </Link>
            <Link
              href="#whatsapp"
              className="text-cream/80 hover:text-cream text-sm underline underline-offset-4 decoration-cream/30 hover:decoration-cream transition-colors"
            >
              {t.msg_whatsapp}
            </Link>
          </div>
        </FadeIn>
      </section>

      <Footer />

      {/* Basic keyframes for the fade-in animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}} />
    </main>
  );
}
