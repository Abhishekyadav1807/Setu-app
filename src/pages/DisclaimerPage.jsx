import { useLanguage } from '../context/LanguageContext';

const content = {
  en: {
    top: 'Please read this disclaimer carefully before using the SETU platform.',
    sections: [
      { title: '1. General Information Only', body: 'This platform provides legal information for education and awareness. It is not legal advice.' },
      { title: '2. Professional Advice', body: 'Always consult a qualified lawyer for case-specific advice.' },
      { title: '3. Accuracy', body: 'We try to keep information updated, but legal rules can change. Verify with official sources.' },
      { title: '4. Document Generator', body: 'Generated documents are reference drafts. Review before official submission.' },
      { title: '5. Liability', body: 'SETU creators are not liable for decisions taken based on this platform content.' },
    ],
    last: 'Last Updated: April 2026 | SETU – Legal Awareness & Document Assistance Platform',
  },
  hi: {
    top: 'SETU प्लेटफ़ॉर्म का उपयोग करने से पहले कृपया इस अस्वीकरण को ध्यान से पढ़ें।',
    sections: [
      { title: '1. केवल सामान्य जानकारी', body: 'यह प्लेटफ़ॉर्म कानूनी जानकारी केवल शिक्षा और जागरूकता के लिए देता है। यह कानूनी सलाह नहीं है।' },
      { title: '2. पेशेवर सलाह आवश्यक', body: 'अपने विशेष मामले के लिए योग्य वकील से सलाह अवश्य लें।' },
      { title: '3. शुद्धता और अपडेट', body: 'हम जानकारी अपडेट रखने का प्रयास करते हैं, लेकिन कानून बदल सकते हैं। आधिकारिक स्रोत से सत्यापित करें।' },
      { title: '4. दस्तावेज़ जनरेटर', body: 'जनरेट किए गए दस्तावेज़ केवल रेफरेंस ड्राफ्ट हैं। आधिकारिक उपयोग से पहले समीक्षा करें।' },
      { title: '5. दायित्व सीमा', body: 'प्लेटफ़ॉर्म की जानकारी के आधार पर लिए गए निर्णयों के लिए SETU टीम उत्तरदायी नहीं होगी।' },
    ],
    last: 'अंतिम अपडेट: अप्रैल 2026 | SETU – कानूनी जागरूकता एवं दस्तावेज़ सहायता प्लेटफ़ॉर्म',
  },
};

export default function DisclaimerPage() {
  const { t, language } = useLanguage();
  const c = content[language] || content.en;
  return (
    <div className="page-container fade-in" style={{ maxWidth: 800 }}>
      <div className="page-header">
        <h1>{t('pages.disclaimerTitle')}</h1>
        <p>{t('pages.disclaimerSubtitle')}</p>
      </div>

      <div style={{ background: 'var(--accent-bg)', borderRadius: 16, padding: '20px 24px', marginBottom: 32, border: '1px solid rgba(217, 119, 6, 0.2)' }}>
        <p style={{ fontSize: 14, color: '#92400E', fontWeight: 600 }}>{c.top}</p>
      </div>

      {c.sections.map((section, i) => (
        <section key={i} style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: 'var(--text)' }}>{section.title}</h2>
          <div className="card">
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{section.body}</p>
          </div>
        </section>
      ))}

      <div style={{ textAlign: 'center', padding: '24px', borderTop: '1px solid var(--border)', marginTop: 20 }}>
        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.last}</p>
      </div>
    </div>
  );
}
