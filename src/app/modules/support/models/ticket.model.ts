export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'feature_request' | 'bug_report' | 'general';
  createdBy: string;
  createdByEmail: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  messages: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  senderId: string;
  senderName: string;
  senderEmail: string;
  senderType: 'user' | 'admin';
  message: string;
  attachments?: string[];
  createdAt: Date;
  isInternal?: boolean; // Admin'ler arası notlar için
}

export interface CreateTicketRequest {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'feature_request' | 'bug_report' | 'general';
  email: string;
}

export interface TicketResponse {
  message: string;
  isInternal?: boolean;
} 