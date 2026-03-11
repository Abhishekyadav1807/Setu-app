import { Link } from 'react-router-dom';

const emergencyContacts = [
  { label: 'Police Emergency', number: '112' },
  { label: 'Cyber Fraud Helpline', number: '1930' },
  { label: 'Women Helpline', number: '181' },
  { label: 'Child Helpline', number: '1098' },
];

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      color: '#fff', padding: '48px 24px 24px',
    }}>
      <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 36, marginBottom: 36,
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 9,
                background: 'linear-gradient(135deg, var(--primary-light), #60A5FA)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 15, fontWeight: 900,
              }}>S</div>
              <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>SETU</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 280 }}>
              Legal awareness and document assistance platform making justice accessible for every Indian citizen.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 14, color: 'rgba(255,255,255,0.8)' }}>Platform</h4>
            {[
              { to: '/legal-knowledge', label: 'Legal Knowledge' },
              { to: '/legal-procedures', label: 'Legal Procedures' },
              { to: '/government-schemes', label: 'Government Schemes' },
              { to: '/document-generator', label: 'Document Generator' },
            ].map(l => (
              <Link key={l.to} to={l.to} style={{
                display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.45)',
                marginBottom: 8, textDecoration: 'none',
              }}>{l.label}</Link>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 14, color: 'rgba(255,255,255,0.8)' }}>Legal</h4>
            {[
              { to: '/about', label: 'About SETU' },
              { to: '/disclaimer', label: 'Legal Disclaimer' },
            ].map(l => (
              <Link key={l.to} to={l.to} style={{
                display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.45)',
                marginBottom: 8, textDecoration: 'none',
              }}>{l.label}</Link>
            ))}
          </div>

          {/* Emergency */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 14, color: 'rgba(255,255,255,0.8)' }}>Emergency Numbers</h4>
            {emergencyContacts.map(c => (
              <div key={c.number} style={{
                fontSize: 13, color: 'rgba(255,255,255,0.45)',
                marginBottom: 8,
              }}>
                {c.label}: <strong style={{ color: '#fff' }}>{c.number}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: 20, textAlign: 'center',
        }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}>
            © 2026 SETU – Legal Awareness & Document Assistance Platform. This platform provides legal information for educational purposes only. 
            It is not a substitute for professional legal advice. Created as a college project.
          </p>
        </div>
      </div>
    </footer>
  );
}
