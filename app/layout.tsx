import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CredVerify - Peer-Verified Professional Marketplace',
  description: 'Enterprise directory and marketplace for peer-verified Chartered Accountants, Doctors, Lawyers, and Software Engineers with multi-panel role-based workflows.',
  openGraph: {
    title: 'CredVerify - Peer-Verified Professional Marketplace',
    description: 'Enterprise directory and marketplace for peer-verified Chartered Accountants, Doctors, Lawyers, and Software Engineers with multi-panel role-based workflows.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CredVerify - Peer-Verified Professional Marketplace',
    description: 'Enterprise directory and marketplace for peer-verified Chartered Accountants, Doctors, Lawyers, and Software Engineers with multi-panel role-based workflows.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans antialiased text-slate-900 dark:text-slate-100 selection:bg-indigo-500/20 selection:text-indigo-600 dark:selection:text-indigo-300">
        {children}
      </body>
    </html>
  );
}

