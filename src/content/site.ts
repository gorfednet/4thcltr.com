/**
 * All editorial content for 4th Culture lives here so copy can be revised
 * without touching layout. Everything below is drawn from the real record.
 */

export const studio = {
  name: '4th Culture',
  principal: 'Michael Duncan McArthur',
  base: 'Toronto',
  positioning:
    'Independent product strategy, design leadership, front-end implementation and delivery for purpose-built utility platforms, from first idea to established product.',
  linkedin: 'https://www.linkedin.com/in/gorfed/',
  github: 'https://github.com/gorfednet',
  portfolio: 'https://gorfed.net',
  music: 'https://gorfmusic.com',
  yearsActive: '25+',
} as const

export const brandStory = {
  eyebrow: 'Why 4th Culture',
  title: 'A practice built between worlds.',
  summary:
    '4th Culture is an independent practice shaped by Michael’s third-culture experience, the internet and agentic intelligence. It exists to make technology more expressive, specific and recognisably human without surrendering judgment.',
  inputs: [
    {
      index: '01',
      name: 'Lived culture',
      detail:
        '4th Culture is shaped by Michael’s third-culture experience growing up abroad and by the necessity of seeing from more than one point of view.',
    },
    {
      index: '02',
      name: 'The network',
      detail: 'The networked culture where language, behaviour and belonging keep being remade.',
    },
    {
      index: '03',
      name: 'Agentic intelligence',
      detail:
        'Human-directed systems that expand what a small, senior practice can explore, build and deliver.',
    },
  ],
  result: {
    index: '04',
    name: 'The fourth space',
    detail:
      'A deliberate practice where cultural fluency, human character and computational capability meet in products that do not feel interchangeable.',
  },
  manifesto: [
    '4th Culture is shaped by Michael’s third-culture experience across Canada, the UAE and Egypt. Long before design became the work, translation became the habit: reading context, moving between systems and resisting the idea that one inherited baseline must be the only correct one.',
    'The practice was also formed by the internet, a cultural system where language, behaviour and belonging are constantly remade. It is now crossing another boundary as agents evaluate options, generate media, operate workflows and transact behind the interface.',
    'Fourth Culture is not used here as a fixed academic category. It names a deliberate shared space: neither one home culture nor a statistical machine average, but a place where cultural fluency, human character and computational capability can make something specific together.',
    'The promise is to use advanced tools without handing over judgment; make people, context and consequences visible; and build products expressive enough to belong to those they serve rather than flattening them into the same experience.',
  ],
} as const

export type Tenet = {
  number: string
  title: string
  body: string[]
}

export const tenets: Tenet[] = [
  {
    number: '01',
    title: 'Design for the space between systems.',
    body: [
      'Products now operate between people, organisations, cultures and autonomous systems. The interface is only one visible part of a larger relationship that has to be understood and designed.',
      'Working between systems requires translation rather than compromise by default: knowing which conventions create trust, which assumptions exclude and where a genuinely new model is more useful than an inherited one.',
      'People make culture. It carries taste, memory, argument and intent. Models can extend the work, but deciding what deserves to exist remains a human responsibility.',
    ],
  },
  {
    number: '02',
    title: 'People set the direction and own the result.',
    body: [
      'A human in the loop should mean more than a final review of a generated deck. A person sets the intent, judges the work and accepts the consequences.',
      'Machines are excellent at volume, permutation and recall. Quality still depends on someone who understands the people, the business and the decision being made.',
    ],
  },
  {
    number: '03',
    title: 'The internet keeps teaching itself the same design.',
    body: [
      'The same rounded card. The same gradient hero. The same three-column feature grid, the same testimonial carousel, the same soft blue. An entire industry converged on one template and called it best practice.',
      'Models learn from frequency. Ask for a sensible interface and they return the patterns they have seen most often, then popularity starts to look like a standard. The result may be competent, but the selection was never thoughtful.',
      'Human beings are not interchangeable. Design is expression: the way tools carry character, feeling and intent into life. A company, its product and the people using it are specific; their experiences should be specific too. When every interface resolves to the same average, the technology has flattened the humanity it was meant to serve.',
    ],
  },
  {
    number: '04',
    title: 'AI is useful when judgment stays human.',
    body: [
      'We use these tools every day. They are fast, broad and especially useful for the parts of a project that do not benefit from ceremony.',
      'A model can surface a common pattern in seconds. A person still has to decide whether that pattern belongs in this product, for this audience, at this moment. We use AI to explore more options and clear routine work faster. The decisions remain ours.',
    ],
  },
  {
    number: '05',
    title: 'Differentiation begins before the interface.',
    body: [
      'Some clients arrive with a product that blurs into the category. Others arrive with a new utility platform that has no category pattern to borrow. Both need a reason to exist that people can recognise and use.',
      'The important choices happen before the first pixel: who the product is for, what it helps them do and which familiar conventions do not belong. We love being first to give a new platform its useful shape, then carrying that intent through launch, growth or a rethink. If another logo could replace yours without anyone noticing, the work has missed something fundamental.',
    ],
  },
  {
    number: '06',
    title: 'Proof over posture.',
    body: [
      'More than 25 years of shipped work includes two patent filings, a brokerage ranked best in Canada three years running and a health-transport product acquired for $57.5M. The public record also includes twelve honours and launched apps for Chapters Indigo, Land Rover and C Spire.',
      'The standard remains the same: make work that carries its weight in the market.',
    ],
  },
  {
    number: '07',
    title: 'Small, senior and accountable.',
    body: [
      'The principal stays on the project from the first conversation through delivery. Specialist partners extend the team without obscuring who made a decision or who owns it.',
      'When a project needs more hands, we bring in people we have worked with before. You will know who is doing the work and who is responsible for it.',
    ],
  },
]

