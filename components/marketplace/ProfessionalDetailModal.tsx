'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  ShieldCheck, 
  Star, 
  MapPin, 
  GraduationCap, 
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle, 
  Users, 
  Clock, 
  Award,
  MessageSquare
} from 'lucide-react';
import { ServicePackage } from '@/lib/types';
import StarRating from '@/components/ui/StarRating';

export default function ProfessionalDetailModal() {
  const { 
    activeProfileModal, 
    setActiveProfileModal, 
    openBookingModal, 
    reviews, 
    addReview, 
    currentUser 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'credentials' | 'services' | 'reviews'>('credentials');
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [newReviewText, setNewReviewText] = useState<string>('');
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);

  if (!activeProfileModal) return null;

  const profReviews = reviews.filter(r => r.professionalId === activeProfileModal.id);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    addReview({
      professionalId: activeProfileModal.id,
      professionalName: activeProfileModal.name,
      customerId: currentUser?.id || 'cust-user',
      customerName: currentUser?.name || 'Verified Client',
      rating: newReviewRating,
      comment: newReviewText,
      verifiedBooking: true,
    });
    setNewReviewText('');
    setShowReviewForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setActiveProfileModal(null)}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-lg transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-200 dark:border-slate-800 mb-6">
          <img 
            src={activeProfileModal.avatarUrl} 
            alt={activeProfileModal.name} 
            className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500 shadow-md shrink-0"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://picsum.photos/seed/' + activeProfileModal.id + '/200/200';
            }}
          />

          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {activeProfileModal.name}
              </h2>
              {activeProfileModal.verificationStatus === 'verified' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Gold Verified Seal</span>
                </span>
              )}
            </div>
            
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-0.5">
              {activeProfileModal.title} · {activeProfileModal.profession}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {activeProfileModal.city}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-indigo-500" />
                {activeProfileModal.experienceYears} Years in Practice
              </span>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <StarRating
                  score={activeProfileModal.peerReviewScore || activeProfileModal.rating}
                  peerCount={activeProfileModal.peerVouchCount}
                  totalReviews={activeProfileModal.reviewCount}
                  size="sm"
                  label="Average Peer Review Score"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 mb-6">
          <button
            onClick={() => setActiveTab('credentials')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'credentials'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Statutory Audit & Peer Vouches ({activeProfileModal.peerVouchCount})
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'services'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Consultation Packages ({activeProfileModal.services.length})
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'reviews'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Client Reviews ({profReviews.length})
          </button>
        </div>

        {/* TAB 1: Credentials & Peer Audit */}
        {activeTab === 'credentials' && (
          <div className="space-y-6 text-xs">
            {/* Statutory Council License Info */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Statutory License Validation Record
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400">Issuing Statutory Body:</span>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">
                    {activeProfileModal.licensingBody}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">License / Registration Number:</span>
                  <p className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    {activeProfileModal.licenseNumber}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">Status in Council Directory:</span>
                  <p className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Active & In Good Standing
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">Office Chambers Address:</span>
                  <p className="text-slate-700 dark:text-slate-300">
                    {activeProfileModal.officeAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Academic Credentials & Bio */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Professional Bio & Qualifications
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                {activeProfileModal.bio}
              </p>
              <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-lg text-slate-700 dark:text-slate-300 flex items-start gap-2 border border-indigo-100 dark:border-indigo-950">
                <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">Credentials: </span>
                  {activeProfileModal.education}
                </div>
              </div>
            </div>

            {/* Peer Vouches Audit Trail */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-indigo-500" />
                  Verified Peer Endorsement Ledger ({activeProfileModal.peerVouches.length})
                </h4>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  {activeProfileModal.peerVouchCount} total endorsements recorded
                </span>
              </div>

              <div className="space-y-3">
                {activeProfileModal.peerVouches.map(vouch => (
                  <div 
                    key={vouch.id}
                    className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {vouch.voucherName}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                          {vouch.voucherRegNo}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {vouch.date}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 italic mb-1.5">
                      &ldquo;{vouch.comment}&rdquo;
                    </p>

                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400">
                      <CheckCircle className="w-3 h-3" />
                      <span>Attested as <strong>{vouch.relationship}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Consultation Services */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            {activeProfileModal.services.map(service => (
              <div 
                key={service.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-400 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {service.title}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-medium">
                      {service.mode}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {service.durationMinutes} Minutes Session
                    </span>
                    <span>·</span>
                    <span>SLA: {service.turnaroundTime}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-lg font-bold font-mono text-slate-900 dark:text-white mb-2">
                    ₹{service.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => {
                      setActiveProfileModal(null);
                      openBookingModal(activeProfileModal, service);
                    }}
                    className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-sm transition-colors whitespace-nowrap"
                  >
                    Book This Service
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Client Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  {activeProfileModal.rating}
                </span>
                <span className="text-xs text-slate-400">
                  based on {activeProfileModal.reviewCount} verified client sessions
                </span>
              </div>

              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                {showReviewForm ? 'Cancel Review' : 'Write a Review'}
              </button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                  Leave a Verified Client Review for {activeProfileModal.name}
                </h5>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReviewRating(star)}
                        className="text-lg"
                      >
                        <Star className={`w-5 h-5 ${star <= newReviewRating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Your Detailed Experience</label>
                  <textarea
                    rows={3}
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="Describe the quality of advisory, turnaround time, and professional conduct..."
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm"
                >
                  Publish Verified Review
                </button>
              </form>
            )}

            {/* Existing Reviews */}
            {profReviews.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">
                No client reviews published yet. Be the first to consult and review!
              </p>
            ) : (
              profReviews.map(rev => (
                <div key={rev.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">{rev.customerName}</span>
                      {rev.verifiedBooking && (
                        <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-0.5">
                          <CheckCircle className="w-3 h-3" /> Verified Client Booking
                        </span>
                      )}
                    </div>
                    <span className="text-slate-400 font-mono text-[11px]">{rev.date}</span>
                  </div>

                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    ))}
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 mb-2 leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>

                  {/* Provider response if present */}
                  {rev.providerResponse && (
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border-l-2 border-indigo-500 mt-2">
                      <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 mb-0.5">
                        Response from {activeProfileModal.name}:
                      </p>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400">
                        {rev.providerResponse.text}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Modal Bottom Sticky CTA */}
        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500">Starting Fee</span>
            <p className="text-base font-bold font-mono text-slate-900 dark:text-white">
              ₹{activeProfileModal.consultationFee.toLocaleString()}
            </p>
          </div>

          <button
            onClick={() => {
              const prof = activeProfileModal;
              setActiveProfileModal(null);
              openBookingModal(prof);
            }}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-colors"
          >
            Schedule Consultation Now
          </button>
        </div>

      </div>
    </div>
  );
}
