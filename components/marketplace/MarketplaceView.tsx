'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Award, 
  Users, 
  CheckCircle, 
  Bookmark, 
  BookmarkCheck, 
  Calendar, 
  Clock, 
  HelpCircle,
  FileText,
  Building,
  Activity,
  Code2,
  Scale
} from 'lucide-react';
import { ProfessionType, Professional } from '@/lib/types';
import { fetchProfessionalsMockApi, SearchApiResponse } from '@/lib/mock-api';
import StarRating from '@/components/ui/StarRating';

const CITIES = ['All Cities', 'Mumbai', 'Bengaluru', 'Delhi NCR', 'Pune', 'Hyderabad', 'New York', 'London', 'San Francisco'];

const CATEGORIES: { label: string; value: ProfessionType | 'All Professions'; icon: any; count: string }[] = [
  { label: 'All Services', value: 'All Professions', icon: Search, count: '600+' },
  { label: 'Chartered Accountants', value: 'Chartered Accountant', icon: FileText, count: '140+ ICAI' },
  { label: 'Doctors & Specialists', value: 'Doctor', icon: Activity, count: '190+ NMC' },
  { label: 'Advocates & Lawyers', value: 'Lawyer', icon: Scale, count: '110+ BCI' },
  { label: 'Software Architects', value: 'Software Engineer', icon: Code2, count: '120+ IEEE' },
  { label: 'Structural Architects', value: 'Architect', icon: Building, count: '50+ COA' },
];

