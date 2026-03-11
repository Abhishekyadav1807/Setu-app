import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/legal-knowledge', label: 'Legal Knowledge' },
  { path: '/legal-procedures', label: 'Legal Procedures' },
  { path: '/government-schemes', label: 'Gov Schemes' },
  { path: '/document-generator', label: 'Document Generator' },
  { path: '/about', label: 'About' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        height: 'var(--nav-height)',
      }}>
        <div style={{
          maxWidth: 'var(--page-max)', margin: '0 auto',
          padding: '0 24px', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
          height: '100%',
        }}>
          {/* Logo */}
          <Link to="/" style={{
            display: 'flex', alignItems: 'center', gap: 10,
            textDecoration: 'none',
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 16, fontWeight: 900,
              boxShadow: '0 2px 8px rgba(30,58,138,0.3)',
            }}>S</div>
            <div>
              <span style={{
                fontSize: 20, fontWeight: 800, color: 'var(--primary)',
                letterSpacing: '-0.03em',
              }}>SETU</span>
              <div style={{
                fontSize: 9, color: 'var(--text-muted)', fontWeight: 500,
                letterSpacing: '0.05em', marginTop: -2,
              }}>LEGAL AWARENESS</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hide-mobile" style={{
            display: 'flex', gap: 2,
          }}>
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} style={{
                padding: '8px 14px', borderRadius: 8, fontSize: 13,
                fontWeight: location.pathname === link.path ? 600 : 500,
                color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-secondary)',
                background: location.pathname === link.path ? 'var(--primary-bg)' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}>{link.label}</Link>
            ))}
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 40, height: 40, borderRadius: 10,
            border: '1px solid var(--border)', background: 'var(--card)',
            color: 'var(--text)',
          }}
          className="show-mobile-only"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="fade-in" style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            background: '#fff', borderBottom: '1px solid var(--border)',
            padding: '12px 20px 16px',
            boxShadow: 'var(--shadow-lg)',
          }}>
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} onClick={() => setMenuOpen(false)} style={{
                display: 'block', padding: '12px 14px', borderRadius: 10,
                fontSize: 15, fontWeight: location.pathname === link.path ? 600 : 400,
                color: location.pathname === link.path ? 'var(--primary)' : 'var(--text)',
                background: location.pathname === link.path ? 'var(--primary-bg)' : 'transparent',
                textDecoration: 'none', marginBottom: 2,
              }}>{link.label}</Link>
            ))}
            <Link to="/disclaimer" onClick={() => setMenuOpen(false)} style={{
              display: 'block', padding: '12px 14px', borderRadius: 10,
              fontSize: 15, fontWeight: location.pathname === '/disclaimer' ? 600 : 400,
              color: location.pathname === '/disclaimer' ? 'var(--primary)' : 'var(--text-muted)',
              background: location.pathname === '/disclaimer' ? 'var(--primary-bg)' : 'transparent',
              textDecoration: 'none',
            }}>Legal Disclaimer</Link>
          </div>
        )}
      </nav>

      <style>{`
        @media (min-width: 769px) {
          .show-mobile-only { display: none !important; }
        }
      `}</style>
    </>
  );
}
