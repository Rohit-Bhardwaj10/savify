'use client';
import { useState } from 'react';
import { Record } from '@/types/Record';
import deleteRecord from '@/app/actions/deleterecord';

// Helper function to get category code
const getCategoryCode = (category: string) => {
    switch (category) {
        case 'Food': return 'FOD';
        case 'Transportation': return 'TRN';
        case 'Shopping': return 'SHP';
        case 'Entertainment': return 'ENT';
        case 'Bills': return 'BIL';
        case 'Healthcare': return 'HLC';
        default: return 'MSC';
    }
};

const RecordItem = ({ record }: { record: Record }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleDeleteRecord = async (e: React.MouseEvent, recordId: string) => {
        e.stopPropagation();
        setIsLoading(true);
        await deleteRecord(recordId);
        setIsLoading(false);
    };

    return (
        <>
            <div 
                onClick={() => setIsExpanded(true)}
                className='glass-lighter p-5 rounded-2xl border border-zinc-800/50 hover:bg-zinc-800/20 transition-all duration-300 group relative cursor-pointer active:scale-95'
            >
                <button
                    onClick={(e) => handleDeleteRecord(e, record.id)}
                    className='absolute top-4 right-4 text-zinc-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100 z-10'
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className='w-4 h-4 border-2 border-zinc-500/30 border-t-zinc-200 rounded-full animate-spin'></div>
                    ) : (
                        <span className='font-mono text-xs'>[DEL]</span>
                    )}
                </button>

                <div className='flex flex-col gap-4'>
                    <div className='flex justify-between items-start'>
                        <div className='flex flex-col gap-1'>
                            <span className='text-[10px] font-mono text-zinc-500 uppercase tracking-widest'>
                                {new Date(record?.date).toLocaleDateString(undefined, { month: '2-digit', day: '2-digit', year: '2-digit' })}
                            </span>
                            <div className='flex items-center gap-2'>
                                <span className='px-1.5 py-0.5 bg-zinc-800 text-zinc-400 text-[9px] font-mono rounded border border-zinc-700/50 uppercase'>
                                    {getCategoryCode(record?.category)}
                                </span>
                                <span className='text-xs font-bold text-zinc-300 uppercase tracking-tight'>
                                    {record?.category}
                                </span>
                            </div>
                        </div>
                        <span className='text-lg font-mono font-bold text-white tracking-tighter'>
                            ${record?.amount.toFixed(2)}
                        </span>
                    </div>

                    <div className='h-px w-full bg-zinc-800/50'></div>

                    <p className='text-xs text-zinc-400 font-medium leading-relaxed line-clamp-2 min-h-[2.5rem]'>
                        {record?.text}
                    </p>

                    <div className='flex justify-between items-center mt-auto'>
                        <div className='flex gap-1'>
                            <div className={`w-1 h-1 rounded-full ${record?.amount > 100 ? 'bg-zinc-100' : 'bg-zinc-700'}`}></div>
                            <div className={`w-1 h-1 rounded-full ${record?.amount > 50 ? 'bg-zinc-400' : 'bg-zinc-800'}`}></div>
                            <div className='w-1 h-1 rounded-full bg-zinc-900'></div>
                        </div>
                        <span className='text-[9px] font-mono text-zinc-600 tracking-[0.3em] uppercase'>savify-v2.ledger</span>
                    </div>
                </div>
            </div>

            {/* Expanded Insight Modal */}
            {isExpanded && (
                <div 
                    className='fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300'
                    onClick={() => setIsExpanded(false)}
                >
                    <div 
                        className='glass p-8 rounded-[2.5rem] border border-white/5 max-w-lg w-full relative animate-in zoom-in-95 data-[state=open]:zoom-in-100 duration-300 shadow-2xl'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setIsExpanded(false)}
                            className='absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors uppercase font-mono text-[10px] tracking-widest'
                        >
                            [ Close_Protocol ]
                        </button>

                        <div className='mb-10'>
                            <div className='flex items-center gap-4 mb-6'>
                                <div className='w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-2xl'>
                                    🔍
                                </div>
                                <div>
                                    <h4 className='text-2xl font-black text-white uppercase tracking-tighter'>Transactional Audit</h4>
                                    <p className='text-[10px] font-mono text-zinc-500 uppercase tracking-widest'>{record.id}</p>
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-4 mb-8'>
                                <div className='glass-lighter p-4 rounded-xl border border-zinc-800/50'>
                                    <span className='text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-1'>Value_Assessed</span>
                                    <span className='text-2xl font-bold text-white'>${record.amount.toFixed(2)}</span>
                                </div>
                                <div className='glass-lighter p-4 rounded-xl border border-zinc-800/50'>
                                    <span className='text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-1'>Category_Label</span>
                                    <span className='text-2xl font-bold text-white'>{record.category}</span>
                                </div>
                            </div>

                            <div className='space-y-4'>
                                <div className='p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl'>
                                    <span className='text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-2'>System_Description</span>
                                    <p className='text-sm text-zinc-100 font-medium leading-relaxed'>{record.text}</p>
                                </div>

                                <div className='p-4 border border-zinc-800/50 rounded-xl bg-gradient-to-br from-zinc-900 to-transparent'>
                                    <div className='flex items-center gap-2 mb-3'>
                                        <div className='w-1.5 h-1.5 bg-zinc-400 rounded-full animate-pulse'></div>
                                        <span className='text-[10px] font-bold text-zinc-300 uppercase tracking-widest'>AI_Automated_Insight</span>
                                    </div>
                                    <p className='text-[11px] text-zinc-500 font-medium italic leading-relaxed'>
                                        {record.amount > 100 
                                            ? "This expenditure exceeds the median threshold for this cycle. Protocol suggests verifying if this can be recurring or a one-time outlier."
                                            : "High frequency but low unit value detected. This contributes to aggregate baseline throughput."
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-between items-center text-[8px] font-mono text-zinc-700 uppercase tracking-[0.4em]'>
                            <span>Verified_Ledger_Entry</span>
                            <span>{new Date(record.date).toISOString()}</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RecordItem;