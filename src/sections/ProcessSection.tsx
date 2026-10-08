import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Le Premier Contact',
    description:
      "Nous prenons le temps de vous connaître. Vos objectifs, votre situation familiale, professionnelle et patrimoniale. Cette première rencontre est l'occasion d'établir une relation de confiance et de comprendre vos attentes.",
  },
  {
    number: '02',
    title: 'Le Bilan Patrimonial',
    description:
      "Nous réalisons un audit complet de votre situation : patrimoine immobilier, financier, fiscal, social et successoral. Cette photographie à 360° permet d'identifier vos atouts, vos contraintes et les opportunités d'optimisation.",
  },
  {
    number: '03',
    title: 'La Stratégie Personnalisée',
    description:
      "Sur la base de notre analyse, nous élaborons une stratégie patrimoniale sur mesure. Chaque recommandation est justifiée, chaque solution est sélectionnée en fonction de votre profil de risque et de vos objectifs de vie.",
  },
  {
    number: '04',
    title: 'La Mise en Oeuvre',
    description:
      "Nous mettons en place les solutions retenues en coordination avec nos partenaires. Notre équipe pilote l'intégralité des démarches administratives pour vous garantir une expérience fluide et sans contrainte.",
  },
  {
    number: '05',
    title: "Le Suivi & l'Ajustement",
    description:
      "Le patrimoine vit et évolue. Nous assurons un suivi régulier de votre situation et ajustons la stratégie en fonction des changements législatifs, de votre vie personnelle et des opportunités du marché.",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const line = lineRef.current;
    if (!section || !header) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      header,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    // Animate the vertical line
    if (line) {
      tl.fromTo(
        line,
        { scaleY: 0 },
        { scaleY: 1, duration: 1.5, ease: 'power2.out', transformOrigin: 'top' },
        '-=0.3'
      );
    }

    stepsRef.current.forEach((step, i) => {
      if (!step) return;
      tl.fromTo(
        step,
        { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' },
        `-=${0.5}`
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="methode"
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 24px',
        backgroundColor: '#F5F5F5',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            marginBottom: '100px',
            opacity: 0,
          }}
        >
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
            Notre Approche
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 400,
              color: '#1A1A1A',
              marginTop: '16px',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Notre méthode en 5 étapes
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div
            ref={lineRef}
            style={{
              position: 'absolute',
              left: '24px',
              top: 0,
              bottom: 0,
              width: '1px',
              backgroundColor: 'rgba(197, 160, 89, 0.3)',
              transform: 'scaleY(0)',
            }}
          />

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => {
                  if (el) stepsRef.current[index] = el;
                }}
                style={{
                  display: 'flex',
                  gap: '32px',
                  alignItems: 'flex-start',
                  opacity: 0,
                  paddingLeft: '8px',
                }}
              >
                {/* Number circle */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '2px solid #C5A059',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    backgroundColor: '#F5F5F5',
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#C5A059',
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div style={{ paddingTop: '8px' }}>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '24px',
                      fontWeight: 600,
                      color: '#1A1A1A',
                      marginBottom: '12px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '15px',
                      fontWeight: 300,
                      lineHeight: 1.7,
                      color: '#555',
                      maxWidth: '600px',
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '80px',
          }}
        >
          <a
            href="#contact"
            data-hover
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#1A1A1A',
              padding: '16px 40px',
              border: '2px solid #1A1A1A',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1A1A1A';
              e.currentTarget.style.color = '#F5F5F5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#1A1A1A';
            }}
          >
            Démarrer mon bilan
          </a>
        </div>
      </div>
    </section>
  );
}
