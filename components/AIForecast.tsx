import { getAIForecast } from '@/app/actions/getaiforecast';

const AIForecast = async () => {
    const forecastData = await getAIForecast();

    return (
        <div className='glass p-8 rounded-[2rem] border border-zinc-800/50 h-full flex flex-col justify-between'>
            <div>
                <div className='flex items-center justify-between mb-8'>
                    <div className='flex items-center gap-4'>
                        <div className='w-12 h-12 bg-zinc-950 border border-zinc-900 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.02)]'>
                            <span className='text-zinc-100 text-xl font-bold'>Ω</span>
                        </div>
                        <div>
                            <h3 className='text-xl font-black tracking-tight text-white uppercase'>
                                Predictive Mode
                            </h3>
                            <p className='text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mt-1'>
                                AI Forecasting // {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                </div>

                <div className='mb-8'>
                    <div className='text-[10px] font-mono font-bold text-zinc-700 uppercase tracking-widest mb-4'>[ PROJECTION_VALUE ]</div>
                    <div className='text-5xl font-black text-white tracking-tighter'>
                        {forecastData.forecast}
                    </div>
                </div>

                <div className='space-y-4'>
                    <div className='text-[10px] font-mono font-bold text-zinc-700 uppercase tracking-widest'>[ CRITICAL_HOTSPOTS ]</div>
                    <div className='flex flex-wrap gap-2'>
                        {forecastData.hotspots.length > 0 ? (
                            forecastData.hotspots.map((spot, i) => (
                                <span 
                                    key={i} 
                                    className='px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-400 group-hover:border-zinc-700 transition-all'
                                >
                                    {spot}
                                </span>
                            ))
                        ) : (
                            <span className='text-[10px] text-zinc-600 font-mono italic uppercase'>Awaiting more data loops...</span>
                        )}
                    </div>
                </div>
            </div>

            <div className='mt-8 pt-6 border-t border-zinc-900'>
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-1'>
                        <span className='text-[10px] font-bold text-zinc-600 uppercase tracking-widest'>Confidence_Score</span>
                        <div className='w-32 h-1.5 bg-zinc-900 rounded-full overflow-hidden'>
                            <div 
                                className='h-full bg-zinc-500 rounded-full transition-all duration-1000' 
                                style={{ width: `${forecastData.confidence * 100}%` }}
                            />
                        </div>
                    </div>
                    <div className='text-right'>
                        <span className='text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block'>SYS_CHECK</span>
                        <span className='text-[10px] font-mono font-bold text-zinc-100 uppercase tracking-widest px-2 py-1 bg-zinc-900 rounded border border-zinc-800'>OPTIMAL</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIForecast;
