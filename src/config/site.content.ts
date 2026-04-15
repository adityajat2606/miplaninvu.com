import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'miplaninvu.com · trusted listings',
  },
  footer: {
    tagline: 'Top-rated directory',
  },
  /** Copy for the directory-style homepage (`DirectoryHome` in `page.tsx`) */
  directoryHome: {
    heroBadge: 'miplaninvu.com listings',
    heroTitle: 'Find top-rated businesses and services without the noise.',
    heroPlaceholderA: 'What are you looking for?',
    heroPlaceholderB: 'City or area',
    heroCta: 'Browse listings',
    stats: [
      { label: 'Trusted directory', value: 'miplaninvu.com' },
      { label: 'Built to scan', value: 'Clear cards & details' },
      { label: 'Made for action', value: 'Call, visit, compare' },
    ],
    primaryLaneTitle: 'Primary lane',
    featuredEyebrow: 'Featured on miplaninvu.com',
    featuredHeading: 'Listings visitors rely on.',
    featuredLink: 'View all listings',
    diffEyebrow: 'Why miplaninvu.com',
    diffHeading: 'A listing site built for real discovery—not generic feeds.',
    diffBullets: [
      'Curated business profiles with location and contact details up front.',
      'Cards designed for quick scanning on phone or desktop.',
      'One home for miplaninvu.com’s top-rated directory experience.',
    ],
  },
  /** Listings index (`/listings`) hero when layout is `listing-directory` */
  listingPage: {
    lead:
      'Search and filter the miplaninvu.com directory—verified-style listings with categories, summaries, and the details you need to choose with confidence.',
    exploreCta: 'Scroll listings',
    searchCta: 'Site search',
    filterLabel: 'Category',
    filterSubmit: 'Apply',
  },
  hero: {
    badge: 'miplaninvu.com',
    title: ['Top-rated', 'business listings.'],
    description:
      'Browse trusted businesses and services on miplaninvu.com—structured listings, clear metadata, and a directory built for fast decisions.',
    primaryCta: {
      label: 'Open listings',
      href: '/listings',
    },
    secondaryCta: {
      label: 'Search the site',
      href: '/search',
    },
    searchPlaceholder: 'Search miplaninvu.com listings and pages',
    focusLabel: 'Category',
    featureCardBadge: 'Featured listings',
    featureCardTitle: 'Fresh listings shape what visitors see first on miplaninvu.com.',
    featureCardDescription:
      'New and highlighted businesses stay visible so the directory stays useful for people browsing on any device.',
  },
  home: {
    metadata: {
      title: 'miplaninvu.com — top-rated business listings',
      description:
        'miplaninvu.com is a top-rated listing site for discovering verified businesses, services, and local spots—browse categories, compare options, and act with confidence.',
      openGraphTitle: 'miplaninvu.com — business listings directory',
      openGraphDescription:
        'Find and compare top-rated listings on miplaninvu.com. Clear profiles, categories, and trust cues in one place.',
      keywords: [
        'miplaninvu',
        'miplaninvu.com',
        'business listings',
        'top rated listings',
        'local directory',
        'verified businesses',
      ],
    },
    introBadge: 'About miplaninvu.com',
    introTitle: 'The listing directory built for people who want clarity, not clutter.',
    introParagraphs: [
      'miplaninvu.com focuses on business listings first—so owners get a proper profile and visitors get the facts they need in seconds.',
      'Whether you are choosing a service, a place to visit, or a brand to trust, the site keeps scanning fast and details easy to compare.',
      'This is the public home of the miplaninvu.com directory experience: structured listings, consistent cards, and navigation that stays out of your way.',
    ],
    sideBadge: 'At a glance',
    sidePoints: [
      'Top-rated listing presentation with strong trust and location cues.',
      'Category-friendly browsing aligned with how people search locally.',
      'Built for mobile scanning and quick jumps to contact or map info.',
      'A focused alternative to noisy social feeds and generic search results.',
    ],
    primaryLink: {
      label: 'Browse listings',
      href: '/listings',
    },
    secondaryLink: {
      label: 'Search miplaninvu.com',
      href: '/search',
    },
  },
  cta: {
    badge: 'List on miplaninvu.com',
    title: 'Reach people who are actively looking for businesses like yours.',
    description:
      'Add or manage your listing on miplaninvu.com so customers find accurate hours, services, and contact information in our top-rated directory.',
    primaryCta: {
      label: 'Create an account',
      href: '/register',
    },
    secondaryCta: {
      label: 'Contact us',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'New and updated entries on miplaninvu.com.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and stories',
    description: 'Read articles, stories, guides, and long-form posts across topics and interests.',
  },
  listing: {
    title: 'Business listings — miplaninvu.com',
    description:
      'Browse the miplaninvu.com directory: top-rated style listings with categories, summaries, and the details you need to pick the right business.',
  },
  classified: {
    title: 'Classifieds and announcements',
    description: 'Browse classifieds, offers, notices, and time-sensitive posts across categories.',
  },
  image: {
    title: 'Image sharing and visual posts',
    description: 'Explore image-led posts, galleries, and visual stories from across the platform.',
  },
  profile: {
    title: 'Profiles and public pages',
    description: 'Discover public profiles, brand pages, and identity-focused posts in one place.',
  },
  sbm: {
    title: 'Curated links and saved resources',
    description: 'Browse useful links, saved references, and curated resources organized for discovery.',
  },
  pdf: {
    title: 'PDFs and downloadable resources',
    description: 'Open reports, documents, and downloadable resources shared across the platform.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'About listings on miplaninvu.com',
    paragraphs: [
      'Each listing on miplaninvu.com is structured so you can see category, summary, and contact-style details at a glance—ideal when you are comparing local businesses or services.',
      'Use categories to narrow the directory, then open a profile for full information. The site is built for scanning first, so you spend less time hunting for basics.',
      'miplaninvu.com is maintained as a top-rated listing experience: clear cards, consistent fields, and navigation that keeps you moving toward the right choice.',
    ],
    links: [
      { label: 'Site search', href: '/search' },
      { label: 'Help', href: '/help' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  article: {
    title: 'Articles, stories, and long-form reading',
    paragraphs: [
      'This section is built for stories, explainers, guides, and long-form reading across topics and interests.',
      'Articles connect with listings, images, resources, and other content types so deeper reading can lead naturally into related discovery.',
      'Use this section to browse thoughtful posts, revisit useful writing, and move into supporting content when you want more context.',
    ],
    links: [
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open image sharing', href: '/image-sharing' },
      { label: 'Browse resources', href: '/pdf' },
    ],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Classified posts help surface offers, notices, deals, and time-sensitive opportunities in a faster-scanning format.',
      'They work well alongside articles, listings, and profiles, making it easier to connect short-term posts with more structured content.',
      'Browse by category to find announcements quickly, then continue into related sections when you need more detail.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  image: {
    title: 'Image-led posts and visual stories',
    paragraphs: [
      'Image sharing highlights visual posts, galleries, and story-led content where imagery plays the lead role.',
      'These posts connect with articles, listings, and other sections so visuals can act as entry points into deeper content.',
      'Browse the latest visual updates, then continue into related stories or supporting pages for more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open classifieds', href: '/classifieds' },
    ],
  },
  profile: {
    title: 'Profiles, identities, and public pages',
    paragraphs: [
      'Profiles capture the identity behind a business, creator, brand, or project and help visitors understand who is behind the content they are exploring.',
      'These pages work as trust anchors across the site and connect naturally with stories, listings, documents, and other post types.',
      'Browse profiles to understand people and brands more clearly, then continue into related content from the same source.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'Browse image sharing', href: '/image-sharing' },
    ],
  },
  sbm: {
    title: 'Curated links and bookmarked resources',
    paragraphs: [
      'This section collects useful links, references, tools, and saved resources in a text-first browsing format.',
      'Bookmarks stay connected to the rest of the platform, making it easier to move from a saved link into related stories, listings, or resources.',
      'Use this section to organize helpful sources and discover connected content without leaving the broader site experience.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open PDFs', href: '/pdf' },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library hosts reports, guides, downloadable files, and longer-form document resources that support reading and discovery.',
      'These resources work alongside stories, listings, and profiles, helping document-style content stay connected to the rest of the platform.',
      'Browse by category to find relevant files quickly, then continue into related sections when you want more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'See listings', href: '/listings' },
      { label: 'Explore profiles', href: '/profile' },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'Short updates add quick signals that keep activity flowing across the platform.',
      'They work well with stories, listings, and resources by helping visitors move from brief updates into deeper content.',
      'Use these posts as lightweight entry points into the broader site experience.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View PDFs', href: '/pdf' },
    ],
  },
  comment: {
    title: 'Comments and contextual responses',
    paragraphs: [
      'Comments surface responses connected directly to articles and help keep discussion close to the writing it belongs to.',
      'This layer adds perspective and reaction without needing a separate standalone content format.',
      'Use comments as supporting context beneath stories, then continue exploring related content from the same topic area.',
    ],
    links: [
      { label: 'Explore articles', href: '/articles' },
      { label: 'View listings', href: '/listings' },
      { label: 'See classifieds', href: '/classifieds' },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'Used with listings, stories, profiles, and resources, they help create stronger structure across the platform.',
      'Connect organization pages with related content to build a clearer and more unified site presence.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
}
