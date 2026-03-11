import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fallbackProcedures = {
  'fir-filing': {
    title: 'FIR Filing',
    purpose: 'An FIR (First Information Report) is a written document prepared by police when they receive information about a cognizable offence. Under Section 173 BNSS, police are legally bound to register an FIR.',
    requiredDocuments: ['Government-issued ID proof', 'Written complaint', 'Evidence (photos, videos, screenshots)', 'Details of accused (if known)', 'Details of witnesses (if any)', 'Medical certificate (if injury)'],
    steps: [
      { stepNumber: 1, title: 'Visit Nearest Police Station', description: 'Go to the police station with jurisdiction. Under Zero FIR, you can file at ANY station.' },
      { stepNumber: 2, title: 'Meet the SHO', description: 'Ask to meet the Station House Officer. Clearly state you want to file an FIR.' },
      { stepNumber: 3, title: 'Narrate the Incident', description: 'Describe the incident with date, time, place, and details of offence.' },
      { stepNumber: 4, title: 'Read and Sign', description: 'Read the FIR carefully before signing. Ensure all facts are correct.' },
      { stepNumber: 5, title: 'Get FIR Copy', description: 'Police must give you a free copy. Note down the FIR number.' },
      { stepNumber: 6, title: 'Follow Up', description: 'Follow up within 72 hours for investigation status.' },
    ],
    fees: 'Free – No charges for filing an FIR',
    timeline: 'FIR must be registered immediately. Investigation within 24 hours.',
    officialLink: 'https://digitalpolice.gov.in/',
    tips: ['If police refuse, send complaint to SP/SSP', 'Zero FIR can be filed at any station', 'For cyber crimes, use cybercrime.gov.in'],
  },
  'rti-application': {
    title: 'RTI Application',
    purpose: 'The Right to Information Act 2005 empowers citizens to request information from any public authority. Response within 30 days.',
    requiredDocuments: ['Written application to PIO', '₹10 fee', 'Specific clear questions', 'Name and address', 'BPL card (for fee exemption)'],
    steps: [
      { stepNumber: 1, title: 'Identify Public Authority', description: 'Determine which department holds the information.' },
      { stepNumber: 2, title: 'Draft Application', description: 'Write specific questions. Address to PIO.' },
      { stepNumber: 3, title: 'Pay Fee', description: '₹10 for central government. BPL exempt.' },
      { stepNumber: 4, title: 'Submit', description: 'Online at rtionline.gov.in or by registered post.' },
      { stepNumber: 5, title: 'Track Response', description: 'PIO must reply within 30 days.' },
      { stepNumber: 6, title: 'File Appeal if Needed', description: 'First Appeal within 30 days, Second Appeal to Information Commission within 90 days.' },
    ],
    fees: '₹10 per application. BPL families exempt.',
    timeline: '30 days response. 48 hours for life/liberty matters.',
    officialLink: 'https://rtionline.gov.in/',
    tips: ['Ask specific questions', 'No need to give reason', 'Keep copies of everything'],
  },
  'consumer-complaint': {
    title: 'Consumer Complaint',
    purpose: 'Filing a consumer complaint to seek redressal against unfair trade practices, defective goods, or deficient services under Consumer Protection Act 2019.',
    requiredDocuments: ['ID proof', 'Purchase receipt/bill', 'Product warranty card', 'Written complaint', 'Communication with seller', 'Photos/videos of defect'],
    steps: [
      { stepNumber: 1, title: 'Contact Seller First', description: 'Send written complaint. Give 15-30 days to resolve.' },
      { stepNumber: 2, title: 'Send Legal Notice', description: 'Send legal notice via registered AD post.' },
      { stepNumber: 3, title: 'Register on e-Daakhil', description: 'Create account at edaakhil.nic.in.' },
      { stepNumber: 4, title: 'File Complaint Online', description: 'Fill form, upload evidence, select forum.' },
      { stepNumber: 5, title: 'Pay Court Fee', description: 'NIL for claims up to ₹5 lakh.' },
      { stepNumber: 6, title: 'Attend Hearings', description: 'Video conference available. No lawyer needed.' },
    ],
    fees: 'Free for claims up to ₹5 lakh. ₹200 to ₹5,000 based on amount.',
    timeline: '3-5 months typically. Appeal within 30 days.',
    officialLink: 'https://edaakhil.nic.in/',
    tips: ['No lawyer needed', 'File within 2 years', 'Can claim mental agony compensation'],
  },
  'marriage-registration': {
    title: 'Marriage Registration',
    purpose: 'Marriage registration provides legal recognition and serves as conclusive proof. Essential for passport, visa, property rights.',
    requiredDocuments: ['Age proof of both parties', 'Address proof', 'Photographs', 'Marriage invitation card', 'Affidavit', 'Two witnesses with ID'],
    steps: [
      { stepNumber: 1, title: 'Collect Documents', description: 'Gather all documents. Get affidavit on stamp paper.' },
      { stepNumber: 2, title: 'Apply at Sub-Registrar', description: 'Visit Sub-Registrar office or apply online.' },
      { stepNumber: 3, title: '30-Day Notice (Special Marriage Act)', description: 'Notice published for objections. Only for Special Marriage Act.' },
      { stepNumber: 4, title: 'Both Parties Appear', description: 'Bride, groom, and witnesses appear with originals.' },
      { stepNumber: 5, title: 'Sign Register', description: 'Sign the marriage register.' },
      { stepNumber: 6, title: 'Collect Certificate', description: 'Certificate issued same day or within 15 days.' },
    ],
    fees: '₹100-500 varies by state.',
    timeline: 'Personal law: 1-7 days. Special Marriage Act: 30+ days.',
    officialLink: 'https://www.india.gov.in/topics/law-justice/marriage',
    tips: ['Register as soon as possible', 'Both parties must be present', 'Keep multiple copies'],
  },
  'passport-application': {
    title: 'Passport Application',
    purpose: 'Apply for an Indian passport through the Passport Seva portal. The passport serves as proof of citizenship and is essential for international travel.',
    requiredDocuments: ['Aadhaar card', 'Voter ID or PAN', 'Birth certificate', 'Passport photos', 'Old passport (for renewal)'],
    steps: [
      { stepNumber: 1, title: 'Register on Portal', description: 'Create account at passportindia.gov.in.' },
      { stepNumber: 2, title: 'Fill Application', description: 'Fill passport application form online.' },
      { stepNumber: 3, title: 'Pay Fee', description: 'Normal: ₹1,500. Tatkal: ₹3,500.' },
      { stepNumber: 4, title: 'Book Appointment', description: 'Schedule visit at nearest PSK.' },
      { stepNumber: 5, title: 'Visit PSK', description: 'Bring originals for verification and biometrics.' },
      { stepNumber: 6, title: 'Police Verification', description: 'Passport dispatched via Speed Post.' },
    ],
    fees: 'Normal: ₹1,500. Tatkal: ₹3,500.',
    timeline: 'Normal: 30-45 days. Tatkal: 1-3 days.',
    officialLink: 'https://www.passportindia.gov.in/',
    tips: ['Apply online only', 'Ensure Aadhaar address matches', 'Reach PSK 15 min early'],
  },
};

