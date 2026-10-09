import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const line = lineRef.current;
    if (!section || !text || !line) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'top 30%',
        scrub: false,
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      line,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }
    ).fromTo(
      text,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.3'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="introduction"
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 24px',
        backgroundColor: 'var(--color-bg-dark)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Decorative line */}
      <div
        ref={lineRef}
        style={{
          width: '60px',
          height: '1px',
          backgroundColor: 'var(--color-accent)',
          marginBottom: '48px',
          transformOrigin: 'center',
          transform: 'scaleX(0)',
        }}
      />

      {/* Quote text */}
      <p
        ref={textRef}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(18px, 2.5vw, 24px)',
          fontWeight: 300,
          lineHeight: 1.7,
          color: 'var(--color-text-secondary)',
          textAlign: 'center',
          maxWidth: '800px',
          opacity: 0,
        }}
      >
        Vous ne savez pas toujours ce que vous cherchez. Mais vous savez ce que vous valez.{" "}
        <span style={{ color: 'var(--color-text-primary)', fontWeight: 400 }}>
          FIDES Conseil
        </span>{" "}
        est une structure indépendante dédiée à la protection et à la croissance de votre patrimoine.
      </p>

      {/* Info chips */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '24px',
          marginTop: '64px',
        }}
      >
        {[
          { label: 'SIRET', value: '106 012 594 00011' },
          { label: 'Capital', value: '10 000 €' },
          { label: 'N° ORIAS', value: ' 26011766' },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              padding: '16px 24px',
              border: '1px solid var(--color-border)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                fontWeight: 400,
                color: 'var(--color-text-primary)',
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
