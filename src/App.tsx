import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './themeContext';
import { AuthProvider, useAuth } from './authContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Features } from './pages/Features';
import { Prediction } from './pages/Prediction';
import { Report } from './pages/Report';
import { History } from './pages/History';
import { Contact } from './pages/Contact';
import { AuthPage } from './pages/AuthPage';
import { PredictionResult } from './types';
import { ShieldAlert } from 'lucide-react';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedPrediction, setSelectedPrediction] = useState<PredictionResult | null>(null);
  const { isAuthenticated } = useAuth();

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    if (page === 'prediction' && !isAuthenticated) {
      setCurrentPage('auth');
      return;
    }
    setCurrentPage(page);
  };

  const handleViewReport = (prediction: PredictionResult) => {
    setSelectedPrediction(prediction);
    setCurrentPage('reports');
  };

  const handleStartPrediction = () => {
    if (!isAuthenticated) {
      setCurrentPage('auth');
    } else {
      setCurrentPage('prediction');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 transition-colors duration-300">
      
      {/* Main Top Navigation */}
      <Navbar 
        currentPage={currentPage} 
        activePage={currentPage}
        onNavigate={handleNavigate} 
        setActivePage={handleNavigate}
      />

      {/* Dynamic Page Content */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <Home 
            onStartPrediction={handleStartPrediction} 
            onViewReport={handleViewReport} 
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'about' && (
          <About 
            onStartPrediction={handleStartPrediction} 
          />
        )}

        {currentPage === 'features' && (
          <Features 
            onStartPrediction={handleStartPrediction} 
          />
        )}

        {currentPage === 'prediction' && (
          !isAuthenticated ? (
            <div className="py-4">
              <AuthPage 
                onSuccess={() => setCurrentPage('prediction')} 
                authRequiredNotice="Authentication Required: Please sign in or create an account before running MRI predictions."
              />
            </div>
          ) : (
            <Prediction 
              onPredictionComplete={handleViewReport}
              onViewReport={handleViewReport} 
            />
          )
        )}

        {currentPage === 'reports' && (
          <Report 
            prediction={selectedPrediction} 
            onNewPrediction={handleStartPrediction} 
          />
        )}

        {currentPage === 'history' && (
          <History 
            onViewReport={handleViewReport} 
          />
        )}

        {currentPage === 'contact' && (
          <Contact />
        )}

        {currentPage === 'auth' && (
          <AuthPage 
            onSuccess={() => setCurrentPage('prediction')} 
          />
        )}
      </main>

      {/* Footer */}
      <Footer 
        onNavigate={handleNavigate} 
        setActivePage={handleNavigate}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

