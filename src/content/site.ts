/**
 * All editorial content for 4th Culture lives here so copy can be revised
 * without touching layout. Everything below is drawn from the real record.
 */

export const studio = {
  name: '4th Culture',
  principal: 'Michael Duncan McArthur',
  base: 'Toronto',
  positioning:
    'A design practice for companies that refuse to feel like everyone else.',
  linkedin: 'https://www.linkedin.com/in/gorfed/',
  github: 'https://github.com/gorfednet',
  portfolio: 'https://gorfed.net',
  music: 'https://gorfmusic.com',
  yearsActive: '25+',
} as const

export type Tenet = {
  number: string
  title: string
  body: string[]
}

export const tenets: Tenet[] = [
  {
    number: '01',
    title: 'There is a fourth culture, and we are building it.',
    body: [
      'A third-culture kid is formed between places, belonging fully to neither the country of origin nor the country of residence, fluent in the gap between them. That is a literal description of how this practice was built: Vancouver, Surrey, White Rock, Dubai, Cairo, Toronto.',
      'The fourth culture is the one forming now, between human and machine. Most people are either fleeing it or surrendering to it. We are neither. We are native to the gap, because working in the gap is the only thing we have ever done.',
      'A culture is made by people. That is the part everyone keeps forgetting. It has taste, memory, argument, intent. A statistical average of everything that came before is not a culture. It is a smear.',
    ],
  },
  {
    number: '02',
    title: 'A human is always in the loop, and always holds the pen.',
    body: [
      'Not as a compliance checkbox. Not as a reviewer rubber-stamping a generated deck at the end of the pipeline. In the loop means a person sets the intent, judges the output, and owns the consequence.',
      'Machines are extraordinary at volume, permutation, and recall. They are structurally incapable of caring whether the result is any good. Judgment is the job. Judgment does not delegate.',
    ],
  },
  {
    number: '03',
    title: 'Everything feels the same. That is the real crisis.',
    body: [
      'The same rounded card. The same gradient hero. The same three-column feature grid, the same testimonial carousel, the same soft blue. An entire industry converged on one template and called it best practice.',
      'That convergence has a mechanism, not just a mood. A model trained on the entire internet does not select thoughtfully — it finds whatever pattern occurs most often and returns it as the default. The most common choice gets mistaken for the correct one, and "standard" quietly becomes a synonym for "popular." That is not curation. It is paint-by-numbers, running at the scale of every company, brand, and product that asks it for an answer at once.',
      'Companies, brands, people, artists, technologies — none of them are interchangeable inputs to a distribution. Each deserves a choice made on purpose, by someone who can defend it. We were nourished during a period of differentiation, back when the web had a point of view, when you could feel a product had been made by a person with an opinion. That has been diminished at a catastrophic scale. We are here to return it.',
    ],
  },
  {
    number: '04',
    title: 'We are not anti-AI. We are pro-human.',
    body: [
      'This is not nostalgia and it is not a protest. We use these tools every day, deliberately and well. Refusing them would be its own kind of vanity.',
      'The objection is not to the machine. It is to mistaking its average for a standard. A model can surface the most common pattern in seconds; it takes a person to decide whether that pattern deserves to exist here, for this brand, this problem. We use AI to aid that judgment — to widen the options, to move faster through the unglamorous parts — never to replace the judgment itself.',
    ],
  },
  {
    number: '05',
    title: 'Differentiation is the deliverable.',
    body: [
      'Clients do not actually hire us for screens. They hire us because their product is indistinguishable from four competitors and people cannot remember which one they used.',
      'Standing apart is not decoration applied at the end. It is a feeling that has to be decided before the first pixel is placed: who you are for, what you refuse to do, what it should feel like to arrive. If the work could carry any other logo without anyone noticing, it failed. However polished it looks.',
    ],
  },
  {
    number: '06',
    title: 'Proof over posture.',
    body: [
      'Over 25+ years of shipping, in regulated industries where the work is measured. Two patents filed. A brokerage ranked best in the country three years running. A health-transport product acquired for $57.5M. Twelve honours on the public record, from an Apple Editors’ Choice to an FWA Mobile of the Day. Apps for Chapters Indigo, Land Rover and C Spire that shipped and were reviewed in public. Eighty-five named clients, from Nike to the Ministry of Transportation of Ontario.',
      'A manifesto is cheap. This one is backed by a record you can look up.',
    ],
  },
  {
    number: '07',
    title: 'Small, senior, and accountable.',
    body: [
      'No pyramid. No bait-and-switch where the person who won the work vanishes after kickoff. The principal is on the project, and agentic partners extend that reach without diluting the judgment behind it.',
      'When a project needs more hands, we assemble a team of people we have actually worked with. You always know exactly who is doing the work, and exactly who to hold responsible for it.',
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
    lede: 'Standing in the room where the decisions are made, translating between the boardroom and the build. Over 25+ years of leading design inside organisations large enough to have real politics.',
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
    lede: 'Deciding what to build and what to refuse. Framing the opportunity precisely enough that the design work becomes obvious rather than agonising.',
    methods: [
      'Discovery and opportunity framing',
      'Market, competitive and heuristic evaluation',
      'Service and system mapping',
      'Product definition and roadmap shaping',
      'Positioning and differentiation strategy',
    ],
  },
  {
    id: 'research',
    title: 'Research & evidence',
    lede: 'Replacing the loudest opinion in the room with something defensible. Evidence that survives contact with a sceptical executive.',
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
    lede: 'Hands still on the tools, from interaction flows through to shipped front-end. That is why the strategy stays honest about what can actually be built.',
    methods: [
      'Interaction design and prototyping',
      'Interface and visual systems',
      'Front-end implementation',
      'Design systems and component libraries',
      'AI-assisted workflow design, human-directed',
    ],
  },
]

export type Outcome = {
  client: string
  sector: string
  headline: string
  detail: string
  citations: { label: string; source: string }[]
}

export const outcomes: Outcome[] = [
  {
    client: 'TD',
    sector: 'Financial services',
    headline: 'Best Canadian Brokerage, three years running.',
    detail:
      'Eight years inside the Human-Centered Design Practice of TD Invent, latterly as a people manager in the Wealth pillar. Work spanned WebBroker, EasyWeb, TD Asset Management, Global Investment Solutions and Business Connect, across retail through institutional investors. Two related patents filed.',
    citations: [
      { label: 'Best Canadian Brokerage 2023, 2024, 2025', source: 'The Globe and Mail' },
      { label: 'Investor sentiment index launch, 2021', source: 'Investment Executive' },
    ],
  },
  {
    client: 'Circulation',
    sector: 'Health and life sciences',
    headline: 'Non-emergency medical transport, acquired for $57.5M.',
    detail:
      'Directed UX and UI on the platform pairing hospitals with Uber and later Lyft to move patients across North America. Raised $10.5M in Series A, reached 1,500 health facilities, and was acquired by LogistiCare in September 2018.',
    citations: [
      { label: 'Acquisition by LogistiCare, 2018', source: 'MobiHealthNews' },
      { label: 'Uber and Lyft partnerships, 2016 to 2017', source: 'Xconomy / MedCityNews' },
    ],
  },
  {
    client: 'KINETiQ',
    sector: 'Life sciences',
    headline: 'Klick’s flagship brand management platform.',
    detail:
      'Directed the UX and UI teams on an omni-channel life sciences platform for marketing automation and rapid commercialisation, alongside client work for Abbott, Allergan, Takeda and the American Medical Association.',
    citations: [{ label: 'Director, Product Design, 2017 to 2018', source: 'Klick Health' }],
  },
  {
    client: 'TowIt',
    sector: 'Public information systems',
    headline: 'A civic app that earned its own Wikipedia entry.',
    detail:
      'Co-founded and led as President an anti-congestion service letting citizens report parking violations. Named one of the 12 best apps made in Canada that year, and covered from the Toronto Star to Fast Company.',
    citations: [
      { label: 'Coverage, 2015', source: 'Toronto Star / Fast Company / City Lab' },
      { label: '12 Best Apps Made in Canada, 2015', source: 'Techvibes' },
    ],
  },
  {
    client: 'Chapters Indigo',
    sector: 'Retail',
    headline: 'Mobile and in-store purchasing, launched on both platforms.',
    detail:
      'iOS and Android applications bringing in-store purchasing and Passbook support to Canada’s largest book retailer, built while establishing the product design team at BNOTIONS.',
    citations: [
      { label: 'Launch coverage, 2013', source: 'The Next Web / BetaKit' },
      { label: "North American Editors' Choice, 2013", source: 'Apple iTunes' },
    ],
  },
  {
    client: 'Land Rover',
    sector: 'Mobility and automotive',
    headline: 'The marque’s first exploration driving app.',
    detail:
      'The Trail Less Traveled, a driving companion built for the launch of the Range Rover L405, extending the brand experience beyond the vehicle. Named Mobile of the Day by FWA.',
    citations: [
      { label: 'Range Rover launch, 2013', source: 'Land Rover Media Newsroom' },
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

export const awards = [
  {
    title: 'Best Canadian Brokerage',
    detail: 'TD Direct Investing',
    source: 'The Globe and Mail',
    year: '2025',
  },
  {
    title: 'Best Canadian Brokerage',
    detail: 'TD Direct Investing',
    source: 'The Globe and Mail',
    year: '2024',
  },
  {
    title: 'Best Canadian Brokerage',
    detail: 'TD Direct Investing',
    source: 'The Globe and Mail',
    year: '2023',
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
  lede: string
  points: string[]
}

export const engagements: Engagement[] = [
  {
    index: '01',
    name: 'The day',
    duration: 'Single day',
    lede: 'One senior mind, one hard problem, one day. For teams that are stuck rather than under-resourced.',
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
    lede: 'Enough time to frame a problem properly and leave you with something you can act on. The most common way to start.',
    points: [
      'Discovery and opportunity framing',
      'Strategy sprint with a defensible recommendation',
      'Concept and prototype development',
      'Fractional design leadership, retained',
    ],
  },
  {
    index: '03',
    name: 'The assembled team',
    duration: 'Project length',
    lede: 'For work that needs more than one pair of hands. A team pulled together for your problem specifically, led directly and never handed off.',
    points: [
      'End-to-end product design and delivery',
      'Design system and platform work',
      'Human-directed, AI-extended production',
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
    note: 'Hired while studying at Toronto Metropolitan University. Moved the shop to pure CSS.',
  },
  {
    company: 'Boardwise',
    roles: [{ title: 'Founder', period: '1999' }],
    note: 'The first online skate shop in the Middle East. Dubai.',
    founded: true,
  },
]
