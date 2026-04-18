import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';
import { PERSONAL } from '../data';

// Particle canvas background
const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      r: number; alpha: number;
      color: string;
    }

    const COLORS = ['#00d4ff', '#7b2ff7', '#00ff88'];
    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,212,255,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        opacity: 0.7,
      }}
    />
  );
};

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '5rem',
      }}
    >
      {/* Particle background */}
      <ParticleCanvas />

      {/* Gradient blobs */}
      <div className="glow-blob" style={{
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(0,212,255,0.15), transparent 70%)',
        top: '-10%', right: '-5%',
      }} />
      <div className="glow-blob" style={{
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(123,47,247,0.12), transparent 70%)',
        bottom: '10%', left: '-5%',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '4rem',
          alignItems: 'center',
        }}>
          {/* Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'var(--accent-cyan)',
                letterSpacing: '0.15em',
                marginBottom: '1.25rem',
              }}
            >
              👋 Hello, World! I'm
            </motion.p>

            <motion.h1
              variants={itemVariants}
              style={{
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.0,
                marginBottom: '0.5rem',
                color: 'var(--text-primary)',
              }}
            >
              {PERSONAL.name}
            </motion.h1>

            <motion.div
              variants={itemVariants}
              style={{
                fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                fontWeight: 500,
                marginBottom: '1.5rem',
                minHeight: '2.4em',
              }}
            >
              <span style={{ color: 'var(--text-secondary)' }}>I'm a </span>
              <TypeAnimation
                sequence={PERSONAL.taglines.flatMap(t => [t, 2000])}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                style={{
                  background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                maxWidth: 560,
                marginBottom: '2.5rem',
              }}
            >
              Building scalable web products at{' '}
              <span style={{ color: 'var(--text-primary)' }}>Fynd · Deqode</span>.
              Powering{' '}
              <span style={{ color: 'var(--accent-cyan)' }}>AJIO, TIRA & NetMeds</span>{' '}
              with the Jio Commerce Platform. Transitioning into{' '}
              <span style={{ color: 'var(--accent-purple)' }}>AI Engineering</span> in 2026.
            </motion.p>

            <motion.div
              variants={itemVariants}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
            >
              <Link to="projects" smooth duration={600} offset={-80}>
                <motion.button
                  className="btn btn-primary"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  data-cursor="pointer"
                >
                  View My Work →
                </motion.button>
              </Link>

              <Link to="contact" smooth duration={600} offset={-80}>
                <motion.button
                  className="btn btn-outline"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  data-cursor="pointer"
                >
                  Ask Me Anything ✉
                </motion.button>
              </Link>

              <motion.a
                href={PERSONAL.resumeUrl}
                download={PERSONAL.resumeDownloadName}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  borderBottom: '1px solid rgba(255,255,255,0.15)',
                  paddingBottom: '2px',
                }}
                whileHover={{ color: '#00d4ff' } as any}
                data-cursor="pointer"
              >
                ↓ Download CV
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={itemVariants}
              style={{ display: 'flex', gap: '1.25rem', marginTop: '2.5rem' }}
            >
              {[
                { label: 'GitHub', href: PERSONAL.github, icon: '⌥' },
                { label: 'LinkedIn', href: PERSONAL.linkedin, icon: '↗' },
                { label: `${PERSONAL.location}`, href: '#', icon: '📍' },
              ].map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2 }}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                  data-cursor="pointer"
                >
                  {s.icon} {s.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
            className="hero-photo-wrapper"
          >
            <div style={{ position: 'relative' }}>
              {/* Animated ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  inset: -8,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent-cyan), transparent, var(--accent-purple), transparent)',
                  padding: 3,
                }}
              />
              {/* Photo */}
              <div style={{
                width: 240,
                height: 240,
                borderRadius: '50%',
                overflow: 'hidden',
                position: 'relative',
                border: '3px solid var(--bg-primary)',
              }}>
                <img
                  src={PERSONAL.photoUrl}
                  alt={PERSONAL.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => {
                    // Fallback avatar
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.fallback-avatar')) {
                      const div = document.createElement('div');
                      div.className = 'fallback-avatar';
                      div.style.cssText = `
                        width:100%;height:100%;
                        background:linear-gradient(135deg,#00d4ff22,#7b2ff722);
                        display:flex;align-items:center;justify-content:center;
                        font-size:4rem;font-family:var(--font-sans);font-weight:700;
                        color:var(--accent-cyan);
                      `;
                      div.textContent = 'SP';
                      parent.appendChild(div);
                    }
                  }}
                />
              </div>

              {/* Status badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: 'spring' }}
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: -10,
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--accent-green)',
                  borderRadius: '100px',
                  padding: '0.4rem 0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-green)',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                }}
              >
                <span style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: 'var(--accent-green)',
                  animation: 'pulse-dot 2s infinite',
                }} />
                Open to Work
              </motion.div>
            </div>

          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            position: 'absolute',
            bottom: '-3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.15em',
            }}
          >
            SCROLL
          </motion.div>
          <div style={{
            width: 1,
            height: 40,
            background: 'linear-gradient(to bottom, var(--accent-cyan), transparent)',
            margin: '0 auto',
          }} />
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(0,255,136,0.4); }
          50% { opacity: 0.7; box-shadow: 0 0 0 6px rgba(0,255,136,0); }
        }
        @media (max-width: 768px) {
          .hero-photo-wrapper { display: none !important; }
          #hero > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
