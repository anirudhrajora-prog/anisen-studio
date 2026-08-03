export const site = {
  name: 'Anirudh Rajora',
  brand: 'ANI',
  role: 'Graphic Designer · Video Editor · Visual Storyteller',
  city: 'Rohini, New Delhi, India',
  email: 'anirudhrajora2006@gmail.com',
  phone: '+91 70425 67299',
  tagline: 'Designing stories you can keep.',
  description:
    'Anirudh Rajora is a graphic designer, video editor, and visual storyteller based in Rohini, New Delhi. As Tech Head of Rudra — The Street Play Society at PGDAV College, he leads end-to-end visual branding for events, productions, and campaigns. His work spans event identity, poster design, social media campaigns, video editing, and merchandise design.',
  url: 'https://anirudhrajora.vercel.app',
  founded: 2023,
  socials: {
    behance: 'https://www.behance.net/anirudhrajora1',
    linkedin: 'https://www.linkedin.com/in/anirudh-rajora-71b440274/',
  },
}

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
  { label: 'Work', href: '#works' },
]

export const hero = {
  kicker: 'Anirudh * Tech Nerd * New Delhi',
  headlineLines: ['Designing', 'Collectibles', 'of Delhi'],
  sub: 'Event identities, poster systems, campaign reels and merch — designed on a system, shipped on a deadline, from first sketch to final print and post.',
  ctaPrimary: { label: 'Start a Project', href: '#contact' },
  ctaSecondary: { label: 'Explore Our Work', href: '#works' },
  portrait: {
    src: 'https://res.cloudinary.com/xbmycklp/image/upload/v1785512406/images/header-removebg-preview.png',
    alt: 'Anirudh Rajora — header portrait',
  },
  stats: [
    { value: '200+', label: 'Freshers Reached' },
    { value: '3,000+', label: 'Video Views' },
    { value: '150+', label: 'Buyers Engaged' },
    { value: '50+', label: 'Teams Covered' },
  ],
}

export const about = {
  kicker: '02 · About',
  title: 'Designing between lecture halls and rehearsal rooms.',
  body: [
    'I am a B.Com (Hons.) student at PGDAV College, University of Delhi, and the Tech Head of Rudra — The Street Play Society. My design practice grew from a need: how do we make a college society feel like a professional cultural brand? The answer lived between the streets of Old Delhi — hand-painted signboards, Bollywood posters, matchbox labels, railway typography — and the deadlines of a student society.',
    'Since 2023, I have designed complete event identities (DAV Rohini MUN, Rudra HYPERION, Exploran\'za Spardha), recruitment campaigns that attracted 200+ freshers, social media strategies that drove 3,000+ video views, and merchandise that members actually wear. I also interned as a Graphic Design Intern at a digital marketing agency and as Executive Assistant at a real estate agency managing Facebook Marketplace campaigns.',
  ],
  portrait: {
    src: '/images/web/portrait.webp',
    alt: 'Portrait of Anirudh Rajora',
  },
  promiseKicker: 'The Studio Promise',
  promiseTitle: 'Taking care of your needs by providing',
  principles: [
    {
      title: 'Deadline First',
      body: 'Student societies move fast. A poster for Monday is designed on Sunday. I build systems — templates, grids, colour codes — so speed never sacrifices consistency.',
    },
    {
      title: 'Bazaar Logic',
      body: 'Old Delhi signage teaches you: if it\'s not legible from 20 feet, it doesn\'t work. I design for the back row of the auditorium and the thumbnail on a phone screen simultaneously.',
    },
    {
      title: 'Iterate in Public',
      body: 'The first version is rarely the final one. I share work-in-progress with the team, take feedback, and ship the next version. The design lives in the iterations, not the first draft.',
    },
  ],
}

export type Gallery = {
  id: string
  index: string
  title: string
  series: string
  blurb: string
  preview: { type: 'image' | 'video'; src: string }
  palette: [string, string]
}

