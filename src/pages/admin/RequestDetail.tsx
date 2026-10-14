// src/pages/admin/RequestDetail.tsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabase';

type ContactRequest = {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  objet: string;
  profil: string;
  mode: string;
  message: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  handled_at: string | null;
};

const STATUS_OPTIONS = [
  { value: 'nouveau', label: 'Nouveau', color: '#C5A059', bg: 'rgba(197,160,89,0.15)' },
  { value: 'en_cours', label: 'En cours', color: '#7EB0E8', bg: 'rgba(100,150,220,0.15)' },
  { value: 'traite', label: 'Traité', color: '#7ED896', bg: 'rgba(100,200,120,0.15)' },
  { value: 'archive', label: 'Archivé', color: '#A3A3A3', bg: 'rgba(150,150,150,0.15)' },
];

export default function RequestDetail() {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<ContactRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusError, setStatusError] = useState('');

  useEffect(() => {
    if (!id) return;
    loadRequest();
  }, [id]);

  const loadRequest = async () => {
    const { data, error } = await supabase
      .from('contact_requests')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erreur :', error);
    } else if (data) {
      setRequest(data);
      setNotes(data.notes || '');
    }
    setLoading(false);
  };

  // ⭐ Changement de statut avec feedback
  const updateStatus = async (newStatus: string) => {
    if (!id || !request || request.status === newStatus) return;

    setSaving(true);
    setStatusError('');
    setStatusMessage('');

    // Récupérer l'utilisateur connecté
    const { data: { user } } = await supabase.auth.getUser();

    const updatePayload: Record<string, any> = {
      status: newStatus,
    };

    // Si on marque comme "traité", on enregistre qui et quand
    if (newStatus === 'traite') {
      updatePayload.handled_at = new Date().toISOString();
      updatePayload.handled_by = user?.id || null;
    }

    const { error } = await supabase
      .from('contact_requests')
      .update(updatePayload)
      .eq('id', id);

    setSaving(false);

    if (error) {
      console.error('Erreur update :', error);
      setStatusError('Erreur lors de la mise à jour. Réessayez.');
    } else {
      setRequest({ ...request, status: newStatus, handled_at: updatePayload.handled_at || request.handled_at });
      setStatusMessage(`Statut mis à jour : ${STATUS_OPTIONS.find((s) => s.value === newStatus)?.label}`);
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  const saveNotes = async () => {
    if (!id) return;
    setSaving(true);
    const { error } = await supabase
      .from('contact_requests')
      .update({ notes })
      .eq('id', id);

    setSaving(false);
    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const deleteRequest = async () => {
    if (!id || !confirm('Supprimer définitivement cette demande ?')) return;
    const { error } = await supabase.from('contact_requests').delete().eq('id', id);
    if (!error) {
      window.location.href = '/admin/demandes';
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <p style={{ color: '#A3A3A3' }}>Chargement…</p>
      </AdminLayout>
    );
  }

  if (!request) {
    return (
      <AdminLayout>
        <p style={{ color: '#E8A0A0' }}>Demande introuvable.</p>
        <Link to="/admin/demandes" style={{ color: '#C5A059' }}>
          ← Retour à la liste
        </Link>
      </AdminLayout>
    );
  }

  const currentStatus = STATUS_OPTIONS.find((s) => s.value === request.status) || STATUS_OPTIONS[0];

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: '10px',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#C5A059',
    marginBottom: '6px',
    display: 'block',
  };

  const valueStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: '15px',
    color: '#F8F8F8',
    marginBottom: '20px',
    lineHeight: 1.5,
  };

  return (
    <AdminLayout>
      <Link
        to="/admin/demandes"
        style={{
          color: '#C5A059',
          textDecoration: 'none',
          fontSize: '12px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        ← Retour
      </Link>

      {/* Header avec nom + badge statut */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginTop: '20px',
          marginBottom: '32px',
          flexWrap: 'wrap',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '28px',
            margin: 0,
          }}
        >
          {request.prenom} {request.nom}
        </h1>
        <span
          style={{
            padding: '6px 14px',
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: currentStatus.color,
            backgroundColor: currentStatus.bg,
            border: `1px solid ${currentStatus.color}`,
          }}
        >
          {currentStatus.label}
        </span>
      </div>

      {/* Messages de feedback */}
      {statusMessage && (
        <div
          style={{
            padding: '12px 18px',
            marginBottom: '20px',
            backgroundColor: 'rgba(100,200,120,0.1)',
            border: '1px solid #7ED896',
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: '#7ED896',
            }}
          >
            ✓ {statusMessage}
          </p>
        </div>
      )}

      {statusError && (
        <div
          style={{
            padding: '12px 18px',
            marginBottom: '20px',
            backgroundColor: 'rgba(220,100,100,0.1)',
            border: '1px solid #E8A0A0',
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: '#E8A0A0',
            }}
          >
            {statusError}
          </p>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        {/* Colonne gauche : infos */}
        <div>
          <span style={labelStyle}>Email</span>
          <p style={valueStyle}>
            <a href={`mailto:${request.email}`} style={{ color: '#C5A059' }}>
              {request.email}
            </a>
          </p>

          <span style={labelStyle}>Téléphone</span>
          <p style={valueStyle}>
            <a href={`tel:${request.telephone}`} style={{ color: '#C5A059' }}>
              {request.telephone}
            </a>
          </p>

          <span style={labelStyle}>Profil</span>
          <p style={valueStyle}>{request.profil}</p>

          <span style={labelStyle}>Objet</span>
          <p style={valueStyle}>{request.objet}</p>

          <span style={labelStyle}>Mode</span>
          <p style={valueStyle}>
            {request.mode === 'rdv' ? 'Prise de rendez-vous' : 'Demande de rappel'}
          </p>

          <span style={labelStyle}>Reçue le</span>
          <p style={valueStyle}>
            {new Date(request.created_at).toLocaleString('fr-FR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>

          {request.handled_at && (
            <>
              <span style={labelStyle}>Traitée le</span>
              <p style={valueStyle}>
                {new Date(request.handled_at).toLocaleString('fr-FR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </>
          )}

          <span style={labelStyle}>Message</span>
          <p style={{ ...valueStyle, whiteSpace: 'pre-wrap' }}>
            {request.message || '—'}
          </p>

          {/* Boutons d'action rapide */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '24px',
              flexWrap: 'wrap',
            }}
          >
            <a
              href={`mailto:${request.email}?subject=Re: ${request.objet}`}
              style={{
                padding: '12px 20px',
                backgroundColor: '#C5A059',
                color: '#1A1A1A',
                textDecoration: 'none',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              ✉ Répondre par email
            </a>
            <a
              href={`tel:${request.telephone}`}
              style={{
                padding: '12px 20px',
                backgroundColor: 'transparent',
                color: '#C5A059',
                border: '1px solid #C5A059',
                textDecoration: 'none',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              ☎ Appeler
            </a>
          </div>
        </div>

        {/* Colonne droite : gestion */}
        <div>
          <span style={labelStyle}>Changer le statut</span>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              color: '#A3A3A3',
              marginTop: 0,
              marginBottom: '12px',
            }}
          >
            Cliquez sur un statut pour le mettre à jour immédiatement.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '32px',
              flexWrap: 'wrap',
            }}
          >
            {STATUS_OPTIONS.map((s) => {
              const isActive = request.status === s.value;
              return (
                <button
                  key={s.value}
                  onClick={() => updateStatus(s.value)}
                  disabled={saving || isActive}
                  style={{
                    padding: '12px 18px',
                    backgroundColor: isActive ? s.color : 'transparent',
                    color: isActive ? '#1A1A1A' : s.color,
                    border: `1px solid ${s.color}`,
                    cursor: saving || isActive ? 'default' : 'pointer',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    opacity: saving ? 0.5 : 1,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!saving && !isActive) {
                      e.currentTarget.style.backgroundColor = s.bg;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!saving && !isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {saving && !isActive ? '…' : s.label}
                </button>
              );
            })}
          </div>

          {/* Raccourci "Marquer comme traité" */}
          {request.status !== 'traite' && request.status !== 'archive' && (
            <button
              onClick={() => updateStatus('traite')}
              disabled={saving}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#7ED896',
                color: '#1A1A1A',
                border: 'none',
                cursor: saving ? 'wait' : 'pointer',
                fontSize: '12px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: '32px',
              }}
            >
              ✓ Marquer comme traité
            </button>
          )}

          <span style={labelStyle}>Notes internes</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={6}
            placeholder="Notes visibles uniquement par l'équipe…"
            style={{
              width: '100%',
              padding: '14px 16px',
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid #333',
              color: '#F8F8F8',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              outline: 'none',
              resize: 'vertical',
              marginBottom: '12px',
            }}
          />
          <button
            onClick={saveNotes}
            disabled={saving}
            style={{
              padding: '12px 24px',
              backgroundColor: saving ? '#A3A3A3' : '#C5A059',
              color: '#1A1A1A',
              border: 'none',
              cursor: saving ? 'wait' : 'pointer',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            {saved ? '✓ Enregistré' : 'Enregistrer les notes'}
          </button>

          <div
            style={{
              marginTop: '48px',
              paddingTop: '24px',
              borderTop: '1px solid #333',
            }}
          >
            <button
              onClick={deleteRequest}
              style={{
                background: 'transparent',
                border: '1px solid rgba(220,100,100,0.5)',
                color: '#E8A0A0',
                padding: '10px 20px',
                cursor: 'pointer',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Supprimer la demande
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}