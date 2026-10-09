import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { submitContactRequest } from '@/lib/supabase';

gsap.registerPlugin(ScrollTrigger);

type ContactMode = 'rdv' | 'rappel';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formWrapRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<ContactMode>('rdv');
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    telephone: '',
    email: '',
    profil: '',
    objet: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [consent, setConsent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;

    // Honeypot anti-spam : un bot qui remplit ce champ caché obtient un faux succès
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    setSending(true);
    setSendError(false);

    const result = await submitContactRequest({
      mode,
      prenom: formData.prenom,
      nom: formData.nom,
      telephone: formData.telephone,
      email: formData.email,
      profil: formData.profil,
      objet: formData.objet,
      message: formData.message,
    });

    setSending(false);

    if (result.ok) {
      setSubmitted(true);
      setFormData({ prenom: '', nom: '', telephone: '', email: '', profil: '', objet: '', message: '' });
    } else {
      setSendError(true);
    }
  };

  const handleModeClick = (m: ContactMode) => {
    setMode(m);
    setFormData((prev) => ({
      ...prev,
      objet: m === 'rappel' ? 'Être rappelé' : prev.objet,
    }));
    formWrapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const form = formWrapRef.current;
    const info = infoRef.current;
    if (!section || !header || !form || !info) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(header, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
    tl.fromTo(info, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4');
    tl.fromTo(form, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6');

    return () => {
      tl.kill();
    };
  }, []);

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid #333',
    color: '#F8F8F8',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    fontWeight: 300,
    outline: 'none',
    transition: 'border-color 0.3s ease',
    letterSpacing: '0.02em',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-sans)',
    fontSize: '10px',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#C5A059',
    marginBottom: '8px',
  };

  const focusBorder = (e: React.FocusEvent<any>) => {
    e.currentTarget.style.borderColor = '#C5A059';
  };
  const blurBorder = (e: React.FocusEvent<any>) => {
    e.currentTarget.style.borderColor = '#333';
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23C5A059' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
    paddingRight: '40px',
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 24px',
        backgroundColor: '#1A1A1A',
        overflow: 'hidden',
      }}
    >
      {/* Decorative line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: '100px',
          background: 'linear-gradient(to bottom, transparent, rgba(197, 160, 89, 0.3))',
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '48px', opacity: 0 }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#C5A059',
            }}
          >
            Contact
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 400,
              color: '#F8F8F8',
              marginTop: '16px',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Parlons de votre patrimoine.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              fontWeight: 300,
              lineHeight: 1.7,
              color: '#A3A3A3',
              marginTop: '20px',
              maxWidth: '620px',
              margin: '20px auto 0',
            }}
          >
            Vous souhaitez faire le point sur votre situation, préparer un projet ou simplement
            échanger avec un conseiller ? Prenons le temps d'en discuter.
          </p>

          {/* Mode buttons */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              marginTop: '36px',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => handleModeClick('rdv')}
              data-hover
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: mode === 'rdv' ? '#1A1A1A' : '#C5A059',
                backgroundColor: mode === 'rdv' ? '#C5A059' : 'transparent',
                padding: '16px 36px',
                border: '1.5px solid #C5A059',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              Prendre rendez-vous
            </button>
            <button
              onClick={() => handleModeClick('rappel')}
              data-hover
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: mode === 'rappel' ? '#1A1A1A' : '#C5A059',
                backgroundColor: mode === 'rappel' ? '#C5A059' : 'transparent',
                padding: '16px 36px',
                border: '1.5px solid #C5A059',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              Être rappelé
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '80px',
            alignItems: 'start',
          }}
        >
          {/* Left: Contact Info */}
          <div ref={infoRef} style={{ opacity: 0, paddingTop: '20px' }}>
            <div style={{ marginBottom: '44px' }}>
              <span style={labelStyle}>Adresse</span>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '15px',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: '#F8F8F8',
                }}
              >
                460 Clos de la Courtine
                <br />
                93160 Noisy-le-Grand
              </p>
            </div>

            <div style={{ marginBottom: '44px' }}>
              <span style={labelStyle}>Email</span>
              <a
                href="mailto:contact@fidesconseil-patrimoine.fr"
                data-hover
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '15px',
                  fontWeight: 400,
                  color: '#C5A059',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#DCCAA4')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#C5A059')}
              >
                contact@fidesconseil-patrimoine.fr
              </a>
            </div>


            <div style={{ marginBottom: '44px' }}>
              <span style={labelStyle}>Informations légales</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  'SIRET : 106 012 594 00011',
                  'Capital social : 10 000 €',
                  'Code NAF : 6622Z',
                  'Immatriculation ORIAS : 26011766',
                ].map((line) => (
                  <span
                    key={line}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      fontWeight: 300,
                      color: '#A3A3A3',
                    }}
                  >
                    {line}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ width: '60px', height: '1px', backgroundColor: '#C5A059', marginBottom: '28px' }} />

            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '17px',
                fontStyle: 'italic',
                lineHeight: 1.6,
                color: '#DCCAA4',
                maxWidth: '380px',
              }}
            >
              &ldquo;Chaque parcours patrimonial est unique. Prenons le temps d'échanger autour du vôtre.&rdquo;
            </p>
          </div>

          {/* Right: Form */}
          <div ref={formWrapRef} style={{ opacity: 0 }}>
            {submitted ? (
              <div style={{ padding: '60px 40px', border: '1px solid #C5A059', textAlign: 'center' }}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C5A059"
                  strokeWidth="1.5"
                  style={{ marginBottom: '20px' }}
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '24px',
                    fontWeight: 600,
                    color: '#F8F8F8',
                    marginBottom: '12px',
                  }}
                >
                  Message envoyé
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 300, color: '#A3A3A3' }}>
                  Nous vous recontacterons dans les 24 heures ouvrées.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  data-hover
                  style={{
                    marginTop: '28px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#C5A059',
                    backgroundColor: 'transparent',
                    padding: '12px 28px',
                    border: '1px solid #C5A059',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                {/* Prénom + Nom */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>Prénom</label>
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={focusBorder}
                      onBlur={blurBorder}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Nom</label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={focusBorder}
                      onBlur={blurBorder}
                    />
                  </div>
                </div>

                {/* Téléphone + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>Téléphone</label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={focusBorder}
                      onBlur={blurBorder}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={focusBorder}
                      onBlur={blurBorder}
                    />
                  </div>
                </div>

                {/* Profil */}
                <div>
                  <label style={labelStyle}>Votre profil</label>
                  <select
                    name="profil"
                    value={formData.profil}
                    onChange={handleChange}
                    required
                    style={selectStyle}
                    onFocus={focusBorder}
                    onBlur={blurBorder}
                  >
                    <option value="" disabled>
                      Sélectionnez votre profil
                    </option>
                    <option value="particulier">Particulier & famille</option>
                    <option value="chef-entreprise">Chef d'entreprise</option>
                    <option value="sante">Professionnel de santé</option>
                    <option value="liberale">Profession libérale</option>
                    <option value="cadre">Cadre & dirigeant</option>
                  </select>
                </div>

                {/* Objet */}
                <div>
                  <label style={labelStyle}>Objet de la demande</label>
                  <select
                    name="objet"
                    value={formData.objet}
                    onChange={handleChange}
                    required
                    style={selectStyle}
                    onFocus={focusBorder}
                    onBlur={blurBorder}
                  >
                    <option value="" disabled>
                      Sélectionnez un objet
                    </option>
                    <option value="Être rappelé">Être rappelé</option>
                    <option value="Bilan patrimonial">Bilan patrimonial</option>
                    <option value="Retraite">Préparer ma retraite</option>
                    <option value="Investissement">Investir / épargner</option>
                    <option value="Immobilier">Projet immobilier</option>
                    <option value="Fiscalité">Optimiser ma fiscalité</option>
                    <option value="Protection">Protéger mes proches</option>
                    <option value="Transmission">Transmission / succession</option>
                    <option value="Simulation">Demande de simulation</option>
                    <option value="Autre">Autre demande</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }}
                    onFocus={focusBorder}
                    onBlur={blurBorder}
                  />
                </div>

                {/* Honeypot — invisible pour les humains, piège les robots */}
                <input
                  type="text"
                  name="entreprise"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}
                />

                {/* Consentement RGPD */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <input
                    type="checkbox"
                    id="rgpd-consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    style={{ marginTop: '3px', accentColor: '#C5A059', flexShrink: 0 }}
                  />
                  <label
                    htmlFor="rgpd-consent"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '12px',
                      fontWeight: 300,
                      lineHeight: 1.6,
                      color: '#A3A3A3',
                      cursor: 'pointer',
                    }}
                  >
                    J'accepte que mes données soient traitées par FIDES CONSEIL pour répondre à ma
                    demande, conformément à la{' '}
                    <a href="/politique-confidentialite" style={{ color: '#C5A059' }}>
                      politique de confidentialité
                    </a>
                    . Elles ne sont ni vendues ni partagées, et conservées 3 ans maximum. *
                  </label>
                </div>

                {/* Error message */}
                {sendError && (
                  <div
                    style={{
                      padding: '14px 18px',
                      border: '1px solid rgba(220, 100, 100, 0.5)',
                      backgroundColor: 'rgba(220, 100, 100, 0.08)',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '13px',
                        fontWeight: 400,
                        color: '#E8A0A0',
                        margin: 0,
                      }}
                    >
                      Une erreur est survenue lors de l'envoi. Réessayez ou écrivez-nous directement à
                      contact@fidesconseil-patrimoine.fr
                    </p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  data-hover
                  disabled={sending}
                  style={{
                    alignSelf: 'flex-start',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#1A1A1A',
                    backgroundColor: sending ? '#A3A3A3' : '#C5A059',
                    padding: '16px 48px',
                    border: 'none',
                    cursor: sending ? 'wait' : 'pointer',
                    transition: 'all 0.3s ease',
                    marginTop: '6px',
                    opacity: sending ? 0.8 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!sending) {
                      e.currentTarget.style.backgroundColor = '#DCCAA4';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!sending) {
                      e.currentTarget.style.backgroundColor = '#C5A059';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {sending ? 'Envoi en cours…' : 'Envoyer ma demande'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
