import { useState, useEffect } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fallbackSchemes = [
  { name: 'Ayushman Bharat - PMJAY', slug: 'ayushman-bharat', category: 'Health', eligibility: 'BPL families, SECC listed', benefits: '₹5 lakh health cover/year', requiredDocuments: ['Aadhaar Card', 'Ration Card', 'SECC Family ID'], officialWebsite: 'https://pmjay.gov.in', description: 'World\'s largest health assurance scheme covering 55 crore beneficiaries.' },
  { name: 'PM Awas Yojana (PMAY)', slug: 'pm-awas-yojana', category: 'Housing', eligibility: 'EWS/LIG/MIG families', benefits: 'Subsidy up to ₹2.67 lakh', requiredDocuments: ['Aadhaar Card', 'Income Certificate', 'Property Documents'], officialWebsite: 'https://pmaymis.gov.in', description: 'Housing for All scheme with credit-linked subsidy.' },
  { name: 'PM Kisan Samman Nidhi', slug: 'pm-kisan', category: 'Agriculture', eligibility: 'Small & marginal farmers', benefits: '₹6,000/year in 3 installments', requiredDocuments: ['Aadhaar Card', 'Land Records', 'Bank Account'], officialWebsite: 'https://pmkisan.gov.in', description: 'Direct income support to farmers.' },
  { name: 'Stand-Up India', slug: 'stand-up-india', category: 'Business', eligibility: 'SC/ST/Women entrepreneurs', benefits: 'Loan ₹10L to ₹1Cr', requiredDocuments: ['ID Proof', 'Business Plan', 'Caste Certificate'], officialWebsite: 'https://www.standupmitra.in', description: 'Bank loans for SC/ST and women entrepreneurs.' },
  { name: 'NALSA Free Legal Aid', slug: 'nalsa', category: 'Legal', eligibility: 'SC/ST, women, disabled, poor', benefits: 'Free lawyer & court fees', requiredDocuments: ['ID Proof', 'Income Certificate'], officialWebsite: 'https://nalsa.gov.in', description: 'Free legal aid for marginalized sections.' },
  { name: 'PM Fasal Bima Yojana', slug: 'pm-fasal-bima', category: 'Insurance', eligibility: 'All farmers', benefits: 'Crop insurance at 2% premium', requiredDocuments: ['Aadhaar', 'Land Records', 'Bank Account'], officialWebsite: 'https://pmfby.gov.in', description: 'Comprehensive crop insurance scheme.' },
  { name: 'Sukanya Samriddhi Yojana', slug: 'sukanya', category: 'Savings', eligibility: 'Girl child below 10 yrs', benefits: '8.2% interest, tax-free', requiredDocuments: ['Birth Certificate', 'Parent ID'], officialWebsite: 'https://www.india.gov.in/sukanya-samriddhi-yojna', description: 'Savings scheme for the girl child.' },
  { name: 'PM Mudra Yojana', slug: 'pm-mudra', category: 'Business', eligibility: 'Non-farm small enterprises', benefits: 'Loan up to ₹10 lakh', requiredDocuments: ['ID Proof', 'Business Plan'], officialWebsite: 'https://www.mudra.org.in', description: 'Micro-credit for small businesses.' },
  { name: 'Digital India', slug: 'digital-india', category: 'Technology', eligibility: 'All citizens', benefits: 'Digital literacy & services', requiredDocuments: ['Aadhaar Card'], officialWebsite: 'https://digitalindia.gov.in', description: 'Digital empowerment of citizens.' },
  { name: 'Beti Bachao Beti Padhao', slug: 'beti-bachao', category: 'Women & Child', eligibility: 'Girl children', benefits: 'Education & welfare support', requiredDocuments: ['Birth Certificate'], officialWebsite: 'https://wcd.nic.in/bbbp-schemes', description: 'Campaign for girl child education.' },
  { name: 'PM Vishwakarma', slug: 'pm-vishwakarma', category: 'Artisans', eligibility: 'Traditional artisans', benefits: '₹3L loan, skill training', requiredDocuments: ['Aadhaar', 'Proof of Craft Work'], officialWebsite: 'https://pmvishwakarma.gov.in', description: 'Support for traditional artisans.' },
  { name: 'Atal Pension Yojana', slug: 'atal-pension', category: 'Pension', eligibility: '18-40 years, unorganized', benefits: '₹1-5K monthly pension', requiredDocuments: ['Aadhaar', 'Bank Account'], officialWebsite: 'https://www.npscra.nsdl.co.in/', description: 'Pension for unorganized workers.' },
  { name: 'PM Ujjwala Yojana', slug: 'pm-ujjwala', category: 'Energy', eligibility: 'BPL households', benefits: 'Free LPG connection', requiredDocuments: ['Aadhaar', 'BPL Card'], officialWebsite: 'https://www.pmuy.gov.in', description: 'Clean cooking fuel for BPL families.' },
  { name: 'Startup India', slug: 'startup-india', category: 'Business', eligibility: 'DPIIT recognized startups', benefits: 'Tax exemption, funding access', requiredDocuments: ['Certificate of Incorporation', 'Business Plan'], officialWebsite: 'https://www.startupindia.gov.in', description: 'Government support for startups.' },
  { name: 'PM SVANidhi', slug: 'pm-svanidhi', category: 'Business', eligibility: 'Street vendors', benefits: '₹10K-50K micro-credit', requiredDocuments: ['Aadhaar', 'Vending Certificate'], officialWebsite: 'https://pmsvanidhi.mohua.gov.in', description: 'Micro-credit for street vendors.' },
];

