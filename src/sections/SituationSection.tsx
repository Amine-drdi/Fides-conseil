import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToSection } from '@/components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const situations = [
  {
    title: 'Construire mon patrimoine',
    description: 'Développer mon épargne et investir efficacement.',
    target: '#expertises',
  },
  {
    title: 'Préparer ma retraite',
    description: 'Anticiper mes revenus futurs et organiser mon épargne.',
    target: '#expertises',
  },
  {
    title: 'Optimiser ma fiscalité',
    description: 'Identifier les leviers adaptés à ma situation.',
    target: '#expertises',
  },
  {
    title: 'Protéger mes proches',
    description: 'Sécuriser mes revenus, ma famille et mon avenir.',
    target: '#solutions',
  },
  {
    title: "Investir dans l'immobilier",
    description: 'Développer mon patrimoine immobilier.',
    target: '#solutions',
  },
  {
    title: 'Préparer ma transmission',
    description: 'Anticiper la transmission de mon patrimoine.',
    target: '#expertises',
  },
];

export default function SituationSection() {
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
        `-=${0.45 - i * 0.04}`
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    scrollToSection(target);
  };

  return (
    <section
      ref={sectionRef}
      id="situation"
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 24px',
        backgroundColor: '#F5F5F5',
      }}
    >
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
              color: '#1A1A1A',
              opacity: 0.5,
            }}
          >
            Où en êtes-vous ?
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(30px, 4.5vw, 52px)',
              fontWeight: 400,
              color: '#1A1A1A',
              marginTop: '16px',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Chaque situation patrimoniale est différente.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              fontWeight: 300,
              color: '#555',
              marginTop: '16px',
            }}
          >
            Commencez par identifier votre priorité.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1px',
            backgroundColor: 'rgba(26,26,26,0.08)',
          }}
        >
          {situations.map((situation, index) => (
            <div
              key={situation.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              style={{
                backgroundColor: '#F5F5F5',
                padding: '48px 36px',
                opacity: 0,
                transition: 'background-color 0.4s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '240px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#EFEFEA';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F5F5F5';
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#C5A059',
                    letterSpacing: '0.1em',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '22px',
                    fontWeight: 600,
                    color: '#1A1A1A',
                    marginTop: '16px',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.3,
                  }}
                >
                  {situation.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    fontWeight: 300,
                    lineHeight: 1.6,
                    color: '#555',
                    marginTop: '10px',
                  }}
                >
                  {situation.description}
                </p>
              </div>
              <a
                href={situation.target}
                onClick={(e) => handleClick(e, situation.target)}
                data-hover
                style={{
                  marginTop: '28px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#1A1A1A',
                  textDecoration: 'none',
                  borderBottom: '1px solid #C5A059',
                  paddingBottom: '4px',
                  alignSelf: 'flex-start',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C5A059')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#1A1A1A')}
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
