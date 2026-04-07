'use client';

const ContactPage = () => {
    return (
        <div className='font-sans bg-[#09090b] text-zinc-400 selection:bg-zinc-800 selection:text-zinc-100 min-h-screen relative overflow-hidden'>
            {/* Background elements */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(39,39,42,0.15),_transparent_70%)] pointer-events-none" />
            
            {/* Hero Section */}
            <section className='relative pt-24 pb-16 px-4 md:px-8'>
                <div className='max-w-5xl mx-auto'>
                    <div className='inline-flex items-center gap-2 glass-lighter px-4 py-2 rounded-full text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-8 border border-zinc-800/50 text-zinc-500'>
                        <span className='w-1.5 h-1.5 bg-zinc-100 rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.5)]'></span>
                        Support // Node_Connect
                    </div>
                    
                    <h1 className='text-5xl sm:text-7xl lg:text-8xl font-black mb-8 tracking-tighter text-white uppercase'>
                        ESTABLISH <span className='text-zinc-600'>LINK</span>
                    </h1>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-end'>
                        <div className='space-y-6'>
                            <p className='text-lg sm:text-xl text-zinc-500 leading-relaxed max-w-xl'>
                                Connect with our technical support and development clusters for immediate assistance and professional collaboration.
                            </p>
                            <div className='flex gap-4'>
                                <a
                                    href='mailto:support@savify-ai.com'
                                    className='bg-zinc-100 text-zinc-950 px-8 py-4 rounded-2xl font-bold hover:bg-white active:scale-95 transition-all text-sm uppercase tracking-widest'
                                >
                                    Email_Comm
                                </a>
                                <a
                                    href='tel:+11234567890'
                                    className='glass-lighter text-zinc-100 border border-zinc-800/50 hover:border-zinc-700 px-8 py-4 rounded-2xl font-semibold transition-all backdrop-blur-md text-sm uppercase tracking-widest'
                                >
                                    Voice_Link
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Channels Section */}
            <section className='py-24 px-4 md:px-8 bg-zinc-950/30 border-t border-zinc-900'>
                <div className='max-w-5xl mx-auto'>
                    <div className='mb-16'>
                        <span className='text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest block mb-4'>01 // Active Channels</span>
                        <h2 className='text-3xl sm:text-4xl font-bold text-white tracking-tight uppercase'>
                            SPECIFIED <span className='text-zinc-500'>VECTOR_ACCESS</span>
                        </h2>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
                        {[
                            { label: 'E_MAIL', value: 'support@savify-ai.com', desc: 'Detailed assistance cluster' },
                            { label: 'P_HONE', value: '+1 (123) 456-7890', desc: 'Direct technical support pulse' },
                            { label: 'O_FFICE', value: '123 Innovation St, USA', desc: 'Core development headquarters' }
                        ].map((stat, i) => (
                            <div key={i} className='glass p-8 rounded-3xl border border-zinc-800/50 hover:border-zinc-700/50 transition-all group'>
                                <div className='font-mono text-[10px] font-bold text-zinc-700 mb-6 group-hover:text-zinc-400'>[ {stat.label} ]</div>
                                <div className='text-lg font-black text-white mb-2 break-words'>{stat.value}</div>
                                <p className='text-[10px] uppercase font-bold text-zinc-500 tracking-widest mt-4'>{stat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Availability Section */}
            <section className='py-24 px-4 md:px-8'>
                <div className='max-w-5xl mx-auto'>
                    <div className='mb-16 text-right'>
                        <span className='text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest block mb-4'>02 // Protocol Operation</span>
                        <h2 className='text-3xl sm:text-4xl font-bold text-white tracking-tight uppercase'>
                            UPTIME <span className='text-zinc-500'>SCHEDULE</span>
                        </h2>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        <div className='glass-lighter p-8 rounded-3xl border border-zinc-800/30'>
                            <h3 className='font-mono text-xs font-bold text-zinc-700 mb-8'>[ OPERATION_HOURS ]</h3>
                            <div className='space-y-4'>
                                {[
                                    { day: 'Mon - Fri', hours: '09:00 - 18:00 PST' },
                                    { day: 'Saturday', hours: '10:00 - 16:00 PST' },
                                    { day: 'Sunday', hours: 'Inactive' }
                                ].map((item, i) => (
                                    <div key={i} className='flex justify-between items-center py-2 border-b border-zinc-800/30'>
                                        <span className='text-xs font-bold text-zinc-500 uppercase tracking-widest'>{item.day}</span>
                                        <span className='text-sm text-zinc-200 font-mono'>{item.hours}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='glass p-8 rounded-3xl border border-zinc-800/30 flex flex-col justify-center text-center space-y-4'>
                            <p className='text-xs text-zinc-500 uppercase tracking-widest font-black opacity-50 italic'>
                                Node: Global_Cloud_Edge
                            </p>
                            <div className='h-px w-12 bg-zinc-800 mx-auto' />
                            <p className='text-sm text-white italic font-mono'>
                                "Awaiting incoming transmission. System check: OPTIMAL."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className='h-32' />
        </div>
    );
};

export default ContactPage;