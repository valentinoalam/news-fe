import React from 'react';
import Head from 'next/head';

// TypeScript interface for NewsArticle SEO props
interface NewsArticleSEOProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedTime?: string;
  author?: string;
  category?: string;
  tags?: string[];
}

const NewsArticleSEO: React.FC<NewsArticleSEOProps> = ({
  title,
  description,
  url,
  image = '/default-news-image.jpg',
  publishedTime,
  author,
  category,
  tags = []
}) => {
  // Truncate description if it's too long
  const truncatedDescription = description.length > 160 
    ? `${description.slice(0, 157)}...` 
    : description;

  return (
    <Head>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={truncatedDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={truncatedDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={truncatedDescription} />
      <meta name="twitter:image" content={image} />
      
      {/* Article-specific Metadata */}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      
      {author && (
        <meta property="article:author" content={author} />
      )}
      
      {category && (
        <meta property="article:section" content={category} />
      )}
      
      {/* Keywords */}
      {tags.length > 0 && (
        <meta name="keywords" content={tags.join(', ')} />
      )}

      {/* Structured Data - NewsArticle JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": title,
          "description": truncatedDescription,
          "url": url,
          "image": image,
          ...(publishedTime && { "datePublished": publishedTime }),
          ...(author && { 
            "author": {
              "@type": "Person",
              "name": author 
            }
          }),
          ...(category && { "articleSection": category })
        })
      }} />
    </Head>
  );
};

export default NewsArticleSEO;