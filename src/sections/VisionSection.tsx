import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const engagements = [
  {
    title: 'Transparence',
    description: 'Une information claire sur nos recommandations, nos partenaires et notre rémunération.',
  },
  {
    title: 'Écoute',
    description: 'Chaque échange commence par vos objectifs, jamais par un produit.',
  },
  {
    title: 'Expertise',
    description: 'Une équipe pluridisciplinaire : finance, droit, fiscalité et protection sociale.',
  },
  {
    title: 'Accompagnement dans la durée',
    description: 'Un suivi régulier, parce qu\'une stratégie patrimoniale se pilote sur le long terme.',
  },
];

export default function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const colsRef = useRef<HTMLDivElement>(null);
  const engageRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 65%',
        toggleActions: 'play none none reverse',
      },
    });

    if (headerRef.current) {
      tl.fromTo(headerRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
    }
    if (colsRef.current) {
      tl.fromTo(
        colsRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out' },
        '-=0.4'
      );
    }
    if (engageRef.current) {
      tl.fromTo(
        engageRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        '-=0.3'
      );
    }
    if (partnersRef.current) {
      tl.fromTo(partnersRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.2');
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="vision"
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 24px',
        backgroundColor: '#1A1A1A',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '90px', opacity: 0 }}>
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
            Notre vision
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
            Un cabinet de conseil,{' '}
            <span style={{ color: '#C5A059', fontStyle: 'italic' }}>pas un vendeur de produits.</span>
          </h2>
        </div>

        {/* Philosophie + Indépendance */}
        <div
          ref={colsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '60px',
            marginBottom: '100px',
          }}
        >
          <div>
            <div style={{ width: '40px', height: '1px', backgroundColor: '#C5A059', marginBottom: '24px' }} />
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '26px',
                fontWeight: 600,
                color: '#F8F8F8',
                letterSpacing: '-0.01em',
                marginBottom: '18px',
              }}
            >
              Notre philosophie
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#A3A3A3',
              }}
            >
              Nous accompagnons nos clients dans la construction, la protection, l'optimisation et la
              transmission de leur patrimoine. Notre conviction : une bonne décision patrimoniale naît
              d'abord d'une compréhension fine de votre situation — jamais d'un catalogue de produits.
              C'est pourquoi chaque mission FIDES commence par une analyse globale : votre famille,
              votre activité, votre fiscalité, vos projets.
            </p>
          </div>
          <div>
            <div style={{ width: '40px', height: '1px', backgroundColor: '#C5A059', marginBottom: '24px' }} />
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '26px',
                fontWeight: 600,
                color: '#F8F8F8',
                letterSpacing: '-0.01em',
                marginBottom: '18px',
              }}
            >
              Notre indépendance
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#A3A3A3',
              }}
            >
              FIDES sélectionne ses solutions en architecture ouverte, auprès des meilleurs acteurs
              du marché, sans lien capitalistique ni objectif commercial imposé. Cette indépendance
              garantit un conseil objectif, orienté vers votre seul intérêt. Nous vous expliquons
              toujours le pourquoi de chaque recommandation — avantages, limites et points de vigilance.
            </p>
          </div>
        </div>

        {/* Engagements */}
        <div style={{ marginBottom: '100px' }}>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(24px, 3vw, 34px)',
              fontWeight: 400,
              color: '#F8F8F8',
              textAlign: 'center',
              marginBottom: '60px',
              letterSpacing: '-0.01em',
            }}
          >
            Nos engagements
          </h3>
          <div
            ref={engageRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1px',
              backgroundColor: '#2A2A2A',
            }}
          >
            {engagements.map((engagement) => (
              <div
                key={engagement.title}
                style={{
                  backgroundColor: '#1A1A1A',
                  padding: '44px 32px',
                  transition: 'background-color 0.4s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#222222')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1A1A1A')}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    border: '1.5px solid #C5A059',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}
                >
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#C5A059' }} />
                </div>
                <h4
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '19px',
                    fontWeight: 600,
                    color: '#F8F8F8',
                    marginBottom: '10px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {engagement.title}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13.5px',
                    fontWeight: 300,
                    lineHeight: 1.65,
                    color: '#A3A3A3',
                  }}
                >
                  {engagement.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Partenaires */}
        <div
          ref={partnersRef}
          style={{
            textAlign: 'center',
            padding: '60px 40px',
            border: '1px solid #2A2A2A',
          }}
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
            Nos partenaires
          </span>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.8,
              color: '#A3A3A3',
              marginTop: '20px',
              maxWidth: '720px',
              margin: '20px auto 0',
            }}
          >
            Nous travaillons avec un réseau de partenaires rigoureusement sélectionnés : compagnies
            d'assurance de premier plan, sociétés de gestion, notaires, experts-comptables et
            spécialistes du financement. Un écosystème mobilisé autour d'un seul objectif — la
            réussite de votre stratégie patrimoniale.
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              marginTop: '36px',
              flexWrap: 'wrap',
            }}
          >
            {['Assureurs', 'Sociétés de gestion', 'Notaires', 'Experts-comptables', 'Banques partenaires'].map(
              (partner) => (
                <span
                  key={partner}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#666',
                  }}
                >
                  {partner}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
