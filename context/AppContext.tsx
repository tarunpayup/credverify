'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Professional, 
  Appointment, 
  Review, 
  VerificationRequest, 
  DisputeTicket, 
  BlogPost, 
  UserAccount, 
  UserRole, 
  ActivePanel, 
  ProfessionType,
  ServicePackage,
  PeerVouch
} from '@/lib/types';
import { 
  INITIAL_PROFESSIONALS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_REVIEWS, 
  INITIAL_VERIFICATIONS, 
  INITIAL_DISPUTES, 
  INITIAL_BLOGS, 
  DEMO_USERS 
} from '@/lib/mock-data';

interface AppContextType {
  // Navigation & Panels
  activePanel: ActivePanel;
  setActivePanel: (panel: ActivePanel) => void;
  showSplash: boolean;
  setShowSplash: (show: boolean) => void;
  
  // Auth & RBAC
  currentUser: UserAccount | null;
  setCurrentUser: (user: UserAccount | null) => void;
  loginAs: (roleKey: 'customer' | 'provider_ca' | 'provider_doc' | 'admin' | 'guest') => void;
  logout: () => void;
  
  // Data State
  professionals: Professional[];
  appointments: Appointment[];
  reviews: Review[];
  verifications: VerificationRequest[];
  disputes: DisputeTicket[];
  blogs: BlogPost[];
  
  // Saved / Bookmarks
  savedProfessionalIds: string[];
  toggleSaveProfessional: (id: string) => void;
  
