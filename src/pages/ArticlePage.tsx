import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import SEO from '@/components/SEO';
import { getArticleBySlug, type Article } from '@/lib/articles';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      getArticleBySlug(slug).then((data) => {
        setArticle(data);
        setLoading(false);
      });
    }
  }, [slug]);

  const renderContent = (markdown: string): string => {
    const raw = marked.parse(markdown, { async: false });
    return DOMPurify.sanitize(raw);
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#F5F5F5', minHeight: '100vh', paddingTop: '160px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-sans)', color: '#555' }}>Chargement…</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div style={{ backgroundColor: '#F5F5F5', minHeight: '100vh', paddingTop: '160px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', color: '#1A1A1A' }}>
          Article introuvable
        </h1>
        <Link
          to="/ressources"
          style={{
            display: 'inline-block',
            marginTop: '24px',
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
          ← Retour aux ressources
        </Link>
      </div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: {
      '@type': 'Organization',
      name: article.author_name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'FIDES CONSEIL',
    },
    datePublished: article.published_at,
    dateModified: article.updated_at,
    ...(article.cover_image_url ? { image: article.cover_image_url } : {}),
  };

  return (
    <div style={{ backgroundColor: '#F5F5F5', minHeight: '100vh', paddingTop: '120px' }}>
      <SEO
        title={article.meta_title || article.title}
        description={article.meta_description || article.excerpt}
        canonical={`/ressources/${article.slug}`}
        type="article"
        jsonLd={jsonLd}
      />
      <article style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px 120px' }}>
        <Link
          to="/ressources"
          data-hover
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#888',
            textDecoration: 'none',
          }}
        >
          ← Toutes les ressources
        </Link>

        <div style={{ marginTop: '36px', marginBottom: '40px' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#C5A059',
              border: '1px solid rgba(197,160,89,0.4)',
              padding: '6px 12px',
            }}
          >
            {article.category}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(30px, 4.5vw, 46px)',
              fontWeight: 400,
              color: '#1A1A1A',
              marginTop: '24px',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            {article.title}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: '#888',
              marginTop: '18px',
            }}
          >
            {article.author_name}
            {article.published_at &&
              ` · ${new Date(article.published_at).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}`}
          </p>
        </div>

        {article.cover_image_url && (
          <img
            src={article.cover_image_url}
            alt={article.title}
            style={{ width: '100%', marginBottom: '48px', border: '1px solid rgba(26,26,26,0.08)' }}
          />
        )}

        <div
          className="article-content"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '16px',
            fontWeight: 300,
            lineHeight: 1.85,
            color: '#333',
          }}
          dangerouslySetInnerHTML={{ __html: renderContent(article.content) }}
        />

        {/* CTA */}
        <div
          style={{
            marginTop: '70px',
            padding: '44px 36px',
            backgroundColor: '#1A1A1A',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '24px',
              fontWeight: 400,
              color: '#F8F8F8',
              margin: 0,
            }}
          >
            Cette situation vous concerne ?
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 300,
              color: '#A3A3A3',
              marginTop: '12px',
            }}
          >
            Un conseiller FIDES analyse votre situation et vous propose une stratégie adaptée.
          </p>
          <Link
            to="/#contact"
            data-hover
            style={{
              display: 'inline-block',
              marginTop: '24px',
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#1A1A1A',
              backgroundColor: '#C5A059',
              padding: '16px 36px',
              textDecoration: 'none',
            }}
          >
            Prendre rendez-vous
          </Link>
        </div>
      </article>

    </div>
  );
}
