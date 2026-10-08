import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToSection } from '@/components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Comprendre',
    description: 'Nous analysons votre situation personnelle, professionnelle et patrimoniale.',
  },
  {
    number: '02',
    title: 'Diagnostiquer',
    description: 'Nous identifions les forces, les faiblesses, les risques et les opportunités.',
  },
  {
    number: '03',
    title: 'Construire',
    description: 'Nous définissons une stratégie cohérente avec vos objectifs.',
  },
  {
    number: '04',
    title: 'Mettre en œuvre',
    description: 'Nous sélectionnons et mettons en place les solutions adaptées.',
  },
  {
    number: '05',
    title: 'Piloter',
    description:
      "Nous suivons l'évolution de votre situation et faisons évoluer votre stratégie lorsque cela est nécessaire.",
  },
];

export default function MethodeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const line = lineRef.current;
    const final = finalRef.current;
    if (!section || !header) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(header, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });

    if (line) {
      tl.fromTo(
        line,
        { scaleY: 0 },
        { scaleY: 1, duration: 1.5, ease: 'power2.out', transformOrigin: 'top' },
        '-=0.3'
      );
    }

    stepsRef.current.forEach((step) => {
      if (!step) return;
      tl.fromTo(
        step,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
        '-=1.15'
      );
    });

    if (final) {
      tl.fromTo(final, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.2');
    }

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
      id="methode"
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 24px',
        backgroundColor: '#F5F5F5',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '90px', opacity: 0 }}>
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
            Notre méthode
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 4.2vw, 50px)',
              fontWeight: 400,
              color: '#1A1A1A',
              marginTop: '16px',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              maxWidth: '700px',
              margin: '16px auto 0',
            }}
          >
            Une méthode claire pour des décisions patrimoniales éclairées.
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          <div
            ref={lineRef}
            style={{
              position: 'absolute',
              left: '24px',
              top: 0,
              bottom: 0,
              width: '1px',
              backgroundColor: 'rgba(197, 160, 89, 0.35)',
              transform: 'scaleY(0)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
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
                      fontFamily: 'var(--font-serif)',
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#C5A059',
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                <div style={{ paddingTop: '6px' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '24px',
                      fontWeight: 600,
                      color: '#1A1A1A',
                      marginBottom: '8px',
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
                      maxWidth: '560px',
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final statement */}
        <div ref={finalRef} style={{ textAlign: 'center', marginTop: '90px', opacity: 0 }}>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(19px, 2.4vw, 26px)',
              fontStyle: 'italic',
              fontWeight: 400,
              lineHeight: 1.5,
              color: '#1A1A1A',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            &ldquo;Votre patrimoine évolue. Votre stratégie doit pouvoir évoluer avec lui.&rdquo;
          </p>
          <div
            style={{
              width: '40px',
              height: '1px',
              backgroundColor: '#C5A059',
              margin: '36px auto',
            }}
          />
          <a
            href="#contact"
            onClick={handleClick}
            data-hover
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#1A1A1A',
              padding: '16px 40px',
              border: '1.5px solid #1A1A1A',
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
            Faire le point sur ma situation
          </a>
        </div>
      </div>
    </section>
  );
}
