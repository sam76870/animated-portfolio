import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PROJECTS } from '../data';

const ProjectCard: React.FC<{ project: typeof PROJECTS[number]; index: number; inView: boolean }> = ({
  project, index, inView,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
      data-cursor="pointer"
    >
      {/* Gradient accent background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: project.gradient,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s',
        pointerEvents: 'none',
      }} />

      {/* Featured badge */}
      {project.featured && (
        <span style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.25rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.12em',
          color: project.accent,
          border: `1px solid ${project.accent}44`,
          background: `${project.accent}11`,
          padding: '0.2rem 0.6rem',
          borderRadius: '100px',
        }}>
          FEATURED
        </span>
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Project number */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: project.accent,
          letterSpacing: '0.1em',
          marginBottom: '1rem',
          opacity: 0.7,
        }}>
          {String(index + 1).padStart(2, '0')}
        </p>

        <h3 style={{
          fontWeight: 700,
          fontSize: '1.3rem',
          color: 'var(--text-primary)',
          letterSpacing: '-0.01em',
          marginBottom: '0.35rem',
          transition: 'color 0.2s',
        }}>
          {project.title}
        </h3>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: project.accent,
          letterSpacing: '0.08em',
          marginBottom: '1rem',
        }}>
          {project.subtitle}
        </p>

        <p style={{
          fontSize: '0.88rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.75,
          marginBottom: '1.5rem',
        }}>
          {project.description}
        </p>

        {/* Impact badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: `${project.accent}11`,
          border: `1px solid ${project.accent}33`,
          borderRadius: '100px',
          padding: '0.3rem 0.75rem',
          marginBottom: '1.5rem',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: project.accent }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: project.accent,
            letterSpacing: '0.06em',
          }}>
            {project.impact}
          </span>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
          {project.tags.map(tag => (
            <span key={tag} className="tag" style={{ borderColor: `${project.accent}33`, color: project.accent }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
          {project.link && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: 3 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: project.accent,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                transition: 'opacity 0.2s',
              }}
              data-cursor="pointer"
            >
              Live Demo ↗
            </motion.a>
          )}
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: 3 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
              data-cursor="pointer"
            >
              GitHub ⌥
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="projects" className="section">
      <div className="container" ref={ref}>
        <motion.p
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
        >
          Work
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          Featured <span className="gradient-text">Projects</span>
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
          Things I've built that I'm proud of.
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
