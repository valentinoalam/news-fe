import { Card } from "@/components/ui/card";

import { fetchHeadlines } from "@/store/features/homepageSlice";
import { RootState } from "@/store/store";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
;

export default async function Home() {


  // const dispatch = useDispatch();
  // const { headline, topArticlesByCategory, status, error } = useSelector(
  //   (state: RootState) => state.headlines
  // );

  // useEffect(() => {
  //   if (status === 'idle') {
  //     dispatch(fetchHeadlines());
  //   }
  // }, [status, dispatch]);

  // if (status === 'loading') {
  //   return <p>Loading...</p>;
  // }

  // if (status === 'failed') {
  //   return <p>Error: {error}</p>;
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Story */}
        <div className="md:col-span-8">
          {/* <Card className="p-6">
            <h2 className="text-3xl font-serif font-bold mb-4">{headline.title}</h2>
            <div className="relative aspect-video mb-4">
              <Image
                src={headline.imageUrl}
                alt={headline.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <p className="text-lg text-muted-foreground mb-4">{headline.description}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>By {headline.author}</span>
              <span className="mx-2">|</span>
              <span>{headline.readTime} min read</span>
            </div>
          </Card> */}

          {/* Secondary Stories */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {topArticlesByCategory.map((category) => (
              category.articles.map((article) => (
                <Card key={article.id} className="p-4">
                  <div className="relative aspect-video mb-3">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <h3 className="text-xl font-serif font-semibold mb-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground">{article.description}</p>
                </Card>
              ))
            ))}
          </div> */}
        </div>

        {/* Sidebar */}
        <aside className="md:col-span-4">
          {/* <Card className="p-6 mb-6">
            <h3 className="text-xl font-serif font-bold mb-4">Most Popular</h3>
            <div className="space-y-4">
              {topArticlesByCategory.flatMap((category) => 
                category.articles.slice(0, 5).map((article, index) => (
                  <div key={article.id} className="flex items-start gap-4">
                    <span className="text-2xl font-bold text-muted-foreground">{index + 1}</span>
                    <p className="text-sm">{article.title}</p>
                  </div>
                ))
              )}
            </div>
          </Card> */}

          {/* <Card className="p-6">
            <h3 className="text-xl font-serif font-bold mb-4">Opinion</h3>
            <div className="space-y-4">
              {topArticlesByCategory.flatMap((category) => 
                category.articles.slice(0, 3).map((article) => (
                  <div key={article.id} className="border-b last:border-0 pb-4 last:pb-0">
                    <p className="font-semibold mb-1">{article.title}</p>
                    <span className="text-sm text-muted-foreground">By {article.author}</span>
                  </div>
                ))
              )}
            </div>
          </Card> */}
        </aside>
      </div>
    </div>
  );
}

// export async function getServerSideProps() {
//   // Replace this with your actual API call or database function
//   const data = await getTopArticles();

//   return {
//     props: {
//       headline: data.headline,
//       topArticlesByCategory: data.topArticlesByCategory,
//     },
//   };
// }

// async function getTopArticles() {
//   // Query logic from your endpoint
//   const headlineArticle = await this.db.article.findFirst({
//     orderBy: {
//       viewCount: 'desc',
//     },
//     take: 1,
//   });

//   const categories = await this.db.category.findMany();
//   const articlesByCategory = await Promise.all(
//     categories.map(async (category) => {
//       const articles = await this.db.article.findMany({
//         where: {
//           categoryId: category.id,
//         },
//         orderBy: [{ viewCount: 'desc' }, { createdAt: 'desc' }],
//         take: 2,
//       });

//       return {
//         category: category.name,
//         articles,
//       };
//     })
//   );

//   return {
//     headline: headlineArticle,
//     topArticlesByCategory: articlesByCategory,
//   };
// }
