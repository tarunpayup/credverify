import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_PROFESSIONALS } from '@/lib/mock-data';
import { Professional } from '@/lib/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const city = searchParams.get('city') || 'All Cities';
  const category = searchParams.get('category') || 'All Professions';
  const verified = searchParams.get('verified') === 'true';
  const topRated = searchParams.get('topRated') === 'true';
  const query = (searchParams.get('query') || '').trim().toLowerCase();
  const sortBy = searchParams.get('sortBy') || 'rating';

  // Simulate network latency (150ms - 250ms)
  await new Promise((resolve) => setTimeout(resolve, 200));

  let results: Professional[] = [...INITIAL_PROFESSIONALS];

  // Filter by City
  if (city !== 'All Cities') {
    results = results.filter(
      (p) => p.city.toLowerCase() === city.toLowerCase()
    );
  }

  // Filter by Category / Profession
  if (category !== 'All Professions' && category !== 'All Services') {
    results = results.filter(
      (p) => p.profession.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by Verified Status
  if (verified) {
    results = results.filter((p) => p.verificationStatus === 'verified');
  }

  // Filter by Top-Rated Only (Score >= 4.90)
  if (topRated) {
    results = results.filter(
      (p) => (p.peerReviewScore ?? p.rating) >= 4.9 || p.rating >= 4.9
    );
  }

  // Filter by text query
  if (query) {
    results = results.filter((p) => {
      const inName = p.name.toLowerCase().includes(query);
      const inTitle = p.title.toLowerCase().includes(query);
      const inBio = p.bio.toLowerCase().includes(query);
      const inLicense = p.licenseNumber.toLowerCase().includes(query);
      const inCouncil = p.licensingBody.toLowerCase().includes(query);
      const inSpecialty = p.specialties.some((s) => s.toLowerCase().includes(query));
      return inName || inTitle || inBio || inLicense || inCouncil || inSpecialty;
    });
  }

  // Sorting
  results.sort((a, b) => {
    if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
    if (sortBy === 'price_low') return a.consultationFee - b.consultationFee;
    return b.rating - a.rating; // default: rating
  });

  return NextResponse.json({
    success: true,
    data: results,
    total: results.length,
    queryMeta: {
      city,
      category,
      verified,
      topRated,
      query,
      sortBy,
      latencyMs: 200,
      timestamp: new Date().toISOString()
    }
  });
}
