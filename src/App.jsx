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

export default function App() {
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
        <Footer />
      </div>
    </Router>
  );
}
