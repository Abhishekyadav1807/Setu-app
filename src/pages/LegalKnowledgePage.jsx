import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const byLang = {
  en: {
    laws: [
      { slug: 'constitution-basics', title: 'Constitution of India - Basics', category: 'Constitutional Law', overview: 'The supreme law of India, guaranteeing fundamental rights, duties, and directive principles for all citizens.' },
      { slug: 'consumer-protection-act', title: 'Consumer Protection Act, 2019', category: 'Consumer Law', overview: 'Protects consumers against unfair trade practices, defective goods, and deficient services with a three-tier redressal mechanism.' },
      { slug: 'it-act', title: 'Information Technology Act, 2000', category: 'Cyber Law', overview: "India's primary law for cybercrime, electronic commerce, and data protection in the digital world." },
      { slug: 'labour-laws', title: 'Labour Laws in India', category: 'Employment Law', overview: 'Consolidated labour codes covering wages, industrial relations, social security, and workplace safety.' },
      { slug: 'property-rent-laws', title: 'Property & Rent Laws', category: 'Property Law', overview: 'Laws governing property registration, transfer, RERA, tenancy rights, and land records.' },
    ],
  },
  hi: {
    laws: [
      { slug: 'constitution-basics', title: 'भारत का संविधान - मूल बातें', category: 'संवैधानिक कानून', overview: 'भारत का सर्वोच्च कानून, जो नागरिकों को मौलिक अधिकार, कर्तव्य और नीति-निर्देशक सिद्धांत प्रदान करता है।' },
      { slug: 'consumer-protection-act', title: 'उपभोक्ता संरक्षण अधिनियम, 2019', category: 'उपभोक्ता कानून', overview: 'अनुचित व्यापार, खराब सामान और खराब सेवाओं से उपभोक्ताओं की सुरक्षा के लिए मजबूत तंत्र।' },
      { slug: 'it-act', title: 'सूचना प्रौद्योगिकी अधिनियम, 2000', category: 'साइबर कानून', overview: 'साइबर अपराध, ई-कॉमर्स और डिजिटल डेटा सुरक्षा के लिए भारत का प्रमुख कानून।' },
      { slug: 'labour-laws', title: 'भारत में श्रम कानून', category: 'रोज़गार कानून', overview: 'वेतन, औद्योगिक संबंध, सामाजिक सुरक्षा और कार्यस्थल सुरक्षा से जुड़े प्रमुख प्रावधान।' },
      { slug: 'property-rent-laws', title: 'संपत्ति और किराया कानून', category: 'संपत्ति कानून', overview: 'संपत्ति पंजीकरण, हस्तांतरण, RERA, किरायेदारी अधिकार और भूमि रिकॉर्ड से जुड़े नियम।' },
    ],
  },
  bho: {
    laws: [
      { slug: 'constitution-basics', title: 'भारत के संविधान - मूल बात', category: 'संवैधानिक कानून', overview: 'भारत के सबसे बड़ कानून, जेकरा से नागरिक के मौलिक अधिकार आ कर्तव्य मिलेला।' },
      { slug: 'consumer-protection-act', title: 'उपभोक्ता संरक्षण अधिनियम, 2019', category: 'उपभोक्ता कानून', overview: 'खराब सामान आ अनुचित व्यापार से उपभोक्ता के सुरक्षा देवे वाला कानून।' },
      { slug: 'it-act', title: 'सूचना प्रौद्योगिकी अधिनियम, 2000', category: 'साइबर कानून', overview: 'साइबर अपराध आ ऑनलाइन लेन-देन खातिर भारत के मुख्य कानून।' },
      { slug: 'labour-laws', title: 'भारत में श्रम कानून', category: 'रोजगार कानून', overview: 'मजदूरी, सामाजिक सुरक्षा आ कामकाज अधिकार से जुड़ल नियम।' },
      { slug: 'property-rent-laws', title: 'जमीन आ किराया कानून', category: 'संपत्ति कानून', overview: 'जमीन रजिस्ट्री, किरायेदारी हक, RERA आ रिकॉर्ड से जुड़ल कानून।' },
    ],
  },
  bn: {
    laws: [
      { slug: 'constitution-basics', title: 'ভারতের সংবিধান - মূল ধারণা', category: 'সাংবিধানিক আইন', overview: 'ভারতের সর্বোচ্চ আইন, যা নাগরিকদের মৌলিক অধিকার ও কর্তব্য নিশ্চিত করে।' },
      { slug: 'consumer-protection-act', title: 'ভোক্তা সুরক্ষা আইন, ২০১৯', category: 'ভোক্তা আইন', overview: 'ত্রুটিপূর্ণ পণ্য ও প্রতারণামূলক পরিষেবা থেকে ভোক্তাকে সুরক্ষা দেয়।' },
      { slug: 'it-act', title: 'তথ্য প্রযুক্তি আইন, ২০০০', category: 'সাইবার আইন', overview: 'সাইবার অপরাধ, ই-কমার্স ও ডিজিটাল নিরাপত্তার মূল আইন।' },
      { slug: 'labour-laws', title: 'ভারতে শ্রম আইন', category: 'কর্মসংস্থান আইন', overview: 'মজুরি, সামাজিক নিরাপত্তা ও কর্মক্ষেত্রের অধিকারের গুরুত্বপূর্ণ বিধান।' },
      { slug: 'property-rent-laws', title: 'সম্পত্তি ও ভাড়া আইন', category: 'সম্পত্তি আইন', overview: 'সম্পত্তি নিবন্ধন, হস্তান্তর, RERA ও ভাড়াটিয়া অধিকারের নিয়ম।' },
    ],
  },
  hinglish: {
    laws: [
      { slug: 'constitution-basics', title: 'Constitution of India - Basics', category: 'Constitution Law', overview: 'India ka supreme law jo fundamental rights, duties aur governance ka base set karta hai.' },
      { slug: 'consumer-protection-act', title: 'Consumer Protection Act, 2019', category: 'Consumer Law', overview: 'Defective goods, unfair trade aur poor services ke against consumer protection deta hai.' },
      { slug: 'it-act', title: 'Information Technology Act, 2000', category: 'Cyber Law', overview: 'Cyber crime, online fraud aur digital compliance ka main law.' },
      { slug: 'labour-laws', title: 'Labour Laws in India', category: 'Employment Law', overview: 'Wages, social security, workplace rights aur labour relations cover karta hai.' },
      { slug: 'property-rent-laws', title: 'Property & Rent Laws', category: 'Property Law', overview: 'Property registration, rent rights, RERA aur tenancy disputes ke rules.' },
    ],
  },
};

