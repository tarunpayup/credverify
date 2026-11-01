import { Professional } from './types';
import { INITIAL_PROFESSIONALS } from './mock-data';

export interface SearchFilters {
  city: string;
  category: string;
  verified: boolean;
  topRated?: boolean;
  query?: string;
  sortBy?: 'rating' | 'experience' | 'price_low';
}

export interface SearchApiResponse {
  success: boolean;
  data: Professional[];
  total: number;
  queryMeta: {
    city: string;
    category: string;
    verified: boolean;
    topRated?: boolean;
    query: string;
    sortBy: string;
    latencyMs: number;
    timestamp: string;
    source: 'mock-endpoint' | 'client-fallback';
  };
}

/**
 * Searches professionals using the mock API with realistic simulated latency
 * and structured filtering across category, city, and verified status.
 */
export async function fetchProfessionalsMockApi(
  filters: SearchFilters,
  currentStoreProfessionals?: Professional[]
): Promise<SearchApiResponse> {
  const startTime = Date.now();
  const { city, category, verified, topRated = false, query = '', sortBy = 'rating' } = filters;

  const params = new URLSearchParams({
    city,
    category,
    verified: String(verified),
    topRated: String(topRated),
    query,
    sortBy,
  });

  try {
    const response = await fetch(`/api/professionals/search?${params.toString()}`, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });

    if (response.ok) {
      const json = await response.json();
      return {
        ...json,
        queryMeta: {
          ...json.queryMeta,
          source: 'mock-endpoint',
          latencyMs: Date.now() - startTime
        }
      };
    }
  } catch (err) {
    // Graceful fallback to client mock simulation if server route is unavailable
    console.warn('API route fallback triggered:', err);
  }

  // Simulated client-side mock latency
  await new Promise((r) => setTimeout(r, 220));

  const sourceData = currentStoreProfessionals && currentStoreProfessionals.length > 0 
    ? currentStoreProfessionals 
    : INITIAL_PROFESSIONALS;

  let results = [...sourceData];

  // City filter
  if (city !== 'All Cities') {
    results = results.filter((p) => p.city.toLowerCase() === city.toLowerCase());
  }

  // Category filter
  if (category !== 'All Professions' && category !== 'All Services') {
    results = results.filter((p) => p.profession.toLowerCase() === category.toLowerCase());
  }

  // Verified status filter
  if (verified) {
    results = results.filter((p) => p.verificationStatus === 'verified');
  }

  // Top-Rated Only filter (Score >= 4.90)
  if (topRated) {
    results = results.filter((p) => (p.peerReviewScore ?? p.rating) >= 4.9 || p.rating >= 4.9);
  }

  // Query filter
  if (query.trim()) {
    const q = query.toLowerCase();
    results = results.filter((p) => {
      const inName = p.name.toLowerCase().includes(q);
      const inTitle = p.title.toLowerCase().includes(q);
      const inBio = p.bio.toLowerCase().includes(q);
      const inLicense = p.licenseNumber.toLowerCase().includes(q);
      const inCouncil = p.licensingBody.toLowerCase().includes(q);
      const inSpecialty = p.specialties.some((s) => s.toLowerCase().includes(q));
      return inName || inTitle || inBio || inLicense || inCouncil || inSpecialty;
    });
  }

  // Sorting
  results.sort((a, b) => {
    if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
    if (sortBy === 'price_low') return a.consultationFee - b.consultationFee;
    return b.rating - a.rating;
  });

  return {
    success: true,
    data: results,
    total: results.length,
    queryMeta: {
      city,
      category,
      verified,
      query,
      sortBy,
      latencyMs: Date.now() - startTime,
      timestamp: new Date().toISOString(),
      source: 'client-fallback'
    }
  };
}
