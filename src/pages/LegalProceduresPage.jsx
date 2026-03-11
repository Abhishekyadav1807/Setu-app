import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fallbackProcedures = [
  { slug: 'fir-filing', title: 'FIR Filing', purpose: 'Learn how to file a First Information Report at any police station.', timeline: 'Immediate' },
  { slug: 'rti-application', title: 'RTI Application', purpose: 'Apply for information from any government department.', timeline: '30 days' },
  { slug: 'consumer-complaint', title: 'Consumer Complaint', purpose: 'File complaints against defective goods or deficient services.', timeline: '3-5 months' },
  { slug: 'marriage-registration', title: 'Marriage Registration', purpose: 'Register your marriage for legal recognition.', timeline: '1-30 days' },
  { slug: 'passport-application', title: 'Passport Application', purpose: 'Apply for an Indian passport through Passport Seva.', timeline: '30-45 days' },
];

export default function LegalProceduresPage() {
  const [procedures, setProcedures] = useState(fallbackProcedures);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/procedures`)
      .then(r => r.json())
      .then(data => { if (data.length) setProcedures(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>Legal Procedure Guide</h1>
        <p>
          Step-by-step guides for common legal procedures in India. 
          Each guide includes purpose, required documents, steps, fees, timeline, and official links.
        </p>
      </div>

      {/* Info Banner */}
      <div style={{
        background: 'var(--secondary-bg)', borderRadius: 16,
        padding: '20px 24px', marginBottom: 32,
        border: '1px solid rgba(5, 150, 105, 0.15)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>

        <p style={{ fontSize: 13, color: 'var(--secondary)', lineHeight: 1.6 }}>
          <strong>Note:</strong> These guides are based on the latest Indian laws (BNS/BNSS 2023). 
          Always verify requirements with the concerned authority as they may vary by state.
        </p>
      </div>

      {/* Procedures Grid */}
      <div className="grid-2">
        {procedures.map((proc, i) => (
          <Link key={proc.slug} to={`/legal-procedures/${proc.slug}`} className="card card-clickable fade-up" style={{
            textDecoration: 'none', animationDelay: `${i * 0.06}s`,
          }}>
            <div style={{
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              marginBottom: 14,
            }}>

              {proc.timeline && (
                <span className="badge badge-secondary">{proc.timeline}</span>
              )}
            </div>
            <h3 style={{
              fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--text)',
            }}>{proc.title}</h3>
            <p style={{
              fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6,
            }}>{proc.purpose?.substring(0, 120)}...</p>
            <div style={{
              marginTop: 16, paddingTop: 14,
              borderTop: '1px solid var(--border)',
              fontSize: 13, fontWeight: 600, color: 'var(--primary)',
            }}>
              View Complete Guide →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
