import {
  ArrowRight,
  Award,
  Building2,
  CalendarDays,
  FileText,
  Timer,
  TrendingUp,
  Users,
} from 'lucide-react'
import ContactForm from '../components/ContactForm'
import DesignLink from '../components/DesignLink'
import HeroVisual from '../components/HeroVisual'
import SectionLink from '../components/SectionLink'
import PageMeta from '../components/PageMeta'
import Practice from '../components/Practice'
import RegenerateButton from '../components/RegenerateButton'
import Reveal from '../components/Reveal'
import { ScrollMotion, ScrollMotionProvider } from '../components/ScrollMotion'
import { useTheme } from '../context/ThemeContext'
import {
  organizationJsonLd,
  personJsonLd,
  websiteJsonLd,
} from '../content/jsonLd'
import { pageSeo } from '../content/seo'
import { scrollMotionPresets } from '../content/motion'
import {
  awards,
  brandStory,
  broadcast,
  career,
  clients,
  contactCopy,
  engagements,
  heroRegenerateNote,
  heroStatLabel,
  outcomes,
  proofSection,
  sectionHeads,
  sectors,
  speaking,
  startSection,
  studio,
  supplementalAwards,
  supplementalAwardsHeading,
  whoBio,
  whySection,
} from '../content/site'

function SectionHead({
  index,
  title,
  lede,
}: {
  index: string
  title: string
  lede?: string
}) {
  return (
    <div className="section-head grid-12">
      <p className="section-head-index label text-accent md:col-span-2">{index}</p>
      <div className="section-head-main md:col-span-10 md:col-start-3 lg:col-span-8">
        <h2 className="section-head-title display-xl balance">{title}</h2>
        {lede && (
          <p className="section-head-lede measure text-[1.0625rem] leading-[1.75] text-muted">
            {lede}
          </p>
        )}
      </div>
    </div>
  )
}

const engagementIcons = [
  <Timer key="timer" size={28} strokeWidth={1.25} aria-hidden />,
  <CalendarDays key="cal" size={28} strokeWidth={1.25} aria-hidden />,
  <Users key="users" size={28} strokeWidth={1.25} aria-hidden />,
]

const statItems = [
  { value: studio.yearsActive, label: 'Years shipping', icon: <TrendingUp size={26} strokeWidth={1.4} aria-hidden /> },
  { value: '02', label: 'Patents filed', icon: <FileText size={26} strokeWidth={1.4} aria-hidden /> },
  { value: `${clients.length}+`, label: 'Career clients', icon: <Building2 size={26} strokeWidth={1.4} aria-hidden /> },
  { value: String(awards.length).padStart(2, '0'), label: heroStatLabel, icon: <Award size={26} strokeWidth={1.4} aria-hidden /> },
]

