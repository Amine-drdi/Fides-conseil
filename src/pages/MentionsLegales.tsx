import { useEffect } from 'react';
import SEO from '@/components/SEO';

export default function MentionsLegales() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: '#F5F5F5', minHeight: '100vh', paddingTop: '140px' }}>
      <SEO
        title="Mentions légales"
        description="Mentions légales du site FIDES CONSEIL : éditeur, hébergeur, propriété intellectuelle."
        canonical="/mentions-legales"
      />
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px 120px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(30px, 4vw, 44px)',
            fontWeight: 400,
            color: '#1A1A1A',
            marginBottom: '48px',
          }}
        >
          Mentions légales
        </h1>

        {[
          {
            title: 'Éditeur du site',
            content: [
              'FIDES CONSEIL — SAS au capital de 10 000 €',
              'Siège social : 460 Clos de la Courtine, 93160 Noisy-le-Grand',
              'SIRET : 106 012 594 00011',
              'Code NAF : 6622Z (Activités des agents et courtiers d\'assurances)',
              'Immatriculation ORIAS : 26011766 — www.orias.fr',
              'Directeur de la publication : Raad Yassir, Directeur Général',
              'Contact : contact@fidesconseil-patrimoine.fr',
            ],
          },
          {
            title: 'Hébergement',
            content: [
              'Infomaniak Network SA',
              'Rue Eugène Marziano 25, 1227 Les Acacias, Genève, Suisse',
              'www.infomaniak.com',
            ],
          },
          {
            title: 'Base de données',
            content: [
              'Les données du formulaire de contact sont hébergées par Supabase (région eu-west-3, Paris).',
              'Aucune donnée n\'est hébergée hors de l\'Union européenne.',
            ],
          },
          {
            title: 'Propriété intellectuelle',
            content: [
              'L\'ensemble du contenu du site (textes, visuels, identité graphique, logo) est la propriété exclusive de FIDES CONSEIL.',
              'Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite.',
            ],
          },
          {
            title: 'Responsabilité',
            content: [
              'Les informations diffusées sur ce site sont fournies à titre indicatif et ne constituent ni un conseil en investissement personnalisé, ni une offre de produits ou services.',
              'FIDES CONSEIL ne saurait être tenu responsable des décisions prises sur la seule base des contenus du site.',
              'Toute recommandation personnalisée nécessite un bilan patrimonial préalable réalisé par un conseiller.',
            ],
          },
        ].map((section) => (
          <div key={section.title} style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '22px',
                fontWeight: 600,
                color: '#1A1A1A',
                marginBottom: '14px',
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
