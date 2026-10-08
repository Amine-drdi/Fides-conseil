import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToSection } from '@/components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const solutionFamilies = [
  {
    title: 'Épargne & investissement',
    intro: 'Faire fructifier votre capital avec des enveloppes adaptées à votre horizon et votre fiscalité.',
    solutions: [
      { name: 'Assurance vie', purpose: 'L\'enveloppe polyvalente pour épargner, investir et transmettre.' },
      { name: 'PER', purpose: 'Préparer votre retraite tout en réduisant votre impôt sur le revenu.' },
      { name: 'Contrat de capitalisation', purpose: 'Investir via une personne morale ou optimiser la transmission.' },
      { name: 'Produits structurés', purpose: 'Viser des rendements conditionnés à des scénarios de marché définis.' },
      { name: 'Placements financiers', purpose: 'Construire un portefeuille diversifié en architecture ouverte.' },
    ],
  },
  {
    title: 'Immobilier',
    intro: 'Développer un patrimoine immobilier rentable, efficient fiscalement et transmissible.',
    solutions: [
      { name: 'SCPI', purpose: 'Investir dans l\'immobilier d\'entreprise sans contrainte de gestion.' },
      { name: 'Immobilier locatif', purpose: 'Générer des revenus complémentaires et constituer un actif tangible.' },
      { name: 'Immobilier professionnel', purpose: 'Loger votre activité et capitaliser sur vos murs professionnels.' },
      { name: 'Solutions immobilières fiscales', purpose: 'Allier investissement immobilier et efficacité fiscale.' },
    ],
  },
  {
    title: 'Protection',
    intro: 'Sécuriser vos revenus, votre famille et vos engagements face aux aléas de la vie.',
    solutions: [
      { name: 'Prévoyance', purpose: 'Maintenir votre niveau de vie en cas d\'arrêt, d\'invalidité ou de décès.' },
      { name: 'Mutuelle', purpose: 'Compléter vos remboursements santé selon vos besoins réels.' },
      { name: 'Assurance emprunteur', purpose: 'Sécuriser vos crédits à un tarif optimisé en délégation.' },
      { name: 'Protection familiale', purpose: 'Garantir l\'avenir de vos proches quoi qu\'il arrive.' },
    ],
  },
  {
    title: 'Entreprise',
    intro: 'Protéger le dirigeant, fidéliser les talents et préparer la transmission de l\'entreprise.',
    solutions: [
      { name: 'Protection du dirigeant', purpose: 'Couvrir les risques spécifiques liés à votre statut.' },
      { name: 'Retraite du dirigeant', purpose: 'Compléter vos droits retraite via votre société.' },
      { name: 'Épargne entreprise', purpose: 'Associer vos collaborateurs à la performance (PEE, PERECO).' },
      { name: 'Transmission d\'entreprise', purpose: 'Anticiper la cession et sécuriser la valeur créée.' },
    ],
  },
];

export default function SolutionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const familiesRef = useRef<HTMLDivElement[]>([]);

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

    familiesRef.current.forEach((fam, i) => {
      if (!fam) return;
      tl.fromTo(
        fam,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        `-=${0.5 - i * 0.08}`
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
      id="solutions"
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
        <div
          ref={headerRef}
          style={{ textAlign: 'center', marginBottom: '24px', opacity: 0 }}
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
            Nos solutions
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
            Des outils au service de votre stratégie.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.7,
              color: '#A3A3A3',
              marginTop: '20px',
              maxWidth: '640px',
              margin: '20px auto 0',
            }}
          >
            Chez FIDES, un produit n'est jamais une fin en soi. Chaque solution est sélectionnée
            en architecture ouverte pour répondre à un objectif précis de votre stratégie patrimoniale.
          </p>
        </div>

        {/* Solution families */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '70px' }}>
          {solutionFamilies.map((family, index) => (
            <div
              key={family.title}
              ref={(el) => {
                if (el) familiesRef.current[index] = el;
              }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '40px',
                padding: '48px 0',
                borderTop: '1px solid #2A2A2A',
                opacity: 0,
              }}
            >
              {/* Family header */}
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'rgba(197, 160, 89, 0.5)',
                    letterSpacing: '0.1em',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(22px, 2.5vw, 30px)',
                    fontWeight: 600,
                    color: '#F8F8F8',
                    marginTop: '10px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {family.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: '#A3A3A3',
                    marginTop: '12px',
                  }}
                >
                  {family.intro}
                </p>
              </div>

              {/* Solutions list */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {family.solutions.map((solution) => (
                  <div
                    key={solution.name}
                    style={{
                      padding: '18px 0',
                      borderBottom: '1px solid rgba(51, 51, 51, 0.6)',
                      transition: 'padding-left 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.paddingLeft = '10px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.paddingLeft = '0';
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '12px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '15px',
                          fontWeight: 500,
                          color: '#F8F8F8',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {solution.name}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '13px',
                          fontWeight: 300,
                          color: '#A3A3A3',
                          lineHeight: 1.5,
                        }}
                      >
                        — {solution.purpose}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '70px' }}>
          <a
            href="#contact"
            onClick={handleClick}
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
              padding: '18px 40px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#DCCAA4';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#C5A059';
            }}
          >
            Parler à un conseiller
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
