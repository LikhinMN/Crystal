import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Crystal - Dashboard',
  description: 'AI-powered image generation and editing',
};

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/signin');
  }

  return (
        <div className="flex min-h-screen flex-col">
          <DashboardHeader user={session.user} />
          <main className="flex-1">{children}</main>
        </div>
  );
}