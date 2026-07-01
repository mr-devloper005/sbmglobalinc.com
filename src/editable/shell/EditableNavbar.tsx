'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X, PlusCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  
  const navItems = [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "About",
      href: "/about"
    },
    {
      label: "Contact",
      href: "/contact"
    }
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 text-[var(--editable-nav-text)] transition-[box-shadow,background-color,backdrop-filter] duration-300 ${
        scrolled ? 'editable-nav-scrolled bg-[#111111]/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav
        className={`mx-auto flex w-full max-w-[var(--editable-container)] items-center gap-6 px-4 transition-[min-height] duration-300 sm:px-6 lg:px-8 ${
          scrolled ? 'min-h-[64px]' : 'min-h-[84px]'
        }`}
      >
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-[var(--editable-radius-control)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition group-hover:border-[var(--slot4-accent)]/50">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-9 w-9 object-contain" />
          </span>
          <span className="hidden min-w-0 md:block">
            <span className="editable-display block max-w-[200px] truncate text-lg font-medium leading-none tracking-[-0.01em]">{SITE_CONFIG.name}</span>
            <span className="mt-1 block max-w-[200px] truncate text-[11px] font-medium text-[var(--slot4-muted-text)]">
              {globalContent.nav?.tagline || SITE_CONFIG.tagline}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-[var(--editable-radius-pill)] border border-[var(--editable-border)] p-1 lg:flex">
          {navItems.slice(0, 5).map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-[var(--editable-radius-pill)] px-4 py-2 text-sm font-medium transition ${
                  active
                    ? 'bg-[var(--slot4-page-text)] text-[var(--slot4-page-bg)]'
                    : 'text-[var(--slot4-muted-text)] hover:text-[var(--slot4-page-text)]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <form action="/search" className="mx-auto hidden min-w-0 max-w-sm flex-1 md:flex">
          <label className="flex w-full items-center gap-2 rounded-[var(--editable-radius-pill)] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-2.5 transition focus-within:border-[var(--slot4-accent)]/50">
            <Search className="h-4 w-4 shrink-0 text-[var(--slot4-muted-text)]" />
            <input
              name="q"
              type="search"
              placeholder="Search listings & bookmarks"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-[var(--slot4-muted-text)]"
            />
          </label>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-2.5">
          {session ? (
            <>
              <Link
                href="/create"
                className="hidden items-center gap-2 rounded-[var(--editable-radius-pill)] bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-semibold text-[var(--editable-cta-text)] transition hover:brightness-95 sm:inline-flex"
              >
                <PlusCircle className="h-4 w-4" /> Submit
              </Link>
              <button
                type="button"
                onClick={logout}
                className="hidden items-center gap-2 px-3 py-2.5 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] sm:inline-flex"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden items-center gap-2 px-3 py-2.5 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] sm:inline-flex"
              >
                <LogIn className="h-4 w-4" /> Sign in
              </Link>
              <Link
                href="/signup"
                className="hidden items-center gap-2 rounded-[var(--editable-radius-pill)] bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-semibold text-[var(--editable-cta-text)] transition hover:brightness-95 sm:inline-flex"
              >
                <UserPlus className="h-4 w-4" /> Sign up
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-[var(--editable-radius-control)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-2.5 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-5 lg:hidden">
          <form action="/search" className="mb-5 flex items-center gap-2 rounded-[var(--editable-radius-pill)] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-2.5">
            <Search className="h-4 w-4 text-[var(--slot4-muted-text)]" />
            <input name="q" type="search" placeholder="Search listings & bookmarks" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-muted-text)]" />
          </form>
          <div className="grid gap-1">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: 'Submit', href: '/create' }] : [{ label: 'Sign in', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-[var(--editable-radius-control)] px-4 py-3 text-sm font-medium transition ${
                    active
                      ? 'bg-[var(--slot4-page-text)] text-[var(--slot4-page-bg)]'
                      : 'text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-panel-bg)] hover:text-[var(--slot4-page-text)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      ) : null}
    </header>
  )
}
