import React from 'react';
import getUserRecord from '@/app/actions/getuserrecord';
import getBestWorstExpense from '@/app/actions/getbestworstexpense';
import getRecords from '@/app/actions/getrecords';

const ExpenseStats = async () => {
    try {
        const [userRecordResult, rangeResult, recordsResult] = await Promise.all([
            getUserRecord(),
            getBestWorstExpense(),
            getRecords(),
        ]);

        const { record, daysWithRecords } = userRecordResult;
        const { bestExpense, worstExpense } = rangeResult;
        const { records } = recordsResult;

        // Calculate average
        const totalAmount = record || 0;
        const validDays = daysWithRecords && daysWithRecords > 0 ? daysWithRecords : 1;
        const averageExpense = totalAmount / validDays;

        // Calculate Category Distribution
        const categoryMap: Record<string, number> = {};
        records?.forEach(r => {
            categoryMap[r.category] = (categoryMap[r.category] || 0) + r.amount;
        });

        const sortedCategories = Object.entries(categoryMap)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3);

        return (
            <div className='glass p-6 rounded-[2rem] border border-zinc-800/50'>
                <div className='flex items-center gap-4 mb-8 text-white px-2'>
                    <div className='w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]'>
                        <span className='text-black text-xl font-bold'>Σ</span>
                    </div>
                    <div>
                        <h3 className='text-xl font-black tracking-tight uppercase'>
                            Fiscal Metrics
                        </h3>
                        <p className='text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mt-1'>
                            Algorithmic Analysis // V.2.0
                        </p>
                    </div>
                </div>

                <div className='space-y-6'>
                    {/* Distribution Breakdown */}
                    <div className='px-2'>
                        <div className='text-[10px] font-mono font-black text-zinc-700 uppercase tracking-[0.2em] mb-4'>[ CATEGORY_DOMINANCE ]</div>
                        <div className='space-y-4'>
                            {sortedCategories.map(([cat, amt]) => (
                                <div key={cat} className='group'>
                                    <div className='flex justify-between items-end mb-1.5'>
                                        <span className='text-[10px] font-bold text-zinc-400 uppercase tracking-widest group-hover:text-white transition-colors'>{cat}</span>
                                        <span className='text-[10px] font-mono font-bold text-zinc-500'>${amt.toFixed(2)}</span>
                                    </div>
                                    <div className='w-full h-1 bg-zinc-900 rounded-full overflow-hidden'>
                                        <div 
                                            className='h-full bg-zinc-500 rounded-full transition-all duration-1000 group-hover:bg-zinc-200' 
                                            style={{ width: `${(amt / (totalAmount || 1)) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                            {sortedCategories.length === 0 && (
                                <p className='text-[10px] font-mono text-zinc-700 italic'>No categorization data detected...</p>
                            )}
                        </div>
                    </div>

                    <div className='h-px bg-zinc-800/50 mx-2'></div>

                    {/* Average Daily Spending */}
                    <div className='bg-zinc-950/50 rounded-2xl p-6 border border-zinc-800/50 shadow-inner group transition-all hover:border-zinc-700'>
                        <div className='text-center'>
                            <p className='text-[9px] font-bold text-zinc-600 mb-2 tracking-[0.3em] uppercase'>
                                Daily Flux Capacity
                            </p>
                            <div className='text-4xl font-black tracking-tighter text-white mb-3'>
                                ${averageExpense.toFixed(2)}
                            </div>
                            <div className='inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded-full border border-zinc-800 group-hover:border-zinc-600 transition-colors'>
                                <span className='w-1 h-1 bg-zinc-100 rounded-full animate-pulse'></span>
                                <span className='text-[9px] font-bold text-zinc-400 group-hover:text-zinc-200 uppercase tracking-widest'>
                                    {validDays} Cycles Validated
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Expense Range */}
                    <div className='grid grid-cols-2 gap-4 px-2'>
                        <div className='group'>
                            <span className='text-[9px] font-black text-zinc-700 uppercase tracking-[0.2em] block mb-1'>PEAK_ENTRY</span>
                            <p className='text-lg font-bold text-white tracking-widest'>
                                {bestExpense !== undefined ? `$${bestExpense}` : '—'}
                            </p>
                        </div>
                        <div className='group'>
                            <span className='text-[9px] font-black text-zinc-700 uppercase tracking-[0.2em] block mb-1'>FLOOR_ENTRY</span>
                            <p className='text-lg font-bold text-white tracking-widest'>
                                {worstExpense !== undefined ? `$${worstExpense}` : '—'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error fetching expense statistics:', error);
        return (
            <div className='glass p-6 rounded-[2rem] border border-zinc-800/50'>
                <div className='flex items-center gap-4 mb-4'>
                    <div className='w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center'>
                        <span className='text-zinc-500 text-lg'>!</span>
                    </div>
                    <p className='text-zinc-500 text-xs font-bold uppercase tracking-widest'>
                        Metric Initialization Failed
                    </p>
                </div>
            </div>
        );
    }
};

export default ExpenseStats;