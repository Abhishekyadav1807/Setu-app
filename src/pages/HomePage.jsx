import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const contentByLanguage = {
  en: {
    badge: 'Made for Indian Citizens',
    heroTitle1: 'Legal Awareness &',
    heroTitle2: 'Document Assistance',
    heroDesc:
      'Understand Indian laws, explore government schemes, learn legal procedures, and generate legal documents - all in one place.',
    cta1: 'Explore Laws ->',
    cta2: 'Generate Documents',
    explore: 'Explore ->',
    lawSectionTitle: 'Understand Indian Laws',
    lawSectionDesc: 'Laws explained in simple language with examples and use cases',
    howTitle: 'How SETU Helps You',
    steps: [
      { step: '01', title: 'Learn Your Rights', desc: 'Browse simplified explanations of Indian laws with real examples and use cases' },
      { step: '02', title: 'Follow Procedures', desc: 'Step-by-step guides for FIR filing, RTI, consumer complaints, and more' },
      { step: '03', title: 'Find Schemes', desc: 'Search government schemes by category, check eligibility, and find official links' },
      { step: '04', title: 'Generate Documents', desc: 'Fill forms and download formatted PDFs - FIR drafts, RTI applications, legal notices' },
    ],
    disclaimerTitle: 'Important Disclaimer',
    disclaimerDesc:
      'SETU provides legal information for educational purposes only. This platform is not a substitute for professional legal advice. Always consult a qualified lawyer for specific legal matters.',
    disclaimerBtn: 'Read Full Disclaimer ->',
    features: [
      {
        title: 'Legal Knowledge Hub',
        desc: 'Learn about Indian laws in simple language - Constitution, Consumer Protection, IT Act, and more.',
        to: '/legal-knowledge', color: '#3B82F6',
      },
      {
        title: 'Legal Procedure Guide',
        desc: 'Step-by-step guides for FIR filing, RTI applications, consumer complaints, and more.',
        to: '/legal-procedures', color: '#8B5CF6',
      },
      {
        title: 'Government Schemes',
        desc: 'Search and explore 15+ government schemes with eligibility and application details.',
        to: '/government-schemes', color: '#059669',
      },
      {
        title: 'Document Generator',
        desc: 'Generate formatted legal documents - FIR drafts, RTI applications, legal notices, and more.',
        to: '/document-generator', color: '#D97706',
      },
    ],
    stats: [
      { num: '50M+', label: 'Pending court cases in India', color: '#DC2626' },
      { num: '70%', label: 'Indians lack legal awareness', color: '#D97706' },
      { num: '500+', label: 'Government schemes available', color: '#059669' },
      { num: '5', label: 'Document types you can generate', color: '#3B82F6' },
    ],
    lawCategories: [
      { title: 'Constitution Basics', desc: 'Fundamental rights, duties, directive principles', slug: 'constitution-basics' },
      { title: 'Consumer Protection Act', desc: 'Your rights as a consumer, complaint process', slug: 'consumer-protection-act' },
      { title: 'IT Act', desc: 'Cyber crime laws, online fraud protection', slug: 'it-act' },
      { title: 'Labour Laws', desc: 'Wages, PF, ESI, workplace rights', slug: 'labour-laws' },
      { title: 'Property & Rent Laws', desc: 'RERA, tenant rights, property registration', slug: 'property-rent-laws' },
    ],
  },
  hi: {
    badge: 'भारतीय नागरिकों के लिए',
    heroTitle1: 'कानूनी जागरूकता और',
    heroTitle2: 'दस्तावेज़ सहायता',
    heroDesc:
      'भारतीय कानून समझें, सरकारी योजनाएँ खोजें, कानूनी प्रक्रियाएँ सीखें और कानूनी दस्तावेज़ तैयार करें - एक ही जगह पर।',
    cta1: 'कानून देखें ->',
    cta2: 'दस्तावेज़ बनाएँ',
    explore: 'और देखें ->',
    lawSectionTitle: 'भारतीय कानून समझें',
    lawSectionDesc: 'सरल भाषा में उदाहरणों और उपयोग के साथ कानून की जानकारी',
    howTitle: 'SETU आपकी कैसे मदद करता है',
    steps: [
      { step: '01', title: 'अपने अधिकार जानें', desc: 'भारतीय कानून की आसान व्याख्या और वास्तविक उदाहरण पढ़ें' },
      { step: '02', title: 'प्रक्रिया समझें', desc: 'FIR, RTI, उपभोक्ता शिकायत आदि के लिए चरण-दर-चरण गाइड' },
      { step: '03', title: 'योजनाएँ खोजें', desc: 'श्रेणी के अनुसार सरकारी योजनाएँ, पात्रता और आधिकारिक लिंक देखें' },
      { step: '04', title: 'दस्तावेज़ बनाएँ', desc: 'फॉर्म भरें और FIR ड्राफ्ट, RTI, नोटिस जैसी PDF डाउनलोड करें' },
    ],
    disclaimerTitle: 'महत्वपूर्ण अस्वीकरण',
    disclaimerDesc:
      'SETU केवल शैक्षणिक उद्देश्य के लिए कानूनी जानकारी देता है। यह पेशेवर कानूनी सलाह का विकल्प नहीं है। विशेष मामलों में योग्य वकील से सलाह लें।',
    disclaimerBtn: 'पूरा अस्वीकरण पढ़ें ->',
    features: [
      { title: 'कानूनी जानकारी केंद्र', desc: 'संविधान, उपभोक्ता संरक्षण, IT Act आदि भारतीय कानून सरल भाषा में पढ़ें।', to: '/legal-knowledge', color: '#3B82F6' },
      { title: 'कानूनी प्रक्रिया गाइड', desc: 'FIR, RTI, उपभोक्ता शिकायत आदि के लिए चरण-दर-चरण मार्गदर्शिका।', to: '/legal-procedures', color: '#8B5CF6' },
      { title: 'सरकारी योजनाएँ', desc: '15+ योजनाएँ खोजें, पात्रता देखें और आवेदन की जानकारी पाएं।', to: '/government-schemes', color: '#059669' },
      { title: 'दस्तावेज़ जनरेटर', desc: 'FIR ड्राफ्ट, RTI आवेदन, कानूनी नोटिस जैसे दस्तावेज़ तैयार करें।', to: '/document-generator', color: '#D97706' },
    ],
    stats: [
      { num: '50M+', label: 'भारत में लंबित कोर्ट केस', color: '#DC2626' },
      { num: '70%', label: 'लोगों में कानूनी जागरूकता की कमी', color: '#D97706' },
      { num: '500+', label: 'उपलब्ध सरकारी योजनाएँ', color: '#059669' },
      { num: '5', label: 'दस्तावेज़ प्रकार जिन्हें आप बना सकते हैं', color: '#3B82F6' },
    ],
    lawCategories: [
      { title: 'संविधान की मूल बातें', desc: 'मौलिक अधिकार, कर्तव्य, नीति निदेशक तत्व', slug: 'constitution-basics' },
      { title: 'उपभोक्ता संरक्षण अधिनियम', desc: 'उपभोक्ता अधिकार और शिकायत प्रक्रिया', slug: 'consumer-protection-act' },
      { title: 'आईटी अधिनियम', desc: 'साइबर अपराध कानून और ऑनलाइन सुरक्षा', slug: 'it-act' },
      { title: 'श्रम कानून', desc: 'वेतन, PF, ESI और कार्यस्थल अधिकार', slug: 'labour-laws' },
      { title: 'संपत्ति और किराया कानून', desc: 'RERA, किरायेदार अधिकार, रजिस्ट्री', slug: 'property-rent-laws' },
    ],
  },
  bho: {
    badge: 'भारतीय नागरिक खातिर',
    heroTitle1: 'कानूनी जागरूकता आ',
    heroTitle2: 'दस्तावेज सहायता',
    heroDesc:
      'भारतीय कानून समझीं, सरकारी योजना खोजीं, कानूनी प्रक्रिया सीखीं आ कानूनी कागज बनाईं - एके जगह पर।',
    cta1: 'कानून देखीं ->',
    cta2: 'दस्तावेज बनाईं',
    explore: 'देखीं ->',
    lawSectionTitle: 'भारतीय कानून समझीं',
    lawSectionDesc: 'आसान भाषा में उदाहरण सहित कानून के जानकारी',
    howTitle: 'SETU से का मदद मिली',
    steps: [
      { step: '01', title: 'अपना अधिकार जानीं', desc: 'भारतीय कानून के आसान जानकारी आ असली उदाहरण पढ़ीं' },
      { step: '02', title: 'प्रक्रिया समझीं', desc: 'FIR, RTI, उपभोक्ता शिकायत खातिर स्टेप-बाय-स्टेप गाइड' },
      { step: '03', title: 'योजना खोजीं', desc: 'श्रेणी अनुसार सरकारी योजना, पात्रता आ लिंक देखीं' },
      { step: '04', title: 'दस्तावेज बनाईं', desc: 'फॉर्म भर के FIR ड्राफ्ट, RTI आवेदन जइसन PDF डाउनलोड करीं' },
    ],
    disclaimerTitle: 'जरूरी सूचना',
    disclaimerDesc:
      'SETU खाली जानकारी खातिर बा। ई पेशेवर कानूनी सलाह के जगह ना ह। खास मामला में वकील से सलाह लीं।',
    disclaimerBtn: 'पूरा अस्वीकरण पढ़ीं ->',
    features: [
      { title: 'कानूनी जानकारी केंद्र', desc: 'संविधान, उपभोक्ता कानून, IT Act वगैरह आसान भाषा में पढ़ीं।', to: '/legal-knowledge', color: '#3B82F6' },
      { title: 'कानूनी प्रक्रिया गाइड', desc: 'FIR, RTI, शिकायत वगैरह खातिर आसान स्टेप वाला गाइड।', to: '/legal-procedures', color: '#8B5CF6' },
      { title: 'सरकारी योजना', desc: '15+ योजना खोजीं, पात्रता देखीं आ आवेदन जानकारी पाइं।', to: '/government-schemes', color: '#059669' },
      { title: 'दस्तावेज जनरेटर', desc: 'FIR ड्राफ्ट, RTI आवेदन, कानूनी नोटिस जइसन कागज बनाईं।', to: '/document-generator', color: '#D97706' },
    ],
    stats: [
      { num: '50M+', label: 'भारत में बाकी कोर्ट केस', color: '#DC2626' },
      { num: '70%', label: 'लोग में कानूनी जानकारी कम बा', color: '#D97706' },
      { num: '500+', label: 'उपलब्ध सरकारी योजना', color: '#059669' },
      { num: '5', label: 'दस्तावेज के प्रकार', color: '#3B82F6' },
    ],
    lawCategories: [
      { title: 'संविधान के आधार', desc: 'मौलिक अधिकार, कर्तव्य, नीति सिद्धांत', slug: 'constitution-basics' },
      { title: 'उपभोक्ता संरक्षण कानून', desc: 'उपभोक्ता अधिकार आ शिकायत प्रक्रिया', slug: 'consumer-protection-act' },
      { title: 'आईटी कानून', desc: 'साइबर अपराध आ ऑनलाइन सुरक्षा', slug: 'it-act' },
      { title: 'श्रम कानून', desc: 'मजदूरी, PF, ESI, काम का अधिकार', slug: 'labour-laws' },
      { title: 'जमीन आ किराया कानून', desc: 'RERA, किरायेदार अधिकार, रजिस्ट्री', slug: 'property-rent-laws' },
    ],
  },
  bn: {
    badge: 'ভারতীয় নাগরিকদের জন্য',
    heroTitle1: 'আইনি সচেতনতা ও',
    heroTitle2: 'ডকুমেন্ট সহায়তা',
    heroDesc:
      'ভারতের আইন জানুন, সরকারি স্কিম খুঁজুন, আইনি প্রক্রিয়া শিখুন এবং আইনি ডকুমেন্ট তৈরি করুন - এক জায়গায়।',
    cta1: 'আইন দেখুন ->',
    cta2: 'ডকুমেন্ট তৈরি করুন',
    explore: 'দেখুন ->',
    lawSectionTitle: 'ভারতীয় আইন বুঝুন',
    lawSectionDesc: 'সহজ ভাষায় উদাহরণসহ আইন ব্যাখ্যা',
    howTitle: 'SETU কীভাবে সাহায্য করে',
    steps: [
      { step: '01', title: 'আপনার অধিকার জানুন', desc: 'ভারতীয় আইনের সহজ ব্যাখ্যা ও বাস্তব উদাহরণ দেখুন' },
      { step: '02', title: 'প্রক্রিয়া অনুসরণ করুন', desc: 'FIR, RTI, ভোক্তা অভিযোগের ধাপে ধাপে নির্দেশিকা' },
      { step: '03', title: 'স্কিম খুঁজুন', desc: 'ক্যাটাগরি অনুযায়ী সরকারি স্কিম, যোগ্যতা ও অফিসিয়াল লিংক দেখুন' },
      { step: '04', title: 'ডকুমেন্ট তৈরি করুন', desc: 'ফর্ম পূরণ করে FIR, RTI, নোটিসের PDF ডাউনলোড করুন' },
    ],
    disclaimerTitle: 'গুরুত্বপূর্ণ ঘোষণা',
    disclaimerDesc:
      'SETU শুধুমাত্র শিক্ষামূলক আইনি তথ্য দেয়। এটি পেশাদার আইনি পরামর্শের বিকল্প নয়। নির্দিষ্ট বিষয়ে আইনজীবীর পরামর্শ নিন।',
    disclaimerBtn: 'সম্পূর্ণ ডিসক্লেমার পড়ুন ->',
    features: [
      { title: 'আইনি জ্ঞান কেন্দ্র', desc: 'সংবিধান, ভোক্তা সুরক্ষা, IT Act ইত্যাদি সহজ ভাষায় জানুন।', to: '/legal-knowledge', color: '#3B82F6' },
      { title: 'আইনি প্রক্রিয়া গাইড', desc: 'FIR, RTI, অভিযোগের ধাপে ধাপে গাইড।', to: '/legal-procedures', color: '#8B5CF6' },
      { title: 'সরকারি স্কিম', desc: '15+ স্কিম খুঁজুন, যোগ্যতা দেখুন ও আবেদন তথ্য পান।', to: '/government-schemes', color: '#059669' },
      { title: 'ডকুমেন্ট জেনারেটর', desc: 'FIR ড্রাফট, RTI আবেদন, আইনি নোটিস তৈরি করুন।', to: '/document-generator', color: '#D97706' },
    ],
    stats: [
      { num: '50M+', label: 'ভারতে বিচারাধীন মামলা', color: '#DC2626' },
      { num: '70%', label: 'আইনি সচেতনতায় ঘাটতি', color: '#D97706' },
      { num: '500+', label: 'উপলব্ধ সরকারি স্কিম', color: '#059669' },
      { num: '5', label: 'যে ধরনের ডকুমেন্ট তৈরি করতে পারবেন', color: '#3B82F6' },
    ],
    lawCategories: [
      { title: 'সংবিধানের মূল ধারণা', desc: 'মৌলিক অধিকার, দায়িত্ব, নীতি-নির্দেশ', slug: 'constitution-basics' },
      { title: 'ভোক্তা সুরক্ষা আইন', desc: 'ভোক্তার অধিকার ও অভিযোগ প্রক্রিয়া', slug: 'consumer-protection-act' },
      { title: 'আইটি আইন', desc: 'সাইবার অপরাধ ও অনলাইন সুরক্ষা', slug: 'it-act' },
      { title: 'শ্রম আইন', desc: 'মজুরি, PF, ESI ও কর্মক্ষেত্রের অধিকার', slug: 'labour-laws' },
      { title: 'সম্পত্তি ও ভাড়া আইন', desc: 'RERA, ভাড়াটিয়ার অধিকার, রেজিস্ট্রেশন', slug: 'property-rent-laws' },
    ],
  },
  hinglish: {
    badge: 'Indian Citizens ke liye',
    heroTitle1: 'Legal Awareness &',
    heroTitle2: 'Document Help',
    heroDesc:
      'Indian laws samjho, govt schemes explore karo, legal process seekho aur legal documents banao - sab ek jagah.',
    cta1: 'Laws Explore karo ->',
    cta2: 'Documents Banao',
    explore: 'Explore ->',
    lawSectionTitle: 'Indian Laws Samjho',
    lawSectionDesc: 'Simple language me examples ke saath law explained',
    howTitle: 'SETU kaise help karta hai',
    steps: [
      { step: '01', title: 'Apne Rights Jano', desc: 'Indian laws ki easy explanation aur real examples dekho' },
      { step: '02', title: 'Process Follow karo', desc: 'FIR, RTI, complaint ke step-by-step guides' },
      { step: '03', title: 'Schemes Find karo', desc: 'Category wise govt schemes, eligibility aur official links dekho' },
      { step: '04', title: 'Documents Generate karo', desc: 'Form fill karke FIR draft, RTI application, notices PDF me download karo' },
    ],
    disclaimerTitle: 'Important Disclaimer',
    disclaimerDesc:
      'SETU legal info sirf educational purpose ke liye deta hai. Ye professional legal advice ka substitute nahi hai. Specific matter ke liye lawyer se consult karein.',
    disclaimerBtn: 'Full Disclaimer Padho ->',
    features: [
      { title: 'Legal Knowledge Hub', desc: 'Constitution, Consumer Protection, IT Act waqera simple language me samjho.', to: '/legal-knowledge', color: '#3B82F6' },
      { title: 'Legal Procedure Guide', desc: 'FIR, RTI, consumer complaint ke easy step-by-step guides.', to: '/legal-procedures', color: '#8B5CF6' },
      { title: 'Government Schemes', desc: '15+ schemes explore karo, eligibility aur apply details dekho.', to: '/government-schemes', color: '#059669' },
      { title: 'Document Generator', desc: 'FIR draft, RTI application, legal notice type docs generate karo.', to: '/document-generator', color: '#D97706' },
    ],
    stats: [
      { num: '50M+', label: 'India me pending court cases', color: '#DC2626' },
      { num: '70%', label: 'Logon me legal awareness ki kami', color: '#D97706' },
      { num: '500+', label: 'Available govt schemes', color: '#059669' },
      { num: '5', label: 'Document types jo aap generate kar sakte ho', color: '#3B82F6' },
    ],
    lawCategories: [
      { title: 'Constitution Basics', desc: 'Fundamental rights, duties, directive principles', slug: 'constitution-basics' },
      { title: 'Consumer Protection Act', desc: 'Consumer rights aur complaint process', slug: 'consumer-protection-act' },
      { title: 'IT Act', desc: 'Cyber crime laws aur online fraud protection', slug: 'it-act' },
      { title: 'Labour Laws', desc: 'Wages, PF, ESI aur workplace rights', slug: 'labour-laws' },
      { title: 'Property & Rent Laws', desc: 'RERA, tenant rights, property registration', slug: 'property-rent-laws' },
    ],
  },
};

