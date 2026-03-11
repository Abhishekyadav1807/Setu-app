import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Legal Knowledge Hub',
    desc: 'Learn about Indian laws in simple language — Constitution, Consumer Protection, IT Act, and more.',
    to: '/legal-knowledge', color: '#3B82F6',
  },
  {
    title: 'Legal Procedure Guide',
    desc: 'Step-by-step guides for FIR filing, RTI applications, consumer complaints, and more.',
    to: '/legal-procedures', color: '#8B5CF6',
  },
  {
    title: 'Government Schemes',
    desc: 'Search and explore 15+ government schemes with eligibility and application details.',
    to: '/government-schemes', color: '#059669',
  },
  {
    title: 'Document Generator',
    desc: 'Generate formatted legal documents — FIR drafts, RTI applications, legal notices, and more.',
    to: '/document-generator', color: '#D97706',
  },
];

const stats = [
  { num: '50M+', label: 'Pending court cases in India', color: '#DC2626' },
  { num: '70%', label: 'Indians lack legal awareness', color: '#D97706' },
  { num: '500+', label: 'Government schemes available', color: '#059669' },
  { num: '5', label: 'Document types you can generate', color: '#3B82F6' },
];

const lawCategories = [
  { title: 'Constitution Basics', desc: 'Fundamental rights, duties, directive principles', slug: 'constitution-basics' },
  { title: 'Consumer Protection Act', desc: 'Your rights as a consumer, complaint process', slug: 'consumer-protection-act' },
  { title: 'IT Act', desc: 'Cyber crime laws, online fraud protection', slug: 'it-act' },
  { title: 'Labour Laws', desc: 'Wages, PF, ESI, workplace rights', slug: 'labour-laws' },
  { title: 'Property & Rent Laws', desc: 'RERA, tenant rights, property registration', slug: 'property-rent-laws' },
];

