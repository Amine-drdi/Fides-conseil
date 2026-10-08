import { useEffect, useState } from 'react';

const menuItems = [
  { label: 'Notre Vision', href: '#vision' },
  { label: 'Votre Situation', href: '#profils' },
  { label: 'Nos Expertises', href: '#expertises' },
  { label: 'Nos Solutions', href: '#solutions' },
  { label: 'Notre Méthode', href: '#methode' },
  { label: 'Ressources', href: '#ressources' },
  { label: 'Contact', href: '#contact' },
];

export function scrollToSection(href: string) {
  const target = document.querySelector(href);
  if (!target) {
    // Section inexistante sur cette page : retour accueil + ancre
    window.location.assign(`/${href}`);
    return;
  }
  const lenis = (window as any).__lenis;
  if (lenis) {
    lenis.scrollTo(target as HTMLElement, { offset: -72, duration: 1.4 });
  } else {
    (target as HTMLElement).scrollIntoView({ behavior: 'smooth' });
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          height: '72px',
          backgroundColor: scrolled || menuOpen ? 'rgba(16, 16, 16, 0.92)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(197, 160, 89, 0.15)' : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNav(e, '#hero')}
          data-hover
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#F8F8F8',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          FIDES
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '0.3em',
              color: '#C5A059',
            }}
          >
            CONSEIL
          </span>
        </a>

        {/* Desktop menu */}
        <div
          className="nav-desktop"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
          }}
        >
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNav(e, item.href)}
              data-hover
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#A3A3A3',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C5A059')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#A3A3A3')}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNav(e, '#contact')}
            data-hover
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#1A1A1A',
              backgroundColor: '#C5A059',
              padding: '12px 22px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#DCCAA4';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#C5A059';
            }}
          >
            Prendre rendez-vous
          </a>
        </div>

        {/* Mobile: CTA + hamburger */}
        <div
          className="nav-mobile"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <a
            href="#contact"
            onClick={(e) => handleNav(e, '#contact')}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#1A1A1A',
              backgroundColor: '#C5A059',
              padding: '10px 14px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            RDV
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            <span
              style={{
                width: '24px',
                height: '1.5px',
                backgroundColor: '#F8F8F8',
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(45deg) translateY(6.5px)' : 'none',
              }}
            />
            <span
              style={{
                width: '24px',
                height: '1.5px',
                backgroundColor: '#F8F8F8',
                opacity: menuOpen ? 0 : 1,
                transition: 'opacity 0.3s ease',
              }}
            />
            <span
              style={{
                width: '24px',
                height: '1.5px',
                backgroundColor: '#F8F8F8',
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          backgroundColor: 'rgba(16, 16, 16, 0.98)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '28px',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      >
        {menuItems.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleNav(e, item.href)}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '28px',
              fontWeight: 400,
              color: '#F8F8F8',
              textDecoration: 'none',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.4s ease ${0.05 + i * 0.05}s`,
            }}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={(e) => handleNav(e, '#contact')}
          style={{
            marginTop: '16px',
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#1A1A1A',
            backgroundColor: '#C5A059',
            padding: '16px 40px',
            textDecoration: 'none',
            opacity: menuOpen ? 1 : 0,
            transition: 'opacity 0.4s ease 0.4s',
          }}
        >
          Prendre rendez-vous
        </a>
        <a
          href="/espace-client"
          onClick={() => setMenuOpen(false)}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            fontWeight: 400,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#A3A3A3',
            textDecoration: 'none',
            borderBottom: '1px solid rgba(197, 160, 89, 0.4)',
            paddingBottom: '4px',
            opacity: menuOpen ? 1 : 0,
            transition: 'opacity 0.4s ease 0.45s',
          }}
        >
          Espace client
        </a>
      </div>
    </>
  );
}
