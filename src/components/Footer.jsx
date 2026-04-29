import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const emergencyContacts = [
    { label: t('footer.police'), number: '112' },
    { label: t('footer.cyber'), number: '1930' },
    { label: t('footer.women'), number: '181' },
    { label: t('footer.child'), number: '1098' },
  ];

  return (
    <footer style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', color: '#fff', padding: '48px 24px 24px' }}>
      <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 36, marginBottom: 36 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: 'linear-gradient(135deg, var(--primary-light), #60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 15, fontWeight: 900 }}>S</div>
              <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>SETU</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 280 }}>{t('footer.description')}</p>
          </div>

          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 14, color: 'rgba(255,255,255,0.8)' }}>{t('footer.platform')}</h4>
            {[
              { to: '/legal-knowledge', label: t('nav.legalKnowledge') },
              { to: '/legal-procedures', label: t('nav.legalProcedures') },
              { to: '/government-schemes', label: t('footer.govSchemes') },
              { to: '/document-generator', label: t('nav.docGen') },
            ].map((l) => (
              <Link key={l.to} to={l.to} style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 8, textDecoration: 'none' }}>
                {l.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 14, color: 'rgba(255,255,255,0.8)' }}>{t('footer.legal')}</h4>
            {[
              { to: '/about', label: t('footer.aboutSetu') },
              { to: '/disclaimer', label: t('nav.disclaimer') },
            ].map((l) => (
              <Link key={l.to} to={l.to} style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 8, textDecoration: 'none' }}>
                {l.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 14, color: 'rgba(255,255,255,0.8)' }}>{t('footer.emergencyNumbers')}</h4>
            {emergencyContacts.map((c) => (
              <div key={c.number} style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>
                {c.label}: <strong style={{ color: '#fff' }}>{c.number}</strong>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20, textAlign: 'center' }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}

