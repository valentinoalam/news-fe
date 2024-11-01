//
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchArticlesByCategory } from '@/services/articleService'; // Implement service to fetch articles
import { Article } from '@/types/article';

const CategoryPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (slug) {
      const fetchArticles = async () => {
        const fetchedArticles = await fetchArticlesByCategory(slug as string);
        setArticles(fetchedArticles);
      };
      fetchArticles();
    }
  }, [slug]);

  if (!articles.length) {
    return <p>Loading articles...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Articles in {slug}</h1>
      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.id} className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-gray-700">{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;

