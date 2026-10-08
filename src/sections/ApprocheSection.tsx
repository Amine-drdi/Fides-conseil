import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const blocks = [
  {
    number: '01',
    title: 'Votre situation',
    description: 'Revenus, patrimoine, fiscalité, famille, activité professionnelle.',
  },
  {
    number: '02',
    title: 'Vos objectifs',
    description: 'Ce que vous souhaitez construire, protéger ou transmettre.',
  },
  {
    number: '03',
    title: 'Vos contraintes',
    description: 'Fiscalité, horizon, liquidité, niveau de risque et situation familiale.',
  },
  {
    number: '04',
    title: 'Votre stratégie',
    description: 'Une stratégie patrimoniale cohérente avec vos objectifs.',
  },
];

export default function ApprocheSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 65%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(header, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });

    blocksRef.current.forEach((block, i) => {
      if (!block) return;
      tl.fromTo(
        block,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        `-=${0.5 - i * 0.08}`
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="approche"
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 24px',
        backgroundColor: '#1A1A1A',
        overflow: 'hidden',
      }}
    >
      {/* Decorative line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: '100px',
          background: 'linear-gradient(to bottom, transparent, rgba(197, 160, 89, 0.3))',
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div
          ref={headerRef}
          style={{ textAlign: 'center', marginBottom: '90px', opacity: 0, maxWidth: '800px', margin: '0 auto 90px' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#C5A059',
            }}
          >
            Notre approche
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 400,
              color: '#F8F8F8',
              marginTop: '20px',
              letterSpacing: '-0.02em',
              lineHeight: 1.25,
            }}
          >
            Avant de choisir une solution, nous cherchons à{' '}
            <span style={{ color: '#C5A059', fontStyle: 'italic' }}>comprendre votre situation.</span>
          </h2>
        </div>

        {/* 4 blocks */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '0',
          }}
        >
          {blocks.map((block, index) => (
            <div
              key={block.number}
              ref={(el) => {
                if (el) blocksRef.current[index] = el;
              }}
              style={{
                padding: '40px 32px',
                borderLeft: index > 0 ? '1px solid #333' : 'none',
                opacity: 0,
                position: 'relative',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '42px',
                  fontWeight: 700,
                  color: 'rgba(197, 160, 89, 0.25)',
                  lineHeight: 1,
                  display: 'block',
                }}
              >
                {block.number}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#F8F8F8',
                  marginTop: '20px',
                  letterSpacing: '-0.01em',
                }}
              >
                {block.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: '#A3A3A3',
                  marginTop: '12px',
                }}
              >
                {block.description}
              </p>
              {/* Connector arrow to next */}
              {index < blocks.length - 1 && (
                <div
                  className="nav-desktop"
                  style={{
                    position: 'absolute',
                    right: '-8px',
                    top: '48px',
                    zIndex: 2,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
