// src/pages/admin/Dashboard.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabase';

type Stats = {
  total: number;
  nouveaux: number;
  enCours: number;
  traites: number;
  cetteSemaine: number;
  ceMois: number;
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentRequests, setRecentRequests] = useState<any[]>([]);

  useEffect(() => {
    loadStats();
    loadRecent();
  }, []);

  const loadStats = async () => {
    const { data, error } = await supabase
      .from('contact_requests')
      .select('id, status, created_at');

    if (error || !data) {
      setLoading(false);
      return;
    }

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    setStats({
      total: data.length,
      nouveaux: data.filter((r) => r.status === 'nouveau').length,
      enCours: data.filter((r) => r.status === 'en_cours').length,
      traites: data.filter((r) => r.status === 'traite').length,
      cetteSemaine: data.filter((r) => new Date(r.created_at) >= weekAgo).length,
      ceMois: data.filter((r) => new Date(r.created_at) >= monthStart).length,
    });
    setLoading(false);
  };

  const loadRecent = async () => {
    const { data } = await supabase
      .from('contact_requests')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    setRecentRequests(data || []);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });

  const statCard = (
    label: string,
    value: number | string,
    accent: string = '#C5A059'
  ) => (
    <div
      key={label}
      style={{
        padding: '24px',
        border: '1px solid #333',
        backgroundColor: 'rgba(255,255,255,0.02)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#A3A3A3',
          margin: '0 0 12px',
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '36px',
          fontWeight: 400,
          color: accent,
          margin: 0,
          lineHeight: 1,
        }}
      >
        {value}
      </p>
    </div>
  );

  const quickLink = (
    to: string,
    title: string,
    description: string
  ) => (
    <Link
      key={to}
      to={to}
      style={{
        display: 'block',
        padding: '28px',
        border: '1px solid #333',
        backgroundColor: 'rgba(255,255,255,0.02)',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#C5A059';
        e.currentTarget.style.backgroundColor = 'rgba(197,160,89,0.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#333';
        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '20px',
          color: '#F8F8F8',
          margin: '0 0 8px',
          fontWeight: 400,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '13px',
          color: '#A3A3A3',
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
      <span
        style={{
          display: 'inline-block',
          marginTop: '16px',
          fontFamily: 'var(--font-sans)',
          fontSize: '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#C5A059',
        }}
      >
        Accéder →
      </span>
    </Link>
  );

  return (
    <AdminLayout>
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '32px',
          fontWeight: 400,
          marginBottom: '8px',
        }}
      >
        Tableau de bord
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          color: '#A3A3A3',
          marginBottom: '40px',
        }}
      >
        Vue d'ensemble de l'activité FIDES CONSEIL
      </p>

      {/* Stats */}
      {loading ? (
        <p style={{ color: '#A3A3A3' }}>Chargement des statistiques…</p>
      ) : stats ? (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              marginBottom: '48px',
            }}
          >
            {statCard('Total demandes', stats.total)}
            {statCard('Nouvelles', stats.nouveaux, '#C5A059')}
            {statCard('En cours', stats.enCours, '#7EB0E8')}
            {statCard('Traitées', stats.traites, '#7ED896')}
            {statCard('Cette semaine', stats.cetteSemaine)}
            {statCard('Ce mois', stats.ceMois)}
          </div>

          {/* Raccourcis */}
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '22px',
              fontWeight: 400,
              marginBottom: '20px',
            }}
          >
            Accès rapide
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
              marginBottom: '48px',
            }}
          >
            {quickLink(
              '/admin/demandes',
              '📩 Demandes de contact',
              'Consulter, filtrer et traiter les demandes reçues via le site.'
            )}
            {quickLink(
              '/admin/statistiques',
              '📊 Statistiques',
              'Analyser les tendances : demandes par mois, par objet, par profil.'
            )}
            {quickLink(
              '/admin/articles',
              '📝 Articles',
              'Rédiger et publier les articles du blog.'
            )}
          </div>

          {/* Dernières demandes */}
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '22px',
              fontWeight: 400,
              marginBottom: '20px',
            }}
          >
            Dernières demandes
          </h2>
          {recentRequests.length === 0 ? (
            <p style={{ color: '#A3A3A3' }}>Aucune demande récente.</p>
          ) : (
            <div style={{ border: '1px solid #333' }}>
              {recentRequests.map((r, i) => (
                <Link
                  key={r.id}
                  to={`/admin/demandes/${r.id}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 20px',
                    borderBottom: i < recentRequests.length - 1 ? '1px solid #262626' : 'none',
                    textDecoration: 'none',
                    color: '#F8F8F8',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(197,160,89,0.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div>
                    <strong style={{ fontFamily: 'var(--font-sans)', fontSize: '14px' }}>
                      {r.prenom} {r.nom}
                    </strong>
                    <span
                      style={{
                        marginLeft: '12px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '12px',
                        color: '#A3A3A3',
                      }}
                    >
                      {r.objet}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '12px',
                      color: '#A3A3A3',
                    }}
                  >
                    {formatDate(r.created_at)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <p style={{ color: '#E8A0A0' }}>Erreur de chargement des statistiques.</p>
      )}
    </AdminLayout>
  );
}