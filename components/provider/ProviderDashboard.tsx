'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Briefcase, 
  Calendar, 
  Users, 
  Plus, 
  CheckCircle, 
  Clock, 
  Video, 
  MessageSquare, 
  DollarSign, 
  Award, 
  FileText, 
  Send,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Star
} from 'lucide-react';
import { ServicePackage, PeerVouch } from '@/lib/types';

export default function ProviderDashboard() {
  const { 
    currentUser, 
    loginAs, 
    professionals, 
    appointments, 
    updateAppointmentStatus, 
    reviews, 
    addProviderResponse, 
    submitPeerVouch, 
    addServiceToProvider,
    submitVerificationRequest
  } = useApp();

  const [activeTab, setActiveTab] = useState<'appointments' | 'vouches' | 'services' | 'reviews' | 'compliance'>('appointments');
  
  // Find current professional profile (default to CA Rajesh if none matched)
  const currentProf = professionals.find(p => p.id === currentUser?.providerProfileId) || professionals[0];

  // Provider appointments
  const providerAppointments = appointments.filter(a => a.providerId === currentProf.id);

  // Provider reviews
  const providerReviews = reviews.filter(r => r.professionalId === currentProf.id);

  // Form states
  const [responseInputs, setResponseInputs] = useState<Record<string, string>>({});
  
  // Peer vouching form state
  const [vouchTargetId, setVouchTargetId] = useState<string>(professionals[1]?.id || '');
  const [vouchRelationship, setVouchRelationship] = useState<PeerVouch['relationship']>('Council Peer');
  const [vouchComment, setVouchComment] = useState<string>('');
  
  // New service form state
  const [showAddService, setShowAddService] = useState<boolean>(false);
  const [newServiceTitle, setNewServiceTitle] = useState<string>('');
  const [newServicePrice, setNewServicePrice] = useState<number>(3000);
  const [newServiceDuration, setNewServiceDuration] = useState<number>(45);
  const [newServiceMode, setNewServiceMode] = useState<ServicePackage['mode']>('Video Call');
  const [newServiceDesc, setNewServiceDesc] = useState<string>('');

  // New compliance upload state
  const [complianceDocName, setComplianceDocName] = useState<string>('Annual_Certificate_Of_Practice_2026.pdf');

  // Handle Response submit
  const handleSendResponse = (reviewId: string) => {
    const text = responseInputs[reviewId];
    if (!text || !text.trim()) return;
    addProviderResponse(reviewId, text);
    setResponseInputs(prev => ({ ...prev, [reviewId]: '' }));
  };

  // Handle Peer Vouch submit
  const handleVouchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vouchComment.trim()) return;
    submitPeerVouch(vouchTargetId, {
      voucherId: currentProf.id,
      voucherName: currentProf.name,
      voucherProfession: currentProf.profession,
      voucherRegNo: currentProf.licenseNumber,
      relationship: vouchRelationship,
      comment: vouchComment,
    });
    setVouchComment('');
  };

  // Handle Add Service submit
  const handleAddServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceTitle.trim()) return;
    addServiceToProvider(currentProf.id, {
      title: newServiceTitle,
      price: Number(newServicePrice),
      durationMinutes: Number(newServiceDuration),
      mode: newServiceMode,
      description: newServiceDesc || 'Custom specialized advisory session.',
      turnaroundTime: '24 Hours'
    });
    setNewServiceTitle('');
    setNewServiceDesc('');
    setShowAddService(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
      
      {/* Top Banner with Provider Persona Switcher */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 mb-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="flex items-start sm:items-center gap-4">
            <img 
              src={currentProf.avatarUrl} 
              alt={currentProf.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 shadow shrink-0"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://picsum.photos/seed/' + currentProf.id + '/200/200';
              }}
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {currentProf.name}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Gold Council Seal</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
                {currentProf.title} · {currentProf.profession}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-500 font-mono mt-1">
                <span>Reg: {currentProf.licenseNumber}</span>
                <span>·</span>
                <span>{currentProf.city}</span>
              </div>
            </div>
          </div>

          {/* Quick Demo Switcher between CA, Doctor, and Lawyer */}
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-semibold text-slate-500 px-2">
              Switch Persona:
            </span>
            <button
              onClick={() => loginAs('provider_ca')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                currentProf.profession === 'Chartered Accountant'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
              }`}
            >
              CA Rajesh
            </button>
            <button
              onClick={() => loginAs('provider_doc')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                currentProf.profession === 'Doctor'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
              }`}
            >
              Dr. Ananya
            </button>
          </div>

        </div>

        {/* 4 Key KPI Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <span className="text-xs text-slate-400">Monthly Earnings</span>
            <p className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
              ₹84,500
            </p>
            <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3" /> +18% vs last month
            </span>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <span className="text-xs text-slate-400">Total Bookings</span>
            <p className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
              {providerAppointments.length + 34}
            </p>
            <span className="text-[10px] text-slate-500 mt-0.5 block">
              {providerAppointments.filter(a => a.status === 'confirmed').length} upcoming sessions
            </span>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <span className="text-xs text-slate-400">Peer Attestations</span>
            <p className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
              {currentProf.peerVouchCount} Peers
            </p>
            <span className="text-[10px] text-slate-500 mt-0.5 block">
              Required threshold: 3
            </span>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <span className="text-xs text-slate-400">Client Rating</span>
            <p className="text-xl font-bold font-mono text-amber-500 mt-0.5 flex items-center gap-1">
              <Star className="w-5 h-5 fill-amber-500 inline" />
              {currentProf.rating}
            </p>
            <span className="text-[10px] text-slate-500 mt-0.5 block">
              {currentProf.reviewCount} verified reviews
            </span>
          </div>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'appointments'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Appointments & Consultations ({providerAppointments.length})
        </button>

        <button
          onClick={() => setActiveTab('vouches')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'vouches'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Peer Endorsements & Networking ({currentProf.peerVouches.length})
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'services'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Service Packages & Rates ({currentProf.services.length})
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'reviews'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Client Reviews & Responses ({providerReviews.length})
        </button>

        <button
          onClick={() => setActiveTab('compliance')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'compliance'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Council Licensing & Audits
        </button>
      </div>

      {/* TAB 1: Appointments */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Upcoming & Recent Client Consultations
            </h3>
            <span className="text-xs text-slate-500">
              Escrow payment captured upon booking
            </span>
          </div>

          {providerAppointments.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                No active appointments booked yet
              </p>
              <p className="text-xs text-slate-500 mt-1">
                New client bookings will appear here in real time.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {providerAppointments.map(apt => (
                <div 
                  key={apt.id}
                  className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        {apt.customerName}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        ({apt.customerEmail})
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase ${
                        apt.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' :
                        apt.status === 'completed' ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' :
                        'bg-amber-50 text-amber-700'
                      }`}>
                        {apt.status}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      {apt.serviceTitle}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                      <span>Date: {apt.dateTime}</span>
                      <span>·</span>
                      <span>Slot: {apt.timeSlot}</span>
                      <span>·</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">Fee: ₹{apt.fee.toLocaleString()}</span>
                    </div>

                    {apt.notes && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-800/60 p-2 rounded mt-2 border border-slate-100 dark:border-slate-800">
                        Client Note: &ldquo;{apt.notes}&rdquo;
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                    {apt.meetingLink && apt.status === 'confirmed' && (
                      <a
                        href={apt.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Join Room</span>
                      </a>
                    )}

                    {apt.status === 'confirmed' && (
                      <button
                        onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                        className="px-3 py-1.5 text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-800 dark:text-slate-200 rounded-lg transition-colors"
                      >
                        Mark Completed
                      </button>
                    )}

                    {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                      <button
                        onClick={() => updateAppointmentStatus(apt.id, 'cancelled')}
                        className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
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

      {/* TAB 2: Peer Network & Endorsements */}
      {activeTab === 'vouches' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Endorsements Received */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Peer Endorsements Recorded on Your Council Roll
              </h3>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                Gold Seal Active
              </span>
            </div>

            <div className="space-y-3">
              {currentProf.peerVouches.map(vouch => (
                <div 
                  key={vouch.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        {vouch.voucherName}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                        {vouch.voucherRegNo}
                      </span>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px]">{vouch.date}</span>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 italic mb-2 leading-relaxed">
                    &ldquo;{vouch.comment}&rdquo;
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Attested as <strong>{vouch.relationship}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Vouch for another peer */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 h-fit shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-indigo-500" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Vouch for a Colleague
              </h4>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              As a verified practitioner, your signature helps colleagues earn their Gold Verified Seal on the directory.
            </p>

            <form onSubmit={handleVouchSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">Select Colleague</label>
                <select
                  value={vouchTargetId}
                  onChange={(e) => setVouchTargetId(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs"
                >
                  {professionals.filter(p => p.id !== currentProf.id).map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.profession} · {p.licenseNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">Professional Relationship</label>
                <select
                  value={vouchRelationship}
                  onChange={(e) => setVouchRelationship(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs"
                >
                  <option value="Council Peer">Council Peer</option>
                  <option value="Former Colleague">Former Colleague</option>
                  <option value="Senior Partner">Senior Partner</option>
                  <option value="Clinical Associate">Clinical Associate</option>
                  <option value="Project Co-lead">Project Co-lead</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">Attestation Statement</label>
                <textarea
                  rows={3}
                  value={vouchComment}
                  onChange={(e) => setVouchComment(e.target.value)}
                  placeholder="I attest to this practitioner's ethical conduct, statutory registration, and professional competence in..."
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Peer Endorsement</span>
              </button>
            </form>
          </div>

        </div>
      )}

      {/* TAB 3: Services & Rates */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Active Consultation Packages
              </h3>
              <p className="text-xs text-slate-500">
                Clients book these directly from your marketplace profile
              </p>
            </div>

            <button
              onClick={() => setShowAddService(!showAddService)}
              className="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{showAddService ? 'Cancel' : 'Add New Service'}</span>
            </button>
          </div>

          {/* Add Service Form */}
          {showAddService && (
            <form onSubmit={handleAddServiceSubmit} className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-emerald-400 dark:border-emerald-600 shadow-md space-y-4 text-xs">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Create New Service Offering
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-500 mb-1">Service Title</label>
                  <input
                    type="text"
                    value={newServiceTitle}
                    onChange={(e) => setNewServiceTitle(e.target.value)}
                    placeholder="e.g. Statutory Tax Filing or Heart Health Review"
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Fee (₹ INR)</label>
                  <input
                    type="number"
                    value={newServicePrice}
                    onChange={(e) => setNewServicePrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Consultation Mode</label>
                  <select
                    value={newServiceMode}
                    onChange={(e) => setNewServiceMode(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value="Video Call">Video Call</option>
                    <option value="In-Person Consultation">In-Person Consultation</option>
                    <option value="Document Review & Audit">Document Review & Audit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-500 mb-1">Deliverables & Scope</label>
                <textarea
                  rows={2}
                  value={newServiceDesc}
                  onChange={(e) => setNewServiceDesc(e.target.value)}
                  placeholder="Describe what the client receives (written memo, prescription, code review)..."
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-sm"
              >
                Save & Publish Service
              </button>
            </form>
          )}

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentProf.services.map(service => (
              <div 
                key={service.id}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {service.mode}
                    </span>
                    <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
                      ₹{service.price.toLocaleString()}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    {service.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 font-mono">
                  <span>Duration: {service.durationMinutes} min</span>
                  <span>Turnaround: {service.turnaroundTime}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 4: Client Reviews */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Client Feedback & Public Responses
            </h3>
            <span className="text-xs text-slate-500">
              {providerReviews.length} verified reviews
            </span>
          </div>

          <div className="space-y-4">
            {providerReviews.map(rev => (
              <div 
                key={rev.id}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{rev.customerName}</span>
                    <div className="flex items-center gap-0.5 text-amber-500">
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

                {/* Existing provider response */}
                {rev.providerResponse ? (
                  <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg border border-emerald-100 dark:border-emerald-900">
                    <p className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 mb-0.5">
                      Your Official Response ({rev.providerResponse.date}):
                    </p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      {rev.providerResponse.text}
                    </p>
                  </div>
                ) : (
                  <div className="pt-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={responseInputs[rev.id] || ''}
                        onChange={(e) => setResponseInputs(prev => ({ ...prev, [rev.id]: e.target.value }))}
                        placeholder="Write an official response to this client..."
                        className="flex-1 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                      />
                      <button
                        onClick={() => handleSendResponse(rev.id)}
                        className="px-3 py-2 bg-slate-900 dark:bg-indigo-600 text-white rounded-lg font-semibold text-xs whitespace-nowrap"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Council Licensing & Compliance */}
      {activeTab === 'compliance' && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 text-xs">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Statutory Council Compliance Records
            </h3>
            <p className="text-slate-500">
              Keep your statutory membership active to maintain directory visibility
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Statutory Register:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{currentProf.licensingBody}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">License Number:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{currentProf.licenseNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Audit Status:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Gold Seal Verified
              </span>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">
              Submit Updated Certificate of Practice / Degree Credential
            </h4>
            <div className="flex items-center gap-2 mb-3">
              <input 
                type="text" 
                value={complianceDocName}
                onChange={(e) => setComplianceDocName(e.target.value)}
                className="flex-1 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
              />
              <button
                onClick={() => {
                  submitVerificationRequest({
                    providerId: currentProf.id,
                    providerName: currentProf.name,
                    profession: currentProf.profession,
                    licenseNumber: currentProf.licenseNumber,
                    licensingBody: currentProf.licensingBody,
                    documentName: complianceDocName,
                    documentType: 'License',
                    notes: 'Annual renewal certificate submitted for re-attestation.'
                  });
                }}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg whitespace-nowrap shadow-sm"
              >
                Submit to Super Admin
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Submissions are audited against official council gazettes within 24 hours.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
