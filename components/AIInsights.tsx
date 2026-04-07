'use client';

import { useState, useEffect } from 'react';
import { getAIInsights } from '@/app/actions/getaiinsights';
import { generateInsightAnswer } from '@/app/actions/generateinsightanswer';

interface InsightData {
    id: string;
    type: 'warning' | 'info' | 'success' | 'tip';
    title: string;
    message: string;
    action?: string;
    confidence?: number;
}

interface AIAnswer {
    insightId: string;
    answer: string;
    isLoading: boolean;
}

const AIInsights = () => {
    const [insights, setInsights] = useState<InsightData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [aiAnswers, setAiAnswers] = useState<AIAnswer[]>([]);

    const loadInsights = async () => {
        setIsLoading(true);
        try {
            const newInsights = await getAIInsights();
            setInsights(newInsights);
            setLastUpdated(new Date());
        } catch (error) {
            console.error('❌ AIInsights: Failed to load AI insights:', error);
            // Fallback to mock data if AI fails
            setInsights([
                {
                    id: 'fallback-1',
                    type: 'info',
                    title: 'AI Temporarily Unavailable',
                    message:
                        "We're working to restore AI insights. Please check back soon.",
                    action: 'Try again later',
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleActionClick = async (insight: InsightData) => {
        if (!insight.action) return;

        // Check if answer is already loading or exists
        const existingAnswer = aiAnswers.find((a) => a.insightId === insight.id);
        if (existingAnswer) {
            // Remove the answer if it already exists (toggle functionality)
            setAiAnswers((prev) => prev.filter((a) => a.insightId !== insight.id));
            return;
        }

        // Add loading state
        setAiAnswers((prev) => [
            ...prev,
            {
                insightId: insight.id,
                answer: '',
                isLoading: true,
            },
        ]);

        try {
            // Generate question based on insight title and action
            const question = `${insight.title}: ${insight.action}`;

            // Use server action to generate AI answer
            const answer = await generateInsightAnswer(question);

            setAiAnswers((prev) =>
                prev.map((a) =>
                    a.insightId === insight.id ? { ...a, answer, isLoading: false } : a
                )
            );
        } catch (error) {
            console.error('❌ Failed to generate AI answer:', error);
            setAiAnswers((prev) =>
                prev.map((a) =>
                    a.insightId === insight.id
                        ? {
                            ...a,
                            answer:
                                'Sorry, I was unable to generate a detailed answer. Please try again.',
                            isLoading: false,
                        }
                        : a
                )
            );
        }
    };

    useEffect(() => {
        loadInsights();
    }, []);

    const getInsightIcon = (type: string) => {
        switch (type) {
            case 'warning':
                return '⚠️';
            case 'success':
                return '✅';
            case 'tip':
                return '💡';
            case 'info':
                return 'ℹ️';
            default:
                return '🤖';
        }
    };

    const getInsightColors = (type: string) => {
        switch (type) {
            case 'warning':
                return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
            case 'success':
                return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
            case 'tip':
                return 'border-l-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
            case 'info':
                return 'border-l-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
            default:
                return 'border-l-gray-500 bg-gray-50 dark:bg-gray-800/50';
        }
    };

    const getButtonColors = (type: string) => {
        switch (type) {
            case 'warning':
                return 'text-yellow-700 dark:text-yellow-300 hover:text-yellow-800 dark:hover:text-yellow-200';
            case 'success':
                return 'text-green-700 dark:text-green-300 hover:text-green-800 dark:hover:text-green-200';
            case 'tip':
                return 'text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200';
            case 'info':
                return 'text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200';
            default:
                return 'text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200';
        }
    };

    const formatLastUpdated = () => {
        if (!lastUpdated) return 'Loading...';

        const now = new Date();
        const diffMs = now.getTime() - lastUpdated.getTime();
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;

        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h ago`;

        return lastUpdated.toLocaleDateString();
    };

    if (isLoading) {
        return (
            <div className='glass p-8 rounded-[2rem] border border-zinc-800/50'>
                <div className='flex items-center justify-between mb-8'>
                    <div className='flex items-center gap-4'>
                        <div className='w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]'>
                            <span className='text-black text-xl font-bold'>A</span>
                        </div>
                        <div>
                            <h3 className='text-xl font-bold tracking-tight text-white'>
                                AI Intelligence
                            </h3>
                            <p className='text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1 animate-pulse'>
                                Parsing financial datasets...
                            </p>
                        </div>
                    </div>
                </div>

                <div className='space-y-4'>
                    {[1, 2].map((i) => (
                        <div
                            key={i}
                            className='glass-lighter p-6 rounded-2xl border border-zinc-700/20'
                        >
                            <div className='flex gap-4 animate-pulse'>
                                <div className='w-10 h-10 bg-zinc-800 rounded-xl'></div>
                                <div className='flex-1 space-y-3'>
                                    <div className='h-3 bg-zinc-800 rounded-full w-1/3'></div>
                                    <div className='h-2 bg-zinc-800 rounded-full w-full'></div>
                                    <div className='h-2 bg-zinc-800 rounded-full w-2/3'></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className='glass p-8 rounded-[2rem] border border-zinc-800/50 relative overflow-hidden'>
            <div className='absolute top-0 right-0 w-64 h-64 bg-zinc-400/5 blur-[80px] rounded-full -mr-32 -mt-32 pointer-events-none'></div>

            <div className='flex items-center justify-between mb-10'>
                <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]'>
                        <span className='text-black text-xl font-bold'>A</span>
                    </div>
                    <div>
                        <h3 className='text-xl font-bold tracking-tight text-white'>
                            AI Analytics
                        </h3>
                        <p className='text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1'>
                            Active Protocol: Neural Insight
                        </p>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <span className='text-[10px] font-black text-zinc-500 uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full'>
                        Update: {formatLastUpdated()}
                    </span>
                    <button
                        onClick={loadInsights}
                        className='w-10 h-10 glass-lighter border border-zinc-700/50 rounded-xl flex items-center justify-center hover:border-white/50 transition-all active:scale-95'
                        disabled={isLoading}
                    >
                        <span className='text-sm'>⚡</span>
                    </button>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {insights.map((insight) => {
                    const currentAnswer = aiAnswers.find((a) => a.insightId === insight.id);

                    return (
                        <div
                            key={insight.id}
                            className='glass-lighter p-6 rounded-2xl border border-zinc-700/20 group hover:border-zinc-500/30 transition-all flex flex-col'
                        >
                            <div className='flex items-center gap-3 mb-4'>
                                <div className='w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sm font-bold text-white group-hover:scale-110 transition-transform'>
                                    {getInsightIcon(insight.type)}
                                </div>
                                <h4 className='font-bold text-white text-sm tracking-tight'>
                                    {insight.title}
                                </h4>
                            </div>

                            <p className='text-zinc-500 text-xs leading-relaxed mb-6 font-medium'>
                                {insight.message}
                            </p>

                            {insight.action && (
                                <button
                                    onClick={() => handleActionClick(insight)}
                                    className={`mt-auto w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                                        currentAnswer 
                                        ? 'bg-white text-black' 
                                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                                    }`}
                                >
                                    {currentAnswer?.isLoading ? (
                                        <div className='w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin'></div>
                                    ) : (
                                        <>
                                            {insight.action}
                                            <span>→</span>
                                        </>
                                    )}
                                </button>
                            )}

                            {currentAnswer && (
                                <div className='mt-4 p-4 bg-black/40 rounded-xl border border-zinc-800/50'>
                                    <div className='flex gap-3'>
                                        <div className='w-1 h-full bg-zinc-600 rounded-full'></div>
                                        <div className='flex-1'>
                                            <p className='text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-2'>
                                                System Response
                                            </p>
                                            {currentAnswer.isLoading ? (
                                                <div className='space-y-2'>
                                                    <div className='h-1.5 bg-zinc-800 rounded-full w-full animate-pulse'></div>
                                                    <div className='h-1.5 bg-zinc-800 rounded-full w-2/3 animate-pulse'></div>
                                                </div>
                                            ) : (
                                                <p className='text-zinc-400 text-[11px] leading-relaxed font-medium italic'>
                                                    "{currentAnswer.answer}"
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AIInsights;