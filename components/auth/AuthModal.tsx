'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, ShieldCheck, UserCheck, Briefcase, KeyRound, CheckCircle } from 'lucide-react';
import { ProfessionType, UserRole } from '@/lib/types';

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalMode, 
    setAuthModalMode, 
    setCurrentUser, 
    setActivePanel, 
    loginAs, 
    showToast 
  } = useApp();

  const [role, setRole] = useState<'customer' | 'provider' | 'superadmin'>('customer');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [profession, setProfession] = useState<ProfessionType>('Chartered Accountant');
  const [licenseNumber, setLicenseNumber] = useState<string>('');
  const [city, setCity] = useState<string>('Mumbai');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: role as UserRole,
      city,
      profession: role === 'provider' ? profession : undefined,
      licenseNumber: role === 'provider' ? licenseNumber : undefined,
    };

    setCurrentUser(newUser);
    setIsAuthModalOpen(false);

    if (role === 'provider') {
      setActivePanel('provider_dashboard');
      showToast(`Welcome ${name}! Your practitioner dashboard is ready.`);
    } else if (role === 'superadmin') {
      setActivePanel('admin_panel');
      showToast(`Logged in as Administrator.`);
    } else {
      setActivePanel('customer_panel');
      showToast(`Welcome ${name}! Customer account created.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 my-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center mx-auto mb-2 font-bold shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {authModalMode === 'login' ? 'Sign In to CredVerify' : 'Join Peer-Verified Network'}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Role-Based Access for Clients, Practitioners & Platform Governance
          </p>
        </div>

        {/* One-Click Fast Demo Logins */}
        <div className="mb-6 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2">
            Instant Demo Account Sign-In:
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                loginAs('customer');
                setIsAuthModalOpen(false);
              }}
              className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-purple-400 text-left font-medium text-slate-800 dark:text-slate-200"
            >
              <span className="font-bold block text-purple-600">Client Account</span>
              <span className="text-[10px] text-slate-400">Aarav Mehta</span>
            </button>

            <button
              onClick={() => {
                loginAs('provider_ca');
                setIsAuthModalOpen(false);
              }}
              className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 text-left font-medium text-slate-800 dark:text-slate-200"
            >
              <span className="font-bold block text-emerald-600">CA Rajesh</span>
              <span className="text-[10px] text-slate-400">Chartered Accountant</span>
            </button>

            <button
              onClick={() => {
                loginAs('provider_doc');
                setIsAuthModalOpen(false);
              }}
              className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 text-left font-medium text-slate-800 dark:text-slate-200"
            >
              <span className="font-bold block text-emerald-600">Dr. Ananya</span>
              <span className="text-[10px] text-slate-400">Cardiologist (NMC)</span>
            </button>

            <button
              onClick={() => {
                loginAs('admin');
                setIsAuthModalOpen(false);
              }}
              className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-400 text-left font-medium text-slate-800 dark:text-slate-200"
            >
              <span className="font-bold block text-amber-600">Super Admin</span>
              <span className="text-[10px] text-slate-400">Governance Portal</span>
            </button>
          </div>
        </div>

        {/* Custom Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          
          {/* Role Selector Tabs */}
          <div>
            <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
              Select Your Role
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`py-1.5 rounded-md font-semibold transition-all ${
                  role === 'customer'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setRole('provider')}
                className={`py-1.5 rounded-md font-semibold transition-all ${
                  role === 'provider'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Practitioner
              </button>
              <button
                type="button"
                onClick={() => setRole('superadmin')}
                className={`py-1.5 rounded-md font-semibold transition-all ${
                  role === 'superadmin'
                    ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          <div>
            <label className="block text-slate-600 dark:text-slate-400 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Adv. Rohit Mehra or Tarun"
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              required
            />
          </div>

          <div>
            <label className="block text-slate-600 dark:text-slate-400 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@professional.org"
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono"
              required
            />
          </div>

          {/* Conditional Fields for Service Provider */}
          {role === 'provider' && (
            <>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Professional Discipline</label>
                <select
                  value={profession}
                  onChange={(e) => setProfession(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                >
                  <option value="Chartered Accountant">Chartered Accountant (ICAI)</option>
                  <option value="Doctor">Medical Doctor (NMC / State Council)</option>
                  <option value="Lawyer">Advocate / Legal Counsel (Bar Council)</option>
                  <option value="Software Engineer">Software Architect / Engineer (IEEE / Tech)</option>
                  <option value="Architect">Architect (Council of Architecture)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Statutory License / Registration Number</label>
                <input
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="e.g. ICAI-FCA-19024 or NMC-59281"
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-slate-600 dark:text-slate-400 mb-1">City Location</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="Mumbai">Mumbai</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Pune">Pune</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="London">London</option>
              <option value="New York">New York</option>
              <option value="San Francisco">San Francisco</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-sm transition-colors mt-2"
          >
            {authModalMode === 'login' ? 'Sign In to Workspace' : 'Create Account & Access Panel'}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
          {authModalMode === 'login' ? (
            <p>
              Don&apos;t have an account?{' '}
              <button
                onClick={() => setAuthModalMode('signup')}
                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                Sign up as Practitioner or Client
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                onClick={() => setAuthModalMode('login')}
                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
