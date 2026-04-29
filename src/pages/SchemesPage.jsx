import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fallbackSchemes = [
  { name: 'Ayushman Bharat - PMJAY', category: 'Health', eligibility: 'BPL families', benefits: 'Health cover up to 5 lakh', requiredDocuments: ['Aadhaar', 'Ration Card'], officialWebsite: 'https://pmjay.gov.in' },
  { name: 'PM Awas Yojana', category: 'Housing', eligibility: 'EWS/LIG/MIG families', benefits: 'Subsidy support', requiredDocuments: ['Aadhaar', 'Income Certificate'], officialWebsite: 'https://pmaymis.gov.in' },
  { name: 'PM Kisan Samman Nidhi', category: 'Agriculture', eligibility: 'Small farmers', benefits: 'Income support', requiredDocuments: ['Aadhaar', 'Land Records'], officialWebsite: 'https://pmkisan.gov.in' },
  { name: 'NALSA Free Legal Aid', category: 'Legal', eligibility: 'Eligible citizens', benefits: 'Free legal aid', requiredDocuments: ['ID Proof'], officialWebsite: 'https://nalsa.gov.in' },
  { name: 'PM Mudra Yojana', category: 'Business', eligibility: 'Small businesses', benefits: 'Micro loan support', requiredDocuments: ['ID Proof', 'Business details'], officialWebsite: 'https://www.mudra.org.in' },
];

export default function SchemesPage() {
  const { t } = useLanguage();
  const [schemes, setSchemes] = useState(fallbackSchemes);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState(t('pages.all'));
  const [expandedScheme, setExpandedScheme] = useState(null);

  useEffect(() => {
    setSelectedCat(t('pages.all'));
  }, [t]);

  useEffect(() => {
    fetch(`${API}/schemes`)
      .then((r) => r.json())
      .then((data) => {
        if (data.length) setSchemes(data);
      })
      .catch(() => {});
  }, []);

  const categories = [t('pages.all'), ...new Set(schemes.map((s) => s.category))];

  const filtered = schemes.filter(
    (s) =>
      (selectedCat === t('pages.all') || s.category === selectedCat) &&
      (s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.eligibility.toLowerCase().includes(search.toLowerCase()) ||
        s.benefits.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>{t('pages.schemesTitle')}</h1>
        <p>{t('pages.schemesDesc')}</p>
      </div>

      <div className="search-container" style={{ marginBottom: 16 }}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('pages.schemesSearchPlaceholder')} />
      </div>

      <div className="category-pills">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setSelectedCat(cat)} className={`category-pill ${selectedCat === cat ? 'active' : ''}`}>
            {cat}
          </button>
        ))}
      </div>

      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
        {t('pages.showing')} {filtered.length} {t('pages.schemes')}
      </p>

      <div className="grid-3">
        {filtered.map((scheme, i) => (
          <div key={i} className="card fade-up" style={{ animationDelay: `${i * 0.03}s`, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{scheme.name}</h3>
            <span className="badge badge-primary" style={{ marginBottom: 10 }}>{scheme.category}</span>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
              <strong>{t('pages.eligibility')}</strong> {scheme.eligibility}
            </div>
            <div style={{ fontSize: 14, color: 'var(--secondary)', fontWeight: 700, marginBottom: 12, padding: '8px 12px', background: 'var(--secondary-bg)', borderRadius: 8 }}>
              {scheme.benefits}
            </div>
            <button onClick={() => setExpandedScheme(expandedScheme === i ? null : i)} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: 12, fontWeight: 600, textAlign: 'left', padding: '4px 0', marginBottom: 8 }}>
              {expandedScheme === i ? t('pages.hideDetails') : t('pages.showDetails')}
            </button>
            {expandedScheme === i && scheme.requiredDocuments?.length > 0 && (
              <div className="fade-in" style={{ background: 'var(--bg-alt)', borderRadius: 10, padding: 14, marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase' }}>
                  {t('pages.requiredDocuments')}
                </div>
                {scheme.requiredDocuments.map((doc, j) => (
                  <div key={j} style={{ fontSize: 12, color: 'var(--text-secondary)', padding: '3px 0' }}>
                    • {doc}
                  </div>
                ))}
              </div>
            )}
            {scheme.officialWebsite && (
              <a href={scheme.officialWebsite} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: 13, padding: '9px 16px', marginTop: 'auto' }}>
                {t('pages.visitOfficial')}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

