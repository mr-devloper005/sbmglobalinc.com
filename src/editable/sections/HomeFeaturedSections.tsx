import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Bookmark, Building2, CheckCircle2, Compass, Layers, Search, ShieldCheck, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { EditableScrollReveal } from '@/editable/components/EditableScrollReveal'

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

/* ------------------------------ How it works ----------------------------- */
const steps = [
  { icon: Sparkles, title: 'Submit', copy: 'Add a business listing or save a bookmark worth sharing — free, no gatekeeping.' },
  { icon: ShieldCheck, title: 'Get reviewed', copy: 'Every submission is checked against our category guidelines before it goes live.' },
  { icon: Layers, title: 'Get indexed', copy: 'Published posts join the searchable directory, sorted by category and freshness.' },
  { icon: Compass, title: 'Get discovered', copy: 'Real visitors browse, search and follow through to what you shared.' },
]

export function EditableHowItWorks() {
  return (
    <section className="border-t border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]">
      <div className={`py-16 sm:py-20 ${container}`}>
        <EditableScrollReveal className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--slot4-accent)]">How it works</p>
          <h2 className="editable-display mt-3 text-3xl font-normal tracking-[-0.02em] sm:text-4xl">From submission to discovery</h2>
        </EditableScrollReveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <EditableScrollReveal key={step.title} delayMs={index * 80} className="relative rounded-[var(--editable-radius-card)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                <step.icon className="h-5 w-5" />
              </span>
              <p className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-[var(--slot4-muted-text)]">Step {String(index + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 text-lg font-semibold tracking-[-0.01em]">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{step.copy}</p>
            </EditableScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- Featured grid ----------------------------- */
export function EditableFeaturedGrid({
  eyebrow,
  title,
  description,
  posts,
  task,
  route,
  tone = 'default',
}: {
  eyebrow: string
  title: string
  description: string
  posts: SitePost[]
  task: TaskKey
  route: string
  tone?: 'default' | 'warm'
}) {
  return (
    <section className={`border-t border-[var(--editable-border)] ${tone === 'warm' ? 'bg-[var(--slot4-warm)]' : 'bg-[var(--slot4-surface-bg)]'}`}>
      <div className={`py-16 sm:py-20 ${container}`}>
        <EditableScrollReveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{eyebrow}</p>
            <h2 className="editable-display mt-3 text-3xl font-normal tracking-[-0.02em] sm:text-4xl">{title}</h2>
            <p className="mt-3 text-[var(--slot4-muted-text)]">{description}</p>
          </div>
          <Link href={route} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[var(--slot4-accent)] hover:underline">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </EditableScrollReveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {posts.slice(0, 4).map((post, index) => (
            <EditableScrollReveal key={post.id || post.slug} delayMs={index * 70}>
              <FeaturedCard post={post} task={task} href={postHref(task, post, route)} />
            </EditableScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedCard({ post, task, href }: { post: SitePost; task: TaskKey; href: string }) {
  const image = getEditablePostImage(post)
  const category = getEditableCategory(post)
  const Icon = task === 'listing' ? Building2 : Bookmark
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--editable-radius-card)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1.5 hover:border-[var(--slot4-accent)]/30"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" loading="lazy" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
          <Icon className="h-3 w-3 text-[var(--slot4-accent)]" /> {category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug tracking-[-0.01em] group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 100)}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[var(--slot4-accent)]">
          {task === 'listing' ? 'View listing' : 'View bookmark'} <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}

