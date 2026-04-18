import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PERSONAL } from '../data';

const stats = [
  { value: '4.5+', label: 'Years Experience', accent: 'var(--accent-cyan)' },
  { value: '10+', label: 'Projects Shipped', accent: 'var(--accent-purple)' },
  { value: '3', label: 'Major Clients', accent: 'var(--accent-green)' },
  { value: '∞', label: 'Lines of Code', accent: 'var(--accent-cyan)' },
];

const About: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="about" className="section">
      <div className="container" ref={ref}>
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p variants={item} className="section-label">About Me</motion.p>
          <motion.h2 variants={item} className="section-title">
            Who I <span className="gradient-text">Am</span>
          </motion.h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            marginTop: '3rem',
            alignItems: 'start',
          }}>
            {/* Left: Bio */}
            <motion.div variants={item}>
              {PERSONAL.bio.map((para, i) => (
                <p
                  key={i}
                  style={{
                    color: 'var(--text-secondary)',
                    lineHeight: 1.85,
                    marginBottom: '1.25rem',
                    fontSize: '0.97rem',
                  }}
                >
                  {para}
                </p>
              ))}

              <motion.div
                style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
              >
                <a
                  href={PERSONAL.resumeUrl}
                  download={PERSONAL.resumeDownloadName}
                  className="btn btn-primary"
                  data-cursor="pointer"
                >
                  ↓ Download Resume
                </a>
                <a
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                  data-cursor="pointer"
                >
                  LinkedIn ↗
                </a>
              </motion.div>

              {/* Currently section */}
              <div style={{
                marginTop: '2rem',
                padding: '1.25rem',
                background: 'rgba(0,212,255,0.05)',
                border: '1px solid rgba(0,212,255,0.15)',
                borderRadius: 'var(--radius)',
                borderLeft: '3px solid var(--accent-cyan)',
              }}>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--accent-cyan)',
                  letterSpacing: '0.12em',
                  marginBottom: '0.4rem',
                }}>
                  CURRENTLY
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                  {PERSONAL.currentRole}
                </p>
              </div>
            </motion.div>

            {/* Right: Stats + Timeline */}
            <motion.div variants={item}>
              {/* Stats grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '2.5rem',
              }}>
                {stats.map(s => (
                  <motion.div
                    key={s.label}
                    className="card"
                    whileHover={{ scale: 1.03 }}
                    style={{ padding: '1.5rem', textAlign: 'center' }}
                    data-cursor="pointer"
                  >
                    <div style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '2.5rem',
                      fontWeight: 700,
                      color: s.accent,
                      marginBottom: '0.25rem',
                      letterSpacing: '-0.02em',
                    }}>
                      {s.value}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}>
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tech I work with */}
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
              }}>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--accent-cyan)',
                  letterSpacing: '0.12em',
                  marginBottom: '1rem',
                }}>
                  WHAT I'M LEARNING
                </p>
                {[
                  { label: 'LangChain & RAG Pipelines', pct: 75 },
                  { label: 'LLM Orchestration', pct: 60 },
                  { label: 'ChromaDB & Vector Search', pct: 65 },
                  { label: 'FastAPI + AI Integration', pct: 70 },
                ].map(s => (
                  <div key={s.label} style={{ marginBottom: '1rem' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.82rem',
                      marginBottom: '0.4rem',
                    }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
                      <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
                        {s.pct}%
                      </span>
                    </div>
                    <div style={{
                      height: 4,
                      borderRadius: 4,
                      background: 'rgba(255,255,255,0.06)',
                      overflow: 'hidden',
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${s.pct}%` } : { width: 0 }}
                        transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
                        style={{
                          height: '100%',
                          background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
                          borderRadius: 4,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container > div > div { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
};

export default About;
