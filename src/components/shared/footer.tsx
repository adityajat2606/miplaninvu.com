import Link from 'next/link'
import { FileText, Building2, LayoutGrid, Tag, Github, Twitter, Linkedin, Image as ImageIcon, User, ArrowRight, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const footerLinks = {
  platform: SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  })),
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
  ],
  resources: [
    { name: 'Help', href: '/help' },
    { name: 'Search', href: '/search' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
  ],
}

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
]

export function Footer() {
  const { recipe } = getFactoryState()
  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]

  if (recipe.footer === 'minimal-footer') {
    return (
      <footer className="border-t border-[#d7deca] bg-[#f4f6ef] text-[#1f2617]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
            <p className="mt-1 text-sm text-[#56604b]">{SITE_CONFIG.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {enabledTasks.slice(0, 5).map((task) => (
              <Link key={task.key} href={task.route} className="rounded-lg border border-[#d7deca] bg-white px-3 py-2 text-sm font-medium text-[#1f2617] hover:bg-[#ebefdf]">
                {task.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'dense-footer') {
    return (
      <footer className="border-t border-white/10 bg-[linear-gradient(180deg,#07111f_0%,#0b1a2e_100%)] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr_1fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/8 p-1.5">
                  <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{siteContent.footer.tagline}</p>
                </div>
              </div>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">{SITE_CONFIG.description}</p>
              {primaryTask ? (
                <Link href={primaryTask.route} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#8df0c8] px-4 py-2.5 text-sm font-semibold text-[#07111f] hover:bg-[#77dfb8]">
                  Explore {primaryTask.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Surfaces</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  {footerLinks.platform.map((item: any) => (
                    <li key={item.name}><Link href={item.href} className="flex items-center gap-2 hover:text-white">{item.icon ? <item.icon className="h-4 w-4" /> : null}{item.name}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Resources</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  {footerLinks.resources.map((item) => (
                    <li key={item.name}><Link href={item.href} className="hover:text-white">{item.name}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Connect</h3>
                <div className="mt-4 flex gap-3">
                  {socialLinks.map((item) => (
                    <Link key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/8 p-2.5 text-slate-200 hover:bg-white/12 hover:text-white">
                      <item.icon className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-5 text-sm text-slate-400">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'editorial-footer') {
    return (
      <footer className="border-t border-[#dbc6b6] bg-[linear-gradient(180deg,#fff9f0_0%,#fff1df_100%)] text-[#2f1d16]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#dbc6b6] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#72594a]">
                <Sparkles className="h-3.5 w-3.5" />
                Editorial desk
              </div>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{SITE_CONFIG.name}</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-[#72594a]">{SITE_CONFIG.description}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6d5a]">Sections</h4>
              <ul className="mt-4 space-y-3 text-sm">
                {footerLinks.platform.map((item: any) => (
                  <li key={item.name}><Link href={item.href} className="hover:text-[#2f1d16]">{item.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6d5a]">Company</h4>
              <ul className="mt-4 space-y-3 text-sm">
                {footerLinks.company.map((item) => (
                  <li key={item.name}><Link href={item.href} className="hover:text-[#2f1d16]">{item.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="relative mt-auto text-[#fffbe3]">
      <div className="h-1.5 bg-[#ffa9a9]" aria-hidden />
      <div className="relative overflow-hidden bg-[#6a425c]">
        <div
          className="pointer-events-none absolute -right-32 top-0 h-64 w-64 rounded-full bg-[#ffa9a9]/12 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-[#26271a]/25 blur-2xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-stretch lg:justify-between lg:gap-16">
            <div className="max-w-md lg:shrink-0">
              <Link href="/" className="inline-flex items-center gap-3 rounded-xl ring-1 ring-[#fffbe3]/15 transition hover:ring-[#ffa9a9]/40">
                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-[#fffbe3] p-1">
                  <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="44" height="44" className="h-full w-full object-contain" />
                </div>
                <div className="text-left">
                  <span className="block font-display text-lg font-semibold tracking-tight text-[#fffbe3]">{SITE_CONFIG.name}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ffa9a9]">{siteContent.footer.tagline}</span>
                </div>
              </Link>
              <p className="mt-5 text-sm leading-relaxed text-[#fffbe3]/75">{SITE_CONFIG.description}</p>
              <p className="mt-4 inline-flex items-center rounded-full border border-[#ffa9a9]/35 bg-[#26271a]/20 px-3 py-1 text-xs font-medium tracking-wide text-[#ffa9a9]">
                {SITE_CONFIG.domain}
              </p>
            </div>

            <div className="grid flex-1 grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 lg:max-w-xl">
              {(['platform', 'company', 'resources'] as const).map((section) => (
                <div key={section} className="relative pl-4 before:absolute before:left-0 before:top-1 before:h-[calc(100%-0.25rem)] before:w-px before:bg-gradient-to-b before:from-[#ffa9a9] before:via-[#fffbe3]/25 before:to-transparent">
                  <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffa9a9]">{section}</h3>
                  <ul className="mt-4 space-y-2.5 text-sm">
                    {footerLinks[section].map((item: any) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="group inline-flex items-center gap-2 text-[#fffbe3]/88 transition-colors hover:text-[#ffa9a9]"
                        >
                          {item.icon ? (
                            <item.icon className="h-3.5 w-3.5 shrink-0 text-[#ffa9a9]/70 group-hover:text-[#ffa9a9]" aria-hidden />
                          ) : null}
                          <span className="border-b border-transparent group-hover:border-[#ffa9a9]/50">{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#fffbe3]/10 bg-[#26271a] px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-xs text-[#fffbe3]/55 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[#fffbe3]/70">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Legal">
            {footerLinks.legal.map((item) => (
              <Link key={item.name} href={item.href} className="text-[#fffbe3]/60 transition hover:text-[#ffa9a9]">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