export default function HomePage() {
  const { language } = useLanguage();
  const c = contentByLanguage[language] || contentByLanguage.en;

  return (
    <div className="fade-in">
      <section style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 40%, #2563EB 100%)',
        padding: '56px 24px 64px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(96,165,250,0.15), transparent 70%)',
          top: -100, right: -100,
        }} />
        <div style={{
          position: 'absolute', width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.1), transparent 70%)',
          bottom: -50, left: -50,
        }} />

        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.1)', borderRadius: 24,
            padding: '6px 18px', marginBottom: 20,
            border: '1px solid rgba(255,255,255,0.15)',
          }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{c.badge}</span>
          </div>

          <h1 style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 18, letterSpacing: '-0.04em' }}>
            {c.heroTitle1}<br />
            <span style={{ background: 'linear-gradient(135deg, #60A5FA, #34D399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {c.heroTitle2}
            </span>
          </h1>

          <p style={{ fontSize: 'clamp(15px, 2.5vw, 18px)', color: 'rgba(255,255,255,0.7)', maxWidth: 560, margin: '0 auto 32px', lineHeight: 1.7 }}>
            {c.heroDesc}
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/legal-knowledge" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: 15, borderRadius: 12 }}>
              {c.cta1}
            </Link>
            <Link to="/document-generator" className="btn" style={{ padding: '14px 28px', fontSize: 15, borderRadius: 12, background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }}>
              {c.cta2}
            </Link>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 'var(--page-max)', margin: '-22px auto 0', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {c.features.map((f, i) => (
            <Link key={i} to={f.to} className="fade-up" style={{ background: '#fff', borderRadius: 18, padding: 24, border: '1px solid var(--border)', textDecoration: 'none', transition: 'all 0.25s', animationDelay: `${i * 0.06}s`, display: 'block' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.borderColor = f.color; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${f.color}15`, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: f.color }} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: 'var(--text)' }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
              <div style={{ marginTop: 14, fontSize: 13, fontWeight: 600, color: f.color, display: 'flex', alignItems: 'center', gap: 4 }}>{c.explore}</div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 'var(--page-max)', margin: '48px auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {c.stats.map((s, i) => (
            <div key={i} className="fade-up" style={{ background: '#fff', borderRadius: 16, padding: '24px 20px', border: '1px solid var(--border)', animationDelay: `${i * 0.05}s` }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: s.color, letterSpacing: '-0.02em' }}>{s.num}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 'var(--page-max)', margin: '0 auto 48px', padding: '0 24px' }}>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>{c.lawSectionTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>{c.lawSectionDesc}</p>
        <div className="grid-3">
          {c.lawCategories.map((cat, i) => (
            <Link key={i} to={`/legal-knowledge/${cat.slug}`} className="card card-clickable fade-up" style={{ textDecoration: 'none', animationDelay: `${i * 0.04}s` }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, color: 'var(--text)' }}>{cat.title}</h3>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--primary-bg)', padding: '48px 24px', margin: '0 0 48px' }}>
        <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: 'center', marginBottom: 36, letterSpacing: '-0.03em' }}>{c.howTitle}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 24 }}>
            {c.steps.map((s, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '24px 16px' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 18, fontWeight: 800, color: '#fff' }}>{s.step}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', marginBottom: 6, letterSpacing: '0.05em' }}>STEP {s.step}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 'var(--page-max)', margin: '0 auto 48px', padding: '0 24px' }}>
        <div style={{ background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)', borderRadius: 20, padding: '28px 24px', border: '1px solid rgba(245, 158, 11, 0.25)', display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#92400E', marginBottom: 8 }}>{c.disclaimerTitle}</h3>
            <p style={{ fontSize: 13, color: '#78350F', lineHeight: 1.6 }}>{c.disclaimerDesc}</p>
          </div>
          <Link to="/disclaimer" style={{ padding: '10px 22px', borderRadius: 10, border: 'none', background: '#92400E', color: '#fff', fontWeight: 600, fontSize: 13, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            {c.disclaimerBtn}
          </Link>
        </div>
      </section>
    </div>
  );
}
