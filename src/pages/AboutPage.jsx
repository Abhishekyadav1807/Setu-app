import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const byLang = {
  en: {
    tag: 'Legal Awareness & Document Assistance Platform',
    intro: 'SETU (meaning bridge in Sanskrit) is a web platform designed to bridge the gap between citizens and legal/governance services.',
    purposeTitle: 'Purpose',
    purposeText: 'SETU improves legal awareness and helps people complete legal tasks without confusion or middlemen.',
    bullets: [
      'Simplified explanations of Indian laws',
      'Step-by-step legal procedure guides',
      'Government scheme discovery',
      'Document generation tools',
      'Emergency and legal aid references',
    ],
    modulesTitle: 'Platform Modules',
    modules: [
      { title: 'Legal Knowledge Hub', desc: 'Indian laws in simple language.', to: '/legal-knowledge' },
      { title: 'Legal Procedure Guide', desc: 'FIR, RTI and other process guides.', to: '/legal-procedures' },
      { title: 'Government Scheme Explorer', desc: 'Find eligibility, benefits and official links.', to: '/government-schemes' },
      { title: 'Document Generator', desc: 'Generate legal draft PDFs from forms.', to: '/document-generator' },
    ],
    emergencyTitle: 'Emergency Numbers',
    contacts: [
      { label: 'Police Emergency', number: '112' },
      { label: 'Cyber Fraud Helpline', number: '1930' },
      { label: 'Women Helpline', number: '181' },
      { label: 'Child Helpline', number: '1098' },
      { label: 'Senior Citizens', number: '14567' },
      { label: 'NALSA Legal Aid', number: '15100' },
    ],
  },
  hi: {
    tag: 'कानूनी जागरूकता और दस्तावेज़ सहायता प्लेटफ़ॉर्म',
    intro: 'SETU (संस्कृत में अर्थ: पुल) नागरिकों और कानूनी/प्रशासनिक सेवाओं के बीच की दूरी कम करने के लिए बनाया गया प्लेटफ़ॉर्म है।',
    purposeTitle: 'उद्देश्य',
    purposeText: 'SETU कानूनी जागरूकता बढ़ाता है और लोगों को बिना बिचौलियों के कानूनी कार्य पूरा करने में मदद करता है।',
    bullets: [
      'भारतीय कानून की सरल व्याख्या',
      'कदम-दर-कदम कानूनी प्रक्रिया गाइड',
      'सरकारी योजनाओं की जानकारी',
      'दस्तावेज़ जनरेशन टूल्स',
      'आपातकालीन और लीगल-एड रेफरेंस',
    ],
    modulesTitle: 'प्लेटफ़ॉर्म मॉड्यूल',
    modules: [
      { title: 'कानूनी जानकारी केंद्र', desc: 'सरल भाषा में भारतीय कानून।', to: '/legal-knowledge' },
      { title: 'कानूनी प्रक्रिया गाइड', desc: 'FIR, RTI और अन्य प्रक्रियाएँ।', to: '/legal-procedures' },
      { title: 'सरकारी योजना एक्सप्लोरर', desc: 'पात्रता, लाभ और आधिकारिक लिंक।', to: '/government-schemes' },
      { title: 'दस्तावेज़ जनरेटर', desc: 'फॉर्म से कानूनी ड्राफ्ट PDF बनाएं।', to: '/document-generator' },
    ],
    emergencyTitle: 'आपातकालीन नंबर',
    contacts: [
      { label: 'पुलिस आपातकाल', number: '112' },
      { label: 'साइबर फ्रॉड हेल्पलाइन', number: '1930' },
      { label: 'महिला हेल्पलाइन', number: '181' },
      { label: 'चाइल्ड हेल्पलाइन', number: '1098' },
      { label: 'सीनियर सिटीजन', number: '14567' },
      { label: 'NALSA लीगल एड', number: '15100' },
    ],
  },
  bho: {
    tag: 'कानूनी जागरूकता आ दस्तावेज मदद प्लेटफॉर्म',
    intro: 'SETU (संस्कृत में अर्थ: पुल) नागरिक आ कानूनी/सरकारी सेवा के बीच दूरी कम करे वाला प्लेटफॉर्म ह।',
    purposeTitle: 'उद्देश्य',
    purposeText: 'SETU कानूनी जागरूकता बढ़ावे में आ बिना बिचौलिया के काम पूरा करे में मदद करेला।',
    bullets: [
      'भारतीय कानून के आसान जानकारी',
      'स्टेप-बाय-स्टेप कानूनी प्रक्रिया गाइड',
      'सरकारी योजना खोज',
      'दस्तावेज जनरेशन टूल्स',
      'आपातकालीन आ लीगल-एड रेफरेंस',
    ],
    modulesTitle: 'प्लेटफॉर्म मॉड्यूल',
    modules: [
      { title: 'कानूनी जानकारी केंद्र', desc: 'आसान भाषा में भारतीय कानून।', to: '/legal-knowledge' },
      { title: 'कानूनी प्रक्रिया गाइड', desc: 'FIR, RTI आ अउरी प्रक्रिया गाइड।', to: '/legal-procedures' },
      { title: 'सरकारी योजना एक्सप्लोरर', desc: 'पात्रता, लाभ आ आधिकारिक लिंक।', to: '/government-schemes' },
      { title: 'दस्तावेज जनरेटर', desc: 'फॉर्म से कानूनी ड्राफ्ट PDF बनाईं।', to: '/document-generator' },
    ],
    emergencyTitle: 'आपातकालीन नंबर',
    contacts: [
      { label: 'पुलिस आपातकाल', number: '112' },
      { label: 'साइबर फ्रॉड हेल्पलाइन', number: '1930' },
      { label: 'महिला हेल्पलाइन', number: '181' },
      { label: 'चाइल्ड हेल्पलाइन', number: '1098' },
      { label: 'सीनियर सिटीजन', number: '14567' },
      { label: 'NALSA लीगल एड', number: '15100' },
    ],
  },
  bn: {
    tag: 'আইনি সচেতনতা ও ডকুমেন্ট সহায়তা প্ল্যাটফর্ম',
    intro: 'SETU (সংস্কৃতে অর্থ: সেতু) নাগরিক ও আইনি/সরকারি সেবার মধ্যে দূরত্ব কমাতে তৈরি একটি প্ল্যাটফর্ম।',
    purposeTitle: 'উদ্দেশ্য',
    purposeText: 'SETU আইনি সচেতনতা বাড়ায় এবং মানুষকে দালাল ছাড়া আইনি কাজ সম্পন্ন করতে সাহায্য করে।',
    bullets: [
      'ভারতীয় আইনের সহজ ব্যাখ্যা',
      'ধাপে ধাপে আইনি প্রক্রিয়া গাইড',
      'সরকারি স্কিম খোঁজ',
      'ডকুমেন্ট জেনারেশন টুল',
      'জরুরি ও লিগ্যাল-এড রেফারেন্স',
    ],
    modulesTitle: 'প্ল্যাটফর্ম মডিউল',
    modules: [
      { title: 'আইনি জ্ঞান কেন্দ্র', desc: 'সহজ ভাষায় ভারতীয় আইন।', to: '/legal-knowledge' },
      { title: 'আইনি প্রক্রিয়া গাইড', desc: 'FIR, RTI এবং অন্যান্য গাইড।', to: '/legal-procedures' },
      { title: 'সরকারি স্কিম এক্সপ্লোরার', desc: 'যোগ্যতা, সুবিধা এবং অফিসিয়াল লিংক।', to: '/government-schemes' },
      { title: 'ডকুমেন্ট জেনারেটর', desc: 'ফর্ম থেকে আইনি ড্রাফট PDF তৈরি করুন।', to: '/document-generator' },
    ],
    emergencyTitle: 'জরুরি নম্বর',
    contacts: [
      { label: 'পুলিশ জরুরি', number: '112' },
      { label: 'সাইবার ফ্রড হেল্পলাইন', number: '1930' },
      { label: 'মহিলা হেল্পলাইন', number: '181' },
      { label: 'চাইল্ড হেল্পলাইন', number: '1098' },
      { label: 'সিনিয়র সিটিজেন', number: '14567' },
      { label: 'NALSA লিগ্যাল এইড', number: '15100' },
    ],
  },
  hinglish: {
    tag: 'Legal Awareness aur Document Assistance Platform',
    intro: 'SETU ka matlab bridge hai, jo citizens aur legal/governance services ke beech gap ko kam karta hai.',
    purposeTitle: 'Purpose',
    purposeText: 'SETU legal awareness badhata hai aur bina middlemen ke legal tasks complete karne me help karta hai.',
    bullets: [
      'Indian laws ki simplified explanation',
      'Step-by-step legal procedure guides',
      'Government scheme discovery',
      'Document generation tools',
      'Emergency aur legal-aid references',
    ],
    modulesTitle: 'Platform Modules',
    modules: [
      { title: 'Legal Knowledge Hub', desc: 'Simple language me Indian laws.', to: '/legal-knowledge' },
      { title: 'Legal Procedure Guide', desc: 'FIR, RTI aur dusre process guides.', to: '/legal-procedures' },
      { title: 'Government Scheme Explorer', desc: 'Eligibility, benefits aur official links.', to: '/government-schemes' },
      { title: 'Document Generator', desc: 'Form se legal draft PDFs banao.', to: '/document-generator' },
    ],
    emergencyTitle: 'Emergency Numbers',
    contacts: [
      { label: 'Police Emergency', number: '112' },
      { label: 'Cyber Fraud Helpline', number: '1930' },
      { label: 'Women Helpline', number: '181' },
      { label: 'Child Helpline', number: '1098' },
      { label: 'Senior Citizens', number: '14567' },
      { label: 'NALSA Legal Aid', number: '15100' },
    ],
  },
};

