'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'

export default function AccountPage() {
  const router = useRouter()
  const { user, logout, isAuthenticated } = useAuth()

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-background">
        <NavbarShell />
        <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <h1 className="text-2xl font-semibold text-foreground">Login details</h1>
            <p className="mt-3 text-sm text-muted-foreground">You are not signed in. Please log in to view your account details.</p>
            <Button asChild className="mt-6">
              <Link href="/login">Go to Login</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-foreground">Login details</h1>
          <p className="mt-2 text-sm text-muted-foreground">Basic account details for the currently signed-in user.</p>

          <div className="mt-6 flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-base font-semibold text-foreground">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 rounded-xl border border-border p-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">User ID</span>
              <span className="font-medium text-foreground">{user.id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Joined</span>
              <span className="font-medium text-foreground">{user.joinedDate || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Verified</span>
              <span className="font-medium text-foreground">{user.isVerified ? 'Yes' : 'No'}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <Link href="/settings">Edit profile</Link>
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                logout()
                router.push('/login')
              }}
            >
              Sign out
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
