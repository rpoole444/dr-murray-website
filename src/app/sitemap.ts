import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://robert-murray-site.vercel.app';
  const now = new Date();

  const routes = [
  '',               
  '/performance',
  '/repertoire',    
  '/equipment',     
  '/teaching',
  '/media',
  '/calendar',
  '/press',
  '/contact',
];


  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.6,
  }));
}
