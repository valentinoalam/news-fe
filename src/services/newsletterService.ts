import { API_CONFIG } from "@/config/api";
import { Subscriber, Newsletter } from "@/types/newsletter";
import api from "@/lib/api";

export class NewsletterService {
  private endpoint = API_CONFIG.endpoints.newsletters;

  async subscribe(email: string, preferences?: Record<string, boolean>): Promise<Subscriber> {
    const { data } = await api.post(`${this.endpoint}/subscribers`, { email, preferences });
    return data;
  }

  async unsubscribe(email: string): Promise<void> {
    await api.post(`${this.endpoint}/unsubscribe`, { email });
  }

  async getSubscribers(page = 1, limit = 50): Promise<{ items: Subscriber[]; total: number }> {
    const { data } = await api.get(`${this.endpoint}/subscribers?page=${page}&limit=${limit}`);
    return data;
  }

  async createNewsletter(newsletter: Omit<Newsletter, 'id'>): Promise<Newsletter> {
    const { data } = await api.post(`${this.endpoint}/campaigns`, newsletter);
    return data;
  }

  async sendNewsletter(id: string): Promise<void> {
    await api.post(`${this.endpoint}/campaigns/${id}/send`);
  }

  async scheduleNewsletter(id: string, sendAt: Date): Promise<Newsletter> {
    const { data } = await api.post(`${this.endpoint}/campaigns/${id}/schedule`, { sendAt });
    return data;
  }
}