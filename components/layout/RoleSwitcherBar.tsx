'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, UserCheck, Briefcase, LayoutDashboard, Compass, BookOpen, Sparkles } from 'lucide-react';

export default function RoleSwitcherBar() {
  const { 
    activePanel, 
    setActivePanel, 
    currentUser, 
    loginAs, 
    setShowSplash 
  } = useApp();

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs px-4 py-2 sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Left side: Role state indicator */}
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Role-Based Access:
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-white font-medium">
            {currentUser ? `${currentUser.name} (${currentUser.role.toUpperCase()})` : 'Public Guest'}
          </span>
        </div>

        {/* Center / Right: 4 Separated Panels Fast Switcher */}
        <div className="flex items-center flex-wrap gap-1.5 overflow-x-auto py-1 sm:py-0">
          {/* Panel 1 Button */}
          <button
            onClick={() => {
              setActivePanel('marketplace');
            }}
            className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activePanel === 'marketplace'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>1. Main Marketplace</span>
          </button>

          {/* Panel 2 Button */}
          <button
            onClick={() => {
              if (currentUser?.role !== 'provider') {
                loginAs('provider_ca');
              } else {
                setActivePanel('provider_dashboard');
              }
            }}
            className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activePanel === 'provider_dashboard'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>2. Provider Dashboard</span>
          </button>

          {/* Panel 3 Button */}
          <button
            onClick={() => {
              if (currentUser?.role !== 'superadmin') {
                loginAs('admin');
              } else {
                setActivePanel('admin_panel');
              }
            }}
            className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activePanel === 'admin_panel'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>3. Super Admin Panel</span>
          </button>

          {/* Panel 4 Button */}
          <button
            onClick={() => {
              if (currentUser?.role !== 'customer') {
                loginAs('customer');
              } else {
                setActivePanel('customer_panel');
              }
            }}
            className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activePanel === 'customer_panel'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>4. Customer Panel</span>
          </button>

          {/* Blog Button */}
          <button
            onClick={() => {
              setActivePanel('blog');
            }}
            className={`px-2.5 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activePanel === 'blog'
                ? 'bg-slate-700 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Blog Hub</span>
          </button>

          {/* Reopen Loading Splash button */}
          <button
            onClick={() => setShowSplash(true)}
            title="Replay Loading Splash Screen"
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>

      </div>
    </div>
  );
}
