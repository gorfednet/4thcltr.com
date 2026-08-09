import { ExternalLink } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { useTheme } from '../context/ThemeContext'
import {
  getNavigationConstruct,
  mobileMenuCloseAtTriggerIds,
  mobileMenuIds,
} from '../navigation'
import DesignLink from './DesignLink'
import SectionLink from './SectionLink'
import { studio } from '../content/site'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { designAwarePath } from '../utils/designPath'

function Wordmark({ onClick }: { onClick?: () => void }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { recipe } = useTheme()
  const destination = designAwarePath('/', location.search, recipe.id)

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    event.preventDefault()
    onClick?.()
    navigate(destination)
    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: location.pathname === '/' ? 'smooth' : 'auto',
      })
    })
  }

  return (
    <a
      href={destination}
      onClick={handleClick}
      className="wordmark group flex items-center gap-2"
      aria-label={`${studio.name}, home`}
    >
      <span className="wordmark-mark display-xl text-[1.65rem] leading-none transition-colors duration-300 group-hover:text-accent">
        4
        <span className="align-super text-[0.55em] italic">th</span>
      </span>
      <span className="wordmark-label label text-bone transition-colors duration-300 group-hover:text-accent">
        Culture
      </span>
    </a>
  )
}

function NavigationLinks({
  className,
  onNavigate,
  activeSectionId,
}: {
  className: string
  onNavigate?: () => void
  activeSectionId: ReturnType<typeof useScrollSpy>
}) {
  const location = useLocation()
  const isContactPage = /^\/contact\/?$/.test(location.pathname)
  const content = (glyph: string, label: string) => (
    <>
      <span className="nav-glyph" aria-hidden>{glyph}</span>
      <span className="nav-label">{label}</span>
    </>
  )

  return (
    <>
      <SectionLink
        to="why"
        className={className}
        onNavigate={onNavigate}
        current={activeSectionId === 'why'}
      >
        {content('01', 'Manifesto')}
      </SectionLink>
      <SectionLink
        to="practice"
        className={className}
        onNavigate={onNavigate}
        current={activeSectionId === 'practice'}
      >
        {content('02', 'Practice')}
      </SectionLink>
      <SectionLink
        to="engage"
        className={className}
        onNavigate={onNavigate}
        current={activeSectionId === 'engage'}
      >
        {content('03', 'Engage')}
      </SectionLink>
      <SectionLink
        to="proof"
        className={className}
        onNavigate={onNavigate}
        current={activeSectionId === 'proof'}
      >
        {content('04', 'Proof')}
      </SectionLink>
      <DesignLink
        to="/contact"
        className={`${className} nav-contact`}
        onClick={onNavigate}
        aria-current={
          isContactPage || activeSectionId === 'contact'
            ? 'page'
            : undefined
        }
      >
        {content('05', 'Contact')}
      </DesignLink>
    </>
  )
}

