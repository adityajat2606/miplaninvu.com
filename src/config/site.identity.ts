export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'mi4x8q2v7k',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Mi Plan Invu',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Top-rated business listings on miplaninvu.com',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'miplaninvu.com is a top-rated listing site where people find and compare verified businesses, services, and local spots—clear details, fast scanning, and trustworthy profiles in one directory.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'miplaninvu.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://miplaninvu.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

