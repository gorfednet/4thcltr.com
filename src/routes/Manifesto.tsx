import { ArrowRight } from 'lucide-react'
import DesignLink from '../components/DesignLink'
import PageMeta from '../components/PageMeta'
import Reveal from '../components/Reveal'
import { manifestoJsonLd, organizationJsonLd, personJsonLd } from '../content/jsonLd'
import { pageSeo } from '../content/seo'
import { brandStory, studio, tenets } from '../content/site'

export default function Manifesto() {
  return (
    <article>
      <PageMeta
        title={pageSeo.manifesto.title}
        description={pageSeo.manifesto.description}
        path={pageSeo.manifesto.path}
        type="article"
        jsonLd={[organizationJsonLd(), personJsonLd(), manifestoJsonLd()]}
      />
      <header className="page-intro shell">
        <p className="label text-accent">The {studio.name} manifesto</p>
        <h1 className="display-xl mt-8 text-[length:clamp(3rem,10vw,9rem)]">
          Keep the
          <br />
          <span className="italic text-accent">judgment</span> human.
        </h1>
        <p className="measure-tight mt-12 font-display text-2xl italic leading-snug text-muted lg:text-3xl">
          Seven positions on making specific, useful products, using AI with purpose and
          remaining accountable for every decision from first concept to delivery.
        </p>
      </header>

      <section className="rule-top">
        <div className="section-shell shell">
          <Reveal>
            <div className="grid-12">
              <p className="label text-accent md:col-span-2">{brandStory.eyebrow}</p>
              <h2 className="display-xl balance mt-4 text-[length:clamp(2.4rem,6vw,5rem)] md:col-span-9 md:col-start-3 md:mt-0">
                {brandStory.title}
              </h2>
            </div>
            <div className="section-content grid-12">
              <div className="space-y-7 md:col-span-8 md:col-start-3 lg:col-span-6">
                {brandStory.manifesto.map((paragraph) => (
                  <p key={paragraph} className="text-lg leading-[1.75] text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
              <aside className="card-surface mt-10 p-6 md:col-span-8 md:col-start-3 lg:col-span-3 lg:col-start-10 lg:mt-0">
                <p className="label text-accent">{brandStory.result.index}</p>
                <p className="mt-4 font-display text-2xl">{brandStory.result.name}</p>
                <p className="mt-3 text-sm leading-relaxed text-bone">
                  {brandStory.result.detail}
                </p>
              </aside>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="shell">
        {tenets.map((tenet, index) => (
          <Reveal key={tenet.number}>
            <section
              className={`relative grid-12 overflow-hidden border-t border-line py-14 lg:py-20 ${
                index === tenets.length - 1 ? 'border-b' : ''
              }`}
            >
              <span
                aria-hidden
                className="tenet-watermark pointer-events-none absolute -top-4 right-0 select-none font-display italic leading-none"
                style={{ fontSize: 'clamp(8rem, 18vw, 16rem)' }}
              >
                {tenet.number}
              </span>

              <div className="md:col-span-2 lg:col-span-1">
                <span className="font-display text-4xl italic text-accent lg:text-5xl">
                  {tenet.number}
                </span>
              </div>

              <h2 className="balance font-display text-[length:clamp(1.75rem,3.6vw,2.6rem)] leading-[1.08] tracking-tight md:col-span-10 lg:col-span-6">
                {tenet.title}
              </h2>

              <div className="space-y-6 md:col-span-10 md:col-start-3 lg:col-span-4 lg:col-start-9">
                {tenet.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="measure text-[1.0625rem] leading-[1.75] text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <section className="section-shell shell mt-24 lg:mt-32">
          <div className="border border-line bg-ground-lift px-6 py-16 text-center lg:px-20 lg:py-24">
            <p className="label text-faint">Signed</p>
            <p className="mt-6 font-display text-3xl italic lg:text-5xl">
              {studio.principal}
            </p>
            <p className="mt-3 text-sm text-muted">
              Principal, {studio.name} / {studio.base}
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <DesignLink
                to="/contact"
                className="label inline-flex items-center gap-2 border border-accent bg-accent px-7 py-3.5 text-on-accent transition-opacity duration-300 hover:opacity-85"
              >
                Describe your project
                <ArrowRight size={13} strokeWidth={1.5} aria-hidden />
              </DesignLink>
              <DesignLink
                to="/"
                className="label inline-flex items-center gap-2 border border-line px-7 py-3.5 text-bone transition-colors duration-300 hover:border-bone"
              >
                See the practice
                <ArrowRight size={13} strokeWidth={1.5} aria-hidden />
              </DesignLink>
            </div>
          </div>
        </section>
      </Reveal>
    </article>
  )
}
