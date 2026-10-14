// src/components/admin/ProtectedRoute.tsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1A1A1A',
          color: '#C5A059',
          fontFamily: 'var(--font-sans)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontSize: '12px',
        }}
      >
        Vérification de la session…
      </div>
    );
  }

if (!session) {
  return <Navigate to="/admin/login" replace />;
}

  return <>{children}</>;
}