import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import AnimatedLogo from './AnimatedLogo';

const NAV_LINKS = [
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Experience', to: 'experience' },
  { label: 'Contact', to: 'contact' },
];

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const toggleLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '1.1rem 2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.04 }} style={{ cursor: 'pointer' }} data-cursor="pointer">
          <AnimatedLogo size={30} />
        </motion.div>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {NAV_LINKS.map((link, i) => (
            <motion.div
              key={link.to}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              style={{ display: 'none' }}
              className="nav-desktop-item"
            >
              <Link
                to={link.to}
                smooth
                duration={600}
                offset={-80}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  textDecoration: 'none',
                }}
                activeStyle={{ color: 'var(--accent-cyan)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <span style={{ color: 'var(--accent-cyan)', marginRight: '4px' }}>
                  {String(i + 1).padStart(2, '0')}.
                </span>
                {link.label}
              </Link>
            </motion.div>
          ))}

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={toggleLabel}
            data-cursor="pointer"
            style={{
              width: 58,
              height: 30,
              borderRadius: 100,
              border: '1px solid var(--border-hover)',
              background: 'var(--bg-card)',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{
                  x: theme === 'dark' ? [0, 10, 0] : [0, -10, 0],
                  y: [0, i % 2 === 0 ? -1.5 : 1.5, 0],
                }}
                transition={{
                  duration: 1.6 + i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.15,
                }}
                style={{
                  position: 'absolute',
                  left: 8 + i * 13,
                  top: 7 + (i % 2) * 10,
                  width: 6,
                  height: 6,
                  borderRadius: 2,
                  background: i === 1 ? 'var(--accent-purple)' : 'var(--accent-cyan)',
                  opacity: 0.75,
                }}
              />
            ))}
            <motion.span
              animate={{ x: theme === 'dark' ? 28 : 2 }}
              transition={{ type: 'spring', stiffness: 240, damping: 20 }}
              style={{
                position: 'absolute',
                top: 2,
                left: 2,
                width: 24,
                height: 24,
                borderRadius: 999,
                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
                boxShadow: '0 4px 14px rgba(0, 212, 255, 0.25)',
                display: 'grid',
                placeItems: 'center',
                color: '#fff',
                fontSize: '0.72rem',
              }}
            >
              {theme === 'dark' ? '☀' : '☾'}
            </motion.span>
          </button>

        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'none',
          }}
          aria-label="Toggle menu"
          className="hamburger"
        >
          <div style={{
            width: 24,
            height: 2,
            background: 'var(--accent-cyan)',
            marginBottom: 5,
            borderRadius: 2,
            transition: 'all 0.3s',
            transform: mobileOpen ? 'rotate(45deg) translateY(7px)' : 'none',
          }} />
          <div style={{
            width: 24,
            height: 2,
            background: 'var(--accent-cyan)',
            marginBottom: 5,
            borderRadius: 2,
            opacity: mobileOpen ? 0 : 1,
            transition: 'all 0.3s',
          }} />
          <div style={{
            width: 24,
            height: 2,
            background: 'var(--accent-cyan)',
            borderRadius: 2,
            transition: 'all 0.3s',
            transform: mobileOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
          }} />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '70vw',
              maxWidth: 320,
              background: 'var(--nav-bg-mobile)',
              backdropFilter: 'blur(20px)',
              borderLeft: '1px solid var(--border-hover)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2.5rem',
              padding: '2rem',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                <Link
                  to={link.to}
                  smooth
                  duration={600}
                  offset={-80}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.1rem',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ color: 'var(--accent-cyan)' }}>
                    {String(i + 1).padStart(2, '0')}.{' '}
                  </span>
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={toggleLabel}
              className="btn btn-outline"
              data-cursor="pointer"
            >
              {theme === 'dark' ? 'Light Theme ☀' : 'Dark Theme ☾'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 769px) {
          .nav-desktop-item { display: block !important; }
          .hamburger { display: none !important; }
        }
        @media (max-width: 768px) {
          .hamburger { display: block !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
