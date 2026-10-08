import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: '8',
    label: "Expertises",
    description: 'pour une vision globale',
  },
  {
    value: '5',
    label: 'Profils accompagnés',
    description: 'un conseil adapté à chacun',
  },
  {
    value: '5',
    label: 'Étapes de méthode',
    description: 'de Comprendre à Piloter',
  },
  {
    value: '100%',
    label: 'Indépendant',
    description: 'aucun conflit d\'intérêts',
  },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    statsRef.current.forEach((stat, i) => {
      if (!stat) return;
      tl.fromTo(
        stat,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        i * 0.12
      );
    });

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
        padding: '80px 24px',
        backgroundColor: '#1A1A1A',
        borderTop: '1px solid #333',
        borderBottom: '1px solid #333',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            ref={(el) => {
              if (el) statsRef.current[index] = el;
            }}
            style={{
              textAlign: 'center',
              opacity: 0,
              padding: '20px',
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: 700,
                color: '#C5A059',
                lineHeight: 1.1,
                display: 'block',
              }}
            >
              {stat.value}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#F8F8F8',
                display: 'block',
                marginTop: '12px',
              }}
            >
              {stat.label}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                fontWeight: 300,
                color: '#A3A3A3',
                display: 'block',
                marginTop: '4px',
              }}
            >
              {stat.description}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
