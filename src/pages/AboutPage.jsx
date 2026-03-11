import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="page-container fade-in" style={{ maxWidth: 900 }}>
      <div className="page-header">
        <h1>About SETU</h1>
        <p>
          Understanding the platform, its purpose, and the team behind it.
        </p>
      </div>

      {/* What is SETU */}
      <section style={{ marginBottom: 36 }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--primary-bg), rgba(37,99,235,0.06))',
          borderRadius: 20, padding: '36px 32px',
          border: '1px solid rgba(37,99,235,0.1)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 24, fontWeight: 900,
              boxShadow: '0 4px 16px rgba(30,58,138,0.3)',
            }}>S</div>
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em' }}>SETU</h2>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Legal Awareness & Document Assistance Platform</p>
            </div>
          </div>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <strong style={{ color: 'var(--text)' }}>SETU</strong> (meaning "bridge" in Sanskrit) is a web platform designed to 
            bridge the gap between Indian citizens and the legal system. It provides simplified explanations of Indian laws, 
            step-by-step legal procedures, government scheme information, and tools to generate legal documents.
          </p>
        </div>
      </section>

      {/* Purpose */}
      <section style={{ marginBottom: 36 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Purpose</h2>
        <div className="card" style={{ lineHeight: 1.8 }}>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 12 }}>
            India faces a significant legal awareness gap. According to studies, approximately 70% of Indian 
            citizens lack basic legal knowledge about their rights and available remedies. With over 50 million 
            pending court cases, many citizens are unaware of simpler, faster legal procedures available to them.
          </p>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            SETU aims to address this gap by providing:
          </p>
          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
            {[
              'Simplified explanations of important Indian laws',
              'Step-by-step guides for common legal procedures',
              'A searchable database of government welfare schemes',
              'Tools to generate basic legal documents',
              'Links to official government portals and helplines',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 6, lineHeight: 1.6 }}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Modules */}
      <section style={{ marginBottom: 36 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Platform Modules</h2>
        <div className="grid-2">
          {[
            { title: 'Legal Knowledge Hub', desc: 'Indian laws explained in simple language with key sections, real-world examples, and practical use cases.', to: '/legal-knowledge' },
            { title: 'Legal Procedure Guide', desc: 'Step-by-step guides for FIR filing, RTI applications, consumer complaints, marriage registration, and passport.', to: '/legal-procedures' },
            { title: 'Government Scheme Explorer', desc: 'Searchable database of government schemes with eligibility criteria, benefits, required documents, and official links.', to: '/government-schemes' },
            { title: 'Document Generator', desc: 'Form-based generator for FIR drafts, RTI applications, legal notices, consumer complaints, and rent notices with PDF download.', to: '/document-generator' },
          ].map((mod, i) => (
            <Link key={i} to={mod.to} className="card card-clickable fade-up" style={{
              textDecoration: 'none', animationDelay: `${i * 0.06}s`,
            }}>

              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: 'var(--text)' }}>{mod.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{mod.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact / Emergency */}
      <section>
        <div style={{
          background: 'linear-gradient(135deg, #FEF2F2, #FEE2E2)',
          borderRadius: 16, padding: '24px 28px',
          border: '1px solid rgba(220,38,38,0.15)',
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#991B1B', marginBottom: 12 }}>Emergency Numbers</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
            {[
              { label: 'Police Emergency', number: '112' },
              { label: 'Cyber Fraud Helpline', number: '1930' },
              { label: 'Women Helpline', number: '181' },
              { label: 'Child Helpline', number: '1098' },
              { label: 'Senior Citizens', number: '14567' },
              { label: 'NALSA Legal Aid', number: '15100' },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: '#7F1D1D' }}>{c.label}:</span>
                <strong style={{ fontSize: 14, color: '#DC2626' }}>{c.number}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
