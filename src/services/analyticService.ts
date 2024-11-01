import { Event, AnalyticsReport } from './../types/analytics';
import api from '@/lib/api';

export class AnalyticService {
    private endpoint = '/api/analytics';

    async trackEvent(event: Event): Promise<void> {
        await api.post(`${this.endpoint}/events`, event);
    }

    async getReport(startDate: Date, endDate: Date): Promise<AnalyticsReport> {
        const { data } = await api.get(`${this.endpoint}/reports`, {
        params: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
        },
        });
        return data;
    }

    async getEventsByType(
        eventName: string,
        startDate: Date,
        endDate: Date
    ): Promise<Event[]> {
        const { data } = await api.get(`${this.endpoint}/events/${eventName}`, {
        params: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
        },
        });
        return data;
    }
}