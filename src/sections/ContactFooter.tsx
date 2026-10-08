import { Link } from 'react-router';

export default function ContactFooter() {
  return (
    <footer
      style={{
        width: '100%',
        padding: '28px 24px',
        backgroundColor: '#1A1A1A',
        borderTop: '1px solid #333',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            fontWeight: 300,
            color: '#A3A3A3',
          }}
        >
          &copy; {new Date().getFullYear()} FIDES CONSEIL. Tous droits réservés.
        </span>

        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {[
            { to: '/mentions-legales', label: 'Mentions légales' },
            { to: '/politique-confidentialite', label: 'Politique de confidentialité' },
            { to: '/ressources', label: 'Ressources' },
            { to: '/espace-client', label: 'Espace client' },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-hover
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                fontWeight: 300,
                color: '#A3A3A3',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = '#C5A059')}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = '#A3A3A3')}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/admin"
            data-hover
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 300,
              color: '#555',
              textDecoration: 'none',
            }}
          >
            Espace rédaction
          </Link>
        </div>

        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            fontWeight: 300,
            color: '#A3A3A3',
          }}
        >
          Gestion de Patrimoine &middot; Noisy-le-Grand &middot; SIRET 106 012 594 00011
        </span>
      </div>
    </footer>
  );
}
