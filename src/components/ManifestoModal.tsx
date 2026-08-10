import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useTheme } from '../context/ThemeContext'
import { studio } from '../content/site'
import Manifesto from '../routes/Manifesto'
import { designAwarePath } from '../utils/designPath'

/**
 * Presents the manifesto article as a modal overlay above Home while keeping
 * the deep-linkable /manifesto URL and its SEO metadata intact.
 */
export default function ManifestoModal() {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<() => void>(() => {})
  const navigate = useNavigate()
  const location = useLocation()
  const { recipe } = useTheme()

  const close = () => {
    const historyIndex =
      (window.history.state as { idx?: number } | null)?.idx ?? 0
    if (historyIndex > 0) {
      navigate(-1)
    } else {
      navigate(designAwarePath('/', location.search, recipe.id), {
        replace: true,
      })
    }
  }
  closeRef.current = close

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeRef.current()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), select, textarea, input:not([hidden]), [tabindex]:not([tabindex="-1"])',
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
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [])

  return (
    <div
      className="manifesto-modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) close()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`The ${studio.name} manifesto`}
        className="manifesto-modal"
      >
        <div className="manifesto-modal-bar">
          <p className="label text-faint">1.0 / Manifesto</p>
          <button
            ref={closeButtonRef}
            type="button"
            className="manifesto-modal-close label"
            onClick={close}
          >
            Close
            <X size={14} strokeWidth={1.5} aria-hidden />
          </button>
        </div>
        <div className="manifesto-modal-body">
          <Manifesto />
        </div>
      </div>
    </div>
  )
}
