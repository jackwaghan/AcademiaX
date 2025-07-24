import type { MetadataRoute } from 'next';

export const runtime = 'edge';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://academiax.in/login',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://academiax.in/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      images: ['https://academiax.in/screenshots/Desktop.png'],
    },
  ];
}
