export interface Subscriber {
    id: string;
    email: string;
    status: 'active' | 'unsubscribed';
    preferences?: Record<string, boolean>;
}
  
export interface Newsletter {
    id: string;
    subject: string;
    content: string;
    sentAt?: Date;
    status: 'draft' | 'scheduled' | 'sent';
}
  