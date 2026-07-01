import type { Metadata } from 'next'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchHomeTaskFeed, fetchHomeTimeSections, type HomeTimeSection } from '@/lib/task-data'
import { pagesContent } from '@/editable/content/pages.content'
import type { SitePost } from '@/lib/site-connector'
import { EditableHomeCta, EditableHomeHero, EditableMagazineSplit, EditableStoryRail, EditableTimeCollections } from '@/editable/sections/HomeSections'
import {
  EditableContributeCards,
  EditableFaq,
  EditableFeaturedGrid,
  EditableHowItWorks,
  EditableLatestSubmissions,
  EditablePlatformStats,
} from '@/editable/sections/HomeFeaturedSections'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { Ads } from '@/lib/ads'
export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: pagesContent.home.metadata.title,
    description: pagesContent.home.metadata.description,
    openGraphTitle: pagesContent.home.metadata.openGraphTitle,
    openGraphDescription: pagesContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...pagesContent.home.metadata.keywords],
  })
}

type TaskFeedItem = { task: (typeof SITE_CONFIG.tasks)[number]; posts: SitePost[] }

function uniquePosts(posts: SitePost[]) {
  return Array.from(new Map(posts.map((post) => [post.slug || post.id || post.title, post])).values())
}

export default async function HomePage() {
  const primaryTask = (SITE_CONFIG.tasks.find((task) => task.enabled)?.key || 'article') as TaskKey
  const primaryRoute = SITE_CONFIG.taskViews[primaryTask] || `/${primaryTask}`
  const taskFeed: TaskFeedItem[] = await fetchHomeTaskFeed(12, { timeoutMs: 2500 })
  const primaryPosts = uniquePosts(taskFeed.find(({ task }) => task.key === primaryTask)?.posts || taskFeed.flatMap(({ posts }) => posts)).slice(0, 24)
  const timeSections: HomeTimeSection[] = await fetchHomeTimeSections(primaryTask, { limit: 8, timeoutMs: 2500 })
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')

  const listingTask = SITE_CONFIG.tasks.find((task) => task.key === 'listing' && task.enabled)
  const sbmTask = SITE_CONFIG.tasks.find((task) => task.key === 'sbm' && task.enabled)
  const listingPosts = uniquePosts(taskFeed.find(({ task }) => task.key === 'listing')?.posts || []).slice(0, 8)
  const sbmPosts = uniquePosts(taskFeed.find(({ task }) => task.key === 'sbm')?.posts || []).slice(0, 8)
  const latestSubmissions = [
    ...listingPosts.slice(0, 6).map((post) => ({ post, task: 'listing' as TaskKey })),
    ...sbmPosts.slice(0, 6).map((post) => ({ post, task: 'sbm' as TaskKey })),
  ].slice(0, 10)
  const categoryCount = new Set(
    [...listingPosts, ...sbmPosts]
      .map((post) => (post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>).category : null))
      .filter((value): value is string => typeof value === 'string' && value.length > 0)
  ).size

  return (
    <EditableSiteShell>
      <main>
      <SchemaJsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE_CONFIG.name,
          url: baseUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        }}
      />
      <EditableHomeHero primaryTask={primaryTask} primaryRoute={primaryRoute} posts={primaryPosts} timeSections={timeSections} />
      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-6 sm:px-6 lg:px-8">
        <Ads slot="header" showLabel eager className="mx-auto w-full" />
      </div>

      <EditableStoryRail primaryTask={primaryTask} primaryRoute={primaryRoute} posts={primaryPosts} timeSections={timeSections} />
      <EditableHowItWorks />

      {listingTask && listingPosts.length ? (
        <EditableFeaturedGrid
          eyebrow="Business directory"
          title="Featured listings"
          description="Handpicked local businesses worth a first (or second) look."
          posts={listingPosts}
          task="listing"
          route={listingTask.route}
        />
      ) : null}

      {sbmTask && sbmPosts.length ? (
        <EditableFeaturedGrid
          eyebrow="Saved & curated"
          title="Featured bookmarks"
          description="Resources the community has saved and vouched for."
          posts={sbmPosts}
          task="sbm"
          route={sbmTask.route}
          tone="warm"
        />
      ) : null}

      <EditableMagazineSplit primaryTask={primaryTask} primaryRoute={primaryRoute} posts={primaryPosts} timeSections={timeSections} />
      <EditableContributeCards />

      <EditableTimeCollections primaryTask={primaryTask} primaryRoute={primaryRoute} posts={primaryPosts} timeSections={timeSections} />

      {latestSubmissions.length ? (
        <EditableLatestSubmissions submissions={latestSubmissions} routes={{ listing: listingTask?.route || '/listing', sbm: sbmTask?.route || '/sbm' }} />
      ) : null}

      <EditablePlatformStats listingCount={listingPosts.length} sbmCount={sbmPosts.length} categoryCount={categoryCount} />

      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-6 sm:px-6 lg:px-8">
        <Ads slot="sidebar" showLabel eager className="mx-auto w-full" />
      </div>

      <EditableFaq />
      <EditableHomeCta />
      </main>
    </EditableSiteShell>
  )
}

