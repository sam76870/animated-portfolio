import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { PERSONAL, EMAILJS_CONFIG } from '../data';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: FormState = { name: '', email: '', subject: '', message: '' };
const EMAILJS_PLACEHOLDERS = ['YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', 'YOUR_PUBLIC_KEY'];

const hasValidEmailJsConfig = () => {
  const values = [EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, EMAILJS_CONFIG.publicKey];
  return values.every(value => value && !EMAILJS_PLACEHOLDERS.includes(value));
};

const normalizeHandle = (url: string) =>
  url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');

const Contact: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    if (!hasValidEmailJsConfig()) {
      toast.error('Setup needed: add your EmailJS keys in src/data.ts.');
      return;
    }

    setLoading(true);
    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject || 'Portfolio Contact',
          message: form.message,
          to_email: PERSONAL.email,
        },
        EMAILJS_CONFIG.publicKey,
      );
      toast.success('Message sent! I\'ll get back to you soon 🚀', { duration: 5000 });
      setForm(INITIAL_FORM);
    } catch (err) {
      toast.error('Something went wrong. Please try emailing me directly.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    width: '100%',
    background: focused === name ? 'rgba(0,212,255,0.04)' : 'rgba(255,255,255,0.02)',
    border: `1px solid ${focused === name ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.07)'}`,
    borderRadius: 8,
    padding: '0.9rem 1.1rem',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.92rem',
    outline: 'none',
    transition: 'all 0.25s ease',
    boxShadow: focused === name ? '0 0 0 3px rgba(0,212,255,0.08)' : 'none',
  });

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    letterSpacing: '0.12em',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    marginBottom: '0.4rem',
  };

  return (
    <section id="contact" className="section">
      <div className="container" ref={ref}>
        <motion.p
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
        >
          Contact
        </motion.p>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          Ask Me <span className="gradient-text">Anything</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            marginTop: '0.75rem',
            marginBottom: '3.5rem',
            maxWidth: 560,
          }}
        >
          Have a question, a project idea, or just want to say hi? Drop a message below —
          it goes straight to my inbox.
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: '4rem',
          alignItems: 'start',
        }}>

          {/* Left: Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {/* Contact cards */}
            {[
              {
                icon: '✉',
                label: 'Email',
                value: PERSONAL.email,
                href: `mailto:${PERSONAL.email}`,
                accent: 'var(--accent-cyan)',
              },
              {
                icon: '↗',
                label: 'LinkedIn',
                value: normalizeHandle(PERSONAL.linkedin),
                href: PERSONAL.linkedin,
                accent: 'var(--accent-purple)',
              },
              {
                icon: '⌥',
                label: 'GitHub',
                value: normalizeHandle(PERSONAL.github),
                href: PERSONAL.github,
                accent: 'var(--accent-green)',
              },
              {
                icon: '📍',
                label: 'Location',
                value: PERSONAL.location,
                href: null,
                accent: '#ff6b6b',
              },
            ].map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="card"
                whileHover={{ x: 6 }}
                style={{ padding: '1.1rem 1.25rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
                data-cursor="pointer"
              >
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: `${c.accent}15`,
                  border: `1px solid ${c.accent}33`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  flexShrink: 0,
                }}>
                  {c.icon}
                </div>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '0.15rem',
                  }}>
                    {c.label}
                  </p>
                  {c.href ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link"
                      style={{ fontSize: '0.85rem', color: c.accent }}
                      data-cursor="pointer"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {c.value}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Resume download */}
            <motion.a
              href={PERSONAL.resumeUrl}
              download={PERSONAL.resumeDownloadName}
              className="btn btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.65 }}
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
              data-cursor="pointer"
            >
              ↓ Download My Resume
            </motion.a>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.75 }}
              style={{
                marginTop: '1.5rem',
                padding: '1rem 1.25rem',
                background: 'rgba(0,255,136,0.05)',
                border: '1px solid rgba(0,255,136,0.2)',
                borderRadius: 'var(--radius)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <span style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--accent-green)',
                flexShrink: 0,
                boxShadow: '0 0 8px var(--accent-green)',
                animation: 'availability-pulse 2s infinite',
              }} />
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--accent-green)',
                letterSpacing: '0.06em',
                lineHeight: 1.5,
              }}>
                Currently open to full-time roles at AI startups & product companies.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {/* Name */}
              <div>
                <label style={labelStyle}>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  placeholder="John Doe"
                  style={inputStyle('name')}
                  required
                />
              </div>
              {/* Email */}
              <div>
                <label style={labelStyle}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="john@company.com"
                  style={inputStyle('email')}
                  required
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label style={labelStyle}>Subject</label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                onFocus={() => setFocused('subject')}
                onBlur={() => setFocused(null)}
                style={{
                  ...inputStyle('subject'),
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238892b0' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                }}
              >
                <option value="">Select a topic...</option>
                <option value="Full-time Opportunity">Full-time Opportunity</option>
                <option value="Freelance Project">Freelance Project</option>
                <option value="Technical Question">Technical Question</option>
                <option value="Collaboration">Collaboration</option>
                <option value="AI / LLM Project">AI / LLM Project</option>
                <option value="Just saying hi">Just saying hi 👋</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label style={labelStyle}>Message *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                placeholder="Ask me anything — technical questions, project ideas, or just a hello..."
                rows={6}
                style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 140 }}
                required
              />
            </div>

            {/* Character count */}
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
              textAlign: 'right',
              marginTop: '-0.75rem',
            }}>
              {form.message.length} chars
            </p>

            {/* Submit */}
            <motion.button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.97 } : {}}
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '0.9rem',
                fontSize: '0.95rem',
                opacity: loading ? 0.75 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
              data-cursor="pointer"
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" style={{ animation: 'spin 0.8s linear infinite' }}>
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" fill="none" strokeDasharray="40 20" />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message ✉'
              )}
            </motion.button>

            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
              textAlign: 'center',
              letterSpacing: '0.06em',
            }}>
              Your message goes directly to my professional inbox.
              I typically respond within 24 hours.
            </p>
            {!hasValidEmailJsConfig() && (
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                color: 'var(--text-muted)',
                textAlign: 'center',
                letterSpacing: '0.05em',
              }}>
                Setup reminder: sign up at emailjs.com, create Gmail service + template,
                then paste serviceId/templateId/publicKey in src/data.ts.
              </p>
            )}
          </motion.form>
        </div>
      </div>

      <style>{`
        @keyframes availability-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px var(--accent-green); }
          50% { opacity: 0.6; box-shadow: 0 0 16px var(--accent-green); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          #contact .container > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 500px) {
          #contact form > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
