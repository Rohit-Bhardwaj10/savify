import Link from 'next/link';

const AboutPage = () => {
    return (
        <div className='font-sans bg-[#09090b] text-zinc-400 selection:bg-zinc-800 selection:text-zinc-100 min-h-screen relative overflow-hidden'>
            {/* Background elements */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(39,39,42,0.15),_transparent_70%)] pointer-events-none" />
            
            {/* Hero Section */}
            <section className='relative pt-24 pb-16 px-4 md:px-8'>
                <div className='max-w-5xl mx-auto'>
                    <div className='inline-flex items-center gap-2 glass-lighter px-4 py-2 rounded-full text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-8 border border-zinc-800/50 text-zinc-500'>
                        <span className='w-1.5 h-1.5 bg-zinc-100 rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.5)]'></span>
                        Protocol // Intel_Core_Active
                    </div>
                    
                    <h1 className='text-5xl sm:text-7xl lg:text-8xl font-black mb-8 tracking-tighter text-white'>
                        SAVIFY <span className='text-zinc-600'>AI</span>
                    </h1>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-end'>
                        <div className='space-y-6'>
                            <p className='text-lg sm:text-xl text-zinc-500 leading-relaxed max-w-xl'>
                                A high-performance financial management engine engineered for precision tracking and intelligent analysis.
                            </p>
                            <div className='flex gap-4'>
                                <Link
                                    href='/sign-up'
                                    className='bg-zinc-100 text-zinc-950 px-8 py-4 rounded-2xl font-bold hover:bg-white active:scale-95 transition-all text-sm uppercase tracking-widest'
                                >
                                    Initialize
                                </Link>
                                <Link
                                    href='/contact'
                                    className='glass-lighter text-zinc-100 border border-zinc-800/50 hover:border-zinc-700 px-8 py-4 rounded-2xl font-semibold transition-all backdrop-blur-md text-sm uppercase tracking-widest'
                                >
                                    Connect
                                </Link>
                            </div>
                        </div>
                        <div className='hidden md:block glass p-8 rounded-3xl border border-zinc-800/30 opacity-50 grayscale'>
                            <div className='font-mono text-[8px] text-zinc-500 space-y-1 uppercase'>
                                <div>{'>'} LOADING_MODULE: FINANCIAL_NEURAL_NET</div>
                                <div>{'>'} STATUS: OPTIMIZED</div>
                                <div>{'>'} LATENCY: 2.4MS</div>
                                <div>{'>'} SECURITY: ENCRYPTED_AES256</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className='py-24 px-4 md:px-8 bg-zinc-950/30 border-t border-zinc-900'>
                <div className='max-w-5xl mx-auto'>
                    <div className='mb-16'>
                        <span className='text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest block mb-4'>01 // Core Mission</span>
                        <h2 className='text-3xl sm:text-4xl font-bold text-white tracking-tight uppercase'>
                            TRANSFORMING MANAGEMENT <br /> WITH <span className='text-zinc-500'>NEURAL LOGIC</span>
                        </h2>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {[
                            { label: 'Active Nodes', value: '10K+', desc: 'Operational user clusters' },
                            { label: 'Ledger Volume', value: '$2M+', desc: 'Processed transaction magnitude' },
                            { label: 'Reliability Index', value: '99%', desc: 'System uptime performance' }
                        ].map((stat, i) => (
                            <div key={i} className='glass p-8 rounded-3xl border border-zinc-800/50 hover:border-zinc-700/50 transition-all'>
                                <div className='text-xs font-mono font-bold text-zinc-600 uppercase tracking-widest mb-4'>{stat.label}</div>
                                <div className='text-4xl font-black text-white mb-2'>{stat.value}</div>
                                <p className='text-[10px] uppercase font-bold text-zinc-500 tracking-widest'>{stat.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className='mt-16 max-w-2xl'>
                        <p className='text-lg text-zinc-500 leading-relaxed italic border-l-2 border-zinc-800 pl-8'>
                            "Our engine leverages deep-learning architectures to revolutionize how modern individuals achieve financial equilibrium. Every data point is an opportunity for optimization."
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className='py-24 px-4 md:px-8'>
                <div className='max-w-5xl mx-auto'>
                    <div className='mb-16 text-right'>
                        <span className='text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest block mb-4'>02 // Capability Modules</span>
                        <h2 className='text-3xl sm:text-4xl font-bold text-white tracking-tight uppercase'>
                            ENGINEERED FOR <span className='text-zinc-500'>PRECISION</span>
                        </h2>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {[
                            { 
                                id: 'INSIGHT_NET', 
                                title: 'Neural Analysis', 
                                desc: 'High-fidelity pattern recognition within complex spending datasets.' 
                            },
                            { 
                                id: 'CLASSIFY_MOD', 
                                title: 'Auto-Sectoring', 
                                desc: 'Instant category attribution using calibrated NLP models.' 
                            },
                            { 
                                id: 'LEDGER_UX', 
                                title: 'Fiscal Dashboard', 
                                desc: 'Real-time statistical rendering for immediate financial awareness.' 
                            }
                        ].map((feat, i) => (
                            <div key={i} className='glass-lighter p-8 rounded-3xl border border-zinc-800/30 hover:border-zinc-500/30 transition-all group'>
                                <div className='font-mono text-[10px] font-bold text-zinc-700 mb-6 group-hover:text-zinc-400'>[ {feat.id} ]</div>
                                <h3 className='text-lg font-bold text-white mb-4 uppercase tracking-tight'>{feat.title}</h3>
                                <p className='text-xs text-zinc-500 leading-relaxed'>{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className='py-32 px-4 md:px-8 relative overflow-hidden text-center'>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03),_transparent_50%)] pointer-events-none' />
                <div className='max-w-3xl mx-auto relative z-10'>
                    <h2 className='text-4xl sm:text-6xl font-black mb-8 tracking-tighter text-white uppercase'>
                        Ready to <span className='text-zinc-600'>Calibrate?</span>
                    </h2>
                    <div className='flex items-center justify-center gap-6'>
                        <Link
                            href='/sign-up'
                            className='bg-white text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all text-sm shadow-[0_0_40px_rgba(255,255,255,0.1)]'
                        >
                            Execute_Commit
                        </Link>
                    </div>
                </div>
            </section>

            <div className='h-32' />
        </div>
    );
};

export default AboutPage;