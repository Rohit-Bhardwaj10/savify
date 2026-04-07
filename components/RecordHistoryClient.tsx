'use client';

import { useState, useMemo } from 'react';
import RecordItem from './recorditem';
import { Record } from '@/types/Record';

interface RecordHistoryClientProps {
    initialRecords: Record[];
}

const RecordHistoryClient = ({ initialRecords }: RecordHistoryClientProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = useMemo(() => {
        const cats = new Set(initialRecords.map(r => r.category));
        return ['All', ...Array.from(cats)].sort();
    }, [initialRecords]);

    const filteredRecords = useMemo(() => {
        return initialRecords.filter(record => {
            const matchesSearch = record.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                record.category.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || record.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [initialRecords, searchTerm, selectedCategory]);

    return (
        <div className='glass p-8 rounded-[2rem] border border-zinc-800/50'>
            <div className='flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-6'>
                <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center'>
                        <span className='text-zinc-400 text-xl font-bold'>Ξ</span>
                    </div>
                    <div>
                        <h3 className='text-xl font-bold tracking-tight text-white uppercase'>
                            Transaction Ledger
                        </h3>
                        <p className='text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-1'>
                            Analytical Registry // Total: {filteredRecords.length}
                        </p>
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row gap-3 items-end sm:items-center'>
                    {/* Category Filter */}
                    <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className='glass-lighter border border-zinc-800/50 rounded-xl px-4 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 focus:outline-none focus:border-zinc-500 transition-all cursor-pointer w-full sm:w-auto'
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat} className='bg-zinc-950 text-zinc-400'>{cat}</option>
                        ))}
                    </select>

                    {/* Search Input */}
                    <div className='relative w-full sm:w-64'>
                        <input 
                            type="text"
                            placeholder="SEARCH_LEDGER..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full glass-lighter border border-zinc-800/50 rounded-xl px-4 py-2.5 pl-10 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white focus:outline-none focus:border-zinc-500 transition-all placeholder:text-zinc-700'
                        />
                        <span className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 text-xs'>
                            🔍
                        </span>
                    </div>
                </div>
            </div>

            {filteredRecords.length === 0 ? (
                <div className='py-20 text-center'>
                    <p className='text-zinc-600 font-mono text-[10px] uppercase tracking-[0.3em]'>No matching records found in registry</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-500'>
                    {filteredRecords.map((record: Record) => (
                        <div key={record.id} className="group transition-transform hover:scale-[1.02]">
                            <RecordItem record={record} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecordHistoryClient;