export default function Layout() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const frameRef = useRef<HTMLDivElement>(null)
  const headerInnerRef = useRef<HTMLDivElement>(null)
  const primaryNavigationRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const {
    layout,
    mood,
    hero,
    radius,
    typeScale,
    navigationId,
    mobileNavigationId,
    mobileHeaderId,
    recipe,
  } =
    useTheme()
  const navigation = getNavigationConstruct(navigationId)
  const mobileMenuClosesAtTrigger = mobileMenuCloseAtTriggerIds.has(mobileNavigationId)
  const activeSectionId = useScrollSpy()

  useEffect(() => {
    if (mobileNavigationId !== 'tabs') return

    const navigationElement = primaryNavigationRef.current
    if (!navigationElement) return

    let frame = 0
    let active = true

    const centerActiveTab = () => {
      frame = 0
      if (!active || !window.matchMedia('(max-width: 1023px)').matches) return

      const activeTab =
        navigationElement.querySelector<HTMLElement>('[aria-current]')
      if (!activeTab) return

      const targetLeft =
        activeTab.offsetLeft -
        (navigationElement.clientWidth - activeTab.offsetWidth) / 2
      const maxLeft =
        navigationElement.scrollWidth - navigationElement.clientWidth
      const left = Math.max(0, Math.min(targetLeft, maxLeft))

      if (Math.abs(navigationElement.scrollLeft - left) < 1) return

      navigationElement.scrollTo({
        left,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
      })
    }

    const scheduleCenter = () => {
      if (!active) return
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(centerActiveTab)
    }

    scheduleCenter()
    window.addEventListener('resize', scheduleCenter, { passive: true })
    document.fonts.ready.then(scheduleCenter)

    return () => {
      active = false
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('resize', scheduleCenter)
    }
  }, [
    activeSectionId,
    location.pathname,
    mobileNavigationId,
    recipe.id,
  ])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useLayoutEffect(() => {
    const frame = frameRef.current
    const headerInner = headerInnerRef.current
    if (!frame || !headerInner) return
    let active = true

    const updateHeaderSize = () => {
      if (!active) return
      const header = headerInner.parentElement
      const headerStyle = header ? window.getComputedStyle(header) : null
      const safeArea =
        Number.parseFloat(headerStyle?.paddingTop ?? '0') +
        Number.parseFloat(headerStyle?.paddingBottom ?? '0')
      frame.style.setProperty(
        '--site-header-block-size',
        `${headerInner.getBoundingClientRect().height + safeArea}px`,
      )
    }
    updateHeaderSize()

    const observer = new ResizeObserver(updateHeaderSize)
    observer.observe(headerInner)
    window.addEventListener('resize', updateHeaderSize)
    document.fonts.ready.then(updateHeaderSize)

    return () => {
      active = false
      observer.disconnect()
      window.removeEventListener('resize', updateHeaderSize)
    }
  }, [recipe.id])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    if (!location.hash) return

    const targetId = decodeURIComponent(location.hash.slice(1))
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(targetId)
      if (!target) return
      const previous = document.documentElement.style.scrollBehavior
      document.documentElement.style.scrollBehavior = 'auto'
      target.scrollIntoView({ block: 'start' })
      document.documentElement.style.scrollBehavior = previous
    })
    return () => cancelAnimationFrame(frame)
  }, [location.hash, location.pathname])

  useEffect(() => {
    setMenuOpen(false)
  }, [recipe.id, mobileNavigationId])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
      if (event.key === 'Tab') {
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        )
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    requestAnimationFrame(() =>
      panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus(),
    )
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

  const navLinkClass = 'nav-link label'

  return (
    <div
      ref={frameRef}
      className="site-frame min-h-screen bg-ground"
      data-layout={layout}
      data-mood={mood}
      data-hero={hero}
      data-radius={radius}
      data-type={typeScale}
      data-navigation={navigation.id}
      data-navigation-family={navigation.family}
      data-navigation-menu={navigation.usesMenu ? 'true' : 'false'}
      data-mobile-navigation={mobileNavigationId}
      data-mobile-navigation-menu={mobileMenuIds.has(mobileNavigationId) ? 'true' : 'false'}
      data-mobile-header={mobileHeaderId}
      data-mobile-menu-close-at-trigger={mobileMenuClosesAtTrigger ? 'true' : 'false'}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Skip to content
      </a>

      <header
        className={`site-header fixed z-40 transition-[background-color,border-color] duration-300 ${
          scrolled ? 'site-header-scrolled' : ''
        }`}
      >
        <div
          ref={headerInnerRef}
          className="site-header-inner shell flex items-center justify-between py-5"
        >
          <Wordmark onClick={() => setMenuOpen(false)} />
          <nav
            ref={primaryNavigationRef}
            aria-label="Primary navigation"
            className="primary-navigation"
          >
            <NavigationLinks className={navLinkClass} activeSectionId={activeSectionId} />
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="menu-trigger label text-bone"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="navigation-panel"
          >
            <span className="menu-trigger-label">
              {menuOpen ? 'Close' : 'Menu'}
            </span>
            <span aria-hidden className="menu-mark">
              <i />
              <i />
            </span>
          </button>
        </div>

        {menuOpen && (
          <div
            ref={panelRef}
            id="navigation-panel"
            className="navigation-panel navigation-panel-open"
            aria-hidden="false"
            onClick={(event) => {
              if (event.target !== event.currentTarget) return
              setMenuOpen(false)
              menuButtonRef.current?.focus()
            }}
          >
            <nav
              aria-label="Menu navigation"
              className="navigation-panel-inner shell bg-ground pb-8 pt-5"
            >
              <div className="navigation-panel-links flex flex-col gap-1">
                <NavigationLinks
                  className="mobile-nav-link"
                  onNavigate={() => setMenuOpen(false)}
                  activeSectionId={activeSectionId}
                />
                <button
                  type="button"
                  className="menu-close button-outline label mt-5 min-h-11 px-5 py-3"
                  onClick={() => {
                    setMenuOpen(false)
                    menuButtonRef.current?.focus()
                  }}
                >
                  Close menu
                </button>
              </div>
            </nav>
          </div>
        )}
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
                  <DesignLink to="/manifesto" className="footer-link">
                    The manifesto
                  </DesignLink>
                </li>
                <li>
                  <SectionLink to="engage" className="footer-link">
                    Ways to engage
                  </SectionLink>
                </li>
                <li>
                  <DesignLink to="/contact" className="footer-link">
                    Describe the problem
                  </DesignLink>
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
