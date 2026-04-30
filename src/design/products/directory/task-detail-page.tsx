'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag, Building, Calendar, CheckCircle, Info } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { getDirectoryUiPreset } from '@/design/directory-ui'
import { useState } from 'react'

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
  const ui = getDirectoryUiPreset()
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
  const stats = [category || taskLabel, location ? 'Mapped' : 'Directory', website ? 'Website' : 'Profile']
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className={`min-h-screen ${ui.shell}`}>
      <SchemaJsonLd data={schemaPayload} />
      <main className="pb-16">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link href={taskRoute} className="inline-flex items-center gap-2 text-sm font-semibold opacity-85 transition hover:opacity-100">
            <ArrowLeft className="h-4 w-4" />
            Back to {taskLabel}
          </Link>
          <h1 className="mt-6 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{post.title}</h1>
          {location ? (
            <div className="mt-3 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="text-base">{location}</span>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(location)}`} target="_blank" rel="noreferrer" className="ml-2 text-sm font-semibold underline hover:no-underline">
                VIEW ON MAP
              </a>
            </div>
          ) : null}
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-6 rounded-2xl border bg-white p-6 shadow-lg sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {category ? (
                <div className={`rounded-xl border px-4 py-3 ${ui.chip}`}>
                  <p className="text-xs font-semibold uppercase opacity-60">Category</p>
                  <p className="mt-1 text-sm font-semibold">{category}</p>
                </div>
              ) : null}
              {location ? (
                <div className={`rounded-xl border px-4 py-3 ${ui.chip}`}>
                  <p className="text-xs font-semibold uppercase opacity-60">Location</p>
                  <p className="mt-1 text-sm font-semibold">{location.split(',').slice(0, 2).join(',')}</p>
                </div>
              ) : null}
              {website ? (
                <div className={`rounded-xl border px-4 py-3 ${ui.chip}`}>
                  <p className="text-xs font-semibold uppercase opacity-60">Website</p>
                  <p className="mt-1 text-sm font-semibold">Available</p>
                </div>
              ) : null}
              <div className={`rounded-xl border px-4 py-3 ${ui.chip}`}>
                <p className="text-xs font-semibold uppercase opacity-60">Status</p>
                <p className="mt-1 text-sm font-semibold flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Active
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {stats.map((item) => (
                <span key={item} className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider ${ui.chip}`}>
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {phone ? (
                <a href={`tel:${phone}`} className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white ${ui.primaryButton}`}>
                  <Phone className="h-4 w-4" />
                  CONTACT OWNER
                </a>
              ) : null}
              {email ? (
                <a href={`mailto:${email}`} className={`inline-flex items-center gap-2 rounded-full border-2 px-6 py-3 text-sm font-semibold ${ui.primaryButton.replace('bg-', 'border-').replace('text-', 'text-')} hover:bg-opacity-10`}>
                  <Mail className="h-4 w-4" />
                  VIEW CONTACT
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 border-b overflow-x-auto">
            {['photos', 'overview', 'amenities', 'info', 'description'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-semibold uppercase tracking-wider transition ${
                  activeTab === tab
                    ? 'border-b-2 border-current'
                    : 'opacity-50 hover:opacity-75'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'photos' && (
          <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className={`text-2xl font-semibold ${ui.title}`}>Photos</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {images.map((image, index) => (
                <div key={image} className={`relative overflow-hidden rounded-xl border border-black/10 bg-white shadow-lg ${index === 0 ? 'col-span-2 row-span-2' : 'aspect-square'}`}>
                  <ContentImage src={image} alt={`${post.title} photo ${index + 1}`} fill className="object-cover" priority={index === 0} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className={`text-2xl font-semibold ${ui.title}`}>Property Overview</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category ? (
                <div className={`rounded-xl border p-4 ${ui.chip}`}>
                  <p className="text-xs font-semibold uppercase opacity-60">Type</p>
                  <p className="mt-1 text-sm font-medium">{category}</p>
                </div>
              ) : null}
              {location ? (
                <div className={`rounded-xl border p-4 ${ui.chip}`}>
                  <p className="text-xs font-semibold uppercase opacity-60">Location</p>
                  <p className="mt-1 text-sm font-medium">{location}</p>
                </div>
              ) : null}
              <div className={`rounded-xl border p-4 ${ui.chip}`}>
                <p className="text-xs font-semibold uppercase opacity-60">Status</p>
                <p className="mt-1 text-sm font-medium">Active</p>
              </div>
              {website ? (
                <div className={`rounded-xl border p-4 ${ui.chip}`}>
                  <p className="text-xs font-semibold uppercase opacity-60">Website</p>
                  <p className="mt-1 text-sm font-medium">Available</p>
                </div>
              ) : null}
              {phone ? (
                <div className={`rounded-xl border p-4 ${ui.chip}`}>
                  <p className="text-xs font-semibold uppercase opacity-60">Phone</p>
                  <p className="mt-1 text-sm font-medium">{phone}</p>
                </div>
              ) : null}
              {email ? (
                <div className={`rounded-xl border p-4 ${ui.chip}`}>
                  <p className="text-xs font-semibold uppercase opacity-60">Email</p>
                  <p className="mt-1 text-sm font-medium">{email}</p>
                </div>
              ) : null}
            </div>
          </div>
        )}

        {activeTab === 'amenities' && (
          <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className={`text-2xl font-semibold ${ui.title}`}>Amenities</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.length > 0 ? (
                highlights.map((item) => (
                  <div key={item} className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${ui.chip}`}>
                    <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))
              ) : (
                <p className={`col-span-full text-sm ${ui.muted}`}>No amenities listed</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className={`text-2xl font-semibold ${ui.title}`}>Additional Information</h2>
            <div className={`mt-6 rounded-xl border p-6 ${ui.chip}`}>
              <p className="text-xs font-semibold uppercase opacity-60">Other Info</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {category ? (
                  <div>
                    <p className="text-xs font-semibold uppercase opacity-60">Category</p>
                    <p className="mt-1 text-sm font-medium">{category}</p>
                  </div>
                ) : null}
                {website ? (
                  <div>
                    <p className="text-xs font-semibold uppercase opacity-60">Website</p>
                    <p className="mt-1 text-sm font-medium">{website}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'description' && (
          <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className={`text-2xl font-semibold ${ui.title}`}>Property Description</h2>
            <div className={`mt-6 rounded-xl border p-6 ${ui.chip}`}>
              <div className={`text-base leading-8 ${ui.muted}`} dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </div>
        )}

        {mapEmbedUrl && (
          <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className={`text-2xl font-semibold ${ui.title}`}>Location Map</h2>
            <div className={`mt-6 overflow-hidden rounded-2xl border ${ui.detailPanel}`}>
              <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[400px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        )}

        {related.length ? (
          <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className={`text-3xl font-semibold ${ui.title}`}>Similar {taskLabel}s</h2>
              <p className={`mt-2 text-sm ${ui.muted}`}>Discover more options in your area</p>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch]">
              {related.map((item) => (
                <div key={item.id} className="shrink-0 w-80">
                  <TaskPostCard post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} compact />
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
