import { useEffect } from 'react';
import SEO from '@/components/SEO';

export default function PolitiqueConfidentialite() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: '1. Responsable du traitement',
      content: [
        'FIDES CONSEIL — SAS au capital de 10 000 €',
        '460 Clos de la Courtine, 93160 Noisy-le-Grand — SIRET : 106 012 594 00011',
        'Contact données personnelles : contact@fidesconseil-patrimoine.fr',
      ],
    },
    {
      title: '2. Données collectées',
      content: [
        'Via le formulaire de contact : prénom, nom, téléphone, email, profil, objet de la demande et message.',
        'Via la bannière cookies : votre choix de consentement (stocké localement dans votre navigateur).',
        'Aucune donnée de navigation, aucun cookie publicitaire ni outil de pistage tiers n\'est utilisé.',
      ],
    },
    {
      title: '3. Finalités et base légale',
      content: [
        'Répondre à vos demandes de contact, de rendez-vous ou de rappel (base légale : mesures précontractuelles — art. 6.1.b du RGPD).',
        'Gestion de la relation client et suivi des échanges (base légale : intérêt légitime — art. 6.1.f du RGPD).',
      ],
    },
    {
      title: '4. Durée de conservation',
      content: [
        'Les demandes de contact sont conservées 3 ans maximum à compter de votre dernier échange avec le cabinet, puis supprimées.',
        'Votre choix cookies est conservé 6 mois dans votre navigateur.',
      ],
    },
    {
      title: '5. Destinataires et hébergement',
      content: [
        'Vos données sont accessibles uniquement aux collaborateurs habilités de FIDES CONSEIL.',
        'Elles sont hébergées dans l\'Union européenne (Supabase, région Paris) et ne font l\'objet d\'aucun transfert hors UE.',
        'Elles ne sont ni vendues, ni louées, ni partagées avec des tiers à des fins commerciales.',
      ],
    },
    {
      title: '6. Vos droits',
      content: [
        'Vous disposez d\'un droit d\'accès, de rectification, d\'effacement, de limitation, d\'opposition et de portabilité de vos données.',
        'Pour exercer ces droits : contact@fidesconseil-patrimoine.fr — réponse sous 30 jours.',
        'Vous pouvez introduire une réclamation auprès de la CNIL : www.cnil.fr.',
      ],
    },
    {
      title: '7. Cookies',
      content: [
        'Ce site n\'utilise que des cookies techniques strictement nécessaires (mémorisation de votre choix de consentement, sécurité).',
        'Ces cookies sont exemptés de consentement conformément aux recommandations de la CNIL.',
      ],
    },
    {
      title: '8. Sécurité',
      content: [
        'Le site est servi exclusivement en HTTPS. Les accès aux données sont restreints (contrôle d\'accès au niveau base de données), et les mots de passe de l\'espace rédaction sont chiffrés.',
        'En cas de violation de données susceptible d\'engendrer un risque pour vos droits, vous serez informé conformément aux articles 33 et 34 du RGPD.',
      ],
    },
  ];

  return (
    <div style={{ backgroundColor: '#F5F5F5', minHeight: '100vh', paddingTop: '140px' }}>
      <SEO
        title="Politique de confidentialité"
        description="Politique de confidentialité et de protection des données personnelles du site FIDES CONSEIL, conformément au RGPD."
        canonical="/politique-confidentialite"
      />
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px 120px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(30px, 4vw, 44px)',
            fontWeight: 400,
            color: '#1A1A1A',
            marginBottom: '16px',
          }}
        >
          Politique de confidentialité
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            color: '#888',
            marginBottom: '48px',
          }}
        >
          Dernière mise à jour : septembre 2026 — Conforme au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et Libertés.
        </p>

        {sections.map((section) => (
          <div key={section.title} style={{ marginBottom: '36px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '20px',
                fontWeight: 600,
                color: '#1A1A1A',
                marginBottom: '12px',
              }}
            >
              {section.title}
            </h2>
            {section.content.map((line, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14.5px',
                  fontWeight: 300,
                  lineHeight: 1.75,
                  color: '#444',
                  margin: '0 0 8px',
                }}
              >
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
