import React, { useId } from 'react';
import { motion } from 'framer-motion';

interface AnimatedLogoProps {
  size?: number;
  loop?: boolean;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ size = 34, loop = false }) => {
  const gradientId = useId();
  const glowId = useId();

  const baseTransition = {
    duration: 1.05,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    repeat: loop ? Infinity : 0,
    repeatDelay: loop ? 1.1 : 0,
  };

  const width = Math.round(size * 2.2);
  const height = Math.round(size * 1.05);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width, height, display: 'inline-flex', alignItems: 'center' }}
      aria-label="SP logo"
    >
      <svg
        viewBox="0 0 210 100"
        width={width}
        height={height}
        role="img"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-cyan)" />
            <stop offset="100%" stopColor="var(--accent-purple)" />
          </linearGradient>
          <filter id={glowId} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d="M68 18C40 18 34 48 60 53L78 57C98 61 93 86 66 86C47 86 35 78 31 64"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${glowId})`}
          initial={{ pathLength: 0, opacity: 0.4 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={baseTransition}
        />
        <motion.path
          d="M118 84V18H153C172 18 181 29 181 43C181 57 172 67 153 67H118"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${glowId})`}
          initial={{ pathLength: 0, opacity: 0.4 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            ...baseTransition,
            delay: 0.15,
          }}
        />
      </svg>
    </motion.div>
  );
};

export default AnimatedLogo;