export const galleries: Gallery[] = [
  {
    id: 'dav-rohini-mun',
    index: '01',
    title: 'DAV Rohini MUN',
    series: 'CONFERENCE SERIES',
    blurb:
      'One conference, one system — the brochure, 150+ placards, certificates and the secretariat.',
    preview: { type: 'image', src: 'https://res.cloudinary.com/xbmycklp/image/upload/v1785512449/images/mun-brochure/12.jpg' },
    palette: ['#232d4f', '#9e1b1b'],
  },
  {
    id: 'rudra-the-street-play-society',
    index: '02',
    title: 'Rudra — The Street Play Society',
    series: 'SOCIETY SERIES',
    blurb:
      'Auditions, storyboards, showreels and two event highlights — a full season at PGDAV.',
    preview: { type: 'image', src: 'https://res.cloudinary.com/xbmycklp/image/upload/v1785512224/images/event%20special%20highlights-shor/1.jpg' },
    palette: ['#841e2d', '#eecbd6'],
  },
  {
    id: 'merchandise',
    index: '03',
    title: 'Merchandise Design',
    series: 'MERCH SERIES',
    blurb: 'T-shirt graphics and the "ART IS REVOLUTION" flagship design.',
    preview: { type: 'image', src: 'https://res.cloudinary.com/xbmycklp/image/upload/v1785512995/images/merchandise/6.jpg' },
    palette: ['#3e2312', '#c98d4b'],
  },
  {
    id: 'poster',
    index: '04',
    title: 'Poster Design',
    series: 'POSTER SERIES',
    blurb: 'Street typography, film tributes and bazaar signboard energy.',
    preview: { type: 'image', src: 'https://res.cloudinary.com/xbmycklp/image/upload/v1785513648/images/poster/poster2.jpg' },
    palette: ['#bf5428', '#e8a20c'],
  },
  {
    id: 'youtube-thumbnails',
    index: '05',
    title: 'YouTube Thumbnails',
    series: 'THUMBNAIL SERIES',
    blurb: 'Click-first thumbnails for anime and movie content.',
    preview: { type: 'image', src: 'https://res.cloudinary.com/xbmycklp/image/upload/v1785513692/images/youtube-thumbnails/thumbnail2.jpg' },
    palette: ['#e8a20c', '#9e1b1b'],
  },
  {
    id: 'art-illustrations',
    index: '06',
    title: 'Art Illustrations',
    series: 'ILLUSTRATION SERIES',
    blurb: 'Fan art and portrait studies — anime, expression, linework.',
    preview: { type: 'image', src: 'https://res.cloudinary.com/xbmycklp/image/upload/v1785511817/images/anime-fan-illustrations/anime1.jpg' },
    palette: ['#0e5c43', '#232d4f'],
  },
  {
    id: 'personal-edits-and-reels',
    index: '07',
    title: 'Personal Edits & Reels',
    series: 'REEL SERIES',
    blurb: 'Cuts, edits and reels — audio always on when you press play.',
    preview: { type: 'video', src: 'https://res.cloudinary.com/xbmycklp/video/upload/v1785514189/videos/personal%20video%20project%209.mp4' },
    palette: ['#201812', '#d98e7e'],
  },
]