export type Facet = {
  id: string
  title: string
  lede: string
  methods: string[]
}

/**
 * Deliberately one practice with facets rather than three service cards.
 * The amalgamation is the differentiator, so the layout must not split it.
 */
export const facets: Facet[] = [
  {
    id: 'leadership',
    title: 'Executive design leadership',
    lede: 'Design leadership for the decisions that connect company strategy to shipped work, from a new venture finding its shape to an established organisation with real politics.',
    methods: [
      'Design org design and operating model',
      'Stakeholder alignment and executive narrative',
      'Practice maturity and capability building',
      'Fractional leadership and interim cover',
      'Portfolio governance and prioritisation',
    ],
  },
  {
    id: 'strategy',
    title: 'Product & experience strategy',
    lede: 'Clear product choices start with a precise account of the opportunity, the constraints and the useful thing people need to do. That matters most when a platform is net new.',
    methods: [
      'Discovery and opportunity framing',
      'Market, competitive and heuristic evaluation',
      'Service and system mapping',
      'Net-new product and platform definition',
      'Differentiation and platform strategy',
    ],
  },
  {
    id: 'research',
    title: 'Research & evidence',
    lede: 'Research and product evidence give teams a sound basis for decisions, including the ones that face executive scrutiny.',
    methods: [
      'User research and insight synthesis',
      'Behavioural and product analytics',
      'Experimentation and optimisation',
      'Usability and accessibility evaluation',
      'Measurement frameworks that outlast the engagement',
    ],
  },
  {
    id: 'craft',
    title: 'Design & build',
    lede: 'The work runs from the first interaction flow to production front-end code and launch, keeping strategy grounded in what a team can build, maintain and use.',
    methods: [
      'Interaction design and prototyping',
      'Interface and visual systems',
      'Production front-end implementation',
      'Technical architecture and delivery planning',
      'Purpose-built platforms, design systems and component libraries',
      'Agentic workflows for research, prototyping, implementation and quality assurance',
    ],
  },
]

export type Citation = {
  label: string
  source: string
  href?: string
}

export type Award = {
  title: string
  detail: string
  source: string
  year: string
  href?: string
}

export const proofSection = {
  title: 'A history of firsts, honours and repeat wins.',
  lede:
    'Across regulated industries and public launches, the work has led to acquisitions, repeat brokerage wins, patented products and lasting commercial value.',
  intro:
    'The settings changed; the standard did not. Build something original, make it work in the real world and leave the business stronger than you found it.',
} as const

export type Outcome = {
  client: string
  sector: string
  headline: string
  detail: string
  citations: Citation[]
}