export default function MarketplaceView() {
  const { 
    professionals, 
    selectedCity, 
    setSelectedCity, 
    selectedProfession, 
    setSelectedProfession, 
    searchQuery, 
    setSearchQuery, 
    verifiedOnly, 
    setVerifiedOnly,
    topRatedOnly,
    setTopRatedOnly,
    openBookingModal,
    setActiveProfileModal,
    savedProfessionalIds,
    toggleSaveProfessional
  } = useApp();

  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'price_low'>('rating');
  const [apiResults, setApiResults] = useState<Professional[]>(professionals);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiLatency, setApiLatency] = useState<number>(180);
  const [apiSource, setApiSource] = useState<string>('mock-endpoint');

  // Trigger Mock API search with debounce on text query and instant on filters
  React.useEffect(() => {
    let isCancelled = false;

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response: SearchApiResponse = await fetchProfessionalsMockApi({
          city: selectedCity,
          category: selectedProfession,
          verified: verifiedOnly,
          topRated: topRatedOnly,
          query: searchQuery,
          sortBy
        }, professionals);

        if (!isCancelled) {
          setApiResults(response.data);
          setApiLatency(response.queryMeta.latencyMs);
          setApiSource(response.queryMeta.source);
          setIsLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }, searchQuery ? 250 : 50);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [selectedCity, selectedProfession, verifiedOnly, topRatedOnly, searchQuery, sortBy, professionals]);

  const filteredProfessionals = apiResults;

  return (
    <div className="w-full pb-20">
      
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img 
            src="/images/hero.jpg" 
            alt="Consultation Office" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/70"></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full mb-4">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Statutory Council Audit + Peer Multi-Signature Verification</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 text-balance">
            Find High-Trust Professionals with Peer-Audited Credentials
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 text-balance">
            Connect directly with licensed Chartered Accountants, Physicians, Legal Advocates, and Principal Systems Architects — validated against statutory registers and backed by peer review.
          </p>

          {/* Unified Search Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-2.5 shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-stretch gap-2 text-slate-800 dark:text-slate-200">
            {/* City Selector */}
            <div className="flex items-center gap-2 px-3 py-2 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 md:w-56 shrink-0">
              <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
              >
                {CITIES.map(city => (
                  <option key={city} value={city} className="dark:bg-slate-900">
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Profession Category Selector */}
            <div className="flex items-center gap-2 px-3 py-2 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 md:w-64 shrink-0">
              <Award className="w-4 h-4 text-indigo-500 shrink-0" />
              <select
                value={selectedProfession}
                onChange={(e) => setSelectedProfession(e.target.value)}
                className="w-full bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.label} value={cat.value} className="dark:bg-slate-900">
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Keyword Input */}
            <div className="flex items-center gap-2 px-3 py-2 flex-1">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by specialty, notice, tax code, tribunal or name..."
                className="w-full bg-transparent text-sm focus:outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Top-Rated Only Toggle Filter in Search Bar */}
            <div className="flex items-center px-2 py-1.5 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-800 shrink-0">
              <button
                type="button"
                onClick={() => setTopRatedOnly(!topRatedOnly)}
                aria-pressed={topRatedOnly}
                title="Filter for professionals with 4.9+ average peer review score"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap border cursor-pointer ${
                  topRatedOnly
                    ? 'bg-amber-500/15 border-amber-500/50 text-amber-700 dark:text-amber-300 shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${topRatedOnly ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
                <span>Top-Rated (★ 4.9+)</span>
              </button>
            </div>

            {/* Search CTA */}
            <button
              onClick={() => {
                const el = document.getElementById('results-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg shadow transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <span>Explore</span>
            </button>
          </div>

          {/* Quick stats trust strip */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border-t border-slate-800 pt-6">
            <div>
              <p className="text-2xl font-bold font-mono text-white">100%</p>
              <p className="text-xs text-slate-400">Statutory License Verified</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-indigo-400">3+ Peers</p>
              <p className="text-xs text-slate-400">Attestation Threshold</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-emerald-400">₹0</p>
              <p className="text-xs text-slate-400">Direct Booking Surcharge</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-amber-400">100%</p>
              <p className="text-xs text-slate-400">Dispute Escrow Guard</p>
            </div>
          </div>

        </div>
      </section>

      {/* Quick Category Buttons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Explore Professional Councils
          </h2>
          <span className="text-xs text-slate-500">
            {professionals.length} active peer-verified members
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedProfession === cat.value;
            return (
              <button
                key={cat.label}
                onClick={() => setSelectedProfession(cat.value)}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected 
                    ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`} />
                  <span className="text-[11px] font-mono text-slate-400 font-semibold">{cat.count}</span>
                </div>
                <div>
                  <p className="text-xs font-bold leading-tight mb-0.5">{cat.label}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Results & Directory Grid */}
      <section id="results-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Filter & Controls Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Verified Professionals in {selectedCity}</span>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {filteredProfessionals.length} results
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing active practitioners with council license audits and peer vouches
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-3">
            {/* Top-Rated Only Toggle */}
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={topRatedOnly}
                onChange={(e) => setTopRatedOnly(e.target.checked)}
                className="w-4 h-4 text-amber-500 accent-amber-500 rounded border-slate-300 focus:ring-amber-500"
              />
              <span className="flex items-center gap-1">
                <Star className={`w-3.5 h-3.5 ${topRatedOnly ? 'fill-amber-500 text-amber-500' : 'text-amber-500'}`} />
                Top-Rated Only (★ 4.9+)
              </span>
            </label>

            {/* Verified Only Toggle */}
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                Verified Badge Only
              </span>
            </label>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none"
              >
                <option value="rating">Highest Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="price_low">Lowest Consultation Fee</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mock API Search Status Bar */}
        <div className="flex items-center justify-between flex-wrap gap-2 px-3.5 py-2 mb-6 rounded-lg bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-amber-400 animate-ping' : 'bg-emerald-500'}`}></span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Mock Search API:
            </span>
            <span>
              {isLoading ? 'Filtering directory...' : `${filteredProfessionals.length} practitioners matched in ${apiLatency}ms`}
            </span>
            <span className="hidden md:inline text-slate-400">·</span>
            <span className="hidden md:inline text-slate-500">
              Category: <strong>{selectedProfession}</strong>
            </span>
            <span className="hidden md:inline text-slate-400">·</span>
            <span className="hidden md:inline text-slate-500">
              City: <strong>{selectedCity}</strong>
            </span>
            {verifiedOnly && (
              <>
                <span className="hidden md:inline text-slate-400">·</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  Gold Seal Only
                </span>
              </>
            )}
            {topRatedOnly && (
              <>
                <span className="hidden md:inline text-slate-400">·</span>
                <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  Top-Rated Only (★ 4.9+)
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-slate-400 uppercase">
              Route: /api/professionals/search
            </span>
          </div>
        </div>

        {/* Directory Grid or Skeleton Loading */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="h-10 bg-slate-100 dark:bg-slate-800/40 rounded-lg"></div>
                <div className="h-4 bg-slate-100 dark:bg-slate-800/50 rounded w-5/6"></div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                  <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-20"></div>
                  <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProfessionals.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
              No verified professionals found
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
              Try adjusting your city filter or search keywords. You can reset filters to view all verified practitioners.
            </p>
            <button
              onClick={() => {
                setSelectedCity('All Cities');
                setSelectedProfession('All Professions');
                setSearchQuery('');
                setVerifiedOnly(false);
                setTopRatedOnly(false);
              }}
              className="px-4 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((prof) => {
              const isSaved = savedProfessionalIds.includes(prof.id);
              return (
                <div 
                  key={prof.id}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative group"
                >
                  {/* Top card header */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={prof.avatarUrl} 
                          alt={prof.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 dark:border-slate-800 shrink-0"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = 'https://picsum.photos/seed/' + prof.id + '/200/200';
                          }}
                        />
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                              {prof.name}
                            </h4>
                            {prof.verificationStatus === 'verified' && (
                              <span 
                                title="Statutory Council Verified & Peer Audited"
                                className="inline-flex items-center text-emerald-600 dark:text-emerald-400"
                              >
                                <CheckCircle className="w-4 h-4 fill-emerald-100 dark:fill-emerald-950" />
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mt-0.5">
                            {prof.profession} · {prof.city}
                          </p>
                        </div>
                      </div>

                      {/* Bookmark button */}
                      <button
                        onClick={() => toggleSaveProfessional(prof.id)}
                        title={isSaved ? "Remove from saved" : "Save professional"}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
                      >
                        {isSaved ? (
                          <BookmarkCheck className="w-4 h-4 text-indigo-600" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Official Registration & Peer Endorsement strip */}
                    <div className="bg-slate-50 dark:bg-slate-800/60 rounded-lg p-2.5 mb-3 text-xs">
                      <div className="flex items-center justify-between text-slate-600 dark:text-slate-300 font-mono text-[11px] mb-1">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {prof.licenseNumber}
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                          {prof.experienceYears}y Exp
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                        <Users className="w-3.5 h-3.5 text-indigo-500" />
                        <span><strong>{prof.peerVouchCount} Verified Peers</strong> vouched on this council roll</span>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {prof.specialties.slice(0, 3).map((spec, i) => (
                        <span 
                          key={i} 
                          className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          {spec}
                        </span>
                      ))}
                      {prof.specialties.length > 3 && (
                        <span className="text-[11px] text-slate-400 self-center">
                          +{prof.specialties.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Bio snippet */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                      {prof.bio}
                    </p>
                  </div>

                  {/* Card bottom footer */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] text-slate-400 font-medium">
                          Peer Review Score
                        </span>
                        <StarRating
                          score={prof.peerReviewScore || prof.rating}
                          peerCount={prof.peerVouchCount}
                          totalReviews={prof.reviewCount}
                          size="sm"
                          label="Average Peer Review Score"
                        />
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs text-slate-400">Consultation from</span>
                        <p className="text-sm font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                          ₹{prof.consultationFee.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setActiveProfileModal(prof)}
                        className="w-full py-2 px-3 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors text-center"
                      >
                        Audit & Profile
                      </button>
                      <button
                        onClick={() => openBookingModal(prof)}
                        className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors text-center shadow-sm"
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </section>

      {/* How Peer-Verification Works Section */}
      <section id="how-it-works-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200 dark:border-slate-800 mt-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full mb-3">
            <Award className="w-4 h-4" />
            <span>The CredVerify Standard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Why Peer-Verified Credentials Matter
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Unlike legacy classifieds where anyone can post a service, CredVerify enforces a 3-layer cryptographic and institutional validation chain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold mb-4">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Statutory Roll Cross-Check
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every applicant’s registration number is cross-referenced with official statutory records: ICAI for Chartered Accountants, NMC for Physicians, Bar Council for Advocates, and COA for Architects.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-4">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Multi-Signature Peer Attestation
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A certificate alone is not enough. Before receiving the Gold Verified Seal, at least 3 active peers with verified licenses must sign off on the candidate’s clinical, legal, or audit competencies.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold mb-4">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Escrow-Protected Retainers
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Client consultation fees are held in escrow and released only upon successful completion of the advisory session or document delivery, backed by platform dispute resolution.
            </p>
          </div>
        </div>
      </section>

      {/* Community Q&A Section */}
      <section id="community-qa-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Peer-Verified Community Q&A
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Ask legal, medical, tax, or software architecture questions answered by verified professionals
            </p>
          </div>

          <button
            onClick={() => {
              const q = prompt('What professional question would you like to submit to verified peers?');
              if (q) {
                alert('Your question has been routed to verified peers in this discipline!');
              }
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-indigo-600 rounded-lg shadow-sm whitespace-nowrap self-start md:self-auto"
          >
            Ask a Question
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
              Tax & Audits · Question
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 mb-2">
              Can an Indian private limited company claim GST input tax credit on laptop purchases for remote engineers?
            </h4>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-xs border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-bold text-slate-900 dark:text-white">CA Rajesh Malhotra</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">ICAI-FCA Verified</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Yes, under Section 16(1) of the CGST Act, laptops capitalized on company books and used in the furtherance of business qualify for 100% ITC, provided the invoice bears the company GSTIN and payment is made within 180 days.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
              Corporate Law · Question
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 mb-2">
              What are the mandatory notice periods for invoking an arbitration clause in SaaS master services agreements?
            </h4>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-xs border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-bold text-slate-900 dark:text-white">Adv. Vikramaditya Singhania</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">Bar Council Verified</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Typically 30 days formal cure notice is standard prior to invoking Section 21 of the Arbitration & Conciliation Act. Failure to issue the 30-day notice can render the invocation premature in court.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
