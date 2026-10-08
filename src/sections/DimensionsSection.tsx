import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const dimensions = [
  { label: 'Patrimoine financier', pos: { top: '4%', left: '50%' } },
  { label: 'Immobilier', pos: { top: '17%', left: '82.5%' } },
  { label: 'Fiscalité', pos: { top: '50%', left: '96%' } },
  { label: 'Retraite', pos: { top: '83%', left: '82.5%' } },
  { label: 'Protection', pos: { top: '96%', left: '50%' } },
  { label: 'Patrimoine professionnel', pos: { top: '83%', left: '17.5%' } },
  { label: 'Transmission', pos: { top: '50%', left: '4%' } },
  { label: 'Financement', pos: { top: '17%', left: '17.5%' } },
];

export default function DimensionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const diagram = diagramRef.current;
    const mobile = mobileRef.current;
    if (!section || !header) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(header, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });

    if (diagram) {
      tl.fromTo(
        diagram,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
        '-=0.4'
      );
      // Animate nodes one by one
      const nodes = diagram.querySelectorAll('.dim-node');
      tl.fromTo(
        nodes,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.5)' },
        '-=0.6'
      );
      // Animate lines
      const lines = diagram.querySelectorAll('.dim-line');
      tl.fromTo(
        lines,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, stagger: 0.06 },
        '-=1'
      );
    }

    if (mobile) {
      tl.fromTo(mobile, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="dimensions"
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 24px',
        backgroundColor: '#F5F5F5',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '70px', opacity: 0 }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#1A1A1A',
              opacity: 0.5,
            }}
          >
            Un patrimoine, plusieurs dimensions
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(30px, 4.5vw, 52px)',
              fontWeight: 400,
              color: '#1A1A1A',
              marginTop: '16px',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              maxWidth: '700px',
              margin: '16px auto 0',
            }}
          >
            Votre patrimoine ne se résume pas à vos placements.
          </h2>
        </div>

        {/* Desktop: circular diagram */}
        <div
          ref={diagramRef}
          className="desktop-diagram"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '760px',
            aspectRatio: '1',
            margin: '0 auto',
            opacity: 0,
          }}
        >
          {/* Orbit rings */}
          <div
            style={{
              position: 'absolute',
              inset: '12%',
              borderRadius: '50%',
              border: '1px dashed rgba(197, 160, 89, 0.35)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: '24%',
              borderRadius: '50%',
              border: '1px solid rgba(26, 26, 26, 0.08)',
            }}
          />

          {/* Connecting lines (SVG) */}
          <svg
            viewBox="0 0 760 760"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          >
            {[
              [380, 50], [627, 129], [710, 380], [627, 631],
              [380, 710], [133, 631], [50, 380], [133, 129],
            ].map(([x, y], i) => (
              <line
                key={i}
                className="dim-line"
                x1="380"
                y1="380"
                x2={x}
                y2={y}
                stroke="#C5A059"
                strokeWidth="1"
                strokeDasharray="3 4"
                opacity="0.5"
              />
            ))}
          </svg>

          {/* Center circle */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '32%',
              aspectRatio: '1',
              borderRadius: '50%',
              backgroundColor: '#1A1A1A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '24px',
              boxShadow: '0 20px 60px rgba(26, 26, 26, 0.15), 0 0 0 8px rgba(197, 160, 89, 0.1)',
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(15px, 1.8vw, 22px)',
                fontWeight: 600,
                letterSpacing: '0.06em',
                lineHeight: 1.4,
                color: '#C5A059',
                textTransform: 'uppercase',
              }}
            >
              Votre stratégie patrimoniale
            </span>
          </div>

          {/* Dimension nodes */}
          {dimensions.map((dim) => (
            <div
              key={dim.label}
              className="dim-node"
              style={{
                position: 'absolute',
                top: dim.pos.top,
                left: dim.pos.left,
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(197, 160, 89, 0.4)',
                padding: '14px 20px',
                zIndex: 3,
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 20px rgba(26, 26, 26, 0.06)',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1A1A1A';
                const span = e.currentTarget.querySelector('span');
                if (span) span.style.color = '#C5A059';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                const span = e.currentTarget.querySelector('span');
                if (span) span.style.color = '#1A1A1A';
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  color: '#1A1A1A',
                  transition: 'color 0.3s ease',
                }}
              >
                {dim.label}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile: chips grid */}
        <div
          ref={mobileRef}
          className="mobile-diagram"
          style={{
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            opacity: 0,
          }}
        >
          <div
            style={{
              gridColumn: '1 / -1',
              backgroundColor: '#1A1A1A',
              padding: '24px',
              textAlign: 'center',
              marginBottom: '6px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '16px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: '#C5A059',
                textTransform: 'uppercase',
              }}
            >
              Votre stratégie patrimoniale
            </span>
          </div>
          {dimensions.map((dim) => (
            <div
              key={dim.label}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(197, 160, 89, 0.4)',
                padding: '16px 12px',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#1A1A1A',
                }}
              >
                {dim.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
