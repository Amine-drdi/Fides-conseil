import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, Flip);

const services = [
  {
    keywords: ['EPARGNE', 'PLACEMENTS', 'RETRAITE'],
    description: 'Optimisation financière et constitution de capital',
    detail: 'Pôle Financier',
  },
  {
    keywords: ['SUCCESSION', 'TRANSMISSION', 'HERITAGE'],
    description: 'Stratégies de transmission patrimoniale',
    detail: 'Pôle Juridique',
  },
  {
    keywords: ['PROTECTION', 'ASSURANCE', 'PREVOYANCE'],
    description: 'Solutions de protection familiale et professionnelle',
    detail: 'Courtage en Assurances',
  },
  {
    keywords: ['FISCALITE', 'OPTIMISATION', 'DEFISCALISATION'],
    description: 'Conseil et optimisation fiscale',
    detail: 'Conseil Fiscal',
  },
];

export default function PillarSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const leftImgRef = useRef<HTMLDivElement>(null);
  const rightImgRef = useRef<HTMLDivElement>(null);
  const serviceRefs = useRef<HTMLDivElement[]>([]);
  const textRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const leftImg = leftImgRef.current;
    const rightImg = rightImgRef.current;
    if (!section || !sticky || !leftImg || !rightImg) return;

    // Capture initial states for Flip
    const flipStates: { left: ReturnType<typeof Flip.getState>; right: ReturnType<typeof Flip.getState> }[] = [];

    serviceRefs.current.forEach((service, index) => {
      const text = textRefs.current[index];
      if (!service || !text) return;

      const leftText = text.querySelector('.pillar-left-text') as HTMLElement;
      const rightText = text.querySelector('.pillar-right-text') as HTMLElement;
      if (!leftText || !rightText) return;

      const leftState = Flip.getState(leftText, { props: 'transform,opacity' });
      service.appendChild(leftText);
      Flip.from(leftState, { duration: 1 });

      const rightState = Flip.getState(rightText, { props: 'transform,opacity' });
      service.appendChild(rightText);
      Flip.from(rightState, { duration: 1 });

      flipStates.push({ left: leftState, right: rightState });
    });

    // Create scroll timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=3000',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Pillar images move apart
    tl.fromTo(
      leftImg,
      { xPercent: 40 },
      { xPercent: 0, duration: 1, ease: 'none' },
      0
    );
    tl.fromTo(
      rightImg,
      { xPercent: -40 },
      { xPercent: 0, duration: 1, ease: 'none' },
      0
    );

    // Service panels reveal
    const allTextElements = textRefs.current.filter(Boolean);
    tl.fromTo(
      allTextElements,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
      0.3
    );

    // Hold position
    tl.to({}, { duration: 0.5 });

    // Exit animation
    tl.to(allTextElements, {
      yPercent: -50,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power2.in',
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="piliers"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: 'var(--color-bg-light)',
        overflow: 'hidden',
      }}
    >
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Left pillar image */}
        <div
          style={{
            flex: '0 0 45vw',
            height: '100%',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            ref={leftImgRef}
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: 'url(/images/pillar-medecin.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 30%',
            }}
          />
          {/* Overlay label */}
          <div
            style={{
              position: 'absolute',
              bottom: '60px',
              left: '40px',
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(32px, 5vw, 64px)',
                fontWeight: 700,
                color: '#FFFFFF',
                mixBlendMode: 'difference',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Assurance
              <br />
              & Protection
            </span>
          </div>
        </div>

        {/* Center services */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          {/* Section label */}
          <div
            style={{
              marginBottom: '40px',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#1A1A1A',
                opacity: 0.5,
              }}
            >
              Nos Expertises
            </span>
          </div>

          {/* Service cards */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              width: '90%',
              maxWidth: '500px',
            }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) serviceRefs.current[index] = el;
                }}
                style={{
                  backgroundColor: 'rgba(26, 26, 26, 0.92)',
                  border: '1px solid var(--color-border)',
                  padding: '28px 32px',
                  pointerEvents: 'auto',
                }}
              >
                <div
                  ref={(el) => {
                    if (el) textRefs.current[index] = el;
                  }}
                >
                  <div className="pillar-left-text">
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginBottom: '12px',
                      }}
                    >
                      {service.keywords.map((kw) => (
                        <span
                          key={kw}
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '10px',
                            fontWeight: 600,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: 'var(--color-accent)',
                          }}
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pillar-right-text">
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '14px',
                        fontWeight: 300,
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {service.description}
                    </p>
                    <span
                      style={{
                        display: 'block',
                        marginTop: '12px',
                        fontFamily: 'var(--font-serif)',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {service.detail}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right pillar image */}
        <div
          style={{
            flex: '0 0 45vw',
            height: '100%',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            ref={rightImgRef}
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: 'url(/images/pillar-famille.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 30%',
            }}
          />
          {/* Overlay label */}
          <div
            style={{
              position: 'absolute',
              bottom: '60px',
              right: '40px',
              zIndex: 2,
              textAlign: 'right',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(32px, 5vw, 64px)',
                fontWeight: 700,
                color: '#FFFFFF',
                mixBlendMode: 'difference',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Gestion
              <br />
              & Transmission
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
