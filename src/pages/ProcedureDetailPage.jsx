import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const labels = {
  en: { back: '<- Back to Legal Procedures', purpose: 'Purpose', fees: 'Fees', timeline: 'Timeline', site: 'Official Website', req: 'Required Documents', steps: 'Step-by-Step Process', tips: 'Important Tips', notFound: 'Procedure not found' },
  hi: { back: '<- कानूनी प्रक्रियाओं पर वापस', purpose: 'उद्देश्य', fees: 'शुल्क', timeline: 'समयसीमा', site: 'आधिकारिक वेबसाइट', req: 'आवश्यक दस्तावेज़', steps: 'चरण-दर-चरण प्रक्रिया', tips: 'महत्वपूर्ण सुझाव', notFound: 'प्रक्रिया नहीं मिली' },
  bho: { back: '<- कानूनी प्रक्रिया पर वापस', purpose: 'उद्देश्य', fees: 'शुल्क', timeline: 'समय', site: 'आधिकारिक वेबसाइट', req: 'जरूरी दस्तावेज', steps: 'स्टेप-बाय-स्टेप प्रक्रिया', tips: 'महत्वपूर्ण सुझाव', notFound: 'प्रक्रिया ना मिलल' },
  bn: { back: '<- আইনি প্রক্রিয়ায় ফিরে যান', purpose: 'উদ্দেশ্য', fees: 'ফি', timeline: 'সময়সীমা', site: 'অফিসিয়াল ওয়েবসাইট', req: 'প্রয়োজনীয় ডকুমেন্ট', steps: 'ধাপে ধাপে প্রক্রিয়া', tips: 'গুরুত্বপূর্ণ টিপস', notFound: 'প্রক্রিয়া পাওয়া যায়নি' },
  hinglish: { back: '<- Back to Legal Procedures', purpose: 'Purpose', fees: 'Fees', timeline: 'Timeline', site: 'Official Website', req: 'Required Documents', steps: 'Step-by-Step Process', tips: 'Important Tips', notFound: 'Procedure nahi mila' },
};