  // Marketplace Filters
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedProfession: string;
  setSelectedProfession: (prof: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (val: boolean) => void;
  topRatedOnly: boolean;
  setTopRatedOnly: (val: boolean) => void;
  
  // Modals & Drawers
  activeProfileModal: Professional | null;
  setActiveProfileModal: (prof: Professional | null) => void;
  bookingModalData: {
    isOpen: boolean;
    professional: Professional | null;
    service: ServicePackage | null;
  };
  openBookingModal: (professional: Professional, service?: ServicePackage) => void;
  closeBookingModal: () => void;
  
  // Auth Modal
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'signup';
  setAuthModalMode: (mode: 'login' | 'signup') => void;
  
  // Action Handlers
  createAppointment: (details: {
    professional: Professional;
    service: ServicePackage;
    dateTime: string;
    timeSlot: string;
    consultationType: 'Video Call' | 'In-Person Consultation' | 'Document Review & Audit';
    notes?: string;
  }) => Appointment;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  addProviderResponse: (reviewId: string, text: string) => void;
  approveVerification: (reqId: string, notes?: string) => void;
  rejectVerification: (reqId: string, notes?: string) => void;
  submitVerificationRequest: (req: Omit<VerificationRequest, 'id' | 'submissionDate' | 'status' | 'peerVouchesGathered' | 'peerVouchesTarget'>) => void;
  submitPeerVouch: (targetProfessionalId: string, vouch: Omit<PeerVouch, 'id' | 'date' | 'verified'>) => void;
  updateDisputeStatus: (id: string, status: DisputeTicket['status'], resolution?: string) => void;
  addServiceToProvider: (providerId: string, service: Omit<ServicePackage, 'id'>) => void;
  
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Panels & Splash
  const [activePanel, setActivePanel] = useState<ActivePanel>('marketplace');
  const [showSplash, setShowSplash] = useState<boolean>(true);
  
  // Current user state (default: logged in as customer for instant exploration, or switchable)
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(DEMO_USERS.customer);
  
  // Persistent or in-memory state
  const [professionals, setProfessionals] = useState<Professional[]>(INITIAL_PROFESSIONALS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [verifications, setVerifications] = useState<VerificationRequest[]>(INITIAL_VERIFICATIONS);
  const [disputes, setDisputes] = useState<DisputeTicket[]>(INITIAL_DISPUTES);
  const [blogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [savedProfessionalIds, setSavedProfessionalIds] = useState<string[]>(['prof-ca-1', 'prof-doc-1']);
  
  // Filter state
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [selectedProfession, setSelectedProfession] = useState<string>('All Professions');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [topRatedOnly, setTopRatedOnly] = useState<boolean>(false);
  
  // Modal state
  const [activeProfileModal, setActiveProfileModal] = useState<Professional | null>(null);
  const [bookingModalData, setBookingModalData] = useState<{
    isOpen: boolean;
    professional: Professional | null;
    service: ServicePackage | null;
  }>({
    isOpen: false,
    professional: null,
    service: null,
  });
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  
  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const loginAs = (roleKey: 'customer' | 'provider_ca' | 'provider_doc' | 'admin' | 'guest') => {
    if (roleKey === 'guest') {
      setCurrentUser(null);
      setActivePanel('marketplace');
      showToast('Browsing as Guest');
      return;
    }
    const user = DEMO_USERS[roleKey];
    if (user) {
      setCurrentUser(user);
      if (user.role === 'provider') {
        setActivePanel('provider_dashboard');
      } else if (user.role === 'superadmin') {
        setActivePanel('admin_panel');
      } else {
        setActivePanel('customer_panel');
      }
      showToast(`Logged in as ${user.name} (${user.role.toUpperCase()})`);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setActivePanel('marketplace');
    showToast('Logged out successfully');
  };

  const toggleSaveProfessional = (id: string) => {
    setSavedProfessionalIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
    showToast('Saved list updated');
  };

  const openBookingModal = (professional: Professional, service?: ServicePackage) => {
    const selectedService = service || professional.services[0] || null;
    setBookingModalData({
      isOpen: true,
      professional,
      service: selectedService,
    });
  };

  const closeBookingModal = () => {
    setBookingModalData({
      isOpen: false,
      professional: null,
      service: null,
    });
  };

  const createAppointment = ({
    professional,
    service,
    dateTime,
    timeSlot,
    consultationType,
    notes
  }: {
    professional: Professional;
    service: ServicePackage;
    dateTime: string;
    timeSlot: string;
    consultationType: 'Video Call' | 'In-Person Consultation' | 'Document Review & Audit';
    notes?: string;
  }): Appointment => {
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      customerId: currentUser?.id || 'guest-cust',
      customerName: currentUser?.name || 'Tarun Mehta',
      customerEmail: currentUser?.email || 'client@credverify.io',
      providerId: professional.id,
      providerName: professional.name,
      providerProfession: professional.profession,
      serviceId: service.id,
      serviceTitle: service.title,
      dateTime,
      timeSlot,
      fee: service.price,
      status: 'confirmed',
      consultationType,
      meetingLink: `https://meet.credverify.internal/room-${professional.id.replace('prof-', '')}-${Date.now().toString().slice(-4)}`,
      location: professional.officeAddress,
      notes: notes || 'Standard peer-verified consultation session.',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setAppointments(prev => [newAppointment, ...prev]);
    showToast(`Appointment confirmed with ${professional.name}!`);
    return newAppointment;
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status } : apt));
    showToast(`Appointment status updated to ${status}`);
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [newRev, ...prev]);
    // update professional rating & reviewCount
    setProfessionals(prev => prev.map(prof => {
      if (prof.id === reviewData.professionalId) {
        const newCount = prof.reviewCount + 1;
        const newRating = Number(((prof.rating * prof.reviewCount + reviewData.rating) / newCount).toFixed(2));
        return {
          ...prof,
          reviewCount: newCount,
          rating: newRating
        };
      }
      return prof;
    }));
    showToast('Thank you! Your verified review has been published.');
  };

  const addProviderResponse = (reviewId: string, text: string) => {
    setReviews(prev => prev.map(rev => {
      if (rev.id === reviewId) {
        return {
          ...rev,
          providerResponse: {
            text,
            date: new Date().toISOString().split('T')[0]
          }
        };
      }
      return rev;
    }));
    showToast('Response posted to client review.');
  };