export default function ProcedureDetailPage() {
  const { slug } = useParams();
  const [procedure, setProcedure] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/procedures/${slug}`)
      .then(r => r.json())
      .then(data => {
        if (data && data.title) setProcedure(data);
        else setProcedure(fallbackProcedures[slug] || null);
      })
      .catch(() => setProcedure(fallbackProcedures[slug] || null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-text" style={{ width: '80%' }} />
        <div className="skeleton skeleton-card" style={{ marginTop: 24 }} />
      </div>
    );
  }

  if (!procedure) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '80px 24px' }}>
        <h2>Procedure not found</h2>
        <Link to="/legal-procedures" className="btn btn-primary" style={{ marginTop: 20 }}>← Back to Procedures</Link>
      </div>
    );
  }

  return (
    <div className="page-container fade-in" style={{ maxWidth: 900 }}>
      <Link to="/legal-procedures" className="back-btn">← Back to Legal Procedures</Link>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--secondary-bg), rgba(5,150,105,0.08))',
        borderRadius: 20, padding: '32px 28px', marginBottom: 32,
        border: '1px solid rgba(5,150,105,0.12)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>

          <h1 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em' }}>{procedure.title}</h1>
        </div>
      </div>

      {/* Purpose */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Purpose</h2>
        <div className="card">
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{procedure.purpose}</p>
        </div>
      </section>

      {/* Quick Info Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 32 }}>
        <div className="card" style={{ borderLeft: '4px solid var(--secondary)' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Fees</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--secondary)' }}>{procedure.fees}</div>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Timeline</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)' }}>{procedure.timeline}</div>
        </div>
        {procedure.officialLink && (
          <a href={procedure.officialLink} target="_blank" rel="noopener noreferrer" className="card" style={{
            borderLeft: '4px solid var(--accent)', textDecoration: 'none',
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Official Website</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', wordBreak: 'break-all' }}>{procedure.officialLink} ↗</div>
          </a>
        )}
      </div>

      {/* Required Documents */}
      {procedure.requiredDocuments?.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Required Documents</h2>
          <div className="card">
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {procedure.requiredDocuments.map((doc, i) => (
                <li key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  padding: '10px 0',
                  borderBottom: i < procedure.requiredDocuments.length - 1 ? '1px solid var(--border-light)' : 'none',
                }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: 6,
                    background: 'var(--primary-bg)', color: 'var(--primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700, flexShrink: 0,
                  }}>✓</span>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Step-by-Step Process */}
      {procedure.steps?.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Step-by-Step Process</h2>
          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute', left: 17, top: 28, bottom: 28,
              width: 2, background: 'linear-gradient(to bottom, var(--primary-light), var(--secondary))',
              borderRadius: 2,
            }} />
            {procedure.steps.map((step, i) => (
              <div key={i} className="fade-up" style={{
                display: 'flex', gap: 16, marginBottom: 16,
                animationDelay: `${i * 0.06}s`,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 800, flexShrink: 0, zIndex: 1,
                  boxShadow: '0 2px 8px rgba(30,58,138,0.3)',
                }}>{step.stepNumber}</div>
                <div className="card" style={{ flex: 1, padding: '18px 20px' }}>
                  <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{step.title}</h4>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tips */}
      {procedure.tips?.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Important Tips</h2>
          <div style={{
            background: 'var(--accent-bg)', borderRadius: 16,
            padding: '20px 24px', border: '1px solid rgba(217, 119, 6, 0.15)',
          }}>
            {procedure.tips.map((tip, i) => (
              <div key={i} style={{
                display: 'flex', gap: 10, alignItems: 'flex-start',
                padding: '8px 0',
                borderBottom: i < procedure.tips.length - 1 ? '1px solid rgba(217,119,6,0.1)' : 'none',
              }}>
                <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>•</span>
                <span style={{ fontSize: 13, color: '#78350F', lineHeight: 1.6 }}>{tip}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