const proceduresByLang = {
  en: {
    'fir-filing': { title: 'FIR Filing', purpose: 'Register a First Information Report for cognizable offences.', requiredDocuments: ['ID proof', 'Written complaint'], steps: [{ stepNumber: 1, title: 'Visit Police Station', description: 'Go to nearest police station and report incident.' }], fees: 'Free', timeline: 'Immediate', officialLink: 'https://digitalpolice.gov.in/', tips: ['Ask for FIR copy.'] },
    'rti-application': { title: 'RTI Application', purpose: 'Seek information from public authority under RTI Act.', requiredDocuments: ['Application', 'Fee'], steps: [{ stepNumber: 1, title: 'Draft RTI', description: 'Write clear questions addressed to PIO.' }], fees: '₹10', timeline: '30 days', officialLink: 'https://rtionline.gov.in/', tips: ['Keep acknowledgement.'] },
    'consumer-complaint': { title: 'Consumer Complaint', purpose: 'File complaint for defective goods or services.', requiredDocuments: ['Bill', 'ID proof'], steps: [{ stepNumber: 1, title: 'Gather Proof', description: 'Collect invoice and communication record.' }], fees: 'As per claim', timeline: '3-5 months', officialLink: 'https://edaakhil.nic.in/', tips: ['File within limitation period.'] },
    'marriage-registration': { title: 'Marriage Registration', purpose: 'Get legal recognition for marriage.', requiredDocuments: ['Age proof', 'Address proof'], steps: [{ stepNumber: 1, title: 'Apply', description: 'Submit form with required documents.' }], fees: 'State wise', timeline: '1-30 days', officialLink: 'https://www.india.gov.in/topics/law-justice/marriage', tips: ['Carry originals.'] },
    'passport-application': { title: 'Passport Application', purpose: 'Apply for passport through Passport Seva.', requiredDocuments: ['Aadhaar', 'Address proof'], steps: [{ stepNumber: 1, title: 'Register Online', description: 'Create account and fill passport form.' }], fees: '₹1500+', timeline: '30-45 days', officialLink: 'https://www.passportindia.gov.in/', tips: ['Book appointment early.'] },
  },
  hi: {
    'fir-filing': { title: 'एफआईआर दर्ज करना', purpose: 'संज्ञेय अपराध के लिए प्रथम सूचना रिपोर्ट दर्ज करें।', requiredDocuments: ['पहचान पत्र', 'लिखित शिकायत'], steps: [{ stepNumber: 1, title: 'थाने जाएँ', description: 'नजदीकी थाने में घटना की जानकारी दें।' }], fees: 'निःशुल्क', timeline: 'तुरंत', officialLink: 'https://digitalpolice.gov.in/', tips: ['FIR की प्रति जरूर लें।'] },
    'rti-application': { title: 'आरटीआई आवेदन', purpose: 'RTI अधिनियम के तहत सरकारी विभाग से जानकारी मांगें।', requiredDocuments: ['आवेदन पत्र', 'शुल्क'], steps: [{ stepNumber: 1, title: 'RTI ड्राफ्ट करें', description: 'PIO को स्पष्ट प्रश्न लिखकर आवेदन करें।' }], fees: '₹10', timeline: '30 दिन', officialLink: 'https://rtionline.gov.in/', tips: ['रसीद संभालकर रखें।'] },
    'consumer-complaint': { title: 'उपभोक्ता शिकायत', purpose: 'खराब वस्तु या सेवा के खिलाफ शिकायत दर्ज करें।', requiredDocuments: ['बिल', 'पहचान पत्र'], steps: [{ stepNumber: 1, title: 'सबूत जुटाएँ', description: 'इनवॉइस और बातचीत के रिकॉर्ड रखें।' }], fees: 'दावे के अनुसार', timeline: '3-5 महीने', officialLink: 'https://edaakhil.nic.in/', tips: ['समयसीमा के भीतर शिकायत करें।'] },
    'marriage-registration': { title: 'विवाह पंजीकरण', purpose: 'विवाह को कानूनी मान्यता दिलाने हेतु पंजीकरण करें।', requiredDocuments: ['आयु प्रमाण', 'पता प्रमाण'], steps: [{ stepNumber: 1, title: 'आवेदन करें', description: 'आवश्यक दस्तावेज़ों के साथ आवेदन जमा करें।' }], fees: 'राज्य अनुसार', timeline: '1-30 दिन', officialLink: 'https://www.india.gov.in/topics/law-justice/marriage', tips: ['मूल दस्तावेज साथ रखें।'] },
    'passport-application': { title: 'पासपोर्ट आवेदन', purpose: 'पासपोर्ट सेवा के माध्यम से पासपोर्ट के लिए आवेदन करें।', requiredDocuments: ['आधार', 'पता प्रमाण'], steps: [{ stepNumber: 1, title: 'ऑनलाइन रजिस्टर करें', description: 'अकाउंट बनाकर पासपोर्ट फॉर्म भरें।' }], fees: '₹1500+', timeline: '30-45 दिन', officialLink: 'https://www.passportindia.gov.in/', tips: ['अपॉइंटमेंट जल्दी बुक करें।'] },
  },
  bho: {
    'fir-filing': { title: 'एफआईआर दर्ज करावल', purpose: 'संज्ञेय अपराध खातिर FIR दर्ज करीं।', requiredDocuments: ['पहचान पत्र', 'लिखित शिकायत'], steps: [{ stepNumber: 1, title: 'थाना जाएं', description: 'नजदीकी थाना पर घटना बताईं।' }], fees: 'मुफ्त', timeline: 'तुरंते', officialLink: 'https://digitalpolice.gov.in/', tips: ['FIR कॉपी ले लीं।'] },
    'rti-application': { title: 'आरटीआई आवेदन', purpose: 'सरकारी विभाग से जानकारी खातिर RTI लगाईं।', requiredDocuments: ['आवेदन', 'शुल्क'], steps: [{ stepNumber: 1, title: 'RTI लिखीं', description: 'PIO खातिर साफ सवाल लिखीं।' }], fees: '₹10', timeline: '30 दिन', officialLink: 'https://rtionline.gov.in/', tips: ['रसीद संभाल के राखीं।'] },
    'consumer-complaint': { title: 'उपभोक्ता शिकायत', purpose: 'खराब सामान/सेवा पर शिकायत दर्ज करीं।', requiredDocuments: ['बिल', 'पहचान पत्र'], steps: [{ stepNumber: 1, title: 'सबूत जुटाईं', description: 'इनवॉइस आ बातचीत रिकॉर्ड रखीं।' }], fees: 'दावा अनुसार', timeline: '3-5 महीना', officialLink: 'https://edaakhil.nic.in/', tips: ['समय से शिकायत करीं।'] },
    'marriage-registration': { title: 'विवाह रजिस्ट्रेशन', purpose: 'शादी के कानूनी मान्यता खातिर रजिस्ट्रेशन करीं।', requiredDocuments: ['उम्र प्रमाण', 'पता प्रमाण'], steps: [{ stepNumber: 1, title: 'आवेदन करीं', description: 'दस्तावेज संग फॉर्म जमा करीं।' }], fees: 'राज्य अनुसार', timeline: '1-30 दिन', officialLink: 'https://www.india.gov.in/topics/law-justice/marriage', tips: ['ओरिजिनल कागज साथ राखीं।'] },
    'passport-application': { title: 'पासपोर्ट आवेदन', purpose: 'पासपोर्ट सेवा से पासपोर्ट खातिर आवेदन करीं।', requiredDocuments: ['आधार', 'पता प्रमाण'], steps: [{ stepNumber: 1, title: 'ऑनलाइन रजिस्टर करीं', description: 'अकाउंट बनाके फॉर्म भरल जाला।' }], fees: '₹1500+', timeline: '30-45 दिन', officialLink: 'https://www.passportindia.gov.in/', tips: ['अपॉइंटमेंट जल्दी बुक करीं।'] },
  },
  bn: {
    'fir-filing': { title: 'এফআইআর দায়ের', purpose: 'সজ্ঞেয় অপরাধের জন্য FIR দায়ের করুন।', requiredDocuments: ['আইডি প্রুফ', 'লিখিত অভিযোগ'], steps: [{ stepNumber: 1, title: 'থানায় যান', description: 'নিকটবর্তী থানায় গিয়ে অভিযোগ জানান।' }], fees: 'ফ্রি', timeline: 'তাৎক্ষণিক', officialLink: 'https://digitalpolice.gov.in/', tips: ['FIR কপি সংগ্রহ করুন।'] },
    'rti-application': { title: 'আরটিআই আবেদন', purpose: 'সরকারি দপ্তর থেকে তথ্যের জন্য RTI করুন।', requiredDocuments: ['আবেদনপত্র', 'ফি'], steps: [{ stepNumber: 1, title: 'RTI খসড়া করুন', description: 'PIO-কে পরিষ্কার প্রশ্ন লিখুন।' }], fees: '₹10', timeline: '30 দিন', officialLink: 'https://rtionline.gov.in/', tips: ['রসিদ সংরক্ষণ করুন।'] },
    'consumer-complaint': { title: 'ভোক্তা অভিযোগ', purpose: 'ত্রুটিপূর্ণ পণ্য/সেবার বিরুদ্ধে অভিযোগ করুন।', requiredDocuments: ['বিল', 'আইডি প্রুফ'], steps: [{ stepNumber: 1, title: 'প্রমাণ সংগ্রহ', description: 'ইনভয়েস ও যোগাযোগের রেকর্ড রাখুন।' }], fees: 'দাবি অনুযায়ী', timeline: '3-5 মাস', officialLink: 'https://edaakhil.nic.in/', tips: ['সময়ের মধ্যে অভিযোগ করুন।'] },
    'marriage-registration': { title: 'বিবাহ নিবন্ধন', purpose: 'বিয়ে আইনি স্বীকৃতির জন্য নিবন্ধন করুন।', requiredDocuments: ['বয়সের প্রমাণ', 'ঠিকানার প্রমাণ'], steps: [{ stepNumber: 1, title: 'আবেদন করুন', description: 'প্রয়োজনীয় নথি সহ ফর্ম জমা দিন।' }], fees: 'রাজ্যভেদে', timeline: '1-30 দিন', officialLink: 'https://www.india.gov.in/topics/law-justice/marriage', tips: ['অরিজিনাল নথি সঙ্গে নিন।'] },
    'passport-application': { title: 'পাসপোর্ট আবেদন', purpose: 'পাসপোর্ট সেবার মাধ্যমে পাসপোর্টের জন্য আবেদন করুন।', requiredDocuments: ['আধার', 'ঠিকানার প্রমাণ'], steps: [{ stepNumber: 1, title: 'অনলাইনে রেজিস্টার করুন', description: 'অ্যাকাউন্ট তৈরি করে ফর্ম পূরণ করুন।' }], fees: '₹1500+', timeline: '30-45 দিন', officialLink: 'https://www.passportindia.gov.in/', tips: ['অ্যাপয়েন্টমেন্ট আগে বুক করুন।'] },
  },
  hinglish: {
    'fir-filing': { title: 'FIR Filing', purpose: 'Cognizable offence ke liye FIR register karo.', requiredDocuments: ['ID proof', 'Written complaint'], steps: [{ stepNumber: 1, title: 'Police Station Jao', description: 'Nearest police station me incident report karo.' }], fees: 'Free', timeline: 'Immediate', officialLink: 'https://digitalpolice.gov.in/', tips: ['FIR copy zaroor lo.'] },
    'rti-application': { title: 'RTI Application', purpose: 'Public authority se information lene ke liye RTI file karo.', requiredDocuments: ['Application', 'Fee'], steps: [{ stepNumber: 1, title: 'RTI Draft karo', description: 'PIO ko clear questions bhejo.' }], fees: '₹10', timeline: '30 days', officialLink: 'https://rtionline.gov.in/', tips: ['Acknowledgement sambhal ke rakho.'] },
    'consumer-complaint': { title: 'Consumer Complaint', purpose: 'Defective goods/services ke against complaint file karo.', requiredDocuments: ['Bill', 'ID proof'], steps: [{ stepNumber: 1, title: 'Proof collect karo', description: 'Invoice aur communication record rakho.' }], fees: 'As per claim', timeline: '3-5 months', officialLink: 'https://edaakhil.nic.in/', tips: ['Limitation period ke andar file karo.'] },
    'marriage-registration': { title: 'Marriage Registration', purpose: 'Marriage ko legal recognition dene ke liye registration karo.', requiredDocuments: ['Age proof', 'Address proof'], steps: [{ stepNumber: 1, title: 'Apply karo', description: 'Required documents ke saath form submit karo.' }], fees: 'State wise', timeline: '1-30 days', officialLink: 'https://www.india.gov.in/topics/law-justice/marriage', tips: ['Original documents saath rakho.'] },
    'passport-application': { title: 'Passport Application', purpose: 'Passport Seva ke through passport apply karo.', requiredDocuments: ['Aadhaar', 'Address proof'], steps: [{ stepNumber: 1, title: 'Online Register karo', description: 'Account bana ke form fill karo.' }], fees: '₹1500+', timeline: '30-45 days', officialLink: 'https://www.passportindia.gov.in/', tips: ['Appointment early book karo.'] },
  },
};

