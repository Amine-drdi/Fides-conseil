import { useMemo, useRef, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface Props {
  value: string;
  onChange: (v: string) => void;
  labelStyle: React.CSSProperties;
  inputStyle: React.CSSProperties;
}

interface ToolbarAction {
  label: string;
  title: string;
  before?: string;
  after?: string;
  linePrefix?: string;
  placeholder?: string;
}

const ACTIONS: ToolbarAction[] = [
  { label: 'G', title: 'Gras', before: '**', after: '**', placeholder: 'texte en gras' },
  { label: 'I', title: 'Italique', before: '*', after: '*', placeholder: 'texte en italique' },
  { label: 'H2', title: 'Titre de section', linePrefix: '## ', placeholder: 'Titre de section' },
  { label: 'H3', title: 'Sous-titre', linePrefix: '### ', placeholder: 'Sous-titre' },
  { label: '•', title: 'Liste à puces', linePrefix: '- ', placeholder: 'Premier point' },
  { label: '❝', title: 'Citation', linePrefix: '> ', placeholder: 'Citation' },
  { label: '🔗', title: 'Lien', before: '[', after: '](https://)', placeholder: 'texte du lien' },
];

export default function ArticleContentEditor({ value, onChange, labelStyle, inputStyle }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [tab, setTab] = useState<'write' | 'preview'>('write');

  const words = useMemo(() => value.trim().split(/\s+/).filter(Boolean).length, [value]);
  const readingTime = Math.max(1, Math.ceil(words / 200));

  const previewHtml = useMemo(() => {
    if (tab !== 'preview') return '';
    return DOMPurify.sanitize(marked.parse(value || '') as string);
  }, [tab, value]);

  const apply = (action: ToolbarAction) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = value.slice(start, end);

    let next: string;
    let cursorStart: number;
    let cursorEnd: number;

    if (action.linePrefix !== undefined) {
      // Apply prefix to each selected line (or current line)
      const lineStart = value.lastIndexOf('\n', start - 1) + 1;
      const lineEnd = value.indexOf('\n', end) === -1 ? value.length : value.indexOf('\n', end);
      const block = value.slice(lineStart, lineEnd) || action.placeholder || '';
      const prefixed = block
        .split('\n')
        .map((l) => (l.startsWith(action.linePrefix!) ? l : action.linePrefix + l))
        .join('\n');
      next = value.slice(0, lineStart) + prefixed + value.slice(lineEnd);
      cursorStart = lineStart;
      cursorEnd = lineStart + prefixed.length;
    } else {
      const inner = selected || action.placeholder || '';
      const wrapped = `${action.before}${inner}${action.after}`;
      next = value.slice(0, start) + wrapped + value.slice(end);
      cursorStart = start + (action.before?.length || 0);
      cursorEnd = cursorStart + inner.length;
      // For links, select the URL part if no text was selected
      if (action.title === 'Lien' && !selected) {
        cursorStart = start + wrapped.indexOf('](https://') + 2;
        cursorEnd = cursorStart + 8;
      }
    }

    onChange(next);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(cursorStart, cursorEnd);
    });
  };

  const tabBtn = (active: boolean): React.CSSProperties => ({
    fontFamily: 'var(--font-sans)',
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    padding: '8px 16px',
    border: '1px solid #444',
    borderBottom: active ? '1px solid #1A1A1A' : '1px solid #444',
    backgroundColor: active ? '#1A1A1A' : 'transparent',
    color: active ? '#C5A059' : '#888',
    cursor: 'pointer',
    marginBottom: '-1px',
  });

  const toolBtn: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: '11px',
    fontWeight: 600,
    padding: '6px 10px',
    border: '1px solid #444',
    backgroundColor: 'transparent',
    color: '#D0D0D0',
    cursor: 'pointer',
    minWidth: '32px',
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6px', flexWrap: 'wrap', gap: '8px' }}>
        <label style={{ ...labelStyle, marginBottom: 0 }}>Contenu *</label>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: '#777', letterSpacing: '0.05em' }}>
          {words} mots · ~{readingTime} min de lecture
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px' }}>
        <button type="button" onClick={() => setTab('write')} style={tabBtn(tab === 'write')}>
          Écrire
        </button>
        <button type="button" onClick={() => setTab('preview')} style={tabBtn(tab === 'preview')}>
          Aperçu
        </button>
      </div>

      {tab === 'write' ? (
        <>
          {/* Toolbar */}
          <div
            style={{
              display: 'flex',
              gap: '4px',
              flexWrap: 'wrap',
              padding: '8px',
              border: '1px solid #333',
              borderBottom: 'none',
              backgroundColor: 'rgba(255,255,255,0.02)',
            }}
          >
            {ACTIONS.map((a) => (
              <button key={a.label} type="button" title={a.title} onClick={() => apply(a)} style={toolBtn}>
                {a.label}
              </button>
            ))}
            <span style={{ marginLeft: 'auto', alignSelf: 'center', fontFamily: 'var(--font-sans)', fontSize: '10px', color: '#666' }}>
              Sélectionnez du texte puis cliquez sur un bouton
            </span>
          </div>
          <textarea
            ref={textareaRef}
            style={{
              ...inputStyle,
              minHeight: '340px',
              resize: 'vertical',
              fontFamily: 'monospace',
              fontSize: '13px',
              lineHeight: 1.7,
              borderTop: '1px solid #333',
            }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={'## Introduction\n\nVotre texte…\n\n## Une section\n\n- Point 1\n- Point 2'}
          />
        </>
      ) : (
        <div
          style={{
            border: '1px solid #333',
            backgroundColor: '#FFFFFF',
            padding: '32px 36px',
            minHeight: '340px',
          }}
        >
          {value.trim() ? (
            <div className="article-content" dangerouslySetInnerHTML={{ __html: previewHtml }} />
          ) : (
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#999', fontStyle: 'italic' }}>
              L'aperçu s'affichera ici dès que vous commencerez à écrire.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
