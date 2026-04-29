import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const byLang = {
  en: [
    { slug: 'fir-filing', title: 'FIR Filing', purpose: 'Learn how to file a First Information Report at any police station.', timeline: 'Immediate' },
    { slug: 'rti-application', title: 'RTI Application', purpose: 'Apply for information from any government department.', timeline: '30 days' },
    { slug: 'consumer-complaint', title: 'Consumer Complaint', purpose: 'File complaints against defective goods or deficient services.', timeline: '3-5 months' },
    { slug: 'marriage-registration', title: 'Marriage Registration', purpose: 'Register your marriage for legal recognition.', timeline: '1-30 days' },
    { slug: 'passport-application', title: 'Passport Application', purpose: 'Apply for an Indian passport through Passport Seva.', timeline: '30-45 days' },
  ],
  hi: [
    { slug: 'fir-filing', title: 'एफआईआर दर्ज करना', purpose: 'किसी भी पुलिस स्टेशन में FIR दर्ज करने की पूरी प्रक्रिया जानें।', timeline: 'तुरंत' },
    { slug: 'rti-application', title: 'आरटीआई आवेदन', purpose: 'सरकारी विभागों से सूचना प्राप्त करने के लिए आवेदन करें।', timeline: '30 दिन' },
    { slug: 'consumer-complaint', title: 'उपभोक्ता शिकायत', purpose: 'खराब सामान या सेवा के खिलाफ शिकायत दर्ज करें।', timeline: '3-5 महीने' },
    { slug: 'marriage-registration', title: 'विवाह पंजीकरण', purpose: 'कानूनी मान्यता के लिए विवाह पंजीकरण प्रक्रिया।', timeline: '1-30 दिन' },
    { slug: 'passport-application', title: 'पासपोर्ट आवेदन', purpose: 'पासपोर्ट सेवा पोर्टल से भारतीय पासपोर्ट के लिए आवेदन करें।', timeline: '30-45 दिन' },
  ],
  bho: [
    { slug: 'fir-filing', title: 'एफआईआर दर्ज करावल', purpose: 'कवनो पुलिस स्टेशन पर FIR कइसे दर्ज करीं, ई जानीं।', timeline: 'तुरंते' },
    { slug: 'rti-application', title: 'आरटीआई आवेदन', purpose: 'सरकारी विभाग से जानकारी मांगे खातिर आवेदन करीं।', timeline: '30 दिन' },
    { slug: 'consumer-complaint', title: 'उपभोक्ता शिकायत', purpose: 'खराब सामान या सेवा के खिलाफ शिकायत दर्ज करीं।', timeline: '3-5 महीना' },
    { slug: 'marriage-registration', title: 'विवाह रजिस्ट्रेशन', purpose: 'कानूनी मान्यता खातिर शादी रजिस्टर कराईं।', timeline: '1-30 दिन' },
    { slug: 'passport-application', title: 'पासपोर्ट आवेदन', purpose: 'पासपोर्ट सेवा से भारतीय पासपोर्ट खातिर आवेदन करीं।', timeline: '30-45 दिन' },
  ],
  bn: [
    { slug: 'fir-filing', title: 'এফআইআর দায়ের', purpose: 'যেকোনো থানায় FIR দায়ের করার প্রক্রিয়া জানুন।', timeline: 'তাৎক্ষণিক' },
    { slug: 'rti-application', title: 'আরটিআই আবেদন', purpose: 'সরকারি দপ্তর থেকে তথ্য পেতে RTI আবেদন করুন।', timeline: '30 দিন' },
    { slug: 'consumer-complaint', title: 'ভোক্তা অভিযোগ', purpose: 'ত্রুটিপূর্ণ পণ্য বা পরিষেবার বিরুদ্ধে অভিযোগ করুন।', timeline: '3-5 মাস' },
    { slug: 'marriage-registration', title: 'বিবাহ নিবন্ধন', purpose: 'আইনি স্বীকৃতির জন্য বিয়ে নিবন্ধন করুন।', timeline: '1-30 দিন' },
    { slug: 'passport-application', title: 'পাসপোর্ট আবেদন', purpose: 'পাসপোর্ট সেবা পোর্টালের মাধ্যমে আবেদন করুন।', timeline: '30-45 দিন' },
  ],
  hinglish: [
    { slug: 'fir-filing', title: 'FIR Filing', purpose: 'Kisi bhi police station me FIR file karne ka process samjho.', timeline: 'Immediate' },
    { slug: 'rti-application', title: 'RTI Application', purpose: 'Govt department se info lene ke liye RTI apply karo.', timeline: '30 days' },
    { slug: 'consumer-complaint', title: 'Consumer Complaint', purpose: 'Defective goods/services ke against complaint file karo.', timeline: '3-5 months' },
    { slug: 'marriage-registration', title: 'Marriage Registration', purpose: 'Legal recognition ke liye marriage register karao.', timeline: '1-30 days' },
    { slug: 'passport-application', title: 'Passport Application', purpose: 'Passport Seva portal se passport apply karo.', timeline: '30-45 days' },
  ],
};

export default function LegalProceduresPage() {
  const { t, language } = useLanguage();
  const [procedures, setProcedures] = useState(byLang.en);

  useEffect(() => {
    if (language !== 'en') {
      setProcedures(byLang[language] || byLang.en);
      return;
    }
    fetch(`${API}/procedures`)
      .then((r) => r.json())
      .then((data) => {
        if (data.length) setProcedures(data);
        else setProcedures(byLang.en);
      })
      .catch(() => setProcedures(byLang.en));
  }, [language]);

  const localizedProcedures = useMemo(() => {
    if (language === 'en') return procedures;
    const map = new Map((byLang[language] || []).map((p) => [p.slug, p]));
    return procedures.map((p) => map.get(p.slug) || p);
  }, [procedures, language]);

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>{t('pages.legalProceduresTitle')}</h1>
        <p>{t('pages.legalProceduresDesc')}</p>
      </div>

      <div style={{ background: 'var(--secondary-bg)', borderRadius: 16, padding: '20px 24px', marginBottom: 32, border: '1px solid rgba(5, 150, 105, 0.15)' }}>
        <p style={{ fontSize: 13, color: 'var(--secondary)', lineHeight: 1.6 }}>
          <strong>{t('pages.legalProceduresNote')}</strong> {t('pages.legalProceduresNoteText')}
        </p>
      </div>

      <div className="grid-2">
        {localizedProcedures.map((proc, i) => (
          <Link key={proc.slug} to={`/legal-procedures/${proc.slug}`} className="card card-clickable fade-up" style={{ textDecoration: 'none', animationDelay: `${i * 0.06}s` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              {proc.timeline && <span className="badge badge-secondary">{proc.timeline}</span>}
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>{proc.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{proc.purpose?.substring(0, 120)}...</p>
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border)', fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>
              {t('pages.viewCompleteGuide')}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
