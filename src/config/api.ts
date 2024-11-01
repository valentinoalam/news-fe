export const API_CONFIG = {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    endpoints: {
      analytics: 'analytics',
      articles: '/articles',
      categories: '/category',
      medias: '/media',
      comments: '/comment',
      newsletters: '/newsletters',
      tags: '/tags',
      users: '/users',
    },
};