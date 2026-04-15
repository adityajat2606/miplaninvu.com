import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SchemaJsonLd data={schemaPayload} />

      <main className="pb-16">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <Link
            href={taskRoute}
            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#6a425c] transition-colors hover:text-[#26271a]"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
            Back to {taskLabel}
            <span className="h-px w-8 bg-[#ffa9a9]/70 transition-all group-hover:w-10 group-hover:bg-[#6a425c]/40" aria-hidden />
          </Link>
        </div>

        {/* Split hero: scan-friendly image + “business card” identity column */}
        <section className="relative mx-auto max-w-[1600px] lg:px-6">
          <div className="grid overflow-hidden rounded-none border-y border-[#6a425c]/10 bg-white shadow-[0_24px_80px_rgba(38,39,26,0.08)] lg:grid-cols-[1.12fr_0.88fr] lg:rounded-[2.5rem] lg:border">
            <div className="relative min-h-[280px] lg:min-h-[min(520px,78vh)]">
              <ContentImage src={images[0]} alt={post.title} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#26271a]/35 via-transparent to-[#ffa9a9]/10" aria-hidden />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 lg:bottom-8 lg:left-8">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-[#fffbe3]/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#26271a] shadow-sm backdrop-blur-sm">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  {location ? 'On the map' : 'Directory entry'}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center bg-[#6a425c] px-6 py-10 text-[#fffbe3] sm:px-10 lg:px-12 lg:py-14">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#ffa9a9]/95">{category || taskLabel}</p>
              <h1 className="mt-4 font-display text-3xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-4xl lg:text-[2.65rem]">
                {post.title}
              </h1>
              {location ? (
                <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-[#fffbe3]/88">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#ffa9a9]" aria-hidden />
                  {location}
                </p>
              ) : null}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#26271a]/35 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#fffbe3] ring-1 ring-[#ffa9a9]/35">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                  Verified listing
                </span>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                {website ? (
                  <a
                    href={website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#ffa9a9] px-5 py-3 text-sm font-semibold text-[#26271a] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-transform duration-200 hover:scale-[1.02] hover:bg-[#ff9393]"
                  >
                    Visit website
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                ) : null}
                <Link
                  href={taskRoute}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#fffbe3]/35 bg-transparent px-5 py-3 text-sm font-semibold text-[#fffbe3] transition-colors hover:bg-[#fffbe3]/12"
                >
                  More in {taskLabel}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {images.length > 1 ? (
          <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6a425c]/75">Gallery</p>
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
              {images.slice(1, 8).map((image) => (
                <div
                  key={image}
                  className="relative h-24 w-36 shrink-0 overflow-hidden rounded-2xl border border-[#6a425c]/12 bg-[#fffbe3] shadow-sm sm:h-28 sm:w-44"
                >
                  <ContentImage src={image} alt={`${post.title} — additional photo`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-start lg:gap-14">
            <div className="space-y-8">
              <article className="relative overflow-hidden rounded-[2rem] border border-[#6a425c]/12 bg-white/90 p-7 shadow-[0_18px_50px_rgba(38,39,26,0.06)] sm:p-9">
                <div className="absolute left-0 top-8 h-[calc(100%-4rem)] w-1 rounded-full bg-gradient-to-b from-[#ffa9a9] via-[#6a425c]/35 to-transparent" aria-hidden />
                <p className="pl-5 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#6a425c]/75">About this {task}</p>
                <h2 className="mt-4 pl-5 font-display text-2xl font-semibold tracking-[-0.03em] text-[#26271a] sm:text-3xl">
                  Structured details instead of a generic content block.
                </h2>
                <p className="mt-5 pl-5 text-sm leading-8 text-[#6a425c]">{description}</p>
                {highlights.length ? (
                  <ul className="mt-8 grid gap-3 pl-5 sm:grid-cols-2">
                    {highlights.slice(0, 4).map((item) => (
                      <li
                        key={item}
                        className="rounded-2xl border border-[#ffa9a9]/35 bg-[#fffbe3]/55 px-4 py-3 text-sm text-[#26271a] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </div>

            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-[2rem] border border-[#6a425c]/12 bg-[linear-gradient(165deg,#ffffff_0%,#fffbe3_100%)] p-7 shadow-[0_22px_55px_rgba(106,66,92,0.1)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6a425c]/75">Contact &amp; hours</p>
                <div className="mt-6 grid gap-3">
                  {location ? (
                    <div className="flex items-start gap-3 rounded-2xl border border-[#6a425c]/10 bg-white/80 px-4 py-3 text-sm text-[#26271a]">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#6a425c]" aria-hidden />
                      {location}
                    </div>
                  ) : null}
                  {phone ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-[#6a425c]/10 bg-white/80 px-4 py-3 text-sm text-[#26271a]">
                      <Phone className="h-4 w-4 shrink-0 text-[#6a425c]" aria-hidden />
                      {phone}
                    </div>
                  ) : null}
                  {email ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-[#6a425c]/10 bg-white/80 px-4 py-3 text-sm text-[#26271a]">
                      <Mail className="h-4 w-4 shrink-0 text-[#6a425c]" aria-hidden />
                      {email}
                    </div>
                  ) : null}
                  {website ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-[#6a425c]/10 bg-white/80 px-4 py-3 text-sm text-[#26271a]">
                      <Globe className="h-4 w-4 shrink-0 text-[#6a425c]" aria-hidden />
                      {website}
                    </div>
                  ) : null}
                </div>
              </div>

              {mapEmbedUrl ? (
                <div className="overflow-hidden rounded-[2rem] border border-[#6a425c]/12 bg-white shadow-[0_22px_55px_rgba(38,39,26,0.07)] ring-4 ring-[#ffa9a9]/15">
                  <div className="border-b border-[#6a425c]/10 bg-[#fffbe3]/70 px-6 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6a425c]/75">Location</p>
                  </div>
                  <iframe
                    src={mapEmbedUrl}
                    title={`${post.title} map`}
                    className="h-[300px] w-full border-0 sm:h-[320px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              ) : null}

              <div className="rounded-[2rem] border border-dashed border-[#ffa9a9]/55 bg-[#fffbe3]/40 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6a425c]/75">Trust cues</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Clear contact paths', 'Structured business details', 'Map-ready when available', 'Nearby matches below'].map((item) => (
                    <span key={item} className="rounded-full border border-[#6a425c]/12 bg-white/90 px-3 py-1.5 text-xs font-medium text-[#26271a] shadow-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {related.length ? (
          <section className="mx-auto mt-16 max-w-7xl border-t border-[#6a425c]/10 px-4 pt-14 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6a425c]/75">Related surfaces</p>
                <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] text-[#26271a] sm:text-3xl">
                  Keep browsing nearby matches.
                </h2>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#6a425c]/15 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6a425c]">
                <Tag className="h-3.5 w-3.5" aria-hidden />
                {taskLabel}
              </span>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