  const approveVerification = (reqId: string, notes?: string) => {
    setVerifications(prev => prev.map(req => {
      if (req.id === reqId) {
        return { ...req, status: 'approved', notes: notes || 'Verified by Super Admin against council rolls.' };
      }
      return req;
    }));
    // Also find matching professional if exists and set verified
    const req = verifications.find(r => r.id === reqId);
    if (req) {
      setProfessionals(prev => prev.map(p => {
        if (p.id === req.providerId || p.licenseNumber === req.licenseNumber) {
          return { ...p, verificationStatus: 'verified' };
        }
        return p;
      }));
    }
    showToast('Credential verification approved with Gold Seal.');
  };

  const rejectVerification = (reqId: string, notes?: string) => {
    setVerifications(prev => prev.map(req => {
      if (req.id === reqId) {
        return { ...req, status: 'rejected', notes: notes || 'Discrepancy detected in statutory registry.' };
      }
      return req;
    }));
    showToast('Verification rejected with feedback notes.');
  };

  const submitVerificationRequest = (req: Omit<VerificationRequest, 'id' | 'submissionDate' | 'status' | 'peerVouchesGathered' | 'peerVouchesTarget'>) => {
    const newReq: VerificationRequest = {
      ...req,
      id: `req-ver-${Date.now()}`,
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      peerVouchesGathered: 1,
      peerVouchesTarget: 3
    };
    setVerifications(prev => [newReq, ...prev]);
    showToast('Credential submission queued for Super Admin audit.');
  };

  const submitPeerVouch = (targetProfessionalId: string, vouchData: Omit<PeerVouch, 'id' | 'date' | 'verified'>) => {
    const newVouch: PeerVouch = {
      ...vouchData,
      id: `vouch-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      verified: true
    };

    setProfessionals(prev => prev.map(prof => {
      if (prof.id === targetProfessionalId) {
        return {
          ...prof,
          peerVouchCount: prof.peerVouchCount + 1,
          peerVouches: [newVouch, ...prof.peerVouches]
        };
      }
      return prof;
    }));
    showToast(`Peer endorsement attested for ${newVouch.voucherName}!`);
  };

  const updateDisputeStatus = (id: string, status: DisputeTicket['status'], resolution?: string) => {
    setDisputes(prev => prev.map(disp => {
      if (disp.id === id) {
        return {
          ...disp,
          status,
          resolution: resolution || disp.resolution
        };
      }
      return disp;
    }));
    showToast(`Dispute ticket ${id} marked as ${status}`);
  };

  const addServiceToProvider = (providerId: string, serviceData: Omit<ServicePackage, 'id'>) => {
    const newService: ServicePackage = {
      ...serviceData,
      id: `srv-custom-${Date.now()}`
    };
    setProfessionals(prev => prev.map(prof => {
      if (prof.id === providerId) {
        return {
          ...prof,
          services: [...prof.services, newService]
        };
      }
      return prof;
    }));
    showToast(`Service "${newService.title}" added to your catalog.`);
  };

  return (
    <AppContext.Provider
      value={{
        activePanel,
        setActivePanel,
        showSplash,
        setShowSplash,
        currentUser,
        setCurrentUser,
        loginAs,
        logout,
        professionals,
        appointments,
        reviews,
        verifications,
        disputes,
        blogs,
        savedProfessionalIds,
        toggleSaveProfessional,
        selectedCity,
        setSelectedCity,
        selectedProfession,
        setSelectedProfession,
        searchQuery,
        setSearchQuery,
        verifiedOnly,
        setVerifiedOnly,
        topRatedOnly,
        setTopRatedOnly,
        activeProfileModal,
        setActiveProfileModal,
        bookingModalData,
        openBookingModal,
        closeBookingModal,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        createAppointment,
        updateAppointmentStatus,
        addReview,
        addProviderResponse,
        approveVerification,
        rejectVerification,
        submitVerificationRequest,
        submitPeerVouch,
        updateDisputeStatus,
        addServiceToProvider,
        toastMessage,
        showToast,
      }}
    >
      {children}
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl border border-slate-700 text-sm animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
