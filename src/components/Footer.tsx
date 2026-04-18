import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { PERSONAL } from '../data';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '3rem 0 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow */}
      <div style={{
        position: 'absolute',
        bottom: -60,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 400,
        height: 200,
        background: 'radial-gradient(ellipse, rgba(0,212,255,0.06), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem',
          marginBottom: '2.5rem',
        }}>
          {/* Logo */}
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.3rem',
            fontWeight: 500,
            background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            &lt;SP /&gt;
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {['about', 'skills', 'projects', 'experience', 'contact'].map(s => (
              <Link
                key={s}
                to={s}
                smooth
                duration={600}
                offset={-80}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {s}
              </Link>
            ))}
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            {[
              { label: 'GH', href: PERSONAL.github },
              { label: 'LI', href: PERSONAL.linkedin },
              { label: '✉', href: `mailto:${PERSONAL.email}` },
            ].map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3, color: '#00d4ff' }}
                style={{
                  width: 36,
                  height: 36,
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)';
                  e.currentTarget.style.color = 'var(--accent-cyan)';
                  e.currentTarget.style.background = 'rgba(0,212,255,0.06)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.background = 'transparent';
                }}
                data-cursor="pointer"
              >
                {s.label}
              </motion.a>
            ))}
          </div>
        </div>

        <div style={{
          height: 1,
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)',
          marginBottom: '1.5rem',
        }} />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.06em',
          }}>
            © {year} {PERSONAL.name} — Built with React + TypeScript + Framer Motion
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.06em',
          }}>
            Designed & developed with ❤ in Mumbai
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