export default function ProcedureDetailPage() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const [procedure, setProcedure] = useState(null);
  const [loading, setLoading] = useState(true);
  const L = labels[language] || labels.en;

  useEffect(() => {
    if (language !== 'en') {
      setProcedure((proceduresByLang[language] || proceduresByLang.en)[slug] || null);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`${API}/procedures/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data && data.title) setProcedure(data);
        else setProcedure((proceduresByLang.en)[slug] || null);
      })
      .catch(() => setProcedure((proceduresByLang.en)[slug] || null))
      .finally(() => setLoading(false));
  }, [slug, language]);

  if (loading) return <div className="page-container"><div className="skeleton skeleton-title" /></div>;
  if (!procedure) return <div className="page-container" style={{ textAlign: 'center', padding: '80px 24px' }}><h2>{L.notFound}</h2></div>;

  return (
    <div className="page-container fade-in" style={{ maxWidth: 900 }}>
      <Link to="/legal-procedures" className="back-btn">{L.back}</Link>
      <div style={{ background: 'linear-gradient(135deg, var(--secondary-bg), rgba(5,150,105,0.08))', borderRadius: 20, padding: '32px 28px', marginBottom: 32, border: '1px solid rgba(5,150,105,0.12)' }}>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 800 }}>{procedure.title}</h1>
      </div>

      <section style={{ marginBottom: 32 }}><h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{L.purpose}</h2><div className="card"><p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{procedure.purpose}</p></div></section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 32 }}>
        <div className="card"><div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>{L.fees}</div><div style={{ fontSize: 14, fontWeight: 700 }}>{procedure.fees}</div></div>
        <div className="card"><div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>{L.timeline}</div><div style={{ fontSize: 14, fontWeight: 700 }}>{procedure.timeline}</div></div>
        {procedure.officialLink && <a href={procedure.officialLink} target="_blank" rel="noopener noreferrer" className="card" style={{ textDecoration: 'none' }}><div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>{L.site}</div><div style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', wordBreak: 'break-all' }}>{procedure.officialLink}</div></a>}
      </div>

      {procedure.requiredDocuments?.length > 0 && <section style={{ marginBottom: 32 }}><h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{L.req}</h2><div className="card"><ul>{procedure.requiredDocuments.map((d, i) => <li key={i} style={{ marginBottom: 6 }}>{d}</li>)}</ul></div></section>}
      {procedure.steps?.length > 0 && <section style={{ marginBottom: 32 }}><h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{L.steps}</h2>{procedure.steps.map((s, i) => <div key={i} className="card" style={{ marginBottom: 10 }}><h4>{s.stepNumber}. {s.title}</h4><p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{s.description}</p></div>)}</section>}
      {procedure.tips?.length > 0 && <section style={{ marginBottom: 32 }}><h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{L.tips}</h2><div className="card"><ul>{procedure.tips.map((tip, i) => <li key={i} style={{ marginBottom: 6 }}>{tip}</li>)}</ul></div></section>}
    </div>
  );
}
