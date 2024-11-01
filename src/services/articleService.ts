import { Article, ArticleRevision } from "@/types/article";
// import api from "./api";
import axios from "axios";

export class ArticleService {
  private baseUrl = '/api/articles';

  async getArticles(page = 1, limit = 10): Promise<{ articles: Article[]; total: number }> {
    const { data } = await axios.get(`${this.baseUrl}?page=${page}&limit=${limit}`);
    return data;
  }

  async getArticleById(id: string): Promise<Article> {
    const { data } = await axios.get(`${this.baseUrl}/${id}`);
    return data;
  }

  async createArticle(article: Omit<Article, 'id'>): Promise<Article> {
    const { data } = await axios.post(this.baseUrl, article);
    return data;
  }

  async updateArticle(id: string, article: Partial<Article>): Promise<Article> {
    const { data } = await axios.put(`${this.baseUrl}/${id}`, article);
    return data;
  }

  async getRevisions(articleId: string): Promise<ArticleRevision[]> {
    const { data } = await axios.get(`${this.baseUrl}/${articleId}/revisions`);
    return data;
  }

  async revertToRevision(articleId: string, revisionId: string): Promise<Article> {
    const { data } = await axios.post(`${this.baseUrl}/${articleId}/revert/${revisionId}`);
    return data;
  }

  async fetchArticlesByCategory(slug: string): Promise<Article[]> {
    const response = await fetch(`/api/articles?category=${slug}`);
    return await response.json();
  };
}