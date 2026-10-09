import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import VaultKineticSeal from '@/components/VaultKineticSeal';
import { scrollToSection } from '@/components/Navbar';

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        ctaGroupRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        sealRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(
        taglineRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.4'
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.2'
      );

    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleCta = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-bg-dark)',
        overflow: 'hidden',
        padding: '120px 24px 80px',
      }}
    >
      {/* Subtle grain texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
        }}
      />

      {/* Headline */}
      <h1
        ref={headlineRef}
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(38px, 6.5vw, 84px)',
          fontWeight: 400,
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          textAlign: 'center',
          color: '#F8F8F8',
          margin: 0,
          maxWidth: '1000px',
          opacity: 0,
        }}
      >
        Votre patrimoine mérite
        <br />
        <span className="gradient-text" style={{ fontWeight: 600 }}>
          une stratégie.
        </span>
      </h1>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(14px, 1.6vw, 18px)',
          fontWeight: 300,
          lineHeight: 1.7,
          color: 'var(--color-text-secondary)',
          marginTop: '28px',
          maxWidth: '680px',
          textAlign: 'center',
          opacity: 0,
        }}
      >
        FIDES Conseil vous accompagne dans la structuration, la protection, le développement
        et la transmission de votre patrimoine personnel et professionnel.
      </p>

      {/* CTA group */}
      <div
        ref={ctaGroupRef}
        style={{
          display: 'flex',
          gap: '16px',
          marginTop: '44px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          opacity: 0,
        }}
      >
        <a
          href="#situation"
          onClick={(e) => handleCta(e, '#situation')}
          data-hover
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#1A1A1A',
            backgroundColor: '#C5A059',
            padding: '18px 36px',
            border: '1px solid #C5A059',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#DCCAA4';
            e.currentTarget.style.borderColor = '#DCCAA4';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#C5A059';
            e.currentTarget.style.borderColor = '#C5A059';
          }}
        >
          Construire ma stratégie
        </a>
        <a
          href="#contact"
          onClick={(e) => handleCta(e, '#contact')}
          data-hover
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#F8F8F8',
            backgroundColor: 'transparent',
            padding: '18px 36px',
            border: '1px solid #555',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#C5A059';
            e.currentTarget.style.color = '#C5A059';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#555';
            e.currentTarget.style.color = '#F8F8F8';
          }}
        >
          Prendre rendez-vous
        </a>
      </div>

      {/* Vault Seal */}
      <div
        ref={sealRef}
        style={{
          marginTop: '56px',
          opacity: 0,
          transform: 'scale(0.85)',
        }}
      >
        <VaultKineticSeal />
      </div>

      {/* Tagline */}
     {/* <p
        ref={taglineRef}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(11px, 1vw, 13px)',
          fontWeight: 300,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-text-secondary)',
          marginTop: '40px',
          textAlign: 'center',
          opacity: 0,
        }}
      >
        La confiance est notre fonds de commerce
      </p>*/}

      {/* Scroll indicator */}
     {/*  <div
        ref={scrollIndicatorRef}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-text-secondary)',
          }}
        >
          Découvrir
        </span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" style={{ opacity: 0.5 }}>
          <path
            d="M8 4L8 20M8 20L2 14M8 20L14 14"
            stroke="#C5A059"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>*/}
    </section>
  );
}
