import type { MetadataRoute } from 'next';

export const runtime = 'edge';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api',
    },
    sitemap: 'https://academiax.in/sitemap.xml',
  };
}
