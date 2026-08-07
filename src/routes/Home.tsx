import {
  ArrowRight,
  ArrowUp,
  Award,
  Building2,
  CalendarDays,
  FileText,
  Timer,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Link } from 'react-router'
import HeroVisual from '../components/HeroVisual'
import PageMeta from '../components/PageMeta'
import Practice from '../components/Practice'
import RegenerateButton from '../components/RegenerateButton'
import Reveal from '../components/Reveal'
import SectionLink from '../components/SectionLink'
import {
  organizationJsonLd,
  personJsonLd,
  websiteJsonLd,
} from '../content/jsonLd'
import { pageSeo } from '../content/seo'
import {
  awards,
  broadcast,
  career,
  clients,
  engagements,
  outcomes,
  sectors,
  speaking,
  studio,
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
    <div className="grid-12">
      <p className="label text-accent md:col-span-2">{index}</p>
      <h2 className="display-xl balance text-[length:clamp(2.5rem,7vw,5rem)] md:col-span-10 lg:col-span-6">
        {title}
      </h2>
      {lede && (
        <p className="measure text-[1.0625rem] leading-[1.75] text-muted md:col-span-8 md:col-start-3 lg:col-span-4 lg:col-start-9 lg:self-end">
          {lede}
        </p>
      )}
    </div>
  )
}

const engagementIcons = [
  <Timer key="timer" size={28} strokeWidth={1.25} aria-hidden />,
  <CalendarDays key="cal" size={28} strokeWidth={1.25} aria-hidden />,
  <Users key="users" size={28} strokeWidth={1.25} aria-hidden />,
]

const statItems = [
  { value: studio.yearsActive, label: 'Years shipping design', icon: <TrendingUp size={15} strokeWidth={1.5} aria-hidden /> },
  { value: '02', label: 'Patents filed', icon: <FileText size={15} strokeWidth={1.5} aria-hidden /> },
  { value: `${clients.length}+`, label: 'Clients over the career', icon: <Building2 size={15} strokeWidth={1.5} aria-hidden /> },
  { value: String(awards.length).padStart(2, '0'), label: 'Awards and recognitions', icon: <Award size={15} strokeWidth={1.5} aria-hidden /> },
]

