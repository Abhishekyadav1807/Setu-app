import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Fallback data so the page works even without backend
const fallbackLaws = {
  'constitution-basics': {
    title: 'Constitution of India – Basics', category: 'Constitutional Law',
    overview: 'The Constitution of India is the supreme law of India. Adopted on 26 November 1949 and effective from 26 January 1950, it establishes the framework for political principles, procedures, rights, and duties. It guarantees Fundamental Rights including Right to Equality, Right to Freedom, Right against Exploitation, Right to Freedom of Religion, Cultural and Educational Rights, and Right to Constitutional Remedies.',
    keySections: [
      { section: 'Part III (Articles 12-35)', title: 'Fundamental Rights', description: 'Guarantees six fundamental rights to all citizens including equality before law, freedom of speech, protection against exploitation, and right to constitutional remedies.' },
      { section: 'Article 21', title: 'Right to Life and Personal Liberty', description: 'No person shall be deprived of life or personal liberty except according to procedure established by law. Includes right to live with dignity, right to livelihood, health, education, clean environment, and privacy.' },
      { section: 'Article 32', title: 'Right to Constitutional Remedies', description: 'Citizens can directly approach the Supreme Court for enforcement of fundamental rights through writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo Warranto.' },
    ],
    examples: [
      { title: 'Right to Education', scenario: 'A poor family cannot afford school fees.', outcome: 'Under Article 21A, every child aged 6-14 has the right to free and compulsory education. 25% seats in private schools are reserved for EWS.' },
      { title: 'Right to Information', scenario: 'A citizen wants to know how government funds were spent.', outcome: 'Under RTI Act 2005, any citizen can seek information from any public authority by paying ₹10 fee.' },
    ],
    useCases: [
      { title: 'Filing PIL', description: 'Any citizen can file a PIL in High Court (Article 226) or Supreme Court (Article 32) for enforcement of fundamental rights.' },
      { title: 'Seeking Legal Aid', description: 'Article 39A provides for free legal aid. NALSA and state LSAs provide free lawyers and waive court fees.' },
    ],
    importantLinks: [
      { label: 'Constitution of India (Full Text)', url: 'https://legislative.gov.in/constitution-of-india/' },
      { label: 'Supreme Court of India', url: 'https://main.sci.gov.in/' },
    ]
  },
  'consumer-protection-act': {
    title: 'Consumer Protection Act, 2019', category: 'Consumer Law',
    overview: 'The Consumer Protection Act 2019 provides stronger protection for consumers in India. It establishes a three-tier quasi-judicial mechanism and covers goods, services, and e-commerce. It introduces product liability, regulates misleading advertisements, and establishes the CCPA.',
    keySections: [
      { section: 'Section 34-37', title: 'Consumer Disputes Redressal', description: 'Three-tier structure: District (up to ₹1 Crore), State (₹1-10 Crore), National (above ₹10 Crore).' },
      { section: 'Section 82-87', title: 'Product Liability', description: 'Manufacturers, sellers are liable for harm caused by defective products.' },
    ],
    examples: [
      { title: 'Defective Product', scenario: 'A mobile phone stops working after 3 days.', outcome: 'Consumer can file complaint on edaakhil.nic.in and claim refund, replacement, and compensation.' },
    ],
    useCases: [
      { title: 'Online Shopping Disputes', description: 'File complaints against e-commerce platforms for defective products or non-delivery.' },
    ],
    importantLinks: [
      { label: 'E-Daakhil Portal', url: 'https://edaakhil.nic.in/' },
    ]
  },
  'it-act': {
    title: 'Information Technology Act, 2000', category: 'Cyber Law',
    overview: 'India\'s primary law for cybercrime and electronic commerce. Defines cybercrimes and prescribes penalties for hacking, identity theft, cyber terrorism, and publishing obscene material. Complaints at cybercrime.gov.in.',
    keySections: [
      { section: 'Section 66', title: 'Computer Related Offences', description: 'Hacking is punishable with up to 3 years imprisonment and/or ₹5 lakh fine.' },
      { section: 'Section 66C', title: 'Identity Theft', description: 'Using another person\'s electronic signature or password fraudulently: up to 3 years imprisonment.' },
    ],
    examples: [
      { title: 'UPI Fraud', scenario: 'Someone shares OTP and loses ₹50,000.', outcome: 'File on cybercrime.gov.in and call 1930. Under RBI guidelines, if reported within 3 days, liability is limited.' },
    ],
    useCases: [
      { title: 'Reporting Cyber Crime', description: 'Report on cybercrime.gov.in or call 1930.' },
    ],
    importantLinks: [
      { label: 'Cyber Crime Portal', url: 'https://cybercrime.gov.in/' },
    ]
  },
  'labour-laws': {
    title: 'Labour Laws in India', category: 'Employment Law',
    overview: 'India has consolidated 29 central labour laws into 4 Labour Codes covering wages, industrial relations, social security, and workplace safety.',
    keySections: [
      { section: 'Code on Wages, 2019', title: 'Minimum Wages & Payment', description: 'Applies to ALL establishments. Equal remuneration for equal work.' },
      { section: 'POSH Act, 2013', title: 'Prevention of Sexual Harassment', description: 'All workplaces with 10+ employees must constitute ICC.' },
    ],
    examples: [
      { title: 'Unpaid Wages', scenario: 'A company hasn\'t paid salary for 3 months.', outcome: 'Complain to Labour Commissioner. Employer can be fined up to ₹50,000.' },
    ],
    useCases: [
      { title: 'PF Withdrawal', description: 'Login to EPFO portal. Full withdrawal after 2 months of unemployment.' },
    ],
    importantLinks: [
      { label: 'EPFO Portal', url: 'https://unifiedportal-mem.epfindia.gov.in/' },
    ]
  },
  'property-rent-laws': {
    title: 'Property & Rent Laws', category: 'Property Law',
    overview: 'Property law in India is governed by Transfer of Property Act, Registration Act, RERA 2016, and state-specific Rent Control Acts.',
    keySections: [
      { section: 'RERA 2016', title: 'Real Estate Regulation', description: 'All projects with 500+ sq.m or 8+ apartments must register. Buyers can claim refund with interest for delays.' },
      { section: 'Model Tenancy Act, 2021', title: 'Tenant-Landlord Framework', description: 'Security deposit limited to 2 months rent. 3-month notice for eviction.' },
    ],
    examples: [
      { title: 'Builder Delay', scenario: 'Builder promised possession in 2023 but hasn\'t delivered.', outcome: 'File RERA complaint. Builder must pay interest or refund with interest.' },
    ],
    useCases: [
      { title: 'Buying Property', description: 'Verify title deed chain, encumbrance certificate, RERA registration, and approved building plan.' },
    ],
    importantLinks: [
      { label: 'MahaRERA', url: 'https://maharera.mahaonline.gov.in/' },
    ]
  },
};