/* --------------------------- Contribute cards ---------------------------- */
export function EditableContributeCards() {
  const options = [
    { icon: Building2, title: 'Submit a listing', copy: 'Put your business in front of people actively looking for one nearby.', href: '/create' },
    { icon: Bookmark, title: 'Save a bookmark', copy: 'Share a resource, article or tool you think is worth other people finding.', href: '/create' },
    { icon: Search, title: 'Browse everything', copy: 'Search across every listing and bookmark on the directory in one place.', href: '/search' },
  ]
  return (
    <section className="border-t border-[var(--editable-border)] bg-[var(--slot4-warm)]">
      <div className={`py-16 sm:py-20 ${container}`}>
        <EditableScrollReveal className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--slot4-accent)]">Get involved</p>
          <h2 className="editable-display mt-3 text-3xl font-normal tracking-[-0.02em] sm:text-4xl">Choose how you contribute</h2>
        </EditableScrollReveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {options.map((option, index) => (
            <EditableScrollReveal key={option.title} delayMs={index * 80}>
              <Link
                href={option.href}
                className="group flex h-full flex-col rounded-[var(--editable-radius-card)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 transition duration-300 hover:-translate-y-1.5 hover:border-[var(--slot4-accent)]/30"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                  <option.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em]">{option.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{option.copy}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--slot4-accent)]">
                  Start now <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            </EditableScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ Latest rail ------------------------------ */
export function EditableLatestSubmissions({
  submissions,
  routes,
}: {
  submissions: Array<{ post: SitePost; task: TaskKey }>
  routes: { listing: string; sbm: string }
}) {
  return (
    <section className="border-t border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]">
      <div className={`py-16 sm:py-20 ${container}`}>
        <EditableScrollReveal className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--slot4-accent)]">Fresh activity</p>
            <h2 className="editable-display mt-3 text-3xl font-normal tracking-[-0.02em] sm:text-4xl">Latest submissions</h2>
          </div>
        </EditableScrollReveal>
        <div className="mt-8 flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {submissions.map(({ post, task }) => {
            const route = task === 'listing' ? routes.listing : routes.sbm
            const image = getEditablePostImage(post)
            return (
              <Link
                key={`${task}-${post.id || post.slug}`}
                href={postHref(task, post, route)}
                className="group w-[220px] shrink-0 snap-start overflow-hidden rounded-[var(--editable-radius-card)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)]/30"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
                  <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" loading="lazy" />
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-sm">
                    {task === 'listing' ? 'Listing' : 'Bookmark'}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-2 text-sm font-semibold leading-snug tracking-[-0.01em] group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- Platform stats ----------------------------- */
export function EditablePlatformStats({ listingCount, sbmCount, categoryCount }: { listingCount: number; sbmCount: number; categoryCount: number }) {
  const stats = [
    { label: 'Business listings', value: listingCount },
    { label: 'Saved bookmarks', value: sbmCount },
    { label: 'Categories covered', value: categoryCount },
  ]
  return (
    <section className="border-t border-[var(--editable-border)] bg-[#0a0a0a] text-white">
      <div className={`py-16 sm:py-20 ${container}`}>
        <EditableScrollReveal className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--slot4-muted-text)]">By the numbers</p>
          <h2 className="editable-display mt-3 text-3xl font-normal tracking-[-0.02em] sm:text-4xl">A growing directory, not an empty one</h2>
        </EditableScrollReveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <EditableScrollReveal key={stat.label} delayMs={index * 80} className="rounded-[var(--editable-radius-card)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-8">
              <p className="editable-display text-4xl font-normal tracking-[-0.02em] sm:text-5xl">{stat.value}+</p>
              <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">{stat.label}</p>
            </EditableScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------- FAQ ---------------------------------- */
const faqs = [
  { q: 'Is it free to add a listing or bookmark?', a: 'Yes — submitting a business listing or saving a bookmark is free. Every submission goes through a quick review before it appears in the directory.' },
  { q: `What makes ${SITE_CONFIG.name} different from a plain search engine?`, a: 'Everything here is submitted and organized by category, so you\'re browsing a curated set of businesses and resources instead of an open web crawl.' },
  { q: 'Can I edit or remove my submission later?', a: 'Reach out through the contact page with your listing or bookmark link and we\'ll take care of it.' },
  { q: 'How is content organized?', a: 'Every listing and bookmark is tagged with a category, so you can browse by topic or search across the whole directory at once.' },
]

export function EditableFaq() {
  return (
    <section className="border-t border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]">
      <div className={`py-16 sm:py-20 ${container}`}>
        <EditableScrollReveal className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--slot4-accent)]">FAQ</p>
          <h2 className="editable-display mt-3 text-3xl font-normal tracking-[-0.02em] sm:text-4xl">Frequently asked questions</h2>
        </EditableScrollReveal>
        <div className="mt-10 mx-auto max-w-3xl divide-y divide-[var(--editable-border)] rounded-[var(--editable-radius-card)] border border-[var(--editable-border)]">
          {faqs.map((item) => (
            <details key={item.q} className="group p-6 open:bg-[var(--slot4-panel-bg)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold tracking-[-0.01em] marker:content-none">
                {item.q}
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--slot4-muted-text)] transition group-open:text-[var(--slot4-accent)]" />
              </summary>
              <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