export default function SchemesPage() {
  const [schemes, setSchemes] = useState(fallbackSchemes);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [expandedScheme, setExpandedScheme] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/schemes`)
      .then(r => r.json())
      .then(data => { if (data.length) setSchemes(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(schemes.map(s => s.category))];

  const filtered = schemes.filter(s =>
    (selectedCat === 'All' || s.category === selectedCat) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) ||
     s.eligibility.toLowerCase().includes(search.toLowerCase()) ||
     s.benefits.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>Government Scheme Explorer</h1>
        <p>
          Search and explore Indian government schemes. Check eligibility, 
          benefits, required documents, and access official websites.
        </p>
      </div>

      {/* Search */}
      <div className="search-container" style={{ marginBottom: 16 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search schemes by name, eligibility, or benefits..."
        />
      </div>

      {/* Category Pills */}
      <div className="category-pills">
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCat(cat)}
            className={`category-pill ${selectedCat === cat ? 'active' : ''}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
        Showing {filtered.length} scheme{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Schemes Grid */}
      <div className="grid-3">
        {filtered.map((scheme, i) => (
          <div key={i} className="card fade-up" style={{
            animationDelay: `${i * 0.03}s`,
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ marginBottom: 12 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{scheme.name}</h3>
              <span className="badge badge-primary">{scheme.category}</span>
            </div>

            {scheme.description && (
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10, lineHeight: 1.5 }}>
                {scheme.description}
              </p>
            )}

            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
              <strong style={{ color: 'var(--text)' }}>Eligibility:</strong> {scheme.eligibility}
            </div>

            <div style={{
              fontSize: 14, color: 'var(--secondary)', fontWeight: 700,
              marginBottom: 12, padding: '8px 12px', background: 'var(--secondary-bg)',
              borderRadius: 8,
            }}>
              {scheme.benefits}
            </div>

            {/* Expand Toggle */}
            <button onClick={() => setExpandedScheme(expandedScheme === i ? null : i)} style={{
              background: 'none', border: 'none', color: 'var(--primary)',
              fontSize: 12, fontWeight: 600, textAlign: 'left', padding: '4px 0',
              marginBottom: 8,
            }}>
              {expandedScheme === i ? '▲ Hide Details' : '▼ Required Documents'}
            </button>

            {expandedScheme === i && scheme.requiredDocuments?.length > 0 && (
              <div className="fade-in" style={{
                background: 'var(--bg-alt)', borderRadius: 10, padding: 14, marginBottom: 12,
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase' }}>
                  Required Documents
                </div>
                {scheme.requiredDocuments.map((doc, j) => (
                  <div key={j} style={{ fontSize: 12, color: 'var(--text-secondary)', padding: '3px 0', display: 'flex', gap: 6 }}>
                    <span style={{ color: 'var(--primary)' }}>✓</span> {doc}
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: 'auto' }}>
              {scheme.officialWebsite && (
                <a href={scheme.officialWebsite} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{
                  width: '100%', justifyContent: 'center', fontSize: 13, padding: '9px 16px',
                }}>
                  Visit Official Website
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 20, marginBottom: 12, color: 'var(--text-muted)' }}>No results</div>
          <h3 style={{ marginBottom: 4 }}>No schemes found</h3>
          <p style={{ fontSize: 13 }}>Try a different search term or category</p>
        </div>
      )}
    </div>
  );
}