export type CaseStudy = {
  id: string
  slug: string
  index: string
  title: string
  subtitle: string
  year: string
  role: string
  duration: string
  theme: 'dark' | 'blush' | 'brownie'
  story: string
  client: string
  industry: string
  challenge: string[]
  approach: string[]
  process: { title: string; body: string }[]
  features: { title: string; body: string }[]
  stack: string[]
  lessons: string[]
  metrics: { value: string; label: string }[]
  palette: string[]
  image: string
  video?: { src: string; title: string }
  credits: { label: string; value: string }[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'dav-rohini-mun',
    slug: 'dav-rohini-mun',
    index: 'CASE 01',
    title: 'DAV Rohini MUN',
    subtitle: 'One conference, one system: 150+ assets that all speak one language.',
    year: '2023',
    role: 'IT & Social Media Head, DAV Rohini MUN',
    duration: '6 weeks',
    theme: 'dark',
    story:
      'As the IT and Social Media Head for DAV Rohini MUN, I spearheaded the complete digital campaign and collateral ecosystem. From conceptualizing critical certificates, placards, and brochures to managing high-stakes social media outreach, I navigated tight deadlines and technical hurdles head-on. By maintaining absolute precision under pressure, I transformed creative chaos into a seamless, professional conference experience that empowered delegates and amplified our institutional reach.',
    client: 'DAV Rohini MUN',
    industry: 'Conference · Model United Nations',
    challenge: [
      'A conference needed a complete visual identity — brochures, placards, certificates, secretariat materials — with no existing design system to start from.',
      'Five committees had to live under one identity while still feeling distinct from each other.',
      'Six weeks to take a blank page to a printed, distributed conference — every delay hit a real date.',
    ],
    approach: [
      'Locked a single system first — palette, type, and grid — so every asset inherits the same language regardless of who touches it or when.',
      'Translated the master system committee by committee, keeping each sub-identity legible from the back of the auditorium.',
      'Ran the social campaign in parallel on the same visual system, so the conference felt like a brand before it started.',
    ],
    process: [
      {
        title: 'Systems first',
        body: 'Palette, type, and grid locked before any asset shipped — the grid is what made speed safe.',
      },
      {
        title: 'Asset pipeline',
        body: 'Placards, certificates, and the 12-page brochure produced against shared templates, committee by committee.',
      },
      {
        title: 'Parallel campaign',
        body: 'Countdowns, committee reveals, and delegate-facing posts on the same system — the feed and the hall matched.',
      },
    ],
    features: [
      {
        title: 'One system, 150+ assets',
        body: 'The master grid and palette stretched across every deliverable without a single redo from inconsistency.',
      },
      {
        title: 'Five committees, one family',
        body: 'Each committee got a sub-identity that still read unmistakably as the same conference.',
      },
      {
        title: 'Precision under deadline',
        body: 'Six weeks from concept to printed collateral — the system absorbed the pressure, not the people.',
      },
    ],
    stack: ['Illustrator', 'Photoshop'],
    lessons: [
      'A system beats inspiration: once the grid and palette were locked, speed never cost consistency.',
      'Print checks the designer harder than the screen — twenty feet of auditorium is a different test than twenty inches of phone.',
    ],
    metrics: [
      { value: '150+', label: 'Placards' },
      { value: '12', label: 'Brochure pages' },
      { value: '05', label: 'Committees, one system' },
      { value: '06', label: 'Weeks delivery' },
    ],
    palette: ['#232d4f', '#9e1b1b', '#e8a20c', '#f4ecdb'],
    image: '/images/web/mun-cover.webp',
    credits: [
      { label: 'Role', value: 'IT & Social Media Head' },
      { label: 'Duration', value: '6 months' },
      { label: 'Year', value: '2023' },
      { label: 'Deliverables', value: '150+ frames' },
    ],
  },
  {
    id: 'event-special-highlights-shor',
    slug: 'event-special-highlights-shor',
    index: 'CASE 02',
    title: 'Event Special Highlights - Shor',
    subtitle: 'Forty-two frames, one showreel, and a production that earned its spotlights.',
    year: '2026',
    role: 'Tech Head — Social Campaign & Reels',
    duration: '2 weeks',
    theme: 'blush',
    story:
      'Managing over 50 dynamic teams as the Tech Head for "Shor" demanded relentless energy and precision. I directed the entire social media campaign and produced high-retention promotional reels that drove massive digital engagement. Balancing multi-channel production schedules, technical troubleshooting, and team coordination taught me how to thrive in fast-paced environments, turning intense creative pressure into an unforgettable showcase of street theatre culture.',
    client: 'Rudra — The Street Play Society',
    industry: 'College festival · Street theatre',
    challenge: [
      'Fifty-plus teams, one festival weekend, and one feed that had to make people actually show up.',
      'Promotional reels had to hold attention in a crowded feed while the production itself was still being built.',
      'Capture across multiple venues with no dedicated crew — the campaign had to be scheduled like a production.',
    ],
    approach: [
      'Ran the campaign as one content system: frame style, caption voice, and reel formats locked before the week began.',
      'Cut reels to the rhythm of street theatre — quick cuts, bold type, audio that lands in the first frame.',
      'Handled scheduling and troubleshooting live: from capture to upload in the same day, across channels.',
    ],
    process: [
      {
        title: 'Content plan',
        body: 'A 40+ frame set designed as a campaign, not a random gallery — every post had a job.',
      },
      {
        title: 'Capture & cut',
        body: 'Multi-venue capture folded into a production schedule, cut into high-retention reels.',
      },
      {
        title: 'Live operations',
        body: 'Technical troubleshooting and team coordination in real time, with the feed as the deadline.',
      },
    ],
    features: [
      {
        title: '40+ frame campaign set',
        body: 'One consistent look across the entire festival week — the feed read as a single production.',
      },
      {
        title: 'A showreel that carried the story',
        body: 'The festival\u2019s narrative compressed into one cut that kept rewatches on the society page.',
      },
      {
        title: '1st / 3rd fest placements',
        body: 'The campaign ran in the same week as the production — and the results backed the craft.',
      },
    ],
    stack: ['Premiere Pro', 'After Effects', 'Photoshop', 'Instagram'],
    lessons: [
      'A planned campaign system makes festival-pressure execution mechanical instead of creative — that is the point.',
      'A reel is a poster plus motion: the first frame does the stopping, the edit does the keeping.',
    ],
    metrics: [
      { value: '40+', label: 'Frames in the set' },
      { value: '01', label: 'Showreel' },
      { value: '1st / 3rd', label: 'Fest placements' },
      { value: '02', label: 'Weeks turnaround' },
    ],
    palette: ['#841e2d', '#b05a55', '#eecbd6', '#fbf6ea'],
    image: 'https://res.cloudinary.com/xbmycklp/image/upload/v1785512240/images/event%20special%20highlights-shor/14.jpg',
    video: {
      src: 'https://res.cloudinary.com/xbmycklp/video/upload/v1785512315/images/event%20special%20highlights-shor/shor.mp4',
      title: 'Shor Throwback - Showreel',
    },
    credits: [
      { label: 'Role', value: 'Tech Head, Shor' },
      { label: 'Duration', value: '2 weeks' },
      { label: 'Year', value: '2026' },
      { label: 'Deliverables', value: '40+ frames · 1 showreel' },
    ],
  },
  {
    id: 'rudra-merch',
    slug: 'rudra-merch',
    index: 'CASE 03',
    title: 'Brand Identity- Merchandise Design',
    subtitle: 'Finding the tee the whole society actually wants to wear.',
    year: '2025',
    role: 'Freelance Merchandise Designer',
    duration: '8 weeks',
    theme: 'brownie',
    story:
      'Working as an independent freelance designer for brand merchandise required complete ownership from concept to final production. I translated complex client visions into striking, market-ready apparel collections under strict commercial deadlines. By balancing creative storytelling with practical streetwear logic, I delivered distinctive brand identities that resonated deeply with audiences while proving my adaptability as an autonomous designer.',
    client: 'Rudra — The Street Play Society',
    industry: 'Society merchandise · Apparel',
    challenge: [
      'A society tee that members would actually wear — not a poster design printed onto cotton.',
      'The client vision had to survive print reality: three colours, real fabric, real cost.',
      'Full ownership with no art director above — concept, iteration, and production coordination were all mine.',
    ],
    approach: [
      'Started from streetwear logic instead of poster logic — the tee is a walking billboard for the society.',
      'Iterated in public: fifteen-plus revisions with the team, each round shipping a version tighter than the last.',
      'Balanced storytelling with commercial deadlines — the design had to sell the society, not just look good.',
    ],
    process: [
      {
        title: 'Concept',
        body: 'The \u201cART IS REVOLUTION\u201d flagship born from the society\u2019s street-theatre spirit.',
      },
      {
        title: 'Iteration',
        body: 'Fifteen-plus rounds with the team — public iteration as the design method.',
      },
      {
        title: 'Production',
        body: 'Print-ready execution under three-colour constraints, delivered to a commercial deadline.',
      },
    ],
    features: [
      {
        title: 'ART IS REVOLUTION flagship',
        body: 'A design the society actually wears — the true test for merch is the street, not the moodboard.',
      },
      {
        title: '15+ iterations',
        body: 'Every revision shipped in public and landed closer to the final; none wasted the deadline.',
      },
      {
        title: 'Three print colours',
        body: 'Creative restraint under real production constraints — the constraint shaped the design.',
      },
    ],
    stack: ['Illustrator', 'Photoshop'],
    lessons: [
      'Merch is a product, not a poster: it only works when someone is proud to wear it.',
      'Autonomy is a skill: full ownership from concept to production means every win — and every mistake — is yours.',
    ],
    metrics: [
      { value: '50+', label: 'Members served' },
      { value: '15+', label: 'Design iterations' },
      { value: '03', label: 'Print colours' },
      { value: '08', label: 'Weeks end-to-end' },
    ],
    palette: ['#3e2312', '#6b4423', '#c98d4b', '#ead1b6'],
    image: 'https://res.cloudinary.com/xbmycklp/image/upload/v1785512995/images/merchandise/6.jpg',
    credits: [
      { label: 'Role', value: 'Freelance Merch Design' },
      { label: 'Duration', value: '8 weeks' },
      { label: 'Year', value: '2025' },
      { label: 'Deliverables', value: '1 flagship tee · 15+ iterations' },
    ],
  },
]

