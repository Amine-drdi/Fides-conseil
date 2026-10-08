import { useEffect, useState } from 'react';
import { Link } from 'react-router';

const CONSENT_KEY = 'fides_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const respond = (accepted: boolean) => {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ accepted, date: new Date().toISOString() })
    );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        right: '20px',
        maxWidth: '520px',
        zIndex: 2000,
        backgroundColor: '#141414',
        border: '1px solid rgba(197, 160, 89, 0.35)',
        padding: '24px 28px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '13px',
          fontWeight: 300,
          lineHeight: 1.65,
          color: '#D8D8D8',
          margin: 0,
        }}
      >
        Ce site n'utilise que des cookies techniques strictement nécessaires à son fonctionnement.
        Aucun cookie publicitaire ou de suivi n'est déposé sans votre accord. Consultez notre{' '}
        <Link to="/politique-confidentialite" style={{ color: '#C5A059' }}>
          politique de confidentialité
        </Link>
        .
      </p>
      <div style={{ display: 'flex', gap: '12px', marginTop: '18px' }}>
        <button
          onClick={() => respond(true)}
          data-hover
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#1A1A1A',
            backgroundColor: '#C5A059',
            padding: '12px 24px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Accepter
        </button>
        <button
          onClick={() => respond(false)}
          data-hover
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#A3A3A3',
            backgroundColor: 'transparent',
            padding: '12px 24px',
            border: '1px solid #444',
            cursor: 'pointer',
          }}
        >
          Refuser
        </button>
      </div>
    </div>
  );
}