export const outcomes: Outcome[] = [
  {
    client: 'TD',
    sector: 'Financial services',
    headline: 'Best Canadian Brokerage, three years running.',
    detail:
      'Eight years inside the Human-Centered Design Practice of TD Invent, latterly as a people manager in the Wealth pillar. Work spanned WebBroker, EasyWeb, TD Asset Management, Global Investment Solutions and Business Connect, across retail through institutional investors. Two related patents filed. The three-year run established a repeatable standard for brokerage work in a tightly regulated category.',
    citations: [
      {
        label: 'Best Canadian Brokerage 2025',
        source: 'The Globe and Mail',
        href: 'https://www.theglobeandmail.com/investing/personal-finance/article-the-2025-globe-and-mail-digital-brokerage-ranking-improvements-all/',
      },
      {
        label: 'Best Canadian Brokerage 2024',
        source: 'The Globe and Mail',
        href: 'https://www.theglobeandmail.com/investing/article-the-2024-globe-and-mail-digital-brokerage-ranking-who-rules-and-whos/',
      },
      {
        label: 'Best Canadian Brokerage 2023',
        source: 'The Globe and Mail',
        href: 'https://www.theglobeandmail.com/investing/article-canadas-top-digital-broker-is-td-direct-investing-with-an-assist-from/',
      },
      {
        label: 'Investor sentiment index launch, 2021',
        source: 'Investment Executive',
        href: 'https://www.investmentexecutive.com/news/products/td-launches-new-tool-to-help-self-directed-investors-gauge-sentiment/',
      },
    ],
  },
  {
    client: 'Circulation',
    sector: 'Health and life sciences',
    headline: 'Non-emergency medical transport, acquired for $57.5M.',
    detail:
      'Directed UX and UI on the platform pairing hospitals with Uber and later Lyft to move patients across North America. Raised $10.5M in Series A, reached 1,500 health facilities, and was acquired by LogistiCare in September 2018. The acquisition turned a purpose-led transportation platform into a significant commercial outcome.',
    citations: [
      {
        label: 'Acquisition by LogistiCare, 2018',
        source: 'MobiHealthNews',
        href: 'https://www.mobihealthnews.com/content/circulation-acquired-nemt-broker-logisticare-46-million',
      },
      {
        label: 'Uber partnership, 2016',
        source: 'Xconomy',
        href: 'https://www.xconomy.com/boston/2016/09/27/circulation-uber-team-up-to-get-patients-to-doctors-appointments/',
      },
      {
        label: 'Lyft partnership, 2017',
        source: 'MedCityNews',
        href: 'https://medcitynews.com/2017/12/lyft-and-non-emergency-medical-transportation/',
      },
    ],
  },
  {
    client: 'KINETiQ',
    sector: 'Life sciences',
    headline: 'Klick’s flagship brand management platform.',
    detail:
      'Directed the UX and UI teams on an omni-channel life sciences platform for marketing automation and rapid commercialisation, alongside client work for Abbott, Allergan, Takeda and the American Medical Association. It became the flagship expression of Klick’s product thinking and digital delivery capabilities.',
    citations: [
      {
        label: 'Director, Product Design, 2017 to 2018',
        source: 'Medical Marketing and Media',
        href: 'https://www.mmm-online.com/agencies/klick-health-2017/article/662457/',
      },
    ],
  },
  {
    client: 'TowIt',
    sector: 'Public information systems',
    headline: 'A civic app that earned its own Wikipedia entry.',
    detail:
      'Co-founded and led as President an anti-congestion service letting citizens report parking violations. Named one of the 12 best apps made in Canada that year, and covered from the Toronto Star to Fast Company. The app translated a common civic frustration into a recognised public-service product.',
    citations: [
      {
        label: 'Towit pitches a digital solution to illegal parking, 2015',
        source: 'Toronto Star',
        href: 'https://www.thestar.com/business/2015/01/19/towit-pitches-a-digital-solution-to-illegal-parking.html',
      },
      {
        label: 'Report cars parked in bike lanes, 2015',
        source: 'Fast Company',
        href: 'https://www.fastcompany.com/3045965/this-new-app-lets-you-report-cars-parked-in-bike-lanes-so-they-can-be-towed-like-they-deserv',
      },
      {
        label: 'Remove badly parked cars with TowIt, 2015',
        source: 'City Lab',
        href: 'https://www.citylab.com/life/2015/05/remove-badly-parked-cars-with-the-app-tow-it/394043/',
      },
      {
        label: '12 Best Apps Made in Canada, 2015',
        source: 'Techvibes',
        href: 'https://techvibes.com/2015/07/10/best-apps-made-in-canada-2015-07-10',
      },
    ],
  },
  {
    client: 'Chapters Indigo',
    sector: 'Retail',
    headline: 'Mobile and in-store purchasing, launched on both platforms.',
    detail:
      'iOS and Android applications bringing in-store purchasing and Passbook support to Canada’s largest book retailer, built while establishing the product design team at BNOTIONS. The experience brought mobile purchasing into stores across both major smartphone platforms.',
    citations: [
      {
        label: 'Indigo launches mobile apps for in-store purchasing, 2013',
        source: 'The Next Web',
        href: 'https://thenextweb.com/news/canadas-indigo-books-music-launches-android-ios-app-mobile-store-purchasing',
      },
      {
        label: 'Indigo launches new app for iOS and Android, 2013',
        source: 'BetaKit',
        href: 'https://betakit.com/indigo-launches-new-app-for-ios-and-android/',
      },
      { label: "North American Editors' Choice, 2013", source: 'Apple iTunes' },
    ],
  },
  {
    client: 'Land Rover',
    sector: 'Mobility and automotive',
    headline: 'The marque’s first exploration driving app.',
    detail:
      'The Trail Less Traveled, a driving companion built for the launch of the Range Rover L405, extending the brand experience beyond the vehicle. Named Mobile of the Day by FWA. The concept connected product capability, exploration and mobile utility in one award-winning experience.',
    citations: [
      {
        label: 'Range Rover exploration driving app launch, 2013',
        source: 'Land Rover Media Newsroom',
        href: 'https://media.landrover.com/en-us/news/2013/05/land-rover-releases-first-ever-exploration-driving-app-all-new-range-rover',
      },
      { label: 'Mobile of the Day, 2013', source: 'FWA' },
    ],
  },
]

