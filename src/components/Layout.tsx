import { ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router'
import { useTheme } from '../context/ThemeContext'
import SectionLink from './SectionLink'
import { studio } from '../content/site'

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="group flex items-baseline gap-2"
      aria-label={`${studio.name}, home`}
    >
      <span className="display-xl text-[1.65rem] leading-none transition-colors duration-300 group-hover:text-accent">
        4
        <span className="align-super text-[0.55em] italic">th</span>
      </span>
      <span className="label pb-[2px] text-bone transition-colors duration-300 group-hover:text-accent">
        Culture
      </span>
    </Link>
  )
}

export default function Layout() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { layout, mood, hero, radius, typeScale } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [menuOpen])

  const navLinkClass = 'nav-link label text-muted hover:text-bone'

  return (
    <div className="min-h-screen bg-ground" data-layout={layout} data-mood={mood} data-hero={hero} data-radius={radius} data-type={typeScale}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled ? 'border-b border-line-soft bg-ground' : ''
        }`}
      >
        <div className="shell flex items-center justify-between py-5">
          <Wordmark />
          <nav aria-label="Primary navigation" className="hidden items-center gap-10 lg:flex">
            <SectionLink to="practice" className={navLinkClass}>
              Practice
            </SectionLink>
            <SectionLink to="proof" className={navLinkClass}>
              Proof
            </SectionLink>
            <SectionLink to="engage" className={navLinkClass}>
              Engage
            </SectionLink>
            <Link to="/manifesto" className={navLinkClass}>
              Manifesto
            </Link>
            <Link to="/contact" className="button-outline label px-5 py-2.5">
              Start a project
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="menu-trigger label text-bone lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
            <span aria-hidden className="menu-mark">
              <i />
              <i />
            </span>
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={`mobile-nav lg:hidden ${menuOpen ? 'mobile-nav-open' : ''}`}
          aria-hidden={!menuOpen}
        >
          <nav
            aria-label="Mobile navigation"
            className="shell border-t border-line-soft bg-ground pb-8 pt-5"
          >
            <div className="flex flex-col gap-1">
              <SectionLink
                to="practice"
                className="mobile-nav-link"
                onNavigate={() => setMenuOpen(false)}
              >
                Practice
              </SectionLink>
              <SectionLink
                to="proof"
                className="mobile-nav-link"
                onNavigate={() => setMenuOpen(false)}
              >
                Proof
              </SectionLink>
              <SectionLink
                to="engage"
                className="mobile-nav-link"
                onNavigate={() => setMenuOpen(false)}
              >
                Engage
              </SectionLink>
              <Link
                to="/manifesto"
                className="mobile-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                Manifesto
              </Link>
              <Link
                to="/contact"
                className="button-solid label mt-5 px-5 py-3.5 text-center"
                onClick={() => setMenuOpen(false)}
              >
                Start a project
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="rule-top mt-24 lg:mt-32">
        <div className="shell py-16">
          <div className="grid-12">
            <div className="md:col-span-12 lg:col-span-5">
              <Wordmark />
              <p className="measure-tight mt-6 max-w-sm font-display text-xl italic leading-snug text-muted">
                {studio.positioning}
              </p>
            </div>
            <div className="md:col-span-6 lg:col-span-3 lg:col-start-7">
              <p className="label text-faint">Elsewhere</p>
              <ul className="mt-5 space-y-3">
                {[
                  { label: 'LinkedIn', href: studio.linkedin },
                  { label: 'GitHub', href: studio.github },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="footer-link inline-flex items-center gap-2"
                    >
                      <ExternalLink size={11} strokeWidth={1.5} aria-hidden />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-6 lg:col-span-3">
              <p className="label text-faint">Practice</p>
              <ul className="mt-5 space-y-3">
                <li>
                  <Link to="/manifesto" className="footer-link">
                    The manifesto
                  </Link>
                </li>
                <li>
                  <SectionLink to="engage" className="footer-link">
                    Ways to engage
                  </SectionLink>
                </li>
                <li>
                  <Link to="/contact" className="footer-link">
                    Start a project
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-14 flex flex-col justify-between gap-4 border-t border-line-soft pt-8 sm:flex-row">
            <p className="label text-faint">
              {studio.name} / {studio.base}
            </p>
            <p className="label text-faint">
              © {new Date().getFullYear()}{' '}
              <a
                href={studio.portfolio}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-accent"
              >
                {studio.principal}
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