export default function Home() {
  return (
    <>
      <PageMeta
        title={pageSeo.home.title}
        description={pageSeo.home.description}
        path={pageSeo.home.path}
        jsonLd={[organizationJsonLd(), personJsonLd(), websiteJsonLd()]}
      />
      <section className="shell min-h-[92vh] pb-20 pt-36 lg:min-h-screen lg:pt-40">
        <div className="flex min-h-[inherit] flex-col justify-between gap-16 lg:grid lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
          <div className="flex flex-col justify-center lg:col-span-7 lg:py-12">
            <div className="flex items-center gap-3">
              <span aria-hidden className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <p className="label text-muted">{studio.base} / available for engagements</p>
            </div>

            <h1 className="display-xl mt-10 text-[length:clamp(3rem,10vw,9rem)] lg:text-[length:clamp(3rem,7.5vw,8rem)]">
              Everything feels <span className="italic text-accent">the same.</span>
              <br />
              Your product doesn't have to.
            </h1>

            <div className="mt-12 lg:mt-16">
              <p className="measure text-xl leading-relaxed text-muted lg:max-w-[52ch]">
                {studio.name} is the practice of{' '}
                <span className="text-bone">{studio.principal}</span>. Design is no longer
                just visual. Executive leadership, experience strategy, and product design
                combined in one senior mind you can actually hire.
              </p>
            </div>

            <RegenerateButton />
          </div>

          <div className="relative hidden items-center justify-center lg:col-span-5 lg:flex lg:self-stretch">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-ground/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-ground via-transparent to-transparent" />
            <HeroVisual />
          </div>

          <div className="lg:col-span-12 lg:self-end">
            <dl className="grid grid-cols-2 gap-px border border-line-soft bg-line-soft lg:grid-cols-4">
              {statItems.map((stat) => (
                <div
                  key={stat.label}
                  className="stat-cell flex flex-col justify-between gap-6 bg-ground px-5 py-7 sm:px-6 sm:py-8"
                >
                  <div className="flex items-center gap-2 text-accent">{stat.icon}</div>
                  <div>
                    <dt className="display-xl text-4xl lg:text-5xl">{stat.value}</dt>
                    <dd className="label mt-2 text-faint">{stat.label}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="rule-top bg-ground-lift">
        <div className="shell py-24 lg:py-36">
          <Reveal>
            <p className="label text-accent">The manifesto</p>
            <blockquote className="balance mt-10 max-w-[22ch] font-display text-[length:clamp(1.85rem,4.6vw,3.4rem)] italic leading-[1.14] tracking-tight sm:max-w-[26ch] lg:max-w-[30ch]">
              "Design is no longer just visual. It is the thing people feel before they
              read a word, and remember long after they've forgotten the interface."
            </blockquote>

            <div className="grid-12 mt-14 lg:mt-20">
              <div className="space-y-6 md:col-span-6 lg:col-span-5">
                <p className="measure text-[1.0625rem] leading-[1.75] text-muted">
                  Every product in your category runs on the same stack, ships on the
                  same schedule, and lands with the same rounded card on the same gray.
                  The problem is no longer how things look. It is how they feel, and
                  whether they feel like anything at all.
                </p>
                <p className="measure text-[1.0625rem] leading-[1.75] text-muted">
                  Differentiation used to be a visual problem. Now it is a strategic
                  one. We work at the level where that gets decided: intent, voice,
                  motion, friction, trust. Seven positions on what that means in the
                  fourth culture.
                </p>
              </div>

              <div className="md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9 lg:self-end">
                <Link
                  to="/manifesto"
                  className="group flex items-baseline justify-between gap-6 border-b border-line pb-3 transition-colors duration-300 hover:border-accent"
                >
                  <span className="balance font-display text-2xl italic lg:text-[1.75rem]">
                    Read all seven tenets
                  </span>
                  <span
                    aria-hidden
                    className="shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="practice" className="rule-top scroll-mt-24">
        <div className="shell py-24 lg:py-36">
          <Reveal>
            <SectionHead
              index="01 / Practice"
              title="One practice, not three."
              lede="Most companies separate strategy from design from leadership, then pay a fourth person to translate between them. By the time the work ships, nobody owns how it feels. That is the problem this practice is built to solve."
            />
            <Practice />
          </Reveal>
        </div>
      </section>

      <section id="proof" className="rule-top scroll-mt-24">
        <div className="shell py-24 lg:py-36">
          <Reveal>
            <SectionHead
              index="02 / Proof"
              title="A record you can look up."
              lede="Regulated industries, public launches, measured outcomes. Every claim below has a citation attached to it."
            />
          </Reveal>

          <div className="mt-16 lg:mt-24">
            {outcomes.map((outcome, index) => (
              <Reveal key={outcome.client} delay={index * 60}>
                <article className="proof-row grid-12 group border-t border-line py-10 lg:py-14">
                  <div className="md:col-span-3">
                    <h3 className="wrap-name font-display text-3xl leading-[1.05] lg:text-[2.5rem]">
                      {outcome.client}
                    </h3>
                    <p className="label mt-3 inline-block border border-line-soft px-2 py-0.5 text-faint">
                      {outcome.sector}
                    </p>
                  </div>

                  <div className="md:col-span-9 md:col-start-4 lg:col-span-5">
                    <p className="balance font-display text-xl italic leading-snug text-bone lg:text-2xl">
                      {outcome.headline}
                    </p>
                    <p className="measure mt-4 text-[0.975rem] leading-relaxed text-muted">
                      {outcome.detail}
                    </p>
                  </div>

                  <ul className="grid gap-3 sm:grid-cols-2 md:col-span-9 md:col-start-4 lg:col-span-4 lg:col-start-9 lg:grid-cols-1">
                    {outcome.citations.map((citation) => (
                      <li key={citation.label} className="border-l border-line-soft pl-4">
                        <p className="text-sm leading-snug text-balance text-bone">
                          {citation.label}
                        </p>
                        <p className="label mt-1.5 text-faint">{citation.source}</p>
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
        <div className="shell py-24 lg:py-32">
          <Reveal>
            <div className="grid-12">
              <div className="md:col-span-12 lg:col-span-7">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line-soft pb-4">
                  <p className="label text-faint">
                    Brands delivered for, in-house and through agency partners
                  </p>
                  <p className="label text-accent">{clients.length} named</p>
                </div>
                <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {clients.map((client) => (
                    <li
                      key={client}
                      className="wrap-name font-display text-[0.95rem] leading-snug text-muted transition-colors duration-300 hover:text-bone lg:text-base"
                    >
                      {client}
                    </li>
                  ))}
                  <li className="font-display text-[0.95rem] italic leading-snug text-faint lg:text-base">
                    and many more
                  </li>
                </ul>
              </div>

              <div className="md:col-span-12 lg:col-span-4 lg:col-start-9">
                <p className="label border-b border-line-soft pb-4 text-faint">
                  Sectors worked in
                </p>
                <ul className="mt-8 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                  {sectors.map((sector) => (
                    <li key={sector} className="text-sm leading-relaxed text-muted">
                      {sector}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="engage" className="rule-top scroll-mt-24">
        <div className="shell py-24 lg:py-36">
          <Reveal>
            <SectionHead
              index="03 / Engage"
              title="Three ways in."
              lede="Day and week rates for direct work, or an assembled team for something larger. Rates on request. Tell us the problem first."
            />
          </Reveal>

          <div className="mt-16 grid gap-px border border-line-soft bg-line-soft sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
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
                <div className="engagement-card flex h-full flex-col bg-ground p-7 sm:p-8 lg:p-10">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-accent">{engagementIcons[index]}</span>
                    <span className="label text-faint">{engagement.duration}</span>
                  </div>

                  <div className="mt-6">
                    <span className="label text-accent">{engagement.index}</span>
                  </div>

                  <h3 className="display-xl mt-4 text-4xl lg:text-5xl">
                    {engagement.name}
                  </h3>
                  <p className="measure mt-5 text-[0.975rem] leading-relaxed text-muted">
                    {engagement.lede}
                  </p>

                  <ul className="mt-8 grid gap-3 border-t border-line-soft pt-7 sm:grid-cols-2 lg:grid-cols-1">
                    {engagement.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="rule-top">
        <div className="shell py-24 lg:py-36">
          <Reveal>
            <SectionHead index="04 / Who" title="Who you are hiring." />
          </Reveal>

          <Reveal>
            <div className="relative mt-14 h-[220px] overflow-hidden bg-ground-lift lg:mt-20 lg:h-[300px]">
              <img
                src="/who-texture.jpg"
                alt="Dark concrete wall texture, abstract surface detail"
                className="h-full w-full object-cover opacity-40 mix-blend-luminosity"
                width={1400}
                height={440}
                decoding="async"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ground via-transparent to-ground" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ground" />
            </div>
          </Reveal>

          <Reveal>
            <div className="grid-12 mt-16 lg:mt-24">
              <div className="space-y-6 md:col-span-12 lg:col-span-5">
                <p className="balance font-display text-2xl italic leading-snug text-bone lg:text-[1.875rem]">
                  I am {studio.principal}, and I have spent over {studio.yearsActive} years leading
                  experience design and product strategy across complex, regulated,
                  heavily scrutinised products — from founding Boardwise in Dubai in 1999
                  through to executive design leadership today.
                </p>
                <p className="measure text-[1.0625rem] leading-[1.75] text-muted">
                  Most recently Manager, Experience Design at TD, closing eight years
                  inside the Human-Centered Design Practice of TD Invent. I filed two
                  related patents there, and the brokerage was named best in Canada by
                  The Globe and Mail three years running. Before that, Director of
                  Product Design and of User Experience at Klick.
                </p>
                <p className="measure text-[1.0625rem] leading-[1.75] text-muted">
                  A third-culture kid raised between Canada, the UAE and Egypt, which is
                  where the habit of adapting quickly and solving from more than one
                  angle comes from. Founder three times over, the first as a teenager in
                  Dubai. I still write front-end code, which is why the strategy stays
                  honest about what can actually be built.
                </p>
                <p className="measure text-[1.0625rem] leading-[1.75] text-muted">
                  Based in {studio.base}.
                </p>
              </div>

              <div className="grid gap-14 md:col-span-12 md:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:grid-cols-1">
                <div>
                  <p className="label border-b border-line-soft pb-4 text-faint">Career</p>
                  <ul>
                    {career.map((entry) => (
                      <li key={entry.company} className="border-b border-line-soft py-5">
                        <div className="flex items-baseline justify-between gap-4">
                          <p className="wrap-name font-display text-xl text-bone">
                            {entry.company}
                          </p>
                          {entry.founded && (
                            <span className="label shrink-0 text-accent">Founded</span>
                          )}
                        </div>

                        <ul className="mt-2">
                          {entry.roles.map((role) => (
                            <li
                              key={role.title}
                              className="flex flex-wrap items-baseline justify-between gap-x-4"
                            >
                              <span className="text-sm text-muted">{role.title}</span>
                              <span className="label shrink-0 text-faint">
                                {role.period}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <p className="measure mt-2 text-sm leading-relaxed text-faint">
                          {entry.note}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="label border-b border-line-soft pb-4 text-faint">
                    Awards and recognition
                  </p>
                  <ul>
                    {awards.map((award) => (
                      <li
                        key={`${award.title}${award.year}`}
                        className="flex items-baseline justify-between gap-4 border-b border-line-soft py-4"
                      >
                        <div>
                          <p className="text-sm text-balance text-bone">{award.title}</p>
                          <p className="label mt-1.5 text-faint">
                            {award.source} / {award.detail}
                          </p>
                        </div>
                        <span className="label shrink-0 text-faint">{award.year}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-10 sm:grid-cols-2 md:col-span-2 lg:col-span-1">
                  <div>
                    <p className="label border-b border-line-soft pb-4 text-faint">
                      Selected speaking
                    </p>
                    <ul className="mt-5 space-y-3">
                      {speaking.map((item) => (
                        <li key={item.venue} className="text-sm leading-snug text-muted">
                          {item.venue}
                          <span className="text-faint"> / {item.year}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="label border-b border-line-soft pb-4 text-faint">
                      Interviewed by
                    </p>
                    <ul className="mt-5 space-y-3">
                      {broadcast.map((item) => (
                        <li key={item.outlet} className="text-sm leading-snug text-muted">
                          {item.outlet}
                          <span className="text-faint"> / {item.year}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="rule-top scroll-mt-24 bg-ground-lift">
        <div className="shell py-28 lg:py-40">
          <Reveal>
            <p className="label text-accent">05 / Start</p>
            <h2 className="display-xl mt-8 text-[length:clamp(2.75rem,9vw,8rem)]">
              Tell us what
              <br />
              <span className="italic">refuses to work.</span>
            </h2>

            <div className="grid-12 mt-16">
              <p className="measure text-xl leading-relaxed text-muted md:col-span-8 lg:col-span-6">
                A day, a week, or a team. Bring the problem in whatever shape it is
                currently in. The first conversation is about whether this is the right
                practice for it, not a pitch.
              </p>

              <div className="flex flex-col gap-4 md:col-span-8 lg:col-span-4 lg:col-start-9">
                <a
                  href={studio.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 border border-line px-6 py-5 transition-colors duration-300 hover:border-accent hover:bg-accent"
                >
                  <span className="label text-bone group-hover:text-white">
                    Message on LinkedIn
                  </span>
                  <ArrowRight
                    size={14}
                    strokeWidth={1.5}
                    aria-hidden
                    className="text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
                  />
                </a>
                <a
                  href={`${studio.portfolio}/contact/`}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 border border-line px-6 py-5 transition-colors duration-300 hover:border-bone"
                >
                  <span className="label text-bone">Send a project enquiry</span>
                  <ArrowRight
                    size={14}
                    strokeWidth={1.5}
                    aria-hidden
                    className="text-accent transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
                <SectionLink
                  to="engage"
                  className="group flex items-center justify-between gap-4 border border-line px-6 py-5 transition-colors duration-300 hover:border-bone"
                >
                  <span className="label text-bone">Review ways to engage</span>
                  <ArrowUp
                    size={14}
                    strokeWidth={1.5}
                    aria-hidden
                    className="text-accent transition-transform duration-300 group-hover:-translate-y-1"
                  />
                </SectionLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
