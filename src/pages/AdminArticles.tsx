import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { supabase } from '@/lib/supabase';
import SEO from '@/components/SEO';
import ArticleContentEditor from '@/components/ArticleContentEditor';
import {
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  slugify,
  ARTICLE_CATEGORIES,
  type Article,
} from '@/lib/articles';

interface EditorState {
  id: string | null;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  meta_title: string;
  meta_description: string;
  published: boolean;
}

const emptyEditor: EditorState = {
  id: null,
  title: '',
  slug: '',
  category: ARTICLE_CATEGORIES[0],
  excerpt: '',
  content: '',
  cover_image_url: '',
  meta_title: '',
  meta_description: '',
  published: false,
};

export default function AdminArticles() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate('/admin', { replace: true });
        return;
      }
      refresh();
    });
  }, [navigate]);

  const refresh = async () => {
    setLoading(true);
    setArticles(await getAllArticles());
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin', { replace: true });
  };

  const openNew = () => setEditor({ ...emptyEditor });

  const openEdit = (a: Article) =>
    setEditor({
      id: a.id,
      title: a.title,
      slug: a.slug,
      category: a.category,
      excerpt: a.excerpt,
      content: a.content,
      cover_image_url: a.cover_image_url || '',
      meta_title: a.meta_title || '',
      meta_description: a.meta_description || '',
      published: a.published,
    });

  const handleSave = async (publish: boolean) => {
    if (!editor) return;
    setSaving(true);
    setMessage('');
    const input = {
      title: editor.title,
      slug: editor.slug || slugify(editor.title),
      excerpt: editor.excerpt,
      category: editor.category,
      content: editor.content,
      cover_image_url: editor.cover_image_url || undefined,
      meta_title: editor.meta_title || undefined,
      meta_description: editor.meta_description || undefined,
      published: publish,
    };
    const result = editor.id
      ? await updateArticle(editor.id, input)
      : await createArticle(input);
    setSaving(false);
    if (result.ok) {
      setMessage(publish ? 'Article publié !' : 'Brouillon enregistré.');
      setEditor(null);
      refresh();
    } else {
      setMessage(`Erreur : ${result.error}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Supprimer définitivement cet article ?')) return;
    await deleteArticle(id);
    refresh();
  };

  const togglePublish = async (a: Article) => {
    await updateArticle(a.id, { published: !a.published });
    refresh();
  };

  // ---------- SEO char counter ----------
  const CharCount = ({ value, max }: { value: string; max: number }) => {
    const len = value.length;
    const color = len === 0 ? '#666' : len <= max ? '#9ACD9A' : '#E8A0A0';
    return (
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color, letterSpacing: '0.05em' }}>
        {len}/{max} caractères
      </span>
    );
  };

  // ---------- Styles ----------
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid #333',
    color: '#F8F8F8',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    outline: 'none',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-sans)',
    fontSize: '10px',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#C5A059',
    marginBottom: '6px',
  };
  const btnPrimary: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#1A1A1A',
    backgroundColor: '#C5A059',
    padding: '12px 24px',
    border: 'none',
    cursor: 'pointer',
  };
  const btnGhost: React.CSSProperties = {
    ...btnPrimary,
    color: '#A3A3A3',
    backgroundColor: 'transparent',
    border: '1px solid #444',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#141414', padding: '40px 24px' }}>
      <SEO title="Administration — Articles" description="Espace réservé." canonical="/admin/articles" />
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '22px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#F8F8F8',
              }}
            >
              FIDES — Espace rédaction
            </span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link to="/ressources" style={{ ...btnGhost, textDecoration: 'none', display: 'inline-block' }}>
              Voir le site
            </Link>
            <button onClick={handleLogout} style={btnGhost}>
              Déconnexion
            </button>
          </div>
        </div>

        {message && (
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: message.startsWith('Erreur') ? '#E8A0A0' : '#9ACD9A',
              marginBottom: '20px',
            }}
          >
            {message}
          </p>
        )}

        {/* ---------- EDITOR ---------- */}
        {editor ? (
          <div style={{ border: '1px solid #333', padding: '32px', backgroundColor: '#1A1A1A' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '24px',
                color: '#F8F8F8',
                marginTop: 0,
              }}
            >
              {editor.id ? 'Modifier l\'article' : 'Nouvel article'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={labelStyle}>Titre *</label>
                <input
                  style={inputStyle}
                  value={editor.title}
                  onChange={(e) =>
                    setEditor({ ...editor, title: e.target.value, slug: editor.id ? editor.slug : slugify(e.target.value) })
                  }
                  placeholder="Ex : PER 2026 : ce qui change pour votre retraite"
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Slug (URL) *</label>
                  <input
                    style={inputStyle}
                    value={editor.slug}
                    onChange={(e) => setEditor({ ...editor, slug: slugify(e.target.value) })}
                    placeholder="per-2026-changements"
                  />
                  {editor.slug && (
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: '#777', marginTop: '6px', marginBottom: 0 }}>
                      URL : fidesconseil-patrimoine.fr/ressources/<span style={{ color: '#C5A059' }}>{editor.slug}</span>
                    </p>
                  )}
                </div>
                <div>
                  <label style={labelStyle}>Catégorie *</label>
                  <select
                    style={{ ...inputStyle, appearance: 'none' }}
                    value={editor.category}
                    onChange={(e) => setEditor({ ...editor, category: e.target.value })}
                  >
                    {ARTICLE_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Résumé (chapô) *</label>
                <textarea
                  style={{ ...inputStyle, minHeight: '70px', resize: 'vertical' }}
                  value={editor.excerpt}
                  onChange={(e) => setEditor({ ...editor, excerpt: e.target.value })}
                  placeholder="2 phrases qui donnent envie de lire l'article."
                />
              </div>
              <ArticleContentEditor
                value={editor.content}
                onChange={(v) => setEditor({ ...editor, content: v })}
                labelStyle={labelStyle}
                inputStyle={inputStyle}
              />
              <div>
                <label style={labelStyle}>Image de couverture (URL, optionnel)</label>
                <input
                  style={inputStyle}
                  value={editor.cover_image_url}
                  onChange={(e) => setEditor({ ...editor, cover_image_url: e.target.value })}
                  placeholder="https://…"
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <label style={labelStyle}>Meta titre SEO (optionnel)</label>
                    <CharCount value={editor.meta_title} max={60} />
                  </div>
                  <input
                    style={inputStyle}
                    value={editor.meta_title}
                    onChange={(e) => setEditor({ ...editor, meta_title: e.target.value })}
                    placeholder="Par défaut : le titre de l'article"
                  />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <label style={labelStyle}>Meta description SEO (optionnel)</label>
                    <CharCount value={editor.meta_description} max={160} />
                  </div>
                  <input
                    style={inputStyle}
                    value={editor.meta_description}
                    onChange={(e) => setEditor({ ...editor, meta_description: e.target.value })}
                    placeholder="Par défaut : le résumé"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px', flexWrap: 'wrap' }}>
                <button onClick={() => handleSave(true)} disabled={saving} style={btnPrimary}>
                  {saving ? 'Enregistrement…' : editor.published ? 'Mettre à jour (publié)' : 'Publier'}
                </button>
                <button onClick={() => handleSave(false)} disabled={saving} style={btnGhost}>
                  Enregistrer en brouillon
                </button>
                <button onClick={() => setEditor(null)} style={btnGhost}>
                  Annuler
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ---------- LIST ---------- */
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: '#F8F8F8', margin: 0 }}>
                Articles ({articles.length})
              </h2>
              <button onClick={openNew} style={btnPrimary}>
                + Nouvel article
              </button>
            </div>

            {loading ? (
              <p style={{ color: '#A3A3A3', fontFamily: 'var(--font-sans)' }}>Chargement…</p>
            ) : articles.length === 0 ? (
              <div style={{ border: '1px dashed #444', padding: '60px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: '#A3A3A3', fontStyle: 'italic' }}>
                  Aucun article pour le moment. Créez le premier !
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: '#2A2A2A' }}>
                {articles.map((a) => (
                  <div
                    key={a.id}
                    style={{
                      backgroundColor: '#1A1A1A',
                      padding: '20px 24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '16px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div style={{ flex: 1, minWidth: '220px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '9px',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: a.published ? '#9ACD9A' : '#C5A059',
                            border: `1px solid ${a.published ? '#4a6b4a' : 'rgba(197,160,89,0.4)'}`,
                            padding: '3px 8px',
                          }}
                        >
                          {a.published ? 'Publié' : 'Brouillon'}
                        </span>
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          {a.category}
                        </span>
                      </div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '18px',
                          fontWeight: 600,
                          color: '#F8F8F8',
                          margin: '8px 0 0',
                        }}
                      >
                        {a.title}
                      </h3>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button onClick={() => togglePublish(a)} style={btnGhost}>
                        {a.published ? 'Dépublier' : 'Publier'}
                      </button>
                      <button onClick={() => openEdit(a)} style={btnGhost}>
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(a.id)}
                        style={{ ...btnGhost, color: '#E8A0A0', borderColor: 'rgba(220,100,100,0.4)' }}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
