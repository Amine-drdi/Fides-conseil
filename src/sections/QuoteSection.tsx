import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function QuoteSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 65%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      content,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        padding: '100px 24px',
        backgroundColor: '#F5F5F5',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <div
          ref={contentRef}
          style={{
            opacity: 0,
          }}
        >
          {/* Opening quote mark */}
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '120px',
              fontWeight: 400,
              color: 'rgba(197, 160, 89, 0.2)',
              lineHeight: 0.5,
              display: 'block',
              marginBottom: '-20px',
            }}
          >
            &ldquo;
          </span>

          <blockquote
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(22px, 3.5vw, 36px)',
              fontWeight: 400,
              fontStyle: 'italic',
              lineHeight: 1.5,
              color: '#1A1A1A',
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            Le patrimoine ne se transmet pas seulement en héritage.
            <br />
            Il se construit jour après jour, décision après décision,
            <br />
            avec la confiance de ceux qui vous conseillent.
          </blockquote>

          <div
            style={{
              width: '40px',
              height: '1px',
              backgroundColor: '#C5A059',
              margin: '40px auto',
            }}
          />

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#1A1A1A',
            }}
          >
            Raad Yassir — Directeur Général, FIDES CONSEIL
          </p>
        </div>
      </div>
    </section>
  );
}
