'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, Calendar, Clock, Video, MapPin, ShieldCheck, CheckCircle } from 'lucide-react';
import { ServicePackage } from '@/lib/types';

const SAMPLE_SLOTS = [
  '10:00 AM - 10:45 AM',
  '11:30 AM - 12:15 PM',
  '02:30 PM - 03:15 PM',
  '04:30 PM - 05:15 PM',
  '06:00 PM - 06:45 PM'
];

export default function BookingModal() {
  const { 
    bookingModalData, 
    closeBookingModal, 
    createAppointment, 
    currentUser, 
    setActivePanel 
  } = useApp();

  const { isOpen, professional, service } = bookingModalData;

  const [overrideServiceId, setOverrideServiceId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-04');
  const [selectedSlot, setSelectedSlot] = useState<string>(SAMPLE_SLOTS[0]);
  const [overrideMode, setOverrideMode] = useState<'Video Call' | 'In-Person Consultation' | 'Document Review & Audit' | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen || !professional) return null;

  const activeService = (overrideServiceId ? professional.services.find(s => s.id === overrideServiceId) : null) || service || professional.services[0];
  const consultationType = overrideMode || activeService?.mode || 'Video Call';
  const fee = activeService ? activeService.price : professional.consultationFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeService) return;

    createAppointment({
      professional,
      service: activeService,
      dateTime: selectedDate,
      timeSlot: selectedSlot,
      consultationType,
      notes,
    });

    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 my-8">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsSuccess(false);
            closeBookingModal();
          }}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Appointment Confirmed!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
              Your consultation with <strong>{professional.name}</strong> ({professional.profession}) is scheduled for <strong>{selectedDate}</strong> at <strong>{selectedSlot}</strong>.
            </p>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl max-w-sm mx-auto text-xs text-left mb-6 font-mono space-y-1">
              <p><strong>Mode:</strong> {consultationType}</p>
              <p><strong>Escrow Fee:</strong> ₹{fee.toLocaleString()} (Guaranteed)</p>
              <p><strong>Licensing Roll:</strong> {professional.licenseNumber}</p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setIsSuccess(false);
                  closeBookingModal();
                  setActivePanel('customer_panel');
                }}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm"
              >
                View in Customer Portal
              </button>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  closeBookingModal();
                }}
                className="px-4 py-2.5 text-xs font-semibold border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800 mb-5">
              <img 
                src={professional.avatarUrl} 
                alt="" 
                className="w-12 h-12 rounded-full object-cover border border-indigo-400"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://picsum.photos/seed/' + professional.id + '/150/150';
                }}
              />
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  Schedule Consultation with {professional.name}
                </h3>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  {professional.profession} · Council Reg: {professional.licenseNumber}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Select Service */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                  Select Consultation Offering
                </label>
                <div className="space-y-2">
                  {professional.services.map(srv => (
                    <label 
                      key={srv.id}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        activeService?.id === srv.id
                          ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="service_selection"
                          checked={activeService?.id === srv.id}
                          onChange={() => {
                            setOverrideServiceId(srv.id);
                            setOverrideMode(srv.mode);
                          }}
                          className="text-indigo-600"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{srv.title}</p>
                          <p className="text-[11px] text-slate-500">{srv.durationMinutes} mins · {srv.mode}</p>
                        </div>
                      </div>
                      <span className="font-bold font-mono text-slate-900 dark:text-white">
                        ₹{srv.price.toLocaleString()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                    Available Time Slot
                  </label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono"
                  >
                    {SAMPLE_SLOTS.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Consultation Mode */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                  Consultation Channel
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Video Call', 'In-Person Consultation', 'Document Review & Audit'] as const).map(mode => (
                    <button
                      type="button"
                      key={mode}
                      onClick={() => setOverrideMode(mode)}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        consultationType === mode
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 font-bold text-indigo-700 dark:text-indigo-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                  Brief Consultation Notes / Matter Scope
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share details regarding your tax notice, clinical symptom, contract clause, or architecture requirement..."
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
                />
              </div>

              {/* Escrow Trust note */}
              <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-start gap-2 text-emerald-800 dark:text-emerald-300 text-[11px]">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                <span>
                  <strong>Escrow Security Guarantee:</strong> Consultation fee is released to {professional.name} only following successful completion of your advisory session.
                </span>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-slate-400 block text-[10px]">Total Escrow Amount</span>
                  <p className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                    ₹{fee.toLocaleString()}
                  </p>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-sm transition-colors"
                >
                  Confirm & Reserve Appointment
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
