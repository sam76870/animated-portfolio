import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { EXPERIENCE } from '../data';

const Experience: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <div className="container" ref={ref}>
        <motion.p
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
        >
          Experience
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          Work <span className="gradient-text">History</span>
        </motion.h2>

        <div style={{ marginTop: '3rem', position: 'relative' }}>
          {/* Timeline vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              left: 24,
              top: 0,
              bottom: 0,
              width: 1,
              background: 'linear-gradient(to bottom, var(--accent-cyan), var(--accent-purple), transparent)',
              transformOrigin: 'top',
            }}
          />

          <div style={{ paddingLeft: '4rem' }}>
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.3 + i * 0.15 }}
                style={{ position: 'relative', marginBottom: '3.5rem' }}
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.15, type: 'spring', stiffness: 200 }}
                  style={{
                    position: 'absolute',
                    left: -44,
                    top: 6,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: exp.accent,
                    boxShadow: `0 0 20px ${exp.accent}66`,
                    border: '3px solid var(--bg-primary)',
                  }}
                />

                {/* Card */}
                <motion.div
                  className="card"
                  whileHover={{ x: 6, borderColor: `${exp.accent}44` }}
                  style={{ padding: '1.75rem 2rem' }}
                  data-cursor="pointer"
                >
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                  }}>
                    <div>
                      <h3 style={{
                        fontWeight: 700,
                        fontSize: '1.15rem',
                        color: 'var(--text-primary)',
                        marginBottom: '0.25rem',
                      }}>
                        {exp.role}
                      </h3>
                      <p style={{
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: exp.accent,
                        marginBottom: '0.2rem',
                      }}>
                        {exp.company}
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.06em',
                      }}>
                        📍 {exp.location}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        display: 'inline-block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: exp.accent,
                        background: `${exp.accent}11`,
                        border: `1px solid ${exp.accent}33`,
                        padding: '0.3rem 0.75rem',
                        borderRadius: '100px',
                        letterSpacing: '0.06em',
                        marginBottom: '0.4rem',
                      }}>
                        {exp.period}
                      </span>
                      <br />
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.08em',
                      }}>
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{
                    height: 1,
                    background: `linear-gradient(to right, ${exp.accent}33, transparent)`,
                    marginBottom: '1.25rem',
                  }} />

                  {/* Highlights */}
                  <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
                    {exp.highlights.map((h, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + i * 0.15 + j * 0.05 }}
                        style={{
                          display: 'flex',
                          gap: '0.75rem',
                          alignItems: 'flex-start',
                          marginBottom: '0.65rem',
                          fontSize: '0.9rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.65,
                        }}
                      >
                        <span style={{ color: exp.accent, flexShrink: 0, marginTop: '0.05em' }}>▸</span>
                        {h}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
