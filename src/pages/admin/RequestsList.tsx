// src/pages/admin/RequestsList.tsx
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router';
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
  status: string;
  created_at: string;
};

const STATUS_OPTIONS = [
  { value: 'nouveau', label: 'Nouveau', color: '#C5A059', bg: 'rgba(197,160,89,0.15)' },
  { value: 'en_cours', label: 'En cours', color: '#7EB0E8', bg: 'rgba(100,150,220,0.15)' },
  { value: 'traite', label: 'Traité', color: '#7ED896', bg: 'rgba(100,200,120,0.15)' },
  { value: 'archive', label: 'Archivé', color: '#A3A3A3', bg: 'rgba(150,150,150,0.15)' },
];

export default function RequestsList() {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadRequests();
  }, []);

  // Fermer le dropdown si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadRequests = async () => {
    const { data, error } = await supabase
      .from('contact_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur :', error);
    } else {
      setRequests(data || []);
    }
    setLoading(false);
  };

  // ⭐ Changement de statut en un clic depuis la liste
  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    setOpenDropdownId(null);

    const { data: { user } } = await supabase.auth.getUser();

    const payload: Record<string, any> = { status: newStatus };
    if (newStatus === 'traite') {
      payload.handled_at = new Date().toISOString();
      payload.handled_by = user?.id || null;
    }

    const { error } = await supabase
      .from('contact_requests')
      .update(payload)
      .eq('id', id);

    setUpdatingId(null);

    if (error) {
      console.error(error);
      setFeedback('❌ Erreur lors de la mise à jour');
    } else {
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
      const label = STATUS_OPTIONS.find((s) => s.value === newStatus)?.label;
      setFeedback(`✓ Statut mis à jour : ${label}`);
    }

    setTimeout(() => setFeedback(''), 2500);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const getStatusStyle = (status: string) =>
    STATUS_OPTIONS.find((s) => s.value === status) || STATUS_OPTIONS[0];

  return (
    <AdminLayout>
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '28px',
          fontWeight: 400,
          marginBottom: '8px',
        }}
      >
        Demandes de contact
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '13px',
          color: '#A3A3A3',
          marginBottom: '20px',
        }}
      >
        {loading ? 'Chargement…' : `${requests.length} demande${requests.length > 1 ? 's' : ''}`}
        <span style={{ marginLeft: '16px', color: '#666' }}>
          · Cliquez sur le statut pour le modifier directement
        </span>
      </p>

      {/* Message de feedback */}
      {feedback && (
        <div
          style={{
            padding: '10px 16px',
            marginBottom: '16px',
            backgroundColor: feedback.startsWith('✓')
              ? 'rgba(100,200,120,0.1)'
              : 'rgba(220,100,100,0.1)',
            border: `1px solid ${feedback.startsWith('✓') ? '#7ED896' : '#E8A0A0'}`,
            color: feedback.startsWith('✓') ? '#7ED896' : '#E8A0A0',
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
          }}
        >
          {feedback}
        </div>
      )}

      {loading ? (
        <p style={{ color: '#A3A3A3' }}>Chargement…</p>
      ) : requests.length === 0 ? (
        <p style={{ color: '#A3A3A3' }}>Aucune demande pour le moment.</p>
      ) : (
        <div style={{ overflowX: 'auto', border: '1px solid #333' }} ref={dropdownRef}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr
                style={{
                  borderBottom: '1px solid #333',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                }}
              >
                {['Date', 'Statut', 'Nom', 'Email', 'Objet', 'Profil', ''].map((h, i) => (
                  <th
                    key={i}
                    style={{
                      padding: '14px 16px',
                      textAlign: 'left',
                      fontSize: '10px',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#C5A059',
                      fontWeight: 500,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => {
                const sc = getStatusStyle(r.status);
                const isUpdating = updatingId === r.id;
                const isOpen = openDropdownId === r.id;

                return (
                  <tr key={r.id} style={{ borderBottom: '1px solid #262626' }}>
                    <td style={{ padding: '14px 16px', color: '#A3A3A3', whiteSpace: 'nowrap' }}>
                      {formatDate(r.created_at)}
                    </td>

                    {/* ⭐ Dropdown de statut */}
                    <td style={{ padding: '14px 16px', position: 'relative' }}>
                      <button
                        onClick={() => setOpenDropdownId(isOpen ? null : r.id)}
                        disabled={isUpdating}
                        style={{
                          padding: '5px 10px',
                          fontSize: '10px',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                          backgroundColor: sc.bg,
                          color: sc.color,
                          border: `1px solid ${sc.color}`,
                          cursor: isUpdating ? 'wait' : 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          opacity: isUpdating ? 0.5 : 1,
                        }}
                      >
                        {isUpdating ? '…' : sc.label}
                        <span style={{ fontSize: '8px' }}>▼</span>
                      </button>

                      {isOpen && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 'calc(100% - 4px)',
                            left: '16px',
                            zIndex: 100,
                            backgroundColor: '#0F0F0F',
                            border: '1px solid #333',
                            minWidth: '140px',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                          }}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <button
                              key={s.value}
                              onClick={() => updateStatus(r.id, s.value)}
                              disabled={s.value === r.status}
                              style={{
                                display: 'block',
                                width: '100%',
                                padding: '10px 14px',
                                textAlign: 'left',
                                backgroundColor:
                                  s.value === r.status ? 'rgba(255,255,255,0.05)' : 'transparent',
                                color: s.value === r.status ? '#666' : s.color,
                                border: 'none',
                                cursor: s.value === r.status ? 'default' : 'pointer',
                                fontSize: '11px',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                fontWeight: 500,
                                borderLeft:
                                  s.value === r.status
                                    ? `2px solid ${s.color}`
                                    : '2px solid transparent',
                              }}
                              onMouseEnter={(e) => {
                                if (s.value !== r.status) {
                                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (s.value !== r.status) {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              {s.value === r.status ? '✓ ' : ''}
                              {s.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      <Link
                        to={`/admin/demandes/${r.id}`}
                        style={{
                          color: '#F8F8F8',
                          textDecoration: 'none',
                          borderBottom: '1px solid transparent',
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.borderBottomColor = '#C5A059')
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.borderBottomColor = 'transparent')
                        }
                      >
                        {r.prenom} {r.nom}
                      </Link>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#A3A3A3' }}>{r.email}</td>
                    <td style={{ padding: '14px 16px' }}>{r.objet}</td>
                    <td style={{ padding: '14px 16px', color: '#A3A3A3' }}>{r.profil}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <Link
                        to={`/admin/demandes/${r.id}`}
                        style={{
                          color: '#C5A059',
                          textDecoration: 'none',
                          fontSize: '11px',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Ouvrir →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}