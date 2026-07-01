import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Business listings & bookmarks, organized by category',
      description: 'Browse verified business listings and curated bookmarks in one searchable directory. Submit your own in minutes.',
      openGraphTitle: `${slot4BrandConfig.siteName} — business listings & bookmarks`,
      openGraphDescription: 'A social bookmarking and listing directory where businesses get discovered and useful resources get saved.',
      keywords: ['business directory', 'social bookmarking', 'business listings', 'local discovery'],
    },
    hero: {
      badge: 'Business listings & saved bookmarks',
      title: ['Discover local businesses,', 'save what matters online.'],
      description: 'Browse verified business listings and community-curated bookmarks in one place — searchable, categorized, and free to submit.',
      primaryCta: { label: 'Browse listings', href: '/listing' },
      secondaryCta: { label: 'Browse bookmarks', href: '/sbm' },
      searchPlaceholder: 'Search listings, bookmarks, categories…',
      focusLabel: 'Featured',
      featureCardBadge: 'Latest additions',
      featureCardTitle: 'The newest listings and bookmarks shape the homepage.',
      featureCardDescription: 'Fresh submissions surface automatically as they are published — nothing here is staged or mocked.',
    },
    intro: {
      badge: 'About the directory',
      title: 'One directory for businesses to be found and resources worth saving.',
      paragraphs: [
        `${slot4BrandConfig.siteName} brings business listings and community bookmarks together in one searchable directory instead of scattering them across disconnected pages.`,
        'Every listing goes through a quick review before it goes live, and every bookmark is tagged by category so it stays easy to find later.',
        'Whether you start from a business listing or a saved resource, related content and categories are always one click away.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'A single directory for both business listings and saved bookmarks.',
        'Category-based browsing that keeps related content connected.',
        'Free submissions with a lightweight review before publishing.',
        'Fast, filterable search across the whole directory.',
      ],
      primaryLink: { label: 'Browse listings', href: '/listing' },
      secondaryLink: { label: 'Browse bookmarks', href: '/sbm' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Browse business listings and bookmarks in one connected directory.',
      description: 'Search by category, compare listings, and save the bookmarks worth coming back to — all in one place.',
      primaryCta: { label: 'Browse listings', href: '/listing' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest submissions in this section.',
    },
  },
  about: {
    badge: 'Our story',
    title: 'A directory built for finding businesses and saving what matters.',
    description: `${slot4BrandConfig.siteName} brings business listings and community-curated bookmarks together in one trustworthy, searchable directory.`,
    paragraphs: [
      'We started this directory because good local businesses and useful online resources both deserve to be easy to find — not buried in a generic search engine or scattered across bookmarking apps nobody checks.',
      'Every listing is reviewed before it goes live, and every bookmark is tagged by category, so browsing the directory always feels organized rather than overwhelming.',
      'Whether you are a business owner adding your first listing or someone saving a resource worth sharing, the goal is the same: make it easy for the next visitor to find it.',
    ],
    values: [
      {
        title: 'Verified & useful',
        description: 'Every listing and bookmark is reviewed for accuracy before it goes live, so you can trust what you find.',
      },
      {
        title: 'Organized by category',
        description: 'Business listings and bookmarks are tagged and categorized, so browsing stays focused instead of overwhelming.',
      },
      {
        title: 'Free to submit',
        description: 'Adding a business listing or saving a bookmark is free — no paywalls, no gatekeeping.',
      },
      {
        title: 'Built for discovery',
        description: 'Search, categories, and related content are designed to help visitors find the next useful thing.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Questions about a listing, a bookmark, or the directory itself?',
    description: 'Tell us what you need — adding a business, fixing a submission, or something else — and we will route it to the right place instead of a generic support queue.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search listings & bookmarks',
      description: 'Search business listings and saved bookmarks by keyword, category, or content type.',
    },
    hero: {
      badge: 'Search the directory',
      title: 'Find listings and bookmarks faster.',
      description: 'Search by keyword, category, or content type across every business listing and bookmark in the directory.',
      placeholder: 'Search by business name, keyword, or category',
    },
    resultsTitle: 'Browse the directory',
  },
  create: {
    metadata: {
      title: 'Submit a listing or bookmark',
      description: 'Add a business listing or save a bookmark to the directory.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Sign in to submit a listing or bookmark.',
      description: 'Create a free account to add your business to the directory or save a bookmark for the community.',
    },
    hero: {
      badge: 'Submission workspace',
      title: 'Add a business listing or save a bookmark.',
      description: 'Choose what you are sharing, add the details, and submit — most submissions take a couple of minutes.',
    },
    formTitle: 'Submission details',
    submitLabel: 'Submit for review',
    successTitle: 'Submitted — it will appear once reviewed.',
  },
  auth: {
    login: {
      metadataDescription: `Sign in to your ${slot4BrandConfig.siteName} account.`,
      badge: 'Member access',
      title: 'Welcome back.',
      description: 'Sign in to manage your listings, saved bookmarks, and submissions.',
      formTitle: 'Sign in',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then sign in.',
      success: 'Signed in. Redirecting…',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: `Create a free ${slot4BrandConfig.siteName} account.`,
      badge: 'Free account',
      title: 'Create your account.',
      description: 'Sign up to submit business listings, save bookmarks, and manage your submissions.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created. Redirecting…',
      loginCta: 'Sign in',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    sbm: {
      relatedTitle: 'Related bookmarks',
      fallbackTitle: 'Bookmark details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit official site',
    },
  },
} as const
