import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SKILLS } from '../data';

const Skills: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <div className="container" ref={ref}>
        <motion.p
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Tech Stack
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Skills & <span className="gradient-text">Technologies</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            marginTop: '0.75rem',
            marginBottom: '3rem',
          }}
        >
          4.5+ years across MERN stack, IoT systems, and now AI engineering.
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.category}
              className="card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              onClick={() => setActiveCategory(activeCategory === skill.category ? null : skill.category)}
              style={{
                padding: '1.75rem',
                cursor: 'pointer',
                borderColor: activeCategory === skill.category ? 'rgba(0,212,255,0.4)' : undefined,
                background: activeCategory === skill.category ? 'rgba(0,212,255,0.04)' : undefined,
              }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.99 }}
              data-cursor="pointer"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '1.4rem' }}>{skill.icon}</span>
                <h3 style={{
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.01em',
                }}>
                  {skill.category}
                </h3>
                <span style={{
                  marginLeft: 'auto',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--text-muted)',
                }}>
                  {skill.items.length} skills
                </span>
              </div>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}>
                {skill.items.map((item, j) => (
                  <motion.span
                    key={item}
                    className="tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.2 + i * 0.05 + j * 0.04 }}
                    whileHover={{
                      background: 'rgba(0,212,255,0.18)',
                      borderColor: 'var(--accent-cyan)',
                      scale: 1.05,
                    }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom marquee of all tools */}
        <div style={{
          marginTop: '4rem',
          overflow: 'hidden',
          padding: '1.5rem 0',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}>
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex', gap: '3rem', whiteSpace: 'nowrap' }}
          >
            {[...SKILLS.flatMap(s => s.items), ...SKILLS.flatMap(s => s.items)].map((item, i) => (
              <span key={i} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
              }}>
                {i % 5 === 0
                  ? <span style={{ color: 'var(--accent-cyan)' }}>✦</span>
                  : '·'} {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
