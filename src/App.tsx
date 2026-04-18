import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import AnimatedLogo from './components/AnimatedLogo';

type ThemeMode = 'dark' | 'light';

// ─── Loader ──────────────────────────────────────────────────────────────────
const Loader: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 3;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg-primary)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      {/* Logo */}
      <AnimatedLogo size={78} loop />

      {/* Progress bar */}
      <div style={{ width: 180, position: 'relative' }}>
        <div style={{
          height: 2,
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 2,
          overflow: 'hidden',
        }}>
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
              borderRadius: 2,
              width: `${Math.min(count, 100)}%`,
              transition: 'width 0.1s ease',
            }}
          />
        </div>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
          textAlign: 'right',
          marginTop: '0.5rem',
          letterSpacing: '0.1em',
        }}>
          {Math.min(count, 100)}%
        </p>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        Shubham Pathak · Portfolio
      </motion.p>
    </motion.div>
  );
};

// ─── App ─────────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<ThemeMode>('dark');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('portfolio-theme') as ThemeMode | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(storedTheme ?? (systemPrefersDark ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CustomCursor />
          <ScrollProgress />

          <Navbar
            theme={theme}
            onToggleTheme={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
          />

          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>

          <Footer />

          {/* Back to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="pointer"
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              width: 42,
              height: 42,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              color: '#fff',
              boxShadow: '0 4px 20px rgba(0,212,255,0.3)',
              zIndex: 500,
            }}
            aria-label="Back to top"
          >
            ↑
          </motion.button>
        </motion.div>
      )}

      {/* Toast notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-hover)',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.875rem',
            borderRadius: '10px',
          },
          success: {
            iconTheme: { primary: '#00ff88', secondary: 'var(--bg-secondary)' },
          },
          error: {
            iconTheme: { primary: '#ff6b6b', secondary: 'var(--bg-secondary)' },
          },
        }}
      />
    </>
  );
};

export default App;
