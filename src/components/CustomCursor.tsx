import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let mouse = { x: -100, y: -100 };
    let ring = { x: -100, y: -100 };
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.left = `${mouse.x}px`;
        dotRef.current.style.top = `${mouse.y}px`;
      }
      ring.x += (mouse.x - ring.x) * 0.13;
      ring.y += (mouse.y - ring.y) * 0.13;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.x}px`;
        ringRef.current.style.top = `${ring.y}px`;
      }
      raf = requestAnimationFrame(tick);
    };

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-cursor="pointer"]').forEach(el => {
        el.addEventListener('mouseenter', () => setHovering(true));
        el.addEventListener('mouseleave', () => setHovering(false));
      });
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);

    // Re-attach on DOM changes
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    addListeners();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: hovering ? 0 : 8,
          height: hovering ? 0 : 8,
          background: '#ffffff',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 10000,
          mixBlendMode: 'difference',
          transition: 'width 0.2s, height 0.2s',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: hovering ? 52 : 36,
          height: hovering ? 52 : 36,
          border: `1.5px solid ${hovering ? 'rgba(0,212,255,1)' : 'rgba(0,212,255,0.7)'}`,
          background: hovering ? 'rgba(0,212,255,0.06)' : 'transparent',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          transition: 'width 0.25s, height 0.25s, background 0.2s, border-color 0.2s',
        }}
      />
    </>
  );
};

export default CustomCursor;
