'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, User, FileText, Building2, LayoutGrid, Tag, Image as ImageIcon, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

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

const variantClasses = {
  'compact-bar': {
    shell: 'border-b border-slate-200/80 bg-white/88 text-slate-950 backdrop-blur-xl',
    logo: 'rounded-2xl border border-slate-200 bg-white shadow-sm',
    active: 'bg-slate-950 text-white',
    idle: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
    cta: 'rounded-full bg-slate-950 text-white hover:bg-slate-800',
    mobile: 'border-t border-slate-200/70 bg-white/95',
  },
  'editorial-bar': {
    shell: 'border-b border-[#d7c4b3] bg-[#fff7ee]/90 text-[#2f1d16] backdrop-blur-xl',
    logo: 'rounded-full border border-[#dbc6b6] bg-white shadow-sm',
    active: 'bg-[#2f1d16] text-[#fff4e4]',
    idle: 'text-[#72594a] hover:bg-[#f2e5d4] hover:text-[#2f1d16]',
    cta: 'rounded-full bg-[#2f1d16] text-[#fff4e4] hover:bg-[#452920]',
    mobile: 'border-t border-[#dbc6b6] bg-[#fff7ee]',
  },
  'floating-bar': {
    shell: 'border-b border-transparent bg-transparent text-white',
    logo: 'rounded-[1.35rem] border border-white/12 bg-white/8 shadow-[0_16px_48px_rgba(15,23,42,0.22)] backdrop-blur',
    active: 'bg-[#8df0c8] text-[#07111f]',
    idle: 'text-slate-200 hover:bg-white/10 hover:text-white',
    cta: 'rounded-full bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    mobile: 'border-t border-white/10 bg-[#09101d]/96',
  },
  'utility-bar': {
    shell: 'border-b border-[#d7deca] bg-[#f4f6ef]/94 text-[#1f2617] backdrop-blur-xl',
    logo: 'rounded-xl border border-[#d7deca] bg-white shadow-sm',
    active: 'bg-[#1f2617] text-[#edf5dc]',
    idle: 'text-[#56604b] hover:bg-[#e7edd9] hover:text-[#1f2617]',
    cta: 'rounded-lg bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
    mobile: 'border-t border-[#d7deca] bg-[#f4f6ef]',
  },
} as const

const directoryPalette = {
  'directory-clean': {
    shell:
      'border border-[#ffa9a9]/45 bg-[#6a425c] text-[#fffbe3] shadow-[0_18px_50px_rgba(38,39,26,0.35)]',
    logo: 'rounded-[1.15rem] border border-[#fffbe3]/30 bg-[#26271a]/35 shadow-inner',
    nav: 'text-[#fffbe3]/88 hover:text-[#ffa9a9]',
    navActive: 'text-[#ffa9a9]',
    cta: 'bg-[#ffa9a9] text-[#26271a] shadow-[0_6px_22px_rgba(0,0,0,0.22)] hover:bg-[#ff9494]',
    post: 'border border-[#fffbe3]/18 bg-[#fffbe3]/10 text-[#fffbe3] hover:bg-[#fffbe3]/18',
    mobile: 'border-t border-[#ffa9a9]/25 bg-[#5a3a50]/98',
    signIn: 'text-[#fffbe3] hover:bg-[#fffbe3]/12 hover:text-[#fffbe3]',
    menuBtn: 'text-[#fffbe3] hover:bg-[#fffbe3]/10',
  },
  'market-utility': {
    shell: 'border border-[#d7deca] bg-[#f4f6ef] text-[#1f2617] shadow-[0_14px_40px_rgba(64,76,34,0.12)]',
    logo: 'rounded-xl border border-[#d7deca] bg-white',
    nav: 'text-[#56604b] hover:text-[#1f2617]',
    navActive: 'text-[#1f2617]',
    cta: 'bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
    post: 'border border-[#d7deca] bg-white text-[#1f2617] hover:bg-[#eef2e4]',
    mobile: 'border-t border-[#d7deca] bg-[#eef3e8]',
    signIn: 'text-[#1f2617] hover:bg-[#1f2617]/8',
    menuBtn: 'text-[#1f2617] hover:bg-black/5',
  },
} as const

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const { recipe } = getFactoryState()

  const navigation = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile'), [])
  const primaryNavigation = navigation.slice(0, 5)
  const mobileNavigation = navigation.map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  }))
  const primaryTask = SITE_CONFIG.tasks.find((task) => task.key === recipe.primaryTask && task.enabled) || primaryNavigation[0]
  const isDirectoryProduct = recipe.homeLayout === 'listing-home' || recipe.homeLayout === 'classified-home'
  const utilityLinks = [
    { name: 'About', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ]

  if (isDirectoryProduct) {
    const palette = directoryPalette[(recipe.brandPack === 'market-utility' ? 'market-utility' : 'directory-clean') as keyof typeof directoryPalette]

    return (
      <header className="sticky top-0 z-50 w-full pt-3 px-3 sm:px-5 sm:pt-4 lg:px-8">
        <div className={cn('mx-auto max-w-7xl overflow-hidden rounded-2xl sm:rounded-3xl', palette.shell)}>
          <nav className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-4 px-3 sm:h-20 sm:px-6">
            <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-10">
              <Link href="/" className="flex min-w-0 shrink-0 items-center gap-3">
                <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden p-1.5 sm:h-12 sm:w-12', palette.logo)}>
                  <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
                </div>
                <div className="min-w-0 hidden sm:block">
                  <span className="block truncate text-lg font-semibold text-[#fffbe3] sm:text-xl">{SITE_CONFIG.name}</span>
                  <span className="block text-[10px] uppercase tracking-[0.24em] text-[#fffbe3]/55">{siteContent.navbar.tagline}</span>
                </div>
              </Link>

              <div className="hidden items-center gap-4 md:flex lg:gap-5">
                {primaryNavigation.slice(0, 5).map((task) => {
                  const isActive = pathname.startsWith(task.route)
                  return (
                    <Link
                      key={task.key}
                      href={task.route}
                      className={cn('text-sm font-semibold transition-colors', isActive ? palette.navActive : palette.nav)}
                    >
                      {task.label}
                    </Link>
                  )
                })}
                {utilityLinks.map((item) => {
                  const isActive = pathname.startsWith(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn('text-sm font-semibold transition-colors', isActive ? palette.navActive : palette.nav)}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
              <form action="/search" className="hidden items-center gap-2 lg:flex">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-current/55" />
                  <input
                    type="search"
                    name="q"
                    placeholder="Search..."
                    className="h-10 w-48 rounded-full border border-current/20 bg-white/75 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#ffa9a9]/45"
                  />
                </div>
              </form>

              {isAuthenticated ? (
                <NavbarAuthControls />
              ) : (
                <div className="hidden items-center gap-2 md:flex">
                  <Button variant="ghost" size="sm" asChild className={cn('rounded-full px-4', palette.signIn)}>
                    <Link href="/login">Sign In</Link>
                  </Button>
                </div>
              )}

              <Button
                variant="ghost"
                size="icon"
                className={cn('rounded-full lg:hidden', palette.menuBtn)}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </nav>

          {isMobileMenuOpen ? (
            <div className={palette.mobile}>
              <div className="space-y-2 px-3 py-4 sm:px-4">
                <form action="/search" className="mb-3 flex gap-2">
                  <input
                    type="search"
                    name="q"
                    placeholder="Search..."
                    className="h-11 min-w-0 flex-1 rounded-2xl border border-[#fffbe3]/22 bg-[#fffbe3]/12 px-4 text-sm text-[#fffbe3] placeholder:text-[#fffbe3]/70 focus:outline-none focus:ring-2 focus:ring-[#ffa9a9]/50"
                  />
                  <Button type="submit" size="sm" className="h-11 rounded-2xl bg-[#ffa9a9] px-4 text-[#26271a] hover:bg-[#ff9494]">
                    Go
                  </Button>
                </form>
                {mobileNavigation.map((item) => {
                  const isActive = pathname.startsWith(item.href)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors',
                        isActive ? 'bg-[#ffa9a9] text-[#26271a]' : palette.post,
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {item.name}
                    </Link>
                  )
                })}
                {utilityLinks.map((item) => {
                  const isActive = pathname.startsWith(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center rounded-2xl px-4 py-3 text-sm font-semibold transition-colors',
                        isActive ? 'bg-[#ffa9a9] text-[#26271a]' : palette.post,
                      )}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          ) : null}
        </div>
      </header>
    )
  }

  const style = variantClasses[recipe.navbar]
  const isFloating = recipe.navbar === 'floating-bar'
  const isEditorial = recipe.navbar === 'editorial-bar'
  const isUtility = recipe.navbar === 'utility-bar'

  return (
    <header className={cn('sticky top-0 z-50 w-full', style.shell)}>
      <nav className={cn('mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8', isFloating ? 'h-24 pt-4' : 'h-20')}>
        <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-7">
          <Link href="/" className="flex shrink-0 items-center gap-3 whitespace-nowrap pr-2">
            <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden p-1.5', style.logo)}>
              <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0 hidden sm:block">
              <span className="block truncate text-xl font-semibold">{SITE_CONFIG.name}</span>
              <span className="hidden text-[10px] uppercase tracking-[0.28em] opacity-70 sm:block">{siteContent.navbar.tagline}</span>
            </div>
          </Link>

          {isEditorial ? (
            <div className="hidden min-w-0 flex-1 items-center gap-4 xl:flex">
              <div className="h-px flex-1 bg-[#d8c8bb]" />
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('text-sm font-semibold uppercase tracking-[0.18em] transition-colors', isActive ? 'text-[#2f1d16]' : 'text-[#7b6254] hover:text-[#2f1d16]')}>
                    {task.label}
                  </Link>
                )
              })}
              {utilityLinks.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link key={item.href} href={item.href} className={cn('text-sm font-semibold uppercase tracking-[0.18em] transition-colors', isActive ? 'text-[#2f1d16]' : 'text-[#7b6254] hover:text-[#2f1d16]')}>
                    {item.name}
                  </Link>
                )
              })}
              <div className="h-px flex-1 bg-[#d8c8bb]" />
            </div>
          ) : isFloating ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
              {utilityLinks.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link key={item.href} href={item.href} className={cn('flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          ) : isUtility ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('rounded-lg px-3 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    {task.label}
                  </Link>
                )
              })}
              {utilityLinks.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link key={item.href} href={item.href} className={cn('rounded-lg px-3 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    {item.name}
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="hidden min-w-0 flex-1 items-center gap-1 overflow-hidden xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors whitespace-nowrap', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
              {utilityLinks.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link key={item.href} href={item.href} className={cn('flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors whitespace-nowrap', isActive ? style.active : style.idle)}>
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <form action="/search" className="hidden items-center gap-2 md:flex">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-current/55" />
              <input
                type="search"
                name="q"
                placeholder="Search..."
                className="h-10 w-52 rounded-full border border-current/20 bg-background/80 pl-9 pr-3 text-sm placeholder:text-current/60 focus:outline-none focus:ring-2 focus:ring-current/20"
              />
            </div>
          </form>

          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild className="rounded-full px-4">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className={style.cta}>
                <Link href="/register">{isEditorial ? 'Subscribe' : isUtility ? 'Post Now' : 'Get Started'}</Link>
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isFloating && primaryTask ? (
        <div className="mx-auto hidden max-w-7xl px-4 pb-3 sm:px-6 lg:block lg:px-8">
          <Link href={primaryTask.route} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 backdrop-blur hover:bg-white/12">
            Featured surface
            <span>{primaryTask.label}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : null}

      {isMobileMenuOpen && (
        <div className={style.mobile}>
          <div className="space-y-2 px-4 py-4">
            <form action="/search" className="mb-3 flex gap-2">
              <input
                type="search"
                name="q"
                placeholder="Search the site..."
                className="h-11 min-w-0 flex-1 rounded-2xl border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <Button type="submit" size="sm" className="h-11 rounded-2xl px-4">
                Go
              </Button>
            </form>
            {mobileNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
            {utilityLinks.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