export default function LawDetailPage() {
  const { slug } = useParams();
  const [law, setLaw] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/laws/${slug}`)
      .then(r => r.json())
      .then(data => {
        if (data && data.title) setLaw(data);
        else setLaw(fallbackLaws[slug] || null);
      })
      .catch(() => setLaw(fallbackLaws[slug] || null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-text" style={{ width: '80%' }} />
        <div className="skeleton skeleton-text" style={{ width: '60%' }} />
        <div className="skeleton skeleton-card" style={{ marginTop: 24 }} />
      </div>
    );
  }

  if (!law) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '80px 24px' }}>
        <h2>Law not found</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>The requested law page does not exist.</p>
        <Link to="/legal-knowledge" className="btn btn-primary" style={{ marginTop: 20 }}>← Back to Legal Knowledge</Link>
      </div>
    );
  }

  return (
    <div className="page-container fade-in">
      <Link to="/legal-knowledge" className="back-btn">
        ← Back to Legal Knowledge
      </Link>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary-bg), rgba(37,99,235,0.08))',
        borderRadius: 20, padding: '32px 28px', marginBottom: 32,
        border: '1px solid rgba(37,99,235,0.12)',
      }}>
        <div style={{ marginBottom: 12 }}>
          <span className="badge badge-primary" style={{ marginBottom: 6, display: 'inline-block' }}>{law.category}</span>
          <h1 style={{ fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 800, letterSpacing: '-0.02em' }}>{law.title}</h1>
        </div>
      </div>

      {/* Overview */}
      <section style={{ marginBottom: 36 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          Overview
        </h2>
        <div className="card" style={{ lineHeight: 1.8 }}>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{law.overview}</p>
        </div>
      </section>

      {/* Key Sections */}
      {law.keySections?.length > 0 && (
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            Key Sections
          </h2>
          {law.keySections.map((sec, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 14, marginBottom: 8,
              border: `1px solid ${openSection === i ? 'var(--primary-light)' : 'var(--border)'}`,
              overflow: 'hidden', transition: 'border-color 0.2s',
            }}>
              <button onClick={() => setOpenSection(openSection === i ? null : i)} style={{
                width: '100%', padding: '16px 20px', border: 'none',
                background: 'transparent', cursor: 'pointer', textAlign: 'left',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: 'var(--primary)',
                    background: 'var(--primary-bg)', padding: '2px 8px',
                    borderRadius: 4, marginBottom: 4, display: 'inline-block',
                  }}>{sec.section}</span>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginTop: 4 }}>{sec.title}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"
                  style={{ transform: openSection === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', flexShrink: 0 }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              {openSection === i && (
                <div className="fade-in" style={{ padding: '0 20px 18px' }}>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{sec.description}</p>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Examples */}
      {law.examples?.length > 0 && (
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            Real-World Examples
          </h2>
          <div className="grid-2">
            {law.examples.map((ex, i) => (
              <div key={i} className="card fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, color: 'var(--primary)' }}>{ex.title}</h4>
                <div style={{ marginBottom: 10 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 600, color: 'var(--accent)',
                    background: 'var(--accent-bg)', padding: '2px 8px', borderRadius: 4,
                  }}>Scenario</span>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6, lineHeight: 1.6 }}>{ex.scenario}</p>
                </div>
                <div>
                  <span style={{
                    fontSize: 11, fontWeight: 600, color: 'var(--secondary)',
                    background: 'var(--secondary-bg)', padding: '2px 8px', borderRadius: 4,
                  }}>Outcome</span>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6, lineHeight: 1.6 }}>{ex.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Use Cases */}
      {law.useCases?.length > 0 && (
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            Practical Use Cases
          </h2>
          <div className="grid-2">
            {law.useCases.map((uc, i) => (
              <div key={i} className="card fade-up" style={{
                borderLeft: '4px solid var(--primary-light)',
                animationDelay: `${i * 0.05}s`,
              }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{uc.title}</h4>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{uc.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Important Links */}
      {law.importantLinks?.length > 0 && (
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            Official Links
          </h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {law.importantLinks.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: 13 }}>
                {link.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
