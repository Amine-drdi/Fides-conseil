import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TrustNetworkGraph from '@/components/TrustNetworkGraph';

gsap.registerPlugin(ScrollTrigger);

export default function StructureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const graph = graphRef.current;
    const cards = cardsRef.current;
    if (!section || !title || !graph || !cards) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      title,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    ).fromTo(
      graph,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
      '-=0.3'
    );

    // Cards stagger
    const cardElements = cards.querySelectorAll('.structure-card');
    tl.fromTo(
      cardElements,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
      '-=0.5'
    );

    return () => {
      tl.kill();
    };
  }, []);

  const poles = [
    {
      title: 'Pôle Financier',
      desc: 'Gestion de portefeuille, placements, épargne retraite et optimisation du rendement.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5">
          <path d="M3 21L21 3M7 3v18M17 3v18M3 7h18M3 17h18" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'Pôle Juridique',
      desc: 'Droit de la famille, succession, transmission patrimoniale et structuration.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Courtage en Assurances',
      desc: 'Protection famille, prévoyance, assurance-vie et solutions professionnelles.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Conseil Fiscal',
      desc: 'Optimisation fiscale, défiscalisation, déclarations et stratégie patrimoniale.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="structure"
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 24px',
        backgroundColor: 'var(--color-bg-dark)',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Section header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '80px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
            }}
          >
            Notre Organisation
          </span>
          <h2
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 400,
              color: 'var(--color-text-primary)',
              marginTop: '20px',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              opacity: 0,
            }}
          >
            Une architecture au service
            <br />
            de vos actifs
          </h2>
        </div>

        {/* Graph container */}
        <div
          ref={graphRef}
          style={{
            width: '100%',
            height: '500px',
            position: 'relative',
            marginBottom: '80px',
            opacity: 0,
          }}
        >
          <TrustNetworkGraph />
        </div>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {poles.map((pole) => (
            <div
              key={pole.title}
              className="structure-card"
              style={{
                padding: '32px',
                border: '1px solid var(--color-border)',
                backgroundColor: 'rgba(26, 26, 26, 0.6)',
                transition: 'border-color 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-accent)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ marginBottom: '20px' }}>{pole.icon}</div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: '12px',
                }}
              >
                {pole.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  fontWeight: 300,
                  lineHeight: 1.6,
                  color: 'var(--color-text-secondary)',
                }}
              >
                {pole.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