/** 85 named organisations across the career, plus many more unlisted. */
export const clients = [
  'Abbott',
  'Air Miles',
  'Allergan',
  'American Express',
  'American Medical Association',
  'Biotechnology Innovation Organization',
  'BMW',
  'Bell',
  'Blast Radius',
  'Bodyrock.tv',
  'Bombardier Recreational Products',
  'C Spire Wireless',
  'Chapters Indigo',
  'Circulation',
  'City of Toronto',
  'Conyers Dill & Pearman',
  'Cox Communications',
  'Cummins&Partners',
  'Dashboard',
  'Disney',
  'Dr. Oetker',
  'Durex',
  'EA Chemicals & Mining',
  'eBay',
  'Fido',
  'Gallop Labs',
  'Henderson Bas',
  'Hugo Boss',
  'Human Longevity Inc.',
  'Indusblue',
  'Jaguar',
  'Janssen',
  'Juniper Park',
  'Kijiji',
  'Klick',
  'LCBO',
  'Land Rover',
  'Lululemon',
  'LuminaTO',
  'MSN',
  'Match Drive',
  'Mattel',
  'McArthur+Company',
  'Microsoft',
  'Mindblossom',
  'Ministry of Transportation of Ontario',
  'Mirvish',
  'Mitsubishi',
  'Movies on Demand',
  'NJWL Inc.',
  'Nike',
  'Nivea',
  'Norm Li',
  'Novartis',
  'Paga Todo',
  'Partners+Edell',
  'Pizza Hut',
  'Publicis Groupe',
  'Quest Diagnostics',
  'Royal Bank of Canada',
  'Relish Interactive',
  'Samsung',
  'Sirius Radio',
  'Sobeys',
  'Stallergenes Greer',
  'StubHub',
  'Sun Chips',
  'Synervoz',
  'TD Bank',
  'Takeda',
  'Telus/Black’s',
  'The Dilawri Foundation',
  'The Gardiner Museum',
  'The Home Depot',
  'The YMC',
  'Trapeze Media',
  'Twist Image',
  'TwoPointO',
  'Ubisoft',
  'Volvo',
  'Wellspring',
  'Wunderman',
  'Yahoo',
  'York Region Transit',
  'Youthography',
]

