import AddNewRecord from '@/components/AddNewRecord';
import AIInsights from '@/components/AIInsights';
import ExpenseStats from '@/components/ExpenseStats';
import Guest from '@/components/guest';
import RecordChart from '@/components/RecordChart';
import RecordHistory from '@/components/RecordHistory';
import { currentUser } from '@clerk/nextjs/server';

import AIForecast from '@/components/AIForecast';

import Image from 'next/image';

export default async function HomePage() {
  const user = await currentUser();
  if (!user) {
    return <Guest />;
  }
  return (
    <main className='bg-[#09090b] text-zinc-400 font-sans min-h-screen relative overflow-hidden'>
      {/* Background gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(39,39,42,0.2),_transparent_50%)] pointer-events-none" />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10'>
        {/* Welcome Header */}
        <div className="mb-8 px-4">
          <div className='flex items-center gap-8'>
            <div className='relative'>
              <Image
                src={user.imageUrl}
                alt={`${user.firstName}'s profile`}
                width={64}
                height={64}
                className='w-16 h-16 rounded-2xl border border-zinc-800 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500'
              />
              <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-zinc-100 rounded-full border-2 border-[#09090b] flex items-center justify-center shadow-lg'>
                <span className='text-[8px] font-bold text-black'>✓</span>
              </div>
            </div>
            <div>
              <h2 className='text-3xl font-black tracking-tighter text-white uppercase'>
                CORE_USER: {user.firstName?.toUpperCase()}
              </h2>
              <div className='flex items-center gap-3 mt-1'>
                <span className='text-[10px] font-mono text-zinc-600 tracking-widest uppercase'>Protocol // Core_Dashboard</span>
                <div className='w-1 h-1 rounded-full bg-zinc-800'></div>
                <span className='text-[10px] font-mono text-zinc-600 tracking-widest uppercase italic'>v.2.x.forecast.sys</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid System */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          {/* Main Action Area */}
          <div className='lg:col-span-8 flex flex-col gap-8 order-2 lg:order-1'>
            <div className='w-full'>
              <RecordChart />
            </div>
            <div className='w-full'>
              <AIInsights />
            </div>
            <div className='w-full order-last'>
              <RecordHistory />
            </div>
          </div>

          {/* Sidebar Area */}
          <div className='lg:col-span-4 flex flex-col gap-8 order-1 lg:order-2'>
            <AddNewRecord />
            <AIForecast />
            <ExpenseStats />
          </div>
        </div>
      </div>
    </main>
  );
}
