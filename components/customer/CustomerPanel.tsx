'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  UserCheck, 
  Calendar, 
  Bookmark, 
  Star, 
  Video, 
  Download, 
  Clock, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  MapPin,
  Trash2
} from 'lucide-react';
import StarRating from '@/components/ui/StarRating';

export default function CustomerPanel() {
  const { 
    currentUser, 
    appointments, 
    updateAppointmentStatus, 
    savedProfessionalIds, 
    professionals, 
    toggleSaveProfessional, 
    openBookingModal, 
    reviews, 
    setActiveProfileModal,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'appointments' | 'saved' | 'reviews' | 'account'>('appointments');

  // Customer's appointments (filter by customer email or id, or show demo customer appointments)
  const myAppointments = appointments.filter(
    a => a.customerId === currentUser?.id || a.customerEmail === currentUser?.email
  );

  const savedProfessionals = professionals.filter(p => savedProfessionalIds.includes(p.id));

  const myReviews = reviews.filter(r => r.customerName === currentUser?.name || r.customerId === currentUser?.id);

  const handleDownloadInvoice = (aptId: string) => {
    showToast(`GST Tax Invoice for appointment ${aptId} generated!`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
      
      {/* Customer Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold text-xl">
              {currentUser?.name?.charAt(0) || 'C'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {currentUser?.name || 'Customer Account'}
                </h1>
                <span className="px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-[10px] font-mono font-bold uppercase">
                  Verified Client
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentUser?.email} · {currentUser?.city || 'Mumbai'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center">
              <span className="text-slate-400 block text-[10px]">Total Bookings</span>
              <span className="text-base font-bold text-slate-900 dark:text-white">{myAppointments.length}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center">
              <span className="text-slate-400 block text-[10px]">Saved Experts</span>
              <span className="text-base font-bold text-indigo-600 dark:text-indigo-400">{savedProfessionals.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'appointments'
              ? 'border-purple-600 text-purple-600 dark:text-purple-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          My Appointments & Sessions ({myAppointments.length})
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'saved'
              ? 'border-purple-600 text-purple-600 dark:text-purple-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Saved Professionals ({savedProfessionals.length})
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'reviews'
              ? 'border-purple-600 text-purple-600 dark:text-purple-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          My Reviews & Feedback ({myReviews.length})
        </button>

        <button
          onClick={() => setActiveTab('account')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'account'
              ? 'border-purple-600 text-purple-600 dark:text-purple-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Profile & Escrow Preferences
        </button>
      </div>

      {/* TAB 1: Appointments */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Scheduled & Past Consultations
            </h3>
            <span className="text-xs text-slate-500">
              Direct encrypted video links and statutory GST receipts
            </span>
          </div>

          {myAppointments.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                You have no upcoming consultations scheduled
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto mb-4">
                Explore our directory of verified Chartered Accountants, Doctors, Lawyers, and Software Architects.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {myAppointments.map(apt => (
                <div 
                  key={apt.id}
                  className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 dark:text-white text-base">
                        {apt.providerName}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-medium">
                        {apt.providerProfession}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase ${
                        apt.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                        apt.status === 'completed' ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' :
                        'bg-rose-50 text-rose-700'
                      }`}>
                        {apt.status}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {apt.serviceTitle}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                      <span>Date: {apt.dateTime}</span>
                      <span>·</span>
                      <span>Slot: {apt.timeSlot}</span>
                      <span>·</span>
                      <span className="font-bold text-slate-900 dark:text-white">Fee Paid: ₹{apt.fee.toLocaleString()}</span>
                    </div>

                    {apt.notes && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-800/60 p-2 rounded mt-2">
                        Your Note: &ldquo;{apt.notes}&rdquo;
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-auto flex-wrap">
                    {apt.meetingLink && apt.status === 'confirmed' && (
                      <a
                        href={apt.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Enter Consultation</span>
                      </a>
                    )}

                    <button
                      onClick={() => handleDownloadInvoice(apt.id)}
                      className="px-3 py-1.5 text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      <span>Invoice</span>
                    </button>

                    {apt.status === 'confirmed' && (
                      <button
                        onClick={() => updateAppointmentStatus(apt.id, 'cancelled')}
                        className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Saved Professionals */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Your Bookmarked Practitioners
            </h3>
            <span className="text-xs text-slate-500">
              Quick access for follow-up advisory sessions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProfessionals.map(prof => (
              <div 
                key={prof.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={prof.avatarUrl} 
                        alt={prof.name}
                        className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700" 
                      />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{prof.name}</h4>
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">{prof.profession}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSaveProfessional(prof.id)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 font-mono mb-2">
                    {prof.licenseNumber} · {prof.city}
                  </p>

                  <div className="mb-4">
                    <StarRating
                      score={prof.peerReviewScore || prof.rating}
                      peerCount={prof.peerVouchCount}
                      totalReviews={prof.reviewCount}
                      size="xs"
                      label="Average Peer Review Score"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => setActiveProfileModal(prof)}
                    className="flex-1 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    View Audit
                  </button>
                  <button
                    onClick={() => openBookingModal(prof)}
                    className="flex-1 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: My Reviews */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Reviews You Have Authored
            </h3>
            <span className="text-xs text-slate-500">
              Assisting future clients with verified peer evaluations
            </span>
          </div>

          {myReviews.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">
              You haven&apos;t written any reviews yet. Complete an appointment to share feedback!
            </p>
          ) : (
            <div className="space-y-3">
              {myReviews.map(rev => (
                <div 
                  key={rev.id}
                  className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        Review for {rev.professionalName}
                      </span>
                      <div className="flex items-center text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                        ))}
                      </div>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px]">{rev.date}</span>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>

                  {rev.providerResponse && (
                    <div className="p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/20 text-slate-600 dark:text-slate-300 border border-indigo-100 dark:border-indigo-900">
                      <p className="font-semibold text-indigo-700 dark:text-indigo-300 text-[11px]">
                        Response from {rev.professionalName}:
                      </p>
                      <p className="text-[11px]">{rev.providerResponse.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Account Details */}
      {activeTab === 'account' && (
        <div className="max-w-xl bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 text-xs">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Client Profile & Escrow Security
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-slate-400 mb-1">Full Name</label>
              <input 
                type="text" 
                defaultValue={currentUser?.name}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                readOnly
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Registered Email</label>
              <input 
                type="text" 
                defaultValue={currentUser?.email}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                readOnly
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Contact Phone</label>
              <input 
                type="text" 
                defaultValue={currentUser?.phone || '+91 98201 55410'}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                readOnly
              />
            </div>
          </div>

          <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-lg text-purple-800 dark:text-purple-300 text-xs">
            <strong>Escrow Protection Active:</strong> Your funds are held securely until each advisory session concludes. If an appointment is not attended by the professional, a 100% refund is initiated automatically.
          </div>
        </div>
      )}

    </div>
  );
}
