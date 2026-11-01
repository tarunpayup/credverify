'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

const LOADING_STAGES = [
  'Connecting to ICAI, NMC & Bar Council statutory registers...',
  'Auditing multi-signature peer attestation ledger...',
  'Calibrating average peer review scores...',
  'Preparing peer-verified services marketplace...'
];

export default function SplashScreen() {
  const { showSplash, setShowSplash, setActivePanel } = useApp();
  const [progress, setProgress] = useState(15);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    if (!showSplash) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowSplash(false);
            setActivePanel('marketplace');
          }, 350);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 15) + 10;
        const capped = Math.min(100, next);

        if (capped > 75) setCurrentStageIndex(3);
        else if (capped > 50) setCurrentStageIndex(2);
        else if (capped > 25) setCurrentStageIndex(1);

        if (capped === 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowSplash(false);
            setActivePanel('marketplace');
          }, 350);
        }

        return capped;
      });
    }, 280);

    return () => clearInterval(interval);
  }, [showSplash, setShowSplash, setActivePanel]);

  if (!showSplash) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 text-white p-4 select-none">
      <div className="w-full max-w-md mx-auto text-center space-y-6 animate-fade-in">
        
        {/* Animated Brand Shield */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-20 h-20 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 relative">
            <ShieldCheck className="w-10 h-10 animate-pulse text-indigo-400" />
            <div className="absolute -inset-1 rounded-2xl bg-indigo-500/10 blur-sm pointer-events-none"></div>
          </div>
        </div>

        {/* Brand Title & Tagline */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1.5">
            CredVerify
          </h1>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            The Trusted Network of Peer-Verified Professionals
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs font-mono text-slate-400 px-1">
            <span className="text-[11px] text-indigo-300 flex items-center gap-1.5 truncate max-w-[280px]">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping shrink-0"></span>
              {LOADING_STAGES[currentStageIndex]}
            </span>
            <span className="font-bold tabular-nums text-indigo-400">{progress}%</span>
          </div>

          <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
            <div
              className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Checklist Indicators */}
        <div className="bg-slate-900/80 rounded-xl border border-slate-800/80 p-3.5 text-left text-xs space-y-2 font-mono text-[11px]">
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 className={`w-3.5 h-3.5 ${progress >= 30 ? 'text-emerald-400' : 'text-slate-600'}`} />
              Statutory Council Verification
            </span>
            <span className={progress >= 30 ? 'text-emerald-400 font-semibold' : 'text-slate-600'}>
              {progress >= 30 ? 'READY' : 'PENDING'}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 className={`w-3.5 h-3.5 ${progress >= 65 ? 'text-emerald-400' : 'text-slate-600'}`} />
              Peer Multi-Signature Ledger
            </span>
            <span className={progress >= 65 ? 'text-emerald-400 font-semibold' : 'text-slate-600'}>
              {progress >= 65 ? 'VERIFIED' : 'SYNCING'}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 className={`w-3.5 h-3.5 ${progress >= 90 ? 'text-emerald-400' : 'text-slate-600'}`} />
              Directory Services Index
            </span>
            <span className={progress >= 90 ? 'text-emerald-400 font-semibold' : 'text-slate-600'}>
              {progress >= 90 ? 'LOADED' : 'INDEXING'}
            </span>
          </div>
        </div>

        {/* Skip action */}
        <div className="pt-2">
          <button
            onClick={() => {
              setShowSplash(false);
              setActivePanel('marketplace');
            }}
            className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-slate-800/60"
          >
            <span>Skip to Marketplace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