export default function AboutPage() {
  const { t, language } = useLanguage();
  const c = byLang[language] || byLang.en;
  return (
    <div className="page-container fade-in" style={{ maxWidth: 900 }}>
      <div className="page-header">
        <h1>{t('pages.aboutTitle')}</h1>
        <p>{t('pages.aboutSubtitle')}</p>
      </div>

      <section style={{ marginBottom: 36 }}>
        <div style={{ background: 'linear-gradient(135deg, var(--primary-bg), rgba(37,99,235,0.06))', borderRadius: 20, padding: '36px 32px', border: '1px solid rgba(37,99,235,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24, fontWeight: 900, boxShadow: '0 4px 16px rgba(30,58,138,0.3)' }}>S</div>
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em' }}>SETU</h2>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{c.tag}</p>
            </div>
          </div>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{c.intro}</p>
        </div>
      </section>

      <section style={{ marginBottom: 36 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>{c.purposeTitle}</h2>
        <div className="card" style={{ lineHeight: 1.8 }}>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 12 }}>{c.purposeText}</p>
          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
            {c.bullets.map((item, i) => (
              <li key={i} style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 6, lineHeight: 1.6 }}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: 36 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>{c.modulesTitle}</h2>
        <div className="grid-2">
          {c.modules.map((mod, i) => (
            <Link key={i} to={mod.to} className="card card-clickable fade-up" style={{ textDecoration: 'none', animationDelay: `${i * 0.06}s` }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: 'var(--text)' }}>{mod.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{mod.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div style={{ background: 'linear-gradient(135deg, #FEF2F2, #FEE2E2)', borderRadius: 16, padding: '24px 28px', border: '1px solid rgba(220,38,38,0.15)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#991B1B', marginBottom: 12 }}>{c.emergencyTitle}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
            {c.contacts.map((x, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: '#7F1D1D' }}>{x.label}:</span>
                <strong style={{ fontSize: 14, color: '#DC2626' }}>{x.number}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
