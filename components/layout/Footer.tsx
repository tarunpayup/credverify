'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, Award, Lock, FileText, Scale } from 'lucide-react';

export default function Footer() {
  const { setActivePanel, setSelectedProfession, setSelectedCity } = useApp();

  return (
    <footer className="w-full bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white text-xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>CredVerify</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              The premier marketplace for peer-verified Chartered Accountants, Medical Doctors, Legal Advocates, and Software Architects, fortified by statutory license audits and peer multi-signature verification.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-mono">
              <Lock className="w-3.5 h-3.5" />
              <span>100% Escrow Protection Guaranteed</span>
            </div>
          </div>

          {/* Col 2: High-Trust Professions */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Professional Councils
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => {
                    setSelectedProfession('Chartered Accountant');
                    setActivePanel('marketplace');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Chartered Accountants (ICAI)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setSelectedProfession('Doctor');
                    setActivePanel('marketplace');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Medical Doctors & Specialists (NMC)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setSelectedProfession('Lawyer');
                    setActivePanel('marketplace');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Advocates & Legal Counsel (Bar Council)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setSelectedProfession('Software Engineer');
                    setActivePanel('marketplace');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Software Architects & Tech Leads (IEEE)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setSelectedProfession('Architect');
                    setActivePanel('marketplace');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Structural Architects (Council of Architecture)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Metropolitan Hubs */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Top Metropolitan Hubs
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => {
                    setSelectedCity('Mumbai');
                    setActivePanel('marketplace');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Mumbai Financial District
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setSelectedCity('Bengaluru');
                    setActivePanel('marketplace');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Bengaluru Tech Corridor
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setSelectedCity('Delhi NCR');
                    setActivePanel('marketplace');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Delhi NCR High Court & Tribunals
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setSelectedCity('Pune');
                    setActivePanel('marketplace');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Pune Enterprise & Industrial
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setSelectedCity('Hyderabad');
                    setActivePanel('marketplace');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Hyderabad HITEC City
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Oversight & Portals */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Marketplace Portals
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActivePanel('marketplace')} className="hover:text-white transition-colors">
                  1. Services Directory
                </button>
              </li>
              <li>
                <button onClick={() => setActivePanel('provider_dashboard')} className="hover:text-white transition-colors">
                  2. Practitioner Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActivePanel('admin_panel')} className="hover:text-white transition-colors">
                  3. Super Admin Oversight
                </button>
              </li>
              <li>
                <button onClick={() => setActivePanel('customer_panel')} className="hover:text-white transition-colors">
                  4. Customer Account Portal
                </button>
              </li>
              <li>
                <button onClick={() => setActivePanel('blog')} className="hover:text-white transition-colors">
                  Knowledge Hub & Regulatory Gazette
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 CredVerify Peer-Verified Directory Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Statutory Roll Privacy Safe</span>
            <span>·</span>
            <span>256-bit TLS Encrypted Sessions</span>
            <span>·</span>
            <span>Escrow Resolution Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
