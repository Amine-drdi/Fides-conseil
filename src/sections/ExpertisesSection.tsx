import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToSection } from '@/components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const expertises = [
  {
    title: 'Gestion de patrimoine',
    description: 'Structurer et développer votre patrimoine dans une vision globale.',
  },
  {
    title: 'Investissement',
    description: 'Construire une allocation adaptée à vos objectifs et à votre horizon.',
  },
  {
    title: 'Fiscalité',
    description: "Identifier les leviers permettant d'améliorer l'efficacité fiscale de votre patrimoine.",
  },
  {
    title: 'Immobilier',
    description: "Accompagner vos projets d'investissement et de constitution de patrimoine immobilier.",
  },
  {
    title: 'Retraite',
    description: 'Préparer progressivement vos revenus futurs.',
  },
  {
    title: 'Protection',
    description: 'Protéger vos revenus, votre famille et votre activité.',
  },
  {
    title: 'Transmission',
    description: 'Anticiper la transmission de votre patrimoine.',
  },
  {
    title: 'Patrimoine professionnel',
    description: 'Accompagner les dirigeants dans la structuration de leur patrimoine professionnel et personnel.',
  },
];

export default function ExpertisesSection() {
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
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        `-=${0.48 - i * 0.03}`
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection('#solutions');
  };

  return (
    <section
      ref={sectionRef}
      id="expertises"
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 24px',
        backgroundColor: '#1A1A1A',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circle */}
      <div
        style={{
          position: 'absolute',
          top: '-200px',
          right: '-200px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          border: '1px solid rgba(197, 160, 89, 0.08)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '80px', opacity: 0 }}>
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
            Nos expertises
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
            Nos expertises au service de votre stratégie.
          </h2>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1px',
            backgroundColor: '#2A2A2A',
          }}
        >
          {expertises.map((expertise, index) => (
            <div
              key={expertise.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              style={{
                backgroundColor: '#1A1A1A',
                padding: '40px 32px',
                opacity: 0,
                transition: 'background-color 0.4s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '220px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#222222';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1A1A1A';
              }}
            >
              <div>
                <div
                  style={{
                    width: '32px',
                    height: '1px',
                    backgroundColor: '#C5A059',
                    marginBottom: '20px',
                  }}
                />
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '21px',
                    fontWeight: 600,
                    color: '#F8F8F8',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.3,
                  }}
                >
                  {expertise.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13.5px',
                    fontWeight: 300,
                    lineHeight: 1.65,
                    color: '#A3A3A3',
                    marginTop: '12px',
                  }}
                >
                  {expertise.description}
                </p>
              </div>
              <a
                href="#solutions"
                onClick={handleClick}
                data-hover
                style={{
                  marginTop: '24px',
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
                Découvrir
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
