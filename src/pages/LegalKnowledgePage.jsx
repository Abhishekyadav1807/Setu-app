import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fallbackLaws = [
  { slug: 'constitution-basics', title: 'Constitution of India – Basics', category: 'Constitutional Law', overview: 'The supreme law of India, guaranteeing fundamental rights, duties, and directive principles for all citizens.' },
  { slug: 'consumer-protection-act', title: 'Consumer Protection Act, 2019', category: 'Consumer Law', overview: 'Protects consumers against unfair trade practices, defective goods, and deficient services with a three-tier redressal mechanism.' },
  { slug: 'it-act', title: 'Information Technology Act, 2000', category: 'Cyber Law', overview: 'India\'s primary law for cybercrime, electronic commerce, and data protection in the digital world.' },
  { slug: 'labour-laws', title: 'Labour Laws in India', category: 'Employment Law', overview: 'Consolidated labour codes covering wages, industrial relations, social security, and workplace safety.' },
  { slug: 'property-rent-laws', title: 'Property & Rent Laws', category: 'Property Law', overview: 'Laws governing property registration, transfer, RERA, tenancy rights, and land records.' },
];

export default function LegalKnowledgePage() {
  const [laws, setLaws] = useState(fallbackLaws);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/laws`)
      .then(r => r.json())
      .then(data => { if (data.length) setLaws(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>Legal Knowledge Hub</h1>
        <p>
          Indian laws explained in simple language. Each law page includes an overview, 
          key sections, real-world examples, and practical use cases.
        </p>
      </div>

      {/* Info Banner */}
      <div style={{
        background: 'var(--primary-bg)', borderRadius: 16,
        padding: '20px 24px', marginBottom: 32,
        border: '1px solid rgba(37, 99, 235, 0.15)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>

        <p style={{ fontSize: 13, color: 'var(--primary)', lineHeight: 1.6 }}>
          <strong>Tip:</strong> Click on any law category below to read a detailed explanation 
          with key sections, examples, and how it applies to everyday situations.
        </p>
      </div>

      {/* Laws Grid */}
      <div className="grid-2">
        {laws.map((law, i) => (
          <Link key={law.slug} to={`/legal-knowledge/${law.slug}`} className="card card-clickable fade-up" style={{
            textDecoration: 'none', animationDelay: `${i * 0.06}s`,
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              marginBottom: 12,
            }}>
              <span className="badge badge-primary">{law.category}</span>
            </div>
            <h3 style={{
              fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--text)',
            }}>{law.title}</h3>
            <p style={{
              fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7,
              flex: 1,
            }}>{law.overview?.substring(0, 150)}...</p>
            <div style={{
              marginTop: 16, paddingTop: 16,
              borderTop: '1px solid var(--border)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{
                fontSize: 13, fontWeight: 600, color: 'var(--primary)',
              }}>Read Full Details →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
