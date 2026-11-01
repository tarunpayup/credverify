'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  ShieldCheck, 
  Users, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  DollarSign, 
  Search, 
  Filter, 
  Scale, 
  Building, 
  FileText, 
  Activity, 
  Code2,
  ChevronRight,
  TrendingUp,
  Eye
} from 'lucide-react';
import { VerificationRequest, DisputeTicket } from '@/lib/types';

export default function SuperAdminPanel() {
  const { 
    verifications, 
    approveVerification, 
    rejectVerification, 
    disputes, 
    updateDisputeStatus,
    professionals,
    appointments
  } = useApp();

  const [activeTab, setActiveTab] = useState<'verifications' | 'disputes' | 'users' | 'analytics'>('verifications');
  const [selectedReqForInspection, setSelectedReqForInspection] = useState<VerificationRequest | null>(null);
  const [adminNotes, setAdminNotes] = useState<string>('');

  const pendingVerifications = verifications.filter(v => v.status === 'pending');
  const approvedVerifications = verifications.filter(v => v.status === 'approved');

  const openDisputes = disputes.filter(d => d.status !== 'resolved');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-semibold border border-amber-200 dark:border-amber-800 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Super Admin Oversight Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Platform Governance & Credential Audit
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Auditing statutory licensing rolls, multi-signature peer vouches, and resolving client disputes
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 text-white font-mono">
            RBAC: SUPER_ADMIN_ROOT
          </span>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <span className="text-xs text-slate-400">Pending Council Audits</span>
          <p className="text-2xl font-bold font-mono text-amber-500 mt-1">
            {pendingVerifications.length} Queue
          </p>
          <span className="text-[10px] text-slate-500 mt-1 block">
            Awaiting statutory roll verification
          </span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <span className="text-xs text-slate-400">Total Verified Professionals</span>
          <p className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            {professionals.filter(p => p.verificationStatus === 'verified').length} / {professionals.length}
          </p>
          <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
            <CheckCircle className="w-3 h-3" /> 100% active standing
          </span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <span className="text-xs text-slate-400">Platform GMV (Escrow)</span>
          <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
            ₹3,84,200
          </p>
          <span className="text-[10px] text-slate-500 mt-1 block">
            {appointments.length} active sessions
          </span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <span className="text-xs text-slate-400">Active Disputes</span>
          <p className="text-2xl font-bold font-mono text-rose-500 mt-1">
            {openDisputes.length} Open
          </p>
          <span className="text-[10px] text-slate-500 mt-1 block">
            SLA: Resolution within 24 hours
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('verifications')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'verifications'
              ? 'border-amber-500 text-amber-600 dark:text-amber-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Credential Verification Queue ({pendingVerifications.length})
        </button>

        <button
          onClick={() => setActiveTab('disputes')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'disputes'
              ? 'border-amber-500 text-amber-600 dark:text-amber-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Dispute Resolution ({openDisputes.length})
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'users'
              ? 'border-amber-500 text-amber-600 dark:text-amber-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          User & Practitioner Registry ({professionals.length + 4})
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'analytics'
              ? 'border-amber-500 text-amber-600 dark:text-amber-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Council Distribution & Analytics
        </button>
      </div>

      {/* TAB 1: Verification Queue */}
      {activeTab === 'verifications' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Pending Statutory Licensing Audits
            </h3>
            <span className="text-xs text-slate-500">
              Cross-checked against ICAI, NMC, Bar Council & IEEE directories
            </span>
          </div>

          <div className="space-y-4">
            {verifications.map(req => (
              <div 
                key={req.id}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 dark:text-white text-base">
                      {req.providerName}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                      {req.profession}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                      req.status === 'approved' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                      req.status === 'pending' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                      'bg-rose-50 text-rose-700'
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400">Statutory Authority: </span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{req.licensingBody}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">License Number: </span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">{req.licenseNumber}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Document Uploaded: </span>
                      <span className="font-mono text-indigo-600 dark:text-indigo-400">{req.documentName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Peer Signatures: </span>
                      <span className={`font-bold ${req.peerVouchesGathered >= req.peerVouchesTarget ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {req.peerVouchesGathered} of {req.peerVouchesTarget} Required
                      </span>
                    </div>
                  </div>

                  {req.notes && (
                    <p className="text-xs text-slate-500 italic bg-slate-50 dark:bg-slate-800/60 p-2 rounded border border-slate-100 dark:border-slate-800">
                      Audit Note: {req.notes}
                    </p>
                  )}
                </div>

                {/* Audit Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 self-end lg:self-auto">
                  {req.status === 'pending' && (
                    <>
                      <button
                        onClick={() => approveVerification(req.id, 'Statutory roll verified & peer quorum confirmed.')}
                        className="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Approve with Gold Seal</span>
                      </button>

                      <button
                        onClick={() => rejectVerification(req.id, 'Statutory registry mismatch or missing peer quorum.')}
                        className="px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </>
                  )}

                  {req.status === 'approved' && (
                    <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Seal Granted
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Disputes */}
      {activeTab === 'disputes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Customer & Provider Dispute Tickets
            </h3>
            <span className="text-xs text-slate-500">
              Escrow funds held until ticket resolution
            </span>
          </div>

          <div className="space-y-3">
            {disputes.map(disp => (
              <div 
                key={disp.id}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{disp.ticketNumber}</span>
                    <span className="text-slate-400">·</span>
                    <span className="font-semibold text-rose-600 dark:text-rose-400">{disp.issueType}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase ${
                      disp.status === 'resolved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {disp.status}
                    </span>
                  </div>
                  <span className="text-slate-400 font-mono text-[11px]">{disp.dateOpened}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 dark:text-slate-300">
                  <div>
                    <span className="text-slate-400">Customer: </span>
                    <span className="font-medium text-slate-900 dark:text-white">{disp.customerName}</span> ({disp.customerEmail})
                  </div>
                  <div>
                    <span className="text-slate-400">Provider Involved: </span>
                    <span className="font-medium text-slate-900 dark:text-white">{disp.providerName}</span> ({disp.providerProfession})
                  </div>
                </div>

                <p className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-slate-700 dark:text-slate-300">
                  {disp.description}
                </p>

                {disp.resolution && (
                  <p className="p-2.5 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 rounded border border-emerald-100 dark:border-emerald-900">
                    <strong>Resolution Action: </strong>{disp.resolution}
                  </p>
                )}

                {disp.status !== 'resolved' && (
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => updateDisputeStatus(disp.id, 'resolved', 'Refund issued to customer; provider agreed to reschedule complimentary session.')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold"
                    >
                      Issue Mediated Resolution
                    </button>
                    <button
                      onClick={() => updateDisputeStatus(disp.id, 'investigating')}
                      className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium"
                    >
                      Request Call Logs
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: User Registry */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Platform Registered Users & RBAC Directory
            </h3>
            <span className="text-xs text-slate-500">
              Role assignment & account integrity controls
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">User / Practitioner</th>
                  <th className="p-3">Discipline</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Council License</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {professionals.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <img 
                          src={p.avatarUrl} 
                          alt="" 
                          className="w-7 h-7 rounded-full object-cover" 
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = 'https://picsum.photos/seed/' + p.id + '/100/100';
                          }}
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{p.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{p.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">{p.profession}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-mono text-[10px] uppercase font-semibold">
                        SERVICE_PROVIDER
                      </span>
                    </td>
                    <td className="p-3 font-mono">{p.licenseNumber}</td>
                    <td className="p-3">
                      <span className="text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Analytics */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4">
              Profession Distribution on Platform
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Chartered Accountants (ICAI)</span>
                  <span className="font-mono font-bold">35%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full w-[35%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Medical Doctors (NMC)</span>
                  <span className="font-mono font-bold">30%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full w-[30%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Legal Advocates (Bar Council)</span>
                  <span className="font-mono font-bold">20%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-600 h-full w-[20%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Software Architects & Engineers</span>
                  <span className="font-mono font-bold">15%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-full w-[15%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4">
              Geographic Metropolitan Penetration
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="font-medium text-slate-800 dark:text-slate-200">Mumbai Financial District</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">340 Verified Practitioners</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="font-medium text-slate-800 dark:text-slate-200">Bengaluru Tech Corridor</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">410 Verified Practitioners</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="font-medium text-slate-800 dark:text-slate-200">Delhi NCR High Court & Tribunals</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">280 Verified Practitioners</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="font-medium text-slate-800 dark:text-slate-200">Pune Tech & Automotive Hub</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">190 Verified Practitioners</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
