import { Link } from 'react-router'
import PageMeta from '../components/PageMeta'
import { pageSeo } from '../content/seo'

export default function NotFound() {
  return (
    <section className="shell flex min-h-screen flex-col justify-center">
      <PageMeta
        title={pageSeo.notFound.title}
        description={pageSeo.notFound.description}
        path={pageSeo.notFound.path}
        noIndex
      />
      <p className="label text-accent">Error 404</p>
      <h1 className="display-xl mt-6 text-[length:clamp(3rem,12vw,9rem)]">
        Nothing here.
      </h1>
      <p className="measure-tight mt-6 text-lg leading-relaxed text-muted">
        The page you were looking for does not exist, which is at least a form of
        differentiation.
      </p>
      <Link
        to="/"
        className="label mt-10 w-fit border border-line px-6 py-3 text-bone transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-on-accent"
      >
        Back to the start
      </Link>
    </section>
  )
}