export const skills = [
  {
    group: 'Design Tools',
    items: ['Adobe Photoshop', 'Adobe Illustrator'],
  },
  {
    group: 'Video Editing',
    items: ['Adobe Premiere Pro', 'Adobe After Effects'],
  },
  {
    group: 'Digital Marketing',
    items: ['Facebook Marketplace Ads', 'Social Media Content', 'Campaign Management'],
  },
  {
    group: 'Web & Productivity',
    items: ['WordPress', 'Microsoft Excel (Advanced)'],
  },
  {
    group: 'Core Competencies',
    items: ['Visual Branding', 'Storytelling', 'Team Collaboration', 'Client Communication'],
  },
]

export const tools = [
  { name: 'Photoshop', level: 'Advanced' },
  { name: 'Illustrator', level: 'Advanced' },
  { name: 'Premiere Pro', level: 'Intermediate' },
  { name: 'After Effects', level: 'Intermediate' },
  { name: 'WordPress', level: 'Basic' },
  { name: 'Excel', level: 'Advanced' },
]

export const experience = [
  {
    period: 'Sep 2024 — Present',
    role: 'Tech Head',
    org: 'Rudra — The Street Play Society, PGDAV College',
    body: 'Lead end-to-end design and visual branding for society events, productions, and campaigns. Designed recruitment posters attracting 200+ freshers. Created and managed Instagram content strategy, significantly increasing page reach and engagement. Edited promotional and event videos garnering 3,000+ views. Oversaw complete merchandise design including T-shirt graphics and society branding collateral.',
    tags: ['Event Identity', 'Systems', 'Motion', 'Merchandise'],
  },
  {
    period: 'Dec 2024 — Feb 2025',
    role: 'Executive Assistant',
    org: 'Nikhil\'s Real Estate Agency, New Delhi',
    body: 'Managed and optimised Facebook Marketplace ads, resulting in consistent lead generation. Created and published property listings with compelling visuals and descriptions. Engaged with 150+ potential buyers, facilitating lead qualification and conversion. Maintained Excel-based CRM trackers for monitoring leads, inquiries, and follow-ups.',
    tags: ['Digital Marketing', 'Facebook Ads', 'CRM', 'Lead Generation'],
  },
  {
    period: 'May 2024 — Jul 2024',
    role: 'Graphic Design Intern',
    org: 'Local Digital Marketing Agency, New Delhi',
    body: 'Designed marketing creatives and promotional visuals for digital advertising campaigns. Created on-brand social media content for multiple small business clients. Participated in client briefing sessions and contributed to visual strategy planning. Collaborated with cross-functional team members to ensure timely, consistent deliverables.',
    tags: ['Social Media', 'Campaign Design', 'Client Work'],
  },
]

export const education = [
  {
    period: '2024 — Present',
    degree: 'B.Com (Hons.)',
    org: 'PGDAV College, University of Delhi',
    body: 'Relevant coursework: Business Communication, Financial Accounting, Marketing Management.',
  },
  {
    period: '2023 — 2024',
    degree: 'Class 12 — Commerce (CBSE)',
    org: 'D.A.V. Public School, Rohini, New Delhi',
    body: '',
  },
]

export const contact = {
  kicker: '07 · Contact',
  title: 'Have a brief that needs a deadline?',
  body: 'I reply to every message — usually within a day. Tell me what you\'re building.',
  email: 'anirudhrajora2006@gmail.com',
  phone: '+91 70425 67299',
  location: 'Rohini, New Delhi, India',
  hours: 'Mon – Sat · 10:00 – 19:00 IST',
  availability: 'Open to freelance projects & internships',
  formPlaceholders: {
    name: 'Your name',
    email: 'Your email',
    message: 'Tell me about your project…',
    send: 'Post the Letter',
  },
}

export const footer = {
  note: 'Designed and built in Rohini, New Delhi.',
  rights: 'All rights reserved. No pixels were wasted.',
  credits: 'Type set in Fraunces & Schibsted Grotesk.',
}