import { LoginCredentials } from '@/types/user';
import api from '@/lib/api';
import { User } from 'next-auth';
import { API_CONFIG } from "@/config/api";

export class UserService {
  private endpoint = API_CONFIG.endpoints.users;

  async login(credentials: LoginCredentials) {
    const { data } = await api.post(`${this.endpoint}/login`, credentials);
    return data;
  }

  async getCurrentUser(): Promise<User> {
    const { data } = await api.get(`${this.endpoint}/me`);
    return data;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const { data } = await api.put(`${this.endpoint}/${id}`, userData);
    return data;
  }

  async logout() {
    await api.post(`${this.endpoint}/logout`);
  }
}