export default function LegalKnowledgePage() {
  const { t, language } = useLanguage();
  const [laws, setLaws] = useState(byLang.en.laws);

  useEffect(() => {
    if (language !== 'en') {
      setLaws(byLang[language]?.laws || byLang.en.laws);
      return;
    }
    fetch(`${API}/laws`)
      .then((r) => r.json())
      .then((data) => {
        if (data.length) setLaws(data);
        else setLaws(byLang.en.laws);
      })
      .catch(() => setLaws(byLang.en.laws));
  }, [language]);

  const localizedLaws = useMemo(() => {
    if (language === 'en') return laws;
    const map = new Map((byLang[language]?.laws || []).map((l) => [l.slug, l]));
    return laws.map((law) => map.get(law.slug) || law);
  }, [laws, language]);

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>{t('pages.legalKnowledgeTitle')}</h1>
        <p>{t('pages.legalKnowledgeDesc')}</p>
      </div>

      <div style={{ background: 'var(--primary-bg)', borderRadius: 16, padding: '20px 24px', marginBottom: 32, border: '1px solid rgba(37, 99, 235, 0.15)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <p style={{ fontSize: 13, color: 'var(--primary)', lineHeight: 1.6 }}>
          <strong>{t('pages.legalKnowledgeTip')}</strong> {t('pages.legalKnowledgeTipText')}
        </p>
      </div>

      <div className="grid-2">
        {localizedLaws.map((law, i) => (
          <Link key={law.slug} to={`/legal-knowledge/${law.slug}`} className="card card-clickable fade-up" style={{ textDecoration: 'none', animationDelay: `${i * 0.06}s`, display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: 12 }}>
              <span className="badge badge-primary">{law.category}</span>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>{law.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>{law.overview?.substring(0, 150)}...</p>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>{t('pages.readFullDetails')}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
