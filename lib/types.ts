export type UserRole = 'guest' | 'customer' | 'provider' | 'superadmin';

export type ProfessionType = 
  | 'Chartered Accountant'
  | 'Doctor'
  | 'Lawyer'
  | 'Software Engineer'
  | 'Architect';

export type ActivePanel = 
  | 'marketplace'
  | 'provider_dashboard'
  | 'admin_panel'
  | 'customer_panel'
  | 'blog';

export interface PeerVouch {
  id: string;
  voucherId: string;
  voucherName: string;
  voucherProfession: ProfessionType;
  voucherRegNo: string;
  relationship: 'Former Colleague' | 'Council Peer' | 'Project Co-lead' | 'Senior Partner' | 'Clinical Associate';
  comment: string;
  date: string;
  verified: boolean;
}

export interface ServicePackage {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  price: number;
  mode: 'Video Call' | 'In-Person Consultation' | 'Document Review & Audit';
  turnaroundTime: string;
}

export interface Professional {
  id: string;
  name: string;
  title: string;
  profession: ProfessionType;
  city: string;
  avatarUrl: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  peerReviewScore?: number;
  licenseNumber: string;
  licensingBody: string; // e.g. ICAI, Medical Council / NMC, Bar Council of India, IEEE
  verificationStatus: 'verified' | 'pending' | 'flagged';
  peerVouchCount: number;
  bio: string;
  education: string;
  consultationFee: number;
  specialties: string[];
  peerVouches: PeerVouch[];
  services: ServicePackage[];
  officeAddress: string;
  email: string;
  phone: string;
  joinedDate: string;
  featured?: boolean;
}

export interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  providerId: string;
  providerName: string;
  providerProfession: ProfessionType;
  serviceId: string;
  serviceTitle: string;
  dateTime: string;
  timeSlot: string;
  fee: number;
  status: 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  consultationType: 'Video Call' | 'In-Person Consultation' | 'Document Review & Audit';
  meetingLink?: string;
  location?: string;
  notes?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  professionalId: string;
  professionalName: string;
  customerId: string;
  customerName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBooking: boolean;
  providerResponse?: {
    text: string;
    date: string;
  };
}

export interface VerificationRequest {
  id: string;
  providerId: string;
  providerName: string;
  profession: ProfessionType;
  licenseNumber: string;
  licensingBody: string;
  documentName: string;
  documentType: 'License' | 'Degree Certificate' | 'Bar Council Roll' | 'ICAI Membership Card';
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
  peerVouchesGathered: number;
  peerVouchesTarget: number;
  notes?: string;
}

export interface DisputeTicket {
  id: string;
  ticketNumber: string;
  customerName: string;
  customerEmail: string;
  providerName: string;
  providerProfession: ProfessionType;
  issueType: 'Appointment No-Show' | 'Billing Inquiry' | 'Credential Discrepancy' | 'Service Quality';
  status: 'open' | 'investigating' | 'resolved';
  dateOpened: string;
  description: string;
  resolution?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: ProfessionType | 'Regulatory & Law' | 'Technology';
  authorName: string;
  authorRole: string;
  authorProfession: ProfessionType;
  readTime: string;
  date: string;
  excerpt: string;
  content: string[];
  tags: string[];
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  city?: string;
  profession?: ProfessionType;
  licenseNumber?: string;
  providerProfileId?: string;
}
