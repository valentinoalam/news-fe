export interface Event {
    name: string;
    properties?: Record<string, unknown>;
    timestamp?: Date;
}

export interface AnalyticsReport {
    startDate: Date;
    endDate: Date;
    metrics: Record<string, number>;
}