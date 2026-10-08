import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    title: 'Plan Épargne Retraite',
    subtitle: 'PER',
    description:
      'Constituez votre retraite en bénéficiant d\'une déduction fiscale immédiate. Le PER s\'adapte à votre profil : investissement en unités de compte ou fonds en euros sécurisés.',
    features: ['Déductible des revenus', 'Transmission au conjoint', 'Sortie en capital ou rente'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    title: 'Assurance Vie',
    subtitle: 'Contrats Multi-Supports',
    description:
      'Le placement préféré des Français pour faire fructifier votre capital en toute sécurité. Accès aux meilleurs fonds en euros et unités de compte du marché en architecture ouverte.',
    features: ['Fonds en euros boostés', 'Fiscalisation avantageuse', 'Transmission facilitée'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    title: 'Prévoyance',
    subtitle: 'Protection & Sécurité',
    description:
      'Protégez-vous et vos proches contre les aléas de la vie : arrêt de travail, invalidité, décès. Des solutions sur mesure pour les particuliers comme pour les professionnels.',
    features: ['Indemnités journalières', 'Invalidité / Décès', 'Accident de la vie'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Mutuelle',
    subtitle: 'Santé & Remboursement',
    description:
      'Complétez votre couverture santé avec une mutuelle adaptée à vos besoins et à votre budget. Remboursements optimisés des frais médicaux, dentaires et optiques.',
    features: ['Tiers payant', 'Dentaire & Optique', 'Hospitalisation 100%'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: 'Dépendance',
    subtitle: 'Autonomie & Serénité',
    description:
      "Anticipez la perte d'autonomie avec une protection qui couvre les frais d'aide à domicile ou d'hébergement en EHPAD. Préservez votre capital et celui de vos proches.",
    features: ['Capital ou rente viagère', '6 niveaux de dépendance', 'Garantie opt-in'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: 'Assurance Emprunteur',
    subtitle: 'Crédit & Protection',
    description:
      "Sécurisez vos crédits immobiliers et consommation avec une assurance déléguée compétitive. Bénéficiez d'une couverture optimale à tarif réduit par rapport à l'assurance bancaire.",
    features: ['Taux optimisés', 'Questionnaire médical allégé', 'Délégation possible'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M6 10h.01M6 14h.01" />
        <path d="M10 10h8M10 14h5" />
      </svg>
    ),
  },
];

export default function ProductsSection() {
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
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      header,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      tl.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' },
        `-=${0.4 - i * 0.05}`
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="produits"
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 24px',
        backgroundColor: '#1A1A1A',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: '120px',
          background: 'linear-gradient(to bottom, transparent, rgba(197, 160, 89, 0.3))',
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            marginBottom: '80px',
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
              color: '#C5A059',
            }}
          >
            Nos Solutions
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 400,
              color: '#F8F8F8',
              marginTop: '16px',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Découvrez nos produits
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              fontWeight: 300,
              lineHeight: 1.7,
              color: '#A3A3A3',
              marginTop: '20px',
              maxWidth: '600px',
              margin: '20px auto 0',
            }}
          >
            Une gamme complète de solutions patrimoniales et de protection, sélectionnées avec exigence auprès des meilleurs partenaires du marché.
          </p>
        </div>

        {/* Products Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          {products.map((product, index) => (
            <div
              key={product.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              style={{
                position: 'relative',
                padding: '40px',
                border: '1px solid #333',
                backgroundColor: 'rgba(26, 26, 26, 0.8)',
                opacity: 0,
                transition: 'border-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C5A059';
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(197, 160, 89, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#333';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Number badge */}
              <span
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '24px',
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '48px',
                  fontWeight: 700,
                  color: 'rgba(197, 160, 89, 0.1)',
                  lineHeight: 1,
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Icon */}
              <div style={{ marginBottom: '24px' }}>{product.icon}</div>

              {/* Subtitle */}
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#C5A059',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                {product.subtitle}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#F8F8F8',
                  marginBottom: '12px',
                  letterSpacing: '-0.01em',
                }}
              >
                {product.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: '#A3A3A3',
                  marginBottom: '20px',
                }}
              >
                {product.description}
              </p>

              {/* Features */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {product.features.map((feature) => (
                  <div
                    key={feature}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <div
                      style={{
                        width: '5px',
                        height: '5px',
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
                        color: '#F8F8F8',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
