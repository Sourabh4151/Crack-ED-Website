export const SITE_URL = 'https://crack-ed.com'
export const SITE_NAME = 'CRACK-ED'
export const DEFAULT_TITLE = 'CRACK-ED - Upskill Today, Crack the World Tomorrow'
export const DEFAULT_DESCRIPTION =
  'Crack-ED helps you upskill and get hired through job-linked programs. Apply, learn with our ABC model, and build a career in banking, NBFC, insurance, and more.'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/hero_section_image.webp`
export const DEFAULT_LOGO = `${SITE_URL}/crack-ed-logo.png`
export const CONTACT_EMAIL = 'crack-ed@girnarsoft.com'

export const SOCIAL_PROFILES = [
  'https://www.instagram.com/crack_ed_now/',
  'https://www.linkedin.com/company/crack-ed/posts/?feedView=all',
  'https://www.facebook.com/people/Crack-ED-Bridging-the-Skill-Gap/100083683071884/',
  'https://www.youtube.com/@CrackEDit',
]

export function canonicalFor (path = '/') {
  if (!path || path === '/') return `${SITE_URL}/`
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized.replace(/\/+$/, '')}`
}

export function organizationJsonLd () {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: DEFAULT_LOGO,
    email: CONTACT_EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '7th floor, Imperia Mindspace, Sector 62, Golf Course Road',
      addressLocality: 'Gurgaon',
      addressCountry: 'IN',
    },
    sameAs: SOCIAL_PROFILES,
  }
}

export function websiteJsonLd () {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
  }
}

export function breadcrumbJsonLd (items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalFor(item.path),
    })),
  }
}

export const PAGE_SEO = {
  home: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: '/',
  },
  about: {
    title: 'About Us | CRACK-ED',
    description:
      'At Crack-ED, ambition meets opportunity. We help motivated learners gain the skills and confidence to build meaningful careers, wherever they start.',
    path: '/about',
  },
  programs: {
    title: 'All Programs | CRACK-ED',
    description:
      "Explore Crack-ED's hands-on, job-linked programs designed to make you job-ready from day one across banking, NBFC, insurance, retail, and entrepreneurship.",
    path: '/programs',
  },
  careers: {
    title: 'Careers | CRACK-ED',
    description:
      "Join Crack-ED and help change how the world learns. Explore open roles and bring your ideas to a team shaping tomorrow's future.",
    path: '/careers',
  },
  contact: {
    title: 'Contact Us | CRACK-ED',
    description:
      'Have questions about programs, admissions, placements, or careers? Contact the Crack-ED team and take the first step toward your career.',
    path: '/contact-us',
  },
  resources: {
    title: 'Blogs | CRACK-ED',
    description:
      "Career tips, interview guidance, and stories from Crack-ED. Whether you're starting out or leveling up, find insights that move you closer to your goals.",
    path: '/resources',
  },
  bid: {
    title: 'Badhta India Dekho | CRACK-ED',
    description:
      "Badhta India Dekho is a Crack-ED and CarDekho Group podcast on the grit and growth of Bharat's entrepreneurs. Watch the latest episodes.",
    path: '/badhta-india-dekho',
  },
  influencer: {
    title: 'Career Quiz | CRACK-ED',
    description:
      'Take the Crack-ED career quiz to find a job-linked program that fits you. Learn through on-job training and get placed with leading corporates.',
    path: '/influencer',
  },
  refund: {
    title: 'Refund Policy | CRACK-ED',
    description:
      "Read Crack-ED's refunds, returns, and cancellations policy for offline, job-ready courses.",
    path: '/refund-policy',
  },
  privacy: {
    title: 'Privacy Policy | CRACK-ED',
    description:
      'Learn how Crack-ED collects, uses, and protects your personal information when you visit crack-ed.com or use our services.',
    path: '/privacy-policy',
  },
  terms: {
    title: 'Terms & Conditions | CRACK-ED',
    description:
      'Read the terms and conditions that govern your use of the Crack-ED website and services.',
    path: '/terms-conditions',
  },
  jobFallback: {
    title: 'Job Opening | CRACK-ED',
    description: 'View this open role at Crack-ED and apply to join the team.',
  },
  blogNotFound: {
    title: 'Blog Post Not Found | CRACK-ED',
    description: 'This blog post is unavailable. Browse other career resources from Crack-ED.',
  },
  adminBlogs: {
    title: 'Marketing Blogs | CRACK-ED',
    description: 'Internal marketing blog administration for Crack-ED.',
    path: '/marketing/blogs',
    robots: 'noindex, nofollow',
  },
  adminBlogEdit: {
    title: 'Edit Blog | CRACK-ED',
    description: 'Internal marketing blog editor for Crack-ED.',
    robots: 'noindex, nofollow',
  },
}
