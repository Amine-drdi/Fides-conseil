import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import SEO from '@/components/SEO';
import { getPublishedArticles, type Article } from '@/lib/articles';

function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function RessourcesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('Tous');

  useEffect(() => {
    window.scrollTo(0, 0);
    getPublishedArticles().then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, []);

  const categories = ['Tous', ...Array.from(new Set(articles.map((a) => a.category)))];
  const filtered = filter === 'Tous' ? articles : articles.filter((a) => a.category === filter);

  return (
    <div style={{ backgroundColor: '#F5F5F5', minHeight: '100vh', paddingTop: '120px' }}>
      <SEO
        title="Ressources patrimoniales — Analyses, guides et décryptages"
        description="Actualités patrimoniales, fiscalité, retraite, investissement, immobilier, transmission : les analyses et guides de FIDES CONSEIL pour éclairer vos décisions."
        canonical="/ressources"
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 120px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
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
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 400,
              color: '#1A1A1A',
              marginTop: '16px',
              letterSpacing: '-0.02em',
            }}
          >
            Comprendre pour mieux décider.
          </h1>
        </div>

        {/* Category filter */}
        {articles.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: '48px',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                data-hover
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: filter === cat ? '#F5F5F5' : '#1A1A1A',
                  backgroundColor: filter === cat ? '#1A1A1A' : 'transparent',
                  border: '1px solid #1A1A1A',
                  padding: '10px 18px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Articles */}
        {loading ? (
          <p style={{ textAlign: 'center', color: '#555', fontFamily: 'var(--font-sans)' }}>
            Chargement…
          </p>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '22px',
                fontStyle: 'italic',
                color: '#555',
              }}
            >
              Nos premiers articles arrivent très prochainement.
            </p>
            <Link
              to="/#contact"
              style={{
                display: 'inline-block',
                marginTop: '28px',
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#1A1A1A',
                padding: '14px 32px',
                border: '1.5px solid #1A1A1A',
                textDecoration: 'none',
              }}
            >
              Poser ma question à un conseiller
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {filtered.map((article) => (
              <Link
                key={article.id}
                to={`/ressources/${article.slug}`}
                data-hover
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(26,26,26,0.08)',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.35s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C5A059';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(26,26,26,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(26,26,26,0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {article.cover_image_url && (
                  <div style={{ height: '180px', overflow: 'hidden' }}>
                    <img
                      src={article.cover_image_url}
                      alt={article.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#C5A059',
                      }}
                    >
                      {article.category}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '11px',
                        color: '#999',
                      }}
                    >
                      {formatDate(article.published_at)}
                    </span>
                  </div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '21px',
                      fontWeight: 600,
                      color: '#1A1A1A',
                      marginTop: '14px',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.3,
                    }}
                  >
                    {article.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13.5px',
                      fontWeight: 300,
                      lineHeight: 1.65,
                      color: '#555',
                      marginTop: '10px',
                      flexGrow: 1,
                    }}
                  >
                    {article.excerpt}
                  </p>
                  <span
                    style={{
                      marginTop: '20px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#1A1A1A',
                      borderBottom: '1px solid #C5A059',
                      paddingBottom: '3px',
                      alignSelf: 'flex-start',
                    }}
                  >
                    Lire l'article →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