export default function Home() {
  const { hero } = useTheme()
  const isStackedHero = hero === 'stacked-center' || hero === 'stacked-flush'

  return (
    <>
      <PageMeta
        title={pageSeo.home.title}
        description={pageSeo.home.description}
        path={pageSeo.home.path}
        jsonLd={[organizationJsonLd(), personJsonLd(), websiteJsonLd()]}
      />
      <section className="hero-section shell pb-8 pt-0 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-between lg:pb-8 lg:pt-0">
        <div
          className={
            isStackedHero
              ? 'hero-grid flex flex-col gap-6 lg:flex lg:flex-col lg:items-center lg:gap-8'
              : 'hero-grid flex flex-col gap-6 lg:grid lg:min-h-0 lg:flex-1 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-6'
          }
        >
          <div
            className={
              isStackedHero
                ? `hero-copy flex flex-col justify-center lg:w-full lg:py-2${
                    hero === 'stacked-center' ? ' items-center text-center' : ''
                  }`
                : 'hero-copy flex flex-col justify-center lg:col-span-8 lg:py-2'
            }
          >
            <div className="hero-status flex items-center gap-3">
              <span aria-hidden className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <p className="label text-muted">{studio.base} / available for engagements</p>
            </div>

            <h1 className="display-xl hero-title mt-3.5 lg:mt-4">
              <span className="hero-title-line">
                Everything feels <span className="italic text-accent">the same.</span>
              </span>
              <span className="hero-title-line">Your product doesn't have to.</span>
            </h1>

            <div className="hero-lede mt-3.5 lg:mt-4">
              <p className="measure text-[0.9375rem] leading-[1.55] text-muted lg:max-w-[46ch] lg:text-base">
                {studio.name} is the practice of{' '}
                <span className="text-bone">{studio.principal}</span>. {studio.positioning}
              </p>
            </div>

            <RegenerateButton />
            <p className="hero-regenerate-note mt-3 max-w-[46ch] text-[0.8125rem] leading-snug text-faint">
              {heroRegenerateNote}
            </p>
          </div>

          <div
            className={
              isStackedHero
                ? hero === 'stacked-flush'
                  ? 'hero-visual relative hidden shrink-0 items-center justify-center overflow-hidden lg:order-first lg:flex lg:max-h-[min(180px,22vh)] lg:w-full lg:py-2'
                  : 'hero-visual relative hidden shrink-0 items-center justify-center self-center overflow-hidden lg:flex lg:max-h-[min(200px,24vh)] lg:max-w-[min(48rem,100%)] lg:w-full lg:py-2'
                : 'hero-visual relative hidden items-center justify-center overflow-hidden lg:col-span-4 lg:flex lg:self-stretch lg:py-2'
            }
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent to-ground/60" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ground via-transparent to-transparent" />
            <HeroVisual orientation={isStackedHero ? 'horizontal' : 'vertical'} />
          </div>
        </div>

        <div className="hero-stats">
            <div className="hero-stats-grid grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {statItems.map((stat) => (
                <div
                  key={stat.label}
                  className="stat-cell card-surface grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 px-4 py-5 sm:gap-4 sm:px-5 lg:px-6 lg:py-6"
                >
                  <div className="stat-icon flex shrink-0 items-center justify-center text-accent">
                    {stat.icon}
                  </div>
                  <div className="stat-copy min-w-0">
                    <p className="display-xl text-2xl lg:text-3xl">{stat.value}</p>
                    <p className="label mt-1.5 break-words tracking-[0.14em] text-faint sm:tracking-[0.2em]">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </section>

      <ScrollMotionProvider>
      <section id="why" className="section-anchor rule-top scroll-mt-24">
        <div className="section-shell shell py-24 lg:py-36">
          <Reveal>
            <SectionHead
              index="1.0 / Manifesto"
              title={whySection.title}
              lede={whySection.lede}
            />
          </Reveal>

          <Reveal>
            <div className="grid-12 mt-12 lg:mt-16">
              <ScrollMotion drift={scrollMotionPresets.whyQuote} className="md:col-span-10 md:col-start-3">
                <blockquote
                  className="why-quote why-quote-strip balance font-display text-[length:clamp(1.85rem,4.6vw,3.4rem)] italic leading-[1.14] tracking-tight max-w-[30ch]"
                >
                  "{whySection.quote}"
                </blockquote>
              </ScrollMotion>
            </div>

            <div className="grid-12 mt-12 lg:mt-16">
              <div className="md:col-span-10 md:col-start-3">
                <DesignLink
                  to="/manifesto"
                  className="group flex items-baseline justify-between gap-6 border-b border-line pb-3 transition-colors duration-300 hover:border-accent"
                >
                  <span className="balance font-display text-2xl italic lg:text-[1.75rem]">
                    {whySection.manifestoLinkLabel}
                  </span>
                  <span
                    aria-hidden
                    className="shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </span>
                </DesignLink>
              </div>
            </div>

            <div
              className="brand-story-flow section-content mt-12 lg:mt-16"
              aria-label="The four parts of 4th Culture"
            >
              {brandStory.inputs.map((input, cardIndex) => (
                <ScrollMotion
                  key={input.index}
                  drift={scrollMotionPresets.brandStoryCard[cardIndex] ?? 0.08}
                >
                  <article className="brand-story-card card-surface">
                    <p className="label text-accent">{input.index}</p>
                    <h3 className="font-display text-2xl">{input.name}</h3>
                    <p className="text-sm leading-relaxed text-bone">{input.detail}</p>
                  </article>
                </ScrollMotion>
              ))}
              <span aria-hidden className="brand-story-arrow">
                →
              </span>
              <ScrollMotion drift={scrollMotionPresets.brandStoryCard[3]}>
                <article className="brand-story-card brand-story-result">
                  <p className="label text-accent">{brandStory.result.index}</p>
                  <h3 className="font-display text-2xl">{brandStory.result.name}</h3>
                  <p className="text-sm leading-relaxed text-bone">{brandStory.result.detail}</p>
                </article>
              </ScrollMotion>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="practice" className="section-anchor rule-top scroll-mt-24">
        <div className="section-shell shell py-24 lg:py-36">
          <Reveal>
            <SectionHead
              index="2.0 / Practice"
              title={sectionHeads.practice.title}
              lede={sectionHeads.practice.lede}
            />
            <Practice />
          </Reveal>
        </div>
      </section>

      <section id="engage" className="section-anchor rule-top scroll-mt-24">
        <div className="section-shell shell py-24 lg:py-36">
          <Reveal>
            <SectionHead
              index="3.0 / Engage"
              title={sectionHeads.engage.title}
              lede={sectionHeads.engage.lede}
            />
          </Reveal>

          <div className="section-content mt-16 grid gap-4 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
            {engagements.map((engagement, index) => (
              <Reveal
                key={engagement.name}
                delay={index * 80}
                className={
                  index === engagements.length - 1 && engagements.length % 2 === 1
                    ? 'h-full sm:col-span-2 lg:col-span-1'
                    : 'h-full'
                }
              >
                <div
                  className={`engagement-card card-surface flex h-full flex-col p-7 sm:p-8 lg:p-10${
                    engagement.key === 'project' ? ' engagement-card-featured' : ''
                  }`}
                >
                  <div className="engagement-head flex items-center justify-between gap-4">
                    <span className="engagement-icon flex shrink-0 items-center justify-center text-accent">
                      {engagementIcons[index]}
                    </span>
                    <span className="engagement-meta label text-right text-faint">
                      <span className="text-accent">{engagement.index}</span>
                      <span aria-hidden> / </span>
                      {engagement.duration}
                    </span>
                  </div>

                  <h3 className="engagement-name display-xl mt-8 text-4xl lg:text-5xl">
                    {engagement.name}
                  </h3>

                  <p className="engagement-outcome balance mt-5 font-display text-lg italic leading-snug text-bone lg:text-xl">
                    {engagement.outcome}
                  </p>

                  <div className="engagement-rate mt-7 border-y border-line-soft py-6">
                    <p className="engagement-price font-display text-[length:clamp(1.7rem,3vw,2.35rem)] leading-none text-bone">
                      {engagement.price}
                    </p>
                    <p className="label mt-2 text-faint">{engagement.priceDetail}</p>
                  </div>

                  <p className="measure mt-7 text-[0.975rem] leading-relaxed text-muted">
                    {engagement.lede}
                  </p>

                  <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    {engagement.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span aria-hidden className="list-marker h-px w-3 shrink-0 bg-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-9">
                    <SectionLink
                      to="contact"
                      params={{ engagement: engagement.key }}
                      className="engagement-action group flex min-h-12 items-center justify-between gap-4 border border-line px-5 py-3.5 text-bone"
                      data-cta={`engage-${engagement.key}`}
                    >
                      <span className="label">{engagement.action}</span>
                      <ArrowRight
                        size={15}
                        strokeWidth={1.5}
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </SectionLink>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="proof" className="section-anchor rule-top scroll-mt-24">
        <div className="section-shell shell py-24 lg:py-36">
          <Reveal>
            <SectionHead
              index="4.0 / Proof"
              title={proofSection.title}
              lede={proofSection.lede}
            />
          </Reveal>

          <div className="section-content mt-16 lg:mt-20">
            {outcomes.map((outcome, index) => (
              <Reveal key={outcome.client} delay={index * 60}>
                <article className="proof-row grid-12 border-t border-line py-10 lg:py-14">
                  <div className="md:col-span-3">
                    <h3 className="wrap-name font-display text-3xl leading-[1.05] lg:text-[2.5rem]">
                      {outcome.client}
                    </h3>
                    <p className="label mt-3 inline-block border border-line-soft px-2 py-0.5 text-faint">
                      {outcome.sector}
                    </p>
                  </div>

                  <ScrollMotion drift={scrollMotionPresets.proofHeadline} className="md:col-span-9 md:col-start-4 lg:col-span-5">
                    <p className="balance font-display text-xl italic leading-snug text-bone lg:text-2xl">
                      {outcome.headline}
                    </p>
                    <p className="measure mt-4 text-[0.975rem] leading-relaxed text-muted">
                      {outcome.detail}
                    </p>
                  </ScrollMotion>

                  <ul className="grid gap-3 sm:grid-cols-2 md:col-span-9 md:col-start-4 lg:col-span-4 lg:col-start-9 lg:grid-cols-1">
                    {outcome.citations.map((citation) => (
                      <li key={citation.label} className="border-l border-line-soft pl-4">
                        {citation.href ? (
                          <a
                            href={citation.href}
                            target="_blank"
                            rel="noreferrer"
                            className="block transition-colors duration-300 hover:[&_p]:text-accent"
                          >
                            <p className="text-sm leading-snug text-balance text-bone transition-colors duration-300">
                              {citation.label}
                            </p>
                            <p className="label mt-1.5 text-faint transition-colors duration-300">
                              {citation.source}
                            </p>
                          </a>
                        ) : (
                          <>
                            <p className="text-sm leading-snug text-balance text-bone">
                              {citation.label}
                            </p>
                            <p className="label mt-1.5 text-faint">{citation.source}</p>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="rule-top bg-ground-lift">
        <div className="section-shell shell py-24 lg:py-32">
          <Reveal>
            <div className="brands-sector-band grid gap-14 lg:gap-20">
              <div>
                <p className="label border-b border-line-soft pb-4 text-faint">
                  Sectors worked in
                </p>
                <ul className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,10rem),1fr))] gap-2">
                  {sectors.map((sector) => (
                    <li
                      key={sector}
                      className="card-surface flex min-h-11 items-center px-4 py-2 text-sm leading-relaxed text-muted"
                    >
                      {sector}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line-soft pb-4">
                  <p className="label text-faint">
                    Brands delivered for, in-house and through agency partners
                  </p>
                  <p className="label text-accent">{clients.length} named</p>
                </div>
                <ul className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,11rem),1fr))] gap-x-8 gap-y-3">
                  {clients.map((client) => (
                    <li
                      key={client}
                      className="wrap-name font-sans text-[0.95rem] leading-relaxed text-muted transition-colors duration-300 hover:text-bone lg:text-base"
                    >
                      {client}
                    </li>
                  ))}
                  <li className="font-sans text-[0.95rem] italic leading-relaxed text-faint lg:text-base">
                    and many more
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="who" className="section-anchor rule-top scroll-mt-24">
        <div className="section-shell shell py-24 lg:py-36">
          <Reveal>
            <SectionHead
              index="5.0 / Who"
              title={sectionHeads.who.title}
              lede={sectionHeads.who.lede}
            />
          </Reveal>

          <Reveal>
            <ScrollMotion drift={scrollMotionPresets.whoTexture}>
              <div className="relative mt-14 aspect-[16/9] max-h-[22rem] overflow-hidden bg-ground-lift sm:aspect-[16/6] sm:min-h-[12rem] lg:mt-20 lg:aspect-[16/5]">
                <img
                  src="/who-texture.jpg"
                  alt="Dark concrete wall texture, abstract surface detail"
                  className="h-full w-full object-cover opacity-40 mix-blend-luminosity"
                  width={1400}
                  height={440}
                  decoding="async"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ground via-transparent to-ground" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-ground" />
              </div>
            </ScrollMotion>
          </Reveal>

          <Reveal>
            <div className="section-content who-content mt-16 lg:mt-24">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-16">
                <p className="balance font-display text-2xl italic leading-snug text-bone lg:text-[1.875rem]">
                  {whoBio.leadItalic}
                </p>
                <div className="space-y-6">
                  {whoBio.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="measure text-[1.0625rem] leading-[1.75] text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <section className="mt-16 lg:mt-24" aria-labelledby="career-heading">
                <h3 id="career-heading" className="label border-b border-line-soft pb-4 text-faint">
                  Career
                </h3>
                <ol className="mt-4 grid gap-4 lg:grid-cols-2">
                  {career.map((entry) => (
                    <li key={entry.company} className="card-surface min-w-0 p-5 sm:p-6">
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <p className="wrap-name min-w-0 font-display text-xl text-bone">
                          {entry.company}
                        </p>
                        {entry.founded && (
                          <span className="label shrink-0 text-accent">Founded</span>
                        )}
                      </div>

                      <ul className="mt-3 space-y-1">
                        {entry.roles.map((role) => (
                          <li key={role.title} className="grid gap-1 sm:grid-cols-[1fr_auto] sm:gap-4">
                            <span className="min-w-0 text-sm text-muted">{role.title}</span>
                            <span className="label text-faint sm:text-right">{role.period}</span>
                          </li>
                        ))}
                      </ul>

                      <p className="measure mt-3 text-sm leading-relaxed text-faint">
                        {entry.note}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>

              <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-2">
                <section>
                  <h3 className="label border-b border-line-soft pb-4 text-faint">
                    {supplementalAwardsHeading}
                  </h3>
                  <p className="mt-4 text-sm text-muted">
                    Documented client outcomes and press citations are in{' '}
                    <a
                      href="#proof"
                      className="text-accent underline underline-offset-4 decoration-accent/70 transition-colors duration-300 hover:decoration-accent"
                    >
                      Proof
                    </a>
                    .
                  </p>
                  <ul className="mt-4">
                    {supplementalAwards.map((award) => (
                      <li
                        key={`${award.title}${award.year}`}
                        className="grid gap-2 border-b border-line-soft py-4 sm:grid-cols-[1fr_auto] sm:gap-4"
                      >
                        <div className="min-w-0">
                          <p className="text-sm text-balance text-bone">{award.title}</p>
                          {award.href ? (
                            <a
                              href={award.href}
                              target="_blank"
                              rel="noreferrer"
                              className="label mt-1.5 text-faint transition-colors duration-300 hover:text-accent"
                            >
                              {award.source} / {award.detail}
                            </a>
                          ) : (
                            <p className="label mt-1.5 text-faint">
                              {award.source} / {award.detail}
                            </p>
                          )}
                        </div>
                        <span className="label text-faint sm:text-right">{award.year}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section aria-labelledby="on-the-record-heading">
                  <h3
                    id="on-the-record-heading"
                    className="label border-b border-line-soft pb-4 text-faint"
                  >
                    On the record
                  </h3>
                  <ul className="mt-5 grid content-start gap-x-10 gap-y-3 sm:grid-cols-2">
                    {speaking.map((item) => (
                      <li key={item.venue} className="text-sm leading-snug text-muted">
                        {item.venue}
                        <span className="text-faint"> / speaking, {item.year}</span>
                      </li>
                    ))}
                    {broadcast.map((item) => (
                      <li key={item.outlet} className="text-sm leading-snug text-muted">
                        {item.outlet}
                        <span className="text-faint"> / interview, {item.year}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="section-anchor rule-top scroll-mt-24 bg-ground-lift">
        <div className="section-shell shell py-28 lg:py-40">
          <Reveal>
            <p className="label text-accent">6.0 / Start</p>
            <h2 className="display-xl mt-8 text-[length:clamp(2.75rem,9vw,8rem)]">
              Describe the
              <br />
              <span className="italic">problem.</span>
            </h2>

            <div className="section-content grid-12 mt-16">
              <aside className="md:col-span-4 lg:col-span-4">
                <p className="measure text-xl leading-relaxed text-muted">
                  {startSection.lede}
                </p>
                <div className="mt-10 border-t border-line-soft pt-6">
                  <p className="label text-faint">Useful context</p>
                  <ul className="mt-5 space-y-3 text-base leading-relaxed text-muted">
                    <li>Your role and organisation</li>
                    <li>The decision or problem at hand</li>
                    <li>Where the product is today: concept, launch, live or scaling</li>
                    <li>Any timing, team or regulatory constraints</li>
                    <li>What a strong result would make possible</li>
                  </ul>
                </div>
                <div className="mt-10 border-t border-line-soft pt-6">
                  <p className="label text-faint">What happens next</p>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                    {contactCopy.whatHappensNext.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </div>
              </aside>

              <div className="mt-12 md:col-span-8 md:mt-0 lg:col-span-7 lg:col-start-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      </ScrollMotionProvider>
    </>
  )
}
