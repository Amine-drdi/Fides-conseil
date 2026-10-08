import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '@/lib/supabase';
import SEO from '@/components/SEO';

interface Client {
  id: string;
  email: string;
  prenom: string;
  nom: string;
  statut: string;
}

interface Dossier {
  id: string;
  titre: string;
  type_dossier: string;
  statut: 'en_cours' | 'signe' | 'archive';
  description: string | null;
  date_echeance: string | null;
  montant_estime: number | null;
}

const statutColors = {
  en_cours: '#C5A059',
  signe: '#9ACD9A',
  archive: '#888',
};

const statutLabels = {
  en_cours: 'En cours',
  signe: 'Signé',
  archive: 'Archivé',
};

export default function ClientPortal() {
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);
  const [dossiers, setDossiers] = useState<Dossier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        navigate('/espace-client', { replace: true });
        return;
      }

      const email = sessionData.session.user.email;

      // Charge la fiche client
      const { data: clientData } = await supabase
        .from('clients')
        .select('*')
        .eq('email', email)
        .single();

      if (!clientData) {
        // Pas encore de fiche client : on la crée automatiquement
        const { data: newClient } = await supabase
          .from('clients')
          .insert([{ email, prenom: 'Client', nom: 'FIDES' }])
          .select()
          .single();
        setClient(newClient);
      } else {
        setClient(clientData);
      }

      // Charge les dossiers
      const { data: dossiersData } = await supabase
        .from('client_dossiers')
        .select('*')
        .eq('client_email', email)
        .order('created_at', { ascending: false });

      setDossiers(dossiersData || []);
      setLoading(false);
    };

    load();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/', { replace: true });
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#A3A3A3', fontFamily: 'var(--font-sans)' }}>Chargement de votre espace…</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F5F5', paddingTop: '120px' }}>
      <SEO title="Espace Client" description="Votre espace personnel FIDES CONSEIL." canonical="/espace-client" />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '48px' }}>
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 400,
                color: '#1A1A1A',
                margin: 0,
              }}
            >
              Bonjour {client?.prenom},
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                color: '#666',
                marginTop: '8px',
              }}
            >
              Bienvenue dans votre espace personnel FIDES CONSEIL.
            </p>
          </div>
          <button
            onClick={handleLogout}
            data-hover
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#1A1A1A',
              backgroundColor: 'transparent',
              border: '1px solid #1A1A1A',
              padding: '12px 24px',
              cursor: 'pointer',
            }}
          >
            Déconnexion
          </button>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1px',
            backgroundColor: '#ddd',
            marginBottom: '48px',
          }}
        >
          {[
            { label: 'Dossiers actifs', value: dossiers.filter(d => d.statut === 'en_cours').length },
            { label: 'Dossiers signés', value: dossiers.filter(d => d.statut === 'signe').length },
            { label: 'Total', value: dossiers.length },
          ].map((stat) => (
            <div key={stat.label} style={{ backgroundColor: '#FFFFFF', padding: '28px', textAlign: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '36px',
                  fontWeight: 700,
                  color: '#C5A059',
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#1A1A1A',
                  marginTop: '8px',
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Dossiers */}
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '24px',
            fontWeight: 600,
            color: '#1A1A1A',
            marginBottom: '24px',
          }}
        >
          Vos dossiers
        </h2>

        {dossiers.length === 0 ? (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #ddd',
              padding: '48px',
              textAlign: 'center',
            }}
          >
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#666' }}>
              Aucun dossier pour le moment. Votre conseiller FIDES vous contactera pour ouvrir votre premier dossier.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {dossiers.map((dossier) => (
              <div
                key={dossier.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #ddd',
                  padding: '28px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '24px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: statutColors[dossier.statut],
                        border: `1px solid ${statutColors[dossier.statut]}`,
                        padding: '4px 10px',
                      }}
                    >
                      {statutLabels[dossier.statut]}
                    </span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {dossier.type_dossier}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#1A1A1A',
                      margin: '0 0 8px',
                    }}
                  >
                    {dossier.titre}
                  </h3>
                  {dossier.description && (
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#555', margin: 0, lineHeight: 1.6 }}>
                      {dossier.description}
                    </p>
                  )}
                </div>
                <div style={{ textAlign: 'right', minWidth: '140px' }}>
                  {dossier.montant_estime && (
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 600, color: '#1A1A1A', margin: '0 0 4px' }}>
                      {dossier.montant_estime.toLocaleString('fr-FR')} €
                    </p>
                  )}
                  {dossier.date_echeance && (
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#888', margin: 0 }}>
                      Échéance : {new Date(dossier.date_echeance).toLocaleDateString('fr-FR')}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact rapide */}
        <div
          style={{
            marginTop: '60px',
            padding: '36px',
            backgroundColor: '#1A1A1A',
            textAlign: 'center',
          }}
        >
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#A3A3A3', margin: 0 }}>
            Une question sur un dossier ? Contactez votre conseiller.
          </p>
          <a
            href="mailto:contact@fidesconseil-patrimoine.fr"
            data-hover
            style={{
              display: 'inline-block',
              marginTop: '16px',
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#C5A059',
              textDecoration: 'none',
              borderBottom: '1px solid #C5A059',
              paddingBottom: '2px',
            }}
          >
            contact@fidesconseil-patrimoine.fr
          </a>
        </div>
      </div>
    </div>
  );
}
