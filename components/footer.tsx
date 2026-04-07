import Link from 'next/link';

const Footer = () => {
    return (
        <footer className='bg-[#09090b] border-t border-zinc-900 relative overflow-hidden'>
            {/* Subtle background glow */}
            <div className='absolute bottom-0 right-0 w-[500px] h-[500px] bg-zinc-900/10 blur-[120px] rounded-full -mr-64 -mb-64 pointer-events-none'></div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-12 mb-20'>
                    {/* Logo and Tagline */}
                    <div className='md:col-span-2'>
                        <div className='inline-flex items-center gap-3 mb-8 group cursor-default'>
                            <div className='w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:scale-105 transition-transform duration-300'>
                                <span className='text-black text-xl font-black'>S</span>
                            </div>
                            <h2 className='text-2xl font-black tracking-tighter text-white uppercase'>
                                Savify<span className="text-zinc-600">.core</span>
                            </h2>
                        </div>
                        <p className='text-zinc-500 leading-relaxed max-w-sm text-[10px] uppercase tracking-[0.2em] font-bold opacity-60'>
                            High-fidelity financial orchestration. Developed for precision architecture and intelligent fiscal analysis.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h3 className='text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-8'>
                            SYSTEM_MAP
                        </h3>
                        <div className='flex flex-col space-y-4'>
                            {[
                                { name: 'Dashboard', href: '/' },
                                { name: 'About_Module', href: '/about' },
                                { name: 'Support_Link', href: '/contact' }
                            ].map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className='text-zinc-600 hover:text-white text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-300 w-fit'
                                >
                                    <span className="mr-2 opacity-30">{'>'}</span>
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Features */}
                    <div>
                        <h3 className='text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-8'>
                            PROTOCOLS
                        </h3>
                        <div className='space-y-4 font-mono'>
                            {[
                                'Neural_Parsing',
                                'Vector_Taxonomy',
                                'Stat_Rendering'
                            ].map((protocol) => (
                                <div key={protocol} className='flex items-center gap-3 text-zinc-600 text-[10px] uppercase font-bold tracking-widest'>
                                    <div className='w-1 h-1 bg-zinc-800 rounded-full'></div>
                                    {protocol}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className='pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8'>
                    <div className="flex flex-col gap-2">
                        <p className='text-zinc-700 text-[9px] font-bold tracking-[0.3em] uppercase'>
                            © {new Date().getFullYear()} Savify // All Protocols Active
                        </p>
                        <p className='text-zinc-800 text-[8px] font-mono uppercase tracking-widest'>
                            Build_Hash: {Math.random().toString(36).substring(7).toUpperCase()}
                        </p>
                    </div>

                    <div className='flex items-center gap-6'>
                        <a 
                            href='https://github.com/Rohit-Bhardwaj10' 
                            target="_blank"
                            rel="noopener noreferrer"
                            className='glass-lighter px-6 py-3 rounded-full border border-zinc-900 text-[9px] uppercase tracking-[0.2em] font-black text-zinc-500 hover:text-white hover:border-zinc-700 transition-all duration-500 flex items-center gap-3'
                        >
                            <span className='w-1.5 h-1.5 bg-zinc-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.2)]'></span>
                            AUTH_DEV: SORCERER_SUPREME
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;