export const awards: Award[] = [
  {
    title: 'Best Canadian Brokerage',
    detail: 'TD Direct Investing',
    source: 'The Globe and Mail',
    year: '2025',
    href: 'https://www.theglobeandmail.com/investing/personal-finance/article-the-2025-globe-and-mail-digital-brokerage-ranking-improvements-all/',
  },
  {
    title: 'Best Canadian Brokerage',
    detail: 'TD Direct Investing',
    source: 'The Globe and Mail',
    year: '2024',
    href: 'https://www.theglobeandmail.com/investing/article-the-2024-globe-and-mail-digital-brokerage-ranking-who-rules-and-whos/',
  },
  {
    title: 'Best Canadian Brokerage',
    detail: 'TD Direct Investing',
    source: 'The Globe and Mail',
    year: '2023',
    href: 'https://www.theglobeandmail.com/investing/article-canadas-top-digital-broker-is-td-direct-investing-with-an-assist-from/',
  },
  {
    title: 'Featured on Product Hunt',
    detail: 'TowIt',
    source: 'Product Hunt',
    year: '2018',
  },
  {
    title: 'The Best Planning Apps',
    detail: 'TowIt',
    source: 'Planetizen',
    year: '2016',
  },
  {
    title: '5 Toronto Apps You Should Be Using',
    detail: 'TowIt',
    source: 'Indie88',
    year: '2015',
  },
  {
    title: '12 Best Apps Made in Canada',
    detail: 'TowIt',
    source: 'Techvibes',
    year: '2015',
    href: 'https://techvibes.com/2015/07/10/best-apps-made-in-canada-2015-07-10',
  },
  {
    title: 'Finalist, Wildcard category',
    detail: 'C Spire PERCS',
    source: 'Appy Awards',
    year: '2014',
  },
  {
    title: "iTunes North American Editors' Choice",
    detail: 'Chapters Indigo Mobile',
    source: 'Apple',
    year: '2013',
  },
  {
    title: 'Winner, Best Film',
    detail: '"Tapped", sound design and music',
    source: '50 Hour Film Festival',
    year: '2013',
  },
  {
    title: 'Mobile of the Day',
    detail: 'Range Rover, The Trail Less Traveled',
    source: 'FWA',
    year: '2013',
  },
  {
    title: 'Top 25 Canadian Creative Professionals',
    detail: 'Voted, national',
    source: 'Marketing Magazine Canada',
    year: '2009',
  },
]

export const sectors = [
  'Financial services and fintech',
  'Health and life sciences',
  'Mobility and automotive',
  'Retail and consumer brands',
  'Media and gaming',
  'Hospitality and events',
  'Real estate',
  'Marketing and communications',
  'Public and environmental information systems',
]

export type Engagement = {
  index: string
  name: string
  duration: string
  key: 'day' | 'week' | 'project'
  price: string
  priceDetail: string
  action: string
  enquiryReason: string
  lede: string
  points: string[]
}

export const engagements: Engagement[] = [
  {
    index: '01',
    name: 'The day',
    duration: 'Single day',
    key: 'day',
    price: '$1,500 CAD',
    priceDetail: 'per focused day',
    action: 'Book the day',
    enquiryReason: 'Focused day',
    lede: 'A focused day with a senior practitioner for a first-principles product question or a decision that has stalled.',
    points: [
      'Design or product critique with a written verdict',
      'Executive advisory and decision support',
      'Audit of an existing experience',
      'Workshop facilitation',
    ],
  },
  {
    index: '02',
    name: 'The week',
    duration: 'One to four weeks',
    key: 'week',
    price: '$6,000 CAD',
    priceDetail: 'per week',
    action: 'Start with a week',
    enquiryReason: 'One-to-four-week engagement',
    lede: 'Enough time to frame a new platform or an existing problem properly and produce a strategy, working prototype or implementation plan. The most common way to start.',
    points: [
      'Discovery and opportunity framing',
      'Strategy sprint with a defensible recommendation',
      'Net-new concept and prototype development',
      'Fractional design leadership, retained',
    ],
  },
  {
    index: '03',
    name: 'The assembled team',
    duration: 'Project length',
    key: 'project',
    price: 'Based on scope',
    priceDetail: 'a clear estimate follows discovery',
    action: 'Discuss a project',
    enquiryReason: 'Scoped project or assembled team',
    lede: 'End-to-end product work that needs more than one pair of hands. Michael assembles trusted consultants and contractors, leads the work and remains accountable through delivery.',
    points: [
      'End-to-end product design, production front-end and delivery',
      'Purpose-built platform and design system work',
      'Specialist engineering and consulting capacity as needed',
      'Human-directed agentic workflows across production',
      'Principal stays on the project throughout',
    ],
  },
]