export default function HomePage() {
  return (
    <div className="fade-in">
      {/* ═══ Hero Section ═══ */}
      <section style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 40%, #2563EB 100%)',
        padding: '64px 24px 72px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(96,165,250,0.15), transparent 70%)',
          top: -100, right: -100,
        }} />
        <div style={{
          position: 'absolute', width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.1), transparent 70%)',
          bottom: -50, left: -50,
        }} />

        <div style={{
          maxWidth: 800, margin: '0 auto', textAlign: 'center',
          position: 'relative', zIndex: 1,
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.1)', borderRadius: 24,
            padding: '6px 18px', marginBottom: 20,
            border: '1px solid rgba(255,255,255,0.15)',
          }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
              Made for Indian Citizens
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 900,
            color: '#fff', lineHeight: 1.1, marginBottom: 18,
            letterSpacing: '-0.04em',
          }}>
            Legal Awareness &<br />
            <span style={{
              background: 'linear-gradient(135deg, #60A5FA, #34D399)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Document Assistance</span>
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 2.5vw, 18px)',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: 560, margin: '0 auto 32px',
            lineHeight: 1.7,
          }}>
            Understand Indian laws, explore government schemes, learn legal procedures, 
            and generate legal documents — all in one place.
          </p>

          <div style={{
            display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap',
          }}>
            <Link to="/legal-knowledge" className="btn btn-primary" style={{
              padding: '14px 28px', fontSize: 15, borderRadius: 12,
            }}>
              Explore Laws →
            </Link>
            <Link to="/document-generator" className="btn" style={{
              padding: '14px 28px', fontSize: 15, borderRadius: 12,
              background: 'rgba(255,255,255,0.1)', color: '#fff',
              border: '1px solid rgba(255,255,255,0.25)',
            }}>
              Generate Documents
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Features Grid ═══ */}
      <section style={{
        maxWidth: 'var(--page-max)', margin: '-36px auto 0',
        padding: '0 24px', position: 'relative', zIndex: 2,
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 16,
        }}>
          {features.map((f, i) => (
            <Link key={i} to={f.to} className="fade-up" style={{
              background: '#fff', borderRadius: 18, padding: 24,
              border: '1px solid var(--border)', textDecoration: 'none',
              transition: 'all 0.25s', animationDelay: `${i * 0.06}s`,
              display: 'block',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.borderColor = f.color; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${f.color}15`, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: f.color }} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: 'var(--text)' }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
              <div style={{
                marginTop: 14, fontSize: 13, fontWeight: 600, color: f.color,
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                Explore →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ Stats ═══ */}
      <section style={{ maxWidth: 'var(--page-max)', margin: '48px auto', padding: '0 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
        }}>
          {stats.map((s, i) => (
            <div key={i} className="fade-up" style={{
              background: '#fff', borderRadius: 16, padding: '24px 20px',
              border: '1px solid var(--border)', animationDelay: `${i * 0.05}s`,
            }}>
              <div style={{
                fontSize: 32, fontWeight: 900, color: s.color,
                letterSpacing: '-0.02em',
              }}>{s.num}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Law Categories Quick Access ═══ */}
      <section style={{
        maxWidth: 'var(--page-max)', margin: '0 auto 48px',
        padding: '0 24px',
      }}>
        <h2 style={{
          fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 800,
          letterSpacing: '-0.03em', marginBottom: 8,
        }}>
          Understand Indian Laws
        </h2>
        <p style={{
          fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24,
        }}>
          Laws explained in simple language with examples and use cases
        </p>
        <div className="grid-3">
          {lawCategories.map((cat, i) => (
            <Link key={i} to={`/legal-knowledge/${cat.slug}`} className="card card-clickable fade-up" style={{
              textDecoration: 'none', animationDelay: `${i * 0.04}s`,
            }}>

              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, color: 'var(--text)' }}>{cat.title}</h3>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ How SETU Helps ═══ */}
      <section style={{
        background: 'var(--primary-bg)', padding: '48px 24px', margin: '0 0 48px',
      }}>
        <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 28, fontWeight: 800, textAlign: 'center',
            marginBottom: 36, letterSpacing: '-0.03em',
          }}>
            How SETU Helps You
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: 24,
          }}>
            {[
              { step: '01', title: 'Learn Your Rights', desc: 'Browse simplified explanations of Indian laws with real examples and use cases' },
              { step: '02', title: 'Follow Procedures', desc: 'Step-by-step guides for FIR filing, RTI, consumer complaints, and more' },
              { step: '03', title: 'Find Schemes', desc: 'Search government schemes by category, check eligibility, and find official links' },
              { step: '04', title: 'Generate Documents', desc: 'Fill forms and download formatted PDFs — FIR drafts, RTI applications, legal notices' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '24px 16px' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px', fontSize: 18, fontWeight: 800, color: '#fff',
                }}>{s.step}</div>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: 'var(--primary)',
                  marginBottom: 6, letterSpacing: '0.05em',
                }}>STEP {s.step}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Important Notice ═══ */}
      <section style={{ maxWidth: 'var(--page-max)', margin: '0 auto 48px', padding: '0 24px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)',
          borderRadius: 20, padding: '28px 24px',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>

              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#92400E' }}>Important Disclaimer</h3>
            </div>
            <p style={{ fontSize: 13, color: '#78350F', lineHeight: 1.6 }}>
              SETU provides legal information for educational purposes only. This platform is not a substitute 
              for professional legal advice. Always consult a qualified lawyer for specific legal matters.
            </p>
          </div>
          <Link to="/disclaimer" style={{
            padding: '10px 22px', borderRadius: 10, border: 'none',
            background: '#92400E', color: '#fff', fontWeight: 600,
            fontSize: 13, textDecoration: 'none', whiteSpace: 'nowrap',
          }}>Read Full Disclaimer →</Link>
        </div>
      </section>
    </div>
  );
}
