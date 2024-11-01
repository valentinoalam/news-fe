import { Media } from "@/types/media";
import api from "@/lib/api";
import { API_CONFIG } from "@/config/api";

  export class MediaService {
    private endpoint = API_CONFIG.endpoints.medias;
    async uploadMedia(file: File): Promise<Media> {
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await api.post(this.endpoint, formData);
      return data;
    }
  
    async getMediaList(page = 1, limit = 20): Promise<{ items: Media[]; total: number }> {
      const { data } = await api.get(`${this.endpoint}?page=${page}&limit=${limit}`);
      return data;
    }
  
    async deleteMedia(id: string): Promise<void> {
      await api.delete(`${this.endpoint}/${id}`);
    }
  
    async updateMediaMetadata(id: string, metadata: Record<string, unknown>): Promise<Media> {
      const { data } = await api.patch(`${this.endpoint}/${id}/metadata`, metadata);
      return data;
    }
  }