import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToSection } from '@/components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const profils = [
  {
    title: 'Particuliers & familles',
    description: 'Construire, protéger et transmettre un patrimoine familial en toute sérénité.',
    enjeux: ['Épargne de précaution', 'Projets de vie', 'Transmission aux enfants'],
    image: '/images/pillar-famille.jpg',
  },
  {
    title: "Chefs d'entreprise",
    description: 'Articuler patrimoine professionnel et personnel, protéger le dirigeant et préparer la cession.',
    enjeux: ['Protection du dirigeant', 'Retraite du dirigeant', "Transmission d'entreprise"],
    image: null,
  },
  {
    title: 'Professionnels de santé',
    description: 'Des solutions adaptées aux parcours et contraintes spécifiques des métiers de la santé.',
    enjeux: ['Installation & cabinet', 'Prévoyance renforcée', 'Transmission du cabinet'],
    image: '/images/pillar-medecin.jpg',
  },
  {
    title: 'Professions libérales',
    description: 'Optimiser une activité indépendante : fiscalité, retraite et protection sur mesure.',
    enjeux: ['Fiscalité du BNC', 'Retraite complémentaire', 'Protection sociale'],
    image: null,
  },
  {
    title: 'Cadres & dirigeants',
    description: "Valoriser des revenus élevés et anticiper les étapes clés d'une carrière exigeante.",
    enjeux: ['Optimisation fiscale', 'Investissement structuré', 'Préparation retraite'],
    image: null,
  },
];

export default function ProfilsSection() {
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
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        `-=${0.45 - i * 0.05}`
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
      id="profils"
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
            Pour qui ?
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
            Un accompagnement adapté à chaque profil.
          </h2>
        </div>

        {/* Profile cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
          }}
        >
          {profils.map((profil, index) => (
            <div
              key={profil.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(26, 26, 26, 0.08)',
                opacity: 0,
                transition: 'all 0.4s ease',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C5A059';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(26, 26, 26, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(26, 26, 26, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {profil.image && (
                <div style={{ height: '180px', overflow: 'hidden' }}>
                  <img
                    src={profil.image}
                    alt={profil.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 30%',
                      filter: 'grayscale(15%)',
                      transition: 'filter 0.5s ease, transform 0.5s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = 'grayscale(0%)';
                      e.currentTarget.style.transform = 'scale(1.04)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = 'grayscale(15%)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                </div>
              )}
              <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#C5A059',
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#1A1A1A',
                  marginTop: '14px',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.3,
                }}
              >
                {profil.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13.5px',
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: '#555',
                  marginTop: '10px',
                }}
              >
                {profil.description}
              </p>

              {/* Enjeux */}
              <div
                style={{
                  marginTop: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '7px',
                  flexGrow: 1,
                }}
              >
                {profil.enjeux.map((enjeu) => (
                  <div key={enjeu} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: '#C5A059',
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '12px',
                        fontWeight: 400,
                        color: '#1A1A1A',
                      }}
                    >
                      {enjeu}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
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
                  letterSpacing: '0.12em',
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
                Parler à un conseiller
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" />
                </svg>
              </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
