import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '@/lib/supabase';
import SEO from '@/components/SEO';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate('/admin/articles', { replace: true });
      } else {
        setChecking(false);
      }
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError('Email ou mot de passe incorrect.');
    } else {
      navigate('/admin/articles', { replace: true });
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid #333',
    color: '#F8F8F8',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    outline: 'none',
  };

  if (checking) return null;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#1A1A1A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <SEO title="Espace rédaction" description="Espace réservé à l'équipe FIDES CONSEIL." canonical="/admin" />
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '24px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#F8F8F8',
            }}
          >
            FIDES
          </span>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#C5A059',
              marginTop: '8px',
            }}
          >
            Espace rédaction
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          {error && (
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#E8A0A0', margin: 0 }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            data-hover
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#1A1A1A',
              backgroundColor: loading ? '#A3A3A3' : '#C5A059',
              padding: '16px',
              border: 'none',
              cursor: loading ? 'wait' : 'pointer',
            }}
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            color: '#666',
            textAlign: 'center',
            marginTop: '32px',
          }}
        >
          Accès réservé à l'équipe FIDES CONSEIL.
        </p>
      </div>
    </div>
  );
}