export const speaking = [
  { venue: 'Sheridan College', topic: 'IxD Year End Social', year: '2016' },
  { venue: 'George Brown College', topic: 'Entrepreneurship', year: '2015' },
  { venue: 'HTML Toronto at Mozilla', topic: 'Wireframing and Planning', year: '2014' },
  { venue: 'Woodgreen Community Services', topic: 'Design and Startups', year: '2014' },
  { venue: 'The YMC', topic: 'User Experience Design', year: '2013' },
]

export const broadcast = [
  { outlet: 'Business Channel Türk', year: '2018' },
  { outlet: 'Adobe Creative Cloud Blog', year: '2016' },
  { outlet: 'KPIX CBS SF Bay Area', year: '2015' },
  { outlet: 'CBC Here and Now', year: '2015' },
  { outlet: 'CityPulse24', year: '2015' },
  { outlet: 'AM640 Toronto', year: '2015' },
]

export type CareerEntry = {
  company: string
  roles: { title: string; period: string }[]
  note: string
  founded?: boolean
}

export const career: CareerEntry[] = [
  {
    company: 'TD',
    roles: [
      { title: 'Manager, Experience Design', period: '2022 to 2026' },
      { title: 'Experience Design Lead', period: '2018 to 2022' },
    ],
    note: 'Human-Centered Design Practice, TD Invent. Wealth pillar, retail through institutional.',
  },
  {
    company: 'Klick',
    roles: [
      { title: 'Director, Product Design', period: '2017 to 2018' },
      { title: 'Director, User Experience', period: '2016 to 2017' },
    ],
    note: 'The Circulation medical transport product (2016 to 2017), then the KINETiQ life sciences platform (2017 to 2018).',
  },
  {
    company: 'TowIt',
    roles: [{ title: 'President, Co-Founder', period: '2014 to 2015' }],
    note: 'Anti-congestion civic technology. Research through front-end, plus investor relations.',
    founded: true,
  },
  {
    company: 'BNOTIONS',
    roles: [{ title: 'Product Designer', period: '2013 to 2014' }],
    note: 'Built the product design team and the processes that scaled it.',
  },
  {
    company: 'Blast Radius',
    roles: [{ title: 'Interaction Designer', period: '2011 to 2013' }],
    note: 'Native and hybrid mobile, enterprise web and microsites for global marques.',
  },
  {
    company: 'Mouth Media',
    roles: [{ title: 'Art Director', period: '2010 to 2011' }],
    note: 'Directed hybrid designer and developer teams across dozens of builds.',
  },
  {
    company: 'Chiqpea',
    roles: [{ title: 'Partner, Creative Director', period: '2009 to 2010' }],
    note: 'A freelance-first agency built during the downturn, staffed with laid-off local talent.',
    founded: true,
  },
  {
    company: 'Independent',
    roles: [{ title: 'Interactive Designer and Developer', period: '2007 to 2009' }],
    note: 'Contracted to Toronto agencies as architect, art director, front-end and sound designer.',
  },
  {
    company: 'Mindblossom',
    roles: [
      { title: 'Senior Designer', period: '2006 to 2007' },
      { title: 'Designer', period: '2005 to 2006' },
    ],
    note: 'Hired while studying at Toronto Metropolitan University. Agency bootcamp.',
  },
  {
    company: 'Boardwise',
    roles: [{ title: 'Founder', period: '1999' }],
    note: 'The first online skate shop in the Middle East. Dubai.',
    founded: true,
  },
]
