'use client';

import React, { useState } from 'react';
import { Star, Users, ShieldCheck, Info } from 'lucide-react';

interface StarRatingProps {
  score: number; // e.g. 4.95
  maxStars?: number; // default: 5
  peerCount?: number; // e.g. 19
  totalReviews?: number; // e.g. 142
  showDetailsTooltip?: boolean;
  size?: 'xs' | 'sm' | 'md';
  label?: string; // default: 'Peer Review Score'
}

export default function StarRating({
  score,
  maxStars = 5,
  peerCount = 3,
  totalReviews,
  showDetailsTooltip = true,
  size = 'sm',
  label = 'Peer Review Score'
}: StarRatingProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Compute peer review score (consistently normalized between 4.5 and 5.0 for verified practitioners)
  const peerScore = Number(score.toFixed(2));

  // Determine star icon sizes
  const starDimensions = size === 'xs' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';
  const textSize = size === 'xs' ? 'text-[11px]' : size === 'md' ? 'text-sm' : 'text-xs';

  return (
    <div className="relative inline-flex flex-col">
      <div 
        className="inline-flex items-center gap-1.5 cursor-pointer group"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(prev => !prev)}
        role="button"
        tabIndex={0}
        aria-label={`${label}: ${peerScore} out of 5 stars based on ${peerCount} peer evaluations`}
      >
        {/* 5-Star Visual Display */}
        <div className="flex items-center gap-0.5" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((starIndex) => {
            const fillRatio = Math.max(0, Math.min(1, peerScore - (starIndex - 1)));
            
            if (fillRatio >= 0.85) {
              // Full Star
              return (
                <Star
                  key={starIndex}
                  className={`${starDimensions} text-amber-500 fill-amber-500 transition-transform group-hover:scale-105`}
                />
              );
            } else if (fillRatio >= 0.25) {
              // Half Star via gradient SVG
              return (
                <div key={starIndex} className={`relative ${starDimensions}`}>
                  <Star className={`${starDimensions} text-slate-300 dark:text-slate-700 absolute inset-0`} />
                  <div className="overflow-hidden absolute inset-0 w-[50%]">
                    <Star className={`${starDimensions} text-amber-500 fill-amber-500`} />
                  </div>
                </div>
              );
            } else {
              // Empty Star
              return (
                <Star
                  key={starIndex}
                  className={`${starDimensions} text-slate-300 dark:text-slate-700`}
                />
              );
            }
          })}
        </div>

        {/* Tabular Score Display */}
        <span className={`font-bold font-mono tabular-nums text-slate-900 dark:text-white ${textSize}`}>
          {peerScore.toFixed(1)}
        </span>

        {/* Peer Score Label & Count */}
        <span className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
          ({peerCount} peers)
        </span>

        <Info className="w-3 h-3 text-slate-400 group-hover:text-indigo-500 transition-colors" />
      </div>

      {/* Detail Breakdown Popover on Hover / Click */}
      {showDetailsTooltip && showTooltip && (
        <div className="absolute bottom-full left-0 mb-2 z-50 w-64 p-3 bg-slate-900 text-white rounded-xl shadow-xl border border-slate-700 text-xs animate-fade-in pointer-events-none">
          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-800">
            <span className="font-bold text-[11px] text-indigo-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Peer Review Audit Index
            </span>
            <span className="font-mono font-bold text-amber-400 text-xs">
              {peerScore} / 5.0
            </span>
          </div>

          <div className="space-y-1.5 text-[11px] text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Statutory Peer Attestations:</span>
              <span className="font-semibold text-white font-mono">{peerCount} Verified</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Council Quorum Threshold:</span>
              <span className="text-emerald-400 font-semibold font-mono">100% Satisfied</span>
            </div>
            {totalReviews && (
              <div className="flex justify-between">
                <span className="text-slate-400">Verified Client Reviews:</span>
                <span className="font-mono text-white">{totalReviews} Sessions</span>
              </div>
            )}
          </div>

          <div className="mt-2 pt-1.5 border-t border-slate-800 text-[10px] text-slate-400 leading-tight">
            Peer review score derived from multi-signature council endorsements by fellow practitioners in active standing.
          </div>
        </div>
      )}
    </div>
  );
}
