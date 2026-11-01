'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, User, LogOut, ChevronDown } from 'lucide-react';

export default function TopNavigation() {
  const { 
    activePanel, 
    setActivePanel, 
    currentUser, 
    setIsAuthModalOpen, 
    setAuthModalMode, 
    logout 
  } = useApp();

  return (
    <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-9 z-30 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        
        {/* Zone 1: Single text element wordmark */}
        <div 
          onClick={() => setActivePanel('marketplace')}
          className="cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            CredVerify
          </span>
        </div>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button 
            onClick={() => setActivePanel('marketplace')}
            className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activePanel === 'marketplace' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
            }`}
          >
            Find Services
          </button>

          <button 
            onClick={() => {
              setActivePanel('marketplace');
              const el = document.getElementById('how-it-works-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Peer Verification
          </button>

          <button 
            onClick={() => {
              setActivePanel('marketplace');
              const el = document.getElementById('community-qa-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Community Q&A
          </button>

          <button 
            onClick={() => setActivePanel('blog')}
            className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activePanel === 'blog' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
            }`}
          >
            Insights & Blog
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (currentUser.role === 'provider') setActivePanel('provider_dashboard');
                  else if (currentUser.role === 'superadmin') setActivePanel('admin_panel');
                  else setActivePanel('customer_panel');
                }}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
              >
                <User className="w-3.5 h-3.5 text-indigo-500" />
                <span className="max-w-[120px] truncate">{currentUser.name}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-mono uppercase">
                  {currentUser.role}
                </span>
              </button>

              <button
                onClick={logout}
                title="Log Out"
                className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                aria-label="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAuthModalMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setAuthModalMode('signup');
                  setIsAuthModalOpen(true);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
              >
                Join as Professional
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
