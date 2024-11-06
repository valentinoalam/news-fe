import CommentsSection from "@/components/comments/commentSection";
import NewsArticleSEO from "@/components/articles/seo";
import Image from "next/image";
import { Article } from "@/types/article";
import { Comments } from "@/types/comment";
import { formatDate } from "@/utils/dateFormat.util";

export default async function ArticlePage({ 
    params 
  }: { 
    params: { slug: string } 
  }) {
    // const seo = {
    //   metaTitle: article.attributes.title,
    //   metaDescription: article.attributes.description,
    //   shareImage: article.attributes.image,
    //   article: true,
    // }
    // TODO: Implement actual data fetching
    const fetchArticle = async (slug: string): Promise<Article> => {
      return {
        id: slug,
        title: 'Sample Article Title',
        description: 'A comprehensive overview of an interesting topic.',
        status: 'draft',
        isFeatured: true,
        excerpt: 'Brief summary of the article...',
        content: [{text:'Full article content goes here...'}],
        featuredImage: '/sample-featured-image.jpg',
        categoryId: 'tech',
        authorId: 'jane-doe',
        revision: 1,
        author: {
          name: 'Jane Doe',
          avatar: '/jane-doe-avatar.jpg'
        },
        category: {
          name: 'Technology'
        },
        publishedAt: new Date()
      };
    };
  
    // Simulate comments fetching
    const fetchComments = async (articleId: string): Promise<Comments[]> => {
      console.log(articleId)
      // Replace with actual API call
      return [
        {
          id: '1',
          content: 'Great article! Really insightful.',
          createdAt: new Date(),
          author: {
            name: 'John Smith',
            avatar: '/john-smith-avatar.jpg'
          },
          replies: [
            {
              id: '1-1',
              content: 'Thanks for your kind words!',
              createdAt: new Date(),
              author: {
                name: 'Jane Doe',
                avatar: '/jane-doe-avatar.jpg'
              },
              articleId: "",
              parentId: ""
            }
          ],
          articleId: "",
          parentId: ""
        }
      ];
    };
  
    // Fetch article and comments
    const article = await fetchArticle(params.slug);
    const comments = await fetchComments(article.id);
  
    return (
      <div className="container mx-auto px-4 py-8">
        {/* SEO Metadata */}
        <NewsArticleSEO 
          title={article.title}
          description={article.description}
          url={`/article/${params.slug}`}
          image={article.featuredImage}
          publishedTime={article.publishedAt?.toISOString()}
          author={article.author?.name}
          category={article.category?.name}
        />
  
        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          
          {/* Author and Metadata */}
          <div className="flex items-center mb-4">
            {article.author && (
              <div className="flex items-center mr-4">
                <Image 
                  src={article.author.avatar} 
                  alt={article.author.name}
                  width={40} 
                  height={40} 
                  className="rounded-full mr-2"
                />
                <span>{article.author.name}</span>
              </div>
            )}
            
            {article.publishedAt && (
              <span className="text-gray-500">
                {formatDate(article.publishedAt)}
              </span>
            )}
          </div>
  
          {/* Featured Image */}
          <Image 
            src={article.featuredImage as string} 
            alt={article.title}
            width={1200} 
            height={600} 
            className="w-full rounded-lg"
          />
        </header>
  
        {/* Article Content */}
        <article className="prose lg:prose-xl max-w-2xl mx-auto">
          <p className="lead">{article.excerpt}</p>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>
  
        {/* Comments Section */}
        <CommentsSection comments={comments} />
      </div>
    );
  }
  
  // Metadata for dynamic routing
  // export async function generateMetadata({ 
  //   params 
  // }: { 
  //   params: { slug: string } 
  // }) {
  //   // TODO: Implement actual metadata generation
  //   const article = await fetchArticle(params.slug);
    
  //   return {
  //     title: article.title,
  //     description: article.description
  //   };
  // }
  
  // Static params generation (for SSG)
  export async function generateStaticParams() {
    // TODO: Implement actual static params generation
    return [
      { slug: 'sample-article' }
    ];
  }

  
// export async function getStaticPaths() {
//   const articlesRes = await api("/articles", { fields: ["slug"] })

//   return {
//     paths: articlesRes.data.map((article) => ({
//       params: {
//         slug: article.attributes.slug,
//       },
//     })),
//     fallback: false,
//   }
// }

// export async function getStaticProps({ params }) {
//   const articlesRes = await api("/articles", {
//     filters: {
//       slug: params.slug,
//     },
//     populate: "*",
//   })
//   const categoriesRes = await api("/categories")

//   return {
//     props: { article: articlesRes.data[0], categories: categoriesRes },
//     revalidate: 1,
//   }
// }
