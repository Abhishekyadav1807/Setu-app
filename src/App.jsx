import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LegalKnowledgePage from './pages/LegalKnowledgePage';
import LawDetailPage from './pages/LawDetailPage';
import LegalProceduresPage from './pages/LegalProceduresPage';
import ProcedureDetailPage from './pages/ProcedureDetailPage';
import SchemesPage from './pages/SchemesPage';
import DocumentGeneratorPage from './pages/DocumentGeneratorPage';
import AboutPage from './pages/AboutPage';
import DisclaimerPage from './pages/DisclaimerPage';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { t } = useLanguage();
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/legal-knowledge" element={<LegalKnowledgePage />} />
            <Route path="/legal-knowledge/:slug" element={<LawDetailPage />} />
            <Route path="/legal-procedures" element={<LegalProceduresPage />} />
            <Route path="/legal-procedures/:slug" element={<ProcedureDetailPage />} />
            <Route path="/government-schemes" element={<SchemesPage />} />
            <Route path="/document-generator" element={<DocumentGeneratorPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
          </Routes>
        </main>
        <a
          href="https://setu-legalbuddy.vercel.app/chat"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-chat-btn"
          style={{
            position: 'fixed',
            right: 18,
            bottom: 18,
            zIndex: 1000,
            padding: '10px 14px',
            borderRadius: 999,
            background: 'linear-gradient(135deg, #2563EB, #1E40AF)',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: 13,
            boxShadow: '0 8px 18px rgba(30,64,175,0.3)',
            border: '1px solid rgba(255,255,255,0.24)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {t('fab.chat')}
        </a>
        <Footer />
      </div>
    </Router>
  );
}
