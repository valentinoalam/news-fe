import Link from "next/link";
import Tag from "./tag";
import { Article } from "@/types/article";
import { formatDate } from "@/utils/dateFormat.util";

export default function ArticleCard({ article }: {article: Article}) {
  return (
    <article className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md xl:grid xl:grid-cols-4 xl:items-start xl:gap-4">
      <div className="xl:col-span-1">
        <dl className="space-y-1">
          <div>
            <dt className="sr-only">Published on</dt>
            <dd className="text-sm font-medium text-gray-500 dark:text-gray-400">
              <span>
                {formatDate(new Date(article?.publishedAt as Date))}
              </span>
            </dd>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Author:</strong> {article?.author?.name}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Status:</strong>{" "}
            <span
              className={`${
                article?.status === "Published" ? "text-green-600" : "text-yellow-500"
              }`}
            >
              {article.status}
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Category:</strong> {article?.category?.name}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Views:</strong> {article.viewCount}
          </div>
        </dl>
      </div>
      
      <div className="space-y-3 xl:col-span-3">
        <div>
          <h3 className="text-2xl font-bold leading-8 tracking-tight">
            <Link href={`/${article.slug}`}>
              <a className="text-gray-900 dark:text-gray-100">{article.title}</a>
            </Link>
          </h3>
          <div className="flex flex-wrap space-x-2 mt-1">
            {article.tags?.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        </div>
        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
          {article.excerpt}
        </div>
      </div>
    </article>
  );
}
