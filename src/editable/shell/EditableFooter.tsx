'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      {/* CTA band */}
      <div className="border-b border-[var(--editable-border)]">
        <div className="mx-auto flex max-w-[var(--editable-container)] flex-col items-start justify-between gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="editable-display text-2xl font-normal tracking-[-0.02em] sm:text-3xl">Have something worth listing?</h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-white/60">Add a business listing or save a bookmark — it takes a couple of minutes and reaches the whole {SITE_CONFIG.name} community.</p>
          </div>
          <Link
            href="/create"
            className="inline-flex shrink-0 items-center gap-2 rounded-[var(--editable-radius-pill)] bg-white px-6 py-3 text-sm font-semibold text-[#111111] transition hover:brightness-95"
          >
            Get started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-[var(--editable-radius-control)] border border-white/15 bg-white/5">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-9 w-9 object-contain" />
            </span>
            <span className="editable-display text-xl font-normal tracking-[-0.01em]">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/55">{globalContent.footer?.description || SITE_CONFIG.description}</p>
        </div>

        <div>
          <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">Explore</h3>
          <div className="mt-5 grid gap-3">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition hover:text-white">Home</Link>
            <Link href="/listings" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition hover:text-white">Categories</Link>
            <Link href="/search" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition hover:text-white">Search</Link>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">Company</h3>
          <div className="mt-5 grid gap-3">
            <Link href="/about" className="text-sm font-medium text-white/70 transition hover:text-white">About</Link>
            <Link href="/contact" className="text-sm font-medium text-white/70 transition hover:text-white">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">Account</h3>
          <div className="mt-5 grid gap-3">
            {session ? (
              <>
                <Link href="/create" className="text-sm font-medium text-white/70 transition hover:text-white">Submit a post</Link>
                <button type="button" onClick={logout} className="text-left text-sm font-medium text-white/70 transition hover:text-white">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-white/70 transition hover:text-white">Sign in</Link>
                <Link href="/signup" className="text-sm font-medium text-white/70 transition hover:text-white">Sign up</Link>
              </>
            )}
            <a href="/contact" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition hover:text-white">
              <Mail className="h-3.5 w-3.5" /> Get in touch
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--editable-border)] px-4 py-6 text-center text-xs font-medium text-white/40">
        © {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
