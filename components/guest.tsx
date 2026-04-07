import { SignInButton } from '@clerk/nextjs';

const Guest = () => {
    return (
        <div className='font-sans bg-[#09090b] text-zinc-400 selection:bg-zinc-800 selection:text-zinc-100 min-h-screen relative overflow-hidden'>
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,_rgba(39,39,42,0.15),_transparent_70%)] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] pointer-events-none" />

            {/* Hero Section */}
            <section className='relative pt-32 pb-20 px-4 sm:px-6 md:px-8'>
                <div className='relative z-10 max-w-5xl mx-auto text-center'>
                    <div className='inline-flex items-center gap-2 glass-lighter px-4 py-2 rounded-full text-[10px] uppercase font-mono font-black tracking-[0.3em] mb-12 border border-zinc-900 text-zinc-500 hover:border-zinc-700 hover:text-zinc-400 transition-all cursor-default'>
                        <span className='w-1.5 h-1.5 bg-zinc-100 rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.5)]'></span>
                        Intelligence // Scaled_Savings
                    </div>
                    
                    <h1 className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-12 tracking-tighter text-white uppercase text-balance'>
                        SIMPLIFY <span className='text-zinc-700'>THE</span> <br />
                        <span className='text-gradient font-black'>WEALTH_ENGINE</span>
                    </h1>

                    <p className='text-lg sm:text-xl md:text-2xl text-zinc-500 mb-16 max-w-2xl mx-auto leading-relaxed px-4 font-medium uppercase tracking-tight opacity-80'>
                        Savify Core transforms high-entropy spending data into actionable financial wisdom. 
                        Track, analyze, and optimize with a high-fidelity technical interface.
                    </p>

                    <div className='flex flex-col sm:flex-row gap-6 justify-center mb-24'>
                        <SignInButton>
                            <button className='bg-zinc-100 text-zinc-950 px-12 py-5 rounded-2xl font-black shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] hover:bg-white active:scale-95 transition-all text-sm uppercase tracking-[0.2em]'>
                                Initialize_Module
                            </button>
                        </SignInButton>
                        <button className='glass-lighter text-zinc-100 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900/50 px-12 py-5 rounded-2xl font-bold transition-all backdrop-blur-md text-sm uppercase tracking-[0.2em]'>
                            View_Docs
                        </button>
                    </div>

                    {/* Bento Grid Features */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-24 text-left'>
                        {[
                            { 
                                icon: '🤖', 
                                id: 'NEURAL_PARSE', 
                                title: 'AI Analysis', 
                                desc: 'Deep-learning insights into recurring spending habits and neural patterns.' 
                            },
                            { 
                                icon: '✨', 
                                id: 'AUTO_TAXON', 
                                title: 'Categorization', 
                                desc: 'Zero manual input. Our AI learns and sorts your expenses via calibrated NLP.' 
                            },
                            { 
                                icon: '📊', 
                                id: 'PULSE_STATS', 
                                title: 'Real-time Pulse', 
                                desc: 'High-precision statistical rendering of your financial performance peaks.' 
                            }
                        ].map((feat, i) => (
                            <div key={i} className='glass p-8 rounded-[32px] border border-zinc-900 hover:border-zinc-700/50 transition-all group relative overflow-hidden'>
                                <div className='absolute top-0 right-0 p-4 font-mono text-[8px] text-zinc-800 uppercase tracking-widest font-black'>[ MOD_0{i+1} ]</div>
                                <div className='w-12 h-12 bg-zinc-950 rounded-2xl flex items-center justify-center border border-zinc-900 mb-8 group-hover:scale-110 group-hover:border-zinc-700 transition-all duration-500'>
                                    <span className='text-3xl filter grayscale brightness-125'>{feat.icon}</span>
                                </div>
                                <div className='font-mono text-[9px] font-bold text-zinc-700 mb-2'>[ {feat.id} ]</div>
                                <h3 className='text-xl font-black text-white mb-4 uppercase tracking-tighter'>{feat.title}</h3>
                                <p className='text-zinc-600 text-sm leading-relaxed font-bold uppercase tracking-tight opacity-70'>{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Common Inquiries with technical twist */}
            <section className='py-32 px-4 sm:px-6 md:px-8 border-t border-zinc-900 bg-zinc-950/20'>
                <div className='max-w-4xl mx-auto'>
                    <div className='text-center mb-24'>
                        <span className='text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest block mb-4'>03 // Frequently Asked</span>
                        <h2 className='text-4xl sm:text-5xl md:text-6xl font-black mb-8 tracking-tighter text-white uppercase'>COMMON_INQUIRIES</h2>
                        <p className='text-zinc-500 max-w-xl mx-auto uppercase text-xs font-bold tracking-[0.2em] opacity-60'>Operational documentation for the Savify engine.</p>
                    </div>

                    <div className='space-y-6'>
                        {[
                            { q: "What is Savify Core?", a: "Savify Core is a high-performance financial management engine designed for precision tracking and intelligent analysis." },
                            { q: "How secure is the ledger?", a: "We utilize industrial-grade encryption and isolated processing to ensure your data remains within your sovereign domain." },
                            { q: "Is there a mobile vector?", a: "Savify is a progressive web engine that works seamlessly across all mobile and desktop nodes." }
                        ].map((faq, i) => (
                            <div key={i} className='glass-lighter p-8 rounded-3xl border border-zinc-900 hover:border-zinc-800 transition-all group'>
                                <div className='flex items-start gap-4'>
                                    <span className='font-mono text-zinc-800 font-black text-sm mt-1'>0{i+1}_</span>
                                    <div>
                                        <h3 className='text-lg font-black text-zinc-200 mb-3 uppercase tracking-tighter group-hover:text-white transition-colors'>{faq.q}</h3>
                                        <p className='text-zinc-500 text-sm leading-relaxed font-medium'>{faq.a}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer space */}
            <div className="h-32" />
        </div>
    );
};

export default Guest;