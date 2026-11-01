'use client';

import React from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import SplashScreen from '@/components/splash/SplashScreen';
import RoleSwitcherBar from '@/components/layout/RoleSwitcherBar';
import TopNavigation from '@/components/layout/TopNavigation';
import Footer from '@/components/layout/Footer';

// 4 Distinct Separated Panels + Blog
import MarketplaceView from '@/components/marketplace/MarketplaceView';
import ProviderDashboard from '@/components/provider/ProviderDashboard';
import SuperAdminPanel from '@/components/admin/SuperAdminPanel';
import CustomerPanel from '@/components/customer/CustomerPanel';
import BlogView from '@/components/blog/BlogView';

// Interactive Modals
import ProfessionalDetailModal from '@/components/marketplace/ProfessionalDetailModal';
import BookingModal from '@/components/booking/BookingModal';
import AuthModal from '@/components/auth/AuthModal';

function MainAppContent() {
  const { activePanel } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Splash Screen */}
      <SplashScreen />

      {/* Persistent Role & Panel Fast-Switcher */}
      <RoleSwitcherBar />

      {/* Top Bar Navigation */}
      <TopNavigation />

      {/* Dynamic Viewport for Active Panel */}
      <main className="flex-1 w-full">
        {activePanel === 'marketplace' && <MarketplaceView />}
        {activePanel === 'provider_dashboard' && <ProviderDashboard />}
        {activePanel === 'admin_panel' && <SuperAdminPanel />}
        {activePanel === 'customer_panel' && <CustomerPanel />}
        {activePanel === 'blog' && <BlogView />}
      </main>

      {/* Interactive Global Modals */}
      <ProfessionalDetailModal />
      <BookingModal />
      <AuthModal />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
