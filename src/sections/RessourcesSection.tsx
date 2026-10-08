import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getPublishedArticles, type Article } from '@/lib/articles';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { name: 'Actualités patrimoniales', description: 'Les tendances et réformes qui impactent votre patrimoine.' },
  { name: 'Fiscalité', description: 'Comprendre les règles et identifier les leviers d\'optimisation.' },
  { name: 'Retraite', description: 'PER, pensions, dispositifs : préparer sereinement l\'avenir.' },
  { name: 'Investissement', description: 'Allocation, marchés, diversification : investir avec méthode.' },
  { name: 'Immobilier', description: 'SCPI, locatif, défiscalisation : décrypter les opportunités.' },
  { name: 'Transmission', description: 'Donations, successions, pactes Dutreil : anticiper sereinement.' },
  { name: 'Protection', description: 'Prévoyance, santé, emprunteur : sécuriser ce qui compte.' },
  { name: 'Guides pratiques', description: 'Des guides complets pour décider en toute connaissance de cause.' },
  { name: 'FAQ', description: 'Les réponses aux questions que vous vous posez le plus.' },
];

function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function RessourcesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [articles, setArticles] = useState<Article[] | null>(null);

  useEffect(() => {
    getPublishedArticles().then((data) => setArticles(data.slice(0, 3)));
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;
    if (!section || !header || articles === null) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 65%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(header, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });

    if (grid) {
      tl.fromTo(
        grid.children,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
        '-=0.4'
      );
    }

    return () => {
      tl.kill();
    };
  }, [articles]);

  const hasArticles = articles !== null && articles.length > 0;

  return (
    <section
      ref={sectionRef}
      id="ressources"
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 24px',
        backgroundColor: '#F5F5F5',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '70px', opacity: 0 }}>
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
            Ressources
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(30px, 4.5vw, 52px)',
              fontWeight: 400,
              color: '#1A1A1A',
              marginTop: '16px',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Comprendre pour mieux décider.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.7,
              color: '#555',
              marginTop: '18px',
              maxWidth: '560px',
              margin: '18px auto 0',
            }}
          >
            {hasArticles
              ? 'Analyses, guides et décryptages pour éclairer vos décisions patrimoniales.'
              : 'Notre rubrique éditoriale arrive prochainement : analyses, guides et décryptages pour éclairer vos décisions patrimoniales.'}
          </p>
        </div>

        {/* Articles grid (or fallback categories) */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: hasArticles ? 'repeat(auto-fit, minmax(320px, 1fr))' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {hasArticles
            ? articles.map((article) => (
                <Link
                  key={article.id}
                  to={`/ressources/${article.slug}`}
                  data-hover
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(26, 26, 26, 0.08)',
                    padding: '36px 32px',
                    opacity: 0,
                    textDecoration: 'none',
                    transition: 'all 0.35s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#C5A059';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(26, 26, 26, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '9px',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#C5A059',
                        border: '1px solid rgba(197, 160, 89, 0.4)',
                        padding: '4px 8px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {article.category}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '11px',
                        fontWeight: 300,
                        color: '#999',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {formatDate(article.published_at)}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '21px',
                      fontWeight: 600,
                      color: '#1A1A1A',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.3,
                    }}
                  >
                    {article.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      fontWeight: 300,
                      lineHeight: 1.6,
                      color: '#666',
                      marginTop: '12px',
                      flex: 1,
                    }}
                  >
                    {article.excerpt}
                  </p>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#1A1A1A',
                      marginTop: '24px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    Lire l'article
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))
            : categories.map((category) => (
                <div
                  key={category.name}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(26, 26, 26, 0.08)',
                    padding: '32px 28px',
                    opacity: 0,
                    transition: 'all 0.35s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#C5A059';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(26, 26, 26, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '19px',
                        fontWeight: 600,
                        color: '#1A1A1A',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.3,
                      }}
                    >
                      {category.name}
                    </h3>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '9px',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#C5A059',
                        border: '1px solid rgba(197, 160, 89, 0.4)',
                        padding: '4px 8px',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      Bientôt
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      fontWeight: 300,
                      lineHeight: 1.6,
                      color: '#666',
                      marginTop: '10px',
                    }}
                  >
                    {category.description}
                  </p>
                </div>
              ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link
            to="/ressources"
            data-hover
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#1A1A1A',
              padding: '16px 36px',
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
            {hasArticles ? 'Voir toutes nos ressources' : 'Être informé du lancement'}
          </Link>
        </div>
      </div>
    </section>
  );
}
