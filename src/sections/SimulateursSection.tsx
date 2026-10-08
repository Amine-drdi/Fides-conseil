import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToSection } from '@/components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const simulateurs = [
  {
    title: 'Simuler ma retraite',
    description: 'Estimez vos revenus futurs et le niveau d\'épargne nécessaire pour maintenir votre niveau de vie.',
  },
  {
    title: 'Estimer mon économie fiscale',
    description: 'Évaluez le potentiel de réduction d\'impôt offert par les dispositifs adaptés à votre situation.',
  },
  {
    title: 'Calculer mon effort d\'épargne',
    description: 'Déterminez la capacité d\'épargne mensuelle idéale au regard de vos projets et de votre budget.',
  },
  {
    title: 'Évaluer mon projet immobilier',
    description: 'Mesurez la faisabilité et la rentabilité de votre projet d\'investissement immobilier.',
  },
];

export default function SimulateursSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

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

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      tl.fromTo(
        card,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        `-=${0.45 - i * 0.06}`
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection('#contact');
  };

  return (
    <section
      ref={sectionRef}
      id="simulateurs"
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 24px',
        backgroundColor: '#1A1A1A',
        overflow: 'hidden',
      }}
    >
      {/* Decorative element */}
      <div
        style={{
          position: 'absolute',
          bottom: '-150px',
          left: '-150px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          border: '1px solid rgba(197, 160, 89, 0.08)',
          pointerEvents: 'none',
        }}
      />

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
              color: '#C5A059',
            }}
          >
            Simulateurs
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(30px, 4.5vw, 52px)',
              fontWeight: 400,
              color: '#F8F8F8',
              marginTop: '16px',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Un premier chiffre, avant le premier rendez-vous.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.7,
              color: '#A3A3A3',
              marginTop: '18px',
              maxWidth: '580px',
              margin: '18px auto 0',
            }}
          >
            Nos simulations personnalisées sont réalisées avec un conseiller FIDES, car chaque
            situation mérite une analyse — pas un simple calcul automatisé.
          </p>
        </div>

        {/* Simulator cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {simulateurs.map((sim, index) => (
            <div
              key={sim.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid #333',
                padding: '36px 30px',
                opacity: 0,
                transition: 'all 0.35s ease',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C5A059';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#333';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#C5A059',
                  letterSpacing: '0.1em',
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '21px',
                  fontWeight: 600,
                  color: '#F8F8F8',
                  marginTop: '14px',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.3,
                }}
              >
                {sim.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13.5px',
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: '#A3A3A3',
                  marginTop: '10px',
                  flexGrow: 1,
                }}
              >
                {sim.description}
              </p>
              <a
                href="#contact"
                onClick={handleClick}
                data-hover
                style={{
                  marginTop: '26px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '10.5px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#C5A059',
                  textDecoration: 'none',
                  alignSelf: 'flex-start',
                  transition: 'gap 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.gap = '12px')}
                onMouseLeave={(e) => (e.currentTarget.style.gap = '8px')}
              >
                Lancer ma simulation
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
