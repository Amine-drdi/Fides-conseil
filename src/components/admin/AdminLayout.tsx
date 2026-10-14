// src/components/admin/AdminLayout.tsx
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { supabase } from '@/lib/supabase';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) setEmail(data.user.email);
    });
  }, []);

const handleLogout = async () => {
  await supabase.auth.signOut();
  navigate('/admin/login', { replace: true });
};

  const navItems = [
    { label: 'Demandes', path: '/admin/demandes' },
    { label: 'Statistiques', path: '/admin/statistiques' },
    { label: 'Articles', path: '/admin/articles' },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1A1A1A', color: '#F8F8F8', display: 'flex' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '240px',
          borderRight: '1px solid #333',
          padding: '32px 0',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        <div style={{ padding: '0 24px', marginBottom: '40px' }}>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '20px',
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
              fontSize: '10px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#C5A059',
              marginTop: '4px',
            }}
          >
            Administration
          </p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                padding: '14px 24px',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.05em',
                color: isActive(item.path) ? '#C5A059' : '#A3A3A3',
                textDecoration: 'none',
                borderLeft: isActive(item.path) ? '2px solid #C5A059' : '2px solid transparent',
                transition: 'all 0.2s ease',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '0 24px', borderTop: '1px solid #333', paddingTop: '24px' }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              color: '#666',
              marginBottom: '12px',
              wordBreak: 'break-all',
            }}
          >
            {email}
          </p>
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: '1px solid #C5A059',
              color: '#C5A059',
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              width: '100%',
            }}
          >
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, padding: '40px', overflow: 'auto' }}>{children}</main>
    </div>
  );
}