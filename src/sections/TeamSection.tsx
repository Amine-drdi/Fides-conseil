import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
    {
    name: 'Marouane Charni',
    role: 'PRÉSIDENT DE FIDES',
    roleEn: 'Co-fondateur',
    image: '/images/marouane-charni.jpeg',
    bio: "Convaincu que la confiance, la transparence et l’excellence sont les fondements d’une relation durable, j’ai souhaité faire de FIDES un cabinet où chaque décision est guidée par l’intérêt de nos clients.Notre ambition est claire : proposer un accompagnement patrimonial sur mesure, fondé sur une vision stratégique à long terme, une exigence constante et une totale indépendance de conseil.À travers FIDES, je souhaite incarner une nouvelle approche du conseil patrimonial, où la proximité, la rigueur et l’engagement permettent de bâtir des relations solides et pérennes.",
    quote: "La confiance ne se revendique pas, elle se construit. Notre engagement est de la mériter chaque jour, par l’excellence de nos conseils et la justesse de nos décisions.",
    expertise: ['Expertise patrimoniale', 'Vision stratégique', 'Leadership', 'Excellence'],
    color: '#C5A059',
  },
  {
    name: 'Raad Yassir',
    role: 'Directeur Commercial',
    roleEn: 'Co-fondateur',
    image: '/images/raad-yassir.jpg',
    bio: "Après un Master en Finance et 3 ans d'expérience en gestion de patrimoine, j'ai décidé de co-fonder le cabinet FIDES pour avoir plus d'indépendance dans le conseil — sans aucune orientation ou conseil dirigé par intêt. Je voulais implanter ma vision : un conseil patrimonial pur, transparent et dédié exclusivement à l'intérêt de nos clients.",
    quote: "L'indépendance est notre bien le plus précieux. Elle garantit à chaque client un conseil objectif, sans conflit d'intérêts.",
    expertise: ['Gestion de Patrimoine', 'Finance', 'Stratégie', 'Conseil Indépendant'],
    color: '#ebca8d',
  },
  {
    name: 'Montasser Charni',
    role: 'Responsable Pôle Juridique',
    roleEn: 'Maître en Droit',
    image: '/images/montasser-charni.jpg',
    bio: "Maître Montasser Charni dirige notre pôle juridique avec une expertise pointue en droit des affaires et droit immobilier. Son approche rigoureuse et sa connaissance approfondie du droit des sociétés en font un atout majeur pour la structuration et la protection des patrimoines de nos clients.",
    quote: "Le droit est le socle de toute stratégie patrimoniale durable. Une structure bien pensée aujourd'hui, c'est un héritage préservé demain.",
    expertise: [
      'Droit Immobilier',
      'Droit des Affaires',
      'Cessions de fonds de commerce et de sociétés',
      'Entreprises en difficulté',
      'Droit des Sociétés',
    ],
    color: '#DCCAA4',
  },
  {
    name: 'Dr Tony Rahme',
    role: 'Responsable Pôle Conseil Profession Médical',
    roleEn: 'Docteur',
    image: '/images/tony-rahme.jpg',
    bio: "Le Dr Tony Rahme apporte à FIDES une expertise unique à l'intersection du monde médical et de la gestion patrimoniale. Il accompagne les professionnels de santé dans l'optimisation de leur patrimoine professionnel et personnel, avec une compréhension intime des enjeux spécifiques aux métiers de la santé.",
    quote: 'Les professionnels de santé méritent un conseil patrimonial à la hauteur de leur engagement. La compréhension de leur parcours est la clé.',
    expertise: [
      'Conseil Profession Médical',
      'Optimisation Patrimoniale',
      'Protection Sociale',
      'Immobilier Professionnel',
      'Transmission Cabinet',
    ],
    color: '#A3A3A3',
  },
  {
    name: 'Eden Raad',
    role: 'Conseiller Client',
    roleEn: 'Client Relations',
    image: '/images/eden-raad.jpg',
    bio: "Eden Raad est votre interlocuteur privilégié au sein du cabinet FIDES. Il assure un accompagnement personnalisé à chaque étape de votre parcours patrimonial, de la première prise de contact au suivi régulier de vos dossiers. Sa disponibilité et son écoute active en font un atout précieux pour nos clients.",
    quote: "Être à l'écoute, comprendre les besoins, répondre avec précision. La relation client est le cœur de notre métier.",
    expertise: [
      'Relation Client',
      'Accompagnement Personnalisé',
      'Suivi de Dossiers',
      'Conseil Patrimonial',
      'Fidélisation',
    ],
    color: '#8899AA',
  },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 65%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      header,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      tl.fromTo(
        card,
        { opacity: 0, y: 50, x: i === 0 ? -30 : 30 },
        { opacity: 1, y: 0, x: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.5'
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="equipe"
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 24px',
        backgroundColor: '#1A1A1A',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background element */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          border: '1px solid rgba(197, 160, 89, 0.06)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Section Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            marginBottom: '80px',
            opacity: 0,
          }}
        >
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
            Notre Équipe
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 400,
              color: '#F8F8F8',
              marginTop: '16px',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Les visages de
            <span style={{ color: '#C5A059' }}> FIDES</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              fontWeight: 300,
              lineHeight: 1.7,
              color: '#A3A3A3',
              marginTop: '20px',
              maxWidth: '600px',
              margin: '20px auto 0',
            }}
          >
            Une équipe de passionnés, unie par la même exigence : votre intérêt, et rien d'autre.
          </p>
        </div>

        {/* Team Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              style={{
                position: 'relative',
                backgroundColor: 'rgba(26, 26, 26, 0.95)',
                border: '1px solid #333',
                overflow: 'hidden',
                opacity: 0,
                transition: 'border-color 0.4s ease, transform 0.4s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = member.color;
                e.currentTarget.style.transform = 'translateY(-6px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#333';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Image */}
              <div
                style={{
                  width: '100%',
                  height: '420px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition:
                      index === 0
                        ? 'center 25%'
                        : index === 1
                          ? 'center 35%'
                          : index === 2
                            ? 'center 20%'
                            : 'center 30%',
                    filter: 'grayscale(20%)',
                    transition: 'filter 0.5s ease, transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%)';
                    e.currentTarget.style.transform = 'scale(1.03)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'grayscale(20%)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
                {/* Gradient overlay at bottom */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '150px',
                    background: 'linear-gradient(to top, #1A1A1A, transparent)',
                    pointerEvents: 'none',
                  }}
                />
                {/* Role badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '28px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: member.color,
                      padding: '6px 14px',
                      border: `1px solid ${member.color}`,
                      backgroundColor: 'rgba(26, 26, 26, 0.8)',
                    }}
                  >
                    {member.roleEn}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '32px' }}>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '28px',
                    fontWeight: 600,
                    color: '#F8F8F8',
                    letterSpacing: '-0.01em',
                    marginBottom: '4px',
                  }}
                >
                  {member.name}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    fontWeight: 400,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: member.color,
                    marginBottom: '20px',
                  }}
                >
                  {member.role}
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: '#A3A3A3',
                    marginBottom: '20px',
                  }}
                >
                  {member.bio}
                </p>

                {/* Quote */}
                <blockquote
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '15px',
                    fontStyle: 'italic',
                    lineHeight: 1.6,
                    color: '#DCCAA4',
                    paddingLeft: '16px',
                    borderLeft: `2px solid ${member.color}`,
                    marginBottom: '24px',
                  }}
                >
                  &ldquo;{member.quote}&rdquo;
                </blockquote>

                {/* Expertise tags */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}
                >
                  {member.expertise.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '11px',
                        fontWeight: 500,
                        letterSpacing: '0.05em',
                        color: '#A3A3A3',
                        padding: '6px 12px',
                        border: '1px solid #333',
                        transition: 'border-color 0.3s ease, color 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = member.color;
                        e.currentTarget.style.color = '#F8F8F8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#333';
                        e.currentTarget.style.color = '#A3A3A3';
